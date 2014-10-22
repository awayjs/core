var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NullBounds = require("awayjs-core/lib/bounds/NullBounds");
var LightBase = require("awayjs-core/lib/core/base/LightBase");

var LightProbeNode = require("awayjs-core/lib/core/partition/LightProbeNode");

var Error = require("awayjs-core/lib/errors/Error");

var LightProbe = (function (_super) {
    __extends(LightProbe, _super);
    function LightProbe(diffuseMap, specularMap) {
        if (typeof specularMap === "undefined") { specularMap = null; }
        _super.call(this);

        this._pIsEntity = true;

        this._diffuseMap = diffuseMap;
        this._specularMap = specularMap;
    }
    Object.defineProperty(LightProbe.prototype, "diffuseMap", {
        get: function () {
            return this._diffuseMap;
        },
        set: function (value) {
            this._diffuseMap = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LightProbe.prototype, "specularMap", {
        get: function () {
            return this._specularMap;
        },
        set: function (value) {
            this._specularMap = value;
        },
        enumerable: true,
        configurable: true
    });


    /**
    * @protected
    */
    LightProbe.prototype.pCreateEntityPartitionNode = function () {
        return new LightProbeNode(this);
    };

    //@override
    LightProbe.prototype.pUpdateBounds = function () {
        this._pBoundsInvalid = false;
    };

    //@override
    LightProbe.prototype.pCreateDefaultBoundingVolume = function () {
        return new NullBounds();
    };

    //@override
    LightProbe.prototype.iGetObjectProjectionMatrix = function (entity, camera, target) {
        if (typeof target === "undefined") { target = null; }
        throw new Error("Object projection matrices are not supported for LightProbe objects!");
    };

    LightProbe.prototype._iCollectRenderables = function (renderer) {
        //nothing to do here
    };
    return LightProbe;
})(LightBase);

module.exports = LightProbe;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL0xpZ2h0UHJvYmUudHMiXSwibmFtZXMiOlsiTGlnaHRQcm9iZSIsIkxpZ2h0UHJvYmUuY29uc3RydWN0b3IiLCJMaWdodFByb2JlLnBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlIiwiTGlnaHRQcm9iZS5wVXBkYXRlQm91bmRzIiwiTGlnaHRQcm9iZS5wQ3JlYXRlRGVmYXVsdEJvdW5kaW5nVm9sdW1lIiwiTGlnaHRQcm9iZS5pR2V0T2JqZWN0UHJvamVjdGlvbk1hdHJpeCIsIkxpZ2h0UHJvYmUuX2lDb2xsZWN0UmVuZGVyYWJsZXMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDZEQUNxRTtBQUNyRSw4REFBc0U7O0FBSXRFLDZFQUFvRjs7QUFJcEYsbURBQTREOztBQUc1RDtJQUF5QkEsNkJBQVNBO0lBS2pDQSxvQkFBWUEsVUFBMEJBLEVBQUVBLFdBQWtDQTtRQUFsQ0MsMENBQUFBLFdBQVdBLEdBQW1CQSxJQUFJQTtBQUFBQSxRQUV6RUEsV0FBTUEsS0FBQUEsQ0FBQ0E7O1FBRVBBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBOztRQUV0QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsVUFBVUE7UUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFdBQVdBO0lBQ2hDQSxDQUFDQTtJQUVERDtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxXQUFXQTtRQUN4QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBc0JBLEtBQXFCQTtZQUUxQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0E7UUFDekJBLENBQUNBOzs7O0FBTEFBOztJQU9EQTtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQTtRQUN6QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBdUJBLEtBQXFCQTtZQUUzQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsS0FBS0E7UUFDMUJBLENBQUNBOzs7O0FBTEFBOztJQVVEQTs7TUFER0E7c0RBQ0hBO1FBRUNFLE9BQU9BLElBQUlBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBO0lBQ2hDQSxDQUFDQTs7SUFHREYsV0FEV0E7eUNBQ1hBO1FBRUNHLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLEtBQUtBO0lBQzdCQSxDQUFDQTs7SUFHREgsV0FEV0E7d0RBQ1hBO1FBRUNJLE9BQU9BLElBQUlBLFVBQVVBLENBQUNBLENBQUNBO0lBQ3hCQSxDQUFDQTs7SUFHREosV0FEV0E7c0RBQ1hBLFVBQWtDQSxNQUFjQSxFQUFFQSxNQUFhQSxFQUFFQSxNQUFzQkE7UUFBdEJLLHFDQUFBQSxNQUFNQSxHQUFZQSxJQUFJQTtBQUFBQSxRQUV0RkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esc0VBQXNFQSxDQUFDQTtJQUN4RkEsQ0FBQ0E7O0lBRURMLDRDQUFBQSxVQUE0QkEsUUFBa0JBO1FBRTdDTSxvQkFBb0JBO0lBQ3JCQSxDQUFDQTtJQUNGTixrQkFBQ0E7QUFBREEsQ0FBQ0EsRUFqRXdCLFNBQVMsRUFpRWpDOztBQUVELDJCQUFvQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL0xpZ2h0UHJvYmUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm91bmRpbmdWb2x1bWVCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9Cb3VuZGluZ1ZvbHVtZUJhc2VcIik7XG5pbXBvcnQgTnVsbEJvdW5kc1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYm91bmRzL051bGxCb3VuZHNcIik7XG5pbXBvcnQgTGlnaHRCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvTGlnaHRCYXNlXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBMaWdodFByb2JlTm9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcGFydGl0aW9uL0xpZ2h0UHJvYmVOb2RlXCIpO1xuaW1wb3J0IElSZW5kZXJlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IEVycm9yXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcbmltcG9ydCBDdWJlVGV4dHVyZUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9DdWJlVGV4dHVyZUJhc2VcIik7XG5cbmNsYXNzIExpZ2h0UHJvYmUgZXh0ZW5kcyBMaWdodEJhc2UgaW1wbGVtZW50cyBJRW50aXR5XG57XG5cdHByaXZhdGUgX2RpZmZ1c2VNYXA6Q3ViZVRleHR1cmVCYXNlO1xuXHRwcml2YXRlIF9zcGVjdWxhck1hcDpDdWJlVGV4dHVyZUJhc2U7XG5cblx0Y29uc3RydWN0b3IoZGlmZnVzZU1hcDpDdWJlVGV4dHVyZUJhc2UsIHNwZWN1bGFyTWFwOkN1YmVUZXh0dXJlQmFzZSA9IG51bGwpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuX2RpZmZ1c2VNYXAgPSBkaWZmdXNlTWFwO1xuXHRcdHRoaXMuX3NwZWN1bGFyTWFwID0gc3BlY3VsYXJNYXA7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGRpZmZ1c2VNYXAoKTpDdWJlVGV4dHVyZUJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kaWZmdXNlTWFwO1xuXHR9XG5cblx0cHVibGljIHNldCBkaWZmdXNlTWFwKHZhbHVlOkN1YmVUZXh0dXJlQmFzZSlcblx0e1xuXHRcdHRoaXMuX2RpZmZ1c2VNYXAgPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgc3BlY3VsYXJNYXAoKTpDdWJlVGV4dHVyZUJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zcGVjdWxhck1hcDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc3BlY3VsYXJNYXAodmFsdWU6Q3ViZVRleHR1cmVCYXNlKVxuXHR7XG5cdFx0dGhpcy5fc3BlY3VsYXJNYXAgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTpFbnRpdHlOb2RlXG5cdHtcblx0XHRyZXR1cm4gbmV3IExpZ2h0UHJvYmVOb2RlKHRoaXMpO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIHBVcGRhdGVCb3VuZHMoKVxuXHR7XG5cdFx0dGhpcy5fcEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBwQ3JlYXRlRGVmYXVsdEJvdW5kaW5nVm9sdW1lKCk6Qm91bmRpbmdWb2x1bWVCYXNlXG5cdHtcblx0XHRyZXR1cm4gbmV3IE51bGxCb3VuZHMoKTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBpR2V0T2JqZWN0UHJvamVjdGlvbk1hdHJpeChlbnRpdHk6SUVudGl0eSwgY2FtZXJhOkNhbWVyYSwgdGFyZ2V0Ok1hdHJpeDNEID0gbnVsbCk6TWF0cml4M0Rcblx0e1xuXHRcdHRocm93IG5ldyBFcnJvcihcIk9iamVjdCBwcm9qZWN0aW9uIG1hdHJpY2VzIGFyZSBub3Qgc3VwcG9ydGVkIGZvciBMaWdodFByb2JlIG9iamVjdHMhXCIpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyOklSZW5kZXJlcilcblx0e1xuXHRcdC8vbm90aGluZyB0byBkbyBoZXJlXG5cdH1cbn1cblxuZXhwb3J0ID0gTGlnaHRQcm9iZTsiXX0=