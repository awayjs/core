/**
 * The Point object represents a location in a two-dimensional coordinate
 * system, where <i>x</i> represents the horizontal axis and <i>y</i>
 * represents the vertical axis.
 *
 * <p>The following code creates a point at(0,0):</p>
 *
 * <p>Methods and properties of the following classes use Point objects:</p>
 *
 * <ul>
 *   <li>BitmapData</li>
 *   <li>DisplayObject</li>
 *   <li>DisplayObjectContainer</li>
 *   <li>DisplacementMapFilter</li>
 *   <li>NativeWindow</li>
 *   <li>Matrix</li>
 *   <li>Rectangle</li>
 * </ul>
 *
 * <p>You can use the <code>new Point()</code> constructor to create a Point
 * object.</p>
 */
var Point = (function () {
    /**
     * Creates a new point. If you pass no parameters to this method, a point is
     * created at(0,0).
     *
     * @param x The horizontal coordinate.
     * @param y The vertical coordinate.
     */
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Point.prototype, "length", {
        /**
         * The length of the line segment from(0,0) to this point.
         */
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds the coordinates of another point to the coordinates of this point to
     * create a new point.
     *
     * @param v The point to be added.
     * @return The new point.
     */
    Point.prototype.add = function (v) {
        return new Point(this.x + v.x, this.y + v.y);
    };
    /**
     * Creates a copy of this Point object.
     *
     * @return The new Point object.
     */
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.copyFrom = function (sourcePoint) {
    };
    /**
     * Determines whether two points are equal. Two points are equal if they have
     * the same <i>x</i> and <i>y</i> values.
     *
     * @param toCompare The point to be compared.
     * @return A value of <code>true</code> if the object is equal to this Point
     *         object; <code>false</code> if it is not equal.
     */
    Point.prototype.equals = function (toCompare) {
        return (this.x == toCompare.x && this.y == toCompare.y);
    };
    /**
     * Scales the line segment between(0,0) and the current point to a set
     * length.
     *
     * @param thickness The scaling value. For example, if the current point is
     *                 (0,5), and you normalize it to 1, the point returned is
     *                  at(0,1).
     */
    Point.prototype.normalize = function (thickness) {
        if (thickness === void 0) { thickness = 1; }
        if (this.length != 0) {
            var invLength = thickness / this.length;
            this.x *= invLength;
            this.y *= invLength;
            return;
        }
        throw "Cannot divide by zero length.";
    };
    /**
     * Offsets the Point object by the specified amount. The value of
     * <code>dx</code> is added to the original value of <i>x</i> to create the
     * new <i>x</i> value. The value of <code>dy</code> is added to the original
     * value of <i>y</i> to create the new <i>y</i> value.
     *
     * @param dx The amount by which to offset the horizontal coordinate,
     *           <i>x</i>.
     * @param dy The amount by which to offset the vertical coordinate, <i>y</i>.
     */
    Point.prototype.offset = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    Point.prototype.setTo = function (xa, ya) {
    };
    /**
     * Subtracts the coordinates of another point from the coordinates of this
     * point to create a new point.
     *
     * @param v The point to be subtracted.
     * @return The new point.
     */
    Point.prototype.subtract = function (v) {
        return new Point(this.x - v.x, this.y - v.y);
    };
    /**
     * Returns a string that contains the values of the <i>x</i> and <i>y</i>
     * coordinates. The string has the form <code>"(x=<i>x</i>,
     * y=<i>y</i>)"</code>, so calling the <code>toString()</code> method for a
     * point at 23,17 would return <code>"(x=23, y=17)"</code>.
     *
     * @return The string representation of the coordinates.
     */
    Point.prototype.toString = function () {
        return "[Point] (x=" + this.x + ", y=" + this.y + ")";
    };
    /**
     * Returns the distance between <code>pt1</code> and <code>pt2</code>.
     *
     * @param pt1 The first point.
     * @param pt2 The second point.
     * @return The distance between the first and second points.
     */
    Point.distance = function (pt1, pt2) {
        var dx = pt2.x - pt1.x;
        var dy = pt2.y - pt1.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    /**
     * Determines a point between two specified points. The parameter
     * <code>f</code> determines where the new interpolated point is located
     * relative to the two end points specified by parameters <code>pt1</code>
     * and <code>pt2</code>. The closer the value of the parameter <code>f</code>
     * is to <code>1.0</code>, the closer the interpolated point is to the first
     * point(parameter <code>pt1</code>). The closer the value of the parameter
     * <code>f</code> is to 0, the closer the interpolated point is to the second
     * point(parameter <code>pt2</code>).
     *
     * @param pt1 The first point.
     * @param pt2 The second point.
     * @param f   The level of interpolation between the two points. Indicates
     *            where the new point will be, along the line between
     *            <code>pt1</code> and <code>pt2</code>. If <code>f</code>=1,
     *            <code>pt1</code> is returned; if <code>f</code>=0,
     *            <code>pt2</code> is returned.
     * @return The new, interpolated point.
     */
    Point.interpolate = function (pt1, pt2, f) {
        return new Point(pt2.x + (pt1.x - pt2.x) * f, pt2.y + (pt1.y - pt2.y) * f);
    };
    /**
     * Converts a pair of polar coordinates to a Cartesian point coordinate.
     *
     * @param len   The length coordinate of the polar pair.
     * @param angle The angle, in radians, of the polar pair.
     * @return The Cartesian point.
     */
    Point.polar = function (len, angle) {
        return new Point(len * Math.cos(angle), len * Math.sin(angle));
    };
    return Point;
})();
module.exports = Point;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50LnRzIl0sIm5hbWVzIjpbIlBvaW50IiwiUG9pbnQuY29uc3RydWN0b3IiLCJQb2ludC5sZW5ndGgiLCJQb2ludC5hZGQiLCJQb2ludC5jbG9uZSIsIlBvaW50LmNvcHlGcm9tIiwiUG9pbnQuZXF1YWxzIiwiUG9pbnQubm9ybWFsaXplIiwiUG9pbnQub2Zmc2V0IiwiUG9pbnQuc2V0VG8iLCJQb2ludC5zdWJ0cmFjdCIsIlBvaW50LnRvU3RyaW5nIiwiUG9pbnQuZGlzdGFuY2UiLCJQb2ludC5pbnRlcnBvbGF0ZSIsIlBvaW50LnBvbGFyIl0sIm1hcHBpbmdzIjoiQUFBQSxBQXNCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxLQUFLO0lBb0JWQTs7Ozs7O09BTUdBO0lBQ0hBLFNBM0JLQSxLQUFLQSxDQTJCRUEsQ0FBWUEsRUFBRUEsQ0FBWUE7UUFBMUJDLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFFckNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO0lBQ1pBLENBQUNBO0lBaEJERCxzQkFBV0EseUJBQU1BO1FBSGpCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakRBLENBQUNBOzs7T0FBQUY7SUFlREE7Ozs7OztPQU1HQTtJQUNJQSxtQkFBR0EsR0FBVkEsVUFBV0EsQ0FBT0E7UUFFakJHLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNB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TUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDeEVBLENBQUNBO0lBRURiOzs7Ozs7T0FNR0E7SUFDV0EsV0FBS0EsR0FBbkJBLFVBQW9CQSxHQUFVQSxFQUFFQSxLQUFZQTtRQUUzQ2MsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDNURBLENBQUNBO0lBQ0ZkLFlBQUNBO0FBQURBLENBNUxBLEFBNExDQSxJQUFBO0FBRUQsQUFBZSxpQkFBTixLQUFLLENBQUMiLCJmaWxlIjoiZ2VvbS9Qb2ludC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBQb2ludCBvYmplY3QgcmVwcmVzZW50cyBhIGxvY2F0aW9uIGluIGEgdHdvLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGVcbiAqIHN5c3RlbSwgd2hlcmUgPGk+eDwvaT4gcmVwcmVzZW50cyB0aGUgaG9yaXpvbnRhbCBheGlzIGFuZCA8aT55PC9pPlxuICogcmVwcmVzZW50cyB0aGUgdmVydGljYWwgYXhpcy5cbiAqXG4gKiA8cD5UaGUgZm9sbG93aW5nIGNvZGUgY3JlYXRlcyBhIHBvaW50IGF0KDAsMCk6PC9wPlxuICpcbiAqIDxwPk1ldGhvZHMgYW5kIHByb3BlcnRpZXMgb2YgdGhlIGZvbGxvd2luZyBjbGFzc2VzIHVzZSBQb2ludCBvYmplY3RzOjwvcD5cbiAqXG4gKiA8dWw+XG4gKiAgIDxsaT5CaXRtYXBEYXRhPC9saT5cbiAqICAgPGxpPkRpc3BsYXlPYmplY3Q8L2xpPlxuICogICA8bGk+RGlzcGxheU9iamVjdENvbnRhaW5lcjwvbGk+XG4gKiAgIDxsaT5EaXNwbGFjZW1lbnRNYXBGaWx0ZXI8L2xpPlxuICogICA8bGk+TmF0aXZlV2luZG93PC9saT5cbiAqICAgPGxpPk1hdHJpeDwvbGk+XG4gKiAgIDxsaT5SZWN0YW5nbGU8L2xpPlxuICogPC91bD5cbiAqXG4gKiA8cD5Zb3UgY2FuIHVzZSB0aGUgPGNvZGU+bmV3IFBvaW50KCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIFBvaW50XG4gKiBvYmplY3QuPC9wPlxuICovXG5jbGFzcyBQb2ludFxue1xuXHQvKipcblx0ICogVGhlIGhvcml6b250YWwgY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDAuXG5cdCAqL1xuXHRwdWJsaWMgeDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB2ZXJ0aWNhbCBjb29yZGluYXRlIG9mIHRoZSBwb2ludC4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgMC5cblx0ICovXG5cdHB1YmxpYyB5Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGxlbmd0aCBvZiB0aGUgbGluZSBzZWdtZW50IGZyb20oMCwwKSB0byB0aGlzIHBvaW50LlxuXHQgKi9cblx0cHVibGljIGdldCBsZW5ndGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiBNYXRoLnNxcnQodGhpcy54KnRoaXMueCArIHRoaXMueSp0aGlzLnkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgcG9pbnQuIElmIHlvdSBwYXNzIG5vIHBhcmFtZXRlcnMgdG8gdGhpcyBtZXRob2QsIGEgcG9pbnQgaXNcblx0ICogY3JlYXRlZCBhdCgwLDApLlxuXHQgKlxuXHQgKiBAcGFyYW0geCBUaGUgaG9yaXpvbnRhbCBjb29yZGluYXRlLlxuXHQgKiBAcGFyYW0geSBUaGUgdmVydGljYWwgY29vcmRpbmF0ZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHg6bnVtYmVyID0gMCwgeTpudW1iZXIgPSAwKVxuXHR7XG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgdGhlIGNvb3JkaW5hdGVzIG9mIGFub3RoZXIgcG9pbnQgdG8gdGhlIGNvb3JkaW5hdGVzIG9mIHRoaXMgcG9pbnQgdG9cblx0ICogY3JlYXRlIGEgbmV3IHBvaW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gdiBUaGUgcG9pbnQgdG8gYmUgYWRkZWQuXG5cdCAqIEByZXR1cm4gVGhlIG5ldyBwb2ludC5cblx0ICovXG5cdHB1YmxpYyBhZGQodjpQb2ludCk6UG9pbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUG9pbnQodGhpcy54ICsgdi54LCB0aGlzLnkgKyB2LnkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgUG9pbnQgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIFRoZSBuZXcgUG9pbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6UG9pbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkpO1xuXHR9XG5cblx0cHVibGljIGNvcHlGcm9tKHNvdXJjZVBvaW50OlBvaW50KVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHBvaW50cyBhcmUgZXF1YWwuIFR3byBwb2ludHMgYXJlIGVxdWFsIGlmIHRoZXkgaGF2ZVxuXHQgKiB0aGUgc2FtZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzLlxuXHQgKlxuXHQgKiBAcGFyYW0gdG9Db21wYXJlIFRoZSBwb2ludCB0byBiZSBjb21wYXJlZC5cblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBvYmplY3QgaXMgZXF1YWwgdG8gdGhpcyBQb2ludFxuXHQgKiAgICAgICAgIG9iamVjdDsgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIGl0IGlzIG5vdCBlcXVhbC5cblx0ICovXG5cdHB1YmxpYyBlcXVhbHModG9Db21wYXJlOlBvaW50KTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMueCA9PSB0b0NvbXBhcmUueCAmJiB0aGlzLnkgPT0gdG9Db21wYXJlLnkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNjYWxlcyB0aGUgbGluZSBzZWdtZW50IGJldHdlZW4oMCwwKSBhbmQgdGhlIGN1cnJlbnQgcG9pbnQgdG8gYSBzZXRcblx0ICogbGVuZ3RoLlxuXHQgKlxuXHQgKiBAcGFyYW0gdGhpY2tuZXNzIFRoZSBzY2FsaW5nIHZhbHVlLiBGb3IgZXhhbXBsZSwgaWYgdGhlIGN1cnJlbnQgcG9pbnQgaXNcblx0ICogICAgICAgICAgICAgICAgICgwLDUpLCBhbmQgeW91IG5vcm1hbGl6ZSBpdCB0byAxLCB0aGUgcG9pbnQgcmV0dXJuZWQgaXNcblx0ICogICAgICAgICAgICAgICAgICBhdCgwLDEpLlxuXHQgKi9cblx0cHVibGljIG5vcm1hbGl6ZSh0aGlja25lc3M6bnVtYmVyID0gMSlcblx0e1xuXHRcdGlmICh0aGlzLmxlbmd0aCAhPSAwKSB7XG5cdFx0XHR2YXIgaW52TGVuZ3RoID0gdGhpY2tuZXNzL3RoaXMubGVuZ3RoO1xuXHRcdFx0dGhpcy54ICo9IGludkxlbmd0aDtcblx0XHRcdHRoaXMueSAqPSBpbnZMZW5ndGg7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRocm93IFwiQ2Fubm90IGRpdmlkZSBieSB6ZXJvIGxlbmd0aC5cIjtcblx0fVxuXG5cdC8qKlxuXHQgKiBPZmZzZXRzIHRoZSBQb2ludCBvYmplY3QgYnkgdGhlIHNwZWNpZmllZCBhbW91bnQuIFRoZSB2YWx1ZSBvZlxuXHQgKiA8Y29kZT5keDwvY29kZT4gaXMgYWRkZWQgdG8gdGhlIG9yaWdpbmFsIHZhbHVlIG9mIDxpPng8L2k+IHRvIGNyZWF0ZSB0aGVcblx0ICogbmV3IDxpPng8L2k+IHZhbHVlLiBUaGUgdmFsdWUgb2YgPGNvZGU+ZHk8L2NvZGU+IGlzIGFkZGVkIHRvIHRoZSBvcmlnaW5hbFxuXHQgKiB2YWx1ZSBvZiA8aT55PC9pPiB0byBjcmVhdGUgdGhlIG5ldyA8aT55PC9pPiB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtIGR4IFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gb2Zmc2V0IHRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUsXG5cdCAqICAgICAgICAgICA8aT54PC9pPi5cblx0ICogQHBhcmFtIGR5IFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gb2Zmc2V0IHRoZSB2ZXJ0aWNhbCBjb29yZGluYXRlLCA8aT55PC9pPi5cblx0ICovXG5cdHB1YmxpYyBvZmZzZXQoZHg6bnVtYmVyLCBkeTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnggKz0gZHg7XG5cdFx0dGhpcy55ICs9IGR5O1xuXHR9XG5cblx0cHVibGljIHNldFRvKHhhOm51bWJlciwgeWE6bnVtYmVyKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJ0cmFjdHMgdGhlIGNvb3JkaW5hdGVzIG9mIGFub3RoZXIgcG9pbnQgZnJvbSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhpc1xuXHQgKiBwb2ludCB0byBjcmVhdGUgYSBuZXcgcG9pbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB2IFRoZSBwb2ludCB0byBiZSBzdWJ0cmFjdGVkLlxuXHQgKiBAcmV0dXJuIFRoZSBuZXcgcG9pbnQuXG5cdCAqL1xuXHRwdWJsaWMgc3VidHJhY3QodjpQb2ludCk6UG9pbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUG9pbnQodGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgdGhhdCBjb250YWlucyB0aGUgdmFsdWVzIG9mIHRoZSA8aT54PC9pPiBhbmQgPGk+eTwvaT5cblx0ICogY29vcmRpbmF0ZXMuIFRoZSBzdHJpbmcgaGFzIHRoZSBmb3JtIDxjb2RlPlwiKHg9PGk+eDwvaT4sXG5cdCAqIHk9PGk+eTwvaT4pXCI8L2NvZGU+LCBzbyBjYWxsaW5nIHRoZSA8Y29kZT50b1N0cmluZygpPC9jb2RlPiBtZXRob2QgZm9yIGFcblx0ICogcG9pbnQgYXQgMjMsMTcgd291bGQgcmV0dXJuIDxjb2RlPlwiKHg9MjMsIHk9MTcpXCI8L2NvZGU+LlxuXHQgKlxuXHQgKiBAcmV0dXJuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGNvb3JkaW5hdGVzLlxuXHQgKi9cblx0cHVibGljIHRvU3RyaW5nKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gXCJbUG9pbnRdICh4PVwiICsgdGhpcy54ICsgXCIsIHk9XCIgKyB0aGlzLnkgKyBcIilcIjtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDxjb2RlPnB0MTwvY29kZT4gYW5kIDxjb2RlPnB0MjwvY29kZT4uXG5cdCAqXG5cdCAqIEBwYXJhbSBwdDEgVGhlIGZpcnN0IHBvaW50LlxuXHQgKiBAcGFyYW0gcHQyIFRoZSBzZWNvbmQgcG9pbnQuXG5cdCAqIEByZXR1cm4gVGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGZpcnN0IGFuZCBzZWNvbmQgcG9pbnRzLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBkaXN0YW5jZShwdDE6UG9pbnQsIHB0MjpQb2ludCk6bnVtYmVyXG5cdHtcblx0XHR2YXIgZHg6bnVtYmVyID0gcHQyLnggLSBwdDEueDtcblx0XHR2YXIgZHk6bnVtYmVyID0gcHQyLnkgLSBwdDEueTtcblxuXHRcdHJldHVybiBNYXRoLnNxcnQoZHgqZHggKyBkeSpkeSk7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyBhIHBvaW50IGJldHdlZW4gdHdvIHNwZWNpZmllZCBwb2ludHMuIFRoZSBwYXJhbWV0ZXJcblx0ICogPGNvZGU+ZjwvY29kZT4gZGV0ZXJtaW5lcyB3aGVyZSB0aGUgbmV3IGludGVycG9sYXRlZCBwb2ludCBpcyBsb2NhdGVkXG5cdCAqIHJlbGF0aXZlIHRvIHRoZSB0d28gZW5kIHBvaW50cyBzcGVjaWZpZWQgYnkgcGFyYW1ldGVycyA8Y29kZT5wdDE8L2NvZGU+XG5cdCAqIGFuZCA8Y29kZT5wdDI8L2NvZGU+LiBUaGUgY2xvc2VyIHRoZSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyIDxjb2RlPmY8L2NvZGU+XG5cdCAqIGlzIHRvIDxjb2RlPjEuMDwvY29kZT4sIHRoZSBjbG9zZXIgdGhlIGludGVycG9sYXRlZCBwb2ludCBpcyB0byB0aGUgZmlyc3Rcblx0ICogcG9pbnQocGFyYW1ldGVyIDxjb2RlPnB0MTwvY29kZT4pLiBUaGUgY2xvc2VyIHRoZSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyXG5cdCAqIDxjb2RlPmY8L2NvZGU+IGlzIHRvIDAsIHRoZSBjbG9zZXIgdGhlIGludGVycG9sYXRlZCBwb2ludCBpcyB0byB0aGUgc2Vjb25kXG5cdCAqIHBvaW50KHBhcmFtZXRlciA8Y29kZT5wdDI8L2NvZGU+KS5cblx0ICpcblx0ICogQHBhcmFtIHB0MSBUaGUgZmlyc3QgcG9pbnQuXG5cdCAqIEBwYXJhbSBwdDIgVGhlIHNlY29uZCBwb2ludC5cblx0ICogQHBhcmFtIGYgICBUaGUgbGV2ZWwgb2YgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzLiBJbmRpY2F0ZXNcblx0ICogICAgICAgICAgICB3aGVyZSB0aGUgbmV3IHBvaW50IHdpbGwgYmUsIGFsb25nIHRoZSBsaW5lIGJldHdlZW5cblx0ICogICAgICAgICAgICA8Y29kZT5wdDE8L2NvZGU+IGFuZCA8Y29kZT5wdDI8L2NvZGU+LiBJZiA8Y29kZT5mPC9jb2RlPj0xLFxuXHQgKiAgICAgICAgICAgIDxjb2RlPnB0MTwvY29kZT4gaXMgcmV0dXJuZWQ7IGlmIDxjb2RlPmY8L2NvZGU+PTAsXG5cdCAqICAgICAgICAgICAgPGNvZGU+cHQyPC9jb2RlPiBpcyByZXR1cm5lZC5cblx0ICogQHJldHVybiBUaGUgbmV3LCBpbnRlcnBvbGF0ZWQgcG9pbnQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGludGVycG9sYXRlKHB0MTpQb2ludCwgcHQyOlBvaW50LCBmOm51bWJlcik6UG9pbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUG9pbnQocHQyLnggKyAocHQxLnggLSBwdDIueCkqZiwgcHQyLnkgKyAocHQxLnkgLSBwdDIueSkqZik7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBwYWlyIG9mIHBvbGFyIGNvb3JkaW5hdGVzIHRvIGEgQ2FydGVzaWFuIHBvaW50IGNvb3JkaW5hdGUuXG5cdCAqXG5cdCAqIEBwYXJhbSBsZW4gICBUaGUgbGVuZ3RoIGNvb3JkaW5hdGUgb2YgdGhlIHBvbGFyIHBhaXIuXG5cdCAqIEBwYXJhbSBhbmdsZSBUaGUgYW5nbGUsIGluIHJhZGlhbnMsIG9mIHRoZSBwb2xhciBwYWlyLlxuXHQgKiBAcmV0dXJuIFRoZSBDYXJ0ZXNpYW4gcG9pbnQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHBvbGFyKGxlbjpudW1iZXIsIGFuZ2xlOm51bWJlcik6UG9pbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUG9pbnQobGVuKk1hdGguY29zKGFuZ2xlKSwgbGVuKk1hdGguc2luKGFuZ2xlKSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gUG9pbnQ7XG4iXX0=