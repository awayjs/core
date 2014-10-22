var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var CubeTextureBase = require("awayjs-core/lib/textures/CubeTextureBase");
var TextureUtils = require("awayjs-core/lib/utils/TextureUtils");

var BitmapCubeTexture = (function (_super) {
    __extends(BitmapCubeTexture, _super);
    function BitmapCubeTexture(posX, negX, posY, negY, posZ, negZ, generateMipmaps) {
        if (typeof generateMipmaps === "undefined") { generateMipmaps = false; }
        _super.call(this, generateMipmaps);
        this._bitmapDatas = new Array(6);

        this._testSize(this._bitmapDatas[0] = posX);
        this._testSize(this._bitmapDatas[1] = negX);
        this._testSize(this._bitmapDatas[2] = posY);
        this._testSize(this._bitmapDatas[3] = negY);
        this._testSize(this._bitmapDatas[4] = posZ);
        this._testSize(this._bitmapDatas[5] = negZ);

        this.invalidateContent();

        this._pSetSize(posX.width);
    }
    Object.defineProperty(BitmapCubeTexture.prototype, "positiveX", {
        /**
        * The texture on the cube's right face.
        */
        get: function () {
            return this._bitmapDatas[0];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._bitmapDatas[0] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(BitmapCubeTexture.prototype, "negativeX", {
        /**
        * The texture on the cube's left face.
        */
        get: function () {
            return this._bitmapDatas[1];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._bitmapDatas[1] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(BitmapCubeTexture.prototype, "positiveY", {
        /**
        * The texture on the cube's top face.
        */
        get: function () {
            return this._bitmapDatas[2];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._bitmapDatas[2] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(BitmapCubeTexture.prototype, "negativeY", {
        /**
        * The texture on the cube's bottom face.
        */
        get: function () {
            return this._bitmapDatas[3];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._bitmapDatas[3] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(BitmapCubeTexture.prototype, "positiveZ", {
        /**
        * The texture on the cube's far face.
        */
        get: function () {
            return this._bitmapDatas[4];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._bitmapDatas[4] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(BitmapCubeTexture.prototype, "negativeZ", {
        /**
        * The texture on the cube's near face.
        */
        get: function () {
            return this._bitmapDatas[5];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._bitmapDatas[5] = value;
        },
        enumerable: true,
        configurable: true
    });


    /**
    *
    * @param value
    * @private
    */
    BitmapCubeTexture.prototype._testSize = function (value) {
        if (value.width != value.height)
            throw new Error("BitmapData should have equal width and height!");
        if (!TextureUtils.isBitmapDataValid(value))
            throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
    };

    BitmapCubeTexture.prototype.dispose = function () {
        _super.prototype.dispose.call(this);

        var len = this._bitmapDatas.length;
        for (var i = 0; i < len; i++) {
            this._bitmapDatas[i].dispose();
            this._bitmapDatas[i] = null;
        }

        this._bitmapDatas = null;
    };

    BitmapCubeTexture.prototype._iGetTextureData = function (side) {
        return this._bitmapDatas[side];
    };
    return BitmapCubeTexture;
})(CubeTextureBase);

module.exports = BitmapCubeTexture;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHR1cmVzL0JpdG1hcEN1YmVUZXh0dXJlLnRzIl0sIm5hbWVzIjpbIkJpdG1hcEN1YmVUZXh0dXJlIiwiQml0bWFwQ3ViZVRleHR1cmUuY29uc3RydWN0b3IiLCJCaXRtYXBDdWJlVGV4dHVyZS5fdGVzdFNpemUiLCJCaXRtYXBDdWJlVGV4dHVyZS5kaXNwb3NlIiwiQml0bWFwQ3ViZVRleHR1cmUuX2lHZXRUZXh0dXJlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQzJEO0FBQzNELHlFQUErRTtBQUMvRSxnRUFBdUU7O0FBRXZFO0lBQWdDQSxvQ0FBZUE7SUFvRzlDQSwyQkFBWUEsSUFBZUEsRUFBRUEsSUFBZUEsRUFBRUEsSUFBZUEsRUFBRUEsSUFBZUEsRUFBRUEsSUFBZUEsRUFBRUEsSUFBZUEsRUFBRUEsZUFBK0JBO1FBQS9CQyw4Q0FBQUEsZUFBZUEsR0FBV0EsS0FBS0E7QUFBQUEsUUFFaEpBLFdBQU1BLE9BQUFBLGVBQWVBLENBQUNBO1FBcEd2QkEsS0FBUUEsWUFBWUEsR0FBcUJBLElBQUlBLEtBQUtBLENBQWFBLENBQUNBLENBQUNBLENBQUNBOztRQXNHakVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzNDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMzQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDM0NBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzNDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMzQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7O1FBRTNDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBOztRQUV4QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBM0dERDtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXFCQSxLQUFnQkE7WUFFcENBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0E7UUFDN0JBLENBQUNBOzs7O0FBUkFBOztJQWFEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXFCQSxLQUFnQkE7WUFFcENBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0E7UUFDN0JBLENBQUNBOzs7O0FBUkFBOztJQWFEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXFCQSxLQUFnQkE7WUFFcENBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0E7UUFDN0JBLENBQUNBOzs7O0FBUkFBOztJQWFEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXFCQSxLQUFnQkE7WUFFcENBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0E7UUFDN0JBLENBQUNBOzs7O0FBUkFBOztJQWFEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXFCQSxLQUFnQkE7WUFFcENBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0E7UUFDN0JBLENBQUNBOzs7O0FBUkFBOztJQWFEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXFCQSxLQUFnQkE7WUFFcENBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0E7UUFDN0JBLENBQUNBOzs7O0FBUkFBOztJQStCREE7Ozs7TUFER0E7NENBQ0hBLFVBQWtCQSxLQUFnQkE7UUFFakNFLElBQUlBLEtBQUtBLENBQUNBLEtBQUtBLElBQUlBLEtBQUtBLENBQUNBLE1BQU1BO1lBQzlCQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxnREFBZ0RBLENBQUNBLENBQUNBO1FBQ25FQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3pDQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxnRkFBZ0ZBLENBQUNBLENBQUNBO0lBQ3BHQSxDQUFDQTs7SUFFREYsc0NBQUFBO1FBRUNHLGdCQUFLQSxDQUFDQSxPQUFPQSxLQUFDQSxLQUFBQSxDQUFDQTs7UUFFZkEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUE7UUFDekNBLEtBQUtBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLENBQUVBO1lBQ3BDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUM5QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUE7U0FDM0JBOztRQUVEQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQTtJQUN6QkEsQ0FBQ0E7O0lBRURILCtDQUFBQSxVQUF3QkEsSUFBV0E7UUFFbENJLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUNGSix5QkFBQ0E7QUFBREEsQ0FBQ0EsRUFsSitCLGVBQWUsRUFrSjlDOztBQUVELGtDQUEyQixDQUFBIiwiZmlsZSI6InRleHR1cmVzL0JpdG1hcEN1YmVUZXh0dXJlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvQml0bWFwRGF0YVwiKTtcbmltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xuaW1wb3J0IEN1YmVUZXh0dXJlQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9DdWJlVGV4dHVyZUJhc2VcIik7XG5pbXBvcnQgVGV4dHVyZVV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvVGV4dHVyZVV0aWxzXCIpO1xuXG5jbGFzcyBCaXRtYXBDdWJlVGV4dHVyZSBleHRlbmRzIEN1YmVUZXh0dXJlQmFzZVxue1xuXHRwcml2YXRlIF9iaXRtYXBEYXRhczpBcnJheTxCaXRtYXBEYXRhPiA9IG5ldyBBcnJheTxCaXRtYXBEYXRhPig2KTtcblxuXHQvKipcblx0ICogVGhlIHRleHR1cmUgb24gdGhlIGN1YmUncyByaWdodCBmYWNlLlxuXHQgKi9cblx0cHVibGljIGdldCBwb3NpdGl2ZVgoKTpCaXRtYXBEYXRhXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYml0bWFwRGF0YXNbMF07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBvc2l0aXZlWCh2YWx1ZTpCaXRtYXBEYXRhKVxuXHR7XG5cdFx0dGhpcy5fdGVzdFNpemUodmFsdWUpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblx0XHR0aGlzLl9wU2V0U2l6ZSh2YWx1ZS53aWR0aCk7XG5cdFx0dGhpcy5fYml0bWFwRGF0YXNbMF0gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdGV4dHVyZSBvbiB0aGUgY3ViZSdzIGxlZnQgZmFjZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgbmVnYXRpdmVYKCk6Qml0bWFwRGF0YVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGFzWzFdO1xuXHR9XG5cblx0cHVibGljIHNldCBuZWdhdGl2ZVgodmFsdWU6Qml0bWFwRGF0YSlcblx0e1xuXHRcdHRoaXMuX3Rlc3RTaXplKHZhbHVlKTtcblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgpO1xuXHRcdHRoaXMuX2JpdG1hcERhdGFzWzFdID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRleHR1cmUgb24gdGhlIGN1YmUncyB0b3AgZmFjZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcG9zaXRpdmVZKCk6Qml0bWFwRGF0YVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGFzWzJdO1xuXHR9XG5cblx0cHVibGljIHNldCBwb3NpdGl2ZVkodmFsdWU6Qml0bWFwRGF0YSlcblx0e1xuXHRcdHRoaXMuX3Rlc3RTaXplKHZhbHVlKTtcblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgpO1xuXHRcdHRoaXMuX2JpdG1hcERhdGFzWzJdID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRleHR1cmUgb24gdGhlIGN1YmUncyBib3R0b20gZmFjZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgbmVnYXRpdmVZKCk6Qml0bWFwRGF0YVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGFzWzNdO1xuXHR9XG5cblx0cHVibGljIHNldCBuZWdhdGl2ZVkodmFsdWU6Qml0bWFwRGF0YSlcblx0e1xuXHRcdHRoaXMuX3Rlc3RTaXplKHZhbHVlKTtcblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgpO1xuXHRcdHRoaXMuX2JpdG1hcERhdGFzWzNdID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRleHR1cmUgb24gdGhlIGN1YmUncyBmYXIgZmFjZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcG9zaXRpdmVaKCk6Qml0bWFwRGF0YVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGFzWzRdO1xuXHR9XG5cblx0cHVibGljIHNldCBwb3NpdGl2ZVoodmFsdWU6Qml0bWFwRGF0YSlcblx0e1xuXHRcdHRoaXMuX3Rlc3RTaXplKHZhbHVlKTtcblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgpO1xuXHRcdHRoaXMuX2JpdG1hcERhdGFzWzRdID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRleHR1cmUgb24gdGhlIGN1YmUncyBuZWFyIGZhY2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG5lZ2F0aXZlWigpOkJpdG1hcERhdGFcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iaXRtYXBEYXRhc1s1XTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbmVnYXRpdmVaKHZhbHVlOkJpdG1hcERhdGEpXG5cdHtcblx0XHR0aGlzLl90ZXN0U2l6ZSh2YWx1ZSk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXHRcdHRoaXMuX3BTZXRTaXplKHZhbHVlLndpZHRoKTtcblx0XHR0aGlzLl9iaXRtYXBEYXRhc1s1XSA9IHZhbHVlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IocG9zWDpCaXRtYXBEYXRhLCBuZWdYOkJpdG1hcERhdGEsIHBvc1k6Qml0bWFwRGF0YSwgbmVnWTpCaXRtYXBEYXRhLCBwb3NaOkJpdG1hcERhdGEsIG5lZ1o6Qml0bWFwRGF0YSwgZ2VuZXJhdGVNaXBtYXBzOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKGdlbmVyYXRlTWlwbWFwcyk7XG5cblx0XHR0aGlzLl90ZXN0U2l6ZSh0aGlzLl9iaXRtYXBEYXRhc1swXSA9IHBvc1gpO1xuXHRcdHRoaXMuX3Rlc3RTaXplKHRoaXMuX2JpdG1hcERhdGFzWzFdID0gbmVnWCk7XG5cdFx0dGhpcy5fdGVzdFNpemUodGhpcy5fYml0bWFwRGF0YXNbMl0gPSBwb3NZKTtcblx0XHR0aGlzLl90ZXN0U2l6ZSh0aGlzLl9iaXRtYXBEYXRhc1szXSA9IG5lZ1kpO1xuXHRcdHRoaXMuX3Rlc3RTaXplKHRoaXMuX2JpdG1hcERhdGFzWzRdID0gcG9zWik7XG5cdFx0dGhpcy5fdGVzdFNpemUodGhpcy5fYml0bWFwRGF0YXNbNV0gPSBuZWdaKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblxuXHRcdHRoaXMuX3BTZXRTaXplKHBvc1gud2lkdGgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWx1ZVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBfdGVzdFNpemUodmFsdWU6Qml0bWFwRGF0YSlcblx0e1xuXHRcdGlmICh2YWx1ZS53aWR0aCAhPSB2YWx1ZS5oZWlnaHQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJCaXRtYXBEYXRhIHNob3VsZCBoYXZlIGVxdWFsIHdpZHRoIGFuZCBoZWlnaHQhXCIpO1xuXHRcdGlmICghVGV4dHVyZVV0aWxzLmlzQml0bWFwRGF0YVZhbGlkKHZhbHVlKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYml0bWFwRGF0YTogV2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIHBvd2VyIG9mIDIgYW5kIGNhbm5vdCBleGNlZWQgMjA0OFwiKTtcblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fYml0bWFwRGF0YXMubGVuZ3RoXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHRoaXMuX2JpdG1hcERhdGFzW2ldLmRpc3Bvc2UoKTtcblx0XHRcdHRoaXMuX2JpdG1hcERhdGFzW2ldID0gbnVsbDtcblx0XHR9XG5cblx0XHR0aGlzLl9iaXRtYXBEYXRhcyA9IG51bGw7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRUZXh0dXJlRGF0YShzaWRlOm51bWJlcik6Qml0bWFwRGF0YVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpdG1hcERhdGFzW3NpZGVdO1xuXHR9XG59XG5cbmV4cG9ydCA9IEJpdG1hcEN1YmVUZXh0dXJlOyJdfQ==