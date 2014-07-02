///<reference path="../_definitions.ts" />

module away.containers
{
	import DisplayObject			= away.base.DisplayObject;
	import DisplayObjectContainer	= away.containers.DisplayObjectContainer;
	import SceneEvent				= away.events.SceneEvent;
	import NodeBase					= away.partition.NodeBase;
	import Partition				= away.partition.Partition;
	import ICollector				= away.traverse.ICollector;

	export class Scene extends away.events.EventDispatcher
	{
		private _expandedPartitions:Array<Partition> = new Array<Partition>();
		private _partitions:Array<Partition> = new Array<Partition>();

		public _iSceneGraphRoot:DisplayObjectContainer;
		public _iCollectionMark = 0;

		constructor()
		{
			super();

			this._iSceneGraphRoot = new DisplayObjectContainer();

			this._iSceneGraphRoot._iSetScene(this);
			this._iSceneGraphRoot._iIsRoot = true;
			this._iSceneGraphRoot.partition = new Partition(new NodeBase());
		}

		public traversePartitions(traverser:ICollector)
		{
			var i:number = 0;
			var len:number = this._partitions.length;

			traverser.scene = this;

			while (i < len) {
				this._iCollectionMark++;
				this._partitions[i++].traverse(traverser);
			}
		}

		public get partition():Partition
		{
			return this._iSceneGraphRoot.partition;
		}

		public set partition(value:Partition)
		{
			this._iSceneGraphRoot.partition = value;

			this.dispatchEvent(new SceneEvent(SceneEvent.PARTITION_CHANGED, this._iSceneGraphRoot));
		}

		public contains(child:DisplayObject):boolean
		{
			return this._iSceneGraphRoot.contains(child);
		}

		public addChild(child:DisplayObject):DisplayObject
		{
			return this._iSceneGraphRoot.addChild(child);
		}

		public removeChild(child:DisplayObject)
		{
			this._iSceneGraphRoot.removeChild(child);
		}

		public removeChildAt(index:number)
		{
			this._iSceneGraphRoot.removeChildAt(index);
		}


		public getChildAt(index:number):DisplayObject
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
		public iRegisterEntity(displayObject:DisplayObject)
		{
			if (displayObject.partition)
				this.iRegisterPartition(displayObject.partition);

			if (displayObject.isEntity)
				displayObject._iAssignedPartition.iMarkForUpdate(displayObject);
		}

		/**
		 * @internal
		 */
		public iRegisterPartition(partition:Partition)
		{
			this._expandedPartitions.push(partition);

			//ensure duplicates are not found in partitions array
			if (this._partitions.indexOf(partition) == -1)
				this._partitions.push(partition);
		}

		/**
		 * @internal
		 */
		public iUnregisterEntity(displayObject:DisplayObject)
		{
			if (displayObject.partition)
				this.iUnregisterPartition(displayObject.partition);

			if (displayObject.isEntity)
				displayObject._iAssignedPartition.iRemoveEntity(displayObject);
		}

		/**
		 * @internal
		 */
		public iUnregisterPartition(partition:Partition)
		{
			this._expandedPartitions.splice(this._expandedPartitions.indexOf(partition), 1);

			//if no more partition references found, remove from partitions array
			if (this._expandedPartitions.indexOf(partition) == -1)
				this._partitions.splice(this._partitions.indexOf(partition), 1);
		}
	}
}