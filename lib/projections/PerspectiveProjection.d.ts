import { Vector3D } from "../geom/Vector3D";
import { ProjectionBase } from "../projections/ProjectionBase";
export declare class PerspectiveProjection extends ProjectionBase {
    private _fieldOfView;
    private _focalLength;
    private _hFieldOfView;
    private _hFocalLength;
    private _preserveAspectRatio;
    private _preserveFocalLength;
    constructor(fieldOfView?: number, coordinateSystem?: string);
    /**
     *
     */
    preserveAspectRatio: boolean;
    /**
     *
     */
    preserveFocalLength: boolean;
    /**
     *
     */
    fieldOfView: number;
    /**
     *
     */
    focalLength: number;
    /**
     *
     */
    hFieldOfView: number;
    /**
     *
     */
    hFocalLength: number;
    unproject(nX: number, nY: number, sZ: number): Vector3D;
    clone(): ProjectionBase;
    pUpdateMatrix(): void;
}
