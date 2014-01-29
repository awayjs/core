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
		public pCreateTexture(context:away.gl.ContextGL):away.gl.TextureBase
		{
			return context.createCubeTexture(this.width, away.gl.ContextGLTextureFormat.BGRA, false);
		}
	}
}