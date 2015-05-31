/**
 * ISubGeometryVO is an interface for classes that are used in the rendering pipeline to render the
 * contents of a texture
 *
 * @class away.pool.ISubGeometryVO
 */
interface ISubGeometryVO
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

export = ISubGeometryVO;