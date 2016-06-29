import { Matrix3D } from "../geom/Matrix3D";
import { Rectangle } from "../geom/Rectangle";
import { Vector3D } from "../geom/Vector3D";
import { EventDispatcher } from "../events/EventDispatcher";
import { IProjection } from "../projections/IProjection";
export declare class ProjectionBase extends EventDispatcher implements IProjection {
    _pMatrix: Matrix3D;
    _pScissorRect: Rectangle;
    _pViewPort: Rectangle;
    _pNear: number;
    _pFar: number;
    _pAspectRatio: number;
    _pMatrixInvalid: boolean;
    _pFrustumCorners: number[];
    _pCoordinateSystem: string;
    _pOriginX: number;
    _pOriginY: number;
    private _unprojection;
    private _unprojectionInvalid;
    constructor(coordinateSystem?: string);
    /**
     * The handedness of the coordinate system projection. The default is LEFT_HANDED.
     */
    coordinateSystem: string;
    frustumCorners: number[];
    matrix: Matrix3D;
    near: number;
    originX: number;
    originY: number;
    far: number;
    project(point3d: Vector3D): Vector3D;
    readonly unprojectionMatrix: Matrix3D;
    unproject(nX: number, nY: number, sZ: number): Vector3D;
    clone(): ProjectionBase;
    _iAspectRatio: number;
    pInvalidateMatrix(): void;
    pUpdateMatrix(): void;
    _iUpdateScissorRect(x: number, y: number, width: number, height: number): void;
    _iUpdateViewport(x: number, y: number, width: number, height: number): void;
}
