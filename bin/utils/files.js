"use strict";
exports.__esModule = true;
var path = require("path");
var shelljs_1 = require("shelljs");
var exec_1 = require("./exec");
var log_1 = require("./log");
exports.folderExistsAtPath = function (path) {
    var result = exec_1.execInFolder(path, "ls -al");
    return result.code === 0;
};
// export const removeFolderAtPath = (path: string) => {
//     rm("-rf", path)
// }
exports.makeFolderAtPath = function (path, errorMsg) {
    var result = shelljs_1.mkdir("-p", path);
    if (result.code !== 0) {
        log_1.logError(errorMsg || " could not create folder at " + path);
    }
};
exports.createSourceDirPath = function (rootPath, sourceDir) {
    return path.join(rootPath, sourceDir);
};
exports.createOutDirPath = function (rootPath, outDir, gitBranch, gitHash) {
    return path.join(rootPath, outDir, gitBranch, gitHash);
};
exports.copyContents = function (from, to, errorMsg) {
    var result = shelljs_1.cp("-r", from, to);
    if (result.stderr) {
        log_1.logError(errorMsg || "versioned-resources could not find anything at " + from);
        process.exit(1);
    }
};
