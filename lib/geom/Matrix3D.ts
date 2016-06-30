import {Box}							from "../geom/Box";
import {MathConsts}					from "../geom/MathConsts";
import {Orientation3D}				from "../geom/Orientation3D";
import {Quaternion}					from "../geom/Quaternion";
import {Vector3D}						from "../geom/Vector3D";
import {ArgumentError}				from "../errors/ArgumentError";

export class Matrix3D
{
	/**
	 * A Vector of 16 Numbers, where every four elements is a column of a 4x4 matrix.
	 *
	 * <p>An exception is thrown if the rawData property is set to a matrix that is not invertible. The Matrix3D
	 * object must be invertible. If a non-invertible matrix is needed, create a subexport class of the Matrix3D object.</p>
	 */
	public rawData:Float32Array = new Float32Array(16);

	private static tempMatrix:Matrix3D = new Matrix3D();
	private static tempRawData:Float32Array = Matrix3D.tempMatrix.rawData;

	private _position:Vector3D = new Vector3D();
	private _positionDirty:boolean = true;

	private _components:Array<Vector3D>;

	/**
	 * Creates a Matrix3D object.
	 */
	constructor(v:Float32Array = null)
	{
		if (v != null && v.length == 16) {
			this.copyRawDataFrom(v);
		} else {
			this.identity();
		}
	}

	/**
	 * Appends the matrix by multiplying another Matrix3D object by the current Matrix3D object.
	 */
	public append(lhs:Matrix3D):void
	{
		var lrd:Float32Array = lhs.rawData;

		var m111:number = this.rawData[0];
		var m112:number = this.rawData[1];
		var m113:number = this.rawData[2];
		var m114:number = this.rawData[3];
		var m121:number = this.rawData[4];
		var m122:number = this.rawData[5];
		var m123:number = this.rawData[6];
		var m124:number = this.rawData[7];
		var m131:number = this.rawData[8];
		var m132:number = this.rawData[9];
		var m133:number = this.rawData[10];
		var m134:number = this.rawData[11];
		var m141:number = this.rawData[12];
		var m142:number = this.rawData[13];
		var m143:number = this.rawData[14];
		var m144:number = this.rawData[15];
		var m211:number = lrd[0];
		var m212:number = lrd[1];
		var m213:number = lrd[2];
		var m214:number = lrd[3];
		var m221:number = lrd[4];
		var m222:number = lrd[5];
		var m223:number = lrd[6];
		var m224:number = lrd[7];
		var m231:number = lrd[8];
		var m232:number = lrd[9];
		var m233:number = lrd[10];
		var m234:number = lrd[11];
		var m241:number = lrd[12];
		var m242:number = lrd[13];
		var m243:number = lrd[14];
		var m244:number = lrd[15];

		this.rawData[0] = m111*m211 + m112*m221 + m113*m231 + m114*m241;
		this.rawData[1] = m111*m212 + m112*m222 + m113*m232 + m114*m242;
		this.rawData[2] = m111*m213 + m112*m223 + m113*m233 + m114*m243;
		this.rawData[3] = m111*m214 + m112*m224 + m113*m234 + m114*m244;

		this.rawData[4] = m121*m211 + m122*m221 + m123*m231 + m124*m241;
		this.rawData[5] = m121*m212 + m122*m222 + m123*m232 + m124*m242;
		this.rawData[6] = m121*m213 + m122*m223 + m123*m233 + m124*m243;
		this.rawData[7] = m121*m214 + m122*m224 + m123*m234 + m124*m244;

		this.rawData[8] = m131*m211 + m132*m221 + m133*m231 + m134*m241;
		this.rawData[9] = m131*m212 + m132*m222 + m133*m232 + m134*m242;
		this.rawData[10] = m131*m213 + m132*m223 + m133*m233 + m134*m243;
		this.rawData[11] = m131*m214 + m132*m224 + m133*m234 + m134*m244;

		this.rawData[12] = m141*m211 + m142*m221 + m143*m231 + m144*m241;
		this.rawData[13] = m141*m212 + m142*m222 + m143*m232 + m144*m242;
		this.rawData[14] = m141*m213 + m142*m223 + m143*m233 + m144*m243;
		this.rawData[15] = m141*m214 + m142*m224 + m143*m234 + m144*m244;

		this._positionDirty = true;
	}

	/**
	 * Appends an incremental rotation to a Matrix3D object.
	 */
	public appendRotation(degrees:number, axis:Vector3D):void //, pivot:Vector3D = null ):void
	{
		this.append(Matrix3D.getAxisRotation(axis.x, axis.y, axis.z, degrees));
	}

