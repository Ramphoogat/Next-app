import { NodeExecutor } from '@/workflow/execution/types';
import { N8nData } from '@/types/n8n';

export const mergeExecutor: NodeExecutor = {
  async execute(input: N8nData, config: Record<string, unknown>): Promise<N8nData> {
    // n8n Merge node: 
    // Wait: actually just returns what it received once everything is ready
    // Standard: combines arrays
    
    const { mode = 'append' } = config;

    if (mode === 'append') {
      return input; // Already merged by engine if multiple inputs
    }

    if (mode === 'unique') {
      const seen = new Set();
      return input.filter(item => {
        const key = JSON.stringify(item.json);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    return input;
  }
};
