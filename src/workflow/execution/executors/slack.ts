import { NodeExecutor } from '@/workflow/execution/types';
import { N8nData } from '@/types/n8n';

export const slackExecutor: NodeExecutor = {
  async execute(input: N8nData, config: Record<string, unknown>): Promise<N8nData> {
    const { action, channel, message } = config;
    
    return input.map(item => {
      if (action === "send_message") {
        const msgText = message || item.json?.message || "Default message from workflow";
        console.log(`[Slack] 💬 Sending to #${channel || item.json?.channel}: "${msgText}"`);
        return { 
          ...item, 
          json: {
            ...item.json,
            slack_status: "message_sent",
            timestamp: new Date().toISOString()
          }
        };
      }

      if (action === "create_channel") {
        const chanName = config.channelName || item.json?.channelName;
        console.log(`[Slack] 📢 Creating new channel #${chanName}...`);
        return { 
          ...item, 
          json: {
            ...item.json,
            channel_id: "C" + Math.random().toString(36).substring(2, 10).toUpperCase()
          }
        };
      }

      return item;
    });
  }
};
