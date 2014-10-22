import ISubMesh					= require("awayjs-core/lib/core/base/ISubMesh");
import LineSubGeometry			= require("awayjs-core/lib/core/base/LineSubGeometry");
import SubMeshBase				= require("awayjs-core/lib/core/base/SubMeshBase");
import AssetType				= require("awayjs-core/lib/core/library/AssetType");
import IRenderer				= require("awayjs-core/lib/core/render/IRenderer");
import Mesh						= require("awayjs-core/lib/entities/Mesh");
import MaterialBase				= require("awayjs-core/lib/materials/MaterialBase");

/**
 * LineSubMesh wraps a LineSubGeometry as a scene graph instantiation. A LineSubMesh is owned by a Mesh object.
 *
 *
 * @see away.base.LineSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.LineSubMesh
 */
class LineSubMesh extends SubMeshBase implements ISubMesh
{
	private _subGeometry:LineSubGeometry;

	/**
	 *
	 */
	public get assetType():string
	{
		return AssetType.LINE_SUB_MESH;
	}

	/**
	 * The LineSubGeometry object which provides the geometry data for this LineSubMesh.
	 */
	public get subGeometry():LineSubGeometry
	{
		return this._subGeometry;
	}

	/**
	 * Creates a new LineSubMesh object
	 * @param subGeometry The LineSubGeometry object which provides the geometry data for this LineSubMesh.
	 * @param parentMesh The Mesh object to which this LineSubMesh belongs.
	 * @param material An optional material used to render this LineSubMesh.
	 */
	constructor(subGeometry:LineSubGeometry, parentMesh:Mesh, material:MaterialBase = null)
	{
		super();

		this._pParentMesh = parentMesh;
		this._subGeometry = subGeometry;
		this.material = material;
	}

	/**
	 *
	 */
	public dispose()
	{
		this.material = null;

		super.dispose();
	}

	public _iCollectRenderable(renderer:IRenderer)
	{
		renderer.applyLineSubMesh(this);
	}
}

export = LineSubMesh;