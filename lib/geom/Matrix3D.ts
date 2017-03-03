import {Box}							from "../geom/Box";
import {Plane3D}							from "../geom/Plane3D";
import {MathConsts}					from "../geom/MathConsts";
import {Orientation3D}				from "../geom/Orientation3D";
import {Quaternion}					from "../geom/Quaternion";
import {Vector3D}						from "../geom/Vector3D";
import {ArgumentError}				from "../errors/ArgumentError";

export class Matrix3D
{
	/**
	 * A reference to a Matrix3D to be used as a temporary data container, preventing object creation.
	 */
	public static CALCULATION_MATRIX:Matrix3D = new Matrix3D();

	private static _tempMatrix:Matrix3D = new Matrix3D();

	static getAxisRotationMatrix(x:number, y:number, z:number, degrees:number, target:Matrix3D = null):Matrix3D
	{
		if (target == null)
			target = new Matrix3D();

		var targetData:Float32Array = target._rawData;

		var rad = degrees*MathConsts.DEGREES_TO_RADIANS;
		var c:number = Math.cos(rad);
		var s:number = Math.sin(rad);
		var t:number = 1 - c;
		var tmp1:number, tmp2:number;

		targetData[0] = c + x*x*t;
		targetData[5] = c + y*y*t;
		targetData[10] = c + z*z*t;

		tmp1 = x*y*t;
		tmp2 = z*s;
		targetData[1] = tmp1 + tmp2;
		targetData[4] = tmp1 - tmp2;
		tmp1 = x*z*t;
		tmp2 = y*s;
		targetData[8] = tmp1 + tmp2;
		targetData[2] = tmp1 - tmp2;
		tmp1 = y*z*t;
		tmp2 = x*s;
		targetData[9] = tmp1 - tmp2;
		targetData[6] = tmp1 + tmp2;

		targetData[3] = 0;
		targetData[7] = 0;
		targetData[11] = 0;
		targetData[12] = 0;
		targetData[13] = 0;
		targetData[14] = 0;
		targetData[15] = 1;

		target.invalidatePosition();

		return target;
	}

	public static getPointAtMatrix(pos:Vector3D, dir:Vector3D, up:Vector3D, target:Matrix3D = null):Matrix3D
	{
		var dirN:Vector3D;
		var upN:Vector3D;
		var lftN:Vector3D;

		if (target == null)
			target = new Matrix3D();

		var targetData:Float32Array = target._rawData;

		dirN = dir.clone();
		dirN.normalize();

		upN = up.clone();
		upN.normalize();
		
		lftN = upN.crossProduct(dirN);
		lftN.normalize();

		if (lftN.length < 0.05) {
			lftN.x = upN.y;
			lftN.y = upN.x;
			lftN.z = 0;
			lftN.normalize();
		}

		upN = dirN.crossProduct(lftN);

		targetData[0] = lftN.x;
		targetData[1] = lftN.y;
		targetData[2] = lftN.z;
		targetData[3] = 0;

		targetData[4] = upN.x;
		targetData[5] = upN.y;
		targetData[6] = upN.z;
		targetData[7] = 0;

		targetData[8] = dirN.x;
		targetData[9] = dirN.y;
		targetData[10] = dirN.z;
		targetData[11] = 0;

		targetData[12] = lftN.dotProduct(pos);
		targetData[13] = upN.dotProduct(pos);
		targetData[14] = dirN.dotProduct(pos);
		targetData[15] = 1;

		target.invalidatePosition();

		return target;
	}

	/**
	 * Fills the 3d matrix with values representing the transformation made by the given quaternion.
	 *
	 * @param    quarternion    The quarterion object to convert.
	 */
	public static getQuaternionMatrix(quarternion:Quaternion, target:Matrix3D = null):Matrix3D
	{
		if (target == null)
			target = new Matrix3D();

		var targetData:Float32Array = target._rawData;

		var x:number = quarternion.x;
		var y:number = quarternion.y;
		var z:number = quarternion.z;
		var w:number = quarternion.w;

		var xx:number = x*x;
		var xy:number = x*y;
		var xz:number = x*z;
		var xw:number = x*w;

		var yy:number = y*y;
		var yz:number = y*z;
		var yw:number = y*w;

		var zz:number = z*z;
		var zw:number = z*w;

		targetData[0] = 1 - 2*(yy + zz);
		targetData[1] = 2*(xy + zw);
		targetData[2] = 2*(xz - yw);
		targetData[4] = 2*(xy - zw);
		targetData[5] = 1 - 2*(xx + zz);
		targetData[6] = 2*(yz + xw);
		targetData[8] = 2*(xz + yw);
		targetData[9] = 2*(yz - xw);
		targetData[10] = 1 - 2*(xx + yy);

		targetData[3] = 0;
		targetData[7] = 0;
		targetData[11] = 0;
		targetData[12] = 0;
		targetData[13] = 0;
		targetData[14] = 0;
		targetData[15] = 1;

		target.invalidatePosition();

		return target;
	}

