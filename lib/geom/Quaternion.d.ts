import { Matrix3D } from "../geom/Matrix3D";
import { Vector3D } from "../geom/Vector3D";
/**
 * A Quaternion object which can be used to represent rotations.
 */
export declare class Quaternion {
    /**
     * The x value of the quaternion.
     */
    x: number;
    /**
     * The y value of the quaternion.
     */
    y: number;
    /**
     * The z value of the quaternion.
     */
    z: number;
    /**
     * The w value of the quaternion.
     */
    w: number;
    /**
     * Creates a new Quaternion object.
     * @param x The x value of the quaternion.
     * @param y The y value of the quaternion.
     * @param z The z value of the quaternion.
     * @param w The w value of the quaternion.
     */
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
     * Returns the magnitude of the quaternion object.
     */
    readonly magnitude: number;
    /**
     * Fills the quaternion object with the result from a multiplication of two quaternion objects.
     *
     * @param    qa    The first quaternion in the multiplication.
     * @param    qb    The second quaternion in the multiplication.
     */
    multiply(qa: Quaternion, qb: Quaternion): void;
    multiplyVector(vector: Vector3D, target?: Quaternion): Quaternion;
    /**
     * Fills the quaternion object with values representing the given rotation around a vector.
     *
     * @param    axis    The axis around which to rotate
     * @param    angle    The angle in radians of the rotation.
     */
    fromAxisAngle(axis: Vector3D, angle: number): void;
    /**
     * Spherically interpolates between two quaternions, providing an interpolation between rotations with constant angle change rate.
     * @param qa The first quaternion to interpolate.
     * @param qb The second quaternion to interpolate.
     * @param t The interpolation weight, a value between 0 and 1.
     */
    slerp(qa: Quaternion, qb: Quaternion, t: number): void;
    /**
     * Linearly interpolates between two quaternions.
     * @param qa The first quaternion to interpolate.
     * @param qb The second quaternion to interpolate.
     * @param t The interpolation weight, a value between 0 and 1.
     */
    lerp(qa: Quaternion, qb: Quaternion, t: number): void;
    /**
     * Fills the quaternion object with values representing the given euler rotation.
     *
     * @param    ax        The angle in radians of the rotation around the ax axis.
     * @param    ay        The angle in radians of the rotation around the ay axis.
     * @param    az        The angle in radians of the rotation around the az axis.
     */
    fromEulerAngles(ax: number, ay: number, az: number): void;
    /**
     * Fills a target Vector3D object with the Euler angles that form the rotation represented by this quaternion.
     * @param target An optional Vector3D object to contain the Euler angles. If not provided, a new object is created.
     * @return The Vector3D containing the Euler angles.
     */
    toEulerAngles(target?: Vector3D): Vector3D;
    /**
     * Normalises the quaternion object.
     */
    normalize(val?: number): void;
    /**
     * Used to trace the values of a quaternion.
     *
     * @return A string representation of the quaternion object.
     */
    toString(): string;
    /**
     * Converts the quaternion to a Matrix3D object representing an equivalent rotation.
     * @param target An optional Matrix3D container to store the transformation in. If not provided, a new object is created.
     * @return A Matrix3D object representing an equivalent rotation.
     */
    toMatrix3D(target?: Matrix3D): Matrix3D;
    /**
     * Extracts a quaternion rotation matrix out of a given Matrix3D object.
     * @param matrix The Matrix3D out of which the rotation will be extracted.
     */
    fromMatrix(matrix: Matrix3D): void;
    /**
     * Converts the quaternion to a Vector.&lt;Number&gt; matrix representation of a rotation equivalent to this quaternion.
     * @param target The Vector.&lt;Number&gt; to contain the raw matrix data.
     * @param exclude4thRow If true, the last row will be omitted, and a 4x3 matrix will be generated instead of a 4x4.
     */
    toRawData(target: number[], exclude4thRow?: boolean): void;
    /**
     * Clones the quaternion.
     * @return An exact duplicate of the current Quaternion.
     */
    clone(): Quaternion;
    /**
     * Rotates a point.
     * @param vector The Vector3D object to be rotated.
     * @param target An optional Vector3D object that will contain the rotated coordinates. If not provided, a new object will be created.
     * @return A Vector3D object containing the rotated point.
     */
    rotatePoint(vector: Vector3D, target?: Vector3D): Vector3D;
    /**
     * Copies the data from a quaternion into this instance.
     * @param q The quaternion to copy from.
     */
    copyFrom(q: Quaternion): void;
}
