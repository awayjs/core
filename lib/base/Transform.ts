import { EventDispatcher } from '../events/EventDispatcher';
import { TransformEvent } from '../events/TransformEvent';

import { Matrix } from '../geom/Matrix';
import { Matrix3D } from '../geom/Matrix3D';
import { Rectangle } from '../geom/Rectangle';
import { Vector3D } from '../geom/Vector3D';

import { ColorTransform } from './ColorTransform';

/**
 * The Transform class provides access to color adjustment properties and two-
 * or three-dimensional transformation objects that can be applied to a display
 * object. During the transformation, the color or the orientation and position
 * of a display object is adjusted(offset) from the current values or
 * coordinates to new values or coordinates. The Transform class also collects
 * data about color and two-dimensional matrix transformations that are applied
 * to a display object and all of its parent objects. You can access these
 * combined transformations through the `concatenatedColorTransform` and
 * `concatenatedMatrix` properties.
 *
 * To apply color transformations: create a ColorTransform object, set the color
 * adjustments using the object's methods and properties, and then assign the
 * `colorTransformation` property of the `transform` property of the display
 * object to the new ColorTransformation object.
 *
 * To apply two-dimensional transformations: create a Matrix object, set the
 * matrix's two-dimensional transformation, and then assign the
 * `transform.matrix` property of the display object to the new Matrix object.
 *
 * To apply three-dimensional transformations: start with a three-dimensional
 * display object. A three-dimensional display object has a `z` property value
 * other than zero. You do not need to create the Matrix3D object. For all
 * three-dimensional objects, a Matrix3D object is created automatically when
 * you assign a `z` value to a display object. You can access the display
 * object's Matrix3D object through the display object's `transform` property.
 * Using the methods of the Matrix3D class, you can add to or modify the
 * existing transformation settings. Also, you can create a custom Matrix3D
 * object, set the custom Matrix3D object's transformation elements, and then
 * assign the new Matrix3D object to the display object using the
 * `transform.matrix` property.
 *
 * To modify a perspective projection of the stage or root object: use the
 * `transform.matrix` property of the root display object to gain access to the
 * PerspectiveProjection object. Or, apply different perspective projection
 * properties to a display object by setting the perspective projection
 * properties of the display object's parent. The child display object inherits
 * the new properties. Specifically, create a PerspectiveProjection object and
 * set its properties, then assign the PerspectiveProjection object to the
 * `perspectiveProjection` property of the parent display object's `transform`
 * property. The specified projection transformation then applies to all the
 * display object's three-dimensional children.
 *
 * Since both PerspectiveProjection and Matrix3D objects perform perspective
 * transformations, do not assign both to a display object at the same time. Use
 * the PerspectiveProjection object for focal length and projection center
 * changes. For more control over the perspective transformation, create a
 * perspective projection Matrix3D object.
 */
export class Transform extends EventDispatcher {
	private _backVector: Vector3D;
	private _colorTransform: ColorTransform;
	private _components: Array<Vector3D>;
	private _componentsDirty: boolean;
	private _downVector: Vector3D;
	private _forwardVector: Vector3D;
	private _invalidateColorTransform: TransformEvent;
	private _invalidateMatrix3D: TransformEvent;
	private _inverseMatrix3D: Matrix3D = new Matrix3D();
	private _inverseMatrix3DDirty: boolean;
	private _leftVector: Vector3D;
	private _matrix: Matrix=null;
	private _matrix3D: Matrix3D;
	private _matrix3DDirty: boolean;
	private _pixelBounds: Rectangle;
	private _rawData: Float32Array;
	private _rightVector: Vector3D;
	private _rotation: Vector3D = new Vector3D();
	private _scale: Vector3D = new Vector3D(1, 1, 1);
	private _skew: Vector3D = new Vector3D();
	//temp vector used in global to local
	private _upVector: Vector3D;

	/**
	 *
	 */
	public get backVector(): Vector3D {
		if (!this._backVector)
			this._backVector = new Vector3D();

		this._matrix3D.copyColumnTo(2, this._backVector, true);

		return this._backVector;
	}

	/**
	 * A ColorTransform object containing values that universally adjust the
	 * colors in the display object.
	 *
	 * @throws TypeError The colorTransform is null when being set
	 */
	public get colorTransform(): ColorTransform {
		return this._colorTransform;
	}

