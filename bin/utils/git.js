"use strict";
exports.__esModule = true;
var exec_1 = require("./exec");
exports.getGitInfo = function (dir) {
    var currentBranch = exec_1.ensureOutput(exec_1.execInFolder(dir, "git rev-parse --abbrev-ref HEAD"), "Could not determine current branch. Is --root referencing a git repo?");
    var currentHash = exec_1.ensureOutput(exec_1.execInFolder(dir, "git log -1 --format=\"%h\""), "Could not determine current branch. Is --root referencing a git repo?");
    return {
        branch: currentBranch,
        hash: currentHash
    };
};
