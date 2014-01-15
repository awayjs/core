///<reference path="../_definitions.ts"/>

module away.managers
{
	//import away.arcane;
	//import away.debug.Debug;
	//import away.events.StageGLEvent;

	//import flash.display.Shape;
	//import flash.display.StageGL;
	//import flash.displayGL.ContextGL;
	//import flash.displayGL.ContextGLClearMask;
	//import flash.displayGL.ContextGLRenderMode;
	//import flash.displayGL.Program;
	//import flash.displayGL.textures.TextureBase;
	//import flash.events.Event;
	//import flash.events.EventDispatcher;
	//import flash.geom.Rectangle;

	//use namespace arcane;

	//[Event(name="enterFrame", type="flash.events.Event")]
	//[Event(name="exitFrame", type="flash.events.Event")]

	/**
	 * StageGLProxy provides a proxy class to manage a single StageGL instance as well as handling the creation and
	 * attachment of the ContextGL (and in turn the back buffer) is uses. StageGLProxy should never be created directly,
	 * but requested through StageGLManager.
	 *
	 * @see away.managers.StageGLProxy
	 *
	 * todo: consider moving all creation methods (createVertexBuffer etc) in here, so that disposal can occur here
	 * along with the context, instead of scattered throughout the framework
	 */
	export class StageGLProxy extends away.events.EventDispatcher
	{
		//private static _frameEventDriver:Shape = new Shape(); // TODO: add frame driver / request animation frame

		public _iContextGL:away.displayGL.ContextGL;
		public _iStageGLIndex:number = -1;

		private _usesSoftwareRendering:boolean;
		private _profile:string;
		private _stageGL:away.display.StageGL;
		private _activeProgram:away.displayGL.Program;
		private _stageGLManager:away.managers.StageGLManager;
		private _backBufferWidth:number;
		private _backBufferHeight:number;
		private _antiAlias:number = 0;
		private _enableDepthAndStencil:boolean;
		private _contextRequested:boolean;
		//private var _activeVertexBuffers : Vector.<VertexBuffer> = new Vector.<VertexBuffer>(8, true);
		//private var _activeTextures : Vector.<TextureBase> = new Vector.<TextureBase>(8, true);
		private _renderTarget:away.displayGL.TextureBase = null;
		private _renderSurfaceSelector:number = 0;
		private _scissorRect:away.geom.Rectangle;
		private _color:number;
		private _backBufferDirty:boolean;
		private _viewPort:away.geom.Rectangle;
		private _enterFrame:away.events.Event;
		private _exitFrame:away.events.Event;
		private _viewportUpdated:away.events.StageGLEvent;
		private _viewportDirty:boolean;
		private _bufferClear:boolean;
		//private _mouse3DManager:away.managers.Mouse3DManager;
		//private _touch3DManager:Touch3DManager; //TODO: imeplement dependency Touch3DManager
		private _onContextGLUpdateDelegate:Function;

		private notifyViewportUpdated()
		{
			if (this._viewportDirty) {

				return;

			}

			this._viewportDirty = true;

			//if (!this.hasEventListener(away.events.StageGLEvent.VIEWPORT_UPDATED))
			//return;

			//if (!_viewportUpdated)
			this._viewportUpdated = new away.events.StageGLEvent(away.events.StageGLEvent.VIEWPORT_UPDATED);
			this.dispatchEvent(this._viewportUpdated);
		}

		private notifyEnterFrame()
		{
			//if (!hasEventListener(Event.ENTER_FRAME))
			//return;

			if (!this._enterFrame) {

				this._enterFrame = new away.events.Event(away.events.Event.ENTER_FRAME);

			}


			this.dispatchEvent(this._enterFrame);

		}

		private notifyExitFrame()
		{
			//if (!hasEventListener(Event.EXIT_FRAME))
			//return;

			if (!this._exitFrame)
				this._exitFrame = new away.events.Event(away.events.Event.EXIT_FRAME);

			this.dispatchEvent(this._exitFrame);
		}

