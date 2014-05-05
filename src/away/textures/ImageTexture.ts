///<reference path="../_definitions.ts"/>

module away.textures
{

	export class ImageTexture extends away.textures.Texture2DBase
	{
		private _htmlImageElement:HTMLImageElement;

		/**
		 *
		 * @param htmlImageElement
		 * @param generateMipmaps
		 */
		constructor(htmlImageElement:HTMLImageElement, generateMipmaps:boolean = true)
		{
			super(generateMipmaps);

			this.htmlImageElement = htmlImageElement;
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
			if (this._htmlImageElement == value)
				return;

			if (!away.utils.TextureUtils.isHTMLImageElementValid(value))
				throw new away.errors.Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");

			this._htmlImageElement = value;

			this.invalidateContent();
			this._pSetSize(value.width, value.height);
		}

		/**
		 *
		 * @param stage
		 */
		public activateTextureForStage(index:number, stage:away.base.IStage)
		{
			stage.activateImageTexture(index, this);
		}

		public _iGetMipmapData():Array<away.base.BitmapData>
		{
			if (this._pMipmapDataDirty) {
				this._pMipmapDataDirty = false;

				if (!this._pMipmapData)
					this._pMipmapData = new Array<away.base.BitmapData>();

				away.textures.MipmapGenerator.generateHTMLImageElementMipMaps(this._htmlImageElement, this._pMipmapData, true);
			}

			return this._pMipmapData;
		}
	}
}
