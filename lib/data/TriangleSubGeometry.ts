import AttributesBuffer			= require("awayjs-core/lib/attributes/AttributesBuffer");
import AttributesView			= require("awayjs-core/lib/attributes/AttributesView");
import Float4Attributes			= require("awayjs-core/lib/attributes/Float4Attributes");
import Float3Attributes			= require("awayjs-core/lib/attributes/Float3Attributes");
import Float2Attributes			= require("awayjs-core/lib/attributes/Float2Attributes");
import Float1Attributes			= require("awayjs-core/lib/attributes/Float1Attributes");
import Short3Attributes			= require("awayjs-core/lib/attributes/Short3Attributes");
import SubGeometryBase			= require("awayjs-core/lib/data/SubGeometryBase");
import Matrix3D					= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D					= require("awayjs-core/lib/geom/Vector3D");
import SubGeometryEvent			= require("awayjs-core/lib/events/SubGeometryEvent");
import SubGeometryUtils			= require("awayjs-core/lib/utils/SubGeometryUtils");

/**
 * @class away.base.TriangleSubGeometry
 */
class TriangleSubGeometry extends SubGeometryBase
{
	public static assetType:string = "[asset TriangleSubGeometry]";

	private _numVertices:number = 0;
	private _faceNormalsDirty:boolean = true;
	private _faceTangentsDirty:boolean = true;

	private _positions:Float3Attributes;
	private _normals:Float3Attributes;
	private _tangents:Float3Attributes;
	private _uvs:Float2Attributes;
	private _secondaryUVs:Float2Attributes;
	private _jointIndices:AttributesView;
	private _jointWeights:AttributesView;

	private _useCondensedIndices:boolean;
	private _condensedIndexLookUp:Array<number>;

	private _jointsPerVertex:number;

	private _autoDeriveNormals:boolean = true;
	private _autoDeriveTangents:boolean = true;
	private _autoDeriveUVs:boolean = false;

	private _faceNormals:Float4Attributes;
	private _faceTangents:Float3Attributes;

	public get assetType():string
	{
		return TriangleSubGeometry.assetType;
	}


