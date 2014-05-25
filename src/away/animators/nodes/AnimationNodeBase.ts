///<reference path="../../_definitions.ts"/>

module away.animators
{
	import AssetType					= away.library.AssetType;
	import IAsset						= away.library.IAsset;
	import NamedAssetBase				= away.library.NamedAssetBase;

	/**
	 * Provides an abstract base class for nodes in an animation blend tree.
	 */
	export class AnimationNodeBase extends NamedAssetBase implements IAsset
	{
		public _pStateClass:any;

		public get stateClass():any
		{
			return this._pStateClass;
		}

		/**
		 * Creates a new <code>AnimationNodeBase</code> object.
		 */
		constructor()
		{
			super();
		}

		/**
		 * @inheritDoc
		 */
		public dispose()
		{
		}

		/**
		 * @inheritDoc
		 */
		public get assetType():string
		{
			return AssetType.ANIMATION_NODE;
		}
	}
}
