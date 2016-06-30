import {AssetEvent}					from "../events/AssetEvent";
import {EventDispatcher}				from "../events/EventDispatcher";
import {IAbstractionPool}				from "../library/IAbstractionPool";
import {IAsset}						from "../library/IAsset";

/**
 *
 * @export class away.pool.AbstractionBase
 */
export class AbstractionBase extends EventDispatcher
{
	private _onClearDelegate:(event:AssetEvent) => void;
	private _onInvalidateDelegate:(event:AssetEvent) => void;

	public _pool:IAbstractionPool;

	public _asset:IAsset;

	public _invalid:boolean = true;

	constructor(asset:IAsset, pool:IAbstractionPool)
	{
		super();

		this._asset = asset;
		this._pool = pool;

		this._onClearDelegate = (event:AssetEvent) => this.onClear(event);
		this._onInvalidateDelegate = (event:AssetEvent) => this.onInvalidate(event);

		this._asset.addEventListener(AssetEvent.CLEAR, this._onClearDelegate);
		this._asset.addEventListener(AssetEvent.INVALIDATE, this._onInvalidateDelegate);
	}

	/**
	 *
	 */
	public onClear(event:AssetEvent):void
	{
		this._asset.removeEventListener(AssetEvent.CLEAR, this._onClearDelegate);
		this._asset.removeEventListener(AssetEvent.INVALIDATE, this._onInvalidateDelegate);

		this._pool.clearAbstraction(this._asset);
		this._pool = null;
		this._asset = null;
	}

	/**
	 *
	 */
	public onInvalidate(event:AssetEvent):void
	{
		this._invalid = true;
	}
}