///<reference path="../_definitions.ts"/>

module away.textures
{
	export class BitmapCubeTexture extends CubeTextureBase
	{
		private _bitmapDatas:Array<away.base.BitmapData> = new Array<away.base.BitmapData>(6);

		/**
		 * The texture on the cube's right face.
		 */
		public get positiveX():away.base.BitmapData
		{
			return this._bitmapDatas[0];
		}

		public set positiveX(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[0] = value;
		}

		/**
		 * The texture on the cube's left face.
		 */
		public get negativeX():away.base.BitmapData
		{
			return this._bitmapDatas[1];
		}

		public set negativeX(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[1] = value;
		}

		/**
		 * The texture on the cube's top face.
		 */
		public get positiveY():away.base.BitmapData
		{
			return this._bitmapDatas[2];
		}

		public set positiveY(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[2] = value;
		}

		/**
		 * The texture on the cube's bottom face.
		 */
		public get negativeY():away.base.BitmapData
		{
			return this._bitmapDatas[3];
		}

		public set negativeY(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[3] = value;
		}

		/**
		 * The texture on the cube's far face.
		 */
		public get positiveZ():away.base.BitmapData
		{
			return this._bitmapDatas[4];
		}

		public set positiveZ(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[4] = value;
		}

		/**
		 * The texture on the cube's near face.
		 */
		public get negativeZ():away.base.BitmapData
		{
			return this._bitmapDatas[5];
		}

		public set negativeZ(value:away.base.BitmapData)
		{
			this._testSize(value);
			this.invalidateContent();
			this._pSetSize(value.width);
			this._bitmapDatas[5] = value;
		}

		constructor(posX:away.base.BitmapData, negX:away.base.BitmapData, posY:away.base.BitmapData, negY:away.base.BitmapData, posZ:away.base.BitmapData, negZ:away.base.BitmapData, generateMipmaps:boolean = false)
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

			var len:number = this._bitmapDatas.length
			for (var i:number = 0; i < len; i++) {
				this._bitmapDatas[i].dispose();
				this._bitmapDatas[i] = null;
			}

			this._bitmapDatas = null;
		}

		public _iGetTextureData(side:number):away.base.BitmapData
		{
			return this._bitmapDatas[side];
		}
	}
}
