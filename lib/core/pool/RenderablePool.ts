import IMaterialOwner				= require("awayjs-core/lib/core/base/IMaterialOwner");
import IRenderable					= require("awayjs-core/lib/core/pool/IRenderable");
import IRenderableClass				= require("awayjs-core/lib/core/pool/IRenderableClass");

/**
 * @class away.pool.RenderablePool
 */
class RenderablePool
{
	private static _pools:Object = new Object();

	private _pool:Object = new Object();
	private _renderableClass:IRenderableClass;

	/**
	 * //TODO
	 *
	 * @param renderableClass
	 */
	constructor(renderableClass:IRenderableClass)
	{
		this._renderableClass = renderableClass;
	}

	/**
	 * //TODO
	 *
	 * @param materialOwner
	 * @returns IRenderable
	 */
	public getItem(materialOwner:IMaterialOwner):IRenderable
	{
		return <IRenderable> (this._pool[materialOwner.id] || (this._pool[materialOwner.id] = materialOwner._iAddRenderable(new this._renderableClass(this, materialOwner))))
	}

	/**
	 * //TODO
	 *
	 * @param materialOwner
	 */
	public disposeItem(materialOwner:IMaterialOwner)
	{
		materialOwner._iRemoveRenderable(this._pool[materialOwner.id]);

		this._pool[materialOwner.id] = null;
	}

	/**
	 * //TODO
	 *
	 * @param renderableClass
	 * @returns RenderablePool
	 */
	public static getPool(renderableClass:IRenderableClass):RenderablePool
	{
		var pool:RenderablePool = RenderablePool._pools[renderableClass.id];

		if (pool != undefined)
			return pool;

		return <RenderablePool> (RenderablePool._pools[renderableClass.id] = new RenderablePool(renderableClass));
	}

	/**
	 * //TODO
	 *
	 * @param renderableClass
	 */
	public static disposePool(renderableClass:any)
	{
		if (RenderablePool._pools[renderableClass.id])
			RenderablePool._pools[renderableClass.id] = undefined;
	}
}

export = RenderablePool;