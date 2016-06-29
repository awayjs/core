"use strict";
var CPURenderingContext2D_1 = require("../image/CPURenderingContext2D");
var ImageData_1 = require("../image/ImageData");
var CPUCanvas = (function () {
    function CPUCanvas() {
        this.width = 1;
        this.height = 1;
        this.reset();
    }
    CPUCanvas.prototype.getContext = function (contextId) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new CPURenderingContext2D_1.CPURenderingContext2D(this);
    };
    CPUCanvas.prototype.reset = function () {
        if (!this.imageData) {
            this.imageData = new ImageData_1.ImageData(this.width, this.height);
        }
        else {
            this.imageData.width = this.width;
            this.imageData.height = this.height;
            if (this.imageData.data) {
                //this.imageData.data.length = 0;
                this.imageData.data = null;
            }
            this.imageData.data = new Uint8Array(this.width * this.height * 4);
        }
        for (var i = 0; i < this.width * this.height * 4; i += 4) {
            this.imageData.data[i] = 255;
            this.imageData.data[i + 1] = 255;
            this.imageData.data[i + 2] = 255;
            this.imageData.data[i + 3] = 255;
        }
    };
    CPUCanvas.prototype.getImageData = function () {
        if (this.imageData.width != this.width || this.imageData.height != this.height) {
            this.reset();
        }
        return this.imageData;
    };
    return CPUCanvas;
}());
exports.CPUCanvas = CPUCanvas;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CPUCanvas;
