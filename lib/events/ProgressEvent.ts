import Event					= require("awayjs-core/lib/events/Event");

class ProgressEvent extends Event
{
	public static PROGRESS:string = "progress";

	public bytesLoaded:number;

	public bytesTotal:number;

	constructor(type:string)
	{
		super(type);
	}
}

export = ProgressEvent;