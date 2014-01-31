///<reference path="../_definitions.ts"/>

module away.textures
{
	export class TextureProxyBase extends away.library.NamedAssetBase implements away.library.IAsset
	{
		public _pFormat:string = away.gl.ContextGLTextureFormat.BGRA;
		public _pHasMipmaps:boolean = false;

		private _textures:away.gl.TextureBase[];
		private _dirty:away.gl.ContextGL[];

		public _pWidth:number;
		public _pHeight:number;

		constructor()
		{
			super();

			this._textures = new Array<away.gl.TextureBase>(8);//_textures = new Vector.<TextureBase>(8);
			this._dirty = new Array<away.gl.ContextGL>(8);//_dirty = new Vector.<ContextGL>(8);
		}

		/**
		 *
		 * @returns {boolean}
		 */
		public get hasMipMaps():boolean
		{
			return this._pHasMipmaps;
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

		public getTextureForStageGL(stageGL:away.base.StageGL):away.gl.TextureBase
		{
			var contextIndex:number = stageGL._iStageGLIndex;

			var tex:away.gl.TextureBase = this._textures[contextIndex];

			var context:away.gl.ContextGL = stageGL.contextGL;

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
		public pUploadContent(texture:away.gl.TextureBase)
		{
			throw new away.errors.AbstractMethodError();
		}

		/**
		 *
		 * @param width
		 * @param height
		 * @private
		 */
		public pSetSize(width:number, height:number)
		{
			if (this._pWidth != width || this._pHeight != height)
				this.pInvalidateSize();

			this._pWidth = width;
			this._pHeight = height;

		}

		/**
		 *
		 */
		public invalidateContent():void
		{
			for (var i:number = 0; i < 8; ++i)
				this._dirty[i] = null;
		}

		/**
		 *
		 * @private
		 */
		public pInvalidateSize():void
		{
			var tex:away.gl.TextureBase;
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
		public pCreateTexture(context:away.gl.ContextGL):away.gl.TextureBase
		{
			throw new away.errors.AbstractMethodError();
		}

		/**
		 * @inheritDoc
		 */
		public dispose()
		{
			for (var i:number = 0; i < 8; ++i)
				if (this._textures[i])
					this._textures[i].dispose();
		}
	}
}