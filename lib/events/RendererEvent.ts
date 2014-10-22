import Event					= require("awayjs-core/lib/events/Event");

class RendererEvent extends Event
{
	public static VIEWPORT_UPDATED:string = "viewportUpdated";
	public static SCISSOR_UPDATED:string = "scissorUpdated";

	constructor(type:string)
	{
		super(type);
	}
}

export = RendererEvent;