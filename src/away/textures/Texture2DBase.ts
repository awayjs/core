///<reference path="../_definitions.ts"/>

module away.textures
{


	//use namespace arcane;

	export class Texture2DBase extends away.textures.TextureProxyBase
	{
		constructor()
		{
			super();
		}

		public pCreateTexture(context:away.displayGL.ContextGL):away.displayGL.TextureBase
		{
			return context.createTexture(this.width, this.height, away.displayGL.ContextGLTextureFormat.BGRA, false);
		}
	}
}
