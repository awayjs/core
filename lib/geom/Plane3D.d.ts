import { Vector3D } from "../geom/Vector3D";
export declare class Plane3D {
    /**
     * The A coefficient of this plane. (Also the x dimension of the plane normal)
     */
    a: number;
    /**
     * The B coefficient of this plane. (Also the y dimension of the plane normal)
     */
    b: number;
    /**
     * The C coefficient of this plane. (Also the z dimension of the plane normal)
     */
    c: number;
    /**
     * The D coefficient of this plane. (Also the inverse dot product between normal and point)
     */
    d: number;
    _iAlignment: number;
    static ALIGN_ANY: number;
    static ALIGN_XY_AXIS: number;
    static ALIGN_YZ_AXIS: number;
    static ALIGN_XZ_AXIS: number;
    /**
     * Create a Plane3D with ABCD coefficients
     */
    constructor(a?: number, b?: number, c?: number, d?: number);
    /**
     * Fills this Plane3D with the coefficients from 3 points in 3d space.
     * @param p0 Vector3D
     * @param p1 Vector3D
     * @param p2 Vector3D
     */
    fromPoints(p0: Vector3D, p1: Vector3D, p2: Vector3D): void;
    /**
     * Fills this Plane3D with the coefficients from the plane's normal and a point in 3d space.
     * @param normal Vector3D
     * @param point  Vector3D
     */
    fromNormalAndPoint(normal: Vector3D, point: Vector3D): void;
    /**
     * Normalize this Plane3D
     * @return Plane3D This Plane3D.
     */
    normalize(): Plane3D;
    /**
     * Returns the signed distance between this Plane3D and the point p.
     * @param p Vector3D
     * @returns Number
     */
    distance(p: Vector3D): number;
    /**
     * Classify a point against this Plane3D. (in front, back or intersecting)
     * @param p Vector3D
     * @return int Plane3.FRONT or Plane3D.BACK or Plane3D.INTERSECT
     */
    classifyPoint(p: Vector3D, epsilon?: number): number;
    toString(): string;
}
