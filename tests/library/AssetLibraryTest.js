"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BitmapImage2D_1 = require("awayjs-core/lib/image/BitmapImage2D");
var AssetEvent_1 = require("awayjs-core/lib/events/AssetEvent");
var LoaderEvent_1 = require("awayjs-core/lib/events/LoaderEvent");
var AssetLibrary_1 = require("awayjs-core/lib/library/AssetLibrary");
var URLRequest_1 = require("awayjs-core/lib/net/URLRequest");
var ParserBase_1 = require("awayjs-core/lib/parsers/ParserBase");
var ParserDataFormat_1 = require("awayjs-core/lib/parsers/ParserDataFormat");
var AssetLibraryTest = (function () {
    function AssetLibraryTest() {
        var _this = this;
        this.height = 0;
        var session;
        AssetLibrary_1.default.enableParser(JSONTextureParser);
        session = AssetLibrary_1.default.getLoader();
        session.addEventListener(LoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        session.addEventListener(AssetEvent_1.default.ASSET_COMPLETE, function (event) { return _this.onAssetComplete(event); });
        session.load(new URLRequest_1.default('assets/JSNParserTest.json'));
        session = AssetLibrary_1.default.getLoader();
        session.addEventListener(LoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        session.addEventListener(AssetEvent_1.default.ASSET_COMPLETE, function (event) { return _this.onAssetComplete(event); });
        session.load(new URLRequest_1.default('assets/1024x1024.png'));
        session = AssetLibrary_1.default.getLoader();
        session.addEventListener(LoaderEvent_1.default.LOAD_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        session.addEventListener(AssetEvent_1.default.ASSET_COMPLETE, function (event) { return _this.onAssetComplete(event); });
        session.load(new URLRequest_1.default('assets/atlas.xml'));
    }
    AssetLibraryTest.prototype.onAssetComplete = function (event) {
        console.log('------------------------------------------------------------------------------');
        console.log('AssetEvent.ASSET_COMPLETE', event.asset);
        console.log('------------------------------------------------------------------------------');
        if (event.asset.isAsset(BitmapImage2D_1.default)) {
            var bitmapData = event.asset;
            document.body.appendChild(bitmapData.getCanvas());
            bitmapData.getCanvas().style.position = 'absolute';
            bitmapData.getCanvas().style.top = this.height + 'px';
            this.height += (bitmapData.getCanvas().height + 10);
        }
    };
    AssetLibraryTest.prototype.onResourceComplete = function (event) {
        var loader = event.target;
        console.log('------------------------------------------------------------------------------');
        console.log('LoaderEvent.RESOURCE_COMPLETE', event);
        console.log('------------------------------------------------------------------------------');
    };
    return AssetLibraryTest;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnJhcnkvQXNzZXRMaWJyYXJ5VGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4QkFBMkIscUNBQXFDLENBQUMsQ0FBQTtBQUNqRSwyQkFBeUIsbUNBQW1DLENBQUMsQ0FBQTtBQUM3RCw0QkFBMEIsb0NBQW9DLENBQUMsQ0FBQTtBQUMvRCw2QkFBMkIsc0NBQXNDLENBQUMsQ0FBQTtBQUdsRSwyQkFBeUIsZ0NBQWdDLENBQUMsQ0FBQTtBQUMxRCwyQkFBeUIsb0NBQW9DLENBQUMsQ0FBQTtBQUM5RCxpQ0FBOEIsMENBQTBDLENBQUMsQ0FBQTtBQUd6RTtJQUtDO1FBTEQsaUJBeURDO1FBdERRLFdBQU0sR0FBWSxDQUFDLENBQUM7UUFJM0IsSUFBSSxPQUFjLENBQUM7UUFFbkIsc0JBQVksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU3QyxPQUFPLEdBQUcsc0JBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQyxPQUFPLENBQUMsZ0JBQWdCLENBQUUscUJBQVcsQ0FBQyxhQUFhLEVBQUcsVUFBQyxLQUFpQixJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUFFLENBQUM7UUFDOUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLG9CQUFVLENBQUMsY0FBYyxFQUFHLFVBQUMsS0FBZ0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUUsQ0FBQztRQUN6RyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFFLENBQUM7UUFFM0QsT0FBTyxHQUFHLHNCQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkMsT0FBTyxDQUFDLGdCQUFnQixDQUFFLHFCQUFXLENBQUMsYUFBYSxFQUFHLFVBQUMsS0FBaUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBOUIsQ0FBOEIsQ0FBRSxDQUFDO1FBQzlHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBVSxDQUFDLGNBQWMsRUFBRyxVQUFDLEtBQWdCLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFFLENBQUM7UUFDekcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBRSxDQUFDO1FBRXRELE9BQU8sR0FBRyxzQkFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBRSxxQkFBVyxDQUFDLGFBQWEsRUFBRyxVQUFDLEtBQWlCLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQTlCLENBQThCLENBQUUsQ0FBQztRQUM5RyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsb0JBQVUsQ0FBQyxjQUFjLEVBQUcsVUFBQyxLQUFnQixJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FBRSxDQUFDO1FBQ3pHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU0sMENBQWUsR0FBdEIsVUFBdUIsS0FBZ0I7UUFHdEMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxnRkFBZ0YsQ0FBQyxDQUFDO1FBQy9GLE9BQU8sQ0FBQyxHQUFHLENBQUUsMkJBQTJCLEVBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUUsZ0ZBQWdGLENBQUMsQ0FBQztRQUUvRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyx1QkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksVUFBVSxHQUFtQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBRTdELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBRSxDQUFDO1lBRXBELFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUNuRCxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUd0RCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUUsQ0FBRTtRQUN4RCxDQUFDO0lBQ0YsQ0FBQztJQUNNLDZDQUFrQixHQUF6QixVQUEwQixLQUFpQjtRQUcxQyxJQUFJLE1BQU0sR0FBcUIsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUU1QyxPQUFPLENBQUMsR0FBRyxDQUFFLGdGQUFnRixDQUFDLENBQUM7UUFDL0YsT0FBTyxDQUFDLEdBQUcsQ0FBRSwrQkFBK0IsRUFBRyxLQUFLLENBQUcsQ0FBQztRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFFLGdGQUFnRixDQUFDLENBQUM7SUFFaEcsQ0FBQztJQUVGLHVCQUFDO0FBQUQsQ0F6REEsQUF5REMsSUFBQTtBQUVEOzs7O0VBSUU7QUFDRjtJQUFnQyxxQ0FBVTtJQVl6Qzs7OztPQUlHO0lBQ0g7UUFFQyxrQkFBTSwwQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQWpCNUIscUJBQWdCLEdBQVUsQ0FBQyxDQUFDO1FBQzVCLHNCQUFpQixHQUFVLENBQUMsQ0FBQztRQUM3QixtQkFBYyxHQUFVLENBQUMsQ0FBQztRQUUxQixXQUFNLEdBQVUsQ0FBQyxDQUFDLENBQUM7UUFHbkIscUJBQWdCLEdBQVUsQ0FBQyxDQUFDO1FBWW5DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxLQUFLLEVBQWlCLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFFVyw4QkFBWSxHQUExQixVQUEyQixTQUFrQjtRQUU1QyxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csOEJBQVksR0FBMUIsVUFBMkIsSUFBVTtRQUVwQyxJQUFJLENBQUM7WUFDSixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRWIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNkLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBRSxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNkLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksK0NBQW1CLEdBQTFCLFVBQTJCLGtCQUFxQztRQUUvRCxJQUFJLFFBQVEsR0FBbUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVFLElBQUksQ0FBQyxlQUFlLENBQVUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBRSxRQUFRLENBQUUsQ0FBQztRQUV0Qyw4RUFBOEU7UUFDOUUsK0VBQStFO1FBRS9FLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNJLHNEQUEwQixHQUFqQyxVQUFrQyxrQkFBcUM7UUFFdEUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEMsQ0FBQztJQUVPLHFDQUFTLEdBQWpCO1FBRUMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDO2dCQUNKLElBQUksSUFBSSxHQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLElBQUksR0FBMkIsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFFN0MsSUFBSSxHQUFPLENBQUM7Z0JBQ1osSUFBSSxFQUFhLENBQUM7Z0JBRWxCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRSxDQUFDO29CQUNoRCxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVkLElBQUksR0FBRyxHQUFtQixHQUFHLENBQUMsS0FBSyxDQUFDO29CQUNwQyxJQUFJLEVBQUUsR0FBbUIsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFFaEMsRUFBRSxHQUFHLElBQUksb0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO2dCQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFFckMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFFdkMsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ25DLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQUNEOztPQUVHO0lBQ0ksNENBQWdCLEdBQXZCO1FBRUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxvQ0FBb0MsRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUM7UUFFbEUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxJQUFJLENBQUMsZ0JBQWdCO2dCQUN6QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxvQkFBVSxDQUFDLGFBQWEsQ0FBQztnQkFDaEMsS0FBSyxDQUFDO1lBQ1AsS0FBSyxJQUFJLENBQUMsaUJBQWlCO2dCQUMxQixLQUFLLENBQUM7WUFDUCxLQUFLLElBQUksQ0FBQyxjQUFjO2dCQUN2QixNQUFNLENBQUMsb0JBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztRQUNSLENBQUM7UUFFRCxNQUFNLENBQUMsb0JBQVUsQ0FBQyxhQUFhLENBQUM7SUFDakMsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0E3SUEsQUE2SUMsQ0E3SStCLG9CQUFVLEdBNkl6QyIsImZpbGUiOiJsaWJyYXJ5L0Fzc2V0TGlicmFyeVRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQml0bWFwSW1hZ2UyRFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL2ltYWdlL0JpdG1hcEltYWdlMkRcIjtcbmltcG9ydCBBc3NldEV2ZW50XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvQXNzZXRFdmVudFwiO1xuaW1wb3J0IExvYWRlckV2ZW50XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTG9hZGVyRXZlbnRcIjtcbmltcG9ydCBBc3NldExpYnJhcnlcdFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMaWJyYXJ5XCI7XG5pbXBvcnQgTG9hZGVyXHRcdFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTG9hZGVyXCI7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCI7XG5pbXBvcnQgVVJMUmVxdWVzdFx0XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIjtcbmltcG9ydCBQYXJzZXJCYXNlXHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIjtcbmltcG9ydCBQYXJzZXJEYXRhRm9ybWF0XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJEYXRhRm9ybWF0XCI7XG5pbXBvcnQgUmVzb3VyY2VEZXBlbmRlbmN5XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL3BhcnNlcnMvUmVzb3VyY2VEZXBlbmRlbmN5XCI7XG5cbmNsYXNzIEFzc2V0TGlicmFyeVRlc3RcbntcblxuXHRwcml2YXRlIGhlaWdodCA6IG51bWJlciA9IDA7XG5cdFxuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHR2YXIgc2Vzc2lvbjpMb2FkZXI7XG5cdFx0XG5cdFx0QXNzZXRMaWJyYXJ5LmVuYWJsZVBhcnNlcihKU09OVGV4dHVyZVBhcnNlcik7XG5cblx0XHRzZXNzaW9uID0gQXNzZXRMaWJyYXJ5LmdldExvYWRlcigpO1xuXHRcdHNlc3Npb24uYWRkRXZlbnRMaXN0ZW5lciggTG9hZGVyRXZlbnQuTE9BRF9DT01QTEVURSAsIChldmVudDpMb2FkZXJFdmVudCkgPT4gdGhpcy5vblJlc291cmNlQ29tcGxldGUoZXZlbnQpICk7XG5cdFx0c2Vzc2lvbi5hZGRFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUgLCAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0Q29tcGxldGUoZXZlbnQpICk7XG5cdFx0c2Vzc2lvbi5sb2FkKG5ldyBVUkxSZXF1ZXN0KCdhc3NldHMvSlNOUGFyc2VyVGVzdC5qc29uJykgKTtcblxuXHRcdHNlc3Npb24gPSBBc3NldExpYnJhcnkuZ2V0TG9hZGVyKCk7XG5cdFx0c2Vzc2lvbi5hZGRFdmVudExpc3RlbmVyKCBMb2FkZXJFdmVudC5MT0FEX0NPTVBMRVRFICwgKGV2ZW50OkxvYWRlckV2ZW50KSA9PiB0aGlzLm9uUmVzb3VyY2VDb21wbGV0ZShldmVudCkgKTtcblx0XHRzZXNzaW9uLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSAsIChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uQXNzZXRDb21wbGV0ZShldmVudCkgKTtcblx0XHRzZXNzaW9uLmxvYWQobmV3IFVSTFJlcXVlc3QoJ2Fzc2V0cy8xMDI0eDEwMjQucG5nJykgKTtcblxuXHRcdHNlc3Npb24gPSBBc3NldExpYnJhcnkuZ2V0TG9hZGVyKCk7XG5cdFx0c2Vzc2lvbi5hZGRFdmVudExpc3RlbmVyKCBMb2FkZXJFdmVudC5MT0FEX0NPTVBMRVRFICwgKGV2ZW50OkxvYWRlckV2ZW50KSA9PiB0aGlzLm9uUmVzb3VyY2VDb21wbGV0ZShldmVudCkgKTtcblx0XHRzZXNzaW9uLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSAsIChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uQXNzZXRDb21wbGV0ZShldmVudCkgKTtcblx0XHRzZXNzaW9uLmxvYWQobmV3IFVSTFJlcXVlc3QoJ2Fzc2V0cy9hdGxhcy54bWwnKSApO1xuXHR9XG5cblx0cHVibGljIG9uQXNzZXRDb21wbGV0ZShldmVudDpBc3NldEV2ZW50KVxuXHR7XG5cblx0XHRjb25zb2xlLmxvZyggJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuXHRcdGNvbnNvbGUubG9nKCAnQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURScgLCBldmVudC5hc3NldCk7XG5cdFx0Y29uc29sZS5sb2coICctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcblxuXHRcdGlmIChldmVudC5hc3NldC5pc0Fzc2V0KEJpdG1hcEltYWdlMkQpKSB7XG5cdFx0XHR2YXIgYml0bWFwRGF0YSA6IEJpdG1hcEltYWdlMkQgPSA8Qml0bWFwSW1hZ2UyRD4gZXZlbnQuYXNzZXQ7XG5cblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGJpdG1hcERhdGEuZ2V0Q2FudmFzKCkgKTtcblxuXHRcdFx0Yml0bWFwRGF0YS5nZXRDYW52YXMoKS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0XHRiaXRtYXBEYXRhLmdldENhbnZhcygpLnN0eWxlLnRvcCA9IHRoaXMuaGVpZ2h0ICsgJ3B4JztcblxuXG5cdFx0XHR0aGlzLmhlaWdodCArPSAoIGJpdG1hcERhdGEuZ2V0Q2FudmFzKCkuaGVpZ2h0ICsgMTAgKSA7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBvblJlc291cmNlQ29tcGxldGUoZXZlbnQ6TG9hZGVyRXZlbnQpXG5cdHtcblxuXHRcdHZhciBsb2FkZXIgOiBMb2FkZXIgPSA8TG9hZGVyPiBldmVudC50YXJnZXQ7XG5cblx0XHRjb25zb2xlLmxvZyggJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuXHRcdGNvbnNvbGUubG9nKCAnTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUnICwgZXZlbnQgICk7XG5cdFx0Y29uc29sZS5sb2coICctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcblxuXHR9XG5cbn1cblxuLyoqXG4qIEltYWdlUGFyc2VyIHByb3ZpZGVzIGEgXCJwYXJzZXJcIiBmb3IgbmF0aXZlbHkgc3VwcG9ydGVkIGltYWdlIHR5cGVzIChqcGcsIHBuZykuIFdoaWxlIGl0IHNpbXBseSBsb2FkcyBieXRlcyBpbnRvXG4qIGEgbG9hZGVyIG9iamVjdCwgaXQgd3JhcHMgaXQgaW4gYSBCaXRtYXBJbWFnZTJEUmVzb3VyY2Ugc28gcmVzb3VyY2UgbWFuYWdlbWVudCBjYW4gaGFwcGVuIGNvbnNpc3RlbnRseSB3aXRob3V0XG4qIGV4Y2VwdGlvbiBjYXNlcy5cbiovXG5jbGFzcyBKU09OVGV4dHVyZVBhcnNlciBleHRlbmRzIFBhcnNlckJhc2Vcbntcblx0cHJpdmF0ZSBTVEFURV9QQVJTRV9EQVRBOm51bWJlciA9IDA7XG5cdHByaXZhdGUgU1RBVEVfTE9BRF9JTUFHRVM6bnVtYmVyID0gMTtcblx0cHJpdmF0ZSBTVEFURV9DT01QTEVURTpudW1iZXIgPSAyO1xuXG5cdHByaXZhdGUgX3N0YXRlOm51bWJlciA9IC0xO1xuXHRwcml2YXRlIF9zdGFydGVkUGFyc2luZzpib29sZWFuO1xuXHRwcml2YXRlIF9kb25lUGFyc2luZzpib29sZWFuO1xuXHRwcml2YXRlIF9kZXBlbmRlbmN5Q291bnQ6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfbG9hZGVkVGV4dHVyZXM6QXJyYXk8Qml0bWFwSW1hZ2UyRD47XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgSW1hZ2VQYXJzZXIgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdXJpIFRoZSB1cmwgb3IgaWQgb2YgdGhlIGRhdGEgb3IgZmlsZSB0byBiZSBwYXJzZWQuXG5cdCAqIEBwYXJhbSBleHRyYSBUaGUgaG9sZGVyIGZvciBleHRyYSBjb250ZXh0dWFsIGRhdGEgdGhhdCB0aGUgcGFyc2VyIG1pZ2h0IG5lZWQuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcihQYXJzZXJEYXRhRm9ybWF0LlBMQUlOX1RFWFQpO1xuXG5cdFx0dGhpcy5fbG9hZGVkVGV4dHVyZXMgPSBuZXcgQXJyYXk8Qml0bWFwSW1hZ2UyRD4oKTtcblx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuU1RBVEVfUEFSU0VfREFUQTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYSBnaXZlbiBmaWxlIGV4dGVuc2lvbiBpcyBzdXBwb3J0ZWQgYnkgdGhlIHBhcnNlci5cblx0ICogQHBhcmFtIGV4dGVuc2lvbiBUaGUgZmlsZSBleHRlbnNpb24gb2YgYSBwb3RlbnRpYWwgZmlsZSB0byBiZSBwYXJzZWQuXG5cdCAqIEByZXR1cm4gV2hldGhlciBvciBub3QgdGhlIGdpdmVuIGZpbGUgdHlwZSBpcyBzdXBwb3J0ZWQuXG5cdCAqL1xuXG5cdHB1YmxpYyBzdGF0aWMgc3VwcG9ydHNUeXBlKGV4dGVuc2lvbiA6IHN0cmluZykgOiBib29sZWFuXG5cdHtcblx0XHRleHRlbnNpb24gPSBleHRlbnNpb24udG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gZXh0ZW5zaW9uID09IFwianNvblwiO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRlc3RzIHdoZXRoZXIgYSBkYXRhIGJsb2NrIGNhbiBiZSBwYXJzZWQgYnkgdGhlIHBhcnNlci5cblx0ICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgYmxvY2sgdG8gcG90ZW50aWFsbHkgYmUgcGFyc2VkLlxuXHQgKiBAcmV0dXJuIFdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBkYXRhIGlzIHN1cHBvcnRlZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgc3VwcG9ydHNEYXRhKGRhdGEgOiBhbnkpIDogYm9vbGVhblxuXHR7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBvYmogPSBKU09OLnBhcnNlKGRhdGEpO1xuXG5cdFx0XHRpZiAob2JqKVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIF9pUmVzb2x2ZURlcGVuZGVuY3kocmVzb3VyY2VEZXBlbmRlbmN5OlJlc291cmNlRGVwZW5kZW5jeSlcblx0e1xuXHRcdHZhciByZXNvdXJjZSA6IEJpdG1hcEltYWdlMkQgPSA8Qml0bWFwSW1hZ2UyRD4gcmVzb3VyY2VEZXBlbmRlbmN5LmFzc2V0c1swXTtcblxuXHRcdHRoaXMuX3BGaW5hbGl6ZUFzc2V0KDxJQXNzZXQ+IHJlc291cmNlLCByZXNvdXJjZURlcGVuZGVuY3kuX2lMb2FkZXIudXJsKTtcblxuXHRcdHRoaXMuX2xvYWRlZFRleHR1cmVzLnB1c2goIHJlc291cmNlICk7XG5cblx0XHQvL2NvbnNvbGUubG9nKCAnSlNPTlRleHR1cmVQYXJzZXIuX2lSZXNvbHZlRGVwZW5kZW5jeScgLCByZXNvdXJjZURlcGVuZGVuY3kgKTtcblx0XHQvL2NvbnNvbGUubG9nKCAnSlNPTlRleHR1cmVQYXJzZXIuX2lSZXNvbHZlRGVwZW5kZW5jeSByZXNvdXJjZTogJyAsIHJlc291cmNlICk7XG5cblx0XHR0aGlzLl9kZXBlbmRlbmN5Q291bnQtLTtcblxuXHRcdGlmICggdGhpcy5fZGVwZW5kZW5jeUNvdW50ID09IDApXG5cdFx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuU1RBVEVfQ09NUExFVEU7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfaVJlc29sdmVEZXBlbmRlbmN5RmFpbHVyZShyZXNvdXJjZURlcGVuZGVuY3k6UmVzb3VyY2VEZXBlbmRlbmN5KVxuXHR7XG5cdFx0dGhpcy5fZGVwZW5kZW5jeUNvdW50LS07XG5cblx0XHRpZiAoIHRoaXMuX2RlcGVuZGVuY3lDb3VudCA9PSAwKVxuXHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLlNUQVRFX0NPTVBMRVRFO1xuXHR9XG5cblx0cHJpdmF0ZSBwYXJzZUpzb24oICkgOiB2b2lkXG5cdHtcblx0XHRpZiAoSlNPTlRleHR1cmVQYXJzZXIuc3VwcG9ydHNEYXRhKHRoaXMuZGF0YSkpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBqc29uOmFueSA9IEpTT04ucGFyc2UodGhpcy5kYXRhKTtcblx0XHRcdFx0dmFyIGRhdGE6QXJyYXk8YW55PiA9IDxBcnJheTxhbnk+PiBqc29uLmRhdGE7XG5cblx0XHRcdFx0dmFyIHJlYzphbnk7XG5cdFx0XHRcdHZhciBycTpVUkxSZXF1ZXN0O1xuXG5cdFx0XHRcdGZvciAodmFyIGMgOiBudW1iZXIgPSAwOyBjIDwgZGF0YS5sZW5ndGg7IGMgKyspIHtcblx0XHRcdFx0XHRyZWMgPSBkYXRhW2NdO1xuXG5cdFx0XHRcdFx0dmFyIHVyaTpzdHJpbmcgPSA8c3RyaW5nPiByZWMuaW1hZ2U7XG5cdFx0XHRcdFx0dmFyIGlkOnN0cmluZyA9IDxzdHJpbmc+IHJlYy5pZDtcblxuXHRcdFx0XHRcdHJxID0gbmV3IFVSTFJlcXVlc3QodXJpKTtcblxuXHRcdFx0XHRcdHRoaXMuX3BBZGREZXBlbmRlbmN5KCdKU09OX0lEXycgKyBpZCwgcnEsIGZhbHNlLCBudWxsLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX2RlcGVuZGVuY3lDb3VudCA9IGRhdGEubGVuZ3RoO1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuU1RBVEVfTE9BRF9JTUFHRVM7XG5cblx0XHRcdFx0dGhpcy5fcFBhdXNlQW5kUmV0cmlldmVEZXBlbmRlbmNpZXMoKTtcblxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuU1RBVEVfQ09NUExFVEU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIF9wUHJvY2VlZFBhcnNpbmcoKSA6IGJvb2xlYW5cblx0e1xuXHRcdGNvbnNvbGUubG9nKCAnSlNPTlRleHR1cmVQYXJzZXIuX3BQcm9jZWVkUGFyc2luZycgLCB0aGlzLl9zdGF0ZSApO1xuXG5cdFx0c3dpdGNoICh0aGlzLl9zdGF0ZSkge1xuXHRcdFx0Y2FzZSB0aGlzLlNUQVRFX1BBUlNFX0RBVEE6XG5cdFx0XHRcdHRoaXMucGFyc2VKc29uKCk7XG5cdFx0XHRcdHJldHVybiBQYXJzZXJCYXNlLk1PUkVfVE9fUEFSU0U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSB0aGlzLlNUQVRFX0xPQURfSU1BR0VTOlxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgdGhpcy5TVEFURV9DT01QTEVURTpcblx0XHRcdFx0cmV0dXJuIFBhcnNlckJhc2UuUEFSU0lOR19ET05FO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRyZXR1cm4gUGFyc2VyQmFzZS5NT1JFX1RPX1BBUlNFO1xuXHR9XG59Il0sInNvdXJjZVJvb3QiOiIuL3Rlc3RzIn0=
