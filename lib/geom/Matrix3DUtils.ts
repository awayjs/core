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
	public static quaternion2matrix(quarternion:Quaternion, target:Matrix3D = null):Matrix3D
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

		if (!target)
			target = new Matrix3D();
		
		var rawData:Float32Array = target._rawData;
		rawData[0] = 1 - 2*(yy + zz);
		rawData[1] = 2*(xy + zw);
		rawData[2] = 2*(xz - yw);
		rawData[4] = 2*(xy - zw);
		rawData[5] = 1 - 2*(xx + zz);
		rawData[6] = 2*(yz + xw);
		rawData[8] = 2*(xz + yw);
		rawData[9] = 2*(yz - xw);
		rawData[10] = 1 - 2*(xx + yy);
		rawData[3] = rawData[7] = rawData[11] = rawData[12] = rawData[13] = rawData[14] = 0;
		rawData[15] = 1;

		target.invalidatePosition();
		
		return target;
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
		var r2:Float32Array = m2._rawData;
		m1.copyRawDataTo(r1);

		for (var i:number = 0; i < 16; ++i)
			if (r1[i] != r2[i])
				return false;

		return true;
	}

	public static lookAt(matrix:Matrix3D, pos:Vector3D, dir:Vector3D, up:Vector3D):void
	{
		var dirN:Vector3D;
		var upN:Vector3D;
		var lftN:Vector3D;
		var rawData:Float32Array = matrix._rawData;

		lftN = dir.crossProduct(up);
		lftN.normalize();

		upN = lftN.crossProduct(dir);
		upN.normalize();
		dirN = dir.clone();
		dirN.normalize();

		rawData[0] = lftN.x;
		rawData[1] = upN.x;
		rawData[2] = -dirN.x;
		rawData[3] = 0.0;

		rawData[4] = lftN.y;
		rawData[5] = upN.y;
		rawData[6] = -dirN.y;
		rawData[7] = 0.0;

		rawData[8] = lftN.z;
		rawData[9] = upN.z;
		rawData[10] = -dirN.z;
		rawData[11] = 0.0;

		rawData[12] = -lftN.dotProduct(pos);
		rawData[13] = -upN.dotProduct(pos);
		rawData[14] = dirN.dotProduct(pos);
		rawData[15] = 1.0;

		matrix.invalidatePosition();
	}

	public static reflection(plane:Plane3D, target:Matrix3D = null):Matrix3D
	{
		if (target === null)
			target = new Matrix3D();

		var a:number = plane.a, b:number = plane.b, c:number = plane.c, d:number = plane.d;
		var ab2:number = -2*a*b;
		var ac2:number = -2*a*c;
		var bc2:number = -2*b*c;
		
		// reflection matrix
		var rawData:Float32Array = target._rawData;
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
		
		target.invalidatePosition();

		return target;
	}


	public static transformVector(matrix:Matrix3D, vector:Vector3D, target:Vector3D = null):Vector3D
	{
		if (!target)
			target = new Vector3D();

		var rawData:Float32Array = matrix._rawData;
		
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
		var d:number = rawData[12];
		var h:number = rawData[13];
		var l:number = rawData[14];
		var p:number = rawData[15];

		var x:number = vector.x;
		var y:number = vector.y;
		var z:number = vector.z;
		target.x = a * x + b * y + c * z + d;
		target.y = e * x + f * y + g * z + h;
		target.z = i * x + j * y + k * z + l;
		target.w = m * x + n * y + o * z + p;
		
		return target;
	}

	public static deltaTransformVector(matrix:Matrix3D, vector:Vector3D, target:Vector3D = null):Vector3D
	{
		if (!target)
			target = new Vector3D();

		var rawData:Float32Array = matrix._rawData;
		
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
		
		var x:number = vector.x;
		var y:number = vector.y;
		var z:number = vector.z;
		
		target.x = a * x + b * y + c * z;
		target.y = e * x + f * y + g * z;
		target.z = i * x + j * y + k * z;
		target.w = m * x + n * y + o * z;
		
		return target;
	}

	public static getTranslation(transform:Matrix3D, target:Vector3D = null):Vector3D
	{
		if(!target)
			target = new Vector3D();

		transform.copyColumnTo(3, target);
		
		return target;
	}

	public static deltaTransformVectors(matrix:Matrix3D, vin:Array<number>, vout:Array<number>):void
	{
		var rawData:Float32Array = matrix._rawData;
		
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
}