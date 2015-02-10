/**
 * A class that provides constant values for visual blend mode effects. These
 * constants are used in the following:
 * <ul>
 *   <li> The <code>blendMode</code> property of the
 * flash.display.DisplayObject class.</li>
 *   <li> The <code>blendMode</code> parameter of the <code>draw()</code>
 * method of the flash.display.BitmapData class</li>
 * </ul>
 */
var BlendMode = (function () {
    function BlendMode() {
    }
    /**
     * Adds the values of the constituent colors of the display object to the
     * colors of its background, applying a ceiling of 0xFF. This setting is
     * commonly used for animating a lightening dissolve between two objects.
     *
     * <p>For example, if the display object has a pixel with an RGB value of
     * 0xAAA633, and the background pixel has an RGB value of 0xDD2200, the
     * resulting RGB value for the displayed pixel is 0xFFC833(because 0xAA +
     * 0xDD > 0xFF, 0xA6 + 0x22 = 0xC8, and 0x33 + 0x00 = 0x33).</p>
     */
    BlendMode.ADD = "add";
    /**
     * Applies the alpha value of each pixel of the display object to the
     * background. This requires the <code>blendMode</code> property of the
     * parent display object be set to
     * <code>away.base.BlendMode.LAYER</code>.
     *
     * <p>Not supported under GPU rendering.</p>
     */
    BlendMode.ALPHA = "alpha";
    /**
     * Selects the darker of the constituent colors of the display object and the
     * colors of the background(the colors with the smaller values). This
     * setting is commonly used for superimposing type.
     *
     * <p>For example, if the display object has a pixel with an RGB value of
     * 0xFFCC33, and the background pixel has an RGB value of 0xDDF800, the
     * resulting RGB value for the displayed pixel is 0xDDCC00(because 0xFF >
     * 0xDD, 0xCC < 0xF8, and 0x33 > 0x00 = 33).</p>
     *
     * <p>Not supported under GPU rendering.</p>
     */
    BlendMode.DARKEN = "darken";
    /**
     * Compares the constituent colors of the display object with the colors of
     * its background, and subtracts the darker of the values of the two
     * constituent colors from the lighter value. This setting is commonly used
     * for more vibrant colors.
     *
     * <p>For example, if the display object has a pixel with an RGB value of
     * 0xFFCC33, and the background pixel has an RGB value of 0xDDF800, the
     * resulting RGB value for the displayed pixel is 0x222C33(because 0xFF -
     * 0xDD = 0x22, 0xF8 - 0xCC = 0x2C, and 0x33 - 0x00 = 0x33).</p>
     */
    BlendMode.DIFFERENCE = "difference";
    /**
     * Erases the background based on the alpha value of the display object. This
     * process requires that the <code>blendMode</code> property of the parent
     * display object be set to <code>flash.display.BlendMode.LAYER</code>.
     *
     * <p>Not supported under GPU rendering.</p>
     */
    BlendMode.ERASE = "erase";
    /**
     * Adjusts the color of each pixel based on the darkness of the display
     * object. If the display object is lighter than 50% gray, the display object
     * and background colors are screened, which results in a lighter color. If
     * the display object is darker than 50% gray, the colors are multiplied,
     * which results in a darker color. This setting is commonly used for shading
     * effects.
     *
     * <p>Not supported under GPU rendering.</p>
     */
    BlendMode.HARDLIGHT = "hardlight";
    /**
     * Inverts the background.
     */
    BlendMode.INVERT = "invert";
    /**
     * Forces the creation of a transparency group for the display object. This
     * means that the display object is precomposed in a temporary buffer before
     * it is processed further. The precomposition is done automatically if the
     * display object is precached by means of bitmap caching or if the display
     * object is a display object container that has at least one child object
     * with a <code>blendMode</code> setting other than <code>"normal"</code>.
     *
     * <p>Not supported under GPU rendering.</p>
     */
    BlendMode.LAYER = "layer";
    /**
     * Selects the lighter of the constituent colors of the display object and
     * the colors of the background(the colors with the larger values). This
     * setting is commonly used for superimposing type.
     *
     * <p>For example, if the display object has a pixel with an RGB value of
     * 0xFFCC33, and the background pixel has an RGB value of 0xDDF800, the
     * resulting RGB value for the displayed pixel is 0xFFF833(because 0xFF >
     * 0xDD, 0xCC < 0xF8, and 0x33 > 0x00 = 33).</p>
     *
     * <p>Not supported under GPU rendering.</p>
     */
    BlendMode.LIGHTEN = "lighten";
    /**
     * Multiplies the values of the display object constituent colors by the
     * constituent colors of the background color, and normalizes by dividing by
     * 0xFF, resulting in darker colors. This setting is commonly used for
     * shadows and depth effects.
     *
     * <p>For example, if a constituent color(such as red) of one pixel in the
     * display object and the corresponding color of the pixel in the background
     * both have the value 0x88, the multiplied result is 0x4840. Dividing by
     * 0xFF yields a value of 0x48 for that constituent color, which is a darker
     * shade than the color of the display object or the color of the
     * background.</p>
     */
    BlendMode.MULTIPLY = "multiply";
    /**
     * The display object appears in front of the background. Pixel values of the
     * display object override the pixel values of the background. Where the
     * display object is transparent, the background is visible.
     */
    BlendMode.NORMAL = "normal";
    /**
     * Adjusts the color of each pixel based on the darkness of the background.
     * If the background is lighter than 50% gray, the display object and
     * background colors are screened, which results in a lighter color. If the
     * background is darker than 50% gray, the colors are multiplied, which
     * results in a darker color. This setting is commonly used for shading
     * effects.
     *
     * <p>Not supported under GPU rendering.</p>
     */
    BlendMode.OVERLAY = "overlay";
    /**
     * Multiplies the complement(inverse) of the display object color by the
     * complement of the background color, resulting in a bleaching effect. This
     * setting is commonly used for highlights or to remove black areas of the
     * display object.
     */
    BlendMode.SCREEN = "screen";
    /**
     * Uses a shader to define the blend between objects.
     *
     * <p>Setting the <code>blendShader</code> property to a Shader instance
     * automatically sets the display object's <code>blendMode</code> property to
     * <code>BlendMode.SHADER</code>. If the <code>blendMode</code> property is
     * set to <code>BlendMode.SHADER</code> without first setting the
     * <code>blendShader</code> property, the <code>blendMode</code> property is
     * set to <code>BlendMode.NORMAL</code> instead. If the
     * <code>blendShader</code> property is set(which sets the
     * <code>blendMode</code> property to <code>BlendMode.SHADER</code>), then
     * later the value of the <code>blendMode</code> property is changed, the
     * blend mode can be reset to use the blend shader simply by setting the
     * <code>blendMode</code> property to <code>BlendMode.SHADER</code>. The
     * <code>blendShader</code> property does not need to be set again except to
     * change the shader that's used to define the blend mode.</p>
     *
     * <p>Not supported under GPU rendering.</p>
     */
    BlendMode.SHADER = "shader";
    /**
     * Subtracts the values of the constituent colors in the display object from
     * the values of the background color, applying a floor of 0. This setting is
     * commonly used for animating a darkening dissolve between two objects.
     *
     * <p>For example, if the display object has a pixel with an RGB value of
     * 0xAA2233, and the background pixel has an RGB value of 0xDDA600, the
     * resulting RGB value for the displayed pixel is 0x338400(because 0xDD -
     * 0xAA = 0x33, 0xA6 - 0x22 = 0x84, and 0x00 - 0x33 < 0x00).</p>
     */
    BlendMode.SUBTRACT = "subtract";
    return BlendMode;
})();
module.exports = BlendMode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9iYXNlL2JsZW5kbW9kZS50cyJdLCJuYW1lcyI6WyJCbGVuZE1vZGUiLCJCbGVuZE1vZGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBVUE7Ozs7Ozs7OztHQURHO0lBQ0csU0FBUztJQUFmQSxTQUFNQSxTQUFTQTtJQWlMZkMsQ0FBQ0E7SUEvS0FEOzs7Ozs7Ozs7T0FTR0E7SUFDV0EsYUFBR0EsR0FBVUEsS0FBS0EsQ0FBQ0E7SUFFakNBOzs7Ozs7O09BT0dBO0lBQ1dBLGVBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBRXJDQTs7Ozs7Ozs7Ozs7T0FXR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7Ozs7Ozs7OztPQVVHQTtJQUNXQSxvQkFBVUEsR0FBVUEsWUFBWUEsQ0FBQ0E7SUFFL0NBOzs7Ozs7T0FNR0E7SUFDV0EsZUFBS0EsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFFckNBOzs7Ozs7Ozs7T0FTR0E7SUFDV0EsbUJBQVNBLEdBQVVBLFdBQVdBLENBQUNBO0lBRTdDQTs7T0FFR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7Ozs7Ozs7O09BU0dBO0lBQ1dBLGVBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBRXJDQTs7Ozs7Ozs7Ozs7T0FXR0E7SUFDV0EsaUJBQU9BLEdBQVVBLFNBQVNBLENBQUNBO0lBRXpDQTs7Ozs7Ozs7Ozs7O09BWUdBO0lBQ1dBLGtCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUUzQ0E7Ozs7T0FJR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7Ozs7Ozs7O09BU0dBO0lBQ1dBLGlCQUFPQSxHQUFVQSxTQUFTQSxDQUFDQTtJQUV6Q0E7Ozs7O09BS0dBO0lBQ1dBLGdCQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUV2Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7Ozs7Ozs7O09BU0dBO0lBQ1dBLGtCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUM1Q0EsZ0JBQUNBO0FBQURBLENBakxBLEFBaUxDQSxJQUFBO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImJhc2UvQmxlbmRNb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBjbGFzcyB0aGF0IHByb3ZpZGVzIGNvbnN0YW50IHZhbHVlcyBmb3IgdmlzdWFsIGJsZW5kIG1vZGUgZWZmZWN0cy4gVGhlc2VcbiAqIGNvbnN0YW50cyBhcmUgdXNlZCBpbiB0aGUgZm9sbG93aW5nOlxuICogPHVsPlxuICogICA8bGk+IFRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuICogZmxhc2guZGlzcGxheS5EaXNwbGF5T2JqZWN0IGNsYXNzLjwvbGk+XG4gKiAgIDxsaT4gVGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZSA8Y29kZT5kcmF3KCk8L2NvZGU+XG4gKiBtZXRob2Qgb2YgdGhlIGZsYXNoLmRpc3BsYXkuQml0bWFwRGF0YSBjbGFzczwvbGk+XG4gKiA8L3VsPlxuICovXG5jbGFzcyBCbGVuZE1vZGVcbntcblx0LyoqXG5cdCAqIEFkZHMgdGhlIHZhbHVlcyBvZiB0aGUgY29uc3RpdHVlbnQgY29sb3JzIG9mIHRoZSBkaXNwbGF5IG9iamVjdCB0byB0aGVcblx0ICogY29sb3JzIG9mIGl0cyBiYWNrZ3JvdW5kLCBhcHBseWluZyBhIGNlaWxpbmcgb2YgMHhGRi4gVGhpcyBzZXR0aW5nIGlzXG5cdCAqIGNvbW1vbmx5IHVzZWQgZm9yIGFuaW1hdGluZyBhIGxpZ2h0ZW5pbmcgZGlzc29sdmUgYmV0d2VlbiB0d28gb2JqZWN0cy5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSBwaXhlbCB3aXRoIGFuIFJHQiB2YWx1ZSBvZlxuXHQgKiAweEFBQTYzMywgYW5kIHRoZSBiYWNrZ3JvdW5kIHBpeGVsIGhhcyBhbiBSR0IgdmFsdWUgb2YgMHhERDIyMDAsIHRoZVxuXHQgKiByZXN1bHRpbmcgUkdCIHZhbHVlIGZvciB0aGUgZGlzcGxheWVkIHBpeGVsIGlzIDB4RkZDODMzKGJlY2F1c2UgMHhBQSArXG5cdCAqIDB4REQgPiAweEZGLCAweEE2ICsgMHgyMiA9IDB4QzgsIGFuZCAweDMzICsgMHgwMCA9IDB4MzMpLjwvcD5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgQUREOnN0cmluZyA9IFwiYWRkXCI7XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgdGhlIGFscGhhIHZhbHVlIG9mIGVhY2ggcGl4ZWwgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRoZVxuXHQgKiBiYWNrZ3JvdW5kLiBUaGlzIHJlcXVpcmVzIHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuXHQgKiBwYXJlbnQgZGlzcGxheSBvYmplY3QgYmUgc2V0IHRvXG5cdCAqIDxjb2RlPmF3YXkuYmFzZS5CbGVuZE1vZGUuTEFZRVI8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5Ob3Qgc3VwcG9ydGVkIHVuZGVyIEdQVSByZW5kZXJpbmcuPC9wPlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBBTFBIQTpzdHJpbmcgPSBcImFscGhhXCI7XG5cblx0LyoqXG5cdCAqIFNlbGVjdHMgdGhlIGRhcmtlciBvZiB0aGUgY29uc3RpdHVlbnQgY29sb3JzIG9mIHRoZSBkaXNwbGF5IG9iamVjdCBhbmQgdGhlXG5cdCAqIGNvbG9ycyBvZiB0aGUgYmFja2dyb3VuZCh0aGUgY29sb3JzIHdpdGggdGhlIHNtYWxsZXIgdmFsdWVzKS4gVGhpc1xuXHQgKiBzZXR0aW5nIGlzIGNvbW1vbmx5IHVzZWQgZm9yIHN1cGVyaW1wb3NpbmcgdHlwZS5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSBwaXhlbCB3aXRoIGFuIFJHQiB2YWx1ZSBvZlxuXHQgKiAweEZGQ0MzMywgYW5kIHRoZSBiYWNrZ3JvdW5kIHBpeGVsIGhhcyBhbiBSR0IgdmFsdWUgb2YgMHhEREY4MDAsIHRoZVxuXHQgKiByZXN1bHRpbmcgUkdCIHZhbHVlIGZvciB0aGUgZGlzcGxheWVkIHBpeGVsIGlzIDB4RERDQzAwKGJlY2F1c2UgMHhGRiA+XG5cdCAqIDB4REQsIDB4Q0MgPCAweEY4LCBhbmQgMHgzMyA+IDB4MDAgPSAzMykuPC9wPlxuXHQgKlxuXHQgKiA8cD5Ob3Qgc3VwcG9ydGVkIHVuZGVyIEdQVSByZW5kZXJpbmcuPC9wPlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBEQVJLRU46c3RyaW5nID0gXCJkYXJrZW5cIjtcblxuXHQvKipcblx0ICogQ29tcGFyZXMgdGhlIGNvbnN0aXR1ZW50IGNvbG9ycyBvZiB0aGUgZGlzcGxheSBvYmplY3Qgd2l0aCB0aGUgY29sb3JzIG9mXG5cdCAqIGl0cyBiYWNrZ3JvdW5kLCBhbmQgc3VidHJhY3RzIHRoZSBkYXJrZXIgb2YgdGhlIHZhbHVlcyBvZiB0aGUgdHdvXG5cdCAqIGNvbnN0aXR1ZW50IGNvbG9ycyBmcm9tIHRoZSBsaWdodGVyIHZhbHVlLiBUaGlzIHNldHRpbmcgaXMgY29tbW9ubHkgdXNlZFxuXHQgKiBmb3IgbW9yZSB2aWJyYW50IGNvbG9ycy5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSBwaXhlbCB3aXRoIGFuIFJHQiB2YWx1ZSBvZlxuXHQgKiAweEZGQ0MzMywgYW5kIHRoZSBiYWNrZ3JvdW5kIHBpeGVsIGhhcyBhbiBSR0IgdmFsdWUgb2YgMHhEREY4MDAsIHRoZVxuXHQgKiByZXN1bHRpbmcgUkdCIHZhbHVlIGZvciB0aGUgZGlzcGxheWVkIHBpeGVsIGlzIDB4MjIyQzMzKGJlY2F1c2UgMHhGRiAtXG5cdCAqIDB4REQgPSAweDIyLCAweEY4IC0gMHhDQyA9IDB4MkMsIGFuZCAweDMzIC0gMHgwMCA9IDB4MzMpLjwvcD5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgRElGRkVSRU5DRTpzdHJpbmcgPSBcImRpZmZlcmVuY2VcIjtcblxuXHQvKipcblx0ICogRXJhc2VzIHRoZSBiYWNrZ3JvdW5kIGJhc2VkIG9uIHRoZSBhbHBoYSB2YWx1ZSBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFRoaXNcblx0ICogcHJvY2VzcyByZXF1aXJlcyB0aGF0IHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBwYXJlbnRcblx0ICogZGlzcGxheSBvYmplY3QgYmUgc2V0IHRvIDxjb2RlPmZsYXNoLmRpc3BsYXkuQmxlbmRNb2RlLkxBWUVSPC9jb2RlPi5cblx0ICpcblx0ICogPHA+Tm90IHN1cHBvcnRlZCB1bmRlciBHUFUgcmVuZGVyaW5nLjwvcD5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgRVJBU0U6c3RyaW5nID0gXCJlcmFzZVwiO1xuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBjb2xvciBvZiBlYWNoIHBpeGVsIGJhc2VkIG9uIHRoZSBkYXJrbmVzcyBvZiB0aGUgZGlzcGxheVxuXHQgKiBvYmplY3QuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyBsaWdodGVyIHRoYW4gNTAlIGdyYXksIHRoZSBkaXNwbGF5IG9iamVjdFxuXHQgKiBhbmQgYmFja2dyb3VuZCBjb2xvcnMgYXJlIHNjcmVlbmVkLCB3aGljaCByZXN1bHRzIGluIGEgbGlnaHRlciBjb2xvci4gSWZcblx0ICogdGhlIGRpc3BsYXkgb2JqZWN0IGlzIGRhcmtlciB0aGFuIDUwJSBncmF5LCB0aGUgY29sb3JzIGFyZSBtdWx0aXBsaWVkLFxuXHQgKiB3aGljaCByZXN1bHRzIGluIGEgZGFya2VyIGNvbG9yLiBUaGlzIHNldHRpbmcgaXMgY29tbW9ubHkgdXNlZCBmb3Igc2hhZGluZ1xuXHQgKiBlZmZlY3RzLlxuXHQgKlxuXHQgKiA8cD5Ob3Qgc3VwcG9ydGVkIHVuZGVyIEdQVSByZW5kZXJpbmcuPC9wPlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBIQVJETElHSFQ6c3RyaW5nID0gXCJoYXJkbGlnaHRcIjtcblxuXHQvKipcblx0ICogSW52ZXJ0cyB0aGUgYmFja2dyb3VuZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgSU5WRVJUOnN0cmluZyA9IFwiaW52ZXJ0XCI7XG5cblx0LyoqXG5cdCAqIEZvcmNlcyB0aGUgY3JlYXRpb24gb2YgYSB0cmFuc3BhcmVuY3kgZ3JvdXAgZm9yIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhpc1xuXHQgKiBtZWFucyB0aGF0IHRoZSBkaXNwbGF5IG9iamVjdCBpcyBwcmVjb21wb3NlZCBpbiBhIHRlbXBvcmFyeSBidWZmZXIgYmVmb3JlXG5cdCAqIGl0IGlzIHByb2Nlc3NlZCBmdXJ0aGVyLiBUaGUgcHJlY29tcG9zaXRpb24gaXMgZG9uZSBhdXRvbWF0aWNhbGx5IGlmIHRoZVxuXHQgKiBkaXNwbGF5IG9iamVjdCBpcyBwcmVjYWNoZWQgYnkgbWVhbnMgb2YgYml0bWFwIGNhY2hpbmcgb3IgaWYgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0IGlzIGEgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXQgaGFzIGF0IGxlYXN0IG9uZSBjaGlsZCBvYmplY3Rcblx0ICogd2l0aCBhIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gc2V0dGluZyBvdGhlciB0aGFuIDxjb2RlPlwibm9ybWFsXCI8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5Ob3Qgc3VwcG9ydGVkIHVuZGVyIEdQVSByZW5kZXJpbmcuPC9wPlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBMQVlFUjpzdHJpbmcgPSBcImxheWVyXCI7XG5cblx0LyoqXG5cdCAqIFNlbGVjdHMgdGhlIGxpZ2h0ZXIgb2YgdGhlIGNvbnN0aXR1ZW50IGNvbG9ycyBvZiB0aGUgZGlzcGxheSBvYmplY3QgYW5kXG5cdCAqIHRoZSBjb2xvcnMgb2YgdGhlIGJhY2tncm91bmQodGhlIGNvbG9ycyB3aXRoIHRoZSBsYXJnZXIgdmFsdWVzKS4gVGhpc1xuXHQgKiBzZXR0aW5nIGlzIGNvbW1vbmx5IHVzZWQgZm9yIHN1cGVyaW1wb3NpbmcgdHlwZS5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSBwaXhlbCB3aXRoIGFuIFJHQiB2YWx1ZSBvZlxuXHQgKiAweEZGQ0MzMywgYW5kIHRoZSBiYWNrZ3JvdW5kIHBpeGVsIGhhcyBhbiBSR0IgdmFsdWUgb2YgMHhEREY4MDAsIHRoZVxuXHQgKiByZXN1bHRpbmcgUkdCIHZhbHVlIGZvciB0aGUgZGlzcGxheWVkIHBpeGVsIGlzIDB4RkZGODMzKGJlY2F1c2UgMHhGRiA+XG5cdCAqIDB4REQsIDB4Q0MgPCAweEY4LCBhbmQgMHgzMyA+IDB4MDAgPSAzMykuPC9wPlxuXHQgKlxuXHQgKiA8cD5Ob3Qgc3VwcG9ydGVkIHVuZGVyIEdQVSByZW5kZXJpbmcuPC9wPlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBMSUdIVEVOOnN0cmluZyA9IFwibGlnaHRlblwiO1xuXG5cdC8qKlxuXHQgKiBNdWx0aXBsaWVzIHRoZSB2YWx1ZXMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnN0aXR1ZW50IGNvbG9ycyBieSB0aGVcblx0ICogY29uc3RpdHVlbnQgY29sb3JzIG9mIHRoZSBiYWNrZ3JvdW5kIGNvbG9yLCBhbmQgbm9ybWFsaXplcyBieSBkaXZpZGluZyBieVxuXHQgKiAweEZGLCByZXN1bHRpbmcgaW4gZGFya2VyIGNvbG9ycy4gVGhpcyBzZXR0aW5nIGlzIGNvbW1vbmx5IHVzZWQgZm9yXG5cdCAqIHNoYWRvd3MgYW5kIGRlcHRoIGVmZmVjdHMuXG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBpZiBhIGNvbnN0aXR1ZW50IGNvbG9yKHN1Y2ggYXMgcmVkKSBvZiBvbmUgcGl4ZWwgaW4gdGhlXG5cdCAqIGRpc3BsYXkgb2JqZWN0IGFuZCB0aGUgY29ycmVzcG9uZGluZyBjb2xvciBvZiB0aGUgcGl4ZWwgaW4gdGhlIGJhY2tncm91bmRcblx0ICogYm90aCBoYXZlIHRoZSB2YWx1ZSAweDg4LCB0aGUgbXVsdGlwbGllZCByZXN1bHQgaXMgMHg0ODQwLiBEaXZpZGluZyBieVxuXHQgKiAweEZGIHlpZWxkcyBhIHZhbHVlIG9mIDB4NDggZm9yIHRoYXQgY29uc3RpdHVlbnQgY29sb3IsIHdoaWNoIGlzIGEgZGFya2VyXG5cdCAqIHNoYWRlIHRoYW4gdGhlIGNvbG9yIG9mIHRoZSBkaXNwbGF5IG9iamVjdCBvciB0aGUgY29sb3Igb2YgdGhlXG5cdCAqIGJhY2tncm91bmQuPC9wPlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBNVUxUSVBMWTpzdHJpbmcgPSBcIm11bHRpcGx5XCI7XG5cblx0LyoqXG5cdCAqIFRoZSBkaXNwbGF5IG9iamVjdCBhcHBlYXJzIGluIGZyb250IG9mIHRoZSBiYWNrZ3JvdW5kLiBQaXhlbCB2YWx1ZXMgb2YgdGhlXG5cdCAqIGRpc3BsYXkgb2JqZWN0IG92ZXJyaWRlIHRoZSBwaXhlbCB2YWx1ZXMgb2YgdGhlIGJhY2tncm91bmQuIFdoZXJlIHRoZVxuXHQgKiBkaXNwbGF5IG9iamVjdCBpcyB0cmFuc3BhcmVudCwgdGhlIGJhY2tncm91bmQgaXMgdmlzaWJsZS5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTk9STUFMOnN0cmluZyA9IFwibm9ybWFsXCI7XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIGNvbG9yIG9mIGVhY2ggcGl4ZWwgYmFzZWQgb24gdGhlIGRhcmtuZXNzIG9mIHRoZSBiYWNrZ3JvdW5kLlxuXHQgKiBJZiB0aGUgYmFja2dyb3VuZCBpcyBsaWdodGVyIHRoYW4gNTAlIGdyYXksIHRoZSBkaXNwbGF5IG9iamVjdCBhbmRcblx0ICogYmFja2dyb3VuZCBjb2xvcnMgYXJlIHNjcmVlbmVkLCB3aGljaCByZXN1bHRzIGluIGEgbGlnaHRlciBjb2xvci4gSWYgdGhlXG5cdCAqIGJhY2tncm91bmQgaXMgZGFya2VyIHRoYW4gNTAlIGdyYXksIHRoZSBjb2xvcnMgYXJlIG11bHRpcGxpZWQsIHdoaWNoXG5cdCAqIHJlc3VsdHMgaW4gYSBkYXJrZXIgY29sb3IuIFRoaXMgc2V0dGluZyBpcyBjb21tb25seSB1c2VkIGZvciBzaGFkaW5nXG5cdCAqIGVmZmVjdHMuXG5cdCAqXG5cdCAqIDxwPk5vdCBzdXBwb3J0ZWQgdW5kZXIgR1BVIHJlbmRlcmluZy48L3A+XG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIE9WRVJMQVk6c3RyaW5nID0gXCJvdmVybGF5XCI7XG5cblx0LyoqXG5cdCAqIE11bHRpcGxpZXMgdGhlIGNvbXBsZW1lbnQoaW52ZXJzZSkgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbG9yIGJ5IHRoZVxuXHQgKiBjb21wbGVtZW50IG9mIHRoZSBiYWNrZ3JvdW5kIGNvbG9yLCByZXN1bHRpbmcgaW4gYSBibGVhY2hpbmcgZWZmZWN0LiBUaGlzXG5cdCAqIHNldHRpbmcgaXMgY29tbW9ubHkgdXNlZCBmb3IgaGlnaGxpZ2h0cyBvciB0byByZW1vdmUgYmxhY2sgYXJlYXMgb2YgdGhlXG5cdCAqIGRpc3BsYXkgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBTQ1JFRU46c3RyaW5nID0gXCJzY3JlZW5cIjtcblxuXHQvKipcblx0ICogVXNlcyBhIHNoYWRlciB0byBkZWZpbmUgdGhlIGJsZW5kIGJldHdlZW4gb2JqZWN0cy5cblx0ICpcblx0ICogPHA+U2V0dGluZyB0aGUgPGNvZGU+YmxlbmRTaGFkZXI8L2NvZGU+IHByb3BlcnR5IHRvIGEgU2hhZGVyIGluc3RhbmNlXG5cdCAqIGF1dG9tYXRpY2FsbHkgc2V0cyB0aGUgZGlzcGxheSBvYmplY3QncyA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IHRvXG5cdCAqIDxjb2RlPkJsZW5kTW9kZS5TSEFERVI8L2NvZGU+LiBJZiB0aGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBwcm9wZXJ0eSBpc1xuXHQgKiBzZXQgdG8gPGNvZGU+QmxlbmRNb2RlLlNIQURFUjwvY29kZT4gd2l0aG91dCBmaXJzdCBzZXR0aW5nIHRoZVxuXHQgKiA8Y29kZT5ibGVuZFNoYWRlcjwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IGlzXG5cdCAqIHNldCB0byA8Y29kZT5CbGVuZE1vZGUuTk9STUFMPC9jb2RlPiBpbnN0ZWFkLiBJZiB0aGVcblx0ICogPGNvZGU+YmxlbmRTaGFkZXI8L2NvZGU+IHByb3BlcnR5IGlzIHNldCh3aGljaCBzZXRzIHRoZVxuXHQgKiA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPkJsZW5kTW9kZS5TSEFERVI8L2NvZGU+KSwgdGhlblxuXHQgKiBsYXRlciB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gcHJvcGVydHkgaXMgY2hhbmdlZCwgdGhlXG5cdCAqIGJsZW5kIG1vZGUgY2FuIGJlIHJlc2V0IHRvIHVzZSB0aGUgYmxlbmQgc2hhZGVyIHNpbXBseSBieSBzZXR0aW5nIHRoZVxuXHQgKiA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPkJsZW5kTW9kZS5TSEFERVI8L2NvZGU+LiBUaGVcblx0ICogPGNvZGU+YmxlbmRTaGFkZXI8L2NvZGU+IHByb3BlcnR5IGRvZXMgbm90IG5lZWQgdG8gYmUgc2V0IGFnYWluIGV4Y2VwdCB0b1xuXHQgKiBjaGFuZ2UgdGhlIHNoYWRlciB0aGF0J3MgdXNlZCB0byBkZWZpbmUgdGhlIGJsZW5kIG1vZGUuPC9wPlxuXHQgKlxuXHQgKiA8cD5Ob3Qgc3VwcG9ydGVkIHVuZGVyIEdQVSByZW5kZXJpbmcuPC9wPlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBTSEFERVI6c3RyaW5nID0gXCJzaGFkZXJcIjtcblxuXHQvKipcblx0ICogU3VidHJhY3RzIHRoZSB2YWx1ZXMgb2YgdGhlIGNvbnN0aXR1ZW50IGNvbG9ycyBpbiB0aGUgZGlzcGxheSBvYmplY3QgZnJvbVxuXHQgKiB0aGUgdmFsdWVzIG9mIHRoZSBiYWNrZ3JvdW5kIGNvbG9yLCBhcHBseWluZyBhIGZsb29yIG9mIDAuIFRoaXMgc2V0dGluZyBpc1xuXHQgKiBjb21tb25seSB1c2VkIGZvciBhbmltYXRpbmcgYSBkYXJrZW5pbmcgZGlzc29sdmUgYmV0d2VlbiB0d28gb2JqZWN0cy5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSBwaXhlbCB3aXRoIGFuIFJHQiB2YWx1ZSBvZlxuXHQgKiAweEFBMjIzMywgYW5kIHRoZSBiYWNrZ3JvdW5kIHBpeGVsIGhhcyBhbiBSR0IgdmFsdWUgb2YgMHhEREE2MDAsIHRoZVxuXHQgKiByZXN1bHRpbmcgUkdCIHZhbHVlIGZvciB0aGUgZGlzcGxheWVkIHBpeGVsIGlzIDB4MzM4NDAwKGJlY2F1c2UgMHhERCAtXG5cdCAqIDB4QUEgPSAweDMzLCAweEE2IC0gMHgyMiA9IDB4ODQsIGFuZCAweDAwIC0gMHgzMyA8IDB4MDApLjwvcD5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgU1VCVFJBQ1Q6c3RyaW5nID0gXCJzdWJ0cmFjdFwiO1xufVxuXG5leHBvcnQgPSBCbGVuZE1vZGU7Il19