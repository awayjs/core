import { Vector3D } from "../geom/Vector3D";
export declare class Sphere {
    /**
     *
     */
    x: number;
    /**
     *
     */
    y: number;
    /**
     *
     */
    z: number;
    /**
     *
     */
    radius: number;
    /**
     * Create a Sphere with ABCD coefficients
     */
    constructor(x?: number, y?: number, z?: number, radius?: number);
    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
    containsPoint(position: Vector3D): boolean;
    toString(): string;
}
