var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");

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
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof z === "undefined") { z = 0; }
        if (typeof width === "undefined") { width = 0; }
        if (typeof height === "undefined") { height = 0; }
        if (typeof depth === "undefined") { depth = 0; }
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

        if (this.z < toUnion.z) {
            u.z = this.z;
            u.depth = toUnion.z - this.z + toUnion.depth;

            if (u.depth < this.depth)
                u.depth = this.depth;
        } else {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZ2VvbS9Cb3gudHMiXSwibmFtZXMiOlsiQm94IiwiQm94LmNvbnN0cnVjdG9yIiwiQm94LmNsb25lIiwiQm94LmNvbnRhaW5zIiwiQm94LmNvbnRhaW5zUG9pbnQiLCJCb3guY29udGFpbnNSZWN0IiwiQm94LmNvcHlGcm9tIiwiQm94LmVxdWFscyIsIkJveC5pbmZsYXRlIiwiQm94LmluZmxhdGVQb2ludCIsIkJveC5pbnRlcnNlY3Rpb24iLCJCb3guaW50ZXJzZWN0cyIsIkJveC5pc0VtcHR5IiwiQm94Lm9mZnNldCIsIkJveC5vZmZzZXRQb3NpdGlvbiIsIkJveC5zZXRFbXB0eSIsIkJveC5zZXRUbyIsIkJveC50b1N0cmluZyIsIkJveC51bmlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsNERBQW9FOztBQUVwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMkJHO0FBQ0g7SUFzT0NBOzs7Ozs7Ozs7Ozs7Ozs7OztNQURHQTtJQUNIQSxhQUFZQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxLQUFnQkEsRUFBRUEsTUFBaUJBLEVBQUVBLEtBQWdCQTtRQUEvRkMsZ0NBQUFBLENBQUNBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLGdDQUFBQSxDQUFDQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxnQ0FBQUEsQ0FBQ0EsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsb0NBQUFBLEtBQUtBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLHFDQUFBQSxNQUFNQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxvQ0FBQUEsS0FBS0EsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFFMUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO1FBQ1ZBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO1FBQ1ZBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO1FBQ1ZBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBO1FBQ2xCQSxJQUFJ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QSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0E7O1lBRXpCQSxPQUFPQSxJQUFJQSxDQUFDQSxLQUFLQTtRQUNsQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFZREE7UUFBQUE7Ozs7Ozs7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNkQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFlQSxHQUFVQTtZQUV4QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBO1FBQ2JBLENBQUNBOzs7O0FBTkFBOztJQVlEQTtRQUFBQTs7O1VBREdBO2FBQ0hBO1lBRUNBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLElBQUlBLElBQUlBO2dCQUM3QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1lBRXJDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBOztZQUU3QkEsT0FBT0EsSUFBSUEsQ0FBQ0EsYUFBYUE7UUFDMUJBLENBQUNBOzs7O0FBQUFBO0lBd0NEQTs7Ozs7Ozs7O01BREdBOzBCQUNIQTtRQUVDRSxPQUFPQSxJQUFJQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUM1RUEsQ0FBQ0E7O0lBWURGOzs7Ozs7Ozs7TUFER0E7NkJBQ0hBLFVBQWdCQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxDQUFRQTtRQUUzQ0csT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDeElBLENBQUNBOztJQWFESDs7Ozs7Ozs7OztNQURHQTtrQ0FDSEEsVUFBcUJBLFFBQWlCQTtRQUVyQ0ksT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDOUxBLENBQUNBOztJQVlESjs7Ozs7Ozs7O01BREdBO2lDQUNIQSxVQUFvQkEsR0FBT0E7UUFFMUJLLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBO0lBQ3JNQSxDQUFDQTs7SUFRREw7Ozs7O01BREdBOzZCQUNIQSxVQUFnQkEsU0FBYUE7UUFFNUJNLE1BQU1BO0lBQ1BBLENBQUNBOztJQWVETjs7Ozs7Ozs7Ozs7O01BREdBOzJCQUNIQSxVQUFjQSxTQUFhQTtRQUUxQk8sT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsU0FBU0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsU0FBU0EsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDdExBLENB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OUJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBO2FBQzdCQTs7WUFFREEsT0FBT0EsQ0FBQ0E7U0FDUkE7O1FBRURBLE9BQU9BLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO0lBQ2pCQSxDQUFDQTs7SUFhRFY7Ozs7Ozs7Ozs7TUFER0E7K0JBQ0hBLFVBQWtCQSxXQUFlQTtRQUVoQ1csT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDdlFBLENBQUNBOztJQVFEWDs7Ozs7TUFER0E7NEJBQ0hBO1FBRUNZLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBO0lB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Q0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0E7O1lBRXpDQSxJQUFJQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxLQUFLQTtnQkFDMUJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO1NBQ3pCQTs7UUFFREEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7WUFDdkJBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBO1lBQ1pBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BOztZQUU5Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUE7Z0JBQ3pCQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtTQUN4QkEsS0FBTUE7WUFDTkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUE7O1lBRTNDQSxJQUFJQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQTtnQkFDNUJBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBO1NBQzNCQTs7UUFFREEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7WUFDdkJBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBO1lBQ1pBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBOztZQUU1Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0E7Z0JBQ3ZCQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtTQUN0QkEsS0FBTUE7WUFDTkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0E7O1lBRXpDQSxJQUFJQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxLQUFLQTtnQkFDMUJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO1NBQ3pCQTs7UUFFREEsT0FBT0EsQ0FBQ0E7SUFDVEEsQ0FBQ0E7SUFDRmxCLFdBQUNBO0FBQURBLENBQUNBLElBQUE7O0FBRUQsb0JBQWEsQ0FBQSIsImZpbGUiOiJjb3JlL2dlb20vQm94LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vVmVjdG9yM0RcIik7XG5cbi8qKlxuICogQSBCb3ggb2JqZWN0IGlzIGFuIGFyZWEgZGVmaW5lZCBieSBpdHMgcG9zaXRpb24sIGFzIGluZGljYXRlZCBieSBpdHNcbiAqIHRvcC1sZWZ0LWZyb250IGNvcm5lciBwb2ludCg8aT54PC9pPiwgPGk+eTwvaT4sIDxpPno8L2k+KSBhbmQgYnkgaXRzIHdpZHRoLFxuICogaGVpZ2h0IGFuZCBkZXB0aC5cbiAqXG4gKlxuICogPHA+VGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcbiAqIDxjb2RlPmhlaWdodDwvY29kZT4gPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgb2YgdGhlIEJveCBjbGFzcyBhcmVcbiAqIGluZGVwZW5kZW50IG9mIGVhY2ggb3RoZXI7IGNoYW5naW5nIHRoZSB2YWx1ZSBvZiBvbmUgcHJvcGVydHkgaGFzIG5vIGVmZmVjdFxuICogb24gdGhlIG90aGVycy4gSG93ZXZlciwgdGhlIDxjb2RlPnJpZ2h0PC9jb2RlPiwgPGNvZGU+Ym90dG9tPC9jb2RlPiBhbmRcbiAqIDxjb2RlPmJhY2s8L2NvZGU+IHByb3BlcnRpZXMgYXJlIGludGVncmFsbHkgcmVsYXRlZCB0byB0aG9zZSBzaXhcbiAqIHByb3BlcnRpZXMuIEZvciBleGFtcGxlLCBpZiB5b3UgY2hhbmdlIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+cmlnaHQ8L2NvZGU+XG4gKiBwcm9wZXJ0eSwgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHkgY2hhbmdlczsgaWYgeW91XG4gKiBjaGFuZ2UgdGhlIDxjb2RlPmJvdHRvbTwvY29kZT4gcHJvcGVydHksIHRoZSB2YWx1ZSBvZiB0aGVcbiAqIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHkgY2hhbmdlcy4gPC9wPlxuICpcbiAqIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB1c2UgQm94IG9iamVjdHM6PC9wPlxuICpcbiAqIDx1bD5cbiAqICAgPGxpPlRoZSA8Y29kZT5ib3VuZHM8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzPC9saT5cbiAqIDwvdWw+XG4gKlxuICogPHA+WW91IGNhbiB1c2UgdGhlIDxjb2RlPm5ldyBCb3goKTwvY29kZT4gY29uc3RydWN0b3IgdG8gY3JlYXRlIGFcbiAqIEJveCBvYmplY3QuPC9wPlxuICpcbiAqIDxwPjxiPk5vdGU6PC9iPiBUaGUgQm94IGNsYXNzIGRvZXMgbm90IGRlZmluZSBhIGN1YmljIFNoYXBlXG4gKiBkaXNwbGF5IG9iamVjdC5cbiAqL1xuY2xhc3MgQm94XG57XG5cdHByaXZhdGUgX3NpemU6VmVjdG9yM0Q7XG5cdHByaXZhdGUgX2JvdHRvbVJpZ2h0QmFjazpWZWN0b3IzRDtcblx0cHJpdmF0ZSBfdG9wTGVmdEZyb250OlZlY3RvcjNEO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVpZ2h0IG9mIHRoZSBib3gsIGluIHBpeGVscy4gQ2hhbmdpbmcgdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gdmFsdWVcblx0ICogb2YgYSBCb3ggb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPixcblx0ICogPGNvZGU+ejwvY29kZT4sIDxjb2RlPmRlcHRoPC9jb2RlPiBhbmQgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgaGVpZ2h0Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIHdpZHRoIG9mIHRoZSBib3gsIGluIHBpeGVscy4gQ2hhbmdpbmcgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiB2YWx1ZVxuXHQgKiBvZiBhIEJveCBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxuXHQgKiA8Y29kZT56PC9jb2RlPiwgPGNvZGU+ZGVwdGg8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgd2lkdGg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgZGVvdGggb2YgdGhlIGJveCwgaW4gcGl4ZWxzLiBDaGFuZ2luZyB0aGUgPGNvZGU+ZGVwdGg8L2NvZGU+IHZhbHVlXG5cdCAqIG9mIGEgQm94IG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXG5cdCAqIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBkZXB0aDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlIGJveC5cblx0ICogQ2hhbmdpbmcgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIEJveCBvYmplY3QgaGFzIG5vXG5cdCAqIGVmZmVjdCBvbiB0aGUgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKlxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGVcblx0ICogPGNvZGU+bGVmdDwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKi9cblx0cHVibGljIHg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZSBib3guXG5cdCAqIENoYW5naW5nIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgb2YgYSBCb3ggb2JqZWN0IGhhcyBub1xuXHQgKiBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcy5cblx0ICpcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgdGhlXG5cdCAqIDxjb2RlPnRvcDwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKi9cblx0cHVibGljIHk6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZSBib3guXG5cdCAqIENoYW5naW5nIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgb2YgYSBCb3ggb2JqZWN0IGhhcyBub1xuXHQgKiBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcy5cblx0ICpcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgdGhlXG5cdCAqIDxjb2RlPmZyb250PC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgejpudW1iZXJcblxuXHQvKipcblx0ICogVGhlIHN1bSBvZiB0aGUgPGNvZGU+ejwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgYmFjaygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueiArIHRoaXMuZGVwdGg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJhY2sodmFsOm51bWJlcilcblx0e1xuXHRcdHRoaXMuZGVwdGggPSB2YWwgLSB0aGlzLno7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHN1bSBvZiB0aGUgPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90dG9tKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJvdHRvbSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5oZWlnaHQgPSB2YWwgLSB0aGlzLnk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGxvY2F0aW9uIG9mIHRoZSBCb3ggb2JqZWN0J3MgYm90dG9tLXJpZ2h0IGNvcm5lciwgZGV0ZXJtaW5lZCBieSB0aGVcblx0ICogdmFsdWVzIG9mIHRoZSA8Y29kZT5yaWdodDwvY29kZT4gYW5kIDxjb2RlPmJvdHRvbTwvY29kZT4gcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90dG9tUmlnaHRCYWNrKCk6VmVjdG9yM0Rcblx0e1xuXHRcdGlmICh0aGlzLl9ib3R0b21SaWdodEJhY2sgPT0gbnVsbClcblx0XHRcdHRoaXMuX2JvdHRvbVJpZ2h0QmFjayA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0dGhpcy5fYm90dG9tUmlnaHRCYWNrLnggPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuXHRcdHRoaXMuX2JvdHRvbVJpZ2h0QmFjay55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG5cdFx0dGhpcy5fYm90dG9tUmlnaHRCYWNrLnogPSB0aGlzLnogKyB0aGlzLmRlcHRoO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2JvdHRvbVJpZ2h0QmFjaztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgPGk+ejwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZSBib3guIENoYW5naW5nXG5cdCAqIHRoZSA8Y29kZT5mcm9udDwvY29kZT4gcHJvcGVydHkgb2YgYSBCb3ggb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlXG5cdCAqIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+XG5cdCAqIHByb3BlcnRpZXMuIEhvd2V2ZXIgaXQgZG9lcyBhZmZlY3QgdGhlIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0eSxcblx0ICogd2hlcmVhcyBjaGFuZ2luZyB0aGUgPGNvZGU+ejwvY29kZT4gdmFsdWUgZG9lcyA8aT5ub3Q8L2k+IGFmZmVjdCB0aGVcblx0ICogPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnR5LlxuXHQgKlxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPmxlZnQ8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZlxuXHQgKiB0aGUgPGNvZGU+eDwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBmcm9udCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuejtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZnJvbnQodmFsOm51bWJlcilcblx0e1xuXHRcdHRoaXMuZGVwdGggKz0gdGhpcy56IC0gdmFsO1xuXHRcdHRoaXMueiA9IHZhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSBib3guIENoYW5naW5nIHRoZVxuXHQgKiA8Y29kZT5sZWZ0PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIEJveCBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGVcblx0ICogPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy4gSG93ZXZlciBpdCBkb2VzIGFmZmVjdFxuXHQgKiB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnR5LCB3aGVyZWFzIGNoYW5naW5nIHRoZSA8Y29kZT54PC9jb2RlPiB2YWx1ZVxuXHQgKiBkb2VzIDxpPm5vdDwvaT4gYWZmZWN0IHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHkuXG5cdCAqXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+bGVmdDwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXG5cdCAqIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxlZnQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLng7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGxlZnQodmFsOm51bWJlcilcblx0e1xuXHRcdHRoaXMud2lkdGggKz0gdGhpcy54IC0gdmFsO1xuXHRcdHRoaXMueCA9IHZhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc3VtIG9mIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcmlnaHQodmFsOm51bWJlcilcblx0e1xuXHRcdHRoaXMud2lkdGggPSB2YWwgLSB0aGlzLng7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNpemUgb2YgdGhlIEJveCBvYmplY3QsIGV4cHJlc3NlZCBhcyBhIFZlY3RvcjNEIG9iamVjdCB3aXRoIHRoZVxuXHQgKiB2YWx1ZXMgb2YgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmRcblx0ICogPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNpemUoKTpWZWN0b3IzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX3NpemUgPT0gbnVsbClcblx0XHRcdHRoaXMuX3NpemUgPSBuZXcgVmVjdG9yM0QoKTtcblxuXHRcdHRoaXMuX3NpemUueCA9IHRoaXMud2lkdGg7XG5cdFx0dGhpcy5fc2l6ZS55ID0gdGhpcy5oZWlnaHQ7XG5cdFx0dGhpcy5fc2l6ZS56ID0gdGhpcy5kZXB0aDtcblxuXHRcdHJldHVybiB0aGlzLl9zaXplO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlIGJveC4gQ2hhbmdpbmdcblx0ICogdGhlIDxjb2RlPnRvcDwvY29kZT4gcHJvcGVydHkgb2YgYSBCb3ggb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlXG5cdCAqIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydGllcy4gSG93ZXZlciBpdCBkb2VzIGFmZmVjdFxuXHQgKiB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eSwgd2hlcmVhcyBjaGFuZ2luZyB0aGUgPGNvZGU+eTwvY29kZT5cblx0ICogdmFsdWUgZG9lcyA8aT5ub3Q8L2k+IGFmZmVjdCB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eS5cblx0ICpcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT50b3A8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGVcblx0ICogPGNvZGU+eTwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCB0b3AoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLnk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRvcCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5oZWlnaHQgKz0gKHRoaXMueSAtIHZhbCk7XG5cdFx0dGhpcy55ID0gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBsb2NhdGlvbiBvZiB0aGUgQm94IG9iamVjdCdzIHRvcC1sZWZ0LWZyb250IGNvcm5lciwgZGV0ZXJtaW5lZCBieSB0aGVcblx0ICogPGk+eDwvaT4sIDxpPnk8L2k+IGFuZCA8aT56PC9pPiBjb29yZGluYXRlcyBvZiB0aGUgcG9pbnQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRvcExlZnRGcm9udCgpOlZlY3RvcjNEXG5cdHtcblx0XHRpZiAodGhpcy5fdG9wTGVmdEZyb250ID09IG51bGwpXG5cdFx0XHR0aGlzLl90b3BMZWZ0RnJvbnQgPSBuZXcgVmVjdG9yM0QoKTtcblxuXHRcdHRoaXMuX3RvcExlZnRGcm9udC54ID0gdGhpcy54O1xuXHRcdHRoaXMuX3RvcExlZnRGcm9udC55ID0gdGhpcy55O1xuXHRcdHRoaXMuX3RvcExlZnRGcm9udC56ID0gdGhpcy56O1xuXG5cdFx0cmV0dXJuIHRoaXMuX3RvcExlZnRGcm9udDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IEJveCBvYmplY3Qgd2l0aCB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIHNwZWNpZmllZCBieSB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+IGFuZCA8Y29kZT56PC9jb2RlPiBwYXJhbWV0ZXJzIGFuZCB3aXRoIHRoZVxuXHQgKiBzcGVjaWZpZWQgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT5cblx0ICogcGFyYW1ldGVycy4gSWYgeW91IGNhbGwgdGhpcyBwdWJsaWMgd2l0aG91dCBwYXJhbWV0ZXJzLCBhIGJveCB3aXRoXG5cdCAqIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcblx0ICogPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgc2V0IHRvIDAgaXMgY3JlYXRlZC5cblx0ICpcblx0ICogQHBhcmFtIHggICAgICBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgIGJveC5cblx0ICogQHBhcmFtIHkgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgIGJveC5cblx0ICogQHBhcmFtIHogICAgICBUaGUgPGk+ejwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgIGJveC5cblx0ICogQHBhcmFtIHdpZHRoICBUaGUgd2lkdGggb2YgdGhlIGJveCwgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGJveCwgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gZGVwdGggVGhlIGRlcHRoIG9mIHRoZSBib3gsIGluIHBpeGVscy5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHg6bnVtYmVyID0gMCwgeTpudW1iZXIgPSAwLCB6Om51bWJlciA9IDAsIHdpZHRoOm51bWJlciA9IDAsIGhlaWdodDpudW1iZXIgPSAwLCBkZXB0aDpudW1iZXIgPSAwKVxuXHR7XG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHRcdHRoaXMueiA9IHo7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMuZGVwdGggPSBkZXB0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IEJveCBvYmplY3Qgd2l0aCB0aGUgc2FtZSB2YWx1ZXMgZm9yIHRoZSA8Y29kZT54PC9jb2RlPixcblx0ICogPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIDxjb2RlPmhlaWdodDwvY29kZT5cblx0ICogYW5kIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzIGFzIHRoZSBvcmlnaW5hbCBCb3ggb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIEEgbmV3IEJveCBvYmplY3Qgd2l0aCB0aGUgc2FtZSB2YWx1ZXMgZm9yIHRoZSA8Y29kZT54PC9jb2RlPixcblx0ICogICAgICAgICA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcblx0ICogICAgICAgICA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBhcyB0aGVcblx0ICogICAgICAgICBvcmlnaW5hbCBCb3ggb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6Qm94XG5cdHtcblx0XHRyZXR1cm4gbmV3IEJveCh0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5kZXB0aCk7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaXMgY29udGFpbmVkIHdpdGhpbiB0aGUgY3ViaWNcblx0ICogcmVnaW9uIGRlZmluZWQgYnkgdGhpcyBCb3ggb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0geCBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZShob3Jpem9udGFsIGNvbXBvbmVudCkgb2YgdGhlIHBvc2l0aW9uLlxuXHQgKiBAcGFyYW0geSBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSh2ZXJ0aWNhbCBjb21wb25lbnQpIG9mIHRoZSBwb3NpdGlvbi5cblx0ICogQHBhcmFtIHogVGhlIDxpPno8L2k+IGNvb3JkaW5hdGUobG9uZ2l0dWRpbmFsIGNvbXBvbmVudCkgb2YgdGhlIHBvc2l0aW9uLlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIEJveCBvYmplY3QgY29udGFpbnMgdGhlXG5cdCAqICAgICAgICAgc3BlY2lmaWVkIHBvc2l0aW9uOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGNvbnRhaW5zKHg6bnVtYmVyLCB5Om51bWJlciwgejpudW1iZXIpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54IDw9IHggJiYgdGhpcy54ICsgdGhpcy53aWR0aCA+PSB4ICYmIHRoaXMueSA8PSB5ICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHkgJiYgdGhpcy56IDw9IHogJiYgdGhpcy56ICsgdGhpcy5kZXB0aCA+PSB6KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpcyBjb250YWluZWQgd2l0aGluIHRoZSBjdWJpY1xuXHQgKiByZWdpb24gZGVmaW5lZCBieSB0aGlzIEJveCBvYmplY3QuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlXG5cdCAqIDxjb2RlPkJveC5jb250YWlucygpPC9jb2RlPiBtZXRob2QsIGV4Y2VwdCB0aGF0IGl0IHRha2VzIGEgVmVjdG9yM0Rcblx0ICogb2JqZWN0IGFzIGEgcGFyYW1ldGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHBvc2l0aW9uLCBhcyByZXByZXNlbnRlZCBieSBpdHMgPGk+eDwvaT4sIDxpPnk8L2k+IGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgPGk+ejwvaT4gY29vcmRpbmF0ZXMuXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgQm94IG9iamVjdCBjb250YWlucyB0aGVcblx0ICogICAgICAgICBzcGVjaWZpZWQgcG9zaXRpb247IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgY29udGFpbnNQb2ludChwb3NpdGlvbjpWZWN0b3IzRCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPD0gcG9zaXRpb24ueCAmJiB0aGlzLnggKyB0aGlzLndpZHRoID49IHBvc2l0aW9uLnggJiYgdGhpcy55IDw9IHBvc2l0aW9uLnkgJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPj0gcG9zaXRpb24ueSAmJiB0aGlzLnogPD0gcG9zaXRpb24ueiAmJiB0aGlzLnogKyB0aGlzLmRlcHRoID49IHBvc2l0aW9uLnopO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgQm94IG9iamVjdCBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPmJveDwvY29kZT5cblx0ICogcGFyYW1ldGVyIGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBCb3ggb2JqZWN0LiBBIEJveCBvYmplY3QgaXMgc2FpZCB0b1xuXHQgKiBjb250YWluIGFub3RoZXIgaWYgdGhlIHNlY29uZCBCb3ggb2JqZWN0IGZhbGxzIGVudGlyZWx5IHdpdGhpbiB0aGVcblx0ICogYm91bmRhcmllcyBvZiB0aGUgZmlyc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBib3ggVGhlIEJveCBvYmplY3QgYmVpbmcgY2hlY2tlZC5cblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBCb3ggb2JqZWN0IHRoYXQgeW91IHNwZWNpZnlcblx0ICogICAgICAgICBpcyBjb250YWluZWQgYnkgdGhpcyBCb3ggb2JqZWN0OyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGNvbnRhaW5zUmVjdChib3g6Qm94KTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMueCA8PSBib3gueCAmJiB0aGlzLnggKyB0aGlzLndpZHRoID49IGJveC54ICsgYm94LndpZHRoICYmIHRoaXMueSA8PSBib3gueSAmJiB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSBib3gueSArIGJveC5oZWlnaHQgJiYgdGhpcy56IDw9IGJveC56ICYmIHRoaXMueiArIHRoaXMuZGVwdGggPj0gYm94LnogKyBib3guZGVwdGgpXG5cdH1cblxuXHQvKipcblx0ICogQ29waWVzIGFsbCBvZiBib3ggZGF0YSBmcm9tIHRoZSBzb3VyY2UgQm94IG9iamVjdCBpbnRvIHRoZSBjYWxsaW5nXG5cdCAqIEJveCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2VCb3ggVGhlIEJveCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGNvcHlGcm9tKHNvdXJjZUJveDpCb3gpXG5cdHtcblx0XHQvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG9iamVjdCBzcGVjaWZpZWQgaW4gdGhlIDxjb2RlPnRvQ29tcGFyZTwvY29kZT5cblx0ICogcGFyYW1ldGVyIGlzIGVxdWFsIHRvIHRoaXMgQm94IG9iamVjdC4gVGhpcyBtZXRob2QgY29tcGFyZXMgdGhlXG5cdCAqIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcblx0ICogPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IGFnYWluc3Rcblx0ICogdGhlIHNhbWUgcHJvcGVydGllcyBvZiB0aGlzIEJveCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB0b0NvbXBhcmUgVGhlIGJveCB0byBjb21wYXJlIHRvIHRoaXMgQm94IG9iamVjdC5cblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBvYmplY3QgaGFzIGV4YWN0bHkgdGhlIHNhbWVcblx0ICogICAgICAgICB2YWx1ZXMgZm9yIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LFxuXHQgKiAgICAgICAgIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+XG5cdCAqICAgICAgICAgcHJvcGVydGllcyBhcyB0aGlzIEJveCBvYmplY3Q7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZXF1YWxzKHRvQ29tcGFyZTpCb3gpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54ID09IHRvQ29tcGFyZS54ICYmIHRoaXMueSA9PSB0b0NvbXBhcmUueSAmJiB0aGlzLnogPT0gdG9Db21wYXJlLnogJiYgdGhpcy53aWR0aCA9PSB0b0NvbXBhcmUud2lkdGggJiYgdGhpcy5oZWlnaHQgPT0gdG9Db21wYXJlLmhlaWdodCAmJiB0aGlzLmRlcHRoID09IHRvQ29tcGFyZS5kZXB0aClcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmNyZWFzZXMgdGhlIHNpemUgb2YgdGhlIEJveCBvYmplY3QgYnkgdGhlIHNwZWNpZmllZCBhbW91bnRzLCBpblxuXHQgKiBwaXhlbHMuIFRoZSBjZW50ZXIgcG9pbnQgb2YgdGhlIEJveCBvYmplY3Qgc3RheXMgdGhlIHNhbWUsIGFuZCBpdHNcblx0ICogc2l6ZSBpbmNyZWFzZXMgdG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGJ5IHRoZSA8Y29kZT5keDwvY29kZT4gdmFsdWUsIHRvXG5cdCAqIHRoZSB0b3AgYW5kIHRoZSBib3R0b20gYnkgdGhlIDxjb2RlPmR5PC9jb2RlPiB2YWx1ZSwgYW5kIHRvXG5cdCAqIHRoZSBmcm9udCBhbmQgdGhlIGJhY2sgYnkgdGhlIDxjb2RlPmR6PC9jb2RlPiB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtIGR4IFRoZSB2YWx1ZSB0byBiZSBhZGRlZCB0byB0aGUgbGVmdCBhbmQgdGhlIHJpZ2h0IG9mIHRoZSBCb3hcblx0ICogICAgICAgICAgIG9iamVjdC4gVGhlIGZvbGxvd2luZyBlcXVhdGlvbiBpcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbmV3XG5cdCAqICAgICAgICAgICB3aWR0aCBhbmQgcG9zaXRpb24gb2YgdGhlIGJveDpcblx0ICogQHBhcmFtIGR5IFRoZSB2YWx1ZSB0byBiZSBhZGRlZCB0byB0aGUgdG9wIGFuZCB0aGUgYm90dG9tIG9mIHRoZSBCb3hcblx0ICogICAgICAgICAgIG9iamVjdC4gVGhlIGZvbGxvd2luZyBlcXVhdGlvbiBpcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbmV3XG5cdCAqICAgICAgICAgICBoZWlnaHQgYW5kIHBvc2l0aW9uIG9mIHRoZSBib3g6XG5cdCAqIEBwYXJhbSBkeiBUaGUgdmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIGZyb250IGFuZCB0aGUgYmFjayBvZiB0aGUgQm94XG5cdCAqICAgICAgICAgICBvYmplY3QuIFRoZSBmb2xsb3dpbmcgZXF1YXRpb24gaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5ld1xuXHQgKiAgICAgICAgICAgZGVwdGggYW5kIHBvc2l0aW9uIG9mIHRoZSBib3g6XG5cdCAqL1xuXHRwdWJsaWMgaW5mbGF0ZShkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy54IC09IGR4LzI7XG5cdFx0dGhpcy55IC09IGR5LzI7XG5cdFx0dGhpcy56IC09IGR6LzI7XG5cdFx0dGhpcy53aWR0aCArPSBkeC8yO1xuXHRcdHRoaXMuaGVpZ2h0ICs9IGR5LzI7XG5cdFx0dGhpcy5kZXB0aCArPSBkei8yO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluY3JlYXNlcyB0aGUgc2l6ZSBvZiB0aGUgQm94IG9iamVjdC4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byB0aGVcblx0ICogPGNvZGU+Qm94LmluZmxhdGUoKTwvY29kZT4gbWV0aG9kIGV4Y2VwdCBpdCB0YWtlcyBhIFZlY3RvcjNEIG9iamVjdCBhc1xuXHQgKiBhIHBhcmFtZXRlci5cblx0ICpcblx0ICogPHA+VGhlIGZvbGxvd2luZyB0d28gY29kZSBleGFtcGxlcyBnaXZlIHRoZSBzYW1lIHJlc3VsdDo8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBkZWx0YSBUaGUgPGNvZGU+eDwvY29kZT4gcHJvcGVydHkgb2YgdGhpcyBWZWN0b3IzRCBvYmplY3QgaXMgdXNlZCB0b1xuXHQgKiAgICAgICAgICAgICAgaW5jcmVhc2UgdGhlIGhvcml6b250YWwgZGltZW5zaW9uIG9mIHRoZSBCb3ggb2JqZWN0LlxuXHQgKiAgICAgICAgICAgICAgVGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IGlzIHVzZWQgdG8gaW5jcmVhc2UgdGhlIHZlcnRpY2FsXG5cdCAqICAgICAgICAgICAgICBkaW1lbnNpb24gb2YgdGhlIEJveCBvYmplY3QuXG5cdCAqICAgICAgICAgICAgICBUaGUgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgaXMgdXNlZCB0byBpbmNyZWFzZSB0aGVcblx0ICogICAgICAgICAgICAgIGxvbmdpdHVkaW5hbCBkaW1lbnNpb24gb2YgdGhlIEJveCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgaW5mbGF0ZVBvaW50KGRlbHRhOlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy54IC09IGRlbHRhLngvMjtcblx0XHR0aGlzLnkgLT0gZGVsdGEueS8yO1xuXHRcdHRoaXMueiAtPSBkZWx0YS56LzI7XG5cdFx0dGhpcy53aWR0aCArPSBkZWx0YS54LzI7XG5cdFx0dGhpcy5oZWlnaHQgKz0gZGVsdGEueS8yO1xuXHRcdHRoaXMuZGVwdGggKz0gZGVsdGEuei8yO1xuXHR9XG5cblx0LyoqXG5cdCAqIElmIHRoZSBCb3ggb2JqZWN0IHNwZWNpZmllZCBpbiB0aGUgPGNvZGU+dG9JbnRlcnNlY3Q8L2NvZGU+IHBhcmFtZXRlclxuXHQgKiBpbnRlcnNlY3RzIHdpdGggdGhpcyBCb3ggb2JqZWN0LCByZXR1cm5zIHRoZSBhcmVhIG9mIGludGVyc2VjdGlvblxuXHQgKiBhcyBhIEJveCBvYmplY3QuIElmIHRoZSBib3hlcyBkbyBub3QgaW50ZXJzZWN0LCB0aGlzIG1ldGhvZCByZXR1cm5zIGFuXG5cdCAqIGVtcHR5IEJveCBvYmplY3Qgd2l0aCBpdHMgcHJvcGVydGllcyBzZXQgdG8gMC5cblx0ICpcblx0ICogQHBhcmFtIHRvSW50ZXJzZWN0IFRoZSBCb3ggb2JqZWN0IHRvIGNvbXBhcmUgYWdhaW5zdCB0byBzZWUgaWYgaXRcblx0ICogICAgICAgICAgICAgICAgICAgIGludGVyc2VjdHMgd2l0aCB0aGlzIEJveCBvYmplY3QuXG5cdCAqIEByZXR1cm4gQSBCb3ggb2JqZWN0IHRoYXQgZXF1YWxzIHRoZSBhcmVhIG9mIGludGVyc2VjdGlvbi4gSWYgdGhlXG5cdCAqICAgICAgICAgYm94ZXMgZG8gbm90IGludGVyc2VjdCwgdGhpcyBtZXRob2QgcmV0dXJucyBhbiBlbXB0eSBCb3hcblx0ICogICAgICAgICBvYmplY3Q7IHRoYXQgaXMsIGEgYm94IHdpdGggaXRzIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPixcblx0ICogICAgICAgICA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCAgPGNvZGU+aGVpZ2h0PC9jb2RlPiwgYW5kXG5cdCAqICAgICAgICAgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgc2V0IHRvIDAuXG5cdCAqL1xuXHRwdWJsaWMgaW50ZXJzZWN0aW9uKHRvSW50ZXJzZWN0OkJveCk6Qm94XG5cdHtcblx0XHRpZiAodGhpcy5pbnRlcnNlY3RzKHRvSW50ZXJzZWN0KSkge1xuXHRcdFx0dmFyIGk6Qm94ID0gbmV3IEJveCgpO1xuXG5cdFx0XHRpZiAodGhpcy54ID4gdG9JbnRlcnNlY3QueCkge1xuXHRcdFx0XHRpLnggPSB0aGlzLng7XG5cdFx0XHRcdGkud2lkdGggPSB0b0ludGVyc2VjdC54IC0gdGhpcy54ICsgdG9JbnRlcnNlY3Qud2lkdGg7XG5cblx0XHRcdFx0aWYgKGkud2lkdGggPiB0aGlzLndpZHRoKVxuXHRcdFx0XHRcdGkud2lkdGggPSB0aGlzLndpZHRoO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aS54ID0gdG9JbnRlcnNlY3QueDtcblx0XHRcdFx0aS53aWR0aCA9IHRoaXMueCAtIHRvSW50ZXJzZWN0LnggKyB0aGlzLndpZHRoO1xuXG5cdFx0XHRcdGlmIChpLndpZHRoID4gdG9JbnRlcnNlY3Qud2lkdGgpXG5cdFx0XHRcdFx0aS53aWR0aCA9IHRvSW50ZXJzZWN0LndpZHRoO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy55ID4gdG9JbnRlcnNlY3QueSkge1xuXHRcdFx0XHRpLnkgPSB0aGlzLnk7XG5cdFx0XHRcdGkuaGVpZ2h0ID0gdG9JbnRlcnNlY3QueSAtIHRoaXMueSArIHRvSW50ZXJzZWN0LmhlaWdodDtcblxuXHRcdFx0XHRpZiAoaS5oZWlnaHQgPiB0aGlzLmhlaWdodClcblx0XHRcdFx0XHRpLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aS55ID0gdG9JbnRlcnNlY3QueTtcblx0XHRcdFx0aS5oZWlnaHQgPSB0aGlzLnkgLSB0b0ludGVyc2VjdC55ICsgdGhpcy5oZWlnaHQ7XG5cblx0XHRcdFx0aWYgKGkuaGVpZ2h0ID4gdG9JbnRlcnNlY3QuaGVpZ2h0KVxuXHRcdFx0XHRcdGkuaGVpZ2h0ID0gdG9JbnRlcnNlY3QuaGVpZ2h0O1xuXHRcdFx0fVxuXG5cblx0XHRcdGlmICh0aGlzLnogPiB0b0ludGVyc2VjdC56KSB7XG5cdFx0XHRcdGkueiA9IHRoaXMuejtcblx0XHRcdFx0aS5kZXB0aCA9IHRvSW50ZXJzZWN0LnogLSB0aGlzLnogKyB0b0ludGVyc2VjdC5kZXB0aDtcblxuXHRcdFx0XHRpZiAoaS5kZXB0aCA+IHRoaXMuZGVwdGgpXG5cdFx0XHRcdFx0aS5kZXB0aCA9IHRoaXMuZGVwdGg7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpLnogPSB0b0ludGVyc2VjdC56O1xuXHRcdFx0XHRpLmRlcHRoID0gdGhpcy56IC0gdG9JbnRlcnNlY3QueiArIHRoaXMuZGVwdGg7XG5cblx0XHRcdFx0aWYgKGkuZGVwdGggPiB0b0ludGVyc2VjdC5kZXB0aClcblx0XHRcdFx0XHRpLmRlcHRoID0gdG9JbnRlcnNlY3QuZGVwdGg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgQm94KCk7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBvYmplY3Qgc3BlY2lmaWVkIGluIHRoZSA8Y29kZT50b0ludGVyc2VjdDwvY29kZT5cblx0ICogcGFyYW1ldGVyIGludGVyc2VjdHMgd2l0aCB0aGlzIEJveCBvYmplY3QuIFRoaXMgbWV0aG9kIGNoZWNrcyB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+LCBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgb2YgdGhlIHNwZWNpZmllZFxuXHQgKiBCb3ggb2JqZWN0IHRvIHNlZSBpZiBpdCBpbnRlcnNlY3RzIHdpdGggdGhpcyBCb3ggb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gdG9JbnRlcnNlY3QgVGhlIEJveCBvYmplY3QgdG8gY29tcGFyZSBhZ2FpbnN0IHRoaXMgQm94IG9iamVjdC5cblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IGludGVyc2VjdHNcblx0ICogICAgICAgICB3aXRoIHRoaXMgQm94IG9iamVjdDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBpbnRlcnNlY3RzKHRvSW50ZXJzZWN0OkJveCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggKyB0aGlzLndpZHRoID4gdG9JbnRlcnNlY3QueCAmJiB0aGlzLnggPCB0b0ludGVyc2VjdC54ICsgdG9JbnRlcnNlY3Qud2lkdGggJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPiB0b0ludGVyc2VjdC55ICYmIHRoaXMueSA8IHRvSW50ZXJzZWN0LnkgKyB0b0ludGVyc2VjdC5oZWlnaHQgJiYgdGhpcy56ICsgdGhpcy5kZXB0aCA+IHRvSW50ZXJzZWN0LnogJiYgdGhpcy56IDwgdG9JbnRlcnNlY3QueiArIHRvSW50ZXJzZWN0LmRlcHRoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoaXMgQm94IG9iamVjdCBpcyBlbXB0eS5cblx0ICpcblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBCb3ggb2JqZWN0J3Mgd2lkdGgsIGhlaWdodCBvclxuXHQgKiAgICAgICAgIGRlcHRoIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byAwOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGlzRW1wdHkoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMueCA9PSAwICYmIHRoaXMueSA9PSAwICYmIHRoaXMueiA9PSAwICYmIHRoaXMud2lkdGggPT0gMCAmJiB0aGlzLmhlaWdodCA9PSAwICYmIHRoaXMuZGVwdGggPT0gMCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgbG9jYXRpb24gb2YgdGhlIEJveCBvYmplY3QsIGFzIGRldGVybWluZWQgYnkgaXRzXG5cdCAqIHRvcC1sZWZ0LWZyb250IGNvcm5lciwgYnkgdGhlIHNwZWNpZmllZCBhbW91bnRzLlxuXHQgKlxuXHQgKiBAcGFyYW0gZHggTW92ZXMgdGhlIDxpPng8L2k+IHZhbHVlIG9mIHRoZSBCb3ggb2JqZWN0IGJ5IHRoaXMgYW1vdW50LlxuXHQgKiBAcGFyYW0gZHkgTW92ZXMgdGhlIDxpPnk8L2k+IHZhbHVlIG9mIHRoZSBCb3ggb2JqZWN0IGJ5IHRoaXMgYW1vdW50LlxuXHQgKiBAcGFyYW0gZHogTW92ZXMgdGhlIDxpPno8L2k+IHZhbHVlIG9mIHRoZSBCb3ggb2JqZWN0IGJ5IHRoaXMgYW1vdW50LlxuXHQgKi9cblx0cHVibGljIG9mZnNldChkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy54ICs9IGR4O1xuXHRcdHRoaXMueSArPSBkeTtcblx0XHR0aGlzLnogKz0gZHo7XG5cdH1cblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgbG9jYXRpb24gb2YgdGhlIEJveCBvYmplY3QgdXNpbmcgYSBWZWN0b3IzRCBvYmplY3QgYXMgYVxuXHQgKiBwYXJhbWV0ZXIuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlIDxjb2RlPkJveC5vZmZzZXQoKTwvY29kZT5cblx0ICogbWV0aG9kLCBleGNlcHQgdGhhdCBpdCB0YWtlcyBhIFZlY3RvcjNEIG9iamVjdCBhcyBhIHBhcmFtZXRlci5cblx0ICpcblx0ICogQHBhcmFtIHBvc2l0aW9uIEEgVmVjdG9yM0Qgb2JqZWN0IHRvIHVzZSB0byBvZmZzZXQgdGhpcyBCb3ggb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIG9mZnNldFBvc2l0aW9uKHBvc2l0aW9uOlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy54ICs9IHBvc2l0aW9uLng7XG5cdFx0dGhpcy55ICs9IHBvc2l0aW9uLnk7XG5cdFx0dGhpcy56ICs9IHBvc2l0aW9uLno7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBhbGwgb2YgdGhlIEJveCBvYmplY3QncyBwcm9wZXJ0aWVzIHRvIDAuIEEgQm94IG9iamVjdCBpcyBlbXB0eSBpZiBpdHNcblx0ICogd2lkdGgsIGhlaWdodCBvciBkZXB0aCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMC5cblx0ICpcblx0ICogPHA+IFRoaXMgbWV0aG9kIHNldHMgdGhlIHZhbHVlcyBvZiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxuXHQgKiA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+LCBhbmRcblx0ICogPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgdG8gMC48L3A+XG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc2V0RW1wdHkoKVxuXHR7XG5cdFx0dGhpcy54ID0gMDtcblx0XHR0aGlzLnkgPSAwO1xuXHRcdHRoaXMueiA9IDA7XG5cdFx0dGhpcy53aWR0aCA9IDA7XG5cdFx0dGhpcy5oZWlnaHQgPSAwO1xuXHRcdHRoaXMuZGVwdGggPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIG1lbWJlcnMgb2YgQm94IHRvIHRoZSBzcGVjaWZpZWQgdmFsdWVzXG5cdCAqXG5cdCAqIEBwYXJhbSB4YSAgICAgIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgIGJveC5cblx0ICogQHBhcmFtIHlhICAgICAgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgYm94LlxuXHQgKiBAcGFyYW0geXogICAgICBUaGUgPGk+ejwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICBib3guXG5cdCAqIEBwYXJhbSB3aWR0aGEgIFRoZSB3aWR0aCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXG5cdCAqIEBwYXJhbSBoZWlnaHRhIFRoZSBoZWlnaHQgb2YgdGhlIGJveCwgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gZGVwdGhhICBUaGUgZGVwdGggb2YgdGhlIGJveCwgaW4gcGl4ZWxzLlxuXHQgKi9cblx0cHVibGljIHNldFRvKHhhOm51bWJlciwgeWE6bnVtYmVyLCB6YTpudW1iZXIsIHdpZHRoYTpudW1iZXIsIGhlaWdodGE6bnVtYmVyLCBkZXB0aGE6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy54ID0geGE7XG5cdFx0dGhpcy55ID0geWE7XG5cdFx0dGhpcy56ID0gemE7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoYTtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodGE7XG5cdFx0dGhpcy5kZXB0aCA9IGRlcHRoYTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZHMgYW5kIHJldHVybnMgYSBzdHJpbmcgdGhhdCBsaXN0cyB0aGUgaG9yaXpvbnRhbCwgdmVydGljYWwgYW5kXG5cdCAqIGxvbmdpdHVkaW5hbCBwb3NpdGlvbnMgYW5kIHRoZSB3aWR0aCwgaGVpZ2h0IGFuZCBkZXB0aCBvZiB0aGUgQm94IG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiBBIHN0cmluZyBsaXN0aW5nIHRoZSB2YWx1ZSBvZiBlYWNoIG9mIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBvZlxuXHQgKiAgICAgICAgIHRoZSBCb3ggb2JqZWN0OiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LFxuXHQgKiAgICAgICAgIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPiwgYW5kIDxjb2RlPmRlcHRoPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIFwiW0JveF0gKHg9XCIgKyB0aGlzLnggKyBcIiwgeT1cIiArIHRoaXMueSArIFwiLCB6PVwiICsgdGhpcy56ICsgXCIsIHdpZHRoPVwiICsgdGhpcy53aWR0aCArIFwiLCBoZWlnaHQ9XCIgKyB0aGlzLmhlaWdodCArIFwiLCBkZXB0aD1cIiArIHRoaXMuZGVwdGggKyBcIilcIjtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIHR3byBib3hlcyB0b2dldGhlciB0byBjcmVhdGUgYSBuZXcgQm94IG9iamVjdCwgYnkgZmlsbGluZ1xuXHQgKiBpbiB0aGUgaG9yaXpvbnRhbCwgdmVydGljYWwgYW5kIGxvbmdpdHVkaW5hbCBzcGFjZSBiZXR3ZWVuIHRoZSB0d28gYm94ZXMuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGUgPGNvZGU+dW5pb24oKTwvY29kZT4gbWV0aG9kIGlnbm9yZXMgYm94ZXMgd2l0aFxuXHQgKiA8Y29kZT4wPC9jb2RlPiBhcyB0aGUgaGVpZ2h0LCB3aWR0aCBvciBkZXB0aCB2YWx1ZSwgc3VjaCBhczogPGNvZGU+dmFyXG5cdCAqIGJveDI6Qm94ID0gbmV3IEJveCgzMDAsMzAwLDMwMCw1MCw1MCwwKTs8L2NvZGU+PC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gdG9VbmlvbiBBIEJveCBvYmplY3QgdG8gYWRkIHRvIHRoaXMgQm94IG9iamVjdC5cblx0ICogQHJldHVybiBBIG5ldyBCb3ggb2JqZWN0IHRoYXQgaXMgdGhlIHVuaW9uIG9mIHRoZSB0d28gYm94ZXMuXG5cdCAqL1xuXHRwdWJsaWMgdW5pb24odG9VbmlvbjpCb3gpOkJveFxuXHR7XG5cdFx0dmFyIHU6Qm94ID0gbmV3IEJveCgpO1xuXG5cdFx0aWYgKHRoaXMueCA8IHRvVW5pb24ueCkge1xuXHRcdFx0dS54ID0gdGhpcy54O1xuXHRcdFx0dS53aWR0aCA9IHRvVW5pb24ueCAtIHRoaXMueCArIHRvVW5pb24ud2lkdGg7XG5cblx0XHRcdGlmICh1LndpZHRoIDwgdGhpcy53aWR0aClcblx0XHRcdFx0dS53aWR0aCA9IHRoaXMud2lkdGg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHUueCA9IHRvVW5pb24ueDtcblx0XHRcdHUud2lkdGggPSB0aGlzLnggLSB0b1VuaW9uLnggKyB0aGlzLndpZHRoO1xuXG5cdFx0XHRpZiAodS53aWR0aCA8IHRvVW5pb24ud2lkdGgpXG5cdFx0XHRcdHUud2lkdGggPSB0b1VuaW9uLndpZHRoO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnkgPCB0b1VuaW9uLnkpIHtcblx0XHRcdHUueSA9IHRoaXMueTtcblx0XHRcdHUuaGVpZ2h0ID0gdG9Vbmlvbi55IC0gdGhpcy55ICsgdG9Vbmlvbi5oZWlnaHQ7XG5cblx0XHRcdGlmICh1LmhlaWdodCA8IHRoaXMuaGVpZ2h0KVxuXHRcdFx0XHR1LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR1LnkgPSB0b1VuaW9uLnk7XG5cdFx0XHR1LmhlaWdodCA9IHRoaXMueSAtIHRvVW5pb24ueSArIHRoaXMuaGVpZ2h0O1xuXG5cdFx0XHRpZiAodS5oZWlnaHQgPCB0b1VuaW9uLmhlaWdodClcblx0XHRcdFx0dS5oZWlnaHQgPSB0b1VuaW9uLmhlaWdodDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy56IDwgdG9Vbmlvbi56KSB7XG5cdFx0XHR1LnogPSB0aGlzLno7XG5cdFx0XHR1LmRlcHRoID0gdG9Vbmlvbi56IC0gdGhpcy56ICsgdG9Vbmlvbi5kZXB0aDtcblxuXHRcdFx0aWYgKHUuZGVwdGggPCB0aGlzLmRlcHRoKVxuXHRcdFx0XHR1LmRlcHRoID0gdGhpcy5kZXB0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dS56ID0gdG9Vbmlvbi56O1xuXHRcdFx0dS5kZXB0aCA9IHRoaXMueiAtIHRvVW5pb24ueiArIHRoaXMuZGVwdGg7XG5cblx0XHRcdGlmICh1LmRlcHRoIDwgdG9Vbmlvbi5kZXB0aClcblx0XHRcdFx0dS5kZXB0aCA9IHRvVW5pb24uZGVwdGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHU7XG5cdH1cbn1cblxuZXhwb3J0ID0gQm94OyJdfQ==