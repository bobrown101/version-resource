"use strict";
exports.__esModule = true;
var shelljs_1 = require("shelljs");
exports.execInFolder = function (folder, command) {
    return shelljs_1.exec("cd " + folder + " && " + command, {
        silent: true
    });
};
exports.ensureOutput = function (execResponse, errorString) {
    if (errorString === void 0) { errorString = "Command did not succeed"; }
    var out = execResponse.stdout.trim();
    if (out === "") {
        console.error(errorString);
        process.exit(1);
    }
    return out;
};
