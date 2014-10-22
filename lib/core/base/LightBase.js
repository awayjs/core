var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObjectContainer = require("awayjs-core/lib/containers/DisplayObjectContainer");
var AssetType = require("awayjs-core/lib/core/library/AssetType");

var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var LightEvent = require("awayjs-core/lib/events/LightEvent");

var LightBase = (function (_super) {
    __extends(LightBase, _super);
    function LightBase() {
        _super.call(this);
        this._color = 0xffffff;
        this._colorR = 1;
        this._colorG = 1;
        this._colorB = 1;
        this._ambientColor = 0xffffff;
        this._ambient = 0;
        this._iAmbientR = 0;
        this._iAmbientG = 0;
        this._iAmbientB = 0;
        this._specular = 1;
        this._iSpecularR = 1;
        this._iSpecularG = 1;
        this._iSpecularB = 1;
        this._diffuse = 1;
        this._iDiffuseR = 1;
        this._iDiffuseG = 1;
        this._iDiffuseB = 1;
        this._castsShadows = false;
    }
    Object.defineProperty(LightBase.prototype, "castsShadows", {
        get: function () {
            return this._castsShadows;
        },
        set: function (value) {
            if (this._castsShadows == value)
                return;

            this._castsShadows = value;

            if (value) {
                if (this._shadowMapper == null)
                    this._shadowMapper = this.pCreateShadowMapper();

                this._shadowMapper.light = this;
            } else {
                this._shadowMapper.dispose();
                this._shadowMapper = null;
            }

            //*/
            this.dispatchEvent(new LightEvent(LightEvent.CASTS_SHADOW_CHANGE));
        },
        enumerable: true,
        configurable: true
    });


    LightBase.prototype.pCreateShadowMapper = function () {
        throw new AbstractMethodError();
    };

    Object.defineProperty(LightBase.prototype, "specular", {
        get: function () {
            return this._specular;
        },
        set: function (value) {
            if (value < 0)
                value = 0;

            this._specular = value;
            this.updateSpecular();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LightBase.prototype, "diffuse", {
        get: function () {
            return this._diffuse;
        },
        set: function (value) {
            if (value < 0)
                value = 0;

            this._diffuse = value;
            this.updateDiffuse();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LightBase.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
            this._colorR = ((this._color >> 16) & 0xff) / 0xff;
            this._colorG = ((this._color >> 8) & 0xff) / 0xff;
            this._colorB = (this._color & 0xff) / 0xff;

            this.updateDiffuse();
            this.updateSpecular();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LightBase.prototype, "ambient", {
        get: function () {
            return this._ambient;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            else if (value > 1)
                value = 1;

            this._ambient = value;
            this.updateAmbient();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LightBase.prototype, "ambientColor", {
        get: function () {
            return this._ambientColor;
        },
        set: function (value) {
            this._ambientColor = value;
            this.updateAmbient();
        },
        enumerable: true,
        configurable: true
    });


    LightBase.prototype.updateAmbient = function () {
        this._iAmbientR = ((this._ambientColor >> 16) & 0xff) / 0xff * this._ambient;
        this._iAmbientG = ((this._ambientColor >> 8) & 0xff) / 0xff * this._ambient;
        this._iAmbientB = (this._ambientColor & 0xff) / 0xff * this._ambient;
    };

    LightBase.prototype.iGetObjectProjectionMatrix = function (entity, camera, target) {
        if (typeof target === "undefined") { target = null; }
        throw new AbstractMethodError();
    };

    Object.defineProperty(LightBase.prototype, "assetType", {
        //@override
        get: function () {
            return AssetType.LIGHT;
        },
        enumerable: true,
        configurable: true
    });

    LightBase.prototype.updateSpecular = function () {
        this._iSpecularR = this._colorR * this._specular;
        this._iSpecularG = this._colorG * this._specular;
        this._iSpecularB = this._colorB * this._specular;
    };

    LightBase.prototype.updateDiffuse = function () {
        this._iDiffuseR = this._colorR * this._diffuse;
        this._iDiffuseG = this._colorG * this._diffuse;
        this._iDiffuseB = this._colorB * this._diffuse;
    };

    Object.defineProperty(LightBase.prototype, "shadowMapper", {
        get: function () {
            return this._shadowMapper;
        },
        set: function (value) {
            this._shadowMapper = value;
            this._shadowMapper.light = this;
        },
        enumerable: true,
        configurable: true
    });

    return LightBase;
})(DisplayObjectContainer);

module.exports = LightBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9MaWdodEJhc2UudHMiXSwibmFtZXMiOlsiTGlnaHRCYXNlIiwiTGlnaHRCYXNlLmNvbnN0cnVjdG9yIiwiTGlnaHRCYXNlLnBDcmVhdGVTaGFkb3dNYXBwZXIiLCJMaWdodEJhc2UudXBkYXRlQW1iaWVudCIsIkxpZ2h0QmFzZS5pR2V0T2JqZWN0UHJvamVjdGlvbk1hdHJpeCIsIkxpZ2h0QmFzZS51cGRhdGVTcGVjdWxhciIsIkxpZ2h0QmFzZS51cGRhdGVEaWZmdXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5RkFBNkY7QUFDN0YsaUVBQXdFOztBQUl4RSwrRUFBb0Y7QUFDcEYsNkRBQW9FOztBQUdwRTtJQUF3QkEsNEJBQXNCQTtJQTJCN0NBO1FBRUNDLFdBQU1BLEtBQUFBLENBQUNBO1FBM0JSQSxLQUFRQSxNQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtRQUNqQ0EsS0FBUUEsT0FBT0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLEtBQVFBLE9BQU9BLEdBQVVBLENBQUNBLENBQUNBO1FBQzNCQSxLQUFRQSxPQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUUzQkEsS0FBUUEsYUFBYUEsR0FBVUEsUUFBUUEsQ0FBQ0E7UUFDeENBLEtBQVFBLFFBQVFBLEdBQVVBLENBQUNBLENBQUNBO1FBQzVCQSxLQUFPQSxVQUFVQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUM3QkEsS0FBT0EsVUFBVUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLEtBQU9BLFVBQVVBLEdBQVVBLENBQUNBLENBQUNBO1FBRTdCQSxLQUFRQSxTQUFTQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUM3QkEsS0FBT0EsV0FBV0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLEtBQU9BLFdBQVdBLEdBQVVBLENBQUNBLENBQUNBO1FBQzlCQSxLQUFPQSxXQUFXQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUU5QkEsS0FBUUEsUUFBUUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLEtBQU9B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Q0EsQ0FBQ0E7Ozs7QUFOQUE7SUFPRkEsaUJBQUNBO0FBQURBLENBQUNBLEVBL0t1QixzQkFBc0IsRUErSzdDOztBQUVELDBCQUFtQixDQUFBIiwiZmlsZSI6ImNvcmUvYmFzZS9MaWdodEJhc2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lclwiKTtcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcbmltcG9ydCBMaWdodEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0xpZ2h0RXZlbnRcIik7XG5pbXBvcnQgU2hhZG93TWFwcGVyQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9tYXRlcmlhbHMvc2hhZG93bWFwcGVycy9TaGFkb3dNYXBwZXJCYXNlXCIpO1xuXG5jbGFzcyBMaWdodEJhc2UgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG57XG5cdHByaXZhdGUgX2NvbG9yOm51bWJlciA9IDB4ZmZmZmZmO1xuXHRwcml2YXRlIF9jb2xvclI6bnVtYmVyID0gMTtcblx0cHJpdmF0ZSBfY29sb3JHOm51bWJlciA9IDE7XG5cdHByaXZhdGUgX2NvbG9yQjpudW1iZXIgPSAxO1xuXG5cdHByaXZhdGUgX2FtYmllbnRDb2xvcjpudW1iZXIgPSAweGZmZmZmZjtcblx0cHJpdmF0ZSBfYW1iaWVudDpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX2lBbWJpZW50UjpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX2lBbWJpZW50RzpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX2lBbWJpZW50QjpudW1iZXIgPSAwO1xuXG5cdHByaXZhdGUgX3NwZWN1bGFyOm51bWJlciA9IDE7XG5cdHB1YmxpYyBfaVNwZWN1bGFyUjpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX2lTcGVjdWxhckc6bnVtYmVyID0gMTtcblx0cHVibGljIF9pU3BlY3VsYXJCOm51bWJlciA9IDE7XG5cblx0cHJpdmF0ZSBfZGlmZnVzZTpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX2lEaWZmdXNlUjpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX2lEaWZmdXNlRzpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX2lEaWZmdXNlQjpudW1iZXIgPSAxO1xuXG5cdHByaXZhdGUgX2Nhc3RzU2hhZG93czpib29sZWFuID0gZmFsc2U7XG5cblx0cHJpdmF0ZSBfc2hhZG93TWFwcGVyOlNoYWRvd01hcHBlckJhc2U7XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgY2FzdHNTaGFkb3dzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2Nhc3RzU2hhZG93cztcblx0fVxuXG5cdHB1YmxpYyBzZXQgY2FzdHNTaGFkb3dzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fY2FzdHNTaGFkb3dzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fY2FzdHNTaGFkb3dzID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLl9zaGFkb3dNYXBwZXIgPT0gbnVsbClcblx0XHRcdFx0dGhpcy5fc2hhZG93TWFwcGVyID0gdGhpcy5wQ3JlYXRlU2hhZG93TWFwcGVyKCk7XG5cblx0XHRcdHRoaXMuX3NoYWRvd01hcHBlci5saWdodCA9IHRoaXM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3NoYWRvd01hcHBlci5kaXNwb3NlKCk7XG5cdFx0XHR0aGlzLl9zaGFkb3dNYXBwZXIgPSBudWxsO1xuXHRcdH1cblx0XHQvLyovXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBMaWdodEV2ZW50KExpZ2h0RXZlbnQuQ0FTVFNfU0hBRE9XX0NIQU5HRSkpO1xuXHR9XG5cblx0cHVibGljIHBDcmVhdGVTaGFkb3dNYXBwZXIoKTpTaGFkb3dNYXBwZXJCYXNlXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIGdldCBzcGVjdWxhcigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NwZWN1bGFyO1xuXHR9XG5cblx0cHVibGljIHNldCBzcGVjdWxhcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPCAwKVxuXHRcdFx0dmFsdWUgPSAwO1xuXG5cdFx0dGhpcy5fc3BlY3VsYXIgPSB2YWx1ZTtcblx0XHR0aGlzLnVwZGF0ZVNwZWN1bGFyKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGRpZmZ1c2UoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kaWZmdXNlO1xuXHR9XG5cblx0cHVibGljIHNldCBkaWZmdXNlKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA8IDApXG5cdFx0XHR2YWx1ZSA9IDA7XG5cblx0XHR0aGlzLl9kaWZmdXNlID0gdmFsdWU7XG5cdFx0dGhpcy51cGRhdGVEaWZmdXNlKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGNvbG9yKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY29sb3I7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX2NvbG9yID0gdmFsdWU7XG5cdFx0dGhpcy5fY29sb3JSID0gKCh0aGlzLl9jb2xvciA+PiAxNikgJiAweGZmKS8weGZmO1xuXHRcdHRoaXMuX2NvbG9yRyA9ICgodGhpcy5fY29sb3IgPj4gOCkgJiAweGZmKS8weGZmO1xuXHRcdHRoaXMuX2NvbG9yQiA9ICh0aGlzLl9jb2xvciAmIDB4ZmYpLzB4ZmY7XG5cblx0XHR0aGlzLnVwZGF0ZURpZmZ1c2UoKTtcblx0XHR0aGlzLnVwZGF0ZVNwZWN1bGFyKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGFtYmllbnQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbWJpZW50O1xuXHR9XG5cblx0cHVibGljIHNldCBhbWJpZW50KHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA8IDApXG5cdFx0XHR2YWx1ZSA9IDA7XG5cdFx0ZWxzZSBpZiAodmFsdWUgPiAxKVxuXHRcdFx0dmFsdWUgPSAxO1xuXG5cdFx0dGhpcy5fYW1iaWVudCA9IHZhbHVlO1xuXHRcdHRoaXMudXBkYXRlQW1iaWVudCgpO1xuXHR9XG5cblx0cHVibGljIGdldCBhbWJpZW50Q29sb3IoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbWJpZW50Q29sb3I7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGFtYmllbnRDb2xvcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9hbWJpZW50Q29sb3IgPSB2YWx1ZTtcblx0XHR0aGlzLnVwZGF0ZUFtYmllbnQoKTtcblx0fVxuXG5cdHByaXZhdGUgdXBkYXRlQW1iaWVudCgpXG5cdHtcblx0XHR0aGlzLl9pQW1iaWVudFIgPSAoKHRoaXMuX2FtYmllbnRDb2xvciA+PiAxNikgJiAweGZmKS8weGZmKnRoaXMuX2FtYmllbnQ7XG5cdFx0dGhpcy5faUFtYmllbnRHID0gKCh0aGlzLl9hbWJpZW50Q29sb3IgPj4gOCkgJiAweGZmKS8weGZmKnRoaXMuX2FtYmllbnQ7XG5cdFx0dGhpcy5faUFtYmllbnRCID0gKHRoaXMuX2FtYmllbnRDb2xvciAmIDB4ZmYpLzB4ZmYqdGhpcy5fYW1iaWVudDtcblx0fVxuXG5cdHB1YmxpYyBpR2V0T2JqZWN0UHJvamVjdGlvbk1hdHJpeChlbnRpdHk6SUVudGl0eSwgY2FtZXJhOkNhbWVyYSwgdGFyZ2V0Ok1hdHJpeDNEID0gbnVsbCk6TWF0cml4M0Rcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5MSUdIVDtcblx0fVxuXG5cdHByaXZhdGUgdXBkYXRlU3BlY3VsYXIoKVxuXHR7XG5cdFx0dGhpcy5faVNwZWN1bGFyUiA9IHRoaXMuX2NvbG9yUip0aGlzLl9zcGVjdWxhcjtcblx0XHR0aGlzLl9pU3BlY3VsYXJHID0gdGhpcy5fY29sb3JHKnRoaXMuX3NwZWN1bGFyO1xuXHRcdHRoaXMuX2lTcGVjdWxhckIgPSB0aGlzLl9jb2xvckIqdGhpcy5fc3BlY3VsYXI7XG5cdH1cblxuXHRwcml2YXRlIHVwZGF0ZURpZmZ1c2UoKVxuXHR7XG5cdFx0dGhpcy5faURpZmZ1c2VSID0gdGhpcy5fY29sb3JSKnRoaXMuX2RpZmZ1c2U7XG5cdFx0dGhpcy5faURpZmZ1c2VHID0gdGhpcy5fY29sb3JHKnRoaXMuX2RpZmZ1c2U7XG5cdFx0dGhpcy5faURpZmZ1c2VCID0gdGhpcy5fY29sb3JCKnRoaXMuX2RpZmZ1c2U7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHNoYWRvd01hcHBlcigpOlNoYWRvd01hcHBlckJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zaGFkb3dNYXBwZXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNoYWRvd01hcHBlcih2YWx1ZTpTaGFkb3dNYXBwZXJCYXNlKVxuXHR7XG5cdFx0dGhpcy5fc2hhZG93TWFwcGVyID0gdmFsdWU7XG5cdFx0dGhpcy5fc2hhZG93TWFwcGVyLmxpZ2h0ID0gdGhpcztcblx0fVxufVxuXG5leHBvcnQgPSBMaWdodEJhc2U7Il19