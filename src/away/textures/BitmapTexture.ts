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

		constructor(bitmapData:away.base.BitmapData, generateMipmaps:boolean = true)
		{
			super(generateMipmaps);

			this.bitmapData = bitmapData;
		}

		/**
		 *
		 * @param stage
		 */
		public activateTextureForStage(index:number, stage:away.base.IStage)
		{
			stage.activateBitmapTexture(index, this);
		}

		public dispose()
		{
			super.dispose();

			this._bitmapData.dispose();
			this._bitmapData = null;
		}

		public _iGetMipmapData():Array<away.base.BitmapData>
		{
			if (this._pMipmapDataDirty) {
				this._pMipmapDataDirty = false;

				if (!this._pMipmapData)
					this._pMipmapData = new Array<away.base.BitmapData>();

				away.textures.MipmapGenerator.generateMipMaps(this.bitmapData, this._pMipmapData, true);
			}

			return this._pMipmapData;
		}
	}
}
