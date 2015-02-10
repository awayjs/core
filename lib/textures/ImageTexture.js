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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9pbWFnZXRleHR1cmUudHMiXSwibmFtZXMiOlsiSW1hZ2VUZXh0dXJlIiwiSW1hZ2VUZXh0dXJlLmNvbnN0cnVjdG9yIiwiSW1hZ2VUZXh0dXJlLmh0bWxJbWFnZUVsZW1lbnQiLCJJbWFnZVRleHR1cmUuX2lHZXRUZXh0dXJlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUMzRCxJQUFPLGFBQWEsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzNFLElBQU8sWUFBWSxXQUFjLG9DQUFvQyxDQUFDLENBQUM7QUFHdkUsSUFBTSxZQUFZO0lBQVNBLFVBQXJCQSxZQUFZQSxVQUFzQkE7SUFJdkNBOzs7O09BSUdBO0lBQ0hBLFNBVEtBLFlBQVlBLENBU0xBLGdCQUFpQ0E7UUFFNUNDLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7SUFDMUNBLENBQUNBO0lBS0RELHNCQUFXQSwwQ0FBZ0JBO1FBSDNCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7YUFFREYsVUFBNEJBLEtBQXNCQTtZQUVqREUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDbkNBLE1BQU1BLENBQUNBO1lBRVJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hEQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxnRkFBZ0ZBLENBQUNBLENBQUNBO1lBRW5HQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLEtBQUtBLENBQUNBO1lBRS9CQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUMzQ0EsQ0FBQ0E7OztPQWRBRjtJQWdCTUEsdUNBQWdCQSxHQUF2QkE7UUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUFDRkgsbUJBQUNBO0FBQURBLENBMUNBLEFBMENDQSxFQTFDMEIsYUFBYSxFQTBDdkM7QUFFRCxBQUFzQixpQkFBYixZQUFZLENBQUMiLCJmaWxlIjoidGV4dHVyZXMvSW1hZ2VUZXh0dXJlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIu+7v2ltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xuaW1wb3J0IFRleHR1cmUyREJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcbmltcG9ydCBUZXh0dXJlVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9UZXh0dXJlVXRpbHNcIik7XG5cblxuY2xhc3MgSW1hZ2VUZXh0dXJlIGV4dGVuZHMgVGV4dHVyZTJEQmFzZVxue1xuXHRwcml2YXRlIF9odG1sSW1hZ2VFbGVtZW50OkhUTUxJbWFnZUVsZW1lbnQ7XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBodG1sSW1hZ2VFbGVtZW50XG5cdCAqIEBwYXJhbSBnZW5lcmF0ZU1pcG1hcHNcblx0ICovXG5cdGNvbnN0cnVjdG9yKGh0bWxJbWFnZUVsZW1lbnQ6SFRNTEltYWdlRWxlbWVudClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLmh0bWxJbWFnZUVsZW1lbnQgPSBodG1sSW1hZ2VFbGVtZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGh0bWxJbWFnZUVsZW1lbnQoKTpIVE1MSW1hZ2VFbGVtZW50XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faHRtbEltYWdlRWxlbWVudDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgaHRtbEltYWdlRWxlbWVudCh2YWx1ZTpIVE1MSW1hZ2VFbGVtZW50KVxuXHR7XG5cdFx0aWYgKHRoaXMuX2h0bWxJbWFnZUVsZW1lbnQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAoIVRleHR1cmVVdGlscy5pc0hUTUxJbWFnZUVsZW1lbnRWYWxpZCh2YWx1ZSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJpdG1hcERhdGE6IFdpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBwb3dlciBvZiAyIGFuZCBjYW5ub3QgZXhjZWVkIDIwNDhcIik7XG5cblx0XHR0aGlzLl9odG1sSW1hZ2VFbGVtZW50ID0gdmFsdWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgsIHZhbHVlLmhlaWdodCk7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRUZXh0dXJlRGF0YSgpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9odG1sSW1hZ2VFbGVtZW50O1xuXHR9XG59XG5cbmV4cG9ydCA9IEltYWdlVGV4dHVyZTsiXX0=