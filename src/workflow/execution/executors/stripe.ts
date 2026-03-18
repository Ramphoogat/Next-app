import { NodeExecutor } from '@/workflow/execution/types';
import { N8nData } from '@/types/n8n';

export const stripeExecutor: NodeExecutor = {
  async execute(input: N8nData, config: Record<string, unknown>): Promise<N8nData> {
    const { action, amount, currency, customerId } = config;
    
    return input.map(item => {
      if (action === "create_charge") {
        console.log(`[Stripe] 💳 Charging ${amount} ${currency} to customer ${customerId}...`);
        return { 
          ...item, 
          json: {
            ...item.json,
            stripe_status: "success", 
            charge_id: "ch_" + Math.random().toString(36).substring(2, 9) 
          }
        };
      }

      if (action === "create_customer") {
        console.log(`[Stripe] 👤 Creating new customer for ${item.json?.email}...`);
        return { 
          ...item, 
          json: {
            ...item.json,
            customer_id: "cus_" + Math.random().toString(36).substring(2, 9) 
          }
        };
      }

      return item;
    });
  }
};