import {Point}					from "../geom/Point";
import {Vector3D}					from "../geom/Vector3D";
import {ArgumentError}			from "../errors/ArgumentError";

/**
 * The Matrix export class represents a transformation matrix that determines how to
 * map points from one coordinate space to another. You can perform various
 * graphical transformations on a display object by setting the properties of
 * a Matrix object, applying that Matrix object to the <code>matrix</code>
 * property of a Transform object, and then applying that Transform object as
 * the <code>transform</code> property of the display object. These
 * transformation functions include translation(<i>x</i> and <i>y</i>
 * repositioning), rotation, scaling, and skewing.
 *
 * <p>Together these types of transformations are known as <i>affine
 * transformations</i>. Affine transformations preserve the straightness of
 * lines while transforming, so that parallel lines stay parallel.</p>
 *
 * <p>To apply a transformation matrix to a display object, you create a
 * Transform object, set its <code>matrix</code> property to the
 * transformation matrix, and then set the <code>transform</code> property of
 * the display object to the Transform object. Matrix objects are also used as
 * parameters of some methods, such as the following:</p>
 *
 * <ul>
 *   <li>The <code>draw()</code> method of a BitmapData object</li>
 *   <li>The <code>beginBitmapFill()</code> method,
 * <code>beginGradientFill()</code> method, or
 * <code>lineGradientStyle()</code> method of a Graphics object</li>
 * </ul>
 *
 * <p>A transformation matrix object is a 3 x 3 matrix with the following
 * contents:</p>
 *
 * <p>In traditional transformation matrixes, the <code>u</code>,
 * <code>v</code>, and <code>w</code> properties provide extra capabilities.
 * The Matrix export class can only operate in two-dimensional space, so it always
 * assumes that the property values <code>u</code> and <code>v</code> are 0.0,
 * and that the property value <code>w</code> is 1.0. The effective values of
 * the matrix are as follows:</p>
 *
 * <p>You can get and set the values of all six of the other properties in a
 * Matrix object: <code>a</code>, <code>b</code>, <code>c</code>,
 * <code>d</code>, <code>tx</code>, and <code>ty</code>.</p>
 *
 * <p>The Matrix export class supports the four major types of transformations:
 * translation, scaling, rotation, and skewing. You can set three of these
 * transformations by using specialized methods, as described in the following
 * table: </p>
 *
 * <p>Each transformation function alters the current matrix properties so
 * that you can effectively combine multiple transformations. To do this, you
 * call more than one transformation function before applying the matrix to
 * its display object target(by using the <code>transform</code> property of
 * that display object).</p>
 *
 * <p>Use the <code>new Matrix()</code> constructor to create a Matrix object
 * before you can call the methods of the Matrix object.</p>
 */
export class Matrix
{
	public rawData:Float32Array = new Float32Array(6);

	/**
	 * The value that affects the positioning of pixels along the <i>x</i> axis
	 * when scaling or rotating an image.
	 */
	public get a():number
	{
		return this.rawData[0];
	}

	public set a(value:number)
	{
		this.rawData[0] = value;
	}

	/**
	 * The value that affects the positioning of pixels along the <i>y</i> axis
	 * when rotating or skewing an image.
	 */
	public get b():number
	{
		return this.rawData[1];
	}

	public set b(value:number)
	{
		this.rawData[1] = value;
	}

	/**
	 * The value that affects the positioning of pixels along the <i>x</i> axis
	 * when rotating or skewing an image.
	 */
	public get c():number
	{
		return this.rawData[2];
	}

	public set c(value:number)
	{
		this.rawData[2] = value;
	}

	/**
	 * The value that affects the positioning of pixels along the <i>y</i> axis
	 * when scaling or rotating an image.
	 */
	public get d():number
	{
		return this.rawData[3];
	}

	public set d(value:number)
	{
		this.rawData[3] = value;
	}

	/**
	 * The distance by which to translate each point along the <i>x</i> axis.
	 */
	public get tx():number
	{
		return this.rawData[4];
	}

