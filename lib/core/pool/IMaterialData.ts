/**
 * IMaterialData is an interface for classes that are used in the rendering pipeline to render the
 * contents of a texture
 *
 * @class away.pool.IMaterialData
 */
interface IMaterialData
{
	/**
	 *
	 */
	dispose();

	/**
	 *
	 */
	invalidateMaterial();

	/**
	 *
	 */
	invalidateAnimation();
}

export = IMaterialData;