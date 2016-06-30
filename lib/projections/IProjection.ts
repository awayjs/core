import {Matrix3D}					from "../geom/Matrix3D";
import {Vector3D}					from "../geom/Vector3D";
import {IEventDispatcher}			from "../events/IEventDispatcher";

/**
 * IMaterialOwner provides an interface for objects that can use materials.
 *
 * @interface away.base.IMaterialOwner
 */
export interface IProjection extends IEventDispatcher
{
	coordinateSystem:string;

	frustumCorners:Array<number>

	matrix:Matrix3D;

	near:number;

	originX:number;

	originY:number;

	far:number;

	_iAspectRatio:number;

	project(point3d:Vector3D):Vector3D;

	unproject(nX:number, nY:number, sZ:number):Vector3D;

	_iUpdateScissorRect(x:number, y:number, width:number, height:number);

	_iUpdateViewport(x:number, y:number, width:number, height:number);
}