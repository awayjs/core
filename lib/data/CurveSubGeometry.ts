import SubGeometryBase			= require("awayjs-core/lib/data/SubGeometryBase");
import Matrix3D					= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D					= require("awayjs-core/lib/geom/Vector3D");
import SubGeometryEvent			= require("awayjs-core/lib/events/SubGeometryEvent");

/**
 * @class away.base.CurveSubGeometry
 */
class CurveSubGeometry extends SubGeometryBase
{
	public static assetType:string = "[asset CurveSubGeometry]";

	public static POSITION_DATA:string = "positions";
    public static CURVE_DATA:string = "curves";
	public static UV_DATA:string = "uvs";

	//TODO - move these to StageGL
	public static POSITION_FORMAT:string = "float3";
	public static CURVE_FORMAT:string = "float2";
	public static UV_FORMAT:string = "float2";

	private _positionsDirty:boolean = true;
	private _curvesDirty:boolean = true;
	private _faceNormalsDirty:boolean = true;
    private _vertexNormalsDirty:boolean = true;
	private _uvsDirty:boolean = true;
	private _secondaryUVsDirty:boolean = true;
	private _jointIndicesDirty:boolean = true;
	private _jointWeightsDirty:boolean = true;

	private _positions:Array<number>;
	private _curves:Array<number>;
	private _uvs:Array<number>;


	private _useCondensedIndices:boolean;
	private _condensedJointIndices:Array<number>;
	private _condensedIndexLookUp:Array<number>;


	private _concatenateArrays:boolean = true;
	private _autoDeriveNormals:boolean = false;
	private _useFaceWeights:boolean = false;
    private _autoDeriveUVs:boolean = false;

	private _faceNormals:Array<number>;
	private _faceWeights:Array<number>;

	private _scaleU:number = 1;
	private _scaleV:number = 1;

	private _positionsUpdated:SubGeometryEvent;
	private _curvesUpdated:SubGeometryEvent;
	private _uvsUpdated:SubGeometryEvent;
	private _secondaryUVsUpdated:SubGeometryEvent;


