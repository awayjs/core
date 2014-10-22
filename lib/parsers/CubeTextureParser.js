var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var URLLoaderDataFormat = require("awayjs-core/lib/core/net/URLLoaderDataFormat");
var URLRequest = require("awayjs-core/lib/core/net/URLRequest");
var ParserBase = require("awayjs-core/lib/parsers/ParserBase");

var ImageCubeTexture = require("awayjs-core/lib/textures/ImageCubeTexture");

/**
* CubeTextureParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
* a loader object, it wraps it in a BitmapDataResource so resource management can happen consistently without
* exception cases.
*/
var CubeTextureParser = (function (_super) {
    __extends(CubeTextureParser, _super);
    /**
    * Creates a new CubeTextureParser object.
    * @param uri The url or id of the data or file to be parsed.
    * @param extra The holder for extra contextual data that the parser might need.
    */
    function CubeTextureParser() {
        _super.call(this, URLLoaderDataFormat.TEXT);
    }
    /**
    * Indicates whether or not a given file extension is supported by the parser.
    * @param extension The file extension of a potential file to be parsed.
    * @return Whether or not the given file type is supported.
    */
    CubeTextureParser.supportsType = function (extension) {
        extension = extension.toLowerCase();
        return extension == "cube";
    };

    /**
    * Tests whether a data block can be parsed by the parser.
    * @param data The data block to potentially be parsed.
    * @return Whether or not the given data is supported.
    */
    CubeTextureParser.supportsData = function (data) {
        try  {
            var obj = JSON.parse(data);

            if (obj) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }

        return false;
    };

    /**
    * @inheritDoc
    */
    CubeTextureParser.prototype._iResolveDependency = function (resourceDependency) {
    };

    /**
    * @inheritDoc
    */
    CubeTextureParser.prototype._iResolveDependencyFailure = function (resourceDependency) {
    };

    /**
    * @inheritDoc
    */
    CubeTextureParser.prototype._pProceedParsing = function () {
        if (this._imgDependencyDictionary != null) {
            var asset = new ImageCubeTexture(this._getHTMLImageElement(CubeTextureParser.posX), this._getHTMLImageElement(CubeTextureParser.negX), this._getHTMLImageElement(CubeTextureParser.posY), this._getHTMLImageElement(CubeTextureParser.negY), this._getHTMLImageElement(CubeTextureParser.posZ), this._getHTMLImageElement(CubeTextureParser.negZ));

            //clear dictionary
            this._imgDependencyDictionary = null;

            asset.name = this._iFileName;

            this._pFinalizeAsset(asset, this._iFileName);

            return ParserBase.PARSING_DONE;
        }

        try  {
            var json = JSON.parse(this.data);
            var data = json.data;
            var rec;

            if (data.length != 6)
                this._pDieWithError('CubeTextureParser: Error - cube texture should have exactly 6 images');

            if (json) {
                this._imgDependencyDictionary = new Object();

                for (var c = 0; c < data.length; c++) {
                    rec = data[c];
                    this._imgDependencyDictionary[rec.id] = this._pAddDependency(rec.id, new URLRequest(rec.image.toString()));
                }

                if (!this._validateCubeData()) {
                    this._pDieWithError("CubeTextureParser: JSON data error - cubes require id of:   \n" + CubeTextureParser.posX + ', ' + CubeTextureParser.negX + ',  \n' + CubeTextureParser.posY + ', ' + CubeTextureParser.negY + ',  \n' + CubeTextureParser.posZ + ', ' + CubeTextureParser.negZ);

                    return ParserBase.PARSING_DONE;
                }

                this._pPauseAndRetrieveDependencies();

                return ParserBase.MORE_TO_PARSE;
            }
        } catch (e) {
            this._pDieWithError('CubeTexturePaser Error parsing JSON');
        }

        return ParserBase.PARSING_DONE;
    };

    CubeTextureParser.prototype._validateCubeData = function () {
        return (this._imgDependencyDictionary[CubeTextureParser.posX] != null && this._imgDependencyDictionary[CubeTextureParser.negX] != null && this._imgDependencyDictionary[CubeTextureParser.posY] != null && this._imgDependencyDictionary[CubeTextureParser.negY] != null && this._imgDependencyDictionary[CubeTextureParser.posZ] != null && this._imgDependencyDictionary[CubeTextureParser.negZ] != null);
    };

    CubeTextureParser.prototype._getHTMLImageElement = function (name) {
        var dependency = this._imgDependencyDictionary[name];

        if (dependency) {
            return dependency.assets[0].htmlImageElement;
        }

        return null;
    };
    CubeTextureParser.posX = 'posX';
    CubeTextureParser.negX = 'negX';
    CubeTextureParser.posY = 'posY';
    CubeTextureParser.negY = 'negY';
    CubeTextureParser.posZ = 'posZ';
    CubeTextureParser.negZ = 'negZ';
    return CubeTextureParser;
})(ParserBase);