	/**
	 * Returns a boolean value representing whether there is any difference between the two given 3d matrices.
	 */
	public static compare(m1:Matrix3D, m2:Matrix3D):boolean
	{
		var r1:Float32Array = m1._rawData;
		var r2:Float32Array = m2._rawData;

		for (var i:number = 0; i < 16; ++i)
			if (r1[i] != r2[i])
				return false;

		return true;
	}

	/**
	 * A Vector of 16 Numbers, where every four elements is a column of a 4x4 matrix.
	 *
	 * <p>An exception is thrown if the _rawData property is set to a matrix that is not invertible. The Matrix3D
	 * object must be invertible. If a non-invertible matrix is needed, create a subexport class of the Matrix3D object.</p>
	 */
	public _rawData:Float32Array;

	private _position:Vector3D = new Vector3D();
	private _positionDirty:boolean = true;

	private _components:Array<Vector3D>;

	/**
	 * [read-only] A number that determines whether a matrix is invertible.
	 */
	public get determinant():number
	{
		return ((this._rawData[0]*this._rawData[5] - this._rawData[4]*this._rawData[1])*(this._rawData[10]*this._rawData[15] - this._rawData[14]*this._rawData[11]) - (this._rawData[0]*this._rawData[9] - this._rawData[8]*this._rawData[1])*(this._rawData[6]*this._rawData[15] - this._rawData[14]*this._rawData[7]) + (this._rawData[0]*this._rawData[13] - this._rawData[12]*this._rawData[1])*(this._rawData[6]*this._rawData[11] - this._rawData[10]*this._rawData[7]) + (this._rawData[4]*this._rawData[9] - this._rawData[8]*this._rawData[5])*(this._rawData[2]*this._rawData[15] - this._rawData[14]*this._rawData[3]) - (this._rawData[4]*this._rawData[13] - this._rawData[12]*this._rawData[5])*(this._rawData[2]*this._rawData[11] - this._rawData[10]*this._rawData[3]) + (this._rawData[8]*this._rawData[13] - this._rawData[12]*this._rawData[9])*(this._rawData[2]*this._rawData[7] - this._rawData[6]*this._rawData[3]));
	}

	/**
	 * A Vector3D object that holds the position, the 3D coordinate (x,y,z) of a display object within the
	 * transformation's frame of reference.
	 */
	public get position():Vector3D
	{
		if (this._positionDirty) {
			this._positionDirty = false;
			this._position.x = this._rawData[12];
			this._position.y = this._rawData[13];
			this._position.z = this._rawData[14];
		}

		return this._position;
	}

	/**
	 * Creates a Matrix3D object.
	 */
	constructor(rawData:Float32Array = null)
	{
		if (rawData != null) {
			this._rawData = rawData;
		} else {
			this._rawData = new Float32Array(16);
			this.identity();
		}
	}

	/**
	 * Appends the matrix by multiplying another Matrix3D object by the current Matrix3D object.
	 */
	public append(lhs:Matrix3D):void
	{
		var lrd:Float32Array = lhs._rawData;

		var m111:number = this._rawData[0];
		var m112:number = this._rawData[1];
		var m113:number = this._rawData[2];
		var m114:number = this._rawData[3];
		var m121:number = this._rawData[4];
		var m122:number = this._rawData[5];
		var m123:number = this._rawData[6];
		var m124:number = this._rawData[7];
		var m131:number = this._rawData[8];
		var m132:number = this._rawData[9];
		var m133:number = this._rawData[10];
		var m134:number = this._rawData[11];
		var m141:number = this._rawData[12];
		var m142:number = this._rawData[13];
		var m143:number = this._rawData[14];
		var m144:number = this._rawData[15];
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

		this._rawData[0] = m111*m211 + m112*m221 + m113*m231 + m114*m241;
		this._rawData[1] = m111*m212 + m112*m222 + m113*m232 + m114*m242;
		this._rawData[2] = m111*m213 + m112*m223 + m113*m233 + m114*m243;
		this._rawData[3] = m111*m214 + m112*m224 + m113*m234 + m114*m244;

		this._rawData[4] = m121*m211 + m122*m221 + m123*m231 + m124*m241;
		this._rawData[5] = m121*m212 + m122*m222 + m123*m232 + m124*m242;
		this._rawData[6] = m121*m213 + m122*m223 + m123*m233 + m124*m243;
		this._rawData[7] = m121*m214 + m122*m224 + m123*m234 + m124*m244;

		this._rawData[8] = m131*m211 + m132*m221 + m133*m231 + m134*m241;
		this._rawData[9] = m131*m212 + m132*m222 + m133*m232 + m134*m242;
		this._rawData[10] = m131*m213 + m132*m223 + m133*m233 + m134*m243;
		this._rawData[11] = m131*m214 + m132*m224 + m133*m234 + m134*m244;

		this._rawData[12] = m141*m211 + m142*m221 + m143*m231 + m144*m241;
		this._rawData[13] = m141*m212 + m142*m222 + m143*m232 + m144*m242;
		this._rawData[14] = m141*m213 + m142*m223 + m143*m233 + m144*m243;
		this._rawData[15] = m141*m214 + m142*m224 + m143*m234 + m144*m244;

		this._positionDirty = true;
	}

