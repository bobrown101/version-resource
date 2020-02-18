import { appendFileSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { logInfo } from "./log";

const DOTFILE_NAME = ".version-resource-history";
export const addToHistory = (
  outlocation: string,
  branch: string,
  hash: string
) => {
  const history = getHistory(outlocation);
  const newRecord = {
    branch,
    commit: hash
  };
  const newHistory = Array.from(new Set([...history, newRecord]))
    .map(record => `${record.branch},${record.commit}`)
    .join("\n");
  writeFileSync(path.join(outlocation, DOTFILE_NAME), newHistory);
  logInfo(`Added record of "${branch},${hash}" to ${DOTFILE_NAME}`)
};

export type versionHistory = {
  branch: string;
  commit: string;
}[];
export const getHistory = (outlocation: string): versionHistory => {
  try {
    const raw = readFileSync(path.join(outlocation, DOTFILE_NAME))
      .toString()
      .trim();
    return raw.split("\n").map(line => {
      const [branch, commit] = line.split(",");
      return {
        branch,
        commit
      };
    });
  } catch (error) {
      logInfo(`Could not find "${DOTFILE_NAME}". Interpreting as this is the first run of version-resource`)
    return [];
  }
};
