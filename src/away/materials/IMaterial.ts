///<reference path="../_definitions.ts"/>

/**
 * @module away.materials
 */
module away.materials
{
	/**
	 * @class away.materials.IMaterial
	 */
	export interface IMaterial
	{
		/**
		 *
		 *
		 * @param owner
		 */
		iAddOwner(owner:away.base.IMaterialOwner)


		/**
		 *
		 *
		 * @param owner
		 */
		iRemoveOwner(owner:away.base.IMaterialOwner)
	}
}