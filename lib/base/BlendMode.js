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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JsZW5kTW9kZS50cyJdLCJuYW1lcyI6WyJCbGVuZE1vZGUiLCJCbGVuZE1vZGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBVUE7Ozs7Ozs7OztHQURHO0lBQ0csU0FBUztJQUFmQSxTQUFNQSxTQUFTQTtJQWlMZkMsQ0FBQ0E7SUEvS0FEOzs7Ozs7Ozs7T0FTR0E7SUFDV0EsYUFBR0EsR0FBVUEsS0FBS0EsQ0FBQ0E7SUFFakNBOzs7Ozs7O09BT0dBO0lBQ1dBLGVBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBRXJDQTs7Ozs7Ozs7Ozs7T0FXR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7Ozs7Ozs7OztPQVVHQTtJQUNXQSxvQkFBVUEsR0FBVUEsWUFBWUEsQ0FBQ0E7SUFFL0NBOzs7Ozs7T0FNR0E7SUFDV0EsZUFBS0EsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFFckNBOzs7Ozs7Ozs7T0FTR0E7SUFDV0EsbUJBQVNBLEdBQVVBLFdBQVdBLENBQUNBO0lBRTdDQTs7T0FFR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7Ozs7Ozs7O09BU0dBO0lBQ1dBLGVBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBRXJDQTs7Ozs7Ozs7Ozs7T0FXR0E7SUFDV0EsaUJBQU9BLEdBQVVBLFNBQVNBLENBQUNBO0lBRXpDQTs7Ozs7Ozs7Ozs7O09BWUdBO0lBQ1dBLGtCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUUzQ0E7Ozs7T0FJR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7Ozs7Ozs7O09BU0dBO0lBQ1dBLGlCQUFPQSxHQUFVQSxTQUFTQSxDQUFDQTtJQUV6Q0E7Ozs7O09BS0dBO0lBQ1dBLGdCQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUV2Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7Ozs7Ozs7O09BU0dBO0lBQ1dBLGtCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUM1Q0EsZ0JBQUNBO0FBQURBLENBakxBLEFBaUxDQSxJQUFBO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImJhc2UvQmxlbmRNb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBIGNsYXNzIHRoYXQgcHJvdmlkZXMgY29uc3RhbnQgdmFsdWVzIGZvciB2aXN1YWwgYmxlbmQgbW9kZSBlZmZlY3RzLiBUaGVzZVxyXG4gKiBjb25zdGFudHMgYXJlIHVzZWQgaW4gdGhlIGZvbGxvd2luZzpcclxuICogPHVsPlxyXG4gKiAgIDxsaT4gVGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gcHJvcGVydHkgb2YgdGhlXHJcbiAqIGZsYXNoLmRpc3BsYXkuRGlzcGxheU9iamVjdCBjbGFzcy48L2xpPlxyXG4gKiAgIDxsaT4gVGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZSA8Y29kZT5kcmF3KCk8L2NvZGU+XHJcbiAqIG1ldGhvZCBvZiB0aGUgZmxhc2guZGlzcGxheS5CaXRtYXBEYXRhIGNsYXNzPC9saT5cclxuICogPC91bD5cclxuICovXHJcbmNsYXNzIEJsZW5kTW9kZVxyXG57XHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgdmFsdWVzIG9mIHRoZSBjb25zdGl0dWVudCBjb2xvcnMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRoZVxyXG5cdCAqIGNvbG9ycyBvZiBpdHMgYmFja2dyb3VuZCwgYXBwbHlpbmcgYSBjZWlsaW5nIG9mIDB4RkYuIFRoaXMgc2V0dGluZyBpc1xyXG5cdCAqIGNvbW1vbmx5IHVzZWQgZm9yIGFuaW1hdGluZyBhIGxpZ2h0ZW5pbmcgZGlzc29sdmUgYmV0d2VlbiB0d28gb2JqZWN0cy5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBleGFtcGxlLCBpZiB0aGUgZGlzcGxheSBvYmplY3QgaGFzIGEgcGl4ZWwgd2l0aCBhbiBSR0IgdmFsdWUgb2ZcclxuXHQgKiAweEFBQTYzMywgYW5kIHRoZSBiYWNrZ3JvdW5kIHBpeGVsIGhhcyBhbiBSR0IgdmFsdWUgb2YgMHhERDIyMDAsIHRoZVxyXG5cdCAqIHJlc3VsdGluZyBSR0IgdmFsdWUgZm9yIHRoZSBkaXNwbGF5ZWQgcGl4ZWwgaXMgMHhGRkM4MzMoYmVjYXVzZSAweEFBICtcclxuXHQgKiAweEREID4gMHhGRiwgMHhBNiArIDB4MjIgPSAweEM4LCBhbmQgMHgzMyArIDB4MDAgPSAweDMzKS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBBREQ6c3RyaW5nID0gXCJhZGRcIjtcclxuXHJcblx0LyoqXHJcblx0ICogQXBwbGllcyB0aGUgYWxwaGEgdmFsdWUgb2YgZWFjaCBwaXhlbCBvZiB0aGUgZGlzcGxheSBvYmplY3QgdG8gdGhlXHJcblx0ICogYmFja2dyb3VuZC4gVGhpcyByZXF1aXJlcyB0aGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGVcclxuXHQgKiBwYXJlbnQgZGlzcGxheSBvYmplY3QgYmUgc2V0IHRvXHJcblx0ICogPGNvZGU+YXdheS5iYXNlLkJsZW5kTW9kZS5MQVlFUjwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5Ob3Qgc3VwcG9ydGVkIHVuZGVyIEdQVSByZW5kZXJpbmcuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgQUxQSEE6c3RyaW5nID0gXCJhbHBoYVwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBTZWxlY3RzIHRoZSBkYXJrZXIgb2YgdGhlIGNvbnN0aXR1ZW50IGNvbG9ycyBvZiB0aGUgZGlzcGxheSBvYmplY3QgYW5kIHRoZVxyXG5cdCAqIGNvbG9ycyBvZiB0aGUgYmFja2dyb3VuZCh0aGUgY29sb3JzIHdpdGggdGhlIHNtYWxsZXIgdmFsdWVzKS4gVGhpc1xyXG5cdCAqIHNldHRpbmcgaXMgY29tbW9ubHkgdXNlZCBmb3Igc3VwZXJpbXBvc2luZyB0eXBlLlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSBwaXhlbCB3aXRoIGFuIFJHQiB2YWx1ZSBvZlxyXG5cdCAqIDB4RkZDQzMzLCBhbmQgdGhlIGJhY2tncm91bmQgcGl4ZWwgaGFzIGFuIFJHQiB2YWx1ZSBvZiAweERERjgwMCwgdGhlXHJcblx0ICogcmVzdWx0aW5nIFJHQiB2YWx1ZSBmb3IgdGhlIGRpc3BsYXllZCBwaXhlbCBpcyAweEREQ0MwMChiZWNhdXNlIDB4RkYgPlxyXG5cdCAqIDB4REQsIDB4Q0MgPCAweEY4LCBhbmQgMHgzMyA+IDB4MDAgPSAzMykuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Tm90IHN1cHBvcnRlZCB1bmRlciBHUFUgcmVuZGVyaW5nLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIERBUktFTjpzdHJpbmcgPSBcImRhcmtlblwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb21wYXJlcyB0aGUgY29uc3RpdHVlbnQgY29sb3JzIG9mIHRoZSBkaXNwbGF5IG9iamVjdCB3aXRoIHRoZSBjb2xvcnMgb2ZcclxuXHQgKiBpdHMgYmFja2dyb3VuZCwgYW5kIHN1YnRyYWN0cyB0aGUgZGFya2VyIG9mIHRoZSB2YWx1ZXMgb2YgdGhlIHR3b1xyXG5cdCAqIGNvbnN0aXR1ZW50IGNvbG9ycyBmcm9tIHRoZSBsaWdodGVyIHZhbHVlLiBUaGlzIHNldHRpbmcgaXMgY29tbW9ubHkgdXNlZFxyXG5cdCAqIGZvciBtb3JlIHZpYnJhbnQgY29sb3JzLlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSBwaXhlbCB3aXRoIGFuIFJHQiB2YWx1ZSBvZlxyXG5cdCAqIDB4RkZDQzMzLCBhbmQgdGhlIGJhY2tncm91bmQgcGl4ZWwgaGFzIGFuIFJHQiB2YWx1ZSBvZiAweERERjgwMCwgdGhlXHJcblx0ICogcmVzdWx0aW5nIFJHQiB2YWx1ZSBmb3IgdGhlIGRpc3BsYXllZCBwaXhlbCBpcyAweDIyMkMzMyhiZWNhdXNlIDB4RkYgLVxyXG5cdCAqIDB4REQgPSAweDIyLCAweEY4IC0gMHhDQyA9IDB4MkMsIGFuZCAweDMzIC0gMHgwMCA9IDB4MzMpLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIERJRkZFUkVOQ0U6c3RyaW5nID0gXCJkaWZmZXJlbmNlXCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVyYXNlcyB0aGUgYmFja2dyb3VuZCBiYXNlZCBvbiB0aGUgYWxwaGEgdmFsdWUgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBUaGlzXHJcblx0ICogcHJvY2VzcyByZXF1aXJlcyB0aGF0IHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBwYXJlbnRcclxuXHQgKiBkaXNwbGF5IG9iamVjdCBiZSBzZXQgdG8gPGNvZGU+Zmxhc2guZGlzcGxheS5CbGVuZE1vZGUuTEFZRVI8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+Tm90IHN1cHBvcnRlZCB1bmRlciBHUFUgcmVuZGVyaW5nLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIEVSQVNFOnN0cmluZyA9IFwiZXJhc2VcIjtcclxuXHJcblx0LyoqXHJcblx0ICogQWRqdXN0cyB0aGUgY29sb3Igb2YgZWFjaCBwaXhlbCBiYXNlZCBvbiB0aGUgZGFya25lc3Mgb2YgdGhlIGRpc3BsYXlcclxuXHQgKiBvYmplY3QuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyBsaWdodGVyIHRoYW4gNTAlIGdyYXksIHRoZSBkaXNwbGF5IG9iamVjdFxyXG5cdCAqIGFuZCBiYWNrZ3JvdW5kIGNvbG9ycyBhcmUgc2NyZWVuZWQsIHdoaWNoIHJlc3VsdHMgaW4gYSBsaWdodGVyIGNvbG9yLiBJZlxyXG5cdCAqIHRoZSBkaXNwbGF5IG9iamVjdCBpcyBkYXJrZXIgdGhhbiA1MCUgZ3JheSwgdGhlIGNvbG9ycyBhcmUgbXVsdGlwbGllZCxcclxuXHQgKiB3aGljaCByZXN1bHRzIGluIGEgZGFya2VyIGNvbG9yLiBUaGlzIHNldHRpbmcgaXMgY29tbW9ubHkgdXNlZCBmb3Igc2hhZGluZ1xyXG5cdCAqIGVmZmVjdHMuXHJcblx0ICpcclxuXHQgKiA8cD5Ob3Qgc3VwcG9ydGVkIHVuZGVyIEdQVSByZW5kZXJpbmcuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgSEFSRExJR0hUOnN0cmluZyA9IFwiaGFyZGxpZ2h0XCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEludmVydHMgdGhlIGJhY2tncm91bmQuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBJTlZFUlQ6c3RyaW5nID0gXCJpbnZlcnRcIjtcclxuXHJcblx0LyoqXHJcblx0ICogRm9yY2VzIHRoZSBjcmVhdGlvbiBvZiBhIHRyYW5zcGFyZW5jeSBncm91cCBmb3IgdGhlIGRpc3BsYXkgb2JqZWN0LiBUaGlzXHJcblx0ICogbWVhbnMgdGhhdCB0aGUgZGlzcGxheSBvYmplY3QgaXMgcHJlY29tcG9zZWQgaW4gYSB0ZW1wb3JhcnkgYnVmZmVyIGJlZm9yZVxyXG5cdCAqIGl0IGlzIHByb2Nlc3NlZCBmdXJ0aGVyLiBUaGUgcHJlY29tcG9zaXRpb24gaXMgZG9uZSBhdXRvbWF0aWNhbGx5IGlmIHRoZVxyXG5cdCAqIGRpc3BsYXkgb2JqZWN0IGlzIHByZWNhY2hlZCBieSBtZWFucyBvZiBiaXRtYXAgY2FjaGluZyBvciBpZiB0aGUgZGlzcGxheVxyXG5cdCAqIG9iamVjdCBpcyBhIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciB0aGF0IGhhcyBhdCBsZWFzdCBvbmUgY2hpbGQgb2JqZWN0XHJcblx0ICogd2l0aCBhIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gc2V0dGluZyBvdGhlciB0aGFuIDxjb2RlPlwibm9ybWFsXCI8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+Tm90IHN1cHBvcnRlZCB1bmRlciBHUFUgcmVuZGVyaW5nLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIExBWUVSOnN0cmluZyA9IFwibGF5ZXJcIjtcclxuXHJcblx0LyoqXHJcblx0ICogU2VsZWN0cyB0aGUgbGlnaHRlciBvZiB0aGUgY29uc3RpdHVlbnQgY29sb3JzIG9mIHRoZSBkaXNwbGF5IG9iamVjdCBhbmRcclxuXHQgKiB0aGUgY29sb3JzIG9mIHRoZSBiYWNrZ3JvdW5kKHRoZSBjb2xvcnMgd2l0aCB0aGUgbGFyZ2VyIHZhbHVlcykuIFRoaXNcclxuXHQgKiBzZXR0aW5nIGlzIGNvbW1vbmx5IHVzZWQgZm9yIHN1cGVyaW1wb3NpbmcgdHlwZS5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBleGFtcGxlLCBpZiB0aGUgZGlzcGxheSBvYmplY3QgaGFzIGEgcGl4ZWwgd2l0aCBhbiBSR0IgdmFsdWUgb2ZcclxuXHQgKiAweEZGQ0MzMywgYW5kIHRoZSBiYWNrZ3JvdW5kIHBpeGVsIGhhcyBhbiBSR0IgdmFsdWUgb2YgMHhEREY4MDAsIHRoZVxyXG5cdCAqIHJlc3VsdGluZyBSR0IgdmFsdWUgZm9yIHRoZSBkaXNwbGF5ZWQgcGl4ZWwgaXMgMHhGRkY4MzMoYmVjYXVzZSAweEZGID5cclxuXHQgKiAweERELCAweENDIDwgMHhGOCwgYW5kIDB4MzMgPiAweDAwID0gMzMpLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPk5vdCBzdXBwb3J0ZWQgdW5kZXIgR1BVIHJlbmRlcmluZy48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBMSUdIVEVOOnN0cmluZyA9IFwibGlnaHRlblwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBNdWx0aXBsaWVzIHRoZSB2YWx1ZXMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnN0aXR1ZW50IGNvbG9ycyBieSB0aGVcclxuXHQgKiBjb25zdGl0dWVudCBjb2xvcnMgb2YgdGhlIGJhY2tncm91bmQgY29sb3IsIGFuZCBub3JtYWxpemVzIGJ5IGRpdmlkaW5nIGJ5XHJcblx0ICogMHhGRiwgcmVzdWx0aW5nIGluIGRhcmtlciBjb2xvcnMuIFRoaXMgc2V0dGluZyBpcyBjb21tb25seSB1c2VkIGZvclxyXG5cdCAqIHNoYWRvd3MgYW5kIGRlcHRoIGVmZmVjdHMuXHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgaWYgYSBjb25zdGl0dWVudCBjb2xvcihzdWNoIGFzIHJlZCkgb2Ygb25lIHBpeGVsIGluIHRoZVxyXG5cdCAqIGRpc3BsYXkgb2JqZWN0IGFuZCB0aGUgY29ycmVzcG9uZGluZyBjb2xvciBvZiB0aGUgcGl4ZWwgaW4gdGhlIGJhY2tncm91bmRcclxuXHQgKiBib3RoIGhhdmUgdGhlIHZhbHVlIDB4ODgsIHRoZSBtdWx0aXBsaWVkIHJlc3VsdCBpcyAweDQ4NDAuIERpdmlkaW5nIGJ5XHJcblx0ICogMHhGRiB5aWVsZHMgYSB2YWx1ZSBvZiAweDQ4IGZvciB0aGF0IGNvbnN0aXR1ZW50IGNvbG9yLCB3aGljaCBpcyBhIGRhcmtlclxyXG5cdCAqIHNoYWRlIHRoYW4gdGhlIGNvbG9yIG9mIHRoZSBkaXNwbGF5IG9iamVjdCBvciB0aGUgY29sb3Igb2YgdGhlXHJcblx0ICogYmFja2dyb3VuZC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBNVUxUSVBMWTpzdHJpbmcgPSBcIm11bHRpcGx5XCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBkaXNwbGF5IG9iamVjdCBhcHBlYXJzIGluIGZyb250IG9mIHRoZSBiYWNrZ3JvdW5kLiBQaXhlbCB2YWx1ZXMgb2YgdGhlXHJcblx0ICogZGlzcGxheSBvYmplY3Qgb3ZlcnJpZGUgdGhlIHBpeGVsIHZhbHVlcyBvZiB0aGUgYmFja2dyb3VuZC4gV2hlcmUgdGhlXHJcblx0ICogZGlzcGxheSBvYmplY3QgaXMgdHJhbnNwYXJlbnQsIHRoZSBiYWNrZ3JvdW5kIGlzIHZpc2libGUuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBOT1JNQUw6c3RyaW5nID0gXCJub3JtYWxcIjtcclxuXHJcblx0LyoqXHJcblx0ICogQWRqdXN0cyB0aGUgY29sb3Igb2YgZWFjaCBwaXhlbCBiYXNlZCBvbiB0aGUgZGFya25lc3Mgb2YgdGhlIGJhY2tncm91bmQuXHJcblx0ICogSWYgdGhlIGJhY2tncm91bmQgaXMgbGlnaHRlciB0aGFuIDUwJSBncmF5LCB0aGUgZGlzcGxheSBvYmplY3QgYW5kXHJcblx0ICogYmFja2dyb3VuZCBjb2xvcnMgYXJlIHNjcmVlbmVkLCB3aGljaCByZXN1bHRzIGluIGEgbGlnaHRlciBjb2xvci4gSWYgdGhlXHJcblx0ICogYmFja2dyb3VuZCBpcyBkYXJrZXIgdGhhbiA1MCUgZ3JheSwgdGhlIGNvbG9ycyBhcmUgbXVsdGlwbGllZCwgd2hpY2hcclxuXHQgKiByZXN1bHRzIGluIGEgZGFya2VyIGNvbG9yLiBUaGlzIHNldHRpbmcgaXMgY29tbW9ubHkgdXNlZCBmb3Igc2hhZGluZ1xyXG5cdCAqIGVmZmVjdHMuXHJcblx0ICpcclxuXHQgKiA8cD5Ob3Qgc3VwcG9ydGVkIHVuZGVyIEdQVSByZW5kZXJpbmcuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgT1ZFUkxBWTpzdHJpbmcgPSBcIm92ZXJsYXlcIjtcclxuXHJcblx0LyoqXHJcblx0ICogTXVsdGlwbGllcyB0aGUgY29tcGxlbWVudChpbnZlcnNlKSBvZiB0aGUgZGlzcGxheSBvYmplY3QgY29sb3IgYnkgdGhlXHJcblx0ICogY29tcGxlbWVudCBvZiB0aGUgYmFja2dyb3VuZCBjb2xvciwgcmVzdWx0aW5nIGluIGEgYmxlYWNoaW5nIGVmZmVjdC4gVGhpc1xyXG5cdCAqIHNldHRpbmcgaXMgY29tbW9ubHkgdXNlZCBmb3IgaGlnaGxpZ2h0cyBvciB0byByZW1vdmUgYmxhY2sgYXJlYXMgb2YgdGhlXHJcblx0ICogZGlzcGxheSBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBTQ1JFRU46c3RyaW5nID0gXCJzY3JlZW5cIjtcclxuXHJcblx0LyoqXHJcblx0ICogVXNlcyBhIHNoYWRlciB0byBkZWZpbmUgdGhlIGJsZW5kIGJldHdlZW4gb2JqZWN0cy5cclxuXHQgKlxyXG5cdCAqIDxwPlNldHRpbmcgdGhlIDxjb2RlPmJsZW5kU2hhZGVyPC9jb2RlPiBwcm9wZXJ0eSB0byBhIFNoYWRlciBpbnN0YW5jZVxyXG5cdCAqIGF1dG9tYXRpY2FsbHkgc2V0cyB0aGUgZGlzcGxheSBvYmplY3QncyA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IHRvXHJcblx0ICogPGNvZGU+QmxlbmRNb2RlLlNIQURFUjwvY29kZT4uIElmIHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IGlzXHJcblx0ICogc2V0IHRvIDxjb2RlPkJsZW5kTW9kZS5TSEFERVI8L2NvZGU+IHdpdGhvdXQgZmlyc3Qgc2V0dGluZyB0aGVcclxuXHQgKiA8Y29kZT5ibGVuZFNoYWRlcjwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IGlzXHJcblx0ICogc2V0IHRvIDxjb2RlPkJsZW5kTW9kZS5OT1JNQUw8L2NvZGU+IGluc3RlYWQuIElmIHRoZVxyXG5cdCAqIDxjb2RlPmJsZW5kU2hhZGVyPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQod2hpY2ggc2V0cyB0aGVcclxuXHQgKiA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPkJsZW5kTW9kZS5TSEFERVI8L2NvZGU+KSwgdGhlblxyXG5cdCAqIGxhdGVyIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBwcm9wZXJ0eSBpcyBjaGFuZ2VkLCB0aGVcclxuXHQgKiBibGVuZCBtb2RlIGNhbiBiZSByZXNldCB0byB1c2UgdGhlIGJsZW5kIHNoYWRlciBzaW1wbHkgYnkgc2V0dGluZyB0aGVcclxuXHQgKiA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPkJsZW5kTW9kZS5TSEFERVI8L2NvZGU+LiBUaGVcclxuXHQgKiA8Y29kZT5ibGVuZFNoYWRlcjwvY29kZT4gcHJvcGVydHkgZG9lcyBub3QgbmVlZCB0byBiZSBzZXQgYWdhaW4gZXhjZXB0IHRvXHJcblx0ICogY2hhbmdlIHRoZSBzaGFkZXIgdGhhdCdzIHVzZWQgdG8gZGVmaW5lIHRoZSBibGVuZCBtb2RlLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPk5vdCBzdXBwb3J0ZWQgdW5kZXIgR1BVIHJlbmRlcmluZy48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBTSEFERVI6c3RyaW5nID0gXCJzaGFkZXJcIjtcclxuXHJcblx0LyoqXHJcblx0ICogU3VidHJhY3RzIHRoZSB2YWx1ZXMgb2YgdGhlIGNvbnN0aXR1ZW50IGNvbG9ycyBpbiB0aGUgZGlzcGxheSBvYmplY3QgZnJvbVxyXG5cdCAqIHRoZSB2YWx1ZXMgb2YgdGhlIGJhY2tncm91bmQgY29sb3IsIGFwcGx5aW5nIGEgZmxvb3Igb2YgMC4gVGhpcyBzZXR0aW5nIGlzXHJcblx0ICogY29tbW9ubHkgdXNlZCBmb3IgYW5pbWF0aW5nIGEgZGFya2VuaW5nIGRpc3NvbHZlIGJldHdlZW4gdHdvIG9iamVjdHMuXHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgaWYgdGhlIGRpc3BsYXkgb2JqZWN0IGhhcyBhIHBpeGVsIHdpdGggYW4gUkdCIHZhbHVlIG9mXHJcblx0ICogMHhBQTIyMzMsIGFuZCB0aGUgYmFja2dyb3VuZCBwaXhlbCBoYXMgYW4gUkdCIHZhbHVlIG9mIDB4RERBNjAwLCB0aGVcclxuXHQgKiByZXN1bHRpbmcgUkdCIHZhbHVlIGZvciB0aGUgZGlzcGxheWVkIHBpeGVsIGlzIDB4MzM4NDAwKGJlY2F1c2UgMHhERCAtXHJcblx0ICogMHhBQSA9IDB4MzMsIDB4QTYgLSAweDIyID0gMHg4NCwgYW5kIDB4MDAgLSAweDMzIDwgMHgwMCkuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgU1VCVFJBQ1Q6c3RyaW5nID0gXCJzdWJ0cmFjdFwiO1xyXG59XHJcblxyXG5leHBvcnQgPSBCbGVuZE1vZGU7Il19