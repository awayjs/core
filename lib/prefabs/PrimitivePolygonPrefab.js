var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitiveCylinderPrefab = require("awayjs-core/lib/prefabs/PrimitiveCylinderPrefab");

/**
* A UV RegularPolygon primitive mesh.
*/
var PrimitivePolygonPrefab = (function (_super) {
    __extends(PrimitivePolygonPrefab, _super);
    /**
    * Creates a new RegularPolygon disc object.
    * @param radius The radius of the regular polygon
    * @param sides Defines the number of sides of the regular polygon.
    * @param yUp Defines whether the regular polygon should lay on the Y-axis (true) or on the Z-axis (false).
    */
    function PrimitivePolygonPrefab(radius, sides, yUp) {
        if (typeof radius === "undefined") { radius = 100; }
        if (typeof sides === "undefined") { sides = 16; }
        if (typeof yUp === "undefined") { yUp = true; }
        _super.call(this, radius, 0, 0, sides, 1, true, false, false, yUp);
    }
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "radius", {
        /**
        * The radius of the regular polygon.
        */
        get: function () {
            return this._pBottomRadius;
        },
        set: function (value) {
            this._pBottomRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitivePolygonPrefab.prototype, "sides", {
        /**
        * The number of sides of the regular polygon.
        */
        get: function () {
            return this._pSegmentsW;
        },
        set: function (value) {
            this.setSegmentsW(value);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitivePolygonPrefab.prototype, "subdivisions", {
        /**
        * The number of subdivisions from the edge to the center of the regular polygon.
        */
        get: function () {
            return this._pSegmentsH;
        },
        set: function (value) {
            this.setSegmentsH(value);
        },
        enumerable: true,
        configurable: true
    });

    return PrimitivePolygonPrefab;
})(PrimitiveCylinderPrefab);

module.exports = PrimitivePolygonPrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWZhYnMvUHJpbWl0aXZlUG9seWdvblByZWZhYi50cyJdLCJuYW1lcyI6WyJQcmltaXRpdmVQb2x5Z29uUHJlZmFiIiwiUHJpbWl0aXZlUG9seWdvblByZWZhYi5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0ZBQzRGOztBQUU1Rjs7RUFFRztBQUNIO0lBQXFDQSx5Q0FBdUJBO0lBaUQzREE7Ozs7O01BREdBO0lBQ0hBLGdDQUFZQSxNQUFtQkEsRUFBRUEsS0FBaUJBLEVBQUVBLEdBQWtCQTtRQUExREMscUNBQUFBLE1BQU1BLEdBQVVBLEdBQUdBO0FBQUFBLFFBQUVBLG9DQUFBQSxLQUFLQSxHQUFVQSxFQUFFQTtBQUFBQSxRQUFFQSxrQ0FBQUEsR0FBR0EsR0FBV0EsSUFBSUE7QUFBQUEsUUFFckVBLFdBQU1BLE9BQUFBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEtBQUtBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBO0lBQ3ZEQSxDQUFDQTtJQTlDREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGNBQWNBO1FBQzNCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFrQkEsS0FBWUE7WUFFN0JBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLEtBQUtBO1lBQzNCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO1FBQzVCQSxDQUFDQTs7OztBQU5BQTs7SUFXREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFdBQVdBO1FBQ3hCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFpQkEsS0FBWUE7WUFFNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBO1FBQ3pCQSxDQUFDQTs7OztBQUxBQTs7SUFVREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFdBQVdBO1FBQ3hCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUF3QkEsS0FBWUE7WUFFbkNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBO1FBQ3pCQSxDQUFDQTs7OztBQUxBQTtJQWlCRkEsOEJBQUNBO0FBQURBLENBQUNBLEVBckRvQyx1QkFBdUIsRUFxRDNEOztBQUVELHVDQUFnQyxDQUFBIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlUG9seWdvblByZWZhYi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWJcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN5bGluZGVyUHJlZmFiXCIpO1xuXG4vKipcbiAqIEEgVVYgUmVndWxhclBvbHlnb24gcHJpbWl0aXZlIG1lc2guXG4gKi9cbmNsYXNzIFByaW1pdGl2ZVBvbHlnb25QcmVmYWIgZXh0ZW5kcyBQcmltaXRpdmVDeWxpbmRlclByZWZhYiBpbXBsZW1lbnRzIElBc3NldFxue1xuXG5cdC8qKlxuXHQgKiBUaGUgcmFkaXVzIG9mIHRoZSByZWd1bGFyIHBvbHlnb24uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJhZGl1cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BCb3R0b21SYWRpdXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJhZGl1cyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9wQm90dG9tUmFkaXVzID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2Ygc2lkZXMgb2YgdGhlIHJlZ3VsYXIgcG9seWdvbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2lkZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2VnbWVudHNXO1xuXHR9XG5cblx0cHVibGljIHNldCBzaWRlcyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnNldFNlZ21lbnRzVyh2YWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBzdWJkaXZpc2lvbnMgZnJvbSB0aGUgZWRnZSB0byB0aGUgY2VudGVyIG9mIHRoZSByZWd1bGFyIHBvbHlnb24uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHN1YmRpdmlzaW9ucygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTZWdtZW50c0g7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHN1YmRpdmlzaW9ucyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnNldFNlZ21lbnRzSCh2YWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBSZWd1bGFyUG9seWdvbiBkaXNjIG9iamVjdC5cblx0ICogQHBhcmFtIHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSByZWd1bGFyIHBvbHlnb25cblx0ICogQHBhcmFtIHNpZGVzIERlZmluZXMgdGhlIG51bWJlciBvZiBzaWRlcyBvZiB0aGUgcmVndWxhciBwb2x5Z29uLlxuXHQgKiBAcGFyYW0geVVwIERlZmluZXMgd2hldGhlciB0aGUgcmVndWxhciBwb2x5Z29uIHNob3VsZCBsYXkgb24gdGhlIFktYXhpcyAodHJ1ZSkgb3Igb24gdGhlIFotYXhpcyAoZmFsc2UpLlxuXHQgKi9cblx0Y29uc3RydWN0b3IocmFkaXVzOm51bWJlciA9IDEwMCwgc2lkZXM6bnVtYmVyID0gMTYsIHlVcDpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdHN1cGVyKHJhZGl1cywgMCwgMCwgc2lkZXMsIDEsIHRydWUsIGZhbHNlLCBmYWxzZSwgeVVwKTtcblx0fVxufVxuXG5leHBvcnQgPSBQcmltaXRpdmVQb2x5Z29uUHJlZmFiOyJdfQ==