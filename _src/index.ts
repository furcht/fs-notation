import { FsNotation, GroupEntry } from "./FsNotation";
export = (path:string, group?:Array<GroupEntry>):FsNotation => new FsNotation(path, group);