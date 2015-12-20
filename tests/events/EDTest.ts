import AssetEvent				= require("awayjs-core/lib/events/AssetEvent");
import EventDispatcher			= require("awayjs-core/lib/events/EventDispatcher");

class EDTest extends EventDispatcher
{
	constructor()
	{
		super();

		var onCompleteDelegate:(event:AssetEvent) => void = (event:AssetEvent) => this.onComplete(event);

		console.log('Before addEventListener: ', this.hasEventListener(AssetEvent.ASSET_COMPLETE));
		this.addEventListener(AssetEvent.ASSET_COMPLETE, onCompleteDelegate);
		console.log('After addEventListener: ', this.hasEventListener(AssetEvent.ASSET_COMPLETE));
		this.removeEventListener(AssetEvent.ASSET_COMPLETE, onCompleteDelegate);
		console.log('After removeEventListener: ', this.hasEventListener(AssetEvent.ASSET_COMPLETE));
	}

	public onComplete(event:AssetEvent)
	{

	}
}