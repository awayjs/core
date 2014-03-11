///<reference path="../_definitions.ts"/>

/**
 * @module away.base
 */
module away.projections
{
	/**
	 * IMaterialOwner provides an interface for objects that can use materials.
	 *
	 * @interface away.base.IMaterialOwner
	 */
	export interface IProjection extends away.events.IEventDispatcher
	{

		coordinateSystem:string;

		frustumCorners:Array<number>

		matrix:away.geom.Matrix3D;

		near:number;

		far:number;

		_iAspectRatio:number;

		project(point3d:away.geom.Vector3D):away.geom.Vector3D;

		unproject(nX:number, nY:number, sZ:number):away.geom.Vector3D;

		_iUpdateScissorRect(x:number, y:number, width:number, height:number);

		_iUpdateViewport(x:number, y:number, width:number, height:number);
	}
}