import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
// import { LibSQLStore } from "@mastra/libsql";
import { VercelDeployer } from "@mastra/deployer-vercel";
import { testAgent } from "./agents/test-agent";
import { testWorkflow } from "./workflows/test-workflow";

export const mastra = new Mastra({
  workflows: { testWorkflow },
  agents: { testAgent },
  // storage: new LibSQLStore({
  //   // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
  //   url: ":memory:"
  // }),
  deployer: new VercelDeployer(),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info"
  })
});
