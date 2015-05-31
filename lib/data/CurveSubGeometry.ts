import AttributesBuffer			= require("awayjs-core/lib/attributes/AttributesBuffer");
import Float3Attributes			= require("awayjs-core/lib/attributes/Float3Attributes");
import Float2Attributes			= require("awayjs-core/lib/attributes/Float2Attributes");
import Short3Attributes			= require("awayjs-core/lib/attributes/Short3Attributes");
import SubGeometryBase			= require("awayjs-core/lib/data/SubGeometryBase");
import Matrix3D					= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D					= require("awayjs-core/lib/geom/Vector3D");
import SubGeometryEvent			= require("awayjs-core/lib/events/SubGeometryEvent");
import SubGeometryUtils			= require("awayjs-core/lib/utils/SubGeometryUtils");

/**
 * @class away.base.CurveSubGeometry
 */
class CurveSubGeometry extends SubGeometryBase
{
	public static assetType:string = "[asset CurveSubGeometry]";

	private _numVertices:number = 0;
	private _uvsDirty:boolean = true;

	private _positions:Float3Attributes;
	private _curves:Float2Attributes;
	private _uvs:Float2Attributes;

	private _autoDeriveUVs:boolean = false;

	private _scaleU:number = 1;
	private _scaleV:number = 1;


	public get assetType():string
	{
		return CurveSubGeometry.assetType;
	}

	public get numVertices():number
	{
		return this._numVertices;
	}

	/**
	 * Defines whether a UV buffer should be automatically generated to contain dummy UV coordinates.
	 * Set to true if a geometry lacks UV data but uses a material that requires it, or leave as false
	 * in cases where UV data is explicitly defined or the material does not require UV data.
	 */
	public get autoDeriveUVs():boolean
	{
		return this._autoDeriveUVs;
	}

	public set autoDeriveUVs(value:boolean)
	{
		if (this._autoDeriveUVs == value)
			return;

		this._autoDeriveUVs = value;

		if (value)
			this._uvsDirty = true;
	}

	/**
	 *
	 */
	public get scaleU():number
	{
		return this._scaleU;
	}

	/**
	 *
	 */
	public get scaleV():number
	{
		return this._scaleV;
	}

	/**
	 *
	 */
	public get positions():Float3Attributes
	{
		return this._positions;
	}

	/**
	 *
	 */
	public get curves():Float2Attributes
	{
		return this._curves;
	}



	/**
	 *
	 */
	public get uvs():Float2Attributes
	{
		if (this._uvsDirty)
			this.setUVs(this._uvs);

		return this._uvs;
	}

	/**
	 *
	 */
	constructor(concatenatedBuffer:AttributesBuffer = null)
	{
		super(concatenatedBuffer);

		this._positions = new Float3Attributes(this._concatenatedBuffer);

		this._curves = new Float2Attributes(this._concatenatedBuffer);
	}

	public getBoundingPositions():Float32Array
	{
		return this._positions.get(this._numVertices);
	}

	/**
	 *
	 */
	public setPositions(array:Array<number>, offset?:number);
	public setPositions(float32Array:Float32Array, offset?:number);
	public setPositions(float3Attributes:Float3Attributes, offset?:number);
	public setPositions(values:any, offset:number = 0)
	{
		if (values == this._positions)
			return;

		if (values instanceof Float3Attributes) {
			this.notifyVerticesDispose(this._positions);
			this._positions = <Float3Attributes> values;
		} else if (values) {
			this._positions.set(values, offset);
		} else {
			this.notifyVerticesDispose(this._positions);
			this._positions = new Float3Attributes(this._concatenatedBuffer);
		}

		this._numVertices = this._positions.count;

		if (this._autoDeriveUVs)
			this.notifyVerticesUpdate(this._uvs);

		this.pInvalidateBounds();

		this.notifyVerticesUpdate(this._positions);

		this._verticesDirty[this._positions.id] = false;
	}

	/**
	 * Updates the vertex normals based on the geometry.
	 */
	public setCurves(array:Array<number>, offset?:number);
	public setCurves(float32Array:Float32Array, offset?:number);
	public setCurves(float2Attributes:Float2Attributes, offset?:number);
	public setCurves(values:any, offset:number = 0)
	{
		if (values == this._curves)
			return;

		if (values instanceof Float2Attributes) {
			this.notifyVerticesDispose(this._curves);
			this._curves = <Float2Attributes> values;
		} else if (values) {
			this._curves.set(values, offset);
		} else {
			this.notifyVerticesDispose(this._curves);
			this._curves = new Float2Attributes(this._concatenatedBuffer);
		}

		this.notifyVerticesUpdate(this._curves);

		this._verticesDirty[this._curves.id] = false;
	}


	/**
	 * Updates the uvs based on the geometry.
	 */
	public setUVs(array:Array<number>, offset?:number);
	public setUVs(float32Array:Float32Array, offset?:number);
	public setUVs(float2Attributes:Float2Attributes, offset?:number);
	public setUVs(values:any, offset:number = 0)
	{
		if (!this._autoDeriveUVs) {
			if (values == this._uvs)
				return;

			if (values instanceof Float2Attributes) {
				this.notifyVerticesDispose(this._uvs);
				this._uvs = <Float2Attributes> values;
			} else if (values) {
				if (!this._uvs)
					this._uvs = new Float2Attributes(this._concatenatedBuffer);

				this._uvs.set(values, offset);
			} else if (this._uvs) {
				this.notifyVerticesDispose(this._uvs);
				this._uvs = null;
				return;
			}
		} else {
			this._uvs = SubGeometryUtils.generateUVs(this._pIndices, this._uvs, this._concatenatedBuffer, this._numVertices);
		}

		this.notifyVerticesUpdate(this._uvs);

		this._verticesDirty[this._uvs.id] = false;
	}


	/**
	 *
	 */
	public dispose()
	{
		super.dispose();

		this._positions.dispose();
		this._positions = null;

		this._curves.dispose();
		this._curves = null;

		if (this._uvs) {
			this._uvs.dispose();
			this._uvs = null;
		}

	}

	/**
	 * Clones the current object
	 * @return An exact duplicate of the current object.
	 */
	public clone():CurveSubGeometry
	{
		var clone:CurveSubGeometry = new CurveSubGeometry(this._concatenatedBuffer? this._concatenatedBuffer.clone() : null);

		clone.setIndices(this._pIndices.clone());

		clone.setPositions(this._positions.clone());

		clone.setCurves(this._curves.clone());

		clone.setUVs((this._uvs && !this._autoDeriveUVs)? this._uvs.clone() : null);

		return clone;
	}

	public scaleUV(scaleU:number = 1, scaleV:number = 1)
	{
		SubGeometryUtils.scaleUVs(scaleU, scaleV, this.uvs, this.uvs.count);
	}

	/**
	 * Scales the geometry.
	 * @param scale The amount by which to scale.
	 */

	/**
	 * Scales the geometry.
	 * @param scale The amount by which to scale.
	 */
	public scale(scale:number)
	{
		SubGeometryUtils.scale(scale, this.positions, this._numVertices);
	}

	public applyTransformation(transform:Matrix3D)
	{
		SubGeometryUtils.applyTransformation(transform, this.positions, null, null, this.positions.count);
	}
}

export = CurveSubGeometry;