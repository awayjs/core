"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Sampler2D_1 = require("../image/Sampler2D");
var Rectangle_1 = require("../geom/Rectangle");
var URLLoaderDataFormat_1 = require("../net/URLLoaderDataFormat");
var URLRequest_1 = require("../net/URLRequest");
var ParserBase_1 = require("../parsers/ParserBase");
var ParserUtils_1 = require("../parsers/ParserUtils");
var XmlUtils_1 = require("../utils/XmlUtils");
/**
 * TextureAtlasParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
 * a loader object, it wraps it in a BitmapImage2DResource so resource management can happen consistently without
 * exception cases.
 */
var TextureAtlasParser = (function (_super) {
    __extends(TextureAtlasParser, _super);
    /**
     * Creates a new TextureAtlasParser object.
     * @param uri The url or id of the data or file to be parsed.
     * @param extra The holder for extra contextual data that the parser might need.
     */
    function TextureAtlasParser() {
        _super.call(this, URLLoaderDataFormat_1.URLLoaderDataFormat.TEXT);
        this._parseState = 0;
    }
    /**
     * Indicates whether or not a given file extension is supported by the parser.
     * @param extension The file extension of a potential file to be parsed.
     * @return Whether or not the given file type is supported.
     */
    TextureAtlasParser.supportsType = function (extension) {
        extension = extension.toLowerCase();
        return extension == "xml";
    };
    /**
     * Tests whether a data block can be parsed by the parser.
     * @param data The data block to potentially be parsed.
     * @return Whether or not the given data is supported.
     */
    TextureAtlasParser.supportsData = function (data) {
        try {
            var content = ParserUtils_1.ParserUtils.toString(data);
            if (content.indexOf("TextureAtlas") != -1 || content.indexOf("textureatlas") != -1)
                return true;
            return false;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * @inheritDoc
     */
    TextureAtlasParser.prototype._iResolveDependency = function (resourceDependency) {
        if (resourceDependency.assets.length) {
            this._imageData = resourceDependency.assets[0];
            this._pFinalizeAsset(this._imageData);
            this._parseState = TextureAtlasParserState.PARSE_SUBTEXTURES;
        }
        else {
            this._parseState = TextureAtlasParserState.PARSE_COMPLETE;
        }
    };
    /**
     * @inheritDoc
     */
    TextureAtlasParser.prototype._iResolveDependencyFailure = function (resourceDependency) {
        this._parseState = TextureAtlasParserState.PARSE_COMPLETE;
    };
    /**
     * @inheritDoc
     */
    TextureAtlasParser.prototype._pProceedParsing = function () {
        var nodes;
        switch (this._parseState) {
            case TextureAtlasParserState.PARSE_XML:
                try {
                    this._doc = XmlUtils_1.XmlUtils.getChildrenWithTag(XmlUtils_1.XmlUtils.strToXml(this._pGetTextData()), "TextureAtlas")[0];
                    this._imagePath = XmlUtils_1.XmlUtils.readAttributeValue(this._doc, "imagePath");
                    this._subTextureNodes = XmlUtils_1.XmlUtils.getChildrenWithTag(this._doc, "SubTexture");
                    this._parseState = TextureAtlasParserState.PARSE_IMAGE;
                }
                catch (Error) {
                    return ParserBase_1.ParserBase.PARSING_DONE;
                }
                break;
            case TextureAtlasParserState.PARSE_IMAGE:
                if (this._imagePath) {
                    this._pAddDependency(this._imagePath, new URLRequest_1.URLRequest(this._imagePath));
                    this._pPauseAndRetrieveDependencies();
                }
                else {
                    return ParserBase_1.ParserBase.PARSING_DONE;
                }
                break;
            case TextureAtlasParserState.PARSE_SUBTEXTURES:
                var sampler;
                var element;
                var x;
                var y;
                var width;
                var height;
                var len = this._subTextureNodes.length;
                for (var i = 0; i < len; i++) {
                    element = this._subTextureNodes[i];
                    sampler = new Sampler2D_1.Sampler2D();
                    //setup subtexture rect
                    x = XmlUtils_1.XmlUtils.readAttributeValue(element, "x");
                    y = XmlUtils_1.XmlUtils.readAttributeValue(element, "y");
                    width = XmlUtils_1.XmlUtils.readAttributeValue(element, "width");
                    height = XmlUtils_1.XmlUtils.readAttributeValue(element, "height");
                    if (x || y || width || height)
                        sampler.imageRect = new Rectangle_1.Rectangle(parseInt(x) / this._imageData.width, parseInt(y) / this._imageData.height, parseInt(width) / this._imageData.width, parseInt(height) / this._imageData.height);
                    //setup frame rect
                    x = XmlUtils_1.XmlUtils.readAttributeValue(element, "frameX");
                    y = XmlUtils_1.XmlUtils.readAttributeValue(element, "frameY");
                    width = XmlUtils_1.XmlUtils.readAttributeValue(element, "frameWidth");
                    height = XmlUtils_1.XmlUtils.readAttributeValue(element, "frameHeight");
                    if (x || y || width || height)
                        sampler.frameRect = new Rectangle_1.Rectangle(parseInt(x), parseInt(y), parseInt(width), parseInt(height));
                    this._pFinalizeAsset(sampler, XmlUtils_1.XmlUtils.readAttributeValue(element, "name"));
                }
                this._parseState = TextureAtlasParserState.PARSE_COMPLETE;
                break;
            case TextureAtlasParserState.PARSE_COMPLETE:
                return ParserBase_1.ParserBase.PARSING_DONE;
        }
        return ParserBase_1.ParserBase.MORE_TO_PARSE;
    };
    return TextureAtlasParser;
}(ParserBase_1.ParserBase));
exports.TextureAtlasParser = TextureAtlasParser;
var TextureAtlasParserState = (function () {
    function TextureAtlasParserState() {
    }
    TextureAtlasParserState.PARSE_XML = 0;
    TextureAtlasParserState.PARSE_IMAGE = 1;
    TextureAtlasParserState.PARSE_SUBTEXTURES = 2;
    TextureAtlasParserState.PARSE_COMPLETE = 3;
    return TextureAtlasParserState;
}());
exports.TextureAtlasParserState = TextureAtlasParserState;
