///<reference path="../_definitions.ts" />

module away.containers
{
	export class Scene extends away.events.EventDispatcher
	{
		private _expandedPartitions:Array<away.partition.Partition> = new Array<away.partition.Partition>();
		private _partitions:Array<away.partition.Partition> = new Array<away.partition.Partition>();

		public _iSceneGraphRoot:away.containers.DisplayObjectContainer;
		public _iCollectionMark = 0;

		constructor()
		{
			super();

			this._iSceneGraphRoot = new away.containers.DisplayObjectContainer();

			this._iSceneGraphRoot._iSetScene(this);
			this._iSceneGraphRoot._iIsRoot = true;
			this._iSceneGraphRoot.partition = new away.partition.Partition(new away.partition.NodeBase());
		}

		public traversePartitions(traverser:away.traverse.ICollector)
		{
			var i:number = 0;
			var len:number = this._partitions.length;

			traverser.scene = this;

			while (i < len) {
				this._iCollectionMark++;
				this._partitions[i++].traverse(traverser);
			}
		}

		public get partition():away.partition.Partition
		{
			return this._iSceneGraphRoot.partition;
		}

		public set partition(value:away.partition.Partition)
		{
			this._iSceneGraphRoot.partition = value;

			this.dispatchEvent(new away.events.SceneEvent(away.events.SceneEvent.PARTITION_CHANGED, this._iSceneGraphRoot));
		}

		public contains(child:away.base.DisplayObject):boolean
		{
			return this._iSceneGraphRoot.contains(child);
		}

		public addChild(child:away.base.DisplayObject):away.base.DisplayObject
		{
			return this._iSceneGraphRoot.addChild(child);
		}

		public removeChild(child:away.base.DisplayObject)
		{
			this._iSceneGraphRoot.removeChild(child);
		}

		public removeChildAt(index:number)
		{
			this._iSceneGraphRoot.removeChildAt(index);
		}


		public getChildAt(index:number):away.base.DisplayObject
		{
			return this._iSceneGraphRoot.getChildAt(index);
		}

		public get numChildren():number
		{
			return this._iSceneGraphRoot.numChildren;
		}

		/**
		 * @internal
		 */
		public iRegisterEntity(displayObject:away.base.DisplayObject)
		{
			if (displayObject.partition)
				this.iRegisterPartition(displayObject.partition);

			if (displayObject.isEntity)
				displayObject._iAssignedPartition.iMarkForUpdate(<away.entities.IEntity> displayObject);
		}

		/**
		 * @internal
		 */
		public iRegisterPartition(partition:away.partition.Partition)
		{
			this._expandedPartitions.push(partition);

			//ensure duplicates are not found in partitions array
			if (this._partitions.indexOf(partition) == -1)
				this._partitions.push(partition);
		}

		/**
		 * @internal
		 */
		public iUnregisterEntity(displayObject:away.base.DisplayObject)
		{
			if (displayObject.partition)
				this.iUnregisterPartition(displayObject.partition);

			if (displayObject.isEntity)
				displayObject._iAssignedPartition.iRemoveEntity(<away.entities.IEntity> displayObject);
		}

		/**
		 * @internal
		 */
		public iUnregisterPartition(partition:away.partition.Partition)
		{
			this._expandedPartitions.splice(this._expandedPartitions.indexOf(partition), 1);

			//if no more partition references found, remove from partitions array
			if (this._expandedPartitions.indexOf(partition) == -1)
				this._partitions.splice(this._partitions.indexOf(partition), 1);
		}
	}
}