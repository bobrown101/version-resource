import { execSync } from "child_process";

export const execInFolder = (folder: string, command: string) => {
  return execSync(`cd ${folder} && ${command}`).toString();
};

export const ensureOutput = (
  response: string,
  errorString = "Command did not succeed"
) => {
  const out = response.trim();
  if (out === "") {
    console.error(errorString);
    process.exit(1);
  }
  return out;
};
