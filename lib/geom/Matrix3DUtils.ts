import {Quaternion}				from "../geom/Quaternion";
import {Matrix3D}					from "../geom/Matrix3D";
import {Plane3D}					from "../geom/Plane3D";
import {Vector3D}					from "../geom/Vector3D";


/**
 * away.geom.Matrix3DUtils provides additional Matrix3D functions.
 */
export class Matrix3DUtils
{
	/**
	 * A reference to a Vector to be used as a temporary raw data container, to prevent object creation.
	 */
	public static RAW_DATA_CONTAINER:Float32Array = new Float32Array(16);
	//public static RAW_DATA_CONTAINER:number[] = new Array<number>(16);

	public static CALCULATION_MATRIX:Matrix3D = new Matrix3D();

	/**
	 * Fills the 3d matrix object with values representing the transformation made by the given quaternion.
	 *
	 * @param    quarternion    The quarterion object to convert.
	 */
	public static quaternion2matrix(quarternion:Quaternion, m:Matrix3D = null):Matrix3D
	{
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

		var raw:Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
		raw[0] = 1 - 2*(yy + zz);
		raw[1] = 2*(xy + zw);
		raw[2] = 2*(xz - yw);
		raw[4] = 2*(xy - zw);
		raw[5] = 1 - 2*(xx + zz);
		raw[6] = 2*(yz + xw);
		raw[8] = 2*(xz + yw);
		raw[9] = 2*(yz - xw);
		raw[10] = 1 - 2*(xx + yy);
		raw[3] = raw[7] = raw[11] = raw[12] = raw[13] = raw[14] = 0;
		raw[15] = 1;

		if (m) {
			m.copyRawDataFrom(raw);
			return m;
		} else
			return new Matrix3D(raw);
	}

	/**
	 * Returns a normalised <code>Vector3D</code> object representing the forward vector of the given matrix.
	 * @param    m        The Matrix3D object to use to get the forward vector
	 * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
	 * @return            The forward vector
	 */
	public static getForward(m:Matrix3D, v:Vector3D = null):Vector3D
	{
		if (v === null)
			v = new Vector3D(0.0, 0.0, 0.0);

		m.copyColumnTo(2, v);
		v.normalize();

		return v;
	}

	/**
	 * Returns a normalised <code>Vector3D</code> object representing the up vector of the given matrix.
	 * @param    m        The Matrix3D object to use to get the up vector
	 * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
	 * @return            The up vector
	 */
	public static getUp(m:Matrix3D, v:Vector3D = null):Vector3D
	{
		if (v === null)
			v = new Vector3D(0.0, 0.0, 0.0);

		m.copyColumnTo(1, v);
		v.normalize();

		return v;
	}

	/**
	 * Returns a normalised <code>Vector3D</code> object representing the right vector of the given matrix.
	 * @param    m        The Matrix3D object to use to get the right vector
	 * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
	 * @return            The right vector
	 */
	public static getRight(m:Matrix3D, v:Vector3D = null):Vector3D
	{
		//v ||= new Vector3D(0.0, 0.0, 0.0);
		if (v === null) {

			v = new Vector3D(0.0, 0.0, 0.0);

		}

		m.copyColumnTo(0, v);
		v.normalize();

		return v;
	}

	/**
	 * Returns a boolean value representing whether there is any significant difference between the two given 3d matrices.
	 */
	public static compare(m1:Matrix3D, m2:Matrix3D):boolean
	{
		var r1:Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
		var r2:Float32Array = m2.rawData;
		m1.copyRawDataTo(r1);

		for (var i:number = 0; i < 16; ++i) {
			if (r1[i] != r2[i])
				return false;
		}

		return true;
	}

