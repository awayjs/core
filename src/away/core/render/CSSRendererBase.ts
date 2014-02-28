///<reference path="../../_definitions.ts"/>

/**
 * @module away.render
 */
module away.render
{
	/**
	 * RendererBase forms an abstract base class for classes that are used in the rendering pipeline to render the
	 * contents of a partition
	 *
	 * @class away.render.RendererBase
	 */
	export class CSSRendererBase extends away.events.EventDispatcher
	{
		private _backgroundR:number = 0;
		private _backgroundG:number = 0;
		private _backgroundB:number = 0;
		private _backgroundAlpha:number = 1;

		public _pBackBufferInvalid:boolean = true;
		public _depthTextureInvalid:boolean = true;

		/**
		 * Creates a new RendererBase object.
		 */
		constructor(renderToTexture:boolean = false, forceSoftware:boolean = false, profile:string = "baseline")
		{
			super();
		}

		public _iCreateEntityCollector():away.traverse.ICollector
		{
			return new away.traverse.CSSEntityCollector();
		}

		/**
		 * The background color's red component, used when clearing.
		 *
		 * @private
		 */
		public get _iBackgroundR():number
		{
			return this._backgroundR;
		}

		public set _iBackgroundR(value:number)
		{
			if (this._backgroundR == value)
				return;

			this._backgroundR = value;

			this._pBackBufferInvalid = true;
		}

		/**
		 * The background color's green component, used when clearing.
		 *
		 * @private
		 */
		public get _iBackgroundG():number
		{
			return this._backgroundG;
		}

		public set _iBackgroundG(value:number)
		{
			if (this._backgroundG == value)
				return;

			this._backgroundG = value;

			this._pBackBufferInvalid = true;
		}

		/**
		 * The background color's blue component, used when clearing.
		 *
		 * @private
		 */
		public get _iBackgroundB():number
		{
			return this._backgroundB;
		}

		public set _iBackgroundB(value:number)
		{
			if (this._backgroundB == value)
				return;

			this._backgroundB = value;

			this._pBackBufferInvalid = true;
		}

		/**
		 * Disposes the resources used by the RendererBase.
		 */
		public dispose()
		{
			/*
			 if (_backgroundImageRenderer) {
			 _backgroundImageRenderer.dispose();
			 _backgroundImageRenderer = null;
			 }
			 */
		}

		public render(entityCollector:away.traverse.ICollector)
		{
		}

		/**
		 * Renders the potentially visible geometry to the back buffer or texture.
		 * @param entityCollector The EntityCollector object containing the potentially visible geometry.
		 * @param scissorRect
		 */
		public _iRender(entityCollector:away.traverse.CSSEntityCollector, scissorRect:away.geom.Rectangle = null)
		{
			if (!entityCollector.entityHead)
				return;

			this.pExecuteRender(entityCollector, scissorRect);
		}

		/**
		 * Renders the potentially visible geometry to the back buffer or texture. Only executed if everything is set up.
		 * @param entityCollector The EntityCollector object containing the potentially visible geometry.
		 * @param scissorRect
		 */
		public pExecuteRender(entityCollector:away.traverse.CSSEntityCollector, scissorRect:away.geom.Rectangle = null)
		{
			this.pDraw(entityCollector);
		}

		/**
		 * Performs the actual drawing of dom objects to the target.
		 *
		 * @param entityCollector The EntityCollector object containing the potentially visible dom objects.
		 */
		public pDraw(entityCollector:away.traverse.CSSEntityCollector)
		{
			throw new away.errors.AbstractMethodError();
		}

		public get _iBackgroundAlpha():number
		{
			return this._backgroundAlpha;
		}

		public set _iBackgroundAlpha(value:number)
		{
			if (this._backgroundAlpha == value)
				return;

			this._backgroundAlpha = value;

			this._pBackBufferInvalid = true;
		}


		/**
		 *
		 */
		public updateGlobalPos()
		{

		}
	}
}
