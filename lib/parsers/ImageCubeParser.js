"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BitmapImageCube_1 = require("../image/BitmapImageCube");
var URLLoaderDataFormat_1 = require("../net/URLLoaderDataFormat");
var URLRequest_1 = require("../net/URLRequest");
var ParserBase_1 = require("../parsers/ParserBase");
/**
 * ImageCubeParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
 * a loader object, it wraps it in a BitmapImage2DResource so resource management can happen consistently without
 * exception cases.
 */
var ImageCubeParser = (function (_super) {
    __extends(ImageCubeParser, _super);
    /**
     * Creates a new ImageCubeParser object.
     * @param uri The url or id of the data or file to be parsed.
     * @param extra The holder for extra contextual data that the parser might need.
     */
    function ImageCubeParser() {
        _super.call(this, URLLoaderDataFormat_1.URLLoaderDataFormat.TEXT);
    }
    /**
     * Indicates whether or not a given file extension is supported by the parser.
     * @param extension The file extension of a potential file to be parsed.
     * @return Whether or not the given file type is supported.
     */
    ImageCubeParser.supportsType = function (extension) {
        extension = extension.toLowerCase();
        return extension == "cube";
    };
    /**
     * Tests whether a data block can be parsed by the parser.
     * @param data The data block to potentially be parsed.
     * @return Whether or not the given data is supported.
     */
    ImageCubeParser.supportsData = function (data) {
        try {
            var obj = JSON.parse(data);
            if (obj)
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
    ImageCubeParser.prototype._iResolveDependency = function (resourceDependency) {
    };
    /**
     * @inheritDoc
     */
    ImageCubeParser.prototype._iResolveDependencyFailure = function (resourceDependency) {
    };
    /**
     * @inheritDoc
     */
    ImageCubeParser.prototype._pProceedParsing = function () {
        if (this._imgDependencyDictionary != null) {
            var asset = new BitmapImageCube_1.BitmapImageCube(this._getBitmapImage2D(ImageCubeParser.posX).width);
            asset.draw(BitmapImageCube_1.BitmapImageCube.posX, this._getBitmapImage2D(ImageCubeParser.posX));
            asset.draw(BitmapImageCube_1.BitmapImageCube.negX, this._getBitmapImage2D(ImageCubeParser.negX));
            asset.draw(BitmapImageCube_1.BitmapImageCube.posY, this._getBitmapImage2D(ImageCubeParser.posY));
            asset.draw(BitmapImageCube_1.BitmapImageCube.negY, this._getBitmapImage2D(ImageCubeParser.negY));
            asset.draw(BitmapImageCube_1.BitmapImageCube.posZ, this._getBitmapImage2D(ImageCubeParser.posZ));
            asset.draw(BitmapImageCube_1.BitmapImageCube.negZ, this._getBitmapImage2D(ImageCubeParser.negZ));
            //clear dictionary
            this._imgDependencyDictionary = null;
            asset.name = this._iFileName;
            this._pFinalizeAsset(asset, this._iFileName);
            return ParserBase_1.ParserBase.PARSING_DONE;
        }
        try {
            var json = JSON.parse(this.data);
            var data = json.data;
            var rec;
            if (data.length != 6)
                this._pDieWithError('ImageCubeParser: Error - cube texture should have exactly 6 images');
            if (json) {
                this._imgDependencyDictionary = new Object();
                for (var c = 0; c < data.length; c++) {
                    rec = data[c];
                    this._imgDependencyDictionary[rec.id] = this._pAddDependency(rec.id, new URLRequest_1.URLRequest(rec.image.toString()));
                }
                if (!this._validateCubeData()) {
                    this._pDieWithError("ImageCubeParser: JSON data error - cubes require id of:   \n" + ImageCubeParser.posX + ', ' + ImageCubeParser.negX + ',  \n' + ImageCubeParser.posY + ', ' + ImageCubeParser.negY + ',  \n' + ImageCubeParser.posZ + ', ' + ImageCubeParser.negZ);
                    return ParserBase_1.ParserBase.PARSING_DONE;
                }
                this._pPauseAndRetrieveDependencies();
                return ParserBase_1.ParserBase.MORE_TO_PARSE;
            }
        }
        catch (e) {
            this._pDieWithError('CubeTexturePaser Error parsing JSON');
        }
        return ParserBase_1.ParserBase.PARSING_DONE;
    };
    ImageCubeParser.prototype._validateCubeData = function () {
        return (this._imgDependencyDictionary[ImageCubeParser.posX] != null && this._imgDependencyDictionary[ImageCubeParser.negX] != null && this._imgDependencyDictionary[ImageCubeParser.posY] != null && this._imgDependencyDictionary[ImageCubeParser.negY] != null && this._imgDependencyDictionary[ImageCubeParser.posZ] != null && this._imgDependencyDictionary[ImageCubeParser.negZ] != null);
    };
    ImageCubeParser.prototype._getBitmapImage2D = function (name) {
        var dependency = this._imgDependencyDictionary[name];
        if (dependency)
            return dependency.assets[0];
        return null;
    };
    ImageCubeParser.posX = 'posX';
    ImageCubeParser.negX = 'negX';
    ImageCubeParser.posY = 'posY';
    ImageCubeParser.negY = 'negY';
    ImageCubeParser.posZ = 'posZ';
    ImageCubeParser.negZ = 'negZ';
    return ImageCubeParser;
}(ParserBase_1.ParserBase));
exports.ImageCubeParser = ImageCubeParser;