module.exports = CubeTextureParser;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlcnMvQ3ViZVRleHR1cmVQYXJzZXIudHMiXSwibmFtZXMiOlsiQ3ViZVRleHR1cmVQYXJzZXIiLCJDdWJlVGV4dHVyZVBhcnNlci5jb25zdHJ1Y3RvciIsIkN1YmVUZXh0dXJlUGFyc2VyLnN1cHBvcnRzVHlwZSIsIkN1YmVUZXh0dXJlUGFyc2VyLnN1cHBvcnRzRGF0YSIsIkN1YmVUZXh0dXJlUGFyc2VyLl9pUmVzb2x2ZURlcGVuZGVuY3kiLCJDdWJlVGV4dHVyZVBhcnNlci5faVJlc29sdmVEZXBlbmRlbmN5RmFpbHVyZSIsIkN1YmVUZXh0dXJlUGFyc2VyLl9wUHJvY2VlZFBhcnNpbmciLCJDdWJlVGV4dHVyZVBhcnNlci5fdmFsaWRhdGVDdWJlRGF0YSIsIkN1YmVUZXh0dXJlUGFyc2VyLl9nZXRIVE1MSW1hZ2VFbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRkFDc0Y7QUFDdEYsK0RBQXNFO0FBQ3RFLDhEQUFxRTs7QUFFckUsMkVBQWlGOztBQUdqRjs7OztFQUlHO0FBQ0g7SUFBZ0NBLG9DQUFVQTtJQWdCekNBOzs7O01BREdBO0lBQ0hBO1FBRUNDLFdBQU1BLE9BQUFBLG1CQUFtQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDaENBLENBQUNBO0lBUUREOzs7O01BRkdBO3FDQUVIQSxVQUEyQkEsU0FBZ0JBO1FBRTFDRSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUNuQ0EsT0FBT0EsU0FBU0EsSUFBSUEsTUFBTUE7SUFDM0JBLENBQUNBOztJQU9ERjs7OztNQURHQTtxQ0FDSEEsVUFBMkJBLElBQVFBO1FBRWxDRyxJQUFJQTtZQUNIQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQTs7WUFFMUJBLElBQUlBLEdBQUdBLENBQUVBO2dCQUNSQSxPQUFPQSxJQUFJQTthQUNYQTtZQUNEQSxPQUFPQSxLQUFLQTtTQUNaQSxDQUFDQSxPQUFPQSxDQUFD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RUEsZ0JBQWdCQTtTQUNoRkE7O1FBRURBLE9BQU9BLElBQUlBO0lBQ1pBLENBQUNBO0lBMUlEUix5QkFBNkJBLE1BQU1BO0lBQ25DQSx5QkFBNkJBLE1BQU1BO0lBQ25DQSx5QkFBNkJBLE1BQU1BO0lBQ25DQSx5QkFBNkJBLE1BQU1BO0lBQ25DQSx5QkFBNkJBLE1BQU1BO0lBQ25DQSx5QkFBNkJBLE1BQU1BO0lBdUlwQ0EseUJBQUNBO0FBQURBLENBQUNBLEVBOUkrQixVQUFVLEVBOEl6Qzs7QUFFRCxrQ0FBMkIsQ0FBQSIsImZpbGUiOiJwYXJzZXJzL0N1YmVUZXh0dXJlUGFyc2VyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBVUkxMb2FkZXJEYXRhRm9ybWF0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL25ldC9VUkxMb2FkZXJEYXRhRm9ybWF0XCIpO1xuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IFBhcnNlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIik7XG5pbXBvcnQgUmVzb3VyY2VEZXBlbmRlbmN5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1Jlc291cmNlRGVwZW5kZW5jeVwiKTtcbmltcG9ydCBJbWFnZUN1YmVUZXh0dXJlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0ltYWdlQ3ViZVRleHR1cmVcIik7XG5pbXBvcnQgSW1hZ2VUZXh0dXJlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvSW1hZ2VUZXh0dXJlXCIpO1xuXG4vKipcbiAqIEN1YmVUZXh0dXJlUGFyc2VyIHByb3ZpZGVzIGEgXCJwYXJzZXJcIiBmb3IgbmF0aXZlbHkgc3VwcG9ydGVkIGltYWdlIHR5cGVzIChqcGcsIHBuZykuIFdoaWxlIGl0IHNpbXBseSBsb2FkcyBieXRlcyBpbnRvXG4gKiBhIGxvYWRlciBvYmplY3QsIGl0IHdyYXBzIGl0IGluIGEgQml0bWFwRGF0YVJlc291cmNlIHNvIHJlc291cmNlIG1hbmFnZW1lbnQgY2FuIGhhcHBlbiBjb25zaXN0ZW50bHkgd2l0aG91dFxuICogZXhjZXB0aW9uIGNhc2VzLlxuICovXG5jbGFzcyBDdWJlVGV4dHVyZVBhcnNlciBleHRlbmRzIFBhcnNlckJhc2Vcbntcblx0cHJpdmF0ZSBzdGF0aWMgcG9zWDpzdHJpbmcgPSAncG9zWCc7XG5cdHByaXZhdGUgc3RhdGljIG5lZ1g6c3RyaW5nID0gJ25lZ1gnO1xuXHRwcml2YXRlIHN0YXRpYyBwb3NZOnN0cmluZyA9ICdwb3NZJztcblx0cHJpdmF0ZSBzdGF0aWMgbmVnWTpzdHJpbmcgPSAnbmVnWSc7XG5cdHByaXZhdGUgc3RhdGljIHBvc1o6c3RyaW5nID0gJ3Bvc1onO1xuXHRwcml2YXRlIHN0YXRpYyBuZWdaOnN0cmluZyA9ICduZWdaJztcblxuXHRwcml2YXRlIF9pbWdEZXBlbmRlbmN5RGljdGlvbmFyeTpPYmplY3Q7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgQ3ViZVRleHR1cmVQYXJzZXIgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdXJpIFRoZSB1cmwgb3IgaWQgb2YgdGhlIGRhdGEgb3IgZmlsZSB0byBiZSBwYXJzZWQuXG5cdCAqIEBwYXJhbSBleHRyYSBUaGUgaG9sZGVyIGZvciBleHRyYSBjb250ZXh0dWFsIGRhdGEgdGhhdCB0aGUgcGFyc2VyIG1pZ2h0IG5lZWQuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcihVUkxMb2FkZXJEYXRhRm9ybWF0LlRFWFQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhIGdpdmVuIGZpbGUgZXh0ZW5zaW9uIGlzIHN1cHBvcnRlZCBieSB0aGUgcGFyc2VyLlxuXHQgKiBAcGFyYW0gZXh0ZW5zaW9uIFRoZSBmaWxlIGV4dGVuc2lvbiBvZiBhIHBvdGVudGlhbCBmaWxlIHRvIGJlIHBhcnNlZC5cblx0ICogQHJldHVybiBXaGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gZmlsZSB0eXBlIGlzIHN1cHBvcnRlZC5cblx0ICovXG5cblx0cHVibGljIHN0YXRpYyBzdXBwb3J0c1R5cGUoZXh0ZW5zaW9uOnN0cmluZyk6Ym9vbGVhblxuXHR7XG5cdFx0ZXh0ZW5zaW9uID0gZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIGV4dGVuc2lvbiA9PSBcImN1YmVcIjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUZXN0cyB3aGV0aGVyIGEgZGF0YSBibG9jayBjYW4gYmUgcGFyc2VkIGJ5IHRoZSBwYXJzZXIuXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIGJsb2NrIHRvIHBvdGVudGlhbGx5IGJlIHBhcnNlZC5cblx0ICogQHJldHVybiBXaGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gZGF0YSBpcyBzdXBwb3J0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHN1cHBvcnRzRGF0YShkYXRhOmFueSk6Ym9vbGVhblxuXHR7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBvYmogPSBKU09OLnBhcnNlKGRhdGEpO1xuXG5cdFx0XHRpZiAob2JqKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfaVJlc29sdmVEZXBlbmRlbmN5KHJlc291cmNlRGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3kpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgX2lSZXNvbHZlRGVwZW5kZW5jeUZhaWx1cmUocmVzb3VyY2VEZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSlcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfcFByb2NlZWRQYXJzaW5nKCk6Ym9vbGVhblxuXHR7XG5cdFx0aWYgKHRoaXMuX2ltZ0RlcGVuZGVuY3lEaWN0aW9uYXJ5ICE9IG51bGwpIHsgLy9hbGwgaW1hZ2VzIGxvYWRlZFxuXHRcdFx0dmFyIGFzc2V0OkltYWdlQ3ViZVRleHR1cmUgPSBuZXcgSW1hZ2VDdWJlVGV4dHVyZShcblxuXHRcdFx0XHR0aGlzLl9nZXRIVE1MSW1hZ2VFbGVtZW50KEN1YmVUZXh0dXJlUGFyc2VyLnBvc1gpLCB0aGlzLl9nZXRIVE1MSW1hZ2VFbGVtZW50KEN1YmVUZXh0dXJlUGFyc2VyLm5lZ1gpLCB0aGlzLl9nZXRIVE1MSW1hZ2VFbGVtZW50KEN1YmVUZXh0dXJlUGFyc2VyLnBvc1kpLCB0aGlzLl9nZXRIVE1MSW1hZ2VFbGVtZW50KEN1YmVUZXh0dXJlUGFyc2VyLm5lZ1kpLCB0aGlzLl9nZXRIVE1MSW1hZ2VFbGVtZW50KEN1YmVUZXh0dXJlUGFyc2VyLnBvc1opLCB0aGlzLl9nZXRIVE1MSW1hZ2VFbGVtZW50KEN1YmVUZXh0dXJlUGFyc2VyLm5lZ1opKTtcblxuXHRcdFx0Ly9jbGVhciBkaWN0aW9uYXJ5XG5cdFx0XHR0aGlzLl9pbWdEZXBlbmRlbmN5RGljdGlvbmFyeSA9IG51bGw7XG5cblx0XHRcdGFzc2V0Lm5hbWUgPSB0aGlzLl9pRmlsZU5hbWU7XG5cblx0XHRcdHRoaXMuX3BGaW5hbGl6ZUFzc2V0KDxJQXNzZXQ+IGFzc2V0LCB0aGlzLl9pRmlsZU5hbWUpO1xuXG5cdFx0XHRyZXR1cm4gUGFyc2VyQmFzZS5QQVJTSU5HX0RPTkU7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdHZhciBqc29uOmFueSA9IEpTT04ucGFyc2UodGhpcy5kYXRhKTtcblx0XHRcdHZhciBkYXRhOkFycmF5PE9iamVjdD4gPSA8QXJyYXk8T2JqZWN0Pj4ganNvbi5kYXRhO1xuXHRcdFx0dmFyIHJlYzphbnk7XG5cblx0XHRcdGlmIChkYXRhLmxlbmd0aCAhPSA2KVxuXHRcdFx0XHR0aGlzLl9wRGllV2l0aEVycm9yKCdDdWJlVGV4dHVyZVBhcnNlcjogRXJyb3IgLSBjdWJlIHRleHR1cmUgc2hvdWxkIGhhdmUgZXhhY3RseSA2IGltYWdlcycpO1xuXG5cdFx0XHRpZiAoanNvbikge1xuXHRcdFx0XHR0aGlzLl9pbWdEZXBlbmRlbmN5RGljdGlvbmFyeSA9IG5ldyBPYmplY3QoKTtcblxuXHRcdFx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCBkYXRhLmxlbmd0aDsgYysrKSB7XG5cdFx0XHRcdFx0cmVjID0gZGF0YVtjXTtcblx0XHRcdFx0XHR0aGlzLl9pbWdEZXBlbmRlbmN5RGljdGlvbmFyeVtyZWMuaWRdID0gdGhpcy5fcEFkZERlcGVuZGVuY3kocmVjLmlkLCBuZXcgVVJMUmVxdWVzdChyZWMuaW1hZ2UudG9TdHJpbmcoKSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF0aGlzLl92YWxpZGF0ZUN1YmVEYXRhKCkpIHtcblxuXHRcdFx0XHRcdHRoaXMuX3BEaWVXaXRoRXJyb3IoXCJDdWJlVGV4dHVyZVBhcnNlcjogSlNPTiBkYXRhIGVycm9yIC0gY3ViZXMgcmVxdWlyZSBpZCBvZjogICBcXG5cIiArIEN1YmVUZXh0dXJlUGFyc2VyLnBvc1ggKyAnLCAnICsgQ3ViZVRleHR1cmVQYXJzZXIubmVnWCArICcsICBcXG4nICsgQ3ViZVRleHR1cmVQYXJzZXIucG9zWSArICcsICcgKyBDdWJlVGV4dHVyZVBhcnNlci5uZWdZICsgJywgIFxcbicgKyBDdWJlVGV4dHVyZVBhcnNlci5wb3NaICsgJywgJyArIEN1YmVUZXh0dXJlUGFyc2VyLm5lZ1opO1xuXG5cdFx0XHRcdFx0cmV0dXJuIFBhcnNlckJhc2UuUEFSU0lOR19ET05FO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9wUGF1c2VBbmRSZXRyaWV2ZURlcGVuZGVuY2llcygpO1xuXG5cdFx0XHRcdHJldHVybiBQYXJzZXJCYXNlLk1PUkVfVE9fUEFSU0U7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0dGhpcy5fcERpZVdpdGhFcnJvcignQ3ViZVRleHR1cmVQYXNlciBFcnJvciBwYXJzaW5nIEpTT04nKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gUGFyc2VyQmFzZS5QQVJTSU5HX0RPTkU7XG5cblx0fVxuXG5cdHByaXZhdGUgX3ZhbGlkYXRlQ3ViZURhdGEoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gICggdGhpcy5faW1nRGVwZW5kZW5jeURpY3Rpb25hcnlbIEN1YmVUZXh0dXJlUGFyc2VyLnBvc1ggXSAhPSBudWxsICYmIHRoaXMuX2ltZ0RlcGVuZGVuY3lEaWN0aW9uYXJ5WyBDdWJlVGV4dHVyZVBhcnNlci5uZWdYIF0gIT0gbnVsbCAmJiB0aGlzLl9pbWdEZXBlbmRlbmN5RGljdGlvbmFyeVsgQ3ViZVRleHR1cmVQYXJzZXIucG9zWSBdICE9IG51bGwgJiYgdGhpcy5faW1nRGVwZW5kZW5jeURpY3Rpb25hcnlbIEN1YmVUZXh0dXJlUGFyc2VyLm5lZ1kgXSAhPSBudWxsICYmIHRoaXMuX2ltZ0RlcGVuZGVuY3lEaWN0aW9uYXJ5WyBDdWJlVGV4dHVyZVBhcnNlci5wb3NaIF0gIT0gbnVsbCAmJiB0aGlzLl9pbWdEZXBlbmRlbmN5RGljdGlvbmFyeVsgQ3ViZVRleHR1cmVQYXJzZXIubmVnWiBdICE9IG51bGwgKTtcblx0fVxuXG5cdHByaXZhdGUgX2dldEhUTUxJbWFnZUVsZW1lbnQobmFtZTpzdHJpbmcpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHZhciBkZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSA9IDxSZXNvdXJjZURlcGVuZGVuY3k+IHRoaXMuX2ltZ0RlcGVuZGVuY3lEaWN0aW9uYXJ5WyBuYW1lIF07XG5cblx0XHRpZiAoZGVwZW5kZW5jeSkge1xuXHRcdFx0cmV0dXJuIDxIVE1MSW1hZ2VFbGVtZW50PiAoPEltYWdlVGV4dHVyZT4gZGVwZW5kZW5jeS5hc3NldHNbMF0pLmh0bWxJbWFnZUVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxufVxuXG5leHBvcnQgPSBDdWJlVGV4dHVyZVBhcnNlcjsiXX0=