import { Point } from "../geom/Point";
import { Vector3D } from "../geom/Vector3D";
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
export declare class Matrix {
    rawData: Float32Array;
    /**
     * The value that affects the positioning of pixels along the <i>x</i> axis
     * when scaling or rotating an image.
     */
    a: number;
    /**
     * The value that affects the positioning of pixels along the <i>y</i> axis
     * when rotating or skewing an image.
     */
    b: number;
    /**
     * The value that affects the positioning of pixels along the <i>x</i> axis
     * when rotating or skewing an image.
     */
    c: number;
    /**
     * The value that affects the positioning of pixels along the <i>y</i> axis
     * when scaling or rotating an image.
     */
    d: number;
    /**
     * The distance by which to translate each point along the <i>x</i> axis.
     */
    tx: number;
    /**
     * The distance by which to translate each point along the <i>y</i> axis.
     */
    ty: number;
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
    constructor(rawData?: Float32Array);
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    copyRawDataFrom(vector: Float32Array, index?: number): void;
    /**
     * Returns a new Matrix object that is a clone of this matrix, with an exact
     * copy of the contained object.
     *
     * @return A Matrix object.
     */
    clone(): Matrix;
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
    concat(matrix: Matrix): void;
    /**
     * Copies a Vector3D object into specific column of the calling Matrix3D
     * object.
     *
     * @param column   The column from which to copy the data from.
     * @param vector3D The Vector3D object from which to copy the data.
     */
    copyColumnFrom(column: number, vector3D: Vector3D): void;
    /**
     * Copies specific column of the calling Matrix object into the Vector3D
     * object. The w element of the Vector3D object will not be changed.
     *
     * @param column   The column from which to copy the data from.
     * @param vector3D The Vector3D object from which to copy the data.
     */
    copyColumnTo(column: number, vector3D: Vector3D): void;
    /**
     * Copies all of the matrix data from the source Point object into the
     * calling Matrix object.
     *
     * @param sourceMatrix The Matrix object from which to copy the data.
     */
    copyFrom(sourceMatrix: Matrix): void;
    /**
     * Copies a Vector3D object into specific row of the calling Matrix object.
     *
     * @param row      The row from which to copy the data from.
     * @param vector3D The Vector3D object from which to copy the data.
     */
    copyRowFrom(row: number, vector3D: Vector3D): void;
    /**
     * Copies specific row of the calling Matrix object into the Vector3D object.
     * The w element of the Vector3D object will not be changed.
     *
     * @param row      The row from which to copy the data from.
     * @param vector3D The Vector3D object from which to copy the data.
     */
    copyRowTo(row: number, vector3D: Vector3D): void;
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
    createBox(scaleX: number, scaleY: number, rotation?: number, tx?: number, ty?: number): void;
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
    createGradientBox(width: number, height: number, rotation?: number, tx?: number, ty?: number): void;
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
    deltaTransformPoint(point: Point): Point;
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
    identity(): void;
    /**
     * Performs the opposite transformation of the original matrix. You can apply
     * an inverted matrix to an object to undo the transformation performed when
     * applying the original matrix.
     */
    invert(): void;
    /**
     * Returns a new Matrix object that is a clone of this matrix, with an exact
     * copy of the contained object.
     *
     * @param matrix The matrix for which you want to get the result of the matrix
     *               transformation.
     * @return A Matrix object.
     */
    multiply(matrix: Matrix): Matrix;
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
    rotate(angle: number): void;
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
    scale(sx: number, sy: number): void;
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
    setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
    /**
     * Returns a text value listing the properties of the Matrix object.
     *
     * @return A string containing the values of the properties of the Matrix
     *         object: <code>a</code>, <code>b</code>, <code>c</code>,
     *         <code>d</code>, <code>tx</code>, and <code>ty</code>.
     */
    toString(): string;
    /**
     * Returns the result of applying the geometric transformation represented by
     * the Matrix object to the specified point.
     *
     * @param point The point for which you want to get the result of the Matrix
     *              transformation.
     * @return The point resulting from applying the Matrix transformation.
     */
    transformPoint(point: Point): Point;
    /**
     * Translates the matrix along the <i>x</i> and <i>y</i> axes, as specified
     * by the <code>dx</code> and <code>dy</code> parameters.
     *
     * @param dx The amount of movement along the <i>x</i> axis to the right, in
     *           pixels.
     * @param dy The amount of movement down along the <i>y</i> axis, in pixels.
     */
    translate(dx: number, dy: number): void;
}
