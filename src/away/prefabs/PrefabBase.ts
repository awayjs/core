///<reference path="../_definitions.ts"/>

module away.prefabs
{
	import DisplayObject			= away.base.DisplayObject;
//	import BatchObject				= away.base.BatchObject;
	import AbstractMethodError		= away.errors.AbstractMethodError;

	/**
	 * PrefabBase is an abstract base class for prefabs, which are prebuilt display objects that allow easy cloning and updating
	 */
	export class PrefabBase extends away.library.NamedAssetBase
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
}
