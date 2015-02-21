/**
 * The Vector3D class represents a point or a location in the three-dimensional
 * space using the Cartesian coordinates x, y, and z. As in a two-dimensional
 * space, the x property represents the horizontal axis and the y property
 * represents the vertical axis. In three-dimensional space, the z property
 * represents depth. The value of the x property increases as the object moves
 * to the right. The value of the y property increases as the object moves
 * down. The z property increases as the object moves farther from the point
 * of view. Using perspective projection and scaling, the object is seen to be
 * bigger when near and smaller when farther away from the screen. As in a
 * right-handed three-dimensional coordinate system, the positive z-axis points
 * away from the viewer and the value of the z property increases as the object
 * moves away from the viewer's eye. The origin point (0,0,0) of the global
 * space is the upper-left corner of the stage.
 *
 * <p>The Vector3D class can also represent a direction, an arrow pointing from
 * the origin of the coordinates, such as (0,0,0), to an endpoint; or a
 * floating-point component of an RGB (Red, Green, Blue) color model.</p>
 *
 * <p>Quaternion notation introduces a fourth element, the w property, which
 * provides additional orientation information. For example, the w property can
 * define an angle of rotation of a Vector3D object. The combination of the
 * angle of rotation and the coordinates x, y, and z can determine the display
 * object's orientation. Here is a representation of Vector3D elements in
 * matrix notation:</p>
 */
