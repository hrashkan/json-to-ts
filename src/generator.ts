import fs from "fs/promises";
import axios from "axios";
import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from "quicktype-core";

export type Mode = "interface" | "type" | "both";

export async function generateTypeScript(
  input: string,
  output: string | undefined,
  mode: Mode = "interface"
) {
  const raw = input.startsWith("http")
    ? (await axios.get(input)).data
    : JSON.parse(await fs.readFile(input, "utf8"));

  const jsonInput = jsonInputForTargetLanguage("typescript");
  await jsonInput.addSource({
    name: "Root",
    samples: [JSON.stringify(raw)],
  });
  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const result = await quicktype({
    inputData,
    lang: "typescript",
    rendererOptions: { "just-types": "true" },
  });
  const ifaceLines = result.lines;

  let outLines: string[];

  if (mode === "interface") {
    outLines = ifaceLines;
  } else if (mode === "type") {
    outLines = ifaceLines.map((line) =>
      line.replace(
        /^export interface (\w+) \{/,
        (_m, name) => `export type ${name} = {`
      )
    );
  } else {
    const names = ifaceLines
      .map((l) => {
        const m = l.match(/^export interface (\w+)/u);
        return m ? m[1] : null;
      })
      .filter((n): n is string => !!n);

    const aliasLines = names.map(
      (name) => `export type ${name}Type = ${name};`
    );

    outLines = [
      ...ifaceLines,
      "",
      "// ——————————————————",
      "// Convenience type aliases",
      "// ——————————————————",
      ...aliasLines,
    ];
  }

  const out = outLines.join("\n");

  if (output) {
    await fs.writeFile(output, out);
    console.log(`✅ Written ${mode} to ${output}`);
  } else {
    console.log(out);
  }
}
