var ColorUtils = require("awayjs-core/lib/utils/ColorUtils");
/**
 * The ColorTransform class lets you adjust the color values in a display
 * object. The color adjustment or <i>color transformation</i> can be applied
 * to all four channels: red, green, blue, and alpha transparency.
 *
 * <p>When a ColorTransform object is applied to a display object, a new value
 * for each color channel is calculated like this:</p>
 *
 * <ul>
 *   <li>New red value = (old red value * <code>redMultiplier</code>) +
 * <code>redOffset</code></li>
 *   <li>New green value = (old green value * <code>greenMultiplier</code>) +
 * <code>greenOffset</code></li>
 *   <li>New blue value = (old blue value * <code>blueMultiplier</code>) +
 * <code>blueOffset</code></li>
 *   <li>New alpha value = (old alpha value * <code>alphaMultiplier</code>) +
 * <code>alphaOffset</code></li>
 * </ul>
 *
 * <p>If any of the color channel values is greater than 255 after the
 * calculation, it is set to 255. If it is less than 0, it is set to 0.</p>
 *
 * <p>You can use ColorTransform objects in the following ways:</p>
 *
 * <ul>
 *   <li>In the <code>colorTransform</code> parameter of the
 * <code>colorTransform()</code> method of the BitmapData class</li>
 *   <li>As the <code>colorTransform</code> property of a Transform object
 * (which can be used as the <code>transform</code> property of a display
 * object)</li>
 * </ul>
 *
 * <p>You must use the <code>new ColorTransform()</code> constructor to create
 * a ColorTransform object before you can call the methods of the
 * ColorTransform object.</p>
 *
 * <p>Color transformations do not apply to the background color of a movie
 * clip(such as a loaded SWF object). They apply only to graphics and symbols
 * that are attached to the movie clip.</p>
 */
