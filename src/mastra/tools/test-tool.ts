import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const testTool = createTool({
  id: "test-tool",
  description: "Reverse the input string",
  inputSchema: z.object({
    input: z.string()
  }),
  outputSchema: z.object({
    output: z.string()
  }),
  execute: async ({ context, mastra }) => {
    const { input } = context;

    const logger = mastra?.getLogger();

    const reversed = input.split("").reverse().join("");

    logger?.info("tool info log");

    return {
      output: reversed
    };
  }
});