	/**
	 * Appends an incremental rotation to a Matrix3D object.
	 */
	public appendRotation(degrees:number, axis:Vector3D):void
	{
		this.append(Matrix3D.getAxisRotationMatrix(axis.x, axis.y, axis.z, degrees, Matrix3D._tempMatrix));
	}

	/**
	 * Appends an incremental skew change along the x, y, and z axes to a Matrix3D object.
	 */
	public appendSkew(xSkew:number, ySkew:number, zSkew:number):void
	{
		if(xSkew == 0 && ySkew == 0 && zSkew == 0)
			return;

		var rawData:Float32Array = Matrix3D._tempMatrix._rawData;

		rawData[0] = 1;
		rawData[1] = 0;
		rawData[2] = 0;
		rawData[3] = 0;

		rawData[4] = xSkew;
		rawData[5] = 1;
		rawData[6] = 0;
		rawData[7] = 0;

		rawData[8] = ySkew;
		rawData[9] = zSkew;
		rawData[10] = 1;
		rawData[11] = 0;

		rawData[12] = 0;
		rawData[13] = 0;
		rawData[14] = 0;
		rawData[15] = 1;

		this.append(Matrix3D._tempMatrix);
	}

	/**
	 * Appends an incremental scale change along the x, y, and z axes to a Matrix3D object.
	 */
	public appendScale(xScale:number, yScale:number, zScale:number):void
	{
		if(xScale == 1 && yScale == 1 && zScale == 1)
			return;

		var rawData:Float32Array = Matrix3D._tempMatrix._rawData;

		rawData[0] = xScale;
		rawData[1] = 0;
		rawData[2] = 0;
		rawData[3] = 0;

		rawData[4] = 0;
		rawData[5] = yScale;
		rawData[6] = 0;
		rawData[7] = 0;

		rawData[8] = 0;
		rawData[9] = 0;
		rawData[10] = zScale;
		rawData[11] = 0;

		rawData[12] = 0;
		rawData[13] = 0;
		rawData[14] = 0;
		rawData[15] = 1;

		this.append(Matrix3D._tempMatrix);
	}

	/**
	 * Appends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
	 */
	public appendTranslation(x:number, y:number, z:number):void
	{
		this._rawData[12] += x;
		this._rawData[13] += y;
		this._rawData[14] += z;

		this._positionDirty = true;
	}

	/**
	 * Returns a new Matrix3D object that is an exact copy of the current Matrix3D object.
	 */
	public clone():Matrix3D
	{
		var matrix3D:Matrix3D = new Matrix3D();

		matrix3D.copyFrom(this);

		return matrix3D;
	}

	/**
	 * Copies a Vector3D object into specific column of the calling Matrix3D object.
	 */
	public copyColumnFrom(column:number, vector3D:Vector3D):void
	{
		if (column < 0 || column > 3)
			throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");

		column *= 4;
		this._rawData[column] = vector3D.x;
		this._rawData[column + 1] = vector3D.y;
		this._rawData[column + 2] = vector3D.z;
		this._rawData[column + 3] = vector3D.w;

		this._positionDirty = true;
	}

	/**
	 * Copies specific column of the calling Matrix3D object into the Vector3D object.
	 */
	public copyColumnTo(column:number, vector3D:Vector3D, negate:boolean = false):void
	{
		if (column < 0 || column > 3)
			throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");

		column *= 4;

		var sourceData = this._rawData;
		
		if (negate) {
			vector3D.x = -sourceData[column];
			vector3D.y = -sourceData[column + 1];
			vector3D.z = -sourceData[column + 2];
			vector3D.w = -sourceData[column + 3];
		} else {
			vector3D.x = sourceData[column];
			vector3D.y = sourceData[column + 1];
			vector3D.z = sourceData[column + 2];
			vector3D.w = sourceData[column + 3];
		}
	}

	/**
	 * Copies all of the matrix data from the source Matrix3D object into the calling Matrix3D object.
	 */
	public copyFrom(source:Matrix3D, transpose:boolean = false):void
	{
		var sourceData = source._rawData, targetData = this._rawData;

		targetData[0] = sourceData[0];
		targetData[5] = sourceData[5];
		targetData[10] = sourceData[10];
		targetData[15] = sourceData[15];

		if (transpose) {
			targetData[1] = sourceData[4];
			targetData[2] = sourceData[8];
			targetData[3] = sourceData[12];
			targetData[4] = sourceData[1];
			targetData[6] = sourceData[9];
			targetData[7] = sourceData[13];
			targetData[8] = sourceData[2];
			targetData[9] = sourceData[6];
			targetData[11] = sourceData[14];
			targetData[12] = sourceData[3];
			targetData[13] = sourceData[7];
			targetData[14] = sourceData[11];
		} else {
			targetData[1] = sourceData[1];
			targetData[2] = sourceData[2];
			targetData[3] = sourceData[3];
			targetData[4] = sourceData[4];
			targetData[6] = sourceData[6];
			targetData[7] = sourceData[7];
			targetData[8] = sourceData[8];
			targetData[9] = sourceData[9];
			targetData[11] = sourceData[11];
			targetData[12] = sourceData[12];
			targetData[13] = sourceData[13];
			targetData[14] = sourceData[14];
		}

		this._positionDirty = true;
	}

