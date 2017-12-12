import {IAsset, AbstractionBase, IAbstractionPool} from "@awayjs/core";

/**
 * IImageObjectClass is an interface for the constructable class definition ITextureObject that is used to
 * create renderable objects in the rendering pipeline to render the contents of a partition
 *
 * @class away.render.IImageObjectClass
 */
export interface GL_IAssetClass
{
	/**
	 *
	 */
	new(asset:IAsset, pool:IAbstractionPool):AbstractionBase;
}