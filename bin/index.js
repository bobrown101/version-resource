#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var program = require("commander");
var emoji = require("node-emoji");
var git_1 = require("./utils/git");
var files_1 = require("./utils/files");
var log_1 = require("./utils/log");
program
    .requiredOption("-r, --root <type>", "path of git repository")
    .requiredOption("-s, --source <type>", "path of resource to be versioned")
    .requiredOption("-o, --out <type>", "ouput path of versioned resources");
program.parse(process.argv);
var rootExists = files_1.folderExistsAtPath(program.root);
if (!rootExists) {
    log_1.logError("root folder " + program.root + " does not exist");
    process.exit(1);
}
var gitInfo = git_1.getGitInfo(program.out);
var sourcePath = files_1.createSourceDirPath(program.root, program.source);
var outPath = files_1.createOutDirPath(program.root, program.out, gitInfo.branch, gitInfo.hash);
files_1.makeFolderAtPath(outPath);
files_1.copyContents(sourcePath, outPath, "could not copy resource " + sourcePath);
console.log(emoji.get("factory") + "    Successfully versioned the resource " + sourcePath + " at " + outPath);
