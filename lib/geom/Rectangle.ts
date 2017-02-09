import {Point}					from "../geom/Point";

/**
 * A Rectangle object is an area defined by its position, as indicated by its
 * top-left corner point(<i>x</i>, <i>y</i>) and by its width and its height.
 *
 *
 * <p>The <code>x</code>, <code>y</code>, <code>width</code>, and
 * <code>height</code> properties of the Rectangle export class are independent of
 * each other; changing the value of one property has no effect on the others.
 * However, the <code>right</code> and <code>bottom</code> properties are
 * integrally related to those four properties. For example, if you change the
 * value of the <code>right</code> property, the value of the
 * <code>width</code> property changes; if you change the <code>bottom</code>
 * property, the value of the <code>height</code> property changes. </p>
 *
 * <p>The following methods and properties use Rectangle objects:</p>
 *
 * <ul>
 *   <li>The <code>applyFilter()</code>, <code>colorTransform()</code>,
 * <code>copyChannel()</code>, <code>copyPixels()</code>, <code>draw()</code>,
 * <code>fillRect()</code>, <code>generateFilterRect()</code>,
 * <code>getColorBoundsRect()</code>, <code>getPixels()</code>,
 * <code>merge()</code>, <code>paletteMap()</code>,
 * <code>pixelDisolve()</code>, <code>setPixels()</code>, and
 * <code>threshold()</code> methods, and the <code>rect</code> property of the
 * BitmapData class</li>
 *   <li>The <code>getBounds()</code> and <code>getRect()</code> methods, and
 * the <code>scrollRect</code> and <code>scale9Grid</code> properties of the
 * DisplayObject class</li>
 *   <li>The <code>getCharBoundaries()</code> method of the TextField
 * class</li>
 *   <li>The <code>pixelBounds</code> property of the Transform class</li>
 *   <li>The <code>bounds</code> parameter for the <code>startDrag()</code>
 * method of the Sprite class</li>
 *   <li>The <code>printArea</code> parameter of the <code>addPage()</code>
 * method of the PrintJob class</li>
 * </ul>
 *
 * <p>You can use the <code>new Rectangle()</code> constructor to create a
 * Rectangle object.</p>
 *
 * <p><b>Note:</b> The Rectangle export class does not define a rectangular Shape
 * display object. To draw a rectangular Shape object onscreen, use the
 * <code>drawRect()</code> method of the Graphics class.</p>
 */
export class Rectangle
{
	private _size:Point;
	private _bottomRight:Point;
	private _topLeft:Point;

	/**
	 * The height of the rectangle, in pixels. Changing the <code>height</code>
	 * value of a Rectangle object has no effect on the <code>x</code>,
	 * <code>y</code>, and <code>width</code> properties.
	 */
	public height:number;

	/**
	 * The width of the rectangle, in pixels. Changing the <code>width</code>
	 * value of a Rectangle object has no effect on the <code>x</code>,
	 * <code>y</code>, and <code>height</code> properties.
	 */
	public width:number;

	/**
	 * The <i>x</i> coordinate of the top-left corner of the rectangle. Changing
	 * the value of the <code>x</code> property of a Rectangle object has no
	 * effect on the <code>y</code>, <code>width</code>, and <code>height</code>
	 * properties.
	 *
	 * <p>The value of the <code>x</code> property is equal to the value of the
	 * <code>left</code> property.</p>
	 */
	public x:number;

	/**
	 * The <i>y</i> coordinate of the top-left corner of the rectangle. Changing
	 * the value of the <code>y</code> property of a Rectangle object has no
	 * effect on the <code>x</code>, <code>width</code>, and <code>height</code>
	 * properties.
	 *
	 * <p>The value of the <code>y</code> property is equal to the value of the
	 * <code>top</code> property.</p>
	 */
	public y:number;

	/**
	 * The sum of the <code>y</code> and <code>height</code> properties.
	 */
	public get bottom():number
	{
		return this.y + this.height;
	}

