var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DirectionalShadowMapper = require("awayjs-core/lib/materials/shadowmappers/DirectionalShadowMapper");

var NearDirectionalShadowMapper = (function (_super) {
    __extends(NearDirectionalShadowMapper, _super);
    function NearDirectionalShadowMapper(coverageRatio) {
        if (typeof coverageRatio === "undefined") { coverageRatio = .5; }
        _super.call(this);

        this.coverageRatio = coverageRatio;
    }
    Object.defineProperty(NearDirectionalShadowMapper.prototype, "coverageRatio", {
        /**
        * A value between 0 and 1 to indicate the ratio of the view frustum that needs to be covered by the shadow map.
        */
        get: function () {
            return this._coverageRatio;
        },
        set: function (value) {
            if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;

            this._coverageRatio = value;
        },
        enumerable: true,
        configurable: true
    });


    NearDirectionalShadowMapper.prototype.pUpdateDepthProjection = function (viewCamera) {
        var corners = viewCamera.projection.frustumCorners;

        for (var i = 0; i < 12; ++i) {
            var v = corners[i];
            this._pLocalFrustum[i] = v;
            this._pLocalFrustum[i + 12] = v + (corners[i + 12] - v) * this._coverageRatio;
        }

        this.pUpdateProjectionFromFrustumCorners(viewCamera, this._pLocalFrustum, this._pMatrix);
        this._pOverallDepthProjection.matrix = this._pMatrix;
    };
    return NearDirectionalShadowMapper;
})(DirectionalShadowMapper);

module.exports = NearDirectionalShadowMapper;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFscy9zaGFkb3dtYXBwZXJzL05lYXJEaXJlY3Rpb25hbFNoYWRvd01hcHBlci50cyJdLCJuYW1lcyI6WyJOZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIiLCJOZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIuY29uc3RydWN0b3IiLCJOZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIucFVwZGF0ZURlcHRoUHJvamVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0dBQzZHOztBQUU3RztJQUEwQ0EsOENBQXVCQTtJQUloRUEscUNBQVlBLGFBQXlCQTtRQUF6QkMsNENBQUFBLGFBQWFBLEdBQVVBLEVBQUVBO0FBQUFBLFFBRXBDQSxXQUFNQSxLQUFBQSxDQUFDQTs7UUFFUEEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsYUFBYUE7SUFDbkNBLENBQUNBO0lBS0REO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxjQUFjQTtRQUMzQkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBeUJBLEtBQVlBO1lBRXBDQSxJQUFJQSxLQUFLQSxHQUFHQSxDQUFDQTtnQkFDWkEsS0FBS0EsR0FBR0EsQ0FBQ0E7aUJBQU9BLElBQUlBLEtBQUtBLEdBQUdBLENBQUNBO2dCQUM3QkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7O1lBRVhBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLEtBQUtBO1FBQzVCQSxDQUFDQTs7OztBQVRBQTs7SUFXREEsK0RBQUFBLFVBQThCQSxVQUFpQkE7UUFFOUNFLElBQUlBLE9BQU9BLEdBQWlCQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxjQUFjQTs7UUFFaEVBLEtBQUtBLElBQUlBLENBQUNBLEdBQWtCQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTtZQUMzQ0EsSUFBSUEsQ0FBQ0EsR0FBVUEsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO1lBQzFCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxjQUFjQTtTQUMzRUE7O1FBRURBLElBQUlBLENBQUNBLG1DQUFtQ0EsQ0FBQ0EsVUFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDeEZBLElBQUlBLENBQUNBLHdCQUF3QkEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUE7SUFDckRBLENBQUNBO0lBQ0ZGLG1DQUFDQTtBQUFEQSxDQUFDQSxFQXpDeUMsdUJBQXVCLEVBeUNoRTs7QUFFRCw0Q0FBcUMsQ0FBQSIsImZpbGUiOiJtYXRlcmlhbHMvc2hhZG93bWFwcGVycy9OZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBEaXJlY3Rpb25hbFNoYWRvd01hcHBlclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbWF0ZXJpYWxzL3NoYWRvd21hcHBlcnMvRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXJcIik7XG5cbmNsYXNzIE5lYXJEaXJlY3Rpb25hbFNoYWRvd01hcHBlciBleHRlbmRzIERpcmVjdGlvbmFsU2hhZG93TWFwcGVyXG57XG5cdHByaXZhdGUgX2NvdmVyYWdlUmF0aW86bnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKGNvdmVyYWdlUmF0aW86bnVtYmVyID0gLjUpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5jb3ZlcmFnZVJhdGlvID0gY292ZXJhZ2VSYXRpbztcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHZhbHVlIGJldHdlZW4gMCBhbmQgMSB0byBpbmRpY2F0ZSB0aGUgcmF0aW8gb2YgdGhlIHZpZXcgZnJ1c3R1bSB0aGF0IG5lZWRzIHRvIGJlIGNvdmVyZWQgYnkgdGhlIHNoYWRvdyBtYXAuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvdmVyYWdlUmF0aW8oKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jb3ZlcmFnZVJhdGlvO1xuXHR9XG5cblx0cHVibGljIHNldCBjb3ZlcmFnZVJhdGlvKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA+IDEpXG5cdFx0XHR2YWx1ZSA9IDE7IGVsc2UgaWYgKHZhbHVlIDwgMClcblx0XHRcdHZhbHVlID0gMDtcblxuXHRcdHRoaXMuX2NvdmVyYWdlUmF0aW8gPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyBwVXBkYXRlRGVwdGhQcm9qZWN0aW9uKHZpZXdDYW1lcmE6Q2FtZXJhKVxuXHR7XG5cdFx0dmFyIGNvcm5lcnM6QXJyYXk8bnVtYmVyPiA9IHZpZXdDYW1lcmEucHJvamVjdGlvbi5mcnVzdHVtQ29ybmVycztcblxuXHRcdGZvciAodmFyIGk6bnVtYmVyIC8qaW50Ki8gPSAwOyBpIDwgMTI7ICsraSkge1xuXHRcdFx0dmFyIHY6bnVtYmVyID0gY29ybmVyc1tpXTtcblx0XHRcdHRoaXMuX3BMb2NhbEZydXN0dW1baV0gPSB2O1xuXHRcdFx0dGhpcy5fcExvY2FsRnJ1c3R1bVtpICsgMTJdID0gdiArIChjb3JuZXJzW2kgKyAxMl0gLSB2KSp0aGlzLl9jb3ZlcmFnZVJhdGlvO1xuXHRcdH1cblxuXHRcdHRoaXMucFVwZGF0ZVByb2plY3Rpb25Gcm9tRnJ1c3R1bUNvcm5lcnModmlld0NhbWVyYSwgdGhpcy5fcExvY2FsRnJ1c3R1bSwgdGhpcy5fcE1hdHJpeCk7XG5cdFx0dGhpcy5fcE92ZXJhbGxEZXB0aFByb2plY3Rpb24ubWF0cml4ID0gdGhpcy5fcE1hdHJpeDtcblx0fVxufVxuXG5leHBvcnQgPSBOZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXI7Il19