///<reference path="../_definitions.ts" />

module away.containers
{
	import Scene						= away.containers.Scene;
	import Camera						= away.entities.Camera;
	import CameraEvent					= away.events.CameraEvent;
	import SceneEvent					= away.events.SceneEvent;
	import RendererEvent				= away.events.RendererEvent;
	import Matrix3D						= away.geom.Matrix3D;
	import Point						= away.geom.Point;
	import Rectangle					= away.geom.Rectangle;
	import Vector3D						= away.geom.Vector3D;
	import ContextGL					= away.gl.ContextGL;
	import ContextGLTextureFormat		= away.gl.ContextGLTextureFormat;
	import Texture						= away.gl.Texture;
	import MouseManager					= away.managers.MouseManager;
	import IRenderer					= away.render.IRenderer;
	import CSSRendererBase				= away.render.CSSRendererBase;
	import ICollector					= away.traverse.ICollector;
	import Delegate						= away.utils.Delegate;


	export class View
	{

		/*
		 *************************************************************************************************************************
		 * Development Notes
		 *************************************************************************************************************************
		 *
		 * ShareContext     - this is not being used at the moment integration with other frameworks is not yet implemented or tested
		 *                    and ( _localPos / _globalPos ) position of viewport are the same for the moment
		 *
		 * Background
		 *                  - this is currently not being included in our tests and is currently disabled
		 *
		 **************************************************************************************************************************
		 */

		// Protected
		public _pScene:Scene;
		public _pCamera:Camera;
		public _pEntityCollector:ICollector;
		public _pRenderer:IRenderer;

		// Private
		private _aspectRatio:number;
		private _width:number = 0;
		private _height:number = 0;

		private _time:number = 0;
		private _deltaTime:number = 0;
		private _backgroundColor:number = 0x000000;
		private _backgroundAlpha:number = 1;

		private _viewportDirty:boolean = true;
		private _scissorDirty:boolean = true;

		private _onScenePartitionChangedDelegate;
		private _onProjectionChangedDelegate;
		private _onViewportUpdatedDelegate;
		private _onScissorUpdatedDelegate;
		private _mouseManager:MouseManager;
		private _mousePicker:away.pick.IPicker = new away.pick.RaycastPicker();

		private _htmlElement:HTMLDivElement;
		private _shareContext:boolean;
		public _pMouseX:number;
		public _pMouseY:number;

		/*
		 ***********************************************************************
		 * Disabled / Not yet implemented
		 ***********************************************************************
		 *
		 * private _background:away.textures.Texture2DBase;
		 *
		 * public _pTouch3DManager:away.managers.Touch3DManager;
		 *
		 */
		constructor(renderer:IRenderer, scene:Scene = null, camera:Camera = null)
		{
			this._onScenePartitionChangedDelegate = Delegate.create(this, this.onScenePartitionChanged);
			this._onProjectionChangedDelegate = Delegate.create(this, this.onProjectionChanged);
			this._onViewportUpdatedDelegate = Delegate.create(this, this.onViewportUpdated);
			this._onScissorUpdatedDelegate = Delegate.create(this, this.onScissorUpdated);

			this.scene = scene || new Scene();
			this.camera = camera || new Camera();
			this.renderer = renderer;

			//make sure document border is zero
			document.body.style.margin = "0px";

			this._htmlElement = document.createElement("div");
			this._htmlElement.style.position = "absolute";

			document.body.appendChild(this._htmlElement);

			this._mouseManager = MouseManager.getInstance();
			this._mouseManager.registerView(this);

//			if (this._shareContext)
//				this._mouse3DManager.addViewLayer(this);
		}

		/**
		 *
		 * @param e
		 */
		private onScenePartitionChanged(e:SceneEvent)
		{
			if (this._pCamera)
				this._pCamera.partition = this.scene.partition;
		}

		public layeredView:boolean; //TODO: something to enable this correctly

		public get mouseX():number
		{
			return this._pMouseX;
		}

		public get mouseY():number
		{
			return this._pMouseY;
		}

		/**
		 *
		 */
		public get htmlElement():HTMLDivElement
		{
			return this._htmlElement;
		}
		/**
		 *
		 */
		public get renderer():IRenderer
		{
			return this._pRenderer;
		}

		public set renderer(value:IRenderer)
		{
			if (this._pRenderer == value)
				return;
			
			if (this._pRenderer) {
				this._pRenderer.dispose();
				this._pRenderer.removeEventListener(RendererEvent.VIEWPORT_UPDATED, this._onViewportUpdatedDelegate);
				this._pRenderer.removeEventListener(RendererEvent.SCISSOR_UPDATED, this._onScissorUpdatedDelegate);
			}

			this._pRenderer = value;

			this._pRenderer.addEventListener(RendererEvent.VIEWPORT_UPDATED, this._onViewportUpdatedDelegate);
			this._pRenderer.addEventListener(RendererEvent.SCISSOR_UPDATED, this._onScissorUpdatedDelegate);
			
			//reset entity collector
			this._pEntityCollector = this._pRenderer._iCreateEntityCollector();

			if (this._pCamera)
				this._pEntityCollector.camera = this._pCamera;

			//reset back buffer
			this._pRenderer._iBackgroundR = ((this._backgroundColor >> 16) & 0xff)/0xff;
			this._pRenderer._iBackgroundG = ((this._backgroundColor >> 8) & 0xff)/0xff;
			this._pRenderer._iBackgroundB = (this._backgroundColor & 0xff)/0xff;
			this._pRenderer._iBackgroundAlpha = this._backgroundAlpha;
			this._pRenderer.width = this._width;
			this._pRenderer.height = this._height;
			this._pRenderer.shareContext = this._shareContext;
		}

