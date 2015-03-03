var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
var TextureUtils = require("awayjs-core/lib/utils/TextureUtils");
var RenderTexture = (function (_super) {
    __extends(RenderTexture, _super);
    function RenderTexture(width, height) {
        _super.call(this);
        this._pSetSize(width, height);
    }
    Object.defineProperty(RenderTexture.prototype, "width", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._pWidth;
        },
        set: function (value) {
            if (value == this._pWidth)
                return;
            if (!TextureUtils.isDimensionValid(value))
                throw new Error("Invalid size: Width and height must be power of 2 and cannot exceed 2048");
            this.invalidateContent();
            this._pSetSize(value, this._pHeight);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTexture.prototype, "height", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._pHeight;
        },
        set: function (value) {
            if (value == this._pHeight)
                return;
            if (!TextureUtils.isDimensionValid(value))
                throw new Error("Invalid size: Width and height must be power of 2 and cannot exceed 2048");
            this.invalidateContent();
            this._pSetSize(this._pWidth, value);
        },
        enumerable: true,
        configurable: true
    });
    return RenderTexture;
})(Texture2DBase);
module.exports = RenderTexture;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9SZW5kZXJUZXh0dXJlLnRzIl0sIm5hbWVzIjpbIlJlbmRlclRleHR1cmUiLCJSZW5kZXJUZXh0dXJlLmNvbnN0cnVjdG9yIiwiUmVuZGVyVGV4dHVyZS53aWR0aCIsIlJlbmRlclRleHR1cmUuaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQU8sYUFBYSxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDM0UsSUFBTyxZQUFZLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUd2RSxJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQXNCQTtJQTZDeENBLFNBN0NLQSxhQUFhQSxDQTZDTkEsS0FBWUEsRUFBRUEsTUFBYUE7UUFFdENDLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUE1Q0RELHNCQUFXQSxnQ0FBS0E7UUFKaEJBOzs7V0FHR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBO2FBRURGLFVBQWlCQSxLQUFZQTtZQUU1QkUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ3pCQSxNQUFNQSxDQUFDQTtZQUVSQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN6Q0EsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0EsMEVBQTBFQSxDQUFDQSxDQUFDQTtZQUU3RkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtZQUV6QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDdENBLENBQUNBOzs7T0FiQUY7SUFtQkRBLHNCQUFXQSxpQ0FBTUE7UUFKakJBOzs7V0FHR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLENBQUNBO2FBRURILFVBQWtCQSxLQUFZQTtZQUU3QkcsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7Z0JBQzFCQSxNQUFNQSxDQUFDQTtZQUVSQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN6Q0EsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0EsMEVBQTBFQSxDQUFDQSxDQUFDQTtZQUU3RkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtZQUN6QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDckNBLENBQUNBOzs7T0FaQUg7SUFvQkZBLG9CQUFDQTtBQUFEQSxDQW5EQSxBQW1EQ0EsRUFuRDJCLGFBQWEsRUFtRHhDO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6InRleHR1cmVzL1JlbmRlclRleHR1cmUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XHJcbmltcG9ydCBUZXh0dXJlMkRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL1RleHR1cmUyREJhc2VcIik7XHJcbmltcG9ydCBUZXh0dXJlVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9UZXh0dXJlVXRpbHNcIik7XHJcblxyXG5cclxuY2xhc3MgUmVuZGVyVGV4dHVyZSBleHRlbmRzIFRleHR1cmUyREJhc2Vcclxue1xyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9wV2lkdGgpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRpZiAoIVRleHR1cmVVdGlscy5pc0RpbWVuc2lvblZhbGlkKHZhbHVlKSlcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaXplOiBXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgcG93ZXIgb2YgMiBhbmQgY2Fubm90IGV4Y2VlZCAyMDQ4XCIpO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcclxuXHJcblx0XHR0aGlzLl9wU2V0U2l6ZSh2YWx1ZSwgdGhpcy5fcEhlaWdodCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEhlaWdodDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fcEhlaWdodClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGlmICghVGV4dHVyZVV0aWxzLmlzRGltZW5zaW9uVmFsaWQodmFsdWUpKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNpemU6IFdpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBwb3dlciBvZiAyIGFuZCBjYW5ub3QgZXhjZWVkIDIwNDhcIik7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlQ29udGVudCgpO1xyXG5cdFx0dGhpcy5fcFNldFNpemUodGhpcy5fcFdpZHRoLCB2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3Rvcih3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLl9wU2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFJlbmRlclRleHR1cmU7Il19