///<reference path="../_definitions.ts" />

module away.containers
{
	import ContextGL					= away.gl.ContextGL;
	import ContextGLTextureFormat		= away.gl.ContextGLTextureFormat;
	import Texture						= away.gl.Texture;
	import RendererEvent				= away.events.RendererEvent;
	import Matrix3D						= away.geom.Matrix3D;
	import Point						= away.geom.Point;
	import Rectangle					= away.geom.Rectangle;
	import Vector3D						= away.geom.Vector3D;
	import Delegate						= away.utils.Delegate;

	import Camera						= away.entities.Camera;
	import Scene						= away.containers.Scene;
	import CameraEvent					= away.events.CameraEvent;
	import SceneEvent					= away.events.SceneEvent;
	import IRenderer					= away.render.IRenderer;
	import CSSRendererBase				= away.render.CSSRendererBase;
	import ICollector					= away.traverse.ICollector;

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

		/*
		 ***********************************************************************
		 * Disabled / Not yet implemented
		 ***********************************************************************
		 *
		 * private _background:away.textures.Texture2DBase;
		 *
		 * public _pMouse3DManager:away.managers.Mouse3DManager;
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
		}

		/**
		 *
		 * @returns {number}
		 */
		public get backgroundColor():number
		{
			return this._backgroundColor;
		}

		/**
		 *
		 * @param value
		 */
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
				this._pCamera.removeEventListener(CameraEvent.LENS_CHANGED, this._onProjectionChangedDelegate);

			this._pCamera = value;

			if (this._pEntityCollector)
				this._pEntityCollector.camera = this._pCamera;

			if (this._pScene)
				this._pCamera.partition = this._pScene.partition;

			this._pCamera.addEventListener(CameraEvent.LENS_CHANGED, this._onProjectionChangedDelegate);
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
			this._pCamera.projection.iAspectRatio = this._aspectRatio;
			this._pRenderer.width = value;
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
			this._pCamera.projection.iAspectRatio = this._aspectRatio;
			this._pRenderer.height = value;
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
		}

		/**
		 *
		 */
		public get visible():boolean
		{
			return true;
		}

		public set visible(v:boolean)
		{
			//TODO
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
			this._pCamera.projection.iAspectRatio = this._aspectRatio;

			if (this._scissorDirty) {
				this._scissorDirty = false;
				this._pCamera.projection.iUpdateScissorRect(this._pRenderer.scissorRect.x, this._pRenderer.scissorRect.y, this._pRenderer.scissorRect.width, this._pRenderer.scissorRect.height);
			}

			if (this._viewportDirty) {
				this._viewportDirty = false;
				this._pCamera.projection.iUpdateViewport(this._pRenderer.viewPort.x, this._pRenderer.viewPort.y, this._pRenderer.viewPort.width, this._pRenderer.viewPort.height);
			}

			//clear entity collector ready for collection
			this._pEntityCollector.clear();

			// collect stuff to render
			this._pScene.traversePartitions(this._pEntityCollector);

			// TODO: implement & integrate mouse3DManager
			// update picking
			//_mouse3DManager.updateCollider(this);
			//_touch3DManager.updateCollider();

			//render the contents of the entity collector
			this._pRenderer.render(this._pEntityCollector);

			//if (!this._pShareContext) {

				// TODO: imeplement mouse3dManager
				// fire collected mouse events
				//_mouse3DManager.fireMouseEvents();
				//_touch3DManager.fireTouchEvents();

			//}
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

			// TODO: imeplement mouse3DManager / touch3DManager
			//this._mouse3DManager.disableMouseListeners(this);
			//this._mouse3DManager.dispose();
			//this._touch3DManager.disableTouchListeners(this);
			//this._touch3DManager.dispose();
			//this._mouse3DManager = null;
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
			v.x = (v.x + 1.0)*this._width/2.0;
			v.y = (v.y + 1.0)*this._height/2.0;

			return v;
		}

		public unproject(sX:number, sY:number, sZ:number):Vector3D
		{
			return this._pCamera.unproject((sX*2 - this._width)/this._pRenderer.viewPort.width, (sY*2 - this._height)/this._pRenderer.viewPort.height, sZ);

		}

		public getRay(sX:number, sY:number, sZ:number):Vector3D
		{
			return this._pCamera.getRay((sX*2 - this._width)/this._width, (sY*2 - this._height)/this._height, sZ);
		}

		/* TODO: implement Mouse3DManager
		 public get mousePicker():away.pick.IPicker
		 {
		 return this._mouse3DManager.mousePicker;
		 }
		 */
		/* TODO: implement Mouse3DManager
		 public set mousePicker( value:away.pick.IPicker )
		 {
		 this._mouse3DManager.mousePicker = value;
		 }
		 */
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
		/*TODO: implement Mouse3DManager
		 public get forceMouseMove():boolean
		 {
		 return this._mouse3DManager.forceMouseMove;
		 }
		 */
		/* TODO: implement Mouse3DManager
		 public set forceMouseMove( value:boolean )
		 {
		 this._mouse3DManager.forceMouseMove = value;
		 this._touch3DManager.forceTouchMove = value;
		 }
		 */
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
	}
}