		/**
		 *
		 */
		public get shareContext():boolean
		{
			return this._shareContext;
		}

		public set shareContext(value:boolean)
		{
			if (this._shareContext == value)
				return;

			this._shareContext = value;

			if (this._pRenderer)
				this._pRenderer.shareContext = this._shareContext;
		}

		/**
		 *
		 */
		public get backgroundColor():number
		{
			return this._backgroundColor;
		}

		public set backgroundColor(value:number)
		{
			if (this._backgroundColor == value)
				return;

			this._backgroundColor = value;

			this._pRenderer._iBackgroundR = ((value >> 16) & 0xff)/0xff;
			this._pRenderer._iBackgroundG = ((value >> 8) & 0xff)/0xff;
			this._pRenderer._iBackgroundB = (value & 0xff)/0xff;
		}

		/**
		 *
		 * @returns {number}
		 */
		public get backgroundAlpha():number
		{
			return this._backgroundAlpha;
		}

		/**
		 *
		 * @param value
		 */
		public set backgroundAlpha(value:number)
		{
			if (value > 1)
				value = 1;
			else if (value < 0)
				value = 0;

			if (this._backgroundAlpha == value)
				return;

			this._pRenderer._iBackgroundAlpha = this._backgroundAlpha = value;
		}

		/**
		 *
		 * @returns {Camera3D}
		 */
		public get camera():Camera
		{
			return this._pCamera;
		}

		/**
		 * Set camera that's used to render the scene for this viewport
		 */
		public set camera(value:Camera)
		{
			if (this._pCamera == value)
				return;

			if (this._pCamera)
				this._pCamera.removeEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);

			this._pCamera = value;

			if (this._pEntityCollector)
				this._pEntityCollector.camera = this._pCamera;

			if (this._pScene)
				this._pCamera.partition = this._pScene.partition;

