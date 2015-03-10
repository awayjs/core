import SubGeometryBase			= require("awayjs-core/lib/data/SubGeometryBase");
import Matrix3D					= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D					= require("awayjs-core/lib/geom/Vector3D");
import SubGeometryEvent			= require("awayjs-core/lib/events/SubGeometryEvent");

/**
 * @class away.base.TriangleSubGeometry
 */
class TriangleSubGeometry extends SubGeometryBase
{
	public static assetType:string = "[asset TriangleSubGeometry]";

	public static POSITION_DATA:string = "positions";
	public static NORMAL_DATA:string = "vertexNormals";
	public static TANGENT_DATA:string = "vertexTangents";
	public static UV_DATA:string = "uvs";
	public static SECONDARY_UV_DATA:string = "secondaryUVs";
	public static JOINT_INDEX_DATA:string = "jointIndices";
	public static JOINT_WEIGHT_DATA:string = "jointWeights";

	//TODO - move these to StageGL
	public static POSITION_FORMAT:string = "float3";
	public static NORMAL_FORMAT:string = "float3";
	public static TANGENT_FORMAT:string = "float3";
	public static UV_FORMAT:string = "float2";
	public static SECONDARY_UV_FORMAT:string = "float2";

	private _positionsDirty:boolean = true;
	private _faceNormalsDirty:boolean = true;
	private _faceTangentsDirty:boolean = true;
	private _vertexNormalsDirty:boolean = true;
	private _vertexTangentsDirty:boolean = true;
	private _uvsDirty:boolean = true;
	private _secondaryUVsDirty:boolean = true;
	private _jointIndicesDirty:boolean = true;
	private _jointWeightsDirty:boolean = true;

	private _positions:Array<number>;
	private _vertexNormals:Array<number>;
	private _vertexTangents:Array<number>;
	private _uvs:Array<number>;
	private _secondaryUVs:Array<number>;
	private _jointIndices:Array<number>;
	private _jointWeights:Array<number>;

	private _useCondensedIndices:boolean;
	private _condensedJointIndices:Array<number>;
	private _condensedIndexLookUp:Array<number>;
	private _numCondensedJoints:number;

	private _jointsPerVertex:number;

	private _concatenateArrays:boolean = true;
	private _autoDeriveNormals:boolean = true;
	private _autoDeriveTangents:boolean = true;
	private _autoDeriveUVs:boolean = false;
	private _useFaceWeights:boolean = false;

	private _faceNormals:Array<number>;
	private _faceTangents:Array<number>;
	private _faceWeights:Array<number>;

	private _scaleU:number = 1;
	private _scaleV:number = 1;

	private _positionsUpdated:SubGeometryEvent;
	private _normalsUpdated:SubGeometryEvent;
	private _tangentsUpdated:SubGeometryEvent;
	private _uvsUpdated:SubGeometryEvent;
	private _secondaryUVsUpdated:SubGeometryEvent;
	private _jointIndicesUpdated:SubGeometryEvent;
	private _jointWeightsUpdated:SubGeometryEvent;


	public get assetType():string
	{
		return TriangleSubGeometry.assetType;
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

		this.notifyJointIndicesUpdate();
	}

