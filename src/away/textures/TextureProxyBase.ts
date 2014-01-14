///<reference path="../_definitions.ts"/>

module away.textures
{

	export class TextureProxyBase extends away.library.NamedAssetBase implements away.library.IAsset
	{
		private _format:string = away.displayGL.ContextGLTextureFormat.BGRA;
		private _hasMipmaps:boolean = false;

		private _textures:away.displayGL.TextureBase[];
		private _dirty:away.displayGL.ContextGL[];

		public _pWidth:number;
		public _pHeight:number;

		constructor()
		{

			super();

			this._textures = new Array<away.displayGL.TextureBase>(8);//_textures = new Vector.<TextureBase>(8);
			this._dirty = new Array<away.displayGL.ContextGL>(8);//_dirty = new Vector.<ContextGL>(8);

		}

		/**
		 *
		 * @returns {boolean}
		 */
		public get hasMipMaps():boolean
		{
			return this._hasMipmaps;
		}

		/**
		 *
		 * @returns {string}
		 */
		public get format():string
		{
			return this._format;
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

		public getTextureForStageGL(stageGLProxy:away.managers.StageGLProxy):away.displayGL.TextureBase
		{
			var contextIndex:number = stageGLProxy._iStageGLIndex;

			var tex:away.displayGL.TextureBase = this._textures[contextIndex];

			var context:away.displayGL.ContextGL = stageGLProxy._iContextGL;//_contextGL;

			if (!tex || this._dirty[contextIndex] != context) {

				this._textures[contextIndex] = tex = this.pCreateTexture(context);
				this._dirty[contextIndex] = context;
				this.pUploadContent(tex);//_pUploadContent

			}

			return tex;
		}

		/**
		 *
		 * @param texture
		 * @private
		 */
		public pUploadContent(texture:away.displayGL.TextureBase):void
		{

			throw new away.errors.AbstractMethodError();

		}

		/**
		 *
		 * @param width
		 * @param height
		 * @private
		 */
		public pSetSize(width:number, height:number):void
		{

			if (this._pWidth != width || this._pHeight != height) {

				this.pInvalidateSize();

			}

			this._pWidth = width;
			this._pHeight = height;

		}

		/**
		 *
		 */
		public invalidateContent():void
		{

			for (var i:number = 0; i < 8; ++i) {

				this._dirty[i] = null;

			}

		}

		/**
		 *
		 * @private
		 */
		public pInvalidateSize():void
		{
			var tex:away.displayGL.TextureBase;
			for (var i:number = 0; i < 8; ++i) {

				tex = this._textures[i];

				if (tex) {
					tex.dispose();

					this._textures[i] = null;
					this._dirty[i] = null;

				}

			}

		}

		/**
		 *
		 * @param context
		 * @private
		 */
		public pCreateTexture(context:away.displayGL.ContextGL):away.displayGL.TextureBase
		{
			throw new away.errors.AbstractMethodError();
		}

		/**
		 * @inheritDoc
		 */
		public dispose()
		{
			for (var i:number = 0; i < 8; ++i) {

				if (this._textures[i]) {

					this._textures[i].dispose();
				}

			}

		}

	}
}