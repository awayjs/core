var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
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
            return TextureProxyBase.assetType;
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
    TextureProxyBase.assetType = "[asset Texture]";
    return TextureProxyBase;
})(AssetBase);
module.exports = TextureProxyBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlQmFzZS50cyJdLCJuYW1lcyI6WyJUZXh0dXJlUHJveHlCYXNlIiwiVGV4dHVyZVByb3h5QmFzZS5jb25zdHJ1Y3RvciIsIlRleHR1cmVQcm94eUJhc2Uuc2l6ZSIsIlRleHR1cmVQcm94eUJhc2UuZm9ybWF0IiwiVGV4dHVyZVByb3h5QmFzZS5hc3NldFR5cGUiLCJUZXh0dXJlUHJveHlCYXNlLmludmFsaWRhdGVDb250ZW50IiwiVGV4dHVyZVByb3h5QmFzZS5pbnZhbGlkYXRlU2l6ZSIsIlRleHR1cmVQcm94eUJhc2UuZGlzcG9zZSIsIlRleHR1cmVQcm94eUJhc2UuX2lBZGRUZXh0dXJlRGF0YSIsIlRleHR1cmVQcm94eUJhc2UuX2lSZW1vdmVUZXh0dXJlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUduRSxBQUdBOztHQURHO0lBQ0csZ0JBQWdCO0lBQVNBLFVBQXpCQSxnQkFBZ0JBLFVBQWtCQTtJQVF2Q0E7O09BRUdBO0lBQ0hBLFNBWEtBLGdCQUFnQkEsQ0FXVEEsZUFBK0JBO1FBQS9CQywrQkFBK0JBLEdBQS9CQSx1QkFBK0JBO1FBRTFDQSxpQkFBT0EsQ0FBQ0E7UUFWRkEsYUFBUUEsR0FBVUEsTUFBTUEsQ0FBQUE7UUFDdkJBLGlCQUFZQSxHQUF1QkEsSUFBSUEsS0FBS0EsRUFBZ0JBLENBQUNBO0lBVXJFQSxDQUFDQTtJQUVERCxzQkFBV0Esa0NBQUlBO2FBQWZBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3BCQSxDQUFDQTs7O09BQUFGO0lBTURBLHNCQUFXQSxvQ0FBTUE7UUFKakJBOzs7V0FHR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLENBQUNBOzs7T0FBQUg7SUFNREEsc0JBQVdBLHVDQUFTQTtRQUpwQkE7OztXQUdHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFNBQVNBLENBQUNBO1FBQ25DQSxDQUFDQTs7O09BQUFKO0lBRURBOztPQUVHQTtJQUNJQSw0Q0FBaUJBLEdBQXhCQTtRQUVDSyxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFBQTtRQUN6Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDbENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO0lBQ3BDQSxDQUFDQTtJQUVETDs7O09BR0dBO0lBQ0lBLHlDQUFjQSxHQUFyQkE7UUFFQ00sT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUE7WUFDOUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVETjs7T0FFR0E7SUFDSUEsa0NBQU9BLEdBQWRBO1FBRUNPLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BO1lBQzlCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFHTVAsMkNBQWdCQSxHQUF2QkEsVUFBd0JBLFdBQXdCQTtRQUUvQ1EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFFcENBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBO0lBQ3BCQSxDQUFDQTtJQUVNUiw4Q0FBbUJBLEdBQTFCQSxVQUEyQkEsV0FBd0JBO1FBRWxEUyxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVwRUEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDcEJBLENBQUNBO0lBM0VhVCwwQkFBU0EsR0FBVUEsaUJBQWlCQSxDQUFDQTtJQTRFcERBLHVCQUFDQTtBQUFEQSxDQWxGQSxBQWtGQ0EsRUFsRjhCLFNBQVMsRUFrRnZDO0FBRUQsQUFBMEIsaUJBQWpCLGdCQUFnQixDQUFDIiwiZmlsZSI6InRleHR1cmVzL1RleHR1cmVCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IEFzc2V0QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRCYXNlXCIpO1xuaW1wb3J0IElUZXh0dXJlRGF0YVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3Bvb2wvSVRleHR1cmVEYXRhXCIpO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFRleHR1cmVQcm94eUJhc2UgZXh0ZW5kcyBBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHVibGljIF9wU2l6ZTpudW1iZXI7XG5cdHB1YmxpYyBfcEZvcm1hdDpzdHJpbmcgPSBcImJncmFcIlxuXHRwcml2YXRlIF90ZXh0dXJlRGF0YTpBcnJheTxJVGV4dHVyZURhdGE+ID0gbmV3IEFycmF5PElUZXh0dXJlRGF0YT4oKTtcblxuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBUZXh0dXJlXVwiO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0Y29uc3RydWN0b3IoZ2VuZXJhdGVNaXBtYXBzOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHNpemUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2l6ZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0cHVibGljIGdldCBmb3JtYXQoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wRm9ybWF0O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIFRleHR1cmVQcm94eUJhc2UuYXNzZXRUeXBlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgaW52YWxpZGF0ZUNvbnRlbnQoKTp2b2lkXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3RleHR1cmVEYXRhLmxlbmd0aFxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fdGV4dHVyZURhdGFbaV0uaW52YWxpZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgaW52YWxpZGF0ZVNpemUoKTp2b2lkXG5cdHtcblx0XHR3aGlsZSAodGhpcy5fdGV4dHVyZURhdGEubGVuZ3RoKVxuXHRcdFx0dGhpcy5fdGV4dHVyZURhdGFbMF0uZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR3aGlsZSAodGhpcy5fdGV4dHVyZURhdGEubGVuZ3RoKVxuXHRcdFx0dGhpcy5fdGV4dHVyZURhdGFbMF0uZGlzcG9zZSgpO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lBZGRUZXh0dXJlRGF0YSh0ZXh0dXJlRGF0YTpJVGV4dHVyZURhdGEpOklUZXh0dXJlRGF0YVxuXHR7XG5cdFx0dGhpcy5fdGV4dHVyZURhdGEucHVzaCh0ZXh0dXJlRGF0YSk7XG5cblx0XHRyZXR1cm4gdGV4dHVyZURhdGE7XG5cdH1cblxuXHRwdWJsaWMgX2lSZW1vdmVUZXh0dXJlRGF0YSh0ZXh0dXJlRGF0YTpJVGV4dHVyZURhdGEpOklUZXh0dXJlRGF0YVxuXHR7XG5cdFx0dGhpcy5fdGV4dHVyZURhdGEuc3BsaWNlKHRoaXMuX3RleHR1cmVEYXRhLmluZGV4T2YodGV4dHVyZURhdGEpLCAxKTtcblxuXHRcdHJldHVybiB0ZXh0dXJlRGF0YTtcblx0fVxufVxuXG5leHBvcnQgPSBUZXh0dXJlUHJveHlCYXNlOyJdfQ==