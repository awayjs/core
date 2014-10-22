var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MaterialBase = require("awayjs-core/lib/materials/MaterialBase");
var ImageTexture = require("awayjs-core/lib/textures/ImageTexture");

/**
* MaterialBase forms an abstract base class for any material.
* A material consists of several passes, each of which constitutes at least one render call. Several passes could
* be used for special effects (render lighting for many lights in several passes, render an outline in a separate
* pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
* subsurface scattering, or rendering a depth map for specialized self-shadowing).
*
* Away3D provides default materials trough SinglePassMaterialBase and MultiPassMaterialBase, which use modular
* methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
* shaders, or entire new material frameworks.
*/
var CSSMaterialBase = (function (_super) {
    __extends(CSSMaterialBase, _super);
    /**
    * Creates a new MaterialBase object.
    */
    function CSSMaterialBase(texture, smooth, repeat) {
        if (typeof texture === "undefined") { texture = null; }
        if (typeof smooth === "undefined") { smooth = true; }
        if (typeof repeat === "undefined") { repeat = false; }
        _super.call(this);

        this._iMaterialId = Number(this.id);

        this.texture = texture;

        this.smooth = smooth;
        this.repeat = repeat;
    }
    Object.defineProperty(CSSMaterialBase.prototype, "imageElement", {
        get: function () {
            return this._imageElement;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CSSMaterialBase.prototype, "imageStyle", {
        get: function () {
            return this._imageStyle;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CSSMaterialBase.prototype, "texture", {
        /**
        * The texture object to use for the albedo colour.
        */
        get: function () {
            return this._pTexture;
        },
        set: function (value) {
            if (this._pTexture == value)
                return;

            this._pTexture = value;

            if (value instanceof ImageTexture) {
                this._imageElement = value.htmlImageElement;

                var node = document.createElement("style");
                node.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(node);

                var sheet = document.styleSheets[document.styleSheets.length - 1];
                sheet.insertRule(".material" + this.id + "{ }", 0);
                var style = sheet.cssRules[0].style;

                style.backgroundImage = "url(" + this._imageElement.src + ")";
                style.backgroundSize = "100% 100%";
                style.position = "absolute";
                style.width = this._imageElement.width + "px";
                style.height = this._imageElement.height + "px";
                style.transformOrigin = style["-webkit-transform-origin"] = style["-moz-transform-origin"] = style["-o-transform-origin"] = style["-ms-transform-origin"] = "0% 0%";

                this._pHeight = this._imageElement.height;
                this._pWidth = this._imageElement.width;

                this._pNotifySizeChanged();
            }
        },
        enumerable: true,
        configurable: true
    });

    return CSSMaterialBase;
})(MaterialBase);

module.exports = CSSMaterialBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFscy9DU1NNYXRlcmlhbEJhc2UudHMiXSwibmFtZXMiOlsiQ1NTTWF0ZXJpYWxCYXNlIiwiQ1NTTWF0ZXJpYWxCYXNlLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvRUFBNEU7QUFDNUUsbUVBQTJFOztBQUczRTs7Ozs7Ozs7OztFQVVHO0FBQ0g7SUFBOEJBLGtDQUFZQTtJQStEekNBOztNQURHQTtJQUNIQSx5QkFBWUEsT0FBNEJBLEVBQUVBLE1BQXFCQSxFQUFFQSxNQUFzQkE7UUFBM0VDLHNDQUFBQSxPQUFPQSxHQUFpQkEsSUFBSUE7QUFBQUEsUUFBRUEscUNBQUFBLE1BQU1BLEdBQVdBLElBQUlBO0FBQUFBLFFBQUVBLHFDQUFBQSxNQUFNQSxHQUFXQSxLQUFLQTtBQUFBQSxRQUV0RkEsV0FBTUEsS0FBQUEsQ0FBQ0E7O1FBRVBBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBOztRQUVuQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsT0FBT0E7O1FBRXRCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUE7SUFDckJBLENBQUNBO0lBbkVERDtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxhQUFhQTtRQUMxQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFFREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsV0FBV0E7UUFDeEJBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxTQUFTQTtRQUN0QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBbUJBLEtBQW1CQTtZQUVyQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsS0FBS0E7Z0JBQzFCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0E7O1lBRXRCQSxJQUFJQSxLQUFLQSxZQUFZQSxZQUFZQSxDQUFFQTtnQkFDbENBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLEtBQXFCQSxDQUFFQSxnQkFBZ0JBOztnQkFFNURBLElBQUlBLElBQUlBLEdBQW9CQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQTtnQkFDM0RBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLFVBQVVBO2dCQUN0QkEsUUFBUUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQTs7Z0JBRTFEQSxJQUFJQSxLQUFLQSxHQUFpQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9GQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDbERBLElBQUlBLEtBQUtBLEdBQXdCQSxLQUFxQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBRUEsS0FBS0E7O2dCQUV6RUEsS0FBS0EsQ0FBQ0EsZUFBZUEsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0E7Z0JBQzdEQSxLQUFLQSxDQUFDQSxjQUFjQSxHQUFHQSxXQUFXQTtnQkFDbENBLEtBQUtBLENBQUNBLFFBQVFBLEdBQUdBLFVBQVVBO2dCQUMzQkEsS0FBS0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUE7Z0JBQzdDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQTtnQkFDL0NBLEtBQUtBLENBQUNBLGVBQWVBLEdBQ2xCQSxLQUFLQSxDQUFDQSwwQkFBMEJBLENBQUNBLEdBQ2pDQSxLQUFLQSxDQUFDQSx1QkFBdUJBLENBQUNBLEdBQzlCQSxLQUFLQSxDQUFDQSxxQkFBcUJBLENBQUNBLEdBQzVCQSxLQUFLQSxDQUFDQSxzQkFBc0JBLENBQUNBLEdBQUdBLE9BQU9BOztnQkFFMUNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BO2dCQUN6Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0E7O2dCQUV2Q0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQTthQUMxQkE7UUFDRkEsQ0FBQ0E7Ozs7QUFwQ0FBO0lBb0RGQSx1QkFBQ0E7QUFBREEsQ0FBQ0EsRUExRTZCLFlBQVksRUEwRXpDOztBQUVELGdDQUF5QixDQUFBIiwiZmlsZSI6Im1hdGVyaWFscy9DU1NNYXRlcmlhbEJhc2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xuaW1wb3J0IEltYWdlVGV4dHVyZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvSW1hZ2VUZXh0dXJlXCIpO1xuaW1wb3J0IFRleHR1cmUyREJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xuXG4vKipcbiAqIE1hdGVyaWFsQmFzZSBmb3JtcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBhbnkgbWF0ZXJpYWwuXG4gKiBBIG1hdGVyaWFsIGNvbnNpc3RzIG9mIHNldmVyYWwgcGFzc2VzLCBlYWNoIG9mIHdoaWNoIGNvbnN0aXR1dGVzIGF0IGxlYXN0IG9uZSByZW5kZXIgY2FsbC4gU2V2ZXJhbCBwYXNzZXMgY291bGRcbiAqIGJlIHVzZWQgZm9yIHNwZWNpYWwgZWZmZWN0cyAocmVuZGVyIGxpZ2h0aW5nIGZvciBtYW55IGxpZ2h0cyBpbiBzZXZlcmFsIHBhc3NlcywgcmVuZGVyIGFuIG91dGxpbmUgaW4gYSBzZXBhcmF0ZVxuICogcGFzcykgb3IgdG8gcHJvdmlkZSBhZGRpdGlvbmFsIHJlbmRlci10by10ZXh0dXJlIHBhc3NlcyAocmVuZGVyaW5nIGRpZmZ1c2UgbGlnaHQgdG8gdGV4dHVyZSBmb3IgdGV4dHVyZS1zcGFjZVxuICogc3Vic3VyZmFjZSBzY2F0dGVyaW5nLCBvciByZW5kZXJpbmcgYSBkZXB0aCBtYXAgZm9yIHNwZWNpYWxpemVkIHNlbGYtc2hhZG93aW5nKS5cbiAqXG4gKiBBd2F5M0QgcHJvdmlkZXMgZGVmYXVsdCBtYXRlcmlhbHMgdHJvdWdoIFNpbmdsZVBhc3NNYXRlcmlhbEJhc2UgYW5kIE11bHRpUGFzc01hdGVyaWFsQmFzZSwgd2hpY2ggdXNlIG1vZHVsYXJcbiAqIG1ldGhvZHMgdG8gYnVpbGQgdGhlIHNoYWRlciBjb2RlLiBNYXRlcmlhbEJhc2UgY2FuIGJlIGV4dGVuZGVkIHRvIGJ1aWxkIHNwZWNpZmljIGFuZCBoaWdoLXBlcmZvcm1hbnQgY3VzdG9tXG4gKiBzaGFkZXJzLCBvciBlbnRpcmUgbmV3IG1hdGVyaWFsIGZyYW1ld29ya3MuXG4gKi9cbmNsYXNzIENTU01hdGVyaWFsQmFzZSBleHRlbmRzIE1hdGVyaWFsQmFzZVxue1xuXHRwcml2YXRlIF9pbWFnZUVsZW1lbnQ6SFRNTEltYWdlRWxlbWVudDtcblx0cHJpdmF0ZSBfaW1hZ2VTdHlsZTpNU1N0eWxlQ1NTUHJvcGVydGllcztcblxuXG5cdHB1YmxpYyBnZXQgaW1hZ2VFbGVtZW50KCk6SFRNTEltYWdlRWxlbWVudFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ltYWdlRWxlbWVudDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgaW1hZ2VTdHlsZSgpOk1TU3R5bGVDU1NQcm9wZXJ0aWVzXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faW1hZ2VTdHlsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdGV4dHVyZSBvYmplY3QgdG8gdXNlIGZvciB0aGUgYWxiZWRvIGNvbG91ci5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGV4dHVyZSgpOlRleHR1cmUyREJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wVGV4dHVyZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdGV4dHVyZSh2YWx1ZTpUZXh0dXJlMkRCYXNlKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BUZXh0dXJlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFRleHR1cmUgPSB2YWx1ZTtcblxuXHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEltYWdlVGV4dHVyZSkge1xuXHRcdFx0dGhpcy5faW1hZ2VFbGVtZW50ID0gKDxJbWFnZVRleHR1cmU+IHZhbHVlKS5odG1sSW1hZ2VFbGVtZW50O1xuXG5cdFx0XHR2YXIgbm9kZTpIVE1MU3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXHRcdFx0bm9kZS50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKG5vZGUpO1xuXG5cdFx0XHR2YXIgc2hlZXQ6Q1NTU3R5bGVTaGVldCA9IDxDU1NTdHlsZVNoZWV0PiBkb2N1bWVudC5zdHlsZVNoZWV0c1tkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGggLSAxXTtcblx0XHRcdHNoZWV0Lmluc2VydFJ1bGUoXCIubWF0ZXJpYWxcIiArIHRoaXMuaWQgKyBcInsgfVwiLCAwKTtcblx0XHRcdHZhciBzdHlsZTpNU1N0eWxlQ1NTUHJvcGVydGllcyA9ICg8Q1NTU3R5bGVSdWxlPiBzaGVldC5jc3NSdWxlc1swXSkuc3R5bGU7XG5cblx0XHRcdHN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiICsgdGhpcy5faW1hZ2VFbGVtZW50LnNyYyArIFwiKVwiO1xuXHRcdFx0c3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjEwMCUgMTAwJVwiO1xuXHRcdFx0c3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdFx0XHRzdHlsZS53aWR0aCA9IHRoaXMuX2ltYWdlRWxlbWVudC53aWR0aCArIFwicHhcIjtcblx0XHRcdHN0eWxlLmhlaWdodCA9IHRoaXMuX2ltYWdlRWxlbWVudC5oZWlnaHQgKyBcInB4XCI7XG5cdFx0XHRzdHlsZS50cmFuc2Zvcm1PcmlnaW5cblx0XHRcdFx0PSBzdHlsZVtcIi13ZWJraXQtdHJhbnNmb3JtLW9yaWdpblwiXVxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1vei10cmFuc2Zvcm0tb3JpZ2luXCJdXG5cdFx0XHRcdD0gc3R5bGVbXCItby10cmFuc2Zvcm0tb3JpZ2luXCJdXG5cdFx0XHRcdD0gc3R5bGVbXCItbXMtdHJhbnNmb3JtLW9yaWdpblwiXSA9IFwiMCUgMCVcIjtcblxuXHRcdFx0dGhpcy5fcEhlaWdodCA9IHRoaXMuX2ltYWdlRWxlbWVudC5oZWlnaHQ7XG5cdFx0XHR0aGlzLl9wV2lkdGggPSB0aGlzLl9pbWFnZUVsZW1lbnQud2lkdGg7XG5cblx0XHRcdHRoaXMuX3BOb3RpZnlTaXplQ2hhbmdlZCgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hdGVyaWFsQmFzZSBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih0ZXh0dXJlOlRleHR1cmUyREJhc2UgPSBudWxsLCBzbW9vdGg6Ym9vbGVhbiA9IHRydWUsIHJlcGVhdDpib29sZWFuID0gZmFsc2UpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5faU1hdGVyaWFsSWQgPSBOdW1iZXIodGhpcy5pZCk7XG5cblx0XHR0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xuXG5cdFx0dGhpcy5zbW9vdGggPSBzbW9vdGg7XG5cdFx0dGhpcy5yZXBlYXQgPSByZXBlYXQ7XG5cdH1cbn1cblxuZXhwb3J0ID0gQ1NTTWF0ZXJpYWxCYXNlOyJdfQ==