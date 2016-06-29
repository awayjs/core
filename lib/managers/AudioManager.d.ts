import { IAudioChannel } from "../managers/IAudioChannel";
export declare class AudioManager {
    private static _externalSoundInterface;
    static setExternalSoundInterface(new_obj: any): number;
    static getExternalSoundInterface(): any;
    static getChannel(byteLength: number): IAudioChannel;
}
