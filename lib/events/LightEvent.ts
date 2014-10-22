import Event					= require("awayjs-core/lib/events/Event");

class LightEvent extends Event
{

	public static CASTS_SHADOW_CHANGE:string = "castsShadowChange";

	constructor(type:string)
	{
		super(type);
	}

	//@override
	public clone():Event
	{
		return new LightEvent(this.type);
	}
}

export = LightEvent;