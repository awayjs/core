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
    function Texture2DBase() {
        _super.call(this);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlLnRzIl0sIm5hbWVzIjpbIlRleHR1cmUyREJhc2UiLCJUZXh0dXJlMkRCYXNlLmNvbnN0cnVjdG9yIiwiVGV4dHVyZTJEQmFzZS53aWR0aCIsIlRleHR1cmUyREJhc2UuaGVpZ2h0IiwiVGV4dHVyZTJEQmFzZS5zaXplIiwiVGV4dHVyZTJEQmFzZS5kaXNwb3NlIiwiVGV4dHVyZTJEQmFzZS5pbnZhbGlkYXRlQ29udGVudCIsIlRleHR1cmUyREJhc2UuX3BTZXRTaXplIiwiVGV4dHVyZTJEQmFzZS5faUdldE1pcG1hcERhdGEiLCJUZXh0dXJlMkRCYXNlLl9pR2V0VGV4dHVyZURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUNwRixJQUFPLGVBQWUsV0FBYSwwQ0FBMEMsQ0FBQyxDQUFDO0FBQy9FLElBQU8sZ0JBQWdCLFdBQWEsMkNBQTJDLENBQUMsQ0FBQztBQUVqRixJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQXlCQTtJQThCM0NBLFNBOUJLQSxhQUFhQTtRQWdDakJDLGlCQUFPQSxDQUFDQTtJQUNUQSxDQUFDQTtJQXRCREQsc0JBQVdBLGdDQUFLQTtRQUpoQkE7OztXQUdHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBRjtJQU1EQSxzQkFBV0EsaUNBQU1BO1FBSmpCQTs7O1dBR0dBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3RCQSxDQUFDQTs7O09BQUFIO0lBRURBLHNCQUFXQSwrQkFBSUE7YUFBZkE7WUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQUo7SUFPREE7O09BRUdBO0lBQ0lBLCtCQUFPQSxHQUFkQTtRQUVDSyxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7UUFFaEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUN6Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7Z0JBQ2xDQSxlQUFlQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ3hEQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVETDs7T0FFR0E7SUFDSUEseUNBQWlCQSxHQUF4QkE7UUFFQ00sZ0JBQUtBLENBQUNBLGlCQUFpQkEsV0FBRUEsQ0FBQ0E7UUFFMUJBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDOUJBLENBQUNBO0lBRUROOzs7OztPQUtHQTtJQUNJQSxpQ0FBU0EsR0FBaEJBLFVBQWlCQSxLQUFZQSxFQUFFQSxNQUFhQTtRQUUzQ08sRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsSUFBSUEsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsTUFBTUEsQ0FBQ0E7WUFDcERBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1FBRXZCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1FBRTdCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFDeEJBLENBQUNBO0lBRU1QLHVDQUFlQSxHQUF0QkE7UUFFQ1EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUU5QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ3JCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxLQUFLQSxFQUFjQSxDQUFDQTtZQUU1Q0EsZUFBZUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNsRkEsQ0FBQ0E7UUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDekJBLENBQUNBO0lBRU1SLHdDQUFnQkEsR0FBdkJBO1FBRUNTLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBQ0ZULG9CQUFDQTtBQUFEQSxDQTlGQSxBQThGQ0EsRUE5RjJCLGdCQUFnQixFQThGM0M7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoidGV4dHVyZXMvVGV4dHVyZTJEQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQml0bWFwRGF0YVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Jhc2UvQml0bWFwRGF0YVwiKTtcclxuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5pbXBvcnQgTWlwbWFwR2VuZXJhdG9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL01pcG1hcEdlbmVyYXRvclwiKTtcclxuaW1wb3J0IFRleHR1cmVQcm94eUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZVByb3h5QmFzZVwiKTtcclxuXHJcbmNsYXNzIFRleHR1cmUyREJhc2UgZXh0ZW5kcyBUZXh0dXJlUHJveHlCYXNlXHJcbntcclxuXHRwcml2YXRlIF9taXBtYXBEYXRhOkFycmF5PEJpdG1hcERhdGE+O1xyXG5cdHByaXZhdGUgX21pcG1hcERhdGFEaXJ0eTpib29sZWFuO1xyXG5cdHB1YmxpYyBfcFdpZHRoOm51bWJlcjtcclxuXHRwdWJsaWMgX3BIZWlnaHQ6bnVtYmVyO1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzaXplKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9taXBtYXBEYXRhKSB7XHJcblx0XHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fbWlwbWFwRGF0YS5sZW5ndGg7XHJcblx0XHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHRcdE1pcG1hcEdlbmVyYXRvci5mcmVlTWlwTWFwSG9sZGVyKHRoaXMuX21pcG1hcERhdGFbaV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgaW52YWxpZGF0ZUNvbnRlbnQoKTp2b2lkXHJcblx0e1xyXG5cdFx0c3VwZXIuaW52YWxpZGF0ZUNvbnRlbnQoKTtcclxuXHJcblx0XHR0aGlzLl9taXBtYXBEYXRhRGlydHkgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gd2lkdGhcclxuXHQgKiBAcGFyYW0gaGVpZ2h0XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BTZXRTaXplKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFdpZHRoICE9IHdpZHRoIHx8IHRoaXMuX3BIZWlnaHQgIT0gaGVpZ2h0KVxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVTaXplKCk7XHJcblxyXG5cdFx0dGhpcy5fbWlwbWFwRGF0YURpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLl9wV2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuX3BIZWlnaHQgPSBoZWlnaHQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lHZXRNaXBtYXBEYXRhKCk6QXJyYXk8Qml0bWFwRGF0YT5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5fbWlwbWFwRGF0YURpcnR5KSB7XHJcblx0XHRcdHRoaXMuX21pcG1hcERhdGFEaXJ0eSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKCF0aGlzLl9taXBtYXBEYXRhKVxyXG5cdFx0XHRcdHRoaXMuX21pcG1hcERhdGEgPSBuZXcgQXJyYXk8Qml0bWFwRGF0YT4oKTtcclxuXHJcblx0XHRcdE1pcG1hcEdlbmVyYXRvci5nZW5lcmF0ZU1pcE1hcHModGhpcy5faUdldFRleHR1cmVEYXRhKCksIHRoaXMuX21pcG1hcERhdGEsIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9taXBtYXBEYXRhO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pR2V0VGV4dHVyZURhdGEoKTphbnlcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gVGV4dHVyZTJEQmFzZTsiXX0=