	public set colorTransform(val: ColorTransform) {
		if (val) {
			const sourceData: Float32Array = val._rawData, targetData: Float32Array = this._colorTransform._rawData;

			targetData[0] = sourceData[0];
			targetData[1] = sourceData[1];
			targetData[2] = sourceData[2];
			targetData[3] = sourceData[3];
			targetData[4] = sourceData[4];
			targetData[5] = sourceData[5];
			targetData[6] = sourceData[6];
			targetData[7] = sourceData[7];
		} else {
			this._colorTransform.clear();
		}

		this.invalidateColorTransform();
	}

	/**
	 *
	 */
	public get inverseMatrix3D(): Matrix3D {
		if (this._inverseMatrix3DDirty) {
			this._inverseMatrix3DDirty = false;
			this._inverseMatrix3D.copyFrom(this.matrix3D);
			this._inverseMatrix3D.invert();
		}

		return this._inverseMatrix3D;
	}

	/**
	 *
	 */
	public get downVector(): Vector3D {
		if (!this._downVector)
			this._downVector = new Vector3D();

		this._matrix3D.copyColumnTo(1, this._downVector, true);

		return this._downVector;
	}

	/**
	 *
	 */
	public get forwardVector(): Vector3D {
		if (!this._forwardVector)
			this._forwardVector = new Vector3D();

		this._matrix3D.copyColumnTo(2, this._forwardVector);

		return this._forwardVector;
	}

	/**
	 *
	 */
	public get leftVector(): Vector3D {
		if (!this._leftVector)
			this._leftVector = new Vector3D();

		this._matrix3D.copyColumnTo(0, this._backVector, true);

		return this._leftVector;
	}

	/**
	 * A Matrix object containing values that alter the scaling, rotation, and
	 * translation of the display object. If the `matrix` property is set to a
	 * value (not `null`), the `matrix3D` property is `null`. And if the
	 * `matrix3D` property is set to a value(not `null`), the `matrix` property
	 * is `null`.
	 *
	 * @throws TypeError The matrix is null when being set
	 */
	public get matrix(): Matrix {
		// console.warn("deprecated! matrix3D cannot  be converted to 2D matrix, get matrix3D instead");
		// return null;

		if (!this._matrix) {
			this._matrix = new Matrix();
		}

		if (this._matrix3DDirty)
			this.updateMatrix3D();

		this._matrix.a = this._matrix3D._rawData[0];
		this._matrix.b = this._matrix3D._rawData[1];
		this._matrix.c = this._matrix3D._rawData[4];
		this._matrix.d = this._matrix3D._rawData[5];
		this._matrix.tx = this._matrix3D._rawData[12];
		this._matrix.ty = this._matrix3D._rawData[13];

		return this._matrix;
	}

	public set matrix(value: Matrix) {
		if (!value) {
			return;
		}

		// console.warn("deprecated. 2d matrix can`n convert to 3D matrix, set matrix3D instead");
		// this._matrix = value;
		this._matrix3D.identity();

		this._matrix3D._rawData[0] = value.a;
		this._matrix3D._rawData[1] = value.b;
		this._matrix3D._rawData[4] = value.c;
		this._matrix3D._rawData[5] = value.d;
		this._matrix3D._rawData[12] = value.tx;
		this._matrix3D._rawData[13] = value.ty;

		this.invalidateComponents();

		this._matrix3DDirty = false;
		this._inverseMatrix3DDirty = true;
	}

	/**
	 * Provides access to the Matrix3D object of a three-dimensional display
	 * object. The Matrix3D object represents a transformation matrix that
	 * determines the display object's position and orientation. A Matrix3D
	 * object can also perform perspective projection.
	 *
	 * If the `matrix` property is set to a value(not `null`), the `matrix3D`
	 * property is `null`. And if the `matrix3D` property is set to a value(not
	 * `null`), the `matrix` property is `null`.
	 */
	public get matrix3D(): Matrix3D {
		if (this._matrix3DDirty)
			this.updateMatrix3D();

		return this._matrix3D;
	}

