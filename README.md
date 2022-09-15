# FS-Notation (Beta) #
As your app grows, we can get some complicated folder structures. Use "fs-notation" to convert your folder structure into a friendly JSON object to do as you will with your files.

## The Rundown ##
It's one thing to have an organized folder structure but the moment you need to poke around your folder tree via code, things can get a little cluttered. The goal of this project is to convert your folder tree to JSON and offer some benefits as batch processing and grouping (In Development). See below as I make my best attempt to lay things out simply.

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
import fsNotation from "fs-notation";

// vvv Now lets start calling some methods defined below vvv
```

## The Deets ##
### getFiles(rootPath) ###
Returns your folder tree in JSON format
*rootPath [STRING]* - Path to your root folder
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

### Log ###
- 0.1.0 - First Publish