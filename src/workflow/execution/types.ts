import { N8nData } from '@/types/n8n';

/**
 * Represents the execution logic of an individual Workflow Node
 */
export interface NodeExecutor {
  /**
   * Executes the node logic
   * @param input Data passed from the previous node (Array of items)
   * @param config The specific node configuration parameter
   */
  execute(input: N8nData, config: Record<string, unknown>): Promise<N8nData>;
}