	/**
	 * Appends an incremental skew change along the x, y, and z axes to a Matrix3D object.
	 */
	public appendSkew(xSkew:number, ySkew:number, zSkew:number):void
	{
		if(xSkew == 0 && ySkew == 0 && zSkew == 0) return;
		var raw:Float32Array = Matrix3D.tempRawData;
		raw[0] = 1;
		raw[1] = 0;
		raw[2] = 0;
		raw[3] = 0;

		raw[4] = xSkew;
		raw[5] = 1;
		raw[6] = 0;
		raw[7] = 0;

		raw[8] = ySkew;
		raw[9] = zSkew;
		raw[10] = 1;
		raw[11] = 0;

		raw[12] = 0;
		raw[13] = 0;
		raw[14] = 0;
		raw[15] = 1;

		this.append(Matrix3D.tempMatrix);
	}

	/**
	 * Appends an incremental scale change along the x, y, and z axes to a Matrix3D object.
	 */
	public appendScale(xScale:number, yScale:number, zScale:number):void
	{
		if(xScale == 1 && yScale == 1 && zScale == 1)
			return;

		var raw:Float32Array = Matrix3D.tempRawData;

		raw[0] = xScale;
		raw[1] = 0;
		raw[2] = 0;
		raw[3] = 0;

		raw[4] = 0;
		raw[5] = yScale;
		raw[6] = 0;
		raw[7] = 0;

		raw[8] = 0;
		raw[9] = 0;
		raw[10] = zScale;
		raw[11] = 0;

		raw[12] = 0;
		raw[13] = 0;
		raw[14] = 0;
		raw[15] = 1;

		this.append(Matrix3D.tempMatrix);
	}

	/**
	 * Appends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
	 */
	public appendTranslation(x:number, y:number, z:number):void
	{
		this.rawData[12] += x;
		this.rawData[13] += y;
		this.rawData[14] += z;

		this._positionDirty = true;
	}

	/**
	 * Returns a new Matrix3D object that is an exact copy of the current Matrix3D object.
	 */
	public clone():Matrix3D
	{
		return new Matrix3D(this.rawData);
	}

	/**
	 * Copies a Vector3D object into specific column of the calling Matrix3D object.
	 */
	public copyColumnFrom(column:number, vector3D:Vector3D):void
	{
		switch (column) {
			case 0:
				this.rawData[ 0 ] = vector3D.x;
				this.rawData[ 1 ] = vector3D.y;
				this.rawData[ 2 ] = vector3D.z;
				this.rawData[ 3 ] = vector3D.w;
				break;
			case 1:
				this.rawData[ 4 ] = vector3D.x;
				this.rawData[ 5 ] = vector3D.y;
				this.rawData[ 6 ] = vector3D.z;
				this.rawData[ 7 ] = vector3D.w;
				break;
			case 2:
				this.rawData[ 8 ] = vector3D.x;
				this.rawData[ 9 ] = vector3D.y;
				this.rawData[ 10 ] = vector3D.z;
				this.rawData[ 11 ] = vector3D.w;
				break;
			case 3:
				this.rawData[ 12 ] = vector3D.x;
				this.rawData[ 13 ] = vector3D.y;
				this.rawData[ 14 ] = vector3D.z;
				this.rawData[ 15 ] = vector3D.w;
				break;
			default:
				throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
		}
	}

	/**
	 * Copies specific column of the calling Matrix3D object into the Vector3D object.
	 */
	public copyColumnTo(column:number, vector3D:Vector3D):void
	{
		switch (column) {
			case 0:
				vector3D.x = this.rawData[ 0 ];
				vector3D.y = this.rawData[ 1 ];
				vector3D.z = this.rawData[ 2 ];
				vector3D.w = this.rawData[ 3 ];
				break;
			case 1:
				vector3D.x = this.rawData[ 4 ];
				vector3D.y = this.rawData[ 5 ];
				vector3D.z = this.rawData[ 6 ];
				vector3D.w = this.rawData[ 7 ];
				break;
			case 2:
				vector3D.x = this.rawData[ 8 ];
				vector3D.y = this.rawData[ 9 ];
				vector3D.z = this.rawData[ 10 ];
				vector3D.w = this.rawData[ 11 ];
				break;
			case 3:
				vector3D.x = this.rawData[ 12 ];
				vector3D.y = this.rawData[ 13 ];
				vector3D.z = this.rawData[ 14 ];
				vector3D.w = this.rawData[ 15 ];
				break;
			default:
				throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
		}
	}

	/**
	 * Copies all of the matrix data from the source Matrix3D object into the calling Matrix3D object.
	 */
	public copyFrom(source:Matrix3D):void
	{
		var sourceRaw:Float32Array = source.rawData;
		var len:number = sourceRaw.length;
		for (var c:number = 0; c < len; c++)
			this.rawData[c] = sourceRaw[c];
	}

	/**
	 * Copies this Matrix3D object into a destination Matrix3D object.
	 */
	public copyTo(target:Matrix3D):void
	{
		var targetRaw:Float32Array = target.rawData;
		var len:number = this.rawData.length;
		for (var c:number = 0; c < len; c++)
			targetRaw[c] = this.rawData[c];
	}

	public copyRawDataFrom(vector:Float32Array, index:number = 0, transpose:boolean = false):void
	{
		if (transpose)
			this.transpose();

		var len:number = vector.length - index;
		for (var c:number = 0; c < len; c++)
			this.rawData[c] = vector[c + index];

		if (transpose)
			this.transpose();
	}

