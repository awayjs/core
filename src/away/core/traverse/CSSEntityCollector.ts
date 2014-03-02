///<reference path="../../_definitions.ts"/>

/**
 * @module away.traverse
 */
module away.traverse
{
	/**
	 * @class away.traverse.EntityCollector
	 */
	export class CSSEntityCollector implements ICollector
	{
		private static _billboardRenderablePool:Object = new Object();

		public scene:away.containers.Scene;

		public _iEntryPoint:away.geom.Vector3D;

//		public _pSkyBox:away.render.RenderableBase;
		public _renderableHead:away.render.CSSRenderableBase;
		private _entityHead:away.pool.EntityListItem;
		public _pEntityListItemPool:away.pool.EntityListItemPool;
		public _pNumEntities:number = 0;
		public _pNumLights:number = 0;
		public _pNumMouseEnableds:number = 0;
		public _pCamera:away.entities.Camera;
		private _numDirectionalLights:number = 0;
		private _numPointLights:number = 0;
		private _numLightProbes:number = 0;
		public _pCameraForward:away.geom.Vector3D;
		private _customCullPlanes:away.geom.Plane3D[];
		private _cullPlanes:away.geom.Plane3D[];
		private _numCullPlanes:number = 0;


		/**
		 *
		 */
		public renderableSorter:away.sort.IEntitySorter;

		constructor()
		{
			this._pEntityListItemPool = new away.pool.EntityListItemPool();
		}

		/**
		 *
		 */
		public get camera():away.entities.Camera
		{
			return this._pCamera;
		}

		public set camera(value:away.entities.Camera)
		{
			this._pCamera = value;
			this._iEntryPoint = this._pCamera.scenePosition;
			this._pCameraForward = this._pCamera.transform.forwardVector;
			this._cullPlanes = this._pCamera.frustumPlanes;
		}

		/**
		 *
		 */
		public get cullPlanes():away.geom.Plane3D[]
		{
			return this._customCullPlanes;
		}

		public set cullPlanes(value:away.geom.Plane3D[])
		{
			this._customCullPlanes = value;
		}

		/**
		 *
		 */
		public get numMouseEnableds():number
		{
			return this._pNumMouseEnableds;
		}

		/**
		 *
		 */
//		public get skyBox():away.render.RenderableBase
//		{
//			return this._pSkyBox;
//		}

		/**
		 *
		 */
		public get entityHead():away.pool.EntityListItem
		{
			return this._entityHead;
		}

		public get entryPoint():away.geom.Vector3D
		{
			return this._iEntryPoint;
		}

		/**
		 *
		 */
		public get renderableHead():away.render.CSSRenderableBase
		{
			return this._renderableHead;
		}

		public set renderableHead(value:away.render.CSSRenderableBase)
		{
			this._renderableHead = value;
		}

		/**
		 *
		 */
		public clear()
		{
			this._iEntryPoint = this._pCamera.scenePosition;
			this._pCameraForward = this._pCamera.transform.forwardVector;
			this._cullPlanes = this._customCullPlanes? this._customCullPlanes : ( this._pCamera? this._pCamera.frustumPlanes : null );
			this._numCullPlanes = this._cullPlanes? this._cullPlanes.length : 0;
			this._pNumMouseEnableds = 0;
			this._renderableHead = null;
			this._entityHead = null;
//			this._pRenderableListItemPool.freeAll();
			this._pEntityListItemPool.freeAll();
		}

		/**
		 *
		 */
		public enterNode(node:away.partition.NodeBase):boolean
		{
			var enter:boolean = this.scene._iCollectionMark != node._iCollectionMark && node.isInFrustum(this._cullPlanes, this._numCullPlanes);

			node._iCollectionMark = this.scene._iCollectionMark;

			return enter;
		}

		public sortRenderables()
		{
			//nothing here for now
		}

		/**
		 *
		 */
//		public applySkyBox(renderable:away.render.RenderableBase)
//		{
//			this._pSkyBox = renderable;
//		}

		/**
		 *
		 */
		public applyEntity(entity:away.entities.IEntity)
		{
			++this._pNumEntities;

			var item:away.pool.EntityListItem = this._pEntityListItemPool.getItem();
			item.entity = entity;

			item.next = this._entityHead;
			this._entityHead = item;

			if (entity.assetType == away.library.AssetType.BILLBOARD)
				this.applyBillboard(<away.entities.Billboard> entity);
		}

		/**
		 * Cleans up any data at the end of a frame.
		 */
		public cleanUp()
		{
		}


		/**
		 *
		 * @param billboard
		 * @private
		 */
		private applyBillboard(billboard:away.entities.Billboard)
		{
			var renderable:away.render.CSSBillboardRenderable = <away.render.CSSBillboardRenderable> CSSEntityCollector._billboardRenderablePool[billboard.id];

			if (renderable) {
				renderable.animator = billboard.animator;
				renderable.material = <away.materials.CSSMaterialBase> billboard.material;
			} else {
				renderable = CSSEntityCollector._billboardRenderablePool[billboard.id] = new away.render.CSSBillboardRenderable(billboard, <away.materials.CSSMaterialBase> billboard.material, billboard.animator);
			}

			this.applyRenderable(renderable);
		}

		/**
		 *
		 * @param renderable
		 * @private
		 */
		private applyRenderable(renderable:away.render.CSSRenderableBase)
		{
			var material:away.materials.CSSMaterialBase = renderable.material;
			var entity:away.entities.IEntity = renderable.sourceEntity;
			var position:away.geom.Vector3D = entity.scenePosition;

			if (renderable.sourceEntity._iIsMouseEnabled())
				++this._pNumMouseEnableds;

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
		 * //TODO
		 *
		 * @param entity
		 * @param shortestCollisionDistance
		 * @param findClosest
		 * @returns {boolean}
		 *
		 * @internal
		 */
		public _iCollidesBefore(entity:away.entities.IEntity, shortestCollisionDistance:number, findClosest:boolean):boolean
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