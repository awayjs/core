///<reference path="../../_definitions.ts"/>

module away.base
{
	import ContextMode						= away.display.ContextMode;
	import IContext							= away.display.IContext;
	import Event							= away.events.Event;
	import StageEvent						= away.events.StageEvent;
	import Rectangle						= away.geom.Rectangle;
	import StageManager						= away.managers.StageManager;
	import CubeTextureBase					= away.textures.CubeTextureBase;
	import RenderTexture					= away.textures.RenderTexture;
	import TextureProxyBase					= away.textures.TextureProxyBase;
	import CSS								= away.utils.CSS;

	/**
	 * Stage provides a proxy class to handle the creation and attachment of the Context
	 * (and in turn the back buffer) it uses. Stage should never be created directly,
	 * but requested through StageManager.
	 *
	 * @see away.managers.StageManager
	 *
	 */
	export class Stage extends away.events.EventDispatcher
	{
		private _context:IContext;
		private _container:HTMLElement;
		private _width:number;
		private _height:number;
		private _x:number = 0;
		private _y:number = 0;

		//private static _frameEventDriver:Shape = new Shape(); // TODO: add frame driver / request animation frame

		public _iStageIndex:number = -1;

		private _usesSoftwareRendering:boolean;
		private _profile:string;
		private _stageManager:StageManager;
		private _antiAlias:number = 0;
		private _enableDepthAndStencil:boolean;
		private _contextRequested:boolean;

		//private var _activeVertexBuffers : Vector.<VertexBuffer> = new Vector.<VertexBuffer>(8, true);
		//private var _activeTextures : Vector.<TextureBase> = new Vector.<TextureBase>(8, true);
		private _renderTarget:TextureProxyBase = null;
		private _renderSurfaceSelector:number = 0;
		private _scissorRect:Rectangle;
		private _color:number;
		private _backBufferDirty:boolean;
		private _viewPort:Rectangle;
		private _enterFrame:Event;
		private _exitFrame:Event;
		private _viewportUpdated:StageEvent;
		private _viewportDirty:boolean;
		private _bufferClear:boolean;

		//private _mouse3DManager:away.managers.Mouse3DManager;
		//private _touch3DManager:Touch3DManager; //TODO: imeplement dependency Touch3DManager

		private _initialised:boolean = false;

		constructor(container:HTMLCanvasElement, stageIndex:number, stageManager:StageManager, forceSoftware:boolean = false, profile:string = "baseline")
		{
			super();

			this._container = container;

			this._iStageIndex = stageIndex;

			this._stageManager = stageManager;

			this._viewPort = new Rectangle();

			this._enableDepthAndStencil = true;

			CSS.setElementX(this._container, 0);
			CSS.setElementY(this._container, 0);

			this.visible = true;
		}

		/**
		 * Requests a Context object to attach to the managed gl canvas.
		 */
		public requestContext(forceSoftware:boolean = false, profile:string = "baseline", mode:string = "auto")
		{
			// If forcing software, we can be certain that the
			// returned Context will be running software mode.
			// If not, we can't be sure and should stick to the
			// old value (will likely be same if re-requesting.)

			if (this._usesSoftwareRendering != null)
				this._usesSoftwareRendering = forceSoftware;

			this._profile = profile;

			try {
				if (mode == ContextMode.FLASH)
					new away["stagegl"]["ContextStage3D"](<HTMLCanvasElement> this._container, (context:IContext) => this._callback(context));
				else
					this._context = new away["stagegl"]["ContextWebGL"](<HTMLCanvasElement> this._container);

			} catch (e) {
				try {
					if (mode == ContextMode.AUTO)
						new away["stagegl"]["ContextStage3D"](<HTMLCanvasElement> this._container, (context:IContext) => this._callback(context));
					else
						this.dispatchEvent(new Event(Event.ERROR));
				} catch (e) {
					this.dispatchEvent(new Event(Event.ERROR));
				}

			}

			if (this._context)
				this._callback(this._context);
		}

		/**
		 * The width of the gl canvas
		 */
		public get width()
		{
			return this._width;
		}

