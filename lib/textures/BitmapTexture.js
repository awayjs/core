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
        if (typeof generateMipmaps === "undefined") { generateMipmaps = false; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHR1cmVzL0JpdG1hcFRleHR1cmUudHMiXSwibmFtZXMiOlsiQml0bWFwVGV4dHVyZSIsIkJpdG1hcFRleHR1cmUuY29uc3RydWN0b3IiLCJCaXRtYXBUZXh0dXJlLmRpc3Bvc2UiLCJCaXRtYXBUZXh0dXJlLl9pR2V0VGV4dHVyZURhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1EQUMyRDtBQUMzRCxxRUFBMkU7QUFDM0UsZ0VBQXVFOztBQUV2RTtJQUE0QkEsZ0NBQWFBO0lBNEJ4Q0EsdUJBQVlBLFVBQXFCQSxFQUFFQSxlQUErQkE7UUFBL0JDLDhDQUFBQSxlQUFlQSxHQUFXQSxLQUFLQTtBQUFBQSxRQUVqRUEsV0FBTUEsT0FBQUEsZUFBZUEsQ0FBQ0E7O1FBRXRCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxVQUFVQTtJQUM3QkEsQ0FBQ0E7SUF6QkREO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsV0FBV0E7UUFDeEJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXNCQSxLQUFnQkE7WUFFckNBLElBQUlBLElBQUlBLENBQUNBLFdBQVdBLElBQUlBLEtBQUtBO2dCQUM1QkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQ3pDQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxnRkFBZ0ZBLENBQUNBLENBQUNBOztZQUVuR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0E7O1lBRXhCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBOztZQUV4QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDMUNBLENBQUNBOzs7O0FBZkFBOztJQXdCREEsa0NBQUFBO1FBRUNFLGdCQUFLQSxDQUFDQSxPQUFPQSxLQUFDQSxLQUFBQSxDQUFDQTs7UUFFZkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDMUJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBO0lBQ3hCQSxDQUFDQTs7SUFFREYsMkNBQUFBO1FBRUNHLE9BQU9BLElBQUlBLENBQUNBLFdBQVdBO0lBQ3hCQSxDQUFDQTtJQUNGSCxxQkFBQ0E7QUFBREEsQ0FBQ0EsRUEvQzJCLGFBQWEsRUErQ3hDOztBQUVELDhCQUF1QixDQUFBIiwiZmlsZSI6InRleHR1cmVzL0JpdG1hcFRleHR1cmUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQml0bWFwRGF0YVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9CaXRtYXBEYXRhXCIpO1xuaW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5pbXBvcnQgVGV4dHVyZTJEQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xuaW1wb3J0IFRleHR1cmVVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1RleHR1cmVVdGlsc1wiKTtcblxuY2xhc3MgQml0bWFwVGV4dHVyZSBleHRlbmRzIFRleHR1cmUyREJhc2Vcbntcblx0cHVibGljIF9iaXRtYXBEYXRhOkJpdG1hcERhdGE7XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtCaXRtYXBEYXRhfVxuXHQgKi9cblx0cHVibGljIGdldCBiaXRtYXBEYXRhKCk6Qml0bWFwRGF0YVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGE7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJpdG1hcERhdGEodmFsdWU6Qml0bWFwRGF0YSlcblx0e1xuXHRcdGlmICh0aGlzLl9iaXRtYXBEYXRhID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0aWYgKCFUZXh0dXJlVXRpbHMuaXNCaXRtYXBEYXRhVmFsaWQodmFsdWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiaXRtYXBEYXRhOiBXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgcG93ZXIgb2YgMiBhbmQgY2Fubm90IGV4Y2VlZCAyMDQ4XCIpO1xuXG5cdFx0dGhpcy5fYml0bWFwRGF0YSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgsIHZhbHVlLmhlaWdodCk7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcihiaXRtYXBEYXRhOkJpdG1hcERhdGEsIGdlbmVyYXRlTWlwbWFwczpib29sZWFuID0gZmFsc2UpXG5cdHtcblx0XHRzdXBlcihnZW5lcmF0ZU1pcG1hcHMpO1xuXG5cdFx0dGhpcy5iaXRtYXBEYXRhID0gYml0bWFwRGF0YTtcblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMuX2JpdG1hcERhdGEuZGlzcG9zZSgpO1xuXHRcdHRoaXMuX2JpdG1hcERhdGEgPSBudWxsO1xuXHR9XG5cblx0cHVibGljIF9pR2V0VGV4dHVyZURhdGEoKTpCaXRtYXBEYXRhXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYml0bWFwRGF0YTtcblx0fVxufVxuXG5leHBvcnQgPSBCaXRtYXBUZXh0dXJlOyJdfQ==