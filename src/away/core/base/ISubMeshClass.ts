///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	import Mesh							= away.entities.Mesh;
	import MaterialBase					= away.materials.MaterialBase;

	/**
	 * ISubMeshClass is an interface for the constructable class definition ISubMesh that is used to
	 * apply a material to a SubGeometry class
	 *
	 * @class away.base.ISubMeshClass
	 */
	export interface ISubMeshClass
	{
		/**
		 *
		 */
		new(subGeometry:SubGeometryBase, parentMesh:Mesh, material?:MaterialBase):ISubMesh;
	}
}
