import { AbstractionBase } from './AbstractionBase';
import { IAbstractionPool } from './IAbstractionPool';
import { IAsset } from './IAsset';

/**
 * IImageObjectClass is an interface for the constructable class definition ITextureObject that is used to
 * create renderable objects in the rendering pipeline to render the contents of a partition
 *
 * @class away.render.IImageObjectClass
 */
export interface IAbstractionClass
{
	/**
	 *
	 */
	new(asset: IAsset, pool: IAbstractionPool): AbstractionBase;
}