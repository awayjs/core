/**
 * A Quaternion object which can be used to represent rotations.
 */
export declare class Orientation3D {
    /**
     * The axis angle orientation uses a combination of an axis and an angle to determine the orientation.
     * @type {string}
     */
    static AXIS_ANGLE: string;
    /**
     * The default orientation for decompose() and recompose() methods, defines the orientation with three separate angles of rotation for each axis.
     * @type {string}
     */
    static EULER_ANGLES: string;
    /**
     * The quaternion orientation uses complex numbers.
     * @type {string}
     */
    static QUATERNION: string;
}
