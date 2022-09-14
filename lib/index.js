"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const string_therapy_1 = __importDefault(require("string-therapy"));
class fsNotation {
    constructor() {
        this.getFiles = (path) => {
            let rootPath = "";
            let pathLog = [];
            let pathRoutes = [];
            let _output = {};
            let fileObj = {};
            function readFiles(path) {
                rootPath = path;
                parseFiles((0, fs_1.readdirSync)(path));
            }
            function parseFiles(files) {
                let file, newPath;
                let a = files.length - 1;
                // -- loop to separate a directory and file
                for (a; a >= 0; a--) {
                    file = files[a];
                    if (/^\.+/.test(file))
                        continue;
                    newPath = rootPath + "/" + file;
                    pathLog.push({ isDir: isDir(newPath), path: newPath });
                }
                buildRawLibrary();
            }
            function isDir(path) {
                return (0, fs_1.lstatSync)(path).isDirectory();
            }
            function buildRawLibrary() {
                if (pathLog.length) {
                    let poppedObject = pathLog.pop();
                    let splitPaths = poppedObject.path.split("/");
                    // clean path array
                    if (/^\.+$/.test(splitPaths[0]))
                        splitPaths.splice(0, 1);
                    // add splited path to routing log
                    pathRoutes.push(splitPaths);
                    // read files in directory or cylce tests again
                    if (poppedObject.isDir)
                        readFiles(poppedObject.path);
                    else {
                        let pathID = new string_therapy_1.default(splitPaths.join("_"));
                        fileObj[pathID.toSnakeCase()] = poppedObject;
                        // console.log("Popped:", splitPaths[splitPaths.length-1]);
                        buildRawLibrary();
                    }
                }
                else
                    buildPathTree(pathRoutes);
            }
            function buildPathTree(pathsArray) {
                let a = pathsArray.length - 1;
                let pathGroup;
                let tempObj = _output;
                let pathID;
                let pathObj;
                let endObj;
                let groupIndex;
                let filenameOG;
                for (a; a >= 0; a--) {
                    pathGroup = pathsArray[a];
                    tempObj = _output;
                    pathID = new string_therapy_1.default(pathGroup.join("_")).toSnakeCase();
                    pathObj = fileObj[pathID];
                    endObj = pathObj ? { "path": pathObj.path } : {};
                    groupIndex = pathGroup.length - 1;
                    pathGroup.forEach((fileName, index) => {
                        filenameOG = fileName;
                        fileName = new string_therapy_1.default(fileName).toSnakeCase();
                        if (!tempObj[fileName]) {
                            endObj['filename'] = filenameOG;
                            tempObj[fileName] = (index === groupIndex) ? endObj : {};
                        }
                        tempObj = tempObj[fileName];
                    });
                }
            }
            // initiate actions based on path variable
            if (isDir(path))
                readFiles(path);
            else
                console.log('file');
            return _output;
        };
    }
}
exports.default = fsNotation;
module.exports = new fsNotation();
