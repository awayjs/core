///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	/**
	 * ISubMeshClass is an interface for the constructable class definition SubMesh that is used to
	 * create apply a marterial to a SubGeometry class
	 *
	 * @class away.base.ISubMeshClass
	 */
	export interface ISubMesh extends IMaterialOwner
	{
		subGeometry:SubGeometryBase;

		parentMesh:away.entities.Mesh;

		_iIndex:number;

		_iInvalidateRenderableGeometry();

		_iGetExplicitMaterial():away.materials.IMaterial;
	}
}