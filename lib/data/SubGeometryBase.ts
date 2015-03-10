import Geometry					= require("awayjs-core/lib/data/Geometry");
import AbstractMethodError		= require("awayjs-core/lib/errors/AbstractMethodError");
import SubGeometryEvent			= require("awayjs-core/lib/events/SubGeometryEvent");
import Matrix3D					= require("awayjs-core/lib/geom/Matrix3D");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import AssetBase				= require("awayjs-core/lib/library/AssetBase");

/**
 * @class away.base.TriangleSubGeometry
 */
class SubGeometryBase extends AssetBase
{
	public static VERTEX_DATA:string = "vertices";

	public _pStrideOffsetDirty:boolean = true;

	public _pIndices:Array<number> /*uint*/;
	public _pVertices:Array<number>;

	private _numIndices:number;
	private _numTriangles:number;
	public _pNumVertices:number;

	public _pConcatenateArrays:boolean = true;

	private _indicesUpdated:SubGeometryEvent;

	public _pStride:Object = new Object();
	public _pOffset:Object = new Object();

	public _pUpdateStrideOffset()
	{
		throw new AbstractMethodError();
	}

	/**
	 *
	 */
	public get concatenateArrays():boolean
	{
		return this._pConcatenateArrays;
	}

	public set concatenateArrays(value:boolean)
	{
		if (this._pConcatenateArrays == value)
			return;

		this._pConcatenateArrays = value;

		this._pStrideOffsetDirty = true;

		if (value)
			this._pNotifyVerticesUpdate();
	}

	/**
	 * The raw index data that define the faces.
	 */
	public get indices():Array<number>
	{
		return this._pIndices;
	}

	/**
	 * 
	 */
	public get vertices():Array<number>
	{
		this.updateVertices();

		return this._pVertices;
	}

	/**
	 * The total amount of triangles in the TriangleSubGeometry.
	 */
	public get numTriangles():number
	{
		return this._numTriangles;
	}

	public get numVertices():number
	{
		return this._pNumVertices;
	}

	/**
	 *
	 */
	constructor(concatenatedArrays:boolean)
	{
		super();

		this._pConcatenateArrays = concatenatedArrays;
	}

	/**
	 *
	 */
	public getStride(dataType:string)
	{
		if (this._pStrideOffsetDirty)
			this._pUpdateStrideOffset();

		return this._pStride[dataType];
	}

	/**
	 *
	 */
	public getOffset(dataType:string)
	{
		if (this._pStrideOffsetDirty)
			this._pUpdateStrideOffset();

		return this._pOffset[dataType];
	}

	public updateVertices()
	{
		throw new AbstractMethodError();
	}

	/**
	 *
	 */
	public dispose()
	{
		this._pIndices = null;
		this._pVertices = null;
	}

	/**
	 * Updates the face indices of the TriangleSubGeometry.
	 *
	 * @param indices The face indices to upload.
	 */
	public updateIndices(indices:Array<number>)
	{
		this._pIndices = indices;
		this._numIndices = indices.length;

		this._numTriangles = this._numIndices/3;

		this.notifyIndicesUpdate();
	}

	/**
	 * @protected
	 */
	public pInvalidateBounds()
	{
		if (this.parentGeometry)
			this.parentGeometry.iInvalidateBounds(this);
	}

	/**
	 * The Geometry object that 'owns' this TriangleSubGeometry object.
	 *
	 * @private
	 */
	public parentGeometry:Geometry;

	/**
	 * Clones the current object
	 * @return An exact duplicate of the current object.
	 */
	public clone():SubGeometryBase
	{
		throw new AbstractMethodError();
	}

	public applyTransformation(transform:Matrix3D)
	{

	}

	/**
	 * Scales the geometry.
	 * @param scale The amount by which to scale.
	 */
	public scale(scale:number)
	{

	}

	public scaleUV(scaleU:number = 1, scaleV:number = 1)
	{

	}

	public getBoundingPositions():Array<number>
	{
		throw new AbstractMethodError();
	}

	private notifyIndicesUpdate()
	{
		if (!this._indicesUpdated)
			this._indicesUpdated = new SubGeometryEvent(SubGeometryEvent.INDICES_UPDATED);

		this.dispatchEvent(this._indicesUpdated);
	}

	public _pNotifyVerticesUpdate()
	{
		throw new AbstractMethodError();
	}
}

export = SubGeometryBase;