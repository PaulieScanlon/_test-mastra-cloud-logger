import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

const step1 = createStep({
  id: "step-1",
  description: "passes value from input to agent",
  inputSchema: z.object({
    city: z.string()
  }),
  outputSchema: z.object({
    facts: z.string()
  }),
  execute: async ({ inputData, mastra }) => {
    const { city } = inputData;

    const logger = mastra.getLogger();

    const agent = mastra.getAgent("cityAgent");
    const response = await agent.generate(`Create an interesting fact about ${city}`);

    if (!agent) {
      logger.error("This is an error log");
    }

    logger.info("This is an info log");

    return {
      facts: response.text
    };
  }
});

export const callAgent = createWorkflow({
  id: "agent-workflow",
  inputSchema: z.object({
    city: z.string()
  }),
  outputSchema: z.object({
    facts: z.string()
  })
})
  .then(step1)
  .commit();
