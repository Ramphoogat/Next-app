import { NodeExecutor } from '@/workflow/execution/types';
import { N8nData } from '@/types/n8n';

export const ifExecutor: NodeExecutor = {
  async execute(input: N8nData, config: Record<string, unknown>): Promise<N8nData> {
    const { field, operator, value } = config;
    
    // In n8n, an IF node actually splits the flow into two output ports.
    // For now, our engine supports one main stream.
    // We will filter the data based on the condition.
    
    return input.filter(item => {
      const actualValue = item.json?.[field as string];
      const expectedValue = value;

      switch (operator) {
        case 'equal': return String(actualValue) === String(expectedValue);
        case 'notEqual': return String(actualValue) !== String(expectedValue);
        case 'contains': return String(actualValue).includes(String(expectedValue));
        default: return true;
      }
    });
  }
};
