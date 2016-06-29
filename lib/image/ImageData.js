"use strict";
var ImageData = (function () {
    function ImageData(width, height) {
        this.width = width;
        this.height = height;
        this.data = new Uint8Array(width * height * 4);
    }
    return ImageData;
}());
exports.ImageData = ImageData;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageData;
