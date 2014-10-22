var Point = require("awayjs-core/lib/core/geom/Point");

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
        if (typeof a === "undefined") { a = 1; }
        if (typeof b === "undefined") { b = 0; }
        if (typeof c === "undefined") { c = 0; }
        if (typeof d === "undefined") { d = 1; }
        if (typeof tx === "undefined") { tx = 0; }
        if (typeof ty === "undefined") { ty = 0; }
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
        } else if (column == 0) {
            this.a = vector3D.x;
            this.c = vector3D.y;
        } else if (column == 1) {
            this.b = vector3D.x;
            this.d = vector3D.y;
        } else {
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
        } else if (column == 0) {
            vector3D.x = this.a;
            vector3D.y = this.c;
            vector3D.z = 0;
        } else if (column == 1) {
            vector3D.x = this.b;
            vector3D.y = this.d;
            vector3D.z = 0;
        } else {
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
        } else if (row == 0) {
            this.a = vector3D.x;
            this.c = vector3D.y;
        } else if (row == 1) {
            this.b = vector3D.x;
            this.d = vector3D.y;
        } else {
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
        } else if (row == 0) {
            vector3D.x = this.a;
            vector3D.y = this.b;
            vector3D.z = this.tx;
        } else if (row == 1) {
            vector3D.x = this.c;
            vector3D.y = this.d;
            vector3D.z = this.ty;
        } else {
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
        if (typeof rotation === "undefined") { rotation = 0; }
        if (typeof tx === "undefined") { tx = 0; }
        if (typeof ty === "undefined") { ty = 0; }
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
        if (typeof rotation === "undefined") { rotation = 0; }
        if (typeof tx === "undefined") { tx = 0; }
        if (typeof ty === "undefined") { ty = 0; }
        this.a = width / 1638.4;
        this.d = height / 1638.4;

        if (rotation != 0.0) {
            var cos = Math.cos(rotation);
            var sin = Math.sin(rotation);

            this.b = sin * this.d;
            this.c = -sin * this.a;
            this.a *= cos;
            this.d *= cos;
        } else {
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
        } else {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZ2VvbS9NYXRyaXgudHMiXSwibmFtZXMiOlsiTWF0cml4IiwiTWF0cml4LmNvbnN0cnVjdG9yIiwiTWF0cml4LmNsb25lIiwiTWF0cml4LmNvbmNhdCIsIk1hdHJpeC5jb3B5Q29sdW1uRnJvbSIsIk1hdHJpeC5jb3B5Q29sdW1uVG8iLCJNYXRyaXguY29weUZyb20iLCJNYXRyaXguY29weVJvd0Zyb20iLCJNYXRyaXguY29weVJvd1RvIiwiTWF0cml4LmNyZWF0ZUJveCIsIk1hdHJpeC5jcmVhdGVHcmFkaWVudEJveCIsIk1hdHJpeC5kZWx0YVRyYW5zZm9ybVBvaW50IiwiTWF0cml4LmlkZW50aXR5IiwiTWF0cml4LmludmVydCIsIk1hdHJpeC5tdWx0aXBseSIsIk1hdHJpeC5yb3RhdGUiLCJNYXRyaXguc2NhbGUiLCJNYXRyaXguc2V0VG8iLCJNYXRyaXgudG9TdHJpbmciLCJNYXRyaXgudHJhbnNmb3JtUG9pbnQiLCJNYXRyaXgudHJhbnNsYXRlIl0sIm1hcHBpbmdzIjoiQUFBQSxzREFBOEQ7O0FBRTlELG1FQUF5RTs7QUFFekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXNERztBQUNIO0lBMkRDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQURHQTtJQUNIQSxnQkFBWUEsQ0FBWUEsRUFBRUEsQ0FBWUEsRUFBRUEsQ0FBWUEsRUFBRUEsQ0FBWUEsRUFBRUEsRUFBYUEsRUFBRUEsRUFBYUE7UUFBcEZDLGdDQUFBQSxDQUFDQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxnQ0FBQUEsQ0FBQ0EsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsZ0NBQUFBLENBQUNBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLGdDQUFBQSxDQUFDQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxpQ0FBQUEsRUFBRUEsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsaUNBQUFBLEVBQUVBLEdBQVVBLENBQUNBO0FBQUFBLFFBRS9GQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNWQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNWQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNWQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNWQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQTtRQUNaQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQTtJQUNiQSxDQUFDQTtJQVFERDs7Ozs7TUFER0E7NkJBQ0hBO1FBRUNFLE9BQU9BLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBO0lBQ3BFQSxDQUFDQTs7SUFvQkRGOzs7Ozs7Ozs7Ozs7Ozs7OztNQURHQTs4QkFDSEEsVUFBY0EsTUFBYUE7UUFFMUJHLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUMxQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7O1FBRVhBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxDQUFD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LElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBO0lBQ2JBLENBQUNBOztJQW1DRFQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BREdBO3lDQUNIQSxVQUF5QkEsS0FBWUEsRUFBRUEsTUFBYUEsRUFBRUEsUUFBbUJBLEVBQUVBLEVBQWFBLEVBQUVBLEVBQWFBO1FBQWpEVSx1Q0FBQUEsUUFBUUEsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsaUNBQUFBLEVBQUVBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLGlDQUFBQSxFQUFFQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUV0R0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsR0FBQ0EsTUFBTUE7UUFDckJBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLEdBQUNBLE1BQU1BOztRQUV0QkEsSUFBSUEsUUFBUUEsSUFBSUEsR0FBR0EsQ0FBRUE7WUFDcEJBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBO1lBQzVCQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxDQUFDQTs7WUFFNUJBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ25CQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0E7WUFDYkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0E7U0FDYkEsS0FBTUE7WUFDTkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7U0FDbkJBOztRQUVEQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxLQUFLQSxHQUFDQSxDQUFDQTtRQUN0QkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0Es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R0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDNUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQzVDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTs7UUFFNUNBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLEVBQUVBO1FBQzNEQSxNQUFNQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxFQUFFQTs7UUFFM0RBLE9BQU9BLE1BQU1BO0lBQ2RBLENBQUNBOztJQVlEZDs7Ozs7Ozs7O01BREdBOzhCQUNIQSxVQUFjQSxLQUFZQTtRQUV6QmUsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDekJBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBOztRQUV6QkEsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0E7UUFDaENBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBO1FBQ2hDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTs7UUFFWEEsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0E7UUFDaENBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBO1FBQ2hDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTs7UUFFWEEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsR0FBR0E7UUFDbkNBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEdBQUdBO1FBQ25DQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQTtJQUNkQSxDQUFDQTs7SUFlRGY7Ozs7Ozs7Ozs7OztNQURHQTs2QkFDSEEsVUFBYUEsRUFBU0EsRUFBRUEsRUFBU0E7UUFFaENnQixJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQTtRQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQTs7UUFFWkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUE7UUFDWkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUE7O1FBRVpBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBO1FBQ2JBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBO0lBQ2RBLENBQUNBOztJQWtCRGhCOzs7Ozs7Ozs7Ozs7Ozs7TUFER0E7NkJBQ0hBLFVBQWFBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRXhFaUIsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDVkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDVkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDVkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDVkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUE7UUFDWkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUE7SUFDYkEsQ0FBQ0E7O0lBU0RqQjs7Ozs7O01BREdBO2dDQUNIQTtRQUVDa0IsT0FBT0EsY0FBY0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0E7SUFDbklBLENBQUNBOztJQVVEbEI7Ozs7Ozs7TUFER0E7c0NBQ0hBLFVBQXNCQSxLQUFXQTtRQUVoQ21CLE9BQU9BLElBQUlBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBO0lBQ3ZHQSxDQUFDQTs7SUFVRG5COzs7Ozs7O01BREdBO2lDQUNIQSxVQUFpQkEsRUFBU0EsRUFBRUEsRUFBU0E7UUFFcENvQixJQUFJQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQTtRQUNiQSxJQUFJQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQTtJQUNkQSxDQUFDQTtJQUNGcEIsY0FBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCx1QkFBZ0IsQ0FBQSIsImZpbGUiOiJjb3JlL2dlb20vTWF0cml4LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvaW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUG9pbnRcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBBcmd1bWVudEVycm9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9Bcmd1bWVudEVycm9yXCIpO1xuXG4vKipcbiAqIFRoZSBNYXRyaXggY2xhc3MgcmVwcmVzZW50cyBhIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCB0aGF0IGRldGVybWluZXMgaG93IHRvXG4gKiBtYXAgcG9pbnRzIGZyb20gb25lIGNvb3JkaW5hdGUgc3BhY2UgdG8gYW5vdGhlci4gWW91IGNhbiBwZXJmb3JtIHZhcmlvdXNcbiAqIGdyYXBoaWNhbCB0cmFuc2Zvcm1hdGlvbnMgb24gYSBkaXNwbGF5IG9iamVjdCBieSBzZXR0aW5nIHRoZSBwcm9wZXJ0aWVzIG9mXG4gKiBhIE1hdHJpeCBvYmplY3QsIGFwcGx5aW5nIHRoYXQgTWF0cml4IG9iamVjdCB0byB0aGUgPGNvZGU+bWF0cml4PC9jb2RlPlxuICogcHJvcGVydHkgb2YgYSBUcmFuc2Zvcm0gb2JqZWN0LCBhbmQgdGhlbiBhcHBseWluZyB0aGF0IFRyYW5zZm9ybSBvYmplY3QgYXNcbiAqIHRoZSA8Y29kZT50cmFuc2Zvcm08L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlc2VcbiAqIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9ucyBpbmNsdWRlIHRyYW5zbGF0aW9uKDxpPng8L2k+IGFuZCA8aT55PC9pPlxuICogcmVwb3NpdGlvbmluZyksIHJvdGF0aW9uLCBzY2FsaW5nLCBhbmQgc2tld2luZy5cbiAqXG4gKiA8cD5Ub2dldGhlciB0aGVzZSB0eXBlcyBvZiB0cmFuc2Zvcm1hdGlvbnMgYXJlIGtub3duIGFzIDxpPmFmZmluZVxuICogdHJhbnNmb3JtYXRpb25zPC9pPi4gQWZmaW5lIHRyYW5zZm9ybWF0aW9ucyBwcmVzZXJ2ZSB0aGUgc3RyYWlnaHRuZXNzIG9mXG4gKiBsaW5lcyB3aGlsZSB0cmFuc2Zvcm1pbmcsIHNvIHRoYXQgcGFyYWxsZWwgbGluZXMgc3RheSBwYXJhbGxlbC48L3A+XG4gKlxuICogPHA+VG8gYXBwbHkgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggdG8gYSBkaXNwbGF5IG9iamVjdCwgeW91IGNyZWF0ZSBhXG4gKiBUcmFuc2Zvcm0gb2JqZWN0LCBzZXQgaXRzIDxjb2RlPm1hdHJpeDwvY29kZT4gcHJvcGVydHkgdG8gdGhlXG4gKiB0cmFuc2Zvcm1hdGlvbiBtYXRyaXgsIGFuZCB0aGVuIHNldCB0aGUgPGNvZGU+dHJhbnNmb3JtPC9jb2RlPiBwcm9wZXJ0eSBvZlxuICogdGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRoZSBUcmFuc2Zvcm0gb2JqZWN0LiBNYXRyaXggb2JqZWN0cyBhcmUgYWxzbyB1c2VkIGFzXG4gKiBwYXJhbWV0ZXJzIG9mIHNvbWUgbWV0aG9kcywgc3VjaCBhcyB0aGUgZm9sbG93aW5nOjwvcD5cbiAqXG4gKiA8dWw+XG4gKiAgIDxsaT5UaGUgPGNvZGU+ZHJhdygpPC9jb2RlPiBtZXRob2Qgb2YgYSBCaXRtYXBEYXRhIG9iamVjdDwvbGk+XG4gKiAgIDxsaT5UaGUgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+IG1ldGhvZCxcbiAqIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+IG1ldGhvZCwgb3JcbiAqIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+IG1ldGhvZCBvZiBhIEdyYXBoaWNzIG9iamVjdDwvbGk+XG4gKiA8L3VsPlxuICpcbiAqIDxwPkEgdHJhbnNmb3JtYXRpb24gbWF0cml4IG9iamVjdCBpcyBhIDMgeCAzIG1hdHJpeCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAqIGNvbnRlbnRzOjwvcD5cbiAqXG4gKiA8cD5JbiB0cmFkaXRpb25hbCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhlcywgdGhlIDxjb2RlPnU8L2NvZGU+LFxuICogPGNvZGU+djwvY29kZT4sIGFuZCA8Y29kZT53PC9jb2RlPiBwcm9wZXJ0aWVzIHByb3ZpZGUgZXh0cmEgY2FwYWJpbGl0aWVzLlxuICogVGhlIE1hdHJpeCBjbGFzcyBjYW4gb25seSBvcGVyYXRlIGluIHR3by1kaW1lbnNpb25hbCBzcGFjZSwgc28gaXQgYWx3YXlzXG4gKiBhc3N1bWVzIHRoYXQgdGhlIHByb3BlcnR5IHZhbHVlcyA8Y29kZT51PC9jb2RlPiBhbmQgPGNvZGU+djwvY29kZT4gYXJlIDAuMCxcbiAqIGFuZCB0aGF0IHRoZSBwcm9wZXJ0eSB2YWx1ZSA8Y29kZT53PC9jb2RlPiBpcyAxLjAuIFRoZSBlZmZlY3RpdmUgdmFsdWVzIG9mXG4gKiB0aGUgbWF0cml4IGFyZSBhcyBmb2xsb3dzOjwvcD5cbiAqXG4gKiA8cD5Zb3UgY2FuIGdldCBhbmQgc2V0IHRoZSB2YWx1ZXMgb2YgYWxsIHNpeCBvZiB0aGUgb3RoZXIgcHJvcGVydGllcyBpbiBhXG4gKiBNYXRyaXggb2JqZWN0OiA8Y29kZT5hPC9jb2RlPiwgPGNvZGU+YjwvY29kZT4sIDxjb2RlPmM8L2NvZGU+LFxuICogPGNvZGU+ZDwvY29kZT4sIDxjb2RlPnR4PC9jb2RlPiwgYW5kIDxjb2RlPnR5PC9jb2RlPi48L3A+XG4gKlxuICogPHA+VGhlIE1hdHJpeCBjbGFzcyBzdXBwb3J0cyB0aGUgZm91ciBtYWpvciB0eXBlcyBvZiB0cmFuc2Zvcm1hdGlvbnM6XG4gKiB0cmFuc2xhdGlvbiwgc2NhbGluZywgcm90YXRpb24sIGFuZCBza2V3aW5nLiBZb3UgY2FuIHNldCB0aHJlZSBvZiB0aGVzZVxuICogdHJhbnNmb3JtYXRpb25zIGJ5IHVzaW5nIHNwZWNpYWxpemVkIG1ldGhvZHMsIGFzIGRlc2NyaWJlZCBpbiB0aGUgZm9sbG93aW5nXG4gKiB0YWJsZTogPC9wPlxuICpcbiAqIDxwPkVhY2ggdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24gYWx0ZXJzIHRoZSBjdXJyZW50IG1hdHJpeCBwcm9wZXJ0aWVzIHNvXG4gKiB0aGF0IHlvdSBjYW4gZWZmZWN0aXZlbHkgY29tYmluZSBtdWx0aXBsZSB0cmFuc2Zvcm1hdGlvbnMuIFRvIGRvIHRoaXMsIHlvdVxuICogY2FsbCBtb3JlIHRoYW4gb25lIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uIGJlZm9yZSBhcHBseWluZyB0aGUgbWF0cml4IHRvXG4gKiBpdHMgZGlzcGxheSBvYmplY3QgdGFyZ2V0KGJ5IHVzaW5nIHRoZSA8Y29kZT50cmFuc2Zvcm08L2NvZGU+IHByb3BlcnR5IG9mXG4gKiB0aGF0IGRpc3BsYXkgb2JqZWN0KS48L3A+XG4gKlxuICogPHA+VXNlIHRoZSA8Y29kZT5uZXcgTWF0cml4KCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIE1hdHJpeCBvYmplY3RcbiAqIGJlZm9yZSB5b3UgY2FuIGNhbGwgdGhlIG1ldGhvZHMgb2YgdGhlIE1hdHJpeCBvYmplY3QuPC9wPlxuICovXG5jbGFzcyBNYXRyaXhcbntcblx0LyoqXG5cdCAqIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGUgPGk+eDwvaT4gYXhpc1xuXHQgKiB3aGVuIHNjYWxpbmcgb3Igcm90YXRpbmcgYW4gaW1hZ2UuXG5cdCAqL1xuXHRwdWJsaWMgYTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGUgPGk+eTwvaT4gYXhpc1xuXHQgKiB3aGVuIHJvdGF0aW5nIG9yIHNrZXdpbmcgYW4gaW1hZ2UuXG5cdCAqL1xuXHRwdWJsaWMgYjpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGUgPGk+eDwvaT4gYXhpc1xuXHQgKiB3aGVuIHJvdGF0aW5nIG9yIHNrZXdpbmcgYW4gaW1hZ2UuXG5cdCAqL1xuXHRwdWJsaWMgYzpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGUgPGk+eTwvaT4gYXhpc1xuXHQgKiB3aGVuIHNjYWxpbmcgb3Igcm90YXRpbmcgYW4gaW1hZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBkaXN0YW5jZSBieSB3aGljaCB0byB0cmFuc2xhdGUgZWFjaCBwb2ludCBhbG9uZyB0aGUgPGk+eDwvaT4gYXhpcy5cblx0ICovXG5cdHB1YmxpYyB0eDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBkaXN0YW5jZSBieSB3aGljaCB0byB0cmFuc2xhdGUgZWFjaCBwb2ludCBhbG9uZyB0aGUgPGk+eTwvaT4gYXhpcy5cblx0ICovXG5cdHB1YmxpYyB0eTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgTWF0cml4IG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVycy4gSW4gbWF0cml4XG5cdCAqIG5vdGF0aW9uLCB0aGUgcHJvcGVydGllcyBhcmUgb3JnYW5pemVkIGxpa2UgdGhpczpcblx0ICpcblx0ICogPHA+SWYgeW91IGRvIG5vdCBwcm92aWRlIGFueSBwYXJhbWV0ZXJzIHRvIHRoZSA8Y29kZT5uZXcgTWF0cml4KCk8L2NvZGU+XG5cdCAqIGNvbnN0cnVjdG9yLCBpdCBjcmVhdGVzIGFuIDxpPmlkZW50aXR5IG1hdHJpeDwvaT4gd2l0aCB0aGUgZm9sbG93aW5nXG5cdCAqIHZhbHVlczo8L3A+XG5cdCAqXG5cdCAqIDxwPkluIG1hdHJpeCBub3RhdGlvbiwgdGhlIGlkZW50aXR5IG1hdHJpeCBsb29rcyBsaWtlIHRoaXM6PC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gYSAgVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZVxuXHQgKiAgICAgICAgICAgPGk+eDwvaT4gYXhpcyB3aGVuIHNjYWxpbmcgb3Igcm90YXRpbmcgYW4gaW1hZ2UuXG5cdCAqIEBwYXJhbSBiICBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlXG5cdCAqICAgICAgICAgICA8aT55PC9pPiBheGlzIHdoZW4gcm90YXRpbmcgb3Igc2tld2luZyBhbiBpbWFnZS5cblx0ICogQHBhcmFtIGMgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcblx0ICogICAgICAgICAgIDxpPng8L2k+IGF4aXMgd2hlbiByb3RhdGluZyBvciBza2V3aW5nIGFuIGltYWdlLlxuXHQgKiBAcGFyYW0gZCAgVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZVxuXHQgKiAgICAgICAgICAgPGk+eTwvaT4gYXhpcyB3aGVuIHNjYWxpbmcgb3Igcm90YXRpbmcgYW4gaW1hZ2UuLlxuXHQgKiBAcGFyYW0gdHggVGhlIGRpc3RhbmNlIGJ5IHdoaWNoIHRvIHRyYW5zbGF0ZSBlYWNoIHBvaW50IGFsb25nIHRoZSA8aT54PC9pPlxuXHQgKiAgICAgICAgICAgYXhpcy5cblx0ICogQHBhcmFtIHR5IFRoZSBkaXN0YW5jZSBieSB3aGljaCB0byB0cmFuc2xhdGUgZWFjaCBwb2ludCBhbG9uZyB0aGUgPGk+eTwvaT5cblx0ICogICAgICAgICAgIGF4aXMuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihhOm51bWJlciA9IDEsIGI6bnVtYmVyID0gMCwgYzpudW1iZXIgPSAwLCBkOm51bWJlciA9IDEsIHR4Om51bWJlciA9IDAsIHR5Om51bWJlciA9IDApXG5cdHtcblx0XHR0aGlzLmEgPSBhO1xuXHRcdHRoaXMuYiA9IGI7XG5cdFx0dGhpcy5jID0gYztcblx0XHR0aGlzLmQgPSBkO1xuXHRcdHRoaXMudHggPSB0eDtcblx0XHR0aGlzLnR5ID0gdHk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBNYXRyaXggb2JqZWN0IHRoYXQgaXMgYSBjbG9uZSBvZiB0aGlzIG1hdHJpeCwgd2l0aCBhbiBleGFjdFxuXHQgKiBjb3B5IG9mIHRoZSBjb250YWluZWQgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIEEgTWF0cml4IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOk1hdHJpeFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBNYXRyaXgodGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5kLCB0aGlzLnR4LCB0aGlzLnR5KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25jYXRlbmF0ZXMgYSBtYXRyaXggd2l0aCB0aGUgY3VycmVudCBtYXRyaXgsIGVmZmVjdGl2ZWx5IGNvbWJpbmluZyB0aGVcblx0ICogZ2VvbWV0cmljIGVmZmVjdHMgb2YgdGhlIHR3by4gSW4gbWF0aGVtYXRpY2FsIHRlcm1zLCBjb25jYXRlbmF0aW5nIHR3b1xuXHQgKiBtYXRyaXhlcyBpcyB0aGUgc2FtZSBhcyBjb21iaW5pbmcgdGhlbSB1c2luZyBtYXRyaXggbXVsdGlwbGljYXRpb24uXG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBpZiBtYXRyaXggPGNvZGU+bTE8L2NvZGU+IHNjYWxlcyBhbiBvYmplY3QgYnkgYSBmYWN0b3Igb2Zcblx0ICogZm91ciwgYW5kIG1hdHJpeCA8Y29kZT5tMjwvY29kZT4gcm90YXRlcyBhbiBvYmplY3QgYnkgMS41NzA3OTYzMjY3OTQ5XG5cdCAqIHJhZGlhbnMoPGNvZGU+TWF0aC5QSS8yPC9jb2RlPiksIHRoZW4gPGNvZGU+bTEuY29uY2F0KG0yKTwvY29kZT5cblx0ICogdHJhbnNmb3JtcyA8Y29kZT5tMTwvY29kZT4gaW50byBhIG1hdHJpeCB0aGF0IHNjYWxlcyBhbiBvYmplY3QgYnkgYSBmYWN0b3Jcblx0ICogb2YgZm91ciBhbmQgcm90YXRlcyB0aGUgb2JqZWN0IGJ5IDxjb2RlPk1hdGguUEkvMjwvY29kZT4gcmFkaWFucy4gPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGlzIG1ldGhvZCByZXBsYWNlcyB0aGUgc291cmNlIG1hdHJpeCB3aXRoIHRoZSBjb25jYXRlbmF0ZWQgbWF0cml4LiBJZlxuXHQgKiB5b3Ugd2FudCB0byBjb25jYXRlbmF0ZSB0d28gbWF0cml4ZXMgd2l0aG91dCBhbHRlcmluZyBlaXRoZXIgb2YgdGhlIHR3b1xuXHQgKiBzb3VyY2UgbWF0cml4ZXMsIGZpcnN0IGNvcHkgdGhlIHNvdXJjZSBtYXRyaXggYnkgdXNpbmcgdGhlXG5cdCAqIDxjb2RlPmNsb25lKCk8L2NvZGU+IG1ldGhvZCwgYXMgc2hvd24gaW4gdGhlIENsYXNzIEV4YW1wbGVzIHNlY3Rpb24uPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gbWF0cml4IFRoZSBtYXRyaXggdG8gYmUgY29uY2F0ZW5hdGVkIHRvIHRoZSBzb3VyY2UgbWF0cml4LlxuXHQgKi9cblx0cHVibGljIGNvbmNhdChtYXRyaXg6TWF0cml4KTp2b2lkXG5cdHtcblx0XHR2YXIgYTEgPSB0aGlzLmEqbWF0cml4LmEgKyB0aGlzLmIqbWF0cml4LmM7XG5cdFx0dGhpcy5iID0gdGhpcy5hKm1hdHJpeC5iICsgdGhpcy5iKm1hdHJpeC5kO1xuXHRcdHRoaXMuYSA9IGExO1xuXG5cdFx0dmFyIGMxID0gdGhpcy5jKm1hdHJpeC5hICsgdGhpcy5kKm1hdHJpeC5jO1xuXHRcdHRoaXMuZCA9IHRoaXMuYyptYXRyaXguYiArIHRoaXMuZCptYXRyaXguZDtcblxuXHRcdHRoaXMuYyA9IGMxO1xuXG5cdFx0dmFyIHR4MSA9IHRoaXMudHgqbWF0cml4LmEgKyB0aGlzLnR5Km1hdHJpeC5jICsgbWF0cml4LnR4O1xuXHRcdHRoaXMudHkgPSB0aGlzLnR4Km1hdHJpeC5iICsgdGhpcy50eSptYXRyaXguZCArIG1hdHJpeC50eTtcblx0XHR0aGlzLnR4ID0gdHgxO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvcGllcyBhIFZlY3RvcjNEIG9iamVjdCBpbnRvIHNwZWNpZmljIGNvbHVtbiBvZiB0aGUgY2FsbGluZyBNYXRyaXgzRFxuXHQgKiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBjb2x1bW4gICBUaGUgY29sdW1uIGZyb20gd2hpY2ggdG8gY29weSB0aGUgZGF0YSBmcm9tLlxuXHQgKiBAcGFyYW0gdmVjdG9yM0QgVGhlIFZlY3RvcjNEIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgY29weUNvbHVtbkZyb20oY29sdW1uOm51bWJlciwgdmVjdG9yM0Q6VmVjdG9yM0QpOnZvaWRcblx0e1xuXHRcdGlmIChjb2x1bW4gPiAyKSB7XG5cdFx0XHR0aHJvdyBcIkNvbHVtbiBcIiArIGNvbHVtbiArIFwiIG91dCBvZiBib3VuZHMgKDIpXCI7XG5cdFx0fSBlbHNlIGlmIChjb2x1bW4gPT0gMCkge1xuXHRcdFx0dGhpcy5hID0gdmVjdG9yM0QueDtcblx0XHRcdHRoaXMuYyA9IHZlY3RvcjNELnk7XG5cdFx0fSBlbHNlIGlmIChjb2x1bW4gPT0gMSkge1xuXHRcdFx0dGhpcy5iID0gdmVjdG9yM0QueDtcblx0XHRcdHRoaXMuZCA9IHZlY3RvcjNELnk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudHggPSB2ZWN0b3IzRC54O1xuXHRcdFx0dGhpcy50eSA9IHZlY3RvcjNELnk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENvcGllcyBzcGVjaWZpYyBjb2x1bW4gb2YgdGhlIGNhbGxpbmcgTWF0cml4IG9iamVjdCBpbnRvIHRoZSBWZWN0b3IzRFxuXHQgKiBvYmplY3QuIFRoZSB3IGVsZW1lbnQgb2YgdGhlIFZlY3RvcjNEIG9iamVjdCB3aWxsIG5vdCBiZSBjaGFuZ2VkLlxuXHQgKlxuXHQgKiBAcGFyYW0gY29sdW1uICAgVGhlIGNvbHVtbiBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEgZnJvbS5cblx0ICogQHBhcmFtIHZlY3RvcjNEIFRoZSBWZWN0b3IzRCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGNvcHlDb2x1bW5Ubyhjb2x1bW46bnVtYmVyLCB2ZWN0b3IzRDpWZWN0b3IzRCk6dm9pZFxuXHR7XG5cdFx0aWYgKGNvbHVtbiA+IDIpIHtcblx0XHRcdHRocm93IG5ldyBBcmd1bWVudEVycm9yKFwiQXJndW1lbnRFcnJvciwgQ29sdW1uIFwiICsgY29sdW1uICsgXCIgb3V0IG9mIGJvdW5kcyBbMCwgLi4uLCAyXVwiKTtcblx0XHR9IGVsc2UgaWYgKGNvbHVtbiA9PSAwKSB7XG5cdFx0XHR2ZWN0b3IzRC54ID0gdGhpcy5hO1xuXHRcdFx0dmVjdG9yM0QueSA9IHRoaXMuYztcblx0XHRcdHZlY3RvcjNELnogPSAwO1xuXHRcdH0gZWxzZSBpZiAoY29sdW1uID09IDEpIHtcblx0XHRcdHZlY3RvcjNELnggPSB0aGlzLmI7XG5cdFx0XHR2ZWN0b3IzRC55ID0gdGhpcy5kO1xuXHRcdFx0dmVjdG9yM0QueiA9IDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZlY3RvcjNELnggPSB0aGlzLnR4O1xuXHRcdFx0dmVjdG9yM0QueSA9IHRoaXMudHk7XG5cdFx0XHR2ZWN0b3IzRC56ID0gMTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29waWVzIGFsbCBvZiB0aGUgbWF0cml4IGRhdGEgZnJvbSB0aGUgc291cmNlIFBvaW50IG9iamVjdCBpbnRvIHRoZVxuXHQgKiBjYWxsaW5nIE1hdHJpeCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2VNYXRyaXggVGhlIE1hdHJpeCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGNvcHlGcm9tKHNvdXJjZU1hdHJpeDpNYXRyaXgpOnZvaWRcblx0e1xuXHRcdHRoaXMuYSA9IHNvdXJjZU1hdHJpeC5hO1xuXHRcdHRoaXMuYiA9IHNvdXJjZU1hdHJpeC5iO1xuXHRcdHRoaXMuYyA9IHNvdXJjZU1hdHJpeC5jO1xuXHRcdHRoaXMuZCA9IHNvdXJjZU1hdHJpeC5kO1xuXHRcdHRoaXMudHggPSBzb3VyY2VNYXRyaXgudHg7XG5cdFx0dGhpcy50eSA9IHNvdXJjZU1hdHJpeC50eTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgYSBWZWN0b3IzRCBvYmplY3QgaW50byBzcGVjaWZpYyByb3cgb2YgdGhlIGNhbGxpbmcgTWF0cml4IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHJvdyAgICAgIFRoZSByb3cgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhIGZyb20uXG5cdCAqIEBwYXJhbSB2ZWN0b3IzRCBUaGUgVmVjdG9yM0Qgb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSB0aGUgZGF0YS5cblx0ICovXG5cdHB1YmxpYyBjb3B5Um93RnJvbShyb3c6bnVtYmVyLCB2ZWN0b3IzRDpWZWN0b3IzRCk6dm9pZFxuXHR7XG5cdFx0aWYgKHJvdyA+IDIpIHtcblx0XHRcdHRocm93IG5ldyBBcmd1bWVudEVycm9yKFwiQXJndW1lbnRFcnJvciwgUm93IFwiICsgcm93ICsgXCIgb3V0IG9mIGJvdW5kcyBbMCwgLi4uLCAyXVwiKTtcblx0XHR9IGVsc2UgaWYgKHJvdyA9PSAwKSB7XG5cdFx0XHR0aGlzLmEgPSB2ZWN0b3IzRC54O1xuXHRcdFx0dGhpcy5jID0gdmVjdG9yM0QueTtcblx0XHR9IGVsc2UgaWYgKHJvdyA9PSAxKSB7XG5cdFx0XHR0aGlzLmIgPSB2ZWN0b3IzRC54O1xuXHRcdFx0dGhpcy5kID0gdmVjdG9yM0QueTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy50eCA9IHZlY3RvcjNELng7XG5cdFx0XHR0aGlzLnR5ID0gdmVjdG9yM0QueTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29waWVzIHNwZWNpZmljIHJvdyBvZiB0aGUgY2FsbGluZyBNYXRyaXggb2JqZWN0IGludG8gdGhlIFZlY3RvcjNEIG9iamVjdC5cblx0ICogVGhlIHcgZWxlbWVudCBvZiB0aGUgVmVjdG9yM0Qgb2JqZWN0IHdpbGwgbm90IGJlIGNoYW5nZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSByb3cgICAgICBUaGUgcm93IGZyb20gd2hpY2ggdG8gY29weSB0aGUgZGF0YSBmcm9tLlxuXHQgKiBAcGFyYW0gdmVjdG9yM0QgVGhlIFZlY3RvcjNEIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgY29weVJvd1RvKHJvdzpudW1iZXIsIHZlY3RvcjNEOlZlY3RvcjNEKTp2b2lkXG5cdHtcblx0XHRpZiAocm93ID4gMikge1xuXHRcdFx0dGhyb3cgbmV3IEFyZ3VtZW50RXJyb3IoXCJBcmd1bWVudEVycm9yLCBSb3cgXCIgKyByb3cgKyBcIiBvdXQgb2YgYm91bmRzIFswLCAuLi4sIDJdXCIpO1xuXHRcdH0gZWxzZSBpZiAocm93ID09IDApIHtcblx0XHRcdHZlY3RvcjNELnggPSB0aGlzLmE7XG5cdFx0XHR2ZWN0b3IzRC55ID0gdGhpcy5iO1xuXHRcdFx0dmVjdG9yM0QueiA9IHRoaXMudHg7XG5cdFx0fSBlbHNlIGlmIChyb3cgPT0gMSkge1xuXHRcdFx0dmVjdG9yM0QueCA9IHRoaXMuYztcblx0XHRcdHZlY3RvcjNELnkgPSB0aGlzLmQ7XG5cdFx0XHR2ZWN0b3IzRC56ID0gdGhpcy50eTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmVjdG9yM0Quc2V0VG8oMCwgMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEluY2x1ZGVzIHBhcmFtZXRlcnMgZm9yIHNjYWxpbmcsIHJvdGF0aW9uLCBhbmQgdHJhbnNsYXRpb24uIFdoZW4gYXBwbGllZFxuXHQgKiB0byBhIG1hdHJpeCBpdCBzZXRzIHRoZSBtYXRyaXgncyB2YWx1ZXMgYmFzZWQgb24gdGhvc2UgcGFyYW1ldGVycy5cblx0ICpcblx0ICogPHA+VXNpbmcgdGhlIDxjb2RlPmNyZWF0ZUJveCgpPC9jb2RlPiBtZXRob2QgbGV0cyB5b3Ugb2J0YWluIHRoZSBzYW1lXG5cdCAqIG1hdHJpeCBhcyB5b3Ugd291bGQgaWYgeW91IGFwcGxpZWQgdGhlIDxjb2RlPmlkZW50aXR5KCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5yb3RhdGUoKTwvY29kZT4sIDxjb2RlPnNjYWxlKCk8L2NvZGU+LCBhbmQgPGNvZGU+dHJhbnNsYXRlKCk8L2NvZGU+XG5cdCAqIG1ldGhvZHMgaW4gc3VjY2Vzc2lvbi4gRm9yIGV4YW1wbGUsIDxjb2RlPm1hdDEuY3JlYXRlQm94KDIsMixNYXRoLlBJLzQsXG5cdCAqIDEwMCwgMTAwKTwvY29kZT4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhcyB0aGUgZm9sbG93aW5nOjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHNjYWxlWCAgIFRoZSBmYWN0b3IgYnkgd2hpY2ggdG8gc2NhbGUgaG9yaXpvbnRhbGx5LlxuXHQgKiBAcGFyYW0gc2NhbGVZICAgVGhlIGZhY3RvciBieSB3aGljaCBzY2FsZSB2ZXJ0aWNhbGx5LlxuXHQgKiBAcGFyYW0gcm90YXRpb24gVGhlIGFtb3VudCB0byByb3RhdGUsIGluIHJhZGlhbnMuXG5cdCAqIEBwYXJhbSB0eCAgICAgICBUaGUgbnVtYmVyIG9mIHBpeGVscyB0byB0cmFuc2xhdGUobW92ZSkgdG8gdGhlIHJpZ2h0XG5cdCAqICAgICAgICAgICAgICAgICBhbG9uZyB0aGUgPGk+eDwvaT4gYXhpcy5cblx0ICogQHBhcmFtIHR5ICAgICAgIFRoZSBudW1iZXIgb2YgcGl4ZWxzIHRvIHRyYW5zbGF0ZShtb3ZlKSBkb3duIGFsb25nIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgPGk+eTwvaT4gYXhpcy5cblx0ICovXG5cdHB1YmxpYyBjcmVhdGVCb3goc2NhbGVYOm51bWJlciwgc2NhbGVZOm51bWJlciwgcm90YXRpb246bnVtYmVyID0gMCwgdHg6bnVtYmVyID0gMCwgdHk6bnVtYmVyID0gMCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5hID0gc2NhbGVYO1xuXHRcdHRoaXMuZCA9IHNjYWxlWTtcblx0XHR0aGlzLmIgPSByb3RhdGlvbjtcblx0XHR0aGlzLnR4ID0gdHg7XG5cdFx0dGhpcy50eSA9IHR5O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgdGhlIHNwZWNpZmljIHN0eWxlIG9mIG1hdHJpeCBleHBlY3RlZCBieSB0aGVcblx0ICogPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4gYW5kIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+XG5cdCAqIG1ldGhvZHMgb2YgdGhlIEdyYXBoaWNzIGNsYXNzLiBXaWR0aCBhbmQgaGVpZ2h0IGFyZSBzY2FsZWQgdG8gYVxuXHQgKiA8Y29kZT5zY2FsZVg8L2NvZGU+Lzxjb2RlPnNjYWxlWTwvY29kZT4gcGFpciBhbmQgdGhlXG5cdCAqIDxjb2RlPnR4PC9jb2RlPi88Y29kZT50eTwvY29kZT4gdmFsdWVzIGFyZSBvZmZzZXQgYnkgaGFsZiB0aGUgd2lkdGggYW5kXG5cdCAqIGhlaWdodC5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIGEgZ3JhZGllbnQgd2l0aCB0aGUgZm9sbG93aW5nXG5cdCAqIGNoYXJhY3RlcmlzdGljczo8L3A+XG5cdCAqXG5cdCAqIDx1bD5cblx0ICogICA8bGk+PGNvZGU+R3JhZGllbnRUeXBlLkxJTkVBUjwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT5Ud28gY29sb3JzLCBncmVlbiBhbmQgYmx1ZSwgd2l0aCB0aGUgcmF0aW9zIGFycmF5IHNldCB0byA8Y29kZT5bMCxcblx0ICogMjU1XTwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5TcHJlYWRNZXRob2QuUEFEPC9jb2RlPjwvbGk+XG5cdCAqICAgPGxpPjxjb2RlPkludGVycG9sYXRpb25NZXRob2QuTElORUFSX1JHQjwvY29kZT48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIGlsbHVzdHJhdGlvbnMgc2hvdyBncmFkaWVudHMgaW4gd2hpY2ggdGhlIG1hdHJpeCB3YXNcblx0ICogZGVmaW5lZCB1c2luZyB0aGUgPGNvZGU+Y3JlYXRlR3JhZGllbnRCb3goKTwvY29kZT4gbWV0aG9kIHdpdGggZGlmZmVyZW50XG5cdCAqIHBhcmFtZXRlciBzZXR0aW5nczo8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB3aWR0aCAgICBUaGUgd2lkdGggb2YgdGhlIGdyYWRpZW50IGJveC5cblx0ICogQHBhcmFtIGhlaWdodCAgIFRoZSBoZWlnaHQgb2YgdGhlIGdyYWRpZW50IGJveC5cblx0ICogQHBhcmFtIHJvdGF0aW9uIFRoZSBhbW91bnQgdG8gcm90YXRlLCBpbiByYWRpYW5zLlxuXHQgKiBAcGFyYW0gdHggICAgICAgVGhlIGRpc3RhbmNlLCBpbiBwaXhlbHMsIHRvIHRyYW5zbGF0ZSB0byB0aGUgcmlnaHQgYWxvbmdcblx0ICogICAgICAgICAgICAgICAgIHRoZSA8aT54PC9pPiBheGlzLiBUaGlzIHZhbHVlIGlzIG9mZnNldCBieSBoYWxmIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgPGNvZGU+d2lkdGg8L2NvZGU+IHBhcmFtZXRlci5cblx0ICogQHBhcmFtIHR5ICAgICAgIFRoZSBkaXN0YW5jZSwgaW4gcGl4ZWxzLCB0byB0cmFuc2xhdGUgZG93biBhbG9uZyB0aGVcblx0ICogICAgICAgICAgICAgICAgIDxpPnk8L2k+IGF4aXMuIFRoaXMgdmFsdWUgaXMgb2Zmc2V0IGJ5IGhhbGYgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICA8Y29kZT5oZWlnaHQ8L2NvZGU+IHBhcmFtZXRlci5cblx0ICovXG5cdHB1YmxpYyBjcmVhdGVHcmFkaWVudEJveCh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIHJvdGF0aW9uOm51bWJlciA9IDAsIHR4Om51bWJlciA9IDAsIHR5Om51bWJlciA9IDApOnZvaWRcblx0e1xuXHRcdHRoaXMuYSA9IHdpZHRoLzE2MzguNDtcblx0XHR0aGlzLmQgPSBoZWlnaHQvMTYzOC40O1xuXG5cdFx0aWYgKHJvdGF0aW9uICE9IDAuMCkge1xuXHRcdFx0dmFyIGNvcyA9IE1hdGguY29zKHJvdGF0aW9uKTtcblx0XHRcdHZhciBzaW4gPSBNYXRoLnNpbihyb3RhdGlvbik7XG5cblx0XHRcdHRoaXMuYiA9IHNpbip0aGlzLmQ7XG5cdFx0XHR0aGlzLmMgPSAtc2luKnRoaXMuYTtcblx0XHRcdHRoaXMuYSAqPSBjb3M7XG5cdFx0XHR0aGlzLmQgKj0gY29zO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmIgPSB0aGlzLmMgPSAwO1xuXHRcdH1cblxuXHRcdHRoaXMudHggPSB0eCArIHdpZHRoLzI7XG5cdFx0dGhpcy50eSA9IHR5ICsgaGVpZ2h0LzI7XG5cdH1cblxuXHQvKipcblx0ICogR2l2ZW4gYSBwb2ludCBpbiB0aGUgcHJldHJhbnNmb3JtIGNvb3JkaW5hdGUgc3BhY2UsIHJldHVybnMgdGhlXG5cdCAqIGNvb3JkaW5hdGVzIG9mIHRoYXQgcG9pbnQgYWZ0ZXIgdGhlIHRyYW5zZm9ybWF0aW9uIG9jY3Vycy4gVW5saWtlIHRoZVxuXHQgKiBzdGFuZGFyZCB0cmFuc2Zvcm1hdGlvbiBhcHBsaWVkIHVzaW5nIHRoZSA8Y29kZT50cmFuc2Zvcm1Qb2ludCgpPC9jb2RlPlxuXHQgKiBtZXRob2QsIHRoZSA8Y29kZT5kZWx0YVRyYW5zZm9ybVBvaW50KCk8L2NvZGU+IG1ldGhvZCdzIHRyYW5zZm9ybWF0aW9uXG5cdCAqIGRvZXMgbm90IGNvbnNpZGVyIHRoZSB0cmFuc2xhdGlvbiBwYXJhbWV0ZXJzIDxjb2RlPnR4PC9jb2RlPiBhbmRcblx0ICogPGNvZGU+dHk8L2NvZGU+LlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIHBvaW50IGZvciB3aGljaCB5b3Ugd2FudCB0byBnZXQgdGhlIHJlc3VsdCBvZiB0aGUgbWF0cml4XG5cdCAqICAgICAgICAgICAgICB0cmFuc2Zvcm1hdGlvbi5cblx0ICogQHJldHVybiBUaGUgcG9pbnQgcmVzdWx0aW5nIGZyb20gYXBwbHlpbmcgdGhlIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbi5cblx0ICovXG5cdHB1YmxpYyBkZWx0YVRyYW5zZm9ybVBvaW50KHBvaW50OlBvaW50KTpQb2ludFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBQb2ludChwb2ludC54KnRoaXMuYSArIHBvaW50LnkqdGhpcy5jLCBwb2ludC54KnRoaXMuYiArIHBvaW50LnkqdGhpcy5kKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIGVhY2ggbWF0cml4IHByb3BlcnR5IHRvIGEgdmFsdWUgdGhhdCBjYXVzZXMgYSBudWxsIHRyYW5zZm9ybWF0aW9uLiBBblxuXHQgKiBvYmplY3QgdHJhbnNmb3JtZWQgYnkgYXBwbHlpbmcgYW4gaWRlbnRpdHkgbWF0cml4IHdpbGwgYmUgaWRlbnRpY2FsIHRvIHRoZVxuXHQgKiBvcmlnaW5hbC5cblx0ICpcblx0ICogPHA+QWZ0ZXIgY2FsbGluZyB0aGUgPGNvZGU+aWRlbnRpdHkoKTwvY29kZT4gbWV0aG9kLCB0aGUgcmVzdWx0aW5nIG1hdHJpeFxuXHQgKiBoYXMgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOiA8Y29kZT5hPC9jb2RlPj0xLCA8Y29kZT5iPC9jb2RlPj0wLFxuXHQgKiA8Y29kZT5jPC9jb2RlPj0wLCA8Y29kZT5kPC9jb2RlPj0xLCA8Y29kZT50eDwvY29kZT49MCxcblx0ICogPGNvZGU+dHk8L2NvZGU+PTAuPC9wPlxuXHQgKlxuXHQgKiA8cD5JbiBtYXRyaXggbm90YXRpb24sIHRoZSBpZGVudGl0eSBtYXRyaXggbG9va3MgbGlrZSB0aGlzOjwvcD5cblx0ICpcblx0ICovXG5cdHB1YmxpYyBpZGVudGl0eSgpOnZvaWRcblx0e1xuXHRcdHRoaXMuYSA9IDE7XG5cdFx0dGhpcy5iID0gMDtcblx0XHR0aGlzLmMgPSAwO1xuXHRcdHRoaXMuZCA9IDE7XG5cdFx0dGhpcy50eCA9IDA7XG5cdFx0dGhpcy50eSA9IDA7XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybXMgdGhlIG9wcG9zaXRlIHRyYW5zZm9ybWF0aW9uIG9mIHRoZSBvcmlnaW5hbCBtYXRyaXguIFlvdSBjYW4gYXBwbHlcblx0ICogYW4gaW52ZXJ0ZWQgbWF0cml4IHRvIGFuIG9iamVjdCB0byB1bmRvIHRoZSB0cmFuc2Zvcm1hdGlvbiBwZXJmb3JtZWQgd2hlblxuXHQgKiBhcHBseWluZyB0aGUgb3JpZ2luYWwgbWF0cml4LlxuXHQgKi9cblx0cHVibGljIGludmVydCgpOnZvaWRcblx0e1xuXHRcdHZhciBub3JtID0gdGhpcy5hKnRoaXMuZCAtIHRoaXMuYip0aGlzLmM7XG5cblx0XHRpZiAobm9ybSA9PSAwKSB7XG5cdFx0XHR0aGlzLmEgPSB0aGlzLmIgPSB0aGlzLmMgPSB0aGlzLmQgPSAwO1xuXHRcdFx0dGhpcy50eCA9IC10aGlzLnR4O1xuXHRcdFx0dGhpcy50eSA9IC10aGlzLnR5O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub3JtID0gMS4wL25vcm07XG5cdFx0XHR2YXIgYTEgPSB0aGlzLmQqbm9ybTtcblx0XHRcdHRoaXMuZCA9IHRoaXMuYSpub3JtO1xuXHRcdFx0dGhpcy5hID0gYTE7XG5cdFx0XHR0aGlzLmIgKj0gLW5vcm07XG5cdFx0XHR0aGlzLmMgKj0gLW5vcm07XG5cblx0XHRcdHZhciB0eDEgPSAtdGhpcy5hKnRoaXMudHggLSB0aGlzLmMqdGhpcy50eTtcblx0XHRcdHRoaXMudHkgPSAtdGhpcy5iKnRoaXMudHggLSB0aGlzLmQqdGhpcy50eTtcblx0XHRcdHRoaXMudHggPSB0eDE7XG5cdFx0fVxuXHR9XG5cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBNYXRyaXggb2JqZWN0IHRoYXQgaXMgYSBjbG9uZSBvZiB0aGlzIG1hdHJpeCwgd2l0aCBhbiBleGFjdFxuXHQgKiBjb3B5IG9mIHRoZSBjb250YWluZWQgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gbWF0cml4IFRoZSBtYXRyaXggZm9yIHdoaWNoIHlvdSB3YW50IHRvIGdldCB0aGUgcmVzdWx0IG9mIHRoZSBtYXRyaXhcblx0ICogICAgICAgICAgICAgICB0cmFuc2Zvcm1hdGlvbi5cblx0ICogQHJldHVybiBBIE1hdHJpeCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgbXVsdGlwbHkobWF0cml4Ok1hdHJpeCk6TWF0cml4XG5cdHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IE1hdHJpeCgpO1xuXG5cdFx0cmVzdWx0LmEgPSB0aGlzLmEqbWF0cml4LmEgKyB0aGlzLmIqbWF0cml4LmM7XG5cdFx0cmVzdWx0LmIgPSB0aGlzLmEqbWF0cml4LmIgKyB0aGlzLmIqbWF0cml4LmQ7XG5cdFx0cmVzdWx0LmMgPSB0aGlzLmMqbWF0cml4LmEgKyB0aGlzLmQqbWF0cml4LmM7XG5cdFx0cmVzdWx0LmQgPSB0aGlzLmMqbWF0cml4LmIgKyB0aGlzLmQqbWF0cml4LmQ7XG5cblx0XHRyZXN1bHQudHggPSB0aGlzLnR4Km1hdHJpeC5hICsgdGhpcy50eSptYXRyaXguYyArIG1hdHJpeC50eDtcblx0XHRyZXN1bHQudHkgPSB0aGlzLnR4Km1hdHJpeC5iICsgdGhpcy50eSptYXRyaXguZCArIG1hdHJpeC50eTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogQXBwbGllcyBhIHJvdGF0aW9uIHRyYW5zZm9ybWF0aW9uIHRvIHRoZSBNYXRyaXggb2JqZWN0LlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+cm90YXRlKCk8L2NvZGU+IG1ldGhvZCBhbHRlcnMgdGhlIDxjb2RlPmE8L2NvZGU+LFxuXHQgKiA8Y29kZT5iPC9jb2RlPiwgPGNvZGU+YzwvY29kZT4sIGFuZCA8Y29kZT5kPC9jb2RlPiBwcm9wZXJ0aWVzIG9mIHRoZVxuXHQgKiBNYXRyaXggb2JqZWN0LiBJbiBtYXRyaXggbm90YXRpb24sIHRoaXMgaXMgdGhlIHNhbWUgYXMgY29uY2F0ZW5hdGluZyB0aGVcblx0ICogY3VycmVudCBtYXRyaXggd2l0aCB0aGUgZm9sbG93aW5nOjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGFuZ2xlIFRoZSByb3RhdGlvbiBhbmdsZSBpbiByYWRpYW5zLlxuXHQgKi9cblx0cHVibGljIHJvdGF0ZShhbmdsZTpudW1iZXIpOnZvaWRcblx0e1xuXHRcdHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG5cdFx0dmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcblxuXHRcdHZhciBhMSA9IHRoaXMuYSpjb3MgLSB0aGlzLmIqc2luO1xuXHRcdHRoaXMuYiA9IHRoaXMuYSpzaW4gKyB0aGlzLmIqY29zO1xuXHRcdHRoaXMuYSA9IGExO1xuXG5cdFx0dmFyIGMxID0gdGhpcy5jKmNvcyAtIHRoaXMuZCpzaW47XG5cdFx0dGhpcy5kID0gdGhpcy5jKnNpbiArIHRoaXMuZCpjb3M7XG5cdFx0dGhpcy5jID0gYzE7XG5cblx0XHR2YXIgdHgxID0gdGhpcy50eCpjb3MgLSB0aGlzLnR5KnNpbjtcblx0XHR0aGlzLnR5ID0gdGhpcy50eCpzaW4gKyB0aGlzLnR5KmNvcztcblx0XHR0aGlzLnR4ID0gdHgxO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgYSBzY2FsaW5nIHRyYW5zZm9ybWF0aW9uIHRvIHRoZSBtYXRyaXguIFRoZSA8aT54PC9pPiBheGlzIGlzXG5cdCAqIG11bHRpcGxpZWQgYnkgPGNvZGU+c3g8L2NvZGU+LCBhbmQgdGhlIDxpPnk8L2k+IGF4aXMgaXQgaXMgbXVsdGlwbGllZCBieVxuXHQgKiA8Y29kZT5zeTwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5zY2FsZSgpPC9jb2RlPiBtZXRob2QgYWx0ZXJzIHRoZSA8Y29kZT5hPC9jb2RlPiBhbmRcblx0ICogPGNvZGU+ZDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgTWF0cml4IG9iamVjdC4gSW4gbWF0cml4IG5vdGF0aW9uLCB0aGlzXG5cdCAqIGlzIHRoZSBzYW1lIGFzIGNvbmNhdGVuYXRpbmcgdGhlIGN1cnJlbnQgbWF0cml4IHdpdGggdGhlIGZvbGxvd2luZ1xuXHQgKiBtYXRyaXg6PC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gc3ggQSBtdWx0aXBsaWVyIHVzZWQgdG8gc2NhbGUgdGhlIG9iamVjdCBhbG9uZyB0aGUgPGk+eDwvaT4gYXhpcy5cblx0ICogQHBhcmFtIHN5IEEgbXVsdGlwbGllciB1c2VkIHRvIHNjYWxlIHRoZSBvYmplY3QgYWxvbmcgdGhlIDxpPnk8L2k+IGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgc2NhbGUoc3g6bnVtYmVyLCBzeTpudW1iZXIpOnZvaWRcblx0e1xuXHRcdHRoaXMuYSAqPSBzeDtcblx0XHR0aGlzLmIgKj0gc3k7XG5cblx0XHR0aGlzLmMgKj0gc3g7XG5cdFx0dGhpcy5kICo9IHN5O1xuXG5cdFx0dGhpcy50eCAqPSBzeDtcblx0XHR0aGlzLnR5ICo9IHN5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIG1lbWJlcnMgb2YgTWF0cml4IHRvIHRoZSBzcGVjaWZpZWQgdmFsdWVzLlxuXHQgKlxuXHQgKiBAcGFyYW0gYSAgVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZVxuXHQgKiAgICAgICAgICAgPGk+eDwvaT4gYXhpcyB3aGVuIHNjYWxpbmcgb3Igcm90YXRpbmcgYW4gaW1hZ2UuXG5cdCAqIEBwYXJhbSBiICBUaGUgdmFsdWUgdGhhdCBhZmZlY3RzIHRoZSBwb3NpdGlvbmluZyBvZiBwaXhlbHMgYWxvbmcgdGhlXG5cdCAqICAgICAgICAgICA8aT55PC9pPiBheGlzIHdoZW4gcm90YXRpbmcgb3Igc2tld2luZyBhbiBpbWFnZS5cblx0ICogQHBhcmFtIGMgIFRoZSB2YWx1ZSB0aGF0IGFmZmVjdHMgdGhlIHBvc2l0aW9uaW5nIG9mIHBpeGVscyBhbG9uZyB0aGVcblx0ICogICAgICAgICAgIDxpPng8L2k+IGF4aXMgd2hlbiByb3RhdGluZyBvciBza2V3aW5nIGFuIGltYWdlLlxuXHQgKiBAcGFyYW0gZCAgVGhlIHZhbHVlIHRoYXQgYWZmZWN0cyB0aGUgcG9zaXRpb25pbmcgb2YgcGl4ZWxzIGFsb25nIHRoZVxuXHQgKiAgICAgICAgICAgPGk+eTwvaT4gYXhpcyB3aGVuIHNjYWxpbmcgb3Igcm90YXRpbmcgYW4gaW1hZ2UuLlxuXHQgKiBAcGFyYW0gdHggVGhlIGRpc3RhbmNlIGJ5IHdoaWNoIHRvIHRyYW5zbGF0ZSBlYWNoIHBvaW50IGFsb25nIHRoZSA8aT54PC9pPlxuXHQgKiAgICAgICAgICAgYXhpcy5cblx0ICogQHBhcmFtIHR5IFRoZSBkaXN0YW5jZSBieSB3aGljaCB0byB0cmFuc2xhdGUgZWFjaCBwb2ludCBhbG9uZyB0aGUgPGk+eTwvaT5cblx0ICogICAgICAgICAgIGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgc2V0VG8oYTpudW1iZXIsIGI6bnVtYmVyLCBjOm51bWJlciwgZDpudW1iZXIsIHR4Om51bWJlciwgdHk6bnVtYmVyKTp2b2lkXG5cdHtcblx0XHR0aGlzLmEgPSBhO1xuXHRcdHRoaXMuYiA9IGI7XG5cdFx0dGhpcy5jID0gYztcblx0XHR0aGlzLmQgPSBkO1xuXHRcdHRoaXMudHggPSB0eDtcblx0XHR0aGlzLnR5ID0gdHk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHRleHQgdmFsdWUgbGlzdGluZyB0aGUgcHJvcGVydGllcyBvZiB0aGUgTWF0cml4IG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiBBIHN0cmluZyBjb250YWluaW5nIHRoZSB2YWx1ZXMgb2YgdGhlIHByb3BlcnRpZXMgb2YgdGhlIE1hdHJpeFxuXHQgKiAgICAgICAgIG9iamVjdDogPGNvZGU+YTwvY29kZT4sIDxjb2RlPmI8L2NvZGU+LCA8Y29kZT5jPC9jb2RlPixcblx0ICogICAgICAgICA8Y29kZT5kPC9jb2RlPiwgPGNvZGU+dHg8L2NvZGU+LCBhbmQgPGNvZGU+dHk8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIHRvU3RyaW5nKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gXCJbTWF0cml4XSAoYT1cIiArIHRoaXMuYSArIFwiLCBiPVwiICsgdGhpcy5iICsgXCIsIGM9XCIgKyB0aGlzLmMgKyBcIiwgZD1cIiArIHRoaXMuZCArIFwiLCB0eD1cIiArIHRoaXMudHggKyBcIiwgdHk9XCIgKyB0aGlzLnR5ICsgXCIpXCI7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIHRoZSBnZW9tZXRyaWMgdHJhbnNmb3JtYXRpb24gcmVwcmVzZW50ZWQgYnlcblx0ICogdGhlIE1hdHJpeCBvYmplY3QgdG8gdGhlIHNwZWNpZmllZCBwb2ludC5cblx0ICpcblx0ICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCBmb3Igd2hpY2ggeW91IHdhbnQgdG8gZ2V0IHRoZSByZXN1bHQgb2YgdGhlIE1hdHJpeFxuXHQgKiAgICAgICAgICAgICAgdHJhbnNmb3JtYXRpb24uXG5cdCAqIEByZXR1cm4gVGhlIHBvaW50IHJlc3VsdGluZyBmcm9tIGFwcGx5aW5nIHRoZSBNYXRyaXggdHJhbnNmb3JtYXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgdHJhbnNmb3JtUG9pbnQocG9pbnQ6UG9pbnQpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KHBvaW50LngqdGhpcy5hICsgcG9pbnQueSp0aGlzLmMgKyB0aGlzLnR4LCBwb2ludC54KnRoaXMuYiArIHBvaW50LnkqdGhpcy5kICsgdGhpcy50eSk7XG5cdH1cblxuXHQvKipcblx0ICogVHJhbnNsYXRlcyB0aGUgbWF0cml4IGFsb25nIHRoZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gYXhlcywgYXMgc3BlY2lmaWVkXG5cdCAqIGJ5IHRoZSA8Y29kZT5keDwvY29kZT4gYW5kIDxjb2RlPmR5PC9jb2RlPiBwYXJhbWV0ZXJzLlxuXHQgKlxuXHQgKiBAcGFyYW0gZHggVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgPGk+eDwvaT4gYXhpcyB0byB0aGUgcmlnaHQsIGluXG5cdCAqICAgICAgICAgICBwaXhlbHMuXG5cdCAqIEBwYXJhbSBkeSBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGRvd24gYWxvbmcgdGhlIDxpPnk8L2k+IGF4aXMsIGluIHBpeGVscy5cblx0ICovXG5cdHB1YmxpYyB0cmFuc2xhdGUoZHg6bnVtYmVyLCBkeTpudW1iZXIpOnZvaWRcblx0e1xuXHRcdHRoaXMudHggKz0gZHg7XG5cdFx0dGhpcy50eSArPSBkeTtcblx0fVxufVxuXG5leHBvcnQgPSBNYXRyaXg7Il19