	public set matrix3D(val: Matrix3D) {
		if (!val) {
			this._matrix3D.identity();
		} else {

			const sourceData = val._rawData;
			const targetData = this._matrix3D._rawData;

			targetData[0] = sourceData[0];
			targetData[1] = sourceData[1];
			targetData[2] = sourceData[2];
			targetData[3] = sourceData[3];
			targetData[4] = sourceData[4];
			targetData[5] = sourceData[5];
			targetData[6] = sourceData[6];
			targetData[7] = sourceData[7];
			targetData[8] = sourceData[8];
			targetData[9] = sourceData[9];
			targetData[10] = sourceData[10];
			targetData[11] = sourceData[11];
			targetData[12] = sourceData[12];
			targetData[13] = sourceData[13];
			targetData[14] = sourceData[14];
			targetData[15] = sourceData[15];
		}

		this.invalidateComponents();
		this._matrix3DDirty = false;
		this._inverseMatrix3DDirty = true;
	}

	/**
	 * A Rectangle object that defines the bounding rectangle of the display
	 * object on the stage.
	 */
	public get pixelBounds(): Rectangle {
		return this._pixelBounds;
	}

	/**
	 * Defines the position of the 3d object, relative to the local coordinates
	 * of the parent `ObjectContainer3D`.
	 */
	public get position(): Vector3D {
		return this._matrix3D.position;
	}

	/**
	 *
	 */
	public get rightVector(): Vector3D {
		if (!this._rightVector)
			this._rightVector = new Vector3D();

		this._matrix3D.copyColumnTo(0, this._rightVector);

		return this._rightVector;
	}

	/**
	 * Defines the rotation of the 3d object, relative to the local coordinates
	 * of the parent `ObjectContainer3D` .
	 */
	public get rotation(): Vector3D {
		if (this._componentsDirty)
			this._updateComponents();

		return this._rotation;
	}

	/**
	 * Defines the scale of the 3d object, relative to the local coordinates of
	 * the parent `ObjectContainer3D` .
	 */
	public get scale(): Vector3D {
		if (this._componentsDirty)
			this._updateComponents();

		return this._scale;
	}

	/**
	 * Defines the scale of the 3d object, relative to the local coordinates of
	 * the parent `ObjectContainer3D` .
	 */
	public get skew(): Vector3D {
		if (this._componentsDirty)
			this._updateComponents();

		return this._skew;
	}

	/**
	 *
	 */
	public get upVector(): Vector3D {
		if (!this._upVector)
			this._upVector = new Vector3D();

		this._matrix3D.copyColumnTo(1, this._upVector);

		return this._upVector;
	}

	constructor(rawData: Float32Array = null) {
		super();

		this._rawData = rawData || new Float32Array(24);

		//create the view for matrix3D
		this._matrix3D = new Matrix3D(new Float32Array(this._rawData.buffer, 0, 16));

		//create the view for colorTransform
		this._colorTransform = new ColorTransform(new Float32Array(this._rawData.buffer, 64, 8));

		if (rawData == null) {
			this._matrix3D.identity();
			this._colorTransform.clear();
		}

		// Cached vector of transformation components used when
		// recomposing the transform matrix in updateTransform()
		this._components = new Array<Vector3D>(4);

		this._components[1] = this._rotation;
		this._components[2] = this._skew;
		this._components[3] = this._scale;

		this.invalidateComponents();
	}

	/**
	 *
	 * @param value
	 */
	public append(value: Matrix3D) {
		console.log(`append(${value}) is not implemented yet in core/Transform`);
	}

	/**
	 *
	 */
	public clearColorTransform(): void {
		if (!this._colorTransform)
			return;

		this._colorTransform.clear();
		this.invalidateColorTransform();
	}

	/**
	 *
	 */
	public clearMatrix3D(): void {
		this._matrix3D.identity();
		this.invalidateComponents();
	}

	/**
	 *
	 */
	public clone(): Transform {
		const transform: Transform = new Transform();

		this.copyRawDataTo(transform);

		return transform;
	}

	/**
	 *
	 * @param transform
	 */
	public copyRawDataTo(transform: Transform) {
		if (this._matrix3DDirty)
			this.updateMatrix3D();

		const targetData = transform._rawData;
		const sourceData = this._rawData;

		//Matrix3D data
		targetData[0] = sourceData[0];
		targetData[1] = sourceData[1];
		targetData[2] = sourceData[2];
		targetData[3] = sourceData[3];
		targetData[4] = sourceData[4];
		targetData[5] = sourceData[5];
		targetData[6] = sourceData[6];
		targetData[7] = sourceData[7];
		targetData[8] = sourceData[8];
		targetData[9] = sourceData[9];
		targetData[10] = sourceData[10];
		targetData[11] = sourceData[11];
		targetData[12] = sourceData[12];
		targetData[13] = sourceData[13];
		targetData[14] = sourceData[14];
		targetData[15] = sourceData[15];

		//ColorTransform data
		targetData[16] = sourceData[16];
		targetData[17] = sourceData[17];
		targetData[18] = sourceData[18];
		targetData[19] = sourceData[19];
		targetData[20] = sourceData[20];
		targetData[21] = sourceData[21];
		targetData[22] = sourceData[22];
		targetData[23] = sourceData[23];

		this.invalidateComponents();

		this.invalidateColorTransform();
	}

