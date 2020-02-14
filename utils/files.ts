import * as path from "path";
import { mkdir, rm, cp } from "shelljs";
import * as emoji from "node-emoji";
import { execInFolder } from "./exec";
import { logError } from "./log";

export const folderExistsAtPath = (path: string) => {
  const result = execInFolder(path, "ls -al");
  return result.code === 0;
};
// export const removeFolderAtPath = (path: string) => {
//     rm("-rf", path)
// }
export const makeFolderAtPath = (path: string, errorMsg?: string) => {
  const result = mkdir("-p", path);
  if (result.code !== 0) {
    logError(errorMsg || ` could not create folder at ${path}`);
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
  const result = cp("-r", from, to);
  if (result.stderr) {
    logError(errorMsg || `versioned-resources could not find anything at ${from}`);
    process.exit(1);
  }
};
