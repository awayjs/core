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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9CaXRtYXBUZXh0dXJlLnRzIl0sIm5hbWVzIjpbIkJpdG1hcFRleHR1cmUiLCJCaXRtYXBUZXh0dXJlLmNvbnN0cnVjdG9yIiwiQml0bWFwVGV4dHVyZS5iaXRtYXBEYXRhIiwiQml0bWFwVGV4dHVyZS5kaXNwb3NlIiwiQml0bWFwVGV4dHVyZS5faUdldFRleHR1cmVEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQU8sYUFBYSxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDM0UsSUFBTyxZQUFZLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUd2RSxJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQXNCQTtJQTRCeENBLFNBNUJLQSxhQUFhQSxDQTRCTkEsVUFBcUJBO1FBRWhDQyxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsVUFBVUEsQ0FBQ0E7SUFDOUJBLENBQUNBO0lBekJERCxzQkFBV0EscUNBQVVBO1FBSnJCQTs7O1dBR0dBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1FBQ3pCQSxDQUFDQTthQUVERixVQUFzQkEsS0FBZ0JBO1lBRXJDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDN0JBLE1BQU1BLENBQUNBO1lBRVJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxnRkFBZ0ZBLENBQUNBLENBQUNBO1lBRW5HQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUV6QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtZQUV6QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLENBQUNBOzs7T0FmQUY7SUF3Qk1BLCtCQUFPQSxHQUFkQTtRQUVDRyxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7UUFFaEJBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQzNCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFTUgsd0NBQWdCQSxHQUF2QkE7UUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDekJBLENBQUNBO0lBQ0ZKLG9CQUFDQTtBQUFEQSxDQS9DQSxBQStDQ0EsRUEvQzJCLGFBQWEsRUErQ3hDO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6InRleHR1cmVzL0JpdG1hcFRleHR1cmUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGFcIik7XG5pbXBvcnQgRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcbmltcG9ydCBUZXh0dXJlMkRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL1RleHR1cmUyREJhc2VcIik7XG5pbXBvcnQgVGV4dHVyZVV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvVGV4dHVyZVV0aWxzXCIpO1xuXG5cbmNsYXNzIEJpdG1hcFRleHR1cmUgZXh0ZW5kcyBUZXh0dXJlMkRCYXNlXG57XG5cdHB1YmxpYyBfYml0bWFwRGF0YTpCaXRtYXBEYXRhO1xuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Qml0bWFwRGF0YX1cblx0ICovXG5cdHB1YmxpYyBnZXQgYml0bWFwRGF0YSgpOkJpdG1hcERhdGFcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iaXRtYXBEYXRhO1xuXHR9XG5cblx0cHVibGljIHNldCBiaXRtYXBEYXRhKHZhbHVlOkJpdG1hcERhdGEpXG5cdHtcblx0XHRpZiAodGhpcy5fYml0bWFwRGF0YSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICghVGV4dHVyZVV0aWxzLmlzQml0bWFwRGF0YVZhbGlkKHZhbHVlKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYml0bWFwRGF0YTogV2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIHBvd2VyIG9mIDIgYW5kIGNhbm5vdCBleGNlZWQgMjA0OFwiKTtcblxuXHRcdHRoaXMuX2JpdG1hcERhdGEgPSB2YWx1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblxuXHRcdHRoaXMuX3BTZXRTaXplKHZhbHVlLndpZHRoLCB2YWx1ZS5oZWlnaHQpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoYml0bWFwRGF0YTpCaXRtYXBEYXRhKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuYml0bWFwRGF0YSA9IGJpdG1hcERhdGE7XG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9iaXRtYXBEYXRhLmRpc3Bvc2UoKTtcblx0XHR0aGlzLl9iaXRtYXBEYXRhID0gbnVsbDtcblx0fVxuXG5cdHB1YmxpYyBfaUdldFRleHR1cmVEYXRhKCk6Qml0bWFwRGF0YVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGE7XG5cdH1cbn1cblxuZXhwb3J0ID0gQml0bWFwVGV4dHVyZTsiXX0=