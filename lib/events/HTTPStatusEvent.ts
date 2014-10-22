import Event					= require("awayjs-core/lib/events/Event");

/**
 * @class away.events.HTTPStatusEvent
 */
class HTTPStatusEvent extends Event
{

	public static HTTP_STATUS:string = "httpStatus";

	public status:number;

	constructor(type:string, status:number = null)
	{
		super(type);

		this.status = status;

	}
}

export = HTTPStatusEvent;