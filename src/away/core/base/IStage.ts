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
		activateImageTexture(index:number, texture:away.textures.ImageTexture);

		/**
		 *
		 * @param index
		 * @param texture
		 */
		activateImageCubeTexture(index:number, texture:away.textures.ImageCubeTexture);

		/**
		 *
		 * @param index
		 * @param texture
		 */
		activateBitmapTexture(index:number, texture:away.textures.BitmapTexture);

		/**
		 *
		 * @param index
		 * @param texture
		 */
		activateBitmapCubeTexture(index:number, texture:away.textures.BitmapCubeTexture);
	}
}