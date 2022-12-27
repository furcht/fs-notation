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
import fsn, {FsNotation} from "fs-notation";

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
let viewFiles = fsn.getGroups("view_files");
/*
{
    view_files: [
        {
            filename: "index.view.html",
            path: "./rootPath/subPath/index.view.html"
        },
        {
            filename: "button.view.html",
            path: "./rootPath/subPath/button.view.html"
        }
    ]
}
*/
```

### tree ###
Returns your folder tree in JSON format

```
const fsNotation = require("fs-notation");
let folderObj = fsNotation.getFiles("./rootPath");
/*
{
    rootPath: {
        subPath: {
            index_html: {
                filename: "index.html",
                path: "./rootPath/subPath/index.html"
            }
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
{
    js: [
        {
            filename: "formActions.js",
            path: "./rootPath/subPath/formActions.js"
        },
        {
            filename: "btnActions.js",
            path: "./rootPath/subPath/btnActions.js"
        }
    ]
}
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
{
    view_files: [
        {
            filename: "form.view.html",
            path: "./rootPath/subPath/form.view.html"
        },
        {
            filename: "button.view.html",
            path: "./rootPath/subPath/button.view.html"
        }
    ]
}
*/
```


### Log ###
- 1.0.0 - Initial Build
- 0.1.0 - First Publish