var Point = require("awayjs-core/lib/core/geom/Point");

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
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof width === "undefined") { width = 0; }
        if (typeof height === "undefined") { height = 0; }
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
    };
    return Rectangle;
})();

module.exports = Rectangle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZ2VvbS9SZWN0YW5nbGUudHMiXSwibmFtZXMiOlsiUmVjdGFuZ2xlIiwiUmVjdGFuZ2xlLmNvbnN0cnVjdG9yIiwiUmVjdGFuZ2xlLmNsb25lIiwiUmVjdGFuZ2xlLmNvbnRhaW5zIiwiUmVjdGFuZ2xlLmNvbnRhaW5zUG9pbnQiLCJSZWN0YW5nbGUuY29udGFpbnNSZWN0IiwiUmVjdGFuZ2xlLmNvcHlGcm9tIiwiUmVjdGFuZ2xlLmVxdWFscyIsIlJlY3RhbmdsZS5pbmZsYXRlIiwiUmVjdGFuZ2xlLmluZmxhdGVQb2ludCIsIlJlY3RhbmdsZS5pbnRlcnNlY3Rpb24iLCJSZWN0YW5nbGUuaW50ZXJzZWN0cyIsIlJlY3RhbmdsZS5pc0VtcHR5IiwiUmVjdGFuZ2xlLm9mZnNldCIsIlJlY3RhbmdsZS5vZmZzZXRQb2ludCIsIlJlY3RhbmdsZS5zZXRFbXB0eSIsIlJlY3RhbmdsZS5zZXRUbyIsIlJlY3RhbmdsZS50b1N0cmluZyIsIlJlY3RhbmdsZS51bmlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQThEOztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTJDRztBQUNIO0lBb0pDQTs7Ozs7Ozs7Ozs7Ozs7TUFER0E7SUFDSEEsbUJBQVlBLENBQVlBLEVBQUVBLENBQVlBLEVBQUVBLEtBQWdCQSxFQUFFQSxNQUFpQkE7UUFBL0RDLGdDQUFBQSxDQUFDQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxnQ0FBQUEsQ0FBQ0EsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsb0NBQUFBLEtBQUtBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLHFDQUFBQSxNQUFNQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUUxRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDVkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDVkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0E7UUFDbEJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BO0lBQ3JCQSxDQUFDQTtJQTdHREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BO1FBQzVCQSxDQUFDQTs7OztBQUFBQTtJQU1EQTtRQUFBQTs7O1VBREdBO2FBQ0hBO1lBRUNBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLElBQUlBLElBQUlBO2dCQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1lBRWpDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUE7O1lBRTFDQSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQTtRQUN6QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFZREE7UUFBQUE7Ozs7Ozs7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNkQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0E7UUFDM0JBLENBQUNBOzs7O0FBQUFBO0lBTURBO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUE7Z0JBQ3JCQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTs7WUFFMUJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBO1lBQ3pCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxD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QSxVQUFhQSxPQUFpQkE7UUFFN0JrQixJQUFJQSxDQUFDQSxHQUFhQSxJQUFJQSxTQUFTQSxDQUFDQSxDQUFDQTs7UUFFakNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLENBQUVBO1lBQ3ZCQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNaQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxLQUFLQTs7WUFFNUNBLElBQUlBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBO2dCQUN2QkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7U0FDdEJBLEtBQU1BO1lBQ05BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBO1lBQ2ZBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBOztZQUV6Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsS0FBS0E7Z0JBQzFCQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQTtTQUN6QkE7O1FBRURBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLENBQUVBO1lBQ3ZCQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNaQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQTs7WUFFOUNBLElBQUlBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BO2dCQUN6QkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7U0FDeEJBLEtBQU1BO1lBQ05BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBO1lBQ2ZBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BOztZQUUzQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUE7Z0JBQzVCQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQTtTQUMzQkE7O1FBRURBLE9BQU9BLENBQUNBO0lBQ1RBLENBQUNBO0lBQ0ZsQixpQkFBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCwwQkFBbUIsQ0FBQSIsImZpbGUiOiJjb3JlL2dlb20vUmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvaW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUG9pbnRcIik7XG5cbi8qKlxuICogQSBSZWN0YW5nbGUgb2JqZWN0IGlzIGFuIGFyZWEgZGVmaW5lZCBieSBpdHMgcG9zaXRpb24sIGFzIGluZGljYXRlZCBieSBpdHNcbiAqIHRvcC1sZWZ0IGNvcm5lciBwb2ludCg8aT54PC9pPiwgPGk+eTwvaT4pIGFuZCBieSBpdHMgd2lkdGggYW5kIGl0cyBoZWlnaHQuXG4gKlxuICpcbiAqIDxwPlRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kXG4gKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgb2YgdGhlIFJlY3RhbmdsZSBjbGFzcyBhcmUgaW5kZXBlbmRlbnQgb2ZcbiAqIGVhY2ggb3RoZXI7IGNoYW5naW5nIHRoZSB2YWx1ZSBvZiBvbmUgcHJvcGVydHkgaGFzIG5vIGVmZmVjdCBvbiB0aGUgb3RoZXJzLlxuICogSG93ZXZlciwgdGhlIDxjb2RlPnJpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+Ym90dG9tPC9jb2RlPiBwcm9wZXJ0aWVzIGFyZVxuICogaW50ZWdyYWxseSByZWxhdGVkIHRvIHRob3NlIGZvdXIgcHJvcGVydGllcy4gRm9yIGV4YW1wbGUsIGlmIHlvdSBjaGFuZ2UgdGhlXG4gKiB2YWx1ZSBvZiB0aGUgPGNvZGU+cmlnaHQ8L2NvZGU+IHByb3BlcnR5LCB0aGUgdmFsdWUgb2YgdGhlXG4gKiA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHkgY2hhbmdlczsgaWYgeW91IGNoYW5nZSB0aGUgPGNvZGU+Ym90dG9tPC9jb2RlPlxuICogcHJvcGVydHksIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eSBjaGFuZ2VzLiA8L3A+XG4gKlxuICogPHA+VGhlIGZvbGxvd2luZyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHVzZSBSZWN0YW5nbGUgb2JqZWN0czo8L3A+XG4gKlxuICogPHVsPlxuICogICA8bGk+VGhlIDxjb2RlPmFwcGx5RmlsdGVyKCk8L2NvZGU+LCA8Y29kZT5jb2xvclRyYW5zZm9ybSgpPC9jb2RlPixcbiAqIDxjb2RlPmNvcHlDaGFubmVsKCk8L2NvZGU+LCA8Y29kZT5jb3B5UGl4ZWxzKCk8L2NvZGU+LCA8Y29kZT5kcmF3KCk8L2NvZGU+LFxuICogPGNvZGU+ZmlsbFJlY3QoKTwvY29kZT4sIDxjb2RlPmdlbmVyYXRlRmlsdGVyUmVjdCgpPC9jb2RlPixcbiAqIDxjb2RlPmdldENvbG9yQm91bmRzUmVjdCgpPC9jb2RlPiwgPGNvZGU+Z2V0UGl4ZWxzKCk8L2NvZGU+LFxuICogPGNvZGU+bWVyZ2UoKTwvY29kZT4sIDxjb2RlPnBhbGV0dGVNYXAoKTwvY29kZT4sXG4gKiA8Y29kZT5waXhlbERpc29sdmUoKTwvY29kZT4sIDxjb2RlPnNldFBpeGVscygpPC9jb2RlPiwgYW5kXG4gKiA8Y29kZT50aHJlc2hvbGQoKTwvY29kZT4gbWV0aG9kcywgYW5kIHRoZSA8Y29kZT5yZWN0PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGVcbiAqIEJpdG1hcERhdGEgY2xhc3M8L2xpPlxuICogICA8bGk+VGhlIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBhbmQgPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2RzLCBhbmRcbiAqIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBhbmQgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGVcbiAqIERpc3BsYXlPYmplY3QgY2xhc3M8L2xpPlxuICogICA8bGk+VGhlIDxjb2RlPmdldENoYXJCb3VuZGFyaWVzKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgVGV4dEZpZWxkXG4gKiBjbGFzczwvbGk+XG4gKiAgIDxsaT5UaGUgPGNvZGU+cGl4ZWxCb3VuZHM8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBUcmFuc2Zvcm0gY2xhc3M8L2xpPlxuICogICA8bGk+VGhlIDxjb2RlPmJvdW5kczwvY29kZT4gcGFyYW1ldGVyIGZvciB0aGUgPGNvZGU+c3RhcnREcmFnKCk8L2NvZGU+XG4gKiBtZXRob2Qgb2YgdGhlIFNwcml0ZSBjbGFzczwvbGk+XG4gKiAgIDxsaT5UaGUgPGNvZGU+cHJpbnRBcmVhPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlIDxjb2RlPmFkZFBhZ2UoKTwvY29kZT5cbiAqIG1ldGhvZCBvZiB0aGUgUHJpbnRKb2IgY2xhc3M8L2xpPlxuICogPC91bD5cbiAqXG4gKiA8cD5Zb3UgY2FuIHVzZSB0aGUgPGNvZGU+bmV3IFJlY3RhbmdsZSgpPC9jb2RlPiBjb25zdHJ1Y3RvciB0byBjcmVhdGUgYVxuICogUmVjdGFuZ2xlIG9iamVjdC48L3A+XG4gKlxuICogPHA+PGI+Tm90ZTo8L2I+IFRoZSBSZWN0YW5nbGUgY2xhc3MgZG9lcyBub3QgZGVmaW5lIGEgcmVjdGFuZ3VsYXIgU2hhcGVcbiAqIGRpc3BsYXkgb2JqZWN0LiBUbyBkcmF3IGEgcmVjdGFuZ3VsYXIgU2hhcGUgb2JqZWN0IG9uc2NyZWVuLCB1c2UgdGhlXG4gKiA8Y29kZT5kcmF3UmVjdCgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIEdyYXBoaWNzIGNsYXNzLjwvcD5cbiAqL1xuY2xhc3MgUmVjdGFuZ2xlXG57XG5cdHByaXZhdGUgX3NpemU6UG9pbnQ7XG5cdHByaXZhdGUgX2JvdHRvbVJpZ2h0OlBvaW50O1xuXHRwcml2YXRlIF90b3BMZWZ0OlBvaW50O1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUsIGluIHBpeGVscy4gQ2hhbmdpbmcgdGhlIDxjb2RlPmhlaWdodDwvY29kZT5cblx0ICogdmFsdWUgb2YgYSBSZWN0YW5nbGUgb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LFxuXHQgKiA8Y29kZT55PC9jb2RlPiwgYW5kIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGhlaWdodDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB3aWR0aCBvZiB0aGUgcmVjdGFuZ2xlLCBpbiBwaXhlbHMuIENoYW5naW5nIHRoZSA8Y29kZT53aWR0aDwvY29kZT5cblx0ICogdmFsdWUgb2YgYSBSZWN0YW5nbGUgb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LFxuXHQgKiA8Y29kZT55PC9jb2RlPiwgYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyB3aWR0aDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3RhbmdsZS4gQ2hhbmdpbmdcblx0ICogdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIFJlY3RhbmdsZSBvYmplY3QgaGFzIG5vXG5cdCAqIGVmZmVjdCBvbiB0aGUgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kIDxjb2RlPmhlaWdodDwvY29kZT5cblx0ICogcHJvcGVydGllcy5cblx0ICpcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgdGhlXG5cdCAqIDxjb2RlPmxlZnQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyB4Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ2xlLiBDaGFuZ2luZ1xuXHQgKiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IG9mIGEgUmVjdGFuZ2xlIG9iamVjdCBoYXMgbm9cblx0ICogZWZmZWN0IG9uIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPlxuXHQgKiBwcm9wZXJ0aWVzLlxuXHQgKlxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGVcblx0ICogPGNvZGU+dG9wPC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgeTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBzdW0gb2YgdGhlIDxjb2RlPnk8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdHRvbSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBsb2NhdGlvbiBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCdzIGJvdHRvbS1yaWdodCBjb3JuZXIsIGRldGVybWluZWQgYnlcblx0ICogdGhlIHZhbHVlcyBvZiB0aGUgPGNvZGU+cmlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5ib3R0b208L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdHRvbVJpZ2h0KCk6UG9pbnRcblx0e1xuXHRcdGlmICh0aGlzLl9ib3R0b21SaWdodCA9PSBudWxsKVxuXHRcdFx0dGhpcy5fYm90dG9tUmlnaHQgPSBuZXcgUG9pbnQoKTtcblxuXHRcdHRoaXMuX2JvdHRvbVJpZ2h0LnggPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuXHRcdHRoaXMuX2JvdHRvbVJpZ2h0LnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcblxuXHRcdHJldHVybiB0aGlzLl9ib3R0b21SaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUuIENoYW5naW5nXG5cdCAqIHRoZSA8Y29kZT5sZWZ0PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIFJlY3RhbmdsZSBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGVcblx0ICogPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy4gSG93ZXZlciBpdCBkb2VzIGFmZmVjdFxuXHQgKiB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnR5LCB3aGVyZWFzIGNoYW5naW5nIHRoZSA8Y29kZT54PC9jb2RlPiB2YWx1ZVxuXHQgKiBkb2VzIDxpPm5vdDwvaT4gYWZmZWN0IHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHkuXG5cdCAqXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+bGVmdDwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXG5cdCAqIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxlZnQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLng7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHN1bSBvZiB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGdldCByaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNpemUgb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QsIGV4cHJlc3NlZCBhcyBhIFBvaW50IG9iamVjdCB3aXRoIHRoZVxuXHQgKiB2YWx1ZXMgb2YgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGdldCBzaXplKCk6UG9pbnRcblx0e1xuXHRcdGlmICh0aGlzLl9zaXplID09IG51bGwpXG5cdFx0XHR0aGlzLl9zaXplID0gbmV3IFBvaW50KCk7XG5cblx0XHR0aGlzLl9zaXplLnggPSB0aGlzLndpZHRoO1xuXHRcdHRoaXMuX3NpemUueSA9IHRoaXMuaGVpZ2h0O1xuXG5cdFx0cmV0dXJuIHRoaXMuX3NpemU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ2xlLiBDaGFuZ2luZ1xuXHQgKiB0aGUgPGNvZGU+dG9wPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIFJlY3RhbmdsZSBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0aWVzLiBIb3dldmVyIGl0IGRvZXMgYWZmZWN0XG5cdCAqIHRoZSA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnR5LCB3aGVyZWFzIGNoYW5naW5nIHRoZSA8Y29kZT55PC9jb2RlPlxuXHQgKiB2YWx1ZSBkb2VzIDxpPm5vdDwvaT4gYWZmZWN0IHRoZSA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnR5LlxuXHQgKlxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPnRvcDwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZVxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRvcCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbG9jYXRpb24gb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QncyB0b3AtbGVmdCBjb3JuZXIsIGRldGVybWluZWQgYnkgdGhlXG5cdCAqIDxpPng8L2k+IGFuZCA8aT55PC9pPiBjb29yZGluYXRlcyBvZiB0aGUgcG9pbnQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRvcExlZnQoKTpQb2ludFxuXHR7XG5cdFx0aWYgKHRoaXMuX3RvcExlZnQgPT0gbnVsbClcblx0XHRcdHRoaXMuX3RvcExlZnQgPSBuZXcgUG9pbnQoKTtcblxuXHRcdHRoaXMuX3RvcExlZnQueCA9IHRoaXMueDtcblx0XHR0aGlzLl90b3BMZWZ0LnkgPSB0aGlzLnk7XG5cblx0XHRyZXR1cm4gdGhpcy5fdG9wTGVmdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFJlY3RhbmdsZSBvYmplY3Qgd2l0aCB0aGUgdG9wLWxlZnQgY29ybmVyIHNwZWNpZmllZCBieSB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMgYW5kIHdpdGggdGhlIHNwZWNpZmllZFxuXHQgKiA8Y29kZT53aWR0aDwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcGFyYW1ldGVycy4gSWYgeW91IGNhbGwgdGhpc1xuXHQgKiBwdWJsaWMgd2l0aG91dCBwYXJhbWV0ZXJzLCBhIHJlY3RhbmdsZSB3aXRoIDxjb2RlPng8L2NvZGU+LFxuXHQgKiA8Y29kZT55PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzIHNldFxuXHQgKiB0byAwIGlzIGNyZWF0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB4ICAgICAgVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICByZWN0YW5nbGUuXG5cdCAqIEBwYXJhbSB5ICAgICAgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICByZWN0YW5nbGUuXG5cdCAqIEBwYXJhbSB3aWR0aCAgVGhlIHdpZHRoIG9mIHRoZSByZWN0YW5nbGUsIGluIHBpeGVscy5cblx0ICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUsIGluIHBpeGVscy5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHg6bnVtYmVyID0gMCwgeTpudW1iZXIgPSAwLCB3aWR0aDpudW1iZXIgPSAwLCBoZWlnaHQ6bnVtYmVyID0gMClcblx0e1xuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBSZWN0YW5nbGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgdmFsdWVzIGZvciB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgYXMgdGhlIG9yaWdpbmFsIFJlY3RhbmdsZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4gQSBuZXcgUmVjdGFuZ2xlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHZhbHVlcyBmb3IgdGhlXG5cdCAqICAgICAgICAgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZFxuXHQgKiAgICAgICAgIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcyB0aGUgb3JpZ2luYWwgUmVjdGFuZ2xlIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOlJlY3RhbmdsZVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBSZWN0YW5nbGUodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBwb2ludCBpcyBjb250YWluZWQgd2l0aGluIHRoZSByZWN0YW5ndWxhclxuXHQgKiByZWdpb24gZGVmaW5lZCBieSB0aGlzIFJlY3RhbmdsZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB4IFRoZSA8aT54PC9pPiBjb29yZGluYXRlKGhvcml6b250YWwgcG9zaXRpb24pIG9mIHRoZSBwb2ludC5cblx0ICogQHBhcmFtIHkgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUodmVydGljYWwgcG9zaXRpb24pIG9mIHRoZSBwb2ludC5cblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBSZWN0YW5nbGUgb2JqZWN0IGNvbnRhaW5zIHRoZVxuXHQgKiAgICAgICAgIHNwZWNpZmllZCBwb2ludDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBjb250YWlucyh4Om51bWJlciwgeTpudW1iZXIpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54IDw9IHggJiYgdGhpcy54ICsgdGhpcy53aWR0aCA+PSB4ICYmIHRoaXMueSA8PSB5ICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHBvaW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhlIHJlY3Rhbmd1bGFyXG5cdCAqIHJlZ2lvbiBkZWZpbmVkIGJ5IHRoaXMgUmVjdGFuZ2xlIG9iamVjdC4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byB0aGVcblx0ICogPGNvZGU+UmVjdGFuZ2xlLmNvbnRhaW5zKCk8L2NvZGU+IG1ldGhvZCwgZXhjZXB0IHRoYXQgaXQgdGFrZXMgYSBQb2ludFxuXHQgKiBvYmplY3QgYXMgYSBwYXJhbWV0ZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgcG9pbnQsIGFzIHJlcHJlc2VudGVkIGJ5IGl0cyA8aT54PC9pPiBhbmQgPGk+eTwvaT5cblx0ICogICAgICAgICAgICAgIGNvb3JkaW5hdGVzLlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIFJlY3RhbmdsZSBvYmplY3QgY29udGFpbnMgdGhlXG5cdCAqICAgICAgICAgc3BlY2lmaWVkIHBvaW50OyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGNvbnRhaW5zUG9pbnQocG9pbnQ6UG9pbnQpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54IDw9IHBvaW50LnggJiYgdGhpcy54ICsgdGhpcy53aWR0aCA+PSBwb2ludC54ICYmIHRoaXMueSA8PSBwb2ludC55ICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHBvaW50LnkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgUmVjdGFuZ2xlIG9iamVjdCBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPnJlY3Q8L2NvZGU+XG5cdCAqIHBhcmFtZXRlciBpcyBjb250YWluZWQgd2l0aGluIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC4gQSBSZWN0YW5nbGUgb2JqZWN0IGlzXG5cdCAqIHNhaWQgdG8gY29udGFpbiBhbm90aGVyIGlmIHRoZSBzZWNvbmQgUmVjdGFuZ2xlIG9iamVjdCBmYWxscyBlbnRpcmVseVxuXHQgKiB3aXRoaW4gdGhlIGJvdW5kYXJpZXMgb2YgdGhlIGZpcnN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVjdCBUaGUgUmVjdGFuZ2xlIG9iamVjdCBiZWluZyBjaGVja2VkLlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIFJlY3RhbmdsZSBvYmplY3QgdGhhdCB5b3Vcblx0ICogICAgICAgICBzcGVjaWZ5IGlzIGNvbnRhaW5lZCBieSB0aGlzIFJlY3RhbmdsZSBvYmplY3Q7IG90aGVyd2lzZVxuXHQgKiAgICAgICAgIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBjb250YWluc1JlY3QocmVjdDpSZWN0YW5nbGUpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54IDw9IHJlY3QueCAmJiB0aGlzLnggKyB0aGlzLndpZHRoID49IHJlY3QueCArIHJlY3Qud2lkdGggJiYgdGhpcy55IDw9IHJlY3QueSAmJiB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSByZWN0LnkgKyByZWN0LmhlaWdodClcblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgYWxsIG9mIHJlY3RhbmdsZSBkYXRhIGZyb20gdGhlIHNvdXJjZSBSZWN0YW5nbGUgb2JqZWN0IGludG8gdGhlXG5cdCAqIGNhbGxpbmcgUmVjdGFuZ2xlIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHNvdXJjZVJlY3QgVGhlIFJlY3RhbmdsZSBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGNvcHlGcm9tKHNvdXJjZVJlY3Q6UmVjdGFuZ2xlKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG9iamVjdCBzcGVjaWZpZWQgaW4gdGhlIDxjb2RlPnRvQ29tcGFyZTwvY29kZT5cblx0ICogcGFyYW1ldGVyIGlzIGVxdWFsIHRvIHRoaXMgUmVjdGFuZ2xlIG9iamVjdC4gVGhpcyBtZXRob2QgY29tcGFyZXMgdGhlXG5cdCAqIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCBhbmRcblx0ICogPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBhZ2FpbnN0IHRoZSBzYW1lIHByb3BlcnRpZXMgb2Zcblx0ICogdGhpcyBSZWN0YW5nbGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gdG9Db21wYXJlIFRoZSByZWN0YW5nbGUgdG8gY29tcGFyZSB0byB0aGlzIFJlY3RhbmdsZSBvYmplY3QuXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgb2JqZWN0IGhhcyBleGFjdGx5IHRoZSBzYW1lXG5cdCAqICAgICAgICAgdmFsdWVzIGZvciB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXG5cdCAqICAgICAgICAgYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcyB0aGlzIFJlY3RhbmdsZSBvYmplY3Q7XG5cdCAqICAgICAgICAgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBlcXVhbHModG9Db21wYXJlOlJlY3RhbmdsZSk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPT0gdG9Db21wYXJlLnggJiYgdGhpcy55ID09IHRvQ29tcGFyZS55ICYmIHRoaXMud2lkdGggPT0gdG9Db21wYXJlLndpZHRoICYmIHRoaXMuaGVpZ2h0ID09IHRvQ29tcGFyZS5oZWlnaHQpXG5cdH1cblxuXHQvKipcblx0ICogSW5jcmVhc2VzIHRoZSBzaXplIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0IGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50cywgaW5cblx0ICogcGl4ZWxzLiBUaGUgY2VudGVyIHBvaW50IG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0IHN0YXlzIHRoZSBzYW1lLCBhbmQgaXRzXG5cdCAqIHNpemUgaW5jcmVhc2VzIHRvIHRoZSBsZWZ0IGFuZCByaWdodCBieSB0aGUgPGNvZGU+ZHg8L2NvZGU+IHZhbHVlLCBhbmQgdG9cblx0ICogdGhlIHRvcCBhbmQgdGhlIGJvdHRvbSBieSB0aGUgPGNvZGU+ZHk8L2NvZGU+IHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0gZHggVGhlIHZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBsZWZ0IGFuZCB0aGUgcmlnaHQgb2YgdGhlIFJlY3RhbmdsZVxuXHQgKiAgICAgICAgICAgb2JqZWN0LiBUaGUgZm9sbG93aW5nIGVxdWF0aW9uIGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBuZXdcblx0ICogICAgICAgICAgIHdpZHRoIGFuZCBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlOlxuXHQgKiBAcGFyYW0gZHkgVGhlIHZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSB0b3AgYW5kIHRoZSBib3R0b20gb2YgdGhlXG5cdCAqICAgICAgICAgICBSZWN0YW5nbGUuIFRoZSBmb2xsb3dpbmcgZXF1YXRpb24gaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5ld1xuXHQgKiAgICAgICAgICAgaGVpZ2h0IGFuZCBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlOlxuXHQgKi9cblx0cHVibGljIGluZmxhdGUoZHg6bnVtYmVyLCBkeTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggLT0gZHgvMjtcblx0XHR0aGlzLnkgLT0gZHkvMjtcblx0XHR0aGlzLndpZHRoICs9IGR4LzI7XG5cdFx0dGhpcy5oZWlnaHQgKz0gZHkvMjtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmNyZWFzZXMgdGhlIHNpemUgb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlXG5cdCAqIDxjb2RlPlJlY3RhbmdsZS5pbmZsYXRlKCk8L2NvZGU+IG1ldGhvZCBleGNlcHQgaXQgdGFrZXMgYSBQb2ludCBvYmplY3QgYXNcblx0ICogYSBwYXJhbWV0ZXIuXG5cdCAqXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgdHdvIGNvZGUgZXhhbXBsZXMgZ2l2ZSB0aGUgc2FtZSByZXN1bHQ6PC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5IG9mIHRoaXMgUG9pbnQgb2JqZWN0IGlzIHVzZWQgdG9cblx0ICogICAgICAgICAgICAgIGluY3JlYXNlIHRoZSBob3Jpem9udGFsIGRpbWVuc2lvbiBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdC5cblx0ICogICAgICAgICAgICAgIFRoZSA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSBpcyB1c2VkIHRvIGluY3JlYXNlIHRoZSB2ZXJ0aWNhbFxuXHQgKiAgICAgICAgICAgICAgZGltZW5zaW9uIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGluZmxhdGVQb2ludChwb2ludDpQb2ludClcblx0e1xuXHRcdHRoaXMueCAtPSBwb2ludC54LzI7XG5cdFx0dGhpcy55IC09IHBvaW50LnkvMjtcblx0XHR0aGlzLndpZHRoICs9IHBvaW50LngvMjtcblx0XHR0aGlzLmhlaWdodCArPSBwb2ludC55LzI7XG5cdH1cblxuXHQvKipcblx0ICogSWYgdGhlIFJlY3RhbmdsZSBvYmplY3Qgc3BlY2lmaWVkIGluIHRoZSA8Y29kZT50b0ludGVyc2VjdDwvY29kZT5cblx0ICogcGFyYW1ldGVyIGludGVyc2VjdHMgd2l0aCB0aGlzIFJlY3RhbmdsZSBvYmplY3QsIHJldHVybnMgdGhlIGFyZWEgb2Zcblx0ICogaW50ZXJzZWN0aW9uIGFzIGEgUmVjdGFuZ2xlIG9iamVjdC4gSWYgdGhlIHJlY3RhbmdsZXMgZG8gbm90IGludGVyc2VjdCxcblx0ICogdGhpcyBtZXRob2QgcmV0dXJucyBhbiBlbXB0eSBSZWN0YW5nbGUgb2JqZWN0IHdpdGggaXRzIHByb3BlcnRpZXMgc2V0IHRvXG5cdCAqIDAuXG5cdCAqXG5cdCAqIEBwYXJhbSB0b0ludGVyc2VjdCBUaGUgUmVjdGFuZ2xlIG9iamVjdCB0byBjb21wYXJlIGFnYWluc3QgdG8gc2VlIGlmIGl0XG5cdCAqICAgICAgICAgICAgICAgICAgICBpbnRlcnNlY3RzIHdpdGggdGhpcyBSZWN0YW5nbGUgb2JqZWN0LlxuXHQgKiBAcmV0dXJuIEEgUmVjdGFuZ2xlIG9iamVjdCB0aGF0IGVxdWFscyB0aGUgYXJlYSBvZiBpbnRlcnNlY3Rpb24uIElmIHRoZVxuXHQgKiAgICAgICAgIHJlY3RhbmdsZXMgZG8gbm90IGludGVyc2VjdCwgdGhpcyBtZXRob2QgcmV0dXJucyBhbiBlbXB0eVxuXHQgKiAgICAgICAgIFJlY3RhbmdsZSBvYmplY3Q7IHRoYXQgaXMsIGEgcmVjdGFuZ2xlIHdpdGggaXRzIDxjb2RlPng8L2NvZGU+LFxuXHQgKiAgICAgICAgIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+XG5cdCAqICAgICAgICAgcHJvcGVydGllcyBzZXQgdG8gMC5cblx0ICovXG5cdHB1YmxpYyBpbnRlcnNlY3Rpb24odG9JbnRlcnNlY3Q6UmVjdGFuZ2xlKTpSZWN0YW5nbGVcblx0e1xuXHRcdGlmICh0aGlzLmludGVyc2VjdHModG9JbnRlcnNlY3QpKSB7XG5cdFx0XHR2YXIgaTpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cblx0XHRcdGlmICh0aGlzLnggPiB0b0ludGVyc2VjdC54KSB7XG5cdFx0XHRcdGkueCA9IHRoaXMueDtcblx0XHRcdFx0aS53aWR0aCA9IHRvSW50ZXJzZWN0LnggLSB0aGlzLnggKyB0b0ludGVyc2VjdC53aWR0aDtcblxuXHRcdFx0XHRpZiAoaS53aWR0aCA+IHRoaXMud2lkdGgpXG5cdFx0XHRcdFx0aS53aWR0aCA9IHRoaXMud2lkdGg7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpLnggPSB0b0ludGVyc2VjdC54O1xuXHRcdFx0XHRpLndpZHRoID0gdGhpcy54IC0gdG9JbnRlcnNlY3QueCArIHRoaXMud2lkdGg7XG5cblx0XHRcdFx0aWYgKGkud2lkdGggPiB0b0ludGVyc2VjdC53aWR0aClcblx0XHRcdFx0XHRpLndpZHRoID0gdG9JbnRlcnNlY3Qud2lkdGg7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnkgPiB0b0ludGVyc2VjdC55KSB7XG5cdFx0XHRcdGkueSA9IHRoaXMueTtcblx0XHRcdFx0aS5oZWlnaHQgPSB0b0ludGVyc2VjdC55IC0gdGhpcy55ICsgdG9JbnRlcnNlY3QuaGVpZ2h0O1xuXG5cdFx0XHRcdGlmIChpLmhlaWdodCA+IHRoaXMuaGVpZ2h0KVxuXHRcdFx0XHRcdGkuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpLnkgPSB0b0ludGVyc2VjdC55O1xuXHRcdFx0XHRpLmhlaWdodCA9IHRoaXMueSAtIHRvSW50ZXJzZWN0LnkgKyB0aGlzLmhlaWdodDtcblxuXHRcdFx0XHRpZiAoaS5oZWlnaHQgPiB0b0ludGVyc2VjdC5oZWlnaHQpXG5cdFx0XHRcdFx0aS5oZWlnaHQgPSB0b0ludGVyc2VjdC5oZWlnaHQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgUmVjdGFuZ2xlKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBvYmplY3Qgc3BlY2lmaWVkIGluIHRoZSA8Y29kZT50b0ludGVyc2VjdDwvY29kZT5cblx0ICogcGFyYW1ldGVyIGludGVyc2VjdHMgd2l0aCB0aGlzIFJlY3RhbmdsZSBvYmplY3QuIFRoaXMgbWV0aG9kIGNoZWNrcyB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIGFuZFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgb2YgdGhlIHNwZWNpZmllZCBSZWN0YW5nbGUgb2JqZWN0IHRvIHNlZSBpZlxuXHQgKiBpdCBpbnRlcnNlY3RzIHdpdGggdGhpcyBSZWN0YW5nbGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gdG9JbnRlcnNlY3QgVGhlIFJlY3RhbmdsZSBvYmplY3QgdG8gY29tcGFyZSBhZ2FpbnN0IHRoaXMgUmVjdGFuZ2xlXG5cdCAqICAgICAgICAgICAgICAgICAgICBvYmplY3QuXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBpbnRlcnNlY3RzXG5cdCAqICAgICAgICAgd2l0aCB0aGlzIFJlY3RhbmdsZSBvYmplY3Q7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgaW50ZXJzZWN0cyh0b0ludGVyc2VjdDpSZWN0YW5nbGUpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54ICsgdGhpcy53aWR0aCA+IHRvSW50ZXJzZWN0LnggJiYgdGhpcy54IDwgdG9JbnRlcnNlY3QueCArIHRvSW50ZXJzZWN0LndpZHRoICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gdG9JbnRlcnNlY3QueSAmJiB0aGlzLnkgPCB0b0ludGVyc2VjdC55ICsgdG9JbnRlcnNlY3QuaGVpZ2h0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoaXMgUmVjdGFuZ2xlIG9iamVjdCBpcyBlbXB0eS5cblx0ICpcblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBSZWN0YW5nbGUgb2JqZWN0J3Mgd2lkdGggb3Jcblx0ICogICAgICAgICBoZWlnaHQgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDA7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgaXNFbXB0eSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54ID09IDAgJiYgdGhpcy55ID09IDAgJiYgdGhpcy53aWR0aCA9PSAwICYmIHRoaXMuaGVpZ2h0ID09IDApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0LCBhcyBkZXRlcm1pbmVkIGJ5IGl0c1xuXHQgKiB0b3AtbGVmdCBjb3JuZXIsIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50cy5cblx0ICpcblx0ICogQHBhcmFtIGR4IE1vdmVzIHRoZSA8aT54PC9pPiB2YWx1ZSBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCBieSB0aGlzIGFtb3VudC5cblx0ICogQHBhcmFtIGR5IE1vdmVzIHRoZSA8aT55PC9pPiB2YWx1ZSBvZiB0aGUgUmVjdGFuZ2xlIG9iamVjdCBieSB0aGlzIGFtb3VudC5cblx0ICovXG5cdHB1YmxpYyBvZmZzZXQoZHg6bnVtYmVyLCBkeTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggKz0gZHg7XG5cdFx0dGhpcy55ICs9IGR5O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0IHVzaW5nIGEgUG9pbnQgb2JqZWN0IGFzIGFcblx0ICogcGFyYW1ldGVyLiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZSA8Y29kZT5SZWN0YW5nbGUub2Zmc2V0KCk8L2NvZGU+XG5cdCAqIG1ldGhvZCwgZXhjZXB0IHRoYXQgaXQgdGFrZXMgYSBQb2ludCBvYmplY3QgYXMgYSBwYXJhbWV0ZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBBIFBvaW50IG9iamVjdCB0byB1c2UgdG8gb2Zmc2V0IHRoaXMgUmVjdGFuZ2xlIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBvZmZzZXRQb2ludChwb2ludDpQb2ludClcblx0e1xuXHRcdHRoaXMueCArPSBwb2ludC54O1xuXHRcdHRoaXMueSArPSBwb2ludC55O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgYWxsIG9mIHRoZSBSZWN0YW5nbGUgb2JqZWN0J3MgcHJvcGVydGllcyB0byAwLiBBIFJlY3RhbmdsZSBvYmplY3QgaXNcblx0ICogZW1wdHkgaWYgaXRzIHdpZHRoIG9yIGhlaWdodCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMC5cblx0ICpcblx0ICogPHA+IFRoaXMgbWV0aG9kIHNldHMgdGhlIHZhbHVlcyBvZiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxuXHQgKiA8Y29kZT53aWR0aDwvY29kZT4sIGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgdG8gMC48L3A+XG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc2V0RW1wdHkoKVxuXHR7XG5cdFx0dGhpcy54ID0gMDtcblx0XHR0aGlzLnkgPSAwO1xuXHRcdHRoaXMud2lkdGggPSAwO1xuXHRcdHRoaXMuaGVpZ2h0ID0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBtZW1iZXJzIG9mIFJlY3RhbmdsZSB0byB0aGUgc3BlY2lmaWVkIHZhbHVlc1xuXHQgKlxuXHQgKiBAcGFyYW0geGEgICAgICBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICByZWN0YW5nbGUuXG5cdCAqIEBwYXJhbSB5YSAgICAgIFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgIHJlY3RhbmdsZS5cblx0ICogQHBhcmFtIHdpZHRoYSAgVGhlIHdpZHRoIG9mIHRoZSByZWN0YW5nbGUsIGluIHBpeGVscy5cblx0ICogQHBhcmFtIGhlaWdodGEgVGhlIGhlaWdodCBvZiB0aGUgcmVjdGFuZ2xlLCBpbiBwaXhlbHMuXG5cdCAqL1xuXHRwdWJsaWMgc2V0VG8oeGE6bnVtYmVyLCB5YTpudW1iZXIsIHdpZHRoYTpudW1iZXIsIGhlaWdodGE6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy54ID0geGE7XG5cdFx0dGhpcy55ID0geWE7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoYTtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodGE7XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGRzIGFuZCByZXR1cm5zIGEgc3RyaW5nIHRoYXQgbGlzdHMgdGhlIGhvcml6b250YWwgYW5kIHZlcnRpY2FsXG5cdCAqIHBvc2l0aW9ucyBhbmQgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIFJlY3RhbmdsZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4gQSBzdHJpbmcgbGlzdGluZyB0aGUgdmFsdWUgb2YgZWFjaCBvZiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXMgb2Zcblx0ICogICAgICAgICB0aGUgUmVjdGFuZ2xlIG9iamVjdDogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxuXHQgKiAgICAgICAgIDxjb2RlPndpZHRoPC9jb2RlPiwgYW5kIDxjb2RlPmhlaWdodDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBcIltSZWN0YW5nbGVdICh4PVwiICsgdGhpcy54ICsgXCIsIHk9XCIgKyB0aGlzLnkgKyBcIiwgd2lkdGg9XCIgKyB0aGlzLndpZHRoICsgXCIsIGhlaWdodD1cIiArIHRoaXMuaGVpZ2h0ICsgXCIpXCI7XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyB0d28gcmVjdGFuZ2xlcyB0b2dldGhlciB0byBjcmVhdGUgYSBuZXcgUmVjdGFuZ2xlIG9iamVjdCwgYnkgZmlsbGluZ1xuXHQgKiBpbiB0aGUgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgc3BhY2UgYmV0d2VlbiB0aGUgdHdvIHJlY3RhbmdsZXMuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGUgPGNvZGU+dW5pb24oKTwvY29kZT4gbWV0aG9kIGlnbm9yZXMgcmVjdGFuZ2xlcyB3aXRoXG5cdCAqIDxjb2RlPjA8L2NvZGU+IGFzIHRoZSBoZWlnaHQgb3Igd2lkdGggdmFsdWUsIHN1Y2ggYXM6IDxjb2RlPnZhclxuXHQgKiByZWN0MjpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKDMwMCwzMDAsNTAsMCk7PC9jb2RlPjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHRvVW5pb24gQSBSZWN0YW5nbGUgb2JqZWN0IHRvIGFkZCB0byB0aGlzIFJlY3RhbmdsZSBvYmplY3QuXG5cdCAqIEByZXR1cm4gQSBuZXcgUmVjdGFuZ2xlIG9iamVjdCB0aGF0IGlzIHRoZSB1bmlvbiBvZiB0aGUgdHdvIHJlY3RhbmdsZXMuXG5cdCAqL1xuXHRwdWJsaWMgdW5pb24odG9VbmlvbjpSZWN0YW5nbGUpOlJlY3RhbmdsZVxuXHR7XG5cdFx0dmFyIHU6UmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuXG5cdFx0aWYgKHRoaXMueCA8IHRvVW5pb24ueCkge1xuXHRcdFx0dS54ID0gdGhpcy54O1xuXHRcdFx0dS53aWR0aCA9IHRvVW5pb24ueCAtIHRoaXMueCArIHRvVW5pb24ud2lkdGg7XG5cblx0XHRcdGlmICh1LndpZHRoIDwgdGhpcy53aWR0aClcblx0XHRcdFx0dS53aWR0aCA9IHRoaXMud2lkdGg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHUueCA9IHRvVW5pb24ueDtcblx0XHRcdHUud2lkdGggPSB0aGlzLnggLSB0b1VuaW9uLnggKyB0aGlzLndpZHRoO1xuXG5cdFx0XHRpZiAodS53aWR0aCA8IHRvVW5pb24ud2lkdGgpXG5cdFx0XHRcdHUud2lkdGggPSB0b1VuaW9uLndpZHRoO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnkgPCB0b1VuaW9uLnkpIHtcblx0XHRcdHUueSA9IHRoaXMueTtcblx0XHRcdHUuaGVpZ2h0ID0gdG9Vbmlvbi55IC0gdGhpcy55ICsgdG9Vbmlvbi5oZWlnaHQ7XG5cblx0XHRcdGlmICh1LmhlaWdodCA8IHRoaXMuaGVpZ2h0KVxuXHRcdFx0XHR1LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR1LnkgPSB0b1VuaW9uLnk7XG5cdFx0XHR1LmhlaWdodCA9IHRoaXMueSAtIHRvVW5pb24ueSArIHRoaXMuaGVpZ2h0O1xuXG5cdFx0XHRpZiAodS5oZWlnaHQgPCB0b1VuaW9uLmhlaWdodClcblx0XHRcdFx0dS5oZWlnaHQgPSB0b1VuaW9uLmhlaWdodDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdTtcblx0fVxufVxuXG5leHBvcnQgPSBSZWN0YW5nbGU7Il19