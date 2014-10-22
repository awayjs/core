var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var URLLoaderDataFormat = require("awayjs-core/lib/core/net/URLLoaderDataFormat");
var Billboard = require("awayjs-core/lib/entities/Billboard");
var CSSMaterialBase = require("awayjs-core/lib/materials/CSSMaterialBase");
var ParserBase = require("awayjs-core/lib/parsers/ParserBase");
var ParserUtils = require("awayjs-core/lib/parsers/ParserUtils");
var ImageTexture = require("awayjs-core/lib/textures/ImageTexture");

var ByteArray = require("awayjs-core/lib/utils/ByteArray");
var TextureUtils = require("awayjs-core/lib/utils/TextureUtils");

/**
* Texture2DParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
* a loader object, it wraps it in a BitmapDataResource so resource management can happen consistently without
* exception cases.
*/
var Texture2DParser = (function (_super) {
    __extends(Texture2DParser, _super);
    /**
    * Creates a new Texture2DParser object.
    * @param uri The url or id of the data or file to be parsed.
    * @param extra The holder for extra contextual data that the parser might need.
    */
    function Texture2DParser() {
        _super.call(this, URLLoaderDataFormat.BLOB);
    }
    /**
    * Indicates whether or not a given file extension is supported by the parser.
    * @param extension The file extension of a potential file to be parsed.
    * @return Whether or not the given file type is supported.
    */
    Texture2DParser.supportsType = function (extension) {
        extension = extension.toLowerCase();
        return extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "gif";
    };

    /**
    * Tests whether a data block can be parsed by the parser.
    * @param data The data block to potentially be parsed.
    * @return Whether or not the given data is supported.
    */
    Texture2DParser.supportsData = function (data) {
        if (data instanceof HTMLImageElement)
            return true;

        if (!(data instanceof ByteArray))
            return false;

        var ba = data;
        ba.position = 0;

        if (ba.readUnsignedShort() == 0xffd8)
            return true;

        ba.position = 0;
        if (ba.readShort() == 0x424D)
            return true;

        ba.position = 1;
        if (ba.readUTFBytes(3) == 'PNG')
            return true;

        ba.position = 0;
        if (ba.readUTFBytes(3) == 'GIF' && ba.readShort() == 0x3839 && ba.readByte() == 0x61)
            return true;

        ba.position = 0;
        if (ba.readUTFBytes(3) == 'ATF')
            return true;

        return false;
    };

    /**
    * @inheritDoc
    */
    Texture2DParser.prototype._pProceedParsing = function () {
        var _this = this;
        var asset;
        var sizeError = false;

        if (this._loadingImage) {
            return ParserBase.MORE_TO_PARSE;
        } else if (this._htmlImageElement) {
            if (TextureUtils.isHTMLImageElementValid(this._htmlImageElement)) {
                asset = new ImageTexture(this._htmlImageElement);
                this._pFinalizeAsset(asset, this._iFileName);
            }
        } else if (this.data instanceof HTMLImageElement) {
            if (TextureUtils.isHTMLImageElementValid(this.data)) {
                asset = new ImageTexture(this.data);
                this._pFinalizeAsset(asset, this._iFileName);
            } else {
                sizeError = true;
            }
        } else if (this.data instanceof ByteArray) {
            var ba = this.data;
            ba.position = 0;
            var htmlImageElement = ParserUtils.byteArrayToImage(this.data);

            if (TextureUtils.isHTMLImageElementValid(htmlImageElement)) {
                asset = new ImageTexture(htmlImageElement);
                this._pFinalizeAsset(asset, this._iFileName);
            } else {
                sizeError = true;
            }
        } else if (this.data instanceof ArrayBuffer) {
            this._htmlImageElement = ParserUtils.arrayBufferToImage(this.data);

            asset = new ImageTexture(this._htmlImageElement);
            this._pFinalizeAsset(asset, this._iFileName);
        } else if (this.data instanceof Blob) {
            this._htmlImageElement = ParserUtils.blobToImage(this.data);

            this._htmlImageElement.onload = function (event) {
                return _this.onLoadComplete(event);
            };
            this._loadingImage = true;

            return ParserBase.MORE_TO_PARSE;
        }

        if (sizeError == true) {
            //				asset = new BitmapTexture(DefaultMaterialManager.createCheckeredBitmapData(), false);
            //				this._pFinalizeAsset(<IAsset> asset, this._iFileName);
            //				this.dispatchEvent(new away.events.AssetEvent(away.events.AssetEvent.TEXTURE_SIZE_ERROR, <IAsset> asset));
        }

        this._pContent = new Billboard(new CSSMaterialBase(asset));

        return ParserBase.PARSING_DONE;
    };

    Texture2DParser.prototype.onLoadComplete = function (event) {
        this._loadingImage = false;
    };
    return Texture2DParser;
})(ParserBase);

