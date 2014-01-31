///<reference path="../_definitions.ts"/>

module away.textures
{
	export class Texture2DBase extends away.textures.TextureProxyBase
	{
		constructor()
		{
			super();
		}

		public pCreateTexture(context:away.gl.ContextGL):away.gl.TextureBase
		{
			return context.createTexture(this.width, this.height, away.gl.ContextGLTextureFormat.BGRA, false);
		}
	}
}
