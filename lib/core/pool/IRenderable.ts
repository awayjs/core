import IMaterialOwner				= require("awayjs-core/lib/core/base/IMaterialOwner");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * IRenderable is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.IRenderable
 */
interface IRenderable
{
	/**
	 *
	 */
	next:IRenderable;


	/**
	 *
	 */
	materialId:number;

	/**
	 *
	 */
	materialOwner:IMaterialOwner;

	/**
	 *
	 */
	sourceEntity:IEntity;

	/**
	 *
	 */
	renderOrderId:number;

	/**
	 *
	 */
	zIndex:number;

	/**
	 *
	 */
	dispose();

	/**
	 *
	 */
	invalidateGeometry();

	/**
	 *
	 */
	invalidateIndexData();

	/**
	 *
	 */
	invalidateVertexData(dataType:string);
}

export = IRenderable;