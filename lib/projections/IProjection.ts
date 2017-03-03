import {Transform} from "../base/Transform";
import {Matrix3D} from "../geom/Matrix3D";
import {Plane3D} from "../geom/Plane3D";
import {Vector3D} from "../geom/Vector3D";
import {IEventDispatcher} from "../events/IEventDispatcher";

import {CoordinateSystem} from "./CoordinateSystem";

/**
 * IMaterialOwner provides an interface for objects that can use materials.
 *
 * @interface away.base.IMaterialOwner
 */
export interface IProjection extends IEventDispatcher
{
	coordinateSystem:CoordinateSystem;

	frustumCorners:Array<number>;

	frustumPlanes:Array<Plane3D>;

	frustumMatrix3D:Matrix3D;

	viewMatrix3D:Matrix3D;

	transform:Transform;

	near:number;

	originX:number;

	originY:number;

	far:number;

	aspectRatio:number;

	project(vector3D:Vector3D):Vector3D;

	unproject(nX:number, nY:number, sZ:number):Vector3D;

	setViewRect(x:number, y:number, width:number, height:number);

	setStageRect(x:number, y:number, width:number, height:number);
}