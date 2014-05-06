///<reference path="../_definitions.ts"/>

module away.textures
{
	export class Texture2DBase extends TextureProxyBase
	{
		private _mipmapData:Array<away.base.BitmapData>;
		private _mipmapDataDirty:boolean;
		public _pWidth:number;
		public _pHeight:number;
		
		/**
		 *
		 * @returns {number}
		 */
		public get width():number
		{
			return this._pWidth;
		}

		/**
		 *
		 * @returns {number}
		 */
		public get height():number
		{
			return this._pHeight;
		}

		public get size():number
		{
			return this._pWidth;
		}

		constructor(generateMipmaps:boolean = true)
		{
			super(generateMipmaps);
		}

		/**
		 * @inheritDoc
		 */
		public dispose()
		{
			super.dispose();

			if (this._mipmapData) {
				var len:number = this._mipmapData.length;
				for (var i:number = 0; i < len; i++)
					MipmapGenerator.freeMipMapHolder(this._mipmapData[i]);
			}
		}

		/**
		 *
		 */
		public invalidateContent():void
		{
			super.invalidateContent();

			this._mipmapDataDirty = true;
		}

		/**
		 *
		 * @param width
		 * @param height
		 * @private
		 */
		public _pSetSize(width:number, height:number)
		{
			if (this._pWidth != width || this._pHeight != height)
				this.invalidateSize();

			this._mipmapDataDirty = true;

			this._pWidth = width;
			this._pHeight = height;
		}

		/**
		 *
		 * @param stage
		 */
		public activateTextureForStage(index:number, stage:away.base.IStage)
		{
			stage.activateTexture(index, this);
		}

		public _iGetMipmapData():Array<away.base.BitmapData>
		{
			if (this._mipmapDataDirty) {
				this._mipmapDataDirty = false;

				if (!this._mipmapData)
					this._mipmapData = new Array<away.base.BitmapData>();

				away.textures.MipmapGenerator.generateMipMaps(this._iGetTextureData(), this._mipmapData, true);
			}

			return this._mipmapData;
		}

		public _iGetTextureData():any
		{
			throw new away.errors.AbstractMethodError();
		}
	}
}