	public get numVertices():number
	{
		return this._numVertices;
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

		if (this._jointIndices)
			this._jointIndices.dimensions = this._jointsPerVertex;

		if (this._jointWeights)
			this._jointWeights.dimensions = this._jointsPerVertex;
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
			this.notifyVerticesUpdate(this._uvs);
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
			this.notifyVerticesUpdate(this._normals);
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
			this.notifyVerticesUpdate(this._tangents);
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
	public get normals():Float3Attributes
	{
		if (!this._normals || this._verticesDirty[this._normals.id])
			this.setNormals(this._normals);

		return this._normals;
	}

	/**
	 *
	 */
	public get tangents():Float3Attributes
	{
		if (!this._tangents || this._verticesDirty[this._tangents.id])
			this.setTangents(this._tangents);

		return this._tangents;
	}

	/**
	 * The raw data of the face normals, in the same order as the faces are listed in the index list.
	 */
	public get faceNormals():Float4Attributes
	{
		if (this._faceNormalsDirty)
			this.updateFaceNormals();

		return this._faceNormals;
	}

	/**
	 * The raw data of the face tangets, in the same order as the faces are listed in the index list.
	 */
	public get faceTangents():Float3Attributes
	{
		if (this._faceTangentsDirty)
			this.updateFaceTangents();

		return this._faceTangents;
	}

	/**
	 *
	 */
	public get uvs():Float2Attributes
	{
		if (!this._uvs || this._verticesDirty[this._uvs.id])
			this.setUVs(this._uvs);

		return this._uvs;
	}

	/**
	 *
	 */
	public get secondaryUVs():Float2Attributes
	{
		return this._secondaryUVs;
	}

	/**
	 *
	 */
	public get jointIndices():AttributesView
	{
		return this._jointIndices;
	}

	/**
	 *
	 */
	public get jointWeights():AttributesView
	{
		return this._jointWeights;
	}

	public get condensedIndexLookUp():Array<number>
	{
		return this._condensedIndexLookUp;
	}

	/**
	 *
	 */
	constructor(concatenatedBuffer:AttributesBuffer = null)
	{
		super(concatenatedBuffer);

		this._positions = new Float3Attributes(this._concatenatedBuffer);
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

		if (this._autoDeriveNormals)
			this.notifyVerticesUpdate(this._normals);

		if (this._autoDeriveTangents)
			this.notifyVerticesUpdate(this._tangents);

		if (this._autoDeriveUVs)
			this.notifyVerticesUpdate(this._uvs);

		this.pInvalidateBounds();

		this.notifyVerticesUpdate(this._positions);

		this._verticesDirty[this._positions.id] = false;
	}

	/**
	 * Updates the vertex normals based on the geometry.
	 */
	public setNormals(array:Array<number>, offset?:number);
	public setNormals(float32Array:Float32Array, offset?:number);
	public setNormals(float3Attributes:Float3Attributes, offset?:number);
	public setNormals(values:any, offset:number = 0)
	{
		if (!this._autoDeriveNormals) {
			if (values == this._normals)
				return;

			if (values instanceof Float3Attributes) {
				this.notifyVerticesDispose(this._normals);
				this._normals = <Float3Attributes> values;
			} else if (values) {
				if (!this._normals)
					this._normals = new Float3Attributes(this._concatenatedBuffer);

				this._normals.set(values, offset);
			} else if (this._normals) {
				this.notifyVerticesDispose(this._normals);
				this._normals = null;
				return;
			}
		} else {
			if (this._faceNormalsDirty)
				this.updateFaceNormals();

			this._normals = SubGeometryUtils.generateNormals(this._pIndices, this._faceNormals, this._normals, this._concatenatedBuffer);
		}

		this.notifyVerticesUpdate(this._normals);

		this._verticesDirty[this._normals.id] = false;
	}

	/**
	 * Updates the vertex tangents based on the geometry.
	 */
	public setTangents(array:Array<number>, offset?:number);
	public setTangents(float32Array:Float32Array, offset?:number);
	public setTangents(float3Attributes:Float3Attributes, offset?:number);
	public setTangents(values:any, offset:number = 0)
	{
		if (!this._autoDeriveTangents) {
			if (values == this._tangents)
				return;

			if (values instanceof Float3Attributes) {
				this.notifyVerticesDispose(this._tangents);
				this._tangents = <Float3Attributes> values;
			} else if (values) {
				if (!this._tangents)
					this._tangents = new Float3Attributes(this._concatenatedBuffer);

				this._tangents.set(values, offset);
			} else if (this._tangents) {
				this.notifyVerticesDispose(this._tangents);
				this._tangents = null;
				return;
			}
		} else {
			if (this._faceTangentsDirty)
				this.updateFaceTangents();

			if (this._faceNormalsDirty)
				this.updateFaceNormals();

			this._tangents = SubGeometryUtils.generateTangents(this._pIndices, this._faceTangents, this._faceNormals, this._tangents, this._concatenatedBuffer);
		}

		this.notifyVerticesUpdate(this._tangents);

		this._verticesDirty[this._tangents.id] = false;
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

		if (this._autoDeriveTangents)
			this.notifyVerticesUpdate(this._tangents);

		this.notifyVerticesUpdate(this._uvs);

		this._verticesDirty[this._uvs.id] = false;
	}

	/**
	 * Updates the secondary uvs based on the geometry.
	 */
	public setSecondaryUVs(array:Array<number>, offset?:number);
	public setSecondaryUVs(float32Array:Float32Array, offset?:number);
	public setSecondaryUVs(float2Attributes:Float2Attributes, offset?:number);
	public setSecondaryUVs(values:any, offset:number = 0)
	{
		if (values == this._secondaryUVs)
			return;

		if (values instanceof Float2Attributes) {
			this.notifyVerticesDispose(this._secondaryUVs);
			this._secondaryUVs = <Float2Attributes> values;
		} else if (values) {
			if (!this._secondaryUVs)
				this._secondaryUVs = new Float2Attributes(this._concatenatedBuffer);

			this._secondaryUVs.set(values, offset);
		} else if (this._secondaryUVs) {
			this.notifyVerticesDispose(this._secondaryUVs);
			this._secondaryUVs = null;
			return;
		}

		this.notifyVerticesUpdate(this._secondaryUVs);

		this._verticesDirty[this._secondaryUVs.id] = false;
	}

	/**
	 * Updates the joint indices
	 */
	public setJointIndices(array:Array<number>, offset?:number);
	public setJointIndices(float32Array:Float32Array, offset?:number);
	public setJointIndices(attributesView:AttributesView, offset?:number);
	public setJointIndices(values:any, offset:number = 0)
	{
		if (values == this._jointIndices)
			return;

		if (values instanceof AttributesView) {
			this.notifyVerticesDispose(this._jointIndices);
			this._jointIndices = <AttributesView> values;
		} else if (values) {
			if (!this._jointIndices)
				this._jointIndices = new AttributesView(Float32Array, this._jointsPerVertex, this._concatenatedBuffer);

			if (this._useCondensedIndices) {
				var i:number = 0;
				var oldIndex:number;
				var newIndex:number = 0;
				var dic:Object = new Object();

				this._condensedIndexLookUp = new Array<number>();

				while (i < values.length) {
					oldIndex = values[i];

					// if we encounter a new index, assign it a new condensed index
					if (dic[oldIndex] == undefined) {
						dic[oldIndex] = newIndex;
						this._condensedIndexLookUp[newIndex++] = oldIndex;
					}

					//reset value to dictionary lookup
					values[i++] = dic[oldIndex];
				}
			}

			this._jointIndices.set(values, offset);

		} else if (this._jointIndices) {
			this.notifyVerticesDispose(this._jointIndices);
			this._jointIndices = null;
			return;
		}

		this.notifyVerticesUpdate(this._jointIndices);

		this._verticesDirty[this._jointIndices.id] = false;
	}

	/**
	 * Updates the joint weights.
	 */
	public setJointWeights(array:Array<number>, offset?:number);
	public setJointWeights(float32Array:Float32Array, offset?:number);
	public setJointWeights(attributesView:AttributesView, offset?:number);
	public setJointWeights(values:any, offset:number = 0)
	{
		if (values == this._jointWeights)
			return;

		if (values instanceof AttributesView) {
			this.notifyVerticesDispose(this._jointWeights);
			this._jointWeights = <AttributesView> values;
		} else if (values) {
			if (!this._jointWeights)
				this._jointWeights = new AttributesView(Float32Array, this._jointsPerVertex, this._concatenatedBuffer);

			this._jointWeights.set(values, offset);

		} else if (this._jointWeights) {
			this.notifyVerticesDispose(this._jointWeights);
			this._jointWeights = null;
			return;
		}

		this.notifyVerticesUpdate(this._jointWeights);

		this._verticesDirty[this._jointWeights.id] = false;
	}

	/**
	 *
	 */
	public dispose()
	{
		super.dispose();

		this._positions.dispose();
		this._positions = null;

		if (this._normals) {
			this._normals.dispose();
			this._normals = null;
		}

		if (this._tangents) {
			this._tangents.dispose();
			this._tangents = null;
		}

		if (this._uvs) {
			this._uvs.dispose();
			this._uvs = null;
		}

		if (this._secondaryUVs) {
			this._secondaryUVs.dispose();
			this._secondaryUVs = null;
		}

		if (this._jointIndices) {
			this._jointIndices.dispose();
			this._jointIndices = null;
		}

		if (this._jointWeights) {
			this._jointWeights.dispose();
			this._jointWeights = null;
		}

		if (this._faceNormals) {
			this._faceNormals.dispose();
			this._faceNormals = null;
		}

		if (this._faceTangents) {
			this._faceTangents.dispose();
			this._faceTangents = null;
		}
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
		super.setIndices(values, offset);

		this._faceNormalsDirty = true;
		this._faceTangentsDirty = true;

		if (this._autoDeriveNormals)
			this.notifyVerticesUpdate(this._normals);

		if (this._autoDeriveTangents)
			this.notifyVerticesUpdate(this._tangents);

		if (this._autoDeriveUVs)
			this.notifyVerticesUpdate(this._uvs);
	}

	/**
	 * Clones the current object
	 * @return An exact duplicate of the current object.
	 */
	public clone():TriangleSubGeometry
	{
		var clone:TriangleSubGeometry = new TriangleSubGeometry(this._concatenatedBuffer? this._concatenatedBuffer.clone() : null);

		clone.setIndices(this._pIndices.clone());

		clone.setPositions(this._positions.clone());

		clone.setNormals((this._normals && !this._autoDeriveNormals)? this._normals.clone() : null);

		clone.setUVs((this._uvs && !this._autoDeriveUVs)? this._uvs.clone() : null);

		clone.setTangents((this._tangents && !this._autoDeriveTangents)? this._tangents.clone() : null);

		if (this._secondaryUVs)
			clone.setSecondaryUVs(this._secondaryUVs.clone());

		if (this._jointIndices) {
			clone.jointsPerVertex = this._jointsPerVertex;
			clone.setJointIndices(this._jointIndices.clone());
		}

		if (this._jointWeights)
			clone.setJointWeights(this._jointWeights.clone());

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
	public scale(scale:number)
	{
		SubGeometryUtils.scale(scale, this.positions, this._numVertices);
	}

	public applyTransformation(transform:Matrix3D)
	{
		SubGeometryUtils.applyTransformation(transform, this.positions, this.normals, this.tangents, this._numVertices);
	}

	/**
	 * Updates the tangents for each face.
	 */
	private updateFaceTangents()
	{
		this._faceTangents = SubGeometryUtils.generateFaceTangents(this._pIndices, this._positions, this.uvs, this._faceTangents, this._pIndices.count);

		this._faceTangentsDirty = false;
	}

	/**
	 * Updates the normals for each face.
	 */
	private updateFaceNormals()
	{
		this._faceNormals = SubGeometryUtils.generateFaceNormals(this._pIndices, this._positions, this._faceNormals, this._pIndices.count);

		this._faceNormalsDirty = false;
	}
}

export = TriangleSubGeometry;