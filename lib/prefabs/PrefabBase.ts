import DisplayObject			= require("awayjs-core/lib/core/base/DisplayObject");
import NamedAssetBase			= require("awayjs-core/lib/core/library/NamedAssetBase");
import AbstractMethodError		= require("awayjs-core/lib/errors/AbstractMethodError");

/**
 * PrefabBase is an abstract base class for prefabs, which are prebuilt display objects that allow easy cloning and updating
 */
class PrefabBase extends NamedAssetBase
{
	public _pObjects:Array<DisplayObject> = new Array<DisplayObject>();

//		public _pBatchObjects:Array<BatchObject> = new Array<BatchObject>();

	/**
	 * Creates a new PrefabBase object.
	 */
	constructor()
	{
		super();
	}

	/**
	 * Returns a display object generated from this prefab
	 */
	public getNewObject():DisplayObject
	{
		var object:DisplayObject = this._pCreateObject();

		this._pObjects.push(object);

		return object;
	}

//		public getNewBatchObject():BatchObject
//		{
//			var object:BatchObject = this._pCreateBatchObject();
//
//			this._pBatchObjects.push(object);
//
//			return object;
//		}

	public _pCreateObject():DisplayObject
	{
		throw new AbstractMethodError();
	}

	public _iValidate()
	{
		// To be overridden when necessary
	}
}

export = PrefabBase;