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
    function BitmapTexture(bitmapData, generateMipmaps) {
        if (generateMipmaps === void 0) { generateMipmaps = false; }
        _super.call(this, generateMipmaps);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9iaXRtYXB0ZXh0dXJlLnRzIl0sIm5hbWVzIjpbIkJpdG1hcFRleHR1cmUiLCJCaXRtYXBUZXh0dXJlLmNvbnN0cnVjdG9yIiwiQml0bWFwVGV4dHVyZS5iaXRtYXBEYXRhIiwiQml0bWFwVGV4dHVyZS5kaXNwb3NlIiwiQml0bWFwVGV4dHVyZS5faUdldFRleHR1cmVEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQU8sYUFBYSxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDM0UsSUFBTyxZQUFZLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUd2RSxJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQXNCQTtJQTRCeENBLFNBNUJLQSxhQUFhQSxDQTRCTkEsVUFBcUJBLEVBQUVBLGVBQStCQTtRQUEvQkMsK0JBQStCQSxHQUEvQkEsdUJBQStCQTtRQUVqRUEsa0JBQU1BLGVBQWVBLENBQUNBLENBQUNBO1FBRXZCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxVQUFVQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUF6QkRELHNCQUFXQSxxQ0FBVUE7UUFKckJBOzs7V0FHR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7UUFDekJBLENBQUNBO2FBRURGLFVBQXNCQSxLQUFnQkE7WUFFckNFLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLElBQUlBLEtBQUtBLENBQUNBO2dCQUM3QkEsTUFBTUEsQ0FBQ0E7WUFFUkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDMUNBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLGdGQUFnRkEsQ0FBQ0EsQ0FBQ0E7WUFFbkdBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBO1lBRXpCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO1lBRXpCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUMzQ0EsQ0FBQ0E7OztPQWZBRjtJQXdCTUEsK0JBQU9BLEdBQWRBO1FBRUNHLGdCQUFLQSxDQUFDQSxPQUFPQSxXQUFFQSxDQUFDQTtRQUVoQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDM0JBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBO0lBQ3pCQSxDQUFDQTtJQUVNSCx3Q0FBZ0JBLEdBQXZCQTtRQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFDRkosb0JBQUNBO0FBQURBLENBL0NBLEFBK0NDQSxFQS9DMkIsYUFBYSxFQStDeEM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoidGV4dHVyZXMvQml0bWFwVGV4dHVyZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyLvu79pbXBvcnQgQml0bWFwRGF0YVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Jhc2UvQml0bWFwRGF0YVwiKTtcbmltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xuaW1wb3J0IFRleHR1cmUyREJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcbmltcG9ydCBUZXh0dXJlVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9UZXh0dXJlVXRpbHNcIik7XG5cblxuY2xhc3MgQml0bWFwVGV4dHVyZSBleHRlbmRzIFRleHR1cmUyREJhc2Vcbntcblx0cHVibGljIF9iaXRtYXBEYXRhOkJpdG1hcERhdGE7XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtCaXRtYXBEYXRhfVxuXHQgKi9cblx0cHVibGljIGdldCBiaXRtYXBEYXRhKCk6Qml0bWFwRGF0YVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGE7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJpdG1hcERhdGEodmFsdWU6Qml0bWFwRGF0YSlcblx0e1xuXHRcdGlmICh0aGlzLl9iaXRtYXBEYXRhID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0aWYgKCFUZXh0dXJlVXRpbHMuaXNCaXRtYXBEYXRhVmFsaWQodmFsdWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiaXRtYXBEYXRhOiBXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgcG93ZXIgb2YgMiBhbmQgY2Fubm90IGV4Y2VlZCAyMDQ4XCIpO1xuXG5cdFx0dGhpcy5fYml0bWFwRGF0YSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgsIHZhbHVlLmhlaWdodCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihiaXRtYXBEYXRhOkJpdG1hcERhdGEsIGdlbmVyYXRlTWlwbWFwczpib29sZWFuID0gZmFsc2UpXG5cdHtcblx0XHRzdXBlcihnZW5lcmF0ZU1pcG1hcHMpO1xuXG5cdFx0dGhpcy5iaXRtYXBEYXRhID0gYml0bWFwRGF0YTtcblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMuX2JpdG1hcERhdGEuZGlzcG9zZSgpO1xuXHRcdHRoaXMuX2JpdG1hcERhdGEgPSBudWxsO1xuXHR9XG5cblx0cHVibGljIF9pR2V0VGV4dHVyZURhdGEoKTpCaXRtYXBEYXRhXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYml0bWFwRGF0YTtcblx0fVxufVxuXG5leHBvcnQgPSBCaXRtYXBUZXh0dXJlOyJdfQ==