var Vector3D = (function () {
    /**
     * Creates an instance of a Vector3D object. If you do not specify a
     * parameter for the constructor, a Vector3D object is created with
     * the elements (0,0,0,0).
     *
     * @param x The first element, such as the x coordinate.
     * @param y The second element, such as the y coordinate.
     * @param z The third element, such as the z coordinate.
     * @param w An optional element for additional data such as the angle
     *          of rotation.
     */
    function Vector3D(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Object.defineProperty(Vector3D.prototype, "length", {
        /**
         * The length, magnitude, of the current Vector3D object from the
         * origin (0,0,0) to the object's x, y, and z coordinates. The w
         * property is ignored. A unit vector has a length or magnitude of
         * one.
         */
        get: function () {
            return Math.sqrt(this.lengthSquared);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "lengthSquared", {
        /**
         * The square of the length of the current Vector3D object, calculated
         * using the x, y, and z properties. The w property is ignored. Use the
         * <code>lengthSquared()</code> method whenever possible instead of the
         * slower <code>Math.sqrt()</code> method call of the
         * <code>Vector3D.length()</code> method.
         */
        get: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds the value of the x, y, and z elements of the current Vector3D
     * object to the values of the x, y, and z elements of another Vector3D
     * object. The <code>add()</code> method does not change the current
     * Vector3D object. Instead, it returns a new Vector3D object with
     * the new values.
     *
     * <p>The result of adding two vectors together is a resultant vector.
     * One way to visualize the result is by drawing a vector from the
     * origin or tail of the first vector to the end or head of the second
     * vector. The resultant vector is the distance between the origin
     * point of the first vector and the end point of the second vector.
     * </p>
     */
    Vector3D.prototype.add = function (a) {
        return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w);
    };
    /**
     * Returns the angle in radians between two vectors. The returned angle
     * is the smallest radian the first Vector3D object rotates until it
     * aligns with the second Vector3D object.
     *
     * <p>The <code>angleBetween()</code> method is a static method. You
     * can use it directly as a method of the Vector3D class.</p>
     *
     * <p>To convert a degree to a radian, you can use the following
     * formula:</p>
     *
     * <p><code>radian = Math.PI/180 * degree</code></p>
     *
     * @param a The first Vector3D object.
     * @param b The second Vector3D object.
     * @returns The angle between two Vector3D objects.
     */
    Vector3D.angleBetween = function (a, b) {
        return Math.acos(a.dotProduct(b) / (a.length * b.length));
    };
    /**
     * Returns a new Vector3D object that is an exact copy of the current
     * Vector3D object.
     *
     * @returns A new Vector3D object that is a copy of the current
     * Vector3D object.
     */
    Vector3D.prototype.clone = function () {
        return new Vector3D(this.x, this.y, this.z, this.w);
    };
    /**
     * Copies all of vector data from the source Vector3D object into the
     * calling Vector3D object.
     *
     * @param src The Vector3D object from which to copy the data.
     */
    Vector3D.prototype.copyFrom = function (src) {
        this.x = src.x;
        this.y = src.y;
        this.z = src.z;
        this.w = src.w;
    };
    /**
     * Returns a new Vector3D object that is perpendicular (at a right
     * angle) to the current Vector3D and another Vector3D object. If the
     * returned Vector3D object's coordinates are (0,0,0), then the two
     * Vector3D objects are parallel to each other.
     *
     * <p>You can use the normalized cross product of two vertices of a
     * polygon surface with the normalized vector of the camera or eye
     * viewpoint to get a dot product. The value of the dot product can
     * identify whether a surface of a three-dimensional object is hidden
     * from the viewpoint.</p>
     *
     * @param a A second Vector3D object.
     * @returns A new Vector3D object that is perpendicular to the current
     *          Vector3D object and the Vector3D object specified as the
     *          parameter.
     */
    Vector3D.prototype.crossProduct = function (a) {
        return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x, 1);
    };
    /**
     * Decrements the value of the x, y, and z elements of the current
     * Vector3D object by the values of the x, y, and z elements of
     * specified Vector3D object. Unlike the
     * <code>Vector3D.subtract()</code> method, the
     * <code>decrementBy()</code> method changes the current Vector3D
     * object and does not return a new Vector3D object.
     *
     * @param a The Vector3D object containing the values to subtract from
     *          the current Vector3D object.
     */
    Vector3D.prototype.decrementBy = function (a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
    };
    /**
     * Returns the distance between two Vector3D objects. The
     * <code>distance()</code> method is a static method. You can use it
     * directly as a method of the Vector3D class to get the Euclidean
     * distance between two three-dimensional points.
     *
     * @param pt1 A Vector3D object as the first three-dimensional point.
     * @param pt2 A Vector3D object as the second three-dimensional point.
     * @returns The distance between two Vector3D objects.
     */
    Vector3D.distance = function (pt1, pt2) {
        var x = (pt1.x - pt2.x);
        var y = (pt1.y - pt2.y);
        var z = (pt1.z - pt2.z);
        return Math.sqrt(x * x + y * y + z * z);
    };
    /**
     * If the current Vector3D object and the one specified as the
     * parameter are unit vertices, this method returns the cosine of the
     * angle between the two vertices. Unit vertices are vertices that
     * point to the same direction but their length is one. They remove the
     * length of the vector as a factor in the result. You can use the
     * <code>normalize()</code> method to convert a vector to a unit
     * vector.
     *
     * <p>The <code>dotProduct()</code> method finds the angle between two
     * vertices. It is also used in backface culling or lighting
     * calculations. Backface culling is a procedure for determining which
     * surfaces are hidden from the viewpoint. You can use the normalized
     * vertices from the camera, or eye, viewpoint and the cross product of
     * the vertices of a polygon surface to get the dot product. If the dot
     * product is less than zero, then the surface is facing the camera or
     * the viewer. If the two unit vertices are perpendicular to each
     * other, they are orthogonal and the dot product is zero. If the two
     * vertices are parallel to each other, the dot product is one.</p>
     *
     * @param a The second Vector3D object.
     * @returns A scalar which is the dot product of the current Vector3D
     *          object and the specified Vector3D object.
     *
     * @see away.geom.Vector3D#crossProduct()
     * @see away.geom.Vector3D#normalize()
     */
    Vector3D.prototype.dotProduct = function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
    };
    /**
     * Determines whether two Vector3D objects are equal by comparing the
     * x, y, and z elements of the current Vector3D object with a
     * specified Vector3D object. If the values of these elements are the
     * same, the two Vector3D objects are equal. If the second optional
     * parameter is set to true, all four elements of the Vector3D objects,
     * including the w property, are compared.
     */
    /**
     *
     * @param toCompare The Vector3D object to be compared with the current
     *                  Vector3D object.
     * @param allFour   An optional parameter that specifies whether the w
     *                  property of the Vector3D objects is used in the
     *                  comparison.
     * @returns A value of true if the specified Vector3D object is equal
     *          to the current Vector3D object; false if it is not equal.
     */
    Vector3D.prototype.equals = function (toCompare, allFour) {
        if (allFour === void 0) { allFour = false; }
        return (this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w));
    };
    /**
     * Increments the value of the x, y, and z elements of the current
     * Vector3D object by the values of the x, y, and z elements of a
     * specified Vector3D object. Unlike the <code>Vector3D.add()</code>
     * method, the <code>incrementBy()</code> method changes the current
     * Vector3D object and does not return a new Vector3D object.
     *
     * @param a The Vector3D object to be added to the current Vector3D
     *          object.
     */
    Vector3D.prototype.incrementBy = function (a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
    };
    /**
     * Compares the elements of the current Vector3D object with the
     * elements of a specified Vector3D object to determine whether they
     * are nearly equal. The two Vector3D objects are nearly equal if the
     * value of all the elements of the two vertices are equal, or the
     * result of the comparison is within the tolerance range. The
     * difference between two elements must be less than the number
     * specified as the tolerance parameter. If the third optional
     * parameter is set to <code>true</code>, all four elements of the
     * Vector3D objects, including the <code>w</code> property, are
     * compared. Otherwise, only the x, y, and z elements are included in
     * the comparison.
     */
    /**
     *
     * @param toCompare The Vector3D object to be compared with the current
     *                  Vector3D object.
     * @param tolerance A number determining the tolerance factor. If the
     *                  difference between the values of the Vector3D
     *                  element specified in the toCompare parameter and
     *                  the current Vector3D element is less than the
     *                  tolerance number, the two values are considered
     *                  nearly equal.
     * @param allFour   An optional parameter that specifies whether the w
     *                  property of the Vector3D objects is used in the
     *                  comparison.
     * @returns A value of true if the specified Vector3D object is nearly
     *          equal to the current Vector3D object; false if it is not
     *          equal.
     *
     * @see away.geom.Vector3D#equals()
     */
    Vector3D.prototype.nearEquals = function (toCompare, tolerance, allFour) {
        if (allFour === void 0) { allFour = true; }
        return ((Math.abs(this.x - toCompare.x) < tolerance) && (Math.abs(this.y - toCompare.y) < tolerance) && (Math.abs(this.z - toCompare.z) < tolerance) && (!allFour || Math.abs(this.w - toCompare.w) < tolerance));
    };
    /**
     * Sets the current Vector3D object to its inverse. The inverse object
     * is also considered the opposite of the original object. The value of
     * the x, y, and z properties of the current Vector3D object is changed
     * to -x, -y, and -z.
     */
    Vector3D.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    };
    /**
     * Converts a Vector3D object to a unit vector by dividing the first
     * three elements (x, y, z) by the length of the vector. Unit vertices
     * are vertices that have a direction but their length is one. They
     * simplify vector calculations by removing length as a factor.
     */
    /**
     * Scales the line segment between(0,0) and the current point to a set
     * length.
     *
     * @param thickness The scaling value. For example, if the current
     *                  Vector3D object is (0,3,4), and you normalize it to
     *                  1, the point returned is at(0,0.6,0.8).
     */
    Vector3D.prototype.normalize = function (thickness) {
        if (thickness === void 0) { thickness = 1; }
        if (this.length != 0) {
            var invLength = thickness / this.length;
            this.x *= invLength;
            this.y *= invLength;
            this.z *= invLength;
            return;
        }
    };
    /**
     * Divides the value of the <code>x</code>, <code>y</code>, and
     * <code>z</code> properties of the current Vector3D object by the
     * value of its <code>w</code> property.
     *
     * <p>If the current Vector3D object is the result of multiplying a
     * Vector3D object by a projection Matrix3D object, the w property can
     * hold the transform value. The <code>project()</code> method then can
     * complete the projection by dividing the elements by the
     * <code>w</code> property. Use the <code>Matrix3D.rawData</code>
     * property to create a projection Matrix3D object.</p>
     */
    Vector3D.prototype.project = function () {
        this.x /= this.w;
        this.y /= this.w;
        this.z /= this.w;
    };
    /**
     * Scales the current Vector3D object by a scalar, a magnitude. The
     * Vector3D object's x, y, and z elements are multiplied by the scalar
     * number specified in the parameter. For example, if the vector is
     * scaled by ten, the result is a vector that is ten times longer. The
     * scalar can also change the direction of the vector. Multiplying the
     * vector by a negative number reverses its direction.
     *
     * @param s A multiplier (scalar) used to scale a Vector3D object.

     */
    Vector3D.prototype.scaleBy = function (s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    };
    /**
     * Sets the members of Vector3D to the specified values
     *
     * @param xa The first element, such as the x coordinate.
     * @param ya The second element, such as the y coordinate.
     * @param za The third element, such as the z coordinate.
     */
    Vector3D.prototype.setTo = function (xa, ya, za) {
        this.x = xa;
        this.y = ya;
        this.z = za;
    };
    /**
     * Subtracts the value of the x, y, and z elements of the current
     * Vector3D object from the values of the x, y, and z elements of
     * another Vector3D object. The <code>subtract()</code> method does not
     * change the current Vector3D object. Instead, this method returns a
     * new Vector3D object with the new values.
     *
     * @param a The Vector3D object to be subtracted from the current
     *          Vector3D object.
     * @returns A new Vector3D object that is the difference between the
     *          current Vector3D and the specified Vector3D object.
     *
     * @see away.geom.Vector3D#decrementBy()
     */
    Vector3D.prototype.subtract = function (a) {
        return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z);
    };
    /**
     * Returns a string representation of the current Vector3D object. The
     * string contains the values of the x, y, and z properties.
     */
    Vector3D.prototype.toString = function () {
        return "[Vector3D] (x:" + this.x + " ,y:" + this.y + ", z" + this.z + ", w:" + this.w + ")";
    };
    /**
     * The x axis defined as a Vector3D object with coordinates (1,0,0).
     */
    Vector3D.X_AXIS = new Vector3D(1, 0, 0);
    /**
     * The y axis defined as a Vector3D object with coordinates (0,1,0).
     */
    Vector3D.Y_AXIS = new Vector3D(0, 1, 0);
    /**
     * The z axis defined as a Vector3D object with coordinates (0,0,1).
     */
    Vector3D.Z_AXIS = new Vector3D(0, 0, 1);
    return Vector3D;
})();
module.exports = Vector3D;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNELnRzIl0sIm5hbWVzIjpbIlZlY3RvcjNEIiwiVmVjdG9yM0QuY29uc3RydWN0b3IiLCJWZWN0b3IzRC5sZW5ndGgiLCJWZWN0b3IzRC5sZW5ndGhTcXVhcmVkIiwiVmVjdG9yM0QuYWRkIiwiVmVjdG9yM0QuYW5nbGVCZXR3ZWVuIiwiVmVjdG9yM0QuY2xvbmUiLCJWZWN0b3IzRC5jb3B5RnJvbSIsIlZlY3RvcjNELmNyb3NzUHJvZHVjdCIsIlZlY3RvcjNELmRlY3JlbWVudEJ5IiwiVmVjdG9yM0QuZGlzdGFuY2UiLCJWZWN0b3IzRC5kb3RQcm9kdWN0IiwiVmVjdG9yM0QuZXF1YWxzIiwiVmVjdG9yM0QuaW5jcmVtZW50QnkiLCJWZWN0b3IzRC5uZWFyRXF1YWxzIiwiVmVjdG9yM0QubmVnYXRlIiwiVmVjdG9yM0Qubm9ybWFsaXplIiwiVmVjdG9yM0QucHJvamVjdCIsIlZlY3RvcjNELnNjYWxlQnkiLCJWZWN0b3IzRC5zZXRUbyIsIlZlY3RvcjNELnN1YnRyYWN0IiwiVmVjdG9yM0QudG9TdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBLEFBMEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxRQUFRO0lBbUZiQTs7Ozs7Ozs7OztPQVVHQTtJQUNIQSxTQTlGS0EsUUFBUUEsQ0E4RkRBLENBQVlBLEVBQUVBLENBQVlBLEVBQUVBLENBQVlBLEVBQUVBLENBQVlBO1FBQXREQyxpQkFBWUEsR0FBWkEsS0FBWUE7UUFBRUEsaUJBQVlBLEdBQVpBLEtBQVlBO1FBQUVBLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFFakVBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlB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QUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQy9EQSxDQUFDQTtJQUVEcEI7OztPQUdHQTtJQUNJQSwyQkFBUUEsR0FBZkE7UUFFQ3FCLE1BQU1BLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7SUFDN0ZBLENBQUNBO0lBbmNEckI7O09BRUdBO0lBQ1dBLGVBQU1BLEdBQVlBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO0lBRXREQTs7T0FFR0E7SUFDV0EsZUFBTUEsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFdERBOztPQUVHQTtJQUNXQSxlQUFNQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtJQXVidkRBLGVBQUNBO0FBQURBLENBdGNBLEFBc2NDQSxJQUFBO0FBRUQsQUFBa0IsaUJBQVQsUUFBUSxDQUFDIiwiZmlsZSI6Imdlb20vVmVjdG9yM0QuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgVmVjdG9yM0QgY2xhc3MgcmVwcmVzZW50cyBhIHBvaW50IG9yIGEgbG9jYXRpb24gaW4gdGhlIHRocmVlLWRpbWVuc2lvbmFsXG4gKiBzcGFjZSB1c2luZyB0aGUgQ2FydGVzaWFuIGNvb3JkaW5hdGVzIHgsIHksIGFuZCB6LiBBcyBpbiBhIHR3by1kaW1lbnNpb25hbFxuICogc3BhY2UsIHRoZSB4IHByb3BlcnR5IHJlcHJlc2VudHMgdGhlIGhvcml6b250YWwgYXhpcyBhbmQgdGhlIHkgcHJvcGVydHlcbiAqIHJlcHJlc2VudHMgdGhlIHZlcnRpY2FsIGF4aXMuIEluIHRocmVlLWRpbWVuc2lvbmFsIHNwYWNlLCB0aGUgeiBwcm9wZXJ0eVxuICogcmVwcmVzZW50cyBkZXB0aC4gVGhlIHZhbHVlIG9mIHRoZSB4IHByb3BlcnR5IGluY3JlYXNlcyBhcyB0aGUgb2JqZWN0IG1vdmVzXG4gKiB0byB0aGUgcmlnaHQuIFRoZSB2YWx1ZSBvZiB0aGUgeSBwcm9wZXJ0eSBpbmNyZWFzZXMgYXMgdGhlIG9iamVjdCBtb3Zlc1xuICogZG93bi4gVGhlIHogcHJvcGVydHkgaW5jcmVhc2VzIGFzIHRoZSBvYmplY3QgbW92ZXMgZmFydGhlciBmcm9tIHRoZSBwb2ludFxuICogb2Ygdmlldy4gVXNpbmcgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBhbmQgc2NhbGluZywgdGhlIG9iamVjdCBpcyBzZWVuIHRvIGJlXG4gKiBiaWdnZXIgd2hlbiBuZWFyIGFuZCBzbWFsbGVyIHdoZW4gZmFydGhlciBhd2F5IGZyb20gdGhlIHNjcmVlbi4gQXMgaW4gYVxuICogcmlnaHQtaGFuZGVkIHRocmVlLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGUgc3lzdGVtLCB0aGUgcG9zaXRpdmUgei1heGlzIHBvaW50c1xuICogYXdheSBmcm9tIHRoZSB2aWV3ZXIgYW5kIHRoZSB2YWx1ZSBvZiB0aGUgeiBwcm9wZXJ0eSBpbmNyZWFzZXMgYXMgdGhlIG9iamVjdFxuICogbW92ZXMgYXdheSBmcm9tIHRoZSB2aWV3ZXIncyBleWUuIFRoZSBvcmlnaW4gcG9pbnQgKDAsMCwwKSBvZiB0aGUgZ2xvYmFsXG4gKiBzcGFjZSBpcyB0aGUgdXBwZXItbGVmdCBjb3JuZXIgb2YgdGhlIHN0YWdlLlxuICpcbiAqIDxwPlRoZSBWZWN0b3IzRCBjbGFzcyBjYW4gYWxzbyByZXByZXNlbnQgYSBkaXJlY3Rpb24sIGFuIGFycm93IHBvaW50aW5nIGZyb21cbiAqIHRoZSBvcmlnaW4gb2YgdGhlIGNvb3JkaW5hdGVzLCBzdWNoIGFzICgwLDAsMCksIHRvIGFuIGVuZHBvaW50OyBvciBhXG4gKiBmbG9hdGluZy1wb2ludCBjb21wb25lbnQgb2YgYW4gUkdCIChSZWQsIEdyZWVuLCBCbHVlKSBjb2xvciBtb2RlbC48L3A+XG4gKlxuICogPHA+UXVhdGVybmlvbiBub3RhdGlvbiBpbnRyb2R1Y2VzIGEgZm91cnRoIGVsZW1lbnQsIHRoZSB3IHByb3BlcnR5LCB3aGljaFxuICogcHJvdmlkZXMgYWRkaXRpb25hbCBvcmllbnRhdGlvbiBpbmZvcm1hdGlvbi4gRm9yIGV4YW1wbGUsIHRoZSB3IHByb3BlcnR5IGNhblxuICogZGVmaW5lIGFuIGFuZ2xlIG9mIHJvdGF0aW9uIG9mIGEgVmVjdG9yM0Qgb2JqZWN0LiBUaGUgY29tYmluYXRpb24gb2YgdGhlXG4gKiBhbmdsZSBvZiByb3RhdGlvbiBhbmQgdGhlIGNvb3JkaW5hdGVzIHgsIHksIGFuZCB6IGNhbiBkZXRlcm1pbmUgdGhlIGRpc3BsYXlcbiAqIG9iamVjdCdzIG9yaWVudGF0aW9uLiBIZXJlIGlzIGEgcmVwcmVzZW50YXRpb24gb2YgVmVjdG9yM0QgZWxlbWVudHMgaW5cbiAqIG1hdHJpeCBub3RhdGlvbjo8L3A+XG4gKi9cbmNsYXNzIFZlY3RvcjNEXG57XG5cdC8qKlxuXHQgKiBUaGUgeCBheGlzIGRlZmluZWQgYXMgYSBWZWN0b3IzRCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyAoMSwwLDApLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBYX0FYSVM6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoMSwgMCwgMCk7XG5cblx0LyoqXG5cdCAqIFRoZSB5IGF4aXMgZGVmaW5lZCBhcyBhIFZlY3RvcjNEIG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzICgwLDEsMCkuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFlfQVhJUzpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgwLCAxLCAwKTtcblxuXHQvKipcblx0ICogVGhlIHogYXhpcyBkZWZpbmVkIGFzIGEgVmVjdG9yM0Qgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgKDAsMCwxKS5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgWl9BWElTOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKDAsIDAsIDEpO1xuXG5cdC8qKlxuXHQgKiBUaGUgZmlyc3QgZWxlbWVudCBvZiBhIFZlY3RvcjNEIG9iamVjdCwgc3VjaCBhcyB0aGUgeCBjb29yZGluYXRlIG9mXG5cdCAqIGEgcG9pbnQgaW4gdGhlIHRocmVlLWRpbWVuc2lvbmFsIHNwYWNlLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAwLlxuXHQgKi9cblx0cHVibGljIHg6bnVtYmVyO1xuXG5cdC8qXG5cdCAqVGhlIHNlY29uZCBlbGVtZW50IG9mIGEgVmVjdG9yM0Qgb2JqZWN0LCBzdWNoIGFzIHRoZSB5IGNvb3JkaW5hdGUgb2Zcblx0ICogYSBwb2ludCBpbiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgc3BhY2UuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDAuXG5cdCAqL1xuXHRwdWJsaWMgeTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB0aGlyZCBlbGVtZW50IG9mIGEgVmVjdG9yM0Qgb2JqZWN0LCBzdWNoIGFzIHRoZSB5IGNvb3JkaW5hdGUgb2Zcblx0ICogYSBwb2ludCBpbiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgc3BhY2UuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDAuXG5cdCAqL1xuXHRwdWJsaWMgejpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRUaGUgZm91cnRoIGVsZW1lbnQgb2YgYSBWZWN0b3IzRCBvYmplY3QgKGluIGFkZGl0aW9uIHRvIHRoZSB4LCB5LFxuXHQgKiBhbmQgeiBwcm9wZXJ0aWVzKSBjYW4gaG9sZCBkYXRhIHN1Y2ggYXMgdGhlIGFuZ2xlIG9mIHJvdGF0aW9uLiBUaGVcblx0ICogZGVmYXVsdCB2YWx1ZSBpcyAwLlxuXHQgKlxuXHQgKiA8cD5RdWF0ZXJuaW9uIG5vdGF0aW9uIGVtcGxveXMgYW4gYW5nbGUgYXMgdGhlIGZvdXJ0aCBlbGVtZW50IGluXG5cdCAqIGl0cyBjYWxjdWxhdGlvbiBvZiB0aHJlZS1kaW1lbnNpb25hbCByb3RhdGlvbi4gVGhlIHcgcHJvcGVydHkgY2FuXG5cdCAqIGJlIHVzZWQgdG8gZGVmaW5lIHRoZSBhbmdsZSBvZiByb3RhdGlvbiBhYm91dCB0aGUgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKiBUaGUgY29tYmluYXRpb24gb2YgdGhlIHJvdGF0aW9uIGFuZ2xlIGFuZCB0aGUgY29vcmRpbmF0ZXMgKHgseSx6KVxuXHQgKiBkZXRlcm1pbmVzIHRoZSBkaXNwbGF5IG9iamVjdCdzIG9yaWVudGF0aW9uLjwvcD5cblx0ICpcblx0ICogPHA+SW4gYWRkaXRpb24sIHRoZSB3IHByb3BlcnR5IGNhbiBiZSB1c2VkIGFzIGEgcGVyc3BlY3RpdmUgd2FycFxuXHQgKiBmYWN0b3IgZm9yIGEgcHJvamVjdGVkIHRocmVlLWRpbWVuc2lvbmFsIHBvc2l0aW9uIG9yIGFzIGEgcHJvamVjdGlvblxuXHQgKiB0cmFuc2Zvcm0gdmFsdWUgaW4gcmVwcmVzZW50aW5nIGEgdGhyZWUtZGltZW5zaW9uYWwgY29vcmRpbmF0ZVxuXHQgKiBwcm9qZWN0ZWQgaW50byB0aGUgdHdvLWRpbWVuc2lvbmFsIHNwYWNlLiBGb3IgZXhhbXBsZSwgeW91IGNhblxuXHQgKiBjcmVhdGUgYSBwcm9qZWN0aW9uIG1hdHJpeCB1c2luZyB0aGUgPGNvZGU+TWF0cml4M0QucmF3RGF0YTwvY29kZT5cblx0ICogcHJvcGVydHksIHRoYXQsIHdoZW4gYXBwbGllZCB0byBhIFZlY3RvcjNEIG9iamVjdCwgcHJvZHVjZXMgYVxuXHQgKiB0cmFuc2Zvcm0gdmFsdWUgaW4gdGhlIFZlY3RvcjNEIG9iamVjdCdzIGZvdXJ0aCBlbGVtZW50ICh0aGUgd1xuXHQgKiBwcm9wZXJ0eSkuIERpdmlkaW5nIHRoZSBWZWN0b3IzRCBvYmplY3QncyBvdGhlciBlbGVtZW50cyBieSB0aGVcblx0ICogdHJhbnNmb3JtIHZhbHVlIHRoZW4gcHJvZHVjZXMgYSBwcm9qZWN0ZWQgVmVjdG9yM0Qgb2JqZWN0LiBZb3UgY2FuXG5cdCAqIHVzZSB0aGUgPGNvZGU+VmVjdG9yM0QucHJvamVjdCgpPC9jb2RlPiBtZXRob2QgdG8gZGl2aWRlIHRoZSBmaXJzdFxuXHQgKiB0aHJlZSBlbGVtZW50cyBvZiBhIFZlY3RvcjNEIG9iamVjdCBieSBpdHMgZm91cnRoIGVsZW1lbnQuPC9wPlxuXHQgKi9cblx0cHVibGljIHc6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbGVuZ3RoLCBtYWduaXR1ZGUsIG9mIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdCBmcm9tIHRoZVxuXHQgKiBvcmlnaW4gKDAsMCwwKSB0byB0aGUgb2JqZWN0J3MgeCwgeSwgYW5kIHogY29vcmRpbmF0ZXMuIFRoZSB3XG5cdCAqIHByb3BlcnR5IGlzIGlnbm9yZWQuIEEgdW5pdCB2ZWN0b3IgaGFzIGEgbGVuZ3RoIG9yIG1hZ25pdHVkZSBvZlxuXHQgKiBvbmUuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbmd0aFNxdWFyZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzcXVhcmUgb2YgdGhlIGxlbmd0aCBvZiB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QsIGNhbGN1bGF0ZWRcblx0ICogdXNpbmcgdGhlIHgsIHksIGFuZCB6IHByb3BlcnRpZXMuIFRoZSB3IHByb3BlcnR5IGlzIGlnbm9yZWQuIFVzZSB0aGVcblx0ICogPGNvZGU+bGVuZ3RoU3F1YXJlZCgpPC9jb2RlPiBtZXRob2Qgd2hlbmV2ZXIgcG9zc2libGUgaW5zdGVhZCBvZiB0aGVcblx0ICogc2xvd2VyIDxjb2RlPk1hdGguc3FydCgpPC9jb2RlPiBtZXRob2QgY2FsbCBvZiB0aGVcblx0ICogPGNvZGU+VmVjdG9yM0QubGVuZ3RoKCk8L2NvZGU+IG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgbGVuZ3RoU3F1YXJlZCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueCp0aGlzLnggKyB0aGlzLnkqdGhpcy55ICsgdGhpcy56KnRoaXMuejtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgVmVjdG9yM0Qgb2JqZWN0LiBJZiB5b3UgZG8gbm90IHNwZWNpZnkgYVxuXHQgKiBwYXJhbWV0ZXIgZm9yIHRoZSBjb25zdHJ1Y3RvciwgYSBWZWN0b3IzRCBvYmplY3QgaXMgY3JlYXRlZCB3aXRoXG5cdCAqIHRoZSBlbGVtZW50cyAoMCwwLDAsMCkuXG5cdCAqXG5cdCAqIEBwYXJhbSB4IFRoZSBmaXJzdCBlbGVtZW50LCBzdWNoIGFzIHRoZSB4IGNvb3JkaW5hdGUuXG5cdCAqIEBwYXJhbSB5IFRoZSBzZWNvbmQgZWxlbWVudCwgc3VjaCBhcyB0aGUgeSBjb29yZGluYXRlLlxuXHQgKiBAcGFyYW0geiBUaGUgdGhpcmQgZWxlbWVudCwgc3VjaCBhcyB0aGUgeiBjb29yZGluYXRlLlxuXHQgKiBAcGFyYW0gdyBBbiBvcHRpb25hbCBlbGVtZW50IGZvciBhZGRpdGlvbmFsIGRhdGEgc3VjaCBhcyB0aGUgYW5nbGVcblx0ICogICAgICAgICAgb2Ygcm90YXRpb24uXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih4Om51bWJlciA9IDAsIHk6bnVtYmVyID0gMCwgejpudW1iZXIgPSAwLCB3Om51bWJlciA9IDApXG5cdHtcblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cdFx0dGhpcy56ID0gejtcblx0XHR0aGlzLncgPSB3O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgdGhlIHZhbHVlIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZiB0aGUgY3VycmVudCBWZWN0b3IzRFxuXHQgKiBvYmplY3QgdG8gdGhlIHZhbHVlcyBvZiB0aGUgeCwgeSwgYW5kIHogZWxlbWVudHMgb2YgYW5vdGhlciBWZWN0b3IzRFxuXHQgKiBvYmplY3QuIFRoZSA8Y29kZT5hZGQoKTwvY29kZT4gbWV0aG9kIGRvZXMgbm90IGNoYW5nZSB0aGUgY3VycmVudFxuXHQgKiBWZWN0b3IzRCBvYmplY3QuIEluc3RlYWQsIGl0IHJldHVybnMgYSBuZXcgVmVjdG9yM0Qgb2JqZWN0IHdpdGhcblx0ICogdGhlIG5ldyB2YWx1ZXMuXG5cdCAqXG5cdCAqIDxwPlRoZSByZXN1bHQgb2YgYWRkaW5nIHR3byB2ZWN0b3JzIHRvZ2V0aGVyIGlzIGEgcmVzdWx0YW50IHZlY3Rvci5cblx0ICogT25lIHdheSB0byB2aXN1YWxpemUgdGhlIHJlc3VsdCBpcyBieSBkcmF3aW5nIGEgdmVjdG9yIGZyb20gdGhlXG5cdCAqIG9yaWdpbiBvciB0YWlsIG9mIHRoZSBmaXJzdCB2ZWN0b3IgdG8gdGhlIGVuZCBvciBoZWFkIG9mIHRoZSBzZWNvbmRcblx0ICogdmVjdG9yLiBUaGUgcmVzdWx0YW50IHZlY3RvciBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgb3JpZ2luXG5cdCAqIHBvaW50IG9mIHRoZSBmaXJzdCB2ZWN0b3IgYW5kIHRoZSBlbmQgcG9pbnQgb2YgdGhlIHNlY29uZCB2ZWN0b3IuXG5cdCAqIDwvcD5cblx0ICovXG5cdHB1YmxpYyBhZGQoYTpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiBuZXcgVmVjdG9yM0QodGhpcy54ICsgYS54LCB0aGlzLnkgKyBhLnksIHRoaXMueiArIGEueiwgdGhpcy53ICsgYS53KVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGFuZ2xlIGluIHJhZGlhbnMgYmV0d2VlbiB0d28gdmVjdG9ycy4gVGhlIHJldHVybmVkIGFuZ2xlXG5cdCAqIGlzIHRoZSBzbWFsbGVzdCByYWRpYW4gdGhlIGZpcnN0IFZlY3RvcjNEIG9iamVjdCByb3RhdGVzIHVudGlsIGl0XG5cdCAqIGFsaWducyB3aXRoIHRoZSBzZWNvbmQgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+YW5nbGVCZXR3ZWVuKCk8L2NvZGU+IG1ldGhvZCBpcyBhIHN0YXRpYyBtZXRob2QuIFlvdVxuXHQgKiBjYW4gdXNlIGl0IGRpcmVjdGx5IGFzIGEgbWV0aG9kIG9mIHRoZSBWZWN0b3IzRCBjbGFzcy48L3A+XG5cdCAqXG5cdCAqIDxwPlRvIGNvbnZlcnQgYSBkZWdyZWUgdG8gYSByYWRpYW4sIHlvdSBjYW4gdXNlIHRoZSBmb2xsb3dpbmdcblx0ICogZm9ybXVsYTo8L3A+XG5cdCAqXG5cdCAqIDxwPjxjb2RlPnJhZGlhbiA9IE1hdGguUEkvMTgwICogZGVncmVlPC9jb2RlPjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGEgVGhlIGZpcnN0IFZlY3RvcjNEIG9iamVjdC5cblx0ICogQHBhcmFtIGIgVGhlIHNlY29uZCBWZWN0b3IzRCBvYmplY3QuXG5cdCAqIEByZXR1cm5zIFRoZSBhbmdsZSBiZXR3ZWVuIHR3byBWZWN0b3IzRCBvYmplY3RzLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBhbmdsZUJldHdlZW4oYTpWZWN0b3IzRCwgYjpWZWN0b3IzRCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gTWF0aC5hY29zKGEuZG90UHJvZHVjdChiKS8oYS5sZW5ndGgqYi5sZW5ndGgpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IFZlY3RvcjNEIG9iamVjdCB0aGF0IGlzIGFuIGV4YWN0IGNvcHkgb2YgdGhlIGN1cnJlbnRcblx0ICogVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJucyBBIG5ldyBWZWN0b3IzRCBvYmplY3QgdGhhdCBpcyBhIGNvcHkgb2YgdGhlIGN1cnJlbnRcblx0ICogVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiBuZXcgVmVjdG9yM0QodGhpcy54LCB0aGlzLnksIHRoaXMueiwgdGhpcy53KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgYWxsIG9mIHZlY3RvciBkYXRhIGZyb20gdGhlIHNvdXJjZSBWZWN0b3IzRCBvYmplY3QgaW50byB0aGVcblx0ICogY2FsbGluZyBWZWN0b3IzRCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBzcmMgVGhlIFZlY3RvcjNEIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgdGhlIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgY29weUZyb20oc3JjOlZlY3RvcjNEKTp2b2lkXG5cdHtcblx0XHR0aGlzLnggPSBzcmMueDtcblx0XHR0aGlzLnkgPSBzcmMueTtcblx0XHR0aGlzLnogPSBzcmMuejtcblx0XHR0aGlzLncgPSBzcmMudztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IFZlY3RvcjNEIG9iamVjdCB0aGF0IGlzIHBlcnBlbmRpY3VsYXIgKGF0IGEgcmlnaHRcblx0ICogYW5nbGUpIHRvIHRoZSBjdXJyZW50IFZlY3RvcjNEIGFuZCBhbm90aGVyIFZlY3RvcjNEIG9iamVjdC4gSWYgdGhlXG5cdCAqIHJldHVybmVkIFZlY3RvcjNEIG9iamVjdCdzIGNvb3JkaW5hdGVzIGFyZSAoMCwwLDApLCB0aGVuIHRoZSB0d29cblx0ICogVmVjdG9yM0Qgb2JqZWN0cyBhcmUgcGFyYWxsZWwgdG8gZWFjaCBvdGhlci5cblx0ICpcblx0ICogPHA+WW91IGNhbiB1c2UgdGhlIG5vcm1hbGl6ZWQgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVydGljZXMgb2YgYVxuXHQgKiBwb2x5Z29uIHN1cmZhY2Ugd2l0aCB0aGUgbm9ybWFsaXplZCB2ZWN0b3Igb2YgdGhlIGNhbWVyYSBvciBleWVcblx0ICogdmlld3BvaW50IHRvIGdldCBhIGRvdCBwcm9kdWN0LiBUaGUgdmFsdWUgb2YgdGhlIGRvdCBwcm9kdWN0IGNhblxuXHQgKiBpZGVudGlmeSB3aGV0aGVyIGEgc3VyZmFjZSBvZiBhIHRocmVlLWRpbWVuc2lvbmFsIG9iamVjdCBpcyBoaWRkZW5cblx0ICogZnJvbSB0aGUgdmlld3BvaW50LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGEgQSBzZWNvbmQgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKiBAcmV0dXJucyBBIG5ldyBWZWN0b3IzRCBvYmplY3QgdGhhdCBpcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBjdXJyZW50XG5cdCAqICAgICAgICAgIFZlY3RvcjNEIG9iamVjdCBhbmQgdGhlIFZlY3RvcjNEIG9iamVjdCBzcGVjaWZpZWQgYXMgdGhlXG5cdCAqICAgICAgICAgIHBhcmFtZXRlci5cblx0ICovXG5cdHB1YmxpYyBjcm9zc1Byb2R1Y3QoYTpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiBuZXcgVmVjdG9yM0QodGhpcy55KmEueiAtIHRoaXMueiphLnksIHRoaXMueiphLnggLSB0aGlzLngqYS56LCB0aGlzLngqYS55IC0gdGhpcy55KmEueCwgMSk7XG5cdH1cblxuXHQvKipcblx0ICogRGVjcmVtZW50cyB0aGUgdmFsdWUgb2YgdGhlIHgsIHksIGFuZCB6IGVsZW1lbnRzIG9mIHRoZSBjdXJyZW50XG5cdCAqIFZlY3RvcjNEIG9iamVjdCBieSB0aGUgdmFsdWVzIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZlxuXHQgKiBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0LiBVbmxpa2UgdGhlXG5cdCAqIDxjb2RlPlZlY3RvcjNELnN1YnRyYWN0KCk8L2NvZGU+IG1ldGhvZCwgdGhlXG5cdCAqIDxjb2RlPmRlY3JlbWVudEJ5KCk8L2NvZGU+IG1ldGhvZCBjaGFuZ2VzIHRoZSBjdXJyZW50IFZlY3RvcjNEXG5cdCAqIG9iamVjdCBhbmQgZG9lcyBub3QgcmV0dXJuIGEgbmV3IFZlY3RvcjNEIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIGEgVGhlIFZlY3RvcjNEIG9iamVjdCBjb250YWluaW5nIHRoZSB2YWx1ZXMgdG8gc3VidHJhY3QgZnJvbVxuXHQgKiAgICAgICAgICB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgZGVjcmVtZW50QnkoYTpWZWN0b3IzRClcblx0e1xuXHRcdHRoaXMueCAtPSBhLng7XG5cdFx0dGhpcy55IC09IGEueTtcblx0XHR0aGlzLnogLT0gYS56O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIFZlY3RvcjNEIG9iamVjdHMuIFRoZVxuXHQgKiA8Y29kZT5kaXN0YW5jZSgpPC9jb2RlPiBtZXRob2QgaXMgYSBzdGF0aWMgbWV0aG9kLiBZb3UgY2FuIHVzZSBpdFxuXHQgKiBkaXJlY3RseSBhcyBhIG1ldGhvZCBvZiB0aGUgVmVjdG9yM0QgY2xhc3MgdG8gZ2V0IHRoZSBFdWNsaWRlYW5cblx0ICogZGlzdGFuY2UgYmV0d2VlbiB0d28gdGhyZWUtZGltZW5zaW9uYWwgcG9pbnRzLlxuXHQgKlxuXHQgKiBAcGFyYW0gcHQxIEEgVmVjdG9yM0Qgb2JqZWN0IGFzIHRoZSBmaXJzdCB0aHJlZS1kaW1lbnNpb25hbCBwb2ludC5cblx0ICogQHBhcmFtIHB0MiBBIFZlY3RvcjNEIG9iamVjdCBhcyB0aGUgc2Vjb25kIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50LlxuXHQgKiBAcmV0dXJucyBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gVmVjdG9yM0Qgb2JqZWN0cy5cblx0ICovXG5cdHN0YXRpYyBkaXN0YW5jZShwdDE6VmVjdG9yM0QsIHB0MjpWZWN0b3IzRCk6bnVtYmVyXG5cdHtcblx0XHR2YXIgeDpudW1iZXIgPSAocHQxLnggLSBwdDIueCk7XG5cdFx0dmFyIHk6bnVtYmVyID0gKHB0MS55IC0gcHQyLnkpO1xuXHRcdHZhciB6Om51bWJlciA9IChwdDEueiAtIHB0Mi56KTtcblx0XHRyZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeik7XG5cdH1cblxuXHQvKipcblx0ICogSWYgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IGFuZCB0aGUgb25lIHNwZWNpZmllZCBhcyB0aGVcblx0ICogcGFyYW1ldGVyIGFyZSB1bml0IHZlcnRpY2VzLCB0aGlzIG1ldGhvZCByZXR1cm5zIHRoZSBjb3NpbmUgb2YgdGhlXG5cdCAqIGFuZ2xlIGJldHdlZW4gdGhlIHR3byB2ZXJ0aWNlcy4gVW5pdCB2ZXJ0aWNlcyBhcmUgdmVydGljZXMgdGhhdFxuXHQgKiBwb2ludCB0byB0aGUgc2FtZSBkaXJlY3Rpb24gYnV0IHRoZWlyIGxlbmd0aCBpcyBvbmUuIFRoZXkgcmVtb3ZlIHRoZVxuXHQgKiBsZW5ndGggb2YgdGhlIHZlY3RvciBhcyBhIGZhY3RvciBpbiB0aGUgcmVzdWx0LiBZb3UgY2FuIHVzZSB0aGVcblx0ICogPGNvZGU+bm9ybWFsaXplKCk8L2NvZGU+IG1ldGhvZCB0byBjb252ZXJ0IGEgdmVjdG9yIHRvIGEgdW5pdFxuXHQgKiB2ZWN0b3IuXG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5kb3RQcm9kdWN0KCk8L2NvZGU+IG1ldGhvZCBmaW5kcyB0aGUgYW5nbGUgYmV0d2VlbiB0d29cblx0ICogdmVydGljZXMuIEl0IGlzIGFsc28gdXNlZCBpbiBiYWNrZmFjZSBjdWxsaW5nIG9yIGxpZ2h0aW5nXG5cdCAqIGNhbGN1bGF0aW9ucy4gQmFja2ZhY2UgY3VsbGluZyBpcyBhIHByb2NlZHVyZSBmb3IgZGV0ZXJtaW5pbmcgd2hpY2hcblx0ICogc3VyZmFjZXMgYXJlIGhpZGRlbiBmcm9tIHRoZSB2aWV3cG9pbnQuIFlvdSBjYW4gdXNlIHRoZSBub3JtYWxpemVkXG5cdCAqIHZlcnRpY2VzIGZyb20gdGhlIGNhbWVyYSwgb3IgZXllLCB2aWV3cG9pbnQgYW5kIHRoZSBjcm9zcyBwcm9kdWN0IG9mXG5cdCAqIHRoZSB2ZXJ0aWNlcyBvZiBhIHBvbHlnb24gc3VyZmFjZSB0byBnZXQgdGhlIGRvdCBwcm9kdWN0LiBJZiB0aGUgZG90XG5cdCAqIHByb2R1Y3QgaXMgbGVzcyB0aGFuIHplcm8sIHRoZW4gdGhlIHN1cmZhY2UgaXMgZmFjaW5nIHRoZSBjYW1lcmEgb3Jcblx0ICogdGhlIHZpZXdlci4gSWYgdGhlIHR3byB1bml0IHZlcnRpY2VzIGFyZSBwZXJwZW5kaWN1bGFyIHRvIGVhY2hcblx0ICogb3RoZXIsIHRoZXkgYXJlIG9ydGhvZ29uYWwgYW5kIHRoZSBkb3QgcHJvZHVjdCBpcyB6ZXJvLiBJZiB0aGUgdHdvXG5cdCAqIHZlcnRpY2VzIGFyZSBwYXJhbGxlbCB0byBlYWNoIG90aGVyLCB0aGUgZG90IHByb2R1Y3QgaXMgb25lLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGEgVGhlIHNlY29uZCBWZWN0b3IzRCBvYmplY3QuXG5cdCAqIEByZXR1cm5zIEEgc2NhbGFyIHdoaWNoIGlzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgY3VycmVudCBWZWN0b3IzRFxuXHQgKiAgICAgICAgICBvYmplY3QgYW5kIHRoZSBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkuZ2VvbS5WZWN0b3IzRCNjcm9zc1Byb2R1Y3QoKVxuXHQgKiBAc2VlIGF3YXkuZ2VvbS5WZWN0b3IzRCNub3JtYWxpemUoKVxuXHQgKi9cblx0cHVibGljIGRvdFByb2R1Y3QoYTpWZWN0b3IzRCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy54KmEueCArIHRoaXMueSphLnkgKyB0aGlzLnoqYS56O1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0d28gVmVjdG9yM0Qgb2JqZWN0cyBhcmUgZXF1YWwgYnkgY29tcGFyaW5nIHRoZVxuXHQgKiB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZiB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3Qgd2l0aCBhXG5cdCAqIHNwZWNpZmllZCBWZWN0b3IzRCBvYmplY3QuIElmIHRoZSB2YWx1ZXMgb2YgdGhlc2UgZWxlbWVudHMgYXJlIHRoZVxuXHQgKiBzYW1lLCB0aGUgdHdvIFZlY3RvcjNEIG9iamVjdHMgYXJlIGVxdWFsLiBJZiB0aGUgc2Vjb25kIG9wdGlvbmFsXG5cdCAqIHBhcmFtZXRlciBpcyBzZXQgdG8gdHJ1ZSwgYWxsIGZvdXIgZWxlbWVudHMgb2YgdGhlIFZlY3RvcjNEIG9iamVjdHMsXG5cdCAqIGluY2x1ZGluZyB0aGUgdyBwcm9wZXJ0eSwgYXJlIGNvbXBhcmVkLlxuXHQgKi9cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHRvQ29tcGFyZSBUaGUgVmVjdG9yM0Qgb2JqZWN0IHRvIGJlIGNvbXBhcmVkIHdpdGggdGhlIGN1cnJlbnRcblx0ICogICAgICAgICAgICAgICAgICBWZWN0b3IzRCBvYmplY3QuXG5cdCAqIEBwYXJhbSBhbGxGb3VyICAgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRoYXQgc3BlY2lmaWVzIHdoZXRoZXIgdGhlIHdcblx0ICogICAgICAgICAgICAgICAgICBwcm9wZXJ0eSBvZiB0aGUgVmVjdG9yM0Qgb2JqZWN0cyBpcyB1c2VkIGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgIGNvbXBhcmlzb24uXG5cdCAqIEByZXR1cm5zIEEgdmFsdWUgb2YgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFZlY3RvcjNEIG9iamVjdCBpcyBlcXVhbFxuXHQgKiAgICAgICAgICB0byB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3Q7IGZhbHNlIGlmIGl0IGlzIG5vdCBlcXVhbC5cblx0ICovXG5cdHB1YmxpYyBlcXVhbHModG9Db21wYXJlOlZlY3RvcjNELCBhbGxGb3VyOmJvb2xlYW4gPSBmYWxzZSk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPT0gdG9Db21wYXJlLnggJiYgdGhpcy55ID09IHRvQ29tcGFyZS55ICYmIHRoaXMueiA9PSB0b0NvbXBhcmUueiAmJiAoIWFsbEZvdXIgfHwgdGhpcy53ID09IHRvQ29tcGFyZS53ICkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluY3JlbWVudHMgdGhlIHZhbHVlIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZiB0aGUgY3VycmVudFxuXHQgKiBWZWN0b3IzRCBvYmplY3QgYnkgdGhlIHZhbHVlcyBvZiB0aGUgeCwgeSwgYW5kIHogZWxlbWVudHMgb2YgYVxuXHQgKiBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0LiBVbmxpa2UgdGhlIDxjb2RlPlZlY3RvcjNELmFkZCgpPC9jb2RlPlxuXHQgKiBtZXRob2QsIHRoZSA8Y29kZT5pbmNyZW1lbnRCeSgpPC9jb2RlPiBtZXRob2QgY2hhbmdlcyB0aGUgY3VycmVudFxuXHQgKiBWZWN0b3IzRCBvYmplY3QgYW5kIGRvZXMgbm90IHJldHVybiBhIG5ldyBWZWN0b3IzRCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBhIFRoZSBWZWN0b3IzRCBvYmplY3QgdG8gYmUgYWRkZWQgdG8gdGhlIGN1cnJlbnQgVmVjdG9yM0Rcblx0ICogICAgICAgICAgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGluY3JlbWVudEJ5KGE6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLnggKz0gYS54O1xuXHRcdHRoaXMueSArPSBhLnk7XG5cdFx0dGhpcy56ICs9IGEuejtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlcyB0aGUgZWxlbWVudHMgb2YgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IHdpdGggdGhlXG5cdCAqIGVsZW1lbnRzIG9mIGEgc3BlY2lmaWVkIFZlY3RvcjNEIG9iamVjdCB0byBkZXRlcm1pbmUgd2hldGhlciB0aGV5XG5cdCAqIGFyZSBuZWFybHkgZXF1YWwuIFRoZSB0d28gVmVjdG9yM0Qgb2JqZWN0cyBhcmUgbmVhcmx5IGVxdWFsIGlmIHRoZVxuXHQgKiB2YWx1ZSBvZiBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSB0d28gdmVydGljZXMgYXJlIGVxdWFsLCBvciB0aGVcblx0ICogcmVzdWx0IG9mIHRoZSBjb21wYXJpc29uIGlzIHdpdGhpbiB0aGUgdG9sZXJhbmNlIHJhbmdlLiBUaGVcblx0ICogZGlmZmVyZW5jZSBiZXR3ZWVuIHR3byBlbGVtZW50cyBtdXN0IGJlIGxlc3MgdGhhbiB0aGUgbnVtYmVyXG5cdCAqIHNwZWNpZmllZCBhcyB0aGUgdG9sZXJhbmNlIHBhcmFtZXRlci4gSWYgdGhlIHRoaXJkIG9wdGlvbmFsXG5cdCAqIHBhcmFtZXRlciBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIGFsbCBmb3VyIGVsZW1lbnRzIG9mIHRoZVxuXHQgKiBWZWN0b3IzRCBvYmplY3RzLCBpbmNsdWRpbmcgdGhlIDxjb2RlPnc8L2NvZGU+IHByb3BlcnR5LCBhcmVcblx0ICogY29tcGFyZWQuIE90aGVyd2lzZSwgb25seSB0aGUgeCwgeSwgYW5kIHogZWxlbWVudHMgYXJlIGluY2x1ZGVkIGluXG5cdCAqIHRoZSBjb21wYXJpc29uLlxuXHQgKi9cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHRvQ29tcGFyZSBUaGUgVmVjdG9yM0Qgb2JqZWN0IHRvIGJlIGNvbXBhcmVkIHdpdGggdGhlIGN1cnJlbnRcblx0ICogICAgICAgICAgICAgICAgICBWZWN0b3IzRCBvYmplY3QuXG5cdCAqIEBwYXJhbSB0b2xlcmFuY2UgQSBudW1iZXIgZGV0ZXJtaW5pbmcgdGhlIHRvbGVyYW5jZSBmYWN0b3IuIElmIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgdmFsdWVzIG9mIHRoZSBWZWN0b3IzRFxuXHQgKiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgc3BlY2lmaWVkIGluIHRoZSB0b0NvbXBhcmUgcGFyYW1ldGVyIGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgIHRoZSBjdXJyZW50IFZlY3RvcjNEIGVsZW1lbnQgaXMgbGVzcyB0aGFuIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgIHRvbGVyYW5jZSBudW1iZXIsIHRoZSB0d28gdmFsdWVzIGFyZSBjb25zaWRlcmVkXG5cdCAqICAgICAgICAgICAgICAgICAgbmVhcmx5IGVxdWFsLlxuXHQgKiBAcGFyYW0gYWxsRm91ciAgIEFuIG9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IHNwZWNpZmllcyB3aGV0aGVyIHRoZSB3XG5cdCAqICAgICAgICAgICAgICAgICAgcHJvcGVydHkgb2YgdGhlIFZlY3RvcjNEIG9iamVjdHMgaXMgdXNlZCBpbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICBjb21wYXJpc29uLlxuXHQgKiBAcmV0dXJucyBBIHZhbHVlIG9mIHRydWUgaWYgdGhlIHNwZWNpZmllZCBWZWN0b3IzRCBvYmplY3QgaXMgbmVhcmx5XG5cdCAqICAgICAgICAgIGVxdWFsIHRvIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdDsgZmFsc2UgaWYgaXQgaXMgbm90XG5cdCAqICAgICAgICAgIGVxdWFsLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkuZ2VvbS5WZWN0b3IzRCNlcXVhbHMoKVxuXHQgKi9cblx0cHVibGljIG5lYXJFcXVhbHModG9Db21wYXJlOlZlY3RvcjNELCB0b2xlcmFuY2U6bnVtYmVyLCBhbGxGb3VyOmJvb2xlYW4gPSB0cnVlKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKChNYXRoLmFicyh0aGlzLnggLSB0b0NvbXBhcmUueCkgPCB0b2xlcmFuY2UpICYmIChNYXRoLmFicyh0aGlzLnkgLSB0b0NvbXBhcmUueSkgPCB0b2xlcmFuY2UpICYmIChNYXRoLmFicyh0aGlzLnogLSB0b0NvbXBhcmUueikgPCB0b2xlcmFuY2UpICYmICghYWxsRm91ciB8fCBNYXRoLmFicyh0aGlzLncgLSB0b0NvbXBhcmUudykgPCB0b2xlcmFuY2UpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdCB0byBpdHMgaW52ZXJzZS4gVGhlIGludmVyc2Ugb2JqZWN0XG5cdCAqIGlzIGFsc28gY29uc2lkZXJlZCB0aGUgb3Bwb3NpdGUgb2YgdGhlIG9yaWdpbmFsIG9iamVjdC4gVGhlIHZhbHVlIG9mXG5cdCAqIHRoZSB4LCB5LCBhbmQgeiBwcm9wZXJ0aWVzIG9mIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdCBpcyBjaGFuZ2VkXG5cdCAqIHRvIC14LCAteSwgYW5kIC16LlxuXHQgKi9cblx0cHVibGljIG5lZ2F0ZSgpOnZvaWRcblx0e1xuXHRcdHRoaXMueCA9IC10aGlzLng7XG5cdFx0dGhpcy55ID0gLXRoaXMueTtcblx0XHR0aGlzLnogPSAtdGhpcy56O1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgVmVjdG9yM0Qgb2JqZWN0IHRvIGEgdW5pdCB2ZWN0b3IgYnkgZGl2aWRpbmcgdGhlIGZpcnN0XG5cdCAqIHRocmVlIGVsZW1lbnRzICh4LCB5LCB6KSBieSB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IuIFVuaXQgdmVydGljZXNcblx0ICogYXJlIHZlcnRpY2VzIHRoYXQgaGF2ZSBhIGRpcmVjdGlvbiBidXQgdGhlaXIgbGVuZ3RoIGlzIG9uZS4gVGhleVxuXHQgKiBzaW1wbGlmeSB2ZWN0b3IgY2FsY3VsYXRpb25zIGJ5IHJlbW92aW5nIGxlbmd0aCBhcyBhIGZhY3Rvci5cblx0ICovXG5cdC8qKlxuXHQgKiBTY2FsZXMgdGhlIGxpbmUgc2VnbWVudCBiZXR3ZWVuKDAsMCkgYW5kIHRoZSBjdXJyZW50IHBvaW50IHRvIGEgc2V0XG5cdCAqIGxlbmd0aC5cblx0ICpcblx0ICogQHBhcmFtIHRoaWNrbmVzcyBUaGUgc2NhbGluZyB2YWx1ZS4gRm9yIGV4YW1wbGUsIGlmIHRoZSBjdXJyZW50XG5cdCAqICAgICAgICAgICAgICAgICAgVmVjdG9yM0Qgb2JqZWN0IGlzICgwLDMsNCksIGFuZCB5b3Ugbm9ybWFsaXplIGl0IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgMSwgdGhlIHBvaW50IHJldHVybmVkIGlzIGF0KDAsMC42LDAuOCkuXG5cdCAqL1xuXHRwdWJsaWMgbm9ybWFsaXplKHRoaWNrbmVzczpudW1iZXIgPSAxKVxuXHR7XG5cdFx0aWYgKHRoaXMubGVuZ3RoICE9IDApIHtcblx0XHRcdHZhciBpbnZMZW5ndGggPSB0aGlja25lc3MvdGhpcy5sZW5ndGg7XG5cdFx0XHR0aGlzLnggKj0gaW52TGVuZ3RoO1xuXHRcdFx0dGhpcy55ICo9IGludkxlbmd0aDtcblx0XHRcdHRoaXMueiAqPSBpbnZMZW5ndGg7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIERpdmlkZXMgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIGFuZFxuXHQgKiA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0aWVzIG9mIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdCBieSB0aGVcblx0ICogdmFsdWUgb2YgaXRzIDxjb2RlPnc8L2NvZGU+IHByb3BlcnR5LlxuXHQgKlxuXHQgKiA8cD5JZiB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QgaXMgdGhlIHJlc3VsdCBvZiBtdWx0aXBseWluZyBhXG5cdCAqIFZlY3RvcjNEIG9iamVjdCBieSBhIHByb2plY3Rpb24gTWF0cml4M0Qgb2JqZWN0LCB0aGUgdyBwcm9wZXJ0eSBjYW5cblx0ICogaG9sZCB0aGUgdHJhbnNmb3JtIHZhbHVlLiBUaGUgPGNvZGU+cHJvamVjdCgpPC9jb2RlPiBtZXRob2QgdGhlbiBjYW5cblx0ICogY29tcGxldGUgdGhlIHByb2plY3Rpb24gYnkgZGl2aWRpbmcgdGhlIGVsZW1lbnRzIGJ5IHRoZVxuXHQgKiA8Y29kZT53PC9jb2RlPiBwcm9wZXJ0eS4gVXNlIHRoZSA8Y29kZT5NYXRyaXgzRC5yYXdEYXRhPC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSB0byBjcmVhdGUgYSBwcm9qZWN0aW9uIE1hdHJpeDNEIG9iamVjdC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgcHJvamVjdCgpOnZvaWRcblx0e1xuXHRcdHRoaXMueCAvPSB0aGlzLnc7XG5cdFx0dGhpcy55IC89IHRoaXMudztcblx0XHR0aGlzLnogLz0gdGhpcy53O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNjYWxlcyB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QgYnkgYSBzY2FsYXIsIGEgbWFnbml0dWRlLiBUaGVcblx0ICogVmVjdG9yM0Qgb2JqZWN0J3MgeCwgeSwgYW5kIHogZWxlbWVudHMgYXJlIG11bHRpcGxpZWQgYnkgdGhlIHNjYWxhclxuXHQgKiBudW1iZXIgc3BlY2lmaWVkIGluIHRoZSBwYXJhbWV0ZXIuIEZvciBleGFtcGxlLCBpZiB0aGUgdmVjdG9yIGlzXG5cdCAqIHNjYWxlZCBieSB0ZW4sIHRoZSByZXN1bHQgaXMgYSB2ZWN0b3IgdGhhdCBpcyB0ZW4gdGltZXMgbG9uZ2VyLiBUaGVcblx0ICogc2NhbGFyIGNhbiBhbHNvIGNoYW5nZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSB2ZWN0b3IuIE11bHRpcGx5aW5nIHRoZVxuXHQgKiB2ZWN0b3IgYnkgYSBuZWdhdGl2ZSBudW1iZXIgcmV2ZXJzZXMgaXRzIGRpcmVjdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHMgQSBtdWx0aXBsaWVyIChzY2FsYXIpIHVzZWQgdG8gc2NhbGUgYSBWZWN0b3IzRCBvYmplY3QuXG5cblx0ICovXG5cdHB1YmxpYyBzY2FsZUJ5KHM6bnVtYmVyKTp2b2lkXG5cdHtcblx0XHR0aGlzLnggKj0gcztcblx0XHR0aGlzLnkgKj0gcztcblx0XHR0aGlzLnogKj0gcztcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBtZW1iZXJzIG9mIFZlY3RvcjNEIHRvIHRoZSBzcGVjaWZpZWQgdmFsdWVzXG5cdCAqXG5cdCAqIEBwYXJhbSB4YSBUaGUgZmlyc3QgZWxlbWVudCwgc3VjaCBhcyB0aGUgeCBjb29yZGluYXRlLlxuXHQgKiBAcGFyYW0geWEgVGhlIHNlY29uZCBlbGVtZW50LCBzdWNoIGFzIHRoZSB5IGNvb3JkaW5hdGUuXG5cdCAqIEBwYXJhbSB6YSBUaGUgdGhpcmQgZWxlbWVudCwgc3VjaCBhcyB0aGUgeiBjb29yZGluYXRlLlxuXHQgKi9cblx0cHVibGljIHNldFRvKHhhOm51bWJlciwgeWE6bnVtYmVyLCB6YTpudW1iZXIpOnZvaWRcblx0e1xuXHRcdHRoaXMueCA9IHhhO1xuXHRcdHRoaXMueSA9IHlhO1xuXHRcdHRoaXMueiA9IHphO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnRyYWN0cyB0aGUgdmFsdWUgb2YgdGhlIHgsIHksIGFuZCB6IGVsZW1lbnRzIG9mIHRoZSBjdXJyZW50XG5cdCAqIFZlY3RvcjNEIG9iamVjdCBmcm9tIHRoZSB2YWx1ZXMgb2YgdGhlIHgsIHksIGFuZCB6IGVsZW1lbnRzIG9mXG5cdCAqIGFub3RoZXIgVmVjdG9yM0Qgb2JqZWN0LiBUaGUgPGNvZGU+c3VidHJhY3QoKTwvY29kZT4gbWV0aG9kIGRvZXMgbm90XG5cdCAqIGNoYW5nZSB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QuIEluc3RlYWQsIHRoaXMgbWV0aG9kIHJldHVybnMgYVxuXHQgKiBuZXcgVmVjdG9yM0Qgb2JqZWN0IHdpdGggdGhlIG5ldyB2YWx1ZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSBhIFRoZSBWZWN0b3IzRCBvYmplY3QgdG8gYmUgc3VidHJhY3RlZCBmcm9tIHRoZSBjdXJyZW50XG5cdCAqICAgICAgICAgIFZlY3RvcjNEIG9iamVjdC5cblx0ICogQHJldHVybnMgQSBuZXcgVmVjdG9yM0Qgb2JqZWN0IHRoYXQgaXMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVcblx0ICogICAgICAgICAgY3VycmVudCBWZWN0b3IzRCBhbmQgdGhlIHNwZWNpZmllZCBWZWN0b3IzRCBvYmplY3QuXG5cdCAqXG5cdCAqIEBzZWUgYXdheS5nZW9tLlZlY3RvcjNEI2RlY3JlbWVudEJ5KClcblx0ICovXG5cdHB1YmxpYyBzdWJ0cmFjdChhOlZlY3RvcjNEKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzRCh0aGlzLnggLSBhLngsIHRoaXMueSAtIGEueSwgdGhpcy56IC0gYS56KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdC4gVGhlXG5cdCAqIHN0cmluZyBjb250YWlucyB0aGUgdmFsdWVzIG9mIHRoZSB4LCB5LCBhbmQgeiBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIHRvU3RyaW5nKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gXCJbVmVjdG9yM0RdICh4OlwiICsgdGhpcy54ICsgXCIgLHk6XCIgKyB0aGlzLnkgKyBcIiwgelwiICsgdGhpcy56ICsgXCIsIHc6XCIgKyB0aGlzLncgKyBcIilcIjtcblx0fVxufVxuXG5leHBvcnQgPSBWZWN0b3IzRDsiXX0=