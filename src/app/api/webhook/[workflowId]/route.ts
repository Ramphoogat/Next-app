import { NextResponse } from 'next/server';
import { N8nExecutionEngine } from '@/workflow/execution/engine';
import { TemplateEngine } from '@/workflow/generator/templateEngine';

/**
 * Global Webhook Receiver for Workflow Executions
 */
export async function POST(req: Request, { params }: { params: Promise<{ workflowId: string }> }) {
  try {
    const { workflowId } = await params;
    const body = await req.json();

    console.log(`📡 [Webhook API] Received payload for workflow: ${workflowId}`);

    // In a real system, you'd fetch the IWorkflow object from MongoDB/Supabase using the ID
    // const workflow = await db.workflows.findById(workflowId);
    
    // For demo, we auto-generate a generic one to show execution running
    const mockWorkflow = TemplateEngine.generateTriggerActionTemplate("webhook", "receive_webhook", "http_request", "make_request");
    
    if (!mockWorkflow) {
      return NextResponse.json({ error: "Failed to load workflow" }, { status: 500 });
    }

    mockWorkflow._id = workflowId;
    mockWorkflow.name = `Triggered Workflow ${workflowId}`;

    console.log(`⚙️ [Webhook API] Handing over to ExecutionEngine...`);

    // Let the Execution Engine run the workflow asynchronously!
    // We pass the incoming webhook payload directly into the `initialMetadata`
    const executionResult = await N8nExecutionEngine.executeWorkflow(mockWorkflow, [{ 
      json: body 
    }]);

    // Return the detailed logs out to the webhook caller
    return NextResponse.json({
      success: executionResult.status === 'success',
      status: executionResult.status,
      finalOutput: executionResult.data,
      executionLogs: executionResult.logs
    }, { status: 200 });

  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`🚨 [Webhook API] Error processing webhook:`, errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
