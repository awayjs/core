///<reference path="../_definitions.ts"/>

module away.textures
{
	export class BitmapCubeTexture extends CubeTextureBase
	{

		public _pBitmapDatas:Array<away.base.BitmapData> = new Array<away.base.BitmapData>(6);

		/**
		 * The texture on the cube's right face.
		 */
		public get positiveX():away.base.BitmapData
		{
			return this._pBitmapDatas[0];
		}

		public set positiveX(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pBitmapDatas[0] = value;
		}

		/**
		 * The texture on the cube's left face.
		 */
		public get negativeX():away.base.BitmapData
		{
			return this._pBitmapDatas[1];
		}

		public set negativeX(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pBitmapDatas[1] = value;
		}

		/**
		 * The texture on the cube's top face.
		 */
		public get positiveY():away.base.BitmapData
		{
			return this._pBitmapDatas[2];
		}

		public set positiveY(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pBitmapDatas[2] = value;
		}

		/**
		 * The texture on the cube's bottom face.
		 */
		public get negativeY():away.base.BitmapData
		{
			return this._pBitmapDatas[3];
		}

		public set negativeY(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pBitmapDatas[3] = value;
		}

		/**
		 * The texture on the cube's far face.
		 */
		public get positiveZ():away.base.BitmapData
		{
			return this._pBitmapDatas[4];
		}

		public set positiveZ(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pBitmapDatas[4] = value;
		}

		/**
		 * The texture on the cube's near face.
		 */
		public get negativeZ():away.base.BitmapData
		{
			return this._pBitmapDatas[5];
		}

		public set negativeZ(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._pBitmapDatas[5] = value;
		}

		constructor(posX:away.base.BitmapData, negX:away.base.BitmapData, posY:away.base.BitmapData, negY:away.base.BitmapData, posZ:away.base.BitmapData, negZ:away.base.BitmapData, generateMipmaps:boolean = false)
		{
			super(generateMipmaps);

			this._testSize(this._pBitmapDatas[0] = posX);
			this._testSize(this._pBitmapDatas[1] = negX);
			this._testSize(this._pBitmapDatas[2] = posY);
			this._testSize(this._pBitmapDatas[3] = negY);
			this._testSize(this._pBitmapDatas[4] = posZ);
			this._testSize(this._pBitmapDatas[5] = negZ);

			this.invalidateContent();

			this._pSetSize(posX.width);
		}

		/**
		 *
		 * @param stage
		 */
		public activateTextureForStage(index:number, stage:away.base.IStage)
		{
			stage.activateBitmapCubeTexture(index, this);
		}

		/**
		 *
		 * @param value
		 * @private
		 */
		private _testSize(value:away.base.BitmapData)
		{
			if (value.width != value.height)
				throw new Error("BitmapData should have equal width and height!");
			if (!away.utils.TextureUtils.isBitmapDataValid(value))
				throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
		}

		public dispose()
		{
			super.dispose();

			var len:number = this._pBitmapDatas.length
			for (var i:number = 0; i < len; i++) {
				this._pBitmapDatas[i].dispose();
				this._pBitmapDatas[i] = null;
			}

			this._pBitmapDatas = null;
		}

		public _iGetMipmapData(side:number):Array<away.base.BitmapData>
		{
			if (this._pMipmapDataDirtyArray[side]) {
				this._pMipmapDataDirtyArray[side] = false;

				var mipmapData:Array<away.base.BitmapData> = this._pMipmapDataArray[side] || (this._pMipmapDataArray[side] = new Array<away.base.BitmapData>());
				away.textures.MipmapGenerator.generateMipMaps(this._pBitmapDatas[side], mipmapData, true);
			}

			return this._pMipmapDataArray[side];
		}
	}
}
