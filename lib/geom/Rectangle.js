var Point = require("awayjs-core/lib/geom/Point");
/**
 * A Rectangle object is an area defined by its position, as indicated by its
 * top-left corner point(<i>x</i>, <i>y</i>) and by its width and its height.
 *
 *
 * <p>The <code>x</code>, <code>y</code>, <code>width</code>, and
 * <code>height</code> properties of the Rectangle class are independent of
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
 * <p><b>Note:</b> The Rectangle class does not define a rectangular Shape
 * display object. To draw a rectangular Shape object onscreen, use the
 * <code>drawRect()</code> method of the Graphics class.</p>
 */
var Rectangle = (function () {
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
    function Rectangle(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rectangle.prototype, "bottom", {
        /**
         * The sum of the <code>y</code> and <code>height</code> properties.
         */
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "bottomRight", {
        /**
         * The location of the Rectangle object's bottom-right corner, determined by
         * the values of the <code>right</code> and <code>bottom</code> properties.
         */
        get: function () {
            if (this._bottomRight == null)
                this._bottomRight = new Point();
            this._bottomRight.x = this.x + this.width;
            this._bottomRight.y = this.y + this.height;
            return this._bottomRight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "left", {
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
        get: function () {
            return this.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "right", {
        /**
         * The sum of the <code>x</code> and <code>width</code> properties.
         */
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "size", {
        /**
         * The size of the Rectangle object, expressed as a Point object with the
         * values of the <code>width</code> and <code>height</code> properties.
         */
        get: function () {
            if (this._size == null)
                this._size = new Point();
            this._size.x = this.width;
            this._size.y = this.height;
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "top", {
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
        get: function () {
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "topLeft", {
        /**
         * The location of the Rectangle object's top-left corner, determined by the
         * <i>x</i> and <i>y</i> coordinates of the point.
         */
        get: function () {
            if (this._topLeft == null)
                this._topLeft = new Point();
            this._topLeft.x = this.x;
            this._topLeft.y = this.y;
            return this._topLeft;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new Rectangle object with the same values for the
     * <code>x</code>, <code>y</code>, <code>width</code>, and
     * <code>height</code> properties as the original Rectangle object.
     *
     * @return A new Rectangle object with the same values for the
     *         <code>x</code>, <code>y</code>, <code>width</code>, and
     *         <code>height</code> properties as the original Rectangle object.
     */
    Rectangle.prototype.clone = function () {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };
    /**
     * Determines whether the specified point is contained within the rectangular
     * region defined by this Rectangle object.
     *
     * @param x The <i>x</i> coordinate(horizontal position) of the point.
     * @param y The <i>y</i> coordinate(vertical position) of the point.
     * @return A value of <code>true</code> if the Rectangle object contains the
     *         specified point; otherwise <code>false</code>.
     */
    Rectangle.prototype.contains = function (x, y) {
        return (this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y);
    };
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
    Rectangle.prototype.containsPoint = function (point) {
        return (this.x <= point.x && this.x + this.width >= point.x && this.y <= point.y && this.y + this.height >= point.y);
    };
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
    Rectangle.prototype.containsRect = function (rect) {
        return (this.x <= rect.x && this.x + this.width >= rect.x + rect.width && this.y <= rect.y && this.y + this.height >= rect.y + rect.height);
    };
    /**
     * Copies all of rectangle data from the source Rectangle object into the
     * calling Rectangle object.
     *
     * @param sourceRect The Rectangle object from which to copy the data.
     */
    Rectangle.prototype.copyFrom = function (sourceRect) {
    };
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
    Rectangle.prototype.equals = function (toCompare) {
        return (this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height);
    };
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
    Rectangle.prototype.inflate = function (dx, dy) {
        this.x -= dx / 2;
        this.y -= dy / 2;
        this.width += dx / 2;
        this.height += dy / 2;
    };
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
    Rectangle.prototype.inflatePoint = function (point) {
        this.x -= point.x / 2;
        this.y -= point.y / 2;
        this.width += point.x / 2;
        this.height += point.y / 2;
    };
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
    Rectangle.prototype.intersection = function (toIntersect) {
        if (this.intersects(toIntersect)) {
            var i = new Rectangle();
            if (this.x > toIntersect.x) {
                i.x = this.x;
                i.width = toIntersect.x - this.x + toIntersect.width;
                if (i.width > this.width)
                    i.width = this.width;
            }
            else {
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
            }
            else {
                i.y = toIntersect.y;
                i.height = this.y - toIntersect.y + this.height;
                if (i.height > toIntersect.height)
                    i.height = toIntersect.height;
            }
            return i;
        }
        return new Rectangle();
    };
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
    Rectangle.prototype.intersects = function (toIntersect) {
        return (this.x + this.width > toIntersect.x && this.x < toIntersect.x + toIntersect.width && this.y + this.height > toIntersect.y && this.y < toIntersect.y + toIntersect.height);
    };
    /**
     * Determines whether or not this Rectangle object is empty.
     *
     * @return A value of <code>true</code> if the Rectangle object's width or
     *         height is less than or equal to 0; otherwise <code>false</code>.
     */
    Rectangle.prototype.isEmpty = function () {
        return (this.x == 0 && this.y == 0 && this.width == 0 && this.height == 0);
    };
    /**
     * Adjusts the location of the Rectangle object, as determined by its
     * top-left corner, by the specified amounts.
     *
     * @param dx Moves the <i>x</i> value of the Rectangle object by this amount.
     * @param dy Moves the <i>y</i> value of the Rectangle object by this amount.
     */
    Rectangle.prototype.offset = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    /**
     * Adjusts the location of the Rectangle object using a Point object as a
     * parameter. This method is similar to the <code>Rectangle.offset()</code>
     * method, except that it takes a Point object as a parameter.
     *
     * @param point A Point object to use to offset this Rectangle object.
     */
    Rectangle.prototype.offsetPoint = function (point) {
        this.x += point.x;
        this.y += point.y;
    };
    /**
     * Sets all of the Rectangle object's properties to 0. A Rectangle object is
     * empty if its width or height is less than or equal to 0.
     *
     * <p> This method sets the values of the <code>x</code>, <code>y</code>,
     * <code>width</code>, and <code>height</code> properties to 0.</p>
     *
     */
    Rectangle.prototype.setEmpty = function () {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    };
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
    Rectangle.prototype.setTo = function (xa, ya, widtha, heighta) {
        this.x = xa;
        this.y = ya;
        this.width = widtha;
        this.height = heighta;
    };
    /**
     * Builds and returns a string that lists the horizontal and vertical
     * positions and the width and height of the Rectangle object.
     *
     * @return A string listing the value of each of the following properties of
     *         the Rectangle object: <code>x</code>, <code>y</code>,
     *         <code>width</code>, and <code>height</code>.
     */
    Rectangle.prototype.toString = function () {
        return "[Rectangle] (x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
    };
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
    Rectangle.prototype.union = function (toUnion) {
        var u = new Rectangle();
        if (this.x < toUnion.x) {
            u.x = this.x;
            u.width = toUnion.x - this.x + toUnion.width;
            if (u.width < this.width)
                u.width = this.width;
        }
        else {
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
        }
        else {
            u.y = toUnion.y;
            u.height = this.y - toUnion.y + this.height;
            if (u.height < toUnion.height)
                u.height = toUnion.height;
        }
        return u;
    };
    return Rectangle;
})();
module.exports = Rectangle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZS50cyJdLCJuYW1lcyI6WyJSZWN0YW5nbGUiLCJSZWN0YW5nbGUuY29uc3RydWN0b3IiLCJSZWN0YW5nbGUuYm90dG9tIiwiUmVjdGFuZ2xlLmJvdHRvbVJpZ2h0IiwiUmVjdGFuZ2xlLmxlZnQiLCJSZWN0YW5nbGUucmlnaHQiLCJSZWN0YW5nbGUuc2l6ZSIsIlJlY3RhbmdsZS50b3AiLCJSZWN0YW5nbGUudG9wTGVmdCIsIlJlY3RhbmdsZS5jbG9uZSIsIlJlY3RhbmdsZS5jb250YWlucyIsIlJlY3RhbmdsZS5jb250YWluc1BvaW50IiwiUmVjdGFuZ2xlLmNvbnRhaW5zUmVjdCIsIlJlY3RhbmdsZS5jb3B5RnJvbSIsIlJlY3RhbmdsZS5lcXVhbHMiLCJSZWN0YW5nbGUuaW5mbGF0ZSIsIlJlY3RhbmdsZS5pbmZsYXRlUG9pbnQiLCJSZWN0YW5nbGUuaW50ZXJzZWN0aW9uIiwiUmVjdGFuZ2xlLmludGVyc2VjdHMiLCJSZWN0YW5nbGUuaXNFbXB0eSIsIlJlY3RhbmdsZS5vZmZzZXQiLCJSZWN0YW5nbGUub2Zmc2V0UG9pbnQiLCJSZWN0YW5nbGUuc2V0RW1wdHkiLCJSZWN0YW5nbGUuc2V0VG8iLCJSZWN0YW5nbGUudG9TdHJpbmciLCJSZWN0YW5nbGUudW5pb24iXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sS0FBSyxXQUFlLDRCQUE0QixDQUFDLENBQUM7QUFFekQsQUE0Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FERztJQUNHLFNBQVM7SUFxSWRBOzs7Ozs7Ozs7Ozs7OztPQWNHQTtJQUNIQSxTQXBKS0EsU0FBU0EsQ0FvSkZBLENBQVlBLEVBQUVBLENBQVlBLEVBQUVBLEtBQWdCQSxFQUFFQSxNQUFpQkE7UUFBL0RDLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFBRUEscUJBQWdCQSxHQUFoQkEsU0FBZ0JBO1FBQUVB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LENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUFBO0lBQzVJQSxDQUFDQTtJQUVEWjs7Ozs7T0FLR0E7SUFDSUEsNEJBQVFBLEdBQWZBLFVBQWdCQSxVQUFvQkE7SUFHcENhLENBQUNBO0lBRURiOzs7Ozs7Ozs7Ozs7T0FZR0E7SUFDSUEsMEJBQU1BLEdBQWJBLFVBQWNBLFNBQW1CQTtRQUVoQ2MsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsU0FBU0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQUE7SUFDNUhBLENBQUNBO0lBRURkOzs7Ozs7Ozs7Ozs7T0FZR0E7SUFDSUEsMkJBQU9BLEdBQWRBLFVBQWVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRWxDZSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUNmQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUNmQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxFQUFFQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUNuQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDckJBLENBQUNBO0lBRURmOzs7Ozs7Ozs7OztPQVdHQTtJQUNJQSxnQ0FBWUEsR0FBbkJBLFVBQW9CQSxLQUFXQTtRQUU5QmdCLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1FBQ3BCQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO0lBQzFCQSxDQUFDQTtJQUVEaEI7Ozs7Ozs7Ozs7Ozs7O09BY0dBO0lBQ0lBLGdDQUFZQSxHQUFuQkEsVUFBb0JBLFdBQXFCQTtRQUV4Q2lCLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xDQSxJQUFJQSxDQUFDQSxHQUFhQSxJQUFJQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUVsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVCQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDYkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBRXJEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtvQkFDeEJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3ZCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFFOUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBO29CQUMvQkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDOUJBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2JBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBO2dCQUV2REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQzFCQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0Es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Imdlb20vUmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2ludFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Qb2ludFwiKTtcclxuXHJcbi8qKlxyXG4gKiBBIFJlY3RhbmdsZSBvYmplY3QgaXMgYW4gYXJlYSBkZWZpbmVkIGJ5IGl0cyBwb3NpdGlvbiwgYXMgaW5kaWNhdGVkIGJ5IGl0c1xyXG4gKiB0b3AtbGVmdCBjb3JuZXIgcG9pbnQoPGk+eDwvaT4sIDxpPnk8L2k+KSBhbmQgYnkgaXRzIHdpZHRoIGFuZCBpdHMgaGVpZ2h0LlxyXG4gKlxyXG4gKlxyXG4gKiA8cD5UaGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZFxyXG4gKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgb2YgdGhlIFJlY3RhbmdsZSBjbGFzcyBhcmUgaW5kZXBlbmRlbnQgb2ZcclxuICogZWFjaCBvdGhlcjsgY2hhbmdpbmcgdGhlIHZhbHVlIG9mIG9uZSBwcm9wZXJ0eSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBvdGhlcnMuXHJcbiAqIEhvd2V2ZXIsIHRoZSA8Y29kZT5yaWdodDwvY29kZT4gYW5kIDxjb2RlPmJvdHRvbTwvY29kZT4gcHJvcGVydGllcyBhcmVcclxuICogaW50ZWdyYWxseSByZWxhdGVkIHRvIHRob3NlIGZvdXIgcHJvcGVydGllcy4gRm9yIGV4YW1wbGUsIGlmIHlvdSBjaGFuZ2UgdGhlXHJcbiAqIHZhbHVlIG9mIHRoZSA8Y29kZT5yaWdodDwvY29kZT4gcHJvcGVydHksIHRoZSB2YWx1ZSBvZiB0aGVcclxuICogPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnR5IGNoYW5nZXM7IGlmIHlvdSBjaGFuZ2UgdGhlIDxjb2RlPmJvdHRvbTwvY29kZT5cclxuICogcHJvcGVydHksIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eSBjaGFuZ2VzLiA8L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB1c2UgUmVjdGFuZ2xlIG9iamVjdHM6PC9wPlxyXG4gKlxyXG4gKiA8dWw+XHJcbiAqICAgPGxpPlRoZSA8Y29kZT5hcHBseUZpbHRlcigpPC9jb2RlPiwgPGNvZGU+Y29sb3JUcmFuc2Zvcm0oKTwvY29kZT4sXHJcbiAqIDxjb2RlPmNvcHlDaGFubmVsKCk8L2NvZGU+LCA8Y29kZT5jb3B5UGl4ZWxzKCk8L2NvZGU+LCA8Y29kZT5kcmF3KCk8L2NvZGU+LFxyXG4gKiA8Y29kZT5maWxsUmVjdCgpPC9jb2RlPiwgPGNvZGU+Z2VuZXJhdGVGaWx0ZXJSZWN0KCk8L2NvZGU+LFxyXG4gKiA8Y29kZT5nZXRDb2xvckJvdW5kc1JlY3QoKTwvY29kZT4sIDxjb2RlPmdldFBpeGVscygpPC9jb2RlPixcclxuICogPGNvZGU+bWVyZ2UoKTwvY29kZT4sIDxjb2RlPnBhbGV0dGVNYXAoKTwvY29kZT4sXHJcbiAqIDxjb2RlPnBpeGVsRGlzb2x2ZSgpPC9jb2RlPiwgPGNvZGU+c2V0UGl4ZWxzKCk8L2NvZGU+LCBhbmRcclxuICogPGNvZGU+dGhyZXNob2xkKCk8L2NvZGU+IG1ldGhvZHMsIGFuZCB0aGUgPGNvZGU+cmVjdDwvY29kZT4gcHJvcGVydHkgb2YgdGhlXHJcbiAqIEJpdG1hcERhdGEgY2xhc3M8L2xpPlxyXG4gKiAgIDxsaT5UaGUgPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IGFuZCA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZHMsIGFuZFxyXG4gKiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gYW5kIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnRpZXMgb2YgdGhlXHJcbiAqIERpc3BsYXlPYmplY3QgY2xhc3M8L2xpPlxyXG4gKiAgIDxsaT5UaGUgPGNvZGU+Z2V0Q2hhckJvdW5kYXJpZXMoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBUZXh0RmllbGRcclxuICogY2xhc3M8L2xpPlxyXG4gKiAgIDxsaT5UaGUgPGNvZGU+cGl4ZWxCb3VuZHM8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBUcmFuc2Zvcm0gY2xhc3M8L2xpPlxyXG4gKiAgIDxsaT5UaGUgPGNvZGU+Ym91bmRzPC9jb2RlPiBwYXJhbWV0ZXIgZm9yIHRoZSA8Y29kZT5zdGFydERyYWcoKTwvY29kZT5cclxuICogbWV0aG9kIG9mIHRoZSBTcHJpdGUgY2xhc3M8L2xpPlxyXG4gKiAgIDxsaT5UaGUgPGNvZGU+cHJpbnRBcmVhPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlIDxjb2RlPmFkZFBhZ2UoKTwvY29kZT5cclxuICogbWV0aG9kIG9mIHRoZSBQcmludEpvYiBjbGFzczwvbGk+XHJcbiAqIDwvdWw+XHJcbiAqXHJcbiAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5uZXcgUmVjdGFuZ2xlKCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhXHJcbiAqIFJlY3RhbmdsZSBvYmplY3QuPC9wPlxyXG4gKlxyXG4gKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIFJlY3RhbmdsZSBjbGFzcyBkb2VzIG5vdCBkZWZpbmUgYSByZWN0YW5ndWxhciBTaGFwZVxyXG4gKiBkaXNwbGF5IG9iamVjdC4gVG8gZHJhdyBhIHJlY3Rhbmd1bGFyIFNoYXBlIG9iamVjdCBvbnNjcmVlbiwgdXNlIHRoZVxyXG4gKiA8Y29kZT5kcmF3UmVjdCgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIEdyYXBoaWNzIGNsYXNzLjwvcD5cclxuICovXHJcbmNsYXNzIFJlY3RhbmdsZVxyXG57XHJcblx0cHJpdmF0ZSBfc2l6ZTpQb2ludDtcclxuXHRwcml2YXRlIF9ib3R0b21SaWdodDpQb2ludDtcclxuXHRwcml2YXRlIF90b3BMZWZ0OlBvaW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUsIGluIHBpeGVscy4gQ2hhbmdpbmcgdGhlIDxjb2RlPmhlaWdodDwvY29kZT5cclxuXHQgKiB2YWx1ZSBvZiBhIFJlY3RhbmdsZSBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sXHJcblx0ICogPGNvZGU+eTwvY29kZT4sIGFuZCA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydGllcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgaGVpZ2h0Om51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHdpZHRoIG9mIHRoZSByZWN0YW5nbGUsIGluIHBpeGVscy4gQ2hhbmdpbmcgdGhlIDxjb2RlPndpZHRoPC9jb2RlPlxyXG5cdCAqIHZhbHVlIG9mIGEgUmVjdGFuZ2xlIG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZSA8Y29kZT54PC9jb2RlPixcclxuXHQgKiA8Y29kZT55PC9jb2RlPiwgYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgd2lkdGg6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUuIENoYW5naW5nXHJcblx0ICogdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIFJlY3RhbmdsZSBvYmplY3QgaGFzIG5vXHJcblx0ICogZWZmZWN0IG9uIHRoZSA8Y29kZT55PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPlxyXG5cdCAqIHByb3BlcnRpZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGVcclxuXHQgKiA8Y29kZT5sZWZ0PC9jb2RlPiBwcm9wZXJ0eS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHg6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUuIENoYW5naW5nXHJcblx0ICogdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIFJlY3RhbmdsZSBvYmplY3QgaGFzIG5vXHJcblx0ICogZWZmZWN0IG9uIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPlxyXG5cdCAqIHByb3BlcnRpZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGVcclxuXHQgKiA8Y29kZT50b3A8L2NvZGU+IHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgeTpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBzdW0gb2YgdGhlIDxjb2RlPnk8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3R0b20oKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbG9jYXRpb24gb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QncyBib3R0b20tcmlnaHQgY29ybmVyLCBkZXRlcm1pbmVkIGJ5XHJcblx0ICogdGhlIHZhbHVlcyBvZiB0aGUgPGNvZGU+cmlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5ib3R0b208L2NvZGU+IHByb3BlcnRpZXMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3R0b21SaWdodCgpOlBvaW50XHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2JvdHRvbVJpZ2h0ID09IG51bGwpXHJcblx0XHRcdHRoaXMuX2JvdHRvbVJpZ2h0ID0gbmV3IFBvaW50KCk7XHJcblxyXG5cdFx0dGhpcy5fYm90dG9tUmlnaHQueCA9IHRoaXMueCArIHRoaXMud2lkdGg7XHJcblx0XHR0aGlzLl9ib3R0b21SaWdodC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdHRvbVJpZ2h0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ2xlLiBDaGFuZ2luZ1xyXG5cdCAqIHRoZSA8Y29kZT5sZWZ0PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIFJlY3RhbmdsZSBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGVcclxuXHQgKiA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLiBIb3dldmVyIGl0IGRvZXMgYWZmZWN0XHJcblx0ICogdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSwgd2hlcmVhcyBjaGFuZ2luZyB0aGUgPGNvZGU+eDwvY29kZT4gdmFsdWVcclxuXHQgKiBkb2VzIDxpPm5vdDwvaT4gYWZmZWN0IHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHkuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPmxlZnQ8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZlxyXG5cdCAqIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBsZWZ0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMueDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBzdW0gb2YgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydGllcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgc2l6ZSBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCwgZXhwcmVzc2VkIGFzIGEgUG9pbnQgb2JqZWN0IHdpdGggdGhlXHJcblx0ICogdmFsdWVzIG9mIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNpemUoKTpQb2ludFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9zaXplID09IG51bGwpXHJcblx0XHRcdHRoaXMuX3NpemUgPSBuZXcgUG9pbnQoKTtcclxuXHJcblx0XHR0aGlzLl9zaXplLnggPSB0aGlzLndpZHRoO1xyXG5cdFx0dGhpcy5fc2l6ZS55ID0gdGhpcy5oZWlnaHQ7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3NpemU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUuIENoYW5naW5nXHJcblx0ICogdGhlIDxjb2RlPnRvcDwvY29kZT4gcHJvcGVydHkgb2YgYSBSZWN0YW5nbGUgb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlXHJcblx0ICogPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0aWVzLiBIb3dldmVyIGl0IGRvZXMgYWZmZWN0XHJcblx0ICogdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHksIHdoZXJlYXMgY2hhbmdpbmcgdGhlIDxjb2RlPnk8L2NvZGU+XHJcblx0ICogdmFsdWUgZG9lcyA8aT5ub3Q8L2k+IGFmZmVjdCB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eS5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+dG9wPC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgdGhlXHJcblx0ICogPGNvZGU+eTwvY29kZT4gcHJvcGVydHkuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdG9wKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMueTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsb2NhdGlvbiBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCdzIHRvcC1sZWZ0IGNvcm5lciwgZGV0ZXJtaW5lZCBieSB0aGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gY29vcmRpbmF0ZXMgb2YgdGhlIHBvaW50LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdG9wTGVmdCgpOlBvaW50XHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3RvcExlZnQgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fdG9wTGVmdCA9IG5ldyBQb2ludCgpO1xyXG5cclxuXHRcdHRoaXMuX3RvcExlZnQueCA9IHRoaXMueDtcclxuXHRcdHRoaXMuX3RvcExlZnQueSA9IHRoaXMueTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fdG9wTGVmdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgUmVjdGFuZ2xlIG9iamVjdCB3aXRoIHRoZSB0b3AtbGVmdCBjb3JuZXIgc3BlY2lmaWVkIGJ5IHRoZVxyXG5cdCAqIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzIGFuZCB3aXRoIHRoZSBzcGVjaWZpZWRcclxuXHQgKiA8Y29kZT53aWR0aDwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcGFyYW1ldGVycy4gSWYgeW91IGNhbGwgdGhpc1xyXG5cdCAqIHB1YmxpYyB3aXRob3V0IHBhcmFtZXRlcnMsIGEgcmVjdGFuZ2xlIHdpdGggPGNvZGU+eDwvY29kZT4sXHJcblx0ICogPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBzZXRcclxuXHQgKiB0byAwIGlzIGNyZWF0ZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0geCAgICAgIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICByZWN0YW5nbGUuXHJcblx0ICogQHBhcmFtIHkgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgcmVjdGFuZ2xlLlxyXG5cdCAqIEBwYXJhbSB3aWR0aCAgVGhlIHdpZHRoIG9mIHRoZSByZWN0YW5nbGUsIGluIHBpeGVscy5cclxuXHQgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZSwgaW4gcGl4ZWxzLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHg6bnVtYmVyID0gMCwgeTpudW1iZXIgPSAwLCB3aWR0aDpudW1iZXIgPSAwLCBoZWlnaHQ6bnVtYmVyID0gMClcclxuXHR7XHJcblx0XHR0aGlzLnggPSB4O1xyXG5cdFx0dGhpcy55ID0geTtcclxuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIG5ldyBSZWN0YW5nbGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgdmFsdWVzIGZvciB0aGVcclxuXHQgKiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kXHJcblx0ICogPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzIGFzIHRoZSBvcmlnaW5hbCBSZWN0YW5nbGUgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBBIG5ldyBSZWN0YW5nbGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgdmFsdWVzIGZvciB0aGVcclxuXHQgKiAgICAgICAgIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmRcclxuXHQgKiAgICAgICAgIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcyB0aGUgb3JpZ2luYWwgUmVjdGFuZ2xlIG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2xvbmUoKTpSZWN0YW5nbGVcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFJlY3RhbmdsZSh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgcG9pbnQgaXMgY29udGFpbmVkIHdpdGhpbiB0aGUgcmVjdGFuZ3VsYXJcclxuXHQgKiByZWdpb24gZGVmaW5lZCBieSB0aGlzIFJlY3RhbmdsZSBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0geCBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZShob3Jpem9udGFsIHBvc2l0aW9uKSBvZiB0aGUgcG9pbnQuXHJcblx0ICogQHBhcmFtIHkgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUodmVydGljYWwgcG9zaXRpb24pIG9mIHRoZSBwb2ludC5cclxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIFJlY3RhbmdsZSBvYmplY3QgY29udGFpbnMgdGhlXHJcblx0ICogICAgICAgICBzcGVjaWZpZWQgcG9pbnQ7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGNvbnRhaW5zKHg6bnVtYmVyLCB5Om51bWJlcik6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiAodGhpcy54IDw9IHggJiYgdGhpcy54ICsgdGhpcy53aWR0aCA+PSB4ICYmIHRoaXMueSA8PSB5ICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgcG9pbnQgaXMgY29udGFpbmVkIHdpdGhpbiB0aGUgcmVjdGFuZ3VsYXJcclxuXHQgKiByZWdpb24gZGVmaW5lZCBieSB0aGlzIFJlY3RhbmdsZSBvYmplY3QuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlXHJcblx0ICogPGNvZGU+UmVjdGFuZ2xlLmNvbnRhaW5zKCk8L2NvZGU+IG1ldGhvZCwgZXhjZXB0IHRoYXQgaXQgdGFrZXMgYSBQb2ludFxyXG5cdCAqIG9iamVjdCBhcyBhIHBhcmFtZXRlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgcG9pbnQsIGFzIHJlcHJlc2VudGVkIGJ5IGl0cyA8aT54PC9pPiBhbmQgPGk+eTwvaT5cclxuXHQgKiAgICAgICAgICAgICAgY29vcmRpbmF0ZXMuXHJcblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBSZWN0YW5nbGUgb2JqZWN0IGNvbnRhaW5zIHRoZVxyXG5cdCAqICAgICAgICAgc3BlY2lmaWVkIHBvaW50OyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb250YWluc1BvaW50KHBvaW50OlBvaW50KTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuICh0aGlzLnggPD0gcG9pbnQueCAmJiB0aGlzLnggKyB0aGlzLndpZHRoID49IHBvaW50LnggJiYgdGhpcy55IDw9IHBvaW50LnkgJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPj0gcG9pbnQueSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIFJlY3RhbmdsZSBvYmplY3Qgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT5yZWN0PC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlciBpcyBjb250YWluZWQgd2l0aGluIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC4gQSBSZWN0YW5nbGUgb2JqZWN0IGlzXHJcblx0ICogc2FpZCB0byBjb250YWluIGFub3RoZXIgaWYgdGhlIHNlY29uZCBSZWN0YW5nbGUgb2JqZWN0IGZhbGxzIGVudGlyZWx5XHJcblx0ICogd2l0aGluIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBmaXJzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZWN0IFRoZSBSZWN0YW5nbGUgb2JqZWN0IGJlaW5nIGNoZWNrZWQuXHJcblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBSZWN0YW5nbGUgb2JqZWN0IHRoYXQgeW91XHJcblx0ICogICAgICAgICBzcGVjaWZ5IGlzIGNvbnRhaW5lZCBieSB0aGlzIFJlY3RhbmdsZSBvYmplY3Q7IG90aGVyd2lzZVxyXG5cdCAqICAgICAgICAgPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb250YWluc1JlY3QocmVjdDpSZWN0YW5nbGUpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gKHRoaXMueCA8PSByZWN0LnggJiYgdGhpcy54ICsgdGhpcy53aWR0aCA+PSByZWN0LnggKyByZWN0LndpZHRoICYmIHRoaXMueSA8PSByZWN0LnkgJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPj0gcmVjdC55ICsgcmVjdC5oZWlnaHQpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb3BpZXMgYWxsIG9mIHJlY3RhbmdsZSBkYXRhIGZyb20gdGhlIHNvdXJjZSBSZWN0YW5nbGUgb2JqZWN0IGludG8gdGhlXHJcblx0ICogY2FsbGluZyBSZWN0YW5nbGUgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHNvdXJjZVJlY3QgVGhlIFJlY3RhbmdsZSBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb3B5RnJvbShzb3VyY2VSZWN0OlJlY3RhbmdsZSlcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBvYmplY3Qgc3BlY2lmaWVkIGluIHRoZSA8Y29kZT50b0NvbXBhcmU8L2NvZGU+XHJcblx0ICogcGFyYW1ldGVyIGlzIGVxdWFsIHRvIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC4gVGhpcyBtZXRob2QgY29tcGFyZXMgdGhlXHJcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZFxyXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYWdhaW5zdCB0aGUgc2FtZSBwcm9wZXJ0aWVzIG9mXHJcblx0ICogdGhpcyBSZWN0YW5nbGUgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRvQ29tcGFyZSBUaGUgcmVjdGFuZ2xlIHRvIGNvbXBhcmUgdG8gdGhpcyBSZWN0YW5nbGUgb2JqZWN0LlxyXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgb2JqZWN0IGhhcyBleGFjdGx5IHRoZSBzYW1lXHJcblx0ICogICAgICAgICB2YWx1ZXMgZm9yIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcclxuXHQgKiAgICAgICAgIGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgYXMgdGhpcyBSZWN0YW5nbGUgb2JqZWN0O1xyXG5cdCAqICAgICAgICAgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZXF1YWxzKHRvQ29tcGFyZTpSZWN0YW5nbGUpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gKHRoaXMueCA9PSB0b0NvbXBhcmUueCAmJiB0aGlzLnkgPT0gdG9Db21wYXJlLnkgJiYgdGhpcy53aWR0aCA9PSB0b0NvbXBhcmUud2lkdGggJiYgdGhpcy5oZWlnaHQgPT0gdG9Db21wYXJlLmhlaWdodClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluY3JlYXNlcyB0aGUgc2l6ZSBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCBieSB0aGUgc3BlY2lmaWVkIGFtb3VudHMsIGluXHJcblx0ICogcGl4ZWxzLiBUaGUgY2VudGVyIHBvaW50IG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0IHN0YXlzIHRoZSBzYW1lLCBhbmQgaXRzXHJcblx0ICogc2l6ZSBpbmNyZWFzZXMgdG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGJ5IHRoZSA8Y29kZT5keDwvY29kZT4gdmFsdWUsIGFuZCB0b1xyXG5cdCAqIHRoZSB0b3AgYW5kIHRoZSBib3R0b20gYnkgdGhlIDxjb2RlPmR5PC9jb2RlPiB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBkeCBUaGUgdmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIGxlZnQgYW5kIHRoZSByaWdodCBvZiB0aGUgUmVjdGFuZ2xlXHJcblx0ICogICAgICAgICAgIG9iamVjdC4gVGhlIGZvbGxvd2luZyBlcXVhdGlvbiBpcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbmV3XHJcblx0ICogICAgICAgICAgIHdpZHRoIGFuZCBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlOlxyXG5cdCAqIEBwYXJhbSBkeSBUaGUgdmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIHRvcCBhbmQgdGhlIGJvdHRvbSBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgUmVjdGFuZ2xlLiBUaGUgZm9sbG93aW5nIGVxdWF0aW9uIGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBuZXdcclxuXHQgKiAgICAgICAgICAgaGVpZ2h0IGFuZCBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlOlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbmZsYXRlKGR4Om51bWJlciwgZHk6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMueCAtPSBkeC8yO1xyXG5cdFx0dGhpcy55IC09IGR5LzI7XHJcblx0XHR0aGlzLndpZHRoICs9IGR4LzI7XHJcblx0XHR0aGlzLmhlaWdodCArPSBkeS8yO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5jcmVhc2VzIHRoZSBzaXplIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0LiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxyXG5cdCAqIDxjb2RlPlJlY3RhbmdsZS5pbmZsYXRlKCk8L2NvZGU+IG1ldGhvZCBleGNlcHQgaXQgdGFrZXMgYSBQb2ludCBvYmplY3QgYXNcclxuXHQgKiBhIHBhcmFtZXRlci5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgdHdvIGNvZGUgZXhhbXBsZXMgZ2l2ZSB0aGUgc2FtZSByZXN1bHQ6PC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IFRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGlzIFBvaW50IG9iamVjdCBpcyB1c2VkIHRvXHJcblx0ICogICAgICAgICAgICAgIGluY3JlYXNlIHRoZSBob3Jpem9udGFsIGRpbWVuc2lvbiBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdC5cclxuXHQgKiAgICAgICAgICAgICAgVGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IGlzIHVzZWQgdG8gaW5jcmVhc2UgdGhlIHZlcnRpY2FsXHJcblx0ICogICAgICAgICAgICAgIGRpbWVuc2lvbiBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgaW5mbGF0ZVBvaW50KHBvaW50OlBvaW50KVxyXG5cdHtcclxuXHRcdHRoaXMueCAtPSBwb2ludC54LzI7XHJcblx0XHR0aGlzLnkgLT0gcG9pbnQueS8yO1xyXG5cdFx0dGhpcy53aWR0aCArPSBwb2ludC54LzI7XHJcblx0XHR0aGlzLmhlaWdodCArPSBwb2ludC55LzI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCBzcGVjaWZpZWQgaW4gdGhlIDxjb2RlPnRvSW50ZXJzZWN0PC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlciBpbnRlcnNlY3RzIHdpdGggdGhpcyBSZWN0YW5nbGUgb2JqZWN0LCByZXR1cm5zIHRoZSBhcmVhIG9mXHJcblx0ICogaW50ZXJzZWN0aW9uIGFzIGEgUmVjdGFuZ2xlIG9iamVjdC4gSWYgdGhlIHJlY3RhbmdsZXMgZG8gbm90IGludGVyc2VjdCxcclxuXHQgKiB0aGlzIG1ldGhvZCByZXR1cm5zIGFuIGVtcHR5IFJlY3RhbmdsZSBvYmplY3Qgd2l0aCBpdHMgcHJvcGVydGllcyBzZXQgdG9cclxuXHQgKiAwLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRvSW50ZXJzZWN0IFRoZSBSZWN0YW5nbGUgb2JqZWN0IHRvIGNvbXBhcmUgYWdhaW5zdCB0byBzZWUgaWYgaXRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0cyB3aXRoIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC5cclxuXHQgKiBAcmV0dXJuIEEgUmVjdGFuZ2xlIG9iamVjdCB0aGF0IGVxdWFscyB0aGUgYXJlYSBvZiBpbnRlcnNlY3Rpb24uIElmIHRoZVxyXG5cdCAqICAgICAgICAgcmVjdGFuZ2xlcyBkbyBub3QgaW50ZXJzZWN0LCB0aGlzIG1ldGhvZCByZXR1cm5zIGFuIGVtcHR5XHJcblx0ICogICAgICAgICBSZWN0YW5nbGUgb2JqZWN0OyB0aGF0IGlzLCBhIHJlY3RhbmdsZSB3aXRoIGl0cyA8Y29kZT54PC9jb2RlPixcclxuXHQgKiAgICAgICAgIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+XHJcblx0ICogICAgICAgICBwcm9wZXJ0aWVzIHNldCB0byAwLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnRlcnNlY3Rpb24odG9JbnRlcnNlY3Q6UmVjdGFuZ2xlKTpSZWN0YW5nbGVcclxuXHR7XHJcblx0XHRpZiAodGhpcy5pbnRlcnNlY3RzKHRvSW50ZXJzZWN0KSkge1xyXG5cdFx0XHR2YXIgaTpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy54ID4gdG9JbnRlcnNlY3QueCkge1xyXG5cdFx0XHRcdGkueCA9IHRoaXMueDtcclxuXHRcdFx0XHRpLndpZHRoID0gdG9JbnRlcnNlY3QueCAtIHRoaXMueCArIHRvSW50ZXJzZWN0LndpZHRoO1xyXG5cclxuXHRcdFx0XHRpZiAoaS53aWR0aCA+IHRoaXMud2lkdGgpXHJcblx0XHRcdFx0XHRpLndpZHRoID0gdGhpcy53aWR0aDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpLnggPSB0b0ludGVyc2VjdC54O1xyXG5cdFx0XHRcdGkud2lkdGggPSB0aGlzLnggLSB0b0ludGVyc2VjdC54ICsgdGhpcy53aWR0aDtcclxuXHJcblx0XHRcdFx0aWYgKGkud2lkdGggPiB0b0ludGVyc2VjdC53aWR0aClcclxuXHRcdFx0XHRcdGkud2lkdGggPSB0b0ludGVyc2VjdC53aWR0aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMueSA+IHRvSW50ZXJzZWN0LnkpIHtcclxuXHRcdFx0XHRpLnkgPSB0aGlzLnk7XHJcblx0XHRcdFx0aS5oZWlnaHQgPSB0b0ludGVyc2VjdC55IC0gdGhpcy55ICsgdG9JbnRlcnNlY3QuaGVpZ2h0O1xyXG5cclxuXHRcdFx0XHRpZiAoaS5oZWlnaHQgPiB0aGlzLmhlaWdodClcclxuXHRcdFx0XHRcdGkuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aS55ID0gdG9JbnRlcnNlY3QueTtcclxuXHRcdFx0XHRpLmhlaWdodCA9IHRoaXMueSAtIHRvSW50ZXJzZWN0LnkgKyB0aGlzLmhlaWdodDtcclxuXHJcblx0XHRcdFx0aWYgKGkuaGVpZ2h0ID4gdG9JbnRlcnNlY3QuaGVpZ2h0KVxyXG5cdFx0XHRcdFx0aS5oZWlnaHQgPSB0b0ludGVyc2VjdC5oZWlnaHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUmVjdGFuZ2xlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG9iamVjdCBzcGVjaWZpZWQgaW4gdGhlIDxjb2RlPnRvSW50ZXJzZWN0PC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlciBpbnRlcnNlY3RzIHdpdGggdGhpcyBSZWN0YW5nbGUgb2JqZWN0LiBUaGlzIG1ldGhvZCBjaGVja3MgdGhlXHJcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZFxyXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgc3BlY2lmaWVkIFJlY3RhbmdsZSBvYmplY3QgdG8gc2VlIGlmXHJcblx0ICogaXQgaW50ZXJzZWN0cyB3aXRoIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0b0ludGVyc2VjdCBUaGUgUmVjdGFuZ2xlIG9iamVjdCB0byBjb21wYXJlIGFnYWluc3QgdGhpcyBSZWN0YW5nbGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxyXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBpbnRlcnNlY3RzXHJcblx0ICogICAgICAgICB3aXRoIHRoaXMgUmVjdGFuZ2xlIG9iamVjdDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgaW50ZXJzZWN0cyh0b0ludGVyc2VjdDpSZWN0YW5nbGUpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gKHRoaXMueCArIHRoaXMud2lkdGggPiB0b0ludGVyc2VjdC54ICYmIHRoaXMueCA8IHRvSW50ZXJzZWN0LnggKyB0b0ludGVyc2VjdC53aWR0aCAmJiB0aGlzLnkgKyB0aGlzLmhlaWdodCA+IHRvSW50ZXJzZWN0LnkgJiYgdGhpcy55IDwgdG9JbnRlcnNlY3QueSArIHRvSW50ZXJzZWN0LmhlaWdodCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoaXMgUmVjdGFuZ2xlIG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCdzIHdpZHRoIG9yXHJcblx0ICogICAgICAgICBoZWlnaHQgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDA7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGlzRW1wdHkoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuICh0aGlzLnggPT0gMCAmJiB0aGlzLnkgPT0gMCAmJiB0aGlzLndpZHRoID09IDAgJiYgdGhpcy5oZWlnaHQgPT0gMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGp1c3RzIHRoZSBsb2NhdGlvbiBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCwgYXMgZGV0ZXJtaW5lZCBieSBpdHNcclxuXHQgKiB0b3AtbGVmdCBjb3JuZXIsIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBkeCBNb3ZlcyB0aGUgPGk+eDwvaT4gdmFsdWUgb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QgYnkgdGhpcyBhbW91bnQuXHJcblx0ICogQHBhcmFtIGR5IE1vdmVzIHRoZSA8aT55PC9pPiB2YWx1ZSBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCBieSB0aGlzIGFtb3VudC5cclxuXHQgKi9cclxuXHRwdWJsaWMgb2Zmc2V0KGR4Om51bWJlciwgZHk6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMueCArPSBkeDtcclxuXHRcdHRoaXMueSArPSBkeTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkanVzdHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0IHVzaW5nIGEgUG9pbnQgb2JqZWN0IGFzIGFcclxuXHQgKiBwYXJhbWV0ZXIuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlIDxjb2RlPlJlY3RhbmdsZS5vZmZzZXQoKTwvY29kZT5cclxuXHQgKiBtZXRob2QsIGV4Y2VwdCB0aGF0IGl0IHRha2VzIGEgUG9pbnQgb2JqZWN0IGFzIGEgcGFyYW1ldGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IEEgUG9pbnQgb2JqZWN0IHRvIHVzZSB0byBvZmZzZXQgdGhpcyBSZWN0YW5nbGUgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBvZmZzZXRQb2ludChwb2ludDpQb2ludClcclxuXHR7XHJcblx0XHR0aGlzLnggKz0gcG9pbnQueDtcclxuXHRcdHRoaXMueSArPSBwb2ludC55O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBhbGwgb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QncyBwcm9wZXJ0aWVzIHRvIDAuIEEgUmVjdGFuZ2xlIG9iamVjdCBpc1xyXG5cdCAqIGVtcHR5IGlmIGl0cyB3aWR0aCBvciBoZWlnaHQgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDAuXHJcblx0ICpcclxuXHQgKiA8cD4gVGhpcyBtZXRob2Qgc2V0cyB0aGUgdmFsdWVzIG9mIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXHJcblx0ICogPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzIHRvIDAuPC9wPlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIHNldEVtcHR5KClcclxuXHR7XHJcblx0XHR0aGlzLnggPSAwO1xyXG5cdFx0dGhpcy55ID0gMDtcclxuXHRcdHRoaXMud2lkdGggPSAwO1xyXG5cdFx0dGhpcy5oZWlnaHQgPSAwO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgbWVtYmVycyBvZiBSZWN0YW5nbGUgdG8gdGhlIHNwZWNpZmllZCB2YWx1ZXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB4YSAgICAgIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgcmVjdGFuZ2xlLlxyXG5cdCAqIEBwYXJhbSB5YSAgICAgIFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgcmVjdGFuZ2xlLlxyXG5cdCAqIEBwYXJhbSB3aWR0aGEgIFRoZSB3aWR0aCBvZiB0aGUgcmVjdGFuZ2xlLCBpbiBwaXhlbHMuXHJcblx0ICogQHBhcmFtIGhlaWdodGEgVGhlIGhlaWdodCBvZiB0aGUgcmVjdGFuZ2xlLCBpbiBwaXhlbHMuXHJcblx0ICovXHJcblx0cHVibGljIHNldFRvKHhhOm51bWJlciwgeWE6bnVtYmVyLCB3aWR0aGE6bnVtYmVyLCBoZWlnaHRhOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLnggPSB4YTtcclxuXHRcdHRoaXMueSA9IHlhO1xyXG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoYTtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0YTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyBhbmQgcmV0dXJucyBhIHN0cmluZyB0aGF0IGxpc3RzIHRoZSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbFxyXG5cdCAqIHBvc2l0aW9ucyBhbmQgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEEgc3RyaW5nIGxpc3RpbmcgdGhlIHZhbHVlIG9mIGVhY2ggb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIG9mXHJcblx0ICogICAgICAgICB0aGUgUmVjdGFuZ2xlIG9iamVjdDogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxyXG5cdCAqICAgICAgICAgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gXCJbUmVjdGFuZ2xlXSAoeD1cIiArIHRoaXMueCArIFwiLCB5PVwiICsgdGhpcy55ICsgXCIsIHdpZHRoPVwiICsgdGhpcy53aWR0aCArIFwiLCBoZWlnaHQ9XCIgKyB0aGlzLmhlaWdodCArIFwiKVwiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0d28gcmVjdGFuZ2xlcyB0b2dldGhlciB0byBjcmVhdGUgYSBuZXcgUmVjdGFuZ2xlIG9iamVjdCwgYnkgZmlsbGluZ1xyXG5cdCAqIGluIHRoZSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBzcGFjZSBiZXR3ZWVuIHRoZSB0d28gcmVjdGFuZ2xlcy5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGUgPGNvZGU+dW5pb24oKTwvY29kZT4gbWV0aG9kIGlnbm9yZXMgcmVjdGFuZ2xlcyB3aXRoXHJcblx0ICogPGNvZGU+MDwvY29kZT4gYXMgdGhlIGhlaWdodCBvciB3aWR0aCB2YWx1ZSwgc3VjaCBhczogPGNvZGU+dmFyXHJcblx0ICogcmVjdDI6UmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgzMDAsMzAwLDUwLDApOzwvY29kZT48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdG9VbmlvbiBBIFJlY3RhbmdsZSBvYmplY3QgdG8gYWRkIHRvIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC5cclxuXHQgKiBAcmV0dXJuIEEgbmV3IFJlY3RhbmdsZSBvYmplY3QgdGhhdCBpcyB0aGUgdW5pb24gb2YgdGhlIHR3byByZWN0YW5nbGVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB1bmlvbih0b1VuaW9uOlJlY3RhbmdsZSk6UmVjdGFuZ2xlXHJcblx0e1xyXG5cdFx0dmFyIHU6UmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLnggPCB0b1VuaW9uLngpIHtcclxuXHRcdFx0dS54ID0gdGhpcy54O1xyXG5cdFx0XHR1LndpZHRoID0gdG9Vbmlvbi54IC0gdGhpcy54ICsgdG9Vbmlvbi53aWR0aDtcclxuXHJcblx0XHRcdGlmICh1LndpZHRoIDwgdGhpcy53aWR0aClcclxuXHRcdFx0XHR1LndpZHRoID0gdGhpcy53aWR0aDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHUueCA9IHRvVW5pb24ueDtcclxuXHRcdFx0dS53aWR0aCA9IHRoaXMueCAtIHRvVW5pb24ueCArIHRoaXMud2lkdGg7XHJcblxyXG5cdFx0XHRpZiAodS53aWR0aCA8IHRvVW5pb24ud2lkdGgpXHJcblx0XHRcdFx0dS53aWR0aCA9IHRvVW5pb24ud2lkdGg7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMueSA8IHRvVW5pb24ueSkge1xyXG5cdFx0XHR1LnkgPSB0aGlzLnk7XHJcblx0XHRcdHUuaGVpZ2h0ID0gdG9Vbmlvbi55IC0gdGhpcy55ICsgdG9Vbmlvbi5oZWlnaHQ7XHJcblxyXG5cdFx0XHRpZiAodS5oZWlnaHQgPCB0aGlzLmhlaWdodClcclxuXHRcdFx0XHR1LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dS55ID0gdG9Vbmlvbi55O1xyXG5cdFx0XHR1LmhlaWdodCA9IHRoaXMueSAtIHRvVW5pb24ueSArIHRoaXMuaGVpZ2h0O1xyXG5cclxuXHRcdFx0aWYgKHUuaGVpZ2h0IDwgdG9Vbmlvbi5oZWlnaHQpXHJcblx0XHRcdFx0dS5oZWlnaHQgPSB0b1VuaW9uLmhlaWdodDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFJlY3RhbmdsZTsiXX0=