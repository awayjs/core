///<reference path="../../_definitions.ts"/>

/**
 * @module away.partition
 */
module away.partition
{
	import IEntity						= away.entities.IEntity;
	import Plane3D						= away.geom.Plane3D;

	/**
	 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
	 *
	 * @class away.partition.SkyboxNode
	 */
	export class SkyboxNode extends EntityNode
	{
		private _skyBox:IEntity;

		/**
		 * Creates a new SkyboxNode object.
		 * @param skyBox The Skybox to be contained in the node.
		 */
		constructor(skyBox:IEntity)
		{
			super(skyBox);

			this._skyBox = skyBox;
		}

		/**
		 *
		 * @param planes
		 * @param numPlanes
		 * @returns {boolean}
		 */
		public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
		{
			if (!this._skyBox._iIsVisible)
				return false;

			//a skybox is always in view unless its visibility is set to false
			return true;
		}
	}
}
