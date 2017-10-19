import {ParserUtils}				from "../parsers/ParserUtils";
import {IAudioChannel}				from "./IAudioChannel";
export class EventAudioChannel
{
	public static maxChannels:number = 4;

	public static _channels:Array<EventAudioChannel> = new Array<EventAudioChannel>();

	public static _base64Cache:Object = new Object();

	private _isPlaying:boolean = false;
	private _isLooping:boolean = false;
	private _volume:number;
	private _groupID:number = 0;
	private _groupVolume:number = 1;
	private _groupPan:number = 0;
	private _startTime:number = 0;
	private _duration:number;

	public onSoundComplete:Function;
	private _audio:HTMLAudioElement;

	public static stopAllSounds(channelGroup:number=-1){
		var len: number = EventAudioChannel._channels.length;
		if(channelGroup<0){
			for (var j: number = 0; j < len; j++) {
				EventAudioChannel._channels[j].stop();
			}
			EventAudioChannel._channels.length=0;
			return;
		}
		var aliveChannels:EventAudioChannel[]=[];
		for (var j: number = 0; j < len; j++) {
			if(EventAudioChannel._channels[j].groupID==channelGroup){
				EventAudioChannel._channels[j].stop();
			}
			else{
				aliveChannels[aliveChannels.length]=EventAudioChannel._channels[j];
			}
		}
		EventAudioChannel._channels=aliveChannels;
	}

	public static setChannelGroupVolume(value:number, channelGroup:number=-1){
		var len: number = EventAudioChannel._channels.length;
		if(channelGroup<0){
			for (var j: number = 0; j < len; j++) {
				EventAudioChannel._channels[j].groupVolume=value;
			}
			return;
		}
		for (var j: number = 0; j < len; j++) {
			if(EventAudioChannel._channels[j].groupID==channelGroup){
				EventAudioChannel._channels[j].groupVolume=value;
			}
		}
	}

	public get duration():number
	{
		return this._duration;
	}

	public get currentTime():number
	{
		return this._audio.currentTime - this._startTime;
	}

	public get pan():number
	{
		//todo
		return 0;
	}

	public set pan(value:number)
	{
		//todo
	}

	public get groupID():number
	{
		return this._groupID;
	}

	public set groupID(value:number)
	{
		this._groupID=value;
	}
	public get groupVolume():number
	{
		return this._groupVolume;
	}

	public set groupVolume(value:number)
	{
		if (this._groupVolume == value)
			return;

		this._groupVolume = value;

		this._audio.volume = this._groupVolume * this._volume;
	}

	public get groupPan():number
	{
		return this._groupPan;
	}

	public set groupPan(value:number)
	{
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

		this._audio.volume = this._volume;
	}

	public isPlaying():boolean
	{
		return this._isPlaying;
	}

	public isLooping():boolean
	{
		return this._isLooping;
	}

	public isDecoding():boolean
	{
		return false;
	}

	constructor(groupID:number=0, groupVolume:number=1, groupPan:number=1)
	{
		this._groupID=groupID;
		this._groupVolume=groupVolume;
		this._groupPan=groupPan;

		this._audio = new Audio();
		this._audio.ontimeupdate = (event) => this._onTimeUpdate(event);
	}
	
	public play(buffer:ArrayBuffer, offset:number = 0, loop:boolean = false, id:number = 0):void
	{
		this._isPlaying = true;
		this._isLooping = loop;

		this._audio.src = EventAudioChannel._base64Cache[id] || (EventAudioChannel._base64Cache[id] = ParserUtils.arrayBufferToBase64(buffer, "audio/mp3"));
		this._audio.loop = this._isLooping;
		var thisAudio=this._audio;
		this._audio.addEventListener('loadedmetadata', function() {
			thisAudio.currentTime = offset;
			thisAudio.play();
		}, false);
	}

	public stop():void
	{
		this._audio.pause();
		this._isPlaying = false;
		this._isLooping = false;
	}

	private _onTimeUpdate(event):void
	{
		//TODO: more accurate end detection
		if (!this._isLooping && this._duration < this._audio.currentTime - this._startTime + 0.1)
			this.stop();
	}
}