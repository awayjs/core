var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
var TextureUtils = require("awayjs-core/lib/utils/TextureUtils");

var ImageTexture = (function (_super) {
    __extends(ImageTexture, _super);
    /**
    *
    * @param htmlImageElement
    * @param generateMipmaps
    */
    function ImageTexture(htmlImageElement, generateMipmaps) {
        if (typeof generateMipmaps === "undefined") { generateMipmaps = false; }
        _super.call(this, generateMipmaps);

        this.htmlImageElement = htmlImageElement;
    }
    Object.defineProperty(ImageTexture.prototype, "htmlImageElement", {
        /**
        *
        */
        get: function () {
            return this._htmlImageElement;
        },
        set: function (value) {
            if (this._htmlImageElement == value)
                return;

            if (!TextureUtils.isHTMLImageElementValid(value))
                throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");

            this._htmlImageElement = value;

            this.invalidateContent();
            this._pSetSize(value.width, value.height);
        },
        enumerable: true,
        configurable: true
    });


    ImageTexture.prototype._iGetTextureData = function () {
        return this._htmlImageElement;
    };
    return ImageTexture;
})(Texture2DBase);

module.exports = ImageTexture;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHR1cmVzL0ltYWdlVGV4dHVyZS50cyJdLCJuYW1lcyI6WyJJbWFnZVRleHR1cmUiLCJJbWFnZVRleHR1cmUuY29uc3RydWN0b3IiLCJJbWFnZVRleHR1cmUuX2lHZXRUZXh0dXJlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQTJEO0FBQzNELHFFQUEyRTtBQUMzRSxnRUFBdUU7O0FBRXZFO0lBQTJCQSwrQkFBYUE7SUFTdkNBOzs7O01BREdBO0lBQ0hBLHNCQUFZQSxnQkFBaUNBLEVBQUVBLGVBQStCQTtRQUEvQkMsOENBQUFBLGVBQWVBLEdBQVdBLEtBQUtBO0FBQUFBLFFBRTdFQSxXQUFNQSxPQUFBQSxlQUFlQSxDQUFDQTs7UUFFdEJBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsZ0JBQWdCQTtJQUN6Q0EsQ0FBQ0E7SUFLREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGlCQUFpQkE7UUFDOUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQTRCQSxLQUFzQkE7WUFFakRBLElBQUlBLElBQUlBLENBQUNBLGlCQUFpQkEsSUFBSUEsS0FBS0E7Z0JBQ2xDQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDL0NBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLGdGQUFnRkEsQ0FBQ0EsQ0FBQ0E7O1lBRW5HQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLEtBQUtBOztZQUU5QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDMUNBLENBQUNBOzs7O0FBZEFBOztJQWdCREEsMENBQUFBO1FBRUNFLE9BQU9BLElBQUlBLENBQUNBLGlCQUFpQkE7SUFDOUJBLENBQUNBO0lBQ0ZGLG9CQUFDQTtBQUFEQSxDQUFDQSxFQTFDMEIsYUFBYSxFQTBDdkM7O0FBRUQsNkJBQXNCLENBQUEiLCJmaWxlIjoidGV4dHVyZXMvSW1hZ2VUZXh0dXJlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5pbXBvcnQgVGV4dHVyZTJEQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xuaW1wb3J0IFRleHR1cmVVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1RleHR1cmVVdGlsc1wiKTtcblxuY2xhc3MgSW1hZ2VUZXh0dXJlIGV4dGVuZHMgVGV4dHVyZTJEQmFzZVxue1xuXHRwcml2YXRlIF9odG1sSW1hZ2VFbGVtZW50OkhUTUxJbWFnZUVsZW1lbnQ7XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBodG1sSW1hZ2VFbGVtZW50XG5cdCAqIEBwYXJhbSBnZW5lcmF0ZU1pcG1hcHNcblx0ICovXG5cdGNvbnN0cnVjdG9yKGh0bWxJbWFnZUVsZW1lbnQ6SFRNTEltYWdlRWxlbWVudCwgZ2VuZXJhdGVNaXBtYXBzOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKGdlbmVyYXRlTWlwbWFwcyk7XG5cblx0XHR0aGlzLmh0bWxJbWFnZUVsZW1lbnQgPSBodG1sSW1hZ2VFbGVtZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGh0bWxJbWFnZUVsZW1lbnQoKTpIVE1MSW1hZ2VFbGVtZW50XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faHRtbEltYWdlRWxlbWVudDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgaHRtbEltYWdlRWxlbWVudCh2YWx1ZTpIVE1MSW1hZ2VFbGVtZW50KVxuXHR7XG5cdFx0aWYgKHRoaXMuX2h0bWxJbWFnZUVsZW1lbnQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAoIVRleHR1cmVVdGlscy5pc0hUTUxJbWFnZUVsZW1lbnRWYWxpZCh2YWx1ZSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJpdG1hcERhdGE6IFdpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBwb3dlciBvZiAyIGFuZCBjYW5ub3QgZXhjZWVkIDIwNDhcIik7XG5cblx0XHR0aGlzLl9odG1sSW1hZ2VFbGVtZW50ID0gdmFsdWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgsIHZhbHVlLmhlaWdodCk7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRUZXh0dXJlRGF0YSgpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9odG1sSW1hZ2VFbGVtZW50O1xuXHR9XG59XG5cbmV4cG9ydCA9IEltYWdlVGV4dHVyZTsiXX0=