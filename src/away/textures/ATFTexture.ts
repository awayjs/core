///<reference path="../_definitions.ts"/>

module away.textures
{
	import ContextGL			= away.gl.ContextGL;
	import Texture				= away.gl.Texture;
	import TextureBase			= away.gl.TextureBase;
	import ByteArray			= away.utils.ByteArray;
	
	export class ATFTexture extends Texture2DBase
	{
		private _atfData:ATFData;
		
		constructor(byteArray:ByteArray)
		{
			super();
			
			this.atfData = new ATFData(byteArray);
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
			(<Texture> texture).uploadCompressedTextureFromByteArray(this._atfData.data, 0, false);
		}

		public pCreateTexture(context:ContextGL):TextureBase
		{
			return context.createTexture(this._pWidth, this._pHeight, this.atfData.format, false);
		}
	}
}
