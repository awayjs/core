/**
 * IImageObject is an interface for classes that are used in the rendering pipeline to render the
 * contents of a texture
 *
 * @class away.pool.IImageObject
 */
interface IImageObject
{
	/**
	 *
	 */
	dispose();

	/**
	 *
	 */
	invalidate();
}

export = IImageObject;