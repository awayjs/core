import AttributesBuffer			= require("awayjs-core/lib/attributes/AttributesBuffer");
import AttributesView			= require("awayjs-core/lib/attributes/AttributesView");
import Float3Attributes			= require("awayjs-core/lib/attributes/Float3Attributes");
import Short3Attributes			= require("awayjs-core/lib/attributes/Short3Attributes");
import Geometry					= require("awayjs-core/lib/data/Geometry");
import AbstractMethodError		= require("awayjs-core/lib/errors/AbstractMethodError");
import SubGeometryEvent			= require("awayjs-core/lib/events/SubGeometryEvent");
import Matrix3D					= require("awayjs-core/lib/geom/Matrix3D");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import AssetBase				= require("awayjs-core/lib/library/AssetBase");
import ISubGeometryVO			= require("awayjs-core/lib/vos/ISubGeometryVO");

/**
 * @class away.base.TriangleSubGeometry
 */
class SubGeometryBase extends AssetBase
{
	private _subGeometryVO:Array<ISubGeometryVO> = new Array<ISubGeometryVO>();
	
	public _pIndices:Short3Attributes;

	private _numElements:number = 0;

	public _concatenatedBuffer:AttributesBuffer;

	private _indicesUpdated:SubGeometryEvent;

	public _verticesDirty:Object = new Object();
	public _verticesUpdated:Object = new Object();

	public get concatenatedBuffer():AttributesBuffer
	{
		return this._concatenatedBuffer;
	}

	/**
	 * The raw index data that define the faces.
	 */
	public get indices():Short3Attributes
	{
		return this._pIndices;
	}

	/**
	 * The total amount of triangles in the TriangleSubGeometry.
	 */
	public get numElements():number
	{
		return this._numElements;
	}

	public get numVertices():number
	{
		throw new AbstractMethodError();
	}

	/**
	 *
	 */
	constructor(concatenatedBuffer:AttributesBuffer = null)
	{
		super();

		this._concatenatedBuffer = concatenatedBuffer;
	}


	/**
	 *
	 */
	public invalidate():void
	{
		var len:number = this._subGeometryVO.length;
		for (var i:number = 0; i < len; i++)
			this._subGeometryVO[i].invalidate();
	}

	/**
	 *
	 */
	public dispose()
	{
		while (this._subGeometryVO.length)
			this._subGeometryVO[0].dispose();

		this._pIndices.dispose();
		this._pIndices = null;
	}

	/**
	 * Updates the face indices of the TriangleSubGeometry.
	 *
	 * @param indices The face indices to upload.
	 */
	public setIndices(array:Array<number>, offset?:number);
	public setIndices(uint16Array:Uint16Array, offset?:number);
	public setIndices(short3Attributes:Short3Attributes, offset?:number);
	public setIndices(values:any, offset:number = 0)
	{
		if (values instanceof Short3Attributes) {
			if (this._pIndices)
				this.notifyIndicesDispose();

			this._pIndices = <Short3Attributes> values;
		} else if (values) {
			if (!this._pIndices)
				this._pIndices = new Short3Attributes();

			this._pIndices.set(values, offset);
		} else if (this._pIndices) {
			this._pIndices.dispose();
			this._pIndices = null;

			this.notifyIndicesDispose();
		}

		if (this._pIndices) {
			this._numElements = this._pIndices.count;

			this.notifyIndicesUpdate();
		} else {
			this._numElements = 0;
		}
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

	public getBoundingPositions():Float32Array
	{
		throw new AbstractMethodError();
	}

	private notifyIndicesUpdate()
	{
		if (!this._indicesUpdated)
			this._indicesUpdated = new SubGeometryEvent(SubGeometryEvent.INDICES_UPDATED, this._pIndices);

		this.dispatchEvent(this._indicesUpdated);
	}

	private notifyIndicesDispose()
	{
		this.dispatchEvent(new SubGeometryEvent(SubGeometryEvent.INDICES_DISPOSED, this._pIndices));
	}

	public notifyVerticesUpdate(attributesView:AttributesView)
	{
		if (!attributesView || this._verticesDirty[attributesView.id])
			return;

		this._verticesDirty[attributesView.id] = true;

		if (!this._verticesUpdated[attributesView.id])
			this._verticesUpdated[attributesView.id] = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, attributesView);

		this.dispatchEvent(this._verticesUpdated[attributesView.id]);
	}


	public notifyVerticesDispose(attributesView:AttributesView)
	{
		if (!attributesView)
			return;

		attributesView.dispose();

		this.dispatchEvent(new SubGeometryEvent(SubGeometryEvent.VERTICES_DISPOSED, attributesView));

		this._verticesDirty[attributesView.id] = null;
		this._verticesUpdated[attributesView.id] = null;
	}

	public _iAddSubGeometryVO(subGeometryVO:ISubGeometryVO):ISubGeometryVO
	{
		this._subGeometryVO.push(subGeometryVO);

		return subGeometryVO;
	}

	public _iRemoveSubGeometryVO(subGeometryVO:ISubGeometryVO):ISubGeometryVO
	{
		this._subGeometryVO.splice(this._subGeometryVO.indexOf(subGeometryVO), 1);

		return subGeometryVO;
	}
}

export = SubGeometryBase;