///<reference path="../../_definitions.ts"/>

/**
 * @module away.partition
 */
module away.partition
{
	import IEntity						= away.entities.IEntity;
	import ICollector					= away.traverse.ICollector;

	/**
	 * @class away.partition.LightProbeNode
	 */
	export class LightProbeNode extends EntityNode
	{
		private _lightProbe:IEntity;

		/**
		 *
		 * @param lightProbe
		 */
		constructor(lightProbe:IEntity)
		{
			super(lightProbe);

			this._lightProbe = lightProbe;
		}

		/**
		 * @inheritDoc
		 */
		public acceptTraverser(traverser:ICollector)
		{
			if (traverser.enterNode(this))
				traverser.applyLightProbe(this._lightProbe);
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