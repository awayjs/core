var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var CubeTextureBase = require("awayjs-core/lib/textures/CubeTextureBase");
var TextureUtils = require("awayjs-core/lib/utils/TextureUtils");

var ImageCubeTexture = (function (_super) {
    __extends(ImageCubeTexture, _super);
    function ImageCubeTexture(posX, negX, posY, negY, posZ, negZ, generateMipmaps) {
        if (typeof generateMipmaps === "undefined") { generateMipmaps = false; }
        _super.call(this, generateMipmaps);
        this._htmlImageElements = new Array(6);

        this._testSize(this._htmlImageElements[0] = posX);
        this._testSize(this._htmlImageElements[1] = negX);
        this._testSize(this._htmlImageElements[2] = posY);
        this._testSize(this._htmlImageElements[3] = negY);
        this._testSize(this._htmlImageElements[4] = posZ);
        this._testSize(this._htmlImageElements[5] = negZ);

        this.invalidateContent();

        this._pSetSize(posX.width);
    }
    Object.defineProperty(ImageCubeTexture.prototype, "positiveX", {
        /**
        * The texture on the cube's right face.
        */
        get: function () {
            return this._htmlImageElements[0];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._htmlImageElements[0] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ImageCubeTexture.prototype, "negativeX", {
        /**
        * The texture on the cube's left face.
        */
        get: function () {
            return this._htmlImageElements[1];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._htmlImageElements[1] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ImageCubeTexture.prototype, "positiveY", {
        /**
        * The texture on the cube's top face.
        */
        get: function () {
            return this._htmlImageElements[2];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._htmlImageElements[2] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ImageCubeTexture.prototype, "negativeY", {
        /**
        * The texture on the cube's bottom face.
        */
        get: function () {
            return this._htmlImageElements[3];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._htmlImageElements[3] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ImageCubeTexture.prototype, "positiveZ", {
        /**
        * The texture on the cube's far face.
        */
        get: function () {
            return this._htmlImageElements[4];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._htmlImageElements[4] = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ImageCubeTexture.prototype, "negativeZ", {
        /**
        * The texture on the cube's near face.
        */
        get: function () {
            return this._htmlImageElements[5];
        },
        set: function (value) {
            this._testSize(value);
            this.invalidateContent();
            this._pSetSize(value.width);
            this._htmlImageElements[5] = value;
        },
        enumerable: true,
        configurable: true
    });


    ImageCubeTexture.prototype._testSize = function (value) {
        if (value.width != value.height)
            throw new Error("BitmapData should have equal width and height!");
        if (!TextureUtils.isHTMLImageElementValid(value))
            throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
    };

    ImageCubeTexture.prototype._iGetTextureData = function (side) {
        return this._htmlImageElements[side];
    };
    return ImageCubeTexture;
})(CubeTextureBase);

module.exports = ImageCubeTexture;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHR1cmVzL0ltYWdlQ3ViZVRleHR1cmUudHMiXSwibmFtZXMiOlsiSW1hZ2VDdWJlVGV4dHVyZSIsIkltYWdlQ3ViZVRleHR1cmUuY29uc3RydWN0b3IiLCJJbWFnZUN1YmVUZXh0dXJlLl90ZXN0U2l6ZSIsIkltYWdlQ3ViZVRleHR1cmUuX2lHZXRUZXh0dXJlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQTJEO0FBQzNELHlFQUErRTtBQUMvRSxnRUFBdUU7O0FBRXZFO0lBQStCQSxtQ0FBZUE7SUFvRzdDQSwwQkFBWUEsSUFBcUJBLEVBQUVBLElBQXFCQSxFQUFFQSxJQUFxQkEsRUFBRUEsSUFBcUJBLEVBQUVBLElBQXFCQSxFQUFFQSxJQUFxQkEsRUFBRUEsZUFBK0JBO1FBQS9CQyw4Q0FBQUEsZUFBZUEsR0FBV0EsS0FBS0E7QUFBQUEsUUFFcExBLFdBQU1BLE9BQUFBLGVBQWVBLENBQUNBO1FBcEd2QkEsS0FBUUEsa0JBQWtCQSxHQUEyQkEsSUFBSUEsS0FBS0EsQ0FBbUJBLENBQUNBLENBQUNBLENBQUNBOztRQXNHbkZBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDakRBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDakRBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDakRBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDakRBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0Es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QTtZQUMzQkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQTtRQUNuQ0EsQ0FBQ0E7Ozs7QUFSQUE7O0lBYURBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBLENBQUNBO1FBQ2xDQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFxQkEsS0FBc0JBO1lBRTFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDM0JBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0E7UUFDbkNBLENBQUNBOzs7O0FBUkFBOztJQTBCREEsdUNBQUFBLFVBQWtCQSxLQUFzQkE7UUFFdkNFLElBQUlBLEtBQUtBLENBQUNBLEtBQUtBLElBQUlBLEtBQUtBLENBQUNBLE1BQU1BO1lBQzlCQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxnREFBZ0RBLENBQUNBLENBQUNBO1FBQ25FQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSx1QkFBdUJBLENBQUNBLEtBQUtBLENBQUNBO1lBQy9DQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxnRkFBZ0ZBLENBQUNBLENBQUNBO0lBQ3BHQSxDQUFDQTs7SUFFREYsOENBQUFBLFVBQXdCQSxJQUFXQTtRQUVsQ0csT0FBT0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNyQ0EsQ0FBQ0E7SUFDRkgsd0JBQUNBO0FBQURBLENBQUNBLEVBaEk4QixlQUFlLEVBZ0k3Qzs7QUFFRCxpQ0FBMEIsQ0FBQSIsImZpbGUiOiJ0ZXh0dXJlcy9JbWFnZUN1YmVUZXh0dXJlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5pbXBvcnQgQ3ViZVRleHR1cmVCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0N1YmVUZXh0dXJlQmFzZVwiKTtcbmltcG9ydCBUZXh0dXJlVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9UZXh0dXJlVXRpbHNcIik7XG5cbmNsYXNzIEltYWdlQ3ViZVRleHR1cmUgZXh0ZW5kcyBDdWJlVGV4dHVyZUJhc2Vcbntcblx0cHJpdmF0ZSBfaHRtbEltYWdlRWxlbWVudHM6QXJyYXk8SFRNTEltYWdlRWxlbWVudD4gPSBuZXcgQXJyYXk8SFRNTEltYWdlRWxlbWVudD4oNik7XG5cblx0LyoqXG5cdCAqIFRoZSB0ZXh0dXJlIG9uIHRoZSBjdWJlJ3MgcmlnaHQgZmFjZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcG9zaXRpdmVYKCk6SFRNTEltYWdlRWxlbWVudFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2h0bWxJbWFnZUVsZW1lbnRzWzBdO1xuXHR9XG5cblx0cHVibGljIHNldCBwb3NpdGl2ZVgodmFsdWU6SFRNTEltYWdlRWxlbWVudClcblx0e1xuXHRcdHRoaXMuX3Rlc3RTaXplKHZhbHVlKTtcblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XG5cdFx0dGhpcy5fcFNldFNpemUodmFsdWUud2lkdGgpO1xuXHRcdHRoaXMuX2h0bWxJbWFnZUVsZW1lbnRzWzBdID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRleHR1cmUgb24gdGhlIGN1YmUncyBsZWZ0IGZhY2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG5lZ2F0aXZlWCgpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1sxXTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbmVnYXRpdmVYKHZhbHVlOkhUTUxJbWFnZUVsZW1lbnQpXG5cdHtcblx0XHR0aGlzLl90ZXN0U2l6ZSh2YWx1ZSk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXHRcdHRoaXMuX3BTZXRTaXplKHZhbHVlLndpZHRoKTtcblx0XHR0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1sxXSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0ZXh0dXJlIG9uIHRoZSBjdWJlJ3MgdG9wIGZhY2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBvc2l0aXZlWSgpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1syXTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcG9zaXRpdmVZKHZhbHVlOkhUTUxJbWFnZUVsZW1lbnQpXG5cdHtcblx0XHR0aGlzLl90ZXN0U2l6ZSh2YWx1ZSk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXHRcdHRoaXMuX3BTZXRTaXplKHZhbHVlLndpZHRoKTtcblx0XHR0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1syXSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0ZXh0dXJlIG9uIHRoZSBjdWJlJ3MgYm90dG9tIGZhY2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG5lZ2F0aXZlWSgpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1szXTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbmVnYXRpdmVZKHZhbHVlOkhUTUxJbWFnZUVsZW1lbnQpXG5cdHtcblx0XHR0aGlzLl90ZXN0U2l6ZSh2YWx1ZSk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXHRcdHRoaXMuX3BTZXRTaXplKHZhbHVlLndpZHRoKTtcblx0XHR0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1szXSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0ZXh0dXJlIG9uIHRoZSBjdWJlJ3MgZmFyIGZhY2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBvc2l0aXZlWigpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1s0XTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcG9zaXRpdmVaKHZhbHVlOkhUTUxJbWFnZUVsZW1lbnQpXG5cdHtcblx0XHR0aGlzLl90ZXN0U2l6ZSh2YWx1ZSk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xuXHRcdHRoaXMuX3BTZXRTaXplKHZhbHVlLndpZHRoKTtcblx0XHR0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1s0XSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0ZXh0dXJlIG9uIHRoZSBjdWJlJ3MgbmVhciBmYWNlLlxuXHQgKi9cblx0cHVibGljIGdldCBuZWdhdGl2ZVooKTpIVE1MSW1hZ2VFbGVtZW50XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faHRtbEltYWdlRWxlbWVudHNbNV07XG5cdH1cblxuXHRwdWJsaWMgc2V0IG5lZ2F0aXZlWih2YWx1ZTpIVE1MSW1hZ2VFbGVtZW50KVxuXHR7XG5cdFx0dGhpcy5fdGVzdFNpemUodmFsdWUpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblx0XHR0aGlzLl9wU2V0U2l6ZSh2YWx1ZS53aWR0aCk7XG5cdFx0dGhpcy5faHRtbEltYWdlRWxlbWVudHNbNV0gPSB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHBvc1g6SFRNTEltYWdlRWxlbWVudCwgbmVnWDpIVE1MSW1hZ2VFbGVtZW50LCBwb3NZOkhUTUxJbWFnZUVsZW1lbnQsIG5lZ1k6SFRNTEltYWdlRWxlbWVudCwgcG9zWjpIVE1MSW1hZ2VFbGVtZW50LCBuZWdaOkhUTUxJbWFnZUVsZW1lbnQsIGdlbmVyYXRlTWlwbWFwczpib29sZWFuID0gZmFsc2UpXG5cdHtcblx0XHRzdXBlcihnZW5lcmF0ZU1pcG1hcHMpO1xuXG5cdFx0dGhpcy5fdGVzdFNpemUodGhpcy5faHRtbEltYWdlRWxlbWVudHNbMF0gPSBwb3NYKTtcblx0XHR0aGlzLl90ZXN0U2l6ZSh0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1sxXSA9IG5lZ1gpO1xuXHRcdHRoaXMuX3Rlc3RTaXplKHRoaXMuX2h0bWxJbWFnZUVsZW1lbnRzWzJdID0gcG9zWSk7XG5cdFx0dGhpcy5fdGVzdFNpemUodGhpcy5faHRtbEltYWdlRWxlbWVudHNbM10gPSBuZWdZKTtcblx0XHR0aGlzLl90ZXN0U2l6ZSh0aGlzLl9odG1sSW1hZ2VFbGVtZW50c1s0XSA9IHBvc1opO1xuXHRcdHRoaXMuX3Rlc3RTaXplKHRoaXMuX2h0bWxJbWFnZUVsZW1lbnRzWzVdID0gbmVnWik7XG5cblx0XHR0aGlzLmludmFsaWRhdGVDb250ZW50KCk7XG5cblx0XHR0aGlzLl9wU2V0U2l6ZShwb3NYLndpZHRoKTtcblx0fVxuXG5cdHByaXZhdGUgX3Rlc3RTaXplKHZhbHVlOkhUTUxJbWFnZUVsZW1lbnQpXG5cdHtcblx0XHRpZiAodmFsdWUud2lkdGggIT0gdmFsdWUuaGVpZ2h0KVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQml0bWFwRGF0YSBzaG91bGQgaGF2ZSBlcXVhbCB3aWR0aCBhbmQgaGVpZ2h0IVwiKTtcblx0XHRpZiAoIVRleHR1cmVVdGlscy5pc0hUTUxJbWFnZUVsZW1lbnRWYWxpZCh2YWx1ZSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJpdG1hcERhdGE6IFdpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBwb3dlciBvZiAyIGFuZCBjYW5ub3QgZXhjZWVkIDIwNDhcIik7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRUZXh0dXJlRGF0YShzaWRlOm51bWJlcik6SFRNTEltYWdlRWxlbWVudFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2h0bWxJbWFnZUVsZW1lbnRzW3NpZGVdO1xuXHR9XG59XG5cbmV4cG9ydCA9IEltYWdlQ3ViZVRleHR1cmU7Il19