///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * ITextureDataClass is an interface for the constructable class definition ITextureData that is used to
	 * create textures in the rendering pipeline to render the contents of a texture
	 *
	 * @class away.render.ITextureDataClass
	 */
	export interface ITextureDataClass
	{
		/**
		 *
		 */
		id:string;

		/**
		 *
		 */
		new(stage:away.base.IStage, textureProxy:away.textures.TextureProxyBase):ITextureData;
	}
}
