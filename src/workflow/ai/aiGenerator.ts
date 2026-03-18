import { TemplateEngine } from '@/workflow/generator/templateEngine';
import { NodeRegistry } from '@/workflow/core/nodeRegistry';
import { IWorkflow } from '@/types/workflow';

/**
 * AI-powered Workflow Generator
 */
export class AIGenerator {
  /**
   * Simulates an AI prompt that parses natural language into a workflow
   * e.g., "Send Gmail to raam@gmail.com when Stripe payment > 1000"
   * @param prompt User's natural language input
   */
  static generateFromPrompt(prompt: string): IWorkflow | null {
    const lowerPrompt = prompt.toLowerCase();
    
    // In a real implementation, we would call OpenAI / Anthropic here
    // to classify the intent, extract trigger/action nodes and their configuration.
    
    // Here we use a heuristic matching for demonstration
    const availableNodes = NodeRegistry.getAllNodes();
    
    // Extract node mentions
    const mentionedNodes = availableNodes.filter(node => 
      lowerPrompt.includes(node.id.toLowerCase()) || lowerPrompt.includes(node.name.toLowerCase())
    );

    if (mentionedNodes.length >= 2) {
      // Assuming the first mentioned trigger node is the trigger, and the next is the action
      // Or we can just filter by their capabilities
      const triggers = mentionedNodes.filter(n => n.triggers.length > 0);
      const actions = mentionedNodes.filter(n => n.actions.length > 0);

      if (triggers.length > 0 && actions.length > 0) {
        const trigger = triggers[0];
        const action = actions[0];
        
        // Simulating Advanced AI Extraction 👇
        console.log(`🧠 AI Extracted Intent from: "${prompt}"`);
        
        // Mocking parameter extraction
        const simulatedConfig: Record<string, unknown> = {};
        
        // Extract Emails (e.g. raam@gmail.com)
        const emailMatch = prompt.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (emailMatch) {
          simulatedConfig.to = emailMatch[0];
          console.log(`   ► Extracted Email: ${simulatedConfig.to}`);
        }
        
        // Extract Numbers/Filters (e.g. > 1000 or >1000)
        const filterMatch = prompt.match(/(>|<|>=|<=|=)\s*(\d+)/);
        if (filterMatch) {
          simulatedConfig.amount_filter = `${filterMatch[1]}${filterMatch[2]}`;
          console.log(`   ► Extracted Filter: ${simulatedConfig.amount_filter}`);
        }

        // Generate the base workflow
        const workflow = TemplateEngine.generateTriggerActionTemplate(
          trigger.id,
          trigger.triggers[0] || 'default_trigger',
          action.id,
          action.actions[0] || 'default_action'
        );

        // Inject extracted parameters into the generated nodes configuration!
        if (workflow && workflow.nodes.length >= 2) {
          workflow.nodes[0].data.config = {
             ...(workflow.nodes[0].data.config as Record<string, unknown>),
             filters: simulatedConfig.amount_filter ? { amount: simulatedConfig.amount_filter } : {}
          };

          workflow.nodes[1].data.config = {
             ...(workflow.nodes[1].data.config as Record<string, unknown>),
             params: simulatedConfig.to ? { to: simulatedConfig.to } : {}
          };
        }

        console.log("   ► AI Execution Graph Ready: ", JSON.stringify({
           trigger: { node: trigger.id, event: trigger.triggers[0], filters: simulatedConfig.amount_filter ? { amount: simulatedConfig.amount_filter } : {} },
           action: { node: action.id, event: action.actions[0], params: simulatedConfig.to ? { to: simulatedConfig.to } : {} }
        }, null, 2));

        return workflow;
      }
    }

    // Fallback: couldn't parse 
    console.warn("AI couldn't fully parse the prompt securely to a workflow. Mentions found:", mentionedNodes.map(n => n.name));
    return null;
  }
}
