var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CSSRenderableBase = require("awayjs-core/lib/core/pool/CSSRenderableBase");

/**
* @class away.pool.CSSSkyboxRenderable
*/
var CSSSkyboxRenderable = (function (_super) {
    __extends(CSSSkyboxRenderable, _super);
    function CSSSkyboxRenderable(pool, skyBox) {
        _super.call(this, pool, skyBox, skyBox);

        var div = document.createElement("div");
        div.onmousedown = function (event) {
            return false;
        };

        this.htmlElement = div;

        var style = div.style;
        var img;

        //create the six images that make up the skybox
        style.position = "absolute";
        style.transformOrigin = style["-webkit-transform-origin"] = style["-moz-transform-origin"] = style["-o-transform-origin"] = style["-ms-transform-origin"] = "0% 0%";

        img = document.createElement("div");

        div.appendChild(img);

        img.className = "material" + skyBox.material.id;
    }
    CSSSkyboxRenderable.id = "skybox";
    return CSSSkyboxRenderable;
})(CSSRenderableBase);

module.exports = CSSSkyboxRenderable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcG9vbC9DU1NTa3lib3hSZW5kZXJhYmxlLnRzIl0sIm5hbWVzIjpbIkNTU1NreWJveFJlbmRlcmFibGUiLCJDU1NTa3lib3hSZW5kZXJhYmxlLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4RUFBb0Y7O0FBS3BGOztFQUVHO0FBQ0g7SUFBa0NBLHNDQUFpQkE7SUFJbERBLDZCQUFZQSxJQUFtQkEsRUFBRUEsTUFBYUE7UUFFN0NDLFdBQU1BLE9BQUFBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLENBQUNBOztRQUUzQkEsSUFBSUEsR0FBR0EsR0FBbUNBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBO1FBQ3ZFQSxHQUFHQSxDQUFDQSxXQUFXQSxHQUFHQSxVQUFDQSxLQUFnQkE7bUJBQUtBLEtBQUtBO1FBQUxBLENBQUtBOztRQUU3Q0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsR0FBR0E7O1FBRXRCQSxJQUFJQSxLQUFLQSxHQUF3QkEsR0FBR0EsQ0FBQ0EsS0FBS0E7UUFDMUNBLElBQUlBLEdBQUdBOztRQUVQQSwrQ0FBK0NBO1FBQy9DQSxLQUFLQSxDQUFDQSxRQUFRQSxHQUFHQSxVQUFVQTtRQUMzQkEsS0FBS0EsQ0FBQ0EsZUFBZUEsR0FDbEJBLEtBQUtBLENBQUNBLDBCQUEwQkEsQ0FBQ0EsR0FDakNBLEtBQUtBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsR0FDOUJBLEtBQUtBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsR0FDNUJBLEtBQUtBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsR0FBR0EsT0FBT0E7O1FBRTFDQSxHQUFHQSxHQUFvQkEsUUFBUUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7O1FBRXBEQSxHQUFHQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQTs7UUFFcEJBLEdBQUdBLENBQUNBLFNBQVNBLEdBQUdBLFVBQVVBLEdBQUdBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLEVBQUVBO0lBQ2hEQSxDQUFDQTtJQTNCREQseUJBQTBCQSxRQUFRQTtJQTRCbkNBLDJCQUFDQTtBQUFEQSxDQUFDQSxFQTlCaUMsaUJBQWlCLEVBOEJsRDs7QUFFRCxvQ0FBNkIsQ0FBQSIsImZpbGUiOiJjb3JlL3Bvb2wvQ1NTU2t5Ym94UmVuZGVyYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDU1NSZW5kZXJhYmxlQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvQ1NTUmVuZGVyYWJsZUJhc2VcIik7XG5pbXBvcnQgUmVuZGVyYWJsZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvUmVuZGVyYWJsZVBvb2xcIik7XG5pbXBvcnQgU2t5Ym94XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL1NreWJveFwiKTtcblxuXG4vKipcbiAqIEBjbGFzcyBhd2F5LnBvb2wuQ1NTU2t5Ym94UmVuZGVyYWJsZVxuICovXG5jbGFzcyBDU1NTa3lib3hSZW5kZXJhYmxlIGV4dGVuZHMgQ1NTUmVuZGVyYWJsZUJhc2Vcbntcblx0cHVibGljIHN0YXRpYyBpZDpzdHJpbmcgPSBcInNreWJveFwiO1xuXG5cdGNvbnN0cnVjdG9yKHBvb2w6UmVuZGVyYWJsZVBvb2wsIHNreUJveDpTa3lib3gpXG5cdHtcblx0XHRzdXBlcihwb29sLCBza3lCb3gsIHNreUJveCk7XG5cblx0XHR2YXIgZGl2OkhUTUxEaXZFbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGRpdi5vbm1vdXNlZG93biA9IChldmVudDpNb3VzZUV2ZW50KSA9PiBmYWxzZTtcblxuXHRcdHRoaXMuaHRtbEVsZW1lbnQgPSBkaXY7XG5cblx0XHR2YXIgc3R5bGU6TVNTdHlsZUNTU1Byb3BlcnRpZXMgPSBkaXYuc3R5bGU7XG5cdFx0dmFyIGltZzpIVE1MRGl2RWxlbWVudDtcblxuXHRcdC8vY3JlYXRlIHRoZSBzaXggaW1hZ2VzIHRoYXQgbWFrZSB1cCB0aGUgc2t5Ym94XG5cdFx0c3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdFx0c3R5bGUudHJhbnNmb3JtT3JpZ2luXG5cdFx0XHQ9IHN0eWxlW1wiLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luXCJdXG5cdFx0XHQ9IHN0eWxlW1wiLW1vei10cmFuc2Zvcm0tb3JpZ2luXCJdXG5cdFx0XHQ9IHN0eWxlW1wiLW8tdHJhbnNmb3JtLW9yaWdpblwiXVxuXHRcdFx0PSBzdHlsZVtcIi1tcy10cmFuc2Zvcm0tb3JpZ2luXCJdID0gXCIwJSAwJVwiO1xuXG5cdFx0aW1nID0gPEhUTUxEaXZFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdFx0ZGl2LmFwcGVuZENoaWxkKGltZyk7XG5cblx0XHRpbWcuY2xhc3NOYW1lID0gXCJtYXRlcmlhbFwiICsgc2t5Qm94Lm1hdGVyaWFsLmlkO1xuXHR9XG59XG5cbmV4cG9ydCA9IENTU1NreWJveFJlbmRlcmFibGU7Il19