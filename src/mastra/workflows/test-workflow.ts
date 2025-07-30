import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

const step1 = createStep({
  id: "step-1",
  inputSchema: z.object({
    input: z.string()
  }),
  outputSchema: z.object({
    output: z.string()
  }),
  execute: async ({ inputData, mastra }) => {
    const { input } = inputData;

    const logger = mastra.getLogger();

    const agent = mastra.getAgent("testAgent");

    if (!agent) {
      logger.error("workflow error log");
      return { output: "Agent not found" };
    }

    const response = await agent.generate(`Create an interesting fact about ${input}`);

    logger.info("workflow info log");

    return {
      output: response.text
    };
  }
});

export const testWorkflow = createWorkflow({
  id: "test-workflow",
  inputSchema: z.object({
    input: z.string()
  }),
  outputSchema: z.object({
    output: z.string()
  })
})
  .then(step1)
  .commit();
