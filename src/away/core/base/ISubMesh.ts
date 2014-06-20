///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	import Mesh							= away.entities.Mesh;
	import MaterialBase					= away.materials.MaterialBase;

	/**
	 * ISubMesh is an interface for object SubMesh that is used to
	 * apply a material to a SubGeometry class
	 *
	 * @class away.base.ISubMesh
	 */
	export interface ISubMesh extends IMaterialOwner
	{
		subGeometry:SubGeometryBase;

		parentMesh:Mesh;

		_iIndex:number;

		_iInvalidateRenderableGeometry();

		_iGetExplicitMaterial():MaterialBase;
	}
}