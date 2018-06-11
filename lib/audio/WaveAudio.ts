import {IAudioChannel}				from "../managers/IAudioChannel";
import {AudioManager}				from "../managers/AudioManager";
import {AssetBase}				from "../library/AssetBase";

// TODO: Audio should probably be an interface containing play/stop/seek functionality
export class WaveAudio extends AssetBase
{
	public static assetType:string = "[asset WaveAudio]";

	private _audioChannel:IAudioChannel;
	private _volume:number = 1;
	private _pan:number = 0;
	private _buffer:ArrayBuffer;
	private _onSoundComplete:Function;
	private _audioChannels:IAudioChannel[];
	private _channelGroup:number;
	private _loopsToPlay:number;
	private _isPlaying:boolean;
	private _channelsPlaying:number=0;

	public get isPlaying():boolean
	{
		return this.isPlaying;
	}
	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return WaveAudio.assetType;
	}

	public get loopsToPlay():number
	{
		return this._loopsToPlay;
	}

	public set loopsToPlay(value:number)
	{
		if (this._loopsToPlay == value)
			return;

		this._loopsToPlay = value;

		if(this._audioChannel){
			this._audioChannel.onSoundComplete=()=>this.soundCompleteInternal();
		}

	}


	private soundCompleteInternal(){
		this._loopsToPlay--;
		//console.log("soundCompleteInternal", this.loopsToPlay);
		if(this._loopsToPlay>0){
			this.stop();
			this.play(0, false);
		}
		else{
			if(this._channelsPlaying>0)
				this._channelsPlaying--;
			if(this._channelsPlaying==0)
				this._isPlaying=false;			
			if(this._onSoundComplete){
				this._onSoundComplete();
			}
		}
	}
	public get pan():number
	{
		return this._pan;
	}

	public set pan(value:number)
	{
		if (this._pan == value)
			return;

		this._pan = value;

		if (this._audioChannel)
			this._audioChannel.pan = this._pan;
	}

	public get channelGroup():number
	{
		return this._channelGroup;
	}

	public set channelGroup(value:number)
	{
		if (this._channelGroup == value)
			return;

		this._channelGroup = value;

		var groupVolume:number=AudioManager.getVolume(value);
		for(var i:number=0; i<this._audioChannels.length; i++){
			this._audioChannels[i].groupVolume = groupVolume;
		}
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

		for(var i:number=0; i<this._audioChannels.length; i++){
			this._audioChannels[i].volume = this._volume;
		}
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
	constructor(buffer:ArrayBuffer, channelGroup:number=0)
	{
		super();
		this._audioChannels=[];
		this._buffer = buffer;
		this._loopsToPlay=0;
		this._channelGroup=channelGroup;
		this._isPlaying=false;
		this._channelsPlaying=0;
	}

	public dispose():void
	{
		this._isPlaying=false;
		this.stop();
	}

	public play(offset:number, loop:boolean = false):void
	{

		this._isPlaying=true;
		this._audioChannel = AudioManager.getChannel(this._buffer.byteLength, this.channelGroup);


		if (this._audioChannel) {
			this._channelsPlaying++;
			this._audioChannels.push(this._audioChannel);
			this._audioChannel.volume = this._volume;
			this._audioChannel.play(this._buffer, offset, loop, this.id);
			//if(this._onSoundComplete || this._loopsToPlay>0){
			this._audioChannel.onSoundComplete=()=>this.soundCompleteInternal();
			//}
		}
	}
	public set onSoundComplete(value:Function)
	{
		this._onSoundComplete=value;
		if (this._audioChannel) {
			this._audioChannel.onSoundComplete=()=>this.soundCompleteInternal();
		}
	}

	public stop():void
	{
		this._isPlaying=false;
		for(var i:number=0; i<this._audioChannels.length; i++){
			this._audioChannels[i].stop();
			delete this._audioChannels[i];
		}

		this._channelsPlaying=0;
		this._audioChannels.length=0;

		this._audioChannel = null;
	}

	public clone():WaveAudio
	{
		var newInstance:WaveAudio = new WaveAudio(this._buffer);

		newInstance.name = this.name;

		return newInstance;
	}
}