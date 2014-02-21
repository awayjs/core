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
	export class CSSRendererBase extends away.events.EventDispatcher implements IRenderer
	{
		public _pContext:HTMLDivElement;

		private _backgroundR:number = 0;
		private _backgroundG:number = 0;
		private _backgroundB:number = 0;
		private _backgroundAlpha:number = 1;

		private _viewportDirty:boolean;
		private _scissorDirty:boolean;

		private _pBackBufferInvalid:boolean = true;

		private _width:number;
		private _height:number;
		private _localPos:away.geom.Point = new away.geom.Point();
		private _globalPos:away.geom.Point = new away.geom.Point();
		public _pScissorRect:away.geom.Rectangle = new away.geom.Rectangle();

		private _viewPort:away.geom.Rectangle;

		private _scissorUpdated:away.events.RendererEvent;
		private _viewPortUpdated:away.events.RendererEvent;


		/**
		 * Creates a new RendererBase object.
		 */
		constructor(renderToTexture:boolean = false, forceSoftware:boolean = false, profile:string = "baseline")
		{
			super();

			//create context for the renderer
			this._pContext = document.createElement("div");
			//this._pContext.style.transformStyle = this._pContext.style["-webkit-transform-style"] = "preserve-3d";

			//add context container to body
			document.body.appendChild(this._pContext);

			this._viewPort = new away.geom.Rectangle();

			if (this._width == 0)
				this.width = window.innerWidth;

			if (this._height == 0)
				this.height = window.innerHeight;
		}

		public _iCreateEntityCollector():away.traverse.ICollector
		{
			return new away.traverse.CSSEntityCollector();
		}

		/**
		 * A viewPort rectangle equivalent of the StageGL size and position.
		 */
		public get viewPort():away.geom.Rectangle
		{
			return this._viewPort;
		}

		/**
		 * A scissor rectangle equivalent of the view size and position.
		 */
		public get scissorRect():away.geom.Rectangle
		{
			return this._pScissorRect;
		}

		/**
		 *
		 */
		public get x():number
		{
			return this._localPos.x;
		}

		public set x(value:number)
		{
			if (this.x == value)
				return;

			this._globalPos.x = this._localPos.x = value;

			this.updateGlobalPos();
		}

		/**
		 *
		 */
		public get y():number
		{
			return this._localPos.y;
		}

		public set y(value:number)
		{
			if (this.y == value)
				return;

			this._globalPos.y = this._localPos.y = value;

			this.updateGlobalPos();
		}

		/**
		 *
		 */
		public get width():number
		{
			return this._width;
		}

		public set width(value:number)
		{
			if (this._width == value)
				return;

			this._width = value;
			this._pScissorRect.width = value;

			this._viewPort.width = value;

			this.notifyScissorUpdate();
			this.notifyViewportUpdate();
		}

		/**
		 *
		 */
		public get height():number
		{
			return this._height;
		}

		public set height(value:number)
		{
			if (this._height == value)
				return;

			this._height = value;
			this._pScissorRect.height = value;

			this._viewPort.height = value;

			this.notifyScissorUpdate();
			this.notifyViewportUpdate();
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
			this._viewportDirty = false;
			this._scissorDirty = false;

			this._iRender(<away.traverse.CSSEntityCollector> entityCollector);
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
		 * Updates the backbuffer properties.
		 */
		public pUpdateBackBuffer()
		{

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
		 * @private
		 */
		private notifyScissorUpdate()
		{
			var style:MSStyleCSSProperties = this._pContext.style;

//			style.transform
//				= style["-webkit-transform"]
//				= style["-moz-transform"]
//				= style["-o-transform"]
//				= style["-ms-transform"] = "scale3d(" + this._width/1024 + ", " + this._height/1024 + ", 1)";

			if (this._scissorDirty)
				return;

			this._scissorDirty = true;

			if (!this._scissorUpdated)
				this._scissorUpdated = new away.events.RendererEvent(away.events.RendererEvent.SCISSOR_UPDATED);

			this.dispatchEvent(this._scissorUpdated);
		}

		/**
		 * @private
		 */
		private notifyViewportUpdate()
		{
			if (this._viewportDirty)
				return;

			this._viewportDirty = true;

			if (!this._viewPortUpdated)
				this._viewPortUpdated = new away.events.RendererEvent(away.events.RendererEvent.VIEWPORT_UPDATED);

			this.dispatchEvent(this._viewPortUpdated);
		}

		/**
		 *
		 */
		private updateGlobalPos()
		{
			this._pScissorRect.x = 0;
			this._pScissorRect.y = 0;
			this._viewPort.x = this._globalPos.x;
			this._viewPort.y = this._globalPos.y;

			this.notifyScissorUpdate();
		}
	}
}
