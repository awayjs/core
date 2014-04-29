///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
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
		new(subGeometry:SubGeometryBase, parentMesh:away.entities.Mesh, material?:away.materials.IMaterial):ISubMesh;
	}
}
