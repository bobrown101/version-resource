# version-resource
Do you have files that you want to keep track of alongside your code? "version-resource" will help you automatically version resources by name and tag, most commonly git branch and git commit hash.

## How to use
Imagine you are in a directory containing the source code for a javascript library and you have setup jsdoc to automatically generate documentation within a ./docs folder.
Run the following to automatically version the generated ./docs folder to a folder named `versionedDocs`:
```
npx version-resource --root . --source docs --out versionedDocs --pilot --versionName $(git name-rev --name-only HEAD) --versionTag $(git log --pretty=format:'%h' -n 1)
```

## Command arguments
### --root, -r
The root of your repository.
### --source, -s
The path to the resources you would like to version (relative to the --root directory). It can be a folder or a file
### --out, -o
The output folder that version-resource will maintain your resource versions (relative to the --root directory )
### --versionName, -n
The name you would like to version your resource under. Most commonly this is the git branch
### --versionTag, -t
The tag you would liket o version your resource as. Most commonly the git hash or "latest"
### --pilot, -p
If present version-resource will generate a pilot file, or an index.html file containing links to specific versions of the resource/s you are versioning. This is helpful if you would like to statically host your resources and allow for easy human navigation

## Use with other tools
The most common use case for this tool is version documentation. If this is your use case as well, and you are hosting your repository on github, take a look at the following github actions:
- https://github.com/bobrown101/version-docs
- https://github.com/bobrown101/deploy-branch

"version-docs" is a github action wrapper around version-resource that will automatically version your documentation on every commit, and push it to an indivudual branch.
If you would like to host your documentation on github pages, version-docs can handle all of your use cases, however if for some reason you cannot publish to github pages,
you can use "deploy-branch". "deploy-branch" acts exactly the same as github pages, but instead of deploying 'gh-pages' to github's internal cdn, it will deploy a branch to a third party hosting provider such as netlify