	public _pUpdateStrideOffset()
	{
		if (this._concatenateArrays) {
			this._pOffset[TriangleSubGeometry.VERTEX_DATA] = 0;

			//always have positions
			this._pOffset[TriangleSubGeometry.POSITION_DATA] = 0;
			var stride:number = 3;

			if (this._vertexNormals != null) {
				this._pOffset[TriangleSubGeometry.NORMAL_DATA] = stride;
				stride += 3;
			}

			if (this._vertexTangents != null) {
				this._pOffset[TriangleSubGeometry.TANGENT_DATA] = stride;
				stride += 3;
			}

			if (this._uvs != null) {
				this._pOffset[TriangleSubGeometry.UV_DATA] = stride;
				stride += 2;
			}

			if (this._secondaryUVs != null) {
				this._pOffset[TriangleSubGeometry.SECONDARY_UV_DATA] = stride;
				stride += 2;
			}

			if (this._jointIndices != null) {
				this._pOffset[TriangleSubGeometry.JOINT_INDEX_DATA] = stride;
				stride += this._jointsPerVertex;
			}

			if (this._jointWeights != null) {
				this._pOffset[TriangleSubGeometry.JOINT_WEIGHT_DATA] = stride;
				stride += this._jointsPerVertex;
			}

			this._pStride[TriangleSubGeometry.VERTEX_DATA] = stride;
			this._pStride[TriangleSubGeometry.POSITION_DATA] = stride;
			this._pStride[TriangleSubGeometry.NORMAL_DATA] = stride;
			this._pStride[TriangleSubGeometry.TANGENT_DATA] = stride;
			this._pStride[TriangleSubGeometry.UV_DATA] = stride;
			this._pStride[TriangleSubGeometry.SECONDARY_UV_DATA] = stride;
			this._pStride[TriangleSubGeometry.JOINT_INDEX_DATA] = stride;
			this._pStride[TriangleSubGeometry.JOINT_WEIGHT_DATA] = stride;

			var len:number = this._pNumVertices*stride;

			if (this._pVertices == null)
				this._pVertices = new Array<number>(len);
			else if (this._pVertices.length != len)
				this._pVertices.length = len;

		} else {
			this._pOffset[TriangleSubGeometry.POSITION_DATA] = 0;
			this._pOffset[TriangleSubGeometry.NORMAL_DATA] = 0;
			this._pOffset[TriangleSubGeometry.TANGENT_DATA] = 0;
			this._pOffset[TriangleSubGeometry.UV_DATA] = 0;
			this._pOffset[TriangleSubGeometry.SECONDARY_UV_DATA] = 0;
			this._pOffset[TriangleSubGeometry.JOINT_INDEX_DATA] = 0;
			this._pOffset[TriangleSubGeometry.JOINT_WEIGHT_DATA] = 0;

			this._pStride[TriangleSubGeometry.POSITION_DATA] = 3;
			this._pStride[TriangleSubGeometry.NORMAL_DATA] = 3;
			this._pStride[TriangleSubGeometry.TANGENT_DATA] = 3;
			this._pStride[TriangleSubGeometry.UV_DATA] = 2;
			this._pStride[TriangleSubGeometry.SECONDARY_UV_DATA] = 2;
			this._pStride[TriangleSubGeometry.JOINT_INDEX_DATA] = this._jointsPerVertex;
			this._pStride[TriangleSubGeometry.JOINT_WEIGHT_DATA] = this._jointsPerVertex;
		}

		this._pStrideOffsetDirty = false;
	}

	/**
	 *
	 */
	public get jointsPerVertex():number
	{
		return this._jointsPerVertex;
	}

