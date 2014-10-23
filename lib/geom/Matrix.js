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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL21hdHJpeC50cyJdLCJuYW1lcyI6WyJNYXRyaXgiLCJNYXRyaXguY29uc3RydWN0b3IiLCJNYXRyaXguY2xvbmUiLCJNYXRyaXguY29uY2F0IiwiTWF0cml4LmNvcHlDb2x1bW5Gcm9tIiwiTWF0cml4LmNvcHlDb2x1bW5UbyIsIk1hdHJpeC5jb3B5RnJvbSIsIk1hdHJpeC5jb3B5Um93RnJvbSIsIk1hdHJpeC5jb3B5Um93VG8iLCJNYXRyaXguY3JlYXRlQm94IiwiTWF0cml4LmNyZWF0ZUdyYWRpZW50Qm94IiwiTWF0cml4LmRlbHRhVHJhbnNmb3JtUG9pbnQiLCJNYXRyaXguaWRlbnRpdHkiLCJNYXRyaXguaW52ZXJ0IiwiTWF0cml4Lm11bHRpcGx5IiwiTWF0cml4LnJvdGF0ZSIsIk1hdHJpeC5zY2FsZSIsIk1hdHJpeC5zZXRUbyIsIk1hdHJpeC50b1N0cmluZyIsIk1hdHJpeC50cmFuc2Zvcm1Qb2ludCIsIk1hdHJpeC50cmFuc2xhdGUiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sS0FBSyxXQUFlLDRCQUE0QixDQUFDLENBQUM7QUFFekQsSUFBTyxhQUFhLFdBQWEsc0NBQXNDLENBQUMsQ0FBQztBQUV6RSxBQXVEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxNQUFNO0lBb0NYQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCR0E7SUFDSEEsU0EzREtBLE1BQU1BLENBMkRDQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxFQUFhQSxFQUFFQSxFQUFhQTtRQUFwRkMsaUJBQVlBLEdBQVpBLEtBQVlBO1FBQUVBLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFBRUEsaUJBQVlBLEdBQVpBLEtBQVlBO1FBQUVBLGtCQUFhQSxHQUFiQSxNQUFhQTtRQUFFQSxrQkFBYUEsR0FBYkEsTUFBYUE7UUFFL0ZBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO0lBQ2RBLENBQUNBO0lBRUREOzs7OztPQUtHQTtJQUNJQSxzQkFBS0EsR0FBWkE7UUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDckVBLENBQUNBO0lBRURGOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCR0E7SUFDSUEsdUJBQU1BLEdBQWJBLFVBQWNBLE1BQWFBO1FBRTFCRyxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMzQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1FBRVpBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1FBQzNDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUUzQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFFWkEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDMURBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO1FBQzFEQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUVESDs7Ozs7O09BTUdBO0lBQ0lBLCtCQUFjQSxHQUFyQkEsVUFBc0JBLE1BQWFBLEVBQUVBLFFBQWlCQTtRQUVyREksRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaEJBLE1BQU1BLFNBQVNBLEdBQUdBLE1BQU1BLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7UUFDakRBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFREo7Ozs7OztPQU1HQTtJQUNJQSw2QkFBWUEsR0FBbkJBLFVBQW9CQSxNQUFhQSxFQUFFQSxRQUFpQkE7UUFFbkRLLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2hCQSxNQUFNQSxJQUFJQSxhQUFhQSxDQUFDQSx3QkFBd0JBLEdBQUdBLE1BQU1BLEdBQUdBLDRCQUE0QkEsQ0FBQ0EsQ0FBQ0E7UUFDM0ZBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hCQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcEJBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUFDQSxJQUFJ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QSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUV6Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBO1lBQ25CQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDUEEsSUFBSUEsR0FBR0EsR0FBR0EsR0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDaEJBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDWkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDaEJBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1lBRWhCQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUMzQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDM0NBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLENBQUNBO0lBQ0ZBLENBQUNBO0lBR0RiOzs7Ozs7O09BT0dBO0lBQ0lBLHlCQUFRQSxHQUFmQSxVQUFnQkEsTUFBYUE7UUFFNUJjLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLE1BQU1BLEVBQUVBLENBQUNBO1FBRTFCQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3Q0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0NBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1FBQzdDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUU3Q0EsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDNURBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO1FBRTVEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUVEZDs7Ozs7Ozs7O09BU0dBO0lBQ0lBLHVCQUFNQSxHQUFiQSxVQUFjQSxLQUFZQTtRQUV6QmUsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDMUJBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBRTFCQSxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQTtRQUNqQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1FBRVpBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQTtRQUNqQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFFWkEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEdBQUdBLENBQUNBO1FBQ3BDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUVEZjs7Ozs7Ozs7Ozs7O09BWUdBO0lBQ0lBLHNCQUFLQSxHQUFaQSxVQUFhQSxFQUFTQSxFQUFFQSxFQUFTQTtRQUVoQ2dCLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBRWJBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBRWJBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2RBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBO0lBQ2ZBLENBQUNBO0lBRURoQjs7Ozs7Ozs7Ozs7Ozs7O09BZUdBO0lBQ0lBLHNCQUFLQSxHQUFaQSxVQUFhQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxFQUFTQSxFQUFFQSxFQUFTQTtRQUV4RWlCLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO0lBQ2RBLENBQUNBO0lBRURqQjs7Ozs7O09BTUdBO0lBQ0lBLHlCQUFRQSxHQUFmQTtRQUVDa0IsTUFBTUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0E7SUFDcElBLENBQUNBO0lBRURsQjs7Ozs7OztPQU9HQTtJQUNJQSwrQkFBY0EsR0FBckJBLFVBQXNCQSxLQUFXQTtRQUVoQ21CLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO0lBQ3hHQSxDQUFDQTtJQUVEbkI7Ozs7Ozs7T0FPR0E7SUFDSUEsMEJBQVNBLEdBQWhCQSxVQUFpQkEsRUFBU0EsRUFBRUEsRUFBU0E7UUFFcENvQixJQUFJQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUNkQSxJQUFJQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUNGcEIsYUFBQ0E7QUFBREEsQ0FsZ0JBLEFBa2dCQ0EsSUFBQTtBQUVELEFBQWdCLGlCQUFQLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW9tL01hdHJpeC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9pbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUG9pbnRcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgQXJndW1lbnRFcnJvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQXJndW1lbnRFcnJvclwiKTtcblxuLyoqXG4gKiBUaGUgTWF0cml4IGNsYXNzIHJlcHJlc2VudHMgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggdGhhdCBkZXRlcm1pbmVzIGhvdyB0b1xuICogbWFwIHBvaW50cyBmcm9tIG9uZSBjb29yZGluYXRlIHNwYWNlIHRvIGFub3RoZXIuIFlvdSBjYW4gcGVyZm9ybSB2YXJpb3VzXG4gKiBncmFwaGljYWwgdHJhbnNmb3JtYXRpb25zIG9uIGEgZGlzcGxheSBvYmplY3QgYnkgc2V0dGluZyB0aGUgcHJvcGVydGllcyBvZlxuICogYSBNYXRyaXggb2JqZWN0LCBhcHBseWluZyB0aGF0IE1hdHJpeCBvYmplY3QgdG8gdGhlIDxjb2RlPm1hdHJpeDwvY29kZT5cbiAqIHByb3BlcnR5IG9mIGEgVHJhbnNmb3JtIG9iamVjdCwgYW5kIHRoZW4gYXBwbHlpbmcgdGhhdCBUcmFuc2Zvcm0gb2JqZWN0IGFzXG4gKiB0aGUgPGNvZGU+dHJhbnNmb3JtPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFRoZXNlXG4gKiB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnMgaW5jbHVkZSB0cmFuc2xhdGlvbig8aT54PC9pPiBhbmQgPGk+eTwvaT5cbiAqIHJlcG9zaXRpb25pbmcpLCByb3RhdGlvbiwgc2NhbGluZywgYW5kIHNrZXdpbmcuXG4gKlxuICogPHA+VG9nZXRoZXIgdGhlc2UgdHlwZXMgb2YgdHJhbnNmb3JtYXRpb25zIGFyZSBrbm93biBhcyA8aT5hZmZpbmVcbiAqIHRyYW5zZm9ybWF0aW9uczwvaT4uIEFmZmluZSB0cmFuc2Zvcm1hdGlvbnMgcHJlc2VydmUgdGhlIHN0cmFpZ2h0bmVzcyBvZlxuICogbGluZXMgd2hpbGUgdHJhbnNmb3JtaW5nLCBzbyB0aGF0IHBhcmFsbGVsIGxpbmVzIHN0YXkgcGFyYWxsZWwuPC9wPlxuICpcbiAqIDxwPlRvIGFwcGx5IGEgdHJhbnNmb3JtYXRpb24gbWF0cml4IHRvIGEgZGlzcGxheSBvYmplY3QsIHlvdSBjcmVhdGUgYVxuICogVHJhbnNmb3JtIG9iamVjdCwgc2V0IGl0cyA8Y29kZT5tYXRyaXg8L2NvZGU+IHByb3BlcnR5IHRvIHRoZVxuICogdHJhbnNmb3JtYXRpb24gbWF0cml4LCBhbmQgdGhlbiBzZXQgdGhlIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkgb2ZcbiAqIHRoZSBkaXNwbGF5IG9iamVjdCB0byB0aGUgVHJhbnNmb3JtIG9iamVjdC4gTWF0cml4IG9iamVjdHMgYXJlIGFsc28gdXNlZCBhc1xuICogcGFyYW1ldGVycyBvZiBzb21lIG1ldGhvZHMsIHN1Y2ggYXMgdGhlIGZvbGxvd2luZzo8L3A+XG4gKlxuICogPHVsPlxuICogICA8bGk+VGhlIDxjb2RlPmRyYXcoKTwvY29kZT4gbWV0aG9kIG9mIGEgQml0bWFwRGF0YSBvYmplY3Q8L2xpPlxuICogICA8bGk+VGhlIDxjb2RlPmJlZ2luQml0bWFwRmlsbCgpPC9jb2RlPiBtZXRob2QsXG4gKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiBtZXRob2QsIG9yXG4gKiA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiBtZXRob2Qgb2YgYSBHcmFwaGljcyBvYmplY3Q8L2xpPlxuICogPC91bD5cbiAqXG4gKiA8cD5BIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCBvYmplY3QgaXMgYSAzIHggMyBtYXRyaXggd2l0aCB0aGUgZm9sbG93aW5nXG4gKiBjb250ZW50czo8L3A+XG4gKlxuICogPHA+SW4gdHJhZGl0aW9uYWwgdHJhbnNmb3JtYXRpb24gbWF0cml4ZXMsIHRoZSA8Y29kZT51PC9jb2RlPixcbiAqIDxjb2RlPnY8L2NvZGU+LCBhbmQgPGNvZGU+dzwvY29kZT4gcHJvcGVydGllcyBwcm92aWRlIGV4dHJhIGNhcGFiaWxpdGllcy5cbiAqIFRoZSBNYXRyaXggY2xhc3MgY2FuIG9ubHkgb3BlcmF0ZSBpbiB0d28tZGltZW5zaW9uYWwgc3BhY2UsIHNvIGl0IGFsd2F5c1xuICogYXNzdW1lcyB0aGF0IHRoZSBwcm9wZXJ0eSB2YWx1ZXMgPGNvZGU+dTwvY29kZT4gYW5kIDxjb2RlPnY8L2NvZGU+IGFyZSAwLjAsXG4gKiBhbmQgdGhhdCB0aGUgcHJvcGVydHkgdmFsdWUgPGNvZGU+dzwvY29kZT4gaXMgMS4wLiBUaGUgZWZmZWN0aXZlIHZhbHVlcyBvZlxuICogdGhlIG1hdHJpeCBhcmUgYXMgZm9sbG93czo8L3A+XG4gKlxuICogPHA+WW91IGNhbiBnZXQgYW5kIHNldCB0aGUgdmFsdWVzIG9mIGFsbCBzaXggb2YgdGhlIG90aGVyIHByb3BlcnRpZXMgaW4gYVxuICogTWF0cml4IG9iamVjdDogPGNvZGU+YTwvY29kZT4sIDxjb2RlPmI8L2NvZGU+LCA8Y29kZT5jPC9jb2RlPixcbiAqIDxjb2RlPmQ8L2NvZGU+LCA8Y29kZT50eDwvY29kZT4sIGFuZCA8Y29kZT50eTwvY29kZT4uPC9wPlxuICpcbiAqIDxwPlRoZSBNYXRyaXggY2xhc3Mgc3VwcG9ydHMgdGhlIGZvdXIgbWFqb3IgdHlwZXMgb2YgdHJhbnNmb3JtYXRpb25zOlxuICogdHJhbnNsYXRpb24sIHNjYWxpbmcsIHJvdGF0aW9uLCBhbmQgc2tld2luZy4gWW91IGNhbiBzZXQgdGhyZWUgb2YgdGhlc2VcbiAqIHRyYW5zZm9ybWF0aW9ucyBieSB1c2luZyBzcGVjaWFsaXplZCBtZXRob2RzLCBhcyBkZXNjcmliZWQgaW4gdGhlIGZvbGxvd2luZ1xuICogdGFibGU6IDwvcD5cbiAqXG4gKiA8cD5FYWNoIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uIGFsdGVycyB0aGUgY3VycmVudCBtYXRyaXggcHJvcGVydGllcyBzb1xuICogdGhhdCB5b3UgY2FuIGVmZmVjdGl2ZWx5IGNvbWJpbmUgbXVsdGlwbGUgdHJhbnNmb3JtYXRpb25zLiBUbyBkbyB0aGlzLCB5b3VcbiAqIGNhbGwgbW9yZSB0aGFuIG9uZSB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbiBiZWZvcmUgYXBwbHlpbmcgdGhlIG1hdHJpeCB0b1xuICogaXRzIGRpc3BsYXkgb2JqZWN0IHRhcmdldChieSB1c2luZyB0aGUgPGNvZGU+dHJhbnNmb3JtPC9jb2RlPiBwcm9wZXJ0eSBvZlxuICogdGhhdCBkaXNwbGF5IG9iamVjdCkuPC9wPlxuICpcbiAqIDxwPlVzZSB0aGUgPGNvZGU+bmV3IE1hdHJpeCgpPC9jb2RlPiBjb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBNYXRyaXggb2JqZWN0XG4gKiBiZWZvcmUgeW91IGNhbiBjYWxsIHRoZSBtZXRob2RzIG9mIHRoZSBNYXRyaXggb2JqZWN0LjwvcD5cbiAqL1xuY2xhc3MgTWF0cml4XG57XG5cdC8qKlxuXHQgKiBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlIDxpPng8L2k+IGF4aXNcblx0ICogd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLlxuXHQgKi9cblx0cHVibGljIGE6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlIDxpPnk8L2k+IGF4aXNcblx0ICogd2hlbiByb3RhdGluZyBvciBza2V3aW5nIGFuIGltYWdlLlxuXHQgKi9cblx0cHVibGljIGI6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlIDxpPng8L2k+IGF4aXNcblx0ICogd2hlbiByb3RhdGluZyBvciBza2V3aW5nIGFuIGltYWdlLlxuXHQgKi9cblx0cHVibGljIGM6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlIDxpPnk8L2k+IGF4aXNcblx0ICogd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLlxuXHQgKi9cblx0cHVibGljIGQ6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgZGlzdGFuY2UgYnkgd2hpY2ggdG8gdHJhbnNsYXRlIGVhY2ggcG9pbnQgYWxvbmcgdGhlIDxpPng8L2k+IGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgdHg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgZGlzdGFuY2UgYnkgd2hpY2ggdG8gdHJhbnNsYXRlIGVhY2ggcG9pbnQgYWxvbmcgdGhlIDxpPnk8L2k+IGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgdHk6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hdHJpeCBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMuIEluIG1hdHJpeFxuXHQgKiBub3RhdGlvbiwgdGhlIHByb3BlcnRpZXMgYXJlIG9yZ2FuaXplZCBsaWtlIHRoaXM6XG5cdCAqXG5cdCAqIDxwPklmIHlvdSBkbyBub3QgcHJvdmlkZSBhbnkgcGFyYW1ldGVycyB0byB0aGUgPGNvZGU+bmV3IE1hdHJpeCgpPC9jb2RlPlxuXHQgKiBjb25zdHJ1Y3RvciwgaXQgY3JlYXRlcyBhbiA8aT5pZGVudGl0eSBtYXRyaXg8L2k+IHdpdGggdGhlIGZvbGxvd2luZ1xuXHQgKiB2YWx1ZXM6PC9wPlxuXHQgKlxuXHQgKiA8cD5JbiBtYXRyaXggbm90YXRpb24sIHRoZSBpZGVudGl0eSBtYXRyaXggbG9va3MgbGlrZSB0aGlzOjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGEgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcblx0ICogICAgICAgICAgIDxpPng8L2k+IGF4aXMgd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLlxuXHQgKiBAcGFyYW0gYiAgVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZVxuXHQgKiAgICAgICAgICAgPGk+eTwvaT4gYXhpcyB3aGVuIHJvdGF0aW5nIG9yIHNrZXdpbmcgYW4gaW1hZ2UuXG5cdCAqIEBwYXJhbSBjICBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlXG5cdCAqICAgICAgICAgICA8aT54PC9pPiBheGlzIHdoZW4gcm90YXRpbmcgb3Igc2tld2luZyBhbiBpbWFnZS5cblx0ICogQHBhcmFtIGQgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcblx0ICogICAgICAgICAgIDxpPnk8L2k+IGF4aXMgd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLi5cblx0ICogQHBhcmFtIHR4IFRoZSBkaXN0YW5jZSBieSB3aGljaCB0byB0cmFuc2xhdGUgZWFjaCBwb2ludCBhbG9uZyB0aGUgPGk+eDwvaT5cblx0ICogICAgICAgICAgIGF4aXMuXG5cdCAqIEBwYXJhbSB0eSBUaGUgZGlzdGFuY2UgYnkgd2hpY2ggdG8gdHJhbnNsYXRlIGVhY2ggcG9pbnQgYWxvbmcgdGhlIDxpPnk8L2k+XG5cdCAqICAgICAgICAgICBheGlzLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoYTpudW1iZXIgPSAxLCBiOm51bWJlciA9IDAsIGM6bnVtYmVyID0gMCwgZDpudW1iZXIgPSAxLCB0eDpudW1iZXIgPSAwLCB0eTpudW1iZXIgPSAwKVxuXHR7XG5cdFx0dGhpcy5hID0gYTtcblx0XHR0aGlzLmIgPSBiO1xuXHRcdHRoaXMuYyA9IGM7XG5cdFx0dGhpcy5kID0gZDtcblx0XHR0aGlzLnR4ID0gdHg7XG5cdFx0dGhpcy50eSA9IHR5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgTWF0cml4IG9iamVjdCB0aGF0IGlzIGEgY2xvbmUgb2YgdGhpcyBtYXRyaXgsIHdpdGggYW4gZXhhY3Rcblx0ICogY29weSBvZiB0aGUgY29udGFpbmVkIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiBBIE1hdHJpeCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpNYXRyaXhcblx0e1xuXHRcdHJldHVybiBuZXcgTWF0cml4KHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMsIHRoaXMuZCwgdGhpcy50eCwgdGhpcy50eSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uY2F0ZW5hdGVzIGEgbWF0cml4IHdpdGggdGhlIGN1cnJlbnQgbWF0cml4LCBlZmZlY3RpdmVseSBjb21iaW5pbmcgdGhlXG5cdCAqIGdlb21ldHJpYyBlZmZlY3RzIG9mIHRoZSB0d28uIEluIG1hdGhlbWF0aWNhbCB0ZXJtcywgY29uY2F0ZW5hdGluZyB0d29cblx0ICogbWF0cml4ZXMgaXMgdGhlIHNhbWUgYXMgY29tYmluaW5nIHRoZW0gdXNpbmcgbWF0cml4IG11bHRpcGxpY2F0aW9uLlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgaWYgbWF0cml4IDxjb2RlPm0xPC9jb2RlPiBzY2FsZXMgYW4gb2JqZWN0IGJ5IGEgZmFjdG9yIG9mXG5cdCAqIGZvdXIsIGFuZCBtYXRyaXggPGNvZGU+bTI8L2NvZGU+IHJvdGF0ZXMgYW4gb2JqZWN0IGJ5IDEuNTcwNzk2MzI2Nzk0OVxuXHQgKiByYWRpYW5zKDxjb2RlPk1hdGguUEkvMjwvY29kZT4pLCB0aGVuIDxjb2RlPm0xLmNvbmNhdChtMik8L2NvZGU+XG5cdCAqIHRyYW5zZm9ybXMgPGNvZGU+bTE8L2NvZGU+IGludG8gYSBtYXRyaXggdGhhdCBzY2FsZXMgYW4gb2JqZWN0IGJ5IGEgZmFjdG9yXG5cdCAqIG9mIGZvdXIgYW5kIHJvdGF0ZXMgdGhlIG9iamVjdCBieSA8Y29kZT5NYXRoLlBJLzI8L2NvZGU+IHJhZGlhbnMuIDwvcD5cblx0ICpcblx0ICogPHA+VGhpcyBtZXRob2QgcmVwbGFjZXMgdGhlIHNvdXJjZSBtYXRyaXggd2l0aCB0aGUgY29uY2F0ZW5hdGVkIG1hdHJpeC4gSWZcblx0ICogeW91IHdhbnQgdG8gY29uY2F0ZW5hdGUgdHdvIG1hdHJpeGVzIHdpdGhvdXQgYWx0ZXJpbmcgZWl0aGVyIG9mIHRoZSB0d29cblx0ICogc291cmNlIG1hdHJpeGVzLCBmaXJzdCBjb3B5IHRoZSBzb3VyY2UgbWF0cml4IGJ5IHVzaW5nIHRoZVxuXHQgKiA8Y29kZT5jbG9uZSgpPC9jb2RlPiBtZXRob2QsIGFzIHNob3duIGluIHRoZSBDbGFzcyBFeGFtcGxlcyBzZWN0aW9uLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIG1hdHJpeCBUaGUgbWF0cml4IHRvIGJlIGNvbmNhdGVuYXRlZCB0byB0aGUgc291cmNlIG1hdHJpeC5cblx0ICovXG5cdHB1YmxpYyBjb25jYXQobWF0cml4Ok1hdHJpeCk6dm9pZFxuXHR7XG5cdFx0dmFyIGExID0gdGhpcy5hKm1hdHJpeC5hICsgdGhpcy5iKm1hdHJpeC5jO1xuXHRcdHRoaXMuYiA9IHRoaXMuYSptYXRyaXguYiArIHRoaXMuYiptYXRyaXguZDtcblx0XHR0aGlzLmEgPSBhMTtcblxuXHRcdHZhciBjMSA9IHRoaXMuYyptYXRyaXguYSArIHRoaXMuZCptYXRyaXguYztcblx0XHR0aGlzLmQgPSB0aGlzLmMqbWF0cml4LmIgKyB0aGlzLmQqbWF0cml4LmQ7XG5cblx0XHR0aGlzLmMgPSBjMTtcblxuXHRcdHZhciB0eDEgPSB0aGlzLnR4Km1hdHJpeC5hICsgdGhpcy50eSptYXRyaXguYyArIG1hdHJpeC50eDtcblx0XHR0aGlzLnR5ID0gdGhpcy50eCptYXRyaXguYiArIHRoaXMudHkqbWF0cml4LmQgKyBtYXRyaXgudHk7XG5cdFx0dGhpcy50eCA9IHR4MTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgYSBWZWN0b3IzRCBvYmplY3QgaW50byBzcGVjaWZpYyBjb2x1bW4gb2YgdGhlIGNhbGxpbmcgTWF0cml4M0Rcblx0ICogb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gY29sdW1uICAgVGhlIGNvbHVtbiBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEgZnJvbS5cblx0ICogQHBhcmFtIHZlY3RvcjNEIFRoZSBWZWN0b3IzRCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGNvcHlDb2x1bW5Gcm9tKGNvbHVtbjpudW1iZXIsIHZlY3RvcjNEOlZlY3RvcjNEKTp2b2lkXG5cdHtcblx0XHRpZiAoY29sdW1uID4gMikge1xuXHRcdFx0dGhyb3cgXCJDb2x1bW4gXCIgKyBjb2x1bW4gKyBcIiBvdXQgb2YgYm91bmRzICgyKVwiO1xuXHRcdH0gZWxzZSBpZiAoY29sdW1uID09IDApIHtcblx0XHRcdHRoaXMuYSA9IHZlY3RvcjNELng7XG5cdFx0XHR0aGlzLmMgPSB2ZWN0b3IzRC55O1xuXHRcdH0gZWxzZSBpZiAoY29sdW1uID09IDEpIHtcblx0XHRcdHRoaXMuYiA9IHZlY3RvcjNELng7XG5cdFx0XHR0aGlzLmQgPSB2ZWN0b3IzRC55O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnR4ID0gdmVjdG9yM0QueDtcblx0XHRcdHRoaXMudHkgPSB2ZWN0b3IzRC55O1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgc3BlY2lmaWMgY29sdW1uIG9mIHRoZSBjYWxsaW5nIE1hdHJpeCBvYmplY3QgaW50byB0aGUgVmVjdG9yM0Rcblx0ICogb2JqZWN0LiBUaGUgdyBlbGVtZW50IG9mIHRoZSBWZWN0b3IzRCBvYmplY3Qgd2lsbCBub3QgYmUgY2hhbmdlZC5cblx0ICpcblx0ICogQHBhcmFtIGNvbHVtbiAgIFRoZSBjb2x1bW4gZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhIGZyb20uXG5cdCAqIEBwYXJhbSB2ZWN0b3IzRCBUaGUgVmVjdG9yM0Qgb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSB0aGUgZGF0YS5cblx0ICovXG5cdHB1YmxpYyBjb3B5Q29sdW1uVG8oY29sdW1uOm51bWJlciwgdmVjdG9yM0Q6VmVjdG9yM0QpOnZvaWRcblx0e1xuXHRcdGlmIChjb2x1bW4gPiAyKSB7XG5cdFx0XHR0aHJvdyBuZXcgQXJndW1lbnRFcnJvcihcIkFyZ3VtZW50RXJyb3IsIENvbHVtbiBcIiArIGNvbHVtbiArIFwiIG91dCBvZiBib3VuZHMgWzAsIC4uLiwgMl1cIik7XG5cdFx0fSBlbHNlIGlmIChjb2x1bW4gPT0gMCkge1xuXHRcdFx0dmVjdG9yM0QueCA9IHRoaXMuYTtcblx0XHRcdHZlY3RvcjNELnkgPSB0aGlzLmM7XG5cdFx0XHR2ZWN0b3IzRC56ID0gMDtcblx0XHR9IGVsc2UgaWYgKGNvbHVtbiA9PSAxKSB7XG5cdFx0XHR2ZWN0b3IzRC54ID0gdGhpcy5iO1xuXHRcdFx0dmVjdG9yM0QueSA9IHRoaXMuZDtcblx0XHRcdHZlY3RvcjNELnogPSAwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2ZWN0b3IzRC54ID0gdGhpcy50eDtcblx0XHRcdHZlY3RvcjNELnkgPSB0aGlzLnR5O1xuXHRcdFx0dmVjdG9yM0QueiA9IDE7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENvcGllcyBhbGwgb2YgdGhlIG1hdHJpeCBkYXRhIGZyb20gdGhlIHNvdXJjZSBQb2ludCBvYmplY3QgaW50byB0aGVcblx0ICogY2FsbGluZyBNYXRyaXggb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gc291cmNlTWF0cml4IFRoZSBNYXRyaXggb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSB0aGUgZGF0YS5cblx0ICovXG5cdHB1YmxpYyBjb3B5RnJvbShzb3VyY2VNYXRyaXg6TWF0cml4KTp2b2lkXG5cdHtcblx0XHR0aGlzLmEgPSBzb3VyY2VNYXRyaXguYTtcblx0XHR0aGlzLmIgPSBzb3VyY2VNYXRyaXguYjtcblx0XHR0aGlzLmMgPSBzb3VyY2VNYXRyaXguYztcblx0XHR0aGlzLmQgPSBzb3VyY2VNYXRyaXguZDtcblx0XHR0aGlzLnR4ID0gc291cmNlTWF0cml4LnR4O1xuXHRcdHRoaXMudHkgPSBzb3VyY2VNYXRyaXgudHk7XG5cdH1cblxuXHQvKipcblx0ICogQ29waWVzIGEgVmVjdG9yM0Qgb2JqZWN0IGludG8gc3BlY2lmaWMgcm93IG9mIHRoZSBjYWxsaW5nIE1hdHJpeCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSByb3cgICAgICBUaGUgcm93IGZyb20gd2hpY2ggdG8gY29weSB0aGUgZGF0YSBmcm9tLlxuXHQgKiBAcGFyYW0gdmVjdG9yM0QgVGhlIFZlY3RvcjNEIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgY29weVJvd0Zyb20ocm93Om51bWJlciwgdmVjdG9yM0Q6VmVjdG9yM0QpOnZvaWRcblx0e1xuXHRcdGlmIChyb3cgPiAyKSB7XG5cdFx0XHR0aHJvdyBuZXcgQXJndW1lbnRFcnJvcihcIkFyZ3VtZW50RXJyb3IsIFJvdyBcIiArIHJvdyArIFwiIG91dCBvZiBib3VuZHMgWzAsIC4uLiwgMl1cIik7XG5cdFx0fSBlbHNlIGlmIChyb3cgPT0gMCkge1xuXHRcdFx0dGhpcy5hID0gdmVjdG9yM0QueDtcblx0XHRcdHRoaXMuYyA9IHZlY3RvcjNELnk7XG5cdFx0fSBlbHNlIGlmIChyb3cgPT0gMSkge1xuXHRcdFx0dGhpcy5iID0gdmVjdG9yM0QueDtcblx0XHRcdHRoaXMuZCA9IHZlY3RvcjNELnk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudHggPSB2ZWN0b3IzRC54O1xuXHRcdFx0dGhpcy50eSA9IHZlY3RvcjNELnk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENvcGllcyBzcGVjaWZpYyByb3cgb2YgdGhlIGNhbGxpbmcgTWF0cml4IG9iamVjdCBpbnRvIHRoZSBWZWN0b3IzRCBvYmplY3QuXG5cdCAqIFRoZSB3IGVsZW1lbnQgb2YgdGhlIFZlY3RvcjNEIG9iamVjdCB3aWxsIG5vdCBiZSBjaGFuZ2VkLlxuXHQgKlxuXHQgKiBAcGFyYW0gcm93ICAgICAgVGhlIHJvdyBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEgZnJvbS5cblx0ICogQHBhcmFtIHZlY3RvcjNEIFRoZSBWZWN0b3IzRCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGNvcHlSb3dUbyhyb3c6bnVtYmVyLCB2ZWN0b3IzRDpWZWN0b3IzRCk6dm9pZFxuXHR7XG5cdFx0aWYgKHJvdyA+IDIpIHtcblx0XHRcdHRocm93IG5ldyBBcmd1bWVudEVycm9yKFwiQXJndW1lbnRFcnJvciwgUm93IFwiICsgcm93ICsgXCIgb3V0IG9mIGJvdW5kcyBbMCwgLi4uLCAyXVwiKTtcblx0XHR9IGVsc2UgaWYgKHJvdyA9PSAwKSB7XG5cdFx0XHR2ZWN0b3IzRC54ID0gdGhpcy5hO1xuXHRcdFx0dmVjdG9yM0QueSA9IHRoaXMuYjtcblx0XHRcdHZlY3RvcjNELnogPSB0aGlzLnR4O1xuXHRcdH0gZWxzZSBpZiAocm93ID09IDEpIHtcblx0XHRcdHZlY3RvcjNELnggPSB0aGlzLmM7XG5cdFx0XHR2ZWN0b3IzRC55ID0gdGhpcy5kO1xuXHRcdFx0dmVjdG9yM0QueiA9IHRoaXMudHk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZlY3RvcjNELnNldFRvKDAsIDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJbmNsdWRlcyBwYXJhbWV0ZXJzIGZvciBzY2FsaW5nLCByb3RhdGlvbiwgYW5kIHRyYW5zbGF0aW9uLiBXaGVuIGFwcGxpZWRcblx0ICogdG8gYSBtYXRyaXggaXQgc2V0cyB0aGUgbWF0cml4J3MgdmFsdWVzIGJhc2VkIG9uIHRob3NlIHBhcmFtZXRlcnMuXG5cdCAqXG5cdCAqIDxwPlVzaW5nIHRoZSA8Y29kZT5jcmVhdGVCb3goKTwvY29kZT4gbWV0aG9kIGxldHMgeW91IG9idGFpbiB0aGUgc2FtZVxuXHQgKiBtYXRyaXggYXMgeW91IHdvdWxkIGlmIHlvdSBhcHBsaWVkIHRoZSA8Y29kZT5pZGVudGl0eSgpPC9jb2RlPixcblx0ICogPGNvZGU+cm90YXRlKCk8L2NvZGU+LCA8Y29kZT5zY2FsZSgpPC9jb2RlPiwgYW5kIDxjb2RlPnRyYW5zbGF0ZSgpPC9jb2RlPlxuXHQgKiBtZXRob2RzIGluIHN1Y2Nlc3Npb24uIEZvciBleGFtcGxlLCA8Y29kZT5tYXQxLmNyZWF0ZUJveCgyLDIsTWF0aC5QSS80LFxuXHQgKiAxMDAsIDEwMCk8L2NvZGU+IGhhcyB0aGUgc2FtZSBlZmZlY3QgYXMgdGhlIGZvbGxvd2luZzo8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBzY2FsZVggICBUaGUgZmFjdG9yIGJ5IHdoaWNoIHRvIHNjYWxlIGhvcml6b250YWxseS5cblx0ICogQHBhcmFtIHNjYWxlWSAgIFRoZSBmYWN0b3IgYnkgd2hpY2ggc2NhbGUgdmVydGljYWxseS5cblx0ICogQHBhcmFtIHJvdGF0aW9uIFRoZSBhbW91bnQgdG8gcm90YXRlLCBpbiByYWRpYW5zLlxuXHQgKiBAcGFyYW0gdHggICAgICAgVGhlIG51bWJlciBvZiBwaXhlbHMgdG8gdHJhbnNsYXRlKG1vdmUpIHRvIHRoZSByaWdodFxuXHQgKiAgICAgICAgICAgICAgICAgYWxvbmcgdGhlIDxpPng8L2k+IGF4aXMuXG5cdCAqIEBwYXJhbSB0eSAgICAgICBUaGUgbnVtYmVyIG9mIHBpeGVscyB0byB0cmFuc2xhdGUobW92ZSkgZG93biBhbG9uZyB0aGVcblx0ICogICAgICAgICAgICAgICAgIDxpPnk8L2k+IGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgY3JlYXRlQm94KHNjYWxlWDpudW1iZXIsIHNjYWxlWTpudW1iZXIsIHJvdGF0aW9uOm51bWJlciA9IDAsIHR4Om51bWJlciA9IDAsIHR5Om51bWJlciA9IDApOnZvaWRcblx0e1xuXHRcdHRoaXMuYSA9IHNjYWxlWDtcblx0XHR0aGlzLmQgPSBzY2FsZVk7XG5cdFx0dGhpcy5iID0gcm90YXRpb247XG5cdFx0dGhpcy50eCA9IHR4O1xuXHRcdHRoaXMudHkgPSB0eTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIHRoZSBzcGVjaWZpYyBzdHlsZSBvZiBtYXRyaXggZXhwZWN0ZWQgYnkgdGhlXG5cdCAqIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+IGFuZCA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPlxuXHQgKiBtZXRob2RzIG9mIHRoZSBHcmFwaGljcyBjbGFzcy4gV2lkdGggYW5kIGhlaWdodCBhcmUgc2NhbGVkIHRvIGFcblx0ICogPGNvZGU+c2NhbGVYPC9jb2RlPi88Y29kZT5zY2FsZVk8L2NvZGU+IHBhaXIgYW5kIHRoZVxuXHQgKiA8Y29kZT50eDwvY29kZT4vPGNvZGU+dHk8L2NvZGU+IHZhbHVlcyBhcmUgb2Zmc2V0IGJ5IGhhbGYgdGhlIHdpZHRoIGFuZFxuXHQgKiBoZWlnaHQuXG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciBhIGdyYWRpZW50IHdpdGggdGhlIGZvbGxvd2luZ1xuXHQgKiBjaGFyYWN0ZXJpc3RpY3M6PC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPjxjb2RlPkdyYWRpZW50VHlwZS5MSU5FQVI8L2NvZGU+PC9saT5cblx0ICogICA8bGk+VHdvIGNvbG9ycywgZ3JlZW4gYW5kIGJsdWUsIHdpdGggdGhlIHJhdGlvcyBhcnJheSBzZXQgdG8gPGNvZGU+WzAsXG5cdCAqIDI1NV08L2NvZGU+PC9saT5cblx0ICogICA8bGk+PGNvZGU+U3ByZWFkTWV0aG9kLlBBRDwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5JbnRlcnBvbGF0aW9uTWV0aG9kLkxJTkVBUl9SR0I8L2NvZGU+PC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+VGhlIGZvbGxvd2luZyBpbGx1c3RyYXRpb25zIHNob3cgZ3JhZGllbnRzIGluIHdoaWNoIHRoZSBtYXRyaXggd2FzXG5cdCAqIGRlZmluZWQgdXNpbmcgdGhlIDxjb2RlPmNyZWF0ZUdyYWRpZW50Qm94KCk8L2NvZGU+IG1ldGhvZCB3aXRoIGRpZmZlcmVudFxuXHQgKiBwYXJhbWV0ZXIgc2V0dGluZ3M6PC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gd2lkdGggICAgVGhlIHdpZHRoIG9mIHRoZSBncmFkaWVudCBib3guXG5cdCAqIEBwYXJhbSBoZWlnaHQgICBUaGUgaGVpZ2h0IG9mIHRoZSBncmFkaWVudCBib3guXG5cdCAqIEBwYXJhbSByb3RhdGlvbiBUaGUgYW1vdW50IHRvIHJvdGF0ZSwgaW4gcmFkaWFucy5cblx0ICogQHBhcmFtIHR4ICAgICAgIFRoZSBkaXN0YW5jZSwgaW4gcGl4ZWxzLCB0byB0cmFuc2xhdGUgdG8gdGhlIHJpZ2h0IGFsb25nXG5cdCAqICAgICAgICAgICAgICAgICB0aGUgPGk+eDwvaT4gYXhpcy4gVGhpcyB2YWx1ZSBpcyBvZmZzZXQgYnkgaGFsZiBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgIDxjb2RlPndpZHRoPC9jb2RlPiBwYXJhbWV0ZXIuXG5cdCAqIEBwYXJhbSB0eSAgICAgICBUaGUgZGlzdGFuY2UsIGluIHBpeGVscywgdG8gdHJhbnNsYXRlIGRvd24gYWxvbmcgdGhlXG5cdCAqICAgICAgICAgICAgICAgICA8aT55PC9pPiBheGlzLiBUaGlzIHZhbHVlIGlzIG9mZnNldCBieSBoYWxmIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwYXJhbWV0ZXIuXG5cdCAqL1xuXHRwdWJsaWMgY3JlYXRlR3JhZGllbnRCb3god2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCByb3RhdGlvbjpudW1iZXIgPSAwLCB0eDpudW1iZXIgPSAwLCB0eTpudW1iZXIgPSAwKTp2b2lkXG5cdHtcblx0XHR0aGlzLmEgPSB3aWR0aC8xNjM4LjQ7XG5cdFx0dGhpcy5kID0gaGVpZ2h0LzE2MzguNDtcblxuXHRcdGlmIChyb3RhdGlvbiAhPSAwLjApIHtcblx0XHRcdHZhciBjb3MgPSBNYXRoLmNvcyhyb3RhdGlvbik7XG5cdFx0XHR2YXIgc2luID0gTWF0aC5zaW4ocm90YXRpb24pO1xuXG5cdFx0XHR0aGlzLmIgPSBzaW4qdGhpcy5kO1xuXHRcdFx0dGhpcy5jID0gLXNpbip0aGlzLmE7XG5cdFx0XHR0aGlzLmEgKj0gY29zO1xuXHRcdFx0dGhpcy5kICo9IGNvcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5iID0gdGhpcy5jID0gMDtcblx0XHR9XG5cblx0XHR0aGlzLnR4ID0gdHggKyB3aWR0aC8yO1xuXHRcdHRoaXMudHkgPSB0eSArIGhlaWdodC8yO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGEgcG9pbnQgaW4gdGhlIHByZXRyYW5zZm9ybSBjb29yZGluYXRlIHNwYWNlLCByZXR1cm5zIHRoZVxuXHQgKiBjb29yZGluYXRlcyBvZiB0aGF0IHBvaW50IGFmdGVyIHRoZSB0cmFuc2Zvcm1hdGlvbiBvY2N1cnMuIFVubGlrZSB0aGVcblx0ICogc3RhbmRhcmQgdHJhbnNmb3JtYXRpb24gYXBwbGllZCB1c2luZyB0aGUgPGNvZGU+dHJhbnNmb3JtUG9pbnQoKTwvY29kZT5cblx0ICogbWV0aG9kLCB0aGUgPGNvZGU+ZGVsdGFUcmFuc2Zvcm1Qb2ludCgpPC9jb2RlPiBtZXRob2QncyB0cmFuc2Zvcm1hdGlvblxuXHQgKiBkb2VzIG5vdCBjb25zaWRlciB0aGUgdHJhbnNsYXRpb24gcGFyYW1ldGVycyA8Y29kZT50eDwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPnR5PC9jb2RlPi5cblx0ICpcblx0ICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCBmb3Igd2hpY2ggeW91IHdhbnQgdG8gZ2V0IHRoZSByZXN1bHQgb2YgdGhlIG1hdHJpeFxuXHQgKiAgICAgICAgICAgICAgdHJhbnNmb3JtYXRpb24uXG5cdCAqIEByZXR1cm4gVGhlIHBvaW50IHJlc3VsdGluZyBmcm9tIGFwcGx5aW5nIHRoZSBtYXRyaXggdHJhbnNmb3JtYXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgZGVsdGFUcmFuc2Zvcm1Qb2ludChwb2ludDpQb2ludCk6UG9pbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUG9pbnQocG9pbnQueCp0aGlzLmEgKyBwb2ludC55KnRoaXMuYywgcG9pbnQueCp0aGlzLmIgKyBwb2ludC55KnRoaXMuZCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBlYWNoIG1hdHJpeCBwcm9wZXJ0eSB0byBhIHZhbHVlIHRoYXQgY2F1c2VzIGEgbnVsbCB0cmFuc2Zvcm1hdGlvbi4gQW5cblx0ICogb2JqZWN0IHRyYW5zZm9ybWVkIGJ5IGFwcGx5aW5nIGFuIGlkZW50aXR5IG1hdHJpeCB3aWxsIGJlIGlkZW50aWNhbCB0byB0aGVcblx0ICogb3JpZ2luYWwuXG5cdCAqXG5cdCAqIDxwPkFmdGVyIGNhbGxpbmcgdGhlIDxjb2RlPmlkZW50aXR5KCk8L2NvZGU+IG1ldGhvZCwgdGhlIHJlc3VsdGluZyBtYXRyaXhcblx0ICogaGFzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczogPGNvZGU+YTwvY29kZT49MSwgPGNvZGU+YjwvY29kZT49MCxcblx0ICogPGNvZGU+YzwvY29kZT49MCwgPGNvZGU+ZDwvY29kZT49MSwgPGNvZGU+dHg8L2NvZGU+PTAsXG5cdCAqIDxjb2RlPnR5PC9jb2RlPj0wLjwvcD5cblx0ICpcblx0ICogPHA+SW4gbWF0cml4IG5vdGF0aW9uLCB0aGUgaWRlbnRpdHkgbWF0cml4IGxvb2tzIGxpa2UgdGhpczo8L3A+XG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgaWRlbnRpdHkoKTp2b2lkXG5cdHtcblx0XHR0aGlzLmEgPSAxO1xuXHRcdHRoaXMuYiA9IDA7XG5cdFx0dGhpcy5jID0gMDtcblx0XHR0aGlzLmQgPSAxO1xuXHRcdHRoaXMudHggPSAwO1xuXHRcdHRoaXMudHkgPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm1zIHRoZSBvcHBvc2l0ZSB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgb3JpZ2luYWwgbWF0cml4LiBZb3UgY2FuIGFwcGx5XG5cdCAqIGFuIGludmVydGVkIG1hdHJpeCB0byBhbiBvYmplY3QgdG8gdW5kbyB0aGUgdHJhbnNmb3JtYXRpb24gcGVyZm9ybWVkIHdoZW5cblx0ICogYXBwbHlpbmcgdGhlIG9yaWdpbmFsIG1hdHJpeC5cblx0ICovXG5cdHB1YmxpYyBpbnZlcnQoKTp2b2lkXG5cdHtcblx0XHR2YXIgbm9ybSA9IHRoaXMuYSp0aGlzLmQgLSB0aGlzLmIqdGhpcy5jO1xuXG5cdFx0aWYgKG5vcm0gPT0gMCkge1xuXHRcdFx0dGhpcy5hID0gdGhpcy5iID0gdGhpcy5jID0gdGhpcy5kID0gMDtcblx0XHRcdHRoaXMudHggPSAtdGhpcy50eDtcblx0XHRcdHRoaXMudHkgPSAtdGhpcy50eTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm9ybSA9IDEuMC9ub3JtO1xuXHRcdFx0dmFyIGExID0gdGhpcy5kKm5vcm07XG5cdFx0XHR0aGlzLmQgPSB0aGlzLmEqbm9ybTtcblx0XHRcdHRoaXMuYSA9IGExO1xuXHRcdFx0dGhpcy5iICo9IC1ub3JtO1xuXHRcdFx0dGhpcy5jICo9IC1ub3JtO1xuXG5cdFx0XHR2YXIgdHgxID0gLXRoaXMuYSp0aGlzLnR4IC0gdGhpcy5jKnRoaXMudHk7XG5cdFx0XHR0aGlzLnR5ID0gLXRoaXMuYip0aGlzLnR4IC0gdGhpcy5kKnRoaXMudHk7XG5cdFx0XHR0aGlzLnR4ID0gdHgxO1xuXHRcdH1cblx0fVxuXG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgTWF0cml4IG9iamVjdCB0aGF0IGlzIGEgY2xvbmUgb2YgdGhpcyBtYXRyaXgsIHdpdGggYW4gZXhhY3Rcblx0ICogY29weSBvZiB0aGUgY29udGFpbmVkIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIG1hdHJpeCBUaGUgbWF0cml4IGZvciB3aGljaCB5b3Ugd2FudCB0byBnZXQgdGhlIHJlc3VsdCBvZiB0aGUgbWF0cml4XG5cdCAqICAgICAgICAgICAgICAgdHJhbnNmb3JtYXRpb24uXG5cdCAqIEByZXR1cm4gQSBNYXRyaXggb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIG11bHRpcGx5KG1hdHJpeDpNYXRyaXgpOk1hdHJpeFxuXHR7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBNYXRyaXgoKTtcblxuXHRcdHJlc3VsdC5hID0gdGhpcy5hKm1hdHJpeC5hICsgdGhpcy5iKm1hdHJpeC5jO1xuXHRcdHJlc3VsdC5iID0gdGhpcy5hKm1hdHJpeC5iICsgdGhpcy5iKm1hdHJpeC5kO1xuXHRcdHJlc3VsdC5jID0gdGhpcy5jKm1hdHJpeC5hICsgdGhpcy5kKm1hdHJpeC5jO1xuXHRcdHJlc3VsdC5kID0gdGhpcy5jKm1hdHJpeC5iICsgdGhpcy5kKm1hdHJpeC5kO1xuXG5cdFx0cmVzdWx0LnR4ID0gdGhpcy50eCptYXRyaXguYSArIHRoaXMudHkqbWF0cml4LmMgKyBtYXRyaXgudHg7XG5cdFx0cmVzdWx0LnR5ID0gdGhpcy50eCptYXRyaXguYiArIHRoaXMudHkqbWF0cml4LmQgKyBtYXRyaXgudHk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgYSByb3RhdGlvbiB0cmFuc2Zvcm1hdGlvbiB0byB0aGUgTWF0cml4IG9iamVjdC5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPnJvdGF0ZSgpPC9jb2RlPiBtZXRob2QgYWx0ZXJzIHRoZSA8Y29kZT5hPC9jb2RlPixcblx0ICogPGNvZGU+YjwvY29kZT4sIDxjb2RlPmM8L2NvZGU+LCBhbmQgPGNvZGU+ZDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGVcblx0ICogTWF0cml4IG9iamVjdC4gSW4gbWF0cml4IG5vdGF0aW9uLCB0aGlzIGlzIHRoZSBzYW1lIGFzIGNvbmNhdGVuYXRpbmcgdGhlXG5cdCAqIGN1cnJlbnQgbWF0cml4IHdpdGggdGhlIGZvbGxvd2luZzo8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBhbmdsZSBUaGUgcm90YXRpb24gYW5nbGUgaW4gcmFkaWFucy5cblx0ICovXG5cdHB1YmxpYyByb3RhdGUoYW5nbGU6bnVtYmVyKTp2b2lkXG5cdHtcblx0XHR2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuXHRcdHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cblx0XHR2YXIgYTEgPSB0aGlzLmEqY29zIC0gdGhpcy5iKnNpbjtcblx0XHR0aGlzLmIgPSB0aGlzLmEqc2luICsgdGhpcy5iKmNvcztcblx0XHR0aGlzLmEgPSBhMTtcblxuXHRcdHZhciBjMSA9IHRoaXMuYypjb3MgLSB0aGlzLmQqc2luO1xuXHRcdHRoaXMuZCA9IHRoaXMuYypzaW4gKyB0aGlzLmQqY29zO1xuXHRcdHRoaXMuYyA9IGMxO1xuXG5cdFx0dmFyIHR4MSA9IHRoaXMudHgqY29zIC0gdGhpcy50eSpzaW47XG5cdFx0dGhpcy50eSA9IHRoaXMudHgqc2luICsgdGhpcy50eSpjb3M7XG5cdFx0dGhpcy50eCA9IHR4MTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIGEgc2NhbGluZyB0cmFuc2Zvcm1hdGlvbiB0byB0aGUgbWF0cml4LiBUaGUgPGk+eDwvaT4gYXhpcyBpc1xuXHQgKiBtdWx0aXBsaWVkIGJ5IDxjb2RlPnN4PC9jb2RlPiwgYW5kIHRoZSA8aT55PC9pPiBheGlzIGl0IGlzIG11bHRpcGxpZWQgYnlcblx0ICogPGNvZGU+c3k8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+c2NhbGUoKTwvY29kZT4gbWV0aG9kIGFsdGVycyB0aGUgPGNvZGU+YTwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmQ8L2NvZGU+IHByb3BlcnRpZXMgb2YgdGhlIE1hdHJpeCBvYmplY3QuIEluIG1hdHJpeCBub3RhdGlvbiwgdGhpc1xuXHQgKiBpcyB0aGUgc2FtZSBhcyBjb25jYXRlbmF0aW5nIHRoZSBjdXJyZW50IG1hdHJpeCB3aXRoIHRoZSBmb2xsb3dpbmdcblx0ICogbWF0cml4OjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHN4IEEgbXVsdGlwbGllciB1c2VkIHRvIHNjYWxlIHRoZSBvYmplY3QgYWxvbmcgdGhlIDxpPng8L2k+IGF4aXMuXG5cdCAqIEBwYXJhbSBzeSBBIG11bHRpcGxpZXIgdXNlZCB0byBzY2FsZSB0aGUgb2JqZWN0IGFsb25nIHRoZSA8aT55PC9pPiBheGlzLlxuXHQgKi9cblx0cHVibGljIHNjYWxlKHN4Om51bWJlciwgc3k6bnVtYmVyKTp2b2lkXG5cdHtcblx0XHR0aGlzLmEgKj0gc3g7XG5cdFx0dGhpcy5iICo9IHN5O1xuXG5cdFx0dGhpcy5jICo9IHN4O1xuXHRcdHRoaXMuZCAqPSBzeTtcblxuXHRcdHRoaXMudHggKj0gc3g7XG5cdFx0dGhpcy50eSAqPSBzeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBtZW1iZXJzIG9mIE1hdHJpeCB0byB0aGUgc3BlY2lmaWVkIHZhbHVlcy5cblx0ICpcblx0ICogQHBhcmFtIGEgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcblx0ICogICAgICAgICAgIDxpPng8L2k+IGF4aXMgd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLlxuXHQgKiBAcGFyYW0gYiAgVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZVxuXHQgKiAgICAgICAgICAgPGk+eTwvaT4gYXhpcyB3aGVuIHJvdGF0aW5nIG9yIHNrZXdpbmcgYW4gaW1hZ2UuXG5cdCAqIEBwYXJhbSBjICBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlXG5cdCAqICAgICAgICAgICA8aT54PC9pPiBheGlzIHdoZW4gcm90YXRpbmcgb3Igc2tld2luZyBhbiBpbWFnZS5cblx0ICogQHBhcmFtIGQgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcblx0ICogICAgICAgICAgIDxpPnk8L2k+IGF4aXMgd2hlbiBzY2FsaW5nIG9yIHJvdGF0aW5nIGFuIGltYWdlLi5cblx0ICogQHBhcmFtIHR4IFRoZSBkaXN0YW5jZSBieSB3aGljaCB0byB0cmFuc2xhdGUgZWFjaCBwb2ludCBhbG9uZyB0aGUgPGk+eDwvaT5cblx0ICogICAgICAgICAgIGF4aXMuXG5cdCAqIEBwYXJhbSB0eSBUaGUgZGlzdGFuY2UgYnkgd2hpY2ggdG8gdHJhbnNsYXRlIGVhY2ggcG9pbnQgYWxvbmcgdGhlIDxpPnk8L2k+XG5cdCAqICAgICAgICAgICBheGlzLlxuXHQgKi9cblx0cHVibGljIHNldFRvKGE6bnVtYmVyLCBiOm51bWJlciwgYzpudW1iZXIsIGQ6bnVtYmVyLCB0eDpudW1iZXIsIHR5Om51bWJlcik6dm9pZFxuXHR7XG5cdFx0dGhpcy5hID0gYTtcblx0XHR0aGlzLmIgPSBiO1xuXHRcdHRoaXMuYyA9IGM7XG5cdFx0dGhpcy5kID0gZDtcblx0XHR0aGlzLnR4ID0gdHg7XG5cdFx0dGhpcy50eSA9IHR5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSB0ZXh0IHZhbHVlIGxpc3RpbmcgdGhlIHByb3BlcnRpZXMgb2YgdGhlIE1hdHJpeCBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4gQSBzdHJpbmcgY29udGFpbmluZyB0aGUgdmFsdWVzIG9mIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBNYXRyaXhcblx0ICogICAgICAgICBvYmplY3Q6IDxjb2RlPmE8L2NvZGU+LCA8Y29kZT5iPC9jb2RlPiwgPGNvZGU+YzwvY29kZT4sXG5cdCAqICAgICAgICAgPGNvZGU+ZDwvY29kZT4sIDxjb2RlPnR4PC9jb2RlPiwgYW5kIDxjb2RlPnR5PC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIFwiW01hdHJpeF0gKGE9XCIgKyB0aGlzLmEgKyBcIiwgYj1cIiArIHRoaXMuYiArIFwiLCBjPVwiICsgdGhpcy5jICsgXCIsIGQ9XCIgKyB0aGlzLmQgKyBcIiwgdHg9XCIgKyB0aGlzLnR4ICsgXCIsIHR5PVwiICsgdGhpcy50eSArIFwiKVwiO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyB0aGUgZ2VvbWV0cmljIHRyYW5zZm9ybWF0aW9uIHJlcHJlc2VudGVkIGJ5XG5cdCAqIHRoZSBNYXRyaXggb2JqZWN0IHRvIHRoZSBzcGVjaWZpZWQgcG9pbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgcG9pbnQgZm9yIHdoaWNoIHlvdSB3YW50IHRvIGdldCB0aGUgcmVzdWx0IG9mIHRoZSBNYXRyaXhcblx0ICogICAgICAgICAgICAgIHRyYW5zZm9ybWF0aW9uLlxuXHQgKiBAcmV0dXJuIFRoZSBwb2ludCByZXN1bHRpbmcgZnJvbSBhcHBseWluZyB0aGUgTWF0cml4IHRyYW5zZm9ybWF0aW9uLlxuXHQgKi9cblx0cHVibGljIHRyYW5zZm9ybVBvaW50KHBvaW50OlBvaW50KTpQb2ludFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBQb2ludChwb2ludC54KnRoaXMuYSArIHBvaW50LnkqdGhpcy5jICsgdGhpcy50eCwgcG9pbnQueCp0aGlzLmIgKyBwb2ludC55KnRoaXMuZCArIHRoaXMudHkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRyYW5zbGF0ZXMgdGhlIG1hdHJpeCBhbG9uZyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGF4ZXMsIGFzIHNwZWNpZmllZFxuXHQgKiBieSB0aGUgPGNvZGU+ZHg8L2NvZGU+IGFuZCA8Y29kZT5keTwvY29kZT4gcGFyYW1ldGVycy5cblx0ICpcblx0ICogQHBhcmFtIGR4IFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIDxpPng8L2k+IGF4aXMgdG8gdGhlIHJpZ2h0LCBpblxuXHQgKiAgICAgICAgICAgcGl4ZWxzLlxuXHQgKiBAcGFyYW0gZHkgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBkb3duIGFsb25nIHRoZSA8aT55PC9pPiBheGlzLCBpbiBwaXhlbHMuXG5cdCAqL1xuXHRwdWJsaWMgdHJhbnNsYXRlKGR4Om51bWJlciwgZHk6bnVtYmVyKTp2b2lkXG5cdHtcblx0XHR0aGlzLnR4ICs9IGR4O1xuXHRcdHRoaXMudHkgKz0gZHk7XG5cdH1cbn1cblxuZXhwb3J0ID0gTWF0cml4OyJdfQ==