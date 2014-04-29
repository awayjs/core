///<reference path="../../_definitions.ts"/>

/**
 * @module away.partition
 */
module away.partition
{
	/**
	 * @class away.partition.EntityNode
	 */
	export class EntityNode extends NodeBase
	{

		private _entity:away.entities.IEntity;
		public _iUpdateQueueNext:EntityNode;

		constructor(entity:away.entities.IEntity)
		{
			super();
			this._entity = entity;
			this._iNumEntities = 1;
		}

		public get entity():away.entities.IEntity
		{
			return this._entity;
		}

		public removeFromParent():void
		{
			if (this._iParent)
				this._iParent.iRemoveNode(this);

			this._iParent = null;
		}

		/**
		 *
		 * @returns {boolean}
		 */
		public isCastingShadow():boolean
		{
			return this.entity.castsShadows;
		}

		/**
		 *
		 * @param planes
		 * @param numPlanes
		 * @returns {boolean}
		 */
		public isInFrustum(planes:away.geom.Plane3D[], numPlanes:number):boolean
		{
			if (!this._entity._iIsVisible())
				return false;

			return this._entity.worldBounds.isInFrustum(planes, numPlanes);
		}

		/**
		 * @inheritDoc
		 */
		public acceptTraverser(traverser:away.traverse.ICollector)
		{
			if (traverser.enterNode(<NodeBase> this))
				traverser.applyEntity(this._entity);
		}

		/**
		 * @inheritDoc
		 */
		public isIntersectingRay(rayPosition:away.geom.Vector3D, rayDirection:away.geom.Vector3D):boolean
		{
			if (!this._entity._iIsVisible())
				return false;

			return this._entity.isIntersectingRay(rayPosition, rayDirection);
		}

		/**
		 *
		 * @protected
		 */
		public _pCreateBoundsPrimitive():away.entities.IEntity
		{
			return this._entity.bounds.boundingEntity;
		}
	}
}