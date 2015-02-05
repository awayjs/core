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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9yZW5kZXJ0ZXh0dXJlLnRzIl0sIm5hbWVzIjpbIlJlbmRlclRleHR1cmUiLCJSZW5kZXJUZXh0dXJlLmNvbnN0cnVjdG9yIiwiUmVuZGVyVGV4dHVyZS53aWR0aCIsIlJlbmRlclRleHR1cmUuaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQU8sYUFBYSxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDM0UsSUFBTyxZQUFZLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUd2RSxJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQXNCQTtJQTZDeENBLFNBN0NLQSxhQUFhQSxDQTZDTkEsS0FBWUEsRUFBRUEsTUFBYUE7UUFFdENDLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUE1Q0RELHNCQUFXQSxnQ0FBS0E7UUFKaEJBOzs7V0FHR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBO2FBRURGLFVBQWlCQSxLQUFZQTtZQUU1QkUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ3pCQSxNQUFNQSxDQUFDQTtZQUVSQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN6Q0EsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0EsMEVBQTBFQSxDQUFDQSxDQUFDQTtZQUU3RkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtZQUV6QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDdENBLENBQUNBOzs7T0FiQUY7SUFtQkRBLHNCQUFXQSxpQ0FBTUE7UUFKakJBOzs7V0FHR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLENBQUNBO2FBRURILFVBQWtCQSxLQUFZQTtZQUU3QkcsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7Z0JBQzFCQSxNQUFNQSxDQUFDQTtZQUVSQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN6Q0EsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0EsMEVBQTBFQSxDQUFDQSxDQUFDQTtZQUU3RkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtZQUN6QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDckNBLENBQUNBOzs7T0FaQUg7SUFvQkZBLG9CQUFDQTtBQUFEQSxDQW5EQSxBQW1EQ0EsRUFuRDJCLGFBQWEsRUFtRHhDO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6InRleHR1cmVzL1JlbmRlclRleHR1cmUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IEVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5pbXBvcnQgVGV4dHVyZTJEQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xuaW1wb3J0IFRleHR1cmVVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1RleHR1cmVVdGlsc1wiKTtcblxuXG5jbGFzcyBSZW5kZXJUZXh0dXJlIGV4dGVuZHMgVGV4dHVyZTJEQmFzZVxue1xuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wV2lkdGg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9wV2lkdGgpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAoIVRleHR1cmVVdGlscy5pc0RpbWVuc2lvblZhbGlkKHZhbHVlKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2l6ZTogV2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIHBvd2VyIG9mIDIgYW5kIGNhbm5vdCBleGNlZWQgMjA0OFwiKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblxuXHRcdHRoaXMuX3BTZXRTaXplKHZhbHVlLCB0aGlzLl9wSGVpZ2h0KTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIHNldCBoZWlnaHQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX3BIZWlnaHQpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAoIVRleHR1cmVVdGlscy5pc0RpbWVuc2lvblZhbGlkKHZhbHVlKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2l6ZTogV2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIHBvd2VyIG9mIDIgYW5kIGNhbm5vdCBleGNlZWQgMjA0OFwiKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZUNvbnRlbnQoKTtcblx0XHR0aGlzLl9wU2V0U2l6ZSh0aGlzLl9wV2lkdGgsIHZhbHVlKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcilcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wU2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcblx0fVxufVxuXG5leHBvcnQgPSBSZW5kZXJUZXh0dXJlOyJdfQ==