	/**
	 * Copies this Matrix3D object into a destination Matrix3D object.
	 */
	public copyTo(target:Matrix3D, transpose:boolean = false):void
	{
		target.copyFrom(this, transpose);
	}

	public copyRawDataFrom(sourceData:Float32Array, offset:number = 0, transpose:boolean = false):void
	{
		var targetData = this._rawData;

		targetData[0] = sourceData[offset + 0];
		targetData[5] = sourceData[offset + 5];
		targetData[10] = sourceData[offset + 10];
		targetData[15] = sourceData[offset + 15];

		if (transpose) {
			targetData[offset + 1] = sourceData[4];
			targetData[offset + 2] = sourceData[8];
			targetData[offset + 3] = sourceData[12];
			targetData[offset + 4] = sourceData[1];
			targetData[offset + 6] = sourceData[9];
			targetData[offset + 7] = sourceData[13];
			targetData[offset + 8] = sourceData[2];
			targetData[offset + 9] = sourceData[6];
			targetData[offset + 11] = sourceData[14];
			targetData[offset + 12] = sourceData[3];
			targetData[offset + 13] = sourceData[7];
			targetData[offset + 14] = sourceData[11];
		} else {
			targetData[1] = sourceData[offset + 1];
			targetData[2] = sourceData[offset + 2];
			targetData[3] = sourceData[offset + 3];
			targetData[4] = sourceData[offset + 4];
			targetData[6] = sourceData[offset + 6];
			targetData[7] = sourceData[offset + 7];
			targetData[8] = sourceData[offset + 8];
			targetData[9] = sourceData[offset + 9];
			targetData[11] = sourceData[offset + 11];
			targetData[12] = sourceData[offset + 12];
			targetData[13] = sourceData[offset + 13];
			targetData[14] = sourceData[offset + 14];
		}

		this._positionDirty = true;
	}

	public copyRawDataTo(targetData:Float32Array, offset:number = 0, transpose:boolean = false):void
	{
		var sourceData = this._rawData;

		targetData[offset] = sourceData[0];
		targetData[offset + 5] = sourceData[5];
		targetData[offset + 10] = sourceData[10];
		targetData[offset + 15] = sourceData[15];

		if (transpose) {
			targetData[offset + 1] = sourceData[4];
			targetData[offset + 2] = sourceData[8];
			targetData[offset + 3] = sourceData[12];
			targetData[offset + 4] = sourceData[1];
			targetData[offset + 6] = sourceData[9];
			targetData[offset + 7] = sourceData[13];
			targetData[offset + 8] = sourceData[2];
			targetData[offset + 9] = sourceData[6];
			targetData[offset + 11] = sourceData[14];
			targetData[offset + 12] = sourceData[3];
			targetData[offset + 13] = sourceData[7];
			targetData[offset + 14] = sourceData[11];
		} else {
			targetData[offset + 1] = sourceData[1];
			targetData[offset + 2] = sourceData[2];
			targetData[offset + 3] = sourceData[3];
			targetData[offset + 4] = sourceData[4];
			targetData[offset + 6] = sourceData[6];
			targetData[offset + 7] = sourceData[7];
			targetData[offset + 8] = sourceData[8];
			targetData[offset + 9] = sourceData[9];
			targetData[offset + 11] = sourceData[11];
			targetData[offset + 12] = sourceData[12];
			targetData[offset + 13] = sourceData[13];
			targetData[offset + 14] = sourceData[14];
		}
	}

	/**
	 * Copies a Vector3D object into specific row of the calling Matrix3D object.
	 */
	public copyRowFrom(row:number, vector3D:Vector3D):void
	{
		if (row < 0 || row > 3)
			throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 3]");

		this._rawData[row] = vector3D.x;
		this._rawData[row + 4] = vector3D.y;
		this._rawData[row + 8] = vector3D.z;
		this._rawData[row + 12] = vector3D.w;

