import FsInterface from "./index.d";
import { readdirSync, lstatSync } from "fs";
import _st, {StringTherapy} from "string-therapy";

type GroupEntry = {
    name: string,
    ext: string
}

export class FsNotation implements FsInterface {
    #rootPath:string = ""; //- absolute path to file (updates every cycle)
    #pathLog:object[] = []; //- objects of file break down "isDir", filename, etc 
    #splittedPaths:string[][] = []; //- raw path breakdown /folder1/folder2/file -> ["folder1", "folder2", "file"]
    #allFiles:object = {}; //- file object, updates for each file

    #groupExtensions:object = {};
    #typeExtensions:object = {};

    #rootTree:object = {}; //- Final tree obejct
    #typesTree:object = {}; //- logs all types of files
    #groupsTree:object = {}; //- logs all user defined types

    constructor(path:string, groups?:Array<GroupEntry>) {
        if(groups) this.buildGroups(groups);

        if(this.isDir(path)) this.checkFiles(path);
        else console.error('Path provided is not a directory.');
    }

    /* ================================= */
    /* == GETTERS ====================== */
    /* ================================= */

    /**
     * Gets the object tree of specfied path
     */
    get tree() {
        return this.#rootTree;
    }

    /* ======================================== */
    /* == PUBLIC METHODS ====================== */
    /* ======================================== */

    /**
     * Returns an object containing any or all supported file types
     * @param name String|Array - ID of supported type (optional)
     * @returns An object with specified types in "name" or all types if "name" not provided
     */
    public getTypes(name?:string[]):object {
        return this.parseGroups("type", name);
    }

    /**
     * Returns an object containing any or all user defined groups
     * @param name String|Array - ID of user defined group (optional)
     * @returns An object with specified types in "name" or all groups if "name" not provided
     */
    public getGroups(name?:string[]):object {
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
    private parseGroups(target:string, name?:Array<string>):object {
        let _output:object = {};
        let _ref:object = (target == "type") ? this.#typesTree : this.#groupsTree;
        
        if(!name) return _ref;
        else if(typeof name === 'string') name = [name];
        else if(typeof name![0] != 'string') return { status: false };

        let nameLength:number = name.length;
        
        if(nameLength==1) _output = _ref[name[0]];
        else if(nameLength > 1) {
            name.forEach((id) => {
                if(_ref[id]) _output[id] = _ref[id];
            });
        } else _output = {"Status": "Nothing found"};

        return _output;
    }

    //-- Builds a new object to organize each group by name
    private buildGroups(groups:Array<GroupEntry>):void {
        let groupID:StringTherapy;

        groups.forEach((obj) => {
            if(!obj.ext) return;

            //-- create a group id for files to be referenced
            groupID = _st(obj.name);
            this.#groupsTree[groupID.toSnakeCase] = [];

            //-- add "." if missing in beginning
            if(!/^\./.test(obj.ext)) obj.ext = "." + obj.ext;

            //-- builds a dictionary to target the file group
            this.#groupExtensions[_st(obj.ext).toSnakeCase] = groupID.toSnakeCase;
        });
    }

    //-- test if path is directory or file
    private isDir(path:string):boolean {
        //- tests a path if directory or file
        return lstatSync(path).isDirectory();
    }

    // >>>>>>>>>><<<<<<<<<< //
    // >>> CORE METHODS <<< //
    // >>>>>>>>>><<<<<<<<<< //

    //-- begin cycle of checking each file in each directory
    private checkFiles(path:string):void {
        /*
            Begins chain of events beginning by
            defining the "rootPath" and triggering "parseFiles"
            with directory array from "readdirSync"
        */
        let files:string[] = readdirSync(path); //- ['filename1', 'filename2', 'dirName']
        let file:string, fullPath!:string, splitRoute:string[];
        let a:number = files.length-1
        this.#rootPath = path;

        /*
            Parse every file in directory and
            tests whether it's a file or directory and
            places it's results into an object array "pathLog"
            Triggers "buildRawLibrary" when done
        */
        for(a; a>=0; a--) {
            file = files[a];
            if(/^\.+/.test(file)) continue; //-- bypass hidden files (MacOS)
            fullPath = this.#rootPath + "/" + file;
            splitRoute = fullPath.split("/");
            // console.log(splitRoute);

            if(/^\.+$/.test(splitRoute[0])) splitRoute.splice(0,1); //-- remove "./" from beginning

            this.#pathLog.push({
                isDir: this.isDir(fullPath),
                filename: file,
                path: fullPath,
                splitPath: splitRoute
            });
        }

