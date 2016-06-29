import { Vector3D } from "../geom/Vector3D";
import { ProjectionBase } from "../projections/ProjectionBase";
export declare class OrthographicOffCenterProjection extends ProjectionBase {
    private _minX;
    private _maxX;
    private _minY;
    private _maxY;
    constructor(minX: number, maxX: number, minY: number, maxY: number);
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    unproject(nX: number, nY: number, sZ: number): Vector3D;
    clone(): ProjectionBase;
    pUpdateMatrix(): void;
}