	public set jointsPerVertex(value:number)
	{
		if (this._jointsPerVertex == value)
			return;

		this._jointsPerVertex = value;

		this._pStrideOffsetDirty = true;

		if (this._pConcatenateArrays)
			this._pNotifyVerticesUpdate();
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

	public set autoDeriveNormals(value:boolean)
	{
		if (this._autoDeriveNormals == value)
			return;

		this._autoDeriveNormals = value;

		if (value)
			this.notifyNormalsUpdate();
	}

	/**
	 * True if the vertex tangents should be derived from the geometry, false if the vertex normals are set
	 * explicitly.
	 */
	public get autoDeriveTangents():boolean
	{
		return this._autoDeriveTangents;
	}

	public set autoDeriveTangents(value:boolean)
	{
		if (this._autoDeriveTangents == value)
			return;

		this._autoDeriveTangents = value;

		if (value)
			this.notifyTangentsUpdate();
	}

	/**
	 *
	 */
	public get vertices():Array<number>
	{
		if (this._positionsDirty)
			this.updatePositions(this._positions);

		if (this._vertexNormalsDirty)
			this.updateVertexNormals(this._vertexNormals);

		if (this._vertexTangentsDirty)
			this.updateVertexTangents(this._vertexTangents);

		if (this._uvsDirty)
			this.updateUVs(this._uvs);

		if (this._secondaryUVsDirty)
			this.updateSecondaryUVs(this._secondaryUVs);

		if (this._jointIndicesDirty)
			this.updateJointIndices(this._jointIndices);

		if (this._jointWeightsDirty)
			this.updateJointWeights(this._jointWeights);

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
	public get vertexNormals():Array<number>
	{
		if (this._vertexNormalsDirty)
			this.updateVertexNormals(this._vertexNormals);

		return this._vertexNormals;
	}

	/**
	 *
	 */
	public get vertexTangents():Array<number>
	{
		if (this._vertexTangentsDirty)
			this.updateVertexTangents(this._vertexTangents);

		return this._vertexTangents;
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
	 * The raw data of the face tangets, in the same order as the faces are listed in the index list.
	 */
	public get faceTangents():Array<number>
	{
		if (this._faceTangentsDirty)
			this.updateFaceTangents();

		return this._faceTangents;
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
	 *
	 */
	public get secondaryUVs():Array<number>
	{
		if (this._secondaryUVsDirty)
			this.updateSecondaryUVs(this._secondaryUVs);

		return this._secondaryUVs;
	}

	/**
	 *
	 */
	public get jointIndices():Array<number>
	{
		if (this._jointIndicesDirty)
			this.updateJointIndices(this._jointIndices);

		if (this._useCondensedIndices)
			return this._condensedJointIndices;

		return this._jointIndices;
	}

	/**
	 *
	 */
	public get jointWeights():Array<number>
	{
		if (this._jointWeightsDirty)
			this.updateJointWeights(this._jointWeights);

		return this._jointWeights;
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

		if (this._autoDeriveNormals)
			this.notifyNormalsUpdate();

		if (this._autoDeriveTangents)
			this.notifyTangentsUpdate();

		this._faceNormalsDirty = true;
	}

	public get numCondensedJoints():number
	{
		if (this._jointIndicesDirty)
			this.updateJointIndices(this._jointIndices);

		return this._numCondensedJoints;
	}

	public get condensedIndexLookUp():Array<number>
	{
		if (this._jointIndicesDirty)
			this.updateJointIndices(this._jointIndices);

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
			var len:number = this._pNumVertices*this.getStride(TriangleSubGeometry.VERTEX_DATA);

			if (this._pVertices == null)
				this._pVertices = new Array<number>(len);
			else if (this._pVertices.length != len)
				this._pVertices.length = len;

			i = 0;
			index = this.getOffset(TriangleSubGeometry.POSITION_DATA);
			stride = this.getStride(TriangleSubGeometry.POSITION_DATA);
			positions = this._pVertices;

			while (i < values.length) {
				positions[index] = values[i++];
				positions[index + 1] = values[i++];
				positions[index + 2] = values[i++];
				index += stride;
			}
		}

		if (this._autoDeriveNormals)
			this.notifyNormalsUpdate();

		if (this._autoDeriveTangents)
			this.notifyTangentsUpdate();

		if (this._autoDeriveUVs)
			this.notifyUVsUpdate()

		this.pInvalidateBounds();

		this.notifyPositionsUpdate();

		this._positionsDirty = false;
	}

	/**
	 * Updates the vertex normals based on the geometry.
	 */
	public updateVertexNormals(values:Array<number>)
	{
		var i:number;
		var index:number;
		var offset:number;
		var stride:number;
		var normals:Array<number>;

		if (!this._autoDeriveNormals) {
			if ((this._vertexNormals == null || values == null) && (this._vertexNormals != null || values != null)) {
				if (this._concatenateArrays)
					this._pNotifyVerticesUpdate();
				else
					this._pStrideOffsetDirty = true;
			}

			this._vertexNormals = values;

			if (values != null && this._concatenateArrays) {
				i = 0;
				index = this.getOffset(TriangleSubGeometry.NORMAL_DATA);
				stride = this.getStride(TriangleSubGeometry.NORMAL_DATA);
				normals = this._pVertices;

				while (i < values.length) {
					normals[index] = values[i++];
					normals[index + 1] = values[i++];
					normals[index + 2] = values[i++];
					index += stride;
				}
			}
		} else {
			if (this._vertexNormals == null) {
				this._vertexNormals = new Array<number>(this._positions.length);

				if (this._concatenateArrays)
					this._pNotifyVerticesUpdate();
				else
					this._pStrideOffsetDirty = true;
			}

			if (this._faceNormalsDirty)
				this.updateFaceNormals();

			offset = this.getOffset(TriangleSubGeometry.NORMAL_DATA);
			stride = this.getStride(TriangleSubGeometry.NORMAL_DATA);

			//autoderived normals
			normals = this._concatenateArrays? this._pVertices : this._vertexNormals;

			var f1:number = 0;
			var f2:number = 1;
			var f3:number = 2;

			index = offset;

			//clear normal values
			var lenV:number = normals.length;
			while (index < lenV) {
				normals[index] = 0;
				normals[index + 1] = 0;
				normals[index + 2] = 0;
				index += stride;
			}

			var k:number = 0;
			var lenI:number = this._pIndices.length;
			var weight:number;

			i = 0;

			//collect face normals
			while (i < lenI) {
				weight = this._useFaceWeights? this._faceWeights[k++] : 1;
				index = offset + this._pIndices[i++]*stride;
				normals[index] += this._faceNormals[f1]*weight;
				normals[index + 1] += this._faceNormals[f2]*weight;
				normals[index + 2] += this._faceNormals[f3]*weight;
				index = offset + this._pIndices[i++]*stride;
				normals[index] += this._faceNormals[f1]*weight;
				normals[index + 1] += this._faceNormals[f2]*weight;
				normals[index + 2] += this._faceNormals[f3]*weight;
				index = offset + this._pIndices[i++]*stride;
				normals[index] += this._faceNormals[f1]*weight;
				normals[index + 1] += this._faceNormals[f2]*weight;
				normals[index + 2] += this._faceNormals[f3]*weight;
				f1 += 3;
				f2 += 3;
				f3 += 3;
			}

			i = 0;
			index = offset;

			//average normals collections
			while (index < lenV) {
				var vx:number = normals[index];
				var vy:number = normals[index + 1];
				var vz:number = normals[index + 2];
				var d:number = 1.0/Math.sqrt(vx*vx + vy*vy + vz*vz);

				if (this._concatenateArrays) {
					this._vertexNormals[i++] = normals[index] = vx*d;
					this._vertexNormals[i++] = normals[index + 1] = vy*d;
					this._vertexNormals[i++] = normals[index + 2] = vz*d;
				} else {
					normals[index] = vx*d;
					normals[index + 1] = vy*d;
					normals[index + 2] = vz*d;
				}

				index += stride;
			}
		}

		this.notifyNormalsUpdate();

		this._vertexNormalsDirty = false;
	}

	/**
	 * Updates the vertex tangents based on the geometry.
	 */
	public updateVertexTangents(values:Array<number>)
	{
		var i:number;
		var index:number;
		var offset:number;
		var stride:number;
		var tangents:Array<number>;

		if (!this._autoDeriveTangents) {
			if ((this._vertexTangents == null || values == null) && (this._vertexTangents != null || values != null)) {
				if (this._concatenateArrays)
					this._pNotifyVerticesUpdate();
				else
					this._pStrideOffsetDirty = true;
			}


			this._vertexTangents = values;

			if (values != null && this._concatenateArrays) {
				i = 0;
				index = this.getOffset(TriangleSubGeometry.TANGENT_DATA);
				stride = this.getStride(TriangleSubGeometry.TANGENT_DATA);
				tangents = this._pVertices;

				while (i < values.length) {
					tangents[index] = values[i++];
					tangents[index + 1] = values[i++];
					tangents[index + 2] = values[i++];
					index += stride;
				}
			}
		} else {
			if (this._vertexTangents == null) {
				this._vertexTangents = new Array<number>(this._positions.length);

				if (this._concatenateArrays)
					this._pNotifyVerticesUpdate();
				else
					this._pStrideOffsetDirty = true;
			}

			if (this._faceTangentsDirty)
				this.updateFaceTangents();

			offset = this.getOffset(TriangleSubGeometry.TANGENT_DATA);
			stride = this.getStride(TriangleSubGeometry.TANGENT_DATA);

			//autoderived tangents
			tangents = this._concatenateArrays? this._pVertices : this._vertexTangents;

			index = offset;

			//clear tangent values
			var lenV:number = tangents.length;
			while (index < lenV) {
				tangents[index] = 0;
				tangents[index + 1] = 0;
				tangents[index + 2] = 0;

				index += stride;
			}

			var k:number = 0;
			var weight:number;
			var f1:number = 0;
			var f2:number = 1;
			var f3:number = 2;

			i = 0;

			//collect face tangents
			var lenI:number = this._pIndices.length;
			while (i < lenI) {
				weight = this._useFaceWeights? this._faceWeights[k++] : 1;
				index = offset + this._pIndices[i++]*stride;
				tangents[index++] += this._faceTangents[f1]*weight;
				tangents[index++] += this._faceTangents[f2]*weight;
				tangents[index] += this._faceTangents[f3]*weight;
				index = offset + this._pIndices[i++]*stride;
				tangents[index++] += this._faceTangents[f1]*weight;
				tangents[index++] += this._faceTangents[f2]*weight;
				tangents[index] += this._faceTangents[f3]*weight;
				index = offset + this._pIndices[i++]*stride;
				tangents[index++] += this._faceTangents[f1]*weight;
				tangents[index++] += this._faceTangents[f2]*weight;
				tangents[index] += this._faceTangents[f3]*weight;
				f1 += 3;
				f2 += 3;
				f3 += 3;
			}

			i = 0;
			index = offset;

			//average tangents collections
			while (index < lenV) {
				var vx:number = tangents[index];
				var vy:number = tangents[index + 1];
				var vz:number = tangents[index + 2];
				var d:number = 1.0/Math.sqrt(vx*vx + vy*vy + vz*vz);

				if (this._concatenateArrays) {
					this._vertexTangents[i++] = tangents[index] = vx*d;
					this._vertexTangents[i++] = tangents[index + 1] = vy*d;
					this._vertexTangents[i++] = tangents[index + 2] = vz*d;
				} else {
					tangents[index] = vx*d;
					tangents[index + 1] = vy*d;
					tangents[index + 2] = vz*d;
				}

				index += stride;
			}
		}

		this.notifyTangentsUpdate();

		this._vertexTangentsDirty = false;
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
				index = this.getOffset(TriangleSubGeometry.UV_DATA);
				stride = this.getStride(TriangleSubGeometry.UV_DATA);
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

			offset = this.getOffset(TriangleSubGeometry.UV_DATA);
			stride = this.getStride(TriangleSubGeometry.UV_DATA);

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

		if (this._autoDeriveTangents)
			this.notifyTangentsUpdate();

		this.notifyUVsUpdate();

		this._uvsDirty = false;
	}

	/**
	 * Updates the secondary uvs based on the geometry.
	 */
	public updateSecondaryUVs(values:Array<number>)
	{
		var i:number;
		var index:number;
		var offset:number;
		var stride:number;
		var uvs:Array<number>;

		if (this._concatenateArrays && (this._secondaryUVs == null || values == null) && (this._secondaryUVs != null || values != null))
			this._pNotifyVerticesUpdate();

		this._secondaryUVs = values;

		if (values != null && this._concatenateArrays) {
			offset = this.getOffset(TriangleSubGeometry.SECONDARY_UV_DATA);
			stride = this.getStride(TriangleSubGeometry.SECONDARY_UV_DATA);

			i = 0;
			index = offset;
			uvs = this._pVertices;

			while (i < values.length) {
				uvs[index] = values[i++];
				uvs[index + 1] = values[i++];
				index += stride;
			}
		}

		this.notifySecondaryUVsUpdate();

		this._secondaryUVsDirty = false;
	}

	/**
	 * Updates the joint indices
	 */
	public updateJointIndices(values:Array<number>)
	{
		var i:number;
		var j:number;
		var index:number;
		var offset:number;
		var stride:number;
		var jointIndices:Array<number>;

		if (this._concatenateArrays && (this._jointIndices == null || values == null) && (this._jointIndices != null || values != null))
			this._pNotifyVerticesUpdate();

		this._jointIndices = values;

		if (values != null) {
			offset = this.getOffset(TriangleSubGeometry.JOINT_INDEX_DATA);
			stride = this.getStride(TriangleSubGeometry.JOINT_INDEX_DATA);
			if (this._useCondensedIndices) {
				i = 0;
				j = 0;
				index = offset;
				jointIndices = this._concatenateArrays? this._pVertices : this._condensedJointIndices;
				var oldIndex:number;
				var newIndex:number = 0;
				var dic:Object = new Object();

				if (!this._concatenateArrays)
					this._condensedJointIndices = new Array<number>(values.length);

				this._condensedIndexLookUp = new Array<number>();

				while (i < values.length) {
					for (j = 0; j < this._jointsPerVertex; j++) {
						oldIndex = values[i++];

						// if we encounter a new index, assign it a new condensed index
						if (dic[oldIndex] == undefined) {
							dic[oldIndex] = newIndex*3; //3 required for the three vectors that store the matrix
							this._condensedIndexLookUp[newIndex++] = oldIndex;
						}
						jointIndices[index + j] = dic[oldIndex];
					}
					index += stride;
				}
				this._numCondensedJoints = newIndex;
			} else if (this._concatenateArrays) {

				i = 0;
				index = offset;
				jointIndices = this._pVertices;

				while (i < values.length) {
					j = 0;
					while (j < this._jointsPerVertex)
						jointIndices[index + j++] = values[i++];
					index += stride;
				}
			}
		}

		this.notifyJointIndicesUpdate();

		this._jointIndicesDirty = false;
	}

	/**
	 * Updates the joint weights.
	 */
	public updateJointWeights(values:Array<number>)
	{
		var i:number;
		var j:number;
		var index:number;
		var offset:number;
		var stride:number;
		var jointWeights:Array<number>;

		if (this._concatenateArrays && (this._jointWeights == null || values == null) && (this._jointWeights != null || values != null))
			this._pNotifyVerticesUpdate();

		this._jointWeights = values;

		if (values != null && this._concatenateArrays) {
			offset = this.getOffset(TriangleSubGeometry.JOINT_WEIGHT_DATA);
			stride = this.getStride(TriangleSubGeometry.JOINT_WEIGHT_DATA);

			i = 0;
			index = offset;
			jointWeights = this._pVertices;

			while (i < values.length) {
				j = 0;
				while (j < this._jointsPerVertex)
					jointWeights[index + j++] = values[i++];
				index += stride;
			}
		}

		this.notifyJointWeightsUpdate();

		this._jointWeightsDirty = false;
	}

	/**
	 *
	 */
	public dispose()
	{
		super.dispose();

		this._positions = null;
		this._vertexNormals = null;
		this._vertexTangents = null;
		this._uvs = null;
		this._secondaryUVs = null;
		this._jointIndices = null;
		this._jointWeights = null;

		this._faceNormals = null;
		this._faceWeights = null;
		this._faceTangents = null;
	}

	/**
	 * Updates the face indices of the TriangleSubGeometry.
	 *
	 * @param indices The face indices to upload.
	 */
	public updateIndices(indices:Array<number>)
	{
		super.updateIndices(indices);

		this._faceNormalsDirty = true;

		if (this._autoDeriveNormals)
			this._vertexNormalsDirty = true;

		if (this._autoDeriveTangents)
			this._vertexTangentsDirty = true;

		if (this._autoDeriveUVs)
			this._uvsDirty = true;
	}

	/**
	 * Clones the current object
	 * @return An exact duplicate of the current object.
	 */
	public clone():TriangleSubGeometry
	{
		var clone:TriangleSubGeometry = new TriangleSubGeometry(this._concatenateArrays);
		clone.updateIndices(this._pIndices.concat());
		clone.updatePositions(this._positions.concat());

		if (this._vertexNormals && !this._autoDeriveNormals)
			clone.updateVertexNormals(this._vertexNormals.concat());
		else
			clone.updateVertexNormals(null);

		if (this._uvs && !this._autoDeriveUVs)
			clone.updateUVs(this._uvs.concat());
		else
			clone.updateUVs(null);

		if (this._vertexTangents && !this._autoDeriveTangents)
			clone.updateVertexTangents(this._vertexTangents.concat());
		else
			clone.updateVertexTangents(null);

		if (this._secondaryUVs)
			clone.updateSecondaryUVs(this._secondaryUVs.concat());

		if (this._jointIndices) {
			clone.jointsPerVertex = this._jointsPerVertex;
			clone.updateJointIndices(this._jointIndices.concat());
		}

		if (this._jointWeights)
			clone.updateJointWeights(this._jointWeights.concat());

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
		var normals:Array<number>;
		var tangents:Array<number>;

		if (this._concatenateArrays) {
			positions = this._pVertices;
			normals = this._pVertices;
			tangents = this._pVertices;
		} else {
			positions = this._positions;
			normals = this._vertexNormals;
			tangents = this._vertexTangents;
		}

		var len:number = this._positions.length/3;
		var i:number;
		var i1:number;
		var i2:number;
		var vector:Vector3D = new Vector3D();

		var bakeNormals:boolean = this._vertexNormals != null;
		var bakeTangents:boolean = this._vertexTangents != null;
		var invTranspose:Matrix3D;

		if (bakeNormals || bakeTangents) {
			invTranspose = transform.clone();
			invTranspose.invert();
			invTranspose.transpose();
		}

		var vi0:number = this.getOffset(TriangleSubGeometry.POSITION_DATA);
		var ni0:number = this.getOffset(TriangleSubGeometry.NORMAL_DATA);
		var ti0:number = this.getOffset(TriangleSubGeometry.TANGENT_DATA);

		var vStride:number = this.getStride(TriangleSubGeometry.POSITION_DATA);
		var nStride:number = this.getStride(TriangleSubGeometry.NORMAL_DATA);
		var tStride:number = this.getStride(TriangleSubGeometry.TANGENT_DATA);

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

			// bake normal
			if (bakeNormals) {
				i1 = ni0 + 1;
				i2 = ni0 + 2;
				vector.x = normals[ni0];
				vector.y = normals[i1];
				vector.z = normals[i2];
				vector = invTranspose.deltaTransformVector(vector);
				vector.normalize();
				normals[ni0] = vector.x;
				normals[i1] = vector.y;
				normals[i2] = vector.z;
				ni0 += nStride;
			}

			// bake tangent
			if (bakeTangents) {
				i1 = ti0 + 1;
				i2 = ti0 + 2;
				vector.x = tangents[ti0];
				vector.y = tangents[i1];
				vector.z = tangents[i2];
				vector = invTranspose.deltaTransformVector(vector);
				vector.normalize();
				tangents[ti0] = vector.x;
				tangents[i1] = vector.y;
				tangents[i2] = vector.z;
				ti0 += tStride;
			}
		}

		this.notifyPositionsUpdate();
		this.notifyNormalsUpdate();
		this.notifyTangentsUpdate();
	}

	/**
	 * Updates the tangents for each face.
	 */
	private updateFaceTangents()
	{
		var i:number = 0;
		var index1:number;
		var index2:number;
		var index3:number;
		var vi:number;
		var v0:number;
		var dv1:number;
		var dv2:number;
		var denom:number;
		var x0:number, y0:number, z0:number;
		var dx1:number, dy1:number, dz1:number;
		var dx2:number, dy2:number, dz2:number;
		var cx:number, cy:number, cz:number;

		var positions:Array<number> = this._positions
		var uvs:Array<number> = this._uvs;

		var len:number = this._pIndices.length;

		if (this._faceTangents == null)
			this._faceTangents = new Array<number>(len);

		while (i < len) {
			index1 = this._pIndices[i];
			index2 = this._pIndices[i + 1];
			index3 = this._pIndices[i + 2];

			v0 = uvs[index1*2 + 1];
			dv1 = uvs[index2*2 + 1] - v0;
			dv2 = uvs[index3*2 + 1] - v0;

			vi = index1*3;
			x0 = positions[vi];
			y0 = positions[vi + 1];
			z0 = positions[vi + 2];
			vi = index2*3;
			dx1 = positions[vi] - x0;
			dy1 = positions[vi + 1] - y0;
			dz1 = positions[vi + 2] - z0;
			vi = index3*3;
			dx2 = positions[vi] - x0;
			dy2 = positions[vi + 1] - y0;
			dz2 = positions[vi + 2] - z0;

			cx = dv2*dx1 - dv1*dx2;
			cy = dv2*dy1 - dv1*dy2;
			cz = dv2*dz1 - dv1*dz2;
			denom = 1/Math.sqrt(cx*cx + cy*cy + cz*cz);

			this._faceTangents[i++] = denom*cx;
			this._faceTangents[i++] = denom*cy;
			this._faceTangents[i++] = denom*cz;
		}

		this._faceTangentsDirty = false;
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
		this.notifyNormalsUpdate();
		this.notifyTangentsUpdate();
		this.notifyUVsUpdate();
		this.notifySecondaryUVsUpdate();
		this.notifyJointIndicesUpdate();
		this.notifyJointWeightsUpdate();
	}

	private notifyPositionsUpdate()
	{
		if (this._positionsDirty)
			return;

		this._positionsDirty = true;

		if (!this._positionsUpdated)
			this._positionsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.POSITION_DATA);

		this.dispatchEvent(this._positionsUpdated);
	}

	private notifyNormalsUpdate()
	{
		if (this._vertexNormalsDirty)
			return;

		this._vertexNormalsDirty = true;

		if (!this._normalsUpdated)
			this._normalsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.NORMAL_DATA);

		this.dispatchEvent(this._normalsUpdated);
	}

