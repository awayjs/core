var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitiveCylinderPrefab = require("awayjs-core/lib/prefabs/PrimitiveCylinderPrefab");

/**
* A UV Cone primitive mesh.
*/
var PrimitiveConePrefab = (function (_super) {
    __extends(PrimitiveConePrefab, _super);
    /**
    * Creates a new Cone object.
    * @param radius The radius of the bottom end of the cone
    * @param height The height of the cone
    * @param segmentsW Defines the number of horizontal segments that make up the cone. Defaults to 16.
    * @param segmentsH Defines the number of vertical segments that make up the cone. Defaults to 1.
    * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
    */
    function PrimitiveConePrefab(radius, height, segmentsW, segmentsH, closed, yUp) {
        if (typeof radius === "undefined") { radius = 50; }
        if (typeof height === "undefined") { height = 100; }
        if (typeof segmentsW === "undefined") { segmentsW = 16; }
        if (typeof segmentsH === "undefined") { segmentsH = 1; }
        if (typeof closed === "undefined") { closed = true; }
        if (typeof yUp === "undefined") { yUp = true; }
        _super.call(this, 0, radius, height, segmentsW, segmentsH, false, closed, true, yUp);
    }
    Object.defineProperty(PrimitiveConePrefab.prototype, "radius", {
        /**
        * The radius of the bottom end of the cone.
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

    return PrimitiveConePrefab;
})(PrimitiveCylinderPrefab);

module.exports = PrimitiveConePrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWZhYnMvUHJpbWl0aXZlQ29uZVByZWZhYi50cyJdLCJuYW1lcyI6WyJQcmltaXRpdmVDb25lUHJlZmFiIiwiUHJpbWl0aXZlQ29uZVByZWZhYi5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0ZBQzRGOztBQUU1Rjs7RUFFRztBQUNIO0lBQWtDQSxzQ0FBdUJBO0lBMEJ4REE7Ozs7Ozs7TUFER0E7SUFDSEEsNkJBQVlBLE1BQWtCQSxFQUFFQSxNQUFtQkEsRUFBRUEsU0FBcUJBLEVBQUVBLFNBQW9CQSxFQUFFQSxNQUFxQkEsRUFBRUEsR0FBa0JBO1FBQS9IQyxxQ0FBQUEsTUFBTUEsR0FBVUEsRUFBRUE7QUFBQUEsUUFBRUEscUNBQUFBLE1BQU1BLEdBQVVBLEdBQUdBO0FBQUFBLFFBQUVBLHdDQUFBQSxTQUFTQSxHQUFVQSxFQUFFQTtBQUFBQSxRQUFFQSx3Q0FBQUEsU0FBU0EsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEscUNBQUFBLE1BQU1BLEdBQVdBLElBQUlBO0FBQUFBLFFBQUVBLGtDQUFBQSxHQUFHQSxHQUFXQSxJQUFJQTtBQUFBQSxRQUUxSUEsV0FBTUEsT0FBQUEsQ0FBQ0EsRUFBRUEsTUFBTUEsRUFBRUEsTUFBTUEsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsS0FBS0EsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0E7SUFDekVBLENBQUNBO0lBdkJERDtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsY0FBY0E7UUFDM0JBLENBQUNBO1FBRURBLEtBQUFBLFVBQWtCQSxLQUFZQTtZQUU3QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsS0FBS0E7O1lBRTNCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO1FBQzVCQSxDQUFDQTs7OztBQVBBQTtJQXFCRkEsMkJBQUNBO0FBQURBLENBQUNBLEVBOUJpQyx1QkFBdUIsRUE4QnhEOztBQUVELG9DQUE2QixDQUFBIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlQ29uZVByZWZhYi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWJcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN5bGluZGVyUHJlZmFiXCIpO1xuXG4vKipcbiAqIEEgVVYgQ29uZSBwcmltaXRpdmUgbWVzaC5cbiAqL1xuY2xhc3MgUHJpbWl0aXZlQ29uZVByZWZhYiBleHRlbmRzIFByaW1pdGl2ZUN5bGluZGVyUHJlZmFiIGltcGxlbWVudHMgSUFzc2V0XG57XG5cblx0LyoqXG5cdCAqIFRoZSByYWRpdXMgb2YgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGNvbmUuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJhZGl1cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BCb3R0b21SYWRpdXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJhZGl1cyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9wQm90dG9tUmFkaXVzID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBDb25lIG9iamVjdC5cblx0ICogQHBhcmFtIHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjb25lXG5cdCAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY29uZVxuXHQgKiBAcGFyYW0gc2VnbWVudHNXIERlZmluZXMgdGhlIG51bWJlciBvZiBob3Jpem9udGFsIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY29uZS4gRGVmYXVsdHMgdG8gMTYuXG5cdCAqIEBwYXJhbSBzZWdtZW50c0ggRGVmaW5lcyB0aGUgbnVtYmVyIG9mIHZlcnRpY2FsIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY29uZS4gRGVmYXVsdHMgdG8gMS5cblx0ICogQHBhcmFtIHlVcCBEZWZpbmVzIHdoZXRoZXIgdGhlIGNvbmUgcG9sZXMgc2hvdWxkIGxheSBvbiB0aGUgWS1heGlzICh0cnVlKSBvciBvbiB0aGUgWi1heGlzIChmYWxzZSkuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihyYWRpdXM6bnVtYmVyID0gNTAsIGhlaWdodDpudW1iZXIgPSAxMDAsIHNlZ21lbnRzVzpudW1iZXIgPSAxNiwgc2VnbWVudHNIOm51bWJlciA9IDEsIGNsb3NlZDpib29sZWFuID0gdHJ1ZSwgeVVwOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0c3VwZXIoMCwgcmFkaXVzLCBoZWlnaHQsIHNlZ21lbnRzVywgc2VnbWVudHNILCBmYWxzZSwgY2xvc2VkLCB0cnVlLCB5VXApO1xuXHR9XG59XG5cbmV4cG9ydCA9IFByaW1pdGl2ZUNvbmVQcmVmYWI7Il19