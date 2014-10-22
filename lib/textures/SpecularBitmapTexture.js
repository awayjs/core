var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BitmapData = require("awayjs-core/lib/core/base/BitmapData");
var BitmapDataChannel = require("awayjs-core/lib/core/base/BitmapDataChannel");
var Point = require("awayjs-core/lib/core/geom/Point");

var BitmapTexture = require("awayjs-core/lib/textures/BitmapTexture");

/**
* A convenience texture that encodes a specular map in the red channel, and the gloss map in the green channel, as expected by BasicSpecularMapMethod
*/
var SpecularBitmapTexture = (function (_super) {
    __extends(SpecularBitmapTexture, _super);
    function SpecularBitmapTexture(specularMap, glossMap, generateMipmaps) {
        if (typeof specularMap === "undefined") { specularMap = null; }
        if (typeof glossMap === "undefined") { glossMap = null; }
        if (typeof generateMipmaps === "undefined") { generateMipmaps = true; }
        var bmd = specularMap ? specularMap : glossMap;

        bmd = bmd ? new BitmapData(bmd.width, bmd.height, false, 0xffffff) : new BitmapData(1, 1, false, 0xffffff);

        _super.call(this, bmd, generateMipmaps);

        this.specularMap = specularMap;
        this.glossMap = glossMap;
    }
    Object.defineProperty(SpecularBitmapTexture.prototype, "specularMap", {
        get: function () {
            return this._specularMap;
        },
        set: function (value) {
            this._specularMap = value;

            this.invalidateContent();

            this._testSize();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(SpecularBitmapTexture.prototype, "glossMap", {
        get: function () {
            return this._glossMap;
        },
        set: function (value) {
            this._glossMap = value;
            this.invalidateContent();

            this._testSize();
        },
        enumerable: true,
        configurable: true
    });


    SpecularBitmapTexture.prototype._testSize = function () {
        var w, h;

        if (this._specularMap) {
            w = this._specularMap.width;
            h = this._specularMap.height;
        } else if (this._glossMap) {
            w = this._glossMap.width;
            h = this._glossMap.height;
        } else {
            w = 1;
            h = 1;
        }

        if (w != this._bitmapData.width && h != this._bitmapData.height) {
            var oldBitmap = this._bitmapData;
            this.bitmapData = new BitmapData(this._specularMap.width, this._specularMap.height, false, 0xffffff);
            oldBitmap.dispose();
        }
    };

    SpecularBitmapTexture.prototype._iGetTextureData = function () {
        var rect = this._specularMap.rect;
        var origin = new Point();

        this._bitmapData.fillRect(rect, 0xffffff);

        if (this._glossMap)
            this._bitmapData.copyChannel(this._glossMap, rect, origin, BitmapDataChannel.GREEN, BitmapDataChannel.GREEN);

        if (this._specularMap)
            this._bitmapData.copyChannel(this._specularMap, rect, origin, BitmapDataChannel.RED, BitmapDataChannel.RED);

        return this._bitmapData;
    };
    return SpecularBitmapTexture;
})(BitmapTexture);

module.exports = SpecularBitmapTexture;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHR1cmVzL1NwZWN1bGFyQml0bWFwVGV4dHVyZS50cyJdLCJuYW1lcyI6WyJTcGVjdWxhckJpdG1hcFRleHR1cmUiLCJTcGVjdWxhckJpdG1hcFRleHR1cmUuY29uc3RydWN0b3IiLCJTcGVjdWxhckJpdG1hcFRleHR1cmUuX3Rlc3RTaXplIiwiU3BlY3VsYXJCaXRtYXBUZXh0dXJlLl9pR2V0VGV4dHVyZURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdFQUF1RTtBQUN2RSw4RUFBbUY7QUFDbkYsc0RBQThEOztBQUU5RCxxRUFBMkU7O0FBRTNFOztFQUVHO0FBQ0g7SUFBb0NBLHdDQUFhQTtJQUtoREEsK0JBQVlBLFdBQTZCQSxFQUFFQSxRQUEwQkEsRUFBRUEsZUFBOEJBO1FBQXpGQywwQ0FBQUEsV0FBV0EsR0FBY0EsSUFBSUE7QUFBQUEsUUFBRUEsdUNBQUFBLFFBQVFBLEdBQWNBLElBQUlBO0FBQUFBLFFBQUVBLDhDQUFBQSxlQUFlQSxHQUFXQSxJQUFJQTtBQUFBQSxRQUVwR0EsSUFBSUEsR0FBR0EsR0FBY0EsV0FBV0EsR0FBRUEsV0FBV0EsR0FBR0EsUUFBUUE7O1FBRXhEQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFFQSxJQUFJQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQSxHQUFHQSxJQUFJQSxVQUFVQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQTs7UUFFekdBLFdBQU1BLE9BQUFBLEdBQUdBLEVBQUVBLGVBQWVBLENBQUNBOztRQUUzQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsV0FBV0E7UUFDOUJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBO0lBQ3pCQSxDQUFDQTtJQUVERDtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQTtRQUN6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ZXh0dXJlcy9TcGVjdWxhckJpdG1hcFRleHR1cmUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQml0bWFwRGF0YVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9CaXRtYXBEYXRhXCIpO1xuaW1wb3J0IEJpdG1hcERhdGFDaGFubmVsXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvQml0bWFwRGF0YUNoYW5uZWxcIik7XG5pbXBvcnQgUG9pbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9Qb2ludFwiKTtcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUmVjdGFuZ2xlXCIpO1xuaW1wb3J0IEJpdG1hcFRleHR1cmVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvQml0bWFwVGV4dHVyZVwiKTtcblxuLyoqXG4gKiBBIGNvbnZlbmllbmNlIHRleHR1cmUgdGhhdCBlbmNvZGVzIGEgc3BlY3VsYXIgbWFwIGluIHRoZSByZWQgY2hhbm5lbCwgYW5kIHRoZSBnbG9zcyBtYXAgaW4gdGhlIGdyZWVuIGNoYW5uZWwsIGFzIGV4cGVjdGVkIGJ5IEJhc2ljU3BlY3VsYXJNYXBNZXRob2RcbiAqL1xuY2xhc3MgU3BlY3VsYXJCaXRtYXBUZXh0dXJlIGV4dGVuZHMgQml0bWFwVGV4dHVyZVxue1xuXHRwcml2YXRlIF9zcGVjdWxhck1hcDpCaXRtYXBEYXRhO1xuXHRwcml2YXRlIF9nbG9zc01hcDpCaXRtYXBEYXRhO1xuXHRcblx0Y29uc3RydWN0b3Ioc3BlY3VsYXJNYXA6Qml0bWFwRGF0YSA9IG51bGwsIGdsb3NzTWFwOkJpdG1hcERhdGEgPSBudWxsLCBnZW5lcmF0ZU1pcG1hcHM6Ym9vbGVhbiA9IHRydWUpXG5cdHtcblx0XHR2YXIgYm1kOkJpdG1hcERhdGEgPSBzcGVjdWxhck1hcD8gc3BlY3VsYXJNYXAgOiBnbG9zc01hcDtcblxuXHRcdGJtZCA9IGJtZD8gbmV3IEJpdG1hcERhdGEoYm1kLndpZHRoLCBibWQuaGVpZ2h0LCBmYWxzZSwgMHhmZmZmZmYpIDogbmV3IEJpdG1hcERhdGEoMSwgMSwgZmFsc2UsIDB4ZmZmZmZmKTtcblx0XHRcblx0XHRzdXBlcihibWQsIGdlbmVyYXRlTWlwbWFwcyk7XG5cdFx0XG5cdFx0dGhpcy5zcGVjdWxhck1hcCA9IHNwZWN1bGFyTWFwO1xuXHRcdHRoaXMuZ2xvc3NNYXAgPSBnbG9zc01hcDtcblx0fVxuXHRcblx0cHVibGljIGdldCBzcGVjdWxhck1hcCgpOkJpdG1hcERhdGFcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zcGVjdWxhck1hcDtcblx0fVxuXHRcblx0cHVibGljIHNldCBzcGVjdWxhck1hcCh2YWx1ZTpCaXRtYXBEYXRhKVxuXHR7XG5cdFx0dGhpcy5fc3BlY3VsYXJNYXAgPSB2YWx1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblx0XHRcblx0XHR0aGlzLl90ZXN0U2l6ZSgpO1xuXHR9XG5cdFxuXHRwdWJsaWMgZ2V0IGdsb3NzTWFwKCk6Qml0bWFwRGF0YVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2dsb3NzTWFwO1xuXHR9XG5cdFxuXHRwdWJsaWMgc2V0IGdsb3NzTWFwKHZhbHVlOkJpdG1hcERhdGEpXG5cdHtcblx0XHR0aGlzLl9nbG9zc01hcCA9IHZhbHVlO1xuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblx0XHRcblx0XHR0aGlzLl90ZXN0U2l6ZSgpO1xuXHR9XG5cdFxuXHRwcml2YXRlIF90ZXN0U2l6ZSgpXG5cdHtcblx0XHR2YXIgdzpOdW1iZXIsIGg6TnVtYmVyO1xuXHRcdFxuXHRcdGlmICh0aGlzLl9zcGVjdWxhck1hcCkge1xuXHRcdFx0dyA9IHRoaXMuX3NwZWN1bGFyTWFwLndpZHRoO1xuXHRcdFx0aCA9IHRoaXMuX3NwZWN1bGFyTWFwLmhlaWdodDtcblx0XHR9IGVsc2UgaWYgKHRoaXMuX2dsb3NzTWFwKSB7XG5cdFx0XHR3ID0gdGhpcy5fZ2xvc3NNYXAud2lkdGg7XG5cdFx0XHRoID0gdGhpcy5fZ2xvc3NNYXAuaGVpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3ID0gMTtcblx0XHRcdGggPSAxO1xuXHRcdH1cblx0XHRcblx0XHRpZiAodyAhPSB0aGlzLl9iaXRtYXBEYXRhLndpZHRoICYmIGggIT0gdGhpcy5fYml0bWFwRGF0YS5oZWlnaHQpIHtcblx0XHRcdHZhciBvbGRCaXRtYXA6Qml0bWFwRGF0YSA9IHRoaXMuX2JpdG1hcERhdGE7XG5cdFx0XHR0aGlzLmJpdG1hcERhdGEgPSBuZXcgQml0bWFwRGF0YSh0aGlzLl9zcGVjdWxhck1hcC53aWR0aCwgdGhpcy5fc3BlY3VsYXJNYXAuaGVpZ2h0LCBmYWxzZSwgMHhmZmZmZmYpO1xuXHRcdFx0b2xkQml0bWFwLmRpc3Bvc2UoKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRUZXh0dXJlRGF0YSgpOkJpdG1hcERhdGFcblx0e1xuXHRcdHZhciByZWN0OlJlY3RhbmdsZSA9IHRoaXMuX3NwZWN1bGFyTWFwLnJlY3Q7XG5cdFx0dmFyIG9yaWdpbjpQb2ludCA9IG5ldyBQb2ludCgpO1xuXG5cdFx0dGhpcy5fYml0bWFwRGF0YS5maWxsUmVjdChyZWN0LCAweGZmZmZmZik7XG5cblx0XHRpZiAodGhpcy5fZ2xvc3NNYXApXG5cdFx0XHR0aGlzLl9iaXRtYXBEYXRhLmNvcHlDaGFubmVsKHRoaXMuX2dsb3NzTWFwLCByZWN0LCBvcmlnaW4sIEJpdG1hcERhdGFDaGFubmVsLkdSRUVOLCBCaXRtYXBEYXRhQ2hhbm5lbC5HUkVFTik7XG5cblx0XHRpZiAodGhpcy5fc3BlY3VsYXJNYXApXG5cdFx0XHR0aGlzLl9iaXRtYXBEYXRhLmNvcHlDaGFubmVsKHRoaXMuX3NwZWN1bGFyTWFwLCByZWN0LCBvcmlnaW4sIEJpdG1hcERhdGFDaGFubmVsLlJFRCwgQml0bWFwRGF0YUNoYW5uZWwuUkVEKTtcblxuXHRcdHJldHVybiB0aGlzLl9iaXRtYXBEYXRhO1xuXHR9XG59XG5cbmV4cG9ydCA9IFNwZWN1bGFyQml0bWFwVGV4dHVyZTsiXX0=