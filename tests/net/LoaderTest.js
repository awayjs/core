"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetEvent_1 = require("awayjs-core/lib/events/AssetEvent");
var ParserEvent_1 = require("awayjs-core/lib/events/ParserEvent");
var Loader_1 = require("awayjs-core/lib/library/Loader");
var URLRequest_1 = require("awayjs-core/lib/net/URLRequest");
var ParserBase_1 = require("awayjs-core/lib/parsers/ParserBase");
var ParserDataFormat_1 = require("awayjs-core/lib/parsers/ParserDataFormat");
var LoaderTest = (function () {
    function LoaderTest() {
        var _this = this;
        //---------------------------------------------------------------------------------------------------------------------
        // Enable Custom Parser ( JSON file format with multiple texture dependencies )
        Loader_1.default.enableParser(JSONTextureParser);
        //---------------------------------------------------------------------------------------------------------------------
        // LOAD A SINGLE IMAGE
        this.alImage = new Loader_1.default();
        this.alImage.addEventListener(AssetEvent_1.default.ASSET_COMPLETE, function (event) { return _this.onAssetComplete(event); });
        this.alImage.addEventListener(AssetEvent_1.default.TEXTURE_SIZE_ERROR, function (event) { return _this.onTextureSizeError(event); });
        this.alImage.load(new URLRequest_1.default('assets/1024x1024.png'));
        //---------------------------------------------------------------------------------------------------------------------
        // LOAD A SINGLE IMAGE - With wrong dimensions
        this.alErrorImage = new Loader_1.default();
        this.alErrorImage.addEventListener(AssetEvent_1.default.ASSET_COMPLETE, function (event) { return _this.onAssetComplete(event); });
        this.alErrorImage.addEventListener(AssetEvent_1.default.TEXTURE_SIZE_ERROR, function (event) { return _this.onTextureSizeError(event); });
        this.alErrorImage.load(new URLRequest_1.default('assets/2.png'));
        //---------------------------------------------------------------------------------------------------------------------
        // LOAD WITH A JSON PARSER
        this.alJson = new Loader_1.default();
        this.alJson.addEventListener(AssetEvent_1.default.ASSET_COMPLETE, function (event) { return _this.onAssetComplete(event); });
        this.alJson.addEventListener(AssetEvent_1.default.TEXTURE_SIZE_ERROR, function (event) { return _this.onTextureSizeError(event); });
        this.alJson.addEventListener(ParserEvent_1.default.PARSE_COMPLETE, function (event) { return _this.onParseComplete(event); });
        this.alJson.load(new URLRequest_1.default('assets/JSNParserTest.json'));
    }
    LoaderTest.prototype.onParseComplete = function (event) {
        console.log('--------------------------------------------------------------------------------');
        console.log('LoaderTest.onParseComplete', event);
        console.log('--------------------------------------------------------------------------------');
    };
    LoaderTest.prototype.onTextureSizeError = function (event) {
        var assetLoader = event.target;
        console.log('--------------------------------------------------------------------------------');
        console.log('LoaderTest.onTextureSizeError', assetLoader.baseDependency._iLoader.url, event);
        console.log('--------------------------------------------------------------------------------');
    };
    LoaderTest.prototype.onAssetComplete = function (event) {
        var assetLoader = event.target;
        console.log('--------------------------------------------------------------------------------');
        console.log('LoaderTest.onAssetComplete', assetLoader.baseDependency._iLoader.url, event);
        console.log('--------------------------------------------------------------------------------');
    };
    return LoaderTest;
}());
/**
 * ImageParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
 * a loader object, it wraps it in a BitmapImage2DResource so resource management can happen consistently without
 * exception cases.
 */
