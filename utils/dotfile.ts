import { appendFileSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { logInfo } from "./log";

const DOTFILE_NAME = ".version-resource-history";
export const addToHistory = (
  outlocation: string,
  versionName: string,
  versionTag: string
) => {
  const history = getHistory(outlocation);
  const newRecord = {
    versionName,
    versionTag
  };
  const newHistory = Array.from(new Set([newRecord, ...history]))
    .map(record => `${record.versionName},${record.versionTag}`)
    .join("\n");
  writeFileSync(path.join(outlocation, DOTFILE_NAME), newHistory);
  logInfo(`Added record of "${versionName},${versionTag}" to ${DOTFILE_NAME}`)
};

export type versionHistory = {
  versionName: string;
  versionTag: string;
}[];
export const getHistory = (outlocation: string): versionHistory => {
  try {
    const raw = readFileSync(path.join(outlocation, DOTFILE_NAME))
      .toString()
      .trim();
    return raw.split("\n").map(line => {
      const [versionName, versionTag] = line.split(",");
      return {
        versionName,
        versionTag
      };
    });
  } catch (error) {
      logInfo(`Could not find "${DOTFILE_NAME}". Interpreting as this is the first run of version-resource`)
    return [];
  }
};
