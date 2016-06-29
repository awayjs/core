import { BitmapImage2D } from "../image/BitmapImage2D";
import { ByteArray } from "../utils/ByteArray";
export declare class ParserUtils {
    static arrayBufferToBase64(data: ArrayBuffer, mimeType: string): string;
    static arrayBufferToAudio(data: ArrayBuffer, fileType: string): HTMLAudioElement;
    /**
     * Converts an ArrayBuffer to a base64 string
     *
     * @param image data as a ByteArray
     *
     * @return HTMLImageElement
     *
     */
    static arrayBufferToImage(data: ArrayBuffer): HTMLImageElement;
    /**
     * Converts an ByteArray to an Image - returns an HTMLImageElement
     *
     * @param image data as a ByteArray
     *
     * @return HTMLImageElement
     *
     */
    static byteArrayToImage(data: ByteArray): HTMLImageElement;
    static byteArrayToAudio(data: ByteArray, filetype: string): HTMLAudioElement;
    /**
     * Converts an Blob to an Image - returns an HTMLImageElement
     *
     * @param image data as a Blob
     *
     * @return HTMLImageElement
     *
     */
    static blobToImage(data: Blob): HTMLImageElement;
    /**
     * Converts an Blob to audio - returns an HTMLAudioElement
     *
     * @param audio data as a Blob
     *
     * @return HTMLAudioElement
     *
     */
    static blobToAudio(data: Blob): HTMLAudioElement;
    /**
     *
     */
    static imageToBitmapImage2D(img: HTMLImageElement, powerOfTwo?: boolean): BitmapImage2D;
    /**
     * Returns a object as ByteArray, if possible.
     *
     * @param data The object to return as ByteArray
     *
     * @return The ByteArray or null
     *
     */
    static toByteArray(data: any): ByteArray;
    /**
     * Returns a object as String, if possible.
     *
     * @param data The object to return as String
     * @param length The length of the returned String
     *
     * @return The String or null
     *
     */
    static toString(data: any, length?: number): string;
}
