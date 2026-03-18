import { IWorkflow } from '@/types/workflow';
import { N8nData, IN8nDataItem } from '@/types/n8n';
import { getExecutor } from '@/workflow/execution/registry';

export interface ExecutionResult {
  status: 'success' | 'partial' | 'failed';
  data: Record<string, unknown>;
  logs: unknown[];
}

export class N8nExecutionEngine {
  /**
   * Evaluates expressions like {{ $json.field }} or {{ $now }}
   */
  private static parseExpression(expression: string, item: IN8nDataItem): string {
    if (typeof expression !== 'string' || !expression.includes('{{')) return expression;
    
    return expression.replace(/\{\{(.+?)\}\}/g, (_, match) => {
      const code = match.trim();
      try {
        const context = {
          $json: item.json,
          $binary: item.binary || {},
          $now: new Date().toISOString(),
        };
        const fn = new Function(...Object.keys(context), `return ${code}`);
        const result = fn(...Object.values(context));
        return typeof result === 'object' ? JSON.stringify(result) : String(result);
      } catch {
        return `{{ ${code} }}`;
      }
    });
  }

  static async executeWorkflow(workflow: IWorkflow, triggerData: N8nData = []): Promise<ExecutionResult> {
    const runData: Record<string, N8nData> = {};
    const logs: unknown[] = [];
    
    const incomingEdgeTargetIds = new Set(workflow.edges.map(e => e.target));
    const startNodes = workflow.nodes.filter(n => !incomingEdgeTargetIds.has(n.id));

    const queue: string[] = startNodes.map(n => n.id);
    const visited = new Set<string>();

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      if (visited.has(nodeId)) continue;
      visited.add(nodeId);

      const node = workflow.nodes.find(n => n.id === nodeId)!;
      const incomingEdges = workflow.edges.filter(e => e.target === nodeId);
      
      let currentInput: N8nData = [];
      
      if (incomingEdges.length === 0) {
        currentInput = triggerData.length > 0 ? triggerData : [{ json: {} }];
      } else {
        currentInput = incomingEdges.flatMap(edge => runData[edge.source] || []);
      }

      const nodeType = String(node.data.nodeType);
      const executor = getExecutor(nodeType);

      logs.push({
        timestamp: new Date().toISOString(),
        node: node.data.label,
        type: nodeType,
        status: 'executing'
      });

      if (executor) {
        try {
          const nodeConfig = (node.data.config as Record<string, unknown>) || {};
          const processedConfig = this.evaluateConfig(nodeConfig, currentInput[0]);
          
          const outputData = await executor.execute(currentInput, processedConfig as Record<string, unknown>);
          runData[nodeId] = outputData;

          logs.push({
            timestamp: new Date().toISOString(),
            node: node.data.label,
            status: 'success',
            itemCount: outputData.length
          });

          const outgoingEdges = workflow.edges.filter(e => e.source === nodeId);
          outgoingEdges.forEach(e => {
            if (!queue.includes(e.target)) queue.push(e.target);
          });

        } catch (err: unknown) {
          logs.push({
            timestamp: new Date().toISOString(),
            node: node.data.label,
            status: 'failed',
            error: err instanceof Error ? err.message : String(err)
          });
          return { status: 'failed', data: {}, logs };
        }
      }
    }

    const finalNodeId = Array.from(visited).pop();
    const finalData = finalNodeId ? runData[finalNodeId] : [];

    return { 
      status: 'success', 
      data: { items: finalData }, 
      logs 
    };
  }

  private static evaluateConfig(config: Record<string, unknown>, item?: IN8nDataItem): Record<string, unknown> {
    if (!item || !config) return config;

    const result: Record<string, unknown> = {};
    
    for (const key in config) {
      const value = config[key];
      if (typeof value === 'string') {
        result[key] = this.parseExpression(value, item);
      } else if (typeof value === 'object' && value !== null) {
        result[key] = this.evaluateConfig(value as Record<string, unknown>, item);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
}
