///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	/**
	 *
	 * @class away.base.IStage
	 */
	export interface IStage
	{
		/**
		 *
		 * @param index
		 * @param texture
		 */
		activateRenderTexture(index:number, texture:away.textures.RenderTexture);

		/**
		 *
		 * @param index
		 * @param texture
		 */
		activateTexture(index:number, texture:away.textures.Texture2DBase);

		/**
		 *
		 * @param index
		 * @param texture
		 */
		activateCubeTexture(index:number, texture:away.textures.CubeTextureBase);
	}
}