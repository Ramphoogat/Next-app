import { v4 as uuidv4 } from 'uuid';
import { WorkflowNode, WorkflowEdge, NodeCategory } from '@/types/workflow';

// Helper to guess category and icon from n8n node type
function getNodeMetadata(type: string): { category: NodeCategory; icon: string } {
  const t = type.toLowerCase();
  if (t.includes('trigger') || t.includes('webhook') || t.includes('schedule')) {
    return { category: 'trigger', icon: 'zap' };
  }
  if (t.includes('if') || t.includes('switch') || t.includes('merge')) {
    return { category: 'logic', icon: 'git-branch' };
  }
  return { category: 'action', icon: 'box' };
}

export interface IN8nNode {
  id?: string;
  name: string;
  type: string;
  position?: number[];
  parameters?: Record<string, unknown>;
  typeVersion?: number | string;
  credentials?: Record<string, unknown>;
  webhookId?: string;
  retryOnFail?: boolean;
}

export interface IN8nConnectionTarget {
  node: string;
  type: string;
  index: number;
}

export interface IN8nTemplate {
  name?: string;
  nodes?: IN8nNode[];
  connections?: Record<string, Record<string, IN8nConnectionTarget[][]> | undefined>;
  settings?: Record<string, unknown>;
  triggerCount?: number;
}

export function convertN8nTemplateToWorkflow(template: IN8nTemplate): { nodes: WorkflowNode[]; edges: WorkflowEdge[] } {
  const nodes: WorkflowNode[] = [];
  const edges: WorkflowEdge[] = [];

  const nameToIdMap: Record<string, string> = {};

  // First pass: create nodes
  if (Array.isArray(template.nodes)) {
    template.nodes.forEach((n8nNode: IN8nNode) => {
      // Ensure we have an ID
      const id = n8nNode.id || uuidv4();
      nameToIdMap[n8nNode.name] = id;

      const metadata = getNodeMetadata(n8nNode.type);

      const rfNode: WorkflowNode = {
        id,
        type: metadata.category, // Typical React Flow custom node type corresponding to our UI
        position: {
          x: Array.isArray(n8nNode.position) ? n8nNode.position[0] : 0,
          y: Array.isArray(n8nNode.position) ? n8nNode.position[1] : 0,
        },
        data: {
          label: n8nNode.name || 'Unnamed Node',
          nodeType: n8nNode.type || 'unknown',
          category: metadata.category,
          icon: metadata.icon,
          description: '',
          config: n8nNode.parameters || {},
          status: 'idle',
        },
      };
      nodes.push(rfNode);
    });
  }

  // Second pass: create edges from connections
  const connections = template.connections;
  if (connections) {
    Object.keys(connections).forEach((sourceName) => {
      const sourceId = nameToIdMap[sourceName];
      if (!sourceId) return;

      const outputs = connections[sourceName];
      if (!outputs) return;
      // outputs is usually an object where keys are output names like 'main'
      Object.keys(outputs).forEach((outputName) => {
        const outputConnections = outputs[outputName];
        if (Array.isArray(outputConnections)) {
          outputConnections.forEach((connectionsArray: IN8nConnectionTarget[]) => {
            if (Array.isArray(connectionsArray)) {
              connectionsArray.forEach((targetData: IN8nConnectionTarget) => {
                const targetId = nameToIdMap[targetData.node];
                if (targetId) {
                  edges.push({
                    id: `edge-${uuidv4()}`,
                    source: sourceId,
                    target: targetId,
                    type: 'smoothstep',
                    animated: true,
                  });
                }
              });
            }
          });
        }
      });
    });
  }

  return { nodes, edges };
}
