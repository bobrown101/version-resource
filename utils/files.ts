import * as path from "path";
import { mkdir, rm, cp, exec } from "shelljs";
import * as emoji from "node-emoji";
import { execInFolder } from "./exec";
import { logError, logWarn } from "./log";

export const folderExistsAtPath = (path: string) => {
  const result = execInFolder(path, "ls -al");
  return result.code === 0;
};
export const removeFolderAtPath = (path: string) => {
    rm("-rf", path)
}
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

export const copyContents = (
  from: string,
  to: string,
  outFoldername: string,
  errorMsg?: string
) => {
  // use rsync instead of cp for --exclude functionaltiy
  // we need to exclude the outFoldername because if we do not
  // it will recursivly copy the out folder in an endless loop
  if (folderExistsAtPath(path.join(from, outFoldername))) {
    logWarn(
      `found output directory "${outFoldername}" in source directory "${from}". Skipping copying this as it will cause an infinite loop.`
    );
  }

  const result = exec(
    `rsync -a --progress ${from} ${to} --exclude ${outFoldername}`,
    {
      silent: true
    }
  );

  if (result.stderr) {
    logError(
      errorMsg || `versioned-resources could not find anything at ${from}`
    );
    process.exit(1);
  }
};
