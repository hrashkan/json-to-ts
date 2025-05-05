#!/usr/bin/env node
import { Command } from "commander";
import { generateTypeScript, Mode } from "./generator";

const program = new Command();
program
  .name("json-to-ts")
  .description("Generate TypeScript interfaces/types from JSON")
  .version("0.1.0")
  .requiredOption("-i, --input <path|url>", "JSON file path or URL")
  .option<Mode>(
    "-m, --mode <mode>",
    "Generation mode: interface | type | both",
    (raw: string): Mode => {
      if (raw === "interface" || raw === "type" || raw === "both") {
        return raw;
      }
      throw new Error(
        `Invalid mode “${raw}”. Must be “interface”, “type” or “both”.`
      );
    },
    "interface"
  )
  .option("-o, --output <file>", "Output TS filename (defaults to stdout)");

program.parse(process.argv);

const { input, output, mode } = program.opts<{
  input: string;
  output?: string;
  mode: Mode;
}>();

generateTypeScript(input, output, mode).catch((err) => {
  console.error("⚠️  Error:", err.message);
  process.exit(1);
});
