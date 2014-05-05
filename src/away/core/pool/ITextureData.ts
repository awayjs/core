///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * ITextureData is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a texture
	 *
	 * @class away.pool.ITextureData
	 */
	export interface ITextureData
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
}
