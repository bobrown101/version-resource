import { writeFileSync, readdirSync } from "fs-extra";
import path from "path";
import { versionHistory } from "./dotfile";

// interface dirTree {
//   [key: string]: any;
// }
const getFilesInDir = (path: string) =>
  readdirSync(path, { withFileTypes: true }).map(directory => directory.name);

// const directoryTree = (dirpath: string, level = 1) => {
//   if(level > 1){
//     return {}
//   }
//   const dirs = getDirectories(dirpath);
//   const result: dirTree = {};
//   dirs.forEach(dir => {
//     result[dir] = directoryTree(path.join(dirpath, dir));
//   });
//   return result;
// };

// const linksFromDirTree = (dirTree: dirTree, currentPath: string): string => {
//   const level = currentPath.split("/").length;
//   const children = Object.keys(dirTree);

//   const generateHeading = (
//     level: number,
//     currentPath: string,
//     isLink: boolean
//   ) => {
//     const folderName = currentPath.split("/").reverse()[0];
//     if (folderName === "") {
//       return "";
//     }
//     const isBranchTag = level == 2;
//     const createHTag = (content: string, num: number) => {
//       return `<h${num}>${content}</h${num}>`;
//     };
//     let heading = createHTag(`${isBranchTag ? "@" : ""}${folderName}`, level);
//     if (isLink) {
//       heading = `<a href="${currentPath}">${heading}</a>`;
//     }
//     return heading;
//   };

//   const title = generateHeading(level, currentPath, children.length === 0);
//   const content = Object.keys(dirTree)
//     .map(child =>
//       linksFromDirTree(dirTree[child], path.join(currentPath, child))
//     )
//     .join("\n");
//   return `${title}<ul>${content}</ul>`;
// };

const generateFile = (filepath: string, content: string) => {
  // const links = linksFromDirTree(dirTree, "");
  const file = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            p.center {
                text-align: center;
            }
        </style>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.css">
    </head>
    <body>
        <div class="container">
            <div class="column">${content}</div>
        </div>
        <footer>
            <div class="container">
                <div class="column">
                    <p class="center">🎉Generated with <a href="https://github.com/bobrown101/version-resource">version-resource</a> 🎉</p>
                </div>
            </div>
        </footer>
    </body>
    </html>
    `;
  writeFileSync(path.join(filepath, "index.html"), file);
};

const generateContent = (history: versionHistory, rootdir: string): string => {
  const branches: { [key: string]: Set<string> } = {};
  history.forEach(record => {
    if (record.branch in branches) {
      branches[record.branch] = branches[record.branch].add(record.commit);
    } else {
      branches[record.branch] = new Set([record.commit]);
    }
  });

  return `
  ${Object.keys(branches).map(branch => {
    return `
    <h1>${branch}</h1>
      ${Array.from(branches[branch])
        .map(commit => {
          const filesForCommit = getFilesInDir(
            path.join(rootdir, branch, commit)
          );
          return `
          <a href="${branch}/${commit}"><h3>@${commit}</h3></a>
          <ul>
            ${filesForCommit.map(file => {
              return `<li><a href="${branch}/${commit}/${file}">${file}</a></li>`;
            })}
          </ul>`;
        })
        .join("\n")}
    `;
  })}
  `;
};

export const pilot = (filepath: string, history: versionHistory) => {
  const content = generateContent(history, filepath);
  generateFile(filepath, content);
};
