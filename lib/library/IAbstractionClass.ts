import { IAbstraction } from './IAbstraction';

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
	new(): IAbstraction;
}