import { Vector3D } from "../geom/Vector3D";
import { ProjectionBase } from "../projections/ProjectionBase";
export declare class OrthographicProjection extends ProjectionBase {
    private _projectionHeight;
    private _xMax;
    private _yMax;
    constructor(projectionHeight?: number);
    projectionHeight: number;
    unproject(nX: number, nY: number, sZ: number): Vector3D;
    clone(): ProjectionBase;
    pUpdateMatrix(): void;
}