	private notifyTangentsUpdate()
	{
		if (this._vertexTangentsDirty)
			return;

		this._vertexTangentsDirty = true;

		if (!this._tangentsUpdated)
			this._tangentsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.TANGENT_DATA);

		this.dispatchEvent(this._tangentsUpdated);
	}

	private notifyUVsUpdate()
	{
		if (this._uvsDirty)
			return;

		this._uvsDirty = true;

		if (!this._uvsUpdated)
			this._uvsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.UV_DATA);

		this.dispatchEvent(this._uvsUpdated);
	}

	private notifySecondaryUVsUpdate()
	{
		if (this._secondaryUVsDirty)
			return;

		this._secondaryUVsDirty = true;

		if (!this._secondaryUVsUpdated)
			this._secondaryUVsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.SECONDARY_UV_DATA);

		this.dispatchEvent(this._secondaryUVsUpdated);
	}

	private notifyJointIndicesUpdate()
	{
		if (this._jointIndicesDirty)
			return;

		this._jointIndicesDirty = true;

		if (!this._jointIndicesUpdated)
			this._jointIndicesUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.JOINT_INDEX_DATA);

		this.dispatchEvent(this._jointIndicesUpdated);
	}

	private notifyJointWeightsUpdate()
	{
		if (this._jointWeightsDirty)
			return;

		this._jointWeightsDirty = true;

		if (!this._jointWeightsUpdated)
			this._jointWeightsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.JOINT_WEIGHT_DATA);

		this.dispatchEvent(this._jointWeightsUpdated);
	}
}

export = TriangleSubGeometry;