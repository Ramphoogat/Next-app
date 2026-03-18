import { gmailExecutor } from '@/workflow/execution/executors/gmail';
import { stripeExecutor } from '@/workflow/execution/executors/stripe';
import { slackExecutor } from '@/workflow/execution/executors/slack';
import { httpRequestExecutor } from '@/workflow/execution/executors/http_request';
import { ifExecutor } from '@/workflow/execution/executors/if';
import { mergeExecutor } from '@/workflow/execution/executors/merge';
import { NodeExecutor } from '@/workflow/execution/types';

const executors: Record<string, NodeExecutor> = {
  gmail: gmailExecutor,
  stripe: stripeExecutor,
  slack: slackExecutor,
  http_request: httpRequestExecutor,
  if: ifExecutor,
  merge: mergeExecutor,
};

/**
 * Returns the executor associated with a nodeId
 * @param nodeId e.g., "gmail", "stripe"
 */
export function getExecutor(nodeId: string): NodeExecutor | undefined {
  return executors[nodeId];
}