import { Plane3D } from "../geom/Plane3D";
import { IProjection } from "../projections/IProjection";
import { ProjectionBase } from "../projections/ProjectionBase";
export declare class ObliqueNearPlaneProjection extends ProjectionBase {
    private _baseProjection;
    private _plane;
    private _onProjectionMatrixChangedDelegate;
    constructor(baseProjection: IProjection, plane: Plane3D);
    readonly frustumCorners: number[];
    near: number;
    far: number;
    iAspectRatio: number;
    plane: Plane3D;
    baseProjection: IProjection;
    private onProjectionMatrixChanged(event);
    pUpdateMatrix(): void;
}
