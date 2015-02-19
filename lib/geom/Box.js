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
    Box.prototype.containsBox = function (box) {
        return (this.x <= box.x && this.x + this.width >= box.x + box.width && this.y <= box.y && this.y + this.height >= box.y + box.height && this.z <= box.z && this.z + this.depth >= box.z + box.depth);
    };
    /**
     * Copies all of box data from the source Box object into the calling
     * Box object.
     *
     * @param sourceBox The Box object from which to copy the data.
     */
    Box.prototype.copyFrom = function (sourceBox) {
        this.x = sourceBox.x;
        this.y = sourceBox.y;
        this.z = sourceBox.z;
        this.width = sourceBox.width;
        this.height = sourceBox.height;
        this.depth = sourceBox.depth;
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
    Box.prototype.rayIntersection = function (position, direction, targetNormal) {
        if (this.containsPoint(position))
            return 0;
        var halfExtentsX = this.width / 2;
        var halfExtentsY = this.height / 2;
        var halfExtentsZ = this.depth / 2;
        var centerX = this.x + halfExtentsX;
        var centerY = this.y + halfExtentsY;
        var centerZ = this.z + halfExtentsZ;
        var px = position.x - centerX;
        var py = position.y - centerY;
        var pz = position.z - centerZ;
        var vx = direction.x;
        var vy = direction.y;
        var vz = direction.z;
        var ix;
        var iy;
        var iz;
        var rayEntryDistance;
        // ray-plane tests
        var intersects;
        if (vx < 0) {
            rayEntryDistance = (halfExtentsX - px) / vx;
            if (rayEntryDistance > 0) {
                iy = py + rayEntryDistance * vy;
                iz = pz + rayEntryDistance * vz;
                if (iy > -halfExtentsY && iy < halfExtentsY && iz > -halfExtentsZ && iz < halfExtentsZ) {
                    targetNormal.x = 1;
                    targetNormal.y = 0;
                    targetNormal.z = 0;
                    intersects = true;
                }
            }
        }
        if (!intersects && vx > 0) {
            rayEntryDistance = (-halfExtentsX - px) / vx;
            if (rayEntryDistance > 0) {
                iy = py + rayEntryDistance * vy;
                iz = pz + rayEntryDistance * vz;
                if (iy > -halfExtentsY && iy < halfExtentsY && iz > -halfExtentsZ && iz < halfExtentsZ) {
                    targetNormal.x = -1;
                    targetNormal.y = 0;
                    targetNormal.z = 0;
                    intersects = true;
                }
            }
        }
        if (!intersects && vy < 0) {
            rayEntryDistance = (halfExtentsY - py) / vy;
            if (rayEntryDistance > 0) {
                ix = px + rayEntryDistance * vx;
                iz = pz + rayEntryDistance * vz;
                if (ix > -halfExtentsX && ix < halfExtentsX && iz > -halfExtentsZ && iz < halfExtentsZ) {
                    targetNormal.x = 0;
                    targetNormal.y = 1;
                    targetNormal.z = 0;
                    intersects = true;
                }
            }
        }
        if (!intersects && vy > 0) {
            rayEntryDistance = (-halfExtentsY - py) / vy;
            if (rayEntryDistance > 0) {
                ix = px + rayEntryDistance * vx;
                iz = pz + rayEntryDistance * vz;
                if (ix > -halfExtentsX && ix < halfExtentsX && iz > -halfExtentsZ && iz < halfExtentsZ) {
                    targetNormal.x = 0;
                    targetNormal.y = -1;
                    targetNormal.z = 0;
                    intersects = true;
                }
            }
        }
        if (!intersects && vz < 0) {
            rayEntryDistance = (halfExtentsZ - pz) / vz;
            if (rayEntryDistance > 0) {
                ix = px + rayEntryDistance * vx;
                iy = py + rayEntryDistance * vy;
                if (iy > -halfExtentsY && iy < halfExtentsY && ix > -halfExtentsX && ix < halfExtentsX) {
                    targetNormal.x = 0;
                    targetNormal.y = 0;
                    targetNormal.z = 1;
                    intersects = true;
                }
            }
        }
        if (!intersects && vz > 0) {
            rayEntryDistance = (-halfExtentsZ - pz) / vz;
            if (rayEntryDistance > 0) {
                ix = px + rayEntryDistance * vx;
                iy = py + rayEntryDistance * vy;
                if (iy > -halfExtentsY && iy < halfExtentsY && ix > -halfExtentsX && ix < halfExtentsX) {
                    targetNormal.x = 0;
                    targetNormal.y = 0;
                    targetNormal.z = -1;
                    intersects = true;
                }
            }
        }
        return intersects ? rayEntryDistance : -1;
    };
    /**
     * Finds the closest point on the Box to another given point. This can be used for maximum error calculations for content within a given Box.
     *
     * @param point The point for which to find the closest point on the Box
     * @param target An optional Vector3D to store the result to prevent creating a new object.
     * @return
     */
    Box.prototype.closestPointToPoint = function (point, target) {
        if (target === void 0) { target = null; }
        var p;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL0JveC50cyJdLCJuYW1lcyI6WyJCb3giLCJCb3guY29uc3RydWN0b3IiLCJCb3guYmFjayIsIkJveC5ib3R0b20iLCJCb3guYm90dG9tUmlnaHRCYWNrIiwiQm94LmZyb250IiwiQm94LmxlZnQiLCJCb3gucmlnaHQiLCJCb3guc2l6ZSIsIkJveC50b3AiLCJCb3gudG9wTGVmdEZyb250IiwiQm94LmNsb25lIiwiQm94LmNvbnRhaW5zIiwiQm94LmNvbnRhaW5zUG9pbnQiLCJCb3guY29udGFpbnNCb3giLCJCb3guY29weUZyb20iLCJCb3guZXF1YWxzIiwiQm94LmluZmxhdGUiLCJCb3guaW5mbGF0ZVBvaW50IiwiQm94LmludGVyc2VjdGlvbiIsIkJveC5pbnRlcnNlY3RzIiwiQm94LnJheUludGVyc2VjdGlvbiIsIkJveC5jbG9zZXN0UG9pbnRUb1BvaW50IiwiQm94LmlzRW1wdHkiLCJCb3gub2Zmc2V0IiwiQm94Lm9mZnNldFBvc2l0aW9uIiwiQm94LnNldEVtcHR5IiwiQm94LnNldFRvIiwiQm94LnRvU3RyaW5nIiwiQm94LnVuaW9uIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLFFBQVEsV0FBZSwrQkFBK0IsQ0FBQyxDQUFDO0FBRS9ELEFBNEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FERztJQUNHLEdBQUc7SUFvTlJBOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCR0E7SUFDSEEsU0F0T0tBLEdBQUdBLENBc09JQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxLQUFnQkEsRUFBRUEsTUFBaUJBLEVBQUVBLEtBQWdCQTtRQUEvRkMsaUJBQVlBLEdBQVpBLEtBQVlBO1FBQUVBLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFBRUEscUJBQWdCQSxHQUFoQkEsU0FBZ0JBO1FBQUVBLHNCQUFpQkEsR0FBakJBLFVBQWlCQTtRQUFFQSxxQkFBZ0JBLEdBQWhC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QUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBRW5CQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDbkJBLENBQUNBO1lBQ0ZBLENBQUNBO1FBQ0ZBLENBQUNBO1FBQ0RBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNCQSxnQkFBZ0JBLEdBQUdBLENBQUVBLENBQUNBLFlBQVlBLEdBQUdBLEVBQUVBLENBQUVBLEdBQUNBLEVBQUVBLENBQUNBO1lBQzdDQSxFQUFFQSxDQUFDQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsZ0JBQWdCQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFDOUJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLGdCQUFnQkEsR0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQzlCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDeEZBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNwQkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO2dCQUNuQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLGdCQUFnQkEsR0FBR0EsQ0FBRUEsWUFBWUEsR0FBR0EsRUFBRUEsQ0FBRUEsR0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDNUNBLEVBQUVBLENBQUNBLENBQUNBLGdCQUFnQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxnQkFBZ0JBLEdBQUNBLEVBQUVBLENBQUNBO2dCQUM5QkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsZ0JBQWdCQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFDOUJBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO29CQUN4RkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ25CQSxDQUFDQTtZQUNGQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxVQUFVQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQkEsZ0JBQWdCQSxHQUFHQSxDQUFFQSxDQUFDQSxZQUFZQSxHQUFHQSxFQUFFQSxDQUFFQSxHQUFDQSxFQUFFQSxDQUFDQTtZQUM3Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLGdCQUFnQkEsR0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQzlCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxnQkFBZ0JBLEdBQUNBLEVBQUVBLENBQUNBO2dCQUM5QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsWUFBWUEsSUFBSUEsRUFBRUEsR0FBR0EsWUFBWUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsWUFBWUEsSUFBSUEsRUFBRUEsR0FBR0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hGQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNwQkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDbkJBLENBQUNBO1lBQ0ZBLENBQUNBO1FBQ0ZBLENBQUNBO1FBQ0RBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNCQSxnQkFBZ0JBLEdBQUdBLENBQUVBLFlBQVlBLEdBQUdBLEVBQUVBLENBQUVBLEdBQUNBLEVBQUVBLENBQUNBO1lBQzVDQSxFQUFFQSxDQUFDQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsZ0JBQWdCQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFDOUJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLGdCQUFnQkEsR0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQzlCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDeEZBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO2dCQUNuQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLGdCQUFnQkEsR0FBR0EsQ0FBRUEsQ0FBQ0EsWUFBWUEsR0FBR0EsRUFBRUEsQ0FBRUEsR0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDN0NBLEVBQUVBLENBQUNBLENBQUNBLGdCQUFnQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxnQkFBZ0JBLEdBQUNBLEVBQUVBLENBQUNBO2dCQUM5QkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsZ0JBQWdCQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFDOUJBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO29CQUN4RkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNwQkEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ25CQSxDQUFDQTtZQUNGQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEQSxNQUFNQSxDQUFDQSxVQUFVQSxHQUFFQSxnQkFBZ0JBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO0lBQzFDQSxDQUFDQTtJQUVEckI7Ozs7OztPQU1HQTtJQUNJQSxpQ0FBbUJBLEdBQTFCQSxVQUEyQkEsS0FBY0EsRUFBRUEsTUFBc0JBO1FBQXRCc0Isc0JBQXNCQSxHQUF0QkEsYUFBc0JBO1FBRWhFQSxJQUFJQSxDQUFRQSxDQUFDQTtRQUViQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUNsQkEsTUFBTUEsR0FBR0EsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFFekJBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ1pBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ2RBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQ1pBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBQzNCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN6QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFYkEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDWkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDNUJBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQzFCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNkQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNaQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUViQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNaQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNkQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNaQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUMzQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDekJBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRWJBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO0lBQ2ZBLENBQUNBO0lBRUR0Qjs7Ozs7T0FLR0E7SUFDSUEscUJBQU9BLEdBQWRBO1FBRUN1QixNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM5R0EsQ0FBQ0E7SUFFRHZCOzs7Ozs7O09BT0dBO0lBQ0lBLG9CQUFNQSxHQUFiQSxVQUFjQSxFQUFTQSxFQUFFQSxFQUFTQSxFQUFFQSxFQUFTQTtRQUU1Q3dCLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENB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T0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaEJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBRTFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDM0JBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO1FBQzFCQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDYkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFFL0NBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO2dCQUMxQkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDekJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ2hCQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUU1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQzdCQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7UUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO1lBRTdDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDeEJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1FBQ3ZCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoQkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFFMUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO2dCQUMzQkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO0lBQ1ZBLENBQUNBO0lBQ0Y3QixVQUFDQTtBQUFEQSxDQXJ3QkEsQUFxd0JDQSxJQUFBO0FBRUQsQUFBYSxpQkFBSixHQUFHLENBQUMiLCJmaWxlIjoiZ2VvbS9Cb3guanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5cclxuLyoqXHJcbiAqIEEgQm94IG9iamVjdCBpcyBhbiBhcmVhIGRlZmluZWQgYnkgaXRzIHBvc2l0aW9uLCBhcyBpbmRpY2F0ZWQgYnkgaXRzXHJcbiAqIHRvcC1sZWZ0LWZyb250IGNvcm5lciBwb2ludCg8aT54PC9pPiwgPGk+eTwvaT4sIDxpPno8L2k+KSBhbmQgYnkgaXRzIHdpZHRoLFxyXG4gKiBoZWlnaHQgYW5kIGRlcHRoLlxyXG4gKlxyXG4gKlxyXG4gKiA8cD5UaGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxyXG4gKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzIG9mIHRoZSBCb3ggY2xhc3MgYXJlXHJcbiAqIGluZGVwZW5kZW50IG9mIGVhY2ggb3RoZXI7IGNoYW5naW5nIHRoZSB2YWx1ZSBvZiBvbmUgcHJvcGVydHkgaGFzIG5vIGVmZmVjdFxyXG4gKiBvbiB0aGUgb3RoZXJzLiBIb3dldmVyLCB0aGUgPGNvZGU+cmlnaHQ8L2NvZGU+LCA8Y29kZT5ib3R0b208L2NvZGU+IGFuZFxyXG4gKiA8Y29kZT5iYWNrPC9jb2RlPiBwcm9wZXJ0aWVzIGFyZSBpbnRlZ3JhbGx5IHJlbGF0ZWQgdG8gdGhvc2Ugc2l4XHJcbiAqIHByb3BlcnRpZXMuIEZvciBleGFtcGxlLCBpZiB5b3UgY2hhbmdlIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+cmlnaHQ8L2NvZGU+XHJcbiAqIHByb3BlcnR5LCB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSBjaGFuZ2VzOyBpZiB5b3VcclxuICogY2hhbmdlIHRoZSA8Y29kZT5ib3R0b208L2NvZGU+IHByb3BlcnR5LCB0aGUgdmFsdWUgb2YgdGhlXHJcbiAqIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHkgY2hhbmdlcy4gPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgZm9sbG93aW5nIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdXNlIEJveCBvYmplY3RzOjwvcD5cclxuICpcclxuICogPHVsPlxyXG4gKiAgIDxsaT5UaGUgPGNvZGU+Ym91bmRzPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgRGlzcGxheU9iamVjdCBjbGFzczwvbGk+XHJcbiAqIDwvdWw+XHJcbiAqXHJcbiAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5uZXcgQm94KCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhXHJcbiAqIEJveCBvYmplY3QuPC9wPlxyXG4gKlxyXG4gKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIEJveCBjbGFzcyBkb2VzIG5vdCBkZWZpbmUgYSBjdWJpYyBTaGFwZVxyXG4gKiBkaXNwbGF5IG9iamVjdC5cclxuICovXHJcbmNsYXNzIEJveFxyXG57XHJcblx0cHJpdmF0ZSBfc2l6ZTpWZWN0b3IzRDtcclxuXHRwcml2YXRlIF9ib3R0b21SaWdodEJhY2s6VmVjdG9yM0Q7XHJcblx0cHJpdmF0ZSBfdG9wTGVmdEZyb250OlZlY3RvcjNEO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgaGVpZ2h0IG9mIHRoZSBib3gsIGluIHBpeGVscy4gQ2hhbmdpbmcgdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gdmFsdWVcclxuXHQgKiBvZiBhIEJveCBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPno8L2NvZGU+LCA8Y29kZT5kZXB0aDwvY29kZT4gYW5kIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoZWlnaHQ6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgd2lkdGggb2YgdGhlIGJveCwgaW4gcGl4ZWxzLiBDaGFuZ2luZyB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IHZhbHVlXHJcblx0ICogb2YgYSBCb3ggb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPixcclxuXHQgKiA8Y29kZT56PC9jb2RlPiwgPGNvZGU+ZGVwdGg8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMuXHJcblx0ICovXHJcblx0cHVibGljIHdpZHRoOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRlb3RoIG9mIHRoZSBib3gsIGluIHBpeGVscy4gQ2hhbmdpbmcgdGhlIDxjb2RlPmRlcHRoPC9jb2RlPiB2YWx1ZVxyXG5cdCAqIG9mIGEgQm94IG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXHJcblx0ICogPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkZXB0aDpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlIGJveC5cclxuXHQgKiBDaGFuZ2luZyB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5IG9mIGEgQm94IG9iamVjdCBoYXMgbm9cclxuXHQgKiBlZmZlY3Qgb24gdGhlIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgdGhlXHJcblx0ICogPGNvZGU+bGVmdDwvY29kZT4gcHJvcGVydHkuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB4Om51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGUgYm94LlxyXG5cdCAqIENoYW5naW5nIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgb2YgYSBCb3ggb2JqZWN0IGhhcyBub1xyXG5cdCAqIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXHJcblx0ICogPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGVcclxuXHQgKiA8Y29kZT50b3A8L2NvZGU+IHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgeTpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlIGJveC5cclxuXHQgKiBDaGFuZ2luZyB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IG9mIGEgQm94IG9iamVjdCBoYXMgbm9cclxuXHQgKiBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgdGhlXHJcblx0ICogPGNvZGU+ZnJvbnQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgejpudW1iZXJcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHN1bSBvZiB0aGUgPGNvZGU+ejwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJhY2soKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy56ICsgdGhpcy5kZXB0aDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYmFjayh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuZGVwdGggPSB2YWwgLSB0aGlzLno7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgc3VtIG9mIHRoZSA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYm90dG9tKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBib3R0b20odmFsOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLmhlaWdodCA9IHZhbCAtIHRoaXMueTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsb2NhdGlvbiBvZiB0aGUgQm94IG9iamVjdCdzIGJvdHRvbS1yaWdodCBjb3JuZXIsIGRldGVybWluZWQgYnkgdGhlXHJcblx0ICogdmFsdWVzIG9mIHRoZSA8Y29kZT5yaWdodDwvY29kZT4gYW5kIDxjb2RlPmJvdHRvbTwvY29kZT4gcHJvcGVydGllcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJvdHRvbVJpZ2h0QmFjaygpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2JvdHRvbVJpZ2h0QmFjayA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9ib3R0b21SaWdodEJhY2sgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHJcblx0XHR0aGlzLl9ib3R0b21SaWdodEJhY2sueCA9IHRoaXMueCArIHRoaXMud2lkdGg7XHJcblx0XHR0aGlzLl9ib3R0b21SaWdodEJhY2sueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xyXG5cdFx0dGhpcy5fYm90dG9tUmlnaHRCYWNrLnogPSB0aGlzLnogKyB0aGlzLmRlcHRoO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9ib3R0b21SaWdodEJhY2s7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgPGk+ejwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZSBib3guIENoYW5naW5nXHJcblx0ICogdGhlIDxjb2RlPmZyb250PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIEJveCBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGVcclxuXHQgKiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPlxyXG5cdCAqIHByb3BlcnRpZXMuIEhvd2V2ZXIgaXQgZG9lcyBhZmZlY3QgdGhlIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0eSxcclxuXHQgKiB3aGVyZWFzIGNoYW5naW5nIHRoZSA8Y29kZT56PC9jb2RlPiB2YWx1ZSBkb2VzIDxpPm5vdDwvaT4gYWZmZWN0IHRoZVxyXG5cdCAqIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0eS5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+bGVmdDwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXHJcblx0ICogdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGZyb250KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuejtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZnJvbnQodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLmRlcHRoICs9IHRoaXMueiAtIHZhbDtcclxuXHRcdHRoaXMueiA9IHZhbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlIGJveC4gQ2hhbmdpbmcgdGhlXHJcblx0ICogPGNvZGU+bGVmdDwvY29kZT4gcHJvcGVydHkgb2YgYSBCb3ggb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlXHJcblx0ICogPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcy4gSG93ZXZlciBpdCBkb2VzIGFmZmVjdFxyXG5cdCAqIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHksIHdoZXJlYXMgY2hhbmdpbmcgdGhlIDxjb2RlPng8L2NvZGU+IHZhbHVlXHJcblx0ICogZG9lcyA8aT5ub3Q8L2k+IGFmZmVjdCB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnR5LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5sZWZ0PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2ZcclxuXHQgKiB0aGUgPGNvZGU+eDwvY29kZT4gcHJvcGVydHkuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbGVmdCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLng7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGxlZnQodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLndpZHRoICs9IHRoaXMueCAtIHZhbDtcclxuXHRcdHRoaXMueCA9IHZhbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBzdW0gb2YgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydGllcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHJpZ2h0KHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy53aWR0aCA9IHZhbCAtIHRoaXMueDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBzaXplIG9mIHRoZSBCb3ggb2JqZWN0LCBleHByZXNzZWQgYXMgYSBWZWN0b3IzRCBvYmplY3Qgd2l0aCB0aGVcclxuXHQgKiB2YWx1ZXMgb2YgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNpemUoKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9zaXplID09IG51bGwpXHJcblx0XHRcdHRoaXMuX3NpemUgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHJcblx0XHR0aGlzLl9zaXplLnggPSB0aGlzLndpZHRoO1xyXG5cdFx0dGhpcy5fc2l6ZS55ID0gdGhpcy5oZWlnaHQ7XHJcblx0XHR0aGlzLl9zaXplLnogPSB0aGlzLmRlcHRoO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zaXplO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGUgYm94LiBDaGFuZ2luZ1xyXG5cdCAqIHRoZSA8Y29kZT50b3A8L2NvZGU+IHByb3BlcnR5IG9mIGEgQm94IG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZVxyXG5cdCAqIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydGllcy4gSG93ZXZlciBpdCBkb2VzIGFmZmVjdFxyXG5cdCAqIHRoZSA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnR5LCB3aGVyZWFzIGNoYW5naW5nIHRoZSA8Y29kZT55PC9jb2RlPlxyXG5cdCAqIHZhbHVlIGRvZXMgPGk+bm90PC9pPiBhZmZlY3QgdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHkuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPnRvcDwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZVxyXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRvcCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLnk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRvcCh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuaGVpZ2h0ICs9ICh0aGlzLnkgLSB2YWwpO1xyXG5cdFx0dGhpcy55ID0gdmFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGxvY2F0aW9uIG9mIHRoZSBCb3ggb2JqZWN0J3MgdG9wLWxlZnQtZnJvbnQgY29ybmVyLCBkZXRlcm1pbmVkIGJ5IHRoZVxyXG5cdCAqIDxpPng8L2k+LCA8aT55PC9pPiBhbmQgPGk+ejwvaT4gY29vcmRpbmF0ZXMgb2YgdGhlIHBvaW50LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdG9wTGVmdEZyb250KCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fdG9wTGVmdEZyb250ID09IG51bGwpXHJcblx0XHRcdHRoaXMuX3RvcExlZnRGcm9udCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cclxuXHRcdHRoaXMuX3RvcExlZnRGcm9udC54ID0gdGhpcy54O1xyXG5cdFx0dGhpcy5fdG9wTGVmdEZyb250LnkgPSB0aGlzLnk7XHJcblx0XHR0aGlzLl90b3BMZWZ0RnJvbnQueiA9IHRoaXMuejtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fdG9wTGVmdEZyb250O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBCb3ggb2JqZWN0IHdpdGggdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBzcGVjaWZpZWQgYnkgdGhlXHJcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+IGFuZCA8Y29kZT56PC9jb2RlPiBwYXJhbWV0ZXJzIGFuZCB3aXRoIHRoZVxyXG5cdCAqIHNwZWNpZmllZCA8Y29kZT53aWR0aDwvY29kZT4sIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kIDxjb2RlPmRlcHRoPC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlcnMuIElmIHlvdSBjYWxsIHRoaXMgcHVibGljIHdpdGhvdXQgcGFyYW1ldGVycywgYSBib3ggd2l0aFxyXG5cdCAqIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcclxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBzZXQgdG8gMCBpcyBjcmVhdGVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgICBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgYm94LlxyXG5cdCAqIEBwYXJhbSB5ICAgICAgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgIGJveC5cclxuXHQgKiBAcGFyYW0geiAgICAgIFRoZSA8aT56PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICBib3guXHJcblx0ICogQHBhcmFtIHdpZHRoICBUaGUgd2lkdGggb2YgdGhlIGJveCwgaW4gcGl4ZWxzLlxyXG5cdCAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXHJcblx0ICogQHBhcmFtIGRlcHRoIFRoZSBkZXB0aCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoeDpudW1iZXIgPSAwLCB5Om51bWJlciA9IDAsIHo6bnVtYmVyID0gMCwgd2lkdGg6bnVtYmVyID0gMCwgaGVpZ2h0Om51bWJlciA9IDAsIGRlcHRoOm51bWJlciA9IDApXHJcblx0e1xyXG5cdFx0dGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHJcblx0XHR0aGlzLnogPSB6O1xyXG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHR0aGlzLmRlcHRoID0gZGVwdGg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgbmV3IEJveCBvYmplY3Qgd2l0aCB0aGUgc2FtZSB2YWx1ZXMgZm9yIHRoZSA8Y29kZT54PC9jb2RlPixcclxuXHQgKiA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPlxyXG5cdCAqIGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBhcyB0aGUgb3JpZ2luYWwgQm94IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gQSBuZXcgQm94IG9iamVjdCB3aXRoIHRoZSBzYW1lIHZhbHVlcyBmb3IgdGhlIDxjb2RlPng8L2NvZGU+LFxyXG5cdCAqICAgICAgICAgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXHJcblx0ICogICAgICAgICA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBhcyB0aGVcclxuXHQgKiAgICAgICAgIG9yaWdpbmFsIEJveCBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6Qm94XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBCb3godGhpcy54LCB0aGlzLnksIHRoaXMueiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuZGVwdGgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaXMgY29udGFpbmVkIHdpdGhpbiB0aGUgY3ViaWNcclxuXHQgKiByZWdpb24gZGVmaW5lZCBieSB0aGlzIEJveCBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0geCBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZShob3Jpem9udGFsIGNvbXBvbmVudCkgb2YgdGhlIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSB5IFRoZSA8aT55PC9pPiBjb29yZGluYXRlKHZlcnRpY2FsIGNvbXBvbmVudCkgb2YgdGhlIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSB6IFRoZSA8aT56PC9pPiBjb29yZGluYXRlKGxvbmdpdHVkaW5hbCBjb21wb25lbnQpIG9mIHRoZSBwb3NpdGlvbi5cclxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIEJveCBvYmplY3QgY29udGFpbnMgdGhlXHJcblx0ICogICAgICAgICBzcGVjaWZpZWQgcG9zaXRpb247IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGNvbnRhaW5zKHg6bnVtYmVyLCB5Om51bWJlciwgejpudW1iZXIpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gKHRoaXMueCA8PSB4ICYmIHRoaXMueCArIHRoaXMud2lkdGggPj0geCAmJiB0aGlzLnkgPD0geSAmJiB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSB5ICYmIHRoaXMueiA8PSB6ICYmIHRoaXMueiArIHRoaXMuZGVwdGggPj0geik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpcyBjb250YWluZWQgd2l0aGluIHRoZSBjdWJpY1xyXG5cdCAqIHJlZ2lvbiBkZWZpbmVkIGJ5IHRoaXMgQm94IG9iamVjdC4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byB0aGVcclxuXHQgKiA8Y29kZT5Cb3guY29udGFpbnMoKTwvY29kZT4gbWV0aG9kLCBleGNlcHQgdGhhdCBpdCB0YWtlcyBhIFZlY3RvcjNEXHJcblx0ICogb2JqZWN0IGFzIGEgcGFyYW1ldGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiwgYXMgcmVwcmVzZW50ZWQgYnkgaXRzIDxpPng8L2k+LCA8aT55PC9pPiBhbmRcclxuXHQgKiAgICAgICAgICAgICAgICAgPGk+ejwvaT4gY29vcmRpbmF0ZXMuXHJcblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBCb3ggb2JqZWN0IGNvbnRhaW5zIHRoZVxyXG5cdCAqICAgICAgICAgc3BlY2lmaWVkIHBvc2l0aW9uOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb250YWluc1BvaW50KHBvc2l0aW9uOlZlY3RvcjNEKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuICh0aGlzLnggPD0gcG9zaXRpb24ueCAmJiB0aGlzLnggKyB0aGlzLndpZHRoID49IHBvc2l0aW9uLnggJiYgdGhpcy55IDw9IHBvc2l0aW9uLnkgJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPj0gcG9zaXRpb24ueSAmJiB0aGlzLnogPD0gcG9zaXRpb24ueiAmJiB0aGlzLnogKyB0aGlzLmRlcHRoID49IHBvc2l0aW9uLnopO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBCb3ggb2JqZWN0IHNwZWNpZmllZCBieSB0aGUgPGNvZGU+Ym94PC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlciBpcyBjb250YWluZWQgd2l0aGluIHRoaXMgQm94IG9iamVjdC4gQSBCb3ggb2JqZWN0IGlzIHNhaWQgdG9cclxuXHQgKiBjb250YWluIGFub3RoZXIgaWYgdGhlIHNlY29uZCBCb3ggb2JqZWN0IGZhbGxzIGVudGlyZWx5IHdpdGhpbiB0aGVcclxuXHQgKiBib3VuZGFyaWVzIG9mIHRoZSBmaXJzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBib3ggVGhlIEJveCBvYmplY3QgYmVpbmcgY2hlY2tlZC5cclxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIEJveCBvYmplY3QgdGhhdCB5b3Ugc3BlY2lmeVxyXG5cdCAqICAgICAgICAgaXMgY29udGFpbmVkIGJ5IHRoaXMgQm94IG9iamVjdDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgY29udGFpbnNCb3goYm94OkJveCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiAodGhpcy54IDw9IGJveC54ICYmIHRoaXMueCArIHRoaXMud2lkdGggPj0gYm94LnggKyBib3gud2lkdGggJiYgdGhpcy55IDw9IGJveC55ICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IGJveC55ICsgYm94LmhlaWdodCAmJiB0aGlzLnogPD0gYm94LnogJiYgdGhpcy56ICsgdGhpcy5kZXB0aCA+PSBib3gueiArIGJveC5kZXB0aClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvcGllcyBhbGwgb2YgYm94IGRhdGEgZnJvbSB0aGUgc291cmNlIEJveCBvYmplY3QgaW50byB0aGUgY2FsbGluZ1xyXG5cdCAqIEJveCBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc291cmNlQm94IFRoZSBCb3ggb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSB0aGUgZGF0YS5cclxuXHQgKi9cclxuXHRwdWJsaWMgY29weUZyb20oc291cmNlQm94OkJveClcclxuXHR7XHJcblx0XHR0aGlzLnggPSBzb3VyY2VCb3gueDtcclxuXHRcdHRoaXMueSA9IHNvdXJjZUJveC55O1xyXG5cdFx0dGhpcy56ID0gc291cmNlQm94Lno7XHJcblx0XHR0aGlzLndpZHRoID0gc291cmNlQm94LndpZHRoO1xyXG5cdFx0dGhpcy5oZWlnaHQgPSBzb3VyY2VCb3guaGVpZ2h0O1xyXG5cdFx0dGhpcy5kZXB0aCA9IHNvdXJjZUJveC5kZXB0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgb2JqZWN0IHNwZWNpZmllZCBpbiB0aGUgPGNvZGU+dG9Db21wYXJlPC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlciBpcyBlcXVhbCB0byB0aGlzIEJveCBvYmplY3QuIFRoaXMgbWV0aG9kIGNvbXBhcmVzIHRoZVxyXG5cdCAqIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcclxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYWdhaW5zdFxyXG5cdCAqIHRoZSBzYW1lIHByb3BlcnRpZXMgb2YgdGhpcyBCb3ggb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRvQ29tcGFyZSBUaGUgYm94IHRvIGNvbXBhcmUgdG8gdGhpcyBCb3ggb2JqZWN0LlxyXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgb2JqZWN0IGhhcyBleGFjdGx5IHRoZSBzYW1lXHJcblx0ICogICAgICAgICB2YWx1ZXMgZm9yIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LFxyXG5cdCAqICAgICAgICAgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT5cclxuXHQgKiAgICAgICAgIHByb3BlcnRpZXMgYXMgdGhpcyBCb3ggb2JqZWN0OyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBlcXVhbHModG9Db21wYXJlOkJveCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiAodGhpcy54ID09IHRvQ29tcGFyZS54ICYmIHRoaXMueSA9PSB0b0NvbXBhcmUueSAmJiB0aGlzLnogPT0gdG9Db21wYXJlLnogJiYgdGhpcy53aWR0aCA9PSB0b0NvbXBhcmUud2lkdGggJiYgdGhpcy5oZWlnaHQgPT0gdG9Db21wYXJlLmhlaWdodCAmJiB0aGlzLmRlcHRoID09IHRvQ29tcGFyZS5kZXB0aClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluY3JlYXNlcyB0aGUgc2l6ZSBvZiB0aGUgQm94IG9iamVjdCBieSB0aGUgc3BlY2lmaWVkIGFtb3VudHMsIGluXHJcblx0ICogcGl4ZWxzLiBUaGUgY2VudGVyIHBvaW50IG9mIHRoZSBCb3ggb2JqZWN0IHN0YXlzIHRoZSBzYW1lLCBhbmQgaXRzXHJcblx0ICogc2l6ZSBpbmNyZWFzZXMgdG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGJ5IHRoZSA8Y29kZT5keDwvY29kZT4gdmFsdWUsIHRvXHJcblx0ICogdGhlIHRvcCBhbmQgdGhlIGJvdHRvbSBieSB0aGUgPGNvZGU+ZHk8L2NvZGU+IHZhbHVlLCBhbmQgdG9cclxuXHQgKiB0aGUgZnJvbnQgYW5kIHRoZSBiYWNrIGJ5IHRoZSA8Y29kZT5kejwvY29kZT4gdmFsdWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZHggVGhlIHZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBsZWZ0IGFuZCB0aGUgcmlnaHQgb2YgdGhlIEJveFxyXG5cdCAqICAgICAgICAgICBvYmplY3QuIFRoZSBmb2xsb3dpbmcgZXF1YXRpb24gaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5ld1xyXG5cdCAqICAgICAgICAgICB3aWR0aCBhbmQgcG9zaXRpb24gb2YgdGhlIGJveDpcclxuXHQgKiBAcGFyYW0gZHkgVGhlIHZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSB0b3AgYW5kIHRoZSBib3R0b20gb2YgdGhlIEJveFxyXG5cdCAqICAgICAgICAgICBvYmplY3QuIFRoZSBmb2xsb3dpbmcgZXF1YXRpb24gaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5ld1xyXG5cdCAqICAgICAgICAgICBoZWlnaHQgYW5kIHBvc2l0aW9uIG9mIHRoZSBib3g6XHJcblx0ICogQHBhcmFtIGR6IFRoZSB2YWx1ZSB0byBiZSBhZGRlZCB0byB0aGUgZnJvbnQgYW5kIHRoZSBiYWNrIG9mIHRoZSBCb3hcclxuXHQgKiAgICAgICAgICAgb2JqZWN0LiBUaGUgZm9sbG93aW5nIGVxdWF0aW9uIGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBuZXdcclxuXHQgKiAgICAgICAgICAgZGVwdGggYW5kIHBvc2l0aW9uIG9mIHRoZSBib3g6XHJcblx0ICovXHJcblx0cHVibGljIGluZmxhdGUoZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLnggLT0gZHgvMjtcclxuXHRcdHRoaXMueSAtPSBkeS8yO1xyXG5cdFx0dGhpcy56IC09IGR6LzI7XHJcblx0XHR0aGlzLndpZHRoICs9IGR4LzI7XHJcblx0XHR0aGlzLmhlaWdodCArPSBkeS8yO1xyXG5cdFx0dGhpcy5kZXB0aCArPSBkei8yO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5jcmVhc2VzIHRoZSBzaXplIG9mIHRoZSBCb3ggb2JqZWN0LiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxyXG5cdCAqIDxjb2RlPkJveC5pbmZsYXRlKCk8L2NvZGU+IG1ldGhvZCBleGNlcHQgaXQgdGFrZXMgYSBWZWN0b3IzRCBvYmplY3QgYXNcclxuXHQgKiBhIHBhcmFtZXRlci5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgdHdvIGNvZGUgZXhhbXBsZXMgZ2l2ZSB0aGUgc2FtZSByZXN1bHQ6PC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGRlbHRhIFRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGlzIFZlY3RvcjNEIG9iamVjdCBpcyB1c2VkIHRvXHJcblx0ICogICAgICAgICAgICAgIGluY3JlYXNlIHRoZSBob3Jpem9udGFsIGRpbWVuc2lvbiBvZiB0aGUgQm94IG9iamVjdC5cclxuXHQgKiAgICAgICAgICAgICAgVGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IGlzIHVzZWQgdG8gaW5jcmVhc2UgdGhlIHZlcnRpY2FsXHJcblx0ICogICAgICAgICAgICAgIGRpbWVuc2lvbiBvZiB0aGUgQm94IG9iamVjdC5cclxuXHQgKiAgICAgICAgICAgICAgVGhlIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IGlzIHVzZWQgdG8gaW5jcmVhc2UgdGhlXHJcblx0ICogICAgICAgICAgICAgIGxvbmdpdHVkaW5hbCBkaW1lbnNpb24gb2YgdGhlIEJveCBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGluZmxhdGVQb2ludChkZWx0YTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLnggLT0gZGVsdGEueC8yO1xyXG5cdFx0dGhpcy55IC09IGRlbHRhLnkvMjtcclxuXHRcdHRoaXMueiAtPSBkZWx0YS56LzI7XHJcblx0XHR0aGlzLndpZHRoICs9IGRlbHRhLngvMjtcclxuXHRcdHRoaXMuaGVpZ2h0ICs9IGRlbHRhLnkvMjtcclxuXHRcdHRoaXMuZGVwdGggKz0gZGVsdGEuei8yO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSWYgdGhlIEJveCBvYmplY3Qgc3BlY2lmaWVkIGluIHRoZSA8Y29kZT50b0ludGVyc2VjdDwvY29kZT4gcGFyYW1ldGVyXHJcblx0ICogaW50ZXJzZWN0cyB3aXRoIHRoaXMgQm94IG9iamVjdCwgcmV0dXJucyB0aGUgYXJlYSBvZiBpbnRlcnNlY3Rpb25cclxuXHQgKiBhcyBhIEJveCBvYmplY3QuIElmIHRoZSBib3hlcyBkbyBub3QgaW50ZXJzZWN0LCB0aGlzIG1ldGhvZCByZXR1cm5zIGFuXHJcblx0ICogZW1wdHkgQm94IG9iamVjdCB3aXRoIGl0cyBwcm9wZXJ0aWVzIHNldCB0byAwLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRvSW50ZXJzZWN0IFRoZSBCb3ggb2JqZWN0IHRvIGNvbXBhcmUgYWdhaW5zdCB0byBzZWUgaWYgaXRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0cyB3aXRoIHRoaXMgQm94IG9iamVjdC5cclxuXHQgKiBAcmV0dXJuIEEgQm94IG9iamVjdCB0aGF0IGVxdWFscyB0aGUgYXJlYSBvZiBpbnRlcnNlY3Rpb24uIElmIHRoZVxyXG5cdCAqICAgICAgICAgYm94ZXMgZG8gbm90IGludGVyc2VjdCwgdGhpcyBtZXRob2QgcmV0dXJucyBhbiBlbXB0eSBCb3hcclxuXHQgKiAgICAgICAgIG9iamVjdDsgdGhhdCBpcywgYSBib3ggd2l0aCBpdHMgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxyXG5cdCAqICAgICAgICAgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgIDxjb2RlPmhlaWdodDwvY29kZT4sIGFuZFxyXG5cdCAqICAgICAgICAgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgc2V0IHRvIDAuXHJcblx0ICovXHJcblx0cHVibGljIGludGVyc2VjdGlvbih0b0ludGVyc2VjdDpCb3gpOkJveFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLmludGVyc2VjdHModG9JbnRlcnNlY3QpKSB7XHJcblx0XHRcdHZhciBpOkJveCA9IG5ldyBCb3goKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLnggPiB0b0ludGVyc2VjdC54KSB7XHJcblx0XHRcdFx0aS54ID0gdGhpcy54O1xyXG5cdFx0XHRcdGkud2lkdGggPSB0b0ludGVyc2VjdC54IC0gdGhpcy54ICsgdG9JbnRlcnNlY3Qud2lkdGg7XHJcblxyXG5cdFx0XHRcdGlmIChpLndpZHRoID4gdGhpcy53aWR0aClcclxuXHRcdFx0XHRcdGkud2lkdGggPSB0aGlzLndpZHRoO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGkueCA9IHRvSW50ZXJzZWN0Lng7XHJcblx0XHRcdFx0aS53aWR0aCA9IHRoaXMueCAtIHRvSW50ZXJzZWN0LnggKyB0aGlzLndpZHRoO1xyXG5cclxuXHRcdFx0XHRpZiAoaS53aWR0aCA+IHRvSW50ZXJzZWN0LndpZHRoKVxyXG5cdFx0XHRcdFx0aS53aWR0aCA9IHRvSW50ZXJzZWN0LndpZHRoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy55ID4gdG9JbnRlcnNlY3QueSkge1xyXG5cdFx0XHRcdGkueSA9IHRoaXMueTtcclxuXHRcdFx0XHRpLmhlaWdodCA9IHRvSW50ZXJzZWN0LnkgLSB0aGlzLnkgKyB0b0ludGVyc2VjdC5oZWlnaHQ7XHJcblxyXG5cdFx0XHRcdGlmIChpLmhlaWdodCA+IHRoaXMuaGVpZ2h0KVxyXG5cdFx0XHRcdFx0aS5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpLnkgPSB0b0ludGVyc2VjdC55O1xyXG5cdFx0XHRcdGkuaGVpZ2h0ID0gdGhpcy55IC0gdG9JbnRlcnNlY3QueSArIHRoaXMuaGVpZ2h0O1xyXG5cclxuXHRcdFx0XHRpZiAoaS5oZWlnaHQgPiB0b0ludGVyc2VjdC5oZWlnaHQpXHJcblx0XHRcdFx0XHRpLmhlaWdodCA9IHRvSW50ZXJzZWN0LmhlaWdodDtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdGlmICh0aGlzLnogPiB0b0ludGVyc2VjdC56KSB7XHJcblx0XHRcdFx0aS56ID0gdGhpcy56O1xyXG5cdFx0XHRcdGkuZGVwdGggPSB0b0ludGVyc2VjdC56IC0gdGhpcy56ICsgdG9JbnRlcnNlY3QuZGVwdGg7XHJcblxyXG5cdFx0XHRcdGlmIChpLmRlcHRoID4gdGhpcy5kZXB0aClcclxuXHRcdFx0XHRcdGkuZGVwdGggPSB0aGlzLmRlcHRoO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGkueiA9IHRvSW50ZXJzZWN0Lno7XHJcblx0XHRcdFx0aS5kZXB0aCA9IHRoaXMueiAtIHRvSW50ZXJzZWN0LnogKyB0aGlzLmRlcHRoO1xyXG5cclxuXHRcdFx0XHRpZiAoaS5kZXB0aCA+IHRvSW50ZXJzZWN0LmRlcHRoKVxyXG5cdFx0XHRcdFx0aS5kZXB0aCA9IHRvSW50ZXJzZWN0LmRlcHRoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gaTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IEJveCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBvYmplY3Qgc3BlY2lmaWVkIGluIHRoZSA8Y29kZT50b0ludGVyc2VjdDwvY29kZT5cclxuXHQgKiBwYXJhbWV0ZXIgaW50ZXJzZWN0cyB3aXRoIHRoaXMgQm94IG9iamVjdC4gVGhpcyBtZXRob2QgY2hlY2tzIHRoZVxyXG5cdCAqIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcclxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+LCBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgb2YgdGhlIHNwZWNpZmllZFxyXG5cdCAqIEJveCBvYmplY3QgdG8gc2VlIGlmIGl0IGludGVyc2VjdHMgd2l0aCB0aGlzIEJveCBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdG9JbnRlcnNlY3QgVGhlIEJveCBvYmplY3QgdG8gY29tcGFyZSBhZ2FpbnN0IHRoaXMgQm94IG9iamVjdC5cclxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgaW50ZXJzZWN0c1xyXG5cdCAqICAgICAgICAgd2l0aCB0aGlzIEJveCBvYmplY3Q7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGludGVyc2VjdHModG9JbnRlcnNlY3Q6Qm94KTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuICh0aGlzLnggKyB0aGlzLndpZHRoID4gdG9JbnRlcnNlY3QueCAmJiB0aGlzLnggPCB0b0ludGVyc2VjdC54ICsgdG9JbnRlcnNlY3Qud2lkdGggJiYgdGhpcy55ICsgdGhpcy5oZWlnaHQgPiB0b0ludGVyc2VjdC55ICYmIHRoaXMueSA8IHRvSW50ZXJzZWN0LnkgKyB0b0ludGVyc2VjdC5oZWlnaHQgJiYgdGhpcy56ICsgdGhpcy5kZXB0aCA+IHRvSW50ZXJzZWN0LnogJiYgdGhpcy56IDwgdG9JbnRlcnNlY3QueiArIHRvSW50ZXJzZWN0LmRlcHRoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByYXlJbnRlcnNlY3Rpb24ocG9zaXRpb246VmVjdG9yM0QsIGRpcmVjdGlvbjpWZWN0b3IzRCwgdGFyZ2V0Tm9ybWFsOlZlY3RvcjNEKTpudW1iZXJcclxuXHR7XHJcblx0XHRpZiAodGhpcy5jb250YWluc1BvaW50KHBvc2l0aW9uKSlcclxuXHRcdFx0cmV0dXJuIDA7XHJcblxyXG5cdFx0dmFyIGhhbGZFeHRlbnRzWDpudW1iZXIgPSB0aGlzLndpZHRoLzI7XHJcblx0XHR2YXIgaGFsZkV4dGVudHNZOm51bWJlciA9IHRoaXMuaGVpZ2h0LzI7XHJcblx0XHR2YXIgaGFsZkV4dGVudHNaOm51bWJlciA9IHRoaXMuZGVwdGgvMjtcclxuXHJcblx0XHR2YXIgY2VudGVyWDpudW1iZXIgPSB0aGlzLnggKyBoYWxmRXh0ZW50c1g7XHJcblx0XHR2YXIgY2VudGVyWTpudW1iZXIgPSB0aGlzLnkgKyBoYWxmRXh0ZW50c1k7XHJcblx0XHR2YXIgY2VudGVyWjpudW1iZXIgPSB0aGlzLnogKyBoYWxmRXh0ZW50c1o7XHJcblxyXG5cdFx0dmFyIHB4Om51bWJlciA9IHBvc2l0aW9uLnggLSBjZW50ZXJYO1xyXG5cdFx0dmFyIHB5Om51bWJlciA9IHBvc2l0aW9uLnkgLSBjZW50ZXJZO1xyXG5cdFx0dmFyIHB6Om51bWJlciA9IHBvc2l0aW9uLnogLSBjZW50ZXJaO1xyXG5cclxuXHRcdHZhciB2eDpudW1iZXIgPSBkaXJlY3Rpb24ueFxyXG5cdFx0dmFyIHZ5Om51bWJlciA9IGRpcmVjdGlvbi55XHJcblx0XHR2YXIgdno6bnVtYmVyID0gZGlyZWN0aW9uLno7XHJcblxyXG5cdFx0dmFyIGl4Om51bWJlcjtcclxuXHRcdHZhciBpeTpudW1iZXI7XHJcblx0XHR2YXIgaXo6bnVtYmVyO1xyXG5cdFx0dmFyIHJheUVudHJ5RGlzdGFuY2U6bnVtYmVyO1xyXG5cclxuXHRcdC8vIHJheS1wbGFuZSB0ZXN0c1xyXG5cdFx0dmFyIGludGVyc2VjdHM6Ym9vbGVhbjtcclxuXHRcdGlmICh2eCA8IDApIHtcclxuXHRcdFx0cmF5RW50cnlEaXN0YW5jZSA9ICggaGFsZkV4dGVudHNYIC0gcHggKS92eDtcclxuXHRcdFx0aWYgKHJheUVudHJ5RGlzdGFuY2UgPiAwKSB7XHJcblx0XHRcdFx0aXkgPSBweSArIHJheUVudHJ5RGlzdGFuY2Uqdnk7XHJcblx0XHRcdFx0aXogPSBweiArIHJheUVudHJ5RGlzdGFuY2Uqdno7XHJcblx0XHRcdFx0aWYgKGl5ID4gLWhhbGZFeHRlbnRzWSAmJiBpeSA8IGhhbGZFeHRlbnRzWSAmJiBpeiA+IC1oYWxmRXh0ZW50c1ogJiYgaXogPCBoYWxmRXh0ZW50c1opIHtcclxuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC54ID0gMTtcclxuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC55ID0gMDtcclxuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC56ID0gMDtcclxuXHJcblx0XHRcdFx0XHRpbnRlcnNlY3RzID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICghaW50ZXJzZWN0cyAmJiB2eCA+IDApIHtcclxuXHRcdFx0cmF5RW50cnlEaXN0YW5jZSA9ICggLWhhbGZFeHRlbnRzWCAtIHB4ICkvdng7XHJcblx0XHRcdGlmIChyYXlFbnRyeURpc3RhbmNlID4gMCkge1xyXG5cdFx0XHRcdGl5ID0gcHkgKyByYXlFbnRyeURpc3RhbmNlKnZ5O1xyXG5cdFx0XHRcdGl6ID0gcHogKyByYXlFbnRyeURpc3RhbmNlKnZ6O1xyXG5cdFx0XHRcdGlmIChpeSA+IC1oYWxmRXh0ZW50c1kgJiYgaXkgPCBoYWxmRXh0ZW50c1kgJiYgaXogPiAtaGFsZkV4dGVudHNaICYmIGl6IDwgaGFsZkV4dGVudHNaKSB7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueCA9IC0xO1xyXG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnkgPSAwO1xyXG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnogPSAwO1xyXG5cdFx0XHRcdFx0aW50ZXJzZWN0cyA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoIWludGVyc2VjdHMgJiYgdnkgPCAwKSB7XHJcblx0XHRcdHJheUVudHJ5RGlzdGFuY2UgPSAoIGhhbGZFeHRlbnRzWSAtIHB5ICkvdnk7XHJcblx0XHRcdGlmIChyYXlFbnRyeURpc3RhbmNlID4gMCkge1xyXG5cdFx0XHRcdGl4ID0gcHggKyByYXlFbnRyeURpc3RhbmNlKnZ4O1xyXG5cdFx0XHRcdGl6ID0gcHogKyByYXlFbnRyeURpc3RhbmNlKnZ6O1xyXG5cdFx0XHRcdGlmIChpeCA+IC1oYWxmRXh0ZW50c1ggJiYgaXggPCBoYWxmRXh0ZW50c1ggJiYgaXogPiAtaGFsZkV4dGVudHNaICYmIGl6IDwgaGFsZkV4dGVudHNaKSB7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueCA9IDA7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueSA9IDE7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueiA9IDA7XHJcblx0XHRcdFx0XHRpbnRlcnNlY3RzID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICghaW50ZXJzZWN0cyAmJiB2eSA+IDApIHtcclxuXHRcdFx0cmF5RW50cnlEaXN0YW5jZSA9ICggLWhhbGZFeHRlbnRzWSAtIHB5ICkvdnk7XHJcblx0XHRcdGlmIChyYXlFbnRyeURpc3RhbmNlID4gMCkge1xyXG5cdFx0XHRcdGl4ID0gcHggKyByYXlFbnRyeURpc3RhbmNlKnZ4O1xyXG5cdFx0XHRcdGl6ID0gcHogKyByYXlFbnRyeURpc3RhbmNlKnZ6O1xyXG5cdFx0XHRcdGlmIChpeCA+IC1oYWxmRXh0ZW50c1ggJiYgaXggPCBoYWxmRXh0ZW50c1ggJiYgaXogPiAtaGFsZkV4dGVudHNaICYmIGl6IDwgaGFsZkV4dGVudHNaKSB7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueCA9IDA7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueSA9IC0xO1xyXG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnogPSAwO1xyXG5cdFx0XHRcdFx0aW50ZXJzZWN0cyA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoIWludGVyc2VjdHMgJiYgdnogPCAwKSB7XHJcblx0XHRcdHJheUVudHJ5RGlzdGFuY2UgPSAoIGhhbGZFeHRlbnRzWiAtIHB6ICkvdno7XHJcblx0XHRcdGlmIChyYXlFbnRyeURpc3RhbmNlID4gMCkge1xyXG5cdFx0XHRcdGl4ID0gcHggKyByYXlFbnRyeURpc3RhbmNlKnZ4O1xyXG5cdFx0XHRcdGl5ID0gcHkgKyByYXlFbnRyeURpc3RhbmNlKnZ5O1xyXG5cdFx0XHRcdGlmIChpeSA+IC1oYWxmRXh0ZW50c1kgJiYgaXkgPCBoYWxmRXh0ZW50c1kgJiYgaXggPiAtaGFsZkV4dGVudHNYICYmIGl4IDwgaGFsZkV4dGVudHNYKSB7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueCA9IDA7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueSA9IDA7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueiA9IDE7XHJcblx0XHRcdFx0XHRpbnRlcnNlY3RzID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICghaW50ZXJzZWN0cyAmJiB2eiA+IDApIHtcclxuXHRcdFx0cmF5RW50cnlEaXN0YW5jZSA9ICggLWhhbGZFeHRlbnRzWiAtIHB6ICkvdno7XHJcblx0XHRcdGlmIChyYXlFbnRyeURpc3RhbmNlID4gMCkge1xyXG5cdFx0XHRcdGl4ID0gcHggKyByYXlFbnRyeURpc3RhbmNlKnZ4O1xyXG5cdFx0XHRcdGl5ID0gcHkgKyByYXlFbnRyeURpc3RhbmNlKnZ5O1xyXG5cdFx0XHRcdGlmIChpeSA+IC1oYWxmRXh0ZW50c1kgJiYgaXkgPCBoYWxmRXh0ZW50c1kgJiYgaXggPiAtaGFsZkV4dGVudHNYICYmIGl4IDwgaGFsZkV4dGVudHNYKSB7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueCA9IDA7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueSA9IDA7XHJcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueiA9IC0xO1xyXG5cdFx0XHRcdFx0aW50ZXJzZWN0cyA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGludGVyc2VjdHM/IHJheUVudHJ5RGlzdGFuY2UgOiAtMTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmRzIHRoZSBjbG9zZXN0IHBvaW50IG9uIHRoZSBCb3ggdG8gYW5vdGhlciBnaXZlbiBwb2ludC4gVGhpcyBjYW4gYmUgdXNlZCBmb3IgbWF4aW11bSBlcnJvciBjYWxjdWxhdGlvbnMgZm9yIGNvbnRlbnQgd2l0aGluIGEgZ2l2ZW4gQm94LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCBmb3Igd2hpY2ggdG8gZmluZCB0aGUgY2xvc2VzdCBwb2ludCBvbiB0aGUgQm94XHJcblx0ICogQHBhcmFtIHRhcmdldCBBbiBvcHRpb25hbCBWZWN0b3IzRCB0byBzdG9yZSB0aGUgcmVzdWx0IHRvIHByZXZlbnQgY3JlYXRpbmcgYSBuZXcgb2JqZWN0LlxyXG5cdCAqIEByZXR1cm5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2xvc2VzdFBvaW50VG9Qb2ludChwb2ludDpWZWN0b3IzRCwgdGFyZ2V0OlZlY3RvcjNEID0gbnVsbCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHR2YXIgcDpudW1iZXI7XHJcblxyXG5cdFx0aWYgKHRhcmdldCA9PSBudWxsKVxyXG5cdFx0XHR0YXJnZXQgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHJcblx0XHRwID0gcG9pbnQueDtcclxuXHRcdGlmIChwIDwgdGhpcy54KVxyXG5cdFx0XHRwID0gdGhpcy54O1xyXG5cdFx0aWYgKHAgPiB0aGlzLnggKyB0aGlzLndpZHRoKVxyXG5cdFx0XHRwID0gdGhpcy54ICsgdGhpcy53aWR0aDtcclxuXHRcdHRhcmdldC54ID0gcDtcclxuXHJcblx0XHRwID0gcG9pbnQueTtcclxuXHRcdGlmIChwIDwgdGhpcy55ICsgdGhpcy5oZWlnaHQpXHJcblx0XHRcdHAgPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcclxuXHRcdGlmIChwID4gdGhpcy55KVxyXG5cdFx0XHRwID0gdGhpcy55O1xyXG5cdFx0dGFyZ2V0LnkgPSBwO1xyXG5cclxuXHRcdHAgPSBwb2ludC56O1xyXG5cdFx0aWYgKHAgPCB0aGlzLnopXHJcblx0XHRcdHAgPSB0aGlzLno7XHJcblx0XHRpZiAocCA+IHRoaXMueiArIHRoaXMuZGVwdGgpXHJcblx0XHRcdHAgPSB0aGlzLnogKyB0aGlzLmRlcHRoO1xyXG5cdFx0dGFyZ2V0LnogPSBwO1xyXG5cclxuXHRcdHJldHVybiB0YXJnZXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoaXMgQm94IG9iamVjdCBpcyBlbXB0eS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgQm94IG9iamVjdCdzIHdpZHRoLCBoZWlnaHQgb3JcclxuXHQgKiAgICAgICAgIGRlcHRoIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byAwOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpc0VtcHR5KCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiAodGhpcy54ID09IDAgJiYgdGhpcy55ID09IDAgJiYgdGhpcy56ID09IDAgJiYgdGhpcy53aWR0aCA9PSAwICYmIHRoaXMuaGVpZ2h0ID09IDAgJiYgdGhpcy5kZXB0aCA9PSAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkanVzdHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBCb3ggb2JqZWN0LCBhcyBkZXRlcm1pbmVkIGJ5IGl0c1xyXG5cdCAqIHRvcC1sZWZ0LWZyb250IGNvcm5lciwgYnkgdGhlIHNwZWNpZmllZCBhbW91bnRzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGR4IE1vdmVzIHRoZSA8aT54PC9pPiB2YWx1ZSBvZiB0aGUgQm94IG9iamVjdCBieSB0aGlzIGFtb3VudC5cclxuXHQgKiBAcGFyYW0gZHkgTW92ZXMgdGhlIDxpPnk8L2k+IHZhbHVlIG9mIHRoZSBCb3ggb2JqZWN0IGJ5IHRoaXMgYW1vdW50LlxyXG5cdCAqIEBwYXJhbSBkeiBNb3ZlcyB0aGUgPGk+ejwvaT4gdmFsdWUgb2YgdGhlIEJveCBvYmplY3QgYnkgdGhpcyBhbW91bnQuXHJcblx0ICovXHJcblx0cHVibGljIG9mZnNldChkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMueCArPSBkeDtcclxuXHRcdHRoaXMueSArPSBkeTtcclxuXHRcdHRoaXMueiArPSBkejtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkanVzdHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBCb3ggb2JqZWN0IHVzaW5nIGEgVmVjdG9yM0Qgb2JqZWN0IGFzIGFcclxuXHQgKiBwYXJhbWV0ZXIuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlIDxjb2RlPkJveC5vZmZzZXQoKTwvY29kZT5cclxuXHQgKiBtZXRob2QsIGV4Y2VwdCB0aGF0IGl0IHRha2VzIGEgVmVjdG9yM0Qgb2JqZWN0IGFzIGEgcGFyYW1ldGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIEEgVmVjdG9yM0Qgb2JqZWN0IHRvIHVzZSB0byBvZmZzZXQgdGhpcyBCb3ggb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBvZmZzZXRQb3NpdGlvbihwb3NpdGlvbjpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLnggKz0gcG9zaXRpb24ueDtcclxuXHRcdHRoaXMueSArPSBwb3NpdGlvbi55O1xyXG5cdFx0dGhpcy56ICs9IHBvc2l0aW9uLno7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFsbCBvZiB0aGUgQm94IG9iamVjdCdzIHByb3BlcnRpZXMgdG8gMC4gQSBCb3ggb2JqZWN0IGlzIGVtcHR5IGlmIGl0c1xyXG5cdCAqIHdpZHRoLCBoZWlnaHQgb3IgZGVwdGggaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDAuXHJcblx0ICpcclxuXHQgKiA8cD4gVGhpcyBtZXRob2Qgc2V0cyB0aGUgdmFsdWVzIG9mIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXHJcblx0ICogPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPiwgYW5kXHJcblx0ICogPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgdG8gMC48L3A+XHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0RW1wdHkoKVxyXG5cdHtcclxuXHRcdHRoaXMueCA9IDA7XHJcblx0XHR0aGlzLnkgPSAwO1xyXG5cdFx0dGhpcy56ID0gMDtcclxuXHRcdHRoaXMud2lkdGggPSAwO1xyXG5cdFx0dGhpcy5oZWlnaHQgPSAwO1xyXG5cdFx0dGhpcy5kZXB0aCA9IDA7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBtZW1iZXJzIG9mIEJveCB0byB0aGUgc3BlY2lmaWVkIHZhbHVlc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHhhICAgICAgVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICBib3guXHJcblx0ICogQHBhcmFtIHlhICAgICAgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICBib3guXHJcblx0ICogQHBhcmFtIHl6ICAgICAgVGhlIDxpPno8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICBib3guXHJcblx0ICogQHBhcmFtIHdpZHRoYSAgVGhlIHdpZHRoIG9mIHRoZSBib3gsIGluIHBpeGVscy5cclxuXHQgKiBAcGFyYW0gaGVpZ2h0YSBUaGUgaGVpZ2h0IG9mIHRoZSBib3gsIGluIHBpeGVscy5cclxuXHQgKiBAcGFyYW0gZGVwdGhhICBUaGUgZGVwdGggb2YgdGhlIGJveCwgaW4gcGl4ZWxzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRUbyh4YTpudW1iZXIsIHlhOm51bWJlciwgemE6bnVtYmVyLCB3aWR0aGE6bnVtYmVyLCBoZWlnaHRhOm51bWJlciwgZGVwdGhhOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLnggPSB4YTtcclxuXHRcdHRoaXMueSA9IHlhO1xyXG5cdFx0dGhpcy56ID0gemE7XHJcblx0XHR0aGlzLndpZHRoID0gd2lkdGhhO1xyXG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHRhO1xyXG5cdFx0dGhpcy5kZXB0aCA9IGRlcHRoYTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyBhbmQgcmV0dXJucyBhIHN0cmluZyB0aGF0IGxpc3RzIHRoZSBob3Jpem9udGFsLCB2ZXJ0aWNhbCBhbmRcclxuXHQgKiBsb25naXR1ZGluYWwgcG9zaXRpb25zIGFuZCB0aGUgd2lkdGgsIGhlaWdodCBhbmQgZGVwdGggb2YgdGhlIEJveCBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIEEgc3RyaW5nIGxpc3RpbmcgdGhlIHZhbHVlIG9mIGVhY2ggb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIG9mXHJcblx0ICogICAgICAgICB0aGUgQm94IG9iamVjdDogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPixcclxuXHQgKiAgICAgICAgIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPiwgYW5kIDxjb2RlPmRlcHRoPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gXCJbQm94XSAoeD1cIiArIHRoaXMueCArIFwiLCB5PVwiICsgdGhpcy55ICsgXCIsIHo9XCIgKyB0aGlzLnogKyBcIiwgd2lkdGg9XCIgKyB0aGlzLndpZHRoICsgXCIsIGhlaWdodD1cIiArIHRoaXMuaGVpZ2h0ICsgXCIsIGRlcHRoPVwiICsgdGhpcy5kZXB0aCArIFwiKVwiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0d28gYm94ZXMgdG9nZXRoZXIgdG8gY3JlYXRlIGEgbmV3IEJveCBvYmplY3QsIGJ5IGZpbGxpbmdcclxuXHQgKiBpbiB0aGUgaG9yaXpvbnRhbCwgdmVydGljYWwgYW5kIGxvbmdpdHVkaW5hbCBzcGFjZSBiZXR3ZWVuIHRoZSB0d28gYm94ZXMuXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIDxjb2RlPnVuaW9uKCk8L2NvZGU+IG1ldGhvZCBpZ25vcmVzIGJveGVzIHdpdGhcclxuXHQgKiA8Y29kZT4wPC9jb2RlPiBhcyB0aGUgaGVpZ2h0LCB3aWR0aCBvciBkZXB0aCB2YWx1ZSwgc3VjaCBhczogPGNvZGU+dmFyXHJcblx0ICogYm94MjpCb3ggPSBuZXcgQm94KDMwMCwzMDAsMzAwLDUwLDUwLDApOzwvY29kZT48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdG9VbmlvbiBBIEJveCBvYmplY3QgdG8gYWRkIHRvIHRoaXMgQm94IG9iamVjdC5cclxuXHQgKiBAcmV0dXJuIEEgbmV3IEJveCBvYmplY3QgdGhhdCBpcyB0aGUgdW5pb24gb2YgdGhlIHR3byBib3hlcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgdW5pb24odG9VbmlvbjpCb3gpOkJveFxyXG5cdHtcclxuXHRcdHZhciB1OkJveCA9IG5ldyBCb3goKTtcclxuXHJcblx0XHRpZiAodGhpcy54IDwgdG9Vbmlvbi54KSB7XHJcblx0XHRcdHUueCA9IHRoaXMueDtcclxuXHRcdFx0dS53aWR0aCA9IHRvVW5pb24ueCAtIHRoaXMueCArIHRvVW5pb24ud2lkdGg7XHJcblxyXG5cdFx0XHRpZiAodS53aWR0aCA8IHRoaXMud2lkdGgpXHJcblx0XHRcdFx0dS53aWR0aCA9IHRoaXMud2lkdGg7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR1LnggPSB0b1VuaW9uLng7XHJcblx0XHRcdHUud2lkdGggPSB0aGlzLnggLSB0b1VuaW9uLnggKyB0aGlzLndpZHRoO1xyXG5cclxuXHRcdFx0aWYgKHUud2lkdGggPCB0b1VuaW9uLndpZHRoKVxyXG5cdFx0XHRcdHUud2lkdGggPSB0b1VuaW9uLndpZHRoO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnkgPCB0b1VuaW9uLnkpIHtcclxuXHRcdFx0dS55ID0gdGhpcy55O1xyXG5cdFx0XHR1LmhlaWdodCA9IHRvVW5pb24ueSAtIHRoaXMueSArIHRvVW5pb24uaGVpZ2h0O1xyXG5cclxuXHRcdFx0aWYgKHUuaGVpZ2h0IDwgdGhpcy5oZWlnaHQpXHJcblx0XHRcdFx0dS5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHUueSA9IHRvVW5pb24ueTtcclxuXHRcdFx0dS5oZWlnaHQgPSB0aGlzLnkgLSB0b1VuaW9uLnkgKyB0aGlzLmhlaWdodDtcclxuXHJcblx0XHRcdGlmICh1LmhlaWdodCA8IHRvVW5pb24uaGVpZ2h0KVxyXG5cdFx0XHRcdHUuaGVpZ2h0ID0gdG9Vbmlvbi5oZWlnaHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMueiA8IHRvVW5pb24ueikge1xyXG5cdFx0XHR1LnogPSB0aGlzLno7XHJcblx0XHRcdHUuZGVwdGggPSB0b1VuaW9uLnogLSB0aGlzLnogKyB0b1VuaW9uLmRlcHRoO1xyXG5cclxuXHRcdFx0aWYgKHUuZGVwdGggPCB0aGlzLmRlcHRoKVxyXG5cdFx0XHRcdHUuZGVwdGggPSB0aGlzLmRlcHRoO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dS56ID0gdG9Vbmlvbi56O1xyXG5cdFx0XHR1LmRlcHRoID0gdGhpcy56IC0gdG9Vbmlvbi56ICsgdGhpcy5kZXB0aDtcclxuXHJcblx0XHRcdGlmICh1LmRlcHRoIDwgdG9Vbmlvbi5kZXB0aClcclxuXHRcdFx0XHR1LmRlcHRoID0gdG9Vbmlvbi5kZXB0aDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEJveDsiXX0=