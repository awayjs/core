import Event					= require("awayjs-core/lib/events/Event");
import EventDispatcher			= require("awayjs-core/lib/events/EventDispatcher");

class EDTest extends EventDispatcher
{
	constructor()
	{
		super();

		console.log('Before addEventListener: ', this.hasEventListener(Event.COMPLETE));
		this.addEventListener(Event.COMPLETE, (event:Event) => this.onComplete(event));
		console.log('After addEventListener: ', this.hasEventListener(Event.COMPLETE));
		this.removeEventListener(Event.COMPLETE, (event:Event) => this.onComplete(event));
		console.log('After removeEventListener: ', this.hasEventListener(Event.COMPLETE));
	}

	public onComplete(event:Event)
	{

	}
}