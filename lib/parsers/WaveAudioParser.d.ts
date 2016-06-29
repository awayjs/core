import { ParserBase } from "../parsers/ParserBase";
export declare class WaveAudioParser extends ParserBase {
    constructor();
    static supportsType(extension: string): boolean;
    static supportsData(data: any): boolean;
    _pStartParsing(frameLimit: number): void;
    _pProceedParsing(): boolean;
    private static parseFileType(ba);
}
