import BlendMode				= require("awayjs-core/lib/data/BlendMode");
import ColorTransform			= require("awayjs-core/lib/geom/ColorTransform");
import Matrix					= require("awayjs-core/lib/geom/Matrix");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import IAsset					= require("awayjs-core/lib/library/IAsset");
import AssetBase				= require("awayjs-core/lib/library/AssetBase");
import ColorUtils				= require("awayjs-core/lib/utils/ColorUtils");

// TODO: Audio should probably be an interface containing play/stop/seek functionality
class WaveAudio extends AssetBase implements IAsset
{
	public static assetType:string = "[asset WaveAudio]";

	// TODO: hide HTMLAudioElement and provide proper interface for playback control (see TODO above).
	private _htmlAudioElement : HTMLAudioElement;

	/**
	 *
	 */
	constructor(htmlAudioElement:HTMLAudioElement)
	{
		super();
		this._htmlAudioElement = htmlAudioElement;
	}

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return WaveAudio.assetType;
	}

	public get htmlAudioElement()
	{
		return this._htmlAudioElement;
	}

	public set htmlAudioElement(value : HTMLAudioElement)
	{
		this._htmlAudioElement = value;
	}

	public dispose()
	{
		this._htmlAudioElement = null;
	}
}

export = WaveAudio;