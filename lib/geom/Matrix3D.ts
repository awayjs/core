import { ArgumentError } from '../errors/ArgumentError';

import { Box } from './Box';
import { MathConsts } from './MathConsts';
import { Orientation3D } from './Orientation3D';
import { Plane3D } from './Plane3D';
import { Quaternion } from './Quaternion';
import { Sphere } from './Sphere';
import { Vector3D } from './Vector3D';

export class Matrix3D {
	/**
	 * A reference to a Matrix3D to be used as a temporary data container, preventing object creation.
	 */
	public static CALCULATION_MATRIX: Matrix3D = new Matrix3D();

	private static _tempMatrix: Matrix3D = new Matrix3D();

	static getAxisRotationMatrix(x: number, y: number, z: number, degrees: number, target: Matrix3D = null): Matrix3D {
		if (target == null)
			target = new Matrix3D();

		const targetData: Float32Array = target._rawData;

		const rad = degrees * MathConsts.DEGREES_TO_RADIANS;
		const c: number = Math.cos(rad);
		const s: number = Math.sin(rad);
		const t: number = 1 - c;
		let tmp1: number, tmp2: number;

		targetData[0] = c + x * x * t;
		targetData[5] = c + y * y * t;
		targetData[10] = c + z * z * t;

		tmp1 = x * y * t;
		tmp2 = z * s;
		targetData[1] = tmp1 + tmp2;
		targetData[4] = tmp1 - tmp2;
		tmp1 = x * z * t;
		tmp2 = y * s;
		targetData[8] = tmp1 + tmp2;
		targetData[2] = tmp1 - tmp2;
		tmp1 = y * z * t;
		tmp2 = x * s;
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

	public static getPointAtMatrix(pos: Vector3D, dir: Vector3D, up: Vector3D, target: Matrix3D = null): Matrix3D {
		let upN: Vector3D;

		if (target == null)
			target = new Matrix3D();

		const targetData: Float32Array = target._rawData;

		const dirN = dir.clone();
		dirN.normalize();

		upN = up.clone();
		upN.normalize();

		const lftN = upN.crossProduct(dirN);
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
	public static getQuaternionMatrix(quarternion: Quaternion, target: Matrix3D = null): Matrix3D {
		if (target == null)
			target = new Matrix3D();

		const targetData: Float32Array = target._rawData;

		const x: number = quarternion.x;
		const y: number = quarternion.y;
		const z: number = quarternion.z;
		const w: number = quarternion.w;

		const xx: number = x * x;
		const xy: number = x * y;
		const xz: number = x * z;
		const xw: number = x * w;

		const yy: number = y * y;
		const yz: number = y * z;
		const yw: number = y * w;

		const zz: number = z * z;
		const zw: number = z * w;

		targetData[0] = 1 - 2 * (yy + zz);
		targetData[1] = 2 * (xy + zw);
		targetData[2] = 2 * (xz - yw);
		targetData[4] = 2 * (xy - zw);
		targetData[5] = 1 - 2 * (xx + zz);
		targetData[6] = 2 * (yz + xw);
		targetData[8] = 2 * (xz + yw);
		targetData[9] = 2 * (yz - xw);
		targetData[10] = 1 - 2 * (xx + yy);

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
	public static compare(m1: Matrix3D, m2: Matrix3D): boolean {
		const r1: Float32Array = m1._rawData;
		const r2: Float32Array = m2._rawData;

		for (let i: number = 0; i < 16; ++i)
			if (r1[i] != r2[i])
				return false;

		return true;
	}

	/**
	 * A Vector of 16 Numbers, where every four elements is a column of a 4x4 matrix.
	 *
	 * <p>An exception is thrown if the _rawData property is set to a matrix that is not invertible. The Matrix3D
	 * object must be invertible. If a non-invertible matrix is needed,
	 * create a subexport class of the Matrix3D object.</p>
	 */
	public _rawData: Float32Array;

	private _position: Vector3D = new Vector3D();
	private _positionDirty: boolean = true;

	private _components: Array<Vector3D>;

	/**
	 * [read-only] A number that determines whether a matrix is invertible.
	 */
	public get determinant(): number {
		const raw: Float32Array = this._rawData;

		return ((raw[0] * raw[5] - raw[4] * raw[1]) * (raw[10] * raw[15] - raw[14] * raw[11])
			- (raw[0] * raw[9] - raw[8] * raw[1]) * (raw[6] * raw[15] - raw[14] * raw[7])
			+ (raw[0] * raw[13] - raw[12] * raw[1]) * (raw[6] * raw[11] - raw[10] * raw[7])
			+ (raw[4] * raw[9] - raw[8] * raw[5]) * (raw[2] * raw[15] - raw[14] * raw[3])
			- (raw[4] * raw[13] - raw[12] * raw[5]) * (raw[2] * raw[11] - raw[10] * raw[3])
			+ (raw[8] * raw[13] - raw[12] * raw[9]) * (raw[2] * raw[7] - raw[6] * raw[3]));
	}

	/**
	 * A Vector3D object that holds the position, the 3D coordinate (x,y,z) of a display object within the
	 * transformation's frame of reference.
	 */
	public get position(): Vector3D {
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
	constructor(rawData: Float32Array = null) {
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
	public append(lhs: Matrix3D): void {
		const raw: Float32Array = this._rawData;
		const rawLhs: Float32Array = lhs._rawData;

		const m111: number = raw[0];
		const m112: number = raw[1];
		const m113: number = raw[2];
		const m114: number = raw[3];
		const m121: number = raw[4];
		const m122: number = raw[5];
		const m123: number = raw[6];
		const m124: number = raw[7];
		const m131: number = raw[8];
		const m132: number = raw[9];
		const m133: number = raw[10];
		const m134: number = raw[11];
		const m141: number = raw[12];
		const m142: number = raw[13];
		const m143: number = raw[14];
		const m144: number = raw[15];
		const m211: number = rawLhs[0];
		const m212: number = rawLhs[1];
		const m213: number = rawLhs[2];
		const m214: number = rawLhs[3];
		const m221: number = rawLhs[4];
		const m222: number = rawLhs[5];
		const m223: number = rawLhs[6];
		const m224: number = rawLhs[7];
		const m231: number = rawLhs[8];
		const m232: number = rawLhs[9];
		const m233: number = rawLhs[10];
		const m234: number = rawLhs[11];
		const m241: number = rawLhs[12];
		const m242: number = rawLhs[13];
		const m243: number = rawLhs[14];
		const m244: number = rawLhs[15];

		raw[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		raw[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		raw[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		raw[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

		raw[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		raw[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		raw[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		raw[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

		raw[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		raw[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		raw[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		raw[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

		raw[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		raw[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		raw[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		raw[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;

		this._positionDirty = true;
	}

	/**
	 * Appends an incremental rotation to a Matrix3D object.
	 */
	public appendRotation(degrees: number, axis: Vector3D): void {
		this.append(Matrix3D.getAxisRotationMatrix(axis.x, axis.y, axis.z, degrees, Matrix3D._tempMatrix));
	}

	/**
	 * Appends an incremental skew change along the x, y, and z axes to a Matrix3D object.
	 */
	public appendSkew(xSkew: number, ySkew: number, zSkew: number): void {
		if (xSkew == 0 && ySkew == 0 && zSkew == 0)
			return;

		const rawData: Float32Array = Matrix3D._tempMatrix._rawData;

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
	public appendScale(xScale: number, yScale: number, zScale: number): void {
		if (xScale == 1 && yScale == 1 && zScale == 1)
			return;

		const rawData: Float32Array = Matrix3D._tempMatrix._rawData;

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
	*Appends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
	 */
	public appendTranslation(x: number, y: number, z: number): void {
		const raw: Float32Array = this._rawData;

		const m41 = raw[3], m42 = raw[7], m43 = raw[11], m44 = raw[15];

		raw[0 ] += x * m41;
		raw[1 ] += y * m41;
		raw[2 ] += z * m41;

		raw[4 ] += x * m42;
		raw[5 ] += y * m42;
		raw[6 ] += z * m42;

		raw[8 ] += x * m43;
		raw[9 ] += y * m43;
		raw[10] += z * m43;

		raw[12] += x * m44;
		raw[13] += y * m44;
		raw[14] += z * m44;

		this._positionDirty = true;
	}

	/**
	 * Returns a new Matrix3D object that is an exact copy of the current Matrix3D object.
	 */
	public clone(): Matrix3D {
		const matrix3D: Matrix3D = new Matrix3D();

		matrix3D.copyFrom(this);

		return matrix3D;
	}

	/**
	 * Copies a Vector3D object into specific column of the calling Matrix3D object.
	 */
	public copyColumnFrom(column: number, vector3D: Vector3D): void {
		if (column < 0 || column > 3)
			throw new ArgumentError('ArgumentError, Column ' + column + ' out of bounds [0, ..., 3]');

		const targetData: Float32Array = this._rawData;
		const vectorData: Float32Array = vector3D._rawData;

		column *= 4;
		targetData[column] = vectorData[0];
		targetData[column + 1] = vectorData[1];
		targetData[column + 2] = vectorData[2];
		targetData[column + 3] = vectorData[3];

		this._positionDirty = true;
	}

	/**
	 * Copies specific column of the calling Matrix3D object into the Vector3D object.
	 */
	public copyColumnTo(column: number, vector3D: Vector3D, negate: boolean = false): void {
		if (column < 0 || column > 3)
			throw new ArgumentError('ArgumentError, Column ' + column + ' out of bounds [0, ..., 3]');

		column *= 4;

		const sourceData: Float32Array = this._rawData;
		const vectorData: Float32Array = vector3D._rawData;

		if (negate) {
			vectorData[0] = -sourceData[column];
			vectorData[1] = -sourceData[column + 1];
			vectorData[2] = -sourceData[column + 2];
			vectorData[3] = -sourceData[column + 3];
		} else {
			vectorData[0] = sourceData[column];
			vectorData[1] = sourceData[column + 1];
			vectorData[2] = sourceData[column + 2];
			vectorData[3] = sourceData[column + 3];
		}
	}

	/**
	 * Copies all of the matrix data from the source Matrix3D object into the calling Matrix3D object.
	 */
	public copyFrom(source: Matrix3D, transpose: boolean = false): void {
		const sourceData = source._rawData, targetData = this._rawData;

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
	public copyTo(target: Matrix3D, transpose: boolean = false): void {
		target.copyFrom(this, transpose);
	}

	public copyRawDataFrom(sourceData: Float32Array, offset: number = 0, transpose: boolean = false): void {
		const targetData = this._rawData;

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

	public copyRawDataTo(targetData: Float32Array, offset: number = 0, transpose: boolean = false): void {
		const sourceData = this._rawData;

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
	public copyRowFrom(row: number, vector3D: Vector3D): void {
		if (row < 0 || row > 3)
			throw new ArgumentError('ArgumentError, Row ' + row + ' out of bounds [0, ..., 3]');

		const targetData: Float32Array = this._rawData;
		const vectorData: Float32Array = vector3D._rawData;

		targetData[row] = vectorData[0];
		targetData[row + 4] = vectorData[1];
		targetData[row + 8] = vectorData[2];
		targetData[row + 12] = vectorData[3];

		this._positionDirty = true;
	}

	/**
	 * Copies specific row of the calling Matrix3D object into the Vector3D object.
	 */
	public copyRowTo(row: number, vector3D: Vector3D, negate: boolean = false): void {
		if (row < 0 || row > 3)
			throw new ArgumentError('ArgumentError, Row ' + row + ' out of bounds [0, ..., 3]');

		const sourceData: Float32Array = this._rawData;
		const vectorData: Float32Array = vector3D._rawData;

		if (negate) {
			vectorData[0] = -sourceData[row];
			vectorData[1] = -sourceData[row + 4];
			vectorData[2] = -sourceData[row + 8];
			vectorData[3] = -sourceData[row + 12];
		} else {
			vectorData[0] = sourceData[row];
			vectorData[1] = sourceData[row + 4];
			vectorData[2] = sourceData[row + 8];
			vectorData[3] = sourceData[row + 12];
		}
	}

	private static COL_X = new Vector3D();
	private static COL_Y = new Vector3D();
	private static COL_Z = new Vector3D();

	/**
	 * Returns the transformation matrix's translation, rotation, and scale
	 * settings as a Vector of three Vector3D objects.
	 */
	public decompose(orientationStyle: string = 'eulerAngles'): Vector3D[] {
		if (this._components == null)
			this._components = [new Vector3D(), new Vector3D(), new Vector3D(), new Vector3D()];

		/// use TMP for avoid realocation
		const colX =  Matrix3D.COL_X;
		colX.setTo(this._rawData[0], this._rawData[1], this._rawData[2]);

		const colY = Matrix3D.COL_Y;
		colY.setTo(this._rawData[4], this._rawData[5], this._rawData[6]);

		const colZ = Matrix3D.COL_Z;
		colZ.setTo(this._rawData[8], this._rawData[9], this._rawData[10]);

		const scale = this._components[3];
		const skew = this._components[2];

		//compute X scale factor and normalise colX
		scale.x = colX.length;

		if (scale.x)
			colX.scaleBy(1 / scale.x);

		//compute XY shear factor and make colY orthogonal to colX
		skew.x = colX.dotProduct(colY);
		Vector3D.combine(colY, colX, 1, -skew.x, colY);

		//compute Y scale factor and normalise colY
		scale.y = colY.length;

		if (scale.y) {
			colY.scaleBy(1 / scale.y);
			skew.x /= scale.y;
		}

		//compute XZ and YZ shears and make colZ orthogonal to colX and colY
		skew.y = colX.dotProduct(colZ);
		Vector3D.combine(colZ, colX, 1, -skew.y, colZ);
		skew.z = colY.dotProduct(colZ);
		Vector3D.combine(colZ, colY, 1, -skew.z, colZ);

		//compute Z scale and normalise colZ
		scale.z = colZ.length;

		if (scale.z) {
			colZ.scaleBy(1 / scale.z);
			skew.y /= scale.z;
			skew.z /= scale.z;
		}

		//at this point, the matrix (in cols) is orthonormal
		//check for a coordinate system flip. If the determinant is -1, negate the z scaling factor
		if (colX.dotProduct(colY.crossProduct(colZ)) < 0) {
			scale.z = -scale.z;
			colZ.x = -colZ.x;
			colZ.y = -colZ.y;
			colZ.z = -colZ.z;
		}

		const rot = this._components[1];

		switch (orientationStyle) {
			case Orientation3D.AXIS_ANGLE: {
				rot.w = Math.acos((colX.x + colY.y + colZ.z - 1) / 2);

				const len: number = Math.sqrt(
					(colY.z - colZ.y) * (colY.z - colZ.y) +
					(colZ.x - colX.z) * (colZ.x - colX.z) +
					(colX.y - colY.x) * (colX.y - colY.x));
				rot.x = len? (colY.z - colZ.y) / len : 0;
				rot.y = len? (colZ.x - colX.z) / len : 0;
				rot.z = len? (colX.y - colY.x) / len : 0;

				break;
			}
			case Orientation3D.QUATERNION: {
				const tr = colX.x + colY.y + colZ.z;

				if (tr > 0) {
					rot.w = Math.sqrt(1 + tr) / 2;

					rot.x = (colY.z - colZ.y) / (4 * rot.w);
					rot.y = (colZ.x - colX.z) / (4 * rot.w);
					rot.z = (colX.y - colY.x) / (4 * rot.w);
				} else if ((colX.x > colY.y) && (colX.x > colZ.z)) {
					rot.x = Math.sqrt(1 + colX.x - colY.y - colZ.z) / 2;

					rot.w = (colY.z - colZ.y) / (4 * rot.x);
					rot.y = (colX.y + colY.x) / (4 * rot.x);
					rot.z = (colZ.x + colX.z) / (4 * rot.x);
				} else if (colY.y > colZ.z) {
					rot.y = Math.sqrt(1 + colY.y - colX.x - colZ.z) / 2;

					rot.x = (colX.y + colY.x) / (4 * rot.y);
					rot.w = (colZ.x - colX.z) / (4 * rot.y);
					rot.z = (colY.z + colZ.y) / (4 * rot.y);
				} else {
					rot.z = Math.sqrt(1 + colZ.z - colX.x - colY.y) / 2;

					rot.x = (colZ.x + colX.z) / (4 * rot.z);
					rot.y = (colY.z + colZ.y) / (4 * rot.z);
					rot.w = (colX.y - colY.x) / (4 * rot.z);
				}

				break;
			}
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

		this._components[0].copyFrom(this.position);

		return this._components;
	}

	/**
	 * Uses the transformation matrix without its translation elements to transform a Vector3D object from one space
	 * coordinate to another.
	 */
	public deltaTransformVector(v: Vector3D, t: Vector3D = null): Vector3D {
		const x: number = v.x;
		const y: number = v.y;
		const z: number = v.z;

		if (!t)
			t = new Vector3D();

		const raw: Float32Array = this._rawData;
		const rawT: Float32Array = t._rawData;

		rawT[0] = x * raw[0] + y * raw[4] + z * raw[8];
		rawT[1] = x * raw[1] + y * raw[5] + z * raw[9];
		rawT[2] = x * raw[2] + y * raw[6] + z * raw[10];
		rawT[3] = x * raw[3] + y * raw[7] + z * raw[11];

		return t;
	}

	public deltaTransformVectors(vin: Array<number>, vout: Array<number>): void {
		const raw: Float32Array = this._rawData;

		const a: number = raw[0];
		const e: number = raw[1];
		const i: number = raw[2];

		const b: number = raw[4];
		const f: number = raw[5];
		const j: number = raw[6];

		const c: number = raw[8];
		const g: number = raw[9];
		const k: number = raw[10];

		let outIndex: number = 0;
		const length: number = vin.length;

		for (let index: number = 0; index < length; index += 3) {
			const x: number = vin[index];
			const y: number = vin[index + 1];
			const z: number = vin[index + 2];
			vout[outIndex++] = a * x + b * y + c * z;
			vout[outIndex++] = e * x + f * y + g * z;
			vout[outIndex++] = i * x + j * y + k * z;
		}
	}

	/**
	 * Converts the current matrix to an identity or unit matrix.
	 */
	public identity(): void {
		const raw: Float32Array = this._rawData;

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
		raw[12] = 0;
		raw[13] = 0;
		raw[14] = 0;
		raw[15] = 1;

		this._positionDirty = true;
	}

	/**
	 * Inverts the current matrix.
	 */
	public invert(): boolean {
		let d = this.determinant;
		const invertable: boolean = Math.abs(d) > 0.00000000001;
		const raw: Float32Array = this._rawData;

		if (invertable) {
			d = 1 / d;
			const m11: number = raw[0];
			const m12: number = raw[1];
			const m13: number = raw[2];
			const m14: number = raw[3];
			const m21: number = raw[4];
			const m22: number = raw[5];
			const m23: number = raw[6];
			const m24: number = raw[7];
			const m31: number = raw[8];
			const m32: number = raw[9];
			const m33: number = raw[10];
			const m34: number = raw[11];
			const m41: number = raw[12];
			const m42: number = raw[13];
			const m43: number = raw[14];
			const m44: number = raw[15];

			/* eslint-disable */
			raw[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
			raw[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
			raw[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
			raw[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
			raw[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
			raw[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
			raw[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
			raw[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
			raw[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
			raw[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
			raw[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
			raw[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
			raw[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
			raw[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
			raw[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
			raw[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
			/* eslint-enable */
		}

		this._positionDirty = true;

		return invertable;
	}

	public isIdentity(): boolean {
		const raw: Float32Array = this._rawData;

		if (raw[0] == 1 &&
			raw[1] == 0 &&
			raw[2] == 0 &&
			raw[3] == 0 &&
			raw[4] == 0 &&
			raw[5] == 1 &&
			raw[6] == 0 &&
			raw[7] == 0 &&
			raw[8] == 0 &&
			raw[9] == 0 &&
			raw[10] == 1 &&
			raw[11] == 0 &&
			raw[12] == 0 &&
			raw[13] == 0 &&
			raw[14] == 0 &&
			raw[15] == 1)
			return true;

		return false;
	}

	/**
	 * Prepends a matrix by multiplying the current Matrix3D object by another Matrix3D object.
	 */
	public prepend(rhs: Matrix3D): void {
		const raw: Float32Array = this._rawData;
		const rawRhs: Float32Array = rhs._rawData;

		const m111: number = rawRhs[0];
		const m112: number = rawRhs[1];
		const m113: number = rawRhs[2];
		const m114: number = rawRhs[3];
		const m121: number = rawRhs[4];
		const m122: number = rawRhs[5];
		const m123: number = rawRhs[6];
		const m124: number = rawRhs[7];
		const m131: number = rawRhs[8];
		const m132: number = rawRhs[9];
		const m133: number = rawRhs[10];
		const m134: number = rawRhs[11];
		const m141: number = rawRhs[12];
		const m142: number = rawRhs[13];
		const m143: number = rawRhs[14];
		const m144: number = rawRhs[15];

		const m211: number = raw[0];
		const m212: number = raw[1];
		const m213: number = raw[2];
		const m214: number = raw[3];
		const m221: number = raw[4];
		const m222: number = raw[5];
		const m223: number = raw[6];
		const m224: number = raw[7];
		const m231: number = raw[8];
		const m232: number = raw[9];
		const m233: number = raw[10];
		const m234: number = raw[11];
		const m241: number = raw[12];
		const m242: number = raw[13];
		const m243: number = raw[14];
		const m244: number = raw[15];

		raw[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		raw[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		raw[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		raw[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

		raw[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		raw[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		raw[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		raw[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

		raw[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		raw[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		raw[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		raw[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

		raw[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		raw[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		raw[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		raw[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;

		this._positionDirty = true;
	}

	/**
	 * Prepends an incremental rotation to a Matrix3D object.
	 */
	public prependRotation(degrees: number, axis: Vector3D)  //, pivot:Vector3D = null ):void
	{ 	// eslint-disable-line
		this.prepend(Matrix3D.getAxisRotationMatrix(axis.x, axis.y, axis.z, degrees, Matrix3D._tempMatrix));
	}

	/**
	 * Prepends an incremental scale change along the x, y, and z axes to a Matrix3D object.
	 */
	public prependScale(xScale: number, yScale: number, zScale: number): void {
		if (xScale == 1 && yScale == 1 && zScale == 1)
			return;

		const rawData: Float32Array = Matrix3D._tempMatrix._rawData;

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
	public prependTranslation(x: number, y: number, z: number): void {
		const rawData: Float32Array = Matrix3D._tempMatrix._rawData;

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
	public recompose(components: Vector3D[]): boolean {
		const pos: Vector3D = components[0] || this.position;

		this.identity();
		const scale: Vector3D = components[3];
		if (scale && (scale.x != 1 || scale.y != 1 || scale.z != 1))
			this.appendScale(scale.x, scale.y, scale.z);

		const skew: Vector3D = components[2];
		if (skew && (skew.x != 0 || skew.y != 0 || skew.z != 0))
			this.appendSkew(skew.x, skew.y, skew.z);

		let sin: number;
		let cos: number;
		const rawData: Float32Array = Matrix3D._tempMatrix._rawData;
		rawData[12] = 0;
		rawData[13] = 0;
		rawData[14] = 0;
		rawData[15] = 0;

		const rotation: Vector3D = components[1];
		if (rotation) {
			let angle: number = -rotation.x;
			if (angle != 0) {
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
			if (angle != 0) {
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
			if (angle != 0) {
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

	public reflect(plane: Plane3D): void {
		const a: number = plane.a, b: number = plane.b, c: number = plane.c, d: number = plane.d;
		const ab2: number = -2 * a * b;
		const ac2: number = -2 * a * c;
		const bc2: number = -2 * b * c;

		// reflection matrix
		const rawData: Float32Array = this._rawData;
		rawData[0] = 1 - 2 * a * a;
		rawData[4] = ab2;
		rawData[8] = ac2;
		rawData[12] = -2 * a * d;
		rawData[1] = ab2;
		rawData[5] = 1 - 2 * b * b;
		rawData[9] = bc2;
		rawData[13] = -2 * b * d;
		rawData[2] = ac2;
		rawData[6] = bc2;
		rawData[10] = 1 - 2 * c * c;
		rawData[14] = -2 * c * d;
		rawData[3] = 0;
		rawData[7] = 0;
		rawData[11] = 0;
		rawData[15] = 1;

		this._positionDirty = true;
	}

	public transformBox(box: Box, target: Box = null): Box {
		if (box == null)
			throw new ArgumentError('ArgumentError, box cannot be null');

		if (!target)
			target = new Box();

		const hx: number = box.width / 2;
		const hy: number = box.height / 2;
		const hz: number = box.depth / 2;
		const cx: number = box.x + hx;
		const cy: number = box.y + hy;
		const cz: number = box.z + hz;

		const
			m11: number = this._rawData[0],
			m12: number = this._rawData[4],
			m13: number = this._rawData[8],
			m14: number = this._rawData[12];

		const
			m21: number = this._rawData[1],
			m22: number = this._rawData[5],
			m23: number = this._rawData[9],
			m24: number = this._rawData[13];

		const
			m31: number = this._rawData[2],
			m32: number = this._rawData[6],
			m33: number = this._rawData[10],
			m34: number = this._rawData[14];

		const centerX: number = cx * m11 + cy * m12 + cz * m13 + m14;
		const centerY: number = cx * m21 + cy * m22 + cz * m23 + m24;
		const centerZ: number = cx * m31 + cy * m32 + cz * m33 + m34;

		const halfExtentsX: number = Math.max(
			Math.abs(hx * m11 + hy * m12 + hz * m13),
			Math.abs(-hx * m11 + hy * m12 + hz * m13),
			Math.abs(hx * m11 - hy * m12 + hz * m13),
			Math.abs(hx * m11 + hy * m12 - hz * m13));

		const halfExtentsY: number = Math.max(
			Math.abs(hx * m21 + hy * m22 + hz * m23),
			Math.abs(-hx * m21 + hy * m22 + hz * m23),
			Math.abs(hx * m21 - hy * m22 + hz * m23),
			Math.abs(hx * m21 + hy * m22 - hz * m23));

		const halfExtentsZ: number = Math.max(
			Math.abs(hx * m31 + hy * m32 + hz * m33),
			Math.abs(-hx * m31 + hy * m32 + hz * m33),
			Math.abs(hx * m31 - hy * m32 + hz * m33),
			Math.abs(hx * m31 + hy * m32 - hz * m33));

		target.width = halfExtentsX * 2;
		target.height = halfExtentsY * 2;
		target.depth = halfExtentsZ * 2;

		target.x = centerX - halfExtentsX;
		target.y = centerY - halfExtentsY;
		target.z = centerZ - halfExtentsZ;

		return target;
	}

	public transformSphere(sphere: Sphere, target: Sphere = null): Sphere {
		//TODO: use a better solution than this
		if (sphere == null)
			throw new ArgumentError('ArgumentError, sphere cannot be null');

		const box: Box = new Box(
			sphere.x - sphere.radius, // x
			sphere.y - sphere.radius, // y
			sphere.z - sphere.radius, // z
			sphere.radius * 2, // w
			sphere.radius * 2, // h
			sphere.radius * 2); // d

		this.transformBox(box, box);

		if (!target)
			target = new Sphere();

		target.x = box.x + box.width / 2;
		target.y = box.y + box.height / 2;
		target.z = box.z + box.depth / 2;

		target.radius = Math.max(box.width, box.height, box.depth);

		return target;
	}

	public transformVector(vector: Vector3D, target: Vector3D = null): Vector3D {
		if (vector == null)
			throw new ArgumentError('ArgumentError, vector cannot be null');

		const x: number = vector.x;
		const y: number = vector.y;
		const z: number = vector.z;
		const w: number = vector.w;

		if (!target)
			target = new Vector3D();

		const raw: Float32Array = this._rawData;
		const rawTarget: Float32Array = target._rawData;

		rawTarget[0] = x * raw[0] + y * raw[4] + z * raw[8] + w * raw[12];
		rawTarget[1] = x * raw[1] + y * raw[5] + z * raw[9] + w * raw[13];
		rawTarget[2] = x * raw[2] + y * raw[6] + z * raw[10] + w * raw[14];
		rawTarget[3] = x * raw[3] + y * raw[7] + z * raw[11] + w * raw[15];

		return target;
	}

	/**
	 * Uses the transformation matrix to transform a Vector of Numbers from one coordinate space to another.
	 */
	public transformVectors(vin: number[], vout: number[]): void {
		let i: number = 0;
		let x: number = 0, y: number = 0, z: number = 0;
		const raw: Float32Array = this._rawData;

		while (i + 3 <= vin.length) {
			x = vin[i];
			y = vin[i + 1];
			z = vin[i + 2];
			vout[i] = x * raw[0] + y * raw[4] + z * raw[8] + raw[12];
			vout[i + 1] = x * raw[1] + y * raw[5] + z * raw[9] + raw[13];
			vout[i + 2] = x * raw[2] + y * raw[6] + z * raw[10] + raw[14];
			i += 3;
		}
	}

	/**
	 * Converts the current Matrix3D object to a matrix where the rows and columns are swapped.
	 */
	public transpose(): void {
		const raw: Float32Array = this._rawData;
		const rawTemp: Float32Array = Matrix3D._tempMatrix._rawData;

		this.copyRawDataTo(rawTemp, 0, true);

		raw[1] = rawTemp[1];
		raw[2] = rawTemp[2];
		raw[3] = rawTemp[3];
		raw[4] = rawTemp[4];
		raw[6] = rawTemp[6];
		raw[7] = rawTemp[7];
		raw[8] = rawTemp[8];
		raw[9] = rawTemp[9];
		raw[11] = rawTemp[11];
		raw[12] = rawTemp[12];
		raw[13] = rawTemp[13];
		raw[14] = rawTemp[14];

		this._positionDirty = true;
	}

	public invalidatePosition(): void {
		this._positionDirty = true;
	}

	public toFixed(decimalPlace: number): string {
		const magnitude: number = Math.pow(10, decimalPlace);
		return 'matrix3d(' + Math.round(this._rawData[0] * magnitude) / magnitude +
				',' + Math.round(this._rawData[1] * magnitude) / magnitude +
				',' + Math.round(this._rawData[2] * magnitude) / magnitude +
				',' + Math.round(this._rawData[3] * magnitude) / magnitude +
				',' + Math.round(this._rawData[4] * magnitude) / magnitude +
				',' + Math.round(this._rawData[5] * magnitude) / magnitude +
				',' + Math.round(this._rawData[6] * magnitude) / magnitude +
				',' + Math.round(this._rawData[7] * magnitude) / magnitude +
				',' + Math.round(this._rawData[8] * magnitude) / magnitude +
				',' + Math.round(this._rawData[9] * magnitude) / magnitude +
				',' + Math.round(this._rawData[10] * magnitude) / magnitude +
				',' + Math.round(this._rawData[11] * magnitude) / magnitude +
				',' + Math.round(this._rawData[12] * magnitude) / magnitude +
				',' + Math.round(this._rawData[13] * magnitude) / magnitude +
				',' + Math.round(this._rawData[14] * magnitude) / magnitude +
				',' + Math.round(this._rawData[15] * magnitude) / magnitude + ')';
	}

	public toString(): string {
		return 'matrix3d(' + Math.round(this._rawData[0] * 1000) / 1000 +
				',' + Math.round(this._rawData[1] * 1000) / 1000 +
				',' + Math.round(this._rawData[2] * 1000) / 1000 +
				',' + Math.round(this._rawData[3] * 1000) / 1000 +
				',' + Math.round(this._rawData[4] * 1000) / 1000 +
				',' + Math.round(this._rawData[5] * 1000) / 1000 +
				',' + Math.round(this._rawData[6] * 1000) / 1000 +
				',' + Math.round(this._rawData[7] * 1000) / 1000 +
				',' + Math.round(this._rawData[8] * 1000) / 1000 +
				',' + Math.round(this._rawData[9] * 1000) / 1000 +
				',' + Math.round(this._rawData[10] * 1000) / 1000 +
				',' + Math.round(this._rawData[11] * 1000) / 1000 +
				',' + Math.round(this._rawData[12] * 1000) / 1000 +
				',' + Math.round(this._rawData[13] * 1000) / 1000 +
				',' + Math.round(this._rawData[14] * 1000) / 1000 +
				',' + Math.round(this._rawData[15] * 1000) / 1000 + ')';
	}
}
