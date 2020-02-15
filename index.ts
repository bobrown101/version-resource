#!/usr/bin/env node

import * as program from "commander";
import * as emoji from "node-emoji";
import { getGitInfo } from "./utils/git";
import {
  createOutDirPath,
  makeFolderAtPath,
  createSourceDirPath,
  copyContents,
  folderExistsAtPath,
  removeFolderAtPath
} from "./utils/files";
import { logError, logFinished } from "./utils/log";

program
  .requiredOption("-r, --root <type>", "path of git repository")
  .requiredOption("-s, --source <type>", "path of resource to be versioned")
  .requiredOption("-o, --out <type>", "ouput path of versioned resources");

program.parse(process.argv);

const rootExists = folderExistsAtPath(program.root);
if (!rootExists) {
  logError(`root folder ${program.root} does not exist`);
  process.exit(1);
}
const gitInfo = getGitInfo(program.root);
const sourcePath = createSourceDirPath(program.root, program.source);

const versionResourceWithTag = (tag: string) => {
  const outPath = createOutDirPath(
    program.root,
    program.out,
    gitInfo.branch,
    tag
  );
  removeFolderAtPath(outPath)
  makeFolderAtPath(outPath);
  copyContents(
    sourcePath,
    outPath,
    program.out,
    `could not copy resource ${sourcePath}`
  );
  
  logFinished(`successfully versioned the resource ${sourcePath} at ${outPath}`)
}

versionResourceWithTag(gitInfo.hash)
versionResourceWithTag("latest")



