///<reference path="../../_definitions.ts"/>

/**
 * @module away.partition
 */
module away.partition
{
	import IEntity						= away.entities.IEntity;
	import ICollector					= away.traverse.ICollector;

	/**
	 * @class away.partition.PointLightNode
	 */
	export class PointLightNode extends EntityNode
	{
		private _pointLight:IEntity;

		/**
		 *
		 * @param pointLight
		 */
		constructor(pointLight:IEntity)
		{
			super(pointLight);

			this._pointLight = pointLight;
		}

		/**
		 * @inheritDoc
		 */
		public acceptTraverser(traverser:ICollector)
		{
			if (traverser.enterNode(<NodeBase> this))
				traverser.applyPointLight(this._pointLight);
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