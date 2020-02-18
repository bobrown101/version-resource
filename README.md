# version-resource
Do you have files that you want to keep track of alongside your code? "version-resource" will automatically version any resource into a specified folder in the format of /${output folder}/${git branch}/${git commit}

## How to use
Imagine you are in a directory containing the source code for a javascript library and you have setup jsdoc to automatically generate documentation within a ./docs folder.
Run the following to automatically version the generated ./docs folder to a folder named `versionedDocs`:
```
npx version-resource --root . --source docs --out versionedDocs --pilot
```

## Command arguments
### --root, -r
The folder your resources to be versioned are located. (Must be a child of a git repo)
### --source, -s
The path to the resources you would like to version (relative to the --root directory). It can be a folder or a file
### --out, -o
The output folder that version-resource will maintain your resource versions (relative to the --root directory )
### --pilot, -p
If present version-resource will generate a pilot file, or an index.html file containing links to specific versions of the resource/s you are versioning. This is helpful if you would like to statically host your resources and allow for easy human navigation

## Use with other tools
The most common use case for this tool is version documentation. If this is your use case as well, and you are hosting your repository on github, take a look at the following github actions:
- https://github.com/bobrown101/version-docs
- https://github.com/bobrown101/deploy-branch

"version-docs" is a github action wrapper around version-resource that will automatically version your documentation on every commit, and push it to an indivudual branch. "deploy-branch" will deploy a single git branch to a configurable hosting provider, and can be configured to deploy the single branch "version-docs" versions your documentation on.