		public set width(val:number)
		{
			if (this._width == val)
				return;

			CSS.setElementWidth(this._container, val);

			this._width = this._viewPort.width = val;

			this._backBufferDirty = true;

			this.notifyViewportUpdated();
		}

		/**
		 * The height of the gl canvas
		 */
		public get height()
		{
			return this._height;
		}

		public set height(val:number)
		{
			if (this._height == val)
				return;

			CSS.setElementHeight(this._container, val);

			this._height = this._viewPort.height = val;

			this._backBufferDirty = true;

			this.notifyViewportUpdated();
		}

		/**
		 * The x position of the gl canvas
		 */
		public get x()
		{
			return this._x;
		}

		public set x(val:number)
		{
			if (this._x == val)
				return;

			CSS.setElementX(this._container, val);

			this._x = this._viewPort.x = val;

			this.notifyViewportUpdated();
		}

		/**
		 * The y position of the gl canvas
		 */
		public get y()
		{
			return this._y;
		}

		public set y(val:number)
		{
			if (this._y == val)
				return;

			CSS.setElementY(this._container, val);

			this._y = this._viewPort.y = val;

			this.notifyViewportUpdated();
		}

		public set visible(val:boolean)
		{
			CSS.setElementVisibility(this._container, val);
		}

		public get visible()
		{
			return CSS.getElementVisibility(this._container);
		}

		public get container():HTMLElement
		{
			return this._container;
		}

		/**
		 * The Context object associated with the given stage object.
		 */
		public get context():IContext
		{
			return this._context;
		}

		private notifyViewportUpdated()
		{
			if (this._viewportDirty)
				return;

			this._viewportDirty = true;

			//if (!this.hasEventListener(StageEvent.VIEWPORT_UPDATED))
			//return;

			//if (!_viewportUpdated)
			this._viewportUpdated = new StageEvent(StageEvent.VIEWPORT_UPDATED);

			this.dispatchEvent(this._viewportUpdated);
		}

		private notifyEnterFrame()
		{
			//if (!hasEventListener(Event.ENTER_FRAME))
			//return;

			if (!this._enterFrame)
				this._enterFrame = new Event(Event.ENTER_FRAME);

			this.dispatchEvent(this._enterFrame);

		}

		private notifyExitFrame()
		{
			//if (!hasEventListener(Event.EXIT_FRAME))
			//return;

			if (!this._exitFrame)
				this._exitFrame = new Event(Event.EXIT_FRAME);

			this.dispatchEvent(this._exitFrame);
		}

		public get profile():string
		{
			return this._profile;
		}

		/**
		 * Disposes the Stage object, freeing the Context attached to the Stage.
		 */
		public dispose()
		{
			this._stageManager.iRemoveStage(this);
			this.freeContext();
			this._stageManager = null;
			this._iStageIndex = -1;
		}

		/**
		 * Configures the back buffer associated with the Stage object.
		 * @param backBufferWidth The width of the backbuffer.
		 * @param backBufferHeight The height of the backbuffer.
		 * @param antiAlias The amount of anti-aliasing to use.
		 * @param enableDepthAndStencil Indicates whether the back buffer contains a depth and stencil buffer.
		 */
		public configureBackBuffer(backBufferWidth:number, backBufferHeight:number, antiAlias:number, enableDepthAndStencil:boolean)
		{
			this.width = backBufferWidth;
			this.height = backBufferHeight;

			this._antiAlias = antiAlias;
			this._enableDepthAndStencil = enableDepthAndStencil;

			if (this._context)
				this._context.configureBackBuffer(backBufferWidth, backBufferHeight, antiAlias, enableDepthAndStencil);
		}

		/*
		 * Indicates whether the depth and stencil buffer is used
		 */
		public get enableDepthAndStencil():boolean
		{
			return this._enableDepthAndStencil;
		}

		public set enableDepthAndStencil(enableDepthAndStencil:boolean)
		{
			this._enableDepthAndStencil = enableDepthAndStencil;
			this._backBufferDirty = true;
		}

		public get renderTarget():TextureProxyBase
		{
			return this._renderTarget;
		}

		public get renderSurfaceSelector():number
		{
			return this._renderSurfaceSelector;
		}

