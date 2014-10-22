import IMaterialOwner			= require("awayjs-core/lib/core/base/IMaterialOwner");
import SubGeometryBase			= require("awayjs-core/lib/core/base/SubGeometryBase");
import Mesh						= require("awayjs-core/lib/entities/Mesh");
import MaterialBase				= require("awayjs-core/lib/materials/MaterialBase");

/**
 * ISubMesh is an interface for object SubMesh that is used to
 * apply a material to a SubGeometry class
 *
 * @class away.base.ISubMesh
 */
interface ISubMesh extends IMaterialOwner
{
	subGeometry:SubGeometryBase;

	parentMesh:Mesh;

	_iIndex:number;

	_iInvalidateRenderableGeometry();

	_iGetExplicitMaterial():MaterialBase;
}

export = ISubMesh;