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
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
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
        if (typeof thickness === "undefined") { thickness = 1; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZ2VvbS9Qb2ludC50cyJdLCJuYW1lcyI6WyJQb2ludCIsIlBvaW50LmNvbnN0cnVjdG9yIiwiUG9pbnQuYWRkIiwiUG9pbnQuY2xvbmUiLCJQb2ludC5jb3B5RnJvbSIsIlBvaW50LmVxdWFscyIsIlBvaW50Lm5vcm1hbGl6ZSIsIlBvaW50Lm9mZnNldCIsIlBvaW50LnNldFRvIiwiUG9pbnQuc3VidHJhY3QiLCJQb2ludC50b1N0cmluZyIsIlBvaW50LmRpc3RhbmNlIiwiUG9pbnQuaW50ZXJwb2xhdGUiLCJQb2ludC5wb2xhciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXFCRztBQUNIO0lBMkJDQTs7Ozs7O01BREdBO0lBQ0hBLGVBQVlBLENBQVlBLEVBQUVBLENBQVlBO1FBQTFCQyxnQ0FBQUEsQ0FBQ0EsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsZ0NBQUFBLENBQUNBLEdBQVVBLENBQUNBO0FBQUFBLFFBRXJDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNWQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtJQUNYQSxDQUFDQTtJQWhCREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQ2hEQSxDQUFDQTs7OztBQUFBQTtJQXNCREE7Ozs7OztNQURHQTswQkFDSEEsVUFBV0EsQ0FBT0E7UUFFakJFLE9BQU9BLElBQUlBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQzdDQSxDQUFDQTs7SUFPREY7Ozs7TUFER0E7NEJBQ0hBO1FBRUNHLE9BQU9BLElBQUlBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0lBQ2pDQSxDQUFDQTs7SUFFREgsMkJBQUFBLFVBQWdCQSxXQUFpQkE7SUFHakNJLENBQUNBOztJQVVESjs7Ozs7OztNQURHQTs2QkFDSEEsVUFBY0EsU0FBZUE7UUFFNUJLLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO0lBQ3hEQSxDQUFDQTs7SUFVREw7Ozs7Ozs7TUFER0E7Z0NBQ0hBLFVBQWlCQSxTQUFvQkE7UUFBcEJNLHdDQUFBQSxTQUFTQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUVwQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBRUE7WUFDckJBLElBQUlBLFNBQVNBLEdBQUdBLFNBQVNBLEdBQUNBLElBQUlBLENBQUNBLE1BQU1BO1lBQ3JDQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxTQUFTQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsU0FBU0E7WUFDbkJBLE1BQU9BO1NBQ1BBO1FBQ0RBLE1BQU1BLCtCQUErQkE7SUFDdENBLENBQUNBOztJQVlETjs7Ozs7Ozs7O01BREdBOzZCQUNIQSxVQUFjQSxFQUFTQSxFQUFFQSxFQUFTQTtRQUVqQ08sSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUE7UUFDWkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUE7SUFDYkEsQ0FBQ0E7O0lBRURQLHdCQUFBQSxVQUFhQSxFQUFTQSxFQUFFQSxFQUFTQTtJQUdqQ1EsQ0FBQ0E7O0lBU0RSOzs7Ozs7TUFER0E7K0JBQ0hBLFVBQWdCQSxDQUFPQTtRQUV0QlMsT0FBT0EsSUFBSUEsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDN0NBLENBQUNBOztJQVVEVDs7Ozs7OztNQURHQTsrQkFDSEE7UUFFQ1UsT0FBT0EsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0E7SUFDdERBLENBQUNBOztJQVNEVjs7Ozs7O01BREdBO3FCQUNIQSxVQUF1QkEsR0FBU0EsRUFBRUEsR0FBU0E7UUFFMUNXLElBQUlBLEVBQUVBLEdBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO1FBQzdCQSxJQUFJQSxFQUFFQSxHQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTs7UUFFN0JBLE9BQU9BLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLENBQUNBO0lBQ2hDQSxDQUFDQTs7SUFxQkRYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFER0E7d0JBQ0hBLFVBQTBCQSxHQUFTQSxFQUFFQSxHQUFTQSxFQUFFQSxDQUFRQTtRQUV2RFksT0FBT0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDdkVBLENBQUNBOztJQVNEWjs7Ozs7O01BREdBO2tCQUNIQSxVQUFvQkEsR0FBVUEsRUFBRUEsS0FBWUE7UUFFM0NhLE9BQU9BLElBQUlBLEtBQUtBLENBQUNBLEdBQUdBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0lBQzNEQSxDQUFDQTtJQUNGYixhQUFDQTtBQUFEQSxDQUFDQSxJQUFBOztBQUVELHNCQUFlLENBQ2YiLCJmaWxlIjoiY29yZS9nZW9tL1BvaW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgUG9pbnQgb2JqZWN0IHJlcHJlc2VudHMgYSBsb2NhdGlvbiBpbiBhIHR3by1kaW1lbnNpb25hbCBjb29yZGluYXRlXG4gKiBzeXN0ZW0sIHdoZXJlIDxpPng8L2k+IHJlcHJlc2VudHMgdGhlIGhvcml6b250YWwgYXhpcyBhbmQgPGk+eTwvaT5cbiAqIHJlcHJlc2VudHMgdGhlIHZlcnRpY2FsIGF4aXMuXG4gKlxuICogPHA+VGhlIGZvbGxvd2luZyBjb2RlIGNyZWF0ZXMgYSBwb2ludCBhdCgwLDApOjwvcD5cbiAqXG4gKiA8cD5NZXRob2RzIGFuZCBwcm9wZXJ0aWVzIG9mIHRoZSBmb2xsb3dpbmcgY2xhc3NlcyB1c2UgUG9pbnQgb2JqZWN0czo8L3A+XG4gKlxuICogPHVsPlxuICogICA8bGk+Qml0bWFwRGF0YTwvbGk+XG4gKiAgIDxsaT5EaXNwbGF5T2JqZWN0PC9saT5cbiAqICAgPGxpPkRpc3BsYXlPYmplY3RDb250YWluZXI8L2xpPlxuICogICA8bGk+RGlzcGxhY2VtZW50TWFwRmlsdGVyPC9saT5cbiAqICAgPGxpPk5hdGl2ZVdpbmRvdzwvbGk+XG4gKiAgIDxsaT5NYXRyaXg8L2xpPlxuICogICA8bGk+UmVjdGFuZ2xlPC9saT5cbiAqIDwvdWw+XG4gKlxuICogPHA+WW91IGNhbiB1c2UgdGhlIDxjb2RlPm5ldyBQb2ludCgpPC9jb2RlPiBjb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBQb2ludFxuICogb2JqZWN0LjwvcD5cbiAqL1xuY2xhc3MgUG9pbnRcbntcblx0LyoqXG5cdCAqIFRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAwLlxuXHQgKi9cblx0cHVibGljIHg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgdmVydGljYWwgY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDAuXG5cdCAqL1xuXHRwdWJsaWMgeTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBsZW5ndGggb2YgdGhlIGxpbmUgc2VnbWVudCBmcm9tKDAsMCkgdG8gdGhpcyBwb2ludC5cblx0ICovXG5cdHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCp0aGlzLnggKyB0aGlzLnkqdGhpcy55KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IHBvaW50LiBJZiB5b3UgcGFzcyBubyBwYXJhbWV0ZXJzIHRvIHRoaXMgbWV0aG9kLCBhIHBvaW50IGlzXG5cdCAqIGNyZWF0ZWQgYXQoMCwwKS5cblx0ICpcblx0ICogQHBhcmFtIHggVGhlIGhvcml6b250YWwgY29vcmRpbmF0ZS5cblx0ICogQHBhcmFtIHkgVGhlIHZlcnRpY2FsIGNvb3JkaW5hdGUuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih4Om51bWJlciA9IDAsIHk6bnVtYmVyID0gMClcblx0e1xuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIHRoZSBjb29yZGluYXRlcyBvZiBhbm90aGVyIHBvaW50IHRvIHRoZSBjb29yZGluYXRlcyBvZiB0aGlzIHBvaW50IHRvXG5cdCAqIGNyZWF0ZSBhIG5ldyBwb2ludC5cblx0ICpcblx0ICogQHBhcmFtIHYgVGhlIHBvaW50IHRvIGJlIGFkZGVkLlxuXHQgKiBAcmV0dXJuIFRoZSBuZXcgcG9pbnQuXG5cdCAqL1xuXHRwdWJsaWMgYWRkKHY6UG9pbnQpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIFBvaW50IG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiBUaGUgbmV3IFBvaW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KTtcblx0fVxuXG5cdHB1YmxpYyBjb3B5RnJvbShzb3VyY2VQb2ludDpQb2ludClcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHR3byBwb2ludHMgYXJlIGVxdWFsLiBUd28gcG9pbnRzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmVcblx0ICogdGhlIHNhbWUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcy5cblx0ICpcblx0ICogQHBhcmFtIHRvQ29tcGFyZSBUaGUgcG9pbnQgdG8gYmUgY29tcGFyZWQuXG5cdCAqIEByZXR1cm4gQSB2YWx1ZSBvZiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgb2JqZWN0IGlzIGVxdWFsIHRvIHRoaXMgUG9pbnRcblx0ICogICAgICAgICBvYmplY3Q7IDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBpdCBpcyBub3QgZXF1YWwuXG5cdCAqL1xuXHRwdWJsaWMgZXF1YWxzKHRvQ29tcGFyZTpQb2ludCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLnggPT0gdG9Db21wYXJlLnggJiYgdGhpcy55ID09IHRvQ29tcGFyZS55KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTY2FsZXMgdGhlIGxpbmUgc2VnbWVudCBiZXR3ZWVuKDAsMCkgYW5kIHRoZSBjdXJyZW50IHBvaW50IHRvIGEgc2V0XG5cdCAqIGxlbmd0aC5cblx0ICpcblx0ICogQHBhcmFtIHRoaWNrbmVzcyBUaGUgc2NhbGluZyB2YWx1ZS4gRm9yIGV4YW1wbGUsIGlmIHRoZSBjdXJyZW50IHBvaW50IGlzXG5cdCAqICAgICAgICAgICAgICAgICAoMCw1KSwgYW5kIHlvdSBub3JtYWxpemUgaXQgdG8gMSwgdGhlIHBvaW50IHJldHVybmVkIGlzXG5cdCAqICAgICAgICAgICAgICAgICAgYXQoMCwxKS5cblx0ICovXG5cdHB1YmxpYyBub3JtYWxpemUodGhpY2tuZXNzOm51bWJlciA9IDEpXG5cdHtcblx0XHRpZiAodGhpcy5sZW5ndGggIT0gMCkge1xuXHRcdFx0dmFyIGludkxlbmd0aCA9IHRoaWNrbmVzcy90aGlzLmxlbmd0aDtcblx0XHRcdHRoaXMueCAqPSBpbnZMZW5ndGg7XG5cdFx0XHR0aGlzLnkgKj0gaW52TGVuZ3RoO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aHJvdyBcIkNhbm5vdCBkaXZpZGUgYnkgemVybyBsZW5ndGguXCI7XG5cdH1cblxuXHQvKipcblx0ICogT2Zmc2V0cyB0aGUgUG9pbnQgb2JqZWN0IGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50LiBUaGUgdmFsdWUgb2Zcblx0ICogPGNvZGU+ZHg8L2NvZGU+IGlzIGFkZGVkIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZSBvZiA8aT54PC9pPiB0byBjcmVhdGUgdGhlXG5cdCAqIG5ldyA8aT54PC9pPiB2YWx1ZS4gVGhlIHZhbHVlIG9mIDxjb2RlPmR5PC9jb2RlPiBpcyBhZGRlZCB0byB0aGUgb3JpZ2luYWxcblx0ICogdmFsdWUgb2YgPGk+eTwvaT4gdG8gY3JlYXRlIHRoZSBuZXcgPGk+eTwvaT4gdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSBkeCBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIG9mZnNldCB0aGUgaG9yaXpvbnRhbCBjb29yZGluYXRlLFxuXHQgKiAgICAgICAgICAgPGk+eDwvaT4uXG5cdCAqIEBwYXJhbSBkeSBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIG9mZnNldCB0aGUgdmVydGljYWwgY29vcmRpbmF0ZSwgPGk+eTwvaT4uXG5cdCAqL1xuXHRwdWJsaWMgb2Zmc2V0KGR4Om51bWJlciwgZHk6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy54ICs9IGR4O1xuXHRcdHRoaXMueSArPSBkeTtcblx0fVxuXG5cdHB1YmxpYyBzZXRUbyh4YTpudW1iZXIsIHlhOm51bWJlcilcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogU3VidHJhY3RzIHRoZSBjb29yZGluYXRlcyBvZiBhbm90aGVyIHBvaW50IGZyb20gdGhlIGNvb3JkaW5hdGVzIG9mIHRoaXNcblx0ICogcG9pbnQgdG8gY3JlYXRlIGEgbmV3IHBvaW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gdiBUaGUgcG9pbnQgdG8gYmUgc3VidHJhY3RlZC5cblx0ICogQHJldHVybiBUaGUgbmV3IHBvaW50LlxuXHQgKi9cblx0cHVibGljIHN1YnRyYWN0KHY6UG9pbnQpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIHZhbHVlcyBvZiB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+XG5cdCAqIGNvb3JkaW5hdGVzLiBUaGUgc3RyaW5nIGhhcyB0aGUgZm9ybSA8Y29kZT5cIih4PTxpPng8L2k+LFxuXHQgKiB5PTxpPnk8L2k+KVwiPC9jb2RlPiwgc28gY2FsbGluZyB0aGUgPGNvZGU+dG9TdHJpbmcoKTwvY29kZT4gbWV0aG9kIGZvciBhXG5cdCAqIHBvaW50IGF0IDIzLDE3IHdvdWxkIHJldHVybiA8Y29kZT5cIih4PTIzLCB5PTE3KVwiPC9jb2RlPi5cblx0ICpcblx0ICogQHJldHVybiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBjb29yZGluYXRlcy5cblx0ICovXG5cdHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIFwiW1BvaW50XSAoeD1cIiArIHRoaXMueCArIFwiLCB5PVwiICsgdGhpcy55ICsgXCIpXCI7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZGlzdGFuY2UgYmV0d2VlbiA8Y29kZT5wdDE8L2NvZGU+IGFuZCA8Y29kZT5wdDI8L2NvZGU+LlxuXHQgKlxuXHQgKiBAcGFyYW0gcHQxIFRoZSBmaXJzdCBwb2ludC5cblx0ICogQHBhcmFtIHB0MiBUaGUgc2Vjb25kIHBvaW50LlxuXHQgKiBAcmV0dXJuIFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBmaXJzdCBhbmQgc2Vjb25kIHBvaW50cy5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgZGlzdGFuY2UocHQxOlBvaW50LCBwdDI6UG9pbnQpOm51bWJlclxuXHR7XG5cdFx0dmFyIGR4Om51bWJlciA9IHB0Mi54IC0gcHQxLng7XG5cdFx0dmFyIGR5Om51bWJlciA9IHB0Mi55IC0gcHQxLnk7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KGR4KmR4ICsgZHkqZHkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgYSBwb2ludCBiZXR3ZWVuIHR3byBzcGVjaWZpZWQgcG9pbnRzLiBUaGUgcGFyYW1ldGVyXG5cdCAqIDxjb2RlPmY8L2NvZGU+IGRldGVybWluZXMgd2hlcmUgdGhlIG5ldyBpbnRlcnBvbGF0ZWQgcG9pbnQgaXMgbG9jYXRlZFxuXHQgKiByZWxhdGl2ZSB0byB0aGUgdHdvIGVuZCBwb2ludHMgc3BlY2lmaWVkIGJ5IHBhcmFtZXRlcnMgPGNvZGU+cHQxPC9jb2RlPlxuXHQgKiBhbmQgPGNvZGU+cHQyPC9jb2RlPi4gVGhlIGNsb3NlciB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciA8Y29kZT5mPC9jb2RlPlxuXHQgKiBpcyB0byA8Y29kZT4xLjA8L2NvZGU+LCB0aGUgY2xvc2VyIHRoZSBpbnRlcnBvbGF0ZWQgcG9pbnQgaXMgdG8gdGhlIGZpcnN0XG5cdCAqIHBvaW50KHBhcmFtZXRlciA8Y29kZT5wdDE8L2NvZGU+KS4gVGhlIGNsb3NlciB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlclxuXHQgKiA8Y29kZT5mPC9jb2RlPiBpcyB0byAwLCB0aGUgY2xvc2VyIHRoZSBpbnRlcnBvbGF0ZWQgcG9pbnQgaXMgdG8gdGhlIHNlY29uZFxuXHQgKiBwb2ludChwYXJhbWV0ZXIgPGNvZGU+cHQyPC9jb2RlPikuXG5cdCAqXG5cdCAqIEBwYXJhbSBwdDEgVGhlIGZpcnN0IHBvaW50LlxuXHQgKiBAcGFyYW0gcHQyIFRoZSBzZWNvbmQgcG9pbnQuXG5cdCAqIEBwYXJhbSBmICAgVGhlIGxldmVsIG9mIGludGVycG9sYXRpb24gYmV0d2VlbiB0aGUgdHdvIHBvaW50cy4gSW5kaWNhdGVzXG5cdCAqICAgICAgICAgICAgd2hlcmUgdGhlIG5ldyBwb2ludCB3aWxsIGJlLCBhbG9uZyB0aGUgbGluZSBiZXR3ZWVuXG5cdCAqICAgICAgICAgICAgPGNvZGU+cHQxPC9jb2RlPiBhbmQgPGNvZGU+cHQyPC9jb2RlPi4gSWYgPGNvZGU+ZjwvY29kZT49MSxcblx0ICogICAgICAgICAgICA8Y29kZT5wdDE8L2NvZGU+IGlzIHJldHVybmVkOyBpZiA8Y29kZT5mPC9jb2RlPj0wLFxuXHQgKiAgICAgICAgICAgIDxjb2RlPnB0MjwvY29kZT4gaXMgcmV0dXJuZWQuXG5cdCAqIEByZXR1cm4gVGhlIG5ldywgaW50ZXJwb2xhdGVkIHBvaW50LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBpbnRlcnBvbGF0ZShwdDE6UG9pbnQsIHB0MjpQb2ludCwgZjpudW1iZXIpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KHB0Mi54ICsgKHB0MS54IC0gcHQyLngpKmYsIHB0Mi55ICsgKHB0MS55IC0gcHQyLnkpKmYpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgcGFpciBvZiBwb2xhciBjb29yZGluYXRlcyB0byBhIENhcnRlc2lhbiBwb2ludCBjb29yZGluYXRlLlxuXHQgKlxuXHQgKiBAcGFyYW0gbGVuICAgVGhlIGxlbmd0aCBjb29yZGluYXRlIG9mIHRoZSBwb2xhciBwYWlyLlxuXHQgKiBAcGFyYW0gYW5nbGUgVGhlIGFuZ2xlLCBpbiByYWRpYW5zLCBvZiB0aGUgcG9sYXIgcGFpci5cblx0ICogQHJldHVybiBUaGUgQ2FydGVzaWFuIHBvaW50LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBwb2xhcihsZW46bnVtYmVyLCBhbmdsZTpudW1iZXIpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KGxlbipNYXRoLmNvcyhhbmdsZSksIGxlbipNYXRoLnNpbihhbmdsZSkpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFBvaW50O1xuIl19