		/*
		 * Clear and reset the back buffer when using a shared context
		 */
		public clear()
		{
			if (!this._context)
				return;

			if (this._backBufferDirty) {
				this.configureBackBuffer(this._width, this._height, this._antiAlias, this._enableDepthAndStencil);
				this._backBufferDirty = false;
			}

			this._context.clear(( this._color & 0xff000000 ) >>> 24, // <--------- Zero-fill right shift
								  ( this._color & 0xff0000 ) >>> 16, // <-------------|
								  ( this._color & 0xff00 ) >>> 8, // <----------------|
									this._color & 0xff);

			this._bufferClear = true;
		}

		/**
		 * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event. Special case for enterframe and exitframe events - will switch StageProxy into automatic render mode.
		 * You can register event listeners on all nodes in the display list for a specific type of event, phase, and priority.
		 *
		 * @param type The type of event.
		 * @param listener The listener function that processes the event.
		 * @param useCapture Determines whether the listener works in the capture phase or the target and bubbling phases. If useCapture is set to true, the listener processes the event only during the capture phase and not in the target or bubbling phase. If useCapture is false, the listener processes the event only during the target or bubbling phase. To listen for the event in all three phases, call addEventListener twice, once with useCapture set to true, then again with useCapture set to false.
		 * @param priority The priority level of the event listener. The priority is designated by a signed 32-bit integer. The higher the number, the higher the priority. All listeners with priority n are processed before listeners of priority n-1. If two or more listeners share the same priority, they are processed in the order in which they were added. The default priority is 0.
		 * @param useWeakReference Determines whether the reference to the listener is strong or weak. A strong reference (the default) prevents your listener from being garbage-collected. A weak reference does not.
		 */
			//public override function addEventListener(type:string, listener, useCapture:boolean = false, priority:number = 0, useWeakReference:boolean = false)
		public addEventListener(type:string, listener:Function)
		{
			super.addEventListener(type, listener);//useCapture, priority, useWeakReference);

			//away.Debug.throwPIR( 'StageProxy' , 'addEventListener' ,  'EnterFrame, ExitFrame');

			//if ((type == Event.ENTER_FRAME || type == Event.EXIT_FRAME) ){//&& ! this._frameEventDriver.hasEventListener(Event.ENTER_FRAME)){

			//_frameEventDriver.addEventListener(Event.ENTER_FRAME, onEnterFrame, useCapture, priority, useWeakReference);

			//}

			/* Original code
			 if ((type == Event.ENTER_FRAME || type == Event.EXIT_FRAME) && ! _frameEventDriver.hasEventListener(Event.ENTER_FRAME)){

			 _frameEventDriver.addEventListener(Event.ENTER_FRAME, onEnterFrame, useCapture, priority, useWeakReference);


			 }
			 */
		}

		/**
		 * Removes a listener from the EventDispatcher object. Special case for enterframe and exitframe events - will switch StageProxy out of automatic render mode.
		 * If there is no matching listener registered with the EventDispatcher object, a call to this method has no effect.
		 *
		 * @param type The type of event.
		 * @param listener The listener object to remove.
		 * @param useCapture Specifies whether the listener was registered for the capture phase or the target and bubbling phases. If the listener was registered for both the capture phase and the target and bubbling phases, two calls to removeEventListener() are required to remove both, one call with useCapture() set to true, and another call with useCapture() set to false.
		 */
		public removeEventListener(type:string, listener:Function)
		{
			super.removeEventListener(type, listener);

			//away.Debug.throwPIR( 'StageProxy' , 'removeEventListener' ,  'EnterFrame, ExitFrame');

			/*
			 // Remove the main rendering listener if no EnterFrame listeners remain
			 if (    ! this.hasEventListener(Event.ENTER_FRAME , this.onEnterFrame , this )
			 &&  ! this.hasEventListener(Event.EXIT_FRAME , this.onEnterFrame , this) ) //&& _frameEventDriver.hasEventListener(Event.ENTER_FRAME))
			 {

			 //_frameEventDriver.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame, this );

			 }
			 */
		}

		public get scissorRect():Rectangle
		{
			return this._scissorRect;
		}

