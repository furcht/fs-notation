interface FsInterface {
    get tree(): object;
    getTypes(name?: string | Array<string>): object;
    getGroups(name?: string | Array<string>): object;
}
