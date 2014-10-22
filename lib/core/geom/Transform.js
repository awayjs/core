var Matrix3D = require("awayjs-core/lib/core/geom/Matrix3D");
var Matrix3DUtils = require("awayjs-core/lib/core/geom/Matrix3DUtils");

var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");

/**
* The Transform class provides access to color adjustment properties and two-
* or three-dimensional transformation objects that can be applied to a
* display object. During the transformation, the color or the orientation and
* position of a display object is adjusted(offset) from the current values
* or coordinates to new values or coordinates. The Transform class also
* collects data about color and two-dimensional matrix transformations that
* are applied to a display object and all of its parent objects. You can
* access these combined transformations through the
* <code>concatenatedColorTransform</code> and <code>concatenatedMatrix</code>
* properties.
*
* <p>To apply color transformations: create a ColorTransform object, set the
* color adjustments using the object's methods and properties, and then
* assign the <code>colorTransformation</code> property of the
* <code>transform</code> property of the display object to the new
* ColorTransformation object.</p>
*
* <p>To apply two-dimensional transformations: create a Matrix object, set
* the matrix's two-dimensional transformation, and then assign the
* <code>transform.matrix</code> property of the display object to the new
* Matrix object.</p>
*
* <p>To apply three-dimensional transformations: start with a
* three-dimensional display object. A three-dimensional display object has a
* <code>z</code> property value other than zero. You do not need to create
* the Matrix3D object. For all three-dimensional objects, a Matrix3D object
* is created automatically when you assign a <code>z</code> value to a
* display object. You can access the display object's Matrix3D object through
* the display object's <code>transform</code> property. Using the methods of
* the Matrix3D class, you can add to or modify the existing transformation
* settings. Also, you can create a custom Matrix3D object, set the custom
* Matrix3D object's transformation elements, and then assign the new Matrix3D
* object to the display object using the <code>transform.matrix</code>
* property.</p>
*
* <p>To modify a perspective projection of the stage or root object: use the
* <code>transform.matrix</code> property of the root display object to gain
* access to the PerspectiveProjection object. Or, apply different perspective
* projection properties to a display object by setting the perspective
* projection properties of the display object's parent. The child display
* object inherits the new properties. Specifically, create a
* PerspectiveProjection object and set its properties, then assign the
* PerspectiveProjection object to the <code>perspectiveProjection</code>
* property of the parent display object's <code>transform</code> property.
* The specified projection transformation then applies to all the display
* object's three-dimensional children.</p>
*
* <p>Since both PerspectiveProjection and Matrix3D objects perform
* perspective transformations, do not assign both to a display object at the
* same time. Use the PerspectiveProjection object for focal length and
* projection center changes. For more control over the perspective
* transformation, create a perspective projection Matrix3D object.</p>
*/
var Transform = (function () {
    function Transform(displayObject) {
        this._position = new Vector3D();
        this._displayObject = displayObject;
    }
    Object.defineProperty(Transform.prototype, "backVector", {
        /**
        *
        */
        get: function () {
            var director = Matrix3DUtils.getForward(this._displayObject._iMatrix3D);
            director.negate();

            return director;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Transform.prototype, "concatenatedColorTransform", {
        /**
        * A ColorTransform object representing the combined color transformations
        * applied to the display object and all of its parent objects, back to the
        * root level. If different color transformations have been applied at
        * different levels, all of those transformations are concatenated into one
        * ColorTransform object for this property.
        */
        get: function () {
            return this._concatenatedColorTransform;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Transform.prototype, "concatenatedMatrix", {
        /**
        * A Matrix object representing the combined transformation matrixes of the
        * display object and all of its parent objects, back to the root level. If
        * different transformation matrixes have been applied at different levels,
        * all of those matrixes are concatenated into one matrix for this property.
        * Also, for resizeable SWF content running in the browser, this property
        * factors in the difference between stage coordinates and window coordinates
        * due to window resizing. Thus, the property converts local coordinates to
        * window coordinates, which may not be the same coordinate space as that of
        * the Stage.
        */
        get: function () {
            return this._concatenatedMatrix;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Transform.prototype, "downVector", {
        /**
        *
        */
        get: function () {
            var director = Matrix3DUtils.getUp(this._displayObject._iMatrix3D);
            director.negate();

            return director;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Transform.prototype, "forwardVector", {
        /**
        *
        */
        get: function () {
            return Matrix3DUtils.getForward(this._displayObject._iMatrix3D);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Transform.prototype, "leftVector", {
        /**
        *
        */
        get: function () {
            var director = Matrix3DUtils.getRight(this._displayObject._iMatrix3D);
            director.negate();

            return director;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Transform.prototype, "matrix3D", {
        /**
        * Provides access to the Matrix3D object of a three-dimensional display
        * object. The Matrix3D object represents a transformation matrix that
        * determines the display object's position and orientation. A Matrix3D
        * object can also perform perspective projection.
        *
        * <p>If the <code>matrix</code> property is set to a value(not
        * <code>null</code>), the <code>matrix3D</code> property is
        * <code>null</code>. And if the <code>matrix3D</code> property is set to a
        * value(not <code>null</code>), the <code>matrix</code> property is
        * <code>null</code>.</p>
        */
        get: function () {
            return this._displayObject._iMatrix3D;
        },
        set: function (val) {
            this._displayObject._iMatrix3D = val;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(Transform.prototype, "pixelBounds", {
        /**
        * A Rectangle object that defines the bounding rectangle of the display
        * object on the stage.
        */
        get: function () {
            return this._pixelBounds;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Transform.prototype, "position", {
        /**
        * Defines the position of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
        */
        get: function () {
            return this._displayObject._iMatrix3D.position;
        },
        set: function (value) {
            this._displayObject.x = value.x;
            this._displayObject.y = value.y;
            this._displayObject.z = value.z;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(Transform.prototype, "rightVector", {
        /**
        *
        */
        get: function () {
            return Matrix3DUtils.getRight(this._displayObject._iMatrix3D);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Transform.prototype, "rotation", {
        /**
        * Defines the rotation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
        */
        get: function () {
            return new Vector3D(this._displayObject.rotationX, this._displayObject.rotationY, this._displayObject.rotationZ);
        },
        set: function (value) {
            this._displayObject.rotationX = value.x;
            this._displayObject.rotationY = value.y;
            this._displayObject.rotationZ = value.z;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(Transform.prototype, "scale", {
        /**
        * Defines the scale of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
        */
        get: function () {
            return new Vector3D(this._displayObject.scaleX, this._displayObject.scaleY, this._displayObject.scaleZ);
        },
        set: function (value) {
            this._displayObject.scaleX = value.x;
            this._displayObject.scaleY = value.y;
            this._displayObject.scaleZ = value.z;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(Transform.prototype, "upVector", {
        /**
        *
        */
        get: function () {
            return Matrix3DUtils.getUp(this._displayObject._iMatrix3D);
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Returns a Matrix3D object, which can transform the space of a specified
    * display object in relation to the current display object's space. You can
    * use the <code>getRelativeMatrix3D()</code> method to move one
    * three-dimensional display object relative to another three-dimensional
    * display object.
    *
    * @param relativeTo The display object relative to which the transformation
    *                   occurs. To get a Matrix3D object relative to the stage,
    *                   set the parameter to the <code>root</code> or
    *                   <code>stage</code> object. To get the world-relative
    *                   matrix of the display object, set the parameter to a
    *                   display object that has a perspective transformation
    *                   applied to it.
    * @return A Matrix3D object that can be used to transform the space from the
    *         <code>relativeTo</code> display object to the current display
    *         object space.
    */
    Transform.prototype.getRelativeMatrix3D = function (relativeTo) {
        return new Matrix3D();
    };

    /**
    * Moves the 3d object forwards along it's local z axis
    *
    * @param    distance    The length of the movement
    */
    Transform.prototype.moveForward = function (distance) {
        this._displayObject.translateLocal(Vector3D.Z_AXIS, distance);
    };

    /**
    * Moves the 3d object backwards along it's local z axis
    *
    * @param    distance    The length of the movement
    */
    Transform.prototype.moveBackward = function (distance) {
        this._displayObject.translateLocal(Vector3D.Z_AXIS, -distance);
    };

    /**
    * Moves the 3d object backwards along it's local x axis
    *
    * @param    distance    The length of the movement
    */
    Transform.prototype.moveLeft = function (distance) {
        this._displayObject.translateLocal(Vector3D.X_AXIS, -distance);
    };

    /**
    * Moves the 3d object forwards along it's local x axis
    *
    * @param    distance    The length of the movement
    */
    Transform.prototype.moveRight = function (distance) {
        this._displayObject.translateLocal(Vector3D.X_AXIS, distance);
    };

    /**
    * Moves the 3d object forwards along it's local y axis
    *
    * @param    distance    The length of the movement
    */
    Transform.prototype.moveUp = function (distance) {
        this._displayObject.translateLocal(Vector3D.Y_AXIS, distance);
    };

    /**
    * Moves the 3d object backwards along it's local y axis
    *
    * @param    distance    The length of the movement
    */
    Transform.prototype.moveDown = function (distance) {
        this._displayObject.translateLocal(Vector3D.Y_AXIS, -distance);
    };
    return Transform;
})();

module.exports = Transform;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZ2VvbS9UcmFuc2Zvcm0udHMiXSwibmFtZXMiOlsiVHJhbnNmb3JtIiwiVHJhbnNmb3JtLmNvbnN0cnVjdG9yIiwiVHJhbnNmb3JtLmdldFJlbGF0aXZlTWF0cml4M0QiLCJUcmFuc2Zvcm0ubW92ZUZvcndhcmQiLCJUcmFuc2Zvcm0ubW92ZUJhY2t3YXJkIiwiVHJhbnNmb3JtLm1vdmVMZWZ0IiwiVHJhbnNmb3JtLm1vdmVSaWdodCIsIlRyYW5zZm9ybS5tb3ZlVXAiLCJUcmFuc2Zvcm0ubW92ZURvd24iXSwibWFwcGluZ3MiOiJBQUFBLDREQUdvRTtBQUNwRSxzRUFBNEU7O0FBRTVFLDREQUFvRTs7QUFHcEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcURHO0FBQ0g7SUEwTUNBLG1CQUFZQSxhQUEyQkE7UUFwTXZDQyxLQUFPQSxTQUFTQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQXNNMUNBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLGFBQWFBO0lBQ3BDQSxDQUFDQTtJQWxNREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLElBQUlBLFFBQVFBLEdBQVlBLGFBQWFBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLFVBQVVBLENBQUNBO1lBQ2hGQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTs7WUFFakJBLE9BQU9BLFFBQVFBO1FBQ2hCQSxDQUFDQTs7OztBQUFBQTtJQWlCREE7UUFBQUE7Ozs7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSwyQkFBMkJBO1FBQ3hDQSxDQUFDQTs7OztBQUFBQTtJQWFEQTtRQUFBQTs7Ozs7Ozs7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxtQkFBbUJBO1FBQ2hDQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0Es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QUVBLFFBQVFBLENBQUNBO0lBQzlEQSxDQUFDQTs7SUFPRE47Ozs7TUFER0E7aUNBQ0hBLFVBQWNBLFFBQWVBO1FBRTVCTyxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxjQUFjQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQTtJQUM5REEsQ0FBQ0E7O0lBT0RQOzs7O01BREdBO21DQUNIQSxVQUFnQkEsUUFBZUE7UUFFOUJRLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBO0lBQy9EQSxDQUFDQTtJQUNGUixpQkFBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCwwQkFBbUIsQ0FDbkIiLCJmaWxlIjoiY29yZS9nZW9tL1RyYW5zZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IENvbG9yVHJhbnNmb3JtXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9Db2xvclRyYW5zZm9ybVwiKTtcbmltcG9ydCBNYXRyaXhcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXhcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBNYXRyaXgzRFV0aWxzXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXgzRFV0aWxzXCIpO1xuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBQZXJzcGVjdGl2ZVByb2plY3Rpb25cdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9QZXJzcGVjdGl2ZVByb2plY3Rpb25cIik7XG5cbi8qKlxuICogVGhlIFRyYW5zZm9ybSBjbGFzcyBwcm92aWRlcyBhY2Nlc3MgdG8gY29sb3IgYWRqdXN0bWVudCBwcm9wZXJ0aWVzIGFuZCB0d28tXG4gKiBvciB0aHJlZS1kaW1lbnNpb25hbCB0cmFuc2Zvcm1hdGlvbiBvYmplY3RzIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gYVxuICogZGlzcGxheSBvYmplY3QuIER1cmluZyB0aGUgdHJhbnNmb3JtYXRpb24sIHRoZSBjb2xvciBvciB0aGUgb3JpZW50YXRpb24gYW5kXG4gKiBwb3NpdGlvbiBvZiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkanVzdGVkKG9mZnNldCkgZnJvbSB0aGUgY3VycmVudCB2YWx1ZXNcbiAqIG9yIGNvb3JkaW5hdGVzIHRvIG5ldyB2YWx1ZXMgb3IgY29vcmRpbmF0ZXMuIFRoZSBUcmFuc2Zvcm0gY2xhc3MgYWxzb1xuICogY29sbGVjdHMgZGF0YSBhYm91dCBjb2xvciBhbmQgdHdvLWRpbWVuc2lvbmFsIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbnMgdGhhdFxuICogYXJlIGFwcGxpZWQgdG8gYSBkaXNwbGF5IG9iamVjdCBhbmQgYWxsIG9mIGl0cyBwYXJlbnQgb2JqZWN0cy4gWW91IGNhblxuICogYWNjZXNzIHRoZXNlIGNvbWJpbmVkIHRyYW5zZm9ybWF0aW9ucyB0aHJvdWdoIHRoZVxuICogPGNvZGU+Y29uY2F0ZW5hdGVkQ29sb3JUcmFuc2Zvcm08L2NvZGU+IGFuZCA8Y29kZT5jb25jYXRlbmF0ZWRNYXRyaXg8L2NvZGU+XG4gKiBwcm9wZXJ0aWVzLlxuICpcbiAqIDxwPlRvIGFwcGx5IGNvbG9yIHRyYW5zZm9ybWF0aW9uczogY3JlYXRlIGEgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0LCBzZXQgdGhlXG4gKiBjb2xvciBhZGp1c3RtZW50cyB1c2luZyB0aGUgb2JqZWN0J3MgbWV0aG9kcyBhbmQgcHJvcGVydGllcywgYW5kIHRoZW5cbiAqIGFzc2lnbiB0aGUgPGNvZGU+Y29sb3JUcmFuc2Zvcm1hdGlvbjwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG4gKiA8Y29kZT50cmFuc2Zvcm08L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBkaXNwbGF5IG9iamVjdCB0byB0aGUgbmV3XG4gKiBDb2xvclRyYW5zZm9ybWF0aW9uIG9iamVjdC48L3A+XG4gKlxuICogPHA+VG8gYXBwbHkgdHdvLWRpbWVuc2lvbmFsIHRyYW5zZm9ybWF0aW9uczogY3JlYXRlIGEgTWF0cml4IG9iamVjdCwgc2V0XG4gKiB0aGUgbWF0cml4J3MgdHdvLWRpbWVuc2lvbmFsIHRyYW5zZm9ybWF0aW9uLCBhbmQgdGhlbiBhc3NpZ24gdGhlXG4gKiA8Y29kZT50cmFuc2Zvcm0ubWF0cml4PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgZGlzcGxheSBvYmplY3QgdG8gdGhlIG5ld1xuICogTWF0cml4IG9iamVjdC48L3A+XG4gKlxuICogPHA+VG8gYXBwbHkgdGhyZWUtZGltZW5zaW9uYWwgdHJhbnNmb3JtYXRpb25zOiBzdGFydCB3aXRoIGFcbiAqIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0LiBBIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0IGhhcyBhXG4gKiA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZSBvdGhlciB0aGFuIHplcm8uIFlvdSBkbyBub3QgbmVlZCB0byBjcmVhdGVcbiAqIHRoZSBNYXRyaXgzRCBvYmplY3QuIEZvciBhbGwgdGhyZWUtZGltZW5zaW9uYWwgb2JqZWN0cywgYSBNYXRyaXgzRCBvYmplY3RcbiAqIGlzIGNyZWF0ZWQgYXV0b21hdGljYWxseSB3aGVuIHlvdSBhc3NpZ24gYSA8Y29kZT56PC9jb2RlPiB2YWx1ZSB0byBhXG4gKiBkaXNwbGF5IG9iamVjdC4gWW91IGNhbiBhY2Nlc3MgdGhlIGRpc3BsYXkgb2JqZWN0J3MgTWF0cml4M0Qgb2JqZWN0IHRocm91Z2hcbiAqIHRoZSBkaXNwbGF5IG9iamVjdCdzIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkuIFVzaW5nIHRoZSBtZXRob2RzIG9mXG4gKiB0aGUgTWF0cml4M0QgY2xhc3MsIHlvdSBjYW4gYWRkIHRvIG9yIG1vZGlmeSB0aGUgZXhpc3RpbmcgdHJhbnNmb3JtYXRpb25cbiAqIHNldHRpbmdzLiBBbHNvLCB5b3UgY2FuIGNyZWF0ZSBhIGN1c3RvbSBNYXRyaXgzRCBvYmplY3QsIHNldCB0aGUgY3VzdG9tXG4gKiBNYXRyaXgzRCBvYmplY3QncyB0cmFuc2Zvcm1hdGlvbiBlbGVtZW50cywgYW5kIHRoZW4gYXNzaWduIHRoZSBuZXcgTWF0cml4M0RcbiAqIG9iamVjdCB0byB0aGUgZGlzcGxheSBvYmplY3QgdXNpbmcgdGhlIDxjb2RlPnRyYW5zZm9ybS5tYXRyaXg8L2NvZGU+XG4gKiBwcm9wZXJ0eS48L3A+XG4gKlxuICogPHA+VG8gbW9kaWZ5IGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBvZiB0aGUgc3RhZ2Ugb3Igcm9vdCBvYmplY3Q6IHVzZSB0aGVcbiAqIDxjb2RlPnRyYW5zZm9ybS5tYXRyaXg8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSByb290IGRpc3BsYXkgb2JqZWN0IHRvIGdhaW5cbiAqIGFjY2VzcyB0byB0aGUgUGVyc3BlY3RpdmVQcm9qZWN0aW9uIG9iamVjdC4gT3IsIGFwcGx5IGRpZmZlcmVudCBwZXJzcGVjdGl2ZVxuICogcHJvamVjdGlvbiBwcm9wZXJ0aWVzIHRvIGEgZGlzcGxheSBvYmplY3QgYnkgc2V0dGluZyB0aGUgcGVyc3BlY3RpdmVcbiAqIHByb2plY3Rpb24gcHJvcGVydGllcyBvZiB0aGUgZGlzcGxheSBvYmplY3QncyBwYXJlbnQuIFRoZSBjaGlsZCBkaXNwbGF5XG4gKiBvYmplY3QgaW5oZXJpdHMgdGhlIG5ldyBwcm9wZXJ0aWVzLiBTcGVjaWZpY2FsbHksIGNyZWF0ZSBhXG4gKiBQZXJzcGVjdGl2ZVByb2plY3Rpb24gb2JqZWN0IGFuZCBzZXQgaXRzIHByb3BlcnRpZXMsIHRoZW4gYXNzaWduIHRoZVxuICogUGVyc3BlY3RpdmVQcm9qZWN0aW9uIG9iamVjdCB0byB0aGUgPGNvZGU+cGVyc3BlY3RpdmVQcm9qZWN0aW9uPC9jb2RlPlxuICogcHJvcGVydHkgb2YgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdCdzIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkuXG4gKiBUaGUgc3BlY2lmaWVkIHByb2plY3Rpb24gdHJhbnNmb3JtYXRpb24gdGhlbiBhcHBsaWVzIHRvIGFsbCB0aGUgZGlzcGxheVxuICogb2JqZWN0J3MgdGhyZWUtZGltZW5zaW9uYWwgY2hpbGRyZW4uPC9wPlxuICpcbiAqIDxwPlNpbmNlIGJvdGggUGVyc3BlY3RpdmVQcm9qZWN0aW9uIGFuZCBNYXRyaXgzRCBvYmplY3RzIHBlcmZvcm1cbiAqIHBlcnNwZWN0aXZlIHRyYW5zZm9ybWF0aW9ucywgZG8gbm90IGFzc2lnbiBib3RoIHRvIGEgZGlzcGxheSBvYmplY3QgYXQgdGhlXG4gKiBzYW1lIHRpbWUuIFVzZSB0aGUgUGVyc3BlY3RpdmVQcm9qZWN0aW9uIG9iamVjdCBmb3IgZm9jYWwgbGVuZ3RoIGFuZFxuICogcHJvamVjdGlvbiBjZW50ZXIgY2hhbmdlcy4gRm9yIG1vcmUgY29udHJvbCBvdmVyIHRoZSBwZXJzcGVjdGl2ZVxuICogdHJhbnNmb3JtYXRpb24sIGNyZWF0ZSBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gTWF0cml4M0Qgb2JqZWN0LjwvcD5cbiAqL1xuY2xhc3MgVHJhbnNmb3JtXG57XG5cdHByaXZhdGUgX2Rpc3BsYXlPYmplY3Q6RGlzcGxheU9iamVjdDtcblx0cHJpdmF0ZSBfY29uY2F0ZW5hdGVkQ29sb3JUcmFuc2Zvcm06Q29sb3JUcmFuc2Zvcm07XG5cdHByaXZhdGUgX2NvbmNhdGVuYXRlZE1hdHJpeDpNYXRyaXg7XG5cdHByaXZhdGUgX3BpeGVsQm91bmRzOlJlY3RhbmdsZTtcblx0cHVibGljIF9wb3NpdGlvbjpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBiYWNrVmVjdG9yKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHZhciBkaXJlY3RvcjpWZWN0b3IzRCA9IE1hdHJpeDNEVXRpbHMuZ2V0Rm9yd2FyZCh0aGlzLl9kaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QpO1xuXHRcdGRpcmVjdG9yLm5lZ2F0ZSgpO1xuXG5cdFx0cmV0dXJuIGRpcmVjdG9yO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IGNvbnRhaW5pbmcgdmFsdWVzIHRoYXQgdW5pdmVyc2FsbHkgYWRqdXN0IHRoZVxuXHQgKiBjb2xvcnMgaW4gdGhlIGRpc3BsYXkgb2JqZWN0LlxuXHQgKiBcblx0ICogQHRocm93cyBUeXBlRXJyb3IgVGhlIGNvbG9yVHJhbnNmb3JtIGlzIG51bGwgd2hlbiBiZWluZyBzZXRcblx0ICovXG5cdHB1YmxpYyBjb2xvclRyYW5zZm9ybTpDb2xvclRyYW5zZm9ybTtcblxuXHQvKipcblx0ICogQSBDb2xvclRyYW5zZm9ybSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjb21iaW5lZCBjb2xvciB0cmFuc2Zvcm1hdGlvbnNcblx0ICogYXBwbGllZCB0byB0aGUgZGlzcGxheSBvYmplY3QgYW5kIGFsbCBvZiBpdHMgcGFyZW50IG9iamVjdHMsIGJhY2sgdG8gdGhlXG5cdCAqIHJvb3QgbGV2ZWwuIElmIGRpZmZlcmVudCBjb2xvciB0cmFuc2Zvcm1hdGlvbnMgaGF2ZSBiZWVuIGFwcGxpZWQgYXRcblx0ICogZGlmZmVyZW50IGxldmVscywgYWxsIG9mIHRob3NlIHRyYW5zZm9ybWF0aW9ucyBhcmUgY29uY2F0ZW5hdGVkIGludG8gb25lXG5cdCAqIENvbG9yVHJhbnNmb3JtIG9iamVjdCBmb3IgdGhpcyBwcm9wZXJ0eS5cblx0ICovXG5cdHB1YmxpYyBnZXQgY29uY2F0ZW5hdGVkQ29sb3JUcmFuc2Zvcm0oKTpDb2xvclRyYW5zZm9ybVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbmNhdGVuYXRlZENvbG9yVHJhbnNmb3JtOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBBIE1hdHJpeCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjb21iaW5lZCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhlcyBvZiB0aGVcblx0ICogZGlzcGxheSBvYmplY3QgYW5kIGFsbCBvZiBpdHMgcGFyZW50IG9iamVjdHMsIGJhY2sgdG8gdGhlIHJvb3QgbGV2ZWwuIElmXG5cdCAqIGRpZmZlcmVudCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhlcyBoYXZlIGJlZW4gYXBwbGllZCBhdCBkaWZmZXJlbnQgbGV2ZWxzLFxuXHQgKiBhbGwgb2YgdGhvc2UgbWF0cml4ZXMgYXJlIGNvbmNhdGVuYXRlZCBpbnRvIG9uZSBtYXRyaXggZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqIEFsc28sIGZvciByZXNpemVhYmxlIFNXRiBjb250ZW50IHJ1bm5pbmcgaW4gdGhlIGJyb3dzZXIsIHRoaXMgcHJvcGVydHlcblx0ICogZmFjdG9ycyBpbiB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHN0YWdlIGNvb3JkaW5hdGVzIGFuZCB3aW5kb3cgY29vcmRpbmF0ZXNcblx0ICogZHVlIHRvIHdpbmRvdyByZXNpemluZy4gVGh1cywgdGhlIHByb3BlcnR5IGNvbnZlcnRzIGxvY2FsIGNvb3JkaW5hdGVzIHRvXG5cdCAqIHdpbmRvdyBjb29yZGluYXRlcywgd2hpY2ggbWF5IG5vdCBiZSB0aGUgc2FtZSBjb29yZGluYXRlIHNwYWNlIGFzIHRoYXQgb2Zcblx0ICogdGhlIFN0YWdlLlxuXHQgKi9cblx0cHVibGljIGdldCBjb25jYXRlbmF0ZWRNYXRyaXgoKTpNYXRyaXhcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jb25jYXRlbmF0ZWRNYXRyaXg7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRvd25WZWN0b3IoKTpWZWN0b3IzRFxuXHR7XG5cdFx0dmFyIGRpcmVjdG9yOlZlY3RvcjNEID0gTWF0cml4M0RVdGlscy5nZXRVcCh0aGlzLl9kaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QpO1xuXHRcdGRpcmVjdG9yLm5lZ2F0ZSgpO1xuXG5cdFx0cmV0dXJuIGRpcmVjdG9yO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGZvcndhcmRWZWN0b3IoKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIE1hdHJpeDNEVXRpbHMuZ2V0Rm9yd2FyZCh0aGlzLl9kaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxlZnRWZWN0b3IoKTpWZWN0b3IzRFxuXHR7XG5cdFx0dmFyIGRpcmVjdG9yOlZlY3RvcjNEID0gTWF0cml4M0RVdGlscy5nZXRSaWdodCh0aGlzLl9kaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QpO1xuXHRcdGRpcmVjdG9yLm5lZ2F0ZSgpO1xuXG5cdFx0cmV0dXJuIGRpcmVjdG9yO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgTWF0cml4IG9iamVjdCBjb250YWluaW5nIHZhbHVlcyB0aGF0IGFsdGVyIHRoZSBzY2FsaW5nLCByb3RhdGlvbiwgYW5kXG5cdCAqIHRyYW5zbGF0aW9uIG9mIHRoZSBkaXNwbGF5IG9iamVjdC5cblx0ICpcblx0ICogPHA+SWYgdGhlIDxjb2RlPm1hdHJpeDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIGEgdmFsdWUobm90XG5cdCAqIDxjb2RlPm51bGw8L2NvZGU+KSwgdGhlIDxjb2RlPm1hdHJpeDNEPC9jb2RlPiBwcm9wZXJ0eSBpc1xuXHQgKiA8Y29kZT5udWxsPC9jb2RlPi4gQW5kIGlmIHRoZSA8Y29kZT5tYXRyaXgzRDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIGFcblx0ICogdmFsdWUobm90IDxjb2RlPm51bGw8L2NvZGU+KSwgdGhlIDxjb2RlPm1hdHJpeDwvY29kZT4gcHJvcGVydHkgaXNcblx0ICogPGNvZGU+bnVsbDwvY29kZT4uPC9wPlxuXHQgKiBcblx0ICogQHRocm93cyBUeXBlRXJyb3IgVGhlIG1hdHJpeCBpcyBudWxsIHdoZW4gYmVpbmcgc2V0XG5cdCAqL1xuXHRwdWJsaWMgbWF0cml4Ok1hdHJpeDtcblxuXHQvKipcblx0ICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBNYXRyaXgzRCBvYmplY3Qgb2YgYSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5XG5cdCAqIG9iamVjdC4gVGhlIE1hdHJpeDNEIG9iamVjdCByZXByZXNlbnRzIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4IHRoYXRcblx0ICogZGV0ZXJtaW5lcyB0aGUgZGlzcGxheSBvYmplY3QncyBwb3NpdGlvbiBhbmQgb3JpZW50YXRpb24uIEEgTWF0cml4M0Rcblx0ICogb2JqZWN0IGNhbiBhbHNvIHBlcmZvcm0gcGVyc3BlY3RpdmUgcHJvamVjdGlvbi5cblx0ICpcblx0ICogPHA+SWYgdGhlIDxjb2RlPm1hdHJpeDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIGEgdmFsdWUobm90XG5cdCAqIDxjb2RlPm51bGw8L2NvZGU+KSwgdGhlIDxjb2RlPm1hdHJpeDNEPC9jb2RlPiBwcm9wZXJ0eSBpc1xuXHQgKiA8Y29kZT5udWxsPC9jb2RlPi4gQW5kIGlmIHRoZSA8Y29kZT5tYXRyaXgzRDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIGFcblx0ICogdmFsdWUobm90IDxjb2RlPm51bGw8L2NvZGU+KSwgdGhlIDxjb2RlPm1hdHJpeDwvY29kZT4gcHJvcGVydHkgaXNcblx0ICogPGNvZGU+bnVsbDwvY29kZT4uPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBtYXRyaXgzRCgpOk1hdHJpeDNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGlzcGxheU9iamVjdC5faU1hdHJpeDNEO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRyaXgzRCh2YWw6TWF0cml4M0QpXG5cdHtcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QgPSB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBQZXJzcGVjdGl2ZVByb2plY3Rpb24gb2JqZWN0IG9mIGEgdGhyZWUtZGltZW5zaW9uYWxcblx0ICogZGlzcGxheSBvYmplY3QuIFRoZSBQZXJzcGVjdGl2ZVByb2plY3Rpb24gb2JqZWN0IGNhbiBiZSB1c2VkIHRvIG1vZGlmeSB0aGVcblx0ICogcGVyc3BlY3RpdmUgdHJhbnNmb3JtYXRpb24gb2YgdGhlIHN0YWdlIG9yIHRvIGFzc2lnbiBhIHBlcnNwZWN0aXZlXG5cdCAqIHRyYW5zZm9ybWF0aW9uIHRvIGFsbCB0aGUgdGhyZWUtZGltZW5zaW9uYWwgY2hpbGRyZW4gb2YgYSBkaXNwbGF5IG9iamVjdC5cblx0ICpcblx0ICogPHA+QmFzZWQgb24gdGhlIGZpZWxkIG9mIHZpZXcgYW5kIGFzcGVjdCByYXRpbyhkaW1lbnNpb25zKSBvZiB0aGUgc3RhZ2UsXG5cdCAqIGEgZGVmYXVsdCBQZXJzcGVjdGl2ZVByb2plY3Rpb24gb2JqZWN0IGlzIGFzc2lnbmVkIHRvIHRoZSByb290IG9iamVjdC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgcGVyc3BlY3RpdmVQcm9qZWN0aW9uOlBlcnNwZWN0aXZlUHJvamVjdGlvbjtcblxuXHQvKipcblx0ICogQSBSZWN0YW5nbGUgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGUgYm91bmRpbmcgcmVjdGFuZ2xlIG9mIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdCBvbiB0aGUgc3RhZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBpeGVsQm91bmRzKCk6UmVjdGFuZ2xlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGl4ZWxCb3VuZHM7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgcG9zaXRpb24gb2YgdGhlIDNkIG9iamVjdCwgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGdldCBwb3NpdGlvbigpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGlzcGxheU9iamVjdC5faU1hdHJpeDNELnBvc2l0aW9uXG5cdH1cblxuXHRwdWJsaWMgc2V0IHBvc2l0aW9uKHZhbHVlOlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC54ID0gdmFsdWUueDtcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnkgPSB2YWx1ZS55O1xuXHRcdHRoaXMuX2Rpc3BsYXlPYmplY3QueiA9IHZhbHVlLno7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcmlnaHRWZWN0b3IoKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIE1hdHJpeDNEVXRpbHMuZ2V0UmlnaHQodGhpcy5fZGlzcGxheU9iamVjdC5faU1hdHJpeDNEKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSByb3RhdGlvbiBvZiB0aGUgM2Qgb2JqZWN0LCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiBuZXcgVmVjdG9yM0QodGhpcy5fZGlzcGxheU9iamVjdC5yb3RhdGlvblgsIHRoaXMuX2Rpc3BsYXlPYmplY3Qucm90YXRpb25ZLCB0aGlzLl9kaXNwbGF5T2JqZWN0LnJvdGF0aW9uWik7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uKHZhbHVlOlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC5yb3RhdGlvblggPSB2YWx1ZS54O1xuXHRcdHRoaXMuX2Rpc3BsYXlPYmplY3Qucm90YXRpb25ZID0gdmFsdWUueTtcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnJvdGF0aW9uWiA9IHZhbHVlLno7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgc2NhbGUgb2YgdGhlIDNkIG9iamVjdCwgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZSgpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjNEKHRoaXMuX2Rpc3BsYXlPYmplY3Quc2NhbGVYLCB0aGlzLl9kaXNwbGF5T2JqZWN0LnNjYWxlWSwgdGhpcy5fZGlzcGxheU9iamVjdC5zY2FsZVopO1xuXHR9XG5cblx0cHVibGljIHNldCBzY2FsZSh2YWx1ZTpWZWN0b3IzRClcblx0e1xuXHRcdHRoaXMuX2Rpc3BsYXlPYmplY3Quc2NhbGVYID0gdmFsdWUueDtcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnNjYWxlWSA9IHZhbHVlLnk7XG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC5zY2FsZVogPSB2YWx1ZS56O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHVwVmVjdG9yKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiBNYXRyaXgzRFV0aWxzLmdldFVwKHRoaXMuX2Rpc3BsYXlPYmplY3QuX2lNYXRyaXgzRCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihkaXNwbGF5T2JqZWN0OkRpc3BsYXlPYmplY3QpXG5cdHtcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0ID0gZGlzcGxheU9iamVjdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgTWF0cml4M0Qgb2JqZWN0LCB3aGljaCBjYW4gdHJhbnNmb3JtIHRoZSBzcGFjZSBvZiBhIHNwZWNpZmllZFxuXHQgKiBkaXNwbGF5IG9iamVjdCBpbiByZWxhdGlvbiB0byB0aGUgY3VycmVudCBkaXNwbGF5IG9iamVjdCdzIHNwYWNlLiBZb3UgY2FuXG5cdCAqIHVzZSB0aGUgPGNvZGU+Z2V0UmVsYXRpdmVNYXRyaXgzRCgpPC9jb2RlPiBtZXRob2QgdG8gbW92ZSBvbmVcblx0ICogdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3QgcmVsYXRpdmUgdG8gYW5vdGhlciB0aHJlZS1kaW1lbnNpb25hbFxuXHQgKiBkaXNwbGF5IG9iamVjdC5cblx0ICogXG5cdCAqIEBwYXJhbSByZWxhdGl2ZVRvIFRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZSB0byB3aGljaCB0aGUgdHJhbnNmb3JtYXRpb25cblx0ICogICAgICAgICAgICAgICAgICAgb2NjdXJzLiBUbyBnZXQgYSBNYXRyaXgzRCBvYmplY3QgcmVsYXRpdmUgdG8gdGhlIHN0YWdlLFxuXHQgKiAgICAgICAgICAgICAgICAgICBzZXQgdGhlIHBhcmFtZXRlciB0byB0aGUgPGNvZGU+cm9vdDwvY29kZT4gb3Jcblx0ICogICAgICAgICAgICAgICAgICAgPGNvZGU+c3RhZ2U8L2NvZGU+IG9iamVjdC4gVG8gZ2V0IHRoZSB3b3JsZC1yZWxhdGl2ZVxuXHQgKiAgICAgICAgICAgICAgICAgICBtYXRyaXggb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBzZXQgdGhlIHBhcmFtZXRlciB0byBhXG5cdCAqICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0IHRoYXQgaGFzIGEgcGVyc3BlY3RpdmUgdHJhbnNmb3JtYXRpb25cblx0ICogICAgICAgICAgICAgICAgICAgYXBwbGllZCB0byBpdC5cblx0ICogQHJldHVybiBBIE1hdHJpeDNEIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHRyYW5zZm9ybSB0aGUgc3BhY2UgZnJvbSB0aGVcblx0ICogICAgICAgICA8Y29kZT5yZWxhdGl2ZVRvPC9jb2RlPiBkaXNwbGF5IG9iamVjdCB0byB0aGUgY3VycmVudCBkaXNwbGF5XG5cdCAqICAgICAgICAgb2JqZWN0IHNwYWNlLlxuXHQgKi9cblx0cHVibGljIGdldFJlbGF0aXZlTWF0cml4M0QocmVsYXRpdmVUbzpEaXNwbGF5T2JqZWN0KTpNYXRyaXgzRFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBNYXRyaXgzRCgpOyAvL1RPRE9cblx0fVxuXG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgZm9yd2FyZHMgYWxvbmcgaXQncyBsb2NhbCB6IGF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XG5cdCAqL1xuXHRwdWJsaWMgbW92ZUZvcndhcmQoZGlzdGFuY2U6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbChWZWN0b3IzRC5aX0FYSVMsIGRpc3RhbmNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGJhY2t3YXJkcyBhbG9uZyBpdCdzIGxvY2FsIHogYXhpc1xuXHQgKlxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcblx0ICovXG5cdHB1YmxpYyBtb3ZlQmFja3dhcmQoZGlzdGFuY2U6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbChWZWN0b3IzRC5aX0FYSVMsIC1kaXN0YW5jZSk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBiYWNrd2FyZHMgYWxvbmcgaXQncyBsb2NhbCB4IGF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XG5cdCAqL1xuXG5cdHB1YmxpYyBtb3ZlTGVmdChkaXN0YW5jZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZUxvY2FsKFZlY3RvcjNELlhfQVhJUywgLWRpc3RhbmNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGZvcndhcmRzIGFsb25nIGl0J3MgbG9jYWwgeCBheGlzXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBkaXN0YW5jZSAgICBUaGUgbGVuZ3RoIG9mIHRoZSBtb3ZlbWVudFxuXHQgKi9cblx0cHVibGljIG1vdmVSaWdodChkaXN0YW5jZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZUxvY2FsKFZlY3RvcjNELlhfQVhJUywgZGlzdGFuY2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgZm9yd2FyZHMgYWxvbmcgaXQncyBsb2NhbCB5IGF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XG5cdCAqL1xuXHRwdWJsaWMgbW92ZVVwKGRpc3RhbmNlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX2Rpc3BsYXlPYmplY3QudHJhbnNsYXRlTG9jYWwoVmVjdG9yM0QuWV9BWElTLCBkaXN0YW5jZSk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBiYWNrd2FyZHMgYWxvbmcgaXQncyBsb2NhbCB5IGF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XG5cdCAqL1xuXHRwdWJsaWMgbW92ZURvd24oZGlzdGFuY2U6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbChWZWN0b3IzRC5ZX0FYSVMsIC1kaXN0YW5jZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gVHJhbnNmb3JtO1xuIl19