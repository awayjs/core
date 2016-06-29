import { SamplerBase } from "../image/SamplerBase";
import { Rectangle } from "../geom/Rectangle";
/**
 * The Sampler2D export class represents display objects that represent bitmap images.
 * These can be images that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes, or they can be images that you
 * create with the <code>Sampler2D()</code> constructor.
 *
 * <p>The <code>Sampler2D()</code> constructor allows you to create a Sampler2D
 * object that contains a reference to a Image2D object. After you create a
 * Sampler2D object, use the <code>addChild()</code> or <code>addChildAt()</code>
 * method of the parent DisplayObjectContainer instance to place the bitmap on
 * the display list.</p>
 *
 * <p>A Sampler2D object can share its Image2D reference among several Sampler2D
 * objects, independent of translation or rotation properties. Because you can
 * create multiple Sampler2D objects that reference the same Image2D object,
 * multiple texture objects can use the same complex Image2D object without
 * incurring the memory overhead of a Image2D object for each texture
 * object instance.</p>

 */
export declare class Sampler2D extends SamplerBase {
    static assetType: string;
    private _imageRect;
    private _frameRect;
    private _repeat;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    /**
     * Controls whether or not the Sampler2D object is snapped to the nearest pixel.
     * This value is ignored in the native and HTML5 targets.
     * The PixelSnapping export class includes possible values:
     * <ul>
     *   <li><code>PixelSnapping.NEVER</code> - No pixel snapping occurs.</li>
     *   <li><code>PixelSnapping.ALWAYS</code> - The image is always snapped to
     * the nearest pixel, independent of transformation.</li>
     *   <li><code>PixelSnapping.AUTO</code> - The image is snapped to the
     * nearest pixel if it is drawn with no rotation or skew and it is drawn at a
     * scale factor of 99.9% to 100.1%. If these conditions are satisfied, the
     * bitmap image is drawn at 100% scale, snapped to the nearest pixel.
     * When targeting Flash Player, this value allows the image to be drawn as fast
     * as possible using the internal vector renderer.</li>
     * </ul>
     */
    /**
     * Controls whether or not the bitmap is smoothed when scaled. If
     * <code>true</code>, the bitmap is smoothed when scaled. If
     * <code>false</code>, the bitmap is not smoothed when scaled.
     */
    /**
     *
     */
    repeat: boolean;
    /**
     *
     */
    imageRect: Rectangle;
    /**
     *
     */
    frameRect: Rectangle;
    /**
     *
     * @param image2D
     * @param smoothing
     */
    constructor(repeat?: boolean, smooth?: boolean, mipmap?: boolean);
    private _updateRect();
}
