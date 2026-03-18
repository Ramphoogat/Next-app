import { NodeExecutor } from '@/workflow/execution/types';
import { N8nData } from '@/types/n8n';

export const httpRequestExecutor: NodeExecutor = {
  async execute(input: N8nData, config: Record<string, unknown>): Promise<N8nData> {
    const { action, method, url, headers, body } = config;
    
    if (action !== "make_request") return input;

    const results = await Promise.all(input.map(async (item) => {
      try {
        const targetUrl = String(url || item.json?.url || '');
        if (!targetUrl) return item;

        const requestMethod = String(method || 'GET');
        
        const response = await fetch(targetUrl, {
          method: requestMethod,
          headers: {
            'Content-Type': 'application/json',
            ...(typeof headers === 'object' && headers ? headers : {})
          },
          body: body ? JSON.stringify(body) : undefined
        });

        const data = await response.json().catch(() => ({}));
        
        return { 
          ...item, 
          json: {
            ...item.json,
            http_status: response.status,
            response: data 
          }
        };
      } catch (error: unknown) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        return {
          ...item,
          json: {
            ...item.json,
            http_error: errorMsg
          }
        };
      }
    }));

    return results;
  }
};
