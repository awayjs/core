/**
 * IAttributesBufferVO is an interface for classes that are used in the rendering pipeline to render the
 * contents of a texture
 *
 * @class away.pool.IAttributesBufferVO
 */
interface IAttributesBufferVO
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

export = IAttributesBufferVO;