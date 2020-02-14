import { ensureOutput, execInFolder } from "./exec"

export const getGitInfo = (dir: string) => {
    const currentBranch = ensureOutput(execInFolder(dir, "git rev-parse --abbrev-ref HEAD"), "Could not determine current branch. Is --root referencing a git repo?")
    const currentHash = ensureOutput(execInFolder(dir, `git log -1 --format="%h"`), "Could not determine current branch. Is --root referencing a git repo?")
    return {
        branch: currentBranch,
        hash: currentHash
    }
}