		public set scissorRect(value:Rectangle)
		{
			this._scissorRect = value;

			this._context.setScissorRectangle(this._scissorRect);
		}

		/**
		 * The index of the Stage which is managed by this instance of StageProxy.
		 */
		public get stageIndex():number
		{
			return this._iStageIndex;
		}

		/**
		 * Indicates whether the Stage managed by this proxy is running in software mode.
		 * Remember to wait for the CONTEXT_CREATED event before checking this property,
		 * as only then will it be guaranteed to be accurate.
		 */
		public get usesSoftwareRendering():boolean
		{
			return this._usesSoftwareRendering;
		}

		/**
		 * The antiAliasing of the Stage.
		 */
		public get antiAlias():number
		{
			return this._antiAlias;
		}

		public set antiAlias(antiAlias:number)
		{
			this._antiAlias = antiAlias;
			this._backBufferDirty = true;
		}

		/**
		 * A viewPort rectangle equivalent of the Stage size and position.
		 */
		public get viewPort():Rectangle
		{
			this._viewportDirty = false;

			return this._viewPort;
		}

		/**
		 * The background color of the Stage.
		 */
		public get color():number
		{
			return this._color;
		}

		public set color(color:number)
		{
			this._color = color;
		}

		/**
		 * The freshly cleared state of the backbuffer before any rendering
		 */
		public get bufferClear():boolean
		{
			return this._bufferClear;
		}

		public set bufferClear(newBufferClear:boolean)
		{
			this._bufferClear = newBufferClear;
		}

		/*
		 * Access to fire mouseevents across multiple layered view3D instances
		 */
		//		public get mouse3DManager():Mouse3DManager
		//		{
		//			return this._mouse3DManager;
		//		}
		//
		//		public set mouse3DManager(value:Mouse3DManager)
		//		{
		//			this._mouse3DManager = value;
		//		}

		/* TODO: implement dependency Touch3DManager
		 public get touch3DManager():Touch3DManager
		 {
		 return _touch3DManager;
		 }

		 public set touch3DManager(value:Touch3DManager)
		 {
		 _touch3DManager = value;
		 }
		 */

		/**
		 * Frees the Context associated with this StageProxy.
		 */
		private freeContext()
		{
			if (this._context) {
				this._context.dispose();

				this.dispatchEvent(new StageEvent(StageEvent.CONTEXT_DISPOSED));
			}

			this._context = null;

			this._initialised = false;
		}

		/**
		 * The Enter_Frame handler for processing the proxy.ENTER_FRAME and proxy.EXIT_FRAME event handlers.
		 * Typically the proxy.ENTER_FRAME listener would render the layers for this Stage instance.
		 */
		private onEnterFrame(event:Event)
		{
			if (!this._context)
				return;

			// Clear the stage instance
			this.clear();
			//notify the enterframe listeners
			this.notifyEnterFrame();
			// Call the present() to render the frame
			if (!this._context)
				this._context.present();
			//notify the exitframe listeners
			this.notifyExitFrame();
		}

		public recoverFromDisposal():boolean
		{
			if (!this._context)
				return false;

			//away.Debug.throwPIR( 'StageProxy' , 'recoverFromDisposal' , '' );

			/*
			 if (this._iContext.driverInfo == "Disposed")
			 {
			 this._iContext = null;
			 this.dispatchEvent(new StageEvent(StageEvent.CONTEXT_DISPOSED));
			 return false;

			 }
			 */
			return true;

		}

		private _callback(context:IContext)
		{
			this._context = context;

			this._container = this._context.container;

			// Only configure back buffer if width and height have been set,
			// which they may not have been if View.render() has yet to be
			// invoked for the first time.
			if (this._width && this._height)
				this._context.configureBackBuffer(this._width, this._height, this._antiAlias, this._enableDepthAndStencil);

			// Dispatch the appropriate event depending on whether context was
			// created for the first time or recreated after a device loss.
			this.dispatchEvent(new StageEvent(this._initialised? StageEvent.CONTEXT_RECREATED : StageEvent.CONTEXT_CREATED));

			this._initialised = true;
		}
	}
}