	public set tx(value:number)
	{
		this.rawData[4] = value;
	}

	/**
	 * The distance by which to translate each point along the <i>y</i> axis.
	 */
	public get ty():number
	{
		return this.rawData[5];
	}

	public set ty(value:number)
	{
		this.rawData[5] = value;
	}

	/**
	 * Creates a new Matrix object with the specified parameters. In matrix
	 * notation, the properties are organized like this:
	 *
	 * <p>If you do not provide any parameters to the <code>new Matrix()</code>
	 * constructor, it creates an <i>identity matrix</i> with the following
	 * values:</p>
	 *
	 * <p>In matrix notation, the identity matrix looks like this:</p>
	 *
	 * @param a  The value that affects the positioning of pixels along the
	 *           <i>x</i> axis when scaling or rotating an image.
	 * @param b  The value that affects the positioning of pixels along the
	 *           <i>y</i> axis when rotating or skewing an image.
	 * @param c  The value that affects the positioning of pixels along the
	 *           <i>x</i> axis when rotating or skewing an image.
	 * @param d  The value that affects the positioning of pixels along the
	 *           <i>y</i> axis when scaling or rotating an image..
	 * @param tx The distance by which to translate each point along the <i>x</i>
	 *           axis.
	 * @param ty The distance by which to translate each point along the <i>y</i>
	 *           axis.
	 */
	constructor(rawData?:Float32Array);
	constructor(a?:number, b?:number, c?:number, d?:number, tx?:number, ty?:number);
	constructor(a:number | Float32Array = 1, b:number = 0, c:number = 0, d:number = 1, tx:number = 0, ty:number = 0)
	{
		if (a instanceof Float32Array) {
			this.copyRawDataFrom(a);
		} else {
			var raw:Float32Array = this.rawData;

			raw[0] = Number(a);
			raw[1] = b;
			raw[2] = c;
			raw[3] = d;
			raw[4] = tx;
			raw[5] = ty;
		}
	}


	public copyRawDataFrom(vector:Float32Array, index:number = 0):void
	{
		var raw:Float32Array = this.rawData;

		raw[0] = vector[0];
		raw[1] = vector[1];
		raw[2] = vector[2];
		raw[3] = vector[3];
		raw[4] = vector[4];
		raw[5] = vector[5];
	}

	/**
	 * Returns a new Matrix object that is a clone of this matrix, with an exact
	 * copy of the contained object.
	 *
	 * @return A Matrix object.
	 */
	public clone():Matrix
	{
		var raw:Float32Array = this.rawData;

		return new Matrix(raw[0], raw[1], raw[2], raw[3], raw[4], raw[5]);
	}

	/**
	 * Concatenates a matrix with the current matrix, effectively combining the
	 * geometric effects of the two. In mathematical terms, concatenating two
	 * matrixes is the same as combining them using matrix multiplication.
	 *
	 * <p>For example, if matrix <code>m1</code> scales an object by a factor of
	 * four, and matrix <code>m2</code> rotates an object by 1.5707963267949
	 * radians(<code>Math.PI/2</code>), then <code>m1.concat(m2)</code>
	 * transforms <code>m1</code> into a matrix that scales an object by a factor
	 * of four and rotates the object by <code>Math.PI/2</code> radians. </p>
	 *
	 * <p>This method replaces the source matrix with the concatenated matrix. If
	 * you want to concatenate two matrixes without altering either of the two
	 * source matrixes, first copy the source matrix by using the
	 * <code>clone()</code> method, as shown in the Class Examples section.</p>
	 *
	 * @param matrix The matrix to be concatenated to the source matrix.
	 */
	public concat(matrix:Matrix):void
	{
		var m:Float32Array = this.rawData;
		var n:Float32Array = matrix.rawData;
		var a =  m[0] * n[0];
		var b =  0.0;
		var c =  0.0;
		var d =  m[3] * n[3];
		var tx = m[4] * n[0] + n[4];
		var ty = m[5] * n[3] + n[5];
	
		if (m[1] !== 0.0 || m[2] !== 0.0 || n[1] !== 0.0 || n[2] !== 0.0) {
		  a  += m[1] * n[2];
		  d  += m[2] * n[1];
		  b  += m[0] * n[1] + m[1] * n[3];
		  c  += m[2] * n[0] + m[3] * n[2];
		  tx += m[5] * n[2];
		  ty += m[4] * n[1];
		}
	
		m[0] = a;
		m[1] = b;
		m[2] = c;
		m[3] = d;
		m[4] = tx;
		m[5] = ty;
	}

