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
var CSSBillboardRenderable = (function (_super) {
    __extends(CSSBillboardRenderable, _super);
    function CSSBillboardRenderable(pool, billboard) {
        _super.call(this, pool, billboard, billboard);

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

        img.className = "material" + billboard.material.id;
    }
    CSSBillboardRenderable.id = "billboard";
    return CSSBillboardRenderable;
})(CSSRenderableBase);

module.exports = CSSBillboardRenderable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcG9vbC9DU1NCaWxsYm9hcmRSZW5kZXJhYmxlLnRzIl0sIm5hbWVzIjpbIkNTU0JpbGxib2FyZFJlbmRlcmFibGUiLCJDU1NCaWxsYm9hcmRSZW5kZXJhYmxlLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4RUFBb0Y7O0FBSXBGOztFQUVHO0FBQ0g7SUFBcUNBLHlDQUFpQkE7SUFJckRBLGdDQUFZQSxJQUFtQkEsRUFBRUEsU0FBbUJBO1FBRW5EQyxXQUFNQSxPQUFBQSxJQUFJQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxDQUFDQTs7UUFFakNBLElBQUlBLEdBQUdBLEdBQW1DQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN2RUEsR0FBR0EsQ0FBQ0EsV0FBV0EsR0FBR0EsVUFBQ0EsS0FBZ0JBO21CQUFLQSxLQUFLQTtRQUFMQSxDQUFLQTs7UUFFN0NBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEdBQUdBOztRQUV0QkEsSUFBSUEsS0FBS0EsR0FBd0JBLEdBQUdBLENBQUNBLEtBQUtBOztRQUUxQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsR0FBR0EsVUFBVUE7UUFDM0JBLEtBQUtBLENBQUNBLGVBQWVBLEdBQ2xCQSxLQUFLQSxDQUFDQSwwQkFBMEJBLENBQUNBLEdBQ2pDQSxLQUFLQSxDQUFDQSx1QkFBdUJBLENBQUNBLEdBQzlCQSxLQUFLQSxDQUFDQSxxQkFBcUJBLENBQUNBLEdBQzVCQSxLQUFLQSxDQUFDQSxzQkFBc0JBLENBQUNBLEdBQUdBLE9BQU9BOztRQUUxQ0EsSUFBSUEsR0FBR0EsR0FBbUNBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBOztRQUV2RUEsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O1FBRXBCQSxHQUFHQSxDQUFDQSxTQUFTQSxHQUFHQSxVQUFVQSxHQUFHQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxFQUFFQTtJQUNuREEsQ0FBQ0E7SUF6QkRELDRCQUEwQkEsV0FBV0E7SUEwQnRDQSw4QkFBQ0E7QUFBREEsQ0FBQ0EsRUE1Qm9DLGlCQUFpQixFQTRCckQ7O0FBRUQsdUNBQWdDLENBQUEiLCJmaWxlIjoiY29yZS9wb29sL0NTU0JpbGxib2FyZFJlbmRlcmFibGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ1NTUmVuZGVyYWJsZUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9wb29sL0NTU1JlbmRlcmFibGVCYXNlXCIpO1xuaW1wb3J0IFJlbmRlcmFibGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9wb29sL1JlbmRlcmFibGVQb29sXCIpO1xuaW1wb3J0IEJpbGxib2FyZFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvQmlsbGJvYXJkXCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LnBvb2wuUmVuZGVyYWJsZUxpc3RJdGVtXG4gKi9cbmNsYXNzIENTU0JpbGxib2FyZFJlbmRlcmFibGUgZXh0ZW5kcyBDU1NSZW5kZXJhYmxlQmFzZVxue1xuXHRwdWJsaWMgc3RhdGljIGlkOnN0cmluZyA9IFwiYmlsbGJvYXJkXCI7XG5cblx0Y29uc3RydWN0b3IocG9vbDpSZW5kZXJhYmxlUG9vbCwgYmlsbGJvYXJkOkJpbGxib2FyZClcblx0e1xuXHRcdHN1cGVyKHBvb2wsIGJpbGxib2FyZCwgYmlsbGJvYXJkKTtcblxuXHRcdHZhciBkaXY6SFRNTERpdkVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZGl2Lm9ubW91c2Vkb3duID0gKGV2ZW50Ok1vdXNlRXZlbnQpID0+IGZhbHNlO1xuXG5cdFx0dGhpcy5odG1sRWxlbWVudCA9IGRpdjtcblxuXHRcdHZhciBzdHlsZTpNU1N0eWxlQ1NTUHJvcGVydGllcyA9IGRpdi5zdHlsZTtcblxuXHRcdHN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHRcdHN0eWxlLnRyYW5zZm9ybU9yaWdpblxuXHRcdFx0PSBzdHlsZVtcIi13ZWJraXQtdHJhbnNmb3JtLW9yaWdpblwiXVxuXHRcdFx0PSBzdHlsZVtcIi1tb3otdHJhbnNmb3JtLW9yaWdpblwiXVxuXHRcdFx0PSBzdHlsZVtcIi1vLXRyYW5zZm9ybS1vcmlnaW5cIl1cblx0XHRcdD0gc3R5bGVbXCItbXMtdHJhbnNmb3JtLW9yaWdpblwiXSA9IFwiMCUgMCVcIjtcblxuXHRcdHZhciBpbWc6SFRNTERpdkVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0XHRkaXYuYXBwZW5kQ2hpbGQoaW1nKTtcblxuXHRcdGltZy5jbGFzc05hbWUgPSBcIm1hdGVyaWFsXCIgKyBiaWxsYm9hcmQubWF0ZXJpYWwuaWQ7XG5cdH1cbn1cblxuZXhwb3J0ID0gQ1NTQmlsbGJvYXJkUmVuZGVyYWJsZTsiXX0=