	/**
	 * The location of the Rectangle object's bottom-right corner, determined by
	 * the values of the <code>right</code> and <code>bottom</code> properties.
	 */
	public get bottomRight():Point
	{
		if (this._bottomRight == null)
			this._bottomRight = new Point();

		this._bottomRight.x = this.x + this.width;
		this._bottomRight.y = this.y + this.height;

		return this._bottomRight;
	}

	/**
	 * The <i>x</i> coordinate of the top-left corner of the rectangle. Changing
	 * the <code>left</code> property of a Rectangle object has no effect on the
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

	/**
	 * The sum of the <code>x</code> and <code>width</code> properties.
	 */
	public get right():number
	{
		return this.x + this.width;
	}

	/**
	 * The size of the Rectangle object, expressed as a Point object with the
	 * values of the <code>width</code> and <code>height</code> properties.
	 */
	public get size():Point
	{
		if (this._size == null)
			this._size = new Point();

		this._size.x = this.width;
		this._size.y = this.height;

		return this._size;
	}

	/**
	 * The <i>y</i> coordinate of the top-left corner of the rectangle. Changing
	 * the <code>top</code> property of a Rectangle object has no effect on the
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

	/**
	 * The location of the Rectangle object's top-left corner, determined by the
	 * <i>x</i> and <i>y</i> coordinates of the point.
	 */
	public get topLeft():Point
	{
		if (this._topLeft == null)
			this._topLeft = new Point();

		this._topLeft.x = this.x;
		this._topLeft.y = this.y;

		return this._topLeft;
	}

	/**
	 * Creates a new Rectangle object with the top-left corner specified by the
	 * <code>x</code> and <code>y</code> parameters and with the specified
	 * <code>width</code> and <code>height</code> parameters. If you call this
	 * public without parameters, a rectangle with <code>x</code>,
	 * <code>y</code>, <code>width</code>, and <code>height</code> properties set
	 * to 0 is created.
	 *
	 * @param x      The <i>x</i> coordinate of the top-left corner of the
	 *               rectangle.
	 * @param y      The <i>y</i> coordinate of the top-left corner of the
	 *               rectangle.
	 * @param width  The width of the rectangle, in pixels.
	 * @param height The height of the rectangle, in pixels.
	 */
	constructor(x:number = 0, y:number = 0, width:number = 0, height:number = 0)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	/**
	 * Returns a new Rectangle object with the same values for the
	 * <code>x</code>, <code>y</code>, <code>width</code>, and
	 * <code>height</code> properties as the original Rectangle object.
	 *
	 * @return A new Rectangle object with the same values for the
	 *         <code>x</code>, <code>y</code>, <code>width</code>, and
	 *         <code>height</code> properties as the original Rectangle object.
	 */
	public clone():Rectangle
	{
		return new Rectangle(this.x, this.y, this.width, this.height);
	}

	/**
	 * Determines whether the specified point is contained within the rectangular
	 * region defined by this Rectangle object.
	 *
	 * @param x The <i>x</i> coordinate(horizontal position) of the point.
	 * @param y The <i>y</i> coordinate(vertical position) of the point.
	 * @return A value of <code>true</code> if the Rectangle object contains the
	 *         specified point; otherwise <code>false</code>.
	 */
	public contains(x:number, y:number):boolean
	{
		return (this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y);
	}

	/**
	 * Determines whether the specified point is contained within the rectangular
	 * region defined by this Rectangle object. This method is similar to the
	 * <code>Rectangle.contains()</code> method, except that it takes a Point
	 * object as a parameter.
	 *
	 * @param point The point, as represented by its <i>x</i> and <i>y</i>
	 *              coordinates.
	 * @return A value of <code>true</code> if the Rectangle object contains the
	 *         specified point; otherwise <code>false</code>.
	 */
	public containsPoint(point:Point):boolean
	{
		return (this.x <= point.x && this.x + this.width >= point.x && this.y <= point.y && this.y + this.height >= point.y);
	}

	/**
	 * Determines whether the Rectangle object specified by the <code>rect</code>
	 * parameter is contained within this Rectangle object. A Rectangle object is
	 * said to contain another if the second Rectangle object falls entirely
	 * within the boundaries of the first.
	 *
	 * @param rect The Rectangle object being checked.
	 * @return A value of <code>true</code> if the Rectangle object that you
	 *         specify is contained by this Rectangle object; otherwise
	 *         <code>false</code>.
	 */
	public containsRect(rect:Rectangle):boolean
	{
		return (this.x <= rect.x && this.x + this.width >= rect.x + rect.width && this.y <= rect.y && this.y + this.height >= rect.y + rect.height)
	}

