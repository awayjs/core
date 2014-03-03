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
		public static billboardRenderablePool:away.pool.RenderablePool = new away.pool.RenderablePool(away.pool.CSSBillboardRenderable);

		public _pCamera:away.entities.Camera;
		public _iEntryPoint:away.geom.Vector3D;
		public _pCameraForward:away.geom.Vector3D;

		private _backgroundR:number = 0;
		private _backgroundG:number = 0;
		private _backgroundB:number = 0;
		private _backgroundAlpha:number = 1;

		public _pBackBufferInvalid:boolean = true;
		public _depthTextureInvalid:boolean = true;

		public _renderableHead:away.pool.CSSRenderableBase;

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

		public pCollectRenderables(entityCollector:away.traverse.ICollector)
		{
			//reset head values
			this._renderableHead = null;

			//grab entity head
			var entity:away.pool.EntityListItem = entityCollector.entityHead;

			//set temp values for entry point and camera forward vector
			this._pCamera = entityCollector.camera;
			this._iEntryPoint = this._pCamera.scenePosition;
			this._pCameraForward = this._pCamera.transform.forwardVector;

			//iterate through all entities
			while (entity) {
				this.pFindRenderables(entity.entity)
				entity = entity.next;
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
		 */
		public updateGlobalPos()
		{

		}
		/**
		 *
		 * @param billboard
		 * @protected
		 */
		public applyBillboard(billboard:away.entities.Billboard)
		{
			this.applyRenderable(<away.pool.CSSRenderableBase> CSSRendererBase.billboardRenderablePool.getItem(billboard));
		}

		/**
		 *
		 * @param renderable
		 * @private
		 */
		private applyRenderable(renderable:away.pool.CSSRenderableBase)
		{
			var material:away.materials.CSSMaterialBase = <away.materials.CSSMaterialBase> renderable.materialOwner.material;
			var entity:away.entities.IEntity = renderable.sourceEntity;
			var position:away.geom.Vector3D = entity.scenePosition;

			if (material) {
				//set ids for faster referencing
				renderable.materialId = material._iMaterialId;
				renderable.renderOrderId = material._iRenderOrderId;
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
		 *
		 * @param entity
		 */
		public pFindRenderables(entity:away.entities.IEntity)
		{
			//TODO abstract conditional in the entity with a callback to IRenderer
			if (entity.assetType === away.library.AssetType.BILLBOARD) {
				this.applyBillboard(<away.entities.Billboard> entity);
			}
		}


		/**
		 * //TODO
		 *
		 * @param entity
		 * @param shortestCollisionDistance
		 * @param findClosest
		 * @returns {boolean}
		 *
		 * @internal
		 */
		public static _iCollidesBefore(entity:away.entities.IEntity, shortestCollisionDistance:number, findClosest:boolean):boolean
		{
			var pickingCollider:away.pick.IPickingCollider = entity.pickingCollider;
			var pickingCollisionVO:away.pick.PickingCollisionVO = entity._iPickingCollisionVO;

			pickingCollider.setLocalRay(entity._iPickingCollisionVO.localRayPosition, entity._iPickingCollisionVO.localRayDirection);
			pickingCollisionVO.materialOwner = null;

			if (entity.assetType === away.library.AssetType.BILLBOARD) {
				//return this.testBillBoard(<away.entities.Billboard> entity, pickingCollider, pickingCollisionVO, shortestCollisionDistance, findClosest);
			} else if (entity.assetType === away.library.AssetType.MESH) {
				//return this.testMesh(<away.entities.Mesh> entity, pickingCollider, pickingCollisionVO, shortestCollisionDistance, findClosest);
			}

			return false;
		}
	}
}
