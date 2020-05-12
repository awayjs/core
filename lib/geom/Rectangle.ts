import {Point} from "./Point";

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
	public _rawData:Float32Array = new Float32Array(4);
	//for AVM1:

	// for AVM1:
	public axCallPublicProperty(value1:any, value2:any):any
	{
		return null;
	}

	public axGetPublicProperty(value:any):any
	{
		return null;
	}

	public axSetPublicProperty(value:any):any
	{
		return null;
	}



	private _size:Point;
	private _bottomRight:Point;
	private _topLeft:Point;

	/**
	 * The height of the rectangle, in pixels. Changing the <code>height</code>
	 * value of a Rectangle object has no effect on the <code>x</code>,
	 * <code>y</code>, and <code>width</code> properties.
	 */
	public get height():number
	{
		return this._rawData[3];
	}

	public set height(value:number)
	{
		this._rawData[3] = value;
	}

	/**
	 * The width of the rectangle, in pixels. Changing the <code>width</code>
	 * value of a Rectangle object has no effect on the <code>x</code>,
	 * <code>y</code>, and <code>height</code> properties.
	 */
	public get width():number
	{
		return this._rawData[2];
	}

	public set width(value:number)
	{
		this._rawData[2] = value;
	}

	/**
	 * The <i>x</i> coordinate of the top-left corner of the rectangle. Changing
	 * the value of the <code>x</code> property of a Rectangle object has no
	 * effect on the <code>y</code>, <code>width</code>, and <code>height</code>
	 * properties.
	 *
	 * <p>The value of the <code>x</code> property is equal to the value of the
	 * <code>left</code> property.</p>
	 */
	public get x():number
	{
		return this._rawData[0];
	}

	public set x(value:number)
	{
		this._rawData[0] = value;
	}

	/**
	 * The <i>y</i> coordinate of the top-left corner of the rectangle. Changing
	 * the value of the <code>y</code> property of a Rectangle object has no
	 * effect on the <code>x</code>, <code>width</code>, and <code>height</code>
	 * properties.
	 *
	 * <p>The value of the <code>y</code> property is equal to the value of the
	 * <code>top</code> property.</p>
	 */
	public get y():number
	{
		return this._rawData[1];
	}

	public set y(value:number)
	{
		this._rawData[1] = value;
	}

	/**
	 * The sum of the <code>y</code> and <code>height</code> properties.
	 */
	public get bottom():number
	{
		return this._rawData[1] + this._rawData[3];
	}

	public set bottom(val:number)
	{
		this._rawData[3] = val - this._rawData[1];
	}

	/**
	 * The location of the Rectangle object's bottom-right corner, determined by
	 * the values of the <code>right</code> and <code>bottom</code> properties.
	 */
	public get bottomRight():Point
	{
		if (this._bottomRight == null)
			this._bottomRight = new Point();

		this._bottomRight._rawData[0] = this._rawData[0] + this._rawData[2];
		this._bottomRight._rawData[1] = this._rawData[1] + this._rawData[3];

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
		return this._rawData[0];
	}

	public set left(val:number)
	{
		this._rawData[2] += this._rawData[0] - val;
		this._rawData[0] = val;
	}

	/**
	 * The sum of the <code>x</code> and <code>width</code> properties.
	 */
	public get right():number
	{
		return this._rawData[0] + this._rawData[2];
	}

	public set right(val:number)
	{
		this._rawData[2] = val - this._rawData[0];
	}

	/**
	 * The size of the Rectangle object, expressed as a Point object with the
	 * values of the <code>width</code> and <code>height</code> properties.
	 */
	public get size():Point
	{
		if (this._size == null)
			this._size = new Point();

		this._size._rawData[0] = this._rawData[2];
		this._size._rawData[1] = this._rawData[3];

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
		return this._rawData[1];
	}

	public set top(val:number)
	{
		this._rawData[3] += (this._rawData[1] - val);
		this._rawData[1] = val;
	}

	/**
	 * The location of the Rectangle object's top-left corner, determined by the
	 * <i>x</i> and <i>y</i> coordinates of the point.
	 */
	public get topLeft():Point
	{
		if (this._topLeft == null)
			this._topLeft = new Point();

		this._topLeft._rawData[0] = this._rawData[0];
		this._topLeft._rawData[1] = this._rawData[1];

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
		var raw:Float32Array = this._rawData;

		raw[0] = x;
		raw[1] = y;
		raw[2] = width;
		raw[3] = height;
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
		var raw:Float32Array = this._rawData;

		return new Rectangle(raw[0], raw[1], raw[2], raw[3]);
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
		var raw:Float32Array = this._rawData;

		return (raw[0] <= x && raw[0] + raw[2] >= x && raw[1] <= y && raw[1] + raw[3] >= y);
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
		var raw:Float32Array = this._rawData;
		var rawPoint:Float32Array = point._rawData;

		return (raw[0] <= rawPoint[0] && raw[0] + raw[2] >= rawPoint[0] && raw[1] <= rawPoint[1] && raw[1] + raw[3] >= rawPoint[1]);
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
		var raw:Float32Array = this._rawData;
		var rawRect:Float32Array = rect._rawData;

		return (raw[0] <= rawRect[0] && raw[0] + raw[2] >= rawRect[0] + rawRect[2] && raw[1] <= rawRect[1] && raw[1] + raw[3] >= rawRect[1] + rawRect[3]);
	}

	/**
	 * Copies all of rectangle data from the source Rectangle object into the
	 * calling Rectangle object.
	 *
	 * @param sourceRect The Rectangle object from which to copy the data.
	 */
	public copyFrom(sourceRect:Rectangle):void
	{
		var raw:Float32Array = this._rawData;
		var rawSource:Float32Array = sourceRect._rawData;

		raw[0] = rawSource[0];
		raw[1] = rawSource[1];
		raw[2] = rawSource[2];
		raw[3] = rawSource[3];
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
		var raw:Float32Array = this._rawData;
		var rawCompare:Float32Array = toCompare._rawData;

		return (raw[0] == rawCompare[0] && raw[1] == rawCompare[1] && raw[2] == rawCompare[2] && raw[3] == rawCompare[3]);
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
		var raw:Float32Array = this._rawData;

		raw[0] -= dx / 2;
		raw[1] -= dy / 2;
		raw[2] += dx / 2;
		raw[3] += dy / 2;
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
		var raw:Float32Array = this._rawData;

		raw[0] -= point.x / 2;
		raw[1] -= point.y / 2;
		raw[2] += point.x / 2;
		raw[3] += point.y / 2;
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
		var raw:Float32Array = this._rawData;
		var rawIntersect:Float32Array = toIntersect._rawData;

		if (this.intersects(toIntersect)) {
			var result:Rectangle = new Rectangle();
			var rawResult:Float32Array = result._rawData;

			if (raw[0] > rawIntersect[0]) {
				rawResult[0] = raw[0];
				rawResult[2] = rawIntersect[0] - raw[0] + rawIntersect[2];

				if (rawResult[2] > raw[2])
					rawResult[2] = raw[2];
			} else {
				rawResult[0] = rawIntersect[0];
				rawResult[2] = raw[0] - rawIntersect[0] + raw[2];

				if (rawResult[2] > rawIntersect[2])
					rawResult[2] = rawIntersect[2];
			}

			if (raw[1] > rawIntersect[1]) {
				rawResult[1] = raw[1];
				rawResult[3] = rawIntersect[1] - raw[1] + rawIntersect[3];

				if (rawResult[3] > raw[3])
					rawResult[3] = raw[3];
			} else {
				rawResult[1] = rawIntersect[1];
				rawResult[3] = raw[1] - rawIntersect[1] + raw[3];

				if (rawResult[3] > rawIntersect[3])
					rawResult[3] = rawIntersect[3];
			}

			return result;
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
		var raw:Float32Array = this._rawData;
		var rawIntersect:Float32Array = toIntersect._rawData;

		return (raw[0] + raw[2] > rawIntersect[0] && raw[0] < rawIntersect[0] + rawIntersect[2] && raw[1] + raw[3] > rawIntersect[1] && raw[1] < rawIntersect[1] + rawIntersect[3]);
	}

	/**
	 * Determines whether or not this Rectangle object is empty.
	 *
	 * @return A value of <code>true</code> if the Rectangle object's width or
	 *         height is less than or equal to 0; otherwise <code>false</code>.
	 */
	public isEmpty():boolean
	{
		var raw:Float32Array = this._rawData;

		return (raw[0] == 0 && raw[1] == 0 && raw[2] == 0 && raw[3] == 0);
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
		this._rawData[0] += dx;
		this._rawData[1] += dy;
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
		this._rawData[0] += point.x;
		this._rawData[1] += point.y;
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
		var raw:Float32Array = this._rawData;

		raw[0] = 0;
		raw[1] = 0;
		raw[2] = 0;
		raw[3] = 0;
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
		var raw:Float32Array = this._rawData;

		raw[0] = xa;
		raw[1] = ya;
		raw[2] = widtha;
		raw[3] = heighta;
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
		var raw:Float32Array = this._rawData;
		var rawUnion:Float32Array = toUnion._rawData;

		var target:Rectangle = new Rectangle();
		var rawTarget:Float32Array = target._rawData;

		if (raw[0] < rawUnion[0]) {
			rawTarget[0] = raw[0];
			rawTarget[2] = rawUnion[0] - raw[0] + rawUnion[2];

			if (rawTarget[2] < raw[2])
				rawTarget[2] = raw[2];
		} else {
			rawTarget[0] = rawUnion[0];
			rawTarget[2] = raw[0] - rawUnion[0] + raw[2];

			if (rawTarget[2] < rawUnion[2])
				rawTarget[2] = rawUnion[2];
		}

		if (raw[1] < rawUnion[1]) {
			rawTarget[1] = raw[1];
			rawTarget[3] = rawUnion[1] - raw[1] + rawUnion[3];

			if (rawTarget[3] < raw[3])
				rawTarget[3] = raw[3];
		} else {
			rawTarget[1] = rawUnion[1];
			rawTarget[3] = raw[1] - rawUnion[1] + raw[3];

			if (rawTarget[3] < rawUnion[3])
				rawTarget[3] = rawUnion[3];
		}

		return target;
	}
}