		/**
		 * Creates a StageGLProxy object. This method should not be called directly. Creation of StageGLProxy objects should
		 * be handled by StageGLManager.
		 * @param stageGLIndex The index of the StageGL to be proxied.
		 * @param stageGL The StageGL to be proxied.
		 * @param stageGLManager
		 * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
		 */
		constructor(stageGLIndex:number, stageGL:away.display.StageGL, stageGLManager:away.managers.StageGLManager, forceSoftware:boolean = false, profile:string = "baseline")
		{

			super();

			this._iStageGLIndex = stageGLIndex;
			this._stageGL = stageGL;

			this._stageGL.x = 0;
			this._stageGL.y = 0;
			this._stageGL.visible = true;
			this._stageGLManager = stageGLManager;
			this._viewPort = new away.geom.Rectangle();
			this._enableDepthAndStencil = true;

			//create the closure delegate for the context update listener
			this._onContextGLUpdateDelegate = away.utils.Delegate.create(this, this.onContextGLUpdate);

			// whatever happens, be sure this has highest priority
			this._stageGL.addEventListener(away.events.Event.CONTEXTGL_CREATE, this._onContextGLUpdateDelegate);//, false, 1000, false);
			this.requestContext(forceSoftware, this.profile);
		}

		public get profile():string
		{
			return this._profile;
		}

		/**
		 * Disposes the StageGLProxy object, freeing the ContextGL attached to the StageGL.
		 */
		public dispose()
		{
			this._stageGLManager.iRemoveStageGLProxy(this);
			this._stageGL.removeEventListener(away.events.Event.CONTEXTGL_CREATE, this._onContextGLUpdateDelegate);
			this.freeContextGL();
			this._stageGL = null;
			this._stageGLManager = null;
			this._iStageGLIndex = -1;
		}

		/**
		 * Configures the back buffer associated with the StageGL object.
		 * @param backBufferWidth The width of the backbuffer.
		 * @param backBufferHeight The height of the backbuffer.
		 * @param antiAlias The amount of anti-aliasing to use.
		 * @param enableDepthAndStencil Indicates whether the back buffer contains a depth and stencil buffer.
		 */
		public configureBackBuffer(backBufferWidth:number, backBufferHeight:number, antiAlias:number, enableDepthAndStencil:boolean)
		{
			var oldWidth:number = this._backBufferWidth;
			var oldHeight:number = this._backBufferHeight;

			this._backBufferWidth = this._viewPort.width = backBufferWidth;
			this._backBufferHeight = this._viewPort.height = backBufferHeight;

			if (oldWidth != this._backBufferWidth || oldHeight != this._backBufferHeight)
				this.notifyViewportUpdated();

			this._antiAlias = antiAlias;
			this._enableDepthAndStencil = enableDepthAndStencil;

			if (this._iContextGL)
				this._iContextGL.configureBackBuffer(backBufferWidth, backBufferHeight, antiAlias, enableDepthAndStencil);

			this._stageGL.width = backBufferWidth;
			this._stageGL.height = backBufferHeight;

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

		public get renderTarget():away.displayGL.TextureBase
		{
			return this._renderTarget;
		}

		public get renderSurfaceSelector():number
		{
			return this._renderSurfaceSelector;
		}

		public setRenderTarget(target:away.displayGL.TextureBase, enableDepthAndStencil:boolean = false, surfaceSelector:number = 0)
		{
			if (this._renderTarget === target && surfaceSelector == this._renderSurfaceSelector && this._enableDepthAndStencil == enableDepthAndStencil) {
				return;
			}

			this._renderTarget = target;
			this._renderSurfaceSelector = surfaceSelector;
			this._enableDepthAndStencil = enableDepthAndStencil;

			if (target) {

				this._iContextGL.setRenderToTexture(target, enableDepthAndStencil, this._antiAlias, surfaceSelector);

			} else {

				this._iContextGL.setRenderToBackBuffer();
				this.configureBackBuffer(this._backBufferWidth, this._backBufferHeight, this._antiAlias, this._enableDepthAndStencil);
			}

		}

		/*
		 * Clear and reset the back buffer when using a shared context
		 */
		public clear()
		{
			if (!this._iContextGL)
				return;

			if (this._backBufferDirty) {
				this.configureBackBuffer(this._backBufferWidth, this._backBufferHeight, this._antiAlias, this._enableDepthAndStencil);
				this._backBufferDirty = false;
			}

			this._iContextGL.clear(( this._color & 0xff000000 ) >>> 24, // <--------- Zero-fill right shift
				( this._color & 0xff0000 ) >>> 16, // <-------------|
				( this._color & 0xff00 ) >>> 8, // <----------------|
				this._color & 0xff);

			this._bufferClear = true;
		}

		/*
		 * Display the back rendering buffer
		 */
		public present()
		{
			if (!this._iContextGL)
				return;

			this._iContextGL.present();

			this._activeProgram = null;

			//if (this._mouse3DManager)
			//	this._mouse3DManager.fireMouseEvents();
		}

		/**
		 * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event. Special case for enterframe and exitframe events - will switch StageGLProxy into automatic render mode.
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

			//away.Debug.throwPIR( 'StageGLProxy' , 'addEventListener' ,  'EnterFrame, ExitFrame');

			//if ((type == away.events.Event.ENTER_FRAME || type == away.events.Event.EXIT_FRAME) ){//&& ! this._frameEventDriver.hasEventListener(Event.ENTER_FRAME)){

			//_frameEventDriver.addEventListener(Event.ENTER_FRAME, onEnterFrame, useCapture, priority, useWeakReference);

			//}

			/* Original code
			 if ((type == Event.ENTER_FRAME || type == Event.EXIT_FRAME) && ! _frameEventDriver.hasEventListener(Event.ENTER_FRAME)){

			 _frameEventDriver.addEventListener(Event.ENTER_FRAME, onEnterFrame, useCapture, priority, useWeakReference);


			 }
			 */
		}

