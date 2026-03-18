import { NodeDefinition, NodeRegistry } from '@/workflow/core/nodeRegistry';
import { IWorkflow, WorkflowNode, WorkflowEdge, WorkflowNodeData } from '@/types/workflow';

/**
 * Dynamically generates workflow templates
 */
export class TemplateEngine {
  /**
   * Generates a basic Trigger -> Action workflow template
   * @param triggerNodeId The ID of the trigger node (e.g., "stripe")
   * @param triggerName The trigger event Name (e.g., "payment_succeeded")
   * @param actionNodeId The ID of the action node (e.g., "gmail")
   * @param actionName The action event Name (e.g., "send_email")
   */
  static generateTriggerActionTemplate(
    triggerNodeId: string,
    triggerName: string,
    actionNodeId: string,
    actionName: string
  ): IWorkflow | null {
    const triggerDef = NodeRegistry.getNodeById(triggerNodeId);
    const actionDef = NodeRegistry.getNodeById(actionNodeId);

    if (!triggerDef || !actionDef) {
      console.error(`Invalid template definition: trigger=${triggerNodeId}, action=${actionNodeId}`);
      return null;
    }

    const workflowName = `${triggerDef.name} to ${actionDef.name} Integration`;
    
    // Generate trigger node
    const triggerNode: WorkflowNode = {
      id: `trigger_${Date.now()}`,
      position: { x: 100, y: 100 },
      type: 'custom', // Matches whatever React Flow component you use
      data: {
        label: `${triggerDef.name} Trigger`,
        nodeType: triggerNodeId,
        category: 'trigger',
        icon: triggerDef.icon,
        description: `Triggered by ${triggerName}`,
        config: {
          event: triggerName,
        }
      } as WorkflowNodeData
    };

    // Generate action node
    const actionNode: WorkflowNode = {
      id: `action_${Date.now() + 1}`,
      position: { x: 400, y: 100 },
      type: 'custom',
      data: {
        label: `${actionDef.name} Action`,
        nodeType: actionNodeId,
        category: 'action',
        icon: actionDef.icon,
        description: `Execute ${actionName}`,
        config: {
          action: actionName,
        }
      } as WorkflowNodeData
    };

    // Connect trigger to action
    const edge: WorkflowEdge = {
      id: `e_${triggerNode.id}-${actionNode.id}`,
      source: triggerNode.id,
      target: actionNode.id,
      animated: true,
      style: { stroke: '#b1b1b7' }
    };

    return {
      name: workflowName,
      description: `Automatically created workflow combining ${triggerDef.name} and ${actionDef.name}.`,
      status: 'draft',
      nodes: [triggerNode, actionNode],
      edges: [edge],
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Auto-generates a list of common templates based on available nodes
   */
  static generateCommonTemplates(): IWorkflow[] {
    const templates: IWorkflow[] = [];
    
    // 1. Stripe -> Slack
    const t1 = this.generateTriggerActionTemplate('stripe', 'payment_succeeded', 'slack', 'send_message');
    if (t1) templates.push(t1);

    // 2. Github -> Discord
    const t2 = this.generateTriggerActionTemplate('github', 'push', 'discord', 'send_message');
    if (t2) templates.push(t2);

    // 3. Webhook -> AI Agent -> Gmail
    // A slightly more complex template could be generated here

    return templates;
  }

  /**
   * Generate an empty template for a specific node
   * @param node The node definition
   */
  static generateEmptyIntegration(node: NodeDefinition): IWorkflow {
    const nodeItem: WorkflowNode = {
      id: `node_${Date.now()}`,
      position: { x: 250, y: 150 },
      type: 'custom',
      data: {
        label: node.name,
        nodeType: node.id,
        category: node.triggers.length > 0 ? 'trigger' : 'action',
        icon: node.icon,
        description: `${node.name} Integration`,
        config: {}
      } as WorkflowNodeData
    };

    return {
      name: `New ${node.name} Workflow`,
      description: `Start a workflow with ${node.name}.`,
      status: 'draft',
      nodes: [nodeItem],
      edges: [],
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
