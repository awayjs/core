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
    function ImageTexture(htmlImageElement) {
        _super.call(this);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9JbWFnZVRleHR1cmUudHMiXSwibmFtZXMiOlsiSW1hZ2VUZXh0dXJlIiwiSW1hZ2VUZXh0dXJlLmNvbnN0cnVjdG9yIiwiSW1hZ2VUZXh0dXJlLmh0bWxJbWFnZUVsZW1lbnQiLCJJbWFnZVRleHR1cmUuX2lHZXRUZXh0dXJlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUMzRCxJQUFPLGFBQWEsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzNFLElBQU8sWUFBWSxXQUFjLG9DQUFvQyxDQUFDLENBQUM7QUFHdkUsSUFBTSxZQUFZO0lBQVNBLFVBQXJCQSxZQUFZQSxVQUFzQkE7SUFJdkNBOzs7O09BSUdBO0lBQ0hBLFNBVEtBLFlBQVlBLENBU0xBLGdCQUFpQ0E7UUFFNUNDLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7SUFDMUNBLENBQUNBO0lBS0RELHNCQUFXQSwwQ0FBZ0JBO1FBSDNCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7YUFFREYsVUFBNEJBLEtBQXNCQTtZQUVqREUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDbkNBLE1BQU1BLENBQUNBO1lBRVJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hEQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxnRkFBZ0ZBLENBQUNBLENBQUNBO1lBRW5HQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLEtBQUtBLENBQUNBO1lBRS9CQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUMzQ0EsQ0FBQ0E7OztPQWRBRjtJQWdCTUEsdUNBQWdCQSxHQUF2QkE7UUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUFDRkgsbUJBQUNBO0FBQURBLENBMUNBLEFBMENDQSxFQTFDMEIsYUFBYSxFQTBDdkM7QUFFRCxBQUFzQixpQkFBYixZQUFZLENBQUMiLCJmaWxlIjoidGV4dHVyZXMvSW1hZ2VUZXh0dXJlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIu+7v2ltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xyXG5pbXBvcnQgVGV4dHVyZTJEQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xyXG5pbXBvcnQgVGV4dHVyZVV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvVGV4dHVyZVV0aWxzXCIpO1xyXG5cclxuXHJcbmNsYXNzIEltYWdlVGV4dHVyZSBleHRlbmRzIFRleHR1cmUyREJhc2Vcclxue1xyXG5cdHByaXZhdGUgX2h0bWxJbWFnZUVsZW1lbnQ6SFRNTEltYWdlRWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaHRtbEltYWdlRWxlbWVudFxyXG5cdCAqIEBwYXJhbSBnZW5lcmF0ZU1pcG1hcHNcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihodG1sSW1hZ2VFbGVtZW50OkhUTUxJbWFnZUVsZW1lbnQpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLmh0bWxJbWFnZUVsZW1lbnQgPSBodG1sSW1hZ2VFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGh0bWxJbWFnZUVsZW1lbnQoKTpIVE1MSW1hZ2VFbGVtZW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2h0bWxJbWFnZUVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGh0bWxJbWFnZUVsZW1lbnQodmFsdWU6SFRNTEltYWdlRWxlbWVudClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faHRtbEltYWdlRWxlbWVudCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGlmICghVGV4dHVyZVV0aWxzLmlzSFRNTEltYWdlRWxlbWVudFZhbGlkKHZhbHVlKSlcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiaXRtYXBEYXRhOiBXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgcG93ZXIgb2YgMiBhbmQgY2Fubm90IGV4Y2VlZCAyMDQ4XCIpO1xyXG5cclxuXHRcdHRoaXMuX2h0bWxJbWFnZUVsZW1lbnQgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XHJcblx0XHR0aGlzLl9wU2V0U2l6ZSh2YWx1ZS53aWR0aCwgdmFsdWUuaGVpZ2h0KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUdldFRleHR1cmVEYXRhKCk6SFRNTEltYWdlRWxlbWVudFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9odG1sSW1hZ2VFbGVtZW50O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gSW1hZ2VUZXh0dXJlOyJdfQ==