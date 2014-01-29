///<reference path="../_definitions.ts"/>

module away.textures
{
	import ContextGL			= away.gl.ContextGL;
	import CubeTexture			= away.gl.CubeTexture;
	import TextureBase			= away.gl.TextureBase;
	import ByteArray			= away.utils.ByteArray;

	export class ATFCubeTexture extends CubeTextureBase
	{
		private _atfData:ATFData;
		
		constructor(byteArray:ByteArray)
		{
			super();
			
			this.atfData = new ATFData(byteArray);

			if (this._atfData.type != ATFData.TYPE_CUBE)
				throw new Error("ATF isn't cubetexture");

			this._pFormat = this._atfData.format;
			this._pHasMipmaps = this._atfData.numTextures > 1;
		}
		
		public get atfData():ATFData
		{
			return this._atfData;
		}
		
		public set atfData(value:ATFData)
		{
			this._atfData = value;
			
			this.invalidateContent();
			
			this.pSetSize(value.width, value.height);
		}

		public pUploadContent(texture:TextureBase)
		{
			(<CubeTexture> texture).uploadCompressedTextureFromByteArray(this._atfData.data, 0, false);
		}

		public pCreateTexture(context:ContextGL):TextureBase
		{
			return context.createCubeTexture(this._atfData.width, this._atfData.format, false);
		}
	}
}
