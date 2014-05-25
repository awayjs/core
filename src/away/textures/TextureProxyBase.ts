///<reference path="../_definitions.ts"/>

module away.textures
{
	import IStage						= away.base.IStage;

	/**
	 *
	 */
	export class TextureProxyBase extends away.library.NamedAssetBase implements away.library.IAsset
	{
		public _pSize:number;
		public _pFormat:string = "bgra"
		private _hasMipmaps:boolean;
		private _generateMipmaps:boolean;
		private _textureData:Array<away.pool.ITextureData> = new Array<away.pool.ITextureData>();
		
		/**
		 *
		 */
		constructor(generateMipmaps:boolean = false)
		{
			super();

			this._generateMipmaps = this._hasMipmaps = generateMipmaps;
		}

		public get size():number
		{
			return this._pSize;
		}

		public get hasMipmaps():boolean
		{
			return this._hasMipmaps;
		}

		/**
		 *
		 * @returns {string}
		 */
		public get format():string
		{
			return this._pFormat;
		}

		/**
		 *
		 * @returns {boolean}
		 */
		public get generateMipmaps():boolean
		{
			return this._generateMipmaps;
		}

		public set generateMipmaps(value:boolean)
		{
			if (this._generateMipmaps == value)
				return;

			this._generateMipmaps = this._hasMipmaps = value;

			this.invalidateContent();
		}

		/**
		 *
		 * @returns {string}
		 */
		public get assetType():string
		{
			return away.library.AssetType.TEXTURE;
		}

		/**
		 *
		 * @param stage
		 */
		public activateTextureForStage(index:number, stage:IStage)
		{
			throw new away.errors.AbstractMethodError();
		}

		/**
		 *
		 */
		public invalidateContent():void
		{
			var len:number = this._textureData.length
			for (var i:number = 0; i < len; i++)
				this._textureData[i].invalidate();
		}

		/**
		 *
		 * @private
		 */
		public invalidateSize():void
		{
			while (this._textureData.length)
				this._textureData[0].dispose();
		}

		/**
		 * @inheritDoc
		 */
		public dispose()
		{
			while (this._textureData.length)
				this._textureData[0].dispose();
		}


		public _iAddTextureData(textureData:away.pool.ITextureData):away.pool.ITextureData
		{
			this._textureData.push(textureData);

			return textureData;
		}

		public _iRemoveTextureData(textureData:away.pool.ITextureData):away.pool.ITextureData
		{
			this._textureData.splice(this._textureData.indexOf(textureData), 1);

			return textureData;
		}
	}
}