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
        this._generateMipmaps = this._hasMipmaps = generateMipmaps;
    }
    Object.defineProperty(TextureProxyBase.prototype, "size", {
        get: function () {
            return this._pSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureProxyBase.prototype, "hasMipmaps", {
        get: function () {
            return this._hasMipmaps;
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
    Object.defineProperty(TextureProxyBase.prototype, "generateMipmaps", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            return this._generateMipmaps;
        },
        set: function (value) {
            if (this._generateMipmaps == value)
                return;
            this._generateMipmaps = this._hasMipmaps = value;
            this.invalidateContent();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy90ZXh0dXJlcHJveHliYXNlLnRzIl0sIm5hbWVzIjpbIlRleHR1cmVQcm94eUJhc2UiLCJUZXh0dXJlUHJveHlCYXNlLmNvbnN0cnVjdG9yIiwiVGV4dHVyZVByb3h5QmFzZS5zaXplIiwiVGV4dHVyZVByb3h5QmFzZS5oYXNNaXBtYXBzIiwiVGV4dHVyZVByb3h5QmFzZS5mb3JtYXQiLCJUZXh0dXJlUHJveHlCYXNlLmdlbmVyYXRlTWlwbWFwcyIsIlRleHR1cmVQcm94eUJhc2UuYXNzZXRUeXBlIiwiVGV4dHVyZVByb3h5QmFzZS5pbnZhbGlkYXRlQ29udGVudCIsIlRleHR1cmVQcm94eUJhc2UuaW52YWxpZGF0ZVNpemUiLCJUZXh0dXJlUHJveHlCYXNlLmRpc3Bvc2UiLCJUZXh0dXJlUHJveHlCYXNlLl9pQWRkVGV4dHVyZURhdGEiLCJUZXh0dXJlUHJveHlCYXNlLl9pUmVtb3ZlVGV4dHVyZURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFFbkUsSUFBTyxjQUFjLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUc1RSxBQUdBOztHQURHO0lBQ0csZ0JBQWdCO0lBQVNBLFVBQXpCQSxnQkFBZ0JBLFVBQXVCQTtJQVE1Q0E7O09BRUdBO0lBQ0hBLFNBWEtBLGdCQUFnQkEsQ0FXVEEsZUFBK0JBO1FBQS9CQywrQkFBK0JBLEdBQS9CQSx1QkFBK0JBO1FBRTFDQSxpQkFBT0EsQ0FBQ0E7UUFWRkEsYUFBUUEsR0FBVUEsTUFBTUEsQ0FBQUE7UUFHdkJBLGlCQUFZQSxHQUF1QkEsSUFBSUEsS0FBS0EsRUFBZ0JBLENBQUNBO1FBU3BFQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLGVBQWVBLENBQUNBO0lBQzVEQSxDQUFDQTtJQUVERCxzQkFBV0Esa0NBQUlBO2FBQWZBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3BCQSxDQUFDQTs7O09BQUFGO0lBRURBLHNCQUFXQSx3Q0FBVUE7YUFBckJBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1FBQ3pCQSxDQUFDQTs7O09BQUFIO0lBTURBLHNCQUFXQSxvQ0FBTUE7UUFKakJBOzs7V0FHR0E7YUFDSEE7WUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLENBQUNBOzs7T0FBQUo7SUFNREEsc0JBQVdBLDZDQUFlQTtRQUoxQkE7OztXQUdHQTthQUNIQTtZQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBO1FBQzlCQSxDQUFDQTthQUVETCxVQUEyQkEsS0FBYUE7WUFFdkNLLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsSUFBSUEsS0FBS0EsQ0FBQ0E7Z0JBQ2xDQSxNQUFNQSxDQUFDQTtZQUVSQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBO1lBRWpEQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BVkFMO0lBZ0JEQSxzQkFBV0EsdUNBQVNBO1FBSnBCQTs7O1dBR0dBO2FBQ0hBO1lBRUNNLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFOO0lBRURBOztPQUVHQTtJQUNJQSw0Q0FBaUJBLEdBQXhCQTtRQUVDTyxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFBQTtRQUN6Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDbENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO0lBQ3BDQSxDQUFDQTtJQUVEUDs7O09BR0dBO0lBQ0lBLHlDQUFjQSxHQUFyQkE7UUFFQ1EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUE7WUFDOUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVEUjs7T0FFR0E7SUFDSUEsa0NBQU9BLEdBQWRBO1FBRUNTLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BO1lBQzlCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFHTVQsMkNBQWdCQSxHQUF2QkEsVUFBd0JBLFdBQXdCQTtRQUUvQ1UsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFFcENBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBO0lBQ3BCQSxDQUFDQTtJQUVNViw4Q0FBbUJBLEdBQTFCQSxVQUEyQkEsV0FBd0JBO1FBRWxEVyxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVwRUEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDcEJBLENBQUNBO0lBQ0ZYLHVCQUFDQTtBQUFEQSxDQTVHQSxBQTRHQ0EsRUE1RzhCLGNBQWMsRUE0RzVDO0FBRUQsQUFBMEIsaUJBQWpCLGdCQUFnQixDQUFDIiwiZmlsZSI6InRleHR1cmVzL1RleHR1cmVQcm94eUJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBJVGV4dHVyZURhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wb29sL0lUZXh0dXJlRGF0YVwiKTtcblxuLyoqXG4gKlxuICovXG5jbGFzcyBUZXh0dXJlUHJveHlCYXNlIGV4dGVuZHMgTmFtZWRBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHVibGljIF9wU2l6ZTpudW1iZXI7XG5cdHB1YmxpYyBfcEZvcm1hdDpzdHJpbmcgPSBcImJncmFcIlxuXHRwcml2YXRlIF9oYXNNaXBtYXBzOmJvb2xlYW47XG5cdHByaXZhdGUgX2dlbmVyYXRlTWlwbWFwczpib29sZWFuO1xuXHRwcml2YXRlIF90ZXh0dXJlRGF0YTpBcnJheTxJVGV4dHVyZURhdGE+ID0gbmV3IEFycmF5PElUZXh0dXJlRGF0YT4oKTtcblx0XG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0Y29uc3RydWN0b3IoZ2VuZXJhdGVNaXBtYXBzOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9nZW5lcmF0ZU1pcG1hcHMgPSB0aGlzLl9oYXNNaXBtYXBzID0gZ2VuZXJhdGVNaXBtYXBzO1xuXHR9XG5cblx0cHVibGljIGdldCBzaXplKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNpemU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGhhc01pcG1hcHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGFzTWlwbWFwcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0cHVibGljIGdldCBmb3JtYXQoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wRm9ybWF0O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0cHVibGljIGdldCBnZW5lcmF0ZU1pcG1hcHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZ2VuZXJhdGVNaXBtYXBzO1xuXHR9XG5cblx0cHVibGljIHNldCBnZW5lcmF0ZU1pcG1hcHModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9nZW5lcmF0ZU1pcG1hcHMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9nZW5lcmF0ZU1pcG1hcHMgPSB0aGlzLl9oYXNNaXBtYXBzID0gdmFsdWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLlRFWFRVUkU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBpbnZhbGlkYXRlQ29udGVudCgpOnZvaWRcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fdGV4dHVyZURhdGEubGVuZ3RoXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl90ZXh0dXJlRGF0YVtpXS5pbnZhbGlkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBpbnZhbGlkYXRlU2l6ZSgpOnZvaWRcblx0e1xuXHRcdHdoaWxlICh0aGlzLl90ZXh0dXJlRGF0YS5sZW5ndGgpXG5cdFx0XHR0aGlzLl90ZXh0dXJlRGF0YVswXS5kaXNwb3NlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHdoaWxlICh0aGlzLl90ZXh0dXJlRGF0YS5sZW5ndGgpXG5cdFx0XHR0aGlzLl90ZXh0dXJlRGF0YVswXS5kaXNwb3NlKCk7XG5cdH1cblxuXG5cdHB1YmxpYyBfaUFkZFRleHR1cmVEYXRhKHRleHR1cmVEYXRhOklUZXh0dXJlRGF0YSk6SVRleHR1cmVEYXRhXG5cdHtcblx0XHR0aGlzLl90ZXh0dXJlRGF0YS5wdXNoKHRleHR1cmVEYXRhKTtcblxuXHRcdHJldHVybiB0ZXh0dXJlRGF0YTtcblx0fVxuXG5cdHB1YmxpYyBfaVJlbW92ZVRleHR1cmVEYXRhKHRleHR1cmVEYXRhOklUZXh0dXJlRGF0YSk6SVRleHR1cmVEYXRhXG5cdHtcblx0XHR0aGlzLl90ZXh0dXJlRGF0YS5zcGxpY2UodGhpcy5fdGV4dHVyZURhdGEuaW5kZXhPZih0ZXh0dXJlRGF0YSksIDEpO1xuXG5cdFx0cmV0dXJuIHRleHR1cmVEYXRhO1xuXHR9XG59XG5cbmV4cG9ydCA9IFRleHR1cmVQcm94eUJhc2U7Il19