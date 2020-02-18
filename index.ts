#!/usr/bin/env node

import program from "commander";
import { getGitInfo } from "./utils/git";
import {
  createOutDirPath,
  createSourceDirPath,
  copyContents,
  folderExistsAtPath,
  removeFolderAtPath
} from "./utils/files";
import { logError, logFinished, logInfo } from "./utils/log";
import { pilot } from "./utils/pilot";
import { addToHistory, getHistory } from "./utils/dotfile";
import path from "path";

program
  .requiredOption("-r, --root <type>", "path of git repository")
  .requiredOption("-s, --source <type>", "path of resource to be versioned")
  .requiredOption("-o, --out <type>", "ouput path of versioned resources")
  .option(
    "-p, --pilot",
    "generate an index.html file at the root of the folder that allows for simple version navigation"
  );

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
  removeFolderAtPath(outPath);
  copyContents(sourcePath, outPath, `could not copy resource ${sourcePath}`);

  addToHistory(path.join(program.root, program.out), gitInfo.branch, tag)

  logFinished(
    `successfully versioned the resource ${sourcePath} at ${outPath}`
  );
};

versionResourceWithTag(gitInfo.hash);
versionResourceWithTag("latest");

if (program.pilot) {
  logInfo("Generating pilot file")
  const versionResourceHistory = getHistory(path.join(program.root, program.out))
  pilot(program.out, versionResourceHistory);
}