	public static lookAt(matrix:Matrix3D, pos:Vector3D, dir:Vector3D, up:Vector3D):void
	{
		var dirN:Vector3D;
		var upN:Vector3D;
		var lftN:Vector3D;
		var raw:Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;

		lftN = dir.crossProduct(up);
		lftN.normalize();

		upN = lftN.crossProduct(dir);
		upN.normalize();
		dirN = dir.clone();
		dirN.normalize();

		raw[0] = lftN.x;
		raw[1] = upN.x;
		raw[2] = -dirN.x;
		raw[3] = 0.0;

		raw[4] = lftN.y;
		raw[5] = upN.y;
		raw[6] = -dirN.y;
		raw[7] = 0.0;

		raw[8] = lftN.z;
		raw[9] = upN.z;
		raw[10] = -dirN.z;
		raw[11] = 0.0;

		raw[12] = -lftN.dotProduct(pos);
		raw[13] = -upN.dotProduct(pos);
		raw[14] = dirN.dotProduct(pos);
		raw[15] = 1.0;

		matrix.copyRawDataFrom(raw);
	}

	public static reflection(plane:Plane3D, target:Matrix3D = null):Matrix3D
	{
		if (target === null)
			target = new Matrix3D();

		var a:number = plane.a, b:number = plane.b, c:number = plane.c, d:number = plane.d;
		var rawData:Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
		var ab2:number = -2*a*b;
		var ac2:number = -2*a*c;
		var bc2:number = -2*b*c;
		// reflection matrix
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
		target.copyRawDataFrom(rawData);

		return target;
	}


	public static transformVector(matrix:Matrix3D, vector:Vector3D, result:Vector3D = null):Vector3D
	{
		if (!result)
			result = new Vector3D();

		var raw:Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
		matrix.copyRawDataTo(raw);
		var a:number = raw[0];
		var e:number = raw[1];
		var i:number = raw[2];
		var m:number = raw[3];
		var b:number = raw[4];
		var f:number = raw[5];
		var j:number = raw[6];
		var n:number = raw[7];
		var c:number = raw[8];
		var g:number = raw[9];
		var k:number = raw[10];
		var o:number = raw[11];
		var d:number = raw[12];
		var h:number = raw[13];
		var l:number = raw[14];
		var p:number = raw[15];

		var x:number = vector.x;
		var y:number = vector.y;
		var z:number = vector.z;
		result.x = a * x + b * y + c * z + d;
		result.y = e * x + f * y + g * z + h;
		result.z = i * x + j * y + k * z + l;
		result.w = m * x + n * y + o * z + p;
		return result;
	}

	public static deltaTransformVector(matrix:Matrix3D, vector:Vector3D, result:Vector3D = null):Vector3D
	{
		if (!result)
			result = new Vector3D();

		var raw:Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
		matrix.copyRawDataTo(raw);
		var a:number = raw[0];
		var e:number = raw[1];
		var i:number = raw[2];
		var m:number = raw[3];
		var b:number = raw[4];
		var f:number = raw[5];
		var j:number = raw[6];
		var n:number = raw[7];
		var c:number = raw[8];
		var g:number = raw[9];
		var k:number = raw[10];
		var o:number = raw[11];
		var x:number = vector.x;
		var y:number = vector.y;
		var z:number = vector.z;
		result.x = a * x + b * y + c * z;
		result.y = e * x + f * y + g * z;
		result.z = i * x + j * y + k * z;
		result.w = m * x + n * y + o * z;
		return result;
	}

	public static getTranslation(transform:Matrix3D, result:Vector3D = null):Vector3D
	{
		if(!result)
			result = new Vector3D();

		transform.copyColumnTo(3, result);
		return result;
	}

	public static deltaTransformVectors(matrix:Matrix3D, vin:Array<number>, vout:Array<number>):void
	{
		var raw:Float32Array = Matrix3DUtils.RAW_DATA_CONTAINER;
		matrix.copyRawDataTo(raw);
		var a:number = raw[0];
		var e:number = raw[1];
		var i:number = raw[2];
		var m:number = raw[3];
		var b:number = raw[4];
		var f:number = raw[5];
		var j:number = raw[6];
		var n:number = raw[7];
		var c:number = raw[8];
		var g:number = raw[9];
		var k:number = raw[10];
		var o:number = raw[11];
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
}