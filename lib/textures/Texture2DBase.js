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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy90ZXh0dXJlMmRiYXNlLnRzIl0sIm5hbWVzIjpbIlRleHR1cmUyREJhc2UiLCJUZXh0dXJlMkRCYXNlLmNvbnN0cnVjdG9yIiwiVGV4dHVyZTJEQmFzZS53aWR0aCIsIlRleHR1cmUyREJhc2UuaGVpZ2h0IiwiVGV4dHVyZTJEQmFzZS5zaXplIiwiVGV4dHVyZTJEQmFzZS5kaXNwb3NlIiwiVGV4dHVyZTJEQmFzZS5pbnZhbGlkYXRlQ29udGVudCIsIlRleHR1cmUyREJhc2UuX3BTZXRTaXplIiwiVGV4dHVyZTJEQmFzZS5faUdldE1pcG1hcERhdGEiLCJUZXh0dXJlMkRCYXNlLl9pR2V0VGV4dHVyZURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUNwRixJQUFPLGVBQWUsV0FBYSwwQ0FBMEMsQ0FBQyxDQUFDO0FBQy9FLElBQU8sZ0JBQWdCLFdBQWEsMkNBQTJDLENBQUMsQ0FBQztBQUVqRixJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQXlCQTtJQThCM0NBLFNBOUJLQSxhQUFhQTtRQWdDakJDLGlCQUFPQSxDQUFDQTtJQUNUQSxDQUFDQTtJQXRCREQsc0JBQVdBLGdDQUFLQTtRQUpoQkE7OztXQUdHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBRjtJQU1EQSxzQkFBV0EsaUNBQU1BO1FBSmpCQTs7O1dBR0dBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3RCQSxDQUFDQTs7O09BQUFIO0lBRURBLHNCQUFXQSwrQkFBSUE7YUFBZkE7WUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQUo7SUFPREE7O09BRUdBO0lBQ0lBLCtCQUFPQSxHQUFkQTtRQUVDSyxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7UUFFaEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUN6Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7Z0JBQ2xDQSxlQUFlQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ3hEQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVETDs7T0FFR0E7SUFDSUEseUNBQWlCQSxHQUF4QkE7UUFFQ00sZ0JBQUtBLENBQUNBLGlCQUFpQkEsV0FBRUEsQ0FBQ0E7UUFFMUJBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDOUJBLENBQUNBO0lBRUROOzs7OztPQUtHQTtJQUNJQSxpQ0FBU0EsR0FBaEJBLFVBQWlCQSxLQUFZQSxFQUFFQSxNQUFhQTtRQUUzQ08sRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsSUFBSUEsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsTUFBTUEsQ0FBQ0E7WUFDcERBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1FBRXZCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1FBRTdCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFDeEJBLENBQUNBO0lBRU1QLHVDQUFlQSxHQUF0QkE7UUFFQ1EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUU5QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ3JCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxLQUFLQSxFQUFjQSxDQUFDQTtZQUU1Q0EsZUFBZUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNsRkEsQ0FBQ0E7UUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7SUFDekJBLENBQUNBO0lBRU1SLHdDQUFnQkEsR0FBdkJBO1FBRUNTLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBQ0ZULG9CQUFDQTtBQUFEQSxDQTlGQSxBQThGQ0EsRUE5RjJCLGdCQUFnQixFQThGM0M7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoidGV4dHVyZXMvVGV4dHVyZTJEQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQml0bWFwRGF0YVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Jhc2UvQml0bWFwRGF0YVwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcbmltcG9ydCBNaXBtYXBHZW5lcmF0b3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvTWlwbWFwR2VuZXJhdG9yXCIpO1xuaW1wb3J0IFRleHR1cmVQcm94eUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZVByb3h5QmFzZVwiKTtcblxuY2xhc3MgVGV4dHVyZTJEQmFzZSBleHRlbmRzIFRleHR1cmVQcm94eUJhc2Vcbntcblx0cHJpdmF0ZSBfbWlwbWFwRGF0YTpBcnJheTxCaXRtYXBEYXRhPjtcblx0cHJpdmF0ZSBfbWlwbWFwRGF0YURpcnR5OmJvb2xlYW47XG5cdHB1YmxpYyBfcFdpZHRoOm51bWJlcjtcblx0cHVibGljIF9wSGVpZ2h0Om51bWJlcjtcblx0XG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIGdldCBzaXplKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFdpZHRoO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xuXG5cdFx0aWYgKHRoaXMuX21pcG1hcERhdGEpIHtcblx0XHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fbWlwbWFwRGF0YS5sZW5ndGg7XG5cdFx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdFx0TWlwbWFwR2VuZXJhdG9yLmZyZWVNaXBNYXBIb2xkZXIodGhpcy5fbWlwbWFwRGF0YVtpXSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgaW52YWxpZGF0ZUNvbnRlbnQoKTp2b2lkXG5cdHtcblx0XHRzdXBlci5pbnZhbGlkYXRlQ29udGVudCgpO1xuXG5cdFx0dGhpcy5fbWlwbWFwRGF0YURpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gd2lkdGhcblx0ICogQHBhcmFtIGhlaWdodFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIF9wU2V0U2l6ZSh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcFdpZHRoICE9IHdpZHRoIHx8IHRoaXMuX3BIZWlnaHQgIT0gaGVpZ2h0KVxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlU2l6ZSgpO1xuXG5cdFx0dGhpcy5fbWlwbWFwRGF0YURpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuX3BXaWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuX3BIZWlnaHQgPSBoZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRNaXBtYXBEYXRhKCk6QXJyYXk8Qml0bWFwRGF0YT5cblx0e1xuXHRcdGlmICh0aGlzLl9taXBtYXBEYXRhRGlydHkpIHtcblx0XHRcdHRoaXMuX21pcG1hcERhdGFEaXJ0eSA9IGZhbHNlO1xuXG5cdFx0XHRpZiAoIXRoaXMuX21pcG1hcERhdGEpXG5cdFx0XHRcdHRoaXMuX21pcG1hcERhdGEgPSBuZXcgQXJyYXk8Qml0bWFwRGF0YT4oKTtcblxuXHRcdFx0TWlwbWFwR2VuZXJhdG9yLmdlbmVyYXRlTWlwTWFwcyh0aGlzLl9pR2V0VGV4dHVyZURhdGEoKSwgdGhpcy5fbWlwbWFwRGF0YSwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX21pcG1hcERhdGE7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRUZXh0dXJlRGF0YSgpOmFueVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxufVxuXG5leHBvcnQgPSBUZXh0dXJlMkRCYXNlOyJdfQ==