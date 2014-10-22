import Error					= require("awayjs-core/lib/errors/Error");

class CastError extends Error
{
	constructor(message:string)
	{
		super(message);
	}
}

export = CastError;