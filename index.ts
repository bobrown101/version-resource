#!/usr/bin/env node

import program from "commander";
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
  .requiredOption("-n, --versionName <type>", "the name you would like to version the resource under - a git branch name maybe?")
  .requiredOption("-t, --versionTag <type>", "the tag you would like to version the resource under - a git commit hash maybe?")
  .requiredOption("-r, --root <type>", "the root directory containing the --source and --out directories")
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

const sourcePath = createSourceDirPath(program.root, program.source);
const versionName = program.versionName
const verionTag = program.versionTag

const versionResource = (versionName: string, versionTag: string) => {
  const outPath = createOutDirPath(
    program.root,
    program.out,
    versionName,
    versionTag
  );
  removeFolderAtPath(outPath);
  copyContents(sourcePath, outPath, `could not copy resource ${sourcePath}`);

  addToHistory(path.join(program.root, program.out), versionName, versionTag)

  logFinished(
    `successfully versioned the resource ${sourcePath} at ${outPath}`
  );
};

versionResource(versionName, verionTag);

if (program.pilot) {
  logInfo("Generating pilot file")
  const versionResourceHistory = getHistory(path.join(program.root, program.out))
  pilot(program.out, versionResourceHistory);
}
