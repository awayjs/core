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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50LnRzIl0sIm5hbWVzIjpbIlBvaW50IiwiUG9pbnQuY29uc3RydWN0b3IiLCJQb2ludC5sZW5ndGgiLCJQb2ludC5hZGQiLCJQb2ludC5jbG9uZSIsIlBvaW50LmNvcHlGcm9tIiwiUG9pbnQuZXF1YWxzIiwiUG9pbnQubm9ybWFsaXplIiwiUG9pbnQub2Zmc2V0IiwiUG9pbnQuc2V0VG8iLCJQb2ludC5zdWJ0cmFjdCIsIlBvaW50LnRvU3RyaW5nIiwiUG9pbnQuZGlzdGFuY2UiLCJQb2ludC5pbnRlcnBvbGF0ZSIsIlBvaW50LnBvbGFyIl0sIm1hcHBpbmdzIjoiQUFBQSxBQXNCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxLQUFLO0lBb0JWQTs7Ozs7O09BTUdBO0lBQ0hBLFNBM0JLQSxLQUFLQSxDQTJCRUEsQ0FBWUEsRUFBRUEsQ0FBWUE7UUFBMUJDLGlCQUFZQSxHQUFaQSxLQUFZQTtRQUFFQSxpQkFBWUEsR0FBWkEsS0FBWUE7UUFFckNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO0lBQ1pBLENBQUNBO0lBaEJERCxzQkFBV0EseUJBQU1BO1FBSGpCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakRBLENBQUNBOzs7T0FBQUY7SUFlREE7Ozs7OztPQU1HQTtJQUNJQSxtQkFBR0EsR0FBVkEsVUFBV0EsQ0FBT0E7UUFFakJHLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNB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TUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDeEVBLENBQUNBO0lBRURiOzs7Ozs7T0FNR0E7SUFDV0EsV0FBS0EsR0FBbkJBLFVBQW9CQSxHQUFVQSxFQUFFQSxLQUFZQTtRQUUzQ2MsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDNURBLENBQUNBO0lBQ0ZkLFlBQUNBO0FBQURBLENBNUxBLEFBNExDQSxJQUFBO0FBRUQsQUFBZSxpQkFBTixLQUFLLENBQUMiLCJmaWxlIjoiZ2VvbS9Qb2ludC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhlIFBvaW50IG9iamVjdCByZXByZXNlbnRzIGEgbG9jYXRpb24gaW4gYSB0d28tZGltZW5zaW9uYWwgY29vcmRpbmF0ZVxyXG4gKiBzeXN0ZW0sIHdoZXJlIDxpPng8L2k+IHJlcHJlc2VudHMgdGhlIGhvcml6b250YWwgYXhpcyBhbmQgPGk+eTwvaT5cclxuICogcmVwcmVzZW50cyB0aGUgdmVydGljYWwgYXhpcy5cclxuICpcclxuICogPHA+VGhlIGZvbGxvd2luZyBjb2RlIGNyZWF0ZXMgYSBwb2ludCBhdCgwLDApOjwvcD5cclxuICpcclxuICogPHA+TWV0aG9kcyBhbmQgcHJvcGVydGllcyBvZiB0aGUgZm9sbG93aW5nIGNsYXNzZXMgdXNlIFBvaW50IG9iamVjdHM6PC9wPlxyXG4gKlxyXG4gKiA8dWw+XHJcbiAqICAgPGxpPkJpdG1hcERhdGE8L2xpPlxyXG4gKiAgIDxsaT5EaXNwbGF5T2JqZWN0PC9saT5cclxuICogICA8bGk+RGlzcGxheU9iamVjdENvbnRhaW5lcjwvbGk+XHJcbiAqICAgPGxpPkRpc3BsYWNlbWVudE1hcEZpbHRlcjwvbGk+XHJcbiAqICAgPGxpPk5hdGl2ZVdpbmRvdzwvbGk+XHJcbiAqICAgPGxpPk1hdHJpeDwvbGk+XHJcbiAqICAgPGxpPlJlY3RhbmdsZTwvbGk+XHJcbiAqIDwvdWw+XHJcbiAqXHJcbiAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5uZXcgUG9pbnQoKTwvY29kZT4gY29uc3RydWN0b3IgdG8gY3JlYXRlIGEgUG9pbnRcclxuICogb2JqZWN0LjwvcD5cclxuICovXHJcbmNsYXNzIFBvaW50XHJcbntcclxuXHQvKipcclxuXHQgKiBUaGUgaG9yaXpvbnRhbCBjb29yZGluYXRlIG9mIHRoZSBwb2ludC4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgMC5cclxuXHQgKi9cclxuXHRwdWJsaWMgeDpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB2ZXJ0aWNhbCBjb29yZGluYXRlIG9mIHRoZSBwb2ludC4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgMC5cclxuXHQgKi9cclxuXHRwdWJsaWMgeTpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsZW5ndGggb2YgdGhlIGxpbmUgc2VnbWVudCBmcm9tKDAsMCkgdG8gdGhpcyBwb2ludC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiBNYXRoLnNxcnQodGhpcy54KnRoaXMueCArIHRoaXMueSp0aGlzLnkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBwb2ludC4gSWYgeW91IHBhc3Mgbm8gcGFyYW1ldGVycyB0byB0aGlzIG1ldGhvZCwgYSBwb2ludCBpc1xyXG5cdCAqIGNyZWF0ZWQgYXQoMCwwKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB4IFRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUuXHJcblx0ICogQHBhcmFtIHkgVGhlIHZlcnRpY2FsIGNvb3JkaW5hdGUuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoeDpudW1iZXIgPSAwLCB5Om51bWJlciA9IDApXHJcblx0e1xyXG5cdFx0dGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBjb29yZGluYXRlcyBvZiBhbm90aGVyIHBvaW50IHRvIHRoZSBjb29yZGluYXRlcyBvZiB0aGlzIHBvaW50IHRvXHJcblx0ICogY3JlYXRlIGEgbmV3IHBvaW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHYgVGhlIHBvaW50IHRvIGJlIGFkZGVkLlxyXG5cdCAqIEByZXR1cm4gVGhlIG5ldyBwb2ludC5cclxuXHQgKi9cclxuXHRwdWJsaWMgYWRkKHY6UG9pbnQpOlBvaW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIFBvaW50IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gVGhlIG5ldyBQb2ludCBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6UG9pbnRcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjb3B5RnJvbShzb3VyY2VQb2ludDpQb2ludClcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHR3byBwb2ludHMgYXJlIGVxdWFsLiBUd28gcG9pbnRzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmVcclxuXHQgKiB0aGUgc2FtZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRvQ29tcGFyZSBUaGUgcG9pbnQgdG8gYmUgY29tcGFyZWQuXHJcblx0ICogQHJldHVybiBBIHZhbHVlIG9mIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBvYmplY3QgaXMgZXF1YWwgdG8gdGhpcyBQb2ludFxyXG5cdCAqICAgICAgICAgb2JqZWN0OyA8Y29kZT5mYWxzZTwvY29kZT4gaWYgaXQgaXMgbm90IGVxdWFsLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBlcXVhbHModG9Db21wYXJlOlBvaW50KTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuICh0aGlzLnggPT0gdG9Db21wYXJlLnggJiYgdGhpcy55ID09IHRvQ29tcGFyZS55KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNjYWxlcyB0aGUgbGluZSBzZWdtZW50IGJldHdlZW4oMCwwKSBhbmQgdGhlIGN1cnJlbnQgcG9pbnQgdG8gYSBzZXRcclxuXHQgKiBsZW5ndGguXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdGhpY2tuZXNzIFRoZSBzY2FsaW5nIHZhbHVlLiBGb3IgZXhhbXBsZSwgaWYgdGhlIGN1cnJlbnQgcG9pbnQgaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgKDAsNSksIGFuZCB5b3Ugbm9ybWFsaXplIGl0IHRvIDEsIHRoZSBwb2ludCByZXR1cm5lZCBpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgYXQoMCwxKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgbm9ybWFsaXplKHRoaWNrbmVzczpudW1iZXIgPSAxKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdHZhciBpbnZMZW5ndGggPSB0aGlja25lc3MvdGhpcy5sZW5ndGg7XHJcblx0XHRcdHRoaXMueCAqPSBpbnZMZW5ndGg7XHJcblx0XHRcdHRoaXMueSAqPSBpbnZMZW5ndGg7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRocm93IFwiQ2Fubm90IGRpdmlkZSBieSB6ZXJvIGxlbmd0aC5cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9mZnNldHMgdGhlIFBvaW50IG9iamVjdCBieSB0aGUgc3BlY2lmaWVkIGFtb3VudC4gVGhlIHZhbHVlIG9mXHJcblx0ICogPGNvZGU+ZHg8L2NvZGU+IGlzIGFkZGVkIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZSBvZiA8aT54PC9pPiB0byBjcmVhdGUgdGhlXHJcblx0ICogbmV3IDxpPng8L2k+IHZhbHVlLiBUaGUgdmFsdWUgb2YgPGNvZGU+ZHk8L2NvZGU+IGlzIGFkZGVkIHRvIHRoZSBvcmlnaW5hbFxyXG5cdCAqIHZhbHVlIG9mIDxpPnk8L2k+IHRvIGNyZWF0ZSB0aGUgbmV3IDxpPnk8L2k+IHZhbHVlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGR4IFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gb2Zmc2V0IHRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUsXHJcblx0ICogICAgICAgICAgIDxpPng8L2k+LlxyXG5cdCAqIEBwYXJhbSBkeSBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIG9mZnNldCB0aGUgdmVydGljYWwgY29vcmRpbmF0ZSwgPGk+eTwvaT4uXHJcblx0ICovXHJcblx0cHVibGljIG9mZnNldChkeDpudW1iZXIsIGR5Om51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLnggKz0gZHg7XHJcblx0XHR0aGlzLnkgKz0gZHk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0VG8oeGE6bnVtYmVyLCB5YTpudW1iZXIpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN1YnRyYWN0cyB0aGUgY29vcmRpbmF0ZXMgb2YgYW5vdGhlciBwb2ludCBmcm9tIHRoZSBjb29yZGluYXRlcyBvZiB0aGlzXHJcblx0ICogcG9pbnQgdG8gY3JlYXRlIGEgbmV3IHBvaW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHYgVGhlIHBvaW50IHRvIGJlIHN1YnRyYWN0ZWQuXHJcblx0ICogQHJldHVybiBUaGUgbmV3IHBvaW50LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdWJ0cmFjdCh2OlBvaW50KTpQb2ludFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUG9pbnQodGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSB2YWx1ZXMgb2YgdGhlIDxpPng8L2k+IGFuZCA8aT55PC9pPlxyXG5cdCAqIGNvb3JkaW5hdGVzLiBUaGUgc3RyaW5nIGhhcyB0aGUgZm9ybSA8Y29kZT5cIih4PTxpPng8L2k+LFxyXG5cdCAqIHk9PGk+eTwvaT4pXCI8L2NvZGU+LCBzbyBjYWxsaW5nIHRoZSA8Y29kZT50b1N0cmluZygpPC9jb2RlPiBtZXRob2QgZm9yIGFcclxuXHQgKiBwb2ludCBhdCAyMywxNyB3b3VsZCByZXR1cm4gPGNvZGU+XCIoeD0yMywgeT0xNylcIjwvY29kZT4uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGNvb3JkaW5hdGVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBcIltQb2ludF0gKHg9XCIgKyB0aGlzLnggKyBcIiwgeT1cIiArIHRoaXMueSArIFwiKVwiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgZGlzdGFuY2UgYmV0d2VlbiA8Y29kZT5wdDE8L2NvZGU+IGFuZCA8Y29kZT5wdDI8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHB0MSBUaGUgZmlyc3QgcG9pbnQuXHJcblx0ICogQHBhcmFtIHB0MiBUaGUgc2Vjb25kIHBvaW50LlxyXG5cdCAqIEByZXR1cm4gVGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGZpcnN0IGFuZCBzZWNvbmQgcG9pbnRzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgZGlzdGFuY2UocHQxOlBvaW50LCBwdDI6UG9pbnQpOm51bWJlclxyXG5cdHtcclxuXHRcdHZhciBkeDpudW1iZXIgPSBwdDIueCAtIHB0MS54O1xyXG5cdFx0dmFyIGR5Om51bWJlciA9IHB0Mi55IC0gcHQxLnk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguc3FydChkeCpkeCArIGR5KmR5KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgYSBwb2ludCBiZXR3ZWVuIHR3byBzcGVjaWZpZWQgcG9pbnRzLiBUaGUgcGFyYW1ldGVyXHJcblx0ICogPGNvZGU+ZjwvY29kZT4gZGV0ZXJtaW5lcyB3aGVyZSB0aGUgbmV3IGludGVycG9sYXRlZCBwb2ludCBpcyBsb2NhdGVkXHJcblx0ICogcmVsYXRpdmUgdG8gdGhlIHR3byBlbmQgcG9pbnRzIHNwZWNpZmllZCBieSBwYXJhbWV0ZXJzIDxjb2RlPnB0MTwvY29kZT5cclxuXHQgKiBhbmQgPGNvZGU+cHQyPC9jb2RlPi4gVGhlIGNsb3NlciB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciA8Y29kZT5mPC9jb2RlPlxyXG5cdCAqIGlzIHRvIDxjb2RlPjEuMDwvY29kZT4sIHRoZSBjbG9zZXIgdGhlIGludGVycG9sYXRlZCBwb2ludCBpcyB0byB0aGUgZmlyc3RcclxuXHQgKiBwb2ludChwYXJhbWV0ZXIgPGNvZGU+cHQxPC9jb2RlPikuIFRoZSBjbG9zZXIgdGhlIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXJcclxuXHQgKiA8Y29kZT5mPC9jb2RlPiBpcyB0byAwLCB0aGUgY2xvc2VyIHRoZSBpbnRlcnBvbGF0ZWQgcG9pbnQgaXMgdG8gdGhlIHNlY29uZFxyXG5cdCAqIHBvaW50KHBhcmFtZXRlciA8Y29kZT5wdDI8L2NvZGU+KS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwdDEgVGhlIGZpcnN0IHBvaW50LlxyXG5cdCAqIEBwYXJhbSBwdDIgVGhlIHNlY29uZCBwb2ludC5cclxuXHQgKiBAcGFyYW0gZiAgIFRoZSBsZXZlbCBvZiBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdGhlIHR3byBwb2ludHMuIEluZGljYXRlc1xyXG5cdCAqICAgICAgICAgICAgd2hlcmUgdGhlIG5ldyBwb2ludCB3aWxsIGJlLCBhbG9uZyB0aGUgbGluZSBiZXR3ZWVuXHJcblx0ICogICAgICAgICAgICA8Y29kZT5wdDE8L2NvZGU+IGFuZCA8Y29kZT5wdDI8L2NvZGU+LiBJZiA8Y29kZT5mPC9jb2RlPj0xLFxyXG5cdCAqICAgICAgICAgICAgPGNvZGU+cHQxPC9jb2RlPiBpcyByZXR1cm5lZDsgaWYgPGNvZGU+ZjwvY29kZT49MCxcclxuXHQgKiAgICAgICAgICAgIDxjb2RlPnB0MjwvY29kZT4gaXMgcmV0dXJuZWQuXHJcblx0ICogQHJldHVybiBUaGUgbmV3LCBpbnRlcnBvbGF0ZWQgcG9pbnQuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBpbnRlcnBvbGF0ZShwdDE6UG9pbnQsIHB0MjpQb2ludCwgZjpudW1iZXIpOlBvaW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBQb2ludChwdDIueCArIChwdDEueCAtIHB0Mi54KSpmLCBwdDIueSArIChwdDEueSAtIHB0Mi55KSpmKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnRzIGEgcGFpciBvZiBwb2xhciBjb29yZGluYXRlcyB0byBhIENhcnRlc2lhbiBwb2ludCBjb29yZGluYXRlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGxlbiAgIFRoZSBsZW5ndGggY29vcmRpbmF0ZSBvZiB0aGUgcG9sYXIgcGFpci5cclxuXHQgKiBAcGFyYW0gYW5nbGUgVGhlIGFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgcG9sYXIgcGFpci5cclxuXHQgKiBAcmV0dXJuIFRoZSBDYXJ0ZXNpYW4gcG9pbnQuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBwb2xhcihsZW46bnVtYmVyLCBhbmdsZTpudW1iZXIpOlBvaW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBQb2ludChsZW4qTWF0aC5jb3MoYW5nbGUpLCBsZW4qTWF0aC5zaW4oYW5nbGUpKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFBvaW50O1xyXG4iXX0=