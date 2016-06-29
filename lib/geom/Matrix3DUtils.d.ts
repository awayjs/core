import { Quaternion } from "../geom/Quaternion";
import { Matrix3D } from "../geom/Matrix3D";
import { Plane3D } from "../geom/Plane3D";
import { Vector3D } from "../geom/Vector3D";
/**
 * away.geom.Matrix3DUtils provides additional Matrix3D functions.
 */
export declare class Matrix3DUtils {
    /**
     * A reference to a Vector to be used as a temporary raw data container, to prevent object creation.
     */
    static RAW_DATA_CONTAINER: Float32Array;
    static CALCULATION_MATRIX: Matrix3D;
    /**
     * Fills the 3d matrix object with values representing the transformation made by the given quaternion.
     *
     * @param    quarternion    The quarterion object to convert.
     */
    static quaternion2matrix(quarternion: Quaternion, m?: Matrix3D): Matrix3D;
    /**
     * Returns a normalised <code>Vector3D</code> object representing the forward vector of the given matrix.
     * @param    m        The Matrix3D object to use to get the forward vector
     * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
     * @return            The forward vector
     */
    static getForward(m: Matrix3D, v?: Vector3D): Vector3D;
    /**
     * Returns a normalised <code>Vector3D</code> object representing the up vector of the given matrix.
     * @param    m        The Matrix3D object to use to get the up vector
     * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
     * @return            The up vector
     */
    static getUp(m: Matrix3D, v?: Vector3D): Vector3D;
    /**
     * Returns a normalised <code>Vector3D</code> object representing the right vector of the given matrix.
     * @param    m        The Matrix3D object to use to get the right vector
     * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
     * @return            The right vector
     */
    static getRight(m: Matrix3D, v?: Vector3D): Vector3D;
    /**
     * Returns a boolean value representing whether there is any significant difference between the two given 3d matrices.
     */
    static compare(m1: Matrix3D, m2: Matrix3D): boolean;
    static lookAt(matrix: Matrix3D, pos: Vector3D, dir: Vector3D, up: Vector3D): void;
    static reflection(plane: Plane3D, target?: Matrix3D): Matrix3D;
    static transformVector(matrix: Matrix3D, vector: Vector3D, result?: Vector3D): Vector3D;
    static deltaTransformVector(matrix: Matrix3D, vector: Vector3D, result?: Vector3D): Vector3D;
    static getTranslation(transform: Matrix3D, result?: Vector3D): Vector3D;
    static deltaTransformVectors(matrix: Matrix3D, vin: Array<number>, vout: Array<number>): void;
}