		this._positionDirty = true;
	}

	/**
	 * Copies specific row of the calling Matrix3D object into the Vector3D object.
	 */
	public copyRowTo(row:number, vector3D:Vector3D, negate:boolean = false):void
	{
		if (row < 0 || row > 3)
			throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 3]");
		
		var sourceData:Float32Array = this._rawData;
		
		if (negate) {
			vector3D.x = -sourceData[row];
			vector3D.y = -sourceData[row + 4];
			vector3D.z = -sourceData[row + 8];
			vector3D.w = -sourceData[row + 12];
		} else {
			vector3D.x = sourceData[row];
			vector3D.y = sourceData[row + 4];
			vector3D.z = sourceData[row + 8];
			vector3D.w = sourceData[row + 12];
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

		var colX:Vector3D = new Vector3D(this._rawData[0], this._rawData[1], this._rawData[2]);
		var colY:Vector3D = new Vector3D(this._rawData[4], this._rawData[5], this._rawData[6]);
		var colZ:Vector3D = new Vector3D(this._rawData[8], this._rawData[9], this._rawData[10]);

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

		t.x = x*this._rawData[0] + y*this._rawData[4] + z*this._rawData[8];
		t.y = x*this._rawData[1] + y*this._rawData[5] + z*this._rawData[9];
		t.z = x*this._rawData[2] + y*this._rawData[6] + z*this._rawData[10];
		t.w = x*this._rawData[3] + y*this._rawData[7] + z*this._rawData[11];

		return t;
	}

	public deltaTransformVectors(vin:Array<number>, vout:Array<number>):void
	{
		var rawData:Float32Array = this._rawData;

		var a:number = rawData[0];
		var e:number = rawData[1];
		var i:number = rawData[2];
		var m:number = rawData[3];
		var b:number = rawData[4];
		var f:number = rawData[5];
		var j:number = rawData[6];
		var n:number = rawData[7];
		var c:number = rawData[8];
		var g:number = rawData[9];
		var k:number = rawData[10];
		var o:number = rawData[11];

		var outIndex:number = 0;
		var length:number = vin.length;

		for(var index:number = 0; index<length; index+=3) {
			var x:number = vin[index];
			var y:number = vin[index+1];
			var z:number = vin[index+2];
			vout[outIndex++] = a * x + b * y + c * z;
			vout[outIndex++] = e * x + f * y + g * z;
			vout[outIndex++] = i * x + j * y + k * z;
		}
	}

	/**
	 * Converts the current matrix to an identity or unit matrix.
	 */
	public identity():void
	{
		this._rawData[0] = 1;
		this._rawData[1] = 0;
		this._rawData[2] = 0;
		this._rawData[3] = 0;
		this._rawData[4] = 0;
		this._rawData[5] = 1;
		this._rawData[6] = 0;
		this._rawData[7] = 0;
		this._rawData[8] = 0;
		this._rawData[9] = 0;
		this._rawData[10] = 1;
		this._rawData[11] = 0;
		this._rawData[12] = 0;
		this._rawData[13] = 0;
		this._rawData[14] = 0;
		this._rawData[15] = 1;

		this._positionDirty = true;
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
			var m11:number = this._rawData[0];
			var m12:number = this._rawData[1];
			var m13:number = this._rawData[2];
			var m14:number = this._rawData[3];
			var m21:number = this._rawData[4];
			var m22:number = this._rawData[5];
			var m23:number = this._rawData[6];
			var m24:number = this._rawData[7];
			var m31:number = this._rawData[8];
			var m32:number = this._rawData[9];
			var m33:number = this._rawData[10];
			var m34:number = this._rawData[11];
			var m41:number = this._rawData[12];
			var m42:number = this._rawData[13];
			var m43:number = this._rawData[14];
			var m44:number = this._rawData[15];

			this._rawData[0] = d*(m22*(m33*m44 - m43*m34) - m32*(m23*m44 - m43*m24) + m42*(m23*m34 - m33*m24));
			this._rawData[1] = -d*(m12*(m33*m44 - m43*m34) - m32*(m13*m44 - m43*m14) + m42*(m13*m34 - m33*m14));
			this._rawData[2] = d*(m12*(m23*m44 - m43*m24) - m22*(m13*m44 - m43*m14) + m42*(m13*m24 - m23*m14));
			this._rawData[3] = -d*(m12*(m23*m34 - m33*m24) - m22*(m13*m34 - m33*m14) + m32*(m13*m24 - m23*m14));
			this._rawData[4] = -d*(m21*(m33*m44 - m43*m34) - m31*(m23*m44 - m43*m24) + m41*(m23*m34 - m33*m24));
			this._rawData[5] = d*(m11*(m33*m44 - m43*m34) - m31*(m13*m44 - m43*m14) + m41*(m13*m34 - m33*m14));
			this._rawData[6] = -d*(m11*(m23*m44 - m43*m24) - m21*(m13*m44 - m43*m14) + m41*(m13*m24 - m23*m14));
			this._rawData[7] = d*(m11*(m23*m34 - m33*m24) - m21*(m13*m34 - m33*m14) + m31*(m13*m24 - m23*m14));
			this._rawData[8] = d*(m21*(m32*m44 - m42*m34) - m31*(m22*m44 - m42*m24) + m41*(m22*m34 - m32*m24));
			this._rawData[9] = -d*(m11*(m32*m44 - m42*m34) - m31*(m12*m44 - m42*m14) + m41*(m12*m34 - m32*m14));
			this._rawData[10] = d*(m11*(m22*m44 - m42*m24) - m21*(m12*m44 - m42*m14) + m41*(m12*m24 - m22*m14));
			this._rawData[11] = -d*(m11*(m22*m34 - m32*m24) - m21*(m12*m34 - m32*m14) + m31*(m12*m24 - m22*m14));
			this._rawData[12] = -d*(m21*(m32*m43 - m42*m33) - m31*(m22*m43 - m42*m23) + m41*(m22*m33 - m32*m23));
			this._rawData[13] = d*(m11*(m32*m43 - m42*m33) - m31*(m12*m43 - m42*m13) + m41*(m12*m33 - m32*m13));
			this._rawData[14] = -d*(m11*(m22*m43 - m42*m23) - m21*(m12*m43 - m42*m13) + m41*(m12*m23 - m22*m13));
			this._rawData[15] = d*(m11*(m22*m33 - m32*m23) - m21*(m12*m33 - m32*m13) + m31*(m12*m23 - m22*m13));
		}

		this._positionDirty = true;

		return invertable;
	}

	public isIdentity():boolean
	{
		if (this._rawData[0] == 1 &&
			this._rawData[1] == 0 &&
			this._rawData[2] == 0 &&
			this._rawData[3] == 0 &&
			this._rawData[4] == 0 &&
			this._rawData[5] == 1 &&
			this._rawData[6] == 0 &&
			this._rawData[7] == 0 &&
			this._rawData[8] == 0 &&
			this._rawData[9] == 0 &&
			this._rawData[10] == 1 &&
			this._rawData[11] == 0 &&
			this._rawData[12] == 0 &&
			this._rawData[13] == 0 &&
			this._rawData[14] == 0 &&
			this._rawData[15] == 1)
				return true;

		return false;
	}

	/**
	 * Prepends a matrix by multiplying the current Matrix3D object by another Matrix3D object.
	 */
	public prepend(rhs:Matrix3D):void
	{
		var m111:number = rhs._rawData[0];
		var m112:number = rhs._rawData[1];
		var m113:number = rhs._rawData[2];
		var m114:number = rhs._rawData[3];
		var m121:number = rhs._rawData[4];
		var m122:number = rhs._rawData[5];
		var m123:number = rhs._rawData[6];
		var m124:number = rhs._rawData[7];
		var m131:number = rhs._rawData[8];
		var m132:number = rhs._rawData[9];
		var m133:number = rhs._rawData[10];
		var m134:number = rhs._rawData[11];
		var m141:number = rhs._rawData[12];
		var m142:number = rhs._rawData[13];
		var m143:number = rhs._rawData[14];
		var m144:number = rhs._rawData[15];

		var m211:number = this._rawData[0];
		var m212:number = this._rawData[1];
		var m213:number = this._rawData[2];
		var m214:number = this._rawData[3];
		var m221:number = this._rawData[4];
		var m222:number = this._rawData[5];
		var m223:number = this._rawData[6];
		var m224:number = this._rawData[7];
		var m231:number = this._rawData[8];
		var m232:number = this._rawData[9];
		var m233:number = this._rawData[10];
		var m234:number = this._rawData[11];
		var m241:number = this._rawData[12];
		var m242:number = this._rawData[13];
		var m243:number = this._rawData[14];
		var m244:number = this._rawData[15];

		this._rawData[0] = m111*m211 + m112*m221 + m113*m231 + m114*m241;
		this._rawData[1] = m111*m212 + m112*m222 + m113*m232 + m114*m242;
		this._rawData[2] = m111*m213 + m112*m223 + m113*m233 + m114*m243;
		this._rawData[3] = m111*m214 + m112*m224 + m113*m234 + m114*m244;

		this._rawData[4] = m121*m211 + m122*m221 + m123*m231 + m124*m241;
		this._rawData[5] = m121*m212 + m122*m222 + m123*m232 + m124*m242;
		this._rawData[6] = m121*m213 + m122*m223 + m123*m233 + m124*m243;
		this._rawData[7] = m121*m214 + m122*m224 + m123*m234 + m124*m244;

		this._rawData[8] = m131*m211 + m132*m221 + m133*m231 + m134*m241;
		this._rawData[9] = m131*m212 + m132*m222 + m133*m232 + m134*m242;
		this._rawData[10] = m131*m213 + m132*m223 + m133*m233 + m134*m243;
		this._rawData[11] = m131*m214 + m132*m224 + m133*m234 + m134*m244;

		this._rawData[12] = m141*m211 + m142*m221 + m143*m231 + m144*m241;
		this._rawData[13] = m141*m212 + m142*m222 + m143*m232 + m144*m242;
		this._rawData[14] = m141*m213 + m142*m223 + m143*m233 + m144*m243;
		this._rawData[15] = m141*m214 + m142*m224 + m143*m234 + m144*m244;

		this._positionDirty = true;
	}

	/**
	 * Prepends an incremental rotation to a Matrix3D object.
	 */
	public prependRotation(degrees:number, axis:Vector3D) //, pivot:Vector3D = null ):void
	{
		this.prepend(Matrix3D.getAxisRotationMatrix(axis.x, axis.y, axis.z, degrees, Matrix3D._tempMatrix));
	}

	/**
	 * Prepends an incremental scale change along the x, y, and z axes to a Matrix3D object.
	 */
	public prependScale(xScale:number, yScale:number, zScale:number):void
	{
		if(xScale == 1 && yScale == 1 && zScale == 1)
			return;

		var rawData:Float32Array = Matrix3D._tempMatrix._rawData;

		rawData[0] = xScale;
		rawData[1] = 0;
		rawData[2] = 0;
		rawData[3] = 0;

		rawData[4] = 0;
		rawData[5] = yScale;
		rawData[6] = 0;
		rawData[7] = 0;

		rawData[8] = 0;
		rawData[9] = 0;
		rawData[10] = zScale;
		rawData[11] = 0;

		rawData[12] = 0;
		rawData[13] = 0;
		rawData[14] = 0;
		rawData[15] = 1;

		this.prepend(Matrix3D._tempMatrix);
	}

	/**
	 * Prepends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
	 */
	public prependTranslation(x:number, y:number, z:number):void
	{
		var rawData:Float32Array = Matrix3D._tempMatrix._rawData;

		rawData[0] = 1;
		rawData[1] = 0;
		rawData[2] = 0;
		rawData[3] = 0;

		rawData[4] = 0;
		rawData[5] = 1;
		rawData[6] = 0;
		rawData[7] = 0;

		rawData[8] = 0;
		rawData[9] = 0;
		rawData[10] = 1;
		rawData[11] = 0;

		rawData[12] = x;
		rawData[13] = y;
		rawData[14] = z;
		rawData[15] = 1;

		this.prepend(Matrix3D._tempMatrix);
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
		var rawData:Float32Array = Matrix3D._tempMatrix._rawData;
		rawData[12] = 0;
		rawData[13] = 0;
		rawData[14] = 0;
		rawData[15] = 0;

		var rotation:Vector3D = components[1];
		if (rotation) {
			var angle:number = -rotation.x;
			if(angle != 0){
				sin = Math.sin(angle);
				cos = Math.cos(angle);

				rawData[0] = 1;
				rawData[1] = 0;
				rawData[2] = 0;
				rawData[3] = 0;

				rawData[4] = 0;
				rawData[5] = cos;
				rawData[6] = -sin;
				rawData[7] = 0;

				rawData[8] = 0;
				rawData[9] = sin;
				rawData[10] = cos;
				rawData[11] = 0;

				this.append(Matrix3D._tempMatrix);
			}
			angle = -rotation.y;
			if(angle != 0){
				sin = Math.sin(angle);
				cos = Math.cos(angle);

				rawData[0] = cos;
				rawData[1] = 0;
				rawData[2] = sin;
				rawData[3] = 0;

				rawData[4] = 0;
				rawData[5] = 1;
				rawData[6] = 0;
				rawData[7] = 0;

				rawData[8] = -sin;
				rawData[9] = 0;
				rawData[10] = cos;
				rawData[11] = 0;

				this.append(Matrix3D._tempMatrix);
			}
			angle = -rotation.z;
			if(angle != 0){
				sin = Math.sin(angle);
				cos = Math.cos(angle);

				rawData[0] = cos;
				rawData[1] = -sin;
				rawData[2] = 0;
				rawData[3] = 0;

				rawData[4] = sin;
				rawData[5] = cos;
				rawData[6] = 0;
				rawData[7] = 0;

				rawData[8] = 0;
				rawData[9] = 0;
				rawData[10] = 1;
				rawData[11] = 0;

				this.append(Matrix3D._tempMatrix);
			}
		}

		this._rawData[12] = pos.x;
		this._rawData[13] = pos.y;
		this._rawData[14] = pos.z;

		if (components[0])
			this._positionDirty = true;

		this._rawData[15] = 1;

		return true;
	}


	public reflect(plane:Plane3D):void
	{
		var a:number = plane.a, b:number = plane.b, c:number = plane.c, d:number = plane.d;
		var ab2:number = -2*a*b;
		var ac2:number = -2*a*c;
		var bc2:number = -2*b*c;

		// reflection matrix
		var rawData:Float32Array = this._rawData;
		rawData[0] = 1 - 2*a*a;
		rawData[4] = ab2;
		rawData[8] = ac2;
		rawData[12] = -2*a*d;
		rawData[1] = ab2;
		rawData[5] = 1 - 2*b*b;
		rawData[9] = bc2;
		rawData[13] = -2*b*d;
		rawData[2] = ac2;
		rawData[6] = bc2;
		rawData[10] = 1 - 2*c*c;
		rawData[14] = -2*c*d;
		rawData[3] = 0;
		rawData[7] = 0;
		rawData[11] = 0;
		rawData[15] = 1;

		this._positionDirty = true;
	}

	public transformBox(box:Box, target:Box = null):Box
	{
		if (box == null)
			throw new ArgumentError("ArgumentError, box cannot be null");

		var minX:number, minY:number, minZ:number;
		var maxX:number, maxY:number, maxZ:number;

		maxX = box.width + (minX = box.x);
		maxY = box.height + (minY = box.y);
		maxZ = box.depth + (minZ = box.z);

		if (!target)
			target = new Box();

		//TODO: take account of shear
		target.width = maxX*this._rawData[0] + maxY*this._rawData[4] + maxZ*this._rawData[8] + this._rawData[12] - (target.x = minX*this._rawData[0] + minY*this._rawData[4] + minZ*this._rawData[8] + this._rawData[12]);
		target.height = maxX*this._rawData[1] + maxY*this._rawData[5] + maxZ*this._rawData[9] + this._rawData[13] - (target.y = minX*this._rawData[1] + minY*this._rawData[5] + minZ*this._rawData[9] + this._rawData[13]);
		target.depth = maxX*this._rawData[2] + maxY*this._rawData[6] + maxZ*this._rawData[10] + this._rawData[14] - (target.z = minX*this._rawData[2] + minY*this._rawData[6] + minZ*this._rawData[10] + this._rawData[14]);

		return target;
	}


	public transformVector(vector:Vector3D, target:Vector3D = null):Vector3D
	{
		if (vector == null)
			throw new ArgumentError("ArgumentError, vector cannot be null");

		var x:number = vector.x;
		var y:number = vector.y;
		var z:number = vector.z;
		var w:number = vector.w;

		if (!target)
			target = new Vector3D();

		target.x = x*this._rawData[0] + y*this._rawData[4] + z*this._rawData[8] + w*this._rawData[12];
		target.y = x*this._rawData[1] + y*this._rawData[5] + z*this._rawData[9] + w*this._rawData[13];
		target.z = x*this._rawData[2] + y*this._rawData[6] + z*this._rawData[10] + w*this._rawData[14];
		target.w = x*this._rawData[3] + y*this._rawData[7] + z*this._rawData[11] + w*this._rawData[15];

		return target;
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
			vout[i] = x*this._rawData[0] + y*this._rawData[4] + z*this._rawData[8] + this._rawData[12];
			vout[i + 1] = x*this._rawData[1] + y*this._rawData[5] + z*this._rawData[9] + this._rawData[13];
			vout[i + 2] = x*this._rawData[2] + y*this._rawData[6] + z*this._rawData[10] + this._rawData[14];
			i += 3;
		}
	}

	/**
	 * Converts the current Matrix3D object to a matrix where the rows and columns are swapped.
	 */
	public transpose():void
	{
		var rawData:Float32Array = Matrix3D._tempMatrix._rawData;

		this.copyRawDataTo(rawData, 0, true);

		this._rawData[1] = rawData[1];
		this._rawData[2] = rawData[2];
		this._rawData[3] = rawData[3];
		this._rawData[4] = rawData[4];
		this._rawData[6] = rawData[6];
		this._rawData[7] = rawData[7];
		this._rawData[8] = rawData[8];
		this._rawData[9] = rawData[9];
		this._rawData[11] = rawData[11];
		this._rawData[12] = rawData[12];
		this._rawData[13] = rawData[13];
		this._rawData[14] = rawData[14];

		this._positionDirty = true;
	}

	public invalidatePosition():void
	{
		this._positionDirty = true;
	}

	public toFixed(decimalPlace:number):string
	{
		var magnitude:number = Math.pow(10, decimalPlace);
		return "matrix3d(" + Math.round(this._rawData[0]*magnitude)/magnitude + "," + Math.round(this._rawData[1]*magnitude)/magnitude + "," + Math.round(this._rawData[2]*magnitude)/magnitude + "," + Math.round(this._rawData[3]*magnitude)/magnitude + "," + Math.round(this._rawData[4]*magnitude)/magnitude + "," + Math.round(this._rawData[5]*magnitude)/magnitude + "," + Math.round(this._rawData[6]*magnitude)/magnitude + "," + Math.round(this._rawData[7]*magnitude)/magnitude + "," + Math.round(this._rawData[8]*magnitude)/magnitude + "," + Math.round(this._rawData[9]*magnitude)/magnitude + "," + Math.round(this._rawData[10]*magnitude)/magnitude + "," + Math.round(this._rawData[11]*magnitude)/magnitude + "," + Math.round(this._rawData[12]*magnitude)/magnitude + "," + Math.round(this._rawData[13]*magnitude)/magnitude + "," + Math.round(this._rawData[14]*magnitude)/magnitude + "," + Math.round(this._rawData[15]*magnitude)/magnitude + ")";
	}

	public toString():string
	{
		return "matrix3d(" + Math.round(this._rawData[0]*1000)/1000 + "," + Math.round(this._rawData[1]*1000)/1000 + "," + Math.round(this._rawData[2]*1000)/1000 + "," + Math.round(this._rawData[3]*1000)/1000 + "," + Math.round(this._rawData[4]*1000)/1000 + "," + Math.round(this._rawData[5]*1000)/1000 + "," + Math.round(this._rawData[6]*1000)/1000 + "," + Math.round(this._rawData[7]*1000)/1000 + "," + Math.round(this._rawData[8]*1000)/1000 + "," + Math.round(this._rawData[9]*1000)/1000 + "," + Math.round(this._rawData[10]*1000)/1000 + "," + Math.round(this._rawData[11]*1000)/1000 + "," + Math.round(this._rawData[12]*1000)/1000 + "," + Math.round(this._rawData[13]*1000)/1000 + "," + Math.round(this._rawData[14]*1000)/1000 + "," + Math.round(this._rawData[15]*1000)/1000 + ")";
	}
}