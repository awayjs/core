var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CSSRenderableBase = require("awayjs-core/lib/core/pool/CSSRenderableBase");

/**
* @class away.pool.RenderableListItem
*/
var CSSLineSegmentRenderable = (function (_super) {
    __extends(CSSLineSegmentRenderable, _super);
    function CSSLineSegmentRenderable(pool, lineSegment) {
        _super.call(this, pool, lineSegment, lineSegment);

        var div = document.createElement("div");
        div.onmousedown = function (event) {
            return false;
        };

        this.htmlElement = div;

        var style = div.style;

        style.position = "absolute";
        style.transformOrigin = style["-webkit-transform-origin"] = style["-moz-transform-origin"] = style["-o-transform-origin"] = style["-ms-transform-origin"] = "0% 0%";

        var img = document.createElement("div");

        div.appendChild(img);

        img.className = "material" + lineSegment.material.id;
    }
    CSSLineSegmentRenderable.id = "lineSegment";
    return CSSLineSegmentRenderable;
})(CSSRenderableBase);

module.exports = CSSLineSegmentRenderable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcG9vbC9DU1NMaW5lU2VnbWVudFJlbmRlcmFibGUudHMiXSwibmFtZXMiOlsiQ1NTTGluZVNlZ21lbnRSZW5kZXJhYmxlIiwiQ1NTTGluZVNlZ21lbnRSZW5kZXJhYmxlLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4RUFBb0Y7O0FBSXBGOztFQUVHO0FBQ0g7SUFBdUNBLDJDQUFpQkE7SUFJdkRBLGtDQUFZQSxJQUFtQkEsRUFBRUEsV0FBdUJBO1FBRXZEQyxXQUFNQSxPQUFBQSxJQUFJQSxFQUFFQSxXQUFXQSxFQUFFQSxXQUFXQSxDQUFDQTs7UUFFckNBLElBQUlBLEdBQUdBLEdBQW1DQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN2RUEsR0FBR0EsQ0FBQ0EsV0FBV0EsR0FBR0EsVUFBQ0EsS0FBZ0JBO21CQUFLQSxLQUFLQTtRQUFMQSxDQUFLQTs7UUFFN0NBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEdBQUdBOztRQUV0QkEsSUFBSUEsS0FBS0EsR0FBd0JBLEdBQUdBLENBQUNBLEtBQUtBOztRQUUxQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsR0FBR0EsVUFBVUE7UUFDM0JBLEtBQUtBLENBQUNBLGVBQWVBLEdBQ2xCQSxLQUFLQSxDQUFDQSwwQkFBMEJBLENBQUNBLEdBQ2pDQSxLQUFLQSxDQUFDQSx1QkFBdUJBLENBQUNBLEdBQzlCQSxLQUFLQSxDQUFDQSxxQkFBcUJBLENBQUNBLEdBQzVCQSxLQUFLQSxDQUFDQSxzQkFBc0JBLENBQUNBLEdBQUdBLE9BQU9BOztRQUUxQ0EsSUFBSUEsR0FBR0EsR0FBbUNBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBOztRQUV2RUEsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O1FBRXBCQSxHQUFHQSxDQUFDQSxTQUFTQSxHQUFHQSxVQUFVQSxHQUFHQSxXQUFXQSxDQUFDQSxRQUFRQSxDQUFDQSxFQUFFQTtJQUNyREEsQ0FBQ0E7SUF6QkRELDhCQUEwQkEsYUFBYUE7SUEwQnhDQSxnQ0FBQ0E7QUFBREEsQ0FBQ0EsRUE1QnNDLGlCQUFpQixFQTRCdkQ7O0FBRUQseUNBQWtDLENBQUEiLCJmaWxlIjoiY29yZS9wb29sL0NTU0xpbmVTZWdtZW50UmVuZGVyYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDU1NSZW5kZXJhYmxlQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvQ1NTUmVuZGVyYWJsZUJhc2VcIik7XG5pbXBvcnQgUmVuZGVyYWJsZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvUmVuZGVyYWJsZVBvb2xcIik7XG5pbXBvcnQgTGluZVNlZ21lbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0xpbmVTZWdtZW50XCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LnBvb2wuUmVuZGVyYWJsZUxpc3RJdGVtXG4gKi9cbmNsYXNzIENTU0xpbmVTZWdtZW50UmVuZGVyYWJsZSBleHRlbmRzIENTU1JlbmRlcmFibGVCYXNlXG57XG5cdHB1YmxpYyBzdGF0aWMgaWQ6c3RyaW5nID0gXCJsaW5lU2VnbWVudFwiO1xuXG5cdGNvbnN0cnVjdG9yKHBvb2w6UmVuZGVyYWJsZVBvb2wsIGxpbmVTZWdtZW50OkxpbmVTZWdtZW50KVxuXHR7XG5cdFx0c3VwZXIocG9vbCwgbGluZVNlZ21lbnQsIGxpbmVTZWdtZW50KTtcblxuXHRcdHZhciBkaXY6SFRNTERpdkVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZGl2Lm9ubW91c2Vkb3duID0gKGV2ZW50Ok1vdXNlRXZlbnQpID0+IGZhbHNlO1xuXG5cdFx0dGhpcy5odG1sRWxlbWVudCA9IGRpdjtcblxuXHRcdHZhciBzdHlsZTpNU1N0eWxlQ1NTUHJvcGVydGllcyA9IGRpdi5zdHlsZTtcblxuXHRcdHN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHRcdHN0eWxlLnRyYW5zZm9ybU9yaWdpblxuXHRcdFx0PSBzdHlsZVtcIi13ZWJraXQtdHJhbnNmb3JtLW9yaWdpblwiXVxuXHRcdFx0PSBzdHlsZVtcIi1tb3otdHJhbnNmb3JtLW9yaWdpblwiXVxuXHRcdFx0PSBzdHlsZVtcIi1vLXRyYW5zZm9ybS1vcmlnaW5cIl1cblx0XHRcdD0gc3R5bGVbXCItbXMtdHJhbnNmb3JtLW9yaWdpblwiXSA9IFwiMCUgMCVcIjtcblxuXHRcdHZhciBpbWc6SFRNTERpdkVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0XHRkaXYuYXBwZW5kQ2hpbGQoaW1nKTtcblxuXHRcdGltZy5jbGFzc05hbWUgPSBcIm1hdGVyaWFsXCIgKyBsaW5lU2VnbWVudC5tYXRlcmlhbC5pZDtcblx0fVxufVxuXG5leHBvcnQgPSBDU1NMaW5lU2VnbWVudFJlbmRlcmFibGU7Il19