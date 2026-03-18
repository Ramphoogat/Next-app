import { NodeExecutor } from '@/workflow/execution/types';
import { N8nData } from '@/types/n8n';

export const gmailExecutor: NodeExecutor = {
  async execute(input: N8nData, config: Record<string, unknown>): Promise<N8nData> {
    const { action, to, subject, body } = config;
    
    return input.map(item => {
      const emailTo = to || item.json?.to;
      const emailSubject = subject || item.json?.subject || "Automated Workflow";
      const emailBody = body || item.json?.body || '';

      if (action === "send_email") {
        console.log(`[Gmail] 📧 Sending email to ${emailTo}... Subject: ${emailSubject}, Body: ${emailBody}`);
        return { 
          ...item, 
          json: {
            ...item.json,
            gmail_status: "success", 
            sent_to: emailTo 
          }
        };
      }
      
      if (action === "read_email") {
        console.log(`[Gmail] 📤 Reading emails...`);
        return { 
          ...item, 
          json: {
            ...item.json,
            emails: [] 
          }
        };
      }

      return item;
    });
  }
};