	/**
	 * Copies all of rectangle data from the source Rectangle object into the
	 * calling Rectangle object.
	 *
	 * @param sourceRect The Rectangle object from which to copy the data.
	 */
	public copyFrom(sourceRect:Rectangle):void
	{

	}

	/**
	 * Determines whether the object specified in the <code>toCompare</code>
	 * parameter is equal to this Rectangle object. This method compares the
	 * <code>x</code>, <code>y</code>, <code>width</code>, and
	 * <code>height</code> properties of an object against the same properties of
	 * this Rectangle object.
	 *
	 * @param toCompare The rectangle to compare to this Rectangle object.
	 * @return A value of <code>true</code> if the object has exactly the same
	 *         values for the <code>x</code>, <code>y</code>, <code>width</code>,
	 *         and <code>height</code> properties as this Rectangle object;
	 *         otherwise <code>false</code>.
	 */
	public equals(toCompare:Rectangle):boolean
	{
		return (this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height)
	}

	/**
	 * Increases the size of the Rectangle object by the specified amounts, in
	 * pixels. The center point of the Rectangle object stays the same, and its
	 * size increases to the left and right by the <code>dx</code> value, and to
	 * the top and the bottom by the <code>dy</code> value.
	 *
	 * @param dx The value to be added to the left and the right of the Rectangle
	 *           object. The following equation is used to calculate the new
	 *           width and position of the rectangle:
	 * @param dy The value to be added to the top and the bottom of the
	 *           Rectangle. The following equation is used to calculate the new
	 *           height and position of the rectangle:
	 */
	public inflate(dx:number, dy:number):void
	{
		this.x -= dx/2;
		this.y -= dy/2;
		this.width += dx/2;
		this.height += dy/2;
	}

	/**
	 * Increases the size of the Rectangle object. This method is similar to the
	 * <code>Rectangle.inflate()</code> method except it takes a Point object as
	 * a parameter.
	 *
	 * <p>The following two code examples give the same result:</p>
	 *
	 * @param point The <code>x</code> property of this Point object is used to
	 *              increase the horizontal dimension of the Rectangle object.
	 *              The <code>y</code> property is used to increase the vertical
	 *              dimension of the Rectangle object.
	 */
	public inflatePoint(point:Point):void
	{
		this.x -= point.x/2;
		this.y -= point.y/2;
		this.width += point.x/2;
		this.height += point.y/2;
	}

	/**
	 * If the Rectangle object specified in the <code>toIntersect</code>
	 * parameter intersects with this Rectangle object, returns the area of
	 * intersection as a Rectangle object. If the rectangles do not intersect,
	 * this method returns an empty Rectangle object with its properties set to
	 * 0.
	 *
	 * @param toIntersect The Rectangle object to compare against to see if it
	 *                    intersects with this Rectangle object.
	 * @return A Rectangle object that equals the area of intersection. If the
	 *         rectangles do not intersect, this method returns an empty
	 *         Rectangle object; that is, a rectangle with its <code>x</code>,
	 *         <code>y</code>, <code>width</code>, and <code>height</code>
	 *         properties set to 0.
	 */
	public intersection(toIntersect:Rectangle):Rectangle
	{
		if (this.intersects(toIntersect)) {
			var i:Rectangle = new Rectangle();

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

			return i;
		}

		return new Rectangle();
	}

	/**
	 * Determines whether the object specified in the <code>toIntersect</code>
	 * parameter intersects with this Rectangle object. This method checks the
	 * <code>x</code>, <code>y</code>, <code>width</code>, and
	 * <code>height</code> properties of the specified Rectangle object to see if
	 * it intersects with this Rectangle object.
	 *
	 * @param toIntersect The Rectangle object to compare against this Rectangle
	 *                    object.
	 * @return A value of <code>true</code> if the specified object intersects
	 *         with this Rectangle object; otherwise <code>false</code>.
	 */
	public intersects(toIntersect:Rectangle):boolean
	{
		return (this.x + this.width > toIntersect.x && this.x < toIntersect.x + toIntersect.width && this.y + this.height > toIntersect.y && this.y < toIntersect.y + toIntersect.height);
	}

