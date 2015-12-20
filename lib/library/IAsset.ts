import IEventDispatcher			= require("awayjs-core/lib/events/IEventDispatcher");
import IAssetClass				= require("awayjs-core/lib/library/IAssetClass");

interface IAsset extends IEventDispatcher
{
	/**
	 *
	 */
	name:string;

	/**
	 *
	 */
	id:number;

	/**
	 *
	 */
	assetNamespace:string;

	/**
	 *
	 */
	assetType:string;

	/**
	 *
	 */
	assetFullPath:Array<string>;

	/**
	 *
	 * @param name
	 * @param ns
	 */
	assetPathEquals(name:string, ns:string):boolean;

	/**
	 *
	 */
	invalidate();

	/**
	 *
	 */
	clear();

	/**
	 *
	 */
	dispose();

	/**
	 *
	 * @param IAssetClass
	 */
	isAsset(IAssetClass):boolean;

	/**
	 *
	 * @param name
	 * @param ns
	 * @param overrideOriginal
	 */
	resetAssetPath(name:string, ns:string, overrideOriginal?:boolean):void;
}

export = IAsset;
