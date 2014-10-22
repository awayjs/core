import Event					= require("awayjs-core/lib/events/Event");

class StageEvent extends Event
{
	public static CONTEXT_CREATED:string = "contextCreated";
	public static CONTEXT_DISPOSED:string = "contextDisposed";
	public static CONTEXT_RECREATED:string = "contextRecreated";
	public static VIEWPORT_UPDATED:string = "viewportUpdated";

	constructor(type:string)
	{
		super(type);
	}
}

export = StageEvent;