	/**
	 * Determines whether or not this Rectangle object is empty.
	 *
	 * @return A value of <code>true</code> if the Rectangle object's width or
	 *         height is less than or equal to 0; otherwise <code>false</code>.
	 */
	public isEmpty():boolean
	{
		return (this.x == 0 && this.y == 0 && this.width == 0 && this.height == 0);
	}

	/**
	 * Adjusts the location of the Rectangle object, as determined by its
	 * top-left corner, by the specified amounts.
	 *
	 * @param dx Moves the <i>x</i> value of the Rectangle object by this amount.
	 * @param dy Moves the <i>y</i> value of the Rectangle object by this amount.
	 */
	public offset(dx:number, dy:number):void
	{
		this.x += dx;
		this.y += dy;
	}

	/**
	 * Adjusts the location of the Rectangle object using a Point object as a
	 * parameter. This method is similar to the <code>Rectangle.offset()</code>
	 * method, except that it takes a Point object as a parameter.
	 *
	 * @param point A Point object to use to offset this Rectangle object.
	 */
	public offsetPoint(point:Point):void
	{
		this.x += point.x;
		this.y += point.y;
	}

	/**
	 * Sets all of the Rectangle object's properties to 0. A Rectangle object is
	 * empty if its width or height is less than or equal to 0.
	 *
	 * <p> This method sets the values of the <code>x</code>, <code>y</code>,
	 * <code>width</code>, and <code>height</code> properties to 0.</p>
	 *
	 */
	public setEmpty():void
	{
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
	}

	/**
	 * Sets the members of Rectangle to the specified values
	 *
	 * @param xa      The <i>x</i> coordinate of the top-left corner of the
	 *                rectangle.
	 * @param ya      The <i>y</i> coordinate of the top-left corner of the
	 *                rectangle.
	 * @param widtha  The width of the rectangle, in pixels.
	 * @param heighta The height of the rectangle, in pixels.
	 */
	public setTo(xa:number, ya:number, widtha:number, heighta:number):void
	{
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}

	/**
	 * Builds and returns a string that lists the horizontal and vertical
	 * positions and the width and height of the Rectangle object.
	 *
	 * @return A string listing the value of each of the following properties of
	 *         the Rectangle object: <code>x</code>, <code>y</code>,
	 *         <code>width</code>, and <code>height</code>.
	 */
	public toString():string
	{
		return "[Rectangle] (x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
	}

	/**
	 * Adds two rectangles together to create a new Rectangle object, by filling
	 * in the horizontal and vertical space between the two rectangles.
	 *
	 * <p><b>Note:</b> The <code>union()</code> method ignores rectangles with
	 * <code>0</code> as the height or width value, such as: <code>var
	 * rect2:Rectangle = new Rectangle(300,300,50,0);</code></p>
	 *
	 * @param toUnion A Rectangle object to add to this Rectangle object.
	 * @return A new Rectangle object that is the union of the two rectangles.
	 */
	public union(toUnion:Rectangle):Rectangle
	{
		var u:Rectangle = new Rectangle();

		if (this.x < toUnion.x) {
			u.x = this.x;
			u.width = toUnion.x - this.x + toUnion.width;

			if (u.width < this.width)
				u.width = this.width;
		} else {
			u.x = toUnion.x;
			u.width = this.x - toUnion.x + this.width;

			if (u.width < toUnion.width)
				u.width = toUnion.width;
		}

		if (this.y < toUnion.y) {
			u.y = this.y;
			u.height = toUnion.y - this.y + toUnion.height;

			if (u.height < this.height)
				u.height = this.height;
		} else {
			u.y = toUnion.y;
			u.height = this.y - toUnion.y + this.height;

			if (u.height < toUnion.height)
				u.height = toUnion.height;
		}

		return u;
	}
}