var JSONTextureParser = (function (_super) {
    __extends(JSONTextureParser, _super);
    /**
     * Creates a new ImageParser object.
     * @param uri The url or id of the data or file to be parsed.
     * @param extra The holder for extra contextual data that the parser might need.
     */
    function JSONTextureParser() {
        _super.call(this, ParserDataFormat_1.default.PLAIN_TEXT);
        this.STATE_PARSE_DATA = 0;
        this.STATE_LOAD_IMAGES = 1;
        this.STATE_COMPLETE = 2;
        this._state = -1;
        this._dependencyCount = 0;
        this._loadedTextures = new Array();
        this._state = this.STATE_PARSE_DATA;
    }
    /**
     * Indicates whether or not a given file extension is supported by the parser.
     * @param extension The file extension of a potential file to be parsed.
     * @return Whether or not the given file type is supported.
     */
    JSONTextureParser.supportsType = function (extension) {
        extension = extension.toLowerCase();
        return extension == "json";
    };
    /**
     * Tests whether a data block can be parsed by the parser.
     * @param data The data block to potentially be parsed.
     * @return Whether or not the given data is supported.
     */
    JSONTextureParser.supportsData = function (data) {
        try {
            var obj = JSON.parse(data);
            if (obj)
                return true;
            return false;
        }
        catch (e) {
            return false;
        }
        return false;
    };
    /**
     * @inheritDoc
     */
    JSONTextureParser.prototype._iResolveDependency = function (resourceDependency) {
        var resource = resourceDependency.assets[0];
        this._pFinalizeAsset(resource, resourceDependency._iLoader.url);
        this._loadedTextures.push(resource);
        //console.log( 'JSONTextureParser._iResolveDependency' , resourceDependency );
        //console.log( 'JSONTextureParser._iResolveDependency resource: ' , resource );
        this._dependencyCount--;
        if (this._dependencyCount == 0)
            this._state = this.STATE_COMPLETE;
    };
    /**
     * @inheritDoc
     */
    JSONTextureParser.prototype._iResolveDependencyFailure = function (resourceDependency) {
        this._dependencyCount--;
        if (this._dependencyCount == 0)
            this._state = this.STATE_COMPLETE;
    };
    JSONTextureParser.prototype.parseJson = function () {
        if (JSONTextureParser.supportsData(this.data)) {
            try {
                var json = JSON.parse(this.data);
                var data = json.data;
                var rec;
                var rq;
                for (var c = 0; c < data.length; c++) {
                    rec = data[c];
                    var uri = rec.image;
                    var id = rec.id;
                    rq = new URLRequest_1.default(uri);
                    this._pAddDependency('JSON_ID_' + id, rq, false, null, true);
                }
                this._dependencyCount = data.length;
                this._state = this.STATE_LOAD_IMAGES;
                this._pPauseAndRetrieveDependencies();
            }
            catch (e) {
                this._state = this.STATE_COMPLETE;
            }
        }
    };
    /**
     * @inheritDoc
     */
    JSONTextureParser.prototype._pProceedParsing = function () {
        console.log('JSONTextureParser._pProceedParsing', this._state);
        switch (this._state) {
            case this.STATE_PARSE_DATA:
                this.parseJson();
                return ParserBase_1.default.MORE_TO_PARSE;
                break;
            case this.STATE_LOAD_IMAGES:
                break;
            case this.STATE_COMPLETE:
                return ParserBase_1.default.PARSING_DONE;
                break;
        }
        return ParserBase_1.default.MORE_TO_PARSE;
    };
    return JSONTextureParser;
}(ParserBase_1.default));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldC9Mb2FkZXJUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDJCQUF5QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzdELDRCQUEwQixvQ0FBb0MsQ0FBQyxDQUFBO0FBQy9ELHVCQUFzQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBRXZELDJCQUF5QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzFELDJCQUF5QixvQ0FBb0MsQ0FBQyxDQUFBO0FBQzlELGlDQUE4QiwwQ0FBMEMsQ0FBQyxDQUFBO0FBR3pFO0lBTUM7UUFORCxpQkE4REM7UUF0REMsdUhBQXVIO1FBQ3ZILCtFQUErRTtRQUMvRSxnQkFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXZDLHVIQUF1SDtRQUN2SCxzQkFBc0I7UUFFdEIsSUFBSSxDQUFDLE9BQU8sR0FBSSxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLG9CQUFVLENBQUMsY0FBYyxFQUFFLFVBQUMsS0FBZ0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLG9CQUFVLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxLQUFnQixJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDbkgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUUxRCx1SEFBdUg7UUFDdkgsOENBQThDO1FBRTlDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBVSxDQUFDLGNBQWMsRUFBRSxVQUFDLEtBQWdCLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUM7UUFDakgsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBVSxDQUFDLGtCQUFrQixFQUFFLFVBQUMsS0FBZ0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO1FBQ3hILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRXZELHVIQUF1SDtRQUN2SCwwQkFBMEI7UUFFMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFFLG9CQUFVLENBQUMsY0FBYyxFQUFFLFVBQUMsS0FBZ0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFFLG9CQUFVLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxLQUFnQixJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDbkgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxxQkFBVyxDQUFDLGNBQWMsRUFBRSxVQUFDLEtBQWlCLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUM7UUFDOUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sb0NBQWUsR0FBdEIsVUFBdUIsS0FBaUI7UUFFdkMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxrRkFBa0YsQ0FBQyxDQUFDO1FBQ2pHLE9BQU8sQ0FBQyxHQUFHLENBQUUsNEJBQTRCLEVBQUcsS0FBSyxDQUFFLENBQUM7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBRSxrRkFBa0YsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFTSx1Q0FBa0IsR0FBekIsVUFBMEIsS0FBZ0I7UUFFekMsSUFBSSxXQUFXLEdBQW1CLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBRSxrRkFBa0YsQ0FBQyxDQUFDO1FBQ2pHLE9BQU8sQ0FBQyxHQUFHLENBQUUsK0JBQStCLEVBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFHLEtBQUssQ0FBRSxDQUFDO1FBQ2pHLE9BQU8sQ0FBQyxHQUFHLENBQUUsa0ZBQWtGLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRU0sb0NBQWUsR0FBdEIsVUFBdUIsS0FBZ0I7UUFFdEMsSUFBSSxXQUFXLEdBQW1CLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBRSxrRkFBa0YsQ0FBQyxDQUFDO1FBQ2pHLE9BQU8sQ0FBQyxHQUFHLENBQUUsNEJBQTRCLEVBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFHLEtBQUssQ0FBRSxDQUFDO1FBQzdGLE9BQU8sQ0FBQyxHQUFHLENBQUUsa0ZBQWtGLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBQ0YsaUJBQUM7QUFBRCxDQTlEQSxBQThEQyxJQUFBO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQWdDLHFDQUFVO0lBWXpDOzs7O09BSUc7SUFDSDtRQUVDLGtCQUFNLDBCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBakI1QixxQkFBZ0IsR0FBVSxDQUFDLENBQUM7UUFDNUIsc0JBQWlCLEdBQVUsQ0FBQyxDQUFDO1FBQzdCLG1CQUFjLEdBQVUsQ0FBQyxDQUFDO1FBRTFCLFdBQU0sR0FBVSxDQUFDLENBQUMsQ0FBQztRQUduQixxQkFBZ0IsR0FBVSxDQUFDLENBQUM7UUFZbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEtBQUssRUFBaUIsQ0FBQztRQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVXLDhCQUFZLEdBQTFCLFVBQTJCLFNBQWtCO1FBRTVDLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyw4QkFBWSxHQUExQixVQUEyQixJQUFVO1FBRXBDLElBQUksQ0FBQztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFYixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2QsQ0FBRTtRQUFBLEtBQUssQ0FBQyxDQUFFLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrQ0FBbUIsR0FBMUIsVUFBMkIsa0JBQXFDO1FBRS9ELElBQUksUUFBUSxHQUFtQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUUsSUFBSSxDQUFDLGVBQWUsQ0FBVSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFFLFFBQVEsQ0FBRSxDQUFDO1FBRXRDLDhFQUE4RTtRQUM5RSwrRUFBK0U7UUFFL0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0RBQTBCLEdBQWpDLFVBQWtDLGtCQUFxQztRQUV0RSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUNwQyxDQUFDO0lBRU8scUNBQVMsR0FBakI7UUFFQyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUM7Z0JBQ0osSUFBSSxJQUFJLEdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksSUFBSSxHQUEyQixJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUU3QyxJQUFJLEdBQU8sQ0FBQztnQkFDWixJQUFJLEVBQWEsQ0FBQztnQkFFbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFFLENBQUM7b0JBQ2hELEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWQsSUFBSSxHQUFHLEdBQW1CLEdBQUcsQ0FBQyxLQUFLLENBQUM7b0JBQ3BDLElBQUksRUFBRSxHQUFtQixHQUFHLENBQUMsRUFBRSxDQUFDO29CQUVoQyxFQUFFLEdBQUcsSUFBSSxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUV6QixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzlELENBQUM7Z0JBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUVyQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztZQUV2QyxDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDbkMsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBQ0Q7O09BRUc7SUFDSSw0Q0FBZ0IsR0FBdkI7UUFFQyxPQUFPLENBQUMsR0FBRyxDQUFFLG9DQUFvQyxFQUFHLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUVsRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsTUFBTSxDQUFDLG9CQUFVLENBQUMsYUFBYSxDQUFDO2dCQUNoQyxLQUFLLENBQUM7WUFDUCxLQUFLLElBQUksQ0FBQyxpQkFBaUI7Z0JBQzFCLEtBQUssQ0FBQztZQUNQLEtBQUssSUFBSSxDQUFDLGNBQWM7Z0JBQ3ZCLE1BQU0sQ0FBQyxvQkFBVSxDQUFDLFlBQVksQ0FBQztnQkFDL0IsS0FBSyxDQUFDO1FBQ1IsQ0FBQztRQUVELE1BQU0sQ0FBQyxvQkFBVSxDQUFDLGFBQWEsQ0FBQztJQUNqQyxDQUFDO0lBQ0Ysd0JBQUM7QUFBRCxDQTdJQSxBQTZJQyxDQTdJK0Isb0JBQVUsR0E2SXpDIiwiZmlsZSI6Im5ldC9Mb2FkZXJUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcEltYWdlMkRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9pbWFnZS9CaXRtYXBJbWFnZTJEXCI7XG5pbXBvcnQgQXNzZXRFdmVudFx0XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIjtcbmltcG9ydCBQYXJzZXJFdmVudFx0XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1BhcnNlckV2ZW50XCI7XG5pbXBvcnQgTG9hZGVyXHRcdFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTG9hZGVyXCI7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCI7XG5pbXBvcnQgVVJMUmVxdWVzdFx0XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIjtcbmltcG9ydCBQYXJzZXJCYXNlXHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIjtcbmltcG9ydCBQYXJzZXJEYXRhRm9ybWF0XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJEYXRhRm9ybWF0XCI7XG5pbXBvcnQgUmVzb3VyY2VEZXBlbmRlbmN5XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL3BhcnNlcnMvUmVzb3VyY2VEZXBlbmRlbmN5XCI7XG5cbmNsYXNzIExvYWRlclRlc3Rcbntcblx0cHJpdmF0ZSBhbEpzb246TG9hZGVyO1xuXHRwcml2YXRlIGFsSW1hZ2U6TG9hZGVyO1xuXHRwcml2YXRlIGFsRXJyb3JJbWFnZTpMb2FkZXI7XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQvLyBFbmFibGUgQ3VzdG9tIFBhcnNlciAoIEpTT04gZmlsZSBmb3JtYXQgd2l0aCBtdWx0aXBsZSB0ZXh0dXJlIGRlcGVuZGVuY2llcyApXG5cdFx0TG9hZGVyLmVuYWJsZVBhcnNlcihKU09OVGV4dHVyZVBhcnNlcik7XG5cblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdC8vIExPQUQgQSBTSU5HTEUgSU1BR0VcblxuXHRcdHRoaXMuYWxJbWFnZSAgPSBuZXcgTG9hZGVyKCk7XG5cdFx0dGhpcy5hbEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldENvbXBsZXRlKGV2ZW50KSk7XG5cdFx0dGhpcy5hbEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5URVhUVVJFX1NJWkVfRVJST1IsIChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uVGV4dHVyZVNpemVFcnJvcihldmVudCkpO1xuXHRcdHRoaXMuYWxJbWFnZS5sb2FkKG5ldyBVUkxSZXF1ZXN0KCdhc3NldHMvMTAyNHgxMDI0LnBuZycpKTtcblxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0Ly8gTE9BRCBBIFNJTkdMRSBJTUFHRSAtIFdpdGggd3JvbmcgZGltZW5zaW9uc1xuXG5cdFx0dGhpcy5hbEVycm9ySW1hZ2UgPSBuZXcgTG9hZGVyKCk7XG5cdFx0dGhpcy5hbEVycm9ySW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0Q29tcGxldGUoZXZlbnQpKTtcblx0XHR0aGlzLmFsRXJyb3JJbWFnZS5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuVEVYVFVSRV9TSVpFX0VSUk9SLCAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vblRleHR1cmVTaXplRXJyb3IoZXZlbnQpKTtcblx0XHR0aGlzLmFsRXJyb3JJbWFnZS5sb2FkKG5ldyBVUkxSZXF1ZXN0KCdhc3NldHMvMi5wbmcnKSk7XG5cblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdC8vIExPQUQgV0lUSCBBIEpTT04gUEFSU0VSXG5cblx0XHR0aGlzLmFsSnNvbiA9IG5ldyBMb2FkZXIoKTtcblx0XHR0aGlzLmFsSnNvbi5hZGRFdmVudExpc3RlbmVyKCBBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0Q29tcGxldGUoZXZlbnQpKTtcblx0XHR0aGlzLmFsSnNvbi5hZGRFdmVudExpc3RlbmVyKCBBc3NldEV2ZW50LlRFWFRVUkVfU0laRV9FUlJPUiwgKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25UZXh0dXJlU2l6ZUVycm9yKGV2ZW50KSk7XG5cdFx0dGhpcy5hbEpzb24uYWRkRXZlbnRMaXN0ZW5lciggUGFyc2VyRXZlbnQuUEFSU0VfQ09NUExFVEUsIChldmVudDpQYXJzZXJFdmVudCkgPT4gdGhpcy5vblBhcnNlQ29tcGxldGUoZXZlbnQpKTtcblx0XHR0aGlzLmFsSnNvbi5sb2FkKG5ldyBVUkxSZXF1ZXN0KCdhc3NldHMvSlNOUGFyc2VyVGVzdC5qc29uJykpO1xuXHR9XG5cblx0cHVibGljIG9uUGFyc2VDb21wbGV0ZShldmVudDpQYXJzZXJFdmVudCk6dm9pZFxuXHR7XG5cdFx0Y29uc29sZS5sb2coICctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuXHRcdGNvbnNvbGUubG9nKCAnTG9hZGVyVGVzdC5vblBhcnNlQ29tcGxldGUnICwgZXZlbnQgKTtcblx0XHRjb25zb2xlLmxvZyggJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG5cdH1cblxuXHRwdWJsaWMgb25UZXh0dXJlU2l6ZUVycm9yKGV2ZW50OkFzc2V0RXZlbnQpOnZvaWRcblx0e1xuXHRcdHZhciBhc3NldExvYWRlcjpMb2FkZXIgPSA8TG9hZGVyPiBldmVudC50YXJnZXQ7XG5cblx0XHRjb25zb2xlLmxvZyggJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG5cdFx0Y29uc29sZS5sb2coICdMb2FkZXJUZXN0Lm9uVGV4dHVyZVNpemVFcnJvcicgLCBhc3NldExvYWRlci5iYXNlRGVwZW5kZW5jeS5faUxvYWRlci51cmwgLCBldmVudCApO1xuXHRcdGNvbnNvbGUubG9nKCAnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcblx0fVxuXG5cdHB1YmxpYyBvbkFzc2V0Q29tcGxldGUoZXZlbnQ6QXNzZXRFdmVudCk6dm9pZFxuXHR7XG5cdFx0dmFyIGFzc2V0TG9hZGVyOkxvYWRlciA9IDxMb2FkZXI+IGV2ZW50LnRhcmdldDtcblxuXHRcdGNvbnNvbGUubG9nKCAnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcblx0XHRjb25zb2xlLmxvZyggJ0xvYWRlclRlc3Qub25Bc3NldENvbXBsZXRlJywgYXNzZXRMb2FkZXIuYmFzZURlcGVuZGVuY3kuX2lMb2FkZXIudXJsICwgZXZlbnQgKTtcblx0XHRjb25zb2xlLmxvZyggJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG5cdH1cbn1cblxuLyoqXG4gKiBJbWFnZVBhcnNlciBwcm92aWRlcyBhIFwicGFyc2VyXCIgZm9yIG5hdGl2ZWx5IHN1cHBvcnRlZCBpbWFnZSB0eXBlcyAoanBnLCBwbmcpLiBXaGlsZSBpdCBzaW1wbHkgbG9hZHMgYnl0ZXMgaW50b1xuICogYSBsb2FkZXIgb2JqZWN0LCBpdCB3cmFwcyBpdCBpbiBhIEJpdG1hcEltYWdlMkRSZXNvdXJjZSBzbyByZXNvdXJjZSBtYW5hZ2VtZW50IGNhbiBoYXBwZW4gY29uc2lzdGVudGx5IHdpdGhvdXRcbiAqIGV4Y2VwdGlvbiBjYXNlcy5cbiAqL1xuY2xhc3MgSlNPTlRleHR1cmVQYXJzZXIgZXh0ZW5kcyBQYXJzZXJCYXNlXG57XG5cdHByaXZhdGUgU1RBVEVfUEFSU0VfREFUQTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIFNUQVRFX0xPQURfSU1BR0VTOm51bWJlciA9IDE7XG5cdHByaXZhdGUgU1RBVEVfQ09NUExFVEU6bnVtYmVyID0gMjtcblxuXHRwcml2YXRlIF9zdGF0ZTpudW1iZXIgPSAtMTtcblx0cHJpdmF0ZSBfc3RhcnRlZFBhcnNpbmc6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfZG9uZVBhcnNpbmc6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfZGVwZW5kZW5jeUNvdW50Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX2xvYWRlZFRleHR1cmVzOkFycmF5PEJpdG1hcEltYWdlMkQ+O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IEltYWdlUGFyc2VyIG9iamVjdC5cblx0ICogQHBhcmFtIHVyaSBUaGUgdXJsIG9yIGlkIG9mIHRoZSBkYXRhIG9yIGZpbGUgdG8gYmUgcGFyc2VkLlxuXHQgKiBAcGFyYW0gZXh0cmEgVGhlIGhvbGRlciBmb3IgZXh0cmEgY29udGV4dHVhbCBkYXRhIHRoYXQgdGhlIHBhcnNlciBtaWdodCBuZWVkLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoUGFyc2VyRGF0YUZvcm1hdC5QTEFJTl9URVhUKTtcblxuXHRcdHRoaXMuX2xvYWRlZFRleHR1cmVzID0gbmV3IEFycmF5PEJpdG1hcEltYWdlMkQ+KCk7XG5cdFx0dGhpcy5fc3RhdGUgPSB0aGlzLlNUQVRFX1BBUlNFX0RBVEE7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gZmlsZSBleHRlbnNpb24gaXMgc3VwcG9ydGVkIGJ5IHRoZSBwYXJzZXIuXG5cdCAqIEBwYXJhbSBleHRlbnNpb24gVGhlIGZpbGUgZXh0ZW5zaW9uIG9mIGEgcG90ZW50aWFsIGZpbGUgdG8gYmUgcGFyc2VkLlxuXHQgKiBAcmV0dXJuIFdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBmaWxlIHR5cGUgaXMgc3VwcG9ydGVkLlxuXHQgKi9cblxuXHRwdWJsaWMgc3RhdGljIHN1cHBvcnRzVHlwZShleHRlbnNpb24gOiBzdHJpbmcpIDogYm9vbGVhblxuXHR7XG5cdFx0ZXh0ZW5zaW9uID0gZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIGV4dGVuc2lvbiA9PSBcImpzb25cIjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUZXN0cyB3aGV0aGVyIGEgZGF0YSBibG9jayBjYW4gYmUgcGFyc2VkIGJ5IHRoZSBwYXJzZXIuXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIGJsb2NrIHRvIHBvdGVudGlhbGx5IGJlIHBhcnNlZC5cblx0ICogQHJldHVybiBXaGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gZGF0YSBpcyBzdXBwb3J0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHN1cHBvcnRzRGF0YShkYXRhIDogYW55KSA6IGJvb2xlYW5cblx0e1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcblxuXHRcdFx0aWYgKG9iailcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfaVJlc29sdmVEZXBlbmRlbmN5KHJlc291cmNlRGVwZW5kZW5jeTpSZXNvdXJjZURlcGVuZGVuY3kpXG5cdHtcblx0XHR2YXIgcmVzb3VyY2UgOiBCaXRtYXBJbWFnZTJEID0gPEJpdG1hcEltYWdlMkQ+IHJlc291cmNlRGVwZW5kZW5jeS5hc3NldHNbMF07XG5cblx0XHR0aGlzLl9wRmluYWxpemVBc3NldCg8SUFzc2V0PiByZXNvdXJjZSwgcmVzb3VyY2VEZXBlbmRlbmN5Ll9pTG9hZGVyLnVybCk7XG5cblx0XHR0aGlzLl9sb2FkZWRUZXh0dXJlcy5wdXNoKCByZXNvdXJjZSApO1xuXG5cdFx0Ly9jb25zb2xlLmxvZyggJ0pTT05UZXh0dXJlUGFyc2VyLl9pUmVzb2x2ZURlcGVuZGVuY3knICwgcmVzb3VyY2VEZXBlbmRlbmN5ICk7XG5cdFx0Ly9jb25zb2xlLmxvZyggJ0pTT05UZXh0dXJlUGFyc2VyLl9pUmVzb2x2ZURlcGVuZGVuY3kgcmVzb3VyY2U6ICcgLCByZXNvdXJjZSApO1xuXG5cdFx0dGhpcy5fZGVwZW5kZW5jeUNvdW50LS07XG5cblx0XHRpZiAoIHRoaXMuX2RlcGVuZGVuY3lDb3VudCA9PSAwKVxuXHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLlNUQVRFX0NPTVBMRVRFO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgX2lSZXNvbHZlRGVwZW5kZW5jeUZhaWx1cmUocmVzb3VyY2VEZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSlcblx0e1xuXHRcdHRoaXMuX2RlcGVuZGVuY3lDb3VudC0tO1xuXG5cdFx0aWYgKCB0aGlzLl9kZXBlbmRlbmN5Q291bnQgPT0gMClcblx0XHRcdHRoaXMuX3N0YXRlID0gdGhpcy5TVEFURV9DT01QTEVURTtcblx0fVxuXG5cdHByaXZhdGUgcGFyc2VKc29uKCApIDogdm9pZFxuXHR7XG5cdFx0aWYgKEpTT05UZXh0dXJlUGFyc2VyLnN1cHBvcnRzRGF0YSh0aGlzLmRhdGEpKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIganNvbjphbnkgPSBKU09OLnBhcnNlKHRoaXMuZGF0YSk7XG5cdFx0XHRcdHZhciBkYXRhOkFycmF5PGFueT4gPSA8QXJyYXk8YW55Pj4ganNvbi5kYXRhO1xuXG5cdFx0XHRcdHZhciByZWM6YW55O1xuXHRcdFx0XHR2YXIgcnE6VVJMUmVxdWVzdDtcblxuXHRcdFx0XHRmb3IgKHZhciBjIDogbnVtYmVyID0gMDsgYyA8IGRhdGEubGVuZ3RoOyBjICsrKSB7XG5cdFx0XHRcdFx0cmVjID0gZGF0YVtjXTtcblxuXHRcdFx0XHRcdHZhciB1cmk6c3RyaW5nID0gPHN0cmluZz4gcmVjLmltYWdlO1xuXHRcdFx0XHRcdHZhciBpZDpzdHJpbmcgPSA8c3RyaW5nPiByZWMuaWQ7XG5cblx0XHRcdFx0XHRycSA9IG5ldyBVUkxSZXF1ZXN0KHVyaSk7XG5cblx0XHRcdFx0XHR0aGlzLl9wQWRkRGVwZW5kZW5jeSgnSlNPTl9JRF8nICsgaWQsIHJxLCBmYWxzZSwgbnVsbCwgdHJ1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9kZXBlbmRlbmN5Q291bnQgPSBkYXRhLmxlbmd0aDtcblx0XHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLlNUQVRFX0xPQURfSU1BR0VTO1xuXG5cdFx0XHRcdHRoaXMuX3BQYXVzZUFuZFJldHJpZXZlRGVwZW5kZW5jaWVzKCk7XG5cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLlNUQVRFX0NPTVBMRVRFO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfcFByb2NlZWRQYXJzaW5nKCkgOiBib29sZWFuXG5cdHtcblx0XHRjb25zb2xlLmxvZyggJ0pTT05UZXh0dXJlUGFyc2VyLl9wUHJvY2VlZFBhcnNpbmcnICwgdGhpcy5fc3RhdGUgKTtcblxuXHRcdHN3aXRjaCAodGhpcy5fc3RhdGUpIHtcblx0XHRcdGNhc2UgdGhpcy5TVEFURV9QQVJTRV9EQVRBOlxuXHRcdFx0XHR0aGlzLnBhcnNlSnNvbigpO1xuXHRcdFx0XHRyZXR1cm4gUGFyc2VyQmFzZS5NT1JFX1RPX1BBUlNFO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgdGhpcy5TVEFURV9MT0FEX0lNQUdFUzpcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIHRoaXMuU1RBVEVfQ09NUExFVEU6XG5cdFx0XHRcdHJldHVybiBQYXJzZXJCYXNlLlBBUlNJTkdfRE9ORTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFBhcnNlckJhc2UuTU9SRV9UT19QQVJTRTtcblx0fVxufSJdLCJzb3VyY2VSb290IjoiLi90ZXN0cyJ9
