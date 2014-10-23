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
        if (generateMipmaps === void 0) { generateMipmaps = false; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy90ZXh0dXJlMmRiYXNlLnRzIl0sIm5hbWVzIjpbIlRleHR1cmUyREJhc2UiLCJUZXh0dXJlMkRCYXNlLmNvbnN0cnVjdG9yIiwiVGV4dHVyZTJEQmFzZS53aWR0aCIsIlRleHR1cmUyREJhc2UuaGVpZ2h0IiwiVGV4dHVyZTJEQmFzZS5zaXplIiwiVGV4dHVyZTJEQmFzZS5kaXNwb3NlIiwiVGV4dHVyZTJEQmFzZS5pbnZhbGlkYXRlQ29udGVudCIsIlRleHR1cmUyREJhc2UuX3BTZXRTaXplIiwiVGV4dHVyZTJEQmFzZS5faUdldE1pcG1hcERhdGEiLCJUZXh0dXJlMkRCYXNlLl9pR2V0VGV4dHVyZURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUNwRixJQUFPLGVBQWUsV0FBYSwwQ0FBMEMsQ0FBQyxDQUFDO0FBQy9FLElBQU8sZ0JBQWdCLFdBQWEsMkNBQTJDLENBQUMsQ0FBQztBQUVqRixJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQXlCQTtJQThCM0NBLFNBOUJLQSxhQUFhQSxDQThCTkEsZUFBK0JBO1FBQS9CQywrQkFBK0JBLEdBQS9CQSx1QkFBK0JBO1FBRTFDQSxrQkFBTUEsZUFBZUEsQ0FBQ0EsQ0FBQ0E7SUFDeEJBLENBQUNBO0lBdEJERCxzQkFBV0EsZ0NBQUtBO1FBSmhCQTs7O1dBR0dBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3JCQSxDQUFDQTs7O09BQUFGO0lBTURBLHNCQUFXQSxpQ0FBTUE7UUFKakJBOzs7V0FHR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLENBQUNBOzs7T0FBQUg7SUFFREEsc0JBQVdBLCtCQUFJQTthQUFmQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBSjtJQU9EQTs7T0FFR0E7SUFDSUEsK0JBQU9BLEdBQWRBO1FBRUNLLGdCQUFLQSxDQUFDQSxPQUFPQSxXQUFFQSxDQUFDQTtRQUVoQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBO1lBQ3pDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtnQkFDbENBLGVBQWVBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeERBLENBQUNBO0lBQ0ZBLENBQUNBO0lBRURMOztPQUVHQTtJQUNJQSx5Q0FBaUJBLEdBQXhCQTtRQUVDTSxnQkFBS0EsQ0FBQ0EsaUJBQWlCQSxXQUFFQSxDQUFDQTtRQUUxQkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFFRE47Ozs7O09BS0dBO0lBQ0lBLGlDQUFTQSxHQUFoQkEsVUFBaUJBLEtBQVlBLEVBQUVBLE1BQWFBO1FBRTNDTyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxJQUFJQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxNQUFNQSxDQUFDQTtZQUNwREEsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7UUFFdkJBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFN0JBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3JCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxNQUFNQSxDQUFDQTtJQUN4QkEsQ0FBQ0E7SUFFTVAsdUNBQWVBLEdBQXRCQTtRQUVDUSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLEtBQUtBLENBQUNBO1lBRTlCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtnQkFDckJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBLEtBQUtBLEVBQWNBLENBQUNBO1lBRTVDQSxlQUFlQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1FBQ2xGQSxDQUFDQTtRQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFTVIsd0NBQWdCQSxHQUF2QkE7UUFFQ1MsTUFBTUEsSUFBSUEsbUJBQW1CQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFDRlQsb0JBQUNBO0FBQURBLENBOUZBLEFBOEZDQSxFQTlGMkIsZ0JBQWdCLEVBOEYzQztBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJ0ZXh0dXJlcy9UZXh0dXJlMkRCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBEYXRhXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYmFzZS9CaXRtYXBEYXRhXCIpO1xuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xuaW1wb3J0IE1pcG1hcEdlbmVyYXRvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9NaXBtYXBHZW5lcmF0b3JcIik7XG5pbXBvcnQgVGV4dHVyZVByb3h5QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlUHJveHlCYXNlXCIpO1xuXG5jbGFzcyBUZXh0dXJlMkRCYXNlIGV4dGVuZHMgVGV4dHVyZVByb3h5QmFzZVxue1xuXHRwcml2YXRlIF9taXBtYXBEYXRhOkFycmF5PEJpdG1hcERhdGE+O1xuXHRwcml2YXRlIF9taXBtYXBEYXRhRGlydHk6Ym9vbGVhbjtcblx0cHVibGljIF9wV2lkdGg6bnVtYmVyO1xuXHRwdWJsaWMgX3BIZWlnaHQ6bnVtYmVyO1xuXHRcblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFdpZHRoO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BIZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHNpemUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wV2lkdGg7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihnZW5lcmF0ZU1pcG1hcHM6Ym9vbGVhbiA9IGZhbHNlKVxuXHR7XG5cdFx0c3VwZXIoZ2VuZXJhdGVNaXBtYXBzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xuXG5cdFx0aWYgKHRoaXMuX21pcG1hcERhdGEpIHtcblx0XHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fbWlwbWFwRGF0YS5sZW5ndGg7XG5cdFx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdFx0TWlwbWFwR2VuZXJhdG9yLmZyZWVNaXBNYXBIb2xkZXIodGhpcy5fbWlwbWFwRGF0YVtpXSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgaW52YWxpZGF0ZUNvbnRlbnQoKTp2b2lkXG5cdHtcblx0XHRzdXBlci5pbnZhbGlkYXRlQ29udGVudCgpO1xuXG5cdFx0dGhpcy5fbWlwbWFwRGF0YURpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gd2lkdGhcblx0ICogQHBhcmFtIGhlaWdodFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIF9wU2V0U2l6ZSh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcFdpZHRoICE9IHdpZHRoIHx8IHRoaXMuX3BIZWlnaHQgIT0gaGVpZ2h0KVxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlU2l6ZSgpO1xuXG5cdFx0dGhpcy5fbWlwbWFwRGF0YURpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuX3BXaWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuX3BIZWlnaHQgPSBoZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRNaXBtYXBEYXRhKCk6QXJyYXk8Qml0bWFwRGF0YT5cblx0e1xuXHRcdGlmICh0aGlzLl9taXBtYXBEYXRhRGlydHkpIHtcblx0XHRcdHRoaXMuX21pcG1hcERhdGFEaXJ0eSA9IGZhbHNlO1xuXG5cdFx0XHRpZiAoIXRoaXMuX21pcG1hcERhdGEpXG5cdFx0XHRcdHRoaXMuX21pcG1hcERhdGEgPSBuZXcgQXJyYXk8Qml0bWFwRGF0YT4oKTtcblxuXHRcdFx0TWlwbWFwR2VuZXJhdG9yLmdlbmVyYXRlTWlwTWFwcyh0aGlzLl9pR2V0VGV4dHVyZURhdGEoKSwgdGhpcy5fbWlwbWFwRGF0YSwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX21pcG1hcERhdGE7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRUZXh0dXJlRGF0YSgpOmFueVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxufVxuXG5leHBvcnQgPSBUZXh0dXJlMkRCYXNlOyJdfQ==