var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/core/library/AssetType");

var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");

/**
*
*/
var TextureProxyBase = (function (_super) {
    __extends(TextureProxyBase, _super);
    /**
    *
    */
    function TextureProxyBase(generateMipmaps) {
        if (typeof generateMipmaps === "undefined") { generateMipmaps = false; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHR1cmVzL1RleHR1cmVQcm94eUJhc2UudHMiXSwibmFtZXMiOlsiVGV4dHVyZVByb3h5QmFzZSIsIlRleHR1cmVQcm94eUJhc2UuY29uc3RydWN0b3IiLCJUZXh0dXJlUHJveHlCYXNlLmludmFsaWRhdGVDb250ZW50IiwiVGV4dHVyZVByb3h5QmFzZS5pbnZhbGlkYXRlU2l6ZSIsIlRleHR1cmVQcm94eUJhc2UuZGlzcG9zZSIsIlRleHR1cmVQcm94eUJhc2UuX2lBZGRUZXh0dXJlRGF0YSIsIlRleHR1cmVQcm94eUJhc2UuX2lSZW1vdmVUZXh0dXJlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUVBQXdFOztBQUV4RSwyRUFBaUY7O0FBR2pGOztFQUVHO0FBQ0g7SUFBK0JBLG1DQUFjQTtJQVc1Q0E7O01BREdBO0lBQ0hBLDBCQUFZQSxlQUErQkE7UUFBL0JDLDhDQUFBQSxlQUFlQSxHQUFXQSxLQUFLQTtBQUFBQSxRQUUxQ0EsV0FBTUEsS0FBQUEsQ0FBQ0E7UUFWUkEsS0FBT0EsUUFBUUEsR0FBVUEsTUFBTUEsQ0FBQUE7UUFHL0JBLEtBQVFBLFlBQVlBLEdBQXVCQSxJQUFJQSxLQUFLQSxDQUFlQSxDQUFDQSxDQUFDQTs7UUFTcEVBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsZUFBZUE7SUFDM0RBLENBQUNBO0lBRUREO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE1BQU1BO1FBQ25CQSxDQUFDQTs7OztBQUFBQTtJQUVEQTtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxXQUFXQTtRQUN4QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFNREE7UUFBQUE7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxRQUFRQTtRQUNyQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFNREE7UUFBQUE7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxnQkFBZ0JBO1FBQzdCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUEyQkEsS0FBYUE7WUFFdkNBLElBQUlBLElBQUlBLENBQUNBLGdCQUFnQkEsSUFBSUEsS0FBS0E7Z0JBQ2pDQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQTs7WUFFaERBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7UUFDekJBLENBQUNBOzs7O0FBVkFBOztJQWdCREE7UUFBQUE7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxTQUFTQSxDQUFDQSxPQUFPQTtRQUN6QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7O01BREdBO21EQUNIQTtRQUVDRSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQTtRQUN6Q0EsS0FBS0EsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDbENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO0lBQ3BDQSxDQUFDQTs7SUFNREY7OztNQURHQTtnREFDSEE7UUFFQ0csT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUE7WUFDOUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO0lBQ2pDQSxDQUFDQTs7SUFLREg7O01BREdBO3lDQUNIQTtRQUVDSSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQTtZQUM5QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDakNBLENBQUNBOztJQUdESiw4Q0FBQUEsVUFBd0JBLFdBQXdCQTtRQUUvQ0ssSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7O1FBRW5DQSxPQUFPQSxXQUFXQTtJQUNuQkEsQ0FBQ0E7O0lBRURMLGlEQUFBQSxVQUEyQkEsV0FBd0JBO1FBRWxETSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs7UUFFbkVBLE9BQU9BLFdBQVdBO0lBQ25CQSxDQUFDQTtJQUNGTix3QkFBQ0E7QUFBREEsQ0FBQ0EsRUE1RzhCLGNBQWMsRUE0RzVDOztBQUVELGlDQUEwQixDQUFBIiwiZmlsZSI6InRleHR1cmVzL1RleHR1cmVQcm94eUJhc2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xuaW1wb3J0IElUZXh0dXJlRGF0YVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcG9vbC9JVGV4dHVyZURhdGFcIik7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgVGV4dHVyZVByb3h5QmFzZSBleHRlbmRzIE5hbWVkQXNzZXRCYXNlIGltcGxlbWVudHMgSUFzc2V0XG57XG5cdHB1YmxpYyBfcFNpemU6bnVtYmVyO1xuXHRwdWJsaWMgX3BGb3JtYXQ6c3RyaW5nID0gXCJiZ3JhXCJcblx0cHJpdmF0ZSBfaGFzTWlwbWFwczpib29sZWFuO1xuXHRwcml2YXRlIF9nZW5lcmF0ZU1pcG1hcHM6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfdGV4dHVyZURhdGE6QXJyYXk8SVRleHR1cmVEYXRhPiA9IG5ldyBBcnJheTxJVGV4dHVyZURhdGE+KCk7XG5cdFxuXHQvKipcblx0ICpcblx0ICovXG5cdGNvbnN0cnVjdG9yKGdlbmVyYXRlTWlwbWFwczpib29sZWFuID0gZmFsc2UpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fZ2VuZXJhdGVNaXBtYXBzID0gdGhpcy5faGFzTWlwbWFwcyA9IGdlbmVyYXRlTWlwbWFwcztcblx0fVxuXG5cdHB1YmxpYyBnZXQgc2l6ZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTaXplO1xuXHR9XG5cblx0cHVibGljIGdldCBoYXNNaXBtYXBzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2hhc01pcG1hcHM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHB1YmxpYyBnZXQgZm9ybWF0KCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEZvcm1hdDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBnZXQgZ2VuZXJhdGVNaXBtYXBzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2dlbmVyYXRlTWlwbWFwcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgZ2VuZXJhdGVNaXBtYXBzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fZ2VuZXJhdGVNaXBtYXBzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZ2VuZXJhdGVNaXBtYXBzID0gdGhpcy5faGFzTWlwbWFwcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5URVhUVVJFO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgaW52YWxpZGF0ZUNvbnRlbnQoKTp2b2lkXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3RleHR1cmVEYXRhLmxlbmd0aFxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fdGV4dHVyZURhdGFbaV0uaW52YWxpZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgaW52YWxpZGF0ZVNpemUoKTp2b2lkXG5cdHtcblx0XHR3aGlsZSAodGhpcy5fdGV4dHVyZURhdGEubGVuZ3RoKVxuXHRcdFx0dGhpcy5fdGV4dHVyZURhdGFbMF0uZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR3aGlsZSAodGhpcy5fdGV4dHVyZURhdGEubGVuZ3RoKVxuXHRcdFx0dGhpcy5fdGV4dHVyZURhdGFbMF0uZGlzcG9zZSgpO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lBZGRUZXh0dXJlRGF0YSh0ZXh0dXJlRGF0YTpJVGV4dHVyZURhdGEpOklUZXh0dXJlRGF0YVxuXHR7XG5cdFx0dGhpcy5fdGV4dHVyZURhdGEucHVzaCh0ZXh0dXJlRGF0YSk7XG5cblx0XHRyZXR1cm4gdGV4dHVyZURhdGE7XG5cdH1cblxuXHRwdWJsaWMgX2lSZW1vdmVUZXh0dXJlRGF0YSh0ZXh0dXJlRGF0YTpJVGV4dHVyZURhdGEpOklUZXh0dXJlRGF0YVxuXHR7XG5cdFx0dGhpcy5fdGV4dHVyZURhdGEuc3BsaWNlKHRoaXMuX3RleHR1cmVEYXRhLmluZGV4T2YodGV4dHVyZURhdGEpLCAxKTtcblxuXHRcdHJldHVybiB0ZXh0dXJlRGF0YTtcblx0fVxufVxuXG5leHBvcnQgPSBUZXh0dXJlUHJveHlCYXNlOyJdfQ==