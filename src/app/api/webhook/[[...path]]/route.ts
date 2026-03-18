import { NextRequest, NextResponse } from 'next/server';
// In a real implementation, you would fetch the workflow from your DB
// and use the N8nExecutionEngine to run it.

/**
 * Dynamic Webhook Endpoint
 * /api/webhook/[[...path]]/route.ts
 * 
 * This accepts:
 * POST /api/webhook/{workflowId}/{nodeId}
 */
export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const path = params.path || [];
    const workflowId = path[0];
    const nodeId = path[1];

    if (!workflowId) {
      return NextResponse.json({ error: 'Missing workflowId' }, { status: 400 });
    }

    // Capture payload
    const body = await req.json().catch(() => ({}));
    const headers = Object.fromEntries(req.headers);
    const query = Object.fromEntries(new URL(req.url).searchParams);

    // Prepare n8n-compatible data input
    const triggerData = [{
      json: {
        body,
        headers,
        query,
        timestamp: new Date().toISOString()
      }
    }];

    // LOGIC:
    // 1. Fetch Workflow from MongoDB by ID
    // 2. Determine if it's active
    // 3. Trigger N8nExecutionEngine
    // 
    // For now, returning success and the dummy trigger data
    
    console.log(`[Flow] Webhook triggered for Workflow: ${workflowId}, Node: ${nodeId || 'any'}`);

    return NextResponse.json({ 
      status: 'success', 
      message: 'Workflow triggered', 
      received: triggerData 
    });

  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// Support for GET webhooks (polling or simple pings)
export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path || [];
  return NextResponse.json({ 
    status: 'online', 
    workflowId: path[0],
    message: 'Webhook endpoint ready. Use POST for production data.'
  });
}
