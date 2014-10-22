var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
var TextureUtils = require("awayjs-core/lib/utils/TextureUtils");

var RenderTexture = (function (_super) {
    __extends(RenderTexture, _super);
    function RenderTexture(width, height) {
        _super.call(this, false);

        this._pSetSize(width, height);
    }
    Object.defineProperty(RenderTexture.prototype, "width", {
        /**
        *
        * @returns {number}
        */
        get: function () {
            return this._pWidth;
        },
        set: function (value) {
            if (value == this._pWidth)
                return;

            if (!TextureUtils.isDimensionValid(value))
                throw new Error("Invalid size: Width and height must be power of 2 and cannot exceed 2048");

            this.invalidateContent();

            this._pSetSize(value, this._pHeight);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(RenderTexture.prototype, "height", {
        /**
        *
        * @returns {number}
        */
        get: function () {
            return this._pHeight;
        },
        set: function (value) {
            if (value == this._pHeight)
                return;

            if (!TextureUtils.isDimensionValid(value))
                throw new Error("Invalid size: Width and height must be power of 2 and cannot exceed 2048");

            this.invalidateContent();
            this._pSetSize(this._pWidth, value);
        },
        enumerable: true,
        configurable: true
    });

    return RenderTexture;
})(Texture2DBase);

module.exports = RenderTexture;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHR1cmVzL1JlbmRlclRleHR1cmUudHMiXSwibmFtZXMiOlsiUmVuZGVyVGV4dHVyZSIsIlJlbmRlclRleHR1cmUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1EQUEyRDtBQUMzRCxxRUFBMkU7QUFDM0UsZ0VBQXVFOztBQUV2RTtJQUE0QkEsZ0NBQWFBO0lBNkN4Q0EsdUJBQVlBLEtBQVlBLEVBQUVBLE1BQWFBO1FBRXRDQyxXQUFNQSxPQUFBQSxLQUFLQSxDQUFDQTs7UUFFWkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsRUFBRUEsTUFBTUEsQ0FBQ0E7SUFDOUJBLENBQUNBO0lBNUNERDtRQUFBQTs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFpQkEsS0FBWUE7WUFFNUJBLElBQUlBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BO2dCQUN4QkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQ3hDQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSwwRUFBMEVBLENBQUNBLENBQUNBOztZQUU3RkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTs7WUFFeEJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3JDQSxDQUFDQTs7OztBQWJBQTs7SUFtQkRBO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBO1FBRURBLEtBQUFBLFVBQWtCQSxLQUFZQTtZQUU3QkEsSUFBSUEsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUE7Z0JBQ3pCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDeENBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLDBFQUEwRUEsQ0FBQ0EsQ0FBQ0E7O1lBRTdGQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxLQUFLQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7Ozs7QUFaQUE7SUFvQkZBLHFCQUFDQTtBQUFEQSxDQUFDQSxFQW5EMkIsYUFBYSxFQW1EeEM7O0FBRUQsOEJBQXVCLENBQUEiLCJmaWxlIjoidGV4dHVyZXMvUmVuZGVyVGV4dHVyZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xuaW1wb3J0IFRleHR1cmUyREJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcbmltcG9ydCBUZXh0dXJlVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9UZXh0dXJlVXRpbHNcIik7XG5cbmNsYXNzIFJlbmRlclRleHR1cmUgZXh0ZW5kcyBUZXh0dXJlMkRCYXNlXG57XG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX3BXaWR0aClcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICghVGV4dHVyZVV0aWxzLmlzRGltZW5zaW9uVmFsaWQodmFsdWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaXplOiBXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgcG93ZXIgb2YgMiBhbmQgY2Fubm90IGV4Y2VlZCAyMDQ4XCIpO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUsIHRoaXMuX3BIZWlnaHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BIZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fcEhlaWdodClcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICghVGV4dHVyZVV0aWxzLmlzRGltZW5zaW9uVmFsaWQodmFsdWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaXplOiBXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgcG93ZXIgb2YgMiBhbmQgY2Fubm90IGV4Y2VlZCAyMDQ4XCIpO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXHRcdHRoaXMuX3BTZXRTaXplKHRoaXMuX3BXaWR0aCwgdmFsdWUpO1xuXHR9XG5cblx0Y29uc3RydWN0b3Iod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKVxuXHR7XG5cdFx0c3VwZXIoZmFsc2UpO1xuXG5cdFx0dGhpcy5fcFNldFNpemUod2lkdGgsIGhlaWdodCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gUmVuZGVyVGV4dHVyZTsiXX0=