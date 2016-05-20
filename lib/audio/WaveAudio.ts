import {IAudioChannel}				from "../managers/IAudioChannel";
import {AudioManager}				from "../managers/AudioManager";
import {ColorTransform}			from "../geom/ColorTransform";
import {Matrix}					from "../geom/Matrix";
import {Rectangle}				from "../geom/Rectangle";
import {IAsset}					from "../library/IAsset";
import {AssetBase}				from "../library/AssetBase";
import {ParserUtils}				from "../parsers/ParserUtils";
import {ColorUtils}				from "../utils/ColorUtils";

// TODO: Audio should probably be an interface containing play/stop/seek functionality
export class WaveAudio extends AssetBase
{
	public static assetType:string = "[asset WaveAudio]";

	private _audioChannel:IAudioChannel;
	private _volume:number = 1;
	private _buffer:ArrayBuffer;

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return WaveAudio.assetType;
	}

	public get volume():number
	{
		return this._volume;
	}

	public set volume(value:number)
	{
		if (this._volume == value)
			return;

		this._volume = value;

		if (this._audioChannel)
			this._audioChannel.volume = this._volume;
	}

	public get currentTime():number
	{
		if (this._audioChannel)
			return this._audioChannel.currentTime;

		return 0;
	}

	public get duration():number
	{
		if (this._audioChannel)
			return this._audioChannel.duration;

		return 0;
	}

	/**
	 *
	 */
	constructor(buffer:ArrayBuffer)
	{
		super();

		this._buffer = buffer;
	}

	public dispose():void
	{
		this.stop();
	}

	public play(offset:number, loop:boolean = false):void
	{
		this._audioChannel = AudioManager.getChannel(this._buffer.byteLength);

		if (this._audioChannel) {
			this._audioChannel.volume = this._volume;
			this._audioChannel.play(this._buffer, offset, loop, this.id);
		}
	}

	public stop():void
	{
		if (this._audioChannel)
			this._audioChannel.stop();

		delete this._audioChannel;
		this._audioChannel = null;
	}

	public clone():WaveAudio
	{
		var newInstance:WaveAudio = new WaveAudio(this._buffer);

		newInstance.name = this.name;

		return newInstance;
	}
}