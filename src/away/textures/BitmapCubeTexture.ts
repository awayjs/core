///<reference path="../_definitions.ts"/>

module away.textures
{
	export class BitmapCubeTexture extends CubeTextureBase
	{

		private _bitmapDatas:Array<away.base.BitmapData>;
		private _useMipMaps:boolean = false;

		constructor(posX:away.base.BitmapData, negX:away.base.BitmapData, posY:away.base.BitmapData, negY:away.base.BitmapData, posZ:away.base.BitmapData, negZ:away.base.BitmapData)
		{
			super();

			this._bitmapDatas = new Array<away.base.BitmapData>(6);
			this.testSize(this._bitmapDatas[0] = posX);
			this.testSize(this._bitmapDatas[1] = negX);
			this.testSize(this._bitmapDatas[2] = posY);
			this.testSize(this._bitmapDatas[3] = negY);
			this.testSize(this._bitmapDatas[4] = posZ);
			this.testSize(this._bitmapDatas[5] = negZ);

			this.pSetSize(posX.width, posX.height);
		}

		/**
		 * The texture on the cube's right face.
		 */
		public get positiveX():away.base.BitmapData
		{
			return this._bitmapDatas[0];
		}

		public set positiveX(value:away.base.BitmapData)
		{
			this.testSize(value);
			this.invalidateContent();
			this.pSetSize(value.width, value.height);
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
			this.testSize(value);
			this.invalidateContent();
			this.pSetSize(value.width, value.height);
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
			this.testSize(value);
			this.invalidateContent();
			this.pSetSize(value.width, value.height);
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
			this.testSize(value);
			this.invalidateContent();
			this.pSetSize(value.width, value.height);
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
			this.testSize(value);
			this.invalidateContent();
			this.pSetSize(value.width, value.height);
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
			this.testSize(value);
			this.invalidateContent();
			this.pSetSize(value.width, value.height);
			this._bitmapDatas[5] = value;
		}

		private testSize(value:away.base.BitmapData)
		{
			if (value.width != value.height)
				throw new Error("BitmapData should have equal width and height!");
			if (!away.utils.TextureUtils.isBitmapDataValid(value))
				throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
		}

		public pUploadContent(texture:away.gl.TextureBase)
		{
			for (var i:number = 0; i < 6; ++i) {
				if (this._useMipMaps) {

					//away.materials.MipmapGenerator.generateMipMaps(this._bitmapDatas[i], texture, null, false, i);

				} else {

					var tx:away.gl.CubeTexture = <any> texture;
					tx.uploadFromBitmapData(this._bitmapDatas[i], i, 0);

				}


			}
		}
	}
}