	/**
	 *
	 */
	public dispose(): void {

	}

	public invalidateColorTransform(): void {
		if (!this._invalidateColorTransform) {
			this._invalidateColorTransform = new TransformEvent(TransformEvent.INVALIDATE_COLOR_TRANSFORM, this);
		}

		this.dispatchEvent(this._invalidateColorTransform);
	}

	public invalidateComponents(): void {
		this.invalidatePosition();

		this._componentsDirty = true;
	}

	/**
	 * Invalidates the 3D transformation matrix, causing it to be updated upon the next request
	 *
	 * @private
	 */
	public invalidateMatrix3D(): void {
		this._inverseMatrix3DDirty = true;
		if (this._matrix3DDirty)
			return;

		this._matrix3DDirty = true;

		if (!this._invalidateMatrix3D)
			this._invalidateMatrix3D = new TransformEvent(TransformEvent.INVALIDATE_MATRIX3D, this);

		this.dispatchEvent(this._invalidateMatrix3D);
	}

	/**
	 *
	 */
	public invalidatePosition(): void {
		this._inverseMatrix3DDirty = true;
		this._matrix3D.invalidatePosition();

		if (!this._invalidateMatrix3D)
			this._invalidateMatrix3D = new TransformEvent(TransformEvent.INVALIDATE_MATRIX3D, this);

		this.dispatchEvent(this._invalidateMatrix3D);
	}

	/**
     * Rotates the 3d object around to face a point defined relative to the
     * local coordinates of the parent `ObjectContainer3D` .
     *
     * @param target The vector defining the point to be looked at.
     * @param upAxis An optional vector used to define the desired up
     *               orientation of the 3d object after rotation has occurred.
     */
	public lookAt(position: Vector3D, upAxis: Vector3D = null): void {
		if (upAxis == null)
			upAxis = Vector3D.Y_AXIS;

		const vec: Vector3D = Matrix3D.getPointAtMatrix(
			new Vector3D(), position.subtract(this._matrix3D.position), upAxis, Matrix3D.CALCULATION_MATRIX)
			.decompose()[1];

		this.rotateTo(vec.x, vec.y, vec.z);
	}

	/**
	 * Moves the 3d object backwards along it's local z axis
	 *
	 * @param    distance    The length of the movement
	 */
	public moveBackward(distance: number): void {
		this.translateLocal(Vector3D.Z_AXIS, -distance);
	}

	/**
	 * Moves the 3d object backwards along it's local y axis
	 *
	 * @param    distance    The length of the movement
	 */
	public moveDown(distance: number): void {
		this.translateLocal(Vector3D.Y_AXIS, -distance);
	}

	/**
	 * Moves the 3d object forwards along it's local z axis
	 *
	 * @param    distance    The length of the movement
	 */
	public moveForward(distance: number): void {
		this.translateLocal(Vector3D.Z_AXIS, distance);
	}

	/**
	 * Moves the 3d object backwards along it's local x axis
	 *
	 * @param    distance    The length of the movement
	 */

	public moveLeft(distance: number): void {
		this.translateLocal(Vector3D.X_AXIS, -distance);
	}

	/**
	 * Moves the 3d object forwards along it's local x axis
	 *
	 * @param    distance    The length of the movement
	 */
	public moveRight(distance: number): void {
		this.translateLocal(Vector3D.X_AXIS, distance);
	}

	/**
	 * Moves the 3d object directly to a point in space
	 *
	 * @param    dx        The amount of movement along the local x axis.
	 * @param    dy        The amount of movement along the local y axis.
	 * @param    dz        The amount of movement along the local z axis.
	 */

	public moveTo(dx: number, dy: number, dz: number): void {
		this._matrix3D._rawData[12] = dx;
		this._matrix3D._rawData[13] = dy;
		this._matrix3D._rawData[14] = dz;

		this.invalidatePosition();
	}

