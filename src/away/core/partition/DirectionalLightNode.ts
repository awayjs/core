///<reference path="../../_definitions.ts"/>

/**
 * @module away.partition
 */
module away.partition
{
	import IEntity						= away.entities.IEntity;
	import ICollector					= away.traverse.ICollector;

	/**
	 * @class away.partition.DirectionalLightNode
	 */
	export class DirectionalLightNode extends EntityNode
	{
		private _directionalLight:IEntity;

		/**
		 *
		 * @param directionalLight
		 */
		constructor(directionalLight:IEntity)
		{
			super(directionalLight);

			this._directionalLight = directionalLight;
		}

		/**
		 * @inheritDoc
		 */
		public acceptTraverser(traverser:ICollector)
		{
			if (traverser.enterNode(this))
				traverser.applyDirectionalLight(this._directionalLight);
		}

		/**
		 *
		 * @returns {boolean}
		 */
		public isCastingShadow():boolean
		{
			return false;
		}
	}
}