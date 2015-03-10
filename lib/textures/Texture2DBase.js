var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var MipmapGenerator = require("awayjs-core/lib/textures/MipmapGenerator");
var TextureBase = require("awayjs-core/lib/textures/TextureBase");
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
})(TextureBase);
module.exports = Texture2DBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlLnRzIl0sIm5hbWVzIjpbIlRleHR1cmUyREJhc2UiLCJUZXh0dXJlMkRCYXNlLmNvbnN0cnVjdG9yIiwiVGV4dHVyZTJEQmFzZS53aWR0aCIsIlRleHR1cmUyREJhc2UuaGVpZ2h0IiwiVGV4dHVyZTJEQmFzZS5zaXplIiwiVGV4dHVyZTJEQmFzZS5kaXNwb3NlIiwiVGV4dHVyZTJEQmFzZS5pbnZhbGlkYXRlQ29udGVudCIsIlRleHR1cmUyREJhc2UuX3BTZXRTaXplIiwiVGV4dHVyZTJEQmFzZS5faUdldE1pcG1hcERhdGEiLCJUZXh0dXJlMkRCYXNlLl9pR2V0VGV4dHVyZURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUNwRixJQUFPLGVBQWUsV0FBYSwwQ0FBMEMsQ0FBQyxDQUFDO0FBQy9FLElBQU8sV0FBVyxXQUFjLHNDQUFzQyxDQUFDLENBQUM7QUFFeEUsSUFBTSxhQUFhO0lBQVNBLFVBQXRCQSxhQUFhQSxVQUFvQkE7SUE4QnRDQSxTQTlCS0EsYUFBYUE7UUFnQ2pCQyxpQkFBT0EsQ0FBQ0E7SUFDVEEsQ0FBQ0E7SUF0QkRELHNCQUFXQSxnQ0FBS0E7UUFKaEJBOzs7V0FHR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQUY7SUFNREEsc0JBQVdBLGlDQUFNQTtRQUpqQkE7OztXQUdHQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7OztPQUFBSDtJQUVEQSxzQkFBV0EsK0JBQUlBO2FBQWZBO1lBRUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3JCQSxDQUFDQTs7O09BQUFKO0lBT0RBOztPQUVHQTtJQUNJQSwrQkFBT0EsR0FBZEE7UUFFQ0ssZ0JBQUtBLENBQUNBLE9BQU9BLFdBQUVBLENBQUNBO1FBRWhCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0QkEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDekNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO2dCQUNsQ0EsZUFBZUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN4REEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFREw7O09BRUdBO0lBQ0lBLHlDQUFpQkEsR0FBeEJBO1FBRUNNLGdCQUFLQSxDQUFDQSxpQkFBaUJBLFdBQUVBLENBQUNBO1FBRTFCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO0lBQzlCQSxDQUFDQTtJQUVETjs7Ozs7T0FLR0E7SUFDSUEsaUNBQVNBLEdBQWhCQSxVQUFpQkEsS0FBWUEsRUFBRUEsTUFBYUE7UUFFM0NPLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLE1BQU1BLENBQUNBO1lBQ3BEQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtRQUV2QkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUU3QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDckJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLE1BQU1BLENBQUNBO0lBQ3hCQSxDQUFDQTtJQUVNUCx1Q0FBZUEsR0FBdEJBO1FBRUNRLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFOUJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO2dCQUNyQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsS0FBS0EsRUFBY0EsQ0FBQ0E7WUFFNUNBLGVBQWVBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsV0FBV0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDbEZBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO0lBQ3pCQSxDQUFDQTtJQUVNUix3Q0FBZ0JBLEdBQXZCQTtRQUVDUyxNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUNGVCxvQkFBQ0E7QUFBREEsQ0E5RkEsQUE4RkNBLEVBOUYyQixXQUFXLEVBOEZ0QztBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJ0ZXh0dXJlcy9UZXh0dXJlMkRCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBEYXRhXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9CaXRtYXBEYXRhXCIpO1xuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xuaW1wb3J0IE1pcG1hcEdlbmVyYXRvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9NaXBtYXBHZW5lcmF0b3JcIik7XG5pbXBvcnQgVGV4dHVyZUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlQmFzZVwiKTtcblxuY2xhc3MgVGV4dHVyZTJEQmFzZSBleHRlbmRzIFRleHR1cmVCYXNlXG57XG5cdHByaXZhdGUgX21pcG1hcERhdGE6QXJyYXk8Qml0bWFwRGF0YT47XG5cdHByaXZhdGUgX21pcG1hcERhdGFEaXJ0eTpib29sZWFuO1xuXHRwdWJsaWMgX3BXaWR0aDpudW1iZXI7XG5cdHB1YmxpYyBfcEhlaWdodDpudW1iZXI7XG5cdFxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wV2lkdGg7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEhlaWdodDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgc2l6ZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblxuXHRcdGlmICh0aGlzLl9taXBtYXBEYXRhKSB7XG5cdFx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX21pcG1hcERhdGEubGVuZ3RoO1xuXHRcdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHRcdE1pcG1hcEdlbmVyYXRvci5mcmVlTWlwTWFwSG9sZGVyKHRoaXMuX21pcG1hcERhdGFbaV0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGludmFsaWRhdGVDb250ZW50KCk6dm9pZFxuXHR7XG5cdFx0c3VwZXIuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblxuXHRcdHRoaXMuX21pcG1hcERhdGFEaXJ0eSA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHdpZHRoXG5cdCAqIEBwYXJhbSBoZWlnaHRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfcFNldFNpemUod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BXaWR0aCAhPSB3aWR0aCB8fCB0aGlzLl9wSGVpZ2h0ICE9IGhlaWdodClcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVNpemUoKTtcblxuXHRcdHRoaXMuX21pcG1hcERhdGFEaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLl9wV2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLl9wSGVpZ2h0ID0gaGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIF9pR2V0TWlwbWFwRGF0YSgpOkFycmF5PEJpdG1hcERhdGE+XG5cdHtcblx0XHRpZiAodGhpcy5fbWlwbWFwRGF0YURpcnR5KSB7XG5cdFx0XHR0aGlzLl9taXBtYXBEYXRhRGlydHkgPSBmYWxzZTtcblxuXHRcdFx0aWYgKCF0aGlzLl9taXBtYXBEYXRhKVxuXHRcdFx0XHR0aGlzLl9taXBtYXBEYXRhID0gbmV3IEFycmF5PEJpdG1hcERhdGE+KCk7XG5cblx0XHRcdE1pcG1hcEdlbmVyYXRvci5nZW5lcmF0ZU1pcE1hcHModGhpcy5faUdldFRleHR1cmVEYXRhKCksIHRoaXMuX21pcG1hcERhdGEsIHRydWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9taXBtYXBEYXRhO1xuXHR9XG5cblx0cHVibGljIF9pR2V0VGV4dHVyZURhdGEoKTphbnlcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gVGV4dHVyZTJEQmFzZTsiXX0=