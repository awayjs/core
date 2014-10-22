import Scene						= require("awayjs-core/lib/containers/Scene");
import NodeBase						= require("awayjs-core/lib/core/partition/NodeBase");
import DirectionalLight				= require("awayjs-core/lib/entities/DirectionalLight");
import Camera						= require("awayjs-core/lib/entities/Camera");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * @class away.traverse.ICollector
 */
interface ICollector
{
	/**
	 *
	 */
	camera:Camera;

	/**
	 *
	 */
	scene:Scene;

	/**
	 *
	 */
	numEntities:number;

	/**
	 *
	 */
	numInteractiveEntities:number;

	/**
	 *
	 */
	clear();

	/**
	 *
	 */
	entityHead;

	/**
	 *
	 * @param node
	 */
	enterNode(node:NodeBase):boolean;

	/**
	 *
	 * @param entity
	 */
	applyDirectionalLight(entity:IEntity);

	/**
	 *
	 * @param entity
	 */
	applyEntity(entity:IEntity);

	/**
	 *
	 * @param entity
	 */
	applyLightProbe(entity:IEntity);

	/**
	 *
	 * @param entity
	 */
	applyPointLight(entity:IEntity);


	/**
	 *
	 * @param entity
	 */
	applySkybox(entity:IEntity);
}

export = ICollector;