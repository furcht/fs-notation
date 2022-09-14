# FS-Notation (Beta) #
As your app grows, we can get some complicated folder structures. Use "fs-notation" to convert your folder structure into a familiar JSON format to do what you will with your files.

## The Rundown ##
It's one thing to have an organized folder structure but the moment you need to poke around your folder tree via code, things can get a little cluttered. The goal of this project is to convert your folder tree into JSON format and offer some benefits as batch processing and grouping. So it'll convert your folder tree from "_src/templates/html/index.html" to "_src.templates.html.index_html" giving your files quick access via JSON.

## Usage ##
Install it into your app first, of course!
```
npm i fs-notation
```
Next up, just add it into your project and use away!
```
//-- slap this package into your project
const fsNotation = require("fs-notation");
//-or-//
import fsNotation from "fs-notation";

//-- call a method to get that JSON
fsNotation.getFiles("./rootPath");
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
/* Other methods defined below */
```

## The Deets ##
### getFiles("./rootPath") ###
Converts your string to Camel Case format, possibly the most common format in Javascript.
```
const st = require("string-therapy");
let newString = new st("Some String");
newString.toCamelCase(); //- Outputs: someString
```

### Log ###
- 0.1.0 - First Publish