/**
 * The Point object represents a location in a two-dimensional coordinate
 * system, where <i>x</i> represents the horizontal axis and <i>y</i>
 * represents the vertical axis.
 *
 * <p>The following code creates a point at(0,0):</p>
 *
 * <p>Methods and properties of the following classes use Point objects:</p>
 *
 * <ul>
 *   <li>BitmapData</li>
 *   <li>DisplayObject</li>
 *   <li>DisplayObjectContainer</li>
 *   <li>DisplacementMapFilter</li>
 *   <li>NativeWindow</li>
 *   <li>Matrix</li>
 *   <li>Rectangle</li>
 * </ul>
 *
 * <p>You can use the <code>new Point()</code> constructor to create a Point
 * object.</p>
 */
export class Point
{
	/**
	 * The horizontal coordinate of the point. The default value is 0.
	 */
	public x:number;

	/**
	 * The vertical coordinate of the point. The default value is 0.
	 */
	public y:number;

	/**
	 * The length of the line segment from(0,0) to this point.
	 */
	public get length():number
	{
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}

	/**
	 * Creates a new point. If you pass no parameters to this method, a point is
	 * created at(0,0).
	 *
	 * @param x The horizontal coordinate.
	 * @param y The vertical coordinate.
	 */
	constructor(x:number = 0, y:number = 0)
	{
		this.x = x;
		this.y = y;
	}

	/**
	 * Adds the coordinates of another point to the coordinates of this point to
	 * create a new point.
	 *
	 * @param v The point to be added.
	 * @return The new point.
	 */
	public add(v:Point):Point
	{
		return new Point(this.x + v.x, this.y + v.y);
	}

	/**
	 * Creates a copy of this Point object.
	 *
	 * @return The new Point object.
	 */
	public clone():Point
	{
		return new Point(this.x, this.y);
	}

	public copyFrom(sourcePoint:Point):void
	{

	}

	/**
	 * Determines whether two points are equal. Two points are equal if they have
	 * the same <i>x</i> and <i>y</i> values.
	 *
	 * @param toCompare The point to be compared.
	 * @return A value of <code>true</code> if the object is equal to this Point
	 *         object; <code>false</code> if it is not equal.
	 */
	public equals(toCompare:Point):boolean
	{
		return (this.x == toCompare.x && this.y == toCompare.y);
	}

	/**
	 * Scales the line segment between(0,0) and the current point to a set
	 * length.
	 *
	 * @param thickness The scaling value. For example, if the current point is
	 *                 (0,5), and you normalize it to 1, the point returned is
	 *                  at(0,1).
	 */
	public normalize(thickness:number = 1):void
	{
		if (this.length != 0) {
			var invLength = thickness/this.length;
			this.x *= invLength;
			this.y *= invLength;
			return;
		}
		throw "Cannot divide by zero length.";
	}

	/**
	 * Offsets the Point object by the specified amount. The value of
	 * <code>dx</code> is added to the original value of <i>x</i> to create the
	 * new <i>x</i> value. The value of <code>dy</code> is added to the original
	 * value of <i>y</i> to create the new <i>y</i> value.
	 *
	 * @param dx The amount by which to offset the horizontal coordinate,
	 *           <i>x</i>.
	 * @param dy The amount by which to offset the vertical coordinate, <i>y</i>.
	 */
	public offset(dx:number, dy:number):void
	{
		this.x += dx;
		this.y += dy;
	}

	public setTo(xa:number, ya:number):void
	{
		this.x = xa;
		this.y = ya;
	}

	/**
	 * Subtracts the coordinates of another point from the coordinates of this
	 * point to create a new point.
	 *
	 * @param v The point to be subtracted.
	 * @return The new point.
	 */
	public subtract(v:Point):Point
	{
		return new Point(this.x - v.x, this.y - v.y);
	}

	/**
	 * Returns a string that contains the values of the <i>x</i> and <i>y</i>
	 * coordinates. The string has the form <code>"(x=<i>x</i>,
	 * y=<i>y</i>)"</code>, so calling the <code>toString()</code> method for a
	 * point at 23,17 would return <code>"(x=23, y=17)"</code>.
	 *
	 * @return The string representation of the coordinates.
	 */
	public toString():string
	{
		return "[Point] (x=" + this.x + ", y=" + this.y + ")";
	}

	/**
	 * Returns the distance between <code>pt1</code> and <code>pt2</code>.
	 *
	 * @param pt1 The first point.
	 * @param pt2 The second point.
	 * @return The distance between the first and second points.
	 */
	public static distance(pt1:Point, pt2:Point):number
	{
		var dx:number = pt2.x - pt1.x;
		var dy:number = pt2.y - pt1.y;

		return Math.sqrt(dx*dx + dy*dy);
	}

	/**
	 * Determines a point between two specified points. The parameter
	 * <code>f</code> determines where the new interpolated point is located
	 * relative to the two end points specified by parameters <code>pt1</code>
	 * and <code>pt2</code>. The closer the value of the parameter <code>f</code>
	 * is to <code>1.0</code>, the closer the interpolated point is to the first
	 * point(parameter <code>pt1</code>). The closer the value of the parameter
	 * <code>f</code> is to 0, the closer the interpolated point is to the second
	 * point(parameter <code>pt2</code>).
	 *
	 * @param pt1 The first point.
	 * @param pt2 The second point.
	 * @param f   The level of interpolation between the two points. Indicates
	 *            where the new point will be, along the line between
	 *            <code>pt1</code> and <code>pt2</code>. If <code>f</code>=1,
	 *            <code>pt1</code> is returned; if <code>f</code>=0,
	 *            <code>pt2</code> is returned.
	 * @return The new, interpolated point.
	 */
	public static interpolate(pt1:Point, pt2:Point, f:number):Point
	{
		return new Point(pt2.x + (pt1.x - pt2.x)*f, pt2.y + (pt1.y - pt2.y)*f);
	}

	/**
	 * Converts a pair of polar coordinates to a Cartesian point coordinate.
	 *
	 * @param len   The length coordinate of the polar pair.
	 * @param angle The angle, in radians, of the polar pair.
	 * @return The Cartesian point.
	 */
	public static polar(len:number, angle:number):Point
	{
		return new Point(len*Math.cos(angle), len*Math.sin(angle));
	}
}
