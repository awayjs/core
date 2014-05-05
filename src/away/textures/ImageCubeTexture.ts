///<reference path="../_definitions.ts"/>

module away.textures
{
	export class ImageCubeTexture extends CubeTextureBase
	{
		public _pHTMLImageElements:Array<HTMLImageElement> = new Array<HTMLImageElement>(6);

		/**
		 * The texture on the cube's right face.
		 */
		public get positiveX():HTMLImageElement
		{
			return this._pHTMLImageElements[0];
		}

		public set positiveX(value:HTMLImageElement)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pHTMLImageElements[0] = value;
		}

		/**
		 * The texture on the cube's left face.
		 */
		public get negativeX():HTMLImageElement
		{
			return this._pHTMLImageElements[1];
		}

		public set negativeX(value:HTMLImageElement)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pHTMLImageElements[1] = value;
		}

		/**
		 * The texture on the cube's top face.
		 */
		public get positiveY():HTMLImageElement
		{
			return this._pHTMLImageElements[2];
		}

		public set positiveY(value:HTMLImageElement)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pHTMLImageElements[2] = value;
		}

		/**
		 * The texture on the cube's bottom face.
		 */
		public get negativeY():HTMLImageElement
		{
			return this._pHTMLImageElements[3];
		}

		public set negativeY(value:HTMLImageElement)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pHTMLImageElements[3] = value;
		}

		/**
		 * The texture on the cube's far face.
		 */
		public get positiveZ():HTMLImageElement
		{
			return this._pHTMLImageElements[4];
		}

		public set positiveZ(value:HTMLImageElement)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pHTMLImageElements[4] = value;
		}

		/**
		 * The texture on the cube's near face.
		 */
		public get negativeZ():HTMLImageElement
		{
			return this._pHTMLImageElements[5];
		}

		public set negativeZ(value:HTMLImageElement)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pHTMLImageElements[5] = value;
		}

		constructor(posX:HTMLImageElement, negX:HTMLImageElement, posY:HTMLImageElement, negY:HTMLImageElement, posZ:HTMLImageElement, negZ:HTMLImageElement, generateMipmaps:boolean = false)
		{
			super(generateMipmaps);

			this._testSize(this._pHTMLImageElements[0] = posX);
			this._testSize(this._pHTMLImageElements[1] = negX);
			this._testSize(this._pHTMLImageElements[2] = posY);
			this._testSize(this._pHTMLImageElements[3] = negY);
			this._testSize(this._pHTMLImageElements[4] = posZ);
			this._testSize(this._pHTMLImageElements[5] = negZ);

			this.invalidateContent();

			this._pSetSize(posX.width);
		}

		private _testSize(value:HTMLImageElement)
		{
			if (value.width != value.height)
				throw new Error("BitmapData should have equal width and height!");
			if (!away.utils.TextureUtils.isHTMLImageElementValid(value))
				throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
		}

		/**
		 *
		 * @param stage
		 */
		public activateTextureForStage(index:number, stage:away.base.IStage)
		{
			stage.activateImageCubeTexture(index, this);
		}

		public _iGetMipmapData(side:number):Array<away.base.BitmapData>
		{
			if (this._pMipmapDataDirtyArray[side]) {
				this._pMipmapDataDirtyArray[side] = false;

				var mipmapData:Array<away.base.BitmapData> = this._pMipmapDataArray[side] || (this._pMipmapDataArray[side] = new Array<away.base.BitmapData>());
				away.textures.MipmapGenerator.generateHTMLImageElementMipMaps(this._pHTMLImageElements[side], mipmapData, true);
			}

			return this._pMipmapDataArray[side];
		}
	}
}