	/**
	 * Copies a Vector3D object into specific column of the calling Matrix3D
	 * object.
	 *
	 * @param column   The column from which to copy the data from.
	 * @param vector3D The Vector3D object from which to copy the data.
	 */
	public copyColumnFrom(column:number, vector3D:Vector3D):void
	{
		var raw:Float32Array = this.rawData;
		var rawVector3D:Float32Array = vector3D._rawData;

		if (column > 2) {
			throw "Column " + column + " out of bounds (2)";
		} else if (column == 0) {
			raw[0] = rawVector3D[0];
			raw[1] = rawVector3D[1];
		} else if (column == 1) {
			raw[2] = rawVector3D[0];
			raw[3] = rawVector3D[1];
		} else {
			raw[4] = rawVector3D[0];
			raw[5] = rawVector3D[1];
		}
	}

	/**
	 * Copies specific column of the calling Matrix object into the Vector3D
	 * object. The w element of the Vector3D object will not be changed.
	 *
	 * @param column   The column from which to copy the data from.
	 * @param vector3D The Vector3D object from which to copy the data.
	 */
	public copyColumnTo(column:number, vector3D:Vector3D):void
	{
		var raw:Float32Array = this.rawData;
		var rawVector3D:Float32Array = vector3D._rawData;

		if (column > 2) {
			throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 2]");
		} else if (column == 0) {
			rawVector3D[0] = raw[0];
			rawVector3D[1] = raw[1];
			rawVector3D[2] = 0;
		} else if (column == 1) {
			rawVector3D[0] = raw[2];
			rawVector3D[1] = raw[3];
			rawVector3D[2] = 0;
		} else {
			rawVector3D[0] = raw[4];
			rawVector3D[1] = raw[5];
			rawVector3D[2] = 1;
		}
	}

	/**
	 * Copies all of the matrix data from the source Point object into the
	 * calling Matrix object.
	 *
	 * @param sourceMatrix The Matrix object from which to copy the data.
	 */
	public copyFrom(sourceMatrix:Matrix):void
	{
		var raw:Float32Array = this.rawData;
		var sourceRaw:Float32Array = sourceMatrix.rawData;

		raw[0] = sourceRaw[0];
		raw[1] = sourceRaw[1];
		raw[2] = sourceRaw[2];
		raw[3] = sourceRaw[3];
		raw[4] = sourceRaw[4];
		raw[5] = sourceRaw[5];
	}

	/**
	 * Copies a Vector3D object into specific row of the calling Matrix object.
	 *
	 * @param row      The row from which to copy the data from.
	 * @param vector3D The Vector3D object from which to copy the data.
	 */
	public copyRowFrom(row:number, vector3D:Vector3D):void
	{
		var raw:Float32Array = this.rawData;
		var rawVector3D:Float32Array = vector3D._rawData;

		if (row > 2) {
			throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 2]");
		} else if (row == 0) {
			raw[0] = rawVector3D[0];
			raw[2] = rawVector3D[1];
			raw[4] = rawVector3D[2];
		} else {
			raw[1] = rawVector3D[0];
			raw[3] = rawVector3D[1];
			raw[5] = rawVector3D[2];
		}
	}

	/**
	 * Copies specific row of the calling Matrix object into the Vector3D object.
	 * The w element of the Vector3D object will not be changed.
	 *
	 * @param row      The row from which to copy the data from.
	 * @param vector3D The Vector3D object from which to copy the data.
	 */
	public copyRowTo(row:number, vector3D:Vector3D):void
	{
		var raw:Float32Array = this.rawData;
		var rawVector3D:Float32Array = vector3D._rawData;

		if (row > 2) {
			throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 2]");
		} else if (row == 0) {
			rawVector3D[0] = raw[0];
			rawVector3D[1] = raw[2];
			rawVector3D[2] = raw[4];
		} else if (row == 1) {
			rawVector3D[0] = raw[1];
			rawVector3D[1] = raw[3];
			rawVector3D[2] = raw[5];
		} else {
			rawVector3D[0] = 0;
			rawVector3D[1] = 0;
			rawVector3D[2] = 1;
		}
	}

	/**
	 * Includes parameters for scaling, rotation, and translation. When applied
	 * to a matrix it sets the matrix's values based on those parameters.
	 *
	 * <p>Using the <code>createBox()</code> method lets you obtain the same
	 * matrix as you would if you applied the <code>identity()</code>,
	 * <code>rotate()</code>, <code>scale()</code>, and <code>translate()</code>
	 * methods in succession. For example, <code>mat1.createBox(2,2,Math.PI/4,
	 * 100, 100)</code> has the same effect as the following:</p>
	 *
	 * @param scaleX   The factor by which to scale horizontally.
	 * @param scaleY   The factor by which scale vertically.
	 * @param rotation The amount to rotate, in radians.
	 * @param tx       The number of pixels to translate(move) to the right
	 *                 along the <i>x</i> axis.
	 * @param ty       The number of pixels to translate(move) down along the
	 *                 <i>y</i> axis.
	 */
	public createBox(scaleX:number, scaleY:number, rotation:number = 0, tx:number = 0, ty:number = 0):void
	{
		var raw:Float32Array = this.rawData;

		if (rotation !== 0) {
			var u = Math.cos(rotation);
			var v = Math.sin(rotation);
			raw[0] =  u * scaleX;
			raw[1] =  v * scaleY;
			raw[2] = -v * scaleX;
			raw[3] =  u * scaleY;
		} else {
			raw[0] = scaleX;
			raw[1] = 0;
			raw[2] = 0;
			raw[3] = scaleY;
		}

		raw[4] = tx;
		raw[5] = ty;
	}

	/**
	 * Creates the specific style of matrix expected by the
	 * <code>beginGradientFill()</code> and <code>lineGradientStyle()</code>
	 * methods of the Graphics class. Width and height are scaled to a
	 * <code>scaleX</code>/<code>scaleY</code> pair and the
	 * <code>tx</code>/<code>ty</code> values are offset by half the width and
	 * height.
	 *
	 * <p>For example, consider a gradient with the following
	 * characteristics:</p>
	 *
	 * <ul>
	 *   <li><code>GradientType.LINEAR</code></li>
	 *   <li>Two colors, green and blue, with the ratios array set to <code>[0,
	 * 255]</code></li>
	 *   <li><code>SpreadMethod.PAD</code></li>
	 *   <li><code>InterpolationMethod.LINEAR_RGB</code></li>
	 * </ul>
	 *
	 * <p>The following illustrations show gradients in which the matrix was
	 * defined using the <code>createGradientBox()</code> method with different
	 * parameter settings:</p>
	 *
	 * @param width    The width of the gradient box.
	 * @param height   The height of the gradient box.
	 * @param rotation The amount to rotate, in radians.
	 * @param tx       The distance, in pixels, to translate to the right along
	 *                 the <i>x</i> axis. This value is offset by half of the
	 *                 <code>width</code> parameter.
	 * @param ty       The distance, in pixels, to translate down along the
	 *                 <i>y</i> axis. This value is offset by half of the
	 *                 <code>height</code> parameter.
	 */
	public createGradientBox(width:number, height:number, rotation:number = 0, tx:number = 0, ty:number = 0):void
	{
		this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
	}

	/**
	 * Given a point in the pretransform coordinate space, returns the
	 * coordinates of that point after the transformation occurs. Unlike the
	 * standard transformation applied using the <code>transformPoint()</code>
	 * method, the <code>deltaTransformPoint()</code> method's transformation
	 * does not consider the translation parameters <code>tx</code> and
	 * <code>ty</code>.
	 *
	 * @param point The point for which you want to get the result of the matrix
	 *              transformation.
	 * @return The point resulting from applying the matrix transformation.
	 */
	public deltaTransformPoint(point:Point):Point
	{
		var raw:Float32Array = this.rawData;

		return new Point(point.x*raw[0] + point.y*raw[2], point.x*raw[1] + point.y*raw[3]);
	}

	/**
	 * Sets each matrix property to a value that causes a null transformation. An
	 * object transformed by applying an identity matrix will be identical to the
	 * original.
	 *
	 * <p>After calling the <code>identity()</code> method, the resulting matrix
	 * has the following properties: <code>a</code>=1, <code>b</code>=0,
	 * <code>c</code>=0, <code>d</code>=1, <code>tx</code>=0,
	 * <code>ty</code>=0.</p>
	 *
	 * <p>In matrix notation, the identity matrix looks like this:</p>
	 *
	 */
	public identity():void
	{
		var raw:Float32Array = this.rawData;
		raw[0] = 1;
		raw[1] = 0;
		raw[2] = 0;
		raw[3] = 1;
		raw[4] = 0;
		raw[5] = 0;
	}

	/**
	 * Performs the opposite transformation of the original matrix. You can apply
	 * an inverted matrix to an object to undo the transformation performed when
	 * applying the original matrix.
	 */
	public invert():void
	{
		var raw = this.rawData;
		var b  = raw[1];
		var c  = raw[2];
		var tx = raw[4];
		var ty = raw[5];
		if (b === 0 && c === 0) {
			var a = raw[0] = 1/raw[0];
			var d = raw[3] = 1/raw[3];
			raw[1] = raw[2] = 0;
			raw[4] = -a*tx;
			raw[5] = -d*ty;

			return;
		}

		var a = raw[0];
		var d = raw[3];
		var determinant = a*d - b*c;
		if (determinant === 0) {
			this.identity();
			return;
		}
		/**
		 * Multiplying by reciprocal of the |determinant| is only accurate if the reciprocal is
		 * representable without loss of precision. This is usually only the case for powers of
		 * two: 1/2, 1/4 ...
		 */
		determinant = 1/determinant;
		var k = 0;
		k = raw[0] =  d*determinant;
		b = raw[1] = -b*determinant;
		c = raw[2] = -c*determinant;
		d = raw[3] =  a*determinant;
		raw[4] = -(k*tx + c*ty);
		raw[5] = -(b*tx + d*ty);
	}


	/**
	 * Returns a new Matrix object that is a clone of this matrix, with an exact
	 * copy of the contained object.
	 *
	 * @param matrix The matrix for which you want to get the result of the matrix
	 *               transformation.
	 * @return A Matrix object.
	 */
	public multiply(matrix:Matrix):Matrix
	{
		var result = new Matrix();

		result.a = this.a*matrix.a + this.b*matrix.c;
		result.b = this.a*matrix.b + this.b*matrix.d;
		result.c = this.c*matrix.a + this.d*matrix.c;
		result.d = this.c*matrix.b + this.d*matrix.d;

		result.tx = this.tx*matrix.a + this.ty*matrix.c + matrix.tx;
		result.ty = this.tx*matrix.b + this.ty*matrix.d + matrix.ty;

		return result;
	}

	/**
	 * Applies a rotation transformation to the Matrix object.
	 *
	 * <p>The <code>rotate()</code> method alters the <code>a</code>,
	 * <code>b</code>, <code>c</code>, and <code>d</code> properties of the
	 * Matrix object. In matrix notation, this is the same as concatenating the
	 * current matrix with the following:</p>
	 *
	 * @param angle The rotation angle in radians.
	 */
	public rotate(angle:number):void
	{
		if (angle !== 0) {
			var raw:Float32Array = this.rawData;
			var u = Math.cos(angle);
			var v = Math.sin(angle);
			var ta = raw[0];
			var tb = raw[1];
			var tc = raw[2];
			var td = raw[3];
			var ttx = raw[4];
			var tty = raw[5];

			raw[0] = ta  * u - tb  * v;
			raw[1] = ta  * v + tb  * u;
			raw[2] = tc  * u - td  * v;
			raw[3] = tc  * v + td  * u;
			raw[4] = ttx * u - tty * v;
			raw[5] = ttx * v + tty * u;
		}
	}

	/**
	 * Applies a scaling transformation to the matrix. The <i>x</i> axis is
	 * multiplied by <code>sx</code>, and the <i>y</i> axis it is multiplied by
	 * <code>sy</code>.
	 *
	 * <p>The <code>scale()</code> method alters the <code>a</code> and
	 * <code>d</code> properties of the Matrix object. In matrix notation, this
	 * is the same as concatenating the current matrix with the following
	 * matrix:</p>
	 *
	 * @param sx A multiplier used to scale the object along the <i>x</i> axis.
	 * @param sy A multiplier used to scale the object along the <i>y</i> axis.
	 */
	public scale(sx:number, sy:number):void
	{
		var raw:Float32Array = this.rawData;

		if (sx !== 1) {
			raw[0] *= sx;
			raw[1] *= sx;
			raw[4] *= sx;
		}
		if (sy !== 1) {
			raw[2] *= sy;
			raw[3] *= sy;
			raw[5] *= sy;
		}
	}

	/**
	 * Sets the members of Matrix to the specified values.
	 *
	 * @param a  The value that affects the positioning of pixels along the
	 *           <i>x</i> axis when scaling or rotating an image.
	 * @param b  The value that affects the positioning of pixels along the
	 *           <i>y</i> axis when rotating or skewing an image.
	 * @param c  The value that affects the positioning of pixels along the
	 *           <i>x</i> axis when rotating or skewing an image.
	 * @param d  The value that affects the positioning of pixels along the
	 *           <i>y</i> axis when scaling or rotating an image..
	 * @param tx The distance by which to translate each point along the <i>x</i>
	 *           axis.
	 * @param ty The distance by which to translate each point along the <i>y</i>
	 *           axis.
	 */
	public setTo(a:number, b:number, c:number, d:number, tx:number, ty:number):void
	{
		var raw:Float32Array = this.rawData;

		raw[0] = a;
		raw[2] = b;
		raw[1] = c;
		raw[3] = d;
		raw[4] = tx;
		raw[5] = ty;
	}

	/**
	 * Returns a text value listing the properties of the Matrix object.
	 *
	 * @return A string containing the values of the properties of the Matrix
	 *         object: <code>a</code>, <code>b</code>, <code>c</code>,
	 *         <code>d</code>, <code>tx</code>, and <code>ty</code>.
	 */
	public toString():string
	{
		return "[Matrix] (a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
	}

	/**
	 * Returns the result of applying the geometric transformation represented by
	 * the Matrix object to the specified point.
	 *
	 * @param point The point for which you want to get the result of the Matrix
	 *              transformation.
	 * @return The point resulting from applying the Matrix transformation.
	 */
	public transformPoint(point:Point):Point
	{
		var raw:Float32Array = this.rawData;
		return new Point(point.x*raw[0] + point.y*raw[2] + raw[4], point.x*raw[1] + point.y*raw[3] + raw[5]);
	}

	/**
	 * Translates the matrix along the <i>x</i> and <i>y</i> axes, as specified
	 * by the <code>dx</code> and <code>dy</code> parameters.
	 *
	 * @param dx The amount of movement along the <i>x</i> axis to the right, in
	 *           pixels.
	 * @param dy The amount of movement down along the <i>y</i> axis, in pixels.
	 */
	public translate(dx:number, dy:number):void
	{
		this.rawData[4] += dx;
		this.rawData[5] += dy;
	}
}