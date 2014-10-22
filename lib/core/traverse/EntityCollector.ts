import LightBase					= require("awayjs-core/lib/core/base/LightBase");
import CollectorBase				= require("awayjs-core/lib/core/traverse/CollectorBase");
import DirectionalLight				= require("awayjs-core/lib/entities/DirectionalLight");
import IEntity						= require("awayjs-core/lib/entities/IEntity");
import LightProbe					= require("awayjs-core/lib/entities/LightProbe");
import PointLight					= require("awayjs-core/lib/entities/PointLight");
import Skybox						= require("awayjs-core/lib/entities/Skybox");

/**
 * @class away.traverse.EntityCollector
 */
class EntityCollector extends CollectorBase
{
	public _pSkybox:Skybox;
	public _pLights:Array<LightBase>;
	private _directionalLights:Array<DirectionalLight>;
	private _pointLights:Array<PointLight>;
	private _lightProbes:Array<LightProbe>;

	public _pNumLights:number = 0;

	private _numDirectionalLights:number = 0;
	private _numPointLights:number = 0;
	private _numLightProbes:number = 0;

	/**
	 *
	 */
	public get directionalLights():Array<DirectionalLight>
	{
		return this._directionalLights;
	}

	/**
	 *
	 */
	public get lightProbes():Array<LightProbe>
	{
		return this._lightProbes;
	}

	/**
	 *
	 */
	public get lights():Array<LightBase>
	{
		return this._pLights;
	}

	/**
	 *
	 */
	public get pointLights():Array<PointLight>
	{
		return this._pointLights;
	}

	/**
	 *
	 */
	public get skyBox():Skybox
	{
		return this._pSkybox;
	}

	constructor()
	{
		super();

		this._pLights = new Array<LightBase>();
		this._directionalLights = new Array<DirectionalLight>();
		this._pointLights = new Array<PointLight>();
		this._lightProbes = new Array<LightProbe>();
	}

	/**
	 *
	 * @param entity
	 */
	public applyDirectionalLight(entity:IEntity)
	{
		this._directionalLights[ this._numDirectionalLights++ ] = <DirectionalLight> entity;
	}

	/**
	 *
	 * @param entity
	 */
	public applyLightProbe(entity:IEntity)
	{
		this._lightProbes[ this._numLightProbes++ ] = <LightProbe> entity;
	}

	/**
	 *
	 * @param entity
	 */
	public applyPointLight(entity:IEntity)
	{
		this._pointLights[ this._numPointLights++ ] = <PointLight> entity;
	}

	/**
	 *
	 * @param entity
	 */
	public applySkybox(entity:IEntity)
	{
		this._pSkybox = <Skybox> entity;
	}

	/**
	 *
	 */
	public clear()
	{
		super.clear();

		this._pSkybox = null;

		if (this._pNumLights > 0)
			this._pLights.length = this._pNumLights = 0;

		if (this._numDirectionalLights > 0)
			this._directionalLights.length = this._numDirectionalLights = 0;

		if (this._numPointLights > 0)
			this._pointLights.length = this._numPointLights = 0;

		if (this._numLightProbes > 0)
			this._lightProbes.length = this._numLightProbes = 0;
	}
}

export = EntityCollector;