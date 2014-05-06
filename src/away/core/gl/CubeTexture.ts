///<reference path="../../_definitions.ts"/>

module away.gl
{
	export class CubeTexture extends away.gl.TextureBase
	{

		public textureType:string = "textureCube";
		private _texture:WebGLTexture;
		private _size:number;

		constructor(gl:WebGLRenderingContext, size:number)
		{
			super(gl);
			this._size = size;
			this._texture = this._gl.createTexture();
		}

		public dispose()
		{
			this._gl.deleteTexture(this._texture);
		}

		public uploadFromData(bitmapData:away.base.BitmapData, side:number, miplevel?:number);
		public uploadFromData(image:HTMLImageElement, side:number, miplevel?:number);
		public uploadFromData(data:any, side:number, miplevel:number = 0)
		{
			if (data instanceof away.base.BitmapData)
				data = (<away.base.BitmapData> data).imageData;

			this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, this._texture);

			switch (side) {
				case 0:
					this._gl.texImage2D(this._gl.TEXTURE_CUBE_MAP_POSITIVE_X, miplevel, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, data);

					break;
				case 1:
					this._gl.texImage2D(this._gl.TEXTURE_CUBE_MAP_NEGATIVE_X, miplevel, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, data);
					break;
				case 2:
					this._gl.texImage2D(this._gl.TEXTURE_CUBE_MAP_POSITIVE_Y, miplevel, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, data);
					break;
				case 3:
					this._gl.texImage2D(this._gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, miplevel, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, data);
					break;
				case 4:
					this._gl.texImage2D(this._gl.TEXTURE_CUBE_MAP_POSITIVE_Z, miplevel, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, data);
					break;
				case 5:
					this._gl.texImage2D(this._gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, miplevel, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, data);
					break;
				default :
					throw "unknown side type";
			}

			this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, null);
		}

		public uploadCompressedTextureFromByteArray(data:away.utils.ByteArray, byteArrayOffset:number /*uint*/, async:boolean = false)
		{

		}

		public get size():number
		{
			return this._size;
		}

		public get glTexture():WebGLTexture
		{
			return this._texture;
		}
	}
}