import AssetType				= require("awayjs-core/lib/core/library/AssetType");
import IAsset					= require("awayjs-core/lib/core/library/IAsset");
import NamedAssetBase			= require("awayjs-core/lib/core/library/NamedAssetBase");

/**
 * Provides an abstract base class for nodes in an animation blend tree.
 */
class AnimationNodeBase extends NamedAssetBase implements IAsset
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

export = AnimationNodeBase;