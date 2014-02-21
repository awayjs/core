///<reference path="../../_definitions.ts"/>

/**
 * @module away.partition
 */
module away.partition
{
	/**
	 * @class away.partition.Partition
	 */
	export class Partition
	{

		public _rootNode:NodeBase;
		private _updatesMade:Boolean = false;
		private _updateQueue:EntityNode;

		constructor(rootNode:NodeBase)
		{
			this._rootNode = rootNode || <NodeBase> new NullNode();
		}

		public get rootNode():NodeBase
		{
			return this._rootNode;
		}

		public traverse(traverser:away.traverse.ICollector)
		{
			if (this._updatesMade)
				this.updateEntities();

			this._rootNode.acceptTraverser(traverser);
		}

		public iMarkForUpdate(entity:away.entities.IEntity)
		{
			var node:EntityNode = entity.partitionNode;
			var t:EntityNode = this._updateQueue;

			while (t) {
				if (node == t)
					return;

				t = t._iUpdateQueueNext;
			}

			node._iUpdateQueueNext = this._updateQueue;

			this._updateQueue = node;
			this._updatesMade = true;
		}

		public iRemoveEntity(entity:away.entities.IEntity)
		{
			var node:EntityNode = entity.partitionNode;
			var t:EntityNode;

			node.removeFromParent();

			if (node == this._updateQueue) {
				this._updateQueue = node._iUpdateQueueNext;
			} else {
				t = this._updateQueue;
				while (t && t._iUpdateQueueNext != node)
					t = t._iUpdateQueueNext;

				if (t)
					t._iUpdateQueueNext = node._iUpdateQueueNext;
			}

			node._iUpdateQueueNext = null;

			if (!this._updateQueue)
				this._updatesMade = false;
		}

		private updateEntities()
		{
			var node:EntityNode = this._updateQueue;
			var targetNode:NodeBase;
			var t:EntityNode;
			this._updateQueue = null;
			this._updatesMade = false;

			do {
				targetNode = this._rootNode.findPartitionForEntity(node.entity);

				if (node.parent != targetNode) {
					if (node)
						node.removeFromParent();

					targetNode.iAddNode(node);
				}

				t = node._iUpdateQueueNext;
				node._iUpdateQueueNext = null;

				//required for controllers with autoUpdate set to true
				node.entity._iInternalUpdate();

			} while ((node = t) != null);
		}
	}
}