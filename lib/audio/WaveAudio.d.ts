import { AssetBase } from "../library/AssetBase";
export declare class WaveAudio extends AssetBase {
    static assetType: string;
    private _audioChannel;
    private _volume;
    private _buffer;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    volume: number;
    readonly currentTime: number;
    readonly duration: number;
    /**
     *
     */
    constructor(buffer: ArrayBuffer);
    dispose(): void;
    play(offset: number, loop?: boolean): void;
    stop(): void;
    clone(): WaveAudio;
}
