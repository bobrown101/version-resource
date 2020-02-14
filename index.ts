import {exec, ShellString} from "shelljs"
import * as program from "commander"

program
  .option('-d, --dir <type>', 'directory of git repository')

program.parse(process.argv);

const execInFolder = (folder: string, command: string) => {
    return exec(`cd ${folder} && ${command}`, {
        silent: true
    })
}

const ensureOutput = (execResponse: ShellString, errorString = "Command did not succeed") => {
    const out = execResponse.stdout.trim()
    if(out === ""){
        throw new Error(errorString)
    }
    return out
}

const currentBranch = ensureOutput(execInFolder(program.dir, "git rev-parse --abbrev-ref HEAD"))

console.log(currentBranch)