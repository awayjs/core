///<reference path="../_definitions.ts"/>

module away.textures
{

	export class BitmapTexture extends Texture2DBase
	{
		public _bitmapData:away.base.BitmapData;

		/**
		 *
		 * @returns {away.base.BitmapData}
		 */
		public get bitmapData():away.base.BitmapData
		{
			return this._bitmapData;
		}

		public set bitmapData(value:away.base.BitmapData)
		{
			if (this._bitmapData == value)
				return;

			if (!away.utils.TextureUtils.isBitmapDataValid(value))
				throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");

			this._bitmapData = value;

			this.invalidateContent();

			this._pSetSize(value.width, value.height);
		}

		constructor(bitmapData:away.base.BitmapData, generateMipmaps:boolean = false)
		{
			super(generateMipmaps);

			this.bitmapData = bitmapData;
		}

		public dispose()
		{
			super.dispose();

			this._bitmapData.dispose();
			this._bitmapData = null;
		}

		public _iGetTextureData():away.base.BitmapData
		{
			return this._bitmapData;
		}
	}
}