		/**
		 * Removes a listener from the EventDispatcher object. Special case for enterframe and exitframe events - will switch StageGLProxy out of automatic render mode.
		 * If there is no matching listener registered with the EventDispatcher object, a call to this method has no effect.
		 *
		 * @param type The type of event.
		 * @param listener The listener object to remove.
		 * @param useCapture Specifies whether the listener was registered for the capture phase or the target and bubbling phases. If the listener was registered for both the capture phase and the target and bubbling phases, two calls to removeEventListener() are required to remove both, one call with useCapture() set to true, and another call with useCapture() set to false.
		 */
		public removeEventListener(type:string, listener:Function)
			//public override function removeEventListener(type:string, listener, useCapture:boolean = false)
		{
			super.removeEventListener(type, listener);

			//away.Debug.throwPIR( 'StageGLProxy' , 'removeEventListener' ,  'EnterFrame, ExitFrame');

			/*
			 // Remove the main rendering listener if no EnterFrame listeners remain
			 if (    ! this.hasEventListener(away.events.Event.ENTER_FRAME , this.onEnterFrame , this )
			 &&  ! this.hasEventListener(away.events.Event.EXIT_FRAME , this.onEnterFrame , this) ) //&& _frameEventDriver.hasEventListener(Event.ENTER_FRAME))
			 {

			 //_frameEventDriver.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame, this );

			 }
			 */
		}

		public get scissorRect():away.geom.Rectangle
		{
			return this._scissorRect;
		}

		public set scissorRect(value:away.geom.Rectangle)
		{
			this._scissorRect = value;
			this._iContextGL.setScissorRectangle(this._scissorRect);
		}

		/**
		 * The index of the StageGL which is managed by this instance of StageGLProxy.
		 */
		public get stageGLIndex():number
		{
			return this._iStageGLIndex;
		}

		/**
		 * The base StageGL object associated with this proxy.
		 */
		public get stageGL():away.display.StageGL
		{
			return this._stageGL;
		}

		/**
		 * The ContextGL object associated with the given StageGL object.
		 */
		public get contextGL():away.displayGL.ContextGL
		{
			return this._iContextGL;
		}

		/**
		 * Indicates whether the StageGL managed by this proxy is running in software mode.
		 * Remember to wait for the CONTEXTGL_CREATED event before checking this property,
		 * as only then will it be guaranteed to be accurate.
		 */
		public get usesSoftwareRendering():boolean
		{
			return this._usesSoftwareRendering;
		}

		/**
		 * The x position of the StageGL.
		 */
		public get x():number
		{
			return this._stageGL.x;
		}

		public set x(value:number)
		{
			if (this._viewPort.x == value)
				return;

			this._stageGL.x = this._viewPort.x = value;

			this.notifyViewportUpdated();
		}

		/**
		 * The y position of the StageGL.
		 */
		public get y():number
		{
			return this._stageGL.y;
		}

		public set y(value:number)
		{
			if (this._viewPort.y == value)
				return;

			this._stageGL.y = this._viewPort.y = value;

			this.notifyViewportUpdated();
		}

		/**
		 *
		 * @returns {HTMLCanvasElement}
		 */
		public get canvas():HTMLCanvasElement
		{
			return this._stageGL.canvas;
		}

		/**
		 * The width of the StageGL.
		 */
		public get width():number
		{
			return this._backBufferWidth;
		}

