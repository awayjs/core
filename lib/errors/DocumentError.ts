import {ErrorBase}				from "../errors/ErrorBase";

export class DocumentError extends ErrorBase
{
	public static DOCUMENT_DOES_NOT_EXIST:string = "documentDoesNotExist";

	constructor(message:string = "DocumentError", id:number = 0)
	{
		super(message, id);
	}
}