	/**
	 * Moves the 3d object forwards along it's local y axis
	 *
	 * @param    distance    The length of the movement
	 */
	public moveUp(distance: number): void {
		this.translateLocal(Vector3D.Y_AXIS, distance);
	}

	/**
	 * Rotates the 3d object around it's local x-axis
	 *
	 * @param    angle        The amount of rotation in degrees
	 */
	public pitch(angle: number): void {
		this.rotate(Vector3D.X_AXIS, angle);
	}

	/**
	 * Rotates the 3d object around it's local z-axis
	 *
	 * @param    angle        The amount of rotation in degrees
	 */
	public roll(angle: number): void {
		this.rotate(Vector3D.Z_AXIS, angle);
	}

	/**
	 * Rotates the 3d object around an axis by a defined angle
	 *
	 * @param    axis        The vector defining the axis of rotation
	 * @param    angle        The amount of rotation in degrees
	 */
	public rotate(axis: Vector3D, angle: number): void {
		this.matrix3D.prependRotation(angle, axis);

		this.invalidateComponents();
	}

	/**
	 * Rotates the 3d object directly to a euler angle
	 *
	 * @param ax The angle in degrees of the rotation around the x axis.
	 * @param ay The angle in degrees of the rotation around the y axis.
	 * @param az The angle in degrees of the rotation around the z axis.
	 */
	public rotateTo(ax: number, ay: number, az: number): void {
		if (this._componentsDirty)
			this._updateComponents();

		this._rotation.x = ax;
		this._rotation.y = ay;
		this._rotation.z = az;

		this.invalidateMatrix3D();
	}

	/**
	 *
	 * @param sx
	 * @param sy
	 * @param sz
	 */
	public scaleTo(sx: number, sy: number, sz: number): void {
		if (this._componentsDirty)
			this._updateComponents();

		this._scale.x = sx;
		this._scale.y = sy;
		this._scale.z = sz;

		this.invalidateMatrix3D();
	}

	/**
	 *
	 * @param sx
	 * @param sy
	 * @param sz
	 */
	public skewTo(sx: number, sy: number, sz: number): void {
		if (this._componentsDirty)
			this._updateComponents();

		this._skew.x = sx;
		this._skew.y = sy;
		this._skew.z = sz;

		this.invalidateMatrix3D();
	}

	/**
	 * Moves the 3d object along a vector by a defined length.
	 *
	 * @param axis     The vector defining the axis of movement.
	 * @param distance The length of the movement.
	 */
	public translate(axis: Vector3D, distance: number): void {
		const x: number = axis.x, y: number = axis.y, z: number = axis.z;
		const len: number = distance / Math.sqrt(x * x + y * y + z * z);

		this.matrix3D.appendTranslation(x * len, y * len, z * len);

		this.invalidatePosition();
	}

	/**
	 * Moves the 3d object along a vector by a defined length.
	 *
	 * @param axis     The vector defining the axis of movement.
	 * @param distance The length of the movement.
	 */
	public translateLocal(axis: Vector3D, distance: number): void {
		const x: number = axis.x, y: number = axis.y, z: number = axis.z;
		const len: number = distance / Math.sqrt(x * x + y * y + z * z);

		this.matrix3D.prependTranslation(x * len, y * len, z * len);

		this.invalidatePosition();
	}

	/**
	 *
	 */
	public updateMatrix3D(): void {
		this._matrix3D.recompose(this._components);

		this._matrix3DDirty = false;
	}

	/**
	 * Rotates the 3d object around it's local y-axis
	 *
	 * @param angle The amount of rotation in degrees
	 */
	public yaw(angle: number): void {
		this.rotate(Vector3D.Y_AXIS, angle);
	}

	private _updateComponents(): void {
		const elements: Array<Vector3D> = this._matrix3D.decompose();
		let vec: Vector3D;

		vec = elements[1];

		this._rotation.x = vec.x;
		this._rotation.y = vec.y;
		this._rotation.z = vec.z;

		vec = elements[2];

		this._skew.x = vec.x;
		this._skew.y = vec.y;
		this._skew.z = vec.z;

		vec = elements[3];

		this._scale.x = vec.x;
		this._scale.y = vec.y;
		this._scale.z = vec.z;

		this._componentsDirty = false;
	}
}
