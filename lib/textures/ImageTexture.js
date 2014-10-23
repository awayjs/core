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
        if (generateMipmaps === void 0) { generateMipmaps = false; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9pbWFnZXRleHR1cmUudHMiXSwibmFtZXMiOlsiSW1hZ2VUZXh0dXJlIiwiSW1hZ2VUZXh0dXJlLmNvbnN0cnVjdG9yIiwiSW1hZ2VUZXh0dXJlLmh0bWxJbWFnZUVsZW1lbnQiLCJJbWFnZVRleHR1cmUuX2lHZXRUZXh0dXJlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUMzRCxJQUFPLGFBQWEsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzNFLElBQU8sWUFBWSxXQUFjLG9DQUFvQyxDQUFDLENBQUM7QUFHdkUsSUFBTSxZQUFZO0lBQVNBLFVBQXJCQSxZQUFZQSxVQUFzQkE7SUFJdkNBOzs7O09BSUdBO0lBQ0hBLFNBVEtBLFlBQVlBLENBU0xBLGdCQUFpQ0EsRUFBRUEsZUFBK0JBO1FBQS9CQywrQkFBK0JBLEdBQS9CQSx1QkFBK0JBO1FBRTdFQSxrQkFBTUEsZUFBZUEsQ0FBQ0EsQ0FBQ0E7UUFFdkJBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsZ0JBQWdCQSxDQUFDQTtJQUMxQ0EsQ0FBQ0E7SUFLREQsc0JBQVdBLDBDQUFnQkE7UUFIM0JBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO1FBQy9CQSxDQUFDQTthQUVERixVQUE0QkEsS0FBc0JBO1lBRWpERSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLElBQUlBLEtBQUtBLENBQUNBO2dCQUNuQ0EsTUFBTUEsQ0FBQ0E7WUFFUkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDaERBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLGdGQUFnRkEsQ0FBQ0EsQ0FBQ0E7WUFFbkdBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFL0JBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7WUFDekJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQzNDQSxDQUFDQTs7O09BZEFGO0lBZ0JNQSx1Q0FBZ0JBLEdBQXZCQTtRQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUNGSCxtQkFBQ0E7QUFBREEsQ0ExQ0EsQUEwQ0NBLEVBMUMwQixhQUFhLEVBMEN2QztBQUVELEFBQXNCLGlCQUFiLFlBQVksQ0FBQyIsImZpbGUiOiJ0ZXh0dXJlcy9JbWFnZVRleHR1cmUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5pbXBvcnQgVGV4dHVyZTJEQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xuaW1wb3J0IFRleHR1cmVVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1RleHR1cmVVdGlsc1wiKTtcblxuXG5jbGFzcyBJbWFnZVRleHR1cmUgZXh0ZW5kcyBUZXh0dXJlMkRCYXNlXG57XG5cdHByaXZhdGUgX2h0bWxJbWFnZUVsZW1lbnQ6SFRNTEltYWdlRWxlbWVudDtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGh0bWxJbWFnZUVsZW1lbnRcblx0ICogQHBhcmFtIGdlbmVyYXRlTWlwbWFwc1xuXHQgKi9cblx0Y29uc3RydWN0b3IoaHRtbEltYWdlRWxlbWVudDpIVE1MSW1hZ2VFbGVtZW50LCBnZW5lcmF0ZU1pcG1hcHM6Ym9vbGVhbiA9IGZhbHNlKVxuXHR7XG5cdFx0c3VwZXIoZ2VuZXJhdGVNaXBtYXBzKTtcblxuXHRcdHRoaXMuaHRtbEltYWdlRWxlbWVudCA9IGh0bWxJbWFnZUVsZW1lbnQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaHRtbEltYWdlRWxlbWVudCgpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9odG1sSW1hZ2VFbGVtZW50O1xuXHR9XG5cblx0cHVibGljIHNldCBodG1sSW1hZ2VFbGVtZW50KHZhbHVlOkhUTUxJbWFnZUVsZW1lbnQpXG5cdHtcblx0XHRpZiAodGhpcy5faHRtbEltYWdlRWxlbWVudCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICghVGV4dHVyZVV0aWxzLmlzSFRNTEltYWdlRWxlbWVudFZhbGlkKHZhbHVlKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYml0bWFwRGF0YTogV2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIHBvd2VyIG9mIDIgYW5kIGNhbm5vdCBleGNlZWQgMjA0OFwiKTtcblxuXHRcdHRoaXMuX2h0bWxJbWFnZUVsZW1lbnQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblx0XHR0aGlzLl9wU2V0U2l6ZSh2YWx1ZS53aWR0aCwgdmFsdWUuaGVpZ2h0KTtcblx0fVxuXG5cdHB1YmxpYyBfaUdldFRleHR1cmVEYXRhKCk6SFRNTEltYWdlRWxlbWVudFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2h0bWxJbWFnZUVsZW1lbnQ7XG5cdH1cbn1cblxuZXhwb3J0ID0gSW1hZ2VUZXh0dXJlOyJdfQ==