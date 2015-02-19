var Point = require("awayjs-core/lib/geom/Point");
var ArgumentError = require("awayjs-core/lib/errors/ArgumentError");
/**
 * The Matrix class represents a transformation matrix that determines how to
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
 * The Matrix class can only operate in two-dimensional space, so it always
 * assumes that the property values <code>u</code> and <code>v</code> are 0.0,
 * and that the property value <code>w</code> is 1.0. The effective values of
 * the matrix are as follows:</p>
 *
 * <p>You can get and set the values of all six of the other properties in a
 * Matrix object: <code>a</code>, <code>b</code>, <code>c</code>,
 * <code>d</code>, <code>tx</code>, and <code>ty</code>.</p>
 *
 * <p>The Matrix class supports the four major types of transformations:
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
var Matrix = (function () {
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
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
    /**
     * Returns a new Matrix object that is a clone of this matrix, with an exact
     * copy of the contained object.
     *
     * @return A Matrix object.
     */
    Matrix.prototype.clone = function () {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    };
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
    Matrix.prototype.concat = function (matrix) {
        var a1 = this.a * matrix.a + this.b * matrix.c;
        this.b = this.a * matrix.b + this.b * matrix.d;
        this.a = a1;
        var c1 = this.c * matrix.a + this.d * matrix.c;
        this.d = this.c * matrix.b + this.d * matrix.d;
        this.c = c1;
        var tx1 = this.tx * matrix.a + this.ty * matrix.c + matrix.tx;
        this.ty = this.tx * matrix.b + this.ty * matrix.d + matrix.ty;
        this.tx = tx1;
    };
    /**
     * Copies a Vector3D object into specific column of the calling Matrix3D
     * object.
     *
     * @param column   The column from which to copy the data from.
     * @param vector3D The Vector3D object from which to copy the data.
     */
    Matrix.prototype.copyColumnFrom = function (column, vector3D) {
        if (column > 2) {
            throw "Column " + column + " out of bounds (2)";
        }
        else if (column == 0) {
            this.a = vector3D.x;
            this.c = vector3D.y;
        }
        else if (column == 1) {
            this.b = vector3D.x;
            this.d = vector3D.y;
        }
        else {
            this.tx = vector3D.x;
            this.ty = vector3D.y;
        }
    };
    /**
     * Copies specific column of the calling Matrix object into the Vector3D
     * object. The w element of the Vector3D object will not be changed.
     *
     * @param column   The column from which to copy the data from.
     * @param vector3D The Vector3D object from which to copy the data.
     */
    Matrix.prototype.copyColumnTo = function (column, vector3D) {
        if (column > 2) {
            throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 2]");
        }
        else if (column == 0) {
            vector3D.x = this.a;
            vector3D.y = this.c;
            vector3D.z = 0;
        }
        else if (column == 1) {
            vector3D.x = this.b;
            vector3D.y = this.d;
            vector3D.z = 0;
        }
        else {
            vector3D.x = this.tx;
            vector3D.y = this.ty;
            vector3D.z = 1;
        }
    };
    /**
     * Copies all of the matrix data from the source Point object into the
     * calling Matrix object.
     *
     * @param sourceMatrix The Matrix object from which to copy the data.
     */
    Matrix.prototype.copyFrom = function (sourceMatrix) {
        this.a = sourceMatrix.a;
        this.b = sourceMatrix.b;
        this.c = sourceMatrix.c;
        this.d = sourceMatrix.d;
        this.tx = sourceMatrix.tx;
        this.ty = sourceMatrix.ty;
    };
    /**
     * Copies a Vector3D object into specific row of the calling Matrix object.
     *
     * @param row      The row from which to copy the data from.
     * @param vector3D The Vector3D object from which to copy the data.
     */
    Matrix.prototype.copyRowFrom = function (row, vector3D) {
        if (row > 2) {
            throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 2]");
        }
        else if (row == 0) {
            this.a = vector3D.x;
            this.c = vector3D.y;
        }
        else if (row == 1) {
            this.b = vector3D.x;
            this.d = vector3D.y;
        }
        else {
            this.tx = vector3D.x;
            this.ty = vector3D.y;
        }
    };
    /**
     * Copies specific row of the calling Matrix object into the Vector3D object.
     * The w element of the Vector3D object will not be changed.
     *
     * @param row      The row from which to copy the data from.
     * @param vector3D The Vector3D object from which to copy the data.
     */
    Matrix.prototype.copyRowTo = function (row, vector3D) {
        if (row > 2) {
            throw new ArgumentError("ArgumentError, Row " + row + " out of bounds [0, ..., 2]");
        }
        else if (row == 0) {
            vector3D.x = this.a;
            vector3D.y = this.b;
            vector3D.z = this.tx;
        }
        else if (row == 1) {
            vector3D.x = this.c;
            vector3D.y = this.d;
            vector3D.z = this.ty;
        }
        else {
            vector3D.setTo(0, 0, 1);
        }
    };
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
    Matrix.prototype.createBox = function (scaleX, scaleY, rotation, tx, ty) {
        if (rotation === void 0) { rotation = 0; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = scaleX;
        this.d = scaleY;
        this.b = rotation;
        this.tx = tx;
        this.ty = ty;
    };
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
    Matrix.prototype.createGradientBox = function (width, height, rotation, tx, ty) {
        if (rotation === void 0) { rotation = 0; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = width / 1638.4;
        this.d = height / 1638.4;
        if (rotation != 0.0) {
            var cos = Math.cos(rotation);
            var sin = Math.sin(rotation);
            this.b = sin * this.d;
            this.c = -sin * this.a;
            this.a *= cos;
            this.d *= cos;
        }
        else {
            this.b = this.c = 0;
        }
        this.tx = tx + width / 2;
        this.ty = ty + height / 2;
    };
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
    Matrix.prototype.deltaTransformPoint = function (point) {
        return new Point(point.x * this.a + point.y * this.c, point.x * this.b + point.y * this.d);
    };
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
    Matrix.prototype.identity = function () {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
    };
    /**
     * Performs the opposite transformation of the original matrix. You can apply
     * an inverted matrix to an object to undo the transformation performed when
     * applying the original matrix.
     */
    Matrix.prototype.invert = function () {
        var norm = this.a * this.d - this.b * this.c;
        if (norm == 0) {
            this.a = this.b = this.c = this.d = 0;
            this.tx = -this.tx;
            this.ty = -this.ty;
        }
        else {
            norm = 1.0 / norm;
            var a1 = this.d * norm;
            this.d = this.a * norm;
            this.a = a1;
            this.b *= -norm;
            this.c *= -norm;
            var tx1 = -this.a * this.tx - this.c * this.ty;
            this.ty = -this.b * this.tx - this.d * this.ty;
            this.tx = tx1;
        }
    };
    /**
     * Returns a new Matrix object that is a clone of this matrix, with an exact
     * copy of the contained object.
     *
     * @param matrix The matrix for which you want to get the result of the matrix
     *               transformation.
     * @return A Matrix object.
     */
    Matrix.prototype.multiply = function (matrix) {
        var result = new Matrix();
        result.a = this.a * matrix.a + this.b * matrix.c;
        result.b = this.a * matrix.b + this.b * matrix.d;
        result.c = this.c * matrix.a + this.d * matrix.c;
        result.d = this.c * matrix.b + this.d * matrix.d;
        result.tx = this.tx * matrix.a + this.ty * matrix.c + matrix.tx;
        result.ty = this.tx * matrix.b + this.ty * matrix.d + matrix.ty;
        return result;
    };
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
    Matrix.prototype.rotate = function (angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var a1 = this.a * cos - this.b * sin;
        this.b = this.a * sin + this.b * cos;
        this.a = a1;
        var c1 = this.c * cos - this.d * sin;
        this.d = this.c * sin + this.d * cos;
        this.c = c1;
        var tx1 = this.tx * cos - this.ty * sin;
        this.ty = this.tx * sin + this.ty * cos;
        this.tx = tx1;
    };
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
    Matrix.prototype.scale = function (sx, sy) {
        this.a *= sx;
        this.b *= sy;
        this.c *= sx;
        this.d *= sy;
        this.tx *= sx;
        this.ty *= sy;
    };
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
    Matrix.prototype.setTo = function (a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    };
    /**
     * Returns a text value listing the properties of the Matrix object.
     *
     * @return A string containing the values of the properties of the Matrix
     *         object: <code>a</code>, <code>b</code>, <code>c</code>,
     *         <code>d</code>, <code>tx</code>, and <code>ty</code>.
     */
    Matrix.prototype.toString = function () {
        return "[Matrix] (a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
    };
    /**
     * Returns the result of applying the geometric transformation represented by
     * the Matrix object to the specified point.
     *
     * @param point The point for which you want to get the result of the Matrix
     *              transformation.
     * @return The point resulting from applying the Matrix transformation.
     */
    Matrix.prototype.transformPoint = function (point) {
        return new Point(point.x * this.a + point.y * this.c + this.tx, point.x * this.b + point.y * this.d + this.ty);
    };
    /**
     * Translates the matrix along the <i>x</i> and <i>y</i> axes, as specified
     * by the <code>dx</code> and <code>dy</code> parameters.
     *
     * @param dx The amount of movement along the <i>x</i> axis to the right, in
     *           pixels.
     * @param dy The amount of movement down along the <i>y</i> axis, in pixels.
     */
    Matrix.prototype.translate = function (dx, dy) {
        this.tx += dx;
        this.ty += dy;
    };
    return Matrix;
})();
module.exports = Matrix;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeC50cyJdLCJuYW1lcyI6WyJNYXRyaXgiLCJNYXRyaXguY29uc3RydWN0b3IiLCJNYXRyaXguY2xvbmUiLCJNYXRyaXguY29uY2F0IiwiTWF0cml4LmNvcHlDb2x1bW5Gcm9tIiwiTWF0cml4LmNvcHlDb2x1bW5UbyIsIk1hdHJpeC5jb3B5RnJvbSIsIk1hdHJpeC5jb3B5Um93RnJvbSIsIk1hdHJpeC5jb3B5Um93VG8iLCJNYXRyaXguY3JlYXRlQm94IiwiTWF0cml4LmNyZWF0ZUdyYWRpZW50Qm94IiwiTWF0cml4LmRlbHRhVHJhbnNmb3JtUG9pbnQiLCJNYXRyaXguaWRlbnRpdHkiLCJNYXRyaXguaW52ZXJ0IiwiTWF0cml4Lm11bHRpcGx5IiwiTWF0cml4LnJvdGF0ZSIsIk1hdHJpeC5zY2FsZSIsIk1hdHJpeC5zZXRUbyIsIk1hdHJpeC50b1N0cmluZyIsIk1hdHJpeC50cmFuc2Zvcm1Qb2ludCIsIk1hdHJpeC50cmFuc2xhdGUiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sS0FBSyxXQUFlLDRCQUE0QixDQUFDLENBQUM7QUFFekQsSUFBTyxhQUFhLFdBQWEsc0NBQXNDLENBQUMsQ0FBQztBQUV6RSxBQXVEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxNQUFNO0lBb0NYQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCR0E7SUFDSEEsU0EzREtBLE1BQU1BLENBMkRDQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxFQUFhQSxFQUFFQSxFQUFhQTtRQUFwRkMsaUJBQVlBLEdBQVpBLEtBQVlBO1FBQUVBLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFBRUEsaUJBQVlBLEdBQVpBLEtBQVlBO1FBQUVBLGtCQUFhQSxHQUFiQSxNQUFhQTtRQUFFQSxrQkFBYUEsR0FBYkEsTUFBYUE7UUFFL0ZBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO0lBQ2RBLENBQUNBO0lBRUREOzs7OztPQUtHQTtJQUNJQSxzQkFBS0EsR0FBWkE7UUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDckVBLENBQUNBO0lBRURGOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCR0E7SUFDSUEsdUJBQU1BLEdBQWJBLFVBQWNBLE1BQWFBO1FBRTFCRyxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMzQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1FBRVpBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1FBQzNDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUUzQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFFWkEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDMURBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO1FBQzFEQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUVESDs7Ozs7O09BTUdBO0lBQ0lBLCtCQUFjQSxHQUFyQkEsVUFBc0JBLE1BQWFBLEVBQUVBLFFBQWlCQTtRQUVyREksRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaEJBLE1BQU1BLFNBQVNBLEdBQUdBLE1BQU1BLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7UUFDakRBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFREo7Ozs7OztPQU1HQTtJQUNJQSw2QkFBWUEsR0FBbkJBLFVBQW9CQSxNQUFhQSxFQUFFQSxRQUFpQkE7UUFFbkRLLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2hCQSxNQUFNQSxJQUFJQSxhQUFhQSxDQUFDQSx3QkFBd0JBLEdBQUdBLE1BQU1BLEdBQUdBLDRCQUE0QkEsQ0FBQ0EsQ0FBQ0E7UUFDM0ZBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hCQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcEJBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUFDQSxJQUFJ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QSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUV6Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBO1lBQ25CQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDUEEsSUFBSUEsR0FBR0EsR0FBR0EsR0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDaEJBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDWkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDaEJBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1lBRWhCQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUMzQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDM0NBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLENBQUNBO0lBQ0ZBLENBQUNBO0lBR0RiOzs7Ozs7O09BT0dBO0lBQ0lBLHlCQUFRQSxHQUFmQSxVQUFnQkEsTUFBYUE7UUFFNUJjLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLE1BQU1BLEVBQUVBLENBQUNBO1FBRTFCQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3Q0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0NBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1FBQzdDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUU3Q0EsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDNURBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO1FBRTVEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUVEZDs7Ozs7Ozs7O09BU0dBO0lBQ0lBLHVCQUFNQSxHQUFiQSxVQUFjQSxLQUFZQTtRQUV6QmUsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDMUJBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBRTFCQSxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQTtRQUNqQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1FBRVpBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQTtRQUNqQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFFWkEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEdBQUdBLENBQUNBO1FBQ3BDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUVEZjs7Ozs7Ozs7Ozs7O09BWUdBO0lBQ0lBLHNCQUFLQSxHQUFaQSxVQUFhQSxFQUFTQSxFQUFFQSxFQUFTQTtRQUVoQ2dCLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBRWJBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBRWJBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2RBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBO0lBQ2ZBLENBQUNBO0lBRURoQjs7Ozs7Ozs7Ozs7Ozs7O09BZUdBO0lBQ0lBLHNCQUFLQSxHQUFaQSxVQUFhQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxFQUFTQSxFQUFFQSxFQUFTQTtRQUV4RWlCLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO0lBQ2RBLENBQUNBO0lBRURqQjs7Ozs7O09BTUdBO0lBQ0lBLHlCQUFRQSxHQUFmQTtRQUVDa0IsTUFBTUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0E7SUFDcElBLENBQUNBO0lBRURsQjs7Ozs7OztPQU9HQTtJQUNJQSwrQkFBY0EsR0FBckJBLFVBQXNCQSxLQUFXQTtRQUVoQ21CLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO0lBQ3hHQSxDQUFDQTtJQUVEbkI7Ozs7Ozs7T0FPR0E7SUFDSUEsMEJBQVNBLEdBQWhCQSxVQUFpQkEsRUFBU0EsRUFBRUEsRUFBU0E7UUFFcENvQixJQUFJQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUNkQSxJQUFJQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUNGcEIsYUFBQ0E7QUFBREEsQ0FsZ0JBLEFBa2dCQ0EsSUFBQTtBQUVELEFBQWdCLGlCQUFQLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW9tL01hdHJpeC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9pbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUG9pbnRcIik7XHJcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcclxuaW1wb3J0IEFyZ3VtZW50RXJyb3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0FyZ3VtZW50RXJyb3JcIik7XHJcblxyXG4vKipcclxuICogVGhlIE1hdHJpeCBjbGFzcyByZXByZXNlbnRzIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4IHRoYXQgZGV0ZXJtaW5lcyBob3cgdG9cclxuICogbWFwIHBvaW50cyBmcm9tIG9uZSBjb29yZGluYXRlIHNwYWNlIHRvIGFub3RoZXIuIFlvdSBjYW4gcGVyZm9ybSB2YXJpb3VzXHJcbiAqIGdyYXBoaWNhbCB0cmFuc2Zvcm1hdGlvbnMgb24gYSBkaXNwbGF5IG9iamVjdCBieSBzZXR0aW5nIHRoZSBwcm9wZXJ0aWVzIG9mXHJcbiAqIGEgTWF0cml4IG9iamVjdCwgYXBwbHlpbmcgdGhhdCBNYXRyaXggb2JqZWN0IHRvIHRoZSA8Y29kZT5tYXRyaXg8L2NvZGU+XHJcbiAqIHByb3BlcnR5IG9mIGEgVHJhbnNmb3JtIG9iamVjdCwgYW5kIHRoZW4gYXBwbHlpbmcgdGhhdCBUcmFuc2Zvcm0gb2JqZWN0IGFzXHJcbiAqIHRoZSA8Y29kZT50cmFuc2Zvcm08L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlc2VcclxuICogdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25zIGluY2x1ZGUgdHJhbnNsYXRpb24oPGk+eDwvaT4gYW5kIDxpPnk8L2k+XHJcbiAqIHJlcG9zaXRpb25pbmcpLCByb3RhdGlvbiwgc2NhbGluZywgYW5kIHNrZXdpbmcuXHJcbiAqXHJcbiAqIDxwPlRvZ2V0aGVyIHRoZXNlIHR5cGVzIG9mIHRyYW5zZm9ybWF0aW9ucyBhcmUga25vd24gYXMgPGk+YWZmaW5lXHJcbiAqIHRyYW5zZm9ybWF0aW9uczwvaT4uIEFmZmluZSB0cmFuc2Zvcm1hdGlvbnMgcHJlc2VydmUgdGhlIHN0cmFpZ2h0bmVzcyBvZlxyXG4gKiBsaW5lcyB3aGlsZSB0cmFuc2Zvcm1pbmcsIHNvIHRoYXQgcGFyYWxsZWwgbGluZXMgc3RheSBwYXJhbGxlbC48L3A+XHJcbiAqXHJcbiAqIDxwPlRvIGFwcGx5IGEgdHJhbnNmb3JtYXRpb24gbWF0cml4IHRvIGEgZGlzcGxheSBvYmplY3QsIHlvdSBjcmVhdGUgYVxyXG4gKiBUcmFuc2Zvcm0gb2JqZWN0LCBzZXQgaXRzIDxjb2RlPm1hdHJpeDwvY29kZT4gcHJvcGVydHkgdG8gdGhlXHJcbiAqIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCwgYW5kIHRoZW4gc2V0IHRoZSA8Y29kZT50cmFuc2Zvcm08L2NvZGU+IHByb3BlcnR5IG9mXHJcbiAqIHRoZSBkaXNwbGF5IG9iamVjdCB0byB0aGUgVHJhbnNmb3JtIG9iamVjdC4gTWF0cml4IG9iamVjdHMgYXJlIGFsc28gdXNlZCBhc1xyXG4gKiBwYXJhbWV0ZXJzIG9mIHNvbWUgbWV0aG9kcywgc3VjaCBhcyB0aGUgZm9sbG93aW5nOjwvcD5cclxuICpcclxuICogPHVsPlxyXG4gKiAgIDxsaT5UaGUgPGNvZGU+ZHJhdygpPC9jb2RlPiBtZXRob2Qgb2YgYSBCaXRtYXBEYXRhIG9iamVjdDwvbGk+XHJcbiAqICAgPGxpPlRoZSA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4gbWV0aG9kLFxyXG4gKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiBtZXRob2QsIG9yXHJcbiAqIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+IG1ldGhvZCBvZiBhIEdyYXBoaWNzIG9iamVjdDwvbGk+XHJcbiAqIDwvdWw+XHJcbiAqXHJcbiAqIDxwPkEgdHJhbnNmb3JtYXRpb24gbWF0cml4IG9iamVjdCBpcyBhIDMgeCAzIG1hdHJpeCB3aXRoIHRoZSBmb2xsb3dpbmdcclxuICogY29udGVudHM6PC9wPlxyXG4gKlxyXG4gKiA8cD5JbiB0cmFkaXRpb25hbCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhlcywgdGhlIDxjb2RlPnU8L2NvZGU+LFxyXG4gKiA8Y29kZT52PC9jb2RlPiwgYW5kIDxjb2RlPnc8L2NvZGU+IHByb3BlcnRpZXMgcHJvdmlkZSBleHRyYSBjYXBhYmlsaXRpZXMuXHJcbiAqIFRoZSBNYXRyaXggY2xhc3MgY2FuIG9ubHkgb3BlcmF0ZSBpbiB0d28tZGltZW5zaW9uYWwgc3BhY2UsIHNvIGl0IGFsd2F5c1xyXG4gKiBhc3N1bWVzIHRoYXQgdGhlIHByb3BlcnR5IHZhbHVlcyA8Y29kZT51PC9jb2RlPiBhbmQgPGNvZGU+djwvY29kZT4gYXJlIDAuMCxcclxuICogYW5kIHRoYXQgdGhlIHByb3BlcnR5IHZhbHVlIDxjb2RlPnc8L2NvZGU+IGlzIDEuMC4gVGhlIGVmZmVjdGl2ZSB2YWx1ZXMgb2ZcclxuICogdGhlIG1hdHJpeCBhcmUgYXMgZm9sbG93czo8L3A+XHJcbiAqXHJcbiAqIDxwPllvdSBjYW4gZ2V0IGFuZCBzZXQgdGhlIHZhbHVlcyBvZiBhbGwgc2l4IG9mIHRoZSBvdGhlciBwcm9wZXJ0aWVzIGluIGFcclxuICogTWF0cml4IG9iamVjdDogPGNvZGU+YTwvY29kZT4sIDxjb2RlPmI8L2NvZGU+LCA8Y29kZT5jPC9jb2RlPixcclxuICogPGNvZGU+ZDwvY29kZT4sIDxjb2RlPnR4PC9jb2RlPiwgYW5kIDxjb2RlPnR5PC9jb2RlPi48L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSBNYXRyaXggY2xhc3Mgc3VwcG9ydHMgdGhlIGZvdXIgbWFqb3IgdHlwZXMgb2YgdHJhbnNmb3JtYXRpb25zOlxyXG4gKiB0cmFuc2xhdGlvbiwgc2NhbGluZywgcm90YXRpb24sIGFuZCBza2V3aW5nLiBZb3UgY2FuIHNldCB0aHJlZSBvZiB0aGVzZVxyXG4gKiB0cmFuc2Zvcm1hdGlvbnMgYnkgdXNpbmcgc3BlY2lhbGl6ZWQgbWV0aG9kcywgYXMgZGVzY3JpYmVkIGluIHRoZSBmb2xsb3dpbmdcclxuICogdGFibGU6IDwvcD5cclxuICpcclxuICogPHA+RWFjaCB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbiBhbHRlcnMgdGhlIGN1cnJlbnQgbWF0cml4IHByb3BlcnRpZXMgc29cclxuICogdGhhdCB5b3UgY2FuIGVmZmVjdGl2ZWx5IGNvbWJpbmUgbXVsdGlwbGUgdHJhbnNmb3JtYXRpb25zLiBUbyBkbyB0aGlzLCB5b3VcclxuICogY2FsbCBtb3JlIHRoYW4gb25lIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uIGJlZm9yZSBhcHBseWluZyB0aGUgbWF0cml4IHRvXHJcbiAqIGl0cyBkaXNwbGF5IG9iamVjdCB0YXJnZXQoYnkgdXNpbmcgdGhlIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkgb2ZcclxuICogdGhhdCBkaXNwbGF5IG9iamVjdCkuPC9wPlxyXG4gKlxyXG4gKiA8cD5Vc2UgdGhlIDxjb2RlPm5ldyBNYXRyaXgoKTwvY29kZT4gY29uc3RydWN0b3IgdG8gY3JlYXRlIGEgTWF0cml4IG9iamVjdFxyXG4gKiBiZWZvcmUgeW91IGNhbiBjYWxsIHRoZSBtZXRob2RzIG9mIHRoZSBNYXRyaXggb2JqZWN0LjwvcD5cclxuICovXHJcbmNsYXNzIE1hdHJpeFxyXG57XHJcblx0LyoqXHJcblx0ICogVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZSA8aT54PC9pPiBheGlzXHJcblx0ICogd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZSA8aT55PC9pPiBheGlzXHJcblx0ICogd2hlbiByb3RhdGluZyBvciBza2V3aW5nIGFuIGltYWdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBiOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZSA8aT54PC9pPiBheGlzXHJcblx0ICogd2hlbiByb3RhdGluZyBvciBza2V3aW5nIGFuIGltYWdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZSA8aT55PC9pPiBheGlzXHJcblx0ICogd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRpc3RhbmNlIGJ5IHdoaWNoIHRvIHRyYW5zbGF0ZSBlYWNoIHBvaW50IGFsb25nIHRoZSA8aT54PC9pPiBheGlzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0eDpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBkaXN0YW5jZSBieSB3aGljaCB0byB0cmFuc2xhdGUgZWFjaCBwb2ludCBhbG9uZyB0aGUgPGk+eTwvaT4gYXhpcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgdHk6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hdHJpeCBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMuIEluIG1hdHJpeFxyXG5cdCAqIG5vdGF0aW9uLCB0aGUgcHJvcGVydGllcyBhcmUgb3JnYW5pemVkIGxpa2UgdGhpczpcclxuXHQgKlxyXG5cdCAqIDxwPklmIHlvdSBkbyBub3QgcHJvdmlkZSBhbnkgcGFyYW1ldGVycyB0byB0aGUgPGNvZGU+bmV3IE1hdHJpeCgpPC9jb2RlPlxyXG5cdCAqIGNvbnN0cnVjdG9yLCBpdCBjcmVhdGVzIGFuIDxpPmlkZW50aXR5IG1hdHJpeDwvaT4gd2l0aCB0aGUgZm9sbG93aW5nXHJcblx0ICogdmFsdWVzOjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkluIG1hdHJpeCBub3RhdGlvbiwgdGhlIGlkZW50aXR5IG1hdHJpeCBsb29rcyBsaWtlIHRoaXM6PC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGEgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcclxuXHQgKiAgICAgICAgICAgPGk+eDwvaT4gYXhpcyB3aGVuIHNjYWxpbmcgb3Igcm90YXRpbmcgYW4gaW1hZ2UuXHJcblx0ICogQHBhcmFtIGIgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcclxuXHQgKiAgICAgICAgICAgPGk+eTwvaT4gYXhpcyB3aGVuIHJvdGF0aW5nIG9yIHNrZXdpbmcgYW4gaW1hZ2UuXHJcblx0ICogQHBhcmFtIGMgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcclxuXHQgKiAgICAgICAgICAgPGk+eDwvaT4gYXhpcyB3aGVuIHJvdGF0aW5nIG9yIHNrZXdpbmcgYW4gaW1hZ2UuXHJcblx0ICogQHBhcmFtIGQgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcclxuXHQgKiAgICAgICAgICAgPGk+eTwvaT4gYXhpcyB3aGVuIHNjYWxpbmcgb3Igcm90YXRpbmcgYW4gaW1hZ2UuLlxyXG5cdCAqIEBwYXJhbSB0eCBUaGUgZGlzdGFuY2UgYnkgd2hpY2ggdG8gdHJhbnNsYXRlIGVhY2ggcG9pbnQgYWxvbmcgdGhlIDxpPng8L2k+XHJcblx0ICogICAgICAgICAgIGF4aXMuXHJcblx0ICogQHBhcmFtIHR5IFRoZSBkaXN0YW5jZSBieSB3aGljaCB0byB0cmFuc2xhdGUgZWFjaCBwb2ludCBhbG9uZyB0aGUgPGk+eTwvaT5cclxuXHQgKiAgICAgICAgICAgYXhpcy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihhOm51bWJlciA9IDEsIGI6bnVtYmVyID0gMCwgYzpudW1iZXIgPSAwLCBkOm51bWJlciA9IDEsIHR4Om51bWJlciA9IDAsIHR5Om51bWJlciA9IDApXHJcblx0e1xyXG5cdFx0dGhpcy5hID0gYTtcclxuXHRcdHRoaXMuYiA9IGI7XHJcblx0XHR0aGlzLmMgPSBjO1xyXG5cdFx0dGhpcy5kID0gZDtcclxuXHRcdHRoaXMudHggPSB0eDtcclxuXHRcdHRoaXMudHkgPSB0eTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBuZXcgTWF0cml4IG9iamVjdCB0aGF0IGlzIGEgY2xvbmUgb2YgdGhpcyBtYXRyaXgsIHdpdGggYW4gZXhhY3RcclxuXHQgKiBjb3B5IG9mIHRoZSBjb250YWluZWQgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBBIE1hdHJpeCBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6TWF0cml4XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBNYXRyaXgodGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5kLCB0aGlzLnR4LCB0aGlzLnR5KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbmNhdGVuYXRlcyBhIG1hdHJpeCB3aXRoIHRoZSBjdXJyZW50IG1hdHJpeCwgZWZmZWN0aXZlbHkgY29tYmluaW5nIHRoZVxyXG5cdCAqIGdlb21ldHJpYyBlZmZlY3RzIG9mIHRoZSB0d28uIEluIG1hdGhlbWF0aWNhbCB0ZXJtcywgY29uY2F0ZW5hdGluZyB0d29cclxuXHQgKiBtYXRyaXhlcyBpcyB0aGUgc2FtZSBhcyBjb21iaW5pbmcgdGhlbSB1c2luZyBtYXRyaXggbXVsdGlwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgaWYgbWF0cml4IDxjb2RlPm0xPC9jb2RlPiBzY2FsZXMgYW4gb2JqZWN0IGJ5IGEgZmFjdG9yIG9mXHJcblx0ICogZm91ciwgYW5kIG1hdHJpeCA8Y29kZT5tMjwvY29kZT4gcm90YXRlcyBhbiBvYmplY3QgYnkgMS41NzA3OTYzMjY3OTQ5XHJcblx0ICogcmFkaWFucyg8Y29kZT5NYXRoLlBJLzI8L2NvZGU+KSwgdGhlbiA8Y29kZT5tMS5jb25jYXQobTIpPC9jb2RlPlxyXG5cdCAqIHRyYW5zZm9ybXMgPGNvZGU+bTE8L2NvZGU+IGludG8gYSBtYXRyaXggdGhhdCBzY2FsZXMgYW4gb2JqZWN0IGJ5IGEgZmFjdG9yXHJcblx0ICogb2YgZm91ciBhbmQgcm90YXRlcyB0aGUgb2JqZWN0IGJ5IDxjb2RlPk1hdGguUEkvMjwvY29kZT4gcmFkaWFucy4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhpcyBtZXRob2QgcmVwbGFjZXMgdGhlIHNvdXJjZSBtYXRyaXggd2l0aCB0aGUgY29uY2F0ZW5hdGVkIG1hdHJpeC4gSWZcclxuXHQgKiB5b3Ugd2FudCB0byBjb25jYXRlbmF0ZSB0d28gbWF0cml4ZXMgd2l0aG91dCBhbHRlcmluZyBlaXRoZXIgb2YgdGhlIHR3b1xyXG5cdCAqIHNvdXJjZSBtYXRyaXhlcywgZmlyc3QgY29weSB0aGUgc291cmNlIG1hdHJpeCBieSB1c2luZyB0aGVcclxuXHQgKiA8Y29kZT5jbG9uZSgpPC9jb2RlPiBtZXRob2QsIGFzIHNob3duIGluIHRoZSBDbGFzcyBFeGFtcGxlcyBzZWN0aW9uLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtYXRyaXggVGhlIG1hdHJpeCB0byBiZSBjb25jYXRlbmF0ZWQgdG8gdGhlIHNvdXJjZSBtYXRyaXguXHJcblx0ICovXHJcblx0cHVibGljIGNvbmNhdChtYXRyaXg6TWF0cml4KTp2b2lkXHJcblx0e1xyXG5cdFx0dmFyIGExID0gdGhpcy5hKm1hdHJpeC5hICsgdGhpcy5iKm1hdHJpeC5jO1xyXG5cdFx0dGhpcy5iID0gdGhpcy5hKm1hdHJpeC5iICsgdGhpcy5iKm1hdHJpeC5kO1xyXG5cdFx0dGhpcy5hID0gYTE7XHJcblxyXG5cdFx0dmFyIGMxID0gdGhpcy5jKm1hdHJpeC5hICsgdGhpcy5kKm1hdHJpeC5jO1xyXG5cdFx0dGhpcy5kID0gdGhpcy5jKm1hdHJpeC5iICsgdGhpcy5kKm1hdHJpeC5kO1xyXG5cclxuXHRcdHRoaXMuYyA9IGMxO1xyXG5cclxuXHRcdHZhciB0eDEgPSB0aGlzLnR4Km1hdHJpeC5hICsgdGhpcy50eSptYXRyaXguYyArIG1hdHJpeC50eDtcclxuXHRcdHRoaXMudHkgPSB0aGlzLnR4Km1hdHJpeC5iICsgdGhpcy50eSptYXRyaXguZCArIG1hdHJpeC50eTtcclxuXHRcdHRoaXMudHggPSB0eDE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb3BpZXMgYSBWZWN0b3IzRCBvYmplY3QgaW50byBzcGVjaWZpYyBjb2x1bW4gb2YgdGhlIGNhbGxpbmcgTWF0cml4M0RcclxuXHQgKiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY29sdW1uICAgVGhlIGNvbHVtbiBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEgZnJvbS5cclxuXHQgKiBAcGFyYW0gdmVjdG9yM0QgVGhlIFZlY3RvcjNEIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEuXHJcblx0ICovXHJcblx0cHVibGljIGNvcHlDb2x1bW5Gcm9tKGNvbHVtbjpudW1iZXIsIHZlY3RvcjNEOlZlY3RvcjNEKTp2b2lkXHJcblx0e1xyXG5cdFx0aWYgKGNvbHVtbiA+IDIpIHtcclxuXHRcdFx0dGhyb3cgXCJDb2x1bW4gXCIgKyBjb2x1bW4gKyBcIiBvdXQgb2YgYm91bmRzICgyKVwiO1xyXG5cdFx0fSBlbHNlIGlmIChjb2x1bW4gPT0gMCkge1xyXG5cdFx0XHR0aGlzLmEgPSB2ZWN0b3IzRC54O1xyXG5cdFx0XHR0aGlzLmMgPSB2ZWN0b3IzRC55O1xyXG5cdFx0fSBlbHNlIGlmIChjb2x1bW4gPT0gMSkge1xyXG5cdFx0XHR0aGlzLmIgPSB2ZWN0b3IzRC54O1xyXG5cdFx0XHR0aGlzLmQgPSB2ZWN0b3IzRC55O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy50eCA9IHZlY3RvcjNELng7XHJcblx0XHRcdHRoaXMudHkgPSB2ZWN0b3IzRC55O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29waWVzIHNwZWNpZmljIGNvbHVtbiBvZiB0aGUgY2FsbGluZyBNYXRyaXggb2JqZWN0IGludG8gdGhlIFZlY3RvcjNEXHJcblx0ICogb2JqZWN0LiBUaGUgdyBlbGVtZW50IG9mIHRoZSBWZWN0b3IzRCBvYmplY3Qgd2lsbCBub3QgYmUgY2hhbmdlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjb2x1bW4gICBUaGUgY29sdW1uIGZyb20gd2hpY2ggdG8gY29weSB0aGUgZGF0YSBmcm9tLlxyXG5cdCAqIEBwYXJhbSB2ZWN0b3IzRCBUaGUgVmVjdG9yM0Qgb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSB0aGUgZGF0YS5cclxuXHQgKi9cclxuXHRwdWJsaWMgY29weUNvbHVtblRvKGNvbHVtbjpudW1iZXIsIHZlY3RvcjNEOlZlY3RvcjNEKTp2b2lkXHJcblx0e1xyXG5cdFx0aWYgKGNvbHVtbiA+IDIpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEFyZ3VtZW50RXJyb3IoXCJBcmd1bWVudEVycm9yLCBDb2x1bW4gXCIgKyBjb2x1bW4gKyBcIiBvdXQgb2YgYm91bmRzIFswLCAuLi4sIDJdXCIpO1xyXG5cdFx0fSBlbHNlIGlmIChjb2x1bW4gPT0gMCkge1xyXG5cdFx0XHR2ZWN0b3IzRC54ID0gdGhpcy5hO1xyXG5cdFx0XHR2ZWN0b3IzRC55ID0gdGhpcy5jO1xyXG5cdFx0XHR2ZWN0b3IzRC56ID0gMDtcclxuXHRcdH0gZWxzZSBpZiAoY29sdW1uID09IDEpIHtcclxuXHRcdFx0dmVjdG9yM0QueCA9IHRoaXMuYjtcclxuXHRcdFx0dmVjdG9yM0QueSA9IHRoaXMuZDtcclxuXHRcdFx0dmVjdG9yM0QueiA9IDA7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2ZWN0b3IzRC54ID0gdGhpcy50eDtcclxuXHRcdFx0dmVjdG9yM0QueSA9IHRoaXMudHk7XHJcblx0XHRcdHZlY3RvcjNELnogPSAxO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29waWVzIGFsbCBvZiB0aGUgbWF0cml4IGRhdGEgZnJvbSB0aGUgc291cmNlIFBvaW50IG9iamVjdCBpbnRvIHRoZVxyXG5cdCAqIGNhbGxpbmcgTWF0cml4IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzb3VyY2VNYXRyaXggVGhlIE1hdHJpeCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb3B5RnJvbShzb3VyY2VNYXRyaXg6TWF0cml4KTp2b2lkXHJcblx0e1xyXG5cdFx0dGhpcy5hID0gc291cmNlTWF0cml4LmE7XHJcblx0XHR0aGlzLmIgPSBzb3VyY2VNYXRyaXguYjtcclxuXHRcdHRoaXMuYyA9IHNvdXJjZU1hdHJpeC5jO1xyXG5cdFx0dGhpcy5kID0gc291cmNlTWF0cml4LmQ7XHJcblx0XHR0aGlzLnR4ID0gc291cmNlTWF0cml4LnR4O1xyXG5cdFx0dGhpcy50eSA9IHNvdXJjZU1hdHJpeC50eTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvcGllcyBhIFZlY3RvcjNEIG9iamVjdCBpbnRvIHNwZWNpZmljIHJvdyBvZiB0aGUgY2FsbGluZyBNYXRyaXggb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJvdyAgICAgIFRoZSByb3cgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhIGZyb20uXHJcblx0ICogQHBhcmFtIHZlY3RvcjNEIFRoZSBWZWN0b3IzRCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb3B5Um93RnJvbShyb3c6bnVtYmVyLCB2ZWN0b3IzRDpWZWN0b3IzRCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmIChyb3cgPiAyKSB7XHJcblx0XHRcdHRocm93IG5ldyBBcmd1bWVudEVycm9yKFwiQXJndW1lbnRFcnJvciwgUm93IFwiICsgcm93ICsgXCIgb3V0IG9mIGJvdW5kcyBbMCwgLi4uLCAyXVwiKTtcclxuXHRcdH0gZWxzZSBpZiAocm93ID09IDApIHtcclxuXHRcdFx0dGhpcy5hID0gdmVjdG9yM0QueDtcclxuXHRcdFx0dGhpcy5jID0gdmVjdG9yM0QueTtcclxuXHRcdH0gZWxzZSBpZiAocm93ID09IDEpIHtcclxuXHRcdFx0dGhpcy5iID0gdmVjdG9yM0QueDtcclxuXHRcdFx0dGhpcy5kID0gdmVjdG9yM0QueTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudHggPSB2ZWN0b3IzRC54O1xyXG5cdFx0XHR0aGlzLnR5ID0gdmVjdG9yM0QueTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvcGllcyBzcGVjaWZpYyByb3cgb2YgdGhlIGNhbGxpbmcgTWF0cml4IG9iamVjdCBpbnRvIHRoZSBWZWN0b3IzRCBvYmplY3QuXHJcblx0ICogVGhlIHcgZWxlbWVudCBvZiB0aGUgVmVjdG9yM0Qgb2JqZWN0IHdpbGwgbm90IGJlIGNoYW5nZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcm93ICAgICAgVGhlIHJvdyBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEgZnJvbS5cclxuXHQgKiBAcGFyYW0gdmVjdG9yM0QgVGhlIFZlY3RvcjNEIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEuXHJcblx0ICovXHJcblx0cHVibGljIGNvcHlSb3dUbyhyb3c6bnVtYmVyLCB2ZWN0b3IzRDpWZWN0b3IzRCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmIChyb3cgPiAyKSB7XHJcblx0XHRcdHRocm93IG5ldyBBcmd1bWVudEVycm9yKFwiQXJndW1lbnRFcnJvciwgUm93IFwiICsgcm93ICsgXCIgb3V0IG9mIGJvdW5kcyBbMCwgLi4uLCAyXVwiKTtcclxuXHRcdH0gZWxzZSBpZiAocm93ID09IDApIHtcclxuXHRcdFx0dmVjdG9yM0QueCA9IHRoaXMuYTtcclxuXHRcdFx0dmVjdG9yM0QueSA9IHRoaXMuYjtcclxuXHRcdFx0dmVjdG9yM0QueiA9IHRoaXMudHg7XHJcblx0XHR9IGVsc2UgaWYgKHJvdyA9PSAxKSB7XHJcblx0XHRcdHZlY3RvcjNELnggPSB0aGlzLmM7XHJcblx0XHRcdHZlY3RvcjNELnkgPSB0aGlzLmQ7XHJcblx0XHRcdHZlY3RvcjNELnogPSB0aGlzLnR5O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmVjdG9yM0Quc2V0VG8oMCwgMCwgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmNsdWRlcyBwYXJhbWV0ZXJzIGZvciBzY2FsaW5nLCByb3RhdGlvbiwgYW5kIHRyYW5zbGF0aW9uLiBXaGVuIGFwcGxpZWRcclxuXHQgKiB0byBhIG1hdHJpeCBpdCBzZXRzIHRoZSBtYXRyaXgncyB2YWx1ZXMgYmFzZWQgb24gdGhvc2UgcGFyYW1ldGVycy5cclxuXHQgKlxyXG5cdCAqIDxwPlVzaW5nIHRoZSA8Y29kZT5jcmVhdGVCb3goKTwvY29kZT4gbWV0aG9kIGxldHMgeW91IG9idGFpbiB0aGUgc2FtZVxyXG5cdCAqIG1hdHJpeCBhcyB5b3Ugd291bGQgaWYgeW91IGFwcGxpZWQgdGhlIDxjb2RlPmlkZW50aXR5KCk8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPnJvdGF0ZSgpPC9jb2RlPiwgPGNvZGU+c2NhbGUoKTwvY29kZT4sIGFuZCA8Y29kZT50cmFuc2xhdGUoKTwvY29kZT5cclxuXHQgKiBtZXRob2RzIGluIHN1Y2Nlc3Npb24uIEZvciBleGFtcGxlLCA8Y29kZT5tYXQxLmNyZWF0ZUJveCgyLDIsTWF0aC5QSS80LFxyXG5cdCAqIDEwMCwgMTAwKTwvY29kZT4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhcyB0aGUgZm9sbG93aW5nOjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzY2FsZVggICBUaGUgZmFjdG9yIGJ5IHdoaWNoIHRvIHNjYWxlIGhvcml6b250YWxseS5cclxuXHQgKiBAcGFyYW0gc2NhbGVZICAgVGhlIGZhY3RvciBieSB3aGljaCBzY2FsZSB2ZXJ0aWNhbGx5LlxyXG5cdCAqIEBwYXJhbSByb3RhdGlvbiBUaGUgYW1vdW50IHRvIHJvdGF0ZSwgaW4gcmFkaWFucy5cclxuXHQgKiBAcGFyYW0gdHggICAgICAgVGhlIG51bWJlciBvZiBwaXhlbHMgdG8gdHJhbnNsYXRlKG1vdmUpIHRvIHRoZSByaWdodFxyXG5cdCAqICAgICAgICAgICAgICAgICBhbG9uZyB0aGUgPGk+eDwvaT4gYXhpcy5cclxuXHQgKiBAcGFyYW0gdHkgICAgICAgVGhlIG51bWJlciBvZiBwaXhlbHMgdG8gdHJhbnNsYXRlKG1vdmUpIGRvd24gYWxvbmcgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgIDxpPnk8L2k+IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIGNyZWF0ZUJveChzY2FsZVg6bnVtYmVyLCBzY2FsZVk6bnVtYmVyLCByb3RhdGlvbjpudW1iZXIgPSAwLCB0eDpudW1iZXIgPSAwLCB0eTpudW1iZXIgPSAwKTp2b2lkXHJcblx0e1xyXG5cdFx0dGhpcy5hID0gc2NhbGVYO1xyXG5cdFx0dGhpcy5kID0gc2NhbGVZO1xyXG5cdFx0dGhpcy5iID0gcm90YXRpb247XHJcblx0XHR0aGlzLnR4ID0gdHg7XHJcblx0XHR0aGlzLnR5ID0gdHk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBzcGVjaWZpYyBzdHlsZSBvZiBtYXRyaXggZXhwZWN0ZWQgYnkgdGhlXHJcblx0ICogPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4gYW5kIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+XHJcblx0ICogbWV0aG9kcyBvZiB0aGUgR3JhcGhpY3MgY2xhc3MuIFdpZHRoIGFuZCBoZWlnaHQgYXJlIHNjYWxlZCB0byBhXHJcblx0ICogPGNvZGU+c2NhbGVYPC9jb2RlPi88Y29kZT5zY2FsZVk8L2NvZGU+IHBhaXIgYW5kIHRoZVxyXG5cdCAqIDxjb2RlPnR4PC9jb2RlPi88Y29kZT50eTwvY29kZT4gdmFsdWVzIGFyZSBvZmZzZXQgYnkgaGFsZiB0aGUgd2lkdGggYW5kXHJcblx0ICogaGVpZ2h0LlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIGEgZ3JhZGllbnQgd2l0aCB0aGUgZm9sbG93aW5nXHJcblx0ICogY2hhcmFjdGVyaXN0aWNzOjwvcD5cclxuXHQgKlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT48Y29kZT5HcmFkaWVudFR5cGUuTElORUFSPC9jb2RlPjwvbGk+XHJcblx0ICogICA8bGk+VHdvIGNvbG9ycywgZ3JlZW4gYW5kIGJsdWUsIHdpdGggdGhlIHJhdGlvcyBhcnJheSBzZXQgdG8gPGNvZGU+WzAsXHJcblx0ICogMjU1XTwvY29kZT48L2xpPlxyXG5cdCAqICAgPGxpPjxjb2RlPlNwcmVhZE1ldGhvZC5QQUQ8L2NvZGU+PC9saT5cclxuXHQgKiAgIDxsaT48Y29kZT5JbnRlcnBvbGF0aW9uTWV0aG9kLkxJTkVBUl9SR0I8L2NvZGU+PC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGZvbGxvd2luZyBpbGx1c3RyYXRpb25zIHNob3cgZ3JhZGllbnRzIGluIHdoaWNoIHRoZSBtYXRyaXggd2FzXHJcblx0ICogZGVmaW5lZCB1c2luZyB0aGUgPGNvZGU+Y3JlYXRlR3JhZGllbnRCb3goKTwvY29kZT4gbWV0aG9kIHdpdGggZGlmZmVyZW50XHJcblx0ICogcGFyYW1ldGVyIHNldHRpbmdzOjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB3aWR0aCAgICBUaGUgd2lkdGggb2YgdGhlIGdyYWRpZW50IGJveC5cclxuXHQgKiBAcGFyYW0gaGVpZ2h0ICAgVGhlIGhlaWdodCBvZiB0aGUgZ3JhZGllbnQgYm94LlxyXG5cdCAqIEBwYXJhbSByb3RhdGlvbiBUaGUgYW1vdW50IHRvIHJvdGF0ZSwgaW4gcmFkaWFucy5cclxuXHQgKiBAcGFyYW0gdHggICAgICAgVGhlIGRpc3RhbmNlLCBpbiBwaXhlbHMsIHRvIHRyYW5zbGF0ZSB0byB0aGUgcmlnaHQgYWxvbmdcclxuXHQgKiAgICAgICAgICAgICAgICAgdGhlIDxpPng8L2k+IGF4aXMuIFRoaXMgdmFsdWUgaXMgb2Zmc2V0IGJ5IGhhbGYgb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgIDxjb2RlPndpZHRoPC9jb2RlPiBwYXJhbWV0ZXIuXHJcblx0ICogQHBhcmFtIHR5ICAgICAgIFRoZSBkaXN0YW5jZSwgaW4gcGl4ZWxzLCB0byB0cmFuc2xhdGUgZG93biBhbG9uZyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgPGk+eTwvaT4gYXhpcy4gVGhpcyB2YWx1ZSBpcyBvZmZzZXQgYnkgaGFsZiBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwYXJhbWV0ZXIuXHJcblx0ICovXHJcblx0cHVibGljIGNyZWF0ZUdyYWRpZW50Qm94KHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlciwgcm90YXRpb246bnVtYmVyID0gMCwgdHg6bnVtYmVyID0gMCwgdHk6bnVtYmVyID0gMCk6dm9pZFxyXG5cdHtcclxuXHRcdHRoaXMuYSA9IHdpZHRoLzE2MzguNDtcclxuXHRcdHRoaXMuZCA9IGhlaWdodC8xNjM4LjQ7XHJcblxyXG5cdFx0aWYgKHJvdGF0aW9uICE9IDAuMCkge1xyXG5cdFx0XHR2YXIgY29zID0gTWF0aC5jb3Mocm90YXRpb24pO1xyXG5cdFx0XHR2YXIgc2luID0gTWF0aC5zaW4ocm90YXRpb24pO1xyXG5cclxuXHRcdFx0dGhpcy5iID0gc2luKnRoaXMuZDtcclxuXHRcdFx0dGhpcy5jID0gLXNpbip0aGlzLmE7XHJcblx0XHRcdHRoaXMuYSAqPSBjb3M7XHJcblx0XHRcdHRoaXMuZCAqPSBjb3M7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmIgPSB0aGlzLmMgPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudHggPSB0eCArIHdpZHRoLzI7XHJcblx0XHR0aGlzLnR5ID0gdHkgKyBoZWlnaHQvMjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdpdmVuIGEgcG9pbnQgaW4gdGhlIHByZXRyYW5zZm9ybSBjb29yZGluYXRlIHNwYWNlLCByZXR1cm5zIHRoZVxyXG5cdCAqIGNvb3JkaW5hdGVzIG9mIHRoYXQgcG9pbnQgYWZ0ZXIgdGhlIHRyYW5zZm9ybWF0aW9uIG9jY3Vycy4gVW5saWtlIHRoZVxyXG5cdCAqIHN0YW5kYXJkIHRyYW5zZm9ybWF0aW9uIGFwcGxpZWQgdXNpbmcgdGhlIDxjb2RlPnRyYW5zZm9ybVBvaW50KCk8L2NvZGU+XHJcblx0ICogbWV0aG9kLCB0aGUgPGNvZGU+ZGVsdGFUcmFuc2Zvcm1Qb2ludCgpPC9jb2RlPiBtZXRob2QncyB0cmFuc2Zvcm1hdGlvblxyXG5cdCAqIGRvZXMgbm90IGNvbnNpZGVyIHRoZSB0cmFuc2xhdGlvbiBwYXJhbWV0ZXJzIDxjb2RlPnR4PC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT50eTwvY29kZT4uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIHBvaW50IGZvciB3aGljaCB5b3Ugd2FudCB0byBnZXQgdGhlIHJlc3VsdCBvZiB0aGUgbWF0cml4XHJcblx0ICogICAgICAgICAgICAgIHRyYW5zZm9ybWF0aW9uLlxyXG5cdCAqIEByZXR1cm4gVGhlIHBvaW50IHJlc3VsdGluZyBmcm9tIGFwcGx5aW5nIHRoZSBtYXRyaXggdHJhbnNmb3JtYXRpb24uXHJcblx0ICovXHJcblx0cHVibGljIGRlbHRhVHJhbnNmb3JtUG9pbnQocG9pbnQ6UG9pbnQpOlBvaW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBQb2ludChwb2ludC54KnRoaXMuYSArIHBvaW50LnkqdGhpcy5jLCBwb2ludC54KnRoaXMuYiArIHBvaW50LnkqdGhpcy5kKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgZWFjaCBtYXRyaXggcHJvcGVydHkgdG8gYSB2YWx1ZSB0aGF0IGNhdXNlcyBhIG51bGwgdHJhbnNmb3JtYXRpb24uIEFuXHJcblx0ICogb2JqZWN0IHRyYW5zZm9ybWVkIGJ5IGFwcGx5aW5nIGFuIGlkZW50aXR5IG1hdHJpeCB3aWxsIGJlIGlkZW50aWNhbCB0byB0aGVcclxuXHQgKiBvcmlnaW5hbC5cclxuXHQgKlxyXG5cdCAqIDxwPkFmdGVyIGNhbGxpbmcgdGhlIDxjb2RlPmlkZW50aXR5KCk8L2NvZGU+IG1ldGhvZCwgdGhlIHJlc3VsdGluZyBtYXRyaXhcclxuXHQgKiBoYXMgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOiA8Y29kZT5hPC9jb2RlPj0xLCA8Y29kZT5iPC9jb2RlPj0wLFxyXG5cdCAqIDxjb2RlPmM8L2NvZGU+PTAsIDxjb2RlPmQ8L2NvZGU+PTEsIDxjb2RlPnR4PC9jb2RlPj0wLFxyXG5cdCAqIDxjb2RlPnR5PC9jb2RlPj0wLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkluIG1hdHJpeCBub3RhdGlvbiwgdGhlIGlkZW50aXR5IG1hdHJpeCBsb29rcyBsaWtlIHRoaXM6PC9wPlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGlkZW50aXR5KCk6dm9pZFxyXG5cdHtcclxuXHRcdHRoaXMuYSA9IDE7XHJcblx0XHR0aGlzLmIgPSAwO1xyXG5cdFx0dGhpcy5jID0gMDtcclxuXHRcdHRoaXMuZCA9IDE7XHJcblx0XHR0aGlzLnR4ID0gMDtcclxuXHRcdHRoaXMudHkgPSAwO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgdGhlIG9wcG9zaXRlIHRyYW5zZm9ybWF0aW9uIG9mIHRoZSBvcmlnaW5hbCBtYXRyaXguIFlvdSBjYW4gYXBwbHlcclxuXHQgKiBhbiBpbnZlcnRlZCBtYXRyaXggdG8gYW4gb2JqZWN0IHRvIHVuZG8gdGhlIHRyYW5zZm9ybWF0aW9uIHBlcmZvcm1lZCB3aGVuXHJcblx0ICogYXBwbHlpbmcgdGhlIG9yaWdpbmFsIG1hdHJpeC5cclxuXHQgKi9cclxuXHRwdWJsaWMgaW52ZXJ0KCk6dm9pZFxyXG5cdHtcclxuXHRcdHZhciBub3JtID0gdGhpcy5hKnRoaXMuZCAtIHRoaXMuYip0aGlzLmM7XHJcblxyXG5cdFx0aWYgKG5vcm0gPT0gMCkge1xyXG5cdFx0XHR0aGlzLmEgPSB0aGlzLmIgPSB0aGlzLmMgPSB0aGlzLmQgPSAwO1xyXG5cdFx0XHR0aGlzLnR4ID0gLXRoaXMudHg7XHJcblx0XHRcdHRoaXMudHkgPSAtdGhpcy50eTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5vcm0gPSAxLjAvbm9ybTtcclxuXHRcdFx0dmFyIGExID0gdGhpcy5kKm5vcm07XHJcblx0XHRcdHRoaXMuZCA9IHRoaXMuYSpub3JtO1xyXG5cdFx0XHR0aGlzLmEgPSBhMTtcclxuXHRcdFx0dGhpcy5iICo9IC1ub3JtO1xyXG5cdFx0XHR0aGlzLmMgKj0gLW5vcm07XHJcblxyXG5cdFx0XHR2YXIgdHgxID0gLXRoaXMuYSp0aGlzLnR4IC0gdGhpcy5jKnRoaXMudHk7XHJcblx0XHRcdHRoaXMudHkgPSAtdGhpcy5iKnRoaXMudHggLSB0aGlzLmQqdGhpcy50eTtcclxuXHRcdFx0dGhpcy50eCA9IHR4MTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgbmV3IE1hdHJpeCBvYmplY3QgdGhhdCBpcyBhIGNsb25lIG9mIHRoaXMgbWF0cml4LCB3aXRoIGFuIGV4YWN0XHJcblx0ICogY29weSBvZiB0aGUgY29udGFpbmVkIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtYXRyaXggVGhlIG1hdHJpeCBmb3Igd2hpY2ggeW91IHdhbnQgdG8gZ2V0IHRoZSByZXN1bHQgb2YgdGhlIG1hdHJpeFxyXG5cdCAqICAgICAgICAgICAgICAgdHJhbnNmb3JtYXRpb24uXHJcblx0ICogQHJldHVybiBBIE1hdHJpeCBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIG11bHRpcGx5KG1hdHJpeDpNYXRyaXgpOk1hdHJpeFxyXG5cdHtcclxuXHRcdHZhciByZXN1bHQgPSBuZXcgTWF0cml4KCk7XHJcblxyXG5cdFx0cmVzdWx0LmEgPSB0aGlzLmEqbWF0cml4LmEgKyB0aGlzLmIqbWF0cml4LmM7XHJcblx0XHRyZXN1bHQuYiA9IHRoaXMuYSptYXRyaXguYiArIHRoaXMuYiptYXRyaXguZDtcclxuXHRcdHJlc3VsdC5jID0gdGhpcy5jKm1hdHJpeC5hICsgdGhpcy5kKm1hdHJpeC5jO1xyXG5cdFx0cmVzdWx0LmQgPSB0aGlzLmMqbWF0cml4LmIgKyB0aGlzLmQqbWF0cml4LmQ7XHJcblxyXG5cdFx0cmVzdWx0LnR4ID0gdGhpcy50eCptYXRyaXguYSArIHRoaXMudHkqbWF0cml4LmMgKyBtYXRyaXgudHg7XHJcblx0XHRyZXN1bHQudHkgPSB0aGlzLnR4Km1hdHJpeC5iICsgdGhpcy50eSptYXRyaXguZCArIG1hdHJpeC50eTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQXBwbGllcyBhIHJvdGF0aW9uIHRyYW5zZm9ybWF0aW9uIHRvIHRoZSBNYXRyaXggb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPnJvdGF0ZSgpPC9jb2RlPiBtZXRob2QgYWx0ZXJzIHRoZSA8Y29kZT5hPC9jb2RlPixcclxuXHQgKiA8Y29kZT5iPC9jb2RlPiwgPGNvZGU+YzwvY29kZT4sIGFuZCA8Y29kZT5kPC9jb2RlPiBwcm9wZXJ0aWVzIG9mIHRoZVxyXG5cdCAqIE1hdHJpeCBvYmplY3QuIEluIG1hdHJpeCBub3RhdGlvbiwgdGhpcyBpcyB0aGUgc2FtZSBhcyBjb25jYXRlbmF0aW5nIHRoZVxyXG5cdCAqIGN1cnJlbnQgbWF0cml4IHdpdGggdGhlIGZvbGxvd2luZzo8L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYW5nbGUgVGhlIHJvdGF0aW9uIGFuZ2xlIGluIHJhZGlhbnMuXHJcblx0ICovXHJcblx0cHVibGljIHJvdGF0ZShhbmdsZTpudW1iZXIpOnZvaWRcclxuXHR7XHJcblx0XHR2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xyXG5cdFx0dmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcclxuXHJcblx0XHR2YXIgYTEgPSB0aGlzLmEqY29zIC0gdGhpcy5iKnNpbjtcclxuXHRcdHRoaXMuYiA9IHRoaXMuYSpzaW4gKyB0aGlzLmIqY29zO1xyXG5cdFx0dGhpcy5hID0gYTE7XHJcblxyXG5cdFx0dmFyIGMxID0gdGhpcy5jKmNvcyAtIHRoaXMuZCpzaW47XHJcblx0XHR0aGlzLmQgPSB0aGlzLmMqc2luICsgdGhpcy5kKmNvcztcclxuXHRcdHRoaXMuYyA9IGMxO1xyXG5cclxuXHRcdHZhciB0eDEgPSB0aGlzLnR4KmNvcyAtIHRoaXMudHkqc2luO1xyXG5cdFx0dGhpcy50eSA9IHRoaXMudHgqc2luICsgdGhpcy50eSpjb3M7XHJcblx0XHR0aGlzLnR4ID0gdHgxO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQXBwbGllcyBhIHNjYWxpbmcgdHJhbnNmb3JtYXRpb24gdG8gdGhlIG1hdHJpeC4gVGhlIDxpPng8L2k+IGF4aXMgaXNcclxuXHQgKiBtdWx0aXBsaWVkIGJ5IDxjb2RlPnN4PC9jb2RlPiwgYW5kIHRoZSA8aT55PC9pPiBheGlzIGl0IGlzIG11bHRpcGxpZWQgYnlcclxuXHQgKiA8Y29kZT5zeTwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+c2NhbGUoKTwvY29kZT4gbWV0aG9kIGFsdGVycyB0aGUgPGNvZGU+YTwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+ZDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgTWF0cml4IG9iamVjdC4gSW4gbWF0cml4IG5vdGF0aW9uLCB0aGlzXHJcblx0ICogaXMgdGhlIHNhbWUgYXMgY29uY2F0ZW5hdGluZyB0aGUgY3VycmVudCBtYXRyaXggd2l0aCB0aGUgZm9sbG93aW5nXHJcblx0ICogbWF0cml4OjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzeCBBIG11bHRpcGxpZXIgdXNlZCB0byBzY2FsZSB0aGUgb2JqZWN0IGFsb25nIHRoZSA8aT54PC9pPiBheGlzLlxyXG5cdCAqIEBwYXJhbSBzeSBBIG11bHRpcGxpZXIgdXNlZCB0byBzY2FsZSB0aGUgb2JqZWN0IGFsb25nIHRoZSA8aT55PC9pPiBheGlzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzY2FsZShzeDpudW1iZXIsIHN5Om51bWJlcik6dm9pZFxyXG5cdHtcclxuXHRcdHRoaXMuYSAqPSBzeDtcclxuXHRcdHRoaXMuYiAqPSBzeTtcclxuXHJcblx0XHR0aGlzLmMgKj0gc3g7XHJcblx0XHR0aGlzLmQgKj0gc3k7XHJcblxyXG5cdFx0dGhpcy50eCAqPSBzeDtcclxuXHRcdHRoaXMudHkgKj0gc3k7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBtZW1iZXJzIG9mIE1hdHJpeCB0byB0aGUgc3BlY2lmaWVkIHZhbHVlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBhICBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlXHJcblx0ICogICAgICAgICAgIDxpPng8L2k+IGF4aXMgd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLlxyXG5cdCAqIEBwYXJhbSBiICBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlXHJcblx0ICogICAgICAgICAgIDxpPnk8L2k+IGF4aXMgd2hlbiByb3RhdGluZyBvciBza2V3aW5nIGFuIGltYWdlLlxyXG5cdCAqIEBwYXJhbSBjICBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlXHJcblx0ICogICAgICAgICAgIDxpPng8L2k+IGF4aXMgd2hlbiByb3RhdGluZyBvciBza2V3aW5nIGFuIGltYWdlLlxyXG5cdCAqIEBwYXJhbSBkICBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlXHJcblx0ICogICAgICAgICAgIDxpPnk8L2k+IGF4aXMgd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLi5cclxuXHQgKiBAcGFyYW0gdHggVGhlIGRpc3RhbmNlIGJ5IHdoaWNoIHRvIHRyYW5zbGF0ZSBlYWNoIHBvaW50IGFsb25nIHRoZSA8aT54PC9pPlxyXG5cdCAqICAgICAgICAgICBheGlzLlxyXG5cdCAqIEBwYXJhbSB0eSBUaGUgZGlzdGFuY2UgYnkgd2hpY2ggdG8gdHJhbnNsYXRlIGVhY2ggcG9pbnQgYWxvbmcgdGhlIDxpPnk8L2k+XHJcblx0ICogICAgICAgICAgIGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIHNldFRvKGE6bnVtYmVyLCBiOm51bWJlciwgYzpudW1iZXIsIGQ6bnVtYmVyLCB0eDpudW1iZXIsIHR5Om51bWJlcik6dm9pZFxyXG5cdHtcclxuXHRcdHRoaXMuYSA9IGE7XHJcblx0XHR0aGlzLmIgPSBiO1xyXG5cdFx0dGhpcy5jID0gYztcclxuXHRcdHRoaXMuZCA9IGQ7XHJcblx0XHR0aGlzLnR4ID0gdHg7XHJcblx0XHR0aGlzLnR5ID0gdHk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgdGV4dCB2YWx1ZSBsaXN0aW5nIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBNYXRyaXggb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBBIHN0cmluZyBjb250YWluaW5nIHRoZSB2YWx1ZXMgb2YgdGhlIHByb3BlcnRpZXMgb2YgdGhlIE1hdHJpeFxyXG5cdCAqICAgICAgICAgb2JqZWN0OiA8Y29kZT5hPC9jb2RlPiwgPGNvZGU+YjwvY29kZT4sIDxjb2RlPmM8L2NvZGU+LFxyXG5cdCAqICAgICAgICAgPGNvZGU+ZDwvY29kZT4sIDxjb2RlPnR4PC9jb2RlPiwgYW5kIDxjb2RlPnR5PC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gXCJbTWF0cml4XSAoYT1cIiArIHRoaXMuYSArIFwiLCBiPVwiICsgdGhpcy5iICsgXCIsIGM9XCIgKyB0aGlzLmMgKyBcIiwgZD1cIiArIHRoaXMuZCArIFwiLCB0eD1cIiArIHRoaXMudHggKyBcIiwgdHk9XCIgKyB0aGlzLnR5ICsgXCIpXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgdGhlIGdlb21ldHJpYyB0cmFuc2Zvcm1hdGlvbiByZXByZXNlbnRlZCBieVxyXG5cdCAqIHRoZSBNYXRyaXggb2JqZWN0IHRvIHRoZSBzcGVjaWZpZWQgcG9pbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIHBvaW50IGZvciB3aGljaCB5b3Ugd2FudCB0byBnZXQgdGhlIHJlc3VsdCBvZiB0aGUgTWF0cml4XHJcblx0ICogICAgICAgICAgICAgIHRyYW5zZm9ybWF0aW9uLlxyXG5cdCAqIEByZXR1cm4gVGhlIHBvaW50IHJlc3VsdGluZyBmcm9tIGFwcGx5aW5nIHRoZSBNYXRyaXggdHJhbnNmb3JtYXRpb24uXHJcblx0ICovXHJcblx0cHVibGljIHRyYW5zZm9ybVBvaW50KHBvaW50OlBvaW50KTpQb2ludFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUG9pbnQocG9pbnQueCp0aGlzLmEgKyBwb2ludC55KnRoaXMuYyArIHRoaXMudHgsIHBvaW50LngqdGhpcy5iICsgcG9pbnQueSp0aGlzLmQgKyB0aGlzLnR5KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zbGF0ZXMgdGhlIG1hdHJpeCBhbG9uZyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGF4ZXMsIGFzIHNwZWNpZmllZFxyXG5cdCAqIGJ5IHRoZSA8Y29kZT5keDwvY29kZT4gYW5kIDxjb2RlPmR5PC9jb2RlPiBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGR4IFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIDxpPng8L2k+IGF4aXMgdG8gdGhlIHJpZ2h0LCBpblxyXG5cdCAqICAgICAgICAgICBwaXhlbHMuXHJcblx0ICogQHBhcmFtIGR5IFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgZG93biBhbG9uZyB0aGUgPGk+eTwvaT4gYXhpcywgaW4gcGl4ZWxzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0cmFuc2xhdGUoZHg6bnVtYmVyLCBkeTpudW1iZXIpOnZvaWRcclxuXHR7XHJcblx0XHR0aGlzLnR4ICs9IGR4O1xyXG5cdFx0dGhpcy50eSArPSBkeTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IE1hdHJpeDsiXX0=