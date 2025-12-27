import { QSTASH_URL, QSTASH_TOKEN } from "./env.js";
import { Client as WorkflowClient } from "@upstash/workflow";

export const workflowClient = new WorkflowClient({
  baseUrl: QSTASH_URL,
  token: QSTASH_TOKEN,
});
