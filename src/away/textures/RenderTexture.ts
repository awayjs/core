///<reference path="../_definitions.ts"/>

module away.textures
{
	export class RenderTexture extends Texture2DBase
	{
		/**
		 *
		 * @returns {number}
		 */
		public get width():number
		{
			return this._pWidth;
		}

		public set width(value:number)
		{
			if (value == this._pWidth)
				return;

			if (!away.utils.TextureUtils.isDimensionValid(value))
				throw new Error("Invalid size: Width and height must be power of 2 and cannot exceed 2048");

			this.invalidateContent();

			this._pSetSize(value, this._pHeight);
		}

		/**
		 *
		 * @returns {number}
		 */
		public get height():number
		{
			return this._pHeight;
		}

		public set height(value:number)
		{
			if (value == this._pHeight)
				return;

			if (!away.utils.TextureUtils.isDimensionValid(value))
				throw new Error("Invalid size: Width and height must be power of 2 and cannot exceed 2048");

			this.invalidateContent();
			this._pSetSize(this._pWidth, value);
		}

		constructor(width:number, height:number)
		{
			super(false);

			this._pSetSize(width, height);
		}
	}
}
