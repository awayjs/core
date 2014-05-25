///<reference path="../_definitions.ts"/>

module away.textures
{
	import BitmapData					= away.base.BitmapData;

	export class BitmapCubeTexture extends CubeTextureBase
	{
		private _bitmapDatas:Array<BitmapData> = new Array<BitmapData>(6);

		/**
		 * The texture on the cube's right face.
		 */
		public get positiveX():BitmapData
		{
			return this._bitmapDatas[0];
		}

		public set positiveX(value:BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[0] = value;
		}

		/**
		 * The texture on the cube's left face.
		 */
		public get negativeX():BitmapData
		{
			return this._bitmapDatas[1];
		}

		public set negativeX(value:BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[1] = value;
		}

		/**
		 * The texture on the cube's top face.
		 */
		public get positiveY():BitmapData
		{
			return this._bitmapDatas[2];
		}

		public set positiveY(value:BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[2] = value;
		}

		/**
		 * The texture on the cube's bottom face.
		 */
		public get negativeY():BitmapData
		{
			return this._bitmapDatas[3];
		}

		public set negativeY(value:BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[3] = value;
		}

		/**
		 * The texture on the cube's far face.
		 */
		public get positiveZ():BitmapData
		{
			return this._bitmapDatas[4];
		}

		public set positiveZ(value:BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[4] = value;
		}

		/**
		 * The texture on the cube's near face.
		 */
		public get negativeZ():BitmapData
		{
			return this._bitmapDatas[5];
		}

		public set negativeZ(value:BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[5] = value;
		}

		constructor(posX:BitmapData, negX:BitmapData, posY:BitmapData, negY:BitmapData, posZ:BitmapData, negZ:BitmapData, generateMipmaps:boolean = false)
		{
			super(generateMipmaps);

			this._testSize(this._bitmapDatas[0] = posX);
			this._testSize(this._bitmapDatas[1] = negX);
			this._testSize(this._bitmapDatas[2] = posY);
			this._testSize(this._bitmapDatas[3] = negY);
			this._testSize(this._bitmapDatas[4] = posZ);
			this._testSize(this._bitmapDatas[5] = negZ);

			this.invalidateContent();

			this._pSetSize(posX.width);
		}

		/**
		 *
		 * @param value
		 * @private
		 */
		private _testSize(value:BitmapData)
		{
			if (value.width != value.height)
				throw new Error("BitmapData should have equal width and height!");
			if (!away.utils.TextureUtils.isBitmapDataValid(value))
				throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
		}

		public dispose()
		{
			super.dispose();

			var len:number = this._bitmapDatas.length
			for (var i:number = 0; i < len; i++) {
				this._bitmapDatas[i].dispose();
				this._bitmapDatas[i] = null;
			}

			this._bitmapDatas = null;
		}

		public _iGetTextureData(side:number):BitmapData
		{
			return this._bitmapDatas[side];
		}
	}
}
