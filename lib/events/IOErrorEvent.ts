import Event					= require("awayjs-core/lib/events/Event");

class IOErrorEvent extends Event
{

	public static IO_ERROR:string = "ioError";

	constructor(type:string)
	{
		super(type);

	}
}

export = IOErrorEvent;