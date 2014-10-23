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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL3JlY3RhbmdsZS50cyJdLCJuYW1lcyI6WyJSZWN0YW5nbGUiLCJSZWN0YW5nbGUuY29uc3RydWN0b3IiLCJSZWN0YW5nbGUuYm90dG9tIiwiUmVjdGFuZ2xlLmJvdHRvbVJpZ2h0IiwiUmVjdGFuZ2xlLmxlZnQiLCJSZWN0YW5nbGUucmlnaHQiLCJSZWN0YW5nbGUuc2l6ZSIsIlJlY3RhbmdsZS50b3AiLCJSZWN0YW5nbGUudG9wTGVmdCIsIlJlY3RhbmdsZS5jbG9uZSIsIlJlY3RhbmdsZS5jb250YWlucyIsIlJlY3RhbmdsZS5jb250YWluc1BvaW50IiwiUmVjdGFuZ2xlLmNvbnRhaW5zUmVjdCIsIlJlY3RhbmdsZS5jb3B5RnJvbSIsIlJlY3RhbmdsZS5lcXVhbHMiLCJSZWN0YW5nbGUuaW5mbGF0ZSIsIlJlY3RhbmdsZS5pbmZsYXRlUG9pbnQiLCJSZWN0YW5nbGUuaW50ZXJzZWN0aW9uIiwiUmVjdGFuZ2xlLmludGVyc2VjdHMiLCJSZWN0YW5nbGUuaXNFbXB0eSIsIlJlY3RhbmdsZS5vZmZzZXQiLCJSZWN0YW5nbGUub2Zmc2V0UG9pbnQiLCJSZWN0YW5nbGUuc2V0RW1wdHkiLCJSZWN0YW5nbGUuc2V0VG8iLCJSZWN0YW5nbGUudG9TdHJpbmciLCJSZWN0YW5nbGUudW5pb24iXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sS0FBSyxXQUFlLDRCQUE0QixDQUFDLENBQUM7QUFFekQsQUE0Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FERztJQUNHLFNBQVM7SUFxSWRBOzs7Ozs7Ozs7Ozs7OztPQWNHQTtJQUNIQSxTQXBKS0EsU0FBU0EsQ0FvSkZBLENBQVlBLEVBQUVBLENBQVlBLEVBQUVBLEtBQWdCQSxFQUFFQSxNQUFpQkE7UUFBL0RDLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFBRUEscUJBQWdCQSxHQUFoQkEsU0FBZ0JBO1FBQUVB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LENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUFBO0lBQzVJQSxDQUFDQTtJQUVEWjs7Ozs7T0FLR0E7SUFDSUEsNEJBQVFBLEdBQWZBLFVBQWdCQSxVQUFvQkE7SUFHcENhLENBQUNBO0lBRURiOzs7Ozs7Ozs7Ozs7T0FZR0E7SUFDSUEsMEJBQU1BLEdBQWJBLFVBQWNBLFNBQW1CQTtRQUVoQ2MsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsU0FBU0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQUE7SUFDNUhBLENBQUNBO0lBRURkOzs7Ozs7Ozs7Ozs7T0FZR0E7SUFDSUEsMkJBQU9BLEdBQWRBLFVBQWVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRWxDZSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUNmQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUNmQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxFQUFFQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUNuQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDckJBLENBQUNBO0lBRURmOzs7Ozs7Ozs7OztPQVdHQTtJQUNJQSxnQ0FBWUEsR0FBbkJBLFVBQW9CQSxLQUFXQTtRQUU5QmdCLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1FBQ3BCQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO0lBQzFCQSxDQUFDQTtJQUVEaEI7Ozs7Ozs7Ozs7Ozs7O09BY0dBO0lBQ0lBLGdDQUFZQSxHQUFuQkEsVUFBb0JBLFdBQXFCQTtRQUV4Q2lCLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xDQSxJQUFJQSxDQUFDQSxHQUFhQSxJQUFJQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUVsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVCQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDYkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBRXJEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtvQkFDeEJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3ZCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFFOUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBO29CQUMvQkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDOUJBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2JBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBO2dCQUV2REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQzFCQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0Es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Imdlb20vUmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2ludFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Qb2ludFwiKTtcblxuLyoqXG4gKiBBIFJlY3RhbmdsZSBvYmplY3QgaXMgYW4gYXJlYSBkZWZpbmVkIGJ5IGl0cyBwb3NpdGlvbiwgYXMgaW5kaWNhdGVkIGJ5IGl0c1xuICogdG9wLWxlZnQgY29ybmVyIHBvaW50KDxpPng8L2k+LCA8aT55PC9pPikgYW5kIGJ5IGl0cyB3aWR0aCBhbmQgaXRzIGhlaWdodC5cbiAqXG4gKlxuICogPHA+VGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmRcbiAqIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgUmVjdGFuZ2xlIGNsYXNzIGFyZSBpbmRlcGVuZGVudCBvZlxuICogZWFjaCBvdGhlcjsgY2hhbmdpbmcgdGhlIHZhbHVlIG9mIG9uZSBwcm9wZXJ0eSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBvdGhlcnMuXG4gKiBIb3dldmVyLCB0aGUgPGNvZGU+cmlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5ib3R0b208L2NvZGU+IHByb3BlcnRpZXMgYXJlXG4gKiBpbnRlZ3JhbGx5IHJlbGF0ZWQgdG8gdGhvc2UgZm91ciBwcm9wZXJ0aWVzLiBGb3IgZXhhbXBsZSwgaWYgeW91IGNoYW5nZSB0aGVcbiAqIHZhbHVlIG9mIHRoZSA8Y29kZT5yaWdodDwvY29kZT4gcHJvcGVydHksIHRoZSB2YWx1ZSBvZiB0aGVcbiAqIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSBjaGFuZ2VzOyBpZiB5b3UgY2hhbmdlIHRoZSA8Y29kZT5ib3R0b208L2NvZGU+XG4gKiBwcm9wZXJ0eSwgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnR5IGNoYW5nZXMuIDwvcD5cbiAqXG4gKiA8cD5UaGUgZm9sbG93aW5nIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdXNlIFJlY3RhbmdsZSBvYmplY3RzOjwvcD5cbiAqXG4gKiA8dWw+XG4gKiAgIDxsaT5UaGUgPGNvZGU+YXBwbHlGaWx0ZXIoKTwvY29kZT4sIDxjb2RlPmNvbG9yVHJhbnNmb3JtKCk8L2NvZGU+LFxuICogPGNvZGU+Y29weUNoYW5uZWwoKTwvY29kZT4sIDxjb2RlPmNvcHlQaXhlbHMoKTwvY29kZT4sIDxjb2RlPmRyYXcoKTwvY29kZT4sXG4gKiA8Y29kZT5maWxsUmVjdCgpPC9jb2RlPiwgPGNvZGU+Z2VuZXJhdGVGaWx0ZXJSZWN0KCk8L2NvZGU+LFxuICogPGNvZGU+Z2V0Q29sb3JCb3VuZHNSZWN0KCk8L2NvZGU+LCA8Y29kZT5nZXRQaXhlbHMoKTwvY29kZT4sXG4gKiA8Y29kZT5tZXJnZSgpPC9jb2RlPiwgPGNvZGU+cGFsZXR0ZU1hcCgpPC9jb2RlPixcbiAqIDxjb2RlPnBpeGVsRGlzb2x2ZSgpPC9jb2RlPiwgPGNvZGU+c2V0UGl4ZWxzKCk8L2NvZGU+LCBhbmRcbiAqIDxjb2RlPnRocmVzaG9sZCgpPC9jb2RlPiBtZXRob2RzLCBhbmQgdGhlIDxjb2RlPnJlY3Q8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuICogQml0bWFwRGF0YSBjbGFzczwvbGk+XG4gKiAgIDxsaT5UaGUgPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IGFuZCA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZHMsIGFuZFxuICogdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IGFuZCA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0aWVzIG9mIHRoZVxuICogRGlzcGxheU9iamVjdCBjbGFzczwvbGk+XG4gKiAgIDxsaT5UaGUgPGNvZGU+Z2V0Q2hhckJvdW5kYXJpZXMoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBUZXh0RmllbGRcbiAqIGNsYXNzPC9saT5cbiAqICAgPGxpPlRoZSA8Y29kZT5waXhlbEJvdW5kczwvY29kZT4gcHJvcGVydHkgb2YgdGhlIFRyYW5zZm9ybSBjbGFzczwvbGk+XG4gKiAgIDxsaT5UaGUgPGNvZGU+Ym91bmRzPC9jb2RlPiBwYXJhbWV0ZXIgZm9yIHRoZSA8Y29kZT5zdGFydERyYWcoKTwvY29kZT5cbiAqIG1ldGhvZCBvZiB0aGUgU3ByaXRlIGNsYXNzPC9saT5cbiAqICAgPGxpPlRoZSA8Y29kZT5wcmludEFyZWE8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGUgPGNvZGU+YWRkUGFnZSgpPC9jb2RlPlxuICogbWV0aG9kIG9mIHRoZSBQcmludEpvYiBjbGFzczwvbGk+XG4gKiA8L3VsPlxuICpcbiAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5uZXcgUmVjdGFuZ2xlKCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhXG4gKiBSZWN0YW5nbGUgb2JqZWN0LjwvcD5cbiAqXG4gKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIFJlY3RhbmdsZSBjbGFzcyBkb2VzIG5vdCBkZWZpbmUgYSByZWN0YW5ndWxhciBTaGFwZVxuICogZGlzcGxheSBvYmplY3QuIFRvIGRyYXcgYSByZWN0YW5ndWxhciBTaGFwZSBvYmplY3Qgb25zY3JlZW4sIHVzZSB0aGVcbiAqIDxjb2RlPmRyYXdSZWN0KCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgR3JhcGhpY3MgY2xhc3MuPC9wPlxuICovXG5jbGFzcyBSZWN0YW5nbGVcbntcblx0cHJpdmF0ZSBfc2l6ZTpQb2ludDtcblx0cHJpdmF0ZSBfYm90dG9tUmlnaHQ6UG9pbnQ7XG5cdHByaXZhdGUgX3RvcExlZnQ6UG9pbnQ7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZSwgaW4gcGl4ZWxzLiBDaGFuZ2luZyB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPlxuXHQgKiB2YWx1ZSBvZiBhIFJlY3RhbmdsZSBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sXG5cdCAqIDxjb2RlPnk8L2NvZGU+LCBhbmQgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgaGVpZ2h0Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIHdpZHRoIG9mIHRoZSByZWN0YW5nbGUsIGluIHBpeGVscy4gQ2hhbmdpbmcgdGhlIDxjb2RlPndpZHRoPC9jb2RlPlxuXHQgKiB2YWx1ZSBvZiBhIFJlY3RhbmdsZSBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sXG5cdCAqIDxjb2RlPnk8L2NvZGU+LCBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIHdpZHRoOm51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ2xlLiBDaGFuZ2luZ1xuXHQgKiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5IG9mIGEgUmVjdGFuZ2xlIG9iamVjdCBoYXMgbm9cblx0ICogZWZmZWN0IG9uIHRoZSA8Y29kZT55PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPlxuXHQgKiBwcm9wZXJ0aWVzLlxuXHQgKlxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGVcblx0ICogPGNvZGU+bGVmdDwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKi9cblx0cHVibGljIHg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUuIENoYW5naW5nXG5cdCAqIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgb2YgYSBSZWN0YW5nbGUgb2JqZWN0IGhhcyBub1xuXHQgKiBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+XG5cdCAqIHByb3BlcnRpZXMuXG5cdCAqXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZVxuXHQgKiA8Y29kZT50b3A8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyB5Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIHN1bSBvZiB0aGUgPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90dG9tKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGxvY2F0aW9uIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0J3MgYm90dG9tLXJpZ2h0IGNvcm5lciwgZGV0ZXJtaW5lZCBieVxuXHQgKiB0aGUgdmFsdWVzIG9mIHRoZSA8Y29kZT5yaWdodDwvY29kZT4gYW5kIDxjb2RlPmJvdHRvbTwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90dG9tUmlnaHQoKTpQb2ludFxuXHR7XG5cdFx0aWYgKHRoaXMuX2JvdHRvbVJpZ2h0ID09IG51bGwpXG5cdFx0XHR0aGlzLl9ib3R0b21SaWdodCA9IG5ldyBQb2ludCgpO1xuXG5cdFx0dGhpcy5fYm90dG9tUmlnaHQueCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG5cdFx0dGhpcy5fYm90dG9tUmlnaHQueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuXG5cdFx0cmV0dXJuIHRoaXMuX2JvdHRvbVJpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3RhbmdsZS4gQ2hhbmdpbmdcblx0ICogdGhlIDxjb2RlPmxlZnQ8L2NvZGU+IHByb3BlcnR5IG9mIGEgUmVjdGFuZ2xlIG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZVxuXHQgKiA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLiBIb3dldmVyIGl0IGRvZXMgYWZmZWN0XG5cdCAqIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHksIHdoZXJlYXMgY2hhbmdpbmcgdGhlIDxjb2RlPng8L2NvZGU+IHZhbHVlXG5cdCAqIGRvZXMgPGk+bm90PC9pPiBhZmZlY3QgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eS5cblx0ICpcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5sZWZ0PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2Zcblx0ICogdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbGVmdCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc3VtIG9mIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc2l6ZSBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCwgZXhwcmVzc2VkIGFzIGEgUG9pbnQgb2JqZWN0IHdpdGggdGhlXG5cdCAqIHZhbHVlcyBvZiB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNpemUoKTpQb2ludFxuXHR7XG5cdFx0aWYgKHRoaXMuX3NpemUgPT0gbnVsbClcblx0XHRcdHRoaXMuX3NpemUgPSBuZXcgUG9pbnQoKTtcblxuXHRcdHRoaXMuX3NpemUueCA9IHRoaXMud2lkdGg7XG5cdFx0dGhpcy5fc2l6ZS55ID0gdGhpcy5oZWlnaHQ7XG5cblx0XHRyZXR1cm4gdGhpcy5fc2l6ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUuIENoYW5naW5nXG5cdCAqIHRoZSA8Y29kZT50b3A8L2NvZGU+IHByb3BlcnR5IG9mIGEgUmVjdGFuZ2xlIG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnRpZXMuIEhvd2V2ZXIgaXQgZG9lcyBhZmZlY3Rcblx0ICogdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHksIHdoZXJlYXMgY2hhbmdpbmcgdGhlIDxjb2RlPnk8L2NvZGU+XG5cdCAqIHZhbHVlIGRvZXMgPGk+bm90PC9pPiBhZmZlY3QgdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHkuXG5cdCAqXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+dG9wPC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgdGhlXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgdG9wKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy55O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBsb2NhdGlvbiBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCdzIHRvcC1sZWZ0IGNvcm5lciwgZGV0ZXJtaW5lZCBieSB0aGVcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIG9mIHRoZSBwb2ludC5cblx0ICovXG5cdHB1YmxpYyBnZXQgdG9wTGVmdCgpOlBvaW50XG5cdHtcblx0XHRpZiAodGhpcy5fdG9wTGVmdCA9PSBudWxsKVxuXHRcdFx0dGhpcy5fdG9wTGVmdCA9IG5ldyBQb2ludCgpO1xuXG5cdFx0dGhpcy5fdG9wTGVmdC54ID0gdGhpcy54O1xuXHRcdHRoaXMuX3RvcExlZnQueSA9IHRoaXMueTtcblxuXHRcdHJldHVybiB0aGlzLl90b3BMZWZ0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgUmVjdGFuZ2xlIG9iamVjdCB3aXRoIHRoZSB0b3AtbGVmdCBjb3JuZXIgc3BlY2lmaWVkIGJ5IHRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycyBhbmQgd2l0aCB0aGUgc3BlY2lmaWVkXG5cdCAqIDxjb2RlPndpZHRoPC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwYXJhbWV0ZXJzLiBJZiB5b3UgY2FsbCB0aGlzXG5cdCAqIHB1YmxpYyB3aXRob3V0IHBhcmFtZXRlcnMsIGEgcmVjdGFuZ2xlIHdpdGggPGNvZGU+eDwvY29kZT4sXG5cdCAqIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgc2V0XG5cdCAqIHRvIDAgaXMgY3JlYXRlZC5cblx0ICpcblx0ICogQHBhcmFtIHggICAgICBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgIHJlY3RhbmdsZS5cblx0ICogQHBhcmFtIHkgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgIHJlY3RhbmdsZS5cblx0ICogQHBhcmFtIHdpZHRoICBUaGUgd2lkdGggb2YgdGhlIHJlY3RhbmdsZSwgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZSwgaW4gcGl4ZWxzLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoeDpudW1iZXIgPSAwLCB5Om51bWJlciA9IDAsIHdpZHRoOm51bWJlciA9IDAsIGhlaWdodDpudW1iZXIgPSAwKVxuXHR7XG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IFJlY3RhbmdsZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSB2YWx1ZXMgZm9yIHRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcyB0aGUgb3JpZ2luYWwgUmVjdGFuZ2xlIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiBBIG5ldyBSZWN0YW5nbGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgdmFsdWVzIGZvciB0aGVcblx0ICogICAgICAgICA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kXG5cdCAqICAgICAgICAgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzIGFzIHRoZSBvcmlnaW5hbCBSZWN0YW5nbGUgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6UmVjdGFuZ2xlXG5cdHtcblx0XHRyZXR1cm4gbmV3IFJlY3RhbmdsZSh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHBvaW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhlIHJlY3Rhbmd1bGFyXG5cdCAqIHJlZ2lvbiBkZWZpbmVkIGJ5IHRoaXMgUmVjdGFuZ2xlIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHggVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUoaG9yaXpvbnRhbCBwb3NpdGlvbikgb2YgdGhlIHBvaW50LlxuXHQgKiBAcGFyYW0geSBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSh2ZXJ0aWNhbCBwb3NpdGlvbikgb2YgdGhlIHBvaW50LlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIFJlY3RhbmdsZSBvYmplY3QgY29udGFpbnMgdGhlXG5cdCAqICAgICAgICAgc3BlY2lmaWVkIHBvaW50OyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGNvbnRhaW5zKHg6bnVtYmVyLCB5Om51bWJlcik6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPD0geCAmJiB0aGlzLnggKyB0aGlzLndpZHRoID49IHggJiYgdGhpcy55IDw9IHkgJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPj0geSk7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgcG9pbnQgaXMgY29udGFpbmVkIHdpdGhpbiB0aGUgcmVjdGFuZ3VsYXJcblx0ICogcmVnaW9uIGRlZmluZWQgYnkgdGhpcyBSZWN0YW5nbGUgb2JqZWN0LiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxuXHQgKiA8Y29kZT5SZWN0YW5nbGUuY29udGFpbnMoKTwvY29kZT4gbWV0aG9kLCBleGNlcHQgdGhhdCBpdCB0YWtlcyBhIFBvaW50XG5cdCAqIG9iamVjdCBhcyBhIHBhcmFtZXRlci5cblx0ICpcblx0ICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCwgYXMgcmVwcmVzZW50ZWQgYnkgaXRzIDxpPng8L2k+IGFuZCA8aT55PC9pPlxuXHQgKiAgICAgICAgICAgICAgY29vcmRpbmF0ZXMuXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCBjb250YWlucyB0aGVcblx0ICogICAgICAgICBzcGVjaWZpZWQgcG9pbnQ7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgY29udGFpbnNQb2ludChwb2ludDpQb2ludCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPD0gcG9pbnQueCAmJiB0aGlzLnggKyB0aGlzLndpZHRoID49IHBvaW50LnggJiYgdGhpcy55IDw9IHBvaW50LnkgJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPj0gcG9pbnQueSk7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBSZWN0YW5nbGUgb2JqZWN0IHNwZWNpZmllZCBieSB0aGUgPGNvZGU+cmVjdDwvY29kZT5cblx0ICogcGFyYW1ldGVyIGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBSZWN0YW5nbGUgb2JqZWN0LiBBIFJlY3RhbmdsZSBvYmplY3QgaXNcblx0ICogc2FpZCB0byBjb250YWluIGFub3RoZXIgaWYgdGhlIHNlY29uZCBSZWN0YW5nbGUgb2JqZWN0IGZhbGxzIGVudGlyZWx5XG5cdCAqIHdpdGhpbiB0aGUgYm91bmRhcmllcyBvZiB0aGUgZmlyc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSByZWN0IFRoZSBSZWN0YW5nbGUgb2JqZWN0IGJlaW5nIGNoZWNrZWQuXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCB0aGF0IHlvdVxuXHQgKiAgICAgICAgIHNwZWNpZnkgaXMgY29udGFpbmVkIGJ5IHRoaXMgUmVjdGFuZ2xlIG9iamVjdDsgb3RoZXJ3aXNlXG5cdCAqICAgICAgICAgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGNvbnRhaW5zUmVjdChyZWN0OlJlY3RhbmdsZSk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPD0gcmVjdC54ICYmIHRoaXMueCArIHRoaXMud2lkdGggPj0gcmVjdC54ICsgcmVjdC53aWR0aCAmJiB0aGlzLnkgPD0gcmVjdC55ICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHJlY3QueSArIHJlY3QuaGVpZ2h0KVxuXHR9XG5cblx0LyoqXG5cdCAqIENvcGllcyBhbGwgb2YgcmVjdGFuZ2xlIGRhdGEgZnJvbSB0aGUgc291cmNlIFJlY3RhbmdsZSBvYmplY3QgaW50byB0aGVcblx0ICogY2FsbGluZyBSZWN0YW5nbGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gc291cmNlUmVjdCBUaGUgUmVjdGFuZ2xlIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgY29weUZyb20oc291cmNlUmVjdDpSZWN0YW5nbGUpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgb2JqZWN0IHNwZWNpZmllZCBpbiB0aGUgPGNvZGU+dG9Db21wYXJlPC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIgaXMgZXF1YWwgdG8gdGhpcyBSZWN0YW5nbGUgb2JqZWN0LiBUaGlzIG1ldGhvZCBjb21wYXJlcyB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IGFnYWluc3QgdGhlIHNhbWUgcHJvcGVydGllcyBvZlxuXHQgKiB0aGlzIFJlY3RhbmdsZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB0b0NvbXBhcmUgVGhlIHJlY3RhbmdsZSB0byBjb21wYXJlIHRvIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC5cblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBvYmplY3QgaGFzIGV4YWN0bHkgdGhlIHNhbWVcblx0ICogICAgICAgICB2YWx1ZXMgZm9yIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcblx0ICogICAgICAgICBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzIGFzIHRoaXMgUmVjdGFuZ2xlIG9iamVjdDtcblx0ICogICAgICAgICBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGVxdWFscyh0b0NvbXBhcmU6UmVjdGFuZ2xlKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMueCA9PSB0b0NvbXBhcmUueCAmJiB0aGlzLnkgPT0gdG9Db21wYXJlLnkgJiYgdGhpcy53aWR0aCA9PSB0b0NvbXBhcmUud2lkdGggJiYgdGhpcy5oZWlnaHQgPT0gdG9Db21wYXJlLmhlaWdodClcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmNyZWFzZXMgdGhlIHNpemUgb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QgYnkgdGhlIHNwZWNpZmllZCBhbW91bnRzLCBpblxuXHQgKiBwaXhlbHMuIFRoZSBjZW50ZXIgcG9pbnQgb2YgdGhlIFJlY3RhbmdsZSBvYmplY3Qgc3RheXMgdGhlIHNhbWUsIGFuZCBpdHNcblx0ICogc2l6ZSBpbmNyZWFzZXMgdG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGJ5IHRoZSA8Y29kZT5keDwvY29kZT4gdmFsdWUsIGFuZCB0b1xuXHQgKiB0aGUgdG9wIGFuZCB0aGUgYm90dG9tIGJ5IHRoZSA8Y29kZT5keTwvY29kZT4gdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSBkeCBUaGUgdmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIGxlZnQgYW5kIHRoZSByaWdodCBvZiB0aGUgUmVjdGFuZ2xlXG5cdCAqICAgICAgICAgICBvYmplY3QuIFRoZSBmb2xsb3dpbmcgZXF1YXRpb24gaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5ld1xuXHQgKiAgICAgICAgICAgd2lkdGggYW5kIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGU6XG5cdCAqIEBwYXJhbSBkeSBUaGUgdmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIHRvcCBhbmQgdGhlIGJvdHRvbSBvZiB0aGVcblx0ICogICAgICAgICAgIFJlY3RhbmdsZS4gVGhlIGZvbGxvd2luZyBlcXVhdGlvbiBpcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbmV3XG5cdCAqICAgICAgICAgICBoZWlnaHQgYW5kIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGU6XG5cdCAqL1xuXHRwdWJsaWMgaW5mbGF0ZShkeDpudW1iZXIsIGR5Om51bWJlcilcblx0e1xuXHRcdHRoaXMueCAtPSBkeC8yO1xuXHRcdHRoaXMueSAtPSBkeS8yO1xuXHRcdHRoaXMud2lkdGggKz0gZHgvMjtcblx0XHR0aGlzLmhlaWdodCArPSBkeS8yO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluY3JlYXNlcyB0aGUgc2l6ZSBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdC4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byB0aGVcblx0ICogPGNvZGU+UmVjdGFuZ2xlLmluZmxhdGUoKTwvY29kZT4gbWV0aG9kIGV4Y2VwdCBpdCB0YWtlcyBhIFBvaW50IG9iamVjdCBhc1xuXHQgKiBhIHBhcmFtZXRlci5cblx0ICpcblx0ICogPHA+VGhlIGZvbGxvd2luZyB0d28gY29kZSBleGFtcGxlcyBnaXZlIHRoZSBzYW1lIHJlc3VsdDo8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgPGNvZGU+eDwvY29kZT4gcHJvcGVydHkgb2YgdGhpcyBQb2ludCBvYmplY3QgaXMgdXNlZCB0b1xuXHQgKiAgICAgICAgICAgICAgaW5jcmVhc2UgdGhlIGhvcml6b250YWwgZGltZW5zaW9uIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0LlxuXHQgKiAgICAgICAgICAgICAgVGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IGlzIHVzZWQgdG8gaW5jcmVhc2UgdGhlIHZlcnRpY2FsXG5cdCAqICAgICAgICAgICAgICBkaW1lbnNpb24gb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgaW5mbGF0ZVBvaW50KHBvaW50OlBvaW50KVxuXHR7XG5cdFx0dGhpcy54IC09IHBvaW50LngvMjtcblx0XHR0aGlzLnkgLT0gcG9pbnQueS8yO1xuXHRcdHRoaXMud2lkdGggKz0gcG9pbnQueC8yO1xuXHRcdHRoaXMuaGVpZ2h0ICs9IHBvaW50LnkvMjtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCBzcGVjaWZpZWQgaW4gdGhlIDxjb2RlPnRvSW50ZXJzZWN0PC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIgaW50ZXJzZWN0cyB3aXRoIHRoaXMgUmVjdGFuZ2xlIG9iamVjdCwgcmV0dXJucyB0aGUgYXJlYSBvZlxuXHQgKiBpbnRlcnNlY3Rpb24gYXMgYSBSZWN0YW5nbGUgb2JqZWN0LiBJZiB0aGUgcmVjdGFuZ2xlcyBkbyBub3QgaW50ZXJzZWN0LFxuXHQgKiB0aGlzIG1ldGhvZCByZXR1cm5zIGFuIGVtcHR5IFJlY3RhbmdsZSBvYmplY3Qgd2l0aCBpdHMgcHJvcGVydGllcyBzZXQgdG9cblx0ICogMC5cblx0ICpcblx0ICogQHBhcmFtIHRvSW50ZXJzZWN0IFRoZSBSZWN0YW5nbGUgb2JqZWN0IHRvIGNvbXBhcmUgYWdhaW5zdCB0byBzZWUgaWYgaXRcblx0ICogICAgICAgICAgICAgICAgICAgIGludGVyc2VjdHMgd2l0aCB0aGlzIFJlY3RhbmdsZSBvYmplY3QuXG5cdCAqIEByZXR1cm4gQSBSZWN0YW5nbGUgb2JqZWN0IHRoYXQgZXF1YWxzIHRoZSBhcmVhIG9mIGludGVyc2VjdGlvbi4gSWYgdGhlXG5cdCAqICAgICAgICAgcmVjdGFuZ2xlcyBkbyBub3QgaW50ZXJzZWN0LCB0aGlzIG1ldGhvZCByZXR1cm5zIGFuIGVtcHR5XG5cdCAqICAgICAgICAgUmVjdGFuZ2xlIG9iamVjdDsgdGhhdCBpcywgYSByZWN0YW5nbGUgd2l0aCBpdHMgPGNvZGU+eDwvY29kZT4sXG5cdCAqICAgICAgICAgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kIDxjb2RlPmhlaWdodDwvY29kZT5cblx0ICogICAgICAgICBwcm9wZXJ0aWVzIHNldCB0byAwLlxuXHQgKi9cblx0cHVibGljIGludGVyc2VjdGlvbih0b0ludGVyc2VjdDpSZWN0YW5nbGUpOlJlY3RhbmdsZVxuXHR7XG5cdFx0aWYgKHRoaXMuaW50ZXJzZWN0cyh0b0ludGVyc2VjdCkpIHtcblx0XHRcdHZhciBpOlJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcblxuXHRcdFx0aWYgKHRoaXMueCA+IHRvSW50ZXJzZWN0LngpIHtcblx0XHRcdFx0aS54ID0gdGhpcy54O1xuXHRcdFx0XHRpLndpZHRoID0gdG9JbnRlcnNlY3QueCAtIHRoaXMueCArIHRvSW50ZXJzZWN0LndpZHRoO1xuXG5cdFx0XHRcdGlmIChpLndpZHRoID4gdGhpcy53aWR0aClcblx0XHRcdFx0XHRpLndpZHRoID0gdGhpcy53aWR0aDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGkueCA9IHRvSW50ZXJzZWN0Lng7XG5cdFx0XHRcdGkud2lkdGggPSB0aGlzLnggLSB0b0ludGVyc2VjdC54ICsgdGhpcy53aWR0aDtcblxuXHRcdFx0XHRpZiAoaS53aWR0aCA+IHRvSW50ZXJzZWN0LndpZHRoKVxuXHRcdFx0XHRcdGkud2lkdGggPSB0b0ludGVyc2VjdC53aWR0aDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMueSA+IHRvSW50ZXJzZWN0LnkpIHtcblx0XHRcdFx0aS55ID0gdGhpcy55O1xuXHRcdFx0XHRpLmhlaWdodCA9IHRvSW50ZXJzZWN0LnkgLSB0aGlzLnkgKyB0b0ludGVyc2VjdC5oZWlnaHQ7XG5cblx0XHRcdFx0aWYgKGkuaGVpZ2h0ID4gdGhpcy5oZWlnaHQpXG5cdFx0XHRcdFx0aS5oZWlnaHQgPSB0aGlzLmhlaWdodDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGkueSA9IHRvSW50ZXJzZWN0Lnk7XG5cdFx0XHRcdGkuaGVpZ2h0ID0gdGhpcy55IC0gdG9JbnRlcnNlY3QueSArIHRoaXMuaGVpZ2h0O1xuXG5cdFx0XHRcdGlmIChpLmhlaWdodCA+IHRvSW50ZXJzZWN0LmhlaWdodClcblx0XHRcdFx0XHRpLmhlaWdodCA9IHRvSW50ZXJzZWN0LmhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBSZWN0YW5nbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG9iamVjdCBzcGVjaWZpZWQgaW4gdGhlIDxjb2RlPnRvSW50ZXJzZWN0PC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIgaW50ZXJzZWN0cyB3aXRoIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC4gVGhpcyBtZXRob2QgY2hlY2tzIHRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgc3BlY2lmaWVkIFJlY3RhbmdsZSBvYmplY3QgdG8gc2VlIGlmXG5cdCAqIGl0IGludGVyc2VjdHMgd2l0aCB0aGlzIFJlY3RhbmdsZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB0b0ludGVyc2VjdCBUaGUgUmVjdGFuZ2xlIG9iamVjdCB0byBjb21wYXJlIGFnYWluc3QgdGhpcyBSZWN0YW5nbGVcblx0ICogICAgICAgICAgICAgICAgICAgIG9iamVjdC5cblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IGludGVyc2VjdHNcblx0ICogICAgICAgICB3aXRoIHRoaXMgUmVjdGFuZ2xlIG9iamVjdDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBpbnRlcnNlY3RzKHRvSW50ZXJzZWN0OlJlY3RhbmdsZSk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggKyB0aGlzLndpZHRoID4gdG9JbnRlcnNlY3QueCAmJiB0aGlzLnggPCB0b0ludGVyc2VjdC54ICsgdG9JbnRlcnNlY3Qud2lkdGggJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPiB0b0ludGVyc2VjdC55ICYmIHRoaXMueSA8IHRvSW50ZXJzZWN0LnkgKyB0b0ludGVyc2VjdC5oZWlnaHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhpcyBSZWN0YW5nbGUgb2JqZWN0IGlzIGVtcHR5LlxuXHQgKlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIFJlY3RhbmdsZSBvYmplY3QncyB3aWR0aCBvclxuXHQgKiAgICAgICAgIGhlaWdodCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBpc0VtcHR5KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPT0gMCAmJiB0aGlzLnkgPT0gMCAmJiB0aGlzLndpZHRoID09IDAgJiYgdGhpcy5oZWlnaHQgPT0gMCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgbG9jYXRpb24gb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QsIGFzIGRldGVybWluZWQgYnkgaXRzXG5cdCAqIHRvcC1sZWZ0IGNvcm5lciwgYnkgdGhlIHNwZWNpZmllZCBhbW91bnRzLlxuXHQgKlxuXHQgKiBAcGFyYW0gZHggTW92ZXMgdGhlIDxpPng8L2k+IHZhbHVlIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0IGJ5IHRoaXMgYW1vdW50LlxuXHQgKiBAcGFyYW0gZHkgTW92ZXMgdGhlIDxpPnk8L2k+IHZhbHVlIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0IGJ5IHRoaXMgYW1vdW50LlxuXHQgKi9cblx0cHVibGljIG9mZnNldChkeDpudW1iZXIsIGR5Om51bWJlcilcblx0e1xuXHRcdHRoaXMueCArPSBkeDtcblx0XHR0aGlzLnkgKz0gZHk7XG5cdH1cblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgbG9jYXRpb24gb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QgdXNpbmcgYSBQb2ludCBvYmplY3QgYXMgYVxuXHQgKiBwYXJhbWV0ZXIuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlIDxjb2RlPlJlY3RhbmdsZS5vZmZzZXQoKTwvY29kZT5cblx0ICogbWV0aG9kLCBleGNlcHQgdGhhdCBpdCB0YWtlcyBhIFBvaW50IG9iamVjdCBhcyBhIHBhcmFtZXRlci5cblx0ICpcblx0ICogQHBhcmFtIHBvaW50IEEgUG9pbnQgb2JqZWN0IHRvIHVzZSB0byBvZmZzZXQgdGhpcyBSZWN0YW5nbGUgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIG9mZnNldFBvaW50KHBvaW50OlBvaW50KVxuXHR7XG5cdFx0dGhpcy54ICs9IHBvaW50Lng7XG5cdFx0dGhpcy55ICs9IHBvaW50Lnk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBhbGwgb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QncyBwcm9wZXJ0aWVzIHRvIDAuIEEgUmVjdGFuZ2xlIG9iamVjdCBpc1xuXHQgKiBlbXB0eSBpZiBpdHMgd2lkdGggb3IgaGVpZ2h0IGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byAwLlxuXHQgKlxuXHQgKiA8cD4gVGhpcyBtZXRob2Qgc2V0cyB0aGUgdmFsdWVzIG9mIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXG5cdCAqIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyB0byAwLjwvcD5cblx0ICpcblx0ICovXG5cdHB1YmxpYyBzZXRFbXB0eSgpXG5cdHtcblx0XHR0aGlzLnggPSAwO1xuXHRcdHRoaXMueSA9IDA7XG5cdFx0dGhpcy53aWR0aCA9IDA7XG5cdFx0dGhpcy5oZWlnaHQgPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIG1lbWJlcnMgb2YgUmVjdGFuZ2xlIHRvIHRoZSBzcGVjaWZpZWQgdmFsdWVzXG5cdCAqXG5cdCAqIEBwYXJhbSB4YSAgICAgIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgIHJlY3RhbmdsZS5cblx0ICogQHBhcmFtIHlhICAgICAgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgcmVjdGFuZ2xlLlxuXHQgKiBAcGFyYW0gd2lkdGhhICBUaGUgd2lkdGggb2YgdGhlIHJlY3RhbmdsZSwgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gaGVpZ2h0YSBUaGUgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUsIGluIHBpeGVscy5cblx0ICovXG5cdHB1YmxpYyBzZXRUbyh4YTpudW1iZXIsIHlhOm51bWJlciwgd2lkdGhhOm51bWJlciwgaGVpZ2h0YTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggPSB4YTtcblx0XHR0aGlzLnkgPSB5YTtcblx0XHR0aGlzLndpZHRoID0gd2lkdGhhO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZHMgYW5kIHJldHVybnMgYSBzdHJpbmcgdGhhdCBsaXN0cyB0aGUgaG9yaXpvbnRhbCBhbmQgdmVydGljYWxcblx0ICogcG9zaXRpb25zIGFuZCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiBBIHN0cmluZyBsaXN0aW5nIHRoZSB2YWx1ZSBvZiBlYWNoIG9mIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBvZlxuXHQgKiAgICAgICAgIHRoZSBSZWN0YW5nbGUgb2JqZWN0OiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXG5cdCAqICAgICAgICAgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIFwiW1JlY3RhbmdsZV0gKHg9XCIgKyB0aGlzLnggKyBcIiwgeT1cIiArIHRoaXMueSArIFwiLCB3aWR0aD1cIiArIHRoaXMud2lkdGggKyBcIiwgaGVpZ2h0PVwiICsgdGhpcy5oZWlnaHQgKyBcIilcIjtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIHR3byByZWN0YW5nbGVzIHRvZ2V0aGVyIHRvIGNyZWF0ZSBhIG5ldyBSZWN0YW5nbGUgb2JqZWN0LCBieSBmaWxsaW5nXG5cdCAqIGluIHRoZSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBzcGFjZSBiZXR3ZWVuIHRoZSB0d28gcmVjdGFuZ2xlcy5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoZSA8Y29kZT51bmlvbigpPC9jb2RlPiBtZXRob2QgaWdub3JlcyByZWN0YW5nbGVzIHdpdGhcblx0ICogPGNvZGU+MDwvY29kZT4gYXMgdGhlIGhlaWdodCBvciB3aWR0aCB2YWx1ZSwgc3VjaCBhczogPGNvZGU+dmFyXG5cdCAqIHJlY3QyOlJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoMzAwLDMwMCw1MCwwKTs8L2NvZGU+PC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gdG9VbmlvbiBBIFJlY3RhbmdsZSBvYmplY3QgdG8gYWRkIHRvIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC5cblx0ICogQHJldHVybiBBIG5ldyBSZWN0YW5nbGUgb2JqZWN0IHRoYXQgaXMgdGhlIHVuaW9uIG9mIHRoZSB0d28gcmVjdGFuZ2xlcy5cblx0ICovXG5cdHB1YmxpYyB1bmlvbih0b1VuaW9uOlJlY3RhbmdsZSk6UmVjdGFuZ2xlXG5cdHtcblx0XHR2YXIgdTpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cblx0XHRpZiAodGhpcy54IDwgdG9Vbmlvbi54KSB7XG5cdFx0XHR1LnggPSB0aGlzLng7XG5cdFx0XHR1LndpZHRoID0gdG9Vbmlvbi54IC0gdGhpcy54ICsgdG9Vbmlvbi53aWR0aDtcblxuXHRcdFx0aWYgKHUud2lkdGggPCB0aGlzLndpZHRoKVxuXHRcdFx0XHR1LndpZHRoID0gdGhpcy53aWR0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dS54ID0gdG9Vbmlvbi54O1xuXHRcdFx0dS53aWR0aCA9IHRoaXMueCAtIHRvVW5pb24ueCArIHRoaXMud2lkdGg7XG5cblx0XHRcdGlmICh1LndpZHRoIDwgdG9Vbmlvbi53aWR0aClcblx0XHRcdFx0dS53aWR0aCA9IHRvVW5pb24ud2lkdGg7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMueSA8IHRvVW5pb24ueSkge1xuXHRcdFx0dS55ID0gdGhpcy55O1xuXHRcdFx0dS5oZWlnaHQgPSB0b1VuaW9uLnkgLSB0aGlzLnkgKyB0b1VuaW9uLmhlaWdodDtcblxuXHRcdFx0aWYgKHUuaGVpZ2h0IDwgdGhpcy5oZWlnaHQpXG5cdFx0XHRcdHUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHUueSA9IHRvVW5pb24ueTtcblx0XHRcdHUuaGVpZ2h0ID0gdGhpcy55IC0gdG9Vbmlvbi55ICsgdGhpcy5oZWlnaHQ7XG5cblx0XHRcdGlmICh1LmhlaWdodCA8IHRvVW5pb24uaGVpZ2h0KVxuXHRcdFx0XHR1LmhlaWdodCA9IHRvVW5pb24uaGVpZ2h0O1xuXHRcdH1cblxuXHRcdHJldHVybiB1O1xuXHR9XG59XG5cbmV4cG9ydCA9IFJlY3RhbmdsZTsiXX0=