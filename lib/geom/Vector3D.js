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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNELnRzIl0sIm5hbWVzIjpbIlZlY3RvcjNEIiwiVmVjdG9yM0QuY29uc3RydWN0b3IiLCJWZWN0b3IzRC5sZW5ndGgiLCJWZWN0b3IzRC5sZW5ndGhTcXVhcmVkIiwiVmVjdG9yM0QuYWRkIiwiVmVjdG9yM0QuYW5nbGVCZXR3ZWVuIiwiVmVjdG9yM0QuY2xvbmUiLCJWZWN0b3IzRC5jb3B5RnJvbSIsIlZlY3RvcjNELmNyb3NzUHJvZHVjdCIsIlZlY3RvcjNELmRlY3JlbWVudEJ5IiwiVmVjdG9yM0QuZGlzdGFuY2UiLCJWZWN0b3IzRC5kb3RQcm9kdWN0IiwiVmVjdG9yM0QuZXF1YWxzIiwiVmVjdG9yM0QuaW5jcmVtZW50QnkiLCJWZWN0b3IzRC5uZWFyRXF1YWxzIiwiVmVjdG9yM0QubmVnYXRlIiwiVmVjdG9yM0Qubm9ybWFsaXplIiwiVmVjdG9yM0QucHJvamVjdCIsIlZlY3RvcjNELnNjYWxlQnkiLCJWZWN0b3IzRC5zZXRUbyIsIlZlY3RvcjNELnN1YnRyYWN0IiwiVmVjdG9yM0QudG9TdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBLEFBMEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxRQUFRO0lBbUZiQTs7Ozs7Ozs7OztPQVVHQTtJQUNIQSxTQTlGS0EsUUFBUUEsQ0E4RkRBLENBQVlBLEVBQUVBLENBQVlBLEVBQUVBLENBQVlBLEVBQUVBLENBQVlBO1FBQXREQyxpQkFBWUEsR0FBWkEsS0FBWUE7UUFBRUEsaUJBQVlBLEdBQVpBLEtBQVlBO1FBQUVBLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFFakVBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO0lBQ1pBLENBQUNBO0lBbENERCxzQkFBV0EsNEJBQU1BO1FBTmpCQTs7Ozs7V0FLR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7UUFDdENBLENBQUNBOzs7T0FBQUY7SUFTREEsc0JBQVdBLG1DQUFhQTtRQVB4QkE7Ozs7OztXQU1HQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0REEsQ0FBQ0E7OztPQUFBSDtJQXFCREE7Ozs7Ozs7Ozs7Ozs7T0FhR0E7SUFDSUEsc0JBQUdBLEdBQVZBLFVBQVdBLENBQVVBO1FBRXBCSSxNQUFNQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQTtJQUM1RUEsQ0FBQ0E7SUFFREo7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkdBO0lBQ1dBLHFCQUFZQSxHQUExQkEsVUFBMkJBLENBQVVBLEVBQUVBLENBQVVBO1FBRWhESyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUN2REEsQ0FBQ0E7SUFFREw7Ozs7OztPQU1HQTtJQUNJQSx3QkFBS0EsR0FBWkE7UUFFQ00sTUFBTUEsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDckRBLENBQUNBO0lBRUROOzs7OztPQUtHQTtJQUNJQSwyQkFBUUEsR0FBZkEsVUFBZ0JBLEdBQVlBO1FBRTNCTyxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNmQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNmQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNmQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNoQkEsQ0FBQ0E7SUFFRFA7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkdBO0lBQ0lBLCtCQUFZQSxHQUFuQkEsVUFBb0JBLENBQVVBO1FBRTdCUSxNQUFNQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNuR0EsQ0FBQ0E7SUFFRFI7Ozs7Ozs7Ozs7T0FVR0E7SUFDSUEsOEJBQVdBLEdBQWxCQSxVQUFtQkEsQ0FBVUE7UUFFNUJTLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ2RBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ2RBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ2ZBLENBQUNBO0lBRURUOzs7Ozs7Ozs7T0FTR0E7SUFDSUEsaUJBQVFBLEdBQWZBLFVBQWdCQSxHQUFZQSxFQUFFQSxHQUFZQTtRQUV6Q1UsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDL0JBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMvQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDbkNBLENBQUNBO0lBRURWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBCR0E7SUFDSUEsNkJBQVVBLEdBQWpCQSxVQUFrQkEsQ0FBVUE7UUFFM0JXLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQzdDQSxDQUFDQTtJQUVEWDs7Ozs7OztPQU9HQTtJQUVIQTs7Ozs7Ozs7O09BU0dBO0lBQ0lBLHlCQUFNQSxHQUFiQSxVQUFjQSxTQUFrQkEsRUFBRUEsT0FBdUJBO1FBQXZCWSx1QkFBdUJBLEdBQXZCQSxlQUF1QkE7UUFFeERBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLENBQUNBLENBQUVBLENBQUNBLENBQUNBO0lBQzFIQSxDQUFDQTtJQUVEWjs7Ozs7Ozs7O09BU0dBO0lBQ0lBLDhCQUFXQSxHQUFsQkEsVUFBbUJBLENBQVVBO1FBRTVCYSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNkQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNkQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUVEYjs7Ozs7Ozs7Ozs7O09BWUdBO0lBRUhBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkdBO0lBQ0lBLDZCQUFVQSxHQUFqQkEsVUFBa0JBLFNBQWtCQSxFQUFFQSxTQUFnQkEsRUFBRUEsT0FBc0JBO1FBQXRCYyx1QkFBc0JBLEdBQXRCQSxjQUFzQkE7UUFFN0VBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO0lBQ25OQSxDQUFDQTtJQUVEZDs7Ozs7T0FLR0E7SUFDSUEseUJBQU1BLEdBQWJBO1FBRUNlLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDbEJBLENBQUNBO0lBRURmOzs7OztPQUtHQTtJQUNIQTs7Ozs7OztPQU9HQTtJQUNJQSw0QkFBU0EsR0FBaEJBLFVBQWlCQSxTQUFvQkE7UUFBcEJnQix5QkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFFcENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxJQUFJQSxTQUFTQSxHQUFHQSxTQUFTQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUN0Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0E7WUFDcEJBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBO1lBQ3BCQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQTtZQUNwQkEsTUFBTUEsQ0FBQ0E7UUFDUkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFRGhCOzs7Ozs7Ozs7OztPQVdHQTtJQUNJQSwwQkFBT0EsR0FBZEE7UUFFQ2lCLElBQUlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDbEJBLENBQUNBO0lBRURqQjs7Ozs7Ozs7OztPQVVHQTtJQUNJQSwwQkFBT0EsR0FBZEEsVUFBZUEsQ0FBUUE7UUFFdEJrQixJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNiQSxDQUFDQTtJQUVEbEI7Ozs7OztPQU1HQTtJQUNJQSx3QkFBS0EsR0FBWkEsVUFBYUEsRUFBU0EsRUFBRUEsRUFBU0EsRUFBRUEsRUFBU0E7UUFFM0NtQixJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtJQUNiQSxDQUFDQTtJQUVEbkI7Ozs7Ozs7Ozs7Ozs7T0FhR0E7SUFDSUEsMkJBQVFBLEdBQWZBLFVBQWdCQSxDQUFVQTtRQUV6Qm9CLE1BQU1BLENBQUNBLElBQUlBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQy9EQSxDQUFDQTtJQUVEcEI7OztPQUdHQTtJQUNJQSwyQkFBUUEsR0FBZkE7UUFFQ3FCLE1BQU1BLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7SUFDN0ZBLENBQUNBO0lBbmNEckI7O09BRUdBO0lBQ1dBLGVBQU1BLEdBQVlBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO0lBRXREQTs7T0FFR0E7SUFDV0EsZUFBTUEsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFdERBOztPQUVHQTtJQUNXQSxlQUFNQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtJQXVidkRBLGVBQUNBO0FBQURBLENBdGNBLEFBc2NDQSxJQUFBO0FBRUQsQUFBa0IsaUJBQVQsUUFBUSxDQUFDIiwiZmlsZSI6Imdlb20vVmVjdG9yM0QuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoZSBWZWN0b3IzRCBjbGFzcyByZXByZXNlbnRzIGEgcG9pbnQgb3IgYSBsb2NhdGlvbiBpbiB0aGUgdGhyZWUtZGltZW5zaW9uYWxcclxuICogc3BhY2UgdXNpbmcgdGhlIENhcnRlc2lhbiBjb29yZGluYXRlcyB4LCB5LCBhbmQgei4gQXMgaW4gYSB0d28tZGltZW5zaW9uYWxcclxuICogc3BhY2UsIHRoZSB4IHByb3BlcnR5IHJlcHJlc2VudHMgdGhlIGhvcml6b250YWwgYXhpcyBhbmQgdGhlIHkgcHJvcGVydHlcclxuICogcmVwcmVzZW50cyB0aGUgdmVydGljYWwgYXhpcy4gSW4gdGhyZWUtZGltZW5zaW9uYWwgc3BhY2UsIHRoZSB6IHByb3BlcnR5XHJcbiAqIHJlcHJlc2VudHMgZGVwdGguIFRoZSB2YWx1ZSBvZiB0aGUgeCBwcm9wZXJ0eSBpbmNyZWFzZXMgYXMgdGhlIG9iamVjdCBtb3Zlc1xyXG4gKiB0byB0aGUgcmlnaHQuIFRoZSB2YWx1ZSBvZiB0aGUgeSBwcm9wZXJ0eSBpbmNyZWFzZXMgYXMgdGhlIG9iamVjdCBtb3Zlc1xyXG4gKiBkb3duLiBUaGUgeiBwcm9wZXJ0eSBpbmNyZWFzZXMgYXMgdGhlIG9iamVjdCBtb3ZlcyBmYXJ0aGVyIGZyb20gdGhlIHBvaW50XHJcbiAqIG9mIHZpZXcuIFVzaW5nIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gYW5kIHNjYWxpbmcsIHRoZSBvYmplY3QgaXMgc2VlbiB0byBiZVxyXG4gKiBiaWdnZXIgd2hlbiBuZWFyIGFuZCBzbWFsbGVyIHdoZW4gZmFydGhlciBhd2F5IGZyb20gdGhlIHNjcmVlbi4gQXMgaW4gYVxyXG4gKiByaWdodC1oYW5kZWQgdGhyZWUtZGltZW5zaW9uYWwgY29vcmRpbmF0ZSBzeXN0ZW0sIHRoZSBwb3NpdGl2ZSB6LWF4aXMgcG9pbnRzXHJcbiAqIGF3YXkgZnJvbSB0aGUgdmlld2VyIGFuZCB0aGUgdmFsdWUgb2YgdGhlIHogcHJvcGVydHkgaW5jcmVhc2VzIGFzIHRoZSBvYmplY3RcclxuICogbW92ZXMgYXdheSBmcm9tIHRoZSB2aWV3ZXIncyBleWUuIFRoZSBvcmlnaW4gcG9pbnQgKDAsMCwwKSBvZiB0aGUgZ2xvYmFsXHJcbiAqIHNwYWNlIGlzIHRoZSB1cHBlci1sZWZ0IGNvcm5lciBvZiB0aGUgc3RhZ2UuXHJcbiAqXHJcbiAqIDxwPlRoZSBWZWN0b3IzRCBjbGFzcyBjYW4gYWxzbyByZXByZXNlbnQgYSBkaXJlY3Rpb24sIGFuIGFycm93IHBvaW50aW5nIGZyb21cclxuICogdGhlIG9yaWdpbiBvZiB0aGUgY29vcmRpbmF0ZXMsIHN1Y2ggYXMgKDAsMCwwKSwgdG8gYW4gZW5kcG9pbnQ7IG9yIGFcclxuICogZmxvYXRpbmctcG9pbnQgY29tcG9uZW50IG9mIGFuIFJHQiAoUmVkLCBHcmVlbiwgQmx1ZSkgY29sb3IgbW9kZWwuPC9wPlxyXG4gKlxyXG4gKiA8cD5RdWF0ZXJuaW9uIG5vdGF0aW9uIGludHJvZHVjZXMgYSBmb3VydGggZWxlbWVudCwgdGhlIHcgcHJvcGVydHksIHdoaWNoXHJcbiAqIHByb3ZpZGVzIGFkZGl0aW9uYWwgb3JpZW50YXRpb24gaW5mb3JtYXRpb24uIEZvciBleGFtcGxlLCB0aGUgdyBwcm9wZXJ0eSBjYW5cclxuICogZGVmaW5lIGFuIGFuZ2xlIG9mIHJvdGF0aW9uIG9mIGEgVmVjdG9yM0Qgb2JqZWN0LiBUaGUgY29tYmluYXRpb24gb2YgdGhlXHJcbiAqIGFuZ2xlIG9mIHJvdGF0aW9uIGFuZCB0aGUgY29vcmRpbmF0ZXMgeCwgeSwgYW5kIHogY2FuIGRldGVybWluZSB0aGUgZGlzcGxheVxyXG4gKiBvYmplY3QncyBvcmllbnRhdGlvbi4gSGVyZSBpcyBhIHJlcHJlc2VudGF0aW9uIG9mIFZlY3RvcjNEIGVsZW1lbnRzIGluXHJcbiAqIG1hdHJpeCBub3RhdGlvbjo8L3A+XHJcbiAqL1xyXG5jbGFzcyBWZWN0b3IzRFxyXG57XHJcblx0LyoqXHJcblx0ICogVGhlIHggYXhpcyBkZWZpbmVkIGFzIGEgVmVjdG9yM0Qgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgKDEsMCwwKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFhfQVhJUzpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgxLCAwLCAwKTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHkgYXhpcyBkZWZpbmVkIGFzIGEgVmVjdG9yM0Qgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgKDAsMSwwKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFlfQVhJUzpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgwLCAxLCAwKTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHogYXhpcyBkZWZpbmVkIGFzIGEgVmVjdG9yM0Qgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgKDAsMCwxKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFpfQVhJUzpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgwLCAwLCAxKTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGZpcnN0IGVsZW1lbnQgb2YgYSBWZWN0b3IzRCBvYmplY3QsIHN1Y2ggYXMgdGhlIHggY29vcmRpbmF0ZSBvZlxyXG5cdCAqIGEgcG9pbnQgaW4gdGhlIHRocmVlLWRpbWVuc2lvbmFsIHNwYWNlLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAwLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB4Om51bWJlcjtcclxuXHJcblx0LypcclxuXHQgKlRoZSBzZWNvbmQgZWxlbWVudCBvZiBhIFZlY3RvcjNEIG9iamVjdCwgc3VjaCBhcyB0aGUgeSBjb29yZGluYXRlIG9mXHJcblx0ICogYSBwb2ludCBpbiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgc3BhY2UuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDAuXHJcblx0ICovXHJcblx0cHVibGljIHk6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdGhpcmQgZWxlbWVudCBvZiBhIFZlY3RvcjNEIG9iamVjdCwgc3VjaCBhcyB0aGUgeSBjb29yZGluYXRlIG9mXHJcblx0ICogYSBwb2ludCBpbiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgc3BhY2UuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDAuXHJcblx0ICovXHJcblx0cHVibGljIHo6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUVGhlIGZvdXJ0aCBlbGVtZW50IG9mIGEgVmVjdG9yM0Qgb2JqZWN0IChpbiBhZGRpdGlvbiB0byB0aGUgeCwgeSxcclxuXHQgKiBhbmQgeiBwcm9wZXJ0aWVzKSBjYW4gaG9sZCBkYXRhIHN1Y2ggYXMgdGhlIGFuZ2xlIG9mIHJvdGF0aW9uLiBUaGVcclxuXHQgKiBkZWZhdWx0IHZhbHVlIGlzIDAuXHJcblx0ICpcclxuXHQgKiA8cD5RdWF0ZXJuaW9uIG5vdGF0aW9uIGVtcGxveXMgYW4gYW5nbGUgYXMgdGhlIGZvdXJ0aCBlbGVtZW50IGluXHJcblx0ICogaXRzIGNhbGN1bGF0aW9uIG9mIHRocmVlLWRpbWVuc2lvbmFsIHJvdGF0aW9uLiBUaGUgdyBwcm9wZXJ0eSBjYW5cclxuXHQgKiBiZSB1c2VkIHRvIGRlZmluZSB0aGUgYW5nbGUgb2Ygcm90YXRpb24gYWJvdXQgdGhlIFZlY3RvcjNEIG9iamVjdC5cclxuXHQgKiBUaGUgY29tYmluYXRpb24gb2YgdGhlIHJvdGF0aW9uIGFuZ2xlIGFuZCB0aGUgY29vcmRpbmF0ZXMgKHgseSx6KVxyXG5cdCAqIGRldGVybWluZXMgdGhlIGRpc3BsYXkgb2JqZWN0J3Mgb3JpZW50YXRpb24uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SW4gYWRkaXRpb24sIHRoZSB3IHByb3BlcnR5IGNhbiBiZSB1c2VkIGFzIGEgcGVyc3BlY3RpdmUgd2FycFxyXG5cdCAqIGZhY3RvciBmb3IgYSBwcm9qZWN0ZWQgdGhyZWUtZGltZW5zaW9uYWwgcG9zaXRpb24gb3IgYXMgYSBwcm9qZWN0aW9uXHJcblx0ICogdHJhbnNmb3JtIHZhbHVlIGluIHJlcHJlc2VudGluZyBhIHRocmVlLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGVcclxuXHQgKiBwcm9qZWN0ZWQgaW50byB0aGUgdHdvLWRpbWVuc2lvbmFsIHNwYWNlLiBGb3IgZXhhbXBsZSwgeW91IGNhblxyXG5cdCAqIGNyZWF0ZSBhIHByb2plY3Rpb24gbWF0cml4IHVzaW5nIHRoZSA8Y29kZT5NYXRyaXgzRC5yYXdEYXRhPC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5LCB0aGF0LCB3aGVuIGFwcGxpZWQgdG8gYSBWZWN0b3IzRCBvYmplY3QsIHByb2R1Y2VzIGFcclxuXHQgKiB0cmFuc2Zvcm0gdmFsdWUgaW4gdGhlIFZlY3RvcjNEIG9iamVjdCdzIGZvdXJ0aCBlbGVtZW50ICh0aGUgd1xyXG5cdCAqIHByb3BlcnR5KS4gRGl2aWRpbmcgdGhlIFZlY3RvcjNEIG9iamVjdCdzIG90aGVyIGVsZW1lbnRzIGJ5IHRoZVxyXG5cdCAqIHRyYW5zZm9ybSB2YWx1ZSB0aGVuIHByb2R1Y2VzIGEgcHJvamVjdGVkIFZlY3RvcjNEIG9iamVjdC4gWW91IGNhblxyXG5cdCAqIHVzZSB0aGUgPGNvZGU+VmVjdG9yM0QucHJvamVjdCgpPC9jb2RlPiBtZXRob2QgdG8gZGl2aWRlIHRoZSBmaXJzdFxyXG5cdCAqIHRocmVlIGVsZW1lbnRzIG9mIGEgVmVjdG9yM0Qgb2JqZWN0IGJ5IGl0cyBmb3VydGggZWxlbWVudC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHc6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbGVuZ3RoLCBtYWduaXR1ZGUsIG9mIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdCBmcm9tIHRoZVxyXG5cdCAqIG9yaWdpbiAoMCwwLDApIHRvIHRoZSBvYmplY3QncyB4LCB5LCBhbmQgeiBjb29yZGluYXRlcy4gVGhlIHdcclxuXHQgKiBwcm9wZXJ0eSBpcyBpZ25vcmVkLiBBIHVuaXQgdmVjdG9yIGhhcyBhIGxlbmd0aCBvciBtYWduaXR1ZGUgb2ZcclxuXHQgKiBvbmUuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBsZW5ndGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgc3F1YXJlIG9mIHRoZSBsZW5ndGggb2YgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0LCBjYWxjdWxhdGVkXHJcblx0ICogdXNpbmcgdGhlIHgsIHksIGFuZCB6IHByb3BlcnRpZXMuIFRoZSB3IHByb3BlcnR5IGlzIGlnbm9yZWQuIFVzZSB0aGVcclxuXHQgKiA8Y29kZT5sZW5ndGhTcXVhcmVkKCk8L2NvZGU+IG1ldGhvZCB3aGVuZXZlciBwb3NzaWJsZSBpbnN0ZWFkIG9mIHRoZVxyXG5cdCAqIHNsb3dlciA8Y29kZT5NYXRoLnNxcnQoKTwvY29kZT4gbWV0aG9kIGNhbGwgb2YgdGhlXHJcblx0ICogPGNvZGU+VmVjdG9yM0QubGVuZ3RoKCk8L2NvZGU+IG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxlbmd0aFNxdWFyZWQoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy54KnRoaXMueCArIHRoaXMueSp0aGlzLnkgKyB0aGlzLnoqdGhpcy56O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBhIFZlY3RvcjNEIG9iamVjdC4gSWYgeW91IGRvIG5vdCBzcGVjaWZ5IGFcclxuXHQgKiBwYXJhbWV0ZXIgZm9yIHRoZSBjb25zdHJ1Y3RvciwgYSBWZWN0b3IzRCBvYmplY3QgaXMgY3JlYXRlZCB3aXRoXHJcblx0ICogdGhlIGVsZW1lbnRzICgwLDAsMCwwKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB4IFRoZSBmaXJzdCBlbGVtZW50LCBzdWNoIGFzIHRoZSB4IGNvb3JkaW5hdGUuXHJcblx0ICogQHBhcmFtIHkgVGhlIHNlY29uZCBlbGVtZW50LCBzdWNoIGFzIHRoZSB5IGNvb3JkaW5hdGUuXHJcblx0ICogQHBhcmFtIHogVGhlIHRoaXJkIGVsZW1lbnQsIHN1Y2ggYXMgdGhlIHogY29vcmRpbmF0ZS5cclxuXHQgKiBAcGFyYW0gdyBBbiBvcHRpb25hbCBlbGVtZW50IGZvciBhZGRpdGlvbmFsIGRhdGEgc3VjaCBhcyB0aGUgYW5nbGVcclxuXHQgKiAgICAgICAgICBvZiByb3RhdGlvbi5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcih4Om51bWJlciA9IDAsIHk6bnVtYmVyID0gMCwgejpudW1iZXIgPSAwLCB3Om51bWJlciA9IDApXHJcblx0e1xyXG5cdFx0dGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHJcblx0XHR0aGlzLnogPSB6O1xyXG5cdFx0dGhpcy53ID0gdztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIHZhbHVlIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZiB0aGUgY3VycmVudCBWZWN0b3IzRFxyXG5cdCAqIG9iamVjdCB0byB0aGUgdmFsdWVzIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZiBhbm90aGVyIFZlY3RvcjNEXHJcblx0ICogb2JqZWN0LiBUaGUgPGNvZGU+YWRkKCk8L2NvZGU+IG1ldGhvZCBkb2VzIG5vdCBjaGFuZ2UgdGhlIGN1cnJlbnRcclxuXHQgKiBWZWN0b3IzRCBvYmplY3QuIEluc3RlYWQsIGl0IHJldHVybnMgYSBuZXcgVmVjdG9yM0Qgb2JqZWN0IHdpdGhcclxuXHQgKiB0aGUgbmV3IHZhbHVlcy5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSByZXN1bHQgb2YgYWRkaW5nIHR3byB2ZWN0b3JzIHRvZ2V0aGVyIGlzIGEgcmVzdWx0YW50IHZlY3Rvci5cclxuXHQgKiBPbmUgd2F5IHRvIHZpc3VhbGl6ZSB0aGUgcmVzdWx0IGlzIGJ5IGRyYXdpbmcgYSB2ZWN0b3IgZnJvbSB0aGVcclxuXHQgKiBvcmlnaW4gb3IgdGFpbCBvZiB0aGUgZmlyc3QgdmVjdG9yIHRvIHRoZSBlbmQgb3IgaGVhZCBvZiB0aGUgc2Vjb25kXHJcblx0ICogdmVjdG9yLiBUaGUgcmVzdWx0YW50IHZlY3RvciBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgb3JpZ2luXHJcblx0ICogcG9pbnQgb2YgdGhlIGZpcnN0IHZlY3RvciBhbmQgdGhlIGVuZCBwb2ludCBvZiB0aGUgc2Vjb25kIHZlY3Rvci5cclxuXHQgKiA8L3A+XHJcblx0ICovXHJcblx0cHVibGljIGFkZChhOlZlY3RvcjNEKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgVmVjdG9yM0QodGhpcy54ICsgYS54LCB0aGlzLnkgKyBhLnksIHRoaXMueiArIGEueiwgdGhpcy53ICsgYS53KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgYW5nbGUgaW4gcmFkaWFucyBiZXR3ZWVuIHR3byB2ZWN0b3JzLiBUaGUgcmV0dXJuZWQgYW5nbGVcclxuXHQgKiBpcyB0aGUgc21hbGxlc3QgcmFkaWFuIHRoZSBmaXJzdCBWZWN0b3IzRCBvYmplY3Qgcm90YXRlcyB1bnRpbCBpdFxyXG5cdCAqIGFsaWducyB3aXRoIHRoZSBzZWNvbmQgVmVjdG9yM0Qgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmFuZ2xlQmV0d2VlbigpPC9jb2RlPiBtZXRob2QgaXMgYSBzdGF0aWMgbWV0aG9kLiBZb3VcclxuXHQgKiBjYW4gdXNlIGl0IGRpcmVjdGx5IGFzIGEgbWV0aG9kIG9mIHRoZSBWZWN0b3IzRCBjbGFzcy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UbyBjb252ZXJ0IGEgZGVncmVlIHRvIGEgcmFkaWFuLCB5b3UgY2FuIHVzZSB0aGUgZm9sbG93aW5nXHJcblx0ICogZm9ybXVsYTo8L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Y29kZT5yYWRpYW4gPSBNYXRoLlBJLzE4MCAqIGRlZ3JlZTwvY29kZT48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gYSBUaGUgZmlyc3QgVmVjdG9yM0Qgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSBiIFRoZSBzZWNvbmQgVmVjdG9yM0Qgb2JqZWN0LlxyXG5cdCAqIEByZXR1cm5zIFRoZSBhbmdsZSBiZXR3ZWVuIHR3byBWZWN0b3IzRCBvYmplY3RzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgYW5nbGVCZXR3ZWVuKGE6VmVjdG9yM0QsIGI6VmVjdG9yM0QpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiBNYXRoLmFjb3MoYS5kb3RQcm9kdWN0KGIpLyhhLmxlbmd0aCpiLmxlbmd0aCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIG5ldyBWZWN0b3IzRCBvYmplY3QgdGhhdCBpcyBhbiBleGFjdCBjb3B5IG9mIHRoZSBjdXJyZW50XHJcblx0ICogVmVjdG9yM0Qgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMgQSBuZXcgVmVjdG9yM0Qgb2JqZWN0IHRoYXQgaXMgYSBjb3B5IG9mIHRoZSBjdXJyZW50XHJcblx0ICogVmVjdG9yM0Qgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzRCh0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLncpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29waWVzIGFsbCBvZiB2ZWN0b3IgZGF0YSBmcm9tIHRoZSBzb3VyY2UgVmVjdG9yM0Qgb2JqZWN0IGludG8gdGhlXHJcblx0ICogY2FsbGluZyBWZWN0b3IzRCBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3JjIFRoZSBWZWN0b3IzRCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb3B5RnJvbShzcmM6VmVjdG9yM0QpOnZvaWRcclxuXHR7XHJcblx0XHR0aGlzLnggPSBzcmMueDtcclxuXHRcdHRoaXMueSA9IHNyYy55O1xyXG5cdFx0dGhpcy56ID0gc3JjLno7XHJcblx0XHR0aGlzLncgPSBzcmMudztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBuZXcgVmVjdG9yM0Qgb2JqZWN0IHRoYXQgaXMgcGVycGVuZGljdWxhciAoYXQgYSByaWdodFxyXG5cdCAqIGFuZ2xlKSB0byB0aGUgY3VycmVudCBWZWN0b3IzRCBhbmQgYW5vdGhlciBWZWN0b3IzRCBvYmplY3QuIElmIHRoZVxyXG5cdCAqIHJldHVybmVkIFZlY3RvcjNEIG9iamVjdCdzIGNvb3JkaW5hdGVzIGFyZSAoMCwwLDApLCB0aGVuIHRoZSB0d29cclxuXHQgKiBWZWN0b3IzRCBvYmplY3RzIGFyZSBwYXJhbGxlbCB0byBlYWNoIG90aGVyLlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiB1c2UgdGhlIG5vcm1hbGl6ZWQgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVydGljZXMgb2YgYVxyXG5cdCAqIHBvbHlnb24gc3VyZmFjZSB3aXRoIHRoZSBub3JtYWxpemVkIHZlY3RvciBvZiB0aGUgY2FtZXJhIG9yIGV5ZVxyXG5cdCAqIHZpZXdwb2ludCB0byBnZXQgYSBkb3QgcHJvZHVjdC4gVGhlIHZhbHVlIG9mIHRoZSBkb3QgcHJvZHVjdCBjYW5cclxuXHQgKiBpZGVudGlmeSB3aGV0aGVyIGEgc3VyZmFjZSBvZiBhIHRocmVlLWRpbWVuc2lvbmFsIG9iamVjdCBpcyBoaWRkZW5cclxuXHQgKiBmcm9tIHRoZSB2aWV3cG9pbnQuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGEgQSBzZWNvbmQgVmVjdG9yM0Qgb2JqZWN0LlxyXG5cdCAqIEByZXR1cm5zIEEgbmV3IFZlY3RvcjNEIG9iamVjdCB0aGF0IGlzIHBlcnBlbmRpY3VsYXIgdG8gdGhlIGN1cnJlbnRcclxuXHQgKiAgICAgICAgICBWZWN0b3IzRCBvYmplY3QgYW5kIHRoZSBWZWN0b3IzRCBvYmplY3Qgc3BlY2lmaWVkIGFzIHRoZVxyXG5cdCAqICAgICAgICAgIHBhcmFtZXRlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgY3Jvc3NQcm9kdWN0KGE6VmVjdG9yM0QpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzRCh0aGlzLnkqYS56IC0gdGhpcy56KmEueSwgdGhpcy56KmEueCAtIHRoaXMueCphLnosIHRoaXMueCphLnkgLSB0aGlzLnkqYS54LCAxKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlY3JlbWVudHMgdGhlIHZhbHVlIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZiB0aGUgY3VycmVudFxyXG5cdCAqIFZlY3RvcjNEIG9iamVjdCBieSB0aGUgdmFsdWVzIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZlxyXG5cdCAqIHNwZWNpZmllZCBWZWN0b3IzRCBvYmplY3QuIFVubGlrZSB0aGVcclxuXHQgKiA8Y29kZT5WZWN0b3IzRC5zdWJ0cmFjdCgpPC9jb2RlPiBtZXRob2QsIHRoZVxyXG5cdCAqIDxjb2RlPmRlY3JlbWVudEJ5KCk8L2NvZGU+IG1ldGhvZCBjaGFuZ2VzIHRoZSBjdXJyZW50IFZlY3RvcjNEXHJcblx0ICogb2JqZWN0IGFuZCBkb2VzIG5vdCByZXR1cm4gYSBuZXcgVmVjdG9yM0Qgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGEgVGhlIFZlY3RvcjNEIG9iamVjdCBjb250YWluaW5nIHRoZSB2YWx1ZXMgdG8gc3VidHJhY3QgZnJvbVxyXG5cdCAqICAgICAgICAgIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZGVjcmVtZW50QnkoYTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLnggLT0gYS54O1xyXG5cdFx0dGhpcy55IC09IGEueTtcclxuXHRcdHRoaXMueiAtPSBhLno7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBWZWN0b3IzRCBvYmplY3RzLiBUaGVcclxuXHQgKiA8Y29kZT5kaXN0YW5jZSgpPC9jb2RlPiBtZXRob2QgaXMgYSBzdGF0aWMgbWV0aG9kLiBZb3UgY2FuIHVzZSBpdFxyXG5cdCAqIGRpcmVjdGx5IGFzIGEgbWV0aG9kIG9mIHRoZSBWZWN0b3IzRCBjbGFzcyB0byBnZXQgdGhlIEV1Y2xpZGVhblxyXG5cdCAqIGRpc3RhbmNlIGJldHdlZW4gdHdvIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50cy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwdDEgQSBWZWN0b3IzRCBvYmplY3QgYXMgdGhlIGZpcnN0IHRocmVlLWRpbWVuc2lvbmFsIHBvaW50LlxyXG5cdCAqIEBwYXJhbSBwdDIgQSBWZWN0b3IzRCBvYmplY3QgYXMgdGhlIHNlY29uZCB0aHJlZS1kaW1lbnNpb25hbCBwb2ludC5cclxuXHQgKiBAcmV0dXJucyBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gVmVjdG9yM0Qgb2JqZWN0cy5cclxuXHQgKi9cclxuXHRzdGF0aWMgZGlzdGFuY2UocHQxOlZlY3RvcjNELCBwdDI6VmVjdG9yM0QpOm51bWJlclxyXG5cdHtcclxuXHRcdHZhciB4Om51bWJlciA9IChwdDEueCAtIHB0Mi54KTtcclxuXHRcdHZhciB5Om51bWJlciA9IChwdDEueSAtIHB0Mi55KTtcclxuXHRcdHZhciB6Om51bWJlciA9IChwdDEueiAtIHB0Mi56KTtcclxuXHRcdHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdCBhbmQgdGhlIG9uZSBzcGVjaWZpZWQgYXMgdGhlXHJcblx0ICogcGFyYW1ldGVyIGFyZSB1bml0IHZlcnRpY2VzLCB0aGlzIG1ldGhvZCByZXR1cm5zIHRoZSBjb3NpbmUgb2YgdGhlXHJcblx0ICogYW5nbGUgYmV0d2VlbiB0aGUgdHdvIHZlcnRpY2VzLiBVbml0IHZlcnRpY2VzIGFyZSB2ZXJ0aWNlcyB0aGF0XHJcblx0ICogcG9pbnQgdG8gdGhlIHNhbWUgZGlyZWN0aW9uIGJ1dCB0aGVpciBsZW5ndGggaXMgb25lLiBUaGV5IHJlbW92ZSB0aGVcclxuXHQgKiBsZW5ndGggb2YgdGhlIHZlY3RvciBhcyBhIGZhY3RvciBpbiB0aGUgcmVzdWx0LiBZb3UgY2FuIHVzZSB0aGVcclxuXHQgKiA8Y29kZT5ub3JtYWxpemUoKTwvY29kZT4gbWV0aG9kIHRvIGNvbnZlcnQgYSB2ZWN0b3IgdG8gYSB1bml0XHJcblx0ICogdmVjdG9yLlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmRvdFByb2R1Y3QoKTwvY29kZT4gbWV0aG9kIGZpbmRzIHRoZSBhbmdsZSBiZXR3ZWVuIHR3b1xyXG5cdCAqIHZlcnRpY2VzLiBJdCBpcyBhbHNvIHVzZWQgaW4gYmFja2ZhY2UgY3VsbGluZyBvciBsaWdodGluZ1xyXG5cdCAqIGNhbGN1bGF0aW9ucy4gQmFja2ZhY2UgY3VsbGluZyBpcyBhIHByb2NlZHVyZSBmb3IgZGV0ZXJtaW5pbmcgd2hpY2hcclxuXHQgKiBzdXJmYWNlcyBhcmUgaGlkZGVuIGZyb20gdGhlIHZpZXdwb2ludC4gWW91IGNhbiB1c2UgdGhlIG5vcm1hbGl6ZWRcclxuXHQgKiB2ZXJ0aWNlcyBmcm9tIHRoZSBjYW1lcmEsIG9yIGV5ZSwgdmlld3BvaW50IGFuZCB0aGUgY3Jvc3MgcHJvZHVjdCBvZlxyXG5cdCAqIHRoZSB2ZXJ0aWNlcyBvZiBhIHBvbHlnb24gc3VyZmFjZSB0byBnZXQgdGhlIGRvdCBwcm9kdWN0LiBJZiB0aGUgZG90XHJcblx0ICogcHJvZHVjdCBpcyBsZXNzIHRoYW4gemVybywgdGhlbiB0aGUgc3VyZmFjZSBpcyBmYWNpbmcgdGhlIGNhbWVyYSBvclxyXG5cdCAqIHRoZSB2aWV3ZXIuIElmIHRoZSB0d28gdW5pdCB2ZXJ0aWNlcyBhcmUgcGVycGVuZGljdWxhciB0byBlYWNoXHJcblx0ICogb3RoZXIsIHRoZXkgYXJlIG9ydGhvZ29uYWwgYW5kIHRoZSBkb3QgcHJvZHVjdCBpcyB6ZXJvLiBJZiB0aGUgdHdvXHJcblx0ICogdmVydGljZXMgYXJlIHBhcmFsbGVsIHRvIGVhY2ggb3RoZXIsIHRoZSBkb3QgcHJvZHVjdCBpcyBvbmUuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGEgVGhlIHNlY29uZCBWZWN0b3IzRCBvYmplY3QuXHJcblx0ICogQHJldHVybnMgQSBzY2FsYXIgd2hpY2ggaXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoZSBjdXJyZW50IFZlY3RvcjNEXHJcblx0ICogICAgICAgICAgb2JqZWN0IGFuZCB0aGUgc3BlY2lmaWVkIFZlY3RvcjNEIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBzZWUgYXdheS5nZW9tLlZlY3RvcjNEI2Nyb3NzUHJvZHVjdCgpXHJcblx0ICogQHNlZSBhd2F5Lmdlb20uVmVjdG9yM0Qjbm9ybWFsaXplKClcclxuXHQgKi9cclxuXHRwdWJsaWMgZG90UHJvZHVjdChhOlZlY3RvcjNEKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy54KmEueCArIHRoaXMueSphLnkgKyB0aGlzLnoqYS56O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHR3byBWZWN0b3IzRCBvYmplY3RzIGFyZSBlcXVhbCBieSBjb21wYXJpbmcgdGhlXHJcblx0ICogeCwgeSwgYW5kIHogZWxlbWVudHMgb2YgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IHdpdGggYVxyXG5cdCAqIHNwZWNpZmllZCBWZWN0b3IzRCBvYmplY3QuIElmIHRoZSB2YWx1ZXMgb2YgdGhlc2UgZWxlbWVudHMgYXJlIHRoZVxyXG5cdCAqIHNhbWUsIHRoZSB0d28gVmVjdG9yM0Qgb2JqZWN0cyBhcmUgZXF1YWwuIElmIHRoZSBzZWNvbmQgb3B0aW9uYWxcclxuXHQgKiBwYXJhbWV0ZXIgaXMgc2V0IHRvIHRydWUsIGFsbCBmb3VyIGVsZW1lbnRzIG9mIHRoZSBWZWN0b3IzRCBvYmplY3RzLFxyXG5cdCAqIGluY2x1ZGluZyB0aGUgdyBwcm9wZXJ0eSwgYXJlIGNvbXBhcmVkLlxyXG5cdCAqL1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0b0NvbXBhcmUgVGhlIFZlY3RvcjNEIG9iamVjdCB0byBiZSBjb21wYXJlZCB3aXRoIHRoZSBjdXJyZW50XHJcblx0ICogICAgICAgICAgICAgICAgICBWZWN0b3IzRCBvYmplY3QuXHJcblx0ICogQHBhcmFtIGFsbEZvdXIgICBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgdGhhdCBzcGVjaWZpZXMgd2hldGhlciB0aGUgd1xyXG5cdCAqICAgICAgICAgICAgICAgICAgcHJvcGVydHkgb2YgdGhlIFZlY3RvcjNEIG9iamVjdHMgaXMgdXNlZCBpbiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgIGNvbXBhcmlzb24uXHJcblx0ICogQHJldHVybnMgQSB2YWx1ZSBvZiB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0IGlzIGVxdWFsXHJcblx0ICogICAgICAgICAgdG8gdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0OyBmYWxzZSBpZiBpdCBpcyBub3QgZXF1YWwuXHJcblx0ICovXHJcblx0cHVibGljIGVxdWFscyh0b0NvbXBhcmU6VmVjdG9yM0QsIGFsbEZvdXI6Ym9vbGVhbiA9IGZhbHNlKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuICh0aGlzLnggPT0gdG9Db21wYXJlLnggJiYgdGhpcy55ID09IHRvQ29tcGFyZS55ICYmIHRoaXMueiA9PSB0b0NvbXBhcmUueiAmJiAoIWFsbEZvdXIgfHwgdGhpcy53ID09IHRvQ29tcGFyZS53ICkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5jcmVtZW50cyB0aGUgdmFsdWUgb2YgdGhlIHgsIHksIGFuZCB6IGVsZW1lbnRzIG9mIHRoZSBjdXJyZW50XHJcblx0ICogVmVjdG9yM0Qgb2JqZWN0IGJ5IHRoZSB2YWx1ZXMgb2YgdGhlIHgsIHksIGFuZCB6IGVsZW1lbnRzIG9mIGFcclxuXHQgKiBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0LiBVbmxpa2UgdGhlIDxjb2RlPlZlY3RvcjNELmFkZCgpPC9jb2RlPlxyXG5cdCAqIG1ldGhvZCwgdGhlIDxjb2RlPmluY3JlbWVudEJ5KCk8L2NvZGU+IG1ldGhvZCBjaGFuZ2VzIHRoZSBjdXJyZW50XHJcblx0ICogVmVjdG9yM0Qgb2JqZWN0IGFuZCBkb2VzIG5vdCByZXR1cm4gYSBuZXcgVmVjdG9yM0Qgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGEgVGhlIFZlY3RvcjNEIG9iamVjdCB0byBiZSBhZGRlZCB0byB0aGUgY3VycmVudCBWZWN0b3IzRFxyXG5cdCAqICAgICAgICAgIG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgaW5jcmVtZW50QnkoYTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLnggKz0gYS54O1xyXG5cdFx0dGhpcy55ICs9IGEueTtcclxuXHRcdHRoaXMueiArPSBhLno7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb21wYXJlcyB0aGUgZWxlbWVudHMgb2YgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IHdpdGggdGhlXHJcblx0ICogZWxlbWVudHMgb2YgYSBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0IHRvIGRldGVybWluZSB3aGV0aGVyIHRoZXlcclxuXHQgKiBhcmUgbmVhcmx5IGVxdWFsLiBUaGUgdHdvIFZlY3RvcjNEIG9iamVjdHMgYXJlIG5lYXJseSBlcXVhbCBpZiB0aGVcclxuXHQgKiB2YWx1ZSBvZiBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSB0d28gdmVydGljZXMgYXJlIGVxdWFsLCBvciB0aGVcclxuXHQgKiByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb24gaXMgd2l0aGluIHRoZSB0b2xlcmFuY2UgcmFuZ2UuIFRoZVxyXG5cdCAqIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gZWxlbWVudHMgbXVzdCBiZSBsZXNzIHRoYW4gdGhlIG51bWJlclxyXG5cdCAqIHNwZWNpZmllZCBhcyB0aGUgdG9sZXJhbmNlIHBhcmFtZXRlci4gSWYgdGhlIHRoaXJkIG9wdGlvbmFsXHJcblx0ICogcGFyYW1ldGVyIGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgYWxsIGZvdXIgZWxlbWVudHMgb2YgdGhlXHJcblx0ICogVmVjdG9yM0Qgb2JqZWN0cywgaW5jbHVkaW5nIHRoZSA8Y29kZT53PC9jb2RlPiBwcm9wZXJ0eSwgYXJlXHJcblx0ICogY29tcGFyZWQuIE90aGVyd2lzZSwgb25seSB0aGUgeCwgeSwgYW5kIHogZWxlbWVudHMgYXJlIGluY2x1ZGVkIGluXHJcblx0ICogdGhlIGNvbXBhcmlzb24uXHJcblx0ICovXHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRvQ29tcGFyZSBUaGUgVmVjdG9yM0Qgb2JqZWN0IHRvIGJlIGNvbXBhcmVkIHdpdGggdGhlIGN1cnJlbnRcclxuXHQgKiAgICAgICAgICAgICAgICAgIFZlY3RvcjNEIG9iamVjdC5cclxuXHQgKiBAcGFyYW0gdG9sZXJhbmNlIEEgbnVtYmVyIGRldGVybWluaW5nIHRoZSB0b2xlcmFuY2UgZmFjdG9yLiBJZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgdmFsdWVzIG9mIHRoZSBWZWN0b3IzRFxyXG5cdCAqICAgICAgICAgICAgICAgICAgZWxlbWVudCBzcGVjaWZpZWQgaW4gdGhlIHRvQ29tcGFyZSBwYXJhbWV0ZXIgYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICB0aGUgY3VycmVudCBWZWN0b3IzRCBlbGVtZW50IGlzIGxlc3MgdGhhbiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgIHRvbGVyYW5jZSBudW1iZXIsIHRoZSB0d28gdmFsdWVzIGFyZSBjb25zaWRlcmVkXHJcblx0ICogICAgICAgICAgICAgICAgICBuZWFybHkgZXF1YWwuXHJcblx0ICogQHBhcmFtIGFsbEZvdXIgICBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgdGhhdCBzcGVjaWZpZXMgd2hldGhlciB0aGUgd1xyXG5cdCAqICAgICAgICAgICAgICAgICAgcHJvcGVydHkgb2YgdGhlIFZlY3RvcjNEIG9iamVjdHMgaXMgdXNlZCBpbiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgIGNvbXBhcmlzb24uXHJcblx0ICogQHJldHVybnMgQSB2YWx1ZSBvZiB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0IGlzIG5lYXJseVxyXG5cdCAqICAgICAgICAgIGVxdWFsIHRvIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdDsgZmFsc2UgaWYgaXQgaXMgbm90XHJcblx0ICogICAgICAgICAgZXF1YWwuXHJcblx0ICpcclxuXHQgKiBAc2VlIGF3YXkuZ2VvbS5WZWN0b3IzRCNlcXVhbHMoKVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBuZWFyRXF1YWxzKHRvQ29tcGFyZTpWZWN0b3IzRCwgdG9sZXJhbmNlOm51bWJlciwgYWxsRm91cjpib29sZWFuID0gdHJ1ZSk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiAoKE1hdGguYWJzKHRoaXMueCAtIHRvQ29tcGFyZS54KSA8IHRvbGVyYW5jZSkgJiYgKE1hdGguYWJzKHRoaXMueSAtIHRvQ29tcGFyZS55KSA8IHRvbGVyYW5jZSkgJiYgKE1hdGguYWJzKHRoaXMueiAtIHRvQ29tcGFyZS56KSA8IHRvbGVyYW5jZSkgJiYgKCFhbGxGb3VyIHx8IE1hdGguYWJzKHRoaXMudyAtIHRvQ29tcGFyZS53KSA8IHRvbGVyYW5jZSkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QgdG8gaXRzIGludmVyc2UuIFRoZSBpbnZlcnNlIG9iamVjdFxyXG5cdCAqIGlzIGFsc28gY29uc2lkZXJlZCB0aGUgb3Bwb3NpdGUgb2YgdGhlIG9yaWdpbmFsIG9iamVjdC4gVGhlIHZhbHVlIG9mXHJcblx0ICogdGhlIHgsIHksIGFuZCB6IHByb3BlcnRpZXMgb2YgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IGlzIGNoYW5nZWRcclxuXHQgKiB0byAteCwgLXksIGFuZCAtei5cclxuXHQgKi9cclxuXHRwdWJsaWMgbmVnYXRlKCk6dm9pZFxyXG5cdHtcclxuXHRcdHRoaXMueCA9IC10aGlzLng7XHJcblx0XHR0aGlzLnkgPSAtdGhpcy55O1xyXG5cdFx0dGhpcy56ID0gLXRoaXMuejtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnRzIGEgVmVjdG9yM0Qgb2JqZWN0IHRvIGEgdW5pdCB2ZWN0b3IgYnkgZGl2aWRpbmcgdGhlIGZpcnN0XHJcblx0ICogdGhyZWUgZWxlbWVudHMgKHgsIHksIHopIGJ5IHRoZSBsZW5ndGggb2YgdGhlIHZlY3Rvci4gVW5pdCB2ZXJ0aWNlc1xyXG5cdCAqIGFyZSB2ZXJ0aWNlcyB0aGF0IGhhdmUgYSBkaXJlY3Rpb24gYnV0IHRoZWlyIGxlbmd0aCBpcyBvbmUuIFRoZXlcclxuXHQgKiBzaW1wbGlmeSB2ZWN0b3IgY2FsY3VsYXRpb25zIGJ5IHJlbW92aW5nIGxlbmd0aCBhcyBhIGZhY3Rvci5cclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBTY2FsZXMgdGhlIGxpbmUgc2VnbWVudCBiZXR3ZWVuKDAsMCkgYW5kIHRoZSBjdXJyZW50IHBvaW50IHRvIGEgc2V0XHJcblx0ICogbGVuZ3RoLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRoaWNrbmVzcyBUaGUgc2NhbGluZyB2YWx1ZS4gRm9yIGV4YW1wbGUsIGlmIHRoZSBjdXJyZW50XHJcblx0ICogICAgICAgICAgICAgICAgICBWZWN0b3IzRCBvYmplY3QgaXMgKDAsMyw0KSwgYW5kIHlvdSBub3JtYWxpemUgaXQgdG9cclxuXHQgKiAgICAgICAgICAgICAgICAgIDEsIHRoZSBwb2ludCByZXR1cm5lZCBpcyBhdCgwLDAuNiwwLjgpLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBub3JtYWxpemUodGhpY2tuZXNzOm51bWJlciA9IDEpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0dmFyIGludkxlbmd0aCA9IHRoaWNrbmVzcy90aGlzLmxlbmd0aDtcclxuXHRcdFx0dGhpcy54ICo9IGludkxlbmd0aDtcclxuXHRcdFx0dGhpcy55ICo9IGludkxlbmd0aDtcclxuXHRcdFx0dGhpcy56ICo9IGludkxlbmd0aDtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGl2aWRlcyB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgYW5kXHJcblx0ICogPGNvZGU+ejwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QgYnkgdGhlXHJcblx0ICogdmFsdWUgb2YgaXRzIDxjb2RlPnc8L2NvZGU+IHByb3BlcnR5LlxyXG5cdCAqXHJcblx0ICogPHA+SWYgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IGlzIHRoZSByZXN1bHQgb2YgbXVsdGlwbHlpbmcgYVxyXG5cdCAqIFZlY3RvcjNEIG9iamVjdCBieSBhIHByb2plY3Rpb24gTWF0cml4M0Qgb2JqZWN0LCB0aGUgdyBwcm9wZXJ0eSBjYW5cclxuXHQgKiBob2xkIHRoZSB0cmFuc2Zvcm0gdmFsdWUuIFRoZSA8Y29kZT5wcm9qZWN0KCk8L2NvZGU+IG1ldGhvZCB0aGVuIGNhblxyXG5cdCAqIGNvbXBsZXRlIHRoZSBwcm9qZWN0aW9uIGJ5IGRpdmlkaW5nIHRoZSBlbGVtZW50cyBieSB0aGVcclxuXHQgKiA8Y29kZT53PC9jb2RlPiBwcm9wZXJ0eS4gVXNlIHRoZSA8Y29kZT5NYXRyaXgzRC5yYXdEYXRhPC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5IHRvIGNyZWF0ZSBhIHByb2plY3Rpb24gTWF0cml4M0Qgb2JqZWN0LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgcHJvamVjdCgpOnZvaWRcclxuXHR7XHJcblx0XHR0aGlzLnggLz0gdGhpcy53O1xyXG5cdFx0dGhpcy55IC89IHRoaXMudztcclxuXHRcdHRoaXMueiAvPSB0aGlzLnc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTY2FsZXMgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IGJ5IGEgc2NhbGFyLCBhIG1hZ25pdHVkZS4gVGhlXHJcblx0ICogVmVjdG9yM0Qgb2JqZWN0J3MgeCwgeSwgYW5kIHogZWxlbWVudHMgYXJlIG11bHRpcGxpZWQgYnkgdGhlIHNjYWxhclxyXG5cdCAqIG51bWJlciBzcGVjaWZpZWQgaW4gdGhlIHBhcmFtZXRlci4gRm9yIGV4YW1wbGUsIGlmIHRoZSB2ZWN0b3IgaXNcclxuXHQgKiBzY2FsZWQgYnkgdGVuLCB0aGUgcmVzdWx0IGlzIGEgdmVjdG9yIHRoYXQgaXMgdGVuIHRpbWVzIGxvbmdlci4gVGhlXHJcblx0ICogc2NhbGFyIGNhbiBhbHNvIGNoYW5nZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSB2ZWN0b3IuIE11bHRpcGx5aW5nIHRoZVxyXG5cdCAqIHZlY3RvciBieSBhIG5lZ2F0aXZlIG51bWJlciByZXZlcnNlcyBpdHMgZGlyZWN0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHMgQSBtdWx0aXBsaWVyIChzY2FsYXIpIHVzZWQgdG8gc2NhbGUgYSBWZWN0b3IzRCBvYmplY3QuXHJcblxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzY2FsZUJ5KHM6bnVtYmVyKTp2b2lkXHJcblx0e1xyXG5cdFx0dGhpcy54ICo9IHM7XHJcblx0XHR0aGlzLnkgKj0gcztcclxuXHRcdHRoaXMueiAqPSBzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgbWVtYmVycyBvZiBWZWN0b3IzRCB0byB0aGUgc3BlY2lmaWVkIHZhbHVlc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHhhIFRoZSBmaXJzdCBlbGVtZW50LCBzdWNoIGFzIHRoZSB4IGNvb3JkaW5hdGUuXHJcblx0ICogQHBhcmFtIHlhIFRoZSBzZWNvbmQgZWxlbWVudCwgc3VjaCBhcyB0aGUgeSBjb29yZGluYXRlLlxyXG5cdCAqIEBwYXJhbSB6YSBUaGUgdGhpcmQgZWxlbWVudCwgc3VjaCBhcyB0aGUgeiBjb29yZGluYXRlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRUbyh4YTpudW1iZXIsIHlhOm51bWJlciwgemE6bnVtYmVyKTp2b2lkXHJcblx0e1xyXG5cdFx0dGhpcy54ID0geGE7XHJcblx0XHR0aGlzLnkgPSB5YTtcclxuXHRcdHRoaXMueiA9IHphO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3VidHJhY3RzIHRoZSB2YWx1ZSBvZiB0aGUgeCwgeSwgYW5kIHogZWxlbWVudHMgb2YgdGhlIGN1cnJlbnRcclxuXHQgKiBWZWN0b3IzRCBvYmplY3QgZnJvbSB0aGUgdmFsdWVzIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZlxyXG5cdCAqIGFub3RoZXIgVmVjdG9yM0Qgb2JqZWN0LiBUaGUgPGNvZGU+c3VidHJhY3QoKTwvY29kZT4gbWV0aG9kIGRvZXMgbm90XHJcblx0ICogY2hhbmdlIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdC4gSW5zdGVhZCwgdGhpcyBtZXRob2QgcmV0dXJucyBhXHJcblx0ICogbmV3IFZlY3RvcjNEIG9iamVjdCB3aXRoIHRoZSBuZXcgdmFsdWVzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGEgVGhlIFZlY3RvcjNEIG9iamVjdCB0byBiZSBzdWJ0cmFjdGVkIGZyb20gdGhlIGN1cnJlbnRcclxuXHQgKiAgICAgICAgICBWZWN0b3IzRCBvYmplY3QuXHJcblx0ICogQHJldHVybnMgQSBuZXcgVmVjdG9yM0Qgb2JqZWN0IHRoYXQgaXMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVcclxuXHQgKiAgICAgICAgICBjdXJyZW50IFZlY3RvcjNEIGFuZCB0aGUgc3BlY2lmaWVkIFZlY3RvcjNEIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBzZWUgYXdheS5nZW9tLlZlY3RvcjNEI2RlY3JlbWVudEJ5KClcclxuXHQgKi9cclxuXHRwdWJsaWMgc3VidHJhY3QoYTpWZWN0b3IzRCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjNEKHRoaXMueCAtIGEueCwgdGhpcy55IC0gYS55LCB0aGlzLnogLSBhLnopO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QuIFRoZVxyXG5cdCAqIHN0cmluZyBjb250YWlucyB0aGUgdmFsdWVzIG9mIHRoZSB4LCB5LCBhbmQgeiBwcm9wZXJ0aWVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBcIltWZWN0b3IzRF0gKHg6XCIgKyB0aGlzLnggKyBcIiAseTpcIiArIHRoaXMueSArIFwiLCB6XCIgKyB0aGlzLnogKyBcIiwgdzpcIiArIHRoaXMudyArIFwiKVwiO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gVmVjdG9yM0Q7Il19