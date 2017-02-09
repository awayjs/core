import {Vector3D}					from "../geom/Vector3D";

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
export class Box
{
	private _size:Vector3D;
	private _bottomRightBack:Vector3D;
	private _topLeftFront:Vector3D;

	/**
	 * The height of the box, in pixels. Changing the <code>height</code> value
	 * of a Box object has no effect on the <code>x</code>, <code>y</code>,
	 * <code>z</code>, <code>depth</code> and <code>width</code> properties.
	 */
	public height:number;

	/**
	 * The width of the box, in pixels. Changing the <code>width</code> value
	 * of a Box object has no effect on the <code>x</code>, <code>y</code>,
	 * <code>z</code>, <code>depth</code> and <code>height</code> properties.
	 */
	public width:number;

	/**
	 * The deoth of the box, in pixels. Changing the <code>depth</code> value
	 * of a Box object has no effect on the <code>x</code>, <code>y</code>,
	 * <code>z</code>, <code>width</code> and <code>height</code> properties.
	 */
	public depth:number;

	/**
	 * The <i>x</i> coordinate of the top-left-front corner of the box.
	 * Changing the value of the <code>x</code> property of a Box object has no
	 * effect on the <code>y</code>, <code>z</code>, <code>width</code>,
	 * <code>height</code> and <code>depth</code> properties.
	 *
	 * <p>The value of the <code>x</code> property is equal to the value of the
	 * <code>left</code> property.</p>
	 */
	public x:number;

	/**
	 * The <i>y</i> coordinate of the top-left-front corner of the box.
	 * Changing the value of the <code>y</code> property of a Box object has no
	 * effect on the <code>x</code>, <code>z</code>, <code>width</code>,
	 * <code>height</code> and <code>depth</code> properties.
	 *
	 * <p>The value of the <code>y</code> property is equal to the value of the
	 * <code>top</code> property.</p>
	 */
	public y:number;

	/**
	 * The <i>y</i> coordinate of the top-left-front corner of the box.
	 * Changing the value of the <code>z</code> property of a Box object has no
	 * effect on the <code>x</code>, <code>y</code>, <code>width</code>,
	 * <code>height</code> and <code>depth</code> properties.
	 *
	 * <p>The value of the <code>z</code> property is equal to the value of the
	 * <code>front</code> property.</p>
	 */
	public z:number

	/**
	 * The sum of the <code>z</code> and <code>height</code> properties.
	 */
	public get back():number
	{
		return this.z + this.depth;
	}

	public set back(val:number)
	{
		this.depth = val - this.z;
	}

	/**
	 * The sum of the <code>y</code> and <code>height</code> properties.
	 */
	public get bottom():number
	{
		return this.y + this.height;
	}

	public set bottom(val:number)
	{
		this.height = val - this.y;
	}

	/**
	 * The location of the Box object's bottom-right corner, determined by the
	 * values of the <code>right</code> and <code>bottom</code> properties.
	 */
	public get bottomRightBack():Vector3D
	{
		if (this._bottomRightBack == null)
			this._bottomRightBack = new Vector3D();

		this._bottomRightBack.x = this.x + this.width;
		this._bottomRightBack.y = this.y + this.height;
		this._bottomRightBack.z = this.z + this.depth;

		return this._bottomRightBack;
	}

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
	public get front():number
	{
		return this.z;
	}

	public set front(val:number)
	{
		this.depth += this.z - val;
		this.z = val;
	}

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
	public get left():number
	{
		return this.x;
	}

	public set left(val:number)
	{
		this.width += this.x - val;
		this.x = val;
	}

	/**
	 * The sum of the <code>x</code> and <code>width</code> properties.
	 */
	public get right():number
	{
		return this.x + this.width;
	}

	public set right(val:number)
	{
		this.width = val - this.x;
	}

	/**
	 * The size of the Box object, expressed as a Vector3D object with the
	 * values of the <code>width</code>, <code>height</code> and
	 * <code>depth</code> properties.
	 */
	public get size():Vector3D
	{
		if (this._size == null)
			this._size = new Vector3D();

		this._size.x = this.width;
		this._size.y = this.height;
		this._size.z = this.depth;

		return this._size;
	}

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
	public get top():number
	{
		return this.y;
	}

	public set top(val:number)
	{
		this.height += (this.y - val);
		this.y = val;
	}

