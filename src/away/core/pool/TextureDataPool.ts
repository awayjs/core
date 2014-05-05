///<reference path="../../_definitions.ts"/>

/**
 * @module away.pool
 */
module away.pool
{
	/**
	 * @class away.pool.TextureDataPool
	 */
	export class TextureDataPool
	{
		private _pool:Object = new Object();
		private _stage:away.base.IStage;
		private _textureDataClass:ITextureDataClass;

		/**
		 * //TODO
		 *
		 * @param textureDataClass
		 */
		constructor(stage:away.base.IStage, textureDataClass:ITextureDataClass)
		{
			this._stage = stage;
			this._textureDataClass = textureDataClass;
		}

		/**
		 * //TODO
		 *
		 * @param materialOwner
		 * @returns ITexture
		 */
		public getItem(textureProxy:away.textures.TextureProxyBase):ITextureData
		{
			return <ITextureData> (this._pool[textureProxy.id] || (this._pool[textureProxy.id] = textureProxy._iAddTextureData(new this._textureDataClass(this._stage, textureProxy))))
		}

		/**
		 * //TODO
		 *
		 * @param materialOwner
		 */
		public disposeItem(textureProxy:away.textures.TextureProxyBase)
		{
			textureProxy._iRemoveTextureData(this._pool[textureProxy.id]);

			this._pool[textureProxy.id] = null;
		}
	}
}