var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
/**
 *
 */
var TextureProxyBase = (function (_super) {
    __extends(TextureProxyBase, _super);
    /**
     *
     */
    function TextureProxyBase(generateMipmaps) {
        if (generateMipmaps === void 0) { generateMipmaps = false; }
        _super.call(this);
        this._pFormat = "bgra";
        this._textureData = new Array();
    }
    Object.defineProperty(TextureProxyBase.prototype, "size", {
        get: function () {
            return this._pSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureProxyBase.prototype, "format", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._pFormat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureProxyBase.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return AssetType.TEXTURE;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    TextureProxyBase.prototype.invalidateContent = function () {
        var len = this._textureData.length;
        for (var i = 0; i < len; i++)
            this._textureData[i].invalidate();
    };
    /**
     *
     * @private
     */
    TextureProxyBase.prototype.invalidateSize = function () {
        while (this._textureData.length)
            this._textureData[0].dispose();
    };
    /**
     * @inheritDoc
     */
    TextureProxyBase.prototype.dispose = function () {
        while (this._textureData.length)
            this._textureData[0].dispose();
    };
    TextureProxyBase.prototype._iAddTextureData = function (textureData) {
        this._textureData.push(textureData);
        return textureData;
    };
    TextureProxyBase.prototype._iRemoveTextureData = function (textureData) {
        this._textureData.splice(this._textureData.indexOf(textureData), 1);
        return textureData;
    };
    return TextureProxyBase;
})(NamedAssetBase);
module.exports = TextureProxyBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlUHJveHlCYXNlLnRzIl0sIm5hbWVzIjpbIlRleHR1cmVQcm94eUJhc2UiLCJUZXh0dXJlUHJveHlCYXNlLmNvbnN0cnVjdG9yIiwiVGV4dHVyZVByb3h5QmFzZS5zaXplIiwiVGV4dHVyZVByb3h5QmFzZS5mb3JtYXQiLCJUZXh0dXJlUHJveHlCYXNlLmFzc2V0VHlwZSIsIlRleHR1cmVQcm94eUJhc2UuaW52YWxpZGF0ZUNvbnRlbnQiLCJUZXh0dXJlUHJveHlCYXNlLmludmFsaWRhdGVTaXplIiwiVGV4dHVyZVByb3h5QmFzZS5kaXNwb3NlIiwiVGV4dHVyZVByb3h5QmFzZS5faUFkZFRleHR1cmVEYXRhIiwiVGV4dHVyZVByb3h5QmFzZS5faVJlbW92ZVRleHR1cmVEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRW5FLElBQU8sY0FBYyxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFHNUUsQUFHQTs7R0FERztJQUNHLGdCQUFnQjtJQUFTQSxVQUF6QkEsZ0JBQWdCQSxVQUF1QkE7SUFNNUNBOztPQUVHQTtJQUNIQSxTQVRLQSxnQkFBZ0JBLENBU1RBLGVBQStCQTtRQUEvQkMsK0JBQStCQSxHQUEvQkEsdUJBQStCQTtRQUUxQ0EsaUJBQU9BLENBQUNBO1FBUkZBLGFBQVFBLEdBQVVBLE1BQU1BLENBQUFBO1FBQ3ZCQSxpQkFBWUEsR0FBdUJBLElBQUlBLEtBQUtBLEVBQWdCQSxDQUFDQTtJQVFyRUEsQ0FBQ0E7SUFFREQsc0JBQVdBLGtDQUFJQTthQUFmQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7OztPQUFBRjtJQU1EQSxzQkFBV0Esb0NBQU1BO1FBSmpCQTs7O1dBR0dBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3RCQSxDQUFDQTs7O09BQUFIO0lBTURBLHNCQUFXQSx1Q0FBU0E7UUFKcEJBOzs7V0FHR0E7YUFDSEE7WUFFQ0ksTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FBQUo7SUFFREE7O09BRUdBO0lBQ0lBLDRDQUFpQkEsR0FBeEJBO1FBRUNLLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUFBO1FBQ3pDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtZQUNsQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7SUFDcENBLENBQUNBO0lBRURMOzs7T0FHR0E7SUFDSUEseUNBQWNBLEdBQXJCQTtRQUVDTSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQTtZQUM5QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRUROOztPQUVHQTtJQUNJQSxrQ0FBT0EsR0FBZEE7UUFFQ08sT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUE7WUFDOUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUdNUCwyQ0FBZ0JBLEdBQXZCQSxVQUF3QkEsV0FBd0JBO1FBRS9DUSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUVwQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDcEJBLENBQUNBO0lBRU1SLDhDQUFtQkEsR0FBMUJBLFVBQTJCQSxXQUF3QkE7UUFFbERTLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBRXBFQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUNwQkEsQ0FBQ0E7SUFDRlQsdUJBQUNBO0FBQURBLENBaEZBLEFBZ0ZDQSxFQWhGOEIsY0FBYyxFQWdGNUM7QUFFRCxBQUEwQixpQkFBakIsZ0JBQWdCLENBQUMiLCJmaWxlIjoidGV4dHVyZXMvVGV4dHVyZVByb3h5QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xuaW1wb3J0IElUZXh0dXJlRGF0YVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3Bvb2wvSVRleHR1cmVEYXRhXCIpO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFRleHR1cmVQcm94eUJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElBc3NldFxue1xuXHRwdWJsaWMgX3BTaXplOm51bWJlcjtcblx0cHVibGljIF9wRm9ybWF0OnN0cmluZyA9IFwiYmdyYVwiXG5cdHByaXZhdGUgX3RleHR1cmVEYXRhOkFycmF5PElUZXh0dXJlRGF0YT4gPSBuZXcgQXJyYXk8SVRleHR1cmVEYXRhPigpO1xuXHRcblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihnZW5lcmF0ZU1pcG1hcHM6Ym9vbGVhbiA9IGZhbHNlKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgc2l6ZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTaXplO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGZvcm1hdCgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BGb3JtYXQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLlRFWFRVUkU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBpbnZhbGlkYXRlQ29udGVudCgpOnZvaWRcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fdGV4dHVyZURhdGEubGVuZ3RoXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl90ZXh0dXJlRGF0YVtpXS5pbnZhbGlkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBpbnZhbGlkYXRlU2l6ZSgpOnZvaWRcblx0e1xuXHRcdHdoaWxlICh0aGlzLl90ZXh0dXJlRGF0YS5sZW5ndGgpXG5cdFx0XHR0aGlzLl90ZXh0dXJlRGF0YVswXS5kaXNwb3NlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHdoaWxlICh0aGlzLl90ZXh0dXJlRGF0YS5sZW5ndGgpXG5cdFx0XHR0aGlzLl90ZXh0dXJlRGF0YVswXS5kaXNwb3NlKCk7XG5cdH1cblxuXG5cdHB1YmxpYyBfaUFkZFRleHR1cmVEYXRhKHRleHR1cmVEYXRhOklUZXh0dXJlRGF0YSk6SVRleHR1cmVEYXRhXG5cdHtcblx0XHR0aGlzLl90ZXh0dXJlRGF0YS5wdXNoKHRleHR1cmVEYXRhKTtcblxuXHRcdHJldHVybiB0ZXh0dXJlRGF0YTtcblx0fVxuXG5cdHB1YmxpYyBfaVJlbW92ZVRleHR1cmVEYXRhKHRleHR1cmVEYXRhOklUZXh0dXJlRGF0YSk6SVRleHR1cmVEYXRhXG5cdHtcblx0XHR0aGlzLl90ZXh0dXJlRGF0YS5zcGxpY2UodGhpcy5fdGV4dHVyZURhdGEuaW5kZXhPZih0ZXh0dXJlRGF0YSksIDEpO1xuXG5cdFx0cmV0dXJuIHRleHR1cmVEYXRhO1xuXHR9XG59XG5cbmV4cG9ydCA9IFRleHR1cmVQcm94eUJhc2U7Il19