	public get assetType():string
	{
		return CurveSubGeometry.assetType;
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
	 * Offers the option of enabling GPU accelerated animation on skeletons larger than 32 joints
	 * by condensing the number of joint index values required per mesh. Only applicable to
	 * skeleton animations that utilise more than one mesh object. Defaults to false.
	 */
	public get useCondensedIndices():boolean
	{
		return this._useCondensedIndices;
	}

	public set useCondensedIndices(value:boolean)
	{
		if (this._useCondensedIndices == value)
			return;

		this._useCondensedIndices = value;
	}

	public _pUpdateStrideOffset()
	{
		if (this._concatenateArrays) {
			this._pOffset[CurveSubGeometry.VERTEX_DATA] = 0;

			//always have positions
			this._pOffset[CurveSubGeometry.POSITION_DATA] = 0;
			var stride:number = 3;

			if (this._curves != null) {
				this._pOffset[CurveSubGeometry.CURVE_DATA] = stride;
				stride += 2;
			}

			if (this._uvs != null) {
				this._pOffset[CurveSubGeometry.UV_DATA] = stride;
				stride += 2;
			}



			this._pStride[CurveSubGeometry.VERTEX_DATA] = stride;
			this._pStride[CurveSubGeometry.POSITION_DATA] = stride;
			this._pStride[CurveSubGeometry.CURVE_DATA] = stride;
			this._pStride[CurveSubGeometry.UV_DATA] = stride;

			var len:number = this._pNumVertices*stride;

			if (this._pVertices == null)
				this._pVertices = new Array<number>(len);
			else if (this._pVertices.length != len)
				this._pVertices.length = len;

		} else {
			this._pOffset[CurveSubGeometry.POSITION_DATA] = 0;
			this._pOffset[CurveSubGeometry.CURVE_DATA] = 0;
			this._pOffset[CurveSubGeometry.UV_DATA] = 0;


			this._pStride[CurveSubGeometry.POSITION_DATA] = 3;
			this._pStride[CurveSubGeometry.CURVE_DATA] = 2;
			this._pStride[CurveSubGeometry.UV_DATA] = 2;
		}

		this._pStrideOffsetDirty = false;
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
			this.notifyUVsUpdate();
	}

	/**
	 * True if the vertex normals should be derived from the geometry, false if the vertex normals are set
	 * explicitly.
	 */
	public get autoDeriveNormals():boolean
	{
		return this._autoDeriveNormals;
	}

    //remove
	public set autoDeriveNormals(value:boolean)
	{
		if (this._autoDeriveNormals == value)
			return;

		this._autoDeriveNormals = value;

	}



	/**
	 *
	 */
	public get vertices():Array<number>
	{
		if (this._positionsDirty)
			this.updatePositions(this._positions);

        if (this._curvesDirty)
            this.updateCurves(this._curves);

		if (this._uvsDirty)
			this.updateUVs(this._uvs);

		return this._pVertices;
	}

	/**
	 *
	 */
	public get positions():Array<number>
	{
		if (this._positionsDirty)
			this.updatePositions(this._positions);

		return this._positions;
	}

	/**
	 *
	 */
	public get curves():Array<number>
	{
		if (this._curvesDirty)
			this.updateCurves(this._curves);

		return this._curves;
	}



	/**
	 * The raw data of the face normals, in the same order as the faces are listed in the index list.
	 */
	public get faceNormals():Array<number>
	{
		if (this._faceNormalsDirty)
			this.updateFaceNormals();

		return this._faceNormals;
	}


	/**
	 *
	 */
	public get uvs():Array<number>
	{
		if (this._uvsDirty)
			this.updateUVs(this._uvs);

		return this._uvs;
	}




	/**
	 * Indicates whether or not to take the size of faces into account when auto-deriving vertex normals and tangents.
	 */
	public get useFaceWeights():boolean
	{
		return this._useFaceWeights;
	}

	public set useFaceWeights(value:boolean)
	{
		if (this._useFaceWeights == value)
			return;

		this._useFaceWeights = value;


		this._faceNormalsDirty = true;
	}


	public get condensedIndexLookUp():Array<number>
	{


		return this._condensedIndexLookUp;
	}

	/**
	 *
	 */
	constructor(concatenatedArrays:boolean)
	{
		super(concatenatedArrays);
	}

	public getBoundingPositions():Array<number>
	{
		if (this._positionsDirty)
			this.updatePositions(this._positions);

		return this._positions;
	}

	/**
	 *
	 */
	public updatePositions(values:Array<number>)
	{
		var i:number;
		var index:number;
		var stride:number;
		var positions:Array<number>;

		this._positions = values;

		if (this._positions == null)
			this._positions = new Array<number>();

		this._pNumVertices = this._positions.length/3;

		if (this._concatenateArrays) {
			var len:number = this._pNumVertices*this.getStride(CurveSubGeometry.VERTEX_DATA);

			if (this._pVertices == null)
				this._pVertices = new Array<number>(len);
			else if (this._pVertices.length != len)
				this._pVertices.length = len;

			i = 0;
			index = this.getOffset(CurveSubGeometry.POSITION_DATA);
			stride = this.getStride(CurveSubGeometry.POSITION_DATA);
			positions = this._pVertices;

			while (i < values.length) {
				positions[index] = values[i++];
				positions[index + 1] = values[i++];
				positions[index + 2] = values[i++];
				index += stride;
			}
		}

		this.pInvalidateBounds();

		this.notifyPositionsUpdate();

		this._positionsDirty = false;
	}

	/**
	 * Updates the vertex normals based on the geometry.
	 */
	public updateCurves(values:Array<number>)
	{
		var i:number;
		var index:number;
		var offset:number;
		var stride:number;
		var curves:Array<number>;

		if (true) {
			if ((this._curves == null || values == null) && (this._curves != null || values != null)) {
				if (this._concatenateArrays)
					this._pNotifyVerticesUpdate();
				else
					this._pStrideOffsetDirty = true;
			}

			this._curves = values;

			if (values != null && this._concatenateArrays) {
				i = 0;
				index = this.getOffset(CurveSubGeometry.CURVE_DATA);
				stride = this.getStride(CurveSubGeometry.CURVE_DATA);
                curves = this._pVertices;

				while (i < values.length) {
                    curves[index] = values[i++];
                    curves[index + 1] = values[i++];
					index += stride;
				}
			}
		}
		this.notifyCurvesUpdate();

		this._curvesDirty = false;
	}



	/**
	 * Updates the uvs based on the geometry.
	 */
	public updateUVs(values:Array<number>)
	{
		var i:number;
		var index:number;
		var offset:number;
		var stride:number;
		var uvs:Array<number>;

		if (!this._autoDeriveUVs) {
			if ((this._uvs == null || values == null) && (this._uvs != null || values != null)) {
				if (this._concatenateArrays)
					this._pNotifyVerticesUpdate();
				else
					this._pStrideOffsetDirty = true;
			}

			this._uvs = values;

			if (values != null && this._concatenateArrays) {
				i = 0;
				index = this.getOffset(CurveSubGeometry.UV_DATA);
				stride = this.getStride(CurveSubGeometry.UV_DATA);
				uvs = this._pVertices;

				while (i < values.length) {
					uvs[index] = values[i++];
					uvs[index + 1] = values[i++];
					index += stride;
				}
			}

		} else {
			if (this._uvs == null) {
				this._uvs = new Array<number>(this._positions.length*2/3);

				if (this._concatenateArrays)
					this._pNotifyVerticesUpdate();
				else
					this._pStrideOffsetDirty = true;
			}

			offset = this.getOffset(CurveSubGeometry.UV_DATA);
			stride = this.getStride(CurveSubGeometry.UV_DATA);

			//autoderived uvs
			uvs = this._concatenateArrays? this._pVertices : this._uvs;

			i = 0;
			index = offset;
			var uvIdx:number = 0;

			//clear uv values
			var lenV:number = uvs.length;
			while (index < lenV) {
				if (this._concatenateArrays) {
					this._uvs[i++] = uvs[index] = uvIdx*.5;
					this._uvs[i++] = uvs[index + 1] = 1.0 - (uvIdx & 1);
				} else {
					uvs[index] = uvIdx*.5;
					uvs[index + 1] = 1.0 - (uvIdx & 1);
				}

				if (++uvIdx == 3)
					uvIdx = 0;

				index += stride;
			}
		}

		this.notifyUVsUpdate();

		this._uvsDirty = false;
	}





	/**
	 *
	 */
	public dispose()
	{
		super.dispose();

		this._positions = null;
		this._curves = null;
		this._uvs = null;

		this._faceNormals = null;
		this._faceWeights = null;
	}

	/**
	 * Updates the face indices of the CurveSubGeometry.
	 *
	 * @param indices The face indices to upload.
	 */
	public updateIndices(indices:Array<number>)
	{
		super.updateIndices(indices);

		this._faceNormalsDirty = true;

		if (this._autoDeriveNormals)
			this._vertexNormalsDirty = true;

	}

	/**
	 * Clones the current object
	 * @return An exact duplicate of the current object.
	 */
	public clone():CurveSubGeometry
	{
		var clone:CurveSubGeometry = new CurveSubGeometry(this._concatenateArrays);
		clone.updateIndices(this._pIndices.concat());
		clone.updatePositions(this._positions.concat());

		if (this._curves)
			clone.updateCurves(this._curves.concat());
		else
			clone.updateCurves(null);

		if (this._uvs && !this._autoDeriveUVs)
			clone.updateUVs(this._uvs.concat());
		else
			clone.updateUVs(null);

		return clone;
	}

	public scaleUV(scaleU:number = 1, scaleV:number = 1)
	{
		var index:number;
		var offset:number;
		var stride:number;
		var uvs:Array<number>;

		uvs = this._uvs;

		var ratioU:number = scaleU/this._scaleU;
		var ratioV:number = scaleV/this._scaleV;

		this._scaleU = scaleU;
		this._scaleV = scaleV;

		var len:number = uvs.length;

		offset = 0;
		stride = 2;

		index = offset;

		while (index < len) {
			uvs[index] *= ratioU;
			uvs[index + 1] *= ratioV;
			index += stride;
		}

		this.notifyUVsUpdate();
	}

	/**
	 * Scales the geometry.
	 * @param scale The amount by which to scale.
	 */
	public scale(scale:number)
	{
		var i:number;
		var index:number;
		var offset:number;
		var stride:number;
		var positions:Array<number>;

		positions = this._positions;

		var len:number = positions.length;

		offset = 0;
		stride = 3;

		i = 0;
		index = offset;
		while (i < len) {
			positions[index] *= scale;
			positions[index + 1] *= scale;
			positions[index + 2] *= scale;

			i += 3;
			index += stride;
		}

		this.notifyPositionsUpdate();
	}

	public applyTransformation(transform:Matrix3D)
	{
		var positions:Array<number>;

		if (this._concatenateArrays) {
			positions = this._pVertices;
		} else {
			positions = this._positions;
		}

		var len:number = this._positions.length/3;
		var i:number;
		var i1:number;
		var i2:number;
		var vector:Vector3D = new Vector3D();

		var invTranspose:Matrix3D;



		var vi0:number = this.getOffset(CurveSubGeometry.POSITION_DATA);
		var vStride:number = this.getStride(CurveSubGeometry.POSITION_DATA);

		for (i = 0; i < len; ++i) {
			i1 = vi0 + 1;
			i2 = vi0 + 2;

			// bake position
			vector.x = positions[vi0];
			vector.y = positions[i1];
			vector.z = positions[i2];
			vector = transform.transformVector(vector);
			positions[vi0] = vector.x;
			positions[i1] = vector.y;
			positions[i2] = vector.z;
			vi0 += vStride;

		}

		this.notifyPositionsUpdate();
	}



	/**
	 * Updates the normals for each face.
	 */
	private updateFaceNormals()
	{
		var i:number = 0;
		var j:number = 0;
		var k:number = 0;
		var index:number;
		var offset:number;
		var stride:number;

		var x1:number, x2:number, x3:number;
		var y1:number, y2:number, y3:number;
		var z1:number, z2:number, z3:number;
		var dx1:number, dy1:number, dz1:number;
		var dx2:number, dy2:number, dz2:number;
		var cx:number, cy:number, cz:number;
		var d:number;

		var positions:Array<number> = this._positions;

		var len:number = this._pIndices.length;

		if (this._faceNormals == null)
			this._faceNormals = new Array<number>(len);

		if (this._useFaceWeights && this._faceWeights == null)
			this._faceWeights = new Array<number>(len/3);

		while (i < len) {
			index = this._pIndices[i++]*3;
			x1 = positions[index];
			y1 = positions[index + 1];
			z1 = positions[index + 2];
			index = this._pIndices[i++]*3;
			x2 = positions[index];
			y2 = positions[index + 1];
			z2 = positions[index + 2];
			index = this._pIndices[i++]*3;
			x3 = positions[index];
			y3 = positions[index + 1];
			z3 = positions[index + 2];
			dx1 = x3 - x1;
			dy1 = y3 - y1;
			dz1 = z3 - z1;
			dx2 = x2 - x1;
			dy2 = y2 - y1;
			dz2 = z2 - z1;
			cx = dz1*dy2 - dy1*dz2;
			cy = dx1*dz2 - dz1*dx2;
			cz = dy1*dx2 - dx1*dy2;
			d = Math.sqrt(cx*cx + cy*cy + cz*cz);
			// length of cross product = 2*triangle area

			if (this._useFaceWeights) {
				var w:number = d*10000;

				if (w < 1)
					w = 1;

				this._faceWeights[k++] = w;
			}

			d = 1/d;

			this._faceNormals[j++] = cx*d;
			this._faceNormals[j++] = cy*d;
			this._faceNormals[j++] = cz*d;
		}

		this._faceNormalsDirty = false;
	}

	public _pNotifyVerticesUpdate()
	{
		this._pStrideOffsetDirty = true;

		this.notifyPositionsUpdate();
		this.notifyCurvesUpdate();
		this.notifyUVsUpdate();
	}

	private notifyPositionsUpdate()
	{
		if (this._positionsDirty)
			return;

		this._positionsDirty = true;

		if (!this._positionsUpdated)
			this._positionsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, CurveSubGeometry.POSITION_DATA);

		this.dispatchEvent(this._positionsUpdated);
	}

	private notifyCurvesUpdate()
	{
		if (this._curvesDirty)
			return;

		this._curvesDirty = true;

		if (!this._curvesUpdated)
			this._curvesUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, CurveSubGeometry.CURVE_DATA);

		this.dispatchEvent(this._curvesUpdated);
	}



	private notifyUVsUpdate() {
        if (this._uvsDirty)
            return;

        this._uvsDirty = true;

        if (!this._uvsUpdated)
            this._uvsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, CurveSubGeometry.UV_DATA);

        this.dispatchEvent(this._uvsUpdated);
    }
}

export = CurveSubGeometry;