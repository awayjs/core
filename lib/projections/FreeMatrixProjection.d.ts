import { ProjectionBase } from "../projections/ProjectionBase";
export declare class FreeMatrixProjection extends ProjectionBase {
    constructor();
    near: number;
    far: number;
    iAspectRatio: number;
    clone(): ProjectionBase;
    pUpdateMatrix(): void;
}
