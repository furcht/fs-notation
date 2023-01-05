"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _FsNotation_rootPath, _FsNotation_pathLog, _FsNotation_splittedPaths, _FsNotation_allFiles, _FsNotation_groupExtensions, _FsNotation_typeExtensions, _FsNotation_rootTree, _FsNotation_typesTree, _FsNotation_groupsTree;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsNotation = void 0;
const fs_1 = require("fs");
const string_therapy_1 = __importDefault(require("string-therapy"));
class FsNotation {
    constructor(path, groups) {
        _FsNotation_rootPath.set(this, ""); //- absolute path to file (updates every cycle)
        _FsNotation_pathLog.set(this, []); //- objects of file break down "isDir", filename, etc 
        _FsNotation_splittedPaths.set(this, []); //- raw path breakdown /folder1/folder2/file -> ["folder1", "folder2", "file"]
        _FsNotation_allFiles.set(this, {}); //- file object, updates for each file
        _FsNotation_groupExtensions.set(this, {});
        _FsNotation_typeExtensions.set(this, {});
        _FsNotation_rootTree.set(this, {}); //- Final tree obejct
        _FsNotation_typesTree.set(this, {}); //- logs all types of files
        _FsNotation_groupsTree.set(this, {}); //- logs all user defined types
        if (groups)
            this.buildGroups(groups);
        if (this.isDir(path))
            this.checkFiles(path);
        else
            console.error('Path provided is not a directory.');
    }
    /* ================================= */
    /* == GETTERS ====================== */
    /* ================================= */
    /**
     * Gets the object tree of specfied path
     */
    get tree() {
        return __classPrivateFieldGet(this, _FsNotation_rootTree, "f");
    }
    /* ======================================== */
    /* == PUBLIC METHODS ====================== */
    /* ======================================== */
    /**
     * Returns an object containing any or all supported file types
     * @param name String|Array - ID of supported type (optional)
     * @returns An object with specified types in "name" or all types if "name" not provided
     */
    getTypes(name) {
        return this.parseGroups("type", name);
    }
    /**
     * Returns an object containing any or all user defined groups
     * @param name String|Array - ID of user defined group (optional)
     * @returns An object with specified types in "name" or all groups if "name" not provided
     */
    getGroups(name) {
        return this.parseGroups("group", name);
    }
    /* ========================================= */
    /* == PRIVATE METHODS ====================== */
    /* ========================================= */
    /**
     * Small helper method to get specified files
     * @param target Key to target which group to parse ("type" or "group")
     * @param name Key to target name of group
     * @returns An object containing the files from either group
     */
    parseGroups(target, name) {
        let _output = {};
        let _ref = (target == "type") ? __classPrivateFieldGet(this, _FsNotation_typesTree, "f") : __classPrivateFieldGet(this, _FsNotation_groupsTree, "f");
        if (!name)
            return _ref;
        else if (typeof name === 'string')
            name = [name];
        else if (typeof name[0] != 'string')
            return { status: false };
        let nameLength = name.length;
        if (nameLength == 1)
            _output = _ref[name[0]];
        else if (nameLength > 1) {
            name.forEach((id) => {
                if (_ref[id])
                    _output[id] = _ref[id];
            });
        }
        else
            _output = { "Status": "Nothing found" };
        return _output;
    }
    //-- Builds a new object to organize each group by name
    buildGroups(groups) {
        let groupID;
        groups.forEach((obj) => {
            if (!obj.ext)
                return;
            //-- create a group id for files to be referenced
            groupID = (0, string_therapy_1.default)(obj.name);
            __classPrivateFieldGet(this, _FsNotation_groupsTree, "f")[groupID.toSnakeCase] = [];
            //-- add "." if missing in beginning
            if (!/^\./.test(obj.ext))
                obj.ext = "." + obj.ext;
            //-- builds a dictionary to target the file group
            __classPrivateFieldGet(this, _FsNotation_groupExtensions, "f")[(0, string_therapy_1.default)(obj.ext).toSnakeCase] = groupID.toSnakeCase;
        });
    }
    //-- test if path is directory or file
    isDir(path) {
        //- tests a path if directory or file
        return (0, fs_1.lstatSync)(path).isDirectory();
    }
    // >>>>>>>>>><<<<<<<<<< //
    // >>> CORE METHODS <<< //
    // >>>>>>>>>><<<<<<<<<< //
    //-- begin cycle of checking each file in each directory
    checkFiles(path) {
        /*
            Begins chain of events beginning by
            defining the "rootPath" and triggering "parseFiles"
            with directory array from "readdirSync"
        */
        let files = (0, fs_1.readdirSync)(path); //- ['filename1', 'filename2', 'dirName']
        let file, fullPath, splitRoute;
        let a = files.length - 1;
        __classPrivateFieldSet(this, _FsNotation_rootPath, path, "f");
        /*
            Parse every file in directory and
            tests whether it's a file or directory and
            places it's results into an object array "pathLog"
            Triggers "buildRawLibrary" when done
        */
        for (a; a >= 0; a--) {
            file = files[a];
            if (/^\.+/.test(file))
                continue; //-- bypass hidden files (MacOS)
            fullPath = __classPrivateFieldGet(this, _FsNotation_rootPath, "f") + "/" + file;
            splitRoute = fullPath.split("/");
            // console.log(splitRoute);
            if (/^\.+$/.test(splitRoute[0]))
                splitRoute.splice(0, 1); //-- remove "./" from beginning
            __classPrivateFieldGet(this, _FsNotation_pathLog, "f").push({
                isDir: this.isDir(fullPath),
                filename: file,
                path: fullPath,
                splitPath: splitRoute
            });
        }
        this.buildRawLibrary();
    }
    //-- builds out a raw structure for building out final path tree
    buildRawLibrary() {
        /*
            Parse path object "pathLog" to build out a raw
            library in Array form.
        */
        if (__classPrivateFieldGet(this, _FsNotation_pathLog, "f").length) {
            let pathObj = __classPrivateFieldGet(this, _FsNotation_pathLog, "f").pop();
            let baseObj = {
                "filename": pathObj.filename,
                "path": pathObj.path
            };
            // add splited path to routing log
            __classPrivateFieldGet(this, _FsNotation_splittedPaths, "f").push(pathObj.splitPath);
            // read files in directory or cylce tests again depending on "isDir"
            if (pathObj.isDir)
                this.checkFiles(pathObj.path);
            else {
                //-- get file type by extension
                let typeRegex = /\.[a-z0-9]+$/;
                let typeExtension = pathObj.filename.match(typeRegex)[0];
                let typeExtensionID = (0, string_therapy_1.default)(typeExtension.slice(1)).toSnakeCase;
                if (!__classPrivateFieldGet(this, _FsNotation_typeExtensions, "f")[typeExtensionID]) {
                    if (!__classPrivateFieldGet(this, _FsNotation_typesTree, "f")[typeExtensionID])
                        __classPrivateFieldGet(this, _FsNotation_typesTree, "f")[typeExtensionID] = [];
                    __classPrivateFieldGet(this, _FsNotation_typesTree, "f")[typeExtensionID].push(baseObj);
                }
                //-- set file group by group extension
                let groupRegex = /\..+/;
                let groupExtension = pathObj.filename.match(groupRegex)[0];
                let groupExtensionID = (0, string_therapy_1.default)(groupExtension.slice(1)).toSnakeCase;
                if (__classPrivateFieldGet(this, _FsNotation_groupExtensions, "f")[groupExtensionID])
                    __classPrivateFieldGet(this, _FsNotation_groupsTree, "f")[__classPrivateFieldGet(this, _FsNotation_groupExtensions, "f")[groupExtensionID]].push(baseObj);
                //-- store all files into "fileObj" using the full path as an ID
                let pathID = (0, string_therapy_1.default)(pathObj.splitPath.join("_"));
                __classPrivateFieldGet(this, _FsNotation_allFiles, "f")[pathID.toSnakeCase] = pathObj;
                this.buildRawLibrary();
            }
        }
        else
            this.buildPathTree();
    }
    //-- build object tree after all files been parsed
    buildPathTree() {
        /*
            Taking the raw path array
        */
        let a = __classPrivateFieldGet(this, _FsNotation_splittedPaths, "f").length - 1;
        let splittedPath;
        let tempOutput = __classPrivateFieldGet(this, _FsNotation_rootTree, "f");
        let pathID;
        let pathObj;
        let endObj;
        let groupIndex;
        let filenameOG;
        for (a; a >= 0; a--) {
            splittedPath = __classPrivateFieldGet(this, _FsNotation_splittedPaths, "f")[a]; // ['folder','folder2','file']
            tempOutput = __classPrivateFieldGet(this, _FsNotation_rootTree, "f");
            pathID = (0, string_therapy_1.default)(splittedPath.join("_")).toSnakeCase; // folder_folder2_file
            pathObj = __classPrivateFieldGet(this, _FsNotation_allFiles, "f")[pathID];
            endObj = pathObj ? { "path": pathObj.path } : {};
            groupIndex = splittedPath.length - 1;
            splittedPath.forEach((fileName, index) => {
                if (index != 0) {
                    filenameOG = fileName;
                    fileName = (0, string_therapy_1.default)(fileName).toSnakeCase;
                    if (!tempOutput[fileName]) {
                        endObj['filename'] = filenameOG;
                        tempOutput[fileName] = (index === groupIndex) ? endObj : {};
                    }
                    tempOutput = tempOutput[fileName];
                }
            });
        }
    }
}
exports.FsNotation = FsNotation;
_FsNotation_rootPath = new WeakMap(), _FsNotation_pathLog = new WeakMap(), _FsNotation_splittedPaths = new WeakMap(), _FsNotation_allFiles = new WeakMap(), _FsNotation_groupExtensions = new WeakMap(), _FsNotation_typeExtensions = new WeakMap(), _FsNotation_rootTree = new WeakMap(), _FsNotation_typesTree = new WeakMap(), _FsNotation_groupsTree = new WeakMap();
function Init(path, group) {
    return new FsNotation(path, group);
}
exports.default = Init;
module.exports = Init;
