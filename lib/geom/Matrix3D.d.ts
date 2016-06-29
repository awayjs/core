import { Box } from "../geom/Box";
import { Vector3D } from "../geom/Vector3D";
export declare class Matrix3D {
    /**
     * A Vector of 16 Numbers, where every four elements is a column of a 4x4 matrix.
     *
     * <p>An exception is thrown if the rawData property is set to a matrix that is not invertible. The Matrix3D
     * object must be invertible. If a non-invertible matrix is needed, create a subexport class of the Matrix3D object.</p>
     */
    rawData: Float32Array;
    private static tempMatrix;
    private static tempRawData;
    private _position;
    private _positionDirty;
    private _components;
    /**
     * Creates a Matrix3D object.
     */
    constructor(v?: Float32Array);
    /**
     * Appends the matrix by multiplying another Matrix3D object by the current Matrix3D object.
     */
    append(lhs: Matrix3D): void;
    /**
     * Appends an incremental rotation to a Matrix3D object.
     */
    appendRotation(degrees: number, axis: Vector3D): void;
    /**
     * Appends an incremental skew change along the x, y, and z axes to a Matrix3D object.
     */
    appendSkew(xSkew: number, ySkew: number, zSkew: number): void;
    /**
     * Appends an incremental scale change along the x, y, and z axes to a Matrix3D object.
     */
    appendScale(xScale: number, yScale: number, zScale: number): void;
    /**
     * Appends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
     */
    appendTranslation(x: number, y: number, z: number): void;
    /**
     * Returns a new Matrix3D object that is an exact copy of the current Matrix3D object.
     */
    clone(): Matrix3D;
    /**
     * Copies a Vector3D object into specific column of the calling Matrix3D object.
     */
    copyColumnFrom(column: number, vector3D: Vector3D): void;
    /**
     * Copies specific column of the calling Matrix3D object into the Vector3D object.
     */
    copyColumnTo(column: number, vector3D: Vector3D): void;
    /**
     * Copies all of the matrix data from the source Matrix3D object into the calling Matrix3D object.
     */
    copyFrom(source: Matrix3D): void;
    /**
     * Copies this Matrix3D object into a destination Matrix3D object.
     */
    copyTo(target: Matrix3D): void;
    copyRawDataFrom(vector: Float32Array, index?: number, transpose?: boolean): void;
    copyRawDataTo(vector: Float32Array, index?: number, transpose?: boolean): void;
    /**
     * Copies a Vector3D object into specific row of the calling Matrix3D object.
     */
    copyRowFrom(row: number, vector3D: Vector3D): void;
    /**
     * Copies specific row of the calling Matrix3D object into the Vector3D object.
     */
    copyRowTo(row: number, vector3D: Vector3D): void;
    /**
     * Returns the transformation matrix's translation, rotation, and scale settings as a Vector of three Vector3D objects.
     */
    decompose(orientationStyle?: string): Vector3D[];
    /**
     * Uses the transformation matrix without its translation elements to transform a Vector3D object from one space
     * coordinate to another.
     */
    deltaTransformVector(v: Vector3D, t?: Vector3D): Vector3D;
    /**
     * Converts the current matrix to an identity or unit matrix.
     */
    identity(): void;
    /**
     * [static] Interpolates the translation, rotation, and scale transformation of one matrix toward those of the target matrix.
     */
    static interpolate(thisMat: Matrix3D, toMat: Matrix3D, percent: number): Matrix3D;
    /**
     * Interpolates this matrix towards the translation, rotation, and scale transformations of the target matrix.
     */
    interpolateTo(toMat: Matrix3D, percent: number): void;
    /**
     * Inverts the current matrix.
     */
    invert(): boolean;
    /**
     * Prepends a matrix by multiplying the current Matrix3D object by another Matrix3D object.
     */
    prepend(rhs: Matrix3D): void;
    /**
     * Prepends an incremental rotation to a Matrix3D object.
     */
    prependRotation(degrees: number, axis: Vector3D): void;
    /**
     * Prepends an incremental scale change along the x, y, and z axes to a Matrix3D object.
     */
    prependScale(xScale: number, yScale: number, zScale: number): void;
    /**
     * Prepends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object.
     */
    prependTranslation(x: number, y: number, z: number): void;
    /**
     * Sets the transformation matrix's translation, rotation, and scale settings.
     */
    recompose(components: Vector3D[]): boolean;
    transformVector(v: Vector3D, t?: Vector3D): Vector3D;
    transformBox(b: Box, t?: Box): Box;
    /**
     * Uses the transformation matrix to transform a Vector of Numbers from one coordinate space to another.
     */
    transformVectors(vin: number[], vout: number[]): void;
    /**
     * Converts the current Matrix3D object to a matrix where the rows and columns are swapped.
     */
    transpose(): void;
    static getAxisRotation(x: number, y: number, z: number, degrees: number): Matrix3D;
    /**
     * [read-only] A Number that determines whether a matrix is invertible.
     */
    readonly determinant: number;
    /**
     * A Vector3D object that holds the position, the 3D coordinate (x,y,z) of a display object within the
     * transformation's frame of reference.
     */
    readonly position: Vector3D;
    invalidatePosition(): void;
    toFixed(decimalPlace: number): string;
    toString(): string;
}
