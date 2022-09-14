import { readdirSync, lstatSync } from "fs";
import PathInterface from "./index";
import StringTherapy from "string-therapy";

type PathObj = {
    isDir: Boolean,
    path: string
}

export default class fsNotation implements PathInterface {
    public getFiles = (path:string):object => {
        let rootPath:string = "";
        let pathLog:object[] = [];
        let pathRoutes:string[][] = [];
        let _output:{[key:string]:any} = {};
        let fileObj:object = {};
        
        function readFiles(path:string) {
            rootPath = path;
            parseFiles(readdirSync(path));
        }
        
        function parseFiles(files:string[]) {
            let file:string, newPath!:string;
            let a:number = files.length-1
    
            // -- loop to separate a directory and file
            for(a; a>=0; a--) {
                file = files[a];
                if(/^\.+/.test(file)) continue;
                newPath = rootPath + "/" + file;
                pathLog.push({isDir: isDir(newPath), path: newPath});
            }
    
            buildRawLibrary();
        }
    
        function isDir(path:string) {
            return lstatSync(path).isDirectory();
        }
    
        function buildRawLibrary() {
            if(pathLog.length) {
                let poppedObject:any = pathLog.pop();
                let splitPaths:string[] = poppedObject.path.split("/");

                // clean path array
                if(/^\.+$/.test(splitPaths[0])) splitPaths.splice(0,1);

                // add splited path to routing log
                pathRoutes.push(splitPaths);

                // read files in directory or cylce tests again
                if(poppedObject.isDir) readFiles(poppedObject.path);
                else {
                    let pathID:StringTherapy = new StringTherapy(splitPaths.join("_"));
                    fileObj[pathID.toSnakeCase()] = poppedObject;
                    // console.log("Popped:", splitPaths[splitPaths.length-1]);
                    buildRawLibrary();
                }
            } else buildPathTree(pathRoutes);
        }
    
        function buildPathTree(pathsArray:string[][]) {
            let a:number = pathsArray.length-1;
            let pathGroup:string[];
            let tempObj:{ [key:string]: any } = _output;
            let pathID:string;
            let pathObj:PathObj;
            let endObj:object;
            let groupIndex:number;
            let filenameOG:string;
    
            for(a; a>=0; a--) {
                pathGroup = pathsArray[a];
                tempObj = _output;
                pathID = new StringTherapy(pathGroup.join("_")).toSnakeCase();
                pathObj = fileObj[pathID];
                endObj = pathObj ? {"path":pathObj.path} : {};
                groupIndex = pathGroup.length-1;
                pathGroup.forEach((fileName, index) => {
                    filenameOG = fileName;
                    fileName = new StringTherapy(fileName).toSnakeCase();
                    if(!tempObj[fileName]) {
                        endObj['filename'] = filenameOG;
                        tempObj[fileName] = (index===groupIndex) ? endObj : {};
                    }
                    tempObj = tempObj[fileName];
                });
            }
        }

        // initiate actions based on path variable
        if(isDir(path)) readFiles(path);
        else console.log('file');

        return _output;
    }
}

module.exports = new fsNotation();