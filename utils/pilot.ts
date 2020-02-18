import { readdirSync, statSync, writeFileSync } from "fs-extra";
import path from "path";

interface dirTree {
  [key: string]: any;
}
const getDirectories = (path: string) =>
  readdirSync(path, { withFileTypes: true })
    .filter(directory => directory.isDirectory())
    .map(directory => directory.name);

const directoryTree = (dirpath: string) => {
  const dirs = getDirectories(dirpath);
  const result: dirTree = {};
  dirs.forEach(dir => {
    result[dir] = directoryTree(path.join(dirpath, dir));
  });
  return result;
};

const linksFromDirTree = (dirTree: dirTree, currentPath: string): string => {
  const level = currentPath.split("/").length;
  const children = Object.keys(dirTree);

  const generateHeading = (
    level: number,
    currentPath: string,
    isLink: boolean
  ) => {
    const folderName = currentPath.split("/").reverse()[0];
    if (folderName === "") {
      return "";
    }
    const isBranchTag = level == 2;
    const createHTag = (content: string, num: number) => {
      return `<h${num}>${content}</h${num}>`;
    };
    let heading = createHTag(`${isBranchTag ? "@" : ""}${folderName}`, level);
    if (isLink) {
      heading = `<a href="${currentPath}">${heading}</a>`;
    }
    return heading;
  };

  const title = generateHeading(level, currentPath, children.length === 0);
  const content = Object.keys(dirTree)
    .map(child =>
      linksFromDirTree(dirTree[child], path.join(currentPath, child))
    )
    .join("\n");
  return `${title}<ul>${content}</ul>`;
};

const generateFile = (filepath: string, dirTree: dirTree) => {
  const links = linksFromDirTree(dirTree, "");
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
            <div class="column">${links}</div>
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

export const pilot = (title: string, dir: string) => {
  const dirTree = directoryTree(dir);
  console.log(JSON.stringify(dirTree, null, 4));
  generateFile(dir, dirTree);
};