	public copyRawDataTo(vector:Float32Array, index:number = 0, transpose:boolean = false):void
	{
		if (transpose)
			this.transpose();

		var len:number = this.rawData.length;
		for (var c:number = 0; c < len; c++)
			vector[c + index ] = this.rawData[c];

		if (transpose)
			this.transpose();
	}

	/**
	 * Copies a Vector3D object into specific row of the calling Matrix3D object.
	 */
	public copyRowFrom(row:number, vector3D:Vector3D):void
	{
		switch (row) {
			case 0:
				this.rawData[ 0 ] = vector3D.x;
				this.rawData[ 4 ] = vector3D.y;
				this.rawData[ 8 ] = vector3D.z;
				this.rawData[ 12 ] = vector3D.w;
				break;
			case 1:
				this.rawData[ 1 ] = vector3D.x;
				this.rawData[ 5 ] = vector3D.y;
				this.rawData[ 9 ] = vector3D.z;
				this.rawData[ 13 ] = vector3D.w;
				break;
			case 2:
				this.rawData[ 2 ] = vector3D.x;
				this.rawData[ 6 ] = vector3D.y;
				this.rawData[ 10 ] = vector3D.z;
				this.rawData[ 14 ] = vector3D.w;
				break;
			case 3:
				this.rawData[ 3 ] = vector3D.x;
				this.rawData[ 7 ] = vector3D.y;
				this.rawData[ 11 ] = vector3D.z;
				this.rawData[ 15 ] = vector3D.w;
				break;
			default:
				throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 3]");
		}
	}

	/**
	 * Copies specific row of the calling Matrix3D object into the Vector3D object.
	 */
	public copyRowTo(row:number, vector3D:Vector3D):void
	{
		switch (row) {
			case 0:
				vector3D.x = this.rawData[ 0 ];
				vector3D.y = this.rawData[ 4 ];
				vector3D.z = this.rawData[ 8 ];
				vector3D.w = this.rawData[ 12 ];
				break;
			case 1:
				vector3D.x = this.rawData[ 1 ];
				vector3D.y = this.rawData[ 5 ];
				vector3D.z = this.rawData[ 9 ];
				vector3D.w = this.rawData[ 13 ];
				break;
			case 2:
				vector3D.x = this.rawData[ 2 ];
				vector3D.y = this.rawData[ 6 ];
				vector3D.z = this.rawData[ 10 ];
				vector3D.w = this.rawData[ 14 ];
				break;
			case 3:
				vector3D.x = this.rawData[ 3 ];
				vector3D.y = this.rawData[ 7 ];
				vector3D.z = this.rawData[ 11 ];
				vector3D.w = this.rawData[ 15 ]
				break;
			default:
				throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 3]");
		}
	}

	/**
	 * Returns the transformation matrix's translation, rotation, and scale settings as a Vector of three Vector3D objects.
	 */
	public decompose(orientationStyle:string = "eulerAngles"):Vector3D[]
	{
		var q:Quaternion;

		if (this._components == null)
			this._components = [null, new Vector3D(), new Vector3D(), new Vector3D()];

		var colX:Vector3D = new Vector3D(this.rawData[0], this.rawData[1], this.rawData[2]);
		var colY:Vector3D = new Vector3D(this.rawData[4], this.rawData[5], this.rawData[6]);
		var colZ:Vector3D = new Vector3D(this.rawData[8], this.rawData[9], this.rawData[10]);

		var scale:Vector3D = this._components[3];
		var skew:Vector3D = this._components[2];

		//compute X scale factor and normalise colX
		scale.x = colX.length;
		colX.scaleBy(1/scale.x);

		//compute XY shear factor and make colY orthogonal to colX
		skew.x = colX.dotProduct(colY);
		colY = Vector3D.combine(colY, colX, 1, -skew.x);

		//compute Y scale factor and normalise colY
		scale.y = colY.length;
		colY.scaleBy(1/scale.y);
		skew.x /= scale.y;

		//compute XZ and YZ shears and make colZ orthogonal to colX and colY
		skew.y = colX.dotProduct(colZ);
		colZ = Vector3D.combine(colZ, colX, 1, -skew.y);
		skew.z = colY.dotProduct(colZ);
		colZ = Vector3D.combine(colZ, colY, 1, -skew.z);

		//compute Z scale and normalise colZ
		scale.z = colZ.length;
		colZ.scaleBy(1/scale.z);
		skew.y /= scale.z;
		skew.z /= scale.z;

		//at this point, the matrix (in cols) is orthonormal
		//check for a coordinate system flip. If the determinant is -1, negate the z scaling factor
		if (colX.dotProduct(colY.crossProduct(colZ)) < 0) {
			scale.z = -scale.z;
			colZ.x = -colZ.x;
			colZ.y = -colZ.y;
			colZ.z = -colZ.z;
		}

		var rot = this._components[1];

		switch (orientationStyle) {
			case Orientation3D.AXIS_ANGLE:

				rot.w = Math.acos((colX.x + colY.y + colZ.z - 1)/2);

				var len:number = Math.sqrt((colY.z - colZ.y)*(colY.z - colZ.y) + (colZ.x - colX.z)*(colZ.x - colX.z) + (colX.y - colY.x)*(colX.y - colY.x));
				rot.x = (colY.z - colZ.y)/len;
				rot.y = (colZ.x - colX.z)/len;
				rot.z = (colX.y - colY.x)/len;

				break;
			case Orientation3D.QUATERNION:

				var tr = colX.x + colY.y + colZ.z;

				if (tr > 0) {
					rot.w = Math.sqrt(1 + tr)/2;

					rot.x = (colY.z - colZ.y)/(4*rot.w);
					rot.y = (colZ.x - colX.z)/(4*rot.w);
					rot.z = (colX.y - colY.x)/(4*rot.w);
				} else if ((colX.x > colY.y) && (colX.x > colZ.z)) {
					rot.x = Math.sqrt(1 + colX.x - colY.y - colZ.z)/2;

					rot.w = (colY.z - colZ.y)/(4*rot.x);
					rot.y = (colX.y + colY.x)/(4*rot.x);
					rot.z = (colZ.x + colX.z)/(4*rot.x);
				} else if (colY.y > colZ.z) {
					rot.y = Math.sqrt(1 + colY.y - colX.x - colZ.z)/2;

					rot.x = (colX.y + colY.x)/(4*rot.y);
					rot.w = (colZ.x - colX.z)/(4*rot.y);
					rot.z = (colY.z + colZ.y)/(4*rot.y);
				} else {
					rot.z = Math.sqrt(1 + colZ.z - colX.x - colY.y)/2;

					rot.x = (colZ.x + colX.z)/(4*rot.z);
					rot.y = (colY.z + colZ.y)/(4*rot.z);
					rot.w = (colX.y - colY.x)/(4*rot.z);
				}

				break;
			case Orientation3D.EULER_ANGLES:

				rot.y = Math.asin(-colX.z);

				//var cos:number = Math.cos(rot.y);

				if (colX.z != 1 && colX.z != -1) {
					rot.x = Math.atan2(colY.z, colZ.z);
					rot.z = Math.atan2(colX.y, colX.x);
				} else {
					rot.z = 0;
					rot.x = Math.atan2(colY.x, colY.y);
				}

				break;
		}

		this._components[0] = this.position;

		return this._components;
	}

	/**
	 * Uses the transformation matrix without its translation elements to transform a Vector3D object from one space
	 * coordinate to another.
	 */
	public deltaTransformVector(v:Vector3D, t:Vector3D = null):Vector3D
	{
		var x:number = v.x;
		var y:number = v.y;
		var z:number = v.z;

		if (!t)
			t = new Vector3D();

		t.x = x*this.rawData[0] + y*this.rawData[4] + z*this.rawData[8];
		t.y = x*this.rawData[1] + y*this.rawData[5] + z*this.rawData[9];
		t.z = x*this.rawData[2] + y*this.rawData[6] + z*this.rawData[10];
		t.w = x*this.rawData[3] + y*this.rawData[7] + z*this.rawData[11];

		return t;
	}

	/**
	 * Converts the current matrix to an identity or unit matrix.
	 */
	public identity():void
	{
		this.rawData[0] = 1;
		this.rawData[1] = 0;
		this.rawData[2] = 0;
		this.rawData[3] = 0;
		this.rawData[4] = 0;
		this.rawData[5] = 1;
		this.rawData[6] = 0;
		this.rawData[7] = 0;
		this.rawData[8] = 0;
		this.rawData[9] = 0;
		this.rawData[10] = 1;
		this.rawData[11] = 0;
		this.rawData[12] = 0;
		this.rawData[13] = 0;
		this.rawData[14] = 0;
		this.rawData[15] = 1;

		this._positionDirty = true;
	}

	/**
	 * [static] Interpolates the translation, rotation, and scale transformation of one matrix toward those of the target matrix.
	 */
	static interpolate(thisMat:Matrix3D, toMat:Matrix3D, percent:number):Matrix3D
	{
		var m:Matrix3D = new Matrix3D();
		for (var i:number = 0; i < 16; ++i)
			m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i])*percent;

		return m;
	}

	/**
	 * Interpolates this matrix towards the translation, rotation, and scale transformations of the target matrix.
	 */
	public interpolateTo(toMat:Matrix3D, percent:number):void
	{
		for (var i:number = 0; i < 16; ++i)
			this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i])*percent;
	}

	/**
	 * Inverts the current matrix.
	 */
	public invert():boolean
	{
		var d = this.determinant;
		var invertable:boolean = Math.abs(d) > 0.00000000001;

		if (invertable) {
			d = 1/d;
			var m11:number = this.rawData[0];
			var m12:number = this.rawData[1];
			var m13:number = this.rawData[2];
			var m14:number = this.rawData[3];
			var m21:number = this.rawData[4];
			var m22:number = this.rawData[5];
			var m23:number = this.rawData[6];
			var m24:number = this.rawData[7];
			var m31:number = this.rawData[8];
			var m32:number = this.rawData[9];
			var m33:number = this.rawData[10];
			var m34:number = this.rawData[11];
			var m41:number = this.rawData[12];
			var m42:number = this.rawData[13];
			var m43:number = this.rawData[14];
			var m44:number = this.rawData[15];

			this.rawData[0] = d*(m22*(m33*m44 - m43*m34) - m32*(m23*m44 - m43*m24) + m42*(m23*m34 - m33*m24));
			this.rawData[1] = -d*(m12*(m33*m44 - m43*m34) - m32*(m13*m44 - m43*m14) + m42*(m13*m34 - m33*m14));
			this.rawData[2] = d*(m12*(m23*m44 - m43*m24) - m22*(m13*m44 - m43*m14) + m42*(m13*m24 - m23*m14));
			this.rawData[3] = -d*(m12*(m23*m34 - m33*m24) - m22*(m13*m34 - m33*m14) + m32*(m13*m24 - m23*m14));
			this.rawData[4] = -d*(m21*(m33*m44 - m43*m34) - m31*(m23*m44 - m43*m24) + m41*(m23*m34 - m33*m24));
			this.rawData[5] = d*(m11*(m33*m44 - m43*m34) - m31*(m13*m44 - m43*m14) + m41*(m13*m34 - m33*m14));
			this.rawData[6] = -d*(m11*(m23*m44 - m43*m24) - m21*(m13*m44 - m43*m14) + m41*(m13*m24 - m23*m14));
			this.rawData[7] = d*(m11*(m23*m34 - m33*m24) - m21*(m13*m34 - m33*m14) + m31*(m13*m24 - m23*m14));
			this.rawData[8] = d*(m21*(m32*m44 - m42*m34) - m31*(m22*m44 - m42*m24) + m41*(m22*m34 - m32*m24));
			this.rawData[9] = -d*(m11*(m32*m44 - m42*m34) - m31*(m12*m44 - m42*m14) + m41*(m12*m34 - m32*m14));
			this.rawData[10] = d*(m11*(m22*m44 - m42*m24) - m21*(m12*m44 - m42*m14) + m41*(m12*m24 - m22*m14));
			this.rawData[11] = -d*(m11*(m22*m34 - m32*m24) - m21*(m12*m34 - m32*m14) + m31*(m12*m24 - m22*m14));
			this.rawData[12] = -d*(m21*(m32*m43 - m42*m33) - m31*(m22*m43 - m42*m23) + m41*(m22*m33 - m32*m23));
			this.rawData[13] = d*(m11*(m32*m43 - m42*m33) - m31*(m12*m43 - m42*m13) + m41*(m12*m33 - m32*m13));
			this.rawData[14] = -d*(m11*(m22*m43 - m42*m23) - m21*(m12*m43 - m42*m13) + m41*(m12*m23 - m22*m13));
			this.rawData[15] = d*(m11*(m22*m33 - m32*m23) - m21*(m12*m33 - m32*m13) + m31*(m12*m23 - m22*m13));
		}

		this._positionDirty = true;

		return invertable;
	}

	/* TODO implement pointAt
	 public pointAt( pos:Vector3D, at:Vector3D = null, up:Vector3D = null )
	 {
	 }
	 */

	/**
	 * Prepends a matrix by multiplying the current Matrix3D object by another Matrix3D object.
	 */
	public prepend(rhs:Matrix3D):void
	{
		var m111:number = rhs.rawData[0];
		var m112:number = rhs.rawData[1];
		var m113:number = rhs.rawData[2];
		var m114:number = rhs.rawData[3];
		var m121:number = rhs.rawData[4];
		var m122:number = rhs.rawData[5];
		var m123:number = rhs.rawData[6];
		var m124:number = rhs.rawData[7];
		var m131:number = rhs.rawData[8];
		var m132:number = rhs.rawData[9];
		var m133:number = rhs.rawData[10];
		var m134:number = rhs.rawData[11];
		var m141:number = rhs.rawData[12];
		var m142:number = rhs.rawData[13];
		var m143:number = rhs.rawData[14];
		var m144:number = rhs.rawData[15];

		var m211:number = this.rawData[0];
		var m212:number = this.rawData[1];
		var m213:number = this.rawData[2];
		var m214:number = this.rawData[3];
		var m221:number = this.rawData[4];
		var m222:number = this.rawData[5];
		var m223:number = this.rawData[6];
		var m224:number = this.rawData[7];
		var m231:number = this.rawData[8];
		var m232:number = this.rawData[9];
		var m233:number = this.rawData[10];
		var m234:number = this.rawData[11];
		var m241:number = this.rawData[12];
		var m242:number = this.rawData[13];
		var m243:number = this.rawData[14];
		var m244:number = this.rawData[15];

		this.rawData[0] = m111*m211 + m112*m221 + m113*m231 + m114*m241;
		this.rawData[1] = m111*m212 + m112*m222 + m113*m232 + m114*m242;
		this.rawData[2] = m111*m213 + m112*m223 + m113*m233 + m114*m243;
		this.rawData[3] = m111*m214 + m112*m224 + m113*m234 + m114*m244;

		this.rawData[4] = m121*m211 + m122*m221 + m123*m231 + m124*m241;
		this.rawData[5] = m121*m212 + m122*m222 + m123*m232 + m124*m242;
		this.rawData[6] = m121*m213 + m122*m223 + m123*m233 + m124*m243;
		this.rawData[7] = m121*m214 + m122*m224 + m123*m234 + m124*m244;

		this.rawData[8] = m131*m211 + m132*m221 + m133*m231 + m134*m241;
		this.rawData[9] = m131*m212 + m132*m222 + m133*m232 + m134*m242;
		this.rawData[10] = m131*m213 + m132*m223 + m133*m233 + m134*m243;
		this.rawData[11] = m131*m214 + m132*m224 + m133*m234 + m134*m244;

		this.rawData[12] = m141*m211 + m142*m221 + m143*m231 + m144*m241;
		this.rawData[13] = m141*m212 + m142*m222 + m143*m232 + m144*m242;
		this.rawData[14] = m141*m213 + m142*m223 + m143*m233 + m144*m243;
		this.rawData[15] = m141*m214 + m142*m224 + m143*m234 + m144*m244;

		this._positionDirty = true;
	}

	/**
	 * Prepends an incremental rotation to a Matrix3D object.
	 */
	public prependRotation(degrees:number, axis:Vector3D) //, pivot:Vector3D = null ):void
	{
		var m:Matrix3D = Matrix3D.getAxisRotation(axis.x, axis.y, axis.z, degrees);

		/*
		 if ( pivot != null )
		 {
		 var p:Vector3D = pivot;
		 m.appendTranslation( p.x, p.y, p.z );
		 }
		 */
		this.prepend(m);
	}

	/**
	 * Prepends an incremental scale change along the x, y, and z axes to a Matrix3D object.
	 */
	public prependScale(xScale:number, yScale:number, zScale:number):void
	{
		if(xScale == 1 && yScale == 1 && zScale == 1)
			return;

		var raw:Float32Array = Matrix3D.tempRawData;

		raw[0] = xScale;
		raw[1] = 0;
		raw[2] = 0;
		raw[3] = 0;

		raw[4] = 0;
		raw[5] = yScale;
		raw[6] = 0;
		raw[7] = 0;

		raw[8] = 0;
		raw[9] = 0;
		raw[10] = zScale;
		raw[11] = 0;

		raw[12] = 0;
		raw[13] = 0;
		raw[14] = 0;
		raw[15] = 1;

		this.prepend(Matrix3D.tempMatrix);
	}

	/**
	 * Prepends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
	 */
	public prependTranslation(x:number, y:number, z:number):void
	{
		var raw:Float32Array = Matrix3D.tempRawData;

		raw[0] = 1;
		raw[1] = 0;
		raw[2] = 0;
		raw[3] = 0;

		raw[4] = 0;
		raw[5] = 1;
		raw[6] = 0;
		raw[7] = 0;

		raw[8] = 0;
		raw[9] = 0;
		raw[10] = 1;
		raw[11] = 0;

		raw[12] = x;
		raw[13] = y;
		raw[14] = z;
		raw[15] = 1;

		this.prepend(Matrix3D.tempMatrix);
	}

	// TODO orientationStyle
	/**
	 * Sets the transformation matrix's translation, rotation, and scale settings.
	 */
	public recompose(components:Vector3D[]):boolean
	{
		var pos:Vector3D = components[0] || this.position;

		this.identity();
		var scale:Vector3D = components[3];
		if(scale && (scale.x != 1 || scale.y != 1 || scale.z != 1))
			this.appendScale(scale.x, scale.y, scale.z);

		var skew:Vector3D = components[2];
		if(skew && (skew.x !=0 || skew.y != 0 || skew.z != 0))
			this.appendSkew(skew.x, skew.y, skew.z);

		var sin:number;
		var cos:number;
		var raw:Float32Array = Matrix3D.tempRawData;
		raw[12] = 0;
		raw[13] = 0;
		raw[14] = 0;
		raw[15] = 0;

		var rotation:Vector3D = components[1];
		if (rotation) {
			var angle:number = -rotation.x;
			if(angle != 0){
				sin = Math.sin(angle);
				cos = Math.cos(angle);

				raw[0] = 1;
				raw[1] = 0;
				raw[2] = 0;
				raw[3] = 0;

				raw[4] = 0;
				raw[5] = cos;
				raw[6] = -sin;
				raw[7] = 0;

				raw[8] = 0;
				raw[9] = sin;
				raw[10] = cos;
				raw[11] = 0;

				this.append(Matrix3D.tempMatrix);
			}
			angle = -rotation.y;
			if(angle != 0){
				sin = Math.sin(angle);
				cos = Math.cos(angle);

				raw[0] = cos;
				raw[1] = 0;
				raw[2] = sin;
				raw[3] = 0;

				raw[4] = 0;
				raw[5] = 1;
				raw[6] = 0;
				raw[7] = 0;

				raw[8] = -sin;
				raw[9] = 0;
				raw[10] = cos;
				raw[11] = 0;

				this.append(Matrix3D.tempMatrix);
			}
			angle = -rotation.z;
			if(angle != 0){
				sin = Math.sin(angle);
				cos = Math.cos(angle);

				raw[0] = cos;
				raw[1] = -sin;
				raw[2] = 0;
				raw[3] = 0;

				raw[4] = sin;
				raw[5] = cos;
				raw[6] = 0;
				raw[7] = 0;

				raw[8] = 0;
				raw[9] = 0;
				raw[10] = 1;
				raw[11] = 0;

				this.append(Matrix3D.tempMatrix);
			}
		}

		this.rawData[12] = pos.x;
		this.rawData[13] = pos.y;
		this.rawData[14] = pos.z;

		if (components[0])
			this._positionDirty = true;

		this.rawData[15] = 1;

		return true;
	}

	public transformVector(v:Vector3D, t:Vector3D = null):Vector3D
	{
		if (v == null)
			return t || new Vector3D();

		var x:number = v.x;
		var y:number = v.y;
		var z:number = v.z;

		if (!t)
			t = new Vector3D();

		t.x = x*this.rawData[0] + y*this.rawData[4] + z*this.rawData[8] + this.rawData[12];
		t.y = x*this.rawData[1] + y*this.rawData[5] + z*this.rawData[9] + this.rawData[13];
		t.z = x*this.rawData[2] + y*this.rawData[6] + z*this.rawData[10] + this.rawData[14];
		t.w = x*this.rawData[3] + y*this.rawData[7] + z*this.rawData[11] + this.rawData[15];

		return t;
	}

	public transformBox(b:Box, t:Box = null):Box
	{
		if (b == null)
			return t || new Box();

		var minX:number, minY:number, minZ:number;
		var maxX:number, maxY:number, maxZ:number;

		maxX = b.width + (minX = b.x);
		maxY = b.height + (minY = b.y);
		maxZ = b.depth + (minZ = b.z);

		if (!t)
			t = new Box();

		//TODO: take account of shear
		t.width = maxX*this.rawData[0] + maxY*this.rawData[4] + maxZ*this.rawData[8] + this.rawData[12] - (t.x = minX*this.rawData[0] + minY*this.rawData[4] + minZ*this.rawData[8] + this.rawData[12]);
		t.height = maxX*this.rawData[1] + maxY*this.rawData[5] + maxZ*this.rawData[9] + this.rawData[13] - (t.y = minX*this.rawData[1] + minY*this.rawData[5] + minZ*this.rawData[9] + this.rawData[13]);
		t.depth = maxX*this.rawData[2] + maxY*this.rawData[6] + maxZ*this.rawData[10] + this.rawData[14] - (t.z = minX*this.rawData[2] + minY*this.rawData[6] + minZ*this.rawData[10] + this.rawData[14]);

		return t;
	}

	/**
	 * Uses the transformation matrix to transform a Vector of Numbers from one coordinate space to another.
	 */
	public transformVectors(vin:number[], vout:number[]):void
	{
		var i:number = 0;
		var x:number = 0, y:number = 0, z:number = 0;

		while (i + 3 <= vin.length) {
			x = vin[i];
			y = vin[i + 1];
			z = vin[i + 2];
			vout[i] = x*this.rawData[0] + y*this.rawData[4] + z*this.rawData[8] + this.rawData[12];
			vout[i + 1] = x*this.rawData[1] + y*this.rawData[5] + z*this.rawData[9] + this.rawData[13];
			vout[i + 2] = x*this.rawData[2] + y*this.rawData[6] + z*this.rawData[10] + this.rawData[14];
			i += 3;
		}
	}

	/**
	 * Converts the current Matrix3D object to a matrix where the rows and columns are swapped.
	 */
	public transpose():void
	{
		var raw:Float32Array = Matrix3D.tempRawData;
		this.copyRawDataTo(raw);

		this.rawData[1] = raw[4];
		this.rawData[2] = raw[8];
		this.rawData[3] = raw[12];
		this.rawData[4] = raw[1];
		this.rawData[6] = raw[9];
		this.rawData[7] = raw[13];
		this.rawData[8] = raw[2];
		this.rawData[9] = raw[6];
		this.rawData[11] = raw[14];
		this.rawData[12] = raw[3];
		this.rawData[13] = raw[7];
		this.rawData[14] = raw[11];

		this._positionDirty = true;
	}

	static getAxisRotation(x:number, y:number, z:number, degrees:number):Matrix3D
	{

		// internal export class use by rotations which have been tested

		var m:Matrix3D = new Matrix3D();

		var rad = degrees*MathConsts.DEGREES_TO_RADIANS;
		var c:number = Math.cos(rad);
		var s:number = Math.sin(rad);
		var t:number = 1 - c;
		var tmp1:number, tmp2:number;

		m.rawData[0] = c + x*x*t;
		m.rawData[5] = c + y*y*t;
		m.rawData[10] = c + z*z*t;

		tmp1 = x*y*t;
		tmp2 = z*s;
		m.rawData[1] = tmp1 + tmp2;
		m.rawData[4] = tmp1 - tmp2;
		tmp1 = x*z*t;
		tmp2 = y*s;
		m.rawData[8] = tmp1 + tmp2;
		m.rawData[2] = tmp1 - tmp2;
		tmp1 = y*z*t;
		tmp2 = x*s;
		m.rawData[9] = tmp1 - tmp2;
		m.rawData[6] = tmp1 + tmp2;

		return m;
	}

	/**
	 * [read-only] A Number that determines whether a matrix is invertible.
	 */
	public get determinant():number
	{
		return ((this.rawData[0]*this.rawData[5] - this.rawData[4]*this.rawData[1])*(this.rawData[10]*this.rawData[15] - this.rawData[14]*this.rawData[11]) - (this.rawData[0]*this.rawData[9] - this.rawData[8]*this.rawData[1])*(this.rawData[6]*this.rawData[15] - this.rawData[14]*this.rawData[7]) + (this.rawData[0]*this.rawData[13] - this.rawData[12]*this.rawData[1])*(this.rawData[6]*this.rawData[11] - this.rawData[10]*this.rawData[7]) + (this.rawData[4]*this.rawData[9] - this.rawData[8]*this.rawData[5])*(this.rawData[2]*this.rawData[15] - this.rawData[14]*this.rawData[3]) - (this.rawData[4]*this.rawData[13] - this.rawData[12]*this.rawData[5])*(this.rawData[2]*this.rawData[11] - this.rawData[10]*this.rawData[3]) + (this.rawData[8]*this.rawData[13] - this.rawData[12]*this.rawData[9])*(this.rawData[2]*this.rawData[7] - this.rawData[6]*this.rawData[3]));
	}

	/**
	 * A Vector3D object that holds the position, the 3D coordinate (x,y,z) of a display object within the
	 * transformation's frame of reference.
	 */
	public get position():Vector3D
	{
		if (this._positionDirty) {
			this._positionDirty = false;
			this._position.x = this.rawData[12];
			this._position.y = this.rawData[13];
			this._position.z = this.rawData[14];
		}

		return this._position;
	}

	public invalidatePosition():void
	{
		this._positionDirty = true;
	}

	public toFixed(decimalPlace:number):string
	{
		var magnitude:number = Math.pow(10, decimalPlace);
		return "matrix3d(" + Math.round(this.rawData[0]*magnitude)/magnitude + "," + Math.round(this.rawData[1]*magnitude)/magnitude + "," + Math.round(this.rawData[2]*magnitude)/magnitude + "," + Math.round(this.rawData[3]*magnitude)/magnitude + "," + Math.round(this.rawData[4]*magnitude)/magnitude + "," + Math.round(this.rawData[5]*magnitude)/magnitude + "," + Math.round(this.rawData[6]*magnitude)/magnitude + "," + Math.round(this.rawData[7]*magnitude)/magnitude + "," + Math.round(this.rawData[8]*magnitude)/magnitude + "," + Math.round(this.rawData[9]*magnitude)/magnitude + "," + Math.round(this.rawData[10]*magnitude)/magnitude + "," + Math.round(this.rawData[11]*magnitude)/magnitude + "," + Math.round(this.rawData[12]*magnitude)/magnitude + "," + Math.round(this.rawData[13]*magnitude)/magnitude + "," + Math.round(this.rawData[14]*magnitude)/magnitude + "," + Math.round(this.rawData[15]*magnitude)/magnitude + ")";
	}

	public toString():string
	{
		return "matrix3d(" + Math.round(this.rawData[0]*1000)/1000 + "," + Math.round(this.rawData[1]*1000)/1000 + "," + Math.round(this.rawData[2]*1000)/1000 + "," + Math.round(this.rawData[3]*1000)/1000 + "," + Math.round(this.rawData[4]*1000)/1000 + "," + Math.round(this.rawData[5]*1000)/1000 + "," + Math.round(this.rawData[6]*1000)/1000 + "," + Math.round(this.rawData[7]*1000)/1000 + "," + Math.round(this.rawData[8]*1000)/1000 + "," + Math.round(this.rawData[9]*1000)/1000 + "," + Math.round(this.rawData[10]*1000)/1000 + "," + Math.round(this.rawData[11]*1000)/1000 + "," + Math.round(this.rawData[12]*1000)/1000 + "," + Math.round(this.rawData[13]*1000)/1000 + "," + Math.round(this.rawData[14]*1000)/1000 + "," + Math.round(this.rawData[15]*1000)/1000 + ")";
	}
}