var ColorTransform = (function () {
    /**
     * Creates a ColorTransform object for a display object with the specified
     * color channel values and alpha values.
     *
     * @param redMultiplier   The value for the red multiplier, in the range from
     *                        0 to 1.
     * @param greenMultiplier The value for the green multiplier, in the range
     *                        from 0 to 1.
     * @param blueMultiplier  The value for the blue multiplier, in the range
     *                        from 0 to 1.
     * @param alphaMultiplier The value for the alpha transparency multiplier, in
     *                        the range from 0 to 1.
     * @param redOffset       The offset value for the red color channel, in the
     *                        range from -255 to 255.
     * @param greenOffset     The offset value for the green color channel, in
     *                        the range from -255 to 255.
     * @param blueOffset      The offset for the blue color channel value, in the
     *                        range from -255 to 255.
     * @param alphaOffset     The offset for alpha transparency channel value, in
     *                        the range from -255 to 255.
     */
    function ColorTransform(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
        if (redMultiplier === void 0) { redMultiplier = 1; }
        if (greenMultiplier === void 0) { greenMultiplier = 1; }
        if (blueMultiplier === void 0) { blueMultiplier = 1; }
        if (alphaMultiplier === void 0) { alphaMultiplier = 1; }
        if (redOffset === void 0) { redOffset = 0; }
        if (greenOffset === void 0) { greenOffset = 0; }
        if (blueOffset === void 0) { blueOffset = 0; }
        if (alphaOffset === void 0) { alphaOffset = 0; }
        this.redMultiplier = redMultiplier;
        this.greenMultiplier = greenMultiplier;
        this.blueMultiplier = blueMultiplier;
        this.alphaMultiplier = alphaMultiplier;
        this.redOffset = redOffset;
        this.greenOffset = greenOffset;
        this.blueOffset = blueOffset;
        this.alphaOffset = alphaOffset;
    }
    Object.defineProperty(ColorTransform.prototype, "color", {
        /**
         * The RGB color value for a ColorTransform object.
         *
         * <p>When you set this property, it changes the three color offset values
         * (<code>redOffset</code>, <code>greenOffset</code>, and
         * <code>blueOffset</code>) accordingly, and it sets the three color
         * multiplier values(<code>redMultiplier</code>,
         * <code>greenMultiplier</code>, and <code>blueMultiplier</code>) to 0. The
         * alpha transparency multiplier and offset values do not change.</p>
         *
         * <p>When you pass a value for this property, use the format
         * 0x<i>RRGGBB</i>. <i>RR</i>, <i>GG</i>, and <i>BB</i> each consist of two
         * hexadecimal digits that specify the offset of each color component. The 0x
         * tells the ActionScript compiler that the number is a hexadecimal
         * value.</p>
         */
        get: function () {
            return ((this.redOffset << 16) | (this.greenOffset << 8) | this.blueOffset);
        },
        set: function (value) {
            var argb = ColorUtils.float32ColorToARGB(value);
            this.redOffset = argb[1]; //(value >> 16) & 0xFF;
            this.greenOffset = argb[2]; //(value >> 8) & 0xFF;
            this.blueOffset = argb[3]; //value & 0xFF;
            this.redMultiplier = 0;
            this.greenMultiplier = 0;
            this.blueMultiplier = 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Concatenates the ColorTranform object specified by the <code>second</code>
     * parameter with the current ColorTransform object and sets the current
     * object as the result, which is an additive combination of the two color
     * transformations. When you apply the concatenated ColorTransform object,
     * the effect is the same as applying the <code>second</code> color
     * transformation after the <i>original</i> color transformation.
     *
     * @param second The ColorTransform object to be combined with the current
     *               ColorTransform object.
     */
    ColorTransform.prototype.concat = function (second) {
        this.redMultiplier += second.redMultiplier;
        this.greenMultiplier += second.greenMultiplier;
        this.blueMultiplier += second.blueMultiplier;
        this.alphaMultiplier += second.alphaMultiplier;
    };
    return ColorTransform;
})();
module.exports = ColorTransform;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL0NvbG9yVHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbIkNvbG9yVHJhbnNmb3JtIiwiQ29sb3JUcmFuc2Zvcm0uY29uc3RydWN0b3IiLCJDb2xvclRyYW5zZm9ybS5jb2xvciIsIkNvbG9yVHJhbnNmb3JtLmNvbmNhdCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxVQUFVLFdBQWMsa0NBQWtDLENBQUMsQ0FBQztBQUVuRSxBQXdDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxjQUFjO0lBdUZuQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHQTtJQUNIQSxTQTVHS0EsY0FBY0EsQ0E0R1BBLGFBQXdCQSxFQUFFQSxlQUEwQkEsRUFBRUEsY0FBeUJBLEVBQUVBLGVBQTBCQSxFQUFFQSxTQUFvQkEsRUFBRUEsV0FBc0JBLEVBQUVBLFVBQXFCQSxFQUFFQSxXQUFzQkE7UUFBeE1DLDZCQUF3QkEsR0FBeEJBLGlCQUF3QkE7UUFBRUEsK0JBQTBCQSxHQUExQkEsbUJBQTBCQTtRQUFFQSw4QkFBeUJBLEdBQXpCQSxrQkFBeUJBO1FBQUVBLCtCQUEwQkEsR0FBMUJBLG1CQUEwQkE7UUFBRUEseUJBQW9CQSxHQUFwQkEsYUFBb0JBO1FBQUVBLDJCQUFzQkEsR0FBdEJBLGVBQXNCQTtRQUFFQSwwQkFBcUJBLEdBQXJCQSxjQUFxQkE7UUFBRUEsMkJBQXNCQSxHQUF0QkEsZUFBc0JBO1FBRW5OQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxhQUFhQSxDQUFDQTtRQUNuQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsZUFBZUEsQ0FBQ0E7UUFDdkNBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLGNBQWNBLENBQUNBO1FBQ3JDQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxlQUFlQSxDQUFDQTtRQUN2Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0E7UUFDM0JBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFdBQVdBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsV0FBV0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBakRERCxzQkFBV0EsaUNBQUtBO1FBaEJoQkE7Ozs7Ozs7Ozs7Ozs7OztXQWVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFBQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUM3RUEsQ0FBQ0E7YUFFREYsVUFBaUJBLEtBQVlBO1lBRTVCRSxJQUFJQSxJQUFJQSxHQUFZQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRXpEQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSx1QkFBdUJBO1lBQ2xEQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSxzQkFBc0JBO1lBQ25EQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSxlQUFlQTtZQUUzQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQWJBRjtJQWdEREE7Ozs7Ozs7Ozs7T0FVR0E7SUFDSUEsK0JBQU1BLEdBQWJBLFVBQWNBLE1BQXFCQTtRQUVsQ0csSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDM0NBLElBQUlBLENBQUNBLGVBQWVBLElBQUlBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBO1FBQy9DQSxJQUFJQSxDQUFDQSxjQUFjQSxJQUFJQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM3Q0EsSUFBSUEsQ0FBQ0EsZUFBZUEsSUFBSUEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7SUFDaERBLENBQUNBO0lBQ0ZILHFCQUFDQTtBQUFEQSxDQTFJQSxBQTBJQ0EsSUFBQTtBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJnZW9tL0NvbG9yVHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xvclV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvQ29sb3JVdGlsc1wiKTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ29sb3JUcmFuc2Zvcm0gY2xhc3MgbGV0cyB5b3UgYWRqdXN0IHRoZSBjb2xvciB2YWx1ZXMgaW4gYSBkaXNwbGF5XHJcbiAqIG9iamVjdC4gVGhlIGNvbG9yIGFkanVzdG1lbnQgb3IgPGk+Y29sb3IgdHJhbnNmb3JtYXRpb248L2k+IGNhbiBiZSBhcHBsaWVkXHJcbiAqIHRvIGFsbCBmb3VyIGNoYW5uZWxzOiByZWQsIGdyZWVuLCBibHVlLCBhbmQgYWxwaGEgdHJhbnNwYXJlbmN5LlxyXG4gKlxyXG4gKiA8cD5XaGVuIGEgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IGlzIGFwcGxpZWQgdG8gYSBkaXNwbGF5IG9iamVjdCwgYSBuZXcgdmFsdWVcclxuICogZm9yIGVhY2ggY29sb3IgY2hhbm5lbCBpcyBjYWxjdWxhdGVkIGxpa2UgdGhpczo8L3A+XHJcbiAqXHJcbiAqIDx1bD5cclxuICogICA8bGk+TmV3IHJlZCB2YWx1ZSA9IChvbGQgcmVkIHZhbHVlICogPGNvZGU+cmVkTXVsdGlwbGllcjwvY29kZT4pICtcclxuICogPGNvZGU+cmVkT2Zmc2V0PC9jb2RlPjwvbGk+XHJcbiAqICAgPGxpPk5ldyBncmVlbiB2YWx1ZSA9IChvbGQgZ3JlZW4gdmFsdWUgKiA8Y29kZT5ncmVlbk11bHRpcGxpZXI8L2NvZGU+KSArXHJcbiAqIDxjb2RlPmdyZWVuT2Zmc2V0PC9jb2RlPjwvbGk+XHJcbiAqICAgPGxpPk5ldyBibHVlIHZhbHVlID0gKG9sZCBibHVlIHZhbHVlICogPGNvZGU+Ymx1ZU11bHRpcGxpZXI8L2NvZGU+KSArXHJcbiAqIDxjb2RlPmJsdWVPZmZzZXQ8L2NvZGU+PC9saT5cclxuICogICA8bGk+TmV3IGFscGhhIHZhbHVlID0gKG9sZCBhbHBoYSB2YWx1ZSAqIDxjb2RlPmFscGhhTXVsdGlwbGllcjwvY29kZT4pICtcclxuICogPGNvZGU+YWxwaGFPZmZzZXQ8L2NvZGU+PC9saT5cclxuICogPC91bD5cclxuICpcclxuICogPHA+SWYgYW55IG9mIHRoZSBjb2xvciBjaGFubmVsIHZhbHVlcyBpcyBncmVhdGVyIHRoYW4gMjU1IGFmdGVyIHRoZVxyXG4gKiBjYWxjdWxhdGlvbiwgaXQgaXMgc2V0IHRvIDI1NS4gSWYgaXQgaXMgbGVzcyB0aGFuIDAsIGl0IGlzIHNldCB0byAwLjwvcD5cclxuICpcclxuICogPHA+WW91IGNhbiB1c2UgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0cyBpbiB0aGUgZm9sbG93aW5nIHdheXM6PC9wPlxyXG4gKlxyXG4gKiA8dWw+XHJcbiAqICAgPGxpPkluIHRoZSA8Y29kZT5jb2xvclRyYW5zZm9ybTwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZVxyXG4gKiA8Y29kZT5jb2xvclRyYW5zZm9ybSgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIEJpdG1hcERhdGEgY2xhc3M8L2xpPlxyXG4gKiAgIDxsaT5BcyB0aGUgPGNvZGU+Y29sb3JUcmFuc2Zvcm08L2NvZGU+IHByb3BlcnR5IG9mIGEgVHJhbnNmb3JtIG9iamVjdFxyXG4gKiAod2hpY2ggY2FuIGJlIHVzZWQgYXMgdGhlIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkgb2YgYSBkaXNwbGF5XHJcbiAqIG9iamVjdCk8L2xpPlxyXG4gKiA8L3VsPlxyXG4gKlxyXG4gKiA8cD5Zb3UgbXVzdCB1c2UgdGhlIDxjb2RlPm5ldyBDb2xvclRyYW5zZm9ybSgpPC9jb2RlPiBjb25zdHJ1Y3RvciB0byBjcmVhdGVcclxuICogYSBDb2xvclRyYW5zZm9ybSBvYmplY3QgYmVmb3JlIHlvdSBjYW4gY2FsbCB0aGUgbWV0aG9kcyBvZiB0aGVcclxuICogQ29sb3JUcmFuc2Zvcm0gb2JqZWN0LjwvcD5cclxuICpcclxuICogPHA+Q29sb3IgdHJhbnNmb3JtYXRpb25zIGRvIG5vdCBhcHBseSB0byB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiBhIG1vdmllXHJcbiAqIGNsaXAoc3VjaCBhcyBhIGxvYWRlZCBTV0Ygb2JqZWN0KS4gVGhleSBhcHBseSBvbmx5IHRvIGdyYXBoaWNzIGFuZCBzeW1ib2xzXHJcbiAqIHRoYXQgYXJlIGF0dGFjaGVkIHRvIHRoZSBtb3ZpZSBjbGlwLjwvcD5cclxuICovXHJcbmNsYXNzIENvbG9yVHJhbnNmb3JtXHJcbntcclxuXHQvKipcclxuXHQgKiBBIGRlY2ltYWwgdmFsdWUgdGhhdCBpcyBtdWx0aXBsaWVkIHdpdGggdGhlIGFscGhhIHRyYW5zcGFyZW5jeSBjaGFubmVsXHJcblx0ICogdmFsdWUuXHJcblx0ICpcclxuXHQgKiA8cD5JZiB5b3Ugc2V0IHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWUgb2YgYSBkaXNwbGF5IG9iamVjdCBkaXJlY3RseSBieVxyXG5cdCAqIHVzaW5nIHRoZSA8Y29kZT5hbHBoYTwvY29kZT4gcHJvcGVydHkgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGl0XHJcblx0ICogYWZmZWN0cyB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPmFscGhhTXVsdGlwbGllcjwvY29kZT4gcHJvcGVydHkgb2YgdGhhdFxyXG5cdCAqIGRpc3BsYXkgb2JqZWN0J3MgPGNvZGU+dHJhbnNmb3JtLmNvbG9yVHJhbnNmb3JtPC9jb2RlPiBwcm9wZXJ0eS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGFscGhhTXVsdGlwbGllcjpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgbnVtYmVyIGZyb20gLTI1NSB0byAyNTUgdGhhdCBpcyBhZGRlZCB0byB0aGUgYWxwaGEgdHJhbnNwYXJlbmN5IGNoYW5uZWxcclxuXHQgKiB2YWx1ZSBhZnRlciBpdCBoYXMgYmVlbiBtdWx0aXBsaWVkIGJ5IHRoZSA8Y29kZT5hbHBoYU11bHRpcGxpZXI8L2NvZGU+XHJcblx0ICogdmFsdWUuXHJcblx0ICovXHJcblx0cHVibGljIGFscGhhT2Zmc2V0Om51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBkZWNpbWFsIHZhbHVlIHRoYXQgaXMgbXVsdGlwbGllZCB3aXRoIHRoZSBibHVlIGNoYW5uZWwgdmFsdWUuXHJcblx0ICovXHJcblx0cHVibGljIGJsdWVNdWx0aXBsaWVyOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBudW1iZXIgZnJvbSAtMjU1IHRvIDI1NSB0aGF0IGlzIGFkZGVkIHRvIHRoZSBibHVlIGNoYW5uZWwgdmFsdWUgYWZ0ZXIgaXRcclxuXHQgKiBoYXMgYmVlbiBtdWx0aXBsaWVkIGJ5IHRoZSA8Y29kZT5ibHVlTXVsdGlwbGllcjwvY29kZT4gdmFsdWUuXHJcblx0ICovXHJcblx0cHVibGljIGJsdWVPZmZzZXQ6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIGRlY2ltYWwgdmFsdWUgdGhhdCBpcyBtdWx0aXBsaWVkIHdpdGggdGhlIGdyZWVuIGNoYW5uZWwgdmFsdWUuXHJcblx0ICovXHJcblx0cHVibGljIGdyZWVuTXVsdGlwbGllcjpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgbnVtYmVyIGZyb20gLTI1NSB0byAyNTUgdGhhdCBpcyBhZGRlZCB0byB0aGUgZ3JlZW4gY2hhbm5lbCB2YWx1ZSBhZnRlclxyXG5cdCAqIGl0IGhhcyBiZWVuIG11bHRpcGxpZWQgYnkgdGhlIDxjb2RlPmdyZWVuTXVsdGlwbGllcjwvY29kZT4gdmFsdWUuXHJcblx0ICovXHJcblx0cHVibGljIGdyZWVuT2Zmc2V0Om51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBkZWNpbWFsIHZhbHVlIHRoYXQgaXMgbXVsdGlwbGllZCB3aXRoIHRoZSByZWQgY2hhbm5lbCB2YWx1ZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVkTXVsdGlwbGllcjpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgbnVtYmVyIGZyb20gLTI1NSB0byAyNTUgdGhhdCBpcyBhZGRlZCB0byB0aGUgcmVkIGNoYW5uZWwgdmFsdWUgYWZ0ZXIgaXRcclxuXHQgKiBoYXMgYmVlbiBtdWx0aXBsaWVkIGJ5IHRoZSA8Y29kZT5yZWRNdWx0aXBsaWVyPC9jb2RlPiB2YWx1ZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVkT2Zmc2V0Om51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIFJHQiBjb2xvciB2YWx1ZSBmb3IgYSBDb2xvclRyYW5zZm9ybSBvYmplY3QuXHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIHlvdSBzZXQgdGhpcyBwcm9wZXJ0eSwgaXQgY2hhbmdlcyB0aGUgdGhyZWUgY29sb3Igb2Zmc2V0IHZhbHVlc1xyXG5cdCAqICg8Y29kZT5yZWRPZmZzZXQ8L2NvZGU+LCA8Y29kZT5ncmVlbk9mZnNldDwvY29kZT4sIGFuZFxyXG5cdCAqIDxjb2RlPmJsdWVPZmZzZXQ8L2NvZGU+KSBhY2NvcmRpbmdseSwgYW5kIGl0IHNldHMgdGhlIHRocmVlIGNvbG9yXHJcblx0ICogbXVsdGlwbGllciB2YWx1ZXMoPGNvZGU+cmVkTXVsdGlwbGllcjwvY29kZT4sXHJcblx0ICogPGNvZGU+Z3JlZW5NdWx0aXBsaWVyPC9jb2RlPiwgYW5kIDxjb2RlPmJsdWVNdWx0aXBsaWVyPC9jb2RlPikgdG8gMC4gVGhlXHJcblx0ICogYWxwaGEgdHJhbnNwYXJlbmN5IG11bHRpcGxpZXIgYW5kIG9mZnNldCB2YWx1ZXMgZG8gbm90IGNoYW5nZS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIHlvdSBwYXNzIGEgdmFsdWUgZm9yIHRoaXMgcHJvcGVydHksIHVzZSB0aGUgZm9ybWF0XHJcblx0ICogMHg8aT5SUkdHQkI8L2k+LiA8aT5SUjwvaT4sIDxpPkdHPC9pPiwgYW5kIDxpPkJCPC9pPiBlYWNoIGNvbnNpc3Qgb2YgdHdvXHJcblx0ICogaGV4YWRlY2ltYWwgZGlnaXRzIHRoYXQgc3BlY2lmeSB0aGUgb2Zmc2V0IG9mIGVhY2ggY29sb3IgY29tcG9uZW50LiBUaGUgMHhcclxuXHQgKiB0ZWxscyB0aGUgQWN0aW9uU2NyaXB0IGNvbXBpbGVyIHRoYXQgdGhlIG51bWJlciBpcyBhIGhleGFkZWNpbWFsXHJcblx0ICogdmFsdWUuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY29sb3IoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4oKHRoaXMucmVkT2Zmc2V0IDw8IDE2KSB8ICggdGhpcy5ncmVlbk9mZnNldCA8PCA4KSB8IHRoaXMuYmx1ZU9mZnNldCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR2YXIgYXJnYjpudW1iZXJbXSA9IENvbG9yVXRpbHMuZmxvYXQzMkNvbG9yVG9BUkdCKHZhbHVlKTtcclxuXHJcblx0XHR0aGlzLnJlZE9mZnNldCA9IGFyZ2JbMV07ICAvLyh2YWx1ZSA+PiAxNikgJiAweEZGO1xyXG5cdFx0dGhpcy5ncmVlbk9mZnNldCA9IGFyZ2JbMl07ICAvLyh2YWx1ZSA+PiA4KSAmIDB4RkY7XHJcblx0XHR0aGlzLmJsdWVPZmZzZXQgPSBhcmdiWzNdOyAgLy92YWx1ZSAmIDB4RkY7XHJcblxyXG5cdFx0dGhpcy5yZWRNdWx0aXBsaWVyID0gMDtcclxuXHRcdHRoaXMuZ3JlZW5NdWx0aXBsaWVyID0gMDtcclxuXHRcdHRoaXMuYmx1ZU11bHRpcGxpZXIgPSAwO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIENvbG9yVHJhbnNmb3JtIG9iamVjdCBmb3IgYSBkaXNwbGF5IG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWRcclxuXHQgKiBjb2xvciBjaGFubmVsIHZhbHVlcyBhbmQgYWxwaGEgdmFsdWVzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlZE11bHRpcGxpZXIgICBUaGUgdmFsdWUgZm9yIHRoZSByZWQgbXVsdGlwbGllciwgaW4gdGhlIHJhbmdlIGZyb21cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgIDAgdG8gMS5cclxuXHQgKiBAcGFyYW0gZ3JlZW5NdWx0aXBsaWVyIFRoZSB2YWx1ZSBmb3IgdGhlIGdyZWVuIG11bHRpcGxpZXIsIGluIHRoZSByYW5nZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAwIHRvIDEuXHJcblx0ICogQHBhcmFtIGJsdWVNdWx0aXBsaWVyICBUaGUgdmFsdWUgZm9yIHRoZSBibHVlIG11bHRpcGxpZXIsIGluIHRoZSByYW5nZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAwIHRvIDEuXHJcblx0ICogQHBhcmFtIGFscGhhTXVsdGlwbGllciBUaGUgdmFsdWUgZm9yIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgbXVsdGlwbGllciwgaW5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgIHRoZSByYW5nZSBmcm9tIDAgdG8gMS5cclxuXHQgKiBAcGFyYW0gcmVkT2Zmc2V0ICAgICAgIFRoZSBvZmZzZXQgdmFsdWUgZm9yIHRoZSByZWQgY29sb3IgY2hhbm5lbCwgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICByYW5nZSBmcm9tIC0yNTUgdG8gMjU1LlxyXG5cdCAqIEBwYXJhbSBncmVlbk9mZnNldCAgICAgVGhlIG9mZnNldCB2YWx1ZSBmb3IgdGhlIGdyZWVuIGNvbG9yIGNoYW5uZWwsIGluXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICB0aGUgcmFuZ2UgZnJvbSAtMjU1IHRvIDI1NS5cclxuXHQgKiBAcGFyYW0gYmx1ZU9mZnNldCAgICAgIFRoZSBvZmZzZXQgZm9yIHRoZSBibHVlIGNvbG9yIGNoYW5uZWwgdmFsdWUsIGluIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgZnJvbSAtMjU1IHRvIDI1NS5cclxuXHQgKiBAcGFyYW0gYWxwaGFPZmZzZXQgICAgIFRoZSBvZmZzZXQgZm9yIGFscGhhIHRyYW5zcGFyZW5jeSBjaGFubmVsIHZhbHVlLCBpblxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHJhbmdlIGZyb20gLTI1NSB0byAyNTUuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IocmVkTXVsdGlwbGllcjpudW1iZXIgPSAxLCBncmVlbk11bHRpcGxpZXI6bnVtYmVyID0gMSwgYmx1ZU11bHRpcGxpZXI6bnVtYmVyID0gMSwgYWxwaGFNdWx0aXBsaWVyOm51bWJlciA9IDEsIHJlZE9mZnNldDpudW1iZXIgPSAwLCBncmVlbk9mZnNldDpudW1iZXIgPSAwLCBibHVlT2Zmc2V0Om51bWJlciA9IDAsIGFscGhhT2Zmc2V0Om51bWJlciA9IDApXHJcblx0e1xyXG5cdFx0dGhpcy5yZWRNdWx0aXBsaWVyID0gcmVkTXVsdGlwbGllcjtcclxuXHRcdHRoaXMuZ3JlZW5NdWx0aXBsaWVyID0gZ3JlZW5NdWx0aXBsaWVyO1xyXG5cdFx0dGhpcy5ibHVlTXVsdGlwbGllciA9IGJsdWVNdWx0aXBsaWVyO1xyXG5cdFx0dGhpcy5hbHBoYU11bHRpcGxpZXIgPSBhbHBoYU11bHRpcGxpZXI7XHJcblx0XHR0aGlzLnJlZE9mZnNldCA9IHJlZE9mZnNldDtcclxuXHRcdHRoaXMuZ3JlZW5PZmZzZXQgPSBncmVlbk9mZnNldDtcclxuXHRcdHRoaXMuYmx1ZU9mZnNldCA9IGJsdWVPZmZzZXQ7XHJcblx0XHR0aGlzLmFscGhhT2Zmc2V0ID0gYWxwaGFPZmZzZXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25jYXRlbmF0ZXMgdGhlIENvbG9yVHJhbmZvcm0gb2JqZWN0IHNwZWNpZmllZCBieSB0aGUgPGNvZGU+c2Vjb25kPC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlciB3aXRoIHRoZSBjdXJyZW50IENvbG9yVHJhbnNmb3JtIG9iamVjdCBhbmQgc2V0cyB0aGUgY3VycmVudFxyXG5cdCAqIG9iamVjdCBhcyB0aGUgcmVzdWx0LCB3aGljaCBpcyBhbiBhZGRpdGl2ZSBjb21iaW5hdGlvbiBvZiB0aGUgdHdvIGNvbG9yXHJcblx0ICogdHJhbnNmb3JtYXRpb25zLiBXaGVuIHlvdSBhcHBseSB0aGUgY29uY2F0ZW5hdGVkIENvbG9yVHJhbnNmb3JtIG9iamVjdCxcclxuXHQgKiB0aGUgZWZmZWN0IGlzIHRoZSBzYW1lIGFzIGFwcGx5aW5nIHRoZSA8Y29kZT5zZWNvbmQ8L2NvZGU+IGNvbG9yXHJcblx0ICogdHJhbnNmb3JtYXRpb24gYWZ0ZXIgdGhlIDxpPm9yaWdpbmFsPC9pPiBjb2xvciB0cmFuc2Zvcm1hdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzZWNvbmQgVGhlIENvbG9yVHJhbnNmb3JtIG9iamVjdCB0byBiZSBjb21iaW5lZCB3aXRoIHRoZSBjdXJyZW50XHJcblx0ICogICAgICAgICAgICAgICBDb2xvclRyYW5zZm9ybSBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGNvbmNhdChzZWNvbmQ6Q29sb3JUcmFuc2Zvcm0pOnZvaWRcclxuXHR7XHJcblx0XHR0aGlzLnJlZE11bHRpcGxpZXIgKz0gc2Vjb25kLnJlZE11bHRpcGxpZXI7XHJcblx0XHR0aGlzLmdyZWVuTXVsdGlwbGllciArPSBzZWNvbmQuZ3JlZW5NdWx0aXBsaWVyO1xyXG5cdFx0dGhpcy5ibHVlTXVsdGlwbGllciArPSBzZWNvbmQuYmx1ZU11bHRpcGxpZXI7XHJcblx0XHR0aGlzLmFscGhhTXVsdGlwbGllciArPSBzZWNvbmQuYWxwaGFNdWx0aXBsaWVyO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQ29sb3JUcmFuc2Zvcm07Il19