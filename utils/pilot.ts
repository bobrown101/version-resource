import { writeFileSync, readdirSync } from "fs-extra";
import path from "path";
import { versionHistory } from "./dotfile";

const getFilesInDir = (path: string) =>
  readdirSync(path, { withFileTypes: true }).map(directory => directory.name);

const generateFile = (filepath: string, content: string) => {
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
  const versionNames: { [key: string]: Set<string> } = {};
  history.forEach(record => {
    if (record.versionName in versionNames) {
      versionNames[record.versionName] = versionNames[record.versionName].add(
        record.versionTag
      );
    } else {
      versionNames[record.versionName] = new Set([record.versionTag]);
    }
  });

  return `
  ${Object.keys(versionNames).map(branch => {
    return `
    <h1>${branch}</h1>
      ${Array.from(versionNames[branch])
        .map(versionTag => {
          const filesForCommit = getFilesInDir(
            path.join(rootdir, branch, versionTag)
          );
          return `
          <a href="${branch}/${versionTag}"><h3>@${versionTag}</h3></a>
          <ul>
            ${filesForCommit.map(file => {
              return `<li><a href="${branch}/${versionTag}/${file}">${file}</a></li>`;
            })}
          </ul>`;
        })
        .join("\n")}
    `;
  }).join("\n")}
  `;
};

export const pilot = (filepath: string, history: versionHistory) => {
  const content = generateContent(history, filepath);
  generateFile(filepath, content);
};
