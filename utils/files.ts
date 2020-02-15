import path from "path";
import { execInFolder } from "./exec";
import { logError, logInfo } from "./log";
import { execSync } from "child_process";
import { copySync } from "fs-extra";

export const folderExistsAtPath = (path: string) => {
  try {
    const result = execInFolder(path, "ls -al");
    return !result.includes("No such file or directory");
  } catch (error) {
    return false;
  }
};
export const removeFolderAtPath = (path: string) => {
  execSync(`rm -rf ${path}`);
};
export const makeFolderAtPath = (path: string, errorMsg?: string) => {
  try {
    execSync(`mkdir -p ${path}`);
  } catch (error) {
    logError(errorMsg || ` could not create folder at ${path}`);
    process.exit(1);
  }
};
export const createSourceDirPath = (rootPath: string, sourceDir: string) => {
  return path.join(rootPath, sourceDir);
};
export const createOutDirPath = (
  rootPath: string,
  outDir: string,
  gitBranch: string,
  gitHash: string
) => {
  return path.join(rootPath, outDir, gitBranch, gitHash);
};

export const copyContents = (from: string, to: string, errorMsg?: string) => {
  logInfo(`copying ${from} to ${to}`);
  try {
    copySync(from, path.join(to, from));
  } catch (error) {
    logError(error);
    errorMsg && logError(errorMsg);
    process.exit(1);
  }
};
