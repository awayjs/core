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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL0JveC50cyJdLCJuYW1lcyI6WyJCb3giLCJCb3guY29uc3RydWN0b3IiLCJCb3guYmFjayIsIkJveC5ib3R0b20iLCJCb3guYm90dG9tUmlnaHRCYWNrIiwiQm94LmZyb250IiwiQm94LmxlZnQiLCJCb3gucmlnaHQiLCJCb3guc2l6ZSIsIkJveC50b3AiLCJCb3gudG9wTGVmdEZyb250IiwiQm94LmNsb25lIiwiQm94LmNvbnRhaW5zIiwiQm94LmNvbnRhaW5zUG9pbnQiLCJCb3guY29udGFpbnNCb3giLCJCb3guY29weUZyb20iLCJCb3guZXF1YWxzIiwiQm94LmluZmxhdGUiLCJCb3guaW5mbGF0ZVBvaW50IiwiQm94LmludGVyc2VjdGlvbiIsIkJveC5pbnRlcnNlY3RzIiwiQm94LnJheUludGVyc2VjdGlvbiIsIkJveC5jbG9zZXN0UG9pbnRUb1BvaW50IiwiQm94LmlzRW1wdHkiLCJCb3gub2Zmc2V0IiwiQm94Lm9mZnNldFBvc2l0aW9uIiwiQm94LnNldEVtcHR5IiwiQm94LnNldFRvIiwiQm94LnRvU3RyaW5nIiwiQm94LnVuaW9uIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLFFBQVEsV0FBZSwrQkFBK0IsQ0FBQyxDQUFDO0FBRS9ELEFBNEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FERztJQUNHLEdBQUc7SUFvTlJBOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCR0E7SUFDSEEsU0F0T0tBLEdBQUdBLENBc09JQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxLQUFnQkEsRUFBRUEsTUFBaUJBLEVBQUVBLEtBQWdCQTtRQUEvRkMsaUJBQVlBLEdBQVpBLEtBQVlBO1FBQUVBLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFBRUEscUJBQWdCQSxHQUFoQkEsU0FBZ0JBO1FBQUVBLHNCQUFpQkEsR0FBakJBLFVBQWlCQTtRQUFFQSxxQkFBZ0JBLEdBQWhC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QUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBRW5CQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDbkJBLENBQUNBO1lBQ0ZBLENBQUNBO1FBQ0ZBLENBQUNBO1FBQ0RBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNCQSxnQkFBZ0JBLEdBQUdBLENBQUVBLENBQUNBLFlBQVlBLEdBQUdBLEVBQUVBLENBQUVBLEdBQUNBLEVBQUVBLENBQUNBO1lBQzdDQSxFQUFFQSxDQUFDQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsZ0JBQWdCQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFDOUJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLGdCQUFnQkEsR0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQzlCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDeEZBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNwQkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO2dCQUNuQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLGdCQUFnQkEsR0FBR0EsQ0FBRUEsWUFBWUEsR0FBR0EsRUFBRUEsQ0FBRUEsR0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDNUNBLEVBQUVBLENBQUNBLENBQUNBLGdCQUFnQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxnQkFBZ0JBLEdBQUNBLEVBQUVBLENBQUNBO2dCQUM5QkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsZ0JBQWdCQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFDOUJBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO29CQUN4RkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ25CQSxDQUFDQTtZQUNGQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxVQUFVQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQkEsZ0JBQWdCQSxHQUFHQSxDQUFFQSxDQUFDQSxZQUFZQSxHQUFHQSxFQUFFQSxDQUFFQSxHQUFDQSxFQUFFQSxDQUFDQTtZQUM3Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLGdCQUFnQkEsR0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQzlCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxnQkFBZ0JBLEdBQUNBLEVBQUVBLENBQUNBO2dCQUM5QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsWUFBWUEsSUFBSUEsRUFBRUEsR0FBR0EsWUFBWUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsWUFBWUEsSUFBSUEsRUFBRUEsR0FBR0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hGQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNwQkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDbkJBLENBQUNBO1lBQ0ZBLENBQUNBO1FBQ0ZBLENBQUNBO1FBQ0RBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNCQSxnQkFBZ0JBLEdBQUdBLENBQUVBLFlBQVlBLEdBQUdBLEVBQUVBLENBQUVBLEdBQUNBLEVBQUVBLENBQUNBO1lBQzVDQSxFQUFFQSxDQUFDQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsZ0JBQWdCQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFDOUJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLGdCQUFnQkEsR0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQzlCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxZQUFZQSxJQUFJQSxFQUFFQSxHQUFHQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDeEZBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO2dCQUNuQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLGdCQUFnQkEsR0FBR0EsQ0FBRUEsQ0FBQ0EsWUFBWUEsR0FBR0EsRUFBRUEsQ0FBRUEsR0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDN0NBLEVBQUVBLENBQUNBLENBQUNBLGdCQUFnQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxnQkFBZ0JBLEdBQUNBLEVBQUVBLENBQUNBO2dCQUM5QkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsZ0JBQWdCQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFDOUJBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLFlBQVlBLElBQUlBLEVBQUVBLEdBQUdBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO29CQUN4RkEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNwQkEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ25CQSxDQUFDQTtZQUNGQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEQSxNQUFNQSxDQUFDQSxVQUFVQSxHQUFFQSxnQkFBZ0JBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO0lBQzFDQSxDQUFDQTtJQUVEckI7Ozs7OztPQU1HQTtJQUNJQSxpQ0FBbUJBLEdBQTFCQSxVQUEyQkEsS0FBY0EsRUFBRUEsTUFBc0JBO1FBQXRCc0Isc0JBQXNCQSxHQUF0QkEsYUFBc0JBO1FBRWhFQSxJQUFJQSxDQUFRQSxDQUFDQTtRQUViQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUNsQkEsTUFBTUEsR0FBR0EsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFFekJBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ1pBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ2RBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQ1pBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBQzNCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN6QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFYkEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDWkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDNUJBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQzFCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNkQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNaQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUViQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNaQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNkQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNaQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUMzQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDekJBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRWJBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO0lBQ2ZBLENBQUNBO0lBRUR0Qjs7Ozs7T0FLR0E7SUFDSUEscUJBQU9BLEdBQWRBO1FBRUN1QixNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM5R0EsQ0FBQ0E7SUFFRHZCOzs7Ozs7O09BT0dBO0lBQ0lBLG9CQUFNQSxHQUFiQSxVQUFjQSxFQUFTQSxFQUFFQSxFQUFTQSxFQUFFQSxFQUFTQTtRQUU1Q3dCLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENB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T0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaEJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBRTFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDM0JBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO1FBQzFCQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDYkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFFL0NBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO2dCQUMxQkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDekJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ2hCQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUU1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQzdCQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7UUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO1lBRTdDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDeEJBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1FBQ3ZCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoQkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFFMUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO2dCQUMzQkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO0lBQ1ZBLENBQUNBO0lBQ0Y3QixVQUFDQTtBQUFEQSxDQXJ3QkEsQUFxd0JDQSxJQUFBO0FBRUQsQUFBYSxpQkFBSixHQUFHLENBQUMiLCJmaWxlIjoiZ2VvbS9Cb3guanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuXG4vKipcbiAqIEEgQm94IG9iamVjdCBpcyBhbiBhcmVhIGRlZmluZWQgYnkgaXRzIHBvc2l0aW9uLCBhcyBpbmRpY2F0ZWQgYnkgaXRzXG4gKiB0b3AtbGVmdC1mcm9udCBjb3JuZXIgcG9pbnQoPGk+eDwvaT4sIDxpPnk8L2k+LCA8aT56PC9pPikgYW5kIGJ5IGl0cyB3aWR0aCxcbiAqIGhlaWdodCBhbmQgZGVwdGguXG4gKlxuICpcbiAqIDxwPlRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXG4gKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzIG9mIHRoZSBCb3ggY2xhc3MgYXJlXG4gKiBpbmRlcGVuZGVudCBvZiBlYWNoIG90aGVyOyBjaGFuZ2luZyB0aGUgdmFsdWUgb2Ygb25lIHByb3BlcnR5IGhhcyBubyBlZmZlY3RcbiAqIG9uIHRoZSBvdGhlcnMuIEhvd2V2ZXIsIHRoZSA8Y29kZT5yaWdodDwvY29kZT4sIDxjb2RlPmJvdHRvbTwvY29kZT4gYW5kXG4gKiA8Y29kZT5iYWNrPC9jb2RlPiBwcm9wZXJ0aWVzIGFyZSBpbnRlZ3JhbGx5IHJlbGF0ZWQgdG8gdGhvc2Ugc2l4XG4gKiBwcm9wZXJ0aWVzLiBGb3IgZXhhbXBsZSwgaWYgeW91IGNoYW5nZSB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnJpZ2h0PC9jb2RlPlxuICogcHJvcGVydHksIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnR5IGNoYW5nZXM7IGlmIHlvdVxuICogY2hhbmdlIHRoZSA8Y29kZT5ib3R0b208L2NvZGU+IHByb3BlcnR5LCB0aGUgdmFsdWUgb2YgdGhlXG4gKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnR5IGNoYW5nZXMuIDwvcD5cbiAqXG4gKiA8cD5UaGUgZm9sbG93aW5nIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdXNlIEJveCBvYmplY3RzOjwvcD5cbiAqXG4gKiA8dWw+XG4gKiAgIDxsaT5UaGUgPGNvZGU+Ym91bmRzPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgRGlzcGxheU9iamVjdCBjbGFzczwvbGk+XG4gKiA8L3VsPlxuICpcbiAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5uZXcgQm94KCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhXG4gKiBCb3ggb2JqZWN0LjwvcD5cbiAqXG4gKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIEJveCBjbGFzcyBkb2VzIG5vdCBkZWZpbmUgYSBjdWJpYyBTaGFwZVxuICogZGlzcGxheSBvYmplY3QuXG4gKi9cbmNsYXNzIEJveFxue1xuXHRwcml2YXRlIF9zaXplOlZlY3RvcjNEO1xuXHRwcml2YXRlIF9ib3R0b21SaWdodEJhY2s6VmVjdG9yM0Q7XG5cdHByaXZhdGUgX3RvcExlZnRGcm9udDpWZWN0b3IzRDtcblxuXHQvKipcblx0ICogVGhlIGhlaWdodCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuIENoYW5naW5nIHRoZSA8Y29kZT5oZWlnaHQ8L2NvZGU+IHZhbHVlXG5cdCAqIG9mIGEgQm94IG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXG5cdCAqIDxjb2RlPno8L2NvZGU+LCA8Y29kZT5kZXB0aDwvY29kZT4gYW5kIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGhlaWdodDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB3aWR0aCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuIENoYW5naW5nIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gdmFsdWVcblx0ICogb2YgYSBCb3ggb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPixcblx0ICogPGNvZGU+ejwvY29kZT4sIDxjb2RlPmRlcHRoPC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIHdpZHRoOm51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGRlb3RoIG9mIHRoZSBib3gsIGluIHBpeGVscy4gQ2hhbmdpbmcgdGhlIDxjb2RlPmRlcHRoPC9jb2RlPiB2YWx1ZVxuXHQgKiBvZiBhIEJveCBvYmplY3QgaGFzIG5vIGVmZmVjdCBvbiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxuXHQgKiA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZGVwdGg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZSBib3guXG5cdCAqIENoYW5naW5nIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+eDwvY29kZT4gcHJvcGVydHkgb2YgYSBCb3ggb2JqZWN0IGhhcyBub1xuXHQgKiBlZmZlY3Qgb24gdGhlIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcy5cblx0ICpcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgdGhlXG5cdCAqIDxjb2RlPmxlZnQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyB4Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGUgYm94LlxuXHQgKiBDaGFuZ2luZyB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IG9mIGEgQm94IG9iamVjdCBoYXMgbm9cblx0ICogZWZmZWN0IG9uIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcblx0ICogPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZVxuXHQgKiA8Y29kZT50b3A8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyB5Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGUgYm94LlxuXHQgKiBDaGFuZ2luZyB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IG9mIGEgQm94IG9iamVjdCBoYXMgbm9cblx0ICogZWZmZWN0IG9uIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPixcblx0ICogPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZVxuXHQgKiA8Y29kZT5mcm9udDwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKi9cblx0cHVibGljIHo6bnVtYmVyXG5cblx0LyoqXG5cdCAqIFRoZSBzdW0gb2YgdGhlIDxjb2RlPno8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJhY2soKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLnogKyB0aGlzLmRlcHRoO1xuXHR9XG5cblx0cHVibGljIHNldCBiYWNrKHZhbDpudW1iZXIpXG5cdHtcblx0XHR0aGlzLmRlcHRoID0gdmFsIC0gdGhpcy56O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzdW0gb2YgdGhlIDxjb2RlPnk8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdHRvbSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIHNldCBib3R0b20odmFsOm51bWJlcilcblx0e1xuXHRcdHRoaXMuaGVpZ2h0ID0gdmFsIC0gdGhpcy55O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBsb2NhdGlvbiBvZiB0aGUgQm94IG9iamVjdCdzIGJvdHRvbS1yaWdodCBjb3JuZXIsIGRldGVybWluZWQgYnkgdGhlXG5cdCAqIHZhbHVlcyBvZiB0aGUgPGNvZGU+cmlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5ib3R0b208L2NvZGU+IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdHRvbVJpZ2h0QmFjaygpOlZlY3RvcjNEXG5cdHtcblx0XHRpZiAodGhpcy5fYm90dG9tUmlnaHRCYWNrID09IG51bGwpXG5cdFx0XHR0aGlzLl9ib3R0b21SaWdodEJhY2sgPSBuZXcgVmVjdG9yM0QoKTtcblxuXHRcdHRoaXMuX2JvdHRvbVJpZ2h0QmFjay54ID0gdGhpcy54ICsgdGhpcy53aWR0aDtcblx0XHR0aGlzLl9ib3R0b21SaWdodEJhY2sueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuXHRcdHRoaXMuX2JvdHRvbVJpZ2h0QmFjay56ID0gdGhpcy56ICsgdGhpcy5kZXB0aDtcblxuXHRcdHJldHVybiB0aGlzLl9ib3R0b21SaWdodEJhY2s7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIDxpPno8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGUgYm94LiBDaGFuZ2luZ1xuXHQgKiB0aGUgPGNvZGU+ZnJvbnQ8L2NvZGU+IHByb3BlcnR5IG9mIGEgQm94IG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPndpZHRoPC9jb2RlPiBhbmQgPGNvZGU+aGVpZ2h0PC9jb2RlPlxuXHQgKiBwcm9wZXJ0aWVzLiBIb3dldmVyIGl0IGRvZXMgYWZmZWN0IHRoZSA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydHksXG5cdCAqIHdoZXJlYXMgY2hhbmdpbmcgdGhlIDxjb2RlPno8L2NvZGU+IHZhbHVlIGRvZXMgPGk+bm90PC9pPiBhZmZlY3QgdGhlXG5cdCAqIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0eS5cblx0ICpcblx0ICogPHA+VGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5sZWZ0PC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2Zcblx0ICogdGhlIDxjb2RlPng8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgZnJvbnQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLno7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGZyb250KHZhbDpudW1iZXIpXG5cdHtcblx0XHR0aGlzLmRlcHRoICs9IHRoaXMueiAtIHZhbDtcblx0XHR0aGlzLnogPSB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgYm94LiBDaGFuZ2luZyB0aGVcblx0ICogPGNvZGU+bGVmdDwvY29kZT4gcHJvcGVydHkgb2YgYSBCb3ggb2JqZWN0IGhhcyBubyBlZmZlY3Qgb24gdGhlXG5cdCAqIDxjb2RlPnk8L2NvZGU+IGFuZCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMuIEhvd2V2ZXIgaXQgZG9lcyBhZmZlY3Rcblx0ICogdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSwgd2hlcmVhcyBjaGFuZ2luZyB0aGUgPGNvZGU+eDwvY29kZT4gdmFsdWVcblx0ICogZG9lcyA8aT5ub3Q8L2k+IGFmZmVjdCB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnR5LlxuXHQgKlxuXHQgKiA8cD5UaGUgdmFsdWUgb2YgdGhlIDxjb2RlPmxlZnQ8L2NvZGU+IHByb3BlcnR5IGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZlxuXHQgKiB0aGUgPGNvZGU+eDwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBsZWZ0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy54O1xuXHR9XG5cblx0cHVibGljIHNldCBsZWZ0KHZhbDpudW1iZXIpXG5cdHtcblx0XHR0aGlzLndpZHRoICs9IHRoaXMueCAtIHZhbDtcblx0XHR0aGlzLnggPSB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHN1bSBvZiB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGdldCByaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJpZ2h0KHZhbDpudW1iZXIpXG5cdHtcblx0XHR0aGlzLndpZHRoID0gdmFsIC0gdGhpcy54O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzaXplIG9mIHRoZSBCb3ggb2JqZWN0LCBleHByZXNzZWQgYXMgYSBWZWN0b3IzRCBvYmplY3Qgd2l0aCB0aGVcblx0ICogdmFsdWVzIG9mIHRoZSA8Y29kZT53aWR0aDwvY29kZT4sIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIGdldCBzaXplKCk6VmVjdG9yM0Rcblx0e1xuXHRcdGlmICh0aGlzLl9zaXplID09IG51bGwpXG5cdFx0XHR0aGlzLl9zaXplID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0XHR0aGlzLl9zaXplLnggPSB0aGlzLndpZHRoO1xuXHRcdHRoaXMuX3NpemUueSA9IHRoaXMuaGVpZ2h0O1xuXHRcdHRoaXMuX3NpemUueiA9IHRoaXMuZGVwdGg7XG5cblx0XHRyZXR1cm4gdGhpcy5fc2l6ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZSBib3guIENoYW5naW5nXG5cdCAqIHRoZSA8Y29kZT50b3A8L2NvZGU+IHByb3BlcnR5IG9mIGEgQm94IG9iamVjdCBoYXMgbm8gZWZmZWN0IG9uIHRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnRpZXMuIEhvd2V2ZXIgaXQgZG9lcyBhZmZlY3Rcblx0ICogdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHksIHdoZXJlYXMgY2hhbmdpbmcgdGhlIDxjb2RlPnk8L2NvZGU+XG5cdCAqIHZhbHVlIGRvZXMgPGk+bm90PC9pPiBhZmZlY3QgdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHkuXG5cdCAqXG5cdCAqIDxwPlRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+dG9wPC9jb2RlPiBwcm9wZXJ0eSBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgdGhlXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgdG9wKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy55O1xuXHR9XG5cblx0cHVibGljIHNldCB0b3AodmFsOm51bWJlcilcblx0e1xuXHRcdHRoaXMuaGVpZ2h0ICs9ICh0aGlzLnkgLSB2YWwpO1xuXHRcdHRoaXMueSA9IHZhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbG9jYXRpb24gb2YgdGhlIEJveCBvYmplY3QncyB0b3AtbGVmdC1mcm9udCBjb3JuZXIsIGRldGVybWluZWQgYnkgdGhlXG5cdCAqIDxpPng8L2k+LCA8aT55PC9pPiBhbmQgPGk+ejwvaT4gY29vcmRpbmF0ZXMgb2YgdGhlIHBvaW50LlxuXHQgKi9cblx0cHVibGljIGdldCB0b3BMZWZ0RnJvbnQoKTpWZWN0b3IzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX3RvcExlZnRGcm9udCA9PSBudWxsKVxuXHRcdFx0dGhpcy5fdG9wTGVmdEZyb250ID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0XHR0aGlzLl90b3BMZWZ0RnJvbnQueCA9IHRoaXMueDtcblx0XHR0aGlzLl90b3BMZWZ0RnJvbnQueSA9IHRoaXMueTtcblx0XHR0aGlzLl90b3BMZWZ0RnJvbnQueiA9IHRoaXMuejtcblxuXHRcdHJldHVybiB0aGlzLl90b3BMZWZ0RnJvbnQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBCb3ggb2JqZWN0IHdpdGggdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBzcGVjaWZpZWQgYnkgdGhlXG5cdCAqIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+ejwvY29kZT4gcGFyYW1ldGVycyBhbmQgd2l0aCB0aGVcblx0ICogc3BlY2lmaWVkIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+XG5cdCAqIHBhcmFtZXRlcnMuIElmIHlvdSBjYWxsIHRoaXMgcHVibGljIHdpdGhvdXQgcGFyYW1ldGVycywgYSBib3ggd2l0aFxuXHQgKiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4gYW5kIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0aWVzIHNldCB0byAwIGlzIGNyZWF0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB4ICAgICAgVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICBib3guXG5cdCAqIEBwYXJhbSB5ICAgICAgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICBib3guXG5cdCAqIEBwYXJhbSB6ICAgICAgVGhlIDxpPno8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICBib3guXG5cdCAqIEBwYXJhbSB3aWR0aCAgVGhlIHdpZHRoIG9mIHRoZSBib3gsIGluIHBpeGVscy5cblx0ICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBib3gsIGluIHBpeGVscy5cblx0ICogQHBhcmFtIGRlcHRoIFRoZSBkZXB0aCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih4Om51bWJlciA9IDAsIHk6bnVtYmVyID0gMCwgejpudW1iZXIgPSAwLCB3aWR0aDpudW1iZXIgPSAwLCBoZWlnaHQ6bnVtYmVyID0gMCwgZGVwdGg6bnVtYmVyID0gMClcblx0e1xuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0XHR0aGlzLnogPSB6O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLmRlcHRoID0gZGVwdGg7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBCb3ggb2JqZWN0IHdpdGggdGhlIHNhbWUgdmFsdWVzIGZvciB0aGUgPGNvZGU+eDwvY29kZT4sXG5cdCAqIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+XG5cdCAqIGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBhcyB0aGUgb3JpZ2luYWwgQm94IG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiBBIG5ldyBCb3ggb2JqZWN0IHdpdGggdGhlIHNhbWUgdmFsdWVzIGZvciB0aGUgPGNvZGU+eDwvY29kZT4sXG5cdCAqICAgICAgICAgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXG5cdCAqICAgICAgICAgPGNvZGU+aGVpZ2h0PC9jb2RlPiBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnRpZXMgYXMgdGhlXG5cdCAqICAgICAgICAgb3JpZ2luYWwgQm94IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkJveFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBCb3godGhpcy54LCB0aGlzLnksIHRoaXMueiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuZGVwdGgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhlIGN1YmljXG5cdCAqIHJlZ2lvbiBkZWZpbmVkIGJ5IHRoaXMgQm94IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHggVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUoaG9yaXpvbnRhbCBjb21wb25lbnQpIG9mIHRoZSBwb3NpdGlvbi5cblx0ICogQHBhcmFtIHkgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUodmVydGljYWwgY29tcG9uZW50KSBvZiB0aGUgcG9zaXRpb24uXG5cdCAqIEBwYXJhbSB6IFRoZSA8aT56PC9pPiBjb29yZGluYXRlKGxvbmdpdHVkaW5hbCBjb21wb25lbnQpIG9mIHRoZSBwb3NpdGlvbi5cblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBCb3ggb2JqZWN0IGNvbnRhaW5zIHRoZVxuXHQgKiAgICAgICAgIHNwZWNpZmllZCBwb3NpdGlvbjsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBjb250YWlucyh4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMueCA8PSB4ICYmIHRoaXMueCArIHRoaXMud2lkdGggPj0geCAmJiB0aGlzLnkgPD0geSAmJiB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSB5ICYmIHRoaXMueiA8PSB6ICYmIHRoaXMueiArIHRoaXMuZGVwdGggPj0geik7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaXMgY29udGFpbmVkIHdpdGhpbiB0aGUgY3ViaWNcblx0ICogcmVnaW9uIGRlZmluZWQgYnkgdGhpcyBCb3ggb2JqZWN0LiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxuXHQgKiA8Y29kZT5Cb3guY29udGFpbnMoKTwvY29kZT4gbWV0aG9kLCBleGNlcHQgdGhhdCBpdCB0YWtlcyBhIFZlY3RvcjNEXG5cdCAqIG9iamVjdCBhcyBhIHBhcmFtZXRlci5cblx0ICpcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiwgYXMgcmVwcmVzZW50ZWQgYnkgaXRzIDxpPng8L2k+LCA8aT55PC9pPiBhbmRcblx0ICogICAgICAgICAgICAgICAgIDxpPno8L2k+IGNvb3JkaW5hdGVzLlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIEJveCBvYmplY3QgY29udGFpbnMgdGhlXG5cdCAqICAgICAgICAgc3BlY2lmaWVkIHBvc2l0aW9uOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGNvbnRhaW5zUG9pbnQocG9zaXRpb246VmVjdG9yM0QpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54IDw9IHBvc2l0aW9uLnggJiYgdGhpcy54ICsgdGhpcy53aWR0aCA+PSBwb3NpdGlvbi54ICYmIHRoaXMueSA8PSBwb3NpdGlvbi55ICYmIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHBvc2l0aW9uLnkgJiYgdGhpcy56IDw9IHBvc2l0aW9uLnogJiYgdGhpcy56ICsgdGhpcy5kZXB0aCA+PSBwb3NpdGlvbi56KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIEJveCBvYmplY3Qgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT5ib3g8L2NvZGU+XG5cdCAqIHBhcmFtZXRlciBpcyBjb250YWluZWQgd2l0aGluIHRoaXMgQm94IG9iamVjdC4gQSBCb3ggb2JqZWN0IGlzIHNhaWQgdG9cblx0ICogY29udGFpbiBhbm90aGVyIGlmIHRoZSBzZWNvbmQgQm94IG9iamVjdCBmYWxscyBlbnRpcmVseSB3aXRoaW4gdGhlXG5cdCAqIGJvdW5kYXJpZXMgb2YgdGhlIGZpcnN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gYm94IFRoZSBCb3ggb2JqZWN0IGJlaW5nIGNoZWNrZWQuXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgQm94IG9iamVjdCB0aGF0IHlvdSBzcGVjaWZ5XG5cdCAqICAgICAgICAgaXMgY29udGFpbmVkIGJ5IHRoaXMgQm94IG9iamVjdDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBjb250YWluc0JveChib3g6Qm94KTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMueCA8PSBib3gueCAmJiB0aGlzLnggKyB0aGlzLndpZHRoID49IGJveC54ICsgYm94LndpZHRoICYmIHRoaXMueSA8PSBib3gueSAmJiB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSBib3gueSArIGJveC5oZWlnaHQgJiYgdGhpcy56IDw9IGJveC56ICYmIHRoaXMueiArIHRoaXMuZGVwdGggPj0gYm94LnogKyBib3guZGVwdGgpXG5cdH1cblxuXHQvKipcblx0ICogQ29waWVzIGFsbCBvZiBib3ggZGF0YSBmcm9tIHRoZSBzb3VyY2UgQm94IG9iamVjdCBpbnRvIHRoZSBjYWxsaW5nXG5cdCAqIEJveCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2VCb3ggVGhlIEJveCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGNvcHlGcm9tKHNvdXJjZUJveDpCb3gpXG5cdHtcblx0XHR0aGlzLnggPSBzb3VyY2VCb3gueDtcblx0XHR0aGlzLnkgPSBzb3VyY2VCb3gueTtcblx0XHR0aGlzLnogPSBzb3VyY2VCb3guejtcblx0XHR0aGlzLndpZHRoID0gc291cmNlQm94LndpZHRoO1xuXHRcdHRoaXMuaGVpZ2h0ID0gc291cmNlQm94LmhlaWdodDtcblx0XHR0aGlzLmRlcHRoID0gc291cmNlQm94LmRlcHRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgb2JqZWN0IHNwZWNpZmllZCBpbiB0aGUgPGNvZGU+dG9Db21wYXJlPC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIgaXMgZXF1YWwgdG8gdGhpcyBCb3ggb2JqZWN0LiBUaGlzIG1ldGhvZCBjb21wYXJlcyB0aGVcblx0ICogPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCA8Y29kZT56PC9jb2RlPiwgPGNvZGU+d2lkdGg8L2NvZGU+LFxuXHQgKiA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYWdhaW5zdFxuXHQgKiB0aGUgc2FtZSBwcm9wZXJ0aWVzIG9mIHRoaXMgQm94IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHRvQ29tcGFyZSBUaGUgYm94IHRvIGNvbXBhcmUgdG8gdGhpcyBCb3ggb2JqZWN0LlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIG9iamVjdCBoYXMgZXhhY3RseSB0aGUgc2FtZVxuXHQgKiAgICAgICAgIHZhbHVlcyBmb3IgdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sXG5cdCAqICAgICAgICAgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+IGFuZCA8Y29kZT5kZXB0aDwvY29kZT5cblx0ICogICAgICAgICBwcm9wZXJ0aWVzIGFzIHRoaXMgQm94IG9iamVjdDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBlcXVhbHModG9Db21wYXJlOkJveCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPT0gdG9Db21wYXJlLnggJiYgdGhpcy55ID09IHRvQ29tcGFyZS55ICYmIHRoaXMueiA9PSB0b0NvbXBhcmUueiAmJiB0aGlzLndpZHRoID09IHRvQ29tcGFyZS53aWR0aCAmJiB0aGlzLmhlaWdodCA9PSB0b0NvbXBhcmUuaGVpZ2h0ICYmIHRoaXMuZGVwdGggPT0gdG9Db21wYXJlLmRlcHRoKVxuXHR9XG5cblx0LyoqXG5cdCAqIEluY3JlYXNlcyB0aGUgc2l6ZSBvZiB0aGUgQm94IG9iamVjdCBieSB0aGUgc3BlY2lmaWVkIGFtb3VudHMsIGluXG5cdCAqIHBpeGVscy4gVGhlIGNlbnRlciBwb2ludCBvZiB0aGUgQm94IG9iamVjdCBzdGF5cyB0aGUgc2FtZSwgYW5kIGl0c1xuXHQgKiBzaXplIGluY3JlYXNlcyB0byB0aGUgbGVmdCBhbmQgcmlnaHQgYnkgdGhlIDxjb2RlPmR4PC9jb2RlPiB2YWx1ZSwgdG9cblx0ICogdGhlIHRvcCBhbmQgdGhlIGJvdHRvbSBieSB0aGUgPGNvZGU+ZHk8L2NvZGU+IHZhbHVlLCBhbmQgdG9cblx0ICogdGhlIGZyb250IGFuZCB0aGUgYmFjayBieSB0aGUgPGNvZGU+ZHo8L2NvZGU+IHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0gZHggVGhlIHZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBsZWZ0IGFuZCB0aGUgcmlnaHQgb2YgdGhlIEJveFxuXHQgKiAgICAgICAgICAgb2JqZWN0LiBUaGUgZm9sbG93aW5nIGVxdWF0aW9uIGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBuZXdcblx0ICogICAgICAgICAgIHdpZHRoIGFuZCBwb3NpdGlvbiBvZiB0aGUgYm94OlxuXHQgKiBAcGFyYW0gZHkgVGhlIHZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSB0b3AgYW5kIHRoZSBib3R0b20gb2YgdGhlIEJveFxuXHQgKiAgICAgICAgICAgb2JqZWN0LiBUaGUgZm9sbG93aW5nIGVxdWF0aW9uIGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBuZXdcblx0ICogICAgICAgICAgIGhlaWdodCBhbmQgcG9zaXRpb24gb2YgdGhlIGJveDpcblx0ICogQHBhcmFtIGR6IFRoZSB2YWx1ZSB0byBiZSBhZGRlZCB0byB0aGUgZnJvbnQgYW5kIHRoZSBiYWNrIG9mIHRoZSBCb3hcblx0ICogICAgICAgICAgIG9iamVjdC4gVGhlIGZvbGxvd2luZyBlcXVhdGlvbiBpcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbmV3XG5cdCAqICAgICAgICAgICBkZXB0aCBhbmQgcG9zaXRpb24gb2YgdGhlIGJveDpcblx0ICovXG5cdHB1YmxpYyBpbmZsYXRlKGR4Om51bWJlciwgZHk6bnVtYmVyLCBkejpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggLT0gZHgvMjtcblx0XHR0aGlzLnkgLT0gZHkvMjtcblx0XHR0aGlzLnogLT0gZHovMjtcblx0XHR0aGlzLndpZHRoICs9IGR4LzI7XG5cdFx0dGhpcy5oZWlnaHQgKz0gZHkvMjtcblx0XHR0aGlzLmRlcHRoICs9IGR6LzI7XG5cdH1cblxuXHQvKipcblx0ICogSW5jcmVhc2VzIHRoZSBzaXplIG9mIHRoZSBCb3ggb2JqZWN0LiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxuXHQgKiA8Y29kZT5Cb3guaW5mbGF0ZSgpPC9jb2RlPiBtZXRob2QgZXhjZXB0IGl0IHRha2VzIGEgVmVjdG9yM0Qgb2JqZWN0IGFzXG5cdCAqIGEgcGFyYW1ldGVyLlxuXHQgKlxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIHR3byBjb2RlIGV4YW1wbGVzIGdpdmUgdGhlIHNhbWUgcmVzdWx0OjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGRlbHRhIFRoZSA8Y29kZT54PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGlzIFZlY3RvcjNEIG9iamVjdCBpcyB1c2VkIHRvXG5cdCAqICAgICAgICAgICAgICBpbmNyZWFzZSB0aGUgaG9yaXpvbnRhbCBkaW1lbnNpb24gb2YgdGhlIEJveCBvYmplY3QuXG5cdCAqICAgICAgICAgICAgICBUaGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgaXMgdXNlZCB0byBpbmNyZWFzZSB0aGUgdmVydGljYWxcblx0ICogICAgICAgICAgICAgIGRpbWVuc2lvbiBvZiB0aGUgQm94IG9iamVjdC5cblx0ICogICAgICAgICAgICAgIFRoZSA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSBpcyB1c2VkIHRvIGluY3JlYXNlIHRoZVxuXHQgKiAgICAgICAgICAgICAgbG9uZ2l0dWRpbmFsIGRpbWVuc2lvbiBvZiB0aGUgQm94IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBpbmZsYXRlUG9pbnQoZGVsdGE6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLnggLT0gZGVsdGEueC8yO1xuXHRcdHRoaXMueSAtPSBkZWx0YS55LzI7XG5cdFx0dGhpcy56IC09IGRlbHRhLnovMjtcblx0XHR0aGlzLndpZHRoICs9IGRlbHRhLngvMjtcblx0XHR0aGlzLmhlaWdodCArPSBkZWx0YS55LzI7XG5cdFx0dGhpcy5kZXB0aCArPSBkZWx0YS56LzI7XG5cdH1cblxuXHQvKipcblx0ICogSWYgdGhlIEJveCBvYmplY3Qgc3BlY2lmaWVkIGluIHRoZSA8Y29kZT50b0ludGVyc2VjdDwvY29kZT4gcGFyYW1ldGVyXG5cdCAqIGludGVyc2VjdHMgd2l0aCB0aGlzIEJveCBvYmplY3QsIHJldHVybnMgdGhlIGFyZWEgb2YgaW50ZXJzZWN0aW9uXG5cdCAqIGFzIGEgQm94IG9iamVjdC4gSWYgdGhlIGJveGVzIGRvIG5vdCBpbnRlcnNlY3QsIHRoaXMgbWV0aG9kIHJldHVybnMgYW5cblx0ICogZW1wdHkgQm94IG9iamVjdCB3aXRoIGl0cyBwcm9wZXJ0aWVzIHNldCB0byAwLlxuXHQgKlxuXHQgKiBAcGFyYW0gdG9JbnRlcnNlY3QgVGhlIEJveCBvYmplY3QgdG8gY29tcGFyZSBhZ2FpbnN0IHRvIHNlZSBpZiBpdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0cyB3aXRoIHRoaXMgQm94IG9iamVjdC5cblx0ICogQHJldHVybiBBIEJveCBvYmplY3QgdGhhdCBlcXVhbHMgdGhlIGFyZWEgb2YgaW50ZXJzZWN0aW9uLiBJZiB0aGVcblx0ICogICAgICAgICBib3hlcyBkbyBub3QgaW50ZXJzZWN0LCB0aGlzIG1ldGhvZCByZXR1cm5zIGFuIGVtcHR5IEJveFxuXHQgKiAgICAgICAgIG9iamVjdDsgdGhhdCBpcywgYSBib3ggd2l0aCBpdHMgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LFxuXHQgKiAgICAgICAgIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sICA8Y29kZT5oZWlnaHQ8L2NvZGU+LCBhbmRcblx0ICogICAgICAgICA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBzZXQgdG8gMC5cblx0ICovXG5cdHB1YmxpYyBpbnRlcnNlY3Rpb24odG9JbnRlcnNlY3Q6Qm94KTpCb3hcblx0e1xuXHRcdGlmICh0aGlzLmludGVyc2VjdHModG9JbnRlcnNlY3QpKSB7XG5cdFx0XHR2YXIgaTpCb3ggPSBuZXcgQm94KCk7XG5cblx0XHRcdGlmICh0aGlzLnggPiB0b0ludGVyc2VjdC54KSB7XG5cdFx0XHRcdGkueCA9IHRoaXMueDtcblx0XHRcdFx0aS53aWR0aCA9IHRvSW50ZXJzZWN0LnggLSB0aGlzLnggKyB0b0ludGVyc2VjdC53aWR0aDtcblxuXHRcdFx0XHRpZiAoaS53aWR0aCA+IHRoaXMud2lkdGgpXG5cdFx0XHRcdFx0aS53aWR0aCA9IHRoaXMud2lkdGg7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpLnggPSB0b0ludGVyc2VjdC54O1xuXHRcdFx0XHRpLndpZHRoID0gdGhpcy54IC0gdG9JbnRlcnNlY3QueCArIHRoaXMud2lkdGg7XG5cblx0XHRcdFx0aWYgKGkud2lkdGggPiB0b0ludGVyc2VjdC53aWR0aClcblx0XHRcdFx0XHRpLndpZHRoID0gdG9JbnRlcnNlY3Qud2lkdGg7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnkgPiB0b0ludGVyc2VjdC55KSB7XG5cdFx0XHRcdGkueSA9IHRoaXMueTtcblx0XHRcdFx0aS5oZWlnaHQgPSB0b0ludGVyc2VjdC55IC0gdGhpcy55ICsgdG9JbnRlcnNlY3QuaGVpZ2h0O1xuXG5cdFx0XHRcdGlmIChpLmhlaWdodCA+IHRoaXMuaGVpZ2h0KVxuXHRcdFx0XHRcdGkuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpLnkgPSB0b0ludGVyc2VjdC55O1xuXHRcdFx0XHRpLmhlaWdodCA9IHRoaXMueSAtIHRvSW50ZXJzZWN0LnkgKyB0aGlzLmhlaWdodDtcblxuXHRcdFx0XHRpZiAoaS5oZWlnaHQgPiB0b0ludGVyc2VjdC5oZWlnaHQpXG5cdFx0XHRcdFx0aS5oZWlnaHQgPSB0b0ludGVyc2VjdC5oZWlnaHQ7XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYgKHRoaXMueiA+IHRvSW50ZXJzZWN0LnopIHtcblx0XHRcdFx0aS56ID0gdGhpcy56O1xuXHRcdFx0XHRpLmRlcHRoID0gdG9JbnRlcnNlY3QueiAtIHRoaXMueiArIHRvSW50ZXJzZWN0LmRlcHRoO1xuXG5cdFx0XHRcdGlmIChpLmRlcHRoID4gdGhpcy5kZXB0aClcblx0XHRcdFx0XHRpLmRlcHRoID0gdGhpcy5kZXB0aDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGkueiA9IHRvSW50ZXJzZWN0Lno7XG5cdFx0XHRcdGkuZGVwdGggPSB0aGlzLnogLSB0b0ludGVyc2VjdC56ICsgdGhpcy5kZXB0aDtcblxuXHRcdFx0XHRpZiAoaS5kZXB0aCA+IHRvSW50ZXJzZWN0LmRlcHRoKVxuXHRcdFx0XHRcdGkuZGVwdGggPSB0b0ludGVyc2VjdC5kZXB0aDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBCb3goKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG9iamVjdCBzcGVjaWZpZWQgaW4gdGhlIDxjb2RlPnRvSW50ZXJzZWN0PC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIgaW50ZXJzZWN0cyB3aXRoIHRoaXMgQm94IG9iamVjdC4gVGhpcyBtZXRob2QgY2hlY2tzIHRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sXG5cdCAqIDxjb2RlPmhlaWdodDwvY29kZT4sIGFuZCA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgc3BlY2lmaWVkXG5cdCAqIEJveCBvYmplY3QgdG8gc2VlIGlmIGl0IGludGVyc2VjdHMgd2l0aCB0aGlzIEJveCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB0b0ludGVyc2VjdCBUaGUgQm94IG9iamVjdCB0byBjb21wYXJlIGFnYWluc3QgdGhpcyBCb3ggb2JqZWN0LlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgaW50ZXJzZWN0c1xuXHQgKiAgICAgICAgIHdpdGggdGhpcyBCb3ggb2JqZWN0OyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGludGVyc2VjdHModG9JbnRlcnNlY3Q6Qm94KTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMueCArIHRoaXMud2lkdGggPiB0b0ludGVyc2VjdC54ICYmIHRoaXMueCA8IHRvSW50ZXJzZWN0LnggKyB0b0ludGVyc2VjdC53aWR0aCAmJiB0aGlzLnkgKyB0aGlzLmhlaWdodCA+IHRvSW50ZXJzZWN0LnkgJiYgdGhpcy55IDwgdG9JbnRlcnNlY3QueSArIHRvSW50ZXJzZWN0LmhlaWdodCAmJiB0aGlzLnogKyB0aGlzLmRlcHRoID4gdG9JbnRlcnNlY3QueiAmJiB0aGlzLnogPCB0b0ludGVyc2VjdC56ICsgdG9JbnRlcnNlY3QuZGVwdGgpO1xuXHR9XG5cblx0cHVibGljIHJheUludGVyc2VjdGlvbihwb3NpdGlvbjpWZWN0b3IzRCwgZGlyZWN0aW9uOlZlY3RvcjNELCB0YXJnZXROb3JtYWw6VmVjdG9yM0QpOm51bWJlclxuXHR7XG5cdFx0aWYgKHRoaXMuY29udGFpbnNQb2ludChwb3NpdGlvbikpXG5cdFx0XHRyZXR1cm4gMDtcblxuXHRcdHZhciBoYWxmRXh0ZW50c1g6bnVtYmVyID0gdGhpcy53aWR0aC8yO1xuXHRcdHZhciBoYWxmRXh0ZW50c1k6bnVtYmVyID0gdGhpcy5oZWlnaHQvMjtcblx0XHR2YXIgaGFsZkV4dGVudHNaOm51bWJlciA9IHRoaXMuZGVwdGgvMjtcblxuXHRcdHZhciBjZW50ZXJYOm51bWJlciA9IHRoaXMueCArIGhhbGZFeHRlbnRzWDtcblx0XHR2YXIgY2VudGVyWTpudW1iZXIgPSB0aGlzLnkgKyBoYWxmRXh0ZW50c1k7XG5cdFx0dmFyIGNlbnRlclo6bnVtYmVyID0gdGhpcy56ICsgaGFsZkV4dGVudHNaO1xuXG5cdFx0dmFyIHB4Om51bWJlciA9IHBvc2l0aW9uLnggLSBjZW50ZXJYO1xuXHRcdHZhciBweTpudW1iZXIgPSBwb3NpdGlvbi55IC0gY2VudGVyWTtcblx0XHR2YXIgcHo6bnVtYmVyID0gcG9zaXRpb24ueiAtIGNlbnRlclo7XG5cblx0XHR2YXIgdng6bnVtYmVyID0gZGlyZWN0aW9uLnhcblx0XHR2YXIgdnk6bnVtYmVyID0gZGlyZWN0aW9uLnlcblx0XHR2YXIgdno6bnVtYmVyID0gZGlyZWN0aW9uLno7XG5cblx0XHR2YXIgaXg6bnVtYmVyO1xuXHRcdHZhciBpeTpudW1iZXI7XG5cdFx0dmFyIGl6Om51bWJlcjtcblx0XHR2YXIgcmF5RW50cnlEaXN0YW5jZTpudW1iZXI7XG5cblx0XHQvLyByYXktcGxhbmUgdGVzdHNcblx0XHR2YXIgaW50ZXJzZWN0czpib29sZWFuO1xuXHRcdGlmICh2eCA8IDApIHtcblx0XHRcdHJheUVudHJ5RGlzdGFuY2UgPSAoIGhhbGZFeHRlbnRzWCAtIHB4ICkvdng7XG5cdFx0XHRpZiAocmF5RW50cnlEaXN0YW5jZSA+IDApIHtcblx0XHRcdFx0aXkgPSBweSArIHJheUVudHJ5RGlzdGFuY2Uqdnk7XG5cdFx0XHRcdGl6ID0gcHogKyByYXlFbnRyeURpc3RhbmNlKnZ6O1xuXHRcdFx0XHRpZiAoaXkgPiAtaGFsZkV4dGVudHNZICYmIGl5IDwgaGFsZkV4dGVudHNZICYmIGl6ID4gLWhhbGZFeHRlbnRzWiAmJiBpeiA8IGhhbGZFeHRlbnRzWikge1xuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC54ID0gMTtcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueSA9IDA7XG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnogPSAwO1xuXG5cdFx0XHRcdFx0aW50ZXJzZWN0cyA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCFpbnRlcnNlY3RzICYmIHZ4ID4gMCkge1xuXHRcdFx0cmF5RW50cnlEaXN0YW5jZSA9ICggLWhhbGZFeHRlbnRzWCAtIHB4ICkvdng7XG5cdFx0XHRpZiAocmF5RW50cnlEaXN0YW5jZSA+IDApIHtcblx0XHRcdFx0aXkgPSBweSArIHJheUVudHJ5RGlzdGFuY2Uqdnk7XG5cdFx0XHRcdGl6ID0gcHogKyByYXlFbnRyeURpc3RhbmNlKnZ6O1xuXHRcdFx0XHRpZiAoaXkgPiAtaGFsZkV4dGVudHNZICYmIGl5IDwgaGFsZkV4dGVudHNZICYmIGl6ID4gLWhhbGZFeHRlbnRzWiAmJiBpeiA8IGhhbGZFeHRlbnRzWikge1xuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC54ID0gLTE7XG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnkgPSAwO1xuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC56ID0gMDtcblx0XHRcdFx0XHRpbnRlcnNlY3RzID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoIWludGVyc2VjdHMgJiYgdnkgPCAwKSB7XG5cdFx0XHRyYXlFbnRyeURpc3RhbmNlID0gKCBoYWxmRXh0ZW50c1kgLSBweSApL3Z5O1xuXHRcdFx0aWYgKHJheUVudHJ5RGlzdGFuY2UgPiAwKSB7XG5cdFx0XHRcdGl4ID0gcHggKyByYXlFbnRyeURpc3RhbmNlKnZ4O1xuXHRcdFx0XHRpeiA9IHB6ICsgcmF5RW50cnlEaXN0YW5jZSp2ejtcblx0XHRcdFx0aWYgKGl4ID4gLWhhbGZFeHRlbnRzWCAmJiBpeCA8IGhhbGZFeHRlbnRzWCAmJiBpeiA+IC1oYWxmRXh0ZW50c1ogJiYgaXogPCBoYWxmRXh0ZW50c1opIHtcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueCA9IDA7XG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnkgPSAxO1xuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC56ID0gMDtcblx0XHRcdFx0XHRpbnRlcnNlY3RzID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoIWludGVyc2VjdHMgJiYgdnkgPiAwKSB7XG5cdFx0XHRyYXlFbnRyeURpc3RhbmNlID0gKCAtaGFsZkV4dGVudHNZIC0gcHkgKS92eTtcblx0XHRcdGlmIChyYXlFbnRyeURpc3RhbmNlID4gMCkge1xuXHRcdFx0XHRpeCA9IHB4ICsgcmF5RW50cnlEaXN0YW5jZSp2eDtcblx0XHRcdFx0aXogPSBweiArIHJheUVudHJ5RGlzdGFuY2Uqdno7XG5cdFx0XHRcdGlmIChpeCA+IC1oYWxmRXh0ZW50c1ggJiYgaXggPCBoYWxmRXh0ZW50c1ggJiYgaXogPiAtaGFsZkV4dGVudHNaICYmIGl6IDwgaGFsZkV4dGVudHNaKSB7XG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnggPSAwO1xuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC55ID0gLTE7XG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnogPSAwO1xuXHRcdFx0XHRcdGludGVyc2VjdHMgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICghaW50ZXJzZWN0cyAmJiB2eiA8IDApIHtcblx0XHRcdHJheUVudHJ5RGlzdGFuY2UgPSAoIGhhbGZFeHRlbnRzWiAtIHB6ICkvdno7XG5cdFx0XHRpZiAocmF5RW50cnlEaXN0YW5jZSA+IDApIHtcblx0XHRcdFx0aXggPSBweCArIHJheUVudHJ5RGlzdGFuY2Uqdng7XG5cdFx0XHRcdGl5ID0gcHkgKyByYXlFbnRyeURpc3RhbmNlKnZ5O1xuXHRcdFx0XHRpZiAoaXkgPiAtaGFsZkV4dGVudHNZICYmIGl5IDwgaGFsZkV4dGVudHNZICYmIGl4ID4gLWhhbGZFeHRlbnRzWCAmJiBpeCA8IGhhbGZFeHRlbnRzWCkge1xuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC54ID0gMDtcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueSA9IDA7XG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnogPSAxO1xuXHRcdFx0XHRcdGludGVyc2VjdHMgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICghaW50ZXJzZWN0cyAmJiB2eiA+IDApIHtcblx0XHRcdHJheUVudHJ5RGlzdGFuY2UgPSAoIC1oYWxmRXh0ZW50c1ogLSBweiApL3Z6O1xuXHRcdFx0aWYgKHJheUVudHJ5RGlzdGFuY2UgPiAwKSB7XG5cdFx0XHRcdGl4ID0gcHggKyByYXlFbnRyeURpc3RhbmNlKnZ4O1xuXHRcdFx0XHRpeSA9IHB5ICsgcmF5RW50cnlEaXN0YW5jZSp2eTtcblx0XHRcdFx0aWYgKGl5ID4gLWhhbGZFeHRlbnRzWSAmJiBpeSA8IGhhbGZFeHRlbnRzWSAmJiBpeCA+IC1oYWxmRXh0ZW50c1ggJiYgaXggPCBoYWxmRXh0ZW50c1gpIHtcblx0XHRcdFx0XHR0YXJnZXROb3JtYWwueCA9IDA7XG5cdFx0XHRcdFx0dGFyZ2V0Tm9ybWFsLnkgPSAwO1xuXHRcdFx0XHRcdHRhcmdldE5vcm1hbC56ID0gLTE7XG5cdFx0XHRcdFx0aW50ZXJzZWN0cyA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaW50ZXJzZWN0cz8gcmF5RW50cnlEaXN0YW5jZSA6IC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZpbmRzIHRoZSBjbG9zZXN0IHBvaW50IG9uIHRoZSBCb3ggdG8gYW5vdGhlciBnaXZlbiBwb2ludC4gVGhpcyBjYW4gYmUgdXNlZCBmb3IgbWF4aW11bSBlcnJvciBjYWxjdWxhdGlvbnMgZm9yIGNvbnRlbnQgd2l0aGluIGEgZ2l2ZW4gQm94LlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIHBvaW50IGZvciB3aGljaCB0byBmaW5kIHRoZSBjbG9zZXN0IHBvaW50IG9uIHRoZSBCb3hcblx0ICogQHBhcmFtIHRhcmdldCBBbiBvcHRpb25hbCBWZWN0b3IzRCB0byBzdG9yZSB0aGUgcmVzdWx0IHRvIHByZXZlbnQgY3JlYXRpbmcgYSBuZXcgb2JqZWN0LlxuXHQgKiBAcmV0dXJuXG5cdCAqL1xuXHRwdWJsaWMgY2xvc2VzdFBvaW50VG9Qb2ludChwb2ludDpWZWN0b3IzRCwgdGFyZ2V0OlZlY3RvcjNEID0gbnVsbCk6VmVjdG9yM0Rcblx0e1xuXHRcdHZhciBwOm51bWJlcjtcblxuXHRcdGlmICh0YXJnZXQgPT0gbnVsbClcblx0XHRcdHRhcmdldCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0cCA9IHBvaW50Lng7XG5cdFx0aWYgKHAgPCB0aGlzLngpXG5cdFx0XHRwID0gdGhpcy54O1xuXHRcdGlmIChwID4gdGhpcy54ICsgdGhpcy53aWR0aClcblx0XHRcdHAgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuXHRcdHRhcmdldC54ID0gcDtcblxuXHRcdHAgPSBwb2ludC55O1xuXHRcdGlmIChwIDwgdGhpcy55ICsgdGhpcy5oZWlnaHQpXG5cdFx0XHRwID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG5cdFx0aWYgKHAgPiB0aGlzLnkpXG5cdFx0XHRwID0gdGhpcy55O1xuXHRcdHRhcmdldC55ID0gcDtcblxuXHRcdHAgPSBwb2ludC56O1xuXHRcdGlmIChwIDwgdGhpcy56KVxuXHRcdFx0cCA9IHRoaXMuejtcblx0XHRpZiAocCA+IHRoaXMueiArIHRoaXMuZGVwdGgpXG5cdFx0XHRwID0gdGhpcy56ICsgdGhpcy5kZXB0aDtcblx0XHR0YXJnZXQueiA9IHA7XG5cblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhpcyBCb3ggb2JqZWN0IGlzIGVtcHR5LlxuXHQgKlxuXHQgKiBAcmV0dXJuIEEgdmFsdWUgb2YgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIEJveCBvYmplY3QncyB3aWR0aCwgaGVpZ2h0IG9yXG5cdCAqICAgICAgICAgZGVwdGggaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDA7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgaXNFbXB0eSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54ID09IDAgJiYgdGhpcy55ID09IDAgJiYgdGhpcy56ID09IDAgJiYgdGhpcy53aWR0aCA9PSAwICYmIHRoaXMuaGVpZ2h0ID09IDAgJiYgdGhpcy5kZXB0aCA9PSAwKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBsb2NhdGlvbiBvZiB0aGUgQm94IG9iamVjdCwgYXMgZGV0ZXJtaW5lZCBieSBpdHNcblx0ICogdG9wLWxlZnQtZnJvbnQgY29ybmVyLCBieSB0aGUgc3BlY2lmaWVkIGFtb3VudHMuXG5cdCAqXG5cdCAqIEBwYXJhbSBkeCBNb3ZlcyB0aGUgPGk+eDwvaT4gdmFsdWUgb2YgdGhlIEJveCBvYmplY3QgYnkgdGhpcyBhbW91bnQuXG5cdCAqIEBwYXJhbSBkeSBNb3ZlcyB0aGUgPGk+eTwvaT4gdmFsdWUgb2YgdGhlIEJveCBvYmplY3QgYnkgdGhpcyBhbW91bnQuXG5cdCAqIEBwYXJhbSBkeiBNb3ZlcyB0aGUgPGk+ejwvaT4gdmFsdWUgb2YgdGhlIEJveCBvYmplY3QgYnkgdGhpcyBhbW91bnQuXG5cdCAqL1xuXHRwdWJsaWMgb2Zmc2V0KGR4Om51bWJlciwgZHk6bnVtYmVyLCBkejpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggKz0gZHg7XG5cdFx0dGhpcy55ICs9IGR5O1xuXHRcdHRoaXMueiArPSBkejtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBsb2NhdGlvbiBvZiB0aGUgQm94IG9iamVjdCB1c2luZyBhIFZlY3RvcjNEIG9iamVjdCBhcyBhXG5cdCAqIHBhcmFtZXRlci4gVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byB0aGUgPGNvZGU+Qm94Lm9mZnNldCgpPC9jb2RlPlxuXHQgKiBtZXRob2QsIGV4Y2VwdCB0aGF0IGl0IHRha2VzIGEgVmVjdG9yM0Qgb2JqZWN0IGFzIGEgcGFyYW1ldGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gQSBWZWN0b3IzRCBvYmplY3QgdG8gdXNlIHRvIG9mZnNldCB0aGlzIEJveCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgb2Zmc2V0UG9zaXRpb24ocG9zaXRpb246VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLnggKz0gcG9zaXRpb24ueDtcblx0XHR0aGlzLnkgKz0gcG9zaXRpb24ueTtcblx0XHR0aGlzLnogKz0gcG9zaXRpb24uejtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIGFsbCBvZiB0aGUgQm94IG9iamVjdCdzIHByb3BlcnRpZXMgdG8gMC4gQSBCb3ggb2JqZWN0IGlzIGVtcHR5IGlmIGl0c1xuXHQgKiB3aWR0aCwgaGVpZ2h0IG9yIGRlcHRoIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byAwLlxuXHQgKlxuXHQgKiA8cD4gVGhpcyBtZXRob2Qgc2V0cyB0aGUgdmFsdWVzIG9mIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sXG5cdCAqIDxjb2RlPno8L2NvZGU+LCA8Y29kZT53aWR0aDwvY29kZT4sIDxjb2RlPmhlaWdodDwvY29kZT4sIGFuZFxuXHQgKiA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydGllcyB0byAwLjwvcD5cblx0ICpcblx0ICovXG5cdHB1YmxpYyBzZXRFbXB0eSgpXG5cdHtcblx0XHR0aGlzLnggPSAwO1xuXHRcdHRoaXMueSA9IDA7XG5cdFx0dGhpcy56ID0gMDtcblx0XHR0aGlzLndpZHRoID0gMDtcblx0XHR0aGlzLmhlaWdodCA9IDA7XG5cdFx0dGhpcy5kZXB0aCA9IDA7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyB0aGUgbWVtYmVycyBvZiBCb3ggdG8gdGhlIHNwZWNpZmllZCB2YWx1ZXNcblx0ICpcblx0ICogQHBhcmFtIHhhICAgICAgVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0LWZyb250IGNvcm5lciBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgYm94LlxuXHQgKiBAcGFyYW0geWEgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQtZnJvbnQgY29ybmVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICBib3guXG5cdCAqIEBwYXJhbSB5eiAgICAgIFRoZSA8aT56PC9pPiBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdC1mcm9udCBjb3JuZXIgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgIGJveC5cblx0ICogQHBhcmFtIHdpZHRoYSAgVGhlIHdpZHRoIG9mIHRoZSBib3gsIGluIHBpeGVscy5cblx0ICogQHBhcmFtIGhlaWdodGEgVGhlIGhlaWdodCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXG5cdCAqIEBwYXJhbSBkZXB0aGEgIFRoZSBkZXB0aCBvZiB0aGUgYm94LCBpbiBwaXhlbHMuXG5cdCAqL1xuXHRwdWJsaWMgc2V0VG8oeGE6bnVtYmVyLCB5YTpudW1iZXIsIHphOm51bWJlciwgd2lkdGhhOm51bWJlciwgaGVpZ2h0YTpudW1iZXIsIGRlcHRoYTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggPSB4YTtcblx0XHR0aGlzLnkgPSB5YTtcblx0XHR0aGlzLnogPSB6YTtcblx0XHR0aGlzLndpZHRoID0gd2lkdGhhO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0YTtcblx0XHR0aGlzLmRlcHRoID0gZGVwdGhhO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkcyBhbmQgcmV0dXJucyBhIHN0cmluZyB0aGF0IGxpc3RzIHRoZSBob3Jpem9udGFsLCB2ZXJ0aWNhbCBhbmRcblx0ICogbG9uZ2l0dWRpbmFsIHBvc2l0aW9ucyBhbmQgdGhlIHdpZHRoLCBoZWlnaHQgYW5kIGRlcHRoIG9mIHRoZSBCb3ggb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIEEgc3RyaW5nIGxpc3RpbmcgdGhlIHZhbHVlIG9mIGVhY2ggb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIG9mXG5cdCAqICAgICAgICAgdGhlIEJveCBvYmplY3Q6IDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgPGNvZGU+ejwvY29kZT4sXG5cdCAqICAgICAgICAgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+LCBhbmQgPGNvZGU+ZGVwdGg8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIHRvU3RyaW5nKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gXCJbQm94XSAoeD1cIiArIHRoaXMueCArIFwiLCB5PVwiICsgdGhpcy55ICsgXCIsIHo9XCIgKyB0aGlzLnogKyBcIiwgd2lkdGg9XCIgKyB0aGlzLndpZHRoICsgXCIsIGhlaWdodD1cIiArIHRoaXMuaGVpZ2h0ICsgXCIsIGRlcHRoPVwiICsgdGhpcy5kZXB0aCArIFwiKVwiO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgdHdvIGJveGVzIHRvZ2V0aGVyIHRvIGNyZWF0ZSBhIG5ldyBCb3ggb2JqZWN0LCBieSBmaWxsaW5nXG5cdCAqIGluIHRoZSBob3Jpem9udGFsLCB2ZXJ0aWNhbCBhbmQgbG9uZ2l0dWRpbmFsIHNwYWNlIGJldHdlZW4gdGhlIHR3byBib3hlcy5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoZSA8Y29kZT51bmlvbigpPC9jb2RlPiBtZXRob2QgaWdub3JlcyBib3hlcyB3aXRoXG5cdCAqIDxjb2RlPjA8L2NvZGU+IGFzIHRoZSBoZWlnaHQsIHdpZHRoIG9yIGRlcHRoIHZhbHVlLCBzdWNoIGFzOiA8Y29kZT52YXJcblx0ICogYm94MjpCb3ggPSBuZXcgQm94KDMwMCwzMDAsMzAwLDUwLDUwLDApOzwvY29kZT48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB0b1VuaW9uIEEgQm94IG9iamVjdCB0byBhZGQgdG8gdGhpcyBCb3ggb2JqZWN0LlxuXHQgKiBAcmV0dXJuIEEgbmV3IEJveCBvYmplY3QgdGhhdCBpcyB0aGUgdW5pb24gb2YgdGhlIHR3byBib3hlcy5cblx0ICovXG5cdHB1YmxpYyB1bmlvbih0b1VuaW9uOkJveCk6Qm94XG5cdHtcblx0XHR2YXIgdTpCb3ggPSBuZXcgQm94KCk7XG5cblx0XHRpZiAodGhpcy54IDwgdG9Vbmlvbi54KSB7XG5cdFx0XHR1LnggPSB0aGlzLng7XG5cdFx0XHR1LndpZHRoID0gdG9Vbmlvbi54IC0gdGhpcy54ICsgdG9Vbmlvbi53aWR0aDtcblxuXHRcdFx0aWYgKHUud2lkdGggPCB0aGlzLndpZHRoKVxuXHRcdFx0XHR1LndpZHRoID0gdGhpcy53aWR0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dS54ID0gdG9Vbmlvbi54O1xuXHRcdFx0dS53aWR0aCA9IHRoaXMueCAtIHRvVW5pb24ueCArIHRoaXMud2lkdGg7XG5cblx0XHRcdGlmICh1LndpZHRoIDwgdG9Vbmlvbi53aWR0aClcblx0XHRcdFx0dS53aWR0aCA9IHRvVW5pb24ud2lkdGg7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMueSA8IHRvVW5pb24ueSkge1xuXHRcdFx0dS55ID0gdGhpcy55O1xuXHRcdFx0dS5oZWlnaHQgPSB0b1VuaW9uLnkgLSB0aGlzLnkgKyB0b1VuaW9uLmhlaWdodDtcblxuXHRcdFx0aWYgKHUuaGVpZ2h0IDwgdGhpcy5oZWlnaHQpXG5cdFx0XHRcdHUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHUueSA9IHRvVW5pb24ueTtcblx0XHRcdHUuaGVpZ2h0ID0gdGhpcy55IC0gdG9Vbmlvbi55ICsgdGhpcy5oZWlnaHQ7XG5cblx0XHRcdGlmICh1LmhlaWdodCA8IHRvVW5pb24uaGVpZ2h0KVxuXHRcdFx0XHR1LmhlaWdodCA9IHRvVW5pb24uaGVpZ2h0O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnogPCB0b1VuaW9uLnopIHtcblx0XHRcdHUueiA9IHRoaXMuejtcblx0XHRcdHUuZGVwdGggPSB0b1VuaW9uLnogLSB0aGlzLnogKyB0b1VuaW9uLmRlcHRoO1xuXG5cdFx0XHRpZiAodS5kZXB0aCA8IHRoaXMuZGVwdGgpXG5cdFx0XHRcdHUuZGVwdGggPSB0aGlzLmRlcHRoO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR1LnogPSB0b1VuaW9uLno7XG5cdFx0XHR1LmRlcHRoID0gdGhpcy56IC0gdG9Vbmlvbi56ICsgdGhpcy5kZXB0aDtcblxuXHRcdFx0aWYgKHUuZGVwdGggPCB0b1VuaW9uLmRlcHRoKVxuXHRcdFx0XHR1LmRlcHRoID0gdG9Vbmlvbi5kZXB0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdTtcblx0fVxufVxuXG5leHBvcnQgPSBCb3g7Il19