	/**
	 * The location of the Box object's top-left-front corner, determined by the
	 * <i>x</i>, <i>y</i> and <i>z</i> coordinates of the point.
	 */
	public get topLeftFront():Vector3D
	{
		if (this._topLeftFront == null)
			this._topLeftFront = new Vector3D();

		this._topLeftFront.x = this.x;
		this._topLeftFront.y = this.y;
		this._topLeftFront.z = this.z;

		return this._topLeftFront;
	}

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
	constructor(x:number = 0, y:number = 0, z:number = 0, width:number = 0, height:number = 0, depth:number = 0)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.width = width;
		this.height = height;
		this.depth = depth;
	}

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
	public clone():Box
	{
		return new Box(this.x, this.y, this.z, this.width, this.height, this.depth);
	}

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
	public contains(x:number, y:number, z:number):boolean
	{
		return (this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y && this.z <= z && this.z + this.depth >= z);
	}

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
	public containsPoint(position:Vector3D):boolean
	{
		return (this.x <= position.x && this.x + this.width >= position.x && this.y <= position.y && this.y + this.height >= position.y && this.z <= position.z && this.z + this.depth >= position.z);
	}

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
	public containsBox(box:Box):boolean
	{
		return (this.x <= box.x && this.x + this.width >= box.x + box.width && this.y <= box.y && this.y + this.height >= box.y + box.height && this.z <= box.z && this.z + this.depth >= box.z + box.depth)
	}

	/**
	 * Copies all of box data from the source Box object into the calling
	 * Box object.
	 *
	 * @param sourceBox The Box object from which to copy the data.
	 */
	public copyFrom(sourceBox:Box):void
	{
		this.x = sourceBox.x;
		this.y = sourceBox.y;
		this.z = sourceBox.z;
		this.width = sourceBox.width;
		this.height = sourceBox.height;
		this.depth = sourceBox.depth;
	}

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
	public equals(toCompare:Box):boolean
	{
		return (this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && this.width == toCompare.width && this.height == toCompare.height && this.depth == toCompare.depth)
	}

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
	public inflate(dx:number, dy:number, dz:number):void
	{
		this.x -= dx/2;
		this.y -= dy/2;
		this.z -= dz/2;
		this.width += dx/2;
		this.height += dy/2;
		this.depth += dz/2;
	}

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
	public inflatePoint(delta:Vector3D):void
	{
		this.x -= delta.x/2;
		this.y -= delta.y/2;
		this.z -= delta.z/2;
		this.width += delta.x/2;
		this.height += delta.y/2;
		this.depth += delta.z/2;
	}

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
	public intersection(toIntersect:Box):Box
	{
		if (this.intersects(toIntersect)) {
			var i:Box = new Box();

			if (this.x > toIntersect.x) {
				i.x = this.x;
				i.width = toIntersect.x - this.x + toIntersect.width;

				if (i.width > this.width)
					i.width = this.width;
			} else {
				i.x = toIntersect.x;
				i.width = this.x - toIntersect.x + this.width;

				if (i.width > toIntersect.width)
					i.width = toIntersect.width;
			}

			if (this.y > toIntersect.y) {
				i.y = this.y;
				i.height = toIntersect.y - this.y + toIntersect.height;

				if (i.height > this.height)
					i.height = this.height;
			} else {
				i.y = toIntersect.y;
				i.height = this.y - toIntersect.y + this.height;

				if (i.height > toIntersect.height)
					i.height = toIntersect.height;
			}


			if (this.z > toIntersect.z) {
				i.z = this.z;
				i.depth = toIntersect.z - this.z + toIntersect.depth;

				if (i.depth > this.depth)
					i.depth = this.depth;
			} else {
				i.z = toIntersect.z;
				i.depth = this.z - toIntersect.z + this.depth;

				if (i.depth > toIntersect.depth)
					i.depth = toIntersect.depth;
			}

			return i;
		}

		return new Box();
	}

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
	public intersects(toIntersect:Box):boolean
	{
		return (this.x + this.width > toIntersect.x && this.x < toIntersect.x + toIntersect.width && this.y + this.height > toIntersect.y && this.y < toIntersect.y + toIntersect.height && this.z + this.depth > toIntersect.z && this.z < toIntersect.z + toIntersect.depth);
	}

	public rayIntersection(position:Vector3D, direction:Vector3D, targetNormal:Vector3D):number
	{
		if (this.containsPoint(position))
			return 0;

		var halfExtentsX:number = this.width/2;
		var halfExtentsY:number = this.height/2;
		var halfExtentsZ:number = this.depth/2;

		var centerX:number = this.x + halfExtentsX;
		var centerY:number = this.y + halfExtentsY;
		var centerZ:number = this.z + halfExtentsZ;

		var px:number = position.x - centerX;
		var py:number = position.y - centerY;
		var pz:number = position.z - centerZ;

		var vx:number = direction.x;
		var vy:number = direction.y;
		var vz:number = direction.z;

		var ix:number;
		var iy:number;
		var iz:number;
		var rayEntryDistance:number;

		// ray-plane tests
		var intersects:boolean;
		if (vx < 0) {
			rayEntryDistance = ( halfExtentsX - px )/vx;
			if (rayEntryDistance > 0) {
				iy = py + rayEntryDistance*vy;
				iz = pz + rayEntryDistance*vz;
				if (iy > -halfExtentsY && iy < halfExtentsY && iz > -halfExtentsZ && iz < halfExtentsZ) {
					targetNormal.x = 1;
					targetNormal.y = 0;
					targetNormal.z = 0;

					intersects = true;
				}
			}
		}
		if (!intersects && vx > 0) {
			rayEntryDistance = ( -halfExtentsX - px )/vx;
			if (rayEntryDistance > 0) {
				iy = py + rayEntryDistance*vy;
				iz = pz + rayEntryDistance*vz;
				if (iy > -halfExtentsY && iy < halfExtentsY && iz > -halfExtentsZ && iz < halfExtentsZ) {
					targetNormal.x = -1;
					targetNormal.y = 0;
					targetNormal.z = 0;
					intersects = true;
				}
			}
		}
		if (!intersects && vy < 0) {
			rayEntryDistance = ( halfExtentsY - py )/vy;
			if (rayEntryDistance > 0) {
				ix = px + rayEntryDistance*vx;
				iz = pz + rayEntryDistance*vz;
				if (ix > -halfExtentsX && ix < halfExtentsX && iz > -halfExtentsZ && iz < halfExtentsZ) {
					targetNormal.x = 0;
					targetNormal.y = 1;
					targetNormal.z = 0;
					intersects = true;
				}
			}
		}
		if (!intersects && vy > 0) {
			rayEntryDistance = ( -halfExtentsY - py )/vy;
			if (rayEntryDistance > 0) {
				ix = px + rayEntryDistance*vx;
				iz = pz + rayEntryDistance*vz;
				if (ix > -halfExtentsX && ix < halfExtentsX && iz > -halfExtentsZ && iz < halfExtentsZ) {
					targetNormal.x = 0;
					targetNormal.y = -1;
					targetNormal.z = 0;
					intersects = true;
				}
			}
		}
		if (!intersects && vz < 0) {
			rayEntryDistance = ( halfExtentsZ - pz )/vz;
			if (rayEntryDistance > 0) {
				ix = px + rayEntryDistance*vx;
				iy = py + rayEntryDistance*vy;
				if (iy > -halfExtentsY && iy < halfExtentsY && ix > -halfExtentsX && ix < halfExtentsX) {
					targetNormal.x = 0;
					targetNormal.y = 0;
					targetNormal.z = 1;
					intersects = true;
				}
			}
		}
		if (!intersects && vz > 0) {
			rayEntryDistance = ( -halfExtentsZ - pz )/vz;
			if (rayEntryDistance > 0) {
				ix = px + rayEntryDistance*vx;
				iy = py + rayEntryDistance*vy;
				if (iy > -halfExtentsY && iy < halfExtentsY && ix > -halfExtentsX && ix < halfExtentsX) {
					targetNormal.x = 0;
					targetNormal.y = 0;
					targetNormal.z = -1;
					intersects = true;
				}
			}
		}

		return intersects? rayEntryDistance : -1;
	}

	/**
	 * Finds the closest point on the Box to another given point. This can be used for maximum error calculations for content within a given Box.
	 *
	 * @param point The point for which to find the closest point on the Box
	 * @param target An optional Vector3D to store the result to prevent creating a new object.
	 * @return
	 */
	public closestPointToPoint(point:Vector3D, target:Vector3D = null):Vector3D
	{
		var p:number;

		if (target == null)
			target = new Vector3D();

		p = point.x;
		if (p < this.x)
			p = this.x;
		if (p > this.x + this.width)
			p = this.x + this.width;
		target.x = p;

		p = point.y;
		if (p < this.y + this.height)
			p = this.y + this.height;
		if (p > this.y)
			p = this.y;
		target.y = p;

		p = point.z;
		if (p < this.z)
			p = this.z;
		if (p > this.z + this.depth)
			p = this.z + this.depth;
		target.z = p;

		return target;
	}

	/**
	 * Determines whether or not this Box object is empty.
	 *
	 * @return A value of <code>true</code> if the Box object's width, height or
	 *         depth is less than or equal to 0; otherwise <code>false</code>.
	 */
	public isEmpty():boolean
	{
		return (this.x == 0 && this.y == 0 && this.z == 0 && this.width == 0 && this.height == 0 && this.depth == 0);
	}

	/**
	 * Adjusts the location of the Box object, as determined by its
	 * top-left-front corner, by the specified amounts.
	 *
	 * @param dx Moves the <i>x</i> value of the Box object by this amount.
	 * @param dy Moves the <i>y</i> value of the Box object by this amount.
	 * @param dz Moves the <i>z</i> value of the Box object by this amount.
	 */
	public offset(dx:number, dy:number, dz:number):void
	{
		this.x += dx;
		this.y += dy;
		this.z += dz;
	}

	/**
	 * Adjusts the location of the Box object using a Vector3D object as a
	 * parameter. This method is similar to the <code>Box.offset()</code>
	 * method, except that it takes a Vector3D object as a parameter.
	 *
	 * @param position A Vector3D object to use to offset this Box object.
	 */
	public offsetPosition(position:Vector3D):void
	{
		this.x += position.x;
		this.y += position.y;
		this.z += position.z;
	}

	/**
	 * Sets all of the Box object's properties to 0. A Box object is empty if its
	 * width, height or depth is less than or equal to 0.
	 *
	 * <p> This method sets the values of the <code>x</code>, <code>y</code>,
	 * <code>z</code>, <code>width</code>, <code>height</code>, and
	 * <code>depth</code> properties to 0.</p>
	 *
	 */
	public setEmpty():void
	{
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.width = 0;
		this.height = 0;
		this.depth = 0;
	}

	public setBoundIdentity():void
	{
		this.x = Number.MAX_VALUE/2;
		this.y = Number.MAX_VALUE/2;
		this.z = Number.MAX_VALUE/2;
		this.width = -Number.MAX_VALUE;
		this.height = -Number.MAX_VALUE;
		this.depth = -Number.MAX_VALUE;
	}

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
	public setTo(xa:number, ya:number, za:number, widtha:number, heighta:number, deptha:number):void
	{
		this.x = xa;
		this.y = ya;
		this.z = za;
		this.width = widtha;
		this.height = heighta;
		this.depth = deptha;
	}

	/**
	 * Builds and returns a string that lists the horizontal, vertical and
	 * longitudinal positions and the width, height and depth of the Box object.
	 *
	 * @return A string listing the value of each of the following properties of
	 *         the Box object: <code>x</code>, <code>y</code>, <code>z</code>,
	 *         <code>width</code>, <code>height</code>, and <code>depth</code>.
	 */
	public toString():string
	{
		return "[Box] (x=" + this.x + ", y=" + this.y + ", z=" + this.z + ", width=" + this.width + ", height=" + this.height + ", depth=" + this.depth + ")";
	}

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
	public union(toUnion:Box, target:Box = null):Box
	{
		var width:number;
		var height:number;
		var depth:number;
		if (target == null)
			target = new Box();

		if (this.x < toUnion.x) {
			width = toUnion.x - this.x + toUnion.width;
			target.x = this.x;
			target.width = (width < this.width)? this.width : width;
		} else {
			width = this.x - toUnion.x + this.width;
			target.x = toUnion.x;
			target.width = (width < toUnion.width)? toUnion.width : width;
		}

		if (this.y < toUnion.y) {
			height = toUnion.y - this.y + toUnion.height;
			target.y = this.y;
			target.height = (height < this.height)? this.height : height;
		} else {
			height = this.y - toUnion.y + this.height;
			target.y = toUnion.y;
			target.height = (height < toUnion.height)? toUnion.height : height;
		}

		if (this.z < toUnion.z) {
			depth = toUnion.z - this.z + toUnion.depth;
			target.z = this.z;
			target.depth = (depth < this.depth)? this.depth : depth;
		} else {
			depth = this.z - toUnion.z + this.depth;
			target.z = toUnion.z;
			target.depth = (depth < toUnion.depth)? toUnion.depth : depth;
		}

		return target;
	}
}