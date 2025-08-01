import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const testAgent = new Agent({
  name: "test-agent",
  description: "Create facts for a city",
  instructions: `Return an interesting fact based on the city provided`,
  model: openai("gpt-4o")
});
