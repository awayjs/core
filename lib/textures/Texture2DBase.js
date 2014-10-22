var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var MipmapGenerator = require("awayjs-core/lib/textures/MipmapGenerator");
var TextureProxyBase = require("awayjs-core/lib/textures/TextureProxyBase");

var Texture2DBase = (function (_super) {
    __extends(Texture2DBase, _super);
    function Texture2DBase(generateMipmaps) {
        if (typeof generateMipmaps === "undefined") { generateMipmaps = false; }
        _super.call(this, generateMipmaps);
    }
    Object.defineProperty(Texture2DBase.prototype, "width", {
        /**
        *
        * @returns {number}
        */
        get: function () {
            return this._pWidth;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Texture2DBase.prototype, "height", {
        /**
        *
        * @returns {number}
        */
        get: function () {
            return this._pHeight;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Texture2DBase.prototype, "size", {
        get: function () {
            return this._pWidth;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * @inheritDoc
    */
    Texture2DBase.prototype.dispose = function () {
        _super.prototype.dispose.call(this);

        if (this._mipmapData) {
            var len = this._mipmapData.length;
            for (var i = 0; i < len; i++)
                MipmapGenerator.freeMipMapHolder(this._mipmapData[i]);
        }
    };

    /**
    *
    */
    Texture2DBase.prototype.invalidateContent = function () {
        _super.prototype.invalidateContent.call(this);

        this._mipmapDataDirty = true;
    };

    /**
    *
    * @param width
    * @param height
    * @private
    */
    Texture2DBase.prototype._pSetSize = function (width, height) {
        if (this._pWidth != width || this._pHeight != height)
            this.invalidateSize();

        this._mipmapDataDirty = true;

        this._pWidth = width;
        this._pHeight = height;
    };

    Texture2DBase.prototype._iGetMipmapData = function () {
        if (this._mipmapDataDirty) {
            this._mipmapDataDirty = false;

            if (!this._mipmapData)
                this._mipmapData = new Array();

            MipmapGenerator.generateMipMaps(this._iGetTextureData(), this._mipmapData, true);
        }

        return this._mipmapData;
    };

    Texture2DBase.prototype._iGetTextureData = function () {
        throw new AbstractMethodError();
    };
    return Texture2DBase;
})(TextureProxyBase);

module.exports = Texture2DBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHR1cmVzL1RleHR1cmUyREJhc2UudHMiXSwibmFtZXMiOlsiVGV4dHVyZTJEQmFzZSIsIlRleHR1cmUyREJhc2UuY29uc3RydWN0b3IiLCJUZXh0dXJlMkRCYXNlLmRpc3Bvc2UiLCJUZXh0dXJlMkRCYXNlLmludmFsaWRhdGVDb250ZW50IiwiVGV4dHVyZTJEQmFzZS5fcFNldFNpemUiLCJUZXh0dXJlMkRCYXNlLl9pR2V0TWlwbWFwRGF0YSIsIlRleHR1cmUyREJhc2UuX2lHZXRUZXh0dXJlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0VBQ29GO0FBQ3BGLHlFQUErRTtBQUMvRSwyRUFBaUY7O0FBRWpGO0lBQTRCQSxnQ0FBZ0JBO0lBOEIzQ0EsdUJBQVlBLGVBQStCQTtRQUEvQkMsOENBQUFBLGVBQWVBLEdBQVdBLEtBQUtBO0FBQUFBLFFBRTFDQSxXQUFNQSxPQUFBQSxlQUFlQSxDQUFDQTtJQUN2QkEsQ0FBQ0E7SUF0QkREO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsT0FBT0E7UUFDcEJBLENBQUNBOzs7O0FBQUFBO0lBTURBO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBOzs7O0FBQUFBO0lBRURBO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTs7OztBQUFBQTtJQVVEQTs7TUFER0E7c0NBQ0hBO1FBRUNFLGdCQUFLQSxDQUFDQSxPQUFPQSxLQUFDQSxLQUFBQSxDQUFDQTs7UUFFZkEsSUFBSUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBRUE7WUFDckJBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BO1lBQ3hDQSxLQUFLQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtnQkFDbENBLGVBQWVBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7U0FDdkRBO0lBQ0ZBLENBQUNBOztJQUtERjs7TUFER0E7Z0RBQ0hBO1FBRUNHLGdCQUFLQSxDQUFDQSxpQkFBaUJBLEtBQUNBLEtBQUFBLENBQUNBOztRQUV6QkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQTtJQUM3QkEsQ0FBQ0E7O0lBUURIOzs7OztNQURHQTt3Q0FDSEEsVUFBaUJBLEtBQVlBLEVBQUVBLE1BQWFBO1FBRTNDSSxJQUFJQSxJQUFJQSxDQUFDQSxPQUFPQSxJQUFJQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxNQUFNQTtZQUNuREEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1FBRXZCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBOztRQUU1QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0E7UUFDcEJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLE1BQU1BO0lBQ3ZCQSxDQUFDQTs7SUFFREosMENBQUFBO1FBRUNLLElBQUlBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBRUE7WUFDMUJBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsS0FBS0E7O1lBRTdCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQTtnQkFDcEJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBLEtBQUtBLENBQWFBLENBQUNBLENBQUNBOztZQUU1Q0EsZUFBZUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQTtTQUNoRkE7O1FBRURBLE9BQU9BLElBQUlBLENBQUNBLFdBQVdBO0lBQ3hCQSxDQUFDQTs7SUFFREwsMkNBQUFBO1FBRUNNLE1BQU1BLElBQUlBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBQ0ZOLHFCQUFDQTtBQUFEQSxDQUFDQSxFQTlGMkIsZ0JBQWdCLEVBOEYzQzs7QUFFRCw4QkFBdUIsQ0FBQSIsImZpbGUiOiJ0ZXh0dXJlcy9UZXh0dXJlMkRCYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvQml0bWFwRGF0YVwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcbmltcG9ydCBNaXBtYXBHZW5lcmF0b3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvTWlwbWFwR2VuZXJhdG9yXCIpO1xuaW1wb3J0IFRleHR1cmVQcm94eUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZVByb3h5QmFzZVwiKTtcblxuY2xhc3MgVGV4dHVyZTJEQmFzZSBleHRlbmRzIFRleHR1cmVQcm94eUJhc2Vcbntcblx0cHJpdmF0ZSBfbWlwbWFwRGF0YTpBcnJheTxCaXRtYXBEYXRhPjtcblx0cHJpdmF0ZSBfbWlwbWFwRGF0YURpcnR5OmJvb2xlYW47XG5cdHB1YmxpYyBfcFdpZHRoOm51bWJlcjtcblx0cHVibGljIF9wSGVpZ2h0Om51bWJlcjtcblx0XG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIGdldCBzaXplKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFdpZHRoO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoZ2VuZXJhdGVNaXBtYXBzOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKGdlbmVyYXRlTWlwbWFwcyk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblxuXHRcdGlmICh0aGlzLl9taXBtYXBEYXRhKSB7XG5cdFx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX21pcG1hcERhdGEubGVuZ3RoO1xuXHRcdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHRcdE1pcG1hcEdlbmVyYXRvci5mcmVlTWlwTWFwSG9sZGVyKHRoaXMuX21pcG1hcERhdGFbaV0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGludmFsaWRhdGVDb250ZW50KCk6dm9pZFxuXHR7XG5cdFx0c3VwZXIuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblxuXHRcdHRoaXMuX21pcG1hcERhdGFEaXJ0eSA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHdpZHRoXG5cdCAqIEBwYXJhbSBoZWlnaHRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfcFNldFNpemUod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BXaWR0aCAhPSB3aWR0aCB8fCB0aGlzLl9wSGVpZ2h0ICE9IGhlaWdodClcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVNpemUoKTtcblxuXHRcdHRoaXMuX21pcG1hcERhdGFEaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLl9wV2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLl9wSGVpZ2h0ID0gaGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIF9pR2V0TWlwbWFwRGF0YSgpOkFycmF5PEJpdG1hcERhdGE+XG5cdHtcblx0XHRpZiAodGhpcy5fbWlwbWFwRGF0YURpcnR5KSB7XG5cdFx0XHR0aGlzLl9taXBtYXBEYXRhRGlydHkgPSBmYWxzZTtcblxuXHRcdFx0aWYgKCF0aGlzLl9taXBtYXBEYXRhKVxuXHRcdFx0XHR0aGlzLl9taXBtYXBEYXRhID0gbmV3IEFycmF5PEJpdG1hcERhdGE+KCk7XG5cblx0XHRcdE1pcG1hcEdlbmVyYXRvci5nZW5lcmF0ZU1pcE1hcHModGhpcy5faUdldFRleHR1cmVEYXRhKCksIHRoaXMuX21pcG1hcERhdGEsIHRydWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9taXBtYXBEYXRhO1xuXHR9XG5cblx0cHVibGljIF9pR2V0VGV4dHVyZURhdGEoKTphbnlcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gVGV4dHVyZTJEQmFzZTsiXX0=