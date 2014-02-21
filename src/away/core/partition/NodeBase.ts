///<reference path="../../_definitions.ts"/>


/**
 * @module away.partition
 */
module away.partition
{
	/**
	 * @class away.partition.NodeBase
	 */
	export class NodeBase
	{

		public _iParent:NodeBase;
		public _pChildNodes:Array<NodeBase>;
		public _pNumChildNodes:number = 0;
		public _pDebugPrimitive:away.entities.IEntity;

		public _iNumEntities:number = 0;
		public _iCollectionMark:number;// = 0;

		/**
		 *
		 */
		public get showDebugBounds():boolean
		{
			return this._pDebugPrimitive != null;
		}

		public set showDebugBounds(value:boolean)
		{
			if (this._pDebugPrimitive && value == true)
				return;

			if (!this._pDebugPrimitive && value == false)
				return;

			if (value) {
				this._pDebugPrimitive = this.pCreateDebugBounds();
			} else {
				this._pDebugPrimitive.dispose();
				this._pDebugPrimitive = null;
			}

			for (var i:number = 0; i < this._pNumChildNodes; ++i)
				this._pChildNodes[i].showDebugBounds = value;
		}

		/**
		 *
		 */
		public get parent():NodeBase
		{
			return this._iParent;
		}

		/**
		 *
		 * @protected
		 */
		public get _pNumEntities():number
		{
			return this._iNumEntities;
		}

		/**
		 *
		 */
		constructor()
		{
			this._pChildNodes = new Array<NodeBase>();
		}

		/**
		 *
		 * @param planes
		 * @param numPlanes
		 * @returns {boolean}
		 * @internal
		 */
		public isInFrustum(planes:away.geom.Plane3D[], numPlanes:number):boolean
		{
			return true;
		}

		/**
		 *
		 * @param rayPosition
		 * @param rayDirection
		 * @returns {boolean}
		 */
		public isIntersectingRay(rayPosition:away.geom.Vector3D, rayDirection:away.geom.Vector3D):boolean
		{
			return true;
		}

		/**
		 *
		 * @returns {boolean}
		 */
		public isCastingShadow():boolean
		{
			return true;
		}

		/**
		 *
		 * @param entity
		 * @returns {away.partition.NodeBase}
		 */
		public findPartitionForEntity(entity:away.entities.IEntity):NodeBase
		{
			return this;
		}

		/**
		 *
		 * @param traverser
		 */
		public acceptTraverser(traverser:away.traverse.ICollector)
		{
			if (this._pNumEntities == 0 && !this._pDebugPrimitive)
				return;

			if (traverser.enterNode(this)) {
				var i:number = 0;

				while (i < this._pNumChildNodes)
					this._pChildNodes[i++].acceptTraverser(traverser);

				if (this._pDebugPrimitive)
					this._pDebugPrimitive.partitionNode.acceptTraverser(traverser);
			}
		}

		/**
		 *
		 * @protected
		 */
		public pCreateDebugBounds():away.entities.IEntity
		{
			return null;
		}

		/**
		 *
		 * @param node
		 * @internal
		 */
		public iAddNode(node:NodeBase)
		{
			node._iParent = this;
			this._iNumEntities += node._pNumEntities;
			this._pChildNodes[ this._pNumChildNodes++ ] = node;
			node.showDebugBounds = this._pDebugPrimitive != null;

			var numEntities:number = node._pNumEntities;
			node = this;

			do {
				node._iNumEntities += numEntities;
			} while ((node = node._iParent) != null);
		}

		/**
		 *
		 * @param node
		 * @internal
		 */
		public iRemoveNode(node:NodeBase)
		{
			var index:number = this._pChildNodes.indexOf(node);
			this._pChildNodes[index] = this._pChildNodes[--this._pNumChildNodes];
			this._pChildNodes.pop();

			var numEntities:number = node._pNumEntities;
			node = this;

			do {
				node._pNumEntities -= numEntities;
			} while ((node = node._iParent) != null);
		}

//		public _pUpdateNumEntities(value:number)
//		{
//			var diff:number = value - this._pNumEntities;
//			var node:NodeBase = this;
//
//			do {
//				node._pNumEntities += diff;
//			} while ((node = node._iParent) != null);
//		}
	}
}