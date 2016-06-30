/**
 * A Quaternion object which can be used to represent rotations.
 */
export class Orientation3D
{
	/**
	 * The axis angle orientation uses a combination of an axis and an angle to determine the orientation.
	 * @type {string}
	 */
	public static AXIS_ANGLE:string = "axisAngle";

	/**
	 * The default orientation for decompose() and recompose() methods, defines the orientation with three separate angles of rotation for each axis.
	 * @type {string}
	 */
	public static EULER_ANGLES:string = "eulerAngles";

	/**
	 * The quaternion orientation uses complex numbers.
	 * @type {string}
	 */
	public static QUATERNION:string = "quaternion";
}