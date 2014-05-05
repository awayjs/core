///<reference path="../_definitions.ts"/>

module away.textures
{
	export class CubeTextureBase extends away.textures.TextureProxyBase
	{
		public _pMipmapDataArray:Array<Array<away.base.BitmapData>> = new Array<Array<away.base.BitmapData>>(6);
		public _pMipmapDataDirtyArray:Array<boolean> = new Array<boolean>(6);

		constructor(generateMipmaps:boolean = true)
		{
			super(generateMipmaps);
		}

		/**
		 *
		 * @param width
		 * @param height
		 * @private
		 */
		public _pSetSize(size:number)
		{
			if (this._pSize != size)
				this.invalidateSize();

			for (var i:number = 0; i < 6; i++)
				this._pMipmapDataDirtyArray[i] = true;

			this._pSize = size;
		}

		/**
		 * @inheritDoc
		 */
		public dispose()
		{
			super.dispose();

			for (var i:number = 0; i < 6; i++) {
				var mipmapData:Array<away.base.BitmapData> = this._pMipmapDataArray[i];
				var len:number = mipmapData.length;
				for (var j:number = 0; j < len; j++)
					MipmapGenerator.freeMipMapHolder(mipmapData[j]);
			}
		}

		/**
		 *
		 */
		public invalidateContent():void
		{
			super.invalidateContent();

			for (var i:number = 0; i < 6; i++)
				this._pMipmapDataDirtyArray[i] = true;
		}
	}
}