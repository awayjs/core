import { EventBase } from "../events/EventBase";
import { IProjection } from "../projections/IProjection";
export declare class ProjectionEvent extends EventBase {
    static MATRIX_CHANGED: string;
    private _projection;
    constructor(type: string, projection: IProjection);
    readonly projection: IProjection;
}
