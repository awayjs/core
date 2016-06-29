import { ErrorBase } from "../errors/ErrorBase";
export declare class DocumentError extends ErrorBase {
    static DOCUMENT_DOES_NOT_EXIST: string;
    constructor(message?: string, id?: number);
}
