///<reference path="../../_definitions.ts"/>

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
module away.geom
{
	export class Transform
	{
		private _displayObject:away.base.DisplayObject;
		private _concatenatedColorTransform:ColorTransform;
		private _concatenatedMatrix:Matrix;
		private _pixelBounds:Rectangle;
		public _position:away.geom.Vector3D = new away.geom.Vector3D();

		/**
		 *
		 */
		public get backVector():away.geom.Vector3D
		{
			var director:away.geom.Vector3D = away.geom.Matrix3DUtils.getForward(this._displayObject._iMatrix3D);
			director.negate();

			return director;
		}

		/**
		 * A ColorTransform object containing values that universally adjust the
		 * colors in the display object.
		 * 
		 * @throws TypeError The colorTransform is null when being set
		 */
		public colorTransform:ColorTransform;
	
		/**
		 * A ColorTransform object representing the combined color transformations
		 * applied to the display object and all of its parent objects, back to the
		 * root level. If different color transformations have been applied at
		 * different levels, all of those transformations are concatenated into one
		 * ColorTransform object for this property.
		 */
		public get concatenatedColorTransform():ColorTransform
		{
			return this._concatenatedColorTransform; //TODO
		}
	
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
		public get concatenatedMatrix():Matrix
		{
			return this._concatenatedMatrix; //TODO
		}

		/**
		 *
		 */
		public get downVector():away.geom.Vector3D
		{
			var director:away.geom.Vector3D = away.geom.Matrix3DUtils.getUp(this._displayObject._iMatrix3D);
			director.negate();

			return director;
		}

		/**
		 *
		 */
		public get forwardVector():away.geom.Vector3D
		{
			return away.geom.Matrix3DUtils.getForward(this._displayObject._iMatrix3D);
		}

		/**
		 *
		 */
		public get leftVector():away.geom.Vector3D
		{
			var director:away.geom.Vector3D = away.geom.Matrix3DUtils.getRight(this._displayObject._iMatrix3D);
			director.negate();

			return director;
		}

		/**
		 * A Matrix object containing values that alter the scaling, rotation, and
		 * translation of the display object.
		 *
		 * <p>If the <code>matrix</code> property is set to a value(not
		 * <code>null</code>), the <code>matrix3D</code> property is
		 * <code>null</code>. And if the <code>matrix3D</code> property is set to a
		 * value(not <code>null</code>), the <code>matrix</code> property is
		 * <code>null</code>.</p>
		 * 
		 * @throws TypeError The matrix is null when being set
		 */
		public matrix:Matrix;
	
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
		public get matrix3D():away.geom.Matrix3D
		{
			return this._displayObject._iMatrix3D;
		}

		public set matrix3D(val:away.geom.Matrix3D)
		{
			this._displayObject._iMatrix3D = val;
		}
	
		/**
		 * Provides access to the PerspectiveProjection object of a three-dimensional
		 * display object. The PerspectiveProjection object can be used to modify the
		 * perspective transformation of the stage or to assign a perspective
		 * transformation to all the three-dimensional children of a display object.
		 *
		 * <p>Based on the field of view and aspect ratio(dimensions) of the stage,
		 * a default PerspectiveProjection object is assigned to the root object.</p>
		 */
		public perspectiveProjection:PerspectiveProjection;
	
		/**
		 * A Rectangle object that defines the bounding rectangle of the display
		 * object on the stage.
		 */
		public get pixelBounds():Rectangle
		{
			return this._pixelBounds;
		}

		/**
		 * Defines the position of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get position():away.geom.Vector3D
		{
			return this._displayObject._iMatrix3D.position
		}

		public set position(value:away.geom.Vector3D)
		{
			this._displayObject.x = value.x;
			this._displayObject.y = value.y;
			this._displayObject.z = value.z;
		}

		/**
		 *
		 */
		public get rightVector():away.geom.Vector3D
		{
			return away.geom.Matrix3DUtils.getRight(this._displayObject._iMatrix3D);
		}

		/**
		 * Defines the rotation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get rotation():away.geom.Vector3D
		{
			return new Vector3D(this._displayObject.rotationX, this._displayObject.rotationY, this._displayObject.rotationZ);
		}

		public set rotation(value:away.geom.Vector3D)
		{
			this._displayObject.rotationX = value.x;
			this._displayObject.rotationY = value.y;
			this._displayObject.rotationZ = value.z;
		}

		/**
		 * Defines the scale of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get scale():away.geom.Vector3D
		{
			return new Vector3D(this._displayObject.scaleX, this._displayObject.scaleY, this._displayObject.scaleZ);
		}

		public set scale(value:away.geom.Vector3D)
		{
			this._displayObject.scaleX = value.x;
			this._displayObject.scaleY = value.y;
			this._displayObject.scaleZ = value.z;
		}

		/**
		 *
		 */
		public get upVector():away.geom.Vector3D
		{
			return away.geom.Matrix3DUtils.getUp(this._displayObject._iMatrix3D);
		}

		constructor(displayObject:away.base.DisplayObject)
		{
			this._displayObject = displayObject;
		}
	
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
		public getRelativeMatrix3D(relativeTo:away.base.DisplayObject):Matrix3D
		{
			return new Matrix3D(); //TODO
		}


		/**
		 * Moves the 3d object forwards along it's local z axis
		 *
		 * @param    distance    The length of the movement
		 */
		public moveForward(distance:number)
		{
			this._displayObject.translateLocal(away.geom.Vector3D.Z_AXIS, distance);
		}

		/**
		 * Moves the 3d object backwards along it's local z axis
		 *
		 * @param    distance    The length of the movement
		 */
		public moveBackward(distance:number)
		{
			this._displayObject.translateLocal(away.geom.Vector3D.Z_AXIS, -distance);
		}

		/**
		 * Moves the 3d object backwards along it's local x axis
		 *
		 * @param    distance    The length of the movement
		 */

		public moveLeft(distance:number)
		{
			this._displayObject.translateLocal(away.geom.Vector3D.X_AXIS, -distance);
		}

		/**
		 * Moves the 3d object forwards along it's local x axis
		 *
		 * @param    distance    The length of the movement
		 */
		public moveRight(distance:number)
		{
			this._displayObject.translateLocal(away.geom.Vector3D.X_AXIS, distance);
		}

		/**
		 * Moves the 3d object forwards along it's local y axis
		 *
		 * @param    distance    The length of the movement
		 */
		public moveUp(distance:number)
		{
			this._displayObject.translateLocal(away.geom.Vector3D.Y_AXIS, distance);
		}

		/**
		 * Moves the 3d object backwards along it's local y axis
		 *
		 * @param    distance    The length of the movement
		 */
		public moveDown(distance:number)
		{
			this._displayObject.translateLocal(away.geom.Vector3D.Y_AXIS, -distance);
		}
	}
}