module.exports = Texture2DParser;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlcnMvVGV4dHVyZTJEUGFyc2VyLnRzIl0sIm5hbWVzIjpbIlRleHR1cmUyRFBhcnNlciIsIlRleHR1cmUyRFBhcnNlci5jb25zdHJ1Y3RvciIsIlRleHR1cmUyRFBhcnNlci5zdXBwb3J0c1R5cGUiLCJUZXh0dXJlMkRQYXJzZXIuc3VwcG9ydHNEYXRhIiwiVGV4dHVyZTJEUGFyc2VyLl9wUHJvY2VlZFBhcnNpbmciLCJUZXh0dXJlMkRQYXJzZXIub25Mb2FkQ29tcGxldGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlGQUNzRjtBQUN0Riw2REFBb0U7QUFDcEUsMEVBQWdGO0FBQ2hGLDhEQUFxRTtBQUNyRSxnRUFBdUU7QUFDdkUsbUVBQTBFOztBQUUxRSwwREFBaUU7QUFDakUsZ0VBQXVFOztBQUV2RTs7OztFQUlHO0FBQ0g7SUFBOEJBLGtDQUFVQTtJQVl2Q0E7Ozs7TUFER0E7SUFDSEE7UUFFQ0MsV0FBTUEsT0FBQUEsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7SUFPREQ7Ozs7TUFER0E7bUNBQ0hBLFVBQTJCQSxTQUFnQkE7UUFHMUNFLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1FBQ25DQSxPQUFPQSxTQUFTQSxJQUFJQSxLQUFLQSxJQUFJQSxTQUFTQSxJQUFJQSxNQUFNQSxJQUFJQSxTQUFTQSxJQUFJQSxLQUFLQSxJQUFJQSxTQUFTQSxJQUFJQSxLQUFLQTtJQUU3RkEsQ0FBQ0E7O0lBT0RGOzs7O01BREdBO21DQUNIQSxVQUEyQkEsSUFBUUE7UUFHbENHLElBQUlBLElBQUlBLFlBQWFBLGdCQUFnQkE7WUFDcENBLE9BQU9BLElBQUlBLENBQUNBOztRQUViQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxTQUFTQSxDQUFDQTtZQUMvQkEsT0FBT0EsS0FBS0EsQ0FBQ0E7O1FBRWRBLElBQUlBLEVBQUVBLEdBQXlCQSxJQUFJQTtRQUNuQ0EsRUFBRUEsQ0FBQ0EsUUFB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SUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsS0FBS0E7SUFDM0JBLENBQUNBO0lBQ0ZMLHVCQUFDQTtBQUFEQSxDQUFDQSxFQTlJNkIsVUFBVSxFQThJdkM7O0FBRUQsZ0NBQXlCLENBQUEiLCJmaWxlIjoicGFyc2Vycy9UZXh0dXJlMkRQYXJzZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IFVSTExvYWRlckRhdGFGb3JtYXRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbmV0L1VSTExvYWRlckRhdGFGb3JtYXRcIik7XG5pbXBvcnQgQmlsbGJvYXJkXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvQmlsbGJvYXJkXCIpO1xuaW1wb3J0IENTU01hdGVyaWFsQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9tYXRlcmlhbHMvQ1NTTWF0ZXJpYWxCYXNlXCIpO1xuaW1wb3J0IFBhcnNlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIik7XG5pbXBvcnQgUGFyc2VyVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlclV0aWxzXCIpO1xuaW1wb3J0IEltYWdlVGV4dHVyZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0ltYWdlVGV4dHVyZVwiKTtcbmltcG9ydCBUZXh0dXJlMkRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL1RleHR1cmUyREJhc2VcIik7XG5pbXBvcnQgQnl0ZUFycmF5XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvQnl0ZUFycmF5XCIpO1xuaW1wb3J0IFRleHR1cmVVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1RleHR1cmVVdGlsc1wiKTtcblxuLyoqXG4gKiBUZXh0dXJlMkRQYXJzZXIgcHJvdmlkZXMgYSBcInBhcnNlclwiIGZvciBuYXRpdmVseSBzdXBwb3J0ZWQgaW1hZ2UgdHlwZXMgKGpwZywgcG5nKS4gV2hpbGUgaXQgc2ltcGx5IGxvYWRzIGJ5dGVzIGludG9cbiAqIGEgbG9hZGVyIG9iamVjdCwgaXQgd3JhcHMgaXQgaW4gYSBCaXRtYXBEYXRhUmVzb3VyY2Ugc28gcmVzb3VyY2UgbWFuYWdlbWVudCBjYW4gaGFwcGVuIGNvbnNpc3RlbnRseSB3aXRob3V0XG4gKiBleGNlcHRpb24gY2FzZXMuXG4gKi9cbmNsYXNzIFRleHR1cmUyRFBhcnNlciBleHRlbmRzIFBhcnNlckJhc2Vcbntcblx0cHJpdmF0ZSBfc3RhcnRlZFBhcnNpbmc6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfZG9uZVBhcnNpbmc6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbG9hZGluZ0ltYWdlOmJvb2xlYW47XG5cdHByaXZhdGUgX2h0bWxJbWFnZUVsZW1lbnQ6SFRNTEltYWdlRWxlbWVudDtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBUZXh0dXJlMkRQYXJzZXIgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdXJpIFRoZSB1cmwgb3IgaWQgb2YgdGhlIGRhdGEgb3IgZmlsZSB0byBiZSBwYXJzZWQuXG5cdCAqIEBwYXJhbSBleHRyYSBUaGUgaG9sZGVyIGZvciBleHRyYSBjb250ZXh0dWFsIGRhdGEgdGhhdCB0aGUgcGFyc2VyIG1pZ2h0IG5lZWQuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcihVUkxMb2FkZXJEYXRhRm9ybWF0LkJMT0IpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhIGdpdmVuIGZpbGUgZXh0ZW5zaW9uIGlzIHN1cHBvcnRlZCBieSB0aGUgcGFyc2VyLlxuXHQgKiBAcGFyYW0gZXh0ZW5zaW9uIFRoZSBmaWxlIGV4dGVuc2lvbiBvZiBhIHBvdGVudGlhbCBmaWxlIHRvIGJlIHBhcnNlZC5cblx0ICogQHJldHVybiBXaGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gZmlsZSB0eXBlIGlzIHN1cHBvcnRlZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgc3VwcG9ydHNUeXBlKGV4dGVuc2lvbjpzdHJpbmcpOmJvb2xlYW5cblx0e1xuXG5cdFx0ZXh0ZW5zaW9uID0gZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIGV4dGVuc2lvbiA9PSBcImpwZ1wiIHx8IGV4dGVuc2lvbiA9PSBcImpwZWdcIiB8fCBleHRlbnNpb24gPT0gXCJwbmdcIiB8fCBleHRlbnNpb24gPT0gXCJnaWZcIjsvL3x8IGV4dGVuc2lvbiA9PSBcImJtcFwiOy8vfHwgZXh0ZW5zaW9uID09IFwiYXRmXCI7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBUZXN0cyB3aGV0aGVyIGEgZGF0YSBibG9jayBjYW4gYmUgcGFyc2VkIGJ5IHRoZSBwYXJzZXIuXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIGJsb2NrIHRvIHBvdGVudGlhbGx5IGJlIHBhcnNlZC5cblx0ICogQHJldHVybiBXaGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gZGF0YSBpcyBzdXBwb3J0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHN1cHBvcnRzRGF0YShkYXRhOmFueSk6Ym9vbGVhblxuXHR7XG5cblx0XHRpZiAoZGF0YSAgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRpZiAoIShkYXRhIGluc3RhbmNlb2YgQnl0ZUFycmF5KSlcblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdHZhciBiYTpCeXRlQXJyYXkgPSA8Qnl0ZUFycmF5PiBkYXRhO1xuXHRcdGJhLnBvc2l0aW9uID0gMDtcblxuXHRcdGlmIChiYS5yZWFkVW5zaWduZWRTaG9ydCgpID09IDB4ZmZkOClcblx0XHRcdHJldHVybiB0cnVlOyAvLyBKUEVHLCBtYXliZSBjaGVjayBmb3IgXCJKRklGXCIgYXMgd2VsbD9cblxuXHRcdGJhLnBvc2l0aW9uID0gMDtcblx0XHRpZiAoYmEucmVhZFNob3J0KCkgPT0gMHg0MjREKVxuXHRcdFx0cmV0dXJuIHRydWU7IC8vIEJNUFxuXG5cdFx0YmEucG9zaXRpb24gPSAxO1xuXHRcdGlmIChiYS5yZWFkVVRGQnl0ZXMoMykgPT0gJ1BORycpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdGJhLnBvc2l0aW9uID0gMDtcblx0XHRpZiAoYmEucmVhZFVURkJ5dGVzKDMpID09ICdHSUYnICYmIGJhLnJlYWRTaG9ydCgpID09IDB4MzgzOSAmJiBiYS5yZWFkQnl0ZSgpID09IDB4NjEpXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdGJhLnBvc2l0aW9uID0gMDtcblx0XHRpZiAoYmEucmVhZFVURkJ5dGVzKDMpID09ICdBVEYnKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIF9wUHJvY2VlZFBhcnNpbmcoKTpib29sZWFuXG5cdHtcblxuXHRcdHZhciBhc3NldDpUZXh0dXJlMkRCYXNlO1xuXHRcdHZhciBzaXplRXJyb3I6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdFx0aWYgKHRoaXMuX2xvYWRpbmdJbWFnZSkge1xuXHRcdFx0cmV0dXJuIFBhcnNlckJhc2UuTU9SRV9UT19QQVJTRTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuX2h0bWxJbWFnZUVsZW1lbnQpIHtcblx0XHRcdGlmIChUZXh0dXJlVXRpbHMuaXNIVE1MSW1hZ2VFbGVtZW50VmFsaWQodGhpcy5faHRtbEltYWdlRWxlbWVudCkpIHtcblx0XHRcdFx0YXNzZXQgPSBuZXcgSW1hZ2VUZXh0dXJlKHRoaXMuX2h0bWxJbWFnZUVsZW1lbnQpO1xuXHRcdFx0XHR0aGlzLl9wRmluYWxpemVBc3NldCg8SUFzc2V0PiBhc3NldCwgdGhpcy5faUZpbGVOYW1lKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHRoaXMuZGF0YSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHsvLyBQYXJzZSBIVE1MSW1hZ2VFbGVtZW50XG5cblx0XHRcdGlmIChUZXh0dXJlVXRpbHMuaXNIVE1MSW1hZ2VFbGVtZW50VmFsaWQoPEhUTUxJbWFnZUVsZW1lbnQ+IHRoaXMuZGF0YSkpIHtcblx0XHRcdFx0YXNzZXQgPSBuZXcgSW1hZ2VUZXh0dXJlKDxIVE1MSW1hZ2VFbGVtZW50PiB0aGlzLmRhdGEpO1xuXHRcdFx0XHR0aGlzLl9wRmluYWxpemVBc3NldCg8SUFzc2V0PiBhc3NldCwgdGhpcy5faUZpbGVOYW1lKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNpemVFcnJvciA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKHRoaXMuZGF0YSBpbnN0YW5jZW9mIEJ5dGVBcnJheSkgeyAvLyBQYXJzZSBhIEJ5dGVBcnJheVxuXG5cdFx0XHR2YXIgYmE6Qnl0ZUFycmF5ID0gdGhpcy5kYXRhO1xuXHRcdFx0YmEucG9zaXRpb24gPSAwO1xuXHRcdFx0dmFyIGh0bWxJbWFnZUVsZW1lbnQ6SFRNTEltYWdlRWxlbWVudCA9IFBhcnNlclV0aWxzLmJ5dGVBcnJheVRvSW1hZ2UodGhpcy5kYXRhKTtcblxuXHRcdFx0aWYgKFRleHR1cmVVdGlscy5pc0hUTUxJbWFnZUVsZW1lbnRWYWxpZChodG1sSW1hZ2VFbGVtZW50KSkge1xuXHRcdFx0XHRhc3NldCA9IG5ldyBJbWFnZVRleHR1cmUoaHRtbEltYWdlRWxlbWVudCk7XG5cdFx0XHRcdHRoaXMuX3BGaW5hbGl6ZUFzc2V0KDxJQXNzZXQ+IGFzc2V0LCB0aGlzLl9pRmlsZU5hbWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2l6ZUVycm9yID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAodGhpcy5kYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHsvLyBQYXJzZSBhbiBBcnJheUJ1ZmZlclxuXG5cdFx0XHR0aGlzLl9odG1sSW1hZ2VFbGVtZW50ID0gUGFyc2VyVXRpbHMuYXJyYXlCdWZmZXJUb0ltYWdlKHRoaXMuZGF0YSk7XG5cblx0XHRcdGFzc2V0ID0gbmV3IEltYWdlVGV4dHVyZSh0aGlzLl9odG1sSW1hZ2VFbGVtZW50KTtcblx0XHRcdHRoaXMuX3BGaW5hbGl6ZUFzc2V0KDxJQXNzZXQ+IGFzc2V0LCB0aGlzLl9pRmlsZU5hbWUpO1xuXG5cdFx0fSBlbHNlIGlmICh0aGlzLmRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7IC8vIFBhcnNlIGEgQmxvYlxuXG5cdFx0XHR0aGlzLl9odG1sSW1hZ2VFbGVtZW50ID0gUGFyc2VyVXRpbHMuYmxvYlRvSW1hZ2UodGhpcy5kYXRhKTtcblxuXHRcdFx0dGhpcy5faHRtbEltYWdlRWxlbWVudC5vbmxvYWQgPSAoZXZlbnQpID0+IHRoaXMub25Mb2FkQ29tcGxldGUoZXZlbnQpO1xuXHRcdFx0dGhpcy5fbG9hZGluZ0ltYWdlID0gdHJ1ZTtcblxuXHRcdFx0cmV0dXJuIFBhcnNlckJhc2UuTU9SRV9UT19QQVJTRTtcblx0XHR9XG5cblx0XHRpZiAoc2l6ZUVycm9yID09IHRydWUpIC8vIEdlbmVyYXRlIG5ldyBDaGVja2VyYm9hcmQgdGV4dHVyZSBtYXRlcmlhbFxuXHRcdHtcbi8vXHRcdFx0XHRhc3NldCA9IG5ldyBCaXRtYXBUZXh0dXJlKERlZmF1bHRNYXRlcmlhbE1hbmFnZXIuY3JlYXRlQ2hlY2tlcmVkQml0bWFwRGF0YSgpLCBmYWxzZSk7XG4vL1x0XHRcdFx0dGhpcy5fcEZpbmFsaXplQXNzZXQoPElBc3NldD4gYXNzZXQsIHRoaXMuX2lGaWxlTmFtZSk7XG4vL1x0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBhd2F5LmV2ZW50cy5Bc3NldEV2ZW50KGF3YXkuZXZlbnRzLkFzc2V0RXZlbnQuVEVYVFVSRV9TSVpFX0VSUk9SLCA8SUFzc2V0PiBhc3NldCkpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BDb250ZW50ID0gbmV3IEJpbGxib2FyZChuZXcgQ1NTTWF0ZXJpYWxCYXNlKGFzc2V0KSk7XG5cblx0XHRyZXR1cm4gUGFyc2VyQmFzZS5QQVJTSU5HX0RPTkU7XG5cblx0fVxuXG5cdHB1YmxpYyBvbkxvYWRDb21wbGV0ZShldmVudClcblx0e1xuXHRcdHRoaXMuX2xvYWRpbmdJbWFnZSA9IGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCA9IFRleHR1cmUyRFBhcnNlcjsiXX0=