		public set width(width:number)
		{
			if (this._viewPort.width == width)
				return;

			this._stageGL.width = this._backBufferWidth = this._viewPort.width = width;
			this._backBufferDirty = true;

			this.notifyViewportUpdated();
		}

		/**
		 * The height of the StageGL.
		 */
		public get height():number
		{
			return this._backBufferHeight;
		}

		public set height(height:number)
		{
			if (this._viewPort.height == height)
				return;

			this._stageGL.height = this._backBufferHeight = this._viewPort.height = height;
			this._backBufferDirty = true;

			this.notifyViewportUpdated();
		}

		/**
		 * The antiAliasing of the StageGL.
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
		 * A viewPort rectangle equivalent of the StageGL size and position.
		 */
		public get viewPort():away.geom.Rectangle
		{
			this._viewportDirty = false;

			return this._viewPort;
		}

		/**
		 * The background color of the StageGL.
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
		 * The visibility of the StageGL.
		 */
		public get visible():boolean
		{
			return this._stageGL.visible;
		}

		public set visible(value:boolean)
		{
			this._stageGL.visible = value;
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
		 * Frees the ContextGL associated with this StageGLProxy.
		 */
		private freeContextGL()
		{
			if (this._iContextGL) {

				this._iContextGL.dispose();
				this.dispatchEvent(new away.events.StageGLEvent(away.events.StageGLEvent.CONTEXTGL_DISPOSED));
			}

			this._iContextGL = null;
		}

		/*
		 * Called whenever the ContextGL is retrieved or lost.
		 * @param event The event dispatched.
		 */
		private onContextGLUpdate(event:Event)
		{
			if (this._stageGL.contextGL) {

				var hadContext:boolean = (this._iContextGL != null);
				this._iContextGL = this._stageGL.contextGL;

				// Only configure back buffer if width and height have been set,
				// which they may not have been if View3D.render() has yet to be
				// invoked for the first time.
				if (this._backBufferWidth && this._backBufferHeight) {
					this._iContextGL.configureBackBuffer(this._backBufferWidth, this._backBufferHeight, this._antiAlias, this._enableDepthAndStencil);
				}

				// Dispatch the appropriate event depending on whether context was
				// created for the first time or recreated after a device loss.
				this.dispatchEvent(new away.events.StageGLEvent(hadContext? away.events.StageGLEvent.CONTEXTGL_RECREATED : away.events.StageGLEvent.CONTEXTGL_CREATED));

			} else {
				throw new Error("Rendering context lost!");
			}

		}

		/**
		 * Requests a ContextGL object to attach to the managed StageGL.
		 */
		private requestContext(forceSoftware:boolean = false, profile:string = "baseline")
		{
			// If forcing software, we can be certain that the
			// returned ContextGL will be running software mode.
			// If not, we can't be sure and should stick to the
			// old value (will likely be same if re-requesting.)

			if (this._usesSoftwareRendering != null) {

				this._usesSoftwareRendering = forceSoftware;

			}

			this._profile = profile;

			// Updated to work with current JS <> AS3 DisplayGL System
			this._stageGL.requestContext(true);

		}

		/**
		 * The Enter_Frame handler for processing the proxy.ENTER_FRAME and proxy.EXIT_FRAME event handlers.
		 * Typically the proxy.ENTER_FRAME listener would render the layers for this StageGL instance.
		 */
		private onEnterFrame(event:Event)
		{
			if (!this._iContextGL) {
				return;
			}

			// Clear the stageGL instance
			this.clear();
			//notify the enterframe listeners
			this.notifyEnterFrame();
			// Call the present() to render the frame
			this.present();
			//notify the exitframe listeners
			this.notifyExitFrame();
		}

		public recoverFromDisposal():boolean
		{
			if (!this._iContextGL) {

				return false;

			}

			//away.Debug.throwPIR( 'StageGLProxy' , 'recoverFromDisposal' , '' );

			/*
			 if (this._iContextGL.driverInfo == "Disposed")
			 {
			 this._iContextGL = null;
			 this.dispatchEvent(new away.events.StageGLEvent(away.events.StageGLEvent.CONTEXTGL_DISPOSED));
			 return false;

			 }
			 */
			return true;

		}

		public clearDepthBuffer()
		{
			if (!this._iContextGL) {

				return;

			}

			this._iContextGL.clear(0, 0, 0, 1, 1, 0, away.displayGL.ContextGLClearMask.DEPTH);

		}
	}
}
