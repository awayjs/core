import Error					= require("awayjs-core/lib/errors/Error");

class DocumentError extends Error
{
	public static DOCUMENT_DOES_NOT_EXIST:string = "documentDoesNotExist";

	constructor(message:string = "DocumentError", id:number = 0)
	{
		super(message, id);
	}
}

export = DocumentError;