import ISubMesh					= require("awayjs-core/lib/core/base/ISubMesh");
import SubGeometryBase			= require("awayjs-core/lib/core/base/SubGeometryBase");
import Mesh						= require("awayjs-core/lib/entities/Mesh");
import MaterialBase				= require("awayjs-core/lib/materials/MaterialBase");

/**
 * ISubMeshClass is an interface for the constructable class definition ISubMesh that is used to
 * apply a material to a SubGeometry class
 *
 * @class away.base.ISubMeshClass
 */
interface ISubMeshClass
{
	/**
	 *
	 */
	new(subGeometry:SubGeometryBase, parentMesh:Mesh, material?:MaterialBase):ISubMesh;
}

export = ISubMeshClass;