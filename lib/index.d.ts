import PathInterface from "./index";
export default class fsNotation implements PathInterface {
    getFiles: (path: string) => object;
}
