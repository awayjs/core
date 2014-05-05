///<reference path="../_definitions.ts"/>

module away.textures
{
	export class Texture2DBase extends TextureProxyBase
	{
		public _pMipmapData:Array<away.base.BitmapData>;
		public _pMipmapDataDirty:boolean;
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

			if (this._pMipmapData) {
				var len:number = this._pMipmapData.length;
				for (var i:number = 0; i < len; i++)
					MipmapGenerator.freeMipMapHolder(this._pMipmapData[i]);
			}
		}

		/**
		 *
		 */
		public invalidateContent():void
		{
			super.invalidateContent();

			this._pMipmapDataDirty = true;
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

			this._pMipmapDataDirty = true;

			this._pWidth = width;
			this._pHeight = height;
		}
	}
}
