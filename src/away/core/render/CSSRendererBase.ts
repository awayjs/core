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
		private _billboardRenderablePool:away.pool.RenderablePool;
		private _lineSegmentRenderablePool:away.pool.RenderablePool;

		public _pCamera:away.entities.Camera;
		public _iEntryPoint:away.geom.Vector3D;
		public _pCameraForward:away.geom.Vector3D;

		private _backgroundR:number = 0;
		private _backgroundG:number = 0;
		private _backgroundB:number = 0;
		private _backgroundAlpha:number = 1;
		private _shareContext:boolean = false;

		public _pBackBufferInvalid:boolean = true;
		public _depthTextureInvalid:boolean = true;

		public _renderableHead:away.pool.CSSRenderableBase;

		public _width:number;
		public _height:number;

		private _viewPort:away.geom.Rectangle = new away.geom.Rectangle();
		private _viewportDirty:boolean;
		private _scissorRect:away.geom.Rectangle = new away.geom.Rectangle();
		private _scissorDirty:boolean;

		private _localPos:away.geom.Point = new away.geom.Point();
		private _globalPos:away.geom.Point = new away.geom.Point();

		private _scissorUpdated:away.events.RendererEvent;
		private _viewPortUpdated:away.events.RendererEvent;

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
			return this._scissorRect;
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
			this._scissorRect.width = value;
			this._viewPort.width = value;

			this._pBackBufferInvalid = true;
			this._depthTextureInvalid = true;

			this.notifyViewportUpdate();
			this.notifyScissorUpdate();
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
			this._scissorRect.height = value;
			this._viewPort.height = value;

			this._pBackBufferInvalid = true;
			this._depthTextureInvalid = true;

			this.notifyViewportUpdate();
			this.notifyScissorUpdate();
		}

		/**
		 *
		 */
		public renderableSorter:away.sort.IEntitySorter;

		/**
		 * Creates a new RendererBase object.
		 */
		constructor(renderToTexture:boolean = false, forceSoftware:boolean = false, profile:string = "baseline")
		{
			super();

			this._billboardRenderablePool = away.pool.RenderablePool.getPool(away.pool.CSSBillboardRenderable);
			this._lineSegmentRenderablePool = away.pool.RenderablePool.getPool(away.pool.CSSLineSegmentRenderable);

			this._viewPort = new away.geom.Rectangle();

			if (this._width == 0)
				this.width = window.innerWidth;

			if (this._height == 0)
				this.height = window.innerHeight;
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

		public get shareContext():boolean
		{
			return this._shareContext;
		}

		public set shareContext(value:boolean)
		{
			if (this._shareContext == value)
				return;

			this._shareContext = value;

			this.updateGlobalPos();
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
		}

		/**
		 * Renders the potentially visible geometry to the back buffer or texture.
		 * @param entityCollector The EntityCollector object containing the potentially visible geometry.
		 * @param scissorRect
		 */
		public _iRender(entityCollector:away.traverse.EntityCollector, target:away.textures.TextureProxyBase = null, scissorRect:away.geom.Rectangle = null, surfaceSelector:number = 0)
		{
			if (!entityCollector.entityHead)
				return;

			this.pExecuteRender(entityCollector, scissorRect);
		}

		public _iRenderCascades(entityCollector:away.traverse.ICollector, target:away.textures.TextureProxyBase, numCascades:number, scissorRects:Array<away.geom.Rectangle>, cameras:Array<away.entities.Camera>)
		{

		}
		public pCollectRenderables(entityCollector:away.traverse.ICollector)
		{
			//reset head values
			this._renderableHead = null;

			//grab entity head
			var item:away.pool.EntityListItem = entityCollector.entityHead;

			//set temp values for entry point and camera forward vector
			this._pCamera = entityCollector.camera;
			this._iEntryPoint = this._pCamera.scenePosition;
			this._pCameraForward = this._pCamera.transform.forwardVector;

			//iterate through all entities
			while (item) {
				item.entity._iCollectRenderables(this);
				item = item.next;
			}
		}

		/**
		 * Renders the potentially visible geometry to the back buffer or texture. Only executed if everything is set up.
		 * @param entityCollector The EntityCollector object containing the potentially visible geometry.
		 * @param scissorRect
		 */
		public pExecuteRender(entityCollector:away.traverse.CSSEntityCollector, scissorRect:away.geom.Rectangle = null)
		{
			this.pCollectRenderables(entityCollector);

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
		 * @param billboard
		 */
		public applyBillboard(billboard:away.entities.Billboard)
		{
			this._applyRenderable(<away.pool.CSSRenderableBase> this._billboardRenderablePool.getItem(billboard));
		}

		/**
		 *
		 * @param lineSubMesh
		 */
		public applyLineSubMesh(lineSubMesh:away.base.LineSubMesh)
		{
			//this._applyRenderable(<away.pool.CSSRenderableBase> this._billboardRenderablePool.getItem(lineSegment));
		}

		/**
		 *
		 * @param skybox
		 */
		public applySkybox(skybox:away.entities.Skybox)
		{

		}

		/**
		 *
		 * @param triangleSubMesh
		 */
		public applyTriangleSubMesh(triangleSubMesh:away.base.TriangleSubMesh)
		{

		}

		/**
		 *
		 * @param renderable
		 * @private
		 */
		private _applyRenderable(renderable:away.pool.CSSRenderableBase)
		{
			var material:away.materials.CSSMaterialBase = <away.materials.CSSMaterialBase> renderable.materialOwner.material;
			var entity:away.entities.IEntity = renderable.sourceEntity;
			var position:away.geom.Vector3D = entity.scenePosition;

			if (material) {
				//set ids for faster referencing
				renderable.materialId = material._iMaterialId;
//				renderable.renderOrderId = material._iRenderOrderId;
				renderable.cascaded = false;

				// project onto camera's z-axis
				position = this._iEntryPoint.subtract(position);
				renderable.zIndex = entity.zOffset - position.dotProduct(this._pCameraForward);

				//store reference to scene transform
				renderable.renderSceneTransform = renderable.sourceEntity.getRenderSceneTransform(this._pCamera);

				//store reference to next item in list
				renderable.next = this._renderableHead;
				this._renderableHead = renderable;
			}
		}


		/**
		 * @private
		 */
		private notifyScissorUpdate()
		{
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
		public updateGlobalPos()
		{
			this._viewPort.x = this._globalPos.x;
			this._viewPort.y = this._globalPos.y;

			this.notifyViewportUpdate();
			this.notifyScissorUpdate();
		}


		public _iCreateEntityCollector():away.traverse.ICollector
		{
			throw new away.errors.AbstractMethodError();
		}
	}
}
