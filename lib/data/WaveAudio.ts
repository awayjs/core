import BlendMode				= require("awayjs-core/lib/data/BlendMode");
import ColorTransform			= require("awayjs-core/lib/geom/ColorTransform");
import Matrix					= require("awayjs-core/lib/geom/Matrix");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import IAsset					= require("awayjs-core/lib/library/IAsset");
import AssetBase				= require("awayjs-core/lib/library/AssetBase");
import ColorUtils				= require("awayjs-core/lib/utils/ColorUtils");
import Event					= require("awayjs-core/lib/events/Event");

// TODO: Audio should probably be an interface containing play/stop/seek functionality
class WaveAudio extends AssetBase implements IAsset
{
	public static assetType:string = "[asset WaveAudio]";

	private _audioCtx;
	private _buffer:ArrayBuffer;
	private _loop:boolean;
	private _source;
	private _volume:number = 1;
	private _gainNode;
	private _startTime:number = 0;
	private _currentTime:number = 0;
	private _isPlaying:boolean;
	private _duration:number = 0;
	private _onEndedDelegate : (event:any) => void;

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return WaveAudio.assetType;
	}

	public get loop():boolean
	{
		return this._source.loop;
	}

	public set loop(value:boolean)
	{
		if (this._loop == value)
			return;

		this._loop = value;

		if (this._source)
			this._source.loop = this._loop;
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

		this._gainNode.gain.value = this._volume;
	}

	public get currentTime():number
	{
		if (!this._isPlaying)
			return this._currentTime;

		return this._audioCtx.currentTime - this._startTime;
	}

	public set currentTime(value:number)
	{
		this._currentTime = value;

		if (this._isPlaying) {
			//swap for new source
			var source = this._audioCtx.createBufferSource();
			source.buffer = this._source.buffer;

			//dispose of old source
			this._source.disconnect();
			delete this._source;

			//attach new source
			this._source = source;
			this._source.loop = this._loop;
			this._source.connect(this._gainNode);

			this._startTime = this._audioCtx.currentTime - this._currentTime;
			this._source.start(this._audioCtx.currentTime, this._currentTime);
		}

	}

	public get duration():number
	{
		return this._duration; //TODO: extract this data independently
	}

	/**
	 *
	 */
	constructor(buffer:ArrayBuffer, audioCtx)
	{
		super();

		this._buffer = buffer;
		this._audioCtx = audioCtx;

		this._gainNode = this._audioCtx.createGain();
		this._gainNode.gain.value = this._volume;

		this._gainNode.connect(this._audioCtx.destination);

		this._onEndedDelegate = (event) => this.onEnded(event);
	}

	public dispose()
	{
		this.stop();

		delete this._audioCtx;
		this._audioCtx = null;
		delete this._buffer
		this._buffer = null;
	}

	public play()
	{
		if (this._isPlaying)
			return;

		this._createSource();
	}

	public stop()
	{
		if (!this._isPlaying)
			return;

		this._isPlaying = false;
		this._currentTime = this._audioCtx.currentTime - this._startTime;

		this._source.stop(this._audioCtx.currentTime);

		this._disposeSource();
	}

	public clone()
	{
		return new WaveAudio(this._buffer, this._audioCtx);
	}

	public onLoadComplete(buffer)
	{
		this._source.buffer = buffer;
		this._duration = buffer.duration;

		this._isPlaying = true;

		this._startTime = this._audioCtx.currentTime - this._currentTime;
		this._source.onended = this._onEndedDelegate;
		this._source.start(this._audioCtx.currentTime, this._currentTime);
	}

	public onError(event)
	{
	}

	private _createSource()
	{
		//safeguard against multiple calls to play method
		if (this._source)
			return;

		//create the source for this WaveAudio object
		this._source = this._audioCtx.createBufferSource();

		this._source.loop = this._loop;
		this._source.connect(this._gainNode);

		this._audioCtx.decodeAudioData(this._buffer, (buffer) => this.onLoadComplete(buffer), (event) => this.onError(event));
	}

	private _disposeSource()
	{
		//clear up
		this._source.disconnect();
		delete this._source;
		this._source = null;
	}

	private onEnded(event):void
	{
		this.stop();

		this.dispatchEvent(new Event('ended'))
	}
}

export = WaveAudio;