export type BinaryData = {
  data: string; // Base64 encoded file content
  mimeType: string;
  fileName?: string;
  size?: number;
};

/**
 * The standard n8n-like data item. 
 * Everything in the engine must be an array of these.
 */
export interface IN8nDataItem {
  json: Record<string, unknown>;
  binary?: Record<string, BinaryData>;
}

export type N8nData = IN8nDataItem[];

export interface INodeExecutionResult {
  nodeId: string;
  startTime: string;
  endTime: string;
  data: {
    main: N8nData[]; // Support for multiple output ports (e.g. IF true/false)
  };
  error?: string;
  logs: string[];
}

export interface IWorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'success' | 'failed';
  startedAt: string;
  finishedAt?: string;
  data: {
    resultData: {
      runData: Record<string, INodeExecutionResult[]>;
    };
  };
}
