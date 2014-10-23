var Vector3D = require("awayjs-core/lib/geom/Vector3D");
/**
 * A Box object is an area defined by its position, as indicated by its
 * top-left-front corner point(<i>x</i>, <i>y</i>, <i>z</i>) and by its width,
 * height and depth.
 *
 *
 * <p>The <code>x</code>, <code>y</code>, <code>z</code>, <code>width</code>,
 * <code>height</code> <code>depth</code> properties of the Box class are
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
 * <p><b>Note:</b> The Box class does not define a cubic Shape
 * display object.
 */
var Box = (function () {
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
    function Box(x, y, z, width, height, depth) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (depth === void 0) { depth = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
    Object.defineProperty(Box.prototype, "back", {
        /**
         * The sum of the <code>z</code> and <code>height</code> properties.
         */
        get: function () {
            return this.z + this.depth;
        },
        set: function (val) {
            this.depth = val - this.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "bottom", {
        /**
         * The sum of the <code>y</code> and <code>height</code> properties.
         */
        get: function () {
            return this.y + this.height;
        },
        set: function (val) {
            this.height = val - this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "bottomRightBack", {
        /**
         * The location of the Box object's bottom-right corner, determined by the
         * values of the <code>right</code> and <code>bottom</code> properties.
         */
        get: function () {
            if (this._bottomRightBack == null)
                this._bottomRightBack = new Vector3D();
            this._bottomRightBack.x = this.x + this.width;
            this._bottomRightBack.y = this.y + this.height;
            this._bottomRightBack.z = this.z + this.depth;
            return this._bottomRightBack;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "front", {
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
        get: function () {
            return this.z;
        },
        set: function (val) {
            this.depth += this.z - val;
            this.z = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "left", {
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
        get: function () {
            return this.x;
        },
        set: function (val) {
            this.width += this.x - val;
            this.x = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "right", {
        /**
         * The sum of the <code>x</code> and <code>width</code> properties.
         */
        get: function () {
            return this.x + this.width;
        },
        set: function (val) {
            this.width = val - this.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "size", {
        /**
         * The size of the Box object, expressed as a Vector3D object with the
         * values of the <code>width</code>, <code>height</code> and
         * <code>depth</code> properties.
         */
        get: function () {
            if (this._size == null)
                this._size = new Vector3D();
            this._size.x = this.width;
            this._size.y = this.height;
            this._size.z = this.depth;
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "top", {
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
        get: function () {
            return this.y;
        },
        set: function (val) {
            this.height += (this.y - val);
            this.y = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "topLeftFront", {
        /**
         * The location of the Box object's top-left-front corner, determined by the
         * <i>x</i>, <i>y</i> and <i>z</i> coordinates of the point.
         */
        get: function () {
            if (this._topLeftFront == null)
                this._topLeftFront = new Vector3D();
            this._topLeftFront.x = this.x;
            this._topLeftFront.y = this.y;
            this._topLeftFront.z = this.z;
            return this._topLeftFront;
        },
        enumerable: true,
        configurable: true
    });
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
    Box.prototype.clone = function () {
        return new Box(this.x, this.y, this.z, this.width, this.height, this.depth);
    };
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
    Box.prototype.contains = function (x, y, z) {
        return (this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y && this.z <= z && this.z + this.depth >= z);
    };
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
    Box.prototype.containsPoint = function (position) {
        return (this.x <= position.x && this.x + this.width >= position.x && this.y <= position.y && this.y + this.height >= position.y && this.z <= position.z && this.z + this.depth >= position.z);
    };
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
    Box.prototype.containsRect = function (box) {
        return (this.x <= box.x && this.x + this.width >= box.x + box.width && this.y <= box.y && this.y + this.height >= box.y + box.height && this.z <= box.z && this.z + this.depth >= box.z + box.depth);
    };
    /**
     * Copies all of box data from the source Box object into the calling
     * Box object.
     *
     * @param sourceBox The Box object from which to copy the data.
     */
    Box.prototype.copyFrom = function (sourceBox) {
        //TODO
    };
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
    Box.prototype.equals = function (toCompare) {
        return (this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && this.width == toCompare.width && this.height == toCompare.height && this.depth == toCompare.depth);
    };
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
    Box.prototype.inflate = function (dx, dy, dz) {
        this.x -= dx / 2;
        this.y -= dy / 2;
        this.z -= dz / 2;
        this.width += dx / 2;
        this.height += dy / 2;
        this.depth += dz / 2;
    };
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
    Box.prototype.inflatePoint = function (delta) {
        this.x -= delta.x / 2;
        this.y -= delta.y / 2;
        this.z -= delta.z / 2;
        this.width += delta.x / 2;
        this.height += delta.y / 2;
        this.depth += delta.z / 2;
    };
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
    Box.prototype.intersection = function (toIntersect) {
        if (this.intersects(toIntersect)) {
            var i = new Box();
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
            if (this.z > toIntersect.z) {
                i.z = this.z;
                i.depth = toIntersect.z - this.z + toIntersect.depth;
                if (i.depth > this.depth)
                    i.depth = this.depth;
            }
            else {
                i.z = toIntersect.z;
                i.depth = this.z - toIntersect.z + this.depth;
                if (i.depth > toIntersect.depth)
                    i.depth = toIntersect.depth;
            }
            return i;
        }
        return new Box();
    };
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
    Box.prototype.intersects = function (toIntersect) {
        return (this.x + this.width > toIntersect.x && this.x < toIntersect.x + toIntersect.width && this.y + this.height > toIntersect.y && this.y < toIntersect.y + toIntersect.height && this.z + this.depth > toIntersect.z && this.z < toIntersect.z + toIntersect.depth);
    };
    /**
     * Determines whether or not this Box object is empty.
     *
     * @return A value of <code>true</code> if the Box object's width, height or
     *         depth is less than or equal to 0; otherwise <code>false</code>.
     */
    Box.prototype.isEmpty = function () {
        return (this.x == 0 && this.y == 0 && this.z == 0 && this.width == 0 && this.height == 0 && this.depth == 0);
    };
    /**
     * Adjusts the location of the Box object, as determined by its
     * top-left-front corner, by the specified amounts.
     *
     * @param dx Moves the <i>x</i> value of the Box object by this amount.
     * @param dy Moves the <i>y</i> value of the Box object by this amount.
     * @param dz Moves the <i>z</i> value of the Box object by this amount.
     */
    Box.prototype.offset = function (dx, dy, dz) {
        this.x += dx;
        this.y += dy;
        this.z += dz;
    };
    /**
     * Adjusts the location of the Box object using a Vector3D object as a
     * parameter. This method is similar to the <code>Box.offset()</code>
     * method, except that it takes a Vector3D object as a parameter.
     *
     * @param position A Vector3D object to use to offset this Box object.
     */
    Box.prototype.offsetPosition = function (position) {
        this.x += position.x;
        this.y += position.y;
        this.z += position.z;
    };
    /**
     * Sets all of the Box object's properties to 0. A Box object is empty if its
     * width, height or depth is less than or equal to 0.
     *
     * <p> This method sets the values of the <code>x</code>, <code>y</code>,
     * <code>z</code>, <code>width</code>, <code>height</code>, and
     * <code>depth</code> properties to 0.</p>
     *
     */
    Box.prototype.setEmpty = function () {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.width = 0;
        this.height = 0;
        this.depth = 0;
    };
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
    Box.prototype.setTo = function (xa, ya, za, widtha, heighta, deptha) {
        this.x = xa;
        this.y = ya;
        this.z = za;
        this.width = widtha;
        this.height = heighta;
        this.depth = deptha;
    };
    /**
     * Builds and returns a string that lists the horizontal, vertical and
     * longitudinal positions and the width, height and depth of the Box object.
     *
     * @return A string listing the value of each of the following properties of
     *         the Box object: <code>x</code>, <code>y</code>, <code>z</code>,
     *         <code>width</code>, <code>height</code>, and <code>depth</code>.
     */
    Box.prototype.toString = function () {
        return "[Box] (x=" + this.x + ", y=" + this.y + ", z=" + this.z + ", width=" + this.width + ", height=" + this.height + ", depth=" + this.depth + ")";
    };
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
    Box.prototype.union = function (toUnion) {
        var u = new Box();
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
        if (this.z < toUnion.z) {
            u.z = this.z;
            u.depth = toUnion.z - this.z + toUnion.depth;
            if (u.depth < this.depth)
                u.depth = this.depth;
        }
        else {
            u.z = toUnion.z;
            u.depth = this.z - toUnion.z + this.depth;
            if (u.depth < toUnion.depth)
                u.depth = toUnion.depth;
        }
        return u;
    };
    return Box;
})();
module.exports = Box;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL2JveC50cyJdLCJuYW1lcyI6WyJCb3giLCJCb3guY29uc3RydWN0b3IiLCJCb3guYmFjayIsIkJveC5ib3R0b20iLCJCb3guYm90dG9tUmlnaHRCYWNrIiwiQm94LmZyb250IiwiQm94LmxlZnQiLCJCb3gucmlnaHQiLCJCb3guc2l6ZSIsIkJveC50b3AiLCJCb3gudG9wTGVmdEZyb250IiwiQm94LmNsb25lIiwiQm94LmNvbnRhaW5zIiwiQm94LmNvbnRhaW5zUG9pbnQiLCJCb3guY29udGFpbnNSZWN0IiwiQm94LmNvcHlGcm9tIiwiQm94LmVxdWFscyIsIkJveC5pbmZsYXRlIiwiQm94LmluZmxhdGVQb2ludCIsIkJveC5pbnRlcnNlY3Rpb24iLCJCb3guaW50ZXJzZWN0cyIsIkJveC5pc0VtcHR5IiwiQm94Lm9mZnNldCIsIkJveC5vZmZzZXRQb3NpdGlvbiIsIkJveC5zZXRFbXB0eSIsIkJveC5zZXRUbyIsIkJveC50b1N0cmluZyIsIkJveC51bmlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUUvRCxBQTRCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxHQUFHO0lBb05SQTs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkdBO0lBQ0hBLFNBdE9LQSxHQUFHQSxDQXNPSUEsQ0FBWUEsRUFBRUEsQ0FBWUEsRUFBRUEsQ0FBWUEsRUFBRUEsS0FBZ0JBLEVBQUVBLE1BQWlCQSxFQUFFQSxLQUFnQkE7UUFBL0ZDLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFBRUEsaUJBQVlBLEdBQVpBLEtBQVlBO1FBQUVBLHFCQUFnQkEsR0FBaEJBLFNBQWdCQTtRQUFFQSxzQkFBaUJBLEdBQWpCQSxVQUFpQkE7UUFBRUEscUJBQWdCQSxHQUFoQkEsU0FBZ0JBO1FBRTFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxD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QUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDYkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBRXJEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtvQkFDeEJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3ZCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFFOUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBO29CQUMvQkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDOUJBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2JBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBO2dCQUV2REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQzFCQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBRWhEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDakNBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBO1lBQ2hDQSxDQUFDQTtZQUdEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDNUJBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNiQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFFckRBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO29CQUN4QkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDdkJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO2dCQUU5Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7b0JBQy9CQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxXQUFXQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUM5QkEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDVkEsQ0FBQ0E7UUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFDbEJBLENBQUNBO0lBRURuQjs7Ozs7Ozs7OztPQVVHQTtJQUNJQSx3QkFBVUEsR0FBakJBLFVBQWtCQSxXQUFlQTtRQUVoQ29CLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0lBQ3hRQSxDQUFDQTtJQUVEcEI7Ozs7O09BS0dBO0lBQ0lBLHFCQUFPQSxHQUFkQTtRQUVDcUIsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDOUdBLENBQUNBO0lBRURyQjs7Ozs7OztPQU9HQTtJQUNJQSxvQkFBTUEsR0FBYkEsVUFBY0EsRUFBU0EsRUFBRUEsRUFBU0EsRUFBRUEsRUFBU0E7UUFFNUNzQixJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUNiQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUNiQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUVEdEI7Ozs7OztPQU1HQTtJQUNJQSw0QkFBY0EsR0FBckJBLFVBQXNCQSxRQUFpQkE7UUFFdEN1QixJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckJBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO0lBQ3RCQSxDQUFDQTtJQUVEdkI7Ozs7Ozs7O09BUUdBO0lBQ0lBLHNCQUFRQSxHQUFmQTtRQUVDd0IsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDWEEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDWEEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDWEEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDZkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDaEJBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO0lBQ2hCQSxDQUFDQTtJQUVEeEI7Ozs7Ozs7Ozs7OztPQVlHQTtJQUNJQSxtQkFBS0EsR0FBWkEsVUFBYUEsRUFBU0EsRUFBRUEsRUFBU0EsRUFBRUEsRUFBU0EsRUFBRUEsTUFBYUEsRUFBRUEsT0FBY0EsRUFBRUEsTUFBYUE7UUFFekZ5QixJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNaQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsT0FBT0EsQ0FBQ0E7UUFDdEJBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBO0lBQ3JCQSxDQUFDQTtJQUVEekI7Ozs7Ozs7T0FPR0E7SUFDSUEsc0JBQVFBLEdBQWZBO1FBRUMwQixNQUFNQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxHQUFHQSxDQUFDQTtJQUN2SkEsQ0FBQ0E7SUFFRDFCOzs7Ozs7Ozs7O09BVUdBO0lBQ0lBLG1CQUFLQSxHQUFaQSxVQUFhQSxPQUFXQTtRQUV2QjJCLElBQUlBLENBQUNBLEdBQU9BLElBQUlBLEdBQUdBLEVBQUVBLENBQUNBO1FBRXRCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDYkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFFN0NBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO2dCQUN4QkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDdkJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ2hCQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUUxQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQzNCQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7UUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBO1lBRS9DQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDMUJBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3pCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoQkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFFNUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBO2dCQUM3QkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hCQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNiQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUU3Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQ3hCQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDUEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaEJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBRTFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDM0JBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO1FBQzFCQSxDQUFDQTtRQUVEQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNWQSxDQUFDQTtJQUNGM0IsVUFBQ0E7QUFBREEsQ0EzbUJBLEFBMm1CQ0EsSUFBQTtBQUVELEFBQWEsaUJBQUosR0FBRyxDQUFDIiwiZmlsZSI6Imdlb20vQm94LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcblxuLyoqXG4gKiBBIEJveCBvYmplY3QgaXMgYW4gYXJlYSBkZWZpbmVkIGJ5IGl0cyBwb3NpdGlvbiwgYXMgaW5kaWNhdGVkIGJ5IGl0c1xuICogdG9wLWxlZnQtZnJvbnQgY29ybmVyIHBvaW50KDxpPng8L2k+LCA8aT55PC9pPiwgPGk+ejwvaT4pIGFuZCBieSBpdHMgd2lkdGgsXG4gKiBoZWlnaHQgYW5kIGRlcHRoLlxuICpcbiAqXG4gKiA8cD5UaGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxuICogPGNvZGU+aGVpZ2h0PC9jb2RlPiA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgQm94IGNsYXNzIGFyZVxuICogaW5kZXBlbmRlbnQgb2YgZWFjaCBvdGhlcjsgY2hhbmdpbmcgdGhlIHZhbHVlIG9mIG9uZSBwcm9wZXJ0eSBoYXMgbm8gZWZmZWN0XG4gKiBvbiB0aGUgb3RoZXJzLiBIb3dldmVyLCB0aGUgPGNvZGU+cmlnaHQ8L2NvZGU+LCA8Y29kZT5ib3R0b208L2NvZGU+IGFuZFxuICogPGNvZGU+YmFjazwvY29kZT4gcHJvcGVydGllcyBhcmUgaW50ZWdyYWxseSByZWxhdGVkIHRvIHRob3NlIHNpeFxuICogcHJvcGVydGllcy4gRm9yIGV4YW1wbGUsIGlmIHlvdSBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5yaWdodDwvY29kZT5cbiAqIHByb3BlcnR5LCB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSBjaGFuZ2VzOyBpZiB5b3VcbiAqIGNoYW5nZSB0aGUgPGNvZGU+Ym90dG9tPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIHZhbHVlIG9mIHRoZVxuICogPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eSBjaGFuZ2VzLiA8L3A+XG4gKlxuICogPHA+VGhlIGZvbGxvd2luZyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHVzZSBCb3ggb2JqZWN0czo8L3A+XG4gKlxuICogPHVsPlxuICogICA8bGk+VGhlIDxjb2RlPmJvdW5kczwvY29kZT4gcHJvcGVydHkgb2YgdGhlIERpc3BsYXlPYmplY3QgY2xhc3M8L2xpPlxuICogPC91bD5cbiAqXG4gKiA8cD5Zb3UgY2FuIHVzZSB0aGUgPGNvZGU+bmV3IEJveCgpPC9jb2RlPiBjb25zdHJ1Y3RvciB0byBjcmVhdGUgYVxuICogQm94IG9iamVjdC48L3A+XG4gKlxuICogPHA+PGI+Tm90ZTo8L2I+IFRoZSBCb3ggY2xhc3MgZG9lcyBub3QgZGVmaW5lIGEgY3ViaWMgU2hhcGVcbiAqIGRpc3BsYXkgb2JqZWN0LlxuICovXG5jbGFzcyBCb3hcbntcblx0cHJpdmF0ZSBfc2l6ZTpWZWN0b3IzRDtcblx0cHJpdmF0ZSBfYm90dG9tUmlnaHRCYWNrOlZlY3RvcjNEO1xuXHRwcml2YXRlIF90b3BMZWZ0RnJvbnQ6VmVjdG9yM0Q7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWlnaHQgb2YgdGhlIGJveCwgaW4gcGl4ZWxzLiBDaGFuZ2luZyB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiB2YWx1ZVxuXHQgKiBvZiBhIEJveCBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxuXHQgKiA8Y29kZT56PC9jb2RlPiwgPGNvZGU+ZGVwdGg8L2NvZGU+IGFuZCA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBoZWlnaHQ6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgd2lkdGggb2YgdGhlIGJveCwgaW4gcGl4ZWxzLiBDaGFuZ2luZyB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IHZhbHVlXG5cdCAqIG9mIGEgQm94IG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXG5cdCAqIDxjb2RlPno8L2NvZGU+LCA8Y29kZT5kZXB0aDwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyB3aWR0aDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBkZW90aCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuIENoYW5naW5nIHRoZSA8Y29kZT5kZXB0aDwvY29kZT4gdmFsdWVcblx0ICogb2YgYSBCb3ggb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPixcblx0ICogPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGRlcHRoOm51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGUgYm94LlxuXHQgKiBDaGFuZ2luZyB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5IG9mIGEgQm94IG9iamVjdCBoYXMgbm9cblx0ICogZWZmZWN0IG9uIHRoZSA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcblx0ICogPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+eDwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZVxuXHQgKiA8Y29kZT5sZWZ0PC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgeDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlIGJveC5cblx0ICogQ2hhbmdpbmcgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIEJveCBvYmplY3QgaGFzIG5vXG5cdCAqIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKlxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGVcblx0ICogPGNvZGU+dG9wPC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgeTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlIGJveC5cblx0ICogQ2hhbmdpbmcgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIEJveCBvYmplY3QgaGFzIG5vXG5cdCAqIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKlxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGVcblx0ICogPGNvZGU+ZnJvbnQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyB6Om51bWJlclxuXG5cdC8qKlxuXHQgKiBUaGUgc3VtIG9mIHRoZSA8Y29kZT56PC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGdldCBiYWNrKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy56ICsgdGhpcy5kZXB0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYmFjayh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5kZXB0aCA9IHZhbCAtIHRoaXMuejtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc3VtIG9mIHRoZSA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGdldCBib3R0b20oKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm90dG9tKHZhbDpudW1iZXIpXG5cdHtcblx0XHR0aGlzLmhlaWdodCA9IHZhbCAtIHRoaXMueTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbG9jYXRpb24gb2YgdGhlIEJveCBvYmplY3QncyBib3R0b20tcmlnaHQgY29ybmVyLCBkZXRlcm1pbmVkIGJ5IHRoZVxuXHQgKiB2YWx1ZXMgb2YgdGhlIDxjb2RlPnJpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+Ym90dG9tPC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGdldCBib3R0b21SaWdodEJhY2soKTpWZWN0b3IzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX2JvdHRvbVJpZ2h0QmFjayA9PSBudWxsKVxuXHRcdFx0dGhpcy5fYm90dG9tUmlnaHRCYWNrID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0XHR0aGlzLl9ib3R0b21SaWdodEJhY2sueCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG5cdFx0dGhpcy5fYm90dG9tUmlnaHRCYWNrLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcblx0XHR0aGlzLl9ib3R0b21SaWdodEJhY2sueiA9IHRoaXMueiArIHRoaXMuZGVwdGg7XG5cblx0XHRyZXR1cm4gdGhpcy5fYm90dG9tUmlnaHRCYWNrO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSA8aT56PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlIGJveC4gQ2hhbmdpbmdcblx0ICogdGhlIDxjb2RlPmZyb250PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIEJveCBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT5cblx0ICogcHJvcGVydGllcy4gSG93ZXZlciBpdCBkb2VzIGFmZmVjdCB0aGUgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnR5LFxuXHQgKiB3aGVyZWFzIGNoYW5naW5nIHRoZSA8Y29kZT56PC9jb2RlPiB2YWx1ZSBkb2VzIDxpPm5vdDwvaT4gYWZmZWN0IHRoZVxuXHQgKiA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydHkuXG5cdCAqXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+bGVmdDwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXG5cdCAqIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGZyb250KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy56O1xuXHR9XG5cblx0cHVibGljIHNldCBmcm9udCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5kZXB0aCArPSB0aGlzLnogLSB2YWw7XG5cdFx0dGhpcy56ID0gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlIGJveC4gQ2hhbmdpbmcgdGhlXG5cdCAqIDxjb2RlPmxlZnQ8L2NvZGU+IHByb3BlcnR5IG9mIGEgQm94IG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZVxuXHQgKiA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLiBIb3dldmVyIGl0IGRvZXMgYWZmZWN0XG5cdCAqIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHksIHdoZXJlYXMgY2hhbmdpbmcgdGhlIDxjb2RlPng8L2NvZGU+IHZhbHVlXG5cdCAqIGRvZXMgPGk+bm90PC9pPiBhZmZlY3QgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eS5cblx0ICpcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5sZWZ0PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2Zcblx0ICogdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbGVmdCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbGVmdCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy53aWR0aCArPSB0aGlzLnggLSB2YWw7XG5cdFx0dGhpcy54ID0gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzdW0gb2YgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgcmlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLnggKyB0aGlzLndpZHRoO1xuXHR9XG5cblx0cHVibGljIHNldCByaWdodCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy53aWR0aCA9IHZhbCAtIHRoaXMueDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc2l6ZSBvZiB0aGUgQm94IG9iamVjdCwgZXhwcmVzc2VkIGFzIGEgVmVjdG9yM0Qgb2JqZWN0IHdpdGggdGhlXG5cdCAqIHZhbHVlcyBvZiB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2l6ZSgpOlZlY3RvcjNEXG5cdHtcblx0XHRpZiAodGhpcy5fc2l6ZSA9PSBudWxsKVxuXHRcdFx0dGhpcy5fc2l6ZSA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0dGhpcy5fc2l6ZS54ID0gdGhpcy53aWR0aDtcblx0XHR0aGlzLl9zaXplLnkgPSB0aGlzLmhlaWdodDtcblx0XHR0aGlzLl9zaXplLnogPSB0aGlzLmRlcHRoO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3NpemU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGUgYm94LiBDaGFuZ2luZ1xuXHQgKiB0aGUgPGNvZGU+dG9wPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIEJveCBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0aWVzLiBIb3dldmVyIGl0IGRvZXMgYWZmZWN0XG5cdCAqIHRoZSA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnR5LCB3aGVyZWFzIGNoYW5naW5nIHRoZSA8Y29kZT55PC9jb2RlPlxuXHQgKiB2YWx1ZSBkb2VzIDxpPm5vdDwvaT4gYWZmZWN0IHRoZSA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnR5LlxuXHQgKlxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPnRvcDwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZVxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRvcCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdG9wKHZhbDpudW1iZXIpXG5cdHtcblx0XHR0aGlzLmhlaWdodCArPSAodGhpcy55IC0gdmFsKTtcblx0XHR0aGlzLnkgPSB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGxvY2F0aW9uIG9mIHRoZSBCb3ggb2JqZWN0J3MgdG9wLWxlZnQtZnJvbnQgY29ybmVyLCBkZXRlcm1pbmVkIGJ5IHRoZVxuXHQgKiA8aT54PC9pPiwgPGk+eTwvaT4gYW5kIDxpPno8L2k+IGNvb3JkaW5hdGVzIG9mIHRoZSBwb2ludC5cblx0ICovXG5cdHB1YmxpYyBnZXQgdG9wTGVmdEZyb250KCk6VmVjdG9yM0Rcblx0e1xuXHRcdGlmICh0aGlzLl90b3BMZWZ0RnJvbnQgPT0gbnVsbClcblx0XHRcdHRoaXMuX3RvcExlZnRGcm9udCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0dGhpcy5fdG9wTGVmdEZyb250LnggPSB0aGlzLng7XG5cdFx0dGhpcy5fdG9wTGVmdEZyb250LnkgPSB0aGlzLnk7XG5cdFx0dGhpcy5fdG9wTGVmdEZyb250LnogPSB0aGlzLno7XG5cblx0XHRyZXR1cm4gdGhpcy5fdG9wTGVmdEZyb250O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgQm94IG9iamVjdCB3aXRoIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgc3BlY2lmaWVkIGJ5IHRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPno8L2NvZGU+IHBhcmFtZXRlcnMgYW5kIHdpdGggdGhlXG5cdCAqIHNwZWNpZmllZCA8Y29kZT53aWR0aDwvY29kZT4sIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kIDxjb2RlPmRlcHRoPC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXJzLiBJZiB5b3UgY2FsbCB0aGlzIHB1YmxpYyB3aXRob3V0IHBhcmFtZXRlcnMsIGEgYm94IHdpdGhcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBzZXQgdG8gMCBpcyBjcmVhdGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0geCAgICAgIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgYm94LlxuXHQgKiBAcGFyYW0geSAgICAgIFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgYm94LlxuXHQgKiBAcGFyYW0geiAgICAgIFRoZSA8aT56PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgYm94LlxuXHQgKiBAcGFyYW0gd2lkdGggIFRoZSB3aWR0aCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXG5cdCAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXG5cdCAqIEBwYXJhbSBkZXB0aCBUaGUgZGVwdGggb2YgdGhlIGJveCwgaW4gcGl4ZWxzLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoeDpudW1iZXIgPSAwLCB5Om51bWJlciA9IDAsIHo6bnVtYmVyID0gMCwgd2lkdGg6bnVtYmVyID0gMCwgaGVpZ2h0Om51bWJlciA9IDAsIGRlcHRoOm51bWJlciA9IDApXG5cdHtcblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cdFx0dGhpcy56ID0gejtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy5kZXB0aCA9IGRlcHRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgQm94IG9iamVjdCB3aXRoIHRoZSBzYW1lIHZhbHVlcyBmb3IgdGhlIDxjb2RlPng8L2NvZGU+LFxuXHQgKiA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPlxuXHQgKiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgYXMgdGhlIG9yaWdpbmFsIEJveCBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4gQSBuZXcgQm94IG9iamVjdCB3aXRoIHRoZSBzYW1lIHZhbHVlcyBmb3IgdGhlIDxjb2RlPng8L2NvZGU+LFxuXHQgKiAgICAgICAgIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxuXHQgKiAgICAgICAgIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzIGFzIHRoZVxuXHQgKiAgICAgICAgIG9yaWdpbmFsIEJveCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpCb3hcblx0e1xuXHRcdHJldHVybiBuZXcgQm94KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLmRlcHRoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpcyBjb250YWluZWQgd2l0aGluIHRoZSBjdWJpY1xuXHQgKiByZWdpb24gZGVmaW5lZCBieSB0aGlzIEJveCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB4IFRoZSA8aT54PC9pPiBjb29yZGluYXRlKGhvcml6b250YWwgY29tcG9uZW50KSBvZiB0aGUgcG9zaXRpb24uXG5cdCAqIEBwYXJhbSB5IFRoZSA8aT55PC9pPiBjb29yZGluYXRlKHZlcnRpY2FsIGNvbXBvbmVudCkgb2YgdGhlIHBvc2l0aW9uLlxuXHQgKiBAcGFyYW0geiBUaGUgPGk+ejwvaT4gY29vcmRpbmF0ZShsb25naXR1ZGluYWwgY29tcG9uZW50KSBvZiB0aGUgcG9zaXRpb24uXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgQm94IG9iamVjdCBjb250YWlucyB0aGVcblx0ICogICAgICAgICBzcGVjaWZpZWQgcG9zaXRpb247IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgY29udGFpbnMoeDpudW1iZXIsIHk6bnVtYmVyLCB6Om51bWJlcik6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPD0geCAmJiB0aGlzLnggKyB0aGlzLndpZHRoID49IHggJiYgdGhpcy55IDw9IHkgJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPj0geSAmJiB0aGlzLnogPD0geiAmJiB0aGlzLnogKyB0aGlzLmRlcHRoID49IHopO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhlIGN1YmljXG5cdCAqIHJlZ2lvbiBkZWZpbmVkIGJ5IHRoaXMgQm94IG9iamVjdC4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byB0aGVcblx0ICogPGNvZGU+Qm94LmNvbnRhaW5zKCk8L2NvZGU+IG1ldGhvZCwgZXhjZXB0IHRoYXQgaXQgdGFrZXMgYSBWZWN0b3IzRFxuXHQgKiBvYmplY3QgYXMgYSBwYXJhbWV0ZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcG9zaXRpb24sIGFzIHJlcHJlc2VudGVkIGJ5IGl0cyA8aT54PC9pPiwgPGk+eTwvaT4gYW5kXG5cdCAqICAgICAgICAgICAgICAgICA8aT56PC9pPiBjb29yZGluYXRlcy5cblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBCb3ggb2JqZWN0IGNvbnRhaW5zIHRoZVxuXHQgKiAgICAgICAgIHNwZWNpZmllZCBwb3NpdGlvbjsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBjb250YWluc1BvaW50KHBvc2l0aW9uOlZlY3RvcjNEKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMueCA8PSBwb3NpdGlvbi54ICYmIHRoaXMueCArIHRoaXMud2lkdGggPj0gcG9zaXRpb24ueCAmJiB0aGlzLnkgPD0gcG9zaXRpb24ueSAmJiB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSBwb3NpdGlvbi55ICYmIHRoaXMueiA8PSBwb3NpdGlvbi56ICYmIHRoaXMueiArIHRoaXMuZGVwdGggPj0gcG9zaXRpb24ueik7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBCb3ggb2JqZWN0IHNwZWNpZmllZCBieSB0aGUgPGNvZGU+Ym94PC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIgaXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIEJveCBvYmplY3QuIEEgQm94IG9iamVjdCBpcyBzYWlkIHRvXG5cdCAqIGNvbnRhaW4gYW5vdGhlciBpZiB0aGUgc2Vjb25kIEJveCBvYmplY3QgZmFsbHMgZW50aXJlbHkgd2l0aGluIHRoZVxuXHQgKiBib3VuZGFyaWVzIG9mIHRoZSBmaXJzdC5cblx0ICpcblx0ICogQHBhcmFtIGJveCBUaGUgQm94IG9iamVjdCBiZWluZyBjaGVja2VkLlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIEJveCBvYmplY3QgdGhhdCB5b3Ugc3BlY2lmeVxuXHQgKiAgICAgICAgIGlzIGNvbnRhaW5lZCBieSB0aGlzIEJveCBvYmplY3Q7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgY29udGFpbnNSZWN0KGJveDpCb3gpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54IDw9IGJveC54ICYmIHRoaXMueCArIHRoaXMud2lkdGggPj0gYm94LnggKyBib3gud2lkdGggJiYgdGhpcy55IDw9IGJveC55ICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IGJveC55ICsgYm94LmhlaWdodCAmJiB0aGlzLnogPD0gYm94LnogJiYgdGhpcy56ICsgdGhpcy5kZXB0aCA+PSBib3gueiArIGJveC5kZXB0aClcblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgYWxsIG9mIGJveCBkYXRhIGZyb20gdGhlIHNvdXJjZSBCb3ggb2JqZWN0IGludG8gdGhlIGNhbGxpbmdcblx0ICogQm94IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHNvdXJjZUJveCBUaGUgQm94IG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgY29weUZyb20oc291cmNlQm94OkJveClcblx0e1xuXHRcdC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgb2JqZWN0IHNwZWNpZmllZCBpbiB0aGUgPGNvZGU+dG9Db21wYXJlPC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIgaXMgZXF1YWwgdG8gdGhpcyBCb3ggb2JqZWN0LiBUaGlzIG1ldGhvZCBjb21wYXJlcyB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYWdhaW5zdFxuXHQgKiB0aGUgc2FtZSBwcm9wZXJ0aWVzIG9mIHRoaXMgQm94IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHRvQ29tcGFyZSBUaGUgYm94IHRvIGNvbXBhcmUgdG8gdGhpcyBCb3ggb2JqZWN0LlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIG9iamVjdCBoYXMgZXhhY3RseSB0aGUgc2FtZVxuXHQgKiAgICAgICAgIHZhbHVlcyBmb3IgdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sXG5cdCAqICAgICAgICAgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT5cblx0ICogICAgICAgICBwcm9wZXJ0aWVzIGFzIHRoaXMgQm94IG9iamVjdDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBlcXVhbHModG9Db21wYXJlOkJveCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPT0gdG9Db21wYXJlLnggJiYgdGhpcy55ID09IHRvQ29tcGFyZS55ICYmIHRoaXMueiA9PSB0b0NvbXBhcmUueiAmJiB0aGlzLndpZHRoID09IHRvQ29tcGFyZS53aWR0aCAmJiB0aGlzLmhlaWdodCA9PSB0b0NvbXBhcmUuaGVpZ2h0ICYmIHRoaXMuZGVwdGggPT0gdG9Db21wYXJlLmRlcHRoKVxuXHR9XG5cblx0LyoqXG5cdCAqIEluY3JlYXNlcyB0aGUgc2l6ZSBvZiB0aGUgQm94IG9iamVjdCBieSB0aGUgc3BlY2lmaWVkIGFtb3VudHMsIGluXG5cdCAqIHBpeGVscy4gVGhlIGNlbnRlciBwb2ludCBvZiB0aGUgQm94IG9iamVjdCBzdGF5cyB0aGUgc2FtZSwgYW5kIGl0c1xuXHQgKiBzaXplIGluY3JlYXNlcyB0byB0aGUgbGVmdCBhbmQgcmlnaHQgYnkgdGhlIDxjb2RlPmR4PC9jb2RlPiB2YWx1ZSwgdG9cblx0ICogdGhlIHRvcCBhbmQgdGhlIGJvdHRvbSBieSB0aGUgPGNvZGU+ZHk8L2NvZGU+IHZhbHVlLCBhbmQgdG9cblx0ICogdGhlIGZyb250IGFuZCB0aGUgYmFjayBieSB0aGUgPGNvZGU+ZHo8L2NvZGU+IHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0gZHggVGhlIHZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBsZWZ0IGFuZCB0aGUgcmlnaHQgb2YgdGhlIEJveFxuXHQgKiAgICAgICAgICAgb2JqZWN0LiBUaGUgZm9sbG93aW5nIGVxdWF0aW9uIGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBuZXdcblx0ICogICAgICAgICAgIHdpZHRoIGFuZCBwb3NpdGlvbiBvZiB0aGUgYm94OlxuXHQgKiBAcGFyYW0gZHkgVGhlIHZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSB0b3AgYW5kIHRoZSBib3R0b20gb2YgdGhlIEJveFxuXHQgKiAgICAgICAgICAgb2JqZWN0LiBUaGUgZm9sbG93aW5nIGVxdWF0aW9uIGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBuZXdcblx0ICogICAgICAgICAgIGhlaWdodCBhbmQgcG9zaXRpb24gb2YgdGhlIGJveDpcblx0ICogQHBhcmFtIGR6IFRoZSB2YWx1ZSB0byBiZSBhZGRlZCB0byB0aGUgZnJvbnQgYW5kIHRoZSBiYWNrIG9mIHRoZSBCb3hcblx0ICogICAgICAgICAgIG9iamVjdC4gVGhlIGZvbGxvd2luZyBlcXVhdGlvbiBpcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbmV3XG5cdCAqICAgICAgICAgICBkZXB0aCBhbmQgcG9zaXRpb24gb2YgdGhlIGJveDpcblx0ICovXG5cdHB1YmxpYyBpbmZsYXRlKGR4Om51bWJlciwgZHk6bnVtYmVyLCBkejpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggLT0gZHgvMjtcblx0XHR0aGlzLnkgLT0gZHkvMjtcblx0XHR0aGlzLnogLT0gZHovMjtcblx0XHR0aGlzLndpZHRoICs9IGR4LzI7XG5cdFx0dGhpcy5oZWlnaHQgKz0gZHkvMjtcblx0XHR0aGlzLmRlcHRoICs9IGR6LzI7XG5cdH1cblxuXHQvKipcblx0ICogSW5jcmVhc2VzIHRoZSBzaXplIG9mIHRoZSBCb3ggb2JqZWN0LiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxuXHQgKiA8Y29kZT5Cb3guaW5mbGF0ZSgpPC9jb2RlPiBtZXRob2QgZXhjZXB0IGl0IHRha2VzIGEgVmVjdG9yM0Qgb2JqZWN0IGFzXG5cdCAqIGEgcGFyYW1ldGVyLlxuXHQgKlxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIHR3byBjb2RlIGV4YW1wbGVzIGdpdmUgdGhlIHNhbWUgcmVzdWx0OjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGRlbHRhIFRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGlzIFZlY3RvcjNEIG9iamVjdCBpcyB1c2VkIHRvXG5cdCAqICAgICAgICAgICAgICBpbmNyZWFzZSB0aGUgaG9yaXpvbnRhbCBkaW1lbnNpb24gb2YgdGhlIEJveCBvYmplY3QuXG5cdCAqICAgICAgICAgICAgICBUaGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgaXMgdXNlZCB0byBpbmNyZWFzZSB0aGUgdmVydGljYWxcblx0ICogICAgICAgICAgICAgIGRpbWVuc2lvbiBvZiB0aGUgQm94IG9iamVjdC5cblx0ICogICAgICAgICAgICAgIFRoZSA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSBpcyB1c2VkIHRvIGluY3JlYXNlIHRoZVxuXHQgKiAgICAgICAgICAgICAgbG9uZ2l0dWRpbmFsIGRpbWVuc2lvbiBvZiB0aGUgQm94IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBpbmZsYXRlUG9pbnQoZGVsdGE6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLnggLT0gZGVsdGEueC8yO1xuXHRcdHRoaXMueSAtPSBkZWx0YS55LzI7XG5cdFx0dGhpcy56IC09IGRlbHRhLnovMjtcblx0XHR0aGlzLndpZHRoICs9IGRlbHRhLngvMjtcblx0XHR0aGlzLmhlaWdodCArPSBkZWx0YS55LzI7XG5cdFx0dGhpcy5kZXB0aCArPSBkZWx0YS56LzI7XG5cdH1cblxuXHQvKipcblx0ICogSWYgdGhlIEJveCBvYmplY3Qgc3BlY2lmaWVkIGluIHRoZSA8Y29kZT50b0ludGVyc2VjdDwvY29kZT4gcGFyYW1ldGVyXG5cdCAqIGludGVyc2VjdHMgd2l0aCB0aGlzIEJveCBvYmplY3QsIHJldHVybnMgdGhlIGFyZWEgb2YgaW50ZXJzZWN0aW9uXG5cdCAqIGFzIGEgQm94IG9iamVjdC4gSWYgdGhlIGJveGVzIGRvIG5vdCBpbnRlcnNlY3QsIHRoaXMgbWV0aG9kIHJldHVybnMgYW5cblx0ICogZW1wdHkgQm94IG9iamVjdCB3aXRoIGl0cyBwcm9wZXJ0aWVzIHNldCB0byAwLlxuXHQgKlxuXHQgKiBAcGFyYW0gdG9JbnRlcnNlY3QgVGhlIEJveCBvYmplY3QgdG8gY29tcGFyZSBhZ2FpbnN0IHRvIHNlZSBpZiBpdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0cyB3aXRoIHRoaXMgQm94IG9iamVjdC5cblx0ICogQHJldHVybiBBIEJveCBvYmplY3QgdGhhdCBlcXVhbHMgdGhlIGFyZWEgb2YgaW50ZXJzZWN0aW9uLiBJZiB0aGVcblx0ICogICAgICAgICBib3hlcyBkbyBub3QgaW50ZXJzZWN0LCB0aGlzIG1ldGhvZCByZXR1cm5zIGFuIGVtcHR5IEJveFxuXHQgKiAgICAgICAgIG9iamVjdDsgdGhhdCBpcywgYSBib3ggd2l0aCBpdHMgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxuXHQgKiAgICAgICAgIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sICA8Y29kZT5oZWlnaHQ8L2NvZGU+LCBhbmRcblx0ICogICAgICAgICA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBzZXQgdG8gMC5cblx0ICovXG5cdHB1YmxpYyBpbnRlcnNlY3Rpb24odG9JbnRlcnNlY3Q6Qm94KTpCb3hcblx0e1xuXHRcdGlmICh0aGlzLmludGVyc2VjdHModG9JbnRlcnNlY3QpKSB7XG5cdFx0XHR2YXIgaTpCb3ggPSBuZXcgQm94KCk7XG5cblx0XHRcdGlmICh0aGlzLnggPiB0b0ludGVyc2VjdC54KSB7XG5cdFx0XHRcdGkueCA9IHRoaXMueDtcblx0XHRcdFx0aS53aWR0aCA9IHRvSW50ZXJzZWN0LnggLSB0aGlzLnggKyB0b0ludGVyc2VjdC53aWR0aDtcblxuXHRcdFx0XHRpZiAoaS53aWR0aCA+IHRoaXMud2lkdGgpXG5cdFx0XHRcdFx0aS53aWR0aCA9IHRoaXMud2lkdGg7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpLnggPSB0b0ludGVyc2VjdC54O1xuXHRcdFx0XHRpLndpZHRoID0gdGhpcy54IC0gdG9JbnRlcnNlY3QueCArIHRoaXMud2lkdGg7XG5cblx0XHRcdFx0aWYgKGkud2lkdGggPiB0b0ludGVyc2VjdC53aWR0aClcblx0XHRcdFx0XHRpLndpZHRoID0gdG9JbnRlcnNlY3Qud2lkdGg7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnkgPiB0b0ludGVyc2VjdC55KSB7XG5cdFx0XHRcdGkueSA9IHRoaXMueTtcblx0XHRcdFx0aS5oZWlnaHQgPSB0b0ludGVyc2VjdC55IC0gdGhpcy55ICsgdG9JbnRlcnNlY3QuaGVpZ2h0O1xuXG5cdFx0XHRcdGlmIChpLmhlaWdodCA+IHRoaXMuaGVpZ2h0KVxuXHRcdFx0XHRcdGkuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpLnkgPSB0b0ludGVyc2VjdC55O1xuXHRcdFx0XHRpLmhlaWdodCA9IHRoaXMueSAtIHRvSW50ZXJzZWN0LnkgKyB0aGlzLmhlaWdodDtcblxuXHRcdFx0XHRpZiAoaS5oZWlnaHQgPiB0b0ludGVyc2VjdC5oZWlnaHQpXG5cdFx0XHRcdFx0aS5oZWlnaHQgPSB0b0ludGVyc2VjdC5oZWlnaHQ7XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYgKHRoaXMueiA+IHRvSW50ZXJzZWN0LnopIHtcblx0XHRcdFx0aS56ID0gdGhpcy56O1xuXHRcdFx0XHRpLmRlcHRoID0gdG9JbnRlcnNlY3QueiAtIHRoaXMueiArIHRvSW50ZXJzZWN0LmRlcHRoO1xuXG5cdFx0XHRcdGlmIChpLmRlcHRoID4gdGhpcy5kZXB0aClcblx0XHRcdFx0XHRpLmRlcHRoID0gdGhpcy5kZXB0aDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGkueiA9IHRvSW50ZXJzZWN0Lno7XG5cdFx0XHRcdGkuZGVwdGggPSB0aGlzLnogLSB0b0ludGVyc2VjdC56ICsgdGhpcy5kZXB0aDtcblxuXHRcdFx0XHRpZiAoaS5kZXB0aCA+IHRvSW50ZXJzZWN0LmRlcHRoKVxuXHRcdFx0XHRcdGkuZGVwdGggPSB0b0ludGVyc2VjdC5kZXB0aDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBCb3goKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG9iamVjdCBzcGVjaWZpZWQgaW4gdGhlIDxjb2RlPnRvSW50ZXJzZWN0PC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIgaW50ZXJzZWN0cyB3aXRoIHRoaXMgQm94IG9iamVjdC4gVGhpcyBtZXRob2QgY2hlY2tzIHRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4sIGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgc3BlY2lmaWVkXG5cdCAqIEJveCBvYmplY3QgdG8gc2VlIGlmIGl0IGludGVyc2VjdHMgd2l0aCB0aGlzIEJveCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB0b0ludGVyc2VjdCBUaGUgQm94IG9iamVjdCB0byBjb21wYXJlIGFnYWluc3QgdGhpcyBCb3ggb2JqZWN0LlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgaW50ZXJzZWN0c1xuXHQgKiAgICAgICAgIHdpdGggdGhpcyBCb3ggb2JqZWN0OyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGludGVyc2VjdHModG9JbnRlcnNlY3Q6Qm94KTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMueCArIHRoaXMud2lkdGggPiB0b0ludGVyc2VjdC54ICYmIHRoaXMueCA8IHRvSW50ZXJzZWN0LnggKyB0b0ludGVyc2VjdC53aWR0aCAmJiB0aGlzLnkgKyB0aGlzLmhlaWdodCA+IHRvSW50ZXJzZWN0LnkgJiYgdGhpcy55IDwgdG9JbnRlcnNlY3QueSArIHRvSW50ZXJzZWN0LmhlaWdodCAmJiB0aGlzLnogKyB0aGlzLmRlcHRoID4gdG9JbnRlcnNlY3QueiAmJiB0aGlzLnogPCB0b0ludGVyc2VjdC56ICsgdG9JbnRlcnNlY3QuZGVwdGgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhpcyBCb3ggb2JqZWN0IGlzIGVtcHR5LlxuXHQgKlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIEJveCBvYmplY3QncyB3aWR0aCwgaGVpZ2h0IG9yXG5cdCAqICAgICAgICAgZGVwdGggaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDA7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgaXNFbXB0eSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54ID09IDAgJiYgdGhpcy55ID09IDAgJiYgdGhpcy56ID09IDAgJiYgdGhpcy53aWR0aCA9PSAwICYmIHRoaXMuaGVpZ2h0ID09IDAgJiYgdGhpcy5kZXB0aCA9PSAwKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBsb2NhdGlvbiBvZiB0aGUgQm94IG9iamVjdCwgYXMgZGV0ZXJtaW5lZCBieSBpdHNcblx0ICogdG9wLWxlZnQtZnJvbnQgY29ybmVyLCBieSB0aGUgc3BlY2lmaWVkIGFtb3VudHMuXG5cdCAqXG5cdCAqIEBwYXJhbSBkeCBNb3ZlcyB0aGUgPGk+eDwvaT4gdmFsdWUgb2YgdGhlIEJveCBvYmplY3QgYnkgdGhpcyBhbW91bnQuXG5cdCAqIEBwYXJhbSBkeSBNb3ZlcyB0aGUgPGk+eTwvaT4gdmFsdWUgb2YgdGhlIEJveCBvYmplY3QgYnkgdGhpcyBhbW91bnQuXG5cdCAqIEBwYXJhbSBkeiBNb3ZlcyB0aGUgPGk+ejwvaT4gdmFsdWUgb2YgdGhlIEJveCBvYmplY3QgYnkgdGhpcyBhbW91bnQuXG5cdCAqL1xuXHRwdWJsaWMgb2Zmc2V0KGR4Om51bWJlciwgZHk6bnVtYmVyLCBkejpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggKz0gZHg7XG5cdFx0dGhpcy55ICs9IGR5O1xuXHRcdHRoaXMueiArPSBkejtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBsb2NhdGlvbiBvZiB0aGUgQm94IG9iamVjdCB1c2luZyBhIFZlY3RvcjNEIG9iamVjdCBhcyBhXG5cdCAqIHBhcmFtZXRlci4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byB0aGUgPGNvZGU+Qm94Lm9mZnNldCgpPC9jb2RlPlxuXHQgKiBtZXRob2QsIGV4Y2VwdCB0aGF0IGl0IHRha2VzIGEgVmVjdG9yM0Qgb2JqZWN0IGFzIGEgcGFyYW1ldGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gQSBWZWN0b3IzRCBvYmplY3QgdG8gdXNlIHRvIG9mZnNldCB0aGlzIEJveCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgb2Zmc2V0UG9zaXRpb24ocG9zaXRpb246VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLnggKz0gcG9zaXRpb24ueDtcblx0XHR0aGlzLnkgKz0gcG9zaXRpb24ueTtcblx0XHR0aGlzLnogKz0gcG9zaXRpb24uejtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIGFsbCBvZiB0aGUgQm94IG9iamVjdCdzIHByb3BlcnRpZXMgdG8gMC4gQSBCb3ggb2JqZWN0IGlzIGVtcHR5IGlmIGl0c1xuXHQgKiB3aWR0aCwgaGVpZ2h0IG9yIGRlcHRoIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byAwLlxuXHQgKlxuXHQgKiA8cD4gVGhpcyBtZXRob2Qgc2V0cyB0aGUgdmFsdWVzIG9mIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXG5cdCAqIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIDxjb2RlPmhlaWdodDwvY29kZT4sIGFuZFxuXHQgKiA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyB0byAwLjwvcD5cblx0ICpcblx0ICovXG5cdHB1YmxpYyBzZXRFbXB0eSgpXG5cdHtcblx0XHR0aGlzLnggPSAwO1xuXHRcdHRoaXMueSA9IDA7XG5cdFx0dGhpcy56ID0gMDtcblx0XHR0aGlzLndpZHRoID0gMDtcblx0XHR0aGlzLmhlaWdodCA9IDA7XG5cdFx0dGhpcy5kZXB0aCA9IDA7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyB0aGUgbWVtYmVycyBvZiBCb3ggdG8gdGhlIHNwZWNpZmllZCB2YWx1ZXNcblx0ICpcblx0ICogQHBhcmFtIHhhICAgICAgVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgYm94LlxuXHQgKiBAcGFyYW0geWEgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICBib3guXG5cdCAqIEBwYXJhbSB5eiAgICAgIFRoZSA8aT56PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgIGJveC5cblx0ICogQHBhcmFtIHdpZHRoYSAgVGhlIHdpZHRoIG9mIHRoZSBib3gsIGluIHBpeGVscy5cblx0ICogQHBhcmFtIGhlaWdodGEgVGhlIGhlaWdodCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXG5cdCAqIEBwYXJhbSBkZXB0aGEgIFRoZSBkZXB0aCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXG5cdCAqL1xuXHRwdWJsaWMgc2V0VG8oeGE6bnVtYmVyLCB5YTpudW1iZXIsIHphOm51bWJlciwgd2lkdGhhOm51bWJlciwgaGVpZ2h0YTpudW1iZXIsIGRlcHRoYTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggPSB4YTtcblx0XHR0aGlzLnkgPSB5YTtcblx0XHR0aGlzLnogPSB6YTtcblx0XHR0aGlzLndpZHRoID0gd2lkdGhhO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0YTtcblx0XHR0aGlzLmRlcHRoID0gZGVwdGhhO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkcyBhbmQgcmV0dXJucyBhIHN0cmluZyB0aGF0IGxpc3RzIHRoZSBob3Jpem9udGFsLCB2ZXJ0aWNhbCBhbmRcblx0ICogbG9uZ2l0dWRpbmFsIHBvc2l0aW9ucyBhbmQgdGhlIHdpZHRoLCBoZWlnaHQgYW5kIGRlcHRoIG9mIHRoZSBCb3ggb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIEEgc3RyaW5nIGxpc3RpbmcgdGhlIHZhbHVlIG9mIGVhY2ggb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIG9mXG5cdCAqICAgICAgICAgdGhlIEJveCBvYmplY3Q6IDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sXG5cdCAqICAgICAgICAgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+LCBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIHRvU3RyaW5nKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gXCJbQm94XSAoeD1cIiArIHRoaXMueCArIFwiLCB5PVwiICsgdGhpcy55ICsgXCIsIHo9XCIgKyB0aGlzLnogKyBcIiwgd2lkdGg9XCIgKyB0aGlzLndpZHRoICsgXCIsIGhlaWdodD1cIiArIHRoaXMuaGVpZ2h0ICsgXCIsIGRlcHRoPVwiICsgdGhpcy5kZXB0aCArIFwiKVwiO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgdHdvIGJveGVzIHRvZ2V0aGVyIHRvIGNyZWF0ZSBhIG5ldyBCb3ggb2JqZWN0LCBieSBmaWxsaW5nXG5cdCAqIGluIHRoZSBob3Jpem9udGFsLCB2ZXJ0aWNhbCBhbmQgbG9uZ2l0dWRpbmFsIHNwYWNlIGJldHdlZW4gdGhlIHR3byBib3hlcy5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoZSA8Y29kZT51bmlvbigpPC9jb2RlPiBtZXRob2QgaWdub3JlcyBib3hlcyB3aXRoXG5cdCAqIDxjb2RlPjA8L2NvZGU+IGFzIHRoZSBoZWlnaHQsIHdpZHRoIG9yIGRlcHRoIHZhbHVlLCBzdWNoIGFzOiA8Y29kZT52YXJcblx0ICogYm94MjpCb3ggPSBuZXcgQm94KDMwMCwzMDAsMzAwLDUwLDUwLDApOzwvY29kZT48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB0b1VuaW9uIEEgQm94IG9iamVjdCB0byBhZGQgdG8gdGhpcyBCb3ggb2JqZWN0LlxuXHQgKiBAcmV0dXJuIEEgbmV3IEJveCBvYmplY3QgdGhhdCBpcyB0aGUgdW5pb24gb2YgdGhlIHR3byBib3hlcy5cblx0ICovXG5cdHB1YmxpYyB1bmlvbih0b1VuaW9uOkJveCk6Qm94XG5cdHtcblx0XHR2YXIgdTpCb3ggPSBuZXcgQm94KCk7XG5cblx0XHRpZiAodGhpcy54IDwgdG9Vbmlvbi54KSB7XG5cdFx0XHR1LnggPSB0aGlzLng7XG5cdFx0XHR1LndpZHRoID0gdG9Vbmlvbi54IC0gdGhpcy54ICsgdG9Vbmlvbi53aWR0aDtcblxuXHRcdFx0aWYgKHUud2lkdGggPCB0aGlzLndpZHRoKVxuXHRcdFx0XHR1LndpZHRoID0gdGhpcy53aWR0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dS54ID0gdG9Vbmlvbi54O1xuXHRcdFx0dS53aWR0aCA9IHRoaXMueCAtIHRvVW5pb24ueCArIHRoaXMud2lkdGg7XG5cblx0XHRcdGlmICh1LndpZHRoIDwgdG9Vbmlvbi53aWR0aClcblx0XHRcdFx0dS53aWR0aCA9IHRvVW5pb24ud2lkdGg7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMueSA8IHRvVW5pb24ueSkge1xuXHRcdFx0dS55ID0gdGhpcy55O1xuXHRcdFx0dS5oZWlnaHQgPSB0b1VuaW9uLnkgLSB0aGlzLnkgKyB0b1VuaW9uLmhlaWdodDtcblxuXHRcdFx0aWYgKHUuaGVpZ2h0IDwgdGhpcy5oZWlnaHQpXG5cdFx0XHRcdHUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHUueSA9IHRvVW5pb24ueTtcblx0XHRcdHUuaGVpZ2h0ID0gdGhpcy55IC0gdG9Vbmlvbi55ICsgdGhpcy5oZWlnaHQ7XG5cblx0XHRcdGlmICh1LmhlaWdodCA8IHRvVW5pb24uaGVpZ2h0KVxuXHRcdFx0XHR1LmhlaWdodCA9IHRvVW5pb24uaGVpZ2h0O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnogPCB0b1VuaW9uLnopIHtcblx0XHRcdHUueiA9IHRoaXMuejtcblx0XHRcdHUuZGVwdGggPSB0b1VuaW9uLnogLSB0aGlzLnogKyB0b1VuaW9uLmRlcHRoO1xuXG5cdFx0XHRpZiAodS5kZXB0aCA8IHRoaXMuZGVwdGgpXG5cdFx0XHRcdHUuZGVwdGggPSB0aGlzLmRlcHRoO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR1LnogPSB0b1VuaW9uLno7XG5cdFx0XHR1LmRlcHRoID0gdGhpcy56IC0gdG9Vbmlvbi56ICsgdGhpcy5kZXB0aDtcblxuXHRcdFx0aWYgKHUuZGVwdGggPCB0b1VuaW9uLmRlcHRoKVxuXHRcdFx0XHR1LmRlcHRoID0gdG9Vbmlvbi5kZXB0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdTtcblx0fVxufVxuXG5leHBvcnQgPSBCb3g7Il19