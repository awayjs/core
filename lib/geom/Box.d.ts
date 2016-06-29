import { Vector3D } from "../geom/Vector3D";
/**
 * A Box object is an area defined by its position, as indicated by its
 * top-left-front corner point(<i>x</i>, <i>y</i>, <i>z</i>) and by its width,
 * height and depth.
 *
 *
 * <p>The <code>x</code>, <code>y</code>, <code>z</code>, <code>width</code>,
 * <code>height</code> <code>depth</code> properties of the Box export class are
 * independent of each other; changing the value of one property has no effect
 * on the others. However, the <code>right</code>, <code>bottom</code> and
 * <code>back</code> properties are integrally related to those six
 * properties. For example, if you change the value of the <code>right</code>
 * property, the value of the <code>width</code> property changes; if you
 * change the <code>bottom</code> property, the value of the
 * <code>height</code> property changes. </p>
 *
 * <p>The following methods and properties use Box objects:</p>
 *
 * <ul>
 *   <li>The <code>bounds</code> property of the DisplayObject class</li>
 * </ul>
 *
 * <p>You can use the <code>new Box()</code> constructor to create a
 * Box object.</p>
 *
 * <p><b>Note:</b> The Box export class does not define a cubic Shape
 * display object.
 */
export declare class Box {
    private _size;
    private _bottomRightBack;
    private _topLeftFront;
    /**
     * The height of the box, in pixels. Changing the <code>height</code> value
     * of a Box object has no effect on the <code>x</code>, <code>y</code>,
     * <code>z</code>, <code>depth</code> and <code>width</code> properties.
     */
    height: number;
    /**
     * The width of the box, in pixels. Changing the <code>width</code> value
     * of a Box object has no effect on the <code>x</code>, <code>y</code>,
     * <code>z</code>, <code>depth</code> and <code>height</code> properties.
     */
    width: number;
    /**
     * The deoth of the box, in pixels. Changing the <code>depth</code> value
     * of a Box object has no effect on the <code>x</code>, <code>y</code>,
     * <code>z</code>, <code>width</code> and <code>height</code> properties.
     */
    depth: number;
    /**
     * The <i>x</i> coordinate of the top-left-front corner of the box.
     * Changing the value of the <code>x</code> property of a Box object has no
     * effect on the <code>y</code>, <code>z</code>, <code>width</code>,
     * <code>height</code> and <code>depth</code> properties.
     *
     * <p>The value of the <code>x</code> property is equal to the value of the
     * <code>left</code> property.</p>
     */
    x: number;
    /**
     * The <i>y</i> coordinate of the top-left-front corner of the box.
     * Changing the value of the <code>y</code> property of a Box object has no
     * effect on the <code>x</code>, <code>z</code>, <code>width</code>,
     * <code>height</code> and <code>depth</code> properties.
     *
     * <p>The value of the <code>y</code> property is equal to the value of the
     * <code>top</code> property.</p>
     */
    y: number;
    /**
     * The <i>y</i> coordinate of the top-left-front corner of the box.
     * Changing the value of the <code>z</code> property of a Box object has no
     * effect on the <code>x</code>, <code>y</code>, <code>width</code>,
     * <code>height</code> and <code>depth</code> properties.
     *
     * <p>The value of the <code>z</code> property is equal to the value of the
     * <code>front</code> property.</p>
     */
    z: number;
    /**
     * The sum of the <code>z</code> and <code>height</code> properties.
     */
    back: number;
    /**
     * The sum of the <code>y</code> and <code>height</code> properties.
     */
    bottom: number;
    /**
     * The location of the Box object's bottom-right corner, determined by the
     * values of the <code>right</code> and <code>bottom</code> properties.
     */
    readonly bottomRightBack: Vector3D;
    /**
     * The <i>z</i> coordinate of the top-left-front corner of the box. Changing
     * the <code>front</code> property of a Box object has no effect on the
     * <code>x</code>, <code>y</code>, <code>width</code> and <code>height</code>
     * properties. However it does affect the <code>depth</code> property,
     * whereas changing the <code>z</code> value does <i>not</i> affect the
     * <code>depth</code> property.
     *
     * <p>The value of the <code>left</code> property is equal to the value of
     * the <code>x</code> property.</p>
     */
    front: number;
    /**
     * The <i>x</i> coordinate of the top-left corner of the box. Changing the
     * <code>left</code> property of a Box object has no effect on the
     * <code>y</code> and <code>height</code> properties. However it does affect
     * the <code>width</code> property, whereas changing the <code>x</code> value
     * does <i>not</i> affect the <code>width</code> property.
     *
     * <p>The value of the <code>left</code> property is equal to the value of
     * the <code>x</code> property.</p>
     */
    left: number;
    /**
     * The sum of the <code>x</code> and <code>width</code> properties.
     */
    right: number;
    /**
     * The size of the Box object, expressed as a Vector3D object with the
     * values of the <code>width</code>, <code>height</code> and
     * <code>depth</code> properties.
     */
    readonly size: Vector3D;
    /**
     * The <i>y</i> coordinate of the top-left-front corner of the box. Changing
     * the <code>top</code> property of a Box object has no effect on the
     * <code>x</code> and <code>width</code> properties. However it does affect
     * the <code>height</code> property, whereas changing the <code>y</code>
     * value does <i>not</i> affect the <code>height</code> property.
     *
     * <p>The value of the <code>top</code> property is equal to the value of the
     * <code>y</code> property.</p>
     */
    top: number;
    /**
     * The location of the Box object's top-left-front corner, determined by the
     * <i>x</i>, <i>y</i> and <i>z</i> coordinates of the point.
     */
    readonly topLeftFront: Vector3D;
    /**
     * Creates a new Box object with the top-left-front corner specified by the
     * <code>x</code>, <code>y</code> and <code>z</code> parameters and with the
     * specified <code>width</code>, <code>height</code> and <code>depth</code>
     * parameters. If you call this public without parameters, a box with
     * <code>x</code>, <code>y</code>, <code>z</code>, <code>width</code>,
     * <code>height</code> and <code>depth</code> properties set to 0 is created.
     *
     * @param x      The <i>x</i> coordinate of the top-left-front corner of the
     *               box.
     * @param y      The <i>y</i> coordinate of the top-left-front corner of the
     *               box.
     * @param z      The <i>z</i> coordinate of the top-left-front corner of the
     *               box.
     * @param width  The width of the box, in pixels.
     * @param height The height of the box, in pixels.
     * @param depth The depth of the box, in pixels.
     */
    constructor(x?: number, y?: number, z?: number, width?: number, height?: number, depth?: number);
    /**
     * Returns a new Box object with the same values for the <code>x</code>,
     * <code>y</code>, <code>z</code>, <code>width</code>, <code>height</code>
     * and <code>depth</code> properties as the original Box object.
     *
     * @return A new Box object with the same values for the <code>x</code>,
     *         <code>y</code>, <code>z</code>, <code>width</code>,
     *         <code>height</code> and <code>depth</code> properties as the
     *         original Box object.
     */
    clone(): Box;
    /**
     * Determines whether the specified position is contained within the cubic
     * region defined by this Box object.
     *
     * @param x The <i>x</i> coordinate(horizontal component) of the position.
     * @param y The <i>y</i> coordinate(vertical component) of the position.
     * @param z The <i>z</i> coordinate(longitudinal component) of the position.
     * @return A value of <code>true</code> if the Box object contains the
     *         specified position; otherwise <code>false</code>.
     */
    contains(x: number, y: number, z: number): boolean;
    /**
     * Determines whether the specified position is contained within the cubic
     * region defined by this Box object. This method is similar to the
     * <code>Box.contains()</code> method, except that it takes a Vector3D
     * object as a parameter.
     *
     * @param position The position, as represented by its <i>x</i>, <i>y</i> and
     *                 <i>z</i> coordinates.
     * @return A value of <code>true</code> if the Box object contains the
     *         specified position; otherwise <code>false</code>.
     */
    containsPoint(position: Vector3D): boolean;
    /**
     * Determines whether the Box object specified by the <code>box</code>
     * parameter is contained within this Box object. A Box object is said to
     * contain another if the second Box object falls entirely within the
     * boundaries of the first.
     *
     * @param box The Box object being checked.
     * @return A value of <code>true</code> if the Box object that you specify
     *         is contained by this Box object; otherwise <code>false</code>.
     */
    containsBox(box: Box): boolean;
    /**
     * Copies all of box data from the source Box object into the calling
     * Box object.
     *
     * @param sourceBox The Box object from which to copy the data.
     */
    copyFrom(sourceBox: Box): void;
    /**
     * Determines whether the object specified in the <code>toCompare</code>
     * parameter is equal to this Box object. This method compares the
     * <code>x</code>, <code>y</code>, <code>z</code>, <code>width</code>,
     * <code>height</code> and <code>depth</code> properties of an object against
     * the same properties of this Box object.
     *
     * @param toCompare The box to compare to this Box object.
     * @return A value of <code>true</code> if the object has exactly the same
     *         values for the <code>x</code>, <code>y</code>, <code>z</code>,
     *         <code>width</code>, <code>height</code> and <code>depth</code>
     *         properties as this Box object; otherwise <code>false</code>.
     */
    equals(toCompare: Box): boolean;
    /**
     * Increases the size of the Box object by the specified amounts, in
     * pixels. The center point of the Box object stays the same, and its
     * size increases to the left and right by the <code>dx</code> value, to
     * the top and the bottom by the <code>dy</code> value, and to
     * the front and the back by the <code>dz</code> value.
     *
     * @param dx The value to be added to the left and the right of the Box
     *           object. The following equation is used to calculate the new
     *           width and position of the box:
     * @param dy The value to be added to the top and the bottom of the Box
     *           object. The following equation is used to calculate the new
     *           height and position of the box:
     * @param dz The value to be added to the front and the back of the Box
     *           object. The following equation is used to calculate the new
     *           depth and position of the box:
     */
    inflate(dx: number, dy: number, dz: number): void;
    /**
     * Increases the size of the Box object. This method is similar to the
     * <code>Box.inflate()</code> method except it takes a Vector3D object as
     * a parameter.
     *
     * <p>The following two code examples give the same result:</p>
     *
     * @param delta The <code>x</code> property of this Vector3D object is used to
     *              increase the horizontal dimension of the Box object.
     *              The <code>y</code> property is used to increase the vertical
     *              dimension of the Box object.
     *              The <code>z</code> property is used to increase the
     *              longitudinal dimension of the Box object.
     */
    inflatePoint(delta: Vector3D): void;
    /**
     * If the Box object specified in the <code>toIntersect</code> parameter
     * intersects with this Box object, returns the area of intersection
     * as a Box object. If the boxes do not intersect, this method returns an
     * empty Box object with its properties set to 0.
     *
     * @param toIntersect The Box object to compare against to see if it
     *                    intersects with this Box object.
     * @return A Box object that equals the area of intersection. If the
     *         boxes do not intersect, this method returns an empty Box
     *         object; that is, a box with its <code>x</code>, <code>y</code>,
     *         <code>z</code>, <code>width</code>,  <code>height</code>, and
     *         <code>depth</code> properties set to 0.
     */
    intersection(toIntersect: Box): Box;
    /**
     * Determines whether the object specified in the <code>toIntersect</code>
     * parameter intersects with this Box object. This method checks the
     * <code>x</code>, <code>y</code>, <code>z</code>, <code>width</code>,
     * <code>height</code>, and <code>depth</code> properties of the specified
     * Box object to see if it intersects with this Box object.
     *
     * @param toIntersect The Box object to compare against this Box object.
     * @return A value of <code>true</code> if the specified object intersects
     *         with this Box object; otherwise <code>false</code>.
     */
    intersects(toIntersect: Box): boolean;
    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
    /**
     * Finds the closest point on the Box to another given point. This can be used for maximum error calculations for content within a given Box.
     *
     * @param point The point for which to find the closest point on the Box
     * @param target An optional Vector3D to store the result to prevent creating a new object.
     * @return
     */
    closestPointToPoint(point: Vector3D, target?: Vector3D): Vector3D;
    /**
     * Determines whether or not this Box object is empty.
     *
     * @return A value of <code>true</code> if the Box object's width, height or
     *         depth is less than or equal to 0; otherwise <code>false</code>.
     */
    isEmpty(): boolean;
    /**
     * Adjusts the location of the Box object, as determined by its
     * top-left-front corner, by the specified amounts.
     *
     * @param dx Moves the <i>x</i> value of the Box object by this amount.
     * @param dy Moves the <i>y</i> value of the Box object by this amount.
     * @param dz Moves the <i>z</i> value of the Box object by this amount.
     */
    offset(dx: number, dy: number, dz: number): void;
    /**
     * Adjusts the location of the Box object using a Vector3D object as a
     * parameter. This method is similar to the <code>Box.offset()</code>
     * method, except that it takes a Vector3D object as a parameter.
     *
     * @param position A Vector3D object to use to offset this Box object.
     */
    offsetPosition(position: Vector3D): void;
    /**
     * Sets all of the Box object's properties to 0. A Box object is empty if its
     * width, height or depth is less than or equal to 0.
     *
     * <p> This method sets the values of the <code>x</code>, <code>y</code>,
     * <code>z</code>, <code>width</code>, <code>height</code>, and
     * <code>depth</code> properties to 0.</p>
     *
     */
    setEmpty(): void;
    setBoundIdentity(): void;
    /**
     * Sets the members of Box to the specified values
     *
     * @param xa      The <i>x</i> coordinate of the top-left-front corner of the
     *                box.
     * @param ya      The <i>y</i> coordinate of the top-left-front corner of the
     *                box.
     * @param yz      The <i>z</i> coordinate of the top-left-front corner of the
     *                box.
     * @param widtha  The width of the box, in pixels.
     * @param heighta The height of the box, in pixels.
     * @param deptha  The depth of the box, in pixels.
     */
    setTo(xa: number, ya: number, za: number, widtha: number, heighta: number, deptha: number): void;
    /**
     * Builds and returns a string that lists the horizontal, vertical and
     * longitudinal positions and the width, height and depth of the Box object.
     *
     * @return A string listing the value of each of the following properties of
     *         the Box object: <code>x</code>, <code>y</code>, <code>z</code>,
     *         <code>width</code>, <code>height</code>, and <code>depth</code>.
     */
    toString(): string;
    /**
     * Adds two boxes together to create a new Box object, by filling
     * in the horizontal, vertical and longitudinal space between the two boxes.
     *
     * <p><b>Note:</b> The <code>union()</code> method ignores boxes with
     * <code>0</code> as the height, width or depth value, such as: <code>var
     * box2:Box = new Box(300,300,300,50,50,0);</code></p>
     *
     * @param toUnion A Box object to add to this Box object.
     * @return A new Box object that is the union of the two boxes.
     */
    union(toUnion: Box, target?: Box): Box;
}
