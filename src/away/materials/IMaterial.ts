///<reference path="../_definitions.ts"/>

/**
 * @module away.materials
 */
module away.materials
{
	/**
	 * @class away.materials.IMaterial
	 */
	export interface IMaterial extends away.library.IAsset
	{
		/**
		 *
		 */
		height:number;

		/**
		 *
		 */
		requiresBlending:boolean;

		/**
		 *
		 */
		width:number;


		/**
		 * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
		 *
		 * @private
		 */
		_iMaterialId:number;

		/**
		 * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
		 *
		 * @private
		 */
		_iRenderOrderId:number;


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