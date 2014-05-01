///<reference path="../_definitions.ts"/>

module away.textures
{

	export class ImageTexture extends away.textures.Texture2DBase
	{
		private static _mipMaps = [];
		private static _mipMapUses = [];

		private _htmlImageElement:HTMLImageElement;
		private _generateMipmaps:boolean;
		private _mipMapHolder:away.base.BitmapData;

		/**
		 *
		 * @param htmlImageElement
		 * @param generateMipmaps
		 */
		constructor(htmlImageElement:HTMLImageElement, generateMipmaps:boolean = true)
		{
			super();

			this.htmlImageElement = htmlImageElement;
			this._generateMipmaps = generateMipmaps;
		}

		/**
		 *
		 */
		public get htmlImageElement():HTMLImageElement
		{
			return this._htmlImageElement;
		}

		public set htmlImageElement(value:HTMLImageElement)
		{

			if (value == this._htmlImageElement)
				return;

			if (!away.utils.TextureUtils.isHTMLImageElementValid(value))
				throw new away.errors.Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");

			this.invalidateContent();
			this.pSetSize(value.width, value.height);
			this._htmlImageElement = value;

			if (this._generateMipmaps)
				this.getMipMapHolder();
		}

		/**
		 *
		 */
		public dispose()
		{
			super.dispose();

			if (this._mipMapHolder)
				this.freeMipMapHolder();
		}

		/**
		 *
		 * @param texture
		 */
		public pUploadContent(texture:away.gl.TextureBase)
		{
			if (this._generateMipmaps)
				away.textures.MipmapGenerator.generateHTMLImageElementMipMaps(this._htmlImageElement, texture, this._mipMapHolder, true);
			else
				(<away.gl.Texture> texture).uploadFromHTMLImageElement(this._htmlImageElement, 0);
		}

		/**
		 *
		 */
		private getMipMapHolder()
		{
			var newW:number = this._htmlImageElement.width;
			var newH:number = this._htmlImageElement.height;

			if (this._mipMapHolder) {
				if (this._mipMapHolder.width == newW && this._htmlImageElement.height == newH)
					return;

				this.freeMipMapHolder();
			}

			if (!ImageTexture._mipMaps[newW]) {
				ImageTexture._mipMaps[newW] = [];
				ImageTexture._mipMapUses[newW] = [];
			}

			if (!ImageTexture._mipMaps[newW][newH]) {
				this._mipMapHolder = ImageTexture._mipMaps[newW][newH] = new away.base.BitmapData(newW, newH, true);
				ImageTexture._mipMapUses[newW][newH] = 1;
			} else {
				ImageTexture._mipMapUses[newW][newH] = ImageTexture._mipMapUses[newW][newH] + 1;
				this._mipMapHolder = ImageTexture._mipMaps[newW][newH];
			}
		}

		/**
		 *
		 */
		private freeMipMapHolder()
		{
			var holderWidth:number = this._mipMapHolder.width;
			var holderHeight:number = this._mipMapHolder.height;

			if (--ImageTexture._mipMapUses[holderWidth][holderHeight] == 0) {
				ImageTexture._mipMaps[holderWidth][holderHeight].dispose();
				ImageTexture._mipMaps[holderWidth][holderHeight] = null;
			}
		}
	}
}
