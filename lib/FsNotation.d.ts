export declare type GroupEntry = {
    name: string;
    ext: string;
};
export declare class FsNotation implements FsInterface {
    #private;
    constructor(path: string, groups?: Array<GroupEntry>);
    /**
     * Gets the object tree of specfied path
     */
    get tree(): object;
    /**
     * Returns an object containing any or all supported file types
     * @param name String|Array - ID of supported type (optional)
     * @returns An object with specified types in "name" or all types if "name" not provided
     */
    getTypes(name?: string[]): object;
    /**
     * Returns an object containing any or all user defined groups
     * @param name String|Array - ID of user defined group (optional)
     * @returns An object with specified types in "name" or all groups if "name" not provided
     */
    getGroups(name?: string[]): object;
    /**
     * Small helper method to get specified files
     * @param target Key to target which group to parse ("type" or "group")
     * @param name Key to target name of group
     * @returns An object containing the files from either group
     */
    private parseGroups;
    private buildGroups;
    private isDir;
    private checkFiles;
    private buildRawLibrary;
    private buildPathTree;
}
//# sourceMappingURL=FsNotation.d.ts.map