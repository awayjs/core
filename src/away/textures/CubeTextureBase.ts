///<reference path="../_definitions.ts"/>

module away.textures
{
	export class CubeTextureBase extends away.textures.TextureProxyBase
	{
		constructor()
		{
			super();
		}

		public get size():number
		{
			//TODO replace this with this._pWidth (requires change in super class to reflect the protected declaration)
			return this.width;
		}

		//@override
		public pCreateTexture(context:away.displayGL.ContextGL):away.displayGL.TextureBase
		{
			return context.createCubeTexture(this.width, away.displayGL.ContextGLTextureFormat.BGRA, false);
		}
	}
}