        this.buildRawLibrary();
    }

    //-- builds out a raw structure for building out final path tree
    private buildRawLibrary():void {
        /*
            Parse path object "pathLog" to build out a raw
            library in Array form.
        */
        if(this.#pathLog.length) {
            let pathObj:any = this.#pathLog.pop();
            let baseObj:object = {
                "filename": pathObj.filename,
                "path": pathObj.path
            }

            // add splited path to routing log
            this.#splittedPaths.push(pathObj.splitPath);

            // read files in directory or cylce tests again depending on "isDir"
            if(pathObj.isDir) this.checkFiles(pathObj.path);
            else {
                //-- get file type by extension
                let typeRegex:RegExp = /\.[a-z0-9]+$/;
                let typeExtension:string = pathObj.filename.match(typeRegex)![0];
                let typeExtensionID:string = _st(typeExtension.slice(1)).toSnakeCase;
                if(!this.#typeExtensions[typeExtensionID]) {
                    if(!this.#typesTree[typeExtensionID]) this.#typesTree[typeExtensionID] = [];
                    this.#typesTree[typeExtensionID].push(baseObj);
                }

                //-- set file group by group extension
                let groupRegex:RegExp = /\..+/;
                let groupExtension:string = pathObj.filename.match(groupRegex)![0];
                let groupExtensionID:string = _st(groupExtension.slice(1)).toSnakeCase;
                if(this.#groupExtensions[groupExtensionID]) this.#groupsTree[this.#groupExtensions[groupExtensionID]].push(baseObj);

                //-- store all files into "fileObj" using the full path as an ID
                let pathID:StringTherapy = _st(pathObj.splitPath.join("_"));
                this.#allFiles[pathID.toSnakeCase] = pathObj;

                this.buildRawLibrary();
            }
        } else this.buildPathTree();
    }

    //-- build object tree after all files been parsed
    private buildPathTree():void {
        /*
            Taking the raw path array
        */
        let a:number = this.#splittedPaths.length-1;
        let splittedPath:string[];
        let tempOutput:{ [key:string]: any } = this.#rootTree;
        let pathID:string;
        let pathObj:any;
        let endObj:object;
        let groupIndex:number;
        let filenameOG:string;

        for(a; a>=0; a--) {
            splittedPath = this.#splittedPaths[a]; // ['folder','folder2','file']
            tempOutput = this.#rootTree;
            pathID = _st(splittedPath.join("_")).toSnakeCase; // folder_folder2_file
            pathObj = this.#allFiles[pathID];
            endObj = pathObj ? {"path":pathObj.path} : {};
            groupIndex = splittedPath.length-1;
            splittedPath.forEach((fileName, index) => {
                if(index!=0) {
                    filenameOG = fileName;
                    fileName = _st(fileName).toSnakeCase;
                    if(!tempOutput[fileName]) {
                        endObj['filename'] = filenameOG;
                        tempOutput[fileName] = (index===groupIndex) ? endObj : {};
                    }
                    tempOutput = tempOutput[fileName];
                }
            });
        }
    }

}

export default function Init(path:string, group?:Array<GroupEntry>):FsNotation {
    return new FsNotation(path, group);
}

module.exports = Init;