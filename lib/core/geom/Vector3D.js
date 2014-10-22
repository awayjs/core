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
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof z === "undefined") { z = 0; }
        if (typeof w === "undefined") { w = 0; }
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
        if (typeof allFour === "undefined") { allFour = false; }
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
        if (typeof allFour === "undefined") { allFour = true; }
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
        if (typeof thickness === "undefined") { thickness = 1; }
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
    Vector3D.X_AXIS = new Vector3D(1, 0, 0);

    Vector3D.Y_AXIS = new Vector3D(0, 1, 0);

    Vector3D.Z_AXIS = new Vector3D(0, 0, 1);
    return Vector3D;
})();

module.exports = Vector3D;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZ2VvbS9WZWN0b3IzRC50cyJdLCJuYW1lcyI6WyJWZWN0b3IzRCIsIlZlY3RvcjNELmNvbnN0cnVjdG9yIiwiVmVjdG9yM0QuYWRkIiwiVmVjdG9yM0QuYW5nbGVCZXR3ZWVuIiwiVmVjdG9yM0QuY2xvbmUiLCJWZWN0b3IzRC5jb3B5RnJvbSIsIlZlY3RvcjNELmNyb3NzUHJvZHVjdCIsIlZlY3RvcjNELmRlY3JlbWVudEJ5IiwiVmVjdG9yM0QuZGlzdGFuY2UiLCJWZWN0b3IzRC5kb3RQcm9kdWN0IiwiVmVjdG9yM0QuZXF1YWxzIiwiVmVjdG9yM0QuaW5jcmVtZW50QnkiLCJWZWN0b3IzRC5uZWFyRXF1YWxzIiwiVmVjdG9yM0QubmVnYXRlIiwiVmVjdG9yM0Qubm9ybWFsaXplIiwiVmVjdG9yM0QucHJvamVjdCIsIlZlY3RvcjNELnNjYWxlQnkiLCJWZWN0b3IzRC5zZXRUbyIsIlZlY3RvcjNELnN1YnRyYWN0IiwiVmVjdG9yM0QudG9TdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBeUJHO0FBQ0g7SUE4RkNBOzs7Ozs7Ozs7O01BREdBO0lBQ0hBLGtCQUFZQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFZQTtRQUF0REMsZ0NBQUFBLENBQUNBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLGdDQUFBQSxDQUFDQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxnQ0FBQUEsQ0FBQ0EsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsZ0NBQUFBLENBQUNBLEdBQVVBLENBQUNBO0FBQUFBLFFBRWpFQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNWQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNWQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNWQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtJQUNYQSxDQUFDQTtJQWxDREQ7UUFB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dXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIFZlY3RvcjNEIGNsYXNzIHJlcHJlc2VudHMgYSBwb2ludCBvciBhIGxvY2F0aW9uIGluIHRoZSB0aHJlZS1kaW1lbnNpb25hbFxuICogc3BhY2UgdXNpbmcgdGhlIENhcnRlc2lhbiBjb29yZGluYXRlcyB4LCB5LCBhbmQgei4gQXMgaW4gYSB0d28tZGltZW5zaW9uYWxcbiAqIHNwYWNlLCB0aGUgeCBwcm9wZXJ0eSByZXByZXNlbnRzIHRoZSBob3Jpem9udGFsIGF4aXMgYW5kIHRoZSB5IHByb3BlcnR5XG4gKiByZXByZXNlbnRzIHRoZSB2ZXJ0aWNhbCBheGlzLiBJbiB0aHJlZS1kaW1lbnNpb25hbCBzcGFjZSwgdGhlIHogcHJvcGVydHlcbiAqIHJlcHJlc2VudHMgZGVwdGguIFRoZSB2YWx1ZSBvZiB0aGUgeCBwcm9wZXJ0eSBpbmNyZWFzZXMgYXMgdGhlIG9iamVjdCBtb3Zlc1xuICogdG8gdGhlIHJpZ2h0LiBUaGUgdmFsdWUgb2YgdGhlIHkgcHJvcGVydHkgaW5jcmVhc2VzIGFzIHRoZSBvYmplY3QgbW92ZXNcbiAqIGRvd24uIFRoZSB6IHByb3BlcnR5IGluY3JlYXNlcyBhcyB0aGUgb2JqZWN0IG1vdmVzIGZhcnRoZXIgZnJvbSB0aGUgcG9pbnRcbiAqIG9mIHZpZXcuIFVzaW5nIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gYW5kIHNjYWxpbmcsIHRoZSBvYmplY3QgaXMgc2VlbiB0byBiZVxuICogYmlnZ2VyIHdoZW4gbmVhciBhbmQgc21hbGxlciB3aGVuIGZhcnRoZXIgYXdheSBmcm9tIHRoZSBzY3JlZW4uIEFzIGluIGFcbiAqIHJpZ2h0LWhhbmRlZCB0aHJlZS1kaW1lbnNpb25hbCBjb29yZGluYXRlIHN5c3RlbSwgdGhlIHBvc2l0aXZlIHotYXhpcyBwb2ludHNcbiAqIGF3YXkgZnJvbSB0aGUgdmlld2VyIGFuZCB0aGUgdmFsdWUgb2YgdGhlIHogcHJvcGVydHkgaW5jcmVhc2VzIGFzIHRoZSBvYmplY3RcbiAqIG1vdmVzIGF3YXkgZnJvbSB0aGUgdmlld2VyJ3MgZXllLiBUaGUgb3JpZ2luIHBvaW50ICgwLDAsMCkgb2YgdGhlIGdsb2JhbFxuICogc3BhY2UgaXMgdGhlIHVwcGVyLWxlZnQgY29ybmVyIG9mIHRoZSBzdGFnZS5cbiAqXG4gKiA8cD5UaGUgVmVjdG9yM0QgY2xhc3MgY2FuIGFsc28gcmVwcmVzZW50IGEgZGlyZWN0aW9uLCBhbiBhcnJvdyBwb2ludGluZyBmcm9tXG4gKiB0aGUgb3JpZ2luIG9mIHRoZSBjb29yZGluYXRlcywgc3VjaCBhcyAoMCwwLDApLCB0byBhbiBlbmRwb2ludDsgb3IgYVxuICogZmxvYXRpbmctcG9pbnQgY29tcG9uZW50IG9mIGFuIFJHQiAoUmVkLCBHcmVlbiwgQmx1ZSkgY29sb3IgbW9kZWwuPC9wPlxuICpcbiAqIDxwPlF1YXRlcm5pb24gbm90YXRpb24gaW50cm9kdWNlcyBhIGZvdXJ0aCBlbGVtZW50LCB0aGUgdyBwcm9wZXJ0eSwgd2hpY2hcbiAqIHByb3ZpZGVzIGFkZGl0aW9uYWwgb3JpZW50YXRpb24gaW5mb3JtYXRpb24uIEZvciBleGFtcGxlLCB0aGUgdyBwcm9wZXJ0eSBjYW5cbiAqIGRlZmluZSBhbiBhbmdsZSBvZiByb3RhdGlvbiBvZiBhIFZlY3RvcjNEIG9iamVjdC4gVGhlIGNvbWJpbmF0aW9uIG9mIHRoZVxuICogYW5nbGUgb2Ygcm90YXRpb24gYW5kIHRoZSBjb29yZGluYXRlcyB4LCB5LCBhbmQgeiBjYW4gZGV0ZXJtaW5lIHRoZSBkaXNwbGF5XG4gKiBvYmplY3QncyBvcmllbnRhdGlvbi4gSGVyZSBpcyBhIHJlcHJlc2VudGF0aW9uIG9mIFZlY3RvcjNEIGVsZW1lbnRzIGluXG4gKiBtYXRyaXggbm90YXRpb246PC9wPlxuICovXG5jbGFzcyBWZWN0b3IzRFxue1xuXHQvKipcblx0ICogVGhlIHggYXhpcyBkZWZpbmVkIGFzIGEgVmVjdG9yM0Qgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgKDEsMCwwKS5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgWF9BWElTOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKDEsIDAsIDApO1xuXG5cdC8qKlxuXHQgKiBUaGUgeSBheGlzIGRlZmluZWQgYXMgYSBWZWN0b3IzRCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyAoMCwxLDApLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBZX0FYSVM6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoMCwgMSwgMCk7XG5cblx0LyoqXG5cdCAqIFRoZSB6IGF4aXMgZGVmaW5lZCBhcyBhIFZlY3RvcjNEIG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzICgwLDAsMSkuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFpfQVhJUzpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgwLCAwLCAxKTtcblxuXHQvKipcblx0ICogVGhlIGZpcnN0IGVsZW1lbnQgb2YgYSBWZWN0b3IzRCBvYmplY3QsIHN1Y2ggYXMgdGhlIHggY29vcmRpbmF0ZSBvZlxuXHQgKiBhIHBvaW50IGluIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBzcGFjZS4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgMC5cblx0ICovXG5cdHB1YmxpYyB4Om51bWJlcjtcblxuXHQvKlxuXHQgKlRoZSBzZWNvbmQgZWxlbWVudCBvZiBhIFZlY3RvcjNEIG9iamVjdCwgc3VjaCBhcyB0aGUgeSBjb29yZGluYXRlIG9mXG5cdCAqIGEgcG9pbnQgaW4gdGhlIHRocmVlLWRpbWVuc2lvbmFsIHNwYWNlLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAwLlxuXHQgKi9cblx0cHVibGljIHk6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGhpcmQgZWxlbWVudCBvZiBhIFZlY3RvcjNEIG9iamVjdCwgc3VjaCBhcyB0aGUgeSBjb29yZGluYXRlIG9mXG5cdCAqIGEgcG9pbnQgaW4gdGhlIHRocmVlLWRpbWVuc2lvbmFsIHNwYWNlLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAwLlxuXHQgKi9cblx0cHVibGljIHo6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUVGhlIGZvdXJ0aCBlbGVtZW50IG9mIGEgVmVjdG9yM0Qgb2JqZWN0IChpbiBhZGRpdGlvbiB0byB0aGUgeCwgeSxcblx0ICogYW5kIHogcHJvcGVydGllcykgY2FuIGhvbGQgZGF0YSBzdWNoIGFzIHRoZSBhbmdsZSBvZiByb3RhdGlvbi4gVGhlXG5cdCAqIGRlZmF1bHQgdmFsdWUgaXMgMC5cblx0ICpcblx0ICogPHA+UXVhdGVybmlvbiBub3RhdGlvbiBlbXBsb3lzIGFuIGFuZ2xlIGFzIHRoZSBmb3VydGggZWxlbWVudCBpblxuXHQgKiBpdHMgY2FsY3VsYXRpb24gb2YgdGhyZWUtZGltZW5zaW9uYWwgcm90YXRpb24uIFRoZSB3IHByb3BlcnR5IGNhblxuXHQgKiBiZSB1c2VkIHRvIGRlZmluZSB0aGUgYW5nbGUgb2Ygcm90YXRpb24gYWJvdXQgdGhlIFZlY3RvcjNEIG9iamVjdC5cblx0ICogVGhlIGNvbWJpbmF0aW9uIG9mIHRoZSByb3RhdGlvbiBhbmdsZSBhbmQgdGhlIGNvb3JkaW5hdGVzICh4LHkseilcblx0ICogZGV0ZXJtaW5lcyB0aGUgZGlzcGxheSBvYmplY3QncyBvcmllbnRhdGlvbi48L3A+XG5cdCAqXG5cdCAqIDxwPkluIGFkZGl0aW9uLCB0aGUgdyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBhcyBhIHBlcnNwZWN0aXZlIHdhcnBcblx0ICogZmFjdG9yIGZvciBhIHByb2plY3RlZCB0aHJlZS1kaW1lbnNpb25hbCBwb3NpdGlvbiBvciBhcyBhIHByb2plY3Rpb25cblx0ICogdHJhbnNmb3JtIHZhbHVlIGluIHJlcHJlc2VudGluZyBhIHRocmVlLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGVcblx0ICogcHJvamVjdGVkIGludG8gdGhlIHR3by1kaW1lbnNpb25hbCBzcGFjZS4gRm9yIGV4YW1wbGUsIHlvdSBjYW5cblx0ICogY3JlYXRlIGEgcHJvamVjdGlvbiBtYXRyaXggdXNpbmcgdGhlIDxjb2RlPk1hdHJpeDNELnJhd0RhdGE8L2NvZGU+XG5cdCAqIHByb3BlcnR5LCB0aGF0LCB3aGVuIGFwcGxpZWQgdG8gYSBWZWN0b3IzRCBvYmplY3QsIHByb2R1Y2VzIGFcblx0ICogdHJhbnNmb3JtIHZhbHVlIGluIHRoZSBWZWN0b3IzRCBvYmplY3QncyBmb3VydGggZWxlbWVudCAodGhlIHdcblx0ICogcHJvcGVydHkpLiBEaXZpZGluZyB0aGUgVmVjdG9yM0Qgb2JqZWN0J3Mgb3RoZXIgZWxlbWVudHMgYnkgdGhlXG5cdCAqIHRyYW5zZm9ybSB2YWx1ZSB0aGVuIHByb2R1Y2VzIGEgcHJvamVjdGVkIFZlY3RvcjNEIG9iamVjdC4gWW91IGNhblxuXHQgKiB1c2UgdGhlIDxjb2RlPlZlY3RvcjNELnByb2plY3QoKTwvY29kZT4gbWV0aG9kIHRvIGRpdmlkZSB0aGUgZmlyc3Rcblx0ICogdGhyZWUgZWxlbWVudHMgb2YgYSBWZWN0b3IzRCBvYmplY3QgYnkgaXRzIGZvdXJ0aCBlbGVtZW50LjwvcD5cblx0ICovXG5cdHB1YmxpYyB3Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGxlbmd0aCwgbWFnbml0dWRlLCBvZiB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QgZnJvbSB0aGVcblx0ICogb3JpZ2luICgwLDAsMCkgdG8gdGhlIG9iamVjdCdzIHgsIHksIGFuZCB6IGNvb3JkaW5hdGVzLiBUaGUgd1xuXHQgKiBwcm9wZXJ0eSBpcyBpZ25vcmVkLiBBIHVuaXQgdmVjdG9yIGhhcyBhIGxlbmd0aCBvciBtYWduaXR1ZGUgb2Zcblx0ICogb25lLlxuXHQgKi9cblx0cHVibGljIGdldCBsZW5ndGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXVhcmVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc3F1YXJlIG9mIHRoZSBsZW5ndGggb2YgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0LCBjYWxjdWxhdGVkXG5cdCAqIHVzaW5nIHRoZSB4LCB5LCBhbmQgeiBwcm9wZXJ0aWVzLiBUaGUgdyBwcm9wZXJ0eSBpcyBpZ25vcmVkLiBVc2UgdGhlXG5cdCAqIDxjb2RlPmxlbmd0aFNxdWFyZWQoKTwvY29kZT4gbWV0aG9kIHdoZW5ldmVyIHBvc3NpYmxlIGluc3RlYWQgb2YgdGhlXG5cdCAqIHNsb3dlciA8Y29kZT5NYXRoLnNxcnQoKTwvY29kZT4gbWV0aG9kIGNhbGwgb2YgdGhlXG5cdCAqIDxjb2RlPlZlY3RvcjNELmxlbmd0aCgpPC9jb2RlPiBtZXRob2QuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxlbmd0aFNxdWFyZWQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLngqdGhpcy54ICsgdGhpcy55KnRoaXMueSArIHRoaXMueip0aGlzLno7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBhIFZlY3RvcjNEIG9iamVjdC4gSWYgeW91IGRvIG5vdCBzcGVjaWZ5IGFcblx0ICogcGFyYW1ldGVyIGZvciB0aGUgY29uc3RydWN0b3IsIGEgVmVjdG9yM0Qgb2JqZWN0IGlzIGNyZWF0ZWQgd2l0aFxuXHQgKiB0aGUgZWxlbWVudHMgKDAsMCwwLDApLlxuXHQgKlxuXHQgKiBAcGFyYW0geCBUaGUgZmlyc3QgZWxlbWVudCwgc3VjaCBhcyB0aGUgeCBjb29yZGluYXRlLlxuXHQgKiBAcGFyYW0geSBUaGUgc2Vjb25kIGVsZW1lbnQsIHN1Y2ggYXMgdGhlIHkgY29vcmRpbmF0ZS5cblx0ICogQHBhcmFtIHogVGhlIHRoaXJkIGVsZW1lbnQsIHN1Y2ggYXMgdGhlIHogY29vcmRpbmF0ZS5cblx0ICogQHBhcmFtIHcgQW4gb3B0aW9uYWwgZWxlbWVudCBmb3IgYWRkaXRpb25hbCBkYXRhIHN1Y2ggYXMgdGhlIGFuZ2xlXG5cdCAqICAgICAgICAgIG9mIHJvdGF0aW9uLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoeDpudW1iZXIgPSAwLCB5Om51bWJlciA9IDAsIHo6bnVtYmVyID0gMCwgdzpudW1iZXIgPSAwKVxuXHR7XG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHRcdHRoaXMueiA9IHo7XG5cdFx0dGhpcy53ID0gdztcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIHRoZSB2YWx1ZSBvZiB0aGUgeCwgeSwgYW5kIHogZWxlbWVudHMgb2YgdGhlIGN1cnJlbnQgVmVjdG9yM0Rcblx0ICogb2JqZWN0IHRvIHRoZSB2YWx1ZXMgb2YgdGhlIHgsIHksIGFuZCB6IGVsZW1lbnRzIG9mIGFub3RoZXIgVmVjdG9yM0Rcblx0ICogb2JqZWN0LiBUaGUgPGNvZGU+YWRkKCk8L2NvZGU+IG1ldGhvZCBkb2VzIG5vdCBjaGFuZ2UgdGhlIGN1cnJlbnRcblx0ICogVmVjdG9yM0Qgb2JqZWN0LiBJbnN0ZWFkLCBpdCByZXR1cm5zIGEgbmV3IFZlY3RvcjNEIG9iamVjdCB3aXRoXG5cdCAqIHRoZSBuZXcgdmFsdWVzLlxuXHQgKlxuXHQgKiA8cD5UaGUgcmVzdWx0IG9mIGFkZGluZyB0d28gdmVjdG9ycyB0b2dldGhlciBpcyBhIHJlc3VsdGFudCB2ZWN0b3IuXG5cdCAqIE9uZSB3YXkgdG8gdmlzdWFsaXplIHRoZSByZXN1bHQgaXMgYnkgZHJhd2luZyBhIHZlY3RvciBmcm9tIHRoZVxuXHQgKiBvcmlnaW4gb3IgdGFpbCBvZiB0aGUgZmlyc3QgdmVjdG9yIHRvIHRoZSBlbmQgb3IgaGVhZCBvZiB0aGUgc2Vjb25kXG5cdCAqIHZlY3Rvci4gVGhlIHJlc3VsdGFudCB2ZWN0b3IgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIG9yaWdpblxuXHQgKiBwb2ludCBvZiB0aGUgZmlyc3QgdmVjdG9yIGFuZCB0aGUgZW5kIHBvaW50IG9mIHRoZSBzZWNvbmQgdmVjdG9yLlxuXHQgKiA8L3A+XG5cdCAqL1xuXHRwdWJsaWMgYWRkKGE6VmVjdG9yM0QpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjNEKHRoaXMueCArIGEueCwgdGhpcy55ICsgYS55LCB0aGlzLnogKyBhLnosIHRoaXMudyArIGEudylcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBhbmdsZSBpbiByYWRpYW5zIGJldHdlZW4gdHdvIHZlY3RvcnMuIFRoZSByZXR1cm5lZCBhbmdsZVxuXHQgKiBpcyB0aGUgc21hbGxlc3QgcmFkaWFuIHRoZSBmaXJzdCBWZWN0b3IzRCBvYmplY3Qgcm90YXRlcyB1bnRpbCBpdFxuXHQgKiBhbGlnbnMgd2l0aCB0aGUgc2Vjb25kIFZlY3RvcjNEIG9iamVjdC5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmFuZ2xlQmV0d2VlbigpPC9jb2RlPiBtZXRob2QgaXMgYSBzdGF0aWMgbWV0aG9kLiBZb3Vcblx0ICogY2FuIHVzZSBpdCBkaXJlY3RseSBhcyBhIG1ldGhvZCBvZiB0aGUgVmVjdG9yM0QgY2xhc3MuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyBjb252ZXJ0IGEgZGVncmVlIHRvIGEgcmFkaWFuLCB5b3UgY2FuIHVzZSB0aGUgZm9sbG93aW5nXG5cdCAqIGZvcm11bGE6PC9wPlxuXHQgKlxuXHQgKiA8cD48Y29kZT5yYWRpYW4gPSBNYXRoLlBJLzE4MCAqIGRlZ3JlZTwvY29kZT48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBhIFRoZSBmaXJzdCBWZWN0b3IzRCBvYmplY3QuXG5cdCAqIEBwYXJhbSBiIFRoZSBzZWNvbmQgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKiBAcmV0dXJucyBUaGUgYW5nbGUgYmV0d2VlbiB0d28gVmVjdG9yM0Qgb2JqZWN0cy5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgYW5nbGVCZXR3ZWVuKGE6VmVjdG9yM0QsIGI6VmVjdG9yM0QpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIE1hdGguYWNvcyhhLmRvdFByb2R1Y3QoYikvKGEubGVuZ3RoKmIubGVuZ3RoKSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBWZWN0b3IzRCBvYmplY3QgdGhhdCBpcyBhbiBleGFjdCBjb3B5IG9mIHRoZSBjdXJyZW50XG5cdCAqIFZlY3RvcjNEIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybnMgQSBuZXcgVmVjdG9yM0Qgb2JqZWN0IHRoYXQgaXMgYSBjb3B5IG9mIHRoZSBjdXJyZW50XG5cdCAqIFZlY3RvcjNEIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjNEKHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMudyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29waWVzIGFsbCBvZiB2ZWN0b3IgZGF0YSBmcm9tIHRoZSBzb3VyY2UgVmVjdG9yM0Qgb2JqZWN0IGludG8gdGhlXG5cdCAqIGNhbGxpbmcgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gc3JjIFRoZSBWZWN0b3IzRCBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGNvcHlGcm9tKHNyYzpWZWN0b3IzRCk6dm9pZFxuXHR7XG5cdFx0dGhpcy54ID0gc3JjLng7XG5cdFx0dGhpcy55ID0gc3JjLnk7XG5cdFx0dGhpcy56ID0gc3JjLno7XG5cdFx0dGhpcy53ID0gc3JjLnc7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBWZWN0b3IzRCBvYmplY3QgdGhhdCBpcyBwZXJwZW5kaWN1bGFyIChhdCBhIHJpZ2h0XG5cdCAqIGFuZ2xlKSB0byB0aGUgY3VycmVudCBWZWN0b3IzRCBhbmQgYW5vdGhlciBWZWN0b3IzRCBvYmplY3QuIElmIHRoZVxuXHQgKiByZXR1cm5lZCBWZWN0b3IzRCBvYmplY3QncyBjb29yZGluYXRlcyBhcmUgKDAsMCwwKSwgdGhlbiB0aGUgdHdvXG5cdCAqIFZlY3RvcjNEIG9iamVjdHMgYXJlIHBhcmFsbGVsIHRvIGVhY2ggb3RoZXIuXG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gdXNlIHRoZSBub3JtYWxpemVkIGNyb3NzIHByb2R1Y3Qgb2YgdHdvIHZlcnRpY2VzIG9mIGFcblx0ICogcG9seWdvbiBzdXJmYWNlIHdpdGggdGhlIG5vcm1hbGl6ZWQgdmVjdG9yIG9mIHRoZSBjYW1lcmEgb3IgZXllXG5cdCAqIHZpZXdwb2ludCB0byBnZXQgYSBkb3QgcHJvZHVjdC4gVGhlIHZhbHVlIG9mIHRoZSBkb3QgcHJvZHVjdCBjYW5cblx0ICogaWRlbnRpZnkgd2hldGhlciBhIHN1cmZhY2Ugb2YgYSB0aHJlZS1kaW1lbnNpb25hbCBvYmplY3QgaXMgaGlkZGVuXG5cdCAqIGZyb20gdGhlIHZpZXdwb2ludC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBhIEEgc2Vjb25kIFZlY3RvcjNEIG9iamVjdC5cblx0ICogQHJldHVybnMgQSBuZXcgVmVjdG9yM0Qgb2JqZWN0IHRoYXQgaXMgcGVycGVuZGljdWxhciB0byB0aGUgY3VycmVudFxuXHQgKiAgICAgICAgICBWZWN0b3IzRCBvYmplY3QgYW5kIHRoZSBWZWN0b3IzRCBvYmplY3Qgc3BlY2lmaWVkIGFzIHRoZVxuXHQgKiAgICAgICAgICBwYXJhbWV0ZXIuXG5cdCAqL1xuXHRwdWJsaWMgY3Jvc3NQcm9kdWN0KGE6VmVjdG9yM0QpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjNEKHRoaXMueSphLnogLSB0aGlzLnoqYS55LCB0aGlzLnoqYS54IC0gdGhpcy54KmEueiwgdGhpcy54KmEueSAtIHRoaXMueSphLngsIDEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlY3JlbWVudHMgdGhlIHZhbHVlIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZiB0aGUgY3VycmVudFxuXHQgKiBWZWN0b3IzRCBvYmplY3QgYnkgdGhlIHZhbHVlcyBvZiB0aGUgeCwgeSwgYW5kIHogZWxlbWVudHMgb2Zcblx0ICogc3BlY2lmaWVkIFZlY3RvcjNEIG9iamVjdC4gVW5saWtlIHRoZVxuXHQgKiA8Y29kZT5WZWN0b3IzRC5zdWJ0cmFjdCgpPC9jb2RlPiBtZXRob2QsIHRoZVxuXHQgKiA8Y29kZT5kZWNyZW1lbnRCeSgpPC9jb2RlPiBtZXRob2QgY2hhbmdlcyB0aGUgY3VycmVudCBWZWN0b3IzRFxuXHQgKiBvYmplY3QgYW5kIGRvZXMgbm90IHJldHVybiBhIG5ldyBWZWN0b3IzRCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBhIFRoZSBWZWN0b3IzRCBvYmplY3QgY29udGFpbmluZyB0aGUgdmFsdWVzIHRvIHN1YnRyYWN0IGZyb21cblx0ICogICAgICAgICAgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGRlY3JlbWVudEJ5KGE6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLnggLT0gYS54O1xuXHRcdHRoaXMueSAtPSBhLnk7XG5cdFx0dGhpcy56IC09IGEuejtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBWZWN0b3IzRCBvYmplY3RzLiBUaGVcblx0ICogPGNvZGU+ZGlzdGFuY2UoKTwvY29kZT4gbWV0aG9kIGlzIGEgc3RhdGljIG1ldGhvZC4gWW91IGNhbiB1c2UgaXRcblx0ICogZGlyZWN0bHkgYXMgYSBtZXRob2Qgb2YgdGhlIFZlY3RvcjNEIGNsYXNzIHRvIGdldCB0aGUgRXVjbGlkZWFuXG5cdCAqIGRpc3RhbmNlIGJldHdlZW4gdHdvIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50cy5cblx0ICpcblx0ICogQHBhcmFtIHB0MSBBIFZlY3RvcjNEIG9iamVjdCBhcyB0aGUgZmlyc3QgdGhyZWUtZGltZW5zaW9uYWwgcG9pbnQuXG5cdCAqIEBwYXJhbSBwdDIgQSBWZWN0b3IzRCBvYmplY3QgYXMgdGhlIHNlY29uZCB0aHJlZS1kaW1lbnNpb25hbCBwb2ludC5cblx0ICogQHJldHVybnMgVGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIFZlY3RvcjNEIG9iamVjdHMuXG5cdCAqL1xuXHRzdGF0aWMgZGlzdGFuY2UocHQxOlZlY3RvcjNELCBwdDI6VmVjdG9yM0QpOm51bWJlclxuXHR7XG5cdFx0dmFyIHg6bnVtYmVyID0gKHB0MS54IC0gcHQyLngpO1xuXHRcdHZhciB5Om51bWJlciA9IChwdDEueSAtIHB0Mi55KTtcblx0XHR2YXIgejpudW1iZXIgPSAocHQxLnogLSBwdDIueik7XG5cdFx0cmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xuXHR9XG5cblx0LyoqXG5cdCAqIElmIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdCBhbmQgdGhlIG9uZSBzcGVjaWZpZWQgYXMgdGhlXG5cdCAqIHBhcmFtZXRlciBhcmUgdW5pdCB2ZXJ0aWNlcywgdGhpcyBtZXRob2QgcmV0dXJucyB0aGUgY29zaW5lIG9mIHRoZVxuXHQgKiBhbmdsZSBiZXR3ZWVuIHRoZSB0d28gdmVydGljZXMuIFVuaXQgdmVydGljZXMgYXJlIHZlcnRpY2VzIHRoYXRcblx0ICogcG9pbnQgdG8gdGhlIHNhbWUgZGlyZWN0aW9uIGJ1dCB0aGVpciBsZW5ndGggaXMgb25lLiBUaGV5IHJlbW92ZSB0aGVcblx0ICogbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgYXMgYSBmYWN0b3IgaW4gdGhlIHJlc3VsdC4gWW91IGNhbiB1c2UgdGhlXG5cdCAqIDxjb2RlPm5vcm1hbGl6ZSgpPC9jb2RlPiBtZXRob2QgdG8gY29udmVydCBhIHZlY3RvciB0byBhIHVuaXRcblx0ICogdmVjdG9yLlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+ZG90UHJvZHVjdCgpPC9jb2RlPiBtZXRob2QgZmluZHMgdGhlIGFuZ2xlIGJldHdlZW4gdHdvXG5cdCAqIHZlcnRpY2VzLiBJdCBpcyBhbHNvIHVzZWQgaW4gYmFja2ZhY2UgY3VsbGluZyBvciBsaWdodGluZ1xuXHQgKiBjYWxjdWxhdGlvbnMuIEJhY2tmYWNlIGN1bGxpbmcgaXMgYSBwcm9jZWR1cmUgZm9yIGRldGVybWluaW5nIHdoaWNoXG5cdCAqIHN1cmZhY2VzIGFyZSBoaWRkZW4gZnJvbSB0aGUgdmlld3BvaW50LiBZb3UgY2FuIHVzZSB0aGUgbm9ybWFsaXplZFxuXHQgKiB2ZXJ0aWNlcyBmcm9tIHRoZSBjYW1lcmEsIG9yIGV5ZSwgdmlld3BvaW50IGFuZCB0aGUgY3Jvc3MgcHJvZHVjdCBvZlxuXHQgKiB0aGUgdmVydGljZXMgb2YgYSBwb2x5Z29uIHN1cmZhY2UgdG8gZ2V0IHRoZSBkb3QgcHJvZHVjdC4gSWYgdGhlIGRvdFxuXHQgKiBwcm9kdWN0IGlzIGxlc3MgdGhhbiB6ZXJvLCB0aGVuIHRoZSBzdXJmYWNlIGlzIGZhY2luZyB0aGUgY2FtZXJhIG9yXG5cdCAqIHRoZSB2aWV3ZXIuIElmIHRoZSB0d28gdW5pdCB2ZXJ0aWNlcyBhcmUgcGVycGVuZGljdWxhciB0byBlYWNoXG5cdCAqIG90aGVyLCB0aGV5IGFyZSBvcnRob2dvbmFsIGFuZCB0aGUgZG90IHByb2R1Y3QgaXMgemVyby4gSWYgdGhlIHR3b1xuXHQgKiB2ZXJ0aWNlcyBhcmUgcGFyYWxsZWwgdG8gZWFjaCBvdGhlciwgdGhlIGRvdCBwcm9kdWN0IGlzIG9uZS48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBhIFRoZSBzZWNvbmQgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKiBAcmV0dXJucyBBIHNjYWxhciB3aGljaCBpcyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhlIGN1cnJlbnQgVmVjdG9yM0Rcblx0ICogICAgICAgICAgb2JqZWN0IGFuZCB0aGUgc3BlY2lmaWVkIFZlY3RvcjNEIG9iamVjdC5cblx0ICpcblx0ICogQHNlZSBhd2F5Lmdlb20uVmVjdG9yM0QjY3Jvc3NQcm9kdWN0KClcblx0ICogQHNlZSBhd2F5Lmdlb20uVmVjdG9yM0Qjbm9ybWFsaXplKClcblx0ICovXG5cdHB1YmxpYyBkb3RQcm9kdWN0KGE6VmVjdG9yM0QpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMueCphLnggKyB0aGlzLnkqYS55ICsgdGhpcy56KmEuejtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdHdvIFZlY3RvcjNEIG9iamVjdHMgYXJlIGVxdWFsIGJ5IGNvbXBhcmluZyB0aGVcblx0ICogeCwgeSwgYW5kIHogZWxlbWVudHMgb2YgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IHdpdGggYVxuXHQgKiBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0LiBJZiB0aGUgdmFsdWVzIG9mIHRoZXNlIGVsZW1lbnRzIGFyZSB0aGVcblx0ICogc2FtZSwgdGhlIHR3byBWZWN0b3IzRCBvYmplY3RzIGFyZSBlcXVhbC4gSWYgdGhlIHNlY29uZCBvcHRpb25hbFxuXHQgKiBwYXJhbWV0ZXIgaXMgc2V0IHRvIHRydWUsIGFsbCBmb3VyIGVsZW1lbnRzIG9mIHRoZSBWZWN0b3IzRCBvYmplY3RzLFxuXHQgKiBpbmNsdWRpbmcgdGhlIHcgcHJvcGVydHksIGFyZSBjb21wYXJlZC5cblx0ICovXG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB0b0NvbXBhcmUgVGhlIFZlY3RvcjNEIG9iamVjdCB0byBiZSBjb21wYXJlZCB3aXRoIHRoZSBjdXJyZW50XG5cdCAqICAgICAgICAgICAgICAgICAgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKiBAcGFyYW0gYWxsRm91ciAgIEFuIG9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IHNwZWNpZmllcyB3aGV0aGVyIHRoZSB3XG5cdCAqICAgICAgICAgICAgICAgICAgcHJvcGVydHkgb2YgdGhlIFZlY3RvcjNEIG9iamVjdHMgaXMgdXNlZCBpbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICBjb21wYXJpc29uLlxuXHQgKiBAcmV0dXJucyBBIHZhbHVlIG9mIHRydWUgaWYgdGhlIHNwZWNpZmllZCBWZWN0b3IzRCBvYmplY3QgaXMgZXF1YWxcblx0ICogICAgICAgICAgdG8gdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0OyBmYWxzZSBpZiBpdCBpcyBub3QgZXF1YWwuXG5cdCAqL1xuXHRwdWJsaWMgZXF1YWxzKHRvQ29tcGFyZTpWZWN0b3IzRCwgYWxsRm91cjpib29sZWFuID0gZmFsc2UpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiAodGhpcy54ID09IHRvQ29tcGFyZS54ICYmIHRoaXMueSA9PSB0b0NvbXBhcmUueSAmJiB0aGlzLnogPT0gdG9Db21wYXJlLnogJiYgKCFhbGxGb3VyIHx8IHRoaXMudyA9PSB0b0NvbXBhcmUudyApKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmNyZW1lbnRzIHRoZSB2YWx1ZSBvZiB0aGUgeCwgeSwgYW5kIHogZWxlbWVudHMgb2YgdGhlIGN1cnJlbnRcblx0ICogVmVjdG9yM0Qgb2JqZWN0IGJ5IHRoZSB2YWx1ZXMgb2YgdGhlIHgsIHksIGFuZCB6IGVsZW1lbnRzIG9mIGFcblx0ICogc3BlY2lmaWVkIFZlY3RvcjNEIG9iamVjdC4gVW5saWtlIHRoZSA8Y29kZT5WZWN0b3IzRC5hZGQoKTwvY29kZT5cblx0ICogbWV0aG9kLCB0aGUgPGNvZGU+aW5jcmVtZW50QnkoKTwvY29kZT4gbWV0aG9kIGNoYW5nZXMgdGhlIGN1cnJlbnRcblx0ICogVmVjdG9yM0Qgb2JqZWN0IGFuZCBkb2VzIG5vdCByZXR1cm4gYSBuZXcgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gYSBUaGUgVmVjdG9yM0Qgb2JqZWN0IHRvIGJlIGFkZGVkIHRvIHRoZSBjdXJyZW50IFZlY3RvcjNEXG5cdCAqICAgICAgICAgIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBpbmNyZW1lbnRCeShhOlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy54ICs9IGEueDtcblx0XHR0aGlzLnkgKz0gYS55O1xuXHRcdHRoaXMueiArPSBhLno7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgdGhlIGVsZW1lbnRzIG9mIHRoZSBjdXJyZW50IFZlY3RvcjNEIG9iamVjdCB3aXRoIHRoZVxuXHQgKiBlbGVtZW50cyBvZiBhIHNwZWNpZmllZCBWZWN0b3IzRCBvYmplY3QgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhleVxuXHQgKiBhcmUgbmVhcmx5IGVxdWFsLiBUaGUgdHdvIFZlY3RvcjNEIG9iamVjdHMgYXJlIG5lYXJseSBlcXVhbCBpZiB0aGVcblx0ICogdmFsdWUgb2YgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgdHdvIHZlcnRpY2VzIGFyZSBlcXVhbCwgb3IgdGhlXG5cdCAqIHJlc3VsdCBvZiB0aGUgY29tcGFyaXNvbiBpcyB3aXRoaW4gdGhlIHRvbGVyYW5jZSByYW5nZS4gVGhlXG5cdCAqIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gZWxlbWVudHMgbXVzdCBiZSBsZXNzIHRoYW4gdGhlIG51bWJlclxuXHQgKiBzcGVjaWZpZWQgYXMgdGhlIHRvbGVyYW5jZSBwYXJhbWV0ZXIuIElmIHRoZSB0aGlyZCBvcHRpb25hbFxuXHQgKiBwYXJhbWV0ZXIgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCBhbGwgZm91ciBlbGVtZW50cyBvZiB0aGVcblx0ICogVmVjdG9yM0Qgb2JqZWN0cywgaW5jbHVkaW5nIHRoZSA8Y29kZT53PC9jb2RlPiBwcm9wZXJ0eSwgYXJlXG5cdCAqIGNvbXBhcmVkLiBPdGhlcndpc2UsIG9ubHkgdGhlIHgsIHksIGFuZCB6IGVsZW1lbnRzIGFyZSBpbmNsdWRlZCBpblxuXHQgKiB0aGUgY29tcGFyaXNvbi5cblx0ICovXG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB0b0NvbXBhcmUgVGhlIFZlY3RvcjNEIG9iamVjdCB0byBiZSBjb21wYXJlZCB3aXRoIHRoZSBjdXJyZW50XG5cdCAqICAgICAgICAgICAgICAgICAgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdG9sZXJhbmNlIEEgbnVtYmVyIGRldGVybWluaW5nIHRoZSB0b2xlcmFuY2UgZmFjdG9yLiBJZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHZhbHVlcyBvZiB0aGUgVmVjdG9yM0Rcblx0ICogICAgICAgICAgICAgICAgICBlbGVtZW50IHNwZWNpZmllZCBpbiB0aGUgdG9Db21wYXJlIHBhcmFtZXRlciBhbmRcblx0ICogICAgICAgICAgICAgICAgICB0aGUgY3VycmVudCBWZWN0b3IzRCBlbGVtZW50IGlzIGxlc3MgdGhhbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICB0b2xlcmFuY2UgbnVtYmVyLCB0aGUgdHdvIHZhbHVlcyBhcmUgY29uc2lkZXJlZFxuXHQgKiAgICAgICAgICAgICAgICAgIG5lYXJseSBlcXVhbC5cblx0ICogQHBhcmFtIGFsbEZvdXIgICBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgdGhhdCBzcGVjaWZpZXMgd2hldGhlciB0aGUgd1xuXHQgKiAgICAgICAgICAgICAgICAgIHByb3BlcnR5IG9mIHRoZSBWZWN0b3IzRCBvYmplY3RzIGlzIHVzZWQgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgY29tcGFyaXNvbi5cblx0ICogQHJldHVybnMgQSB2YWx1ZSBvZiB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0IGlzIG5lYXJseVxuXHQgKiAgICAgICAgICBlcXVhbCB0byB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3Q7IGZhbHNlIGlmIGl0IGlzIG5vdFxuXHQgKiAgICAgICAgICBlcXVhbC5cblx0ICpcblx0ICogQHNlZSBhd2F5Lmdlb20uVmVjdG9yM0QjZXF1YWxzKClcblx0ICovXG5cdHB1YmxpYyBuZWFyRXF1YWxzKHRvQ29tcGFyZTpWZWN0b3IzRCwgdG9sZXJhbmNlOm51bWJlciwgYWxsRm91cjpib29sZWFuID0gdHJ1ZSk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICgoTWF0aC5hYnModGhpcy54IC0gdG9Db21wYXJlLngpIDwgdG9sZXJhbmNlKSAmJiAoTWF0aC5hYnModGhpcy55IC0gdG9Db21wYXJlLnkpIDwgdG9sZXJhbmNlKSAmJiAoTWF0aC5hYnModGhpcy56IC0gdG9Db21wYXJlLnopIDwgdG9sZXJhbmNlKSAmJiAoIWFsbEZvdXIgfHwgTWF0aC5hYnModGhpcy53IC0gdG9Db21wYXJlLncpIDwgdG9sZXJhbmNlKSk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QgdG8gaXRzIGludmVyc2UuIFRoZSBpbnZlcnNlIG9iamVjdFxuXHQgKiBpcyBhbHNvIGNvbnNpZGVyZWQgdGhlIG9wcG9zaXRlIG9mIHRoZSBvcmlnaW5hbCBvYmplY3QuIFRoZSB2YWx1ZSBvZlxuXHQgKiB0aGUgeCwgeSwgYW5kIHogcHJvcGVydGllcyBvZiB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QgaXMgY2hhbmdlZFxuXHQgKiB0byAteCwgLXksIGFuZCAtei5cblx0ICovXG5cdHB1YmxpYyBuZWdhdGUoKTp2b2lkXG5cdHtcblx0XHR0aGlzLnggPSAtdGhpcy54O1xuXHRcdHRoaXMueSA9IC10aGlzLnk7XG5cdFx0dGhpcy56ID0gLXRoaXMuejtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFZlY3RvcjNEIG9iamVjdCB0byBhIHVuaXQgdmVjdG9yIGJ5IGRpdmlkaW5nIHRoZSBmaXJzdFxuXHQgKiB0aHJlZSBlbGVtZW50cyAoeCwgeSwgeikgYnkgdGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yLiBVbml0IHZlcnRpY2VzXG5cdCAqIGFyZSB2ZXJ0aWNlcyB0aGF0IGhhdmUgYSBkaXJlY3Rpb24gYnV0IHRoZWlyIGxlbmd0aCBpcyBvbmUuIFRoZXlcblx0ICogc2ltcGxpZnkgdmVjdG9yIGNhbGN1bGF0aW9ucyBieSByZW1vdmluZyBsZW5ndGggYXMgYSBmYWN0b3IuXG5cdCAqL1xuXHQvKipcblx0ICogU2NhbGVzIHRoZSBsaW5lIHNlZ21lbnQgYmV0d2VlbigwLDApIGFuZCB0aGUgY3VycmVudCBwb2ludCB0byBhIHNldFxuXHQgKiBsZW5ndGguXG5cdCAqXG5cdCAqIEBwYXJhbSB0aGlja25lc3MgVGhlIHNjYWxpbmcgdmFsdWUuIEZvciBleGFtcGxlLCBpZiB0aGUgY3VycmVudFxuXHQgKiAgICAgICAgICAgICAgICAgIFZlY3RvcjNEIG9iamVjdCBpcyAoMCwzLDQpLCBhbmQgeW91IG5vcm1hbGl6ZSBpdCB0b1xuXHQgKiAgICAgICAgICAgICAgICAgIDEsIHRoZSBwb2ludCByZXR1cm5lZCBpcyBhdCgwLDAuNiwwLjgpLlxuXHQgKi9cblx0cHVibGljIG5vcm1hbGl6ZSh0aGlja25lc3M6bnVtYmVyID0gMSlcblx0e1xuXHRcdGlmICh0aGlzLmxlbmd0aCAhPSAwKSB7XG5cdFx0XHR2YXIgaW52TGVuZ3RoID0gdGhpY2tuZXNzL3RoaXMubGVuZ3RoO1xuXHRcdFx0dGhpcy54ICo9IGludkxlbmd0aDtcblx0XHRcdHRoaXMueSAqPSBpbnZMZW5ndGg7XG5cdFx0XHR0aGlzLnogKj0gaW52TGVuZ3RoO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEaXZpZGVzIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCBhbmRcblx0ICogPGNvZGU+ejwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QgYnkgdGhlXG5cdCAqIHZhbHVlIG9mIGl0cyA8Y29kZT53PC9jb2RlPiBwcm9wZXJ0eS5cblx0ICpcblx0ICogPHA+SWYgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IGlzIHRoZSByZXN1bHQgb2YgbXVsdGlwbHlpbmcgYVxuXHQgKiBWZWN0b3IzRCBvYmplY3QgYnkgYSBwcm9qZWN0aW9uIE1hdHJpeDNEIG9iamVjdCwgdGhlIHcgcHJvcGVydHkgY2FuXG5cdCAqIGhvbGQgdGhlIHRyYW5zZm9ybSB2YWx1ZS4gVGhlIDxjb2RlPnByb2plY3QoKTwvY29kZT4gbWV0aG9kIHRoZW4gY2FuXG5cdCAqIGNvbXBsZXRlIHRoZSBwcm9qZWN0aW9uIGJ5IGRpdmlkaW5nIHRoZSBlbGVtZW50cyBieSB0aGVcblx0ICogPGNvZGU+dzwvY29kZT4gcHJvcGVydHkuIFVzZSB0aGUgPGNvZGU+TWF0cml4M0QucmF3RGF0YTwvY29kZT5cblx0ICogcHJvcGVydHkgdG8gY3JlYXRlIGEgcHJvamVjdGlvbiBNYXRyaXgzRCBvYmplY3QuPC9wPlxuXHQgKi9cblx0cHVibGljIHByb2plY3QoKTp2b2lkXG5cdHtcblx0XHR0aGlzLnggLz0gdGhpcy53O1xuXHRcdHRoaXMueSAvPSB0aGlzLnc7XG5cdFx0dGhpcy56IC89IHRoaXMudztcblx0fVxuXG5cdC8qKlxuXHQgKiBTY2FsZXMgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0IGJ5IGEgc2NhbGFyLCBhIG1hZ25pdHVkZS4gVGhlXG5cdCAqIFZlY3RvcjNEIG9iamVjdCdzIHgsIHksIGFuZCB6IGVsZW1lbnRzIGFyZSBtdWx0aXBsaWVkIGJ5IHRoZSBzY2FsYXJcblx0ICogbnVtYmVyIHNwZWNpZmllZCBpbiB0aGUgcGFyYW1ldGVyLiBGb3IgZXhhbXBsZSwgaWYgdGhlIHZlY3RvciBpc1xuXHQgKiBzY2FsZWQgYnkgdGVuLCB0aGUgcmVzdWx0IGlzIGEgdmVjdG9yIHRoYXQgaXMgdGVuIHRpbWVzIGxvbmdlci4gVGhlXG5cdCAqIHNjYWxhciBjYW4gYWxzbyBjaGFuZ2UgdGhlIGRpcmVjdGlvbiBvZiB0aGUgdmVjdG9yLiBNdWx0aXBseWluZyB0aGVcblx0ICogdmVjdG9yIGJ5IGEgbmVnYXRpdmUgbnVtYmVyIHJldmVyc2VzIGl0cyBkaXJlY3Rpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSBzIEEgbXVsdGlwbGllciAoc2NhbGFyKSB1c2VkIHRvIHNjYWxlIGEgVmVjdG9yM0Qgb2JqZWN0LlxuXG5cdCAqL1xuXHRwdWJsaWMgc2NhbGVCeShzOm51bWJlcik6dm9pZFxuXHR7XG5cdFx0dGhpcy54ICo9IHM7XG5cdFx0dGhpcy55ICo9IHM7XG5cdFx0dGhpcy56ICo9IHM7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyB0aGUgbWVtYmVycyBvZiBWZWN0b3IzRCB0byB0aGUgc3BlY2lmaWVkIHZhbHVlc1xuXHQgKlxuXHQgKiBAcGFyYW0geGEgVGhlIGZpcnN0IGVsZW1lbnQsIHN1Y2ggYXMgdGhlIHggY29vcmRpbmF0ZS5cblx0ICogQHBhcmFtIHlhIFRoZSBzZWNvbmQgZWxlbWVudCwgc3VjaCBhcyB0aGUgeSBjb29yZGluYXRlLlxuXHQgKiBAcGFyYW0gemEgVGhlIHRoaXJkIGVsZW1lbnQsIHN1Y2ggYXMgdGhlIHogY29vcmRpbmF0ZS5cblx0ICovXG5cdHB1YmxpYyBzZXRUbyh4YTpudW1iZXIsIHlhOm51bWJlciwgemE6bnVtYmVyKTp2b2lkXG5cdHtcblx0XHR0aGlzLnggPSB4YTtcblx0XHR0aGlzLnkgPSB5YTtcblx0XHR0aGlzLnogPSB6YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJ0cmFjdHMgdGhlIHZhbHVlIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZiB0aGUgY3VycmVudFxuXHQgKiBWZWN0b3IzRCBvYmplY3QgZnJvbSB0aGUgdmFsdWVzIG9mIHRoZSB4LCB5LCBhbmQgeiBlbGVtZW50cyBvZlxuXHQgKiBhbm90aGVyIFZlY3RvcjNEIG9iamVjdC4gVGhlIDxjb2RlPnN1YnRyYWN0KCk8L2NvZGU+IG1ldGhvZCBkb2VzIG5vdFxuXHQgKiBjaGFuZ2UgdGhlIGN1cnJlbnQgVmVjdG9yM0Qgb2JqZWN0LiBJbnN0ZWFkLCB0aGlzIG1ldGhvZCByZXR1cm5zIGFcblx0ICogbmV3IFZlY3RvcjNEIG9iamVjdCB3aXRoIHRoZSBuZXcgdmFsdWVzLlxuXHQgKlxuXHQgKiBAcGFyYW0gYSBUaGUgVmVjdG9yM0Qgb2JqZWN0IHRvIGJlIHN1YnRyYWN0ZWQgZnJvbSB0aGUgY3VycmVudFxuXHQgKiAgICAgICAgICBWZWN0b3IzRCBvYmplY3QuXG5cdCAqIEByZXR1cm5zIEEgbmV3IFZlY3RvcjNEIG9iamVjdCB0aGF0IGlzIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlXG5cdCAqICAgICAgICAgIGN1cnJlbnQgVmVjdG9yM0QgYW5kIHRoZSBzcGVjaWZpZWQgVmVjdG9yM0Qgb2JqZWN0LlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkuZ2VvbS5WZWN0b3IzRCNkZWNyZW1lbnRCeSgpXG5cdCAqL1xuXHRwdWJsaWMgc3VidHJhY3QoYTpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiBuZXcgVmVjdG9yM0QodGhpcy54IC0gYS54LCB0aGlzLnkgLSBhLnksIHRoaXMueiAtIGEueik7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBWZWN0b3IzRCBvYmplY3QuIFRoZVxuXHQgKiBzdHJpbmcgY29udGFpbnMgdGhlIHZhbHVlcyBvZiB0aGUgeCwgeSwgYW5kIHogcHJvcGVydGllcy5cblx0ICovXG5cdHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIFwiW1ZlY3RvcjNEXSAoeDpcIiArIHRoaXMueCArIFwiICx5OlwiICsgdGhpcy55ICsgXCIsIHpcIiArIHRoaXMueiArIFwiLCB3OlwiICsgdGhpcy53ICsgXCIpXCI7XG5cdH1cbn1cblxuZXhwb3J0ID0gVmVjdG9yM0Q7Il19