var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
var TextureUtils = require("awayjs-core/lib/utils/TextureUtils");
var BitmapTexture = (function (_super) {
    __extends(BitmapTexture, _super);
    function BitmapTexture(bitmapData) {
        _super.call(this);
        this.bitmapData = bitmapData;
    }
    Object.defineProperty(BitmapTexture.prototype, "bitmapData", {
        /**
         *
         * @returns {BitmapData}
         */
        get: function () {
            return this._bitmapData;
        },
        set: function (value) {
            if (this._bitmapData == value)
                return;
            if (!TextureUtils.isBitmapDataValid(value))
                throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
            this._bitmapData = value;
            this.invalidateContent();
            this._pSetSize(value.width, value.height);
        },
        enumerable: true,
        configurable: true
    });
    BitmapTexture.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._bitmapData.dispose();
        this._bitmapData = null;
    };
    BitmapTexture.prototype._iGetTextureData = function () {
        return this._bitmapData;
    };
    return BitmapTexture;
})(Texture2DBase);
module.exports = BitmapTexture;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9CaXRtYXBUZXh0dXJlLnRzIl0sIm5hbWVzIjpbIkJpdG1hcFRleHR1cmUiLCJCaXRtYXBUZXh0dXJlLmNvbnN0cnVjdG9yIiwiQml0bWFwVGV4dHVyZS5iaXRtYXBEYXRhIiwiQml0bWFwVGV4dHVyZS5kaXNwb3NlIiwiQml0bWFwVGV4dHVyZS5faUdldFRleHR1cmVEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQU8sYUFBYSxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDM0UsSUFBTyxZQUFZLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUd2RSxJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQXNCQTtJQTRCeENBLFNBNUJLQSxhQUFhQSxDQTRCTkEsVUFBcUJBO1FBRWhDQyxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsVUFBVUEsQ0FBQ0E7SUFDOUJBLENBQUNBO0lBekJERCxzQkFBV0EscUNBQVVBO1FBSnJCQTs7O1dBR0dBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1FBQ3pCQSxDQUFDQTthQUVERixVQUFzQkEsS0FBZ0JBO1lBRXJDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDN0JBLE1BQU1BLENBQUNBO1lBRVJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxnRkFBZ0ZBLENBQUNBLENBQUNBO1lBRW5HQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUV6QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtZQUV6QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLENBQUNBOzs7T0FmQUY7SUF3Qk1BLCtCQUFPQSxHQUFkQTtRQUVDRyxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7UUFFaEJBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQzNCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFTUgsd0NBQWdCQSxHQUF2QkE7UUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDekJBLENBQUNBO0lBQ0ZKLG9CQUFDQTtBQUFEQSxDQS9DQSxBQStDQ0EsRUEvQzJCLGFBQWEsRUErQ3hDO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6InRleHR1cmVzL0JpdG1hcFRleHR1cmUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGFcIik7XHJcbmltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xyXG5pbXBvcnQgVGV4dHVyZTJEQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xyXG5pbXBvcnQgVGV4dHVyZVV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvVGV4dHVyZVV0aWxzXCIpO1xyXG5cclxuXHJcbmNsYXNzIEJpdG1hcFRleHR1cmUgZXh0ZW5kcyBUZXh0dXJlMkRCYXNlXHJcbntcclxuXHRwdWJsaWMgX2JpdG1hcERhdGE6Qml0bWFwRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7Qml0bWFwRGF0YX1cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJpdG1hcERhdGEoKTpCaXRtYXBEYXRhXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGE7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGJpdG1hcERhdGEodmFsdWU6Qml0bWFwRGF0YSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYml0bWFwRGF0YSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGlmICghVGV4dHVyZVV0aWxzLmlzQml0bWFwRGF0YVZhbGlkKHZhbHVlKSlcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiaXRtYXBEYXRhOiBXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgcG93ZXIgb2YgMiBhbmQgY2Fubm90IGV4Y2VlZCAyMDQ4XCIpO1xyXG5cclxuXHRcdHRoaXMuX2JpdG1hcERhdGEgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XHJcblxyXG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgsIHZhbHVlLmhlaWdodCk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihiaXRtYXBEYXRhOkJpdG1hcERhdGEpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLmJpdG1hcERhdGEgPSBiaXRtYXBEYXRhO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR0aGlzLl9iaXRtYXBEYXRhLmRpc3Bvc2UoKTtcclxuXHRcdHRoaXMuX2JpdG1hcERhdGEgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pR2V0VGV4dHVyZURhdGEoKTpCaXRtYXBEYXRhXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGE7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBCaXRtYXBUZXh0dXJlOyJdfQ==