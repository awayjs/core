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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL0NvbG9yVHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbIkNvbG9yVHJhbnNmb3JtIiwiQ29sb3JUcmFuc2Zvcm0uY29uc3RydWN0b3IiLCJDb2xvclRyYW5zZm9ybS5jb2xvciIsIkNvbG9yVHJhbnNmb3JtLmNvbmNhdCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxVQUFVLFdBQWMsa0NBQWtDLENBQUMsQ0FBQztBQUVuRSxBQXdDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxjQUFjO0lBdUZuQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHQTtJQUNIQSxTQTVHS0EsY0FBY0EsQ0E0R1BBLGFBQXdCQSxFQUFFQSxlQUEwQkEsRUFBRUEsY0FBeUJBLEVBQUVBLGVBQTBCQSxFQUFFQSxTQUFvQkEsRUFBRUEsV0FBc0JBLEVBQUVBLFVBQXFCQSxFQUFFQSxXQUFzQkE7UUFBeE1DLDZCQUF3QkEsR0FBeEJBLGlCQUF3QkE7UUFBRUEsK0JBQTBCQSxHQUExQkEsbUJBQTBCQTtRQUFFQSw4QkFBeUJBLEdBQXpCQSxrQkFBeUJBO1FBQUVBLCtCQUEwQkEsR0FBMUJBLG1CQUEwQkE7UUFBRUEseUJBQW9CQSxHQUFwQkEsYUFBb0JBO1FBQUVBLDJCQUFzQkEsR0FBdEJBLGVBQXNCQTtRQUFFQSwwQkFBcUJBLEdBQXJCQSxjQUFxQkE7UUFBRUEsMkJBQXNCQSxHQUF0QkEsZUFBc0JBO1FBRW5OQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxhQUFhQSxDQUFDQTtRQUNuQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsZUFBZUEsQ0FBQ0E7UUFDdkNBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLGNBQWNBLENBQUNBO1FBQ3JDQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxlQUFlQSxDQUFDQTtRQUN2Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0E7UUFDM0JBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFdBQVdBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsV0FBV0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBakRERCxzQkFBV0EsaUNBQUtBO1FBaEJoQkE7Ozs7Ozs7Ozs7Ozs7OztXQWVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFBQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUM3RUEsQ0FBQ0E7YUFFREYsVUFBaUJBLEtBQVlBO1lBRTVCRSxJQUFJQSxJQUFJQSxHQUFZQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRXpEQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSx1QkFBdUJBO1lBQ2xEQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSxzQkFBc0JBO1lBQ25EQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSxlQUFlQTtZQUUzQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQWJBRjtJQWdEREE7Ozs7Ozs7Ozs7T0FVR0E7SUFDSUEsK0JBQU1BLEdBQWJBLFVBQWNBLE1BQXFCQTtRQUVsQ0csSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDM0NBLElBQUlBLENBQUNBLGVBQWVBLElBQUlBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBO1FBQy9DQSxJQUFJQSxDQUFDQSxjQUFjQSxJQUFJQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM3Q0EsSUFBSUEsQ0FBQ0EsZUFBZUEsSUFBSUEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7SUFDaERBLENBQUNBO0lBQ0ZILHFCQUFDQTtBQUFEQSxDQTFJQSxBQTBJQ0EsSUFBQTtBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJnZW9tL0NvbG9yVHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xvclV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvQ29sb3JVdGlsc1wiKTtcblxuLyoqXG4gKiBUaGUgQ29sb3JUcmFuc2Zvcm0gY2xhc3MgbGV0cyB5b3UgYWRqdXN0IHRoZSBjb2xvciB2YWx1ZXMgaW4gYSBkaXNwbGF5XG4gKiBvYmplY3QuIFRoZSBjb2xvciBhZGp1c3RtZW50IG9yIDxpPmNvbG9yIHRyYW5zZm9ybWF0aW9uPC9pPiBjYW4gYmUgYXBwbGllZFxuICogdG8gYWxsIGZvdXIgY2hhbm5lbHM6IHJlZCwgZ3JlZW4sIGJsdWUsIGFuZCBhbHBoYSB0cmFuc3BhcmVuY3kuXG4gKlxuICogPHA+V2hlbiBhIENvbG9yVHJhbnNmb3JtIG9iamVjdCBpcyBhcHBsaWVkIHRvIGEgZGlzcGxheSBvYmplY3QsIGEgbmV3IHZhbHVlXG4gKiBmb3IgZWFjaCBjb2xvciBjaGFubmVsIGlzIGNhbGN1bGF0ZWQgbGlrZSB0aGlzOjwvcD5cbiAqXG4gKiA8dWw+XG4gKiAgIDxsaT5OZXcgcmVkIHZhbHVlID0gKG9sZCByZWQgdmFsdWUgKiA8Y29kZT5yZWRNdWx0aXBsaWVyPC9jb2RlPikgK1xuICogPGNvZGU+cmVkT2Zmc2V0PC9jb2RlPjwvbGk+XG4gKiAgIDxsaT5OZXcgZ3JlZW4gdmFsdWUgPSAob2xkIGdyZWVuIHZhbHVlICogPGNvZGU+Z3JlZW5NdWx0aXBsaWVyPC9jb2RlPikgK1xuICogPGNvZGU+Z3JlZW5PZmZzZXQ8L2NvZGU+PC9saT5cbiAqICAgPGxpPk5ldyBibHVlIHZhbHVlID0gKG9sZCBibHVlIHZhbHVlICogPGNvZGU+Ymx1ZU11bHRpcGxpZXI8L2NvZGU+KSArXG4gKiA8Y29kZT5ibHVlT2Zmc2V0PC9jb2RlPjwvbGk+XG4gKiAgIDxsaT5OZXcgYWxwaGEgdmFsdWUgPSAob2xkIGFscGhhIHZhbHVlICogPGNvZGU+YWxwaGFNdWx0aXBsaWVyPC9jb2RlPikgK1xuICogPGNvZGU+YWxwaGFPZmZzZXQ8L2NvZGU+PC9saT5cbiAqIDwvdWw+XG4gKlxuICogPHA+SWYgYW55IG9mIHRoZSBjb2xvciBjaGFubmVsIHZhbHVlcyBpcyBncmVhdGVyIHRoYW4gMjU1IGFmdGVyIHRoZVxuICogY2FsY3VsYXRpb24sIGl0IGlzIHNldCB0byAyNTUuIElmIGl0IGlzIGxlc3MgdGhhbiAwLCBpdCBpcyBzZXQgdG8gMC48L3A+XG4gKlxuICogPHA+WW91IGNhbiB1c2UgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0cyBpbiB0aGUgZm9sbG93aW5nIHdheXM6PC9wPlxuICpcbiAqIDx1bD5cbiAqICAgPGxpPkluIHRoZSA8Y29kZT5jb2xvclRyYW5zZm9ybTwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZVxuICogPGNvZGU+Y29sb3JUcmFuc2Zvcm0oKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBCaXRtYXBEYXRhIGNsYXNzPC9saT5cbiAqICAgPGxpPkFzIHRoZSA8Y29kZT5jb2xvclRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkgb2YgYSBUcmFuc2Zvcm0gb2JqZWN0XG4gKiAod2hpY2ggY2FuIGJlIHVzZWQgYXMgdGhlIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkgb2YgYSBkaXNwbGF5XG4gKiBvYmplY3QpPC9saT5cbiAqIDwvdWw+XG4gKlxuICogPHA+WW91IG11c3QgdXNlIHRoZSA8Y29kZT5uZXcgQ29sb3JUcmFuc2Zvcm0oKTwvY29kZT4gY29uc3RydWN0b3IgdG8gY3JlYXRlXG4gKiBhIENvbG9yVHJhbnNmb3JtIG9iamVjdCBiZWZvcmUgeW91IGNhbiBjYWxsIHRoZSBtZXRob2RzIG9mIHRoZVxuICogQ29sb3JUcmFuc2Zvcm0gb2JqZWN0LjwvcD5cbiAqXG4gKiA8cD5Db2xvciB0cmFuc2Zvcm1hdGlvbnMgZG8gbm90IGFwcGx5IHRvIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIGEgbW92aWVcbiAqIGNsaXAoc3VjaCBhcyBhIGxvYWRlZCBTV0Ygb2JqZWN0KS4gVGhleSBhcHBseSBvbmx5IHRvIGdyYXBoaWNzIGFuZCBzeW1ib2xzXG4gKiB0aGF0IGFyZSBhdHRhY2hlZCB0byB0aGUgbW92aWUgY2xpcC48L3A+XG4gKi9cbmNsYXNzIENvbG9yVHJhbnNmb3JtXG57XG5cdC8qKlxuXHQgKiBBIGRlY2ltYWwgdmFsdWUgdGhhdCBpcyBtdWx0aXBsaWVkIHdpdGggdGhlIGFscGhhIHRyYW5zcGFyZW5jeSBjaGFubmVsXG5cdCAqIHZhbHVlLlxuXHQgKlxuXHQgKiA8cD5JZiB5b3Ugc2V0IHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWUgb2YgYSBkaXNwbGF5IG9iamVjdCBkaXJlY3RseSBieVxuXHQgKiB1c2luZyB0aGUgPGNvZGU+YWxwaGE8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpdFxuXHQgKiBhZmZlY3RzIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+YWxwaGFNdWx0aXBsaWVyPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGF0XG5cdCAqIGRpc3BsYXkgb2JqZWN0J3MgPGNvZGU+dHJhbnNmb3JtLmNvbG9yVHJhbnNmb3JtPC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgYWxwaGFNdWx0aXBsaWVyOm51bWJlcjtcblxuXHQvKipcblx0ICogQSBudW1iZXIgZnJvbSAtMjU1IHRvIDI1NSB0aGF0IGlzIGFkZGVkIHRvIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgY2hhbm5lbFxuXHQgKiB2YWx1ZSBhZnRlciBpdCBoYXMgYmVlbiBtdWx0aXBsaWVkIGJ5IHRoZSA8Y29kZT5hbHBoYU11bHRpcGxpZXI8L2NvZGU+XG5cdCAqIHZhbHVlLlxuXHQgKi9cblx0cHVibGljIGFscGhhT2Zmc2V0Om51bWJlcjtcblxuXHQvKipcblx0ICogQSBkZWNpbWFsIHZhbHVlIHRoYXQgaXMgbXVsdGlwbGllZCB3aXRoIHRoZSBibHVlIGNoYW5uZWwgdmFsdWUuXG5cdCAqL1xuXHRwdWJsaWMgYmx1ZU11bHRpcGxpZXI6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBBIG51bWJlciBmcm9tIC0yNTUgdG8gMjU1IHRoYXQgaXMgYWRkZWQgdG8gdGhlIGJsdWUgY2hhbm5lbCB2YWx1ZSBhZnRlciBpdFxuXHQgKiBoYXMgYmVlbiBtdWx0aXBsaWVkIGJ5IHRoZSA8Y29kZT5ibHVlTXVsdGlwbGllcjwvY29kZT4gdmFsdWUuXG5cdCAqL1xuXHRwdWJsaWMgYmx1ZU9mZnNldDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIEEgZGVjaW1hbCB2YWx1ZSB0aGF0IGlzIG11bHRpcGxpZWQgd2l0aCB0aGUgZ3JlZW4gY2hhbm5lbCB2YWx1ZS5cblx0ICovXG5cdHB1YmxpYyBncmVlbk11bHRpcGxpZXI6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBBIG51bWJlciBmcm9tIC0yNTUgdG8gMjU1IHRoYXQgaXMgYWRkZWQgdG8gdGhlIGdyZWVuIGNoYW5uZWwgdmFsdWUgYWZ0ZXJcblx0ICogaXQgaGFzIGJlZW4gbXVsdGlwbGllZCBieSB0aGUgPGNvZGU+Z3JlZW5NdWx0aXBsaWVyPC9jb2RlPiB2YWx1ZS5cblx0ICovXG5cdHB1YmxpYyBncmVlbk9mZnNldDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIEEgZGVjaW1hbCB2YWx1ZSB0aGF0IGlzIG11bHRpcGxpZWQgd2l0aCB0aGUgcmVkIGNoYW5uZWwgdmFsdWUuXG5cdCAqL1xuXHRwdWJsaWMgcmVkTXVsdGlwbGllcjpudW1iZXI7XG5cblx0LyoqXG5cdCAqIEEgbnVtYmVyIGZyb20gLTI1NSB0byAyNTUgdGhhdCBpcyBhZGRlZCB0byB0aGUgcmVkIGNoYW5uZWwgdmFsdWUgYWZ0ZXIgaXRcblx0ICogaGFzIGJlZW4gbXVsdGlwbGllZCBieSB0aGUgPGNvZGU+cmVkTXVsdGlwbGllcjwvY29kZT4gdmFsdWUuXG5cdCAqL1xuXHRwdWJsaWMgcmVkT2Zmc2V0Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIFJHQiBjb2xvciB2YWx1ZSBmb3IgYSBDb2xvclRyYW5zZm9ybSBvYmplY3QuXG5cdCAqXG5cdCAqIDxwPldoZW4geW91IHNldCB0aGlzIHByb3BlcnR5LCBpdCBjaGFuZ2VzIHRoZSB0aHJlZSBjb2xvciBvZmZzZXQgdmFsdWVzXG5cdCAqICg8Y29kZT5yZWRPZmZzZXQ8L2NvZGU+LCA8Y29kZT5ncmVlbk9mZnNldDwvY29kZT4sIGFuZFxuXHQgKiA8Y29kZT5ibHVlT2Zmc2V0PC9jb2RlPikgYWNjb3JkaW5nbHksIGFuZCBpdCBzZXRzIHRoZSB0aHJlZSBjb2xvclxuXHQgKiBtdWx0aXBsaWVyIHZhbHVlcyg8Y29kZT5yZWRNdWx0aXBsaWVyPC9jb2RlPixcblx0ICogPGNvZGU+Z3JlZW5NdWx0aXBsaWVyPC9jb2RlPiwgYW5kIDxjb2RlPmJsdWVNdWx0aXBsaWVyPC9jb2RlPikgdG8gMC4gVGhlXG5cdCAqIGFscGhhIHRyYW5zcGFyZW5jeSBtdWx0aXBsaWVyIGFuZCBvZmZzZXQgdmFsdWVzIGRvIG5vdCBjaGFuZ2UuPC9wPlxuXHQgKlxuXHQgKiA8cD5XaGVuIHlvdSBwYXNzIGEgdmFsdWUgZm9yIHRoaXMgcHJvcGVydHksIHVzZSB0aGUgZm9ybWF0XG5cdCAqIDB4PGk+UlJHR0JCPC9pPi4gPGk+UlI8L2k+LCA8aT5HRzwvaT4sIGFuZCA8aT5CQjwvaT4gZWFjaCBjb25zaXN0IG9mIHR3b1xuXHQgKiBoZXhhZGVjaW1hbCBkaWdpdHMgdGhhdCBzcGVjaWZ5IHRoZSBvZmZzZXQgb2YgZWFjaCBjb2xvciBjb21wb25lbnQuIFRoZSAweFxuXHQgKiB0ZWxscyB0aGUgQWN0aW9uU2NyaXB0IGNvbXBpbGVyIHRoYXQgdGhlIG51bWJlciBpcyBhIGhleGFkZWNpbWFsXG5cdCAqIHZhbHVlLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgY29sb3IoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybigodGhpcy5yZWRPZmZzZXQgPDwgMTYpIHwgKCB0aGlzLmdyZWVuT2Zmc2V0IDw8IDgpIHwgdGhpcy5ibHVlT2Zmc2V0KTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgY29sb3IodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIGFyZ2I6bnVtYmVyW10gPSBDb2xvclV0aWxzLmZsb2F0MzJDb2xvclRvQVJHQih2YWx1ZSk7XG5cblx0XHR0aGlzLnJlZE9mZnNldCA9IGFyZ2JbMV07ICAvLyh2YWx1ZSA+PiAxNikgJiAweEZGO1xuXHRcdHRoaXMuZ3JlZW5PZmZzZXQgPSBhcmdiWzJdOyAgLy8odmFsdWUgPj4gOCkgJiAweEZGO1xuXHRcdHRoaXMuYmx1ZU9mZnNldCA9IGFyZ2JbM107ICAvL3ZhbHVlICYgMHhGRjtcblxuXHRcdHRoaXMucmVkTXVsdGlwbGllciA9IDA7XG5cdFx0dGhpcy5ncmVlbk11bHRpcGxpZXIgPSAwO1xuXHRcdHRoaXMuYmx1ZU11bHRpcGxpZXIgPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBDb2xvclRyYW5zZm9ybSBvYmplY3QgZm9yIGEgZGlzcGxheSBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkXG5cdCAqIGNvbG9yIGNoYW5uZWwgdmFsdWVzIGFuZCBhbHBoYSB2YWx1ZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSByZWRNdWx0aXBsaWVyICAgVGhlIHZhbHVlIGZvciB0aGUgcmVkIG11bHRpcGxpZXIsIGluIHRoZSByYW5nZSBmcm9tXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgMCB0byAxLlxuXHQgKiBAcGFyYW0gZ3JlZW5NdWx0aXBsaWVyIFRoZSB2YWx1ZSBmb3IgdGhlIGdyZWVuIG11bHRpcGxpZXIsIGluIHRoZSByYW5nZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gMCB0byAxLlxuXHQgKiBAcGFyYW0gYmx1ZU11bHRpcGxpZXIgIFRoZSB2YWx1ZSBmb3IgdGhlIGJsdWUgbXVsdGlwbGllciwgaW4gdGhlIHJhbmdlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAwIHRvIDEuXG5cdCAqIEBwYXJhbSBhbHBoYU11bHRpcGxpZXIgVGhlIHZhbHVlIGZvciB0aGUgYWxwaGEgdHJhbnNwYXJlbmN5IG11bHRpcGxpZXIsIGluXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHJhbmdlIGZyb20gMCB0byAxLlxuXHQgKiBAcGFyYW0gcmVkT2Zmc2V0ICAgICAgIFRoZSBvZmZzZXQgdmFsdWUgZm9yIHRoZSByZWQgY29sb3IgY2hhbm5lbCwgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgZnJvbSAtMjU1IHRvIDI1NS5cblx0ICogQHBhcmFtIGdyZWVuT2Zmc2V0ICAgICBUaGUgb2Zmc2V0IHZhbHVlIGZvciB0aGUgZ3JlZW4gY29sb3IgY2hhbm5lbCwgaW5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICB0aGUgcmFuZ2UgZnJvbSAtMjU1IHRvIDI1NS5cblx0ICogQHBhcmFtIGJsdWVPZmZzZXQgICAgICBUaGUgb2Zmc2V0IGZvciB0aGUgYmx1ZSBjb2xvciBjaGFubmVsIHZhbHVlLCBpbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICByYW5nZSBmcm9tIC0yNTUgdG8gMjU1LlxuXHQgKiBAcGFyYW0gYWxwaGFPZmZzZXQgICAgIFRoZSBvZmZzZXQgZm9yIGFscGhhIHRyYW5zcGFyZW5jeSBjaGFubmVsIHZhbHVlLCBpblxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgIHRoZSByYW5nZSBmcm9tIC0yNTUgdG8gMjU1LlxuXHQgKi9cblx0Y29uc3RydWN0b3IocmVkTXVsdGlwbGllcjpudW1iZXIgPSAxLCBncmVlbk11bHRpcGxpZXI6bnVtYmVyID0gMSwgYmx1ZU11bHRpcGxpZXI6bnVtYmVyID0gMSwgYWxwaGFNdWx0aXBsaWVyOm51bWJlciA9IDEsIHJlZE9mZnNldDpudW1iZXIgPSAwLCBncmVlbk9mZnNldDpudW1iZXIgPSAwLCBibHVlT2Zmc2V0Om51bWJlciA9IDAsIGFscGhhT2Zmc2V0Om51bWJlciA9IDApXG5cdHtcblx0XHR0aGlzLnJlZE11bHRpcGxpZXIgPSByZWRNdWx0aXBsaWVyO1xuXHRcdHRoaXMuZ3JlZW5NdWx0aXBsaWVyID0gZ3JlZW5NdWx0aXBsaWVyO1xuXHRcdHRoaXMuYmx1ZU11bHRpcGxpZXIgPSBibHVlTXVsdGlwbGllcjtcblx0XHR0aGlzLmFscGhhTXVsdGlwbGllciA9IGFscGhhTXVsdGlwbGllcjtcblx0XHR0aGlzLnJlZE9mZnNldCA9IHJlZE9mZnNldDtcblx0XHR0aGlzLmdyZWVuT2Zmc2V0ID0gZ3JlZW5PZmZzZXQ7XG5cdFx0dGhpcy5ibHVlT2Zmc2V0ID0gYmx1ZU9mZnNldDtcblx0XHR0aGlzLmFscGhhT2Zmc2V0ID0gYWxwaGFPZmZzZXQ7XG5cdH1cblxuXHQvKipcblx0ICogQ29uY2F0ZW5hdGVzIHRoZSBDb2xvclRyYW5mb3JtIG9iamVjdCBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPnNlY29uZDwvY29kZT5cblx0ICogcGFyYW1ldGVyIHdpdGggdGhlIGN1cnJlbnQgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IGFuZCBzZXRzIHRoZSBjdXJyZW50XG5cdCAqIG9iamVjdCBhcyB0aGUgcmVzdWx0LCB3aGljaCBpcyBhbiBhZGRpdGl2ZSBjb21iaW5hdGlvbiBvZiB0aGUgdHdvIGNvbG9yXG5cdCAqIHRyYW5zZm9ybWF0aW9ucy4gV2hlbiB5b3UgYXBwbHkgdGhlIGNvbmNhdGVuYXRlZCBDb2xvclRyYW5zZm9ybSBvYmplY3QsXG5cdCAqIHRoZSBlZmZlY3QgaXMgdGhlIHNhbWUgYXMgYXBwbHlpbmcgdGhlIDxjb2RlPnNlY29uZDwvY29kZT4gY29sb3Jcblx0ICogdHJhbnNmb3JtYXRpb24gYWZ0ZXIgdGhlIDxpPm9yaWdpbmFsPC9pPiBjb2xvciB0cmFuc2Zvcm1hdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHNlY29uZCBUaGUgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IHRvIGJlIGNvbWJpbmVkIHdpdGggdGhlIGN1cnJlbnRcblx0ICogICAgICAgICAgICAgICBDb2xvclRyYW5zZm9ybSBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY29uY2F0KHNlY29uZDpDb2xvclRyYW5zZm9ybSk6dm9pZFxuXHR7XG5cdFx0dGhpcy5yZWRNdWx0aXBsaWVyICs9IHNlY29uZC5yZWRNdWx0aXBsaWVyO1xuXHRcdHRoaXMuZ3JlZW5NdWx0aXBsaWVyICs9IHNlY29uZC5ncmVlbk11bHRpcGxpZXI7XG5cdFx0dGhpcy5ibHVlTXVsdGlwbGllciArPSBzZWNvbmQuYmx1ZU11bHRpcGxpZXI7XG5cdFx0dGhpcy5hbHBoYU11bHRpcGxpZXIgKz0gc2Vjb25kLmFscGhhTXVsdGlwbGllcjtcblx0fVxufVxuXG5leHBvcnQgPSBDb2xvclRyYW5zZm9ybTsiXX0=