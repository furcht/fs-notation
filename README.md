# FS-Notation #
As your app grows, we can get some complicated folder structures. Use "fs-notation" to convert your folder structure into a friendly JSON object to do as you will with your files.

## The Rundown ##
It's one thing to have an organized folder structure but then there are times where you just need to gain access to certain files to meet the goal of your awesome app. FsNotation can help bring certain files you created to the front and center of your app with little effort. This script will organize your files based on file extensions in general or you can create your ruleset based on your naming conventions. 

## Usage ##
Install it into your app, of course!
```
npm i fs-notation
```
Now lets add it to your project for some good use!
```
//-- slap this package into your project
const fsNotation = require("fs-notation");
//-or-//
import fsn from "fs-notation";
//-Import type for Typescript Use-//
import { FsNotation } from "fs-notation/lib/FsNotation"; //- Typescript Use
let sourceFiles:FsNotation = fsn("/rootDir");

//-- initiate the app with your directory
let sourceFiles = fsn("./_src");

/* vvv Now lets start calling some methods defined below vvv */
```

## The Deets ##
### constructor ###
Initiates the process of building out your groups and folder tree.

*rootPath [STRING]* - Path to your root folder
*groups [ARRAY][OPTIONAL]* - Path to your root folder
```
const fsNotation = require("fs-notation");
let fsn = fsNotation("./_sourceFiles", [
    {
        name: "view files", //- spaces will be converted to underscores
        ext: ".view.html"
    },
    {
        name: "model files",
        ext: ".model.js"
    }
]);
let viewFiles = fsn.getGroups(["view_files", model_files]);
/*
{
    view_files: [
        {
            filename: "index.view.html",
            path: "./rootPath/subPath/index.view.html",
            _isFile_: true
        },
        {
            filename: "button.view.html",
            path: "./rootPath/subPath/button.view.html",
            _isFile_: true
        }
    ],
    model_files: [
        {
            filename: "index.model.js",
            path: "./rootPath/subPath/index.model.js",
            _isFile_: true
        },
        {
            filename: "button.model.js",
            path: "./rootPath/subPath/button.model.js",
            _isFile_: true
        }
    ]
}
*/
```

### tree ###
Returns your folder tree in JSON format

```
const fsNotation = require("fs-notation");
let sourceFiles = fsNotation("./rootPath");
let sourceTree = sourceFiles.tree;
/*
{
    subFolder: {
        index_html: {
            filename: "index.html",
            path: "./rootPath/subPath/index.html",
            _isFile_: true
        }
    }
}
*/
```

### getTypes(extension) ###
Returns an array of files of your choice

*extension [STRING][OPTIONAL]* - Extension of file(s) you wan't to return. No value will return all files.
```
const fsn = require("fs-notation");
let sourceFiles = fsn("./_source");

let jsFiles = fsn.getTypes("js"); //-- Return all Javascript files ending with ".js" (EXAMPLE BELOW)

let frontEndFiles = fsn.getTypes(["js","css"]); //-- Return all Javascript (.js) and CSS (.css) files

let allFiles = fsn.getTypes(); //-- Return all files found within the root path

/*
//-- OUTPUT EXAMPLE --//
[
    {
        filename: "formActions.js",
        path: "./rootPath/subPath/formActions.js",
        _isFile_: true
    },
    {
        filename: "btnActions.js",
        path: "./rootPath/subPath/btnActions.js",
        _isFile_: true
    }
]
*/
```

### getGroups(name) ###
Returns an array of files of your choice

*name [STRING][OPTIONAL]* - Name of user defined group decared in constructor. No value will return all groups.
```
const fsn = require("fs-notation");
let sourceFiles = fsn("./_source");

let jsFiles = fsn.getGroups("view_files"); //-- Return all defined "view_files" (EXAMPLE BELOW)

let frontEndFiles = fsn.getGroups(["view_files","model_files"]); //-- Return all "view_files" and "model_files" files

let allFiles = fsn.getGroups(); //-- Return all files found within the root path

/*
//-- OUTPUT EXAMPLE --//
[
    {
        filename: "form.view.html",
        path: "./rootPath/subPath/form.view.html",
        _isFile_: true
    },
    {
        filename: "button.view.html",
        path: "./rootPath/subPath/button.view.html",
        _isFile_: true
    }
]
*/
```


### Log ###
- 1.3.0 - Updated output to include "\_isFile\_"
- 1.2.0 - Typescript Optimization
- 1.1.1 - Updated a README error
- 1.1.0 - Cleaned up the Returns
- 1.0.1 - Meta data updates
- 1.0.0 - Initial Build
- 0.1.0 - First Publish