import Event					= require("awayjs-core/lib/events/Event");

class MaterialEvent extends Event
{
	public static SIZE_CHANGED:string = "sizeChanged";

	constructor(type:string)
	{
		super(type);
	}
}

export = MaterialEvent;