			this._pCamera.addEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);
			this._scissorDirty = true;
			this._viewportDirty = true;
		}

		/**
		 *
		 * @returns {away.containers.Scene3D}
		 */
		public get scene():Scene
		{
			return this._pScene;
		}

		/**
		 * Set the scene that's used to render for this viewport
		 */
		public set scene(value:Scene)
		{
			if (this._pScene == value)
				return;

			if (this._pScene)
				this._pScene.removeEventListener(SceneEvent.PARTITION_CHANGED, this._onScenePartitionChangedDelegate);

			this._pScene = value;

			this._pScene.addEventListener(SceneEvent.PARTITION_CHANGED, this._onScenePartitionChangedDelegate);

			if (this._pCamera)
				this._pCamera.partition = this._pScene.partition;
		}

		/**
		 *
		 * @returns {number}
		 */
		public get deltaTime():number
		{
			return this._deltaTime;
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
			this._aspectRatio = this._width/this._height;
			this._pCamera.projection._iAspectRatio = this._aspectRatio;
			this._pRenderer.width = value;
			this._htmlElement.style.width = value + "px";
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
			this._aspectRatio = this._width/this._height;
			this._pCamera.projection._iAspectRatio = this._aspectRatio;
			this._pRenderer.height = value;
			this._htmlElement.style.height = value + "px";
		}

		/**
		 *
		 */
		public get mousePicker():away.pick.IPicker
		{
			return this._mousePicker;
		}

		public set mousePicker(value:away.pick.IPicker)
		{
			if (this._mousePicker == value)
				return;

			if (value == null)
				this._mousePicker = new away.pick.RaycastPicker();
			else
				this._mousePicker = value;
		}

		/**
		 *
		 */
		public get x():number
		{
			return this._pRenderer.x;
		}

		public set x(value:number)
		{
			if (this._pRenderer.x == value)
				return;

			this._pRenderer.x == value;
			this._htmlElement.style.left = value + "px";
		}

		/**
		 *
		 */
		public get y():number
		{
			return this._pRenderer.y;
		}

		public set y(value:number)
		{
			if (this._pRenderer.y == value)
				return;

			this._pRenderer.y == value;
			this._htmlElement.style.top = value + "px";
		}

		/**
		 *
		 */
		public get visible():boolean
		{
			return (this._htmlElement.style.visibility == "visible");
		}

		public set visible(value:boolean)
		{
			this._htmlElement.style.visibility = value? "visible" : "hidden";
			//TODO transfer visible property to associated context (if one exists)
		}

		/**
		 *
		 * @returns {number}
		 */
		public get renderedFacesCount():number
		{
			return 0; //TODO
			//return this._pEntityCollector._pNumTriangles;//numTriangles;
		}

		/**
		 * Renders the view.
		 */
		public render()
		{
			this.pUpdateTime();

			//update view and size data
			this._pCamera.projection._iAspectRatio = this._aspectRatio;

			if (this._scissorDirty) {
				this._scissorDirty = false;
				this._pCamera.projection._iUpdateScissorRect(this._pRenderer.scissorRect.x, this._pRenderer.scissorRect.y, this._pRenderer.scissorRect.width, this._pRenderer.scissorRect.height);
			}

			if (this._viewportDirty) {
				this._viewportDirty = false;
				this._pCamera.projection._iUpdateViewport(this._pRenderer.viewPort.x, this._pRenderer.viewPort.y, this._pRenderer.viewPort.width, this._pRenderer.viewPort.height);
			}

			// update picking
			if (!this._shareContext) {
				if (this.forceMouseMove && this._htmlElement == this._mouseManager._iActiveDiv && !this._mouseManager._iUpdateDirty)
					this._mouseManager._iCollidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);

				this._mouseManager.fireMouseEvents(this.forceMouseMove);
				//_touch3DManager.fireTouchEvents();
			}
			//_touch3DManager.updateCollider();

			//clear entity collector ready for collection
			this._pEntityCollector.clear();

			// collect stuff to render
			this._pScene.traversePartitions(this._pEntityCollector);

			//render the contents of the entity collector
			this._pRenderer.render(this._pEntityCollector);
		}

		/**
		 *
		 */
		public pUpdateTime():void
		{
			var time:number = away.utils.getTimer();

			if (this._time == 0)
				this._time = time;

			this._deltaTime = time - this._time;
			this._time = time;
		}

		/**
		 *
		 */
		public dispose()
		{
			this._pRenderer.dispose();

			// TODO: imeplement mouseManager / touch3DManager
			this._mouseManager.unregisterView(this);

			//this._touch3DManager.disableTouchListeners(this);
			//this._touch3DManager.dispose();

			this._mouseManager = null;
			//this._touch3DManager = null;

			this._pRenderer = null;
			this._pEntityCollector = null;
		}

		/**
		 *
		 */
		public get iEntityCollector():ICollector
		{
			return this._pEntityCollector;
		}

		/**
		 *
		 */
		private onProjectionChanged(event:CameraEvent)
		{
			this._scissorDirty = true;
			this._viewportDirty = true;
		}

		/**
		 *
		 */
		private onViewportUpdated(event:RendererEvent)
		{
			this._viewportDirty = true;
		}

		/**
		 *
		 */
		private onScissorUpdated(event:RendererEvent)
		{
			this._scissorDirty = true;
		}

		public project(point3d:Vector3D):Vector3D
		{
			var v:away.geom.Vector3D = this._pCamera.project(point3d);
			v.x = (v.x*this._pRenderer.viewPort.width + this._width*this._pCamera.projection.originX)/2.0;
			v.y = (v.y*this._pRenderer.viewPort.height + this._height*this._pCamera.projection.originY)/2.0;

			return v;
		}

		public unproject(sX:number, sY:number, sZ:number):Vector3D
		{
			return this._pCamera.unproject(2*(sX - this._width*this._pCamera.projection.originX)/this._pRenderer.viewPort.width, 2*(sY - this._height*this._pCamera.projection.originY)/this._pRenderer.viewPort.height, sZ);

		}

		public getRay(sX:number, sY:number, sZ:number):Vector3D
		{
			return this._pCamera.getRay((sX*2 - this._width)/this._width, (sY*2 - this._height)/this._height, sZ);
		}

		/* TODO: implement Touch3DManager
		 public get touchPicker():away.pick.IPicker
		 {
		 return this._touch3DManager.touchPicker;
		 }
		 */
		/* TODO: implement Touch3DManager
		 public set touchPicker( value:away.pick.IPicker)
		 {
		 this._touch3DManager.touchPicker = value;
		 }
		 */

		public forceMouseMove:boolean;

		/*TODO: implement Background
		 public get background():away.textures.Texture2DBase
		 {
		 return this._background;
		 }
		 */
		/*TODO: implement Background
		 public set background( value:away.textures.Texture2DBase )
		 {
		 this._background = value;
		 this._renderer.background = _background;
		 }
		 */

		// TODO: required dependency stageGL
		public updateCollider()
		{
			if (!this._shareContext) {
				if (this._htmlElement == this._mouseManager._iActiveDiv)
					this._mouseManager._iCollidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);
			} else {
				var collidingObject:away.pick.PickingCollisionVO = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);

				if (this.layeredView || this._mouseManager._iCollidingObject == null || collidingObject.rayEntryDistance < this._mouseManager._iCollidingObject.rayEntryDistance)
					this._mouseManager._iCollidingObject = collidingObject;
			}
		}
	}
}