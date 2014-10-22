var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-core/lib/core/partition/EntityNode");

/**
* @class away.partition.LightProbeNode
*/
var LightProbeNode = (function (_super) {
    __extends(LightProbeNode, _super);
    /**
    *
    * @param lightProbe
    */
    function LightProbeNode(lightProbe) {
        _super.call(this, lightProbe);

        this._lightProbe = lightProbe;
    }
    /**
    * @inheritDoc
    */
    LightProbeNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyLightProbe(this._lightProbe);
    };

    /**
    *
    * @returns {boolean}
    */
    LightProbeNode.prototype.isCastingShadow = function () {
        return false;
    };
    return LightProbeNode;
})(EntityNode);

module.exports = LightProbeNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcGFydGl0aW9uL0xpZ2h0UHJvYmVOb2RlLnRzIl0sIm5hbWVzIjpbIkxpZ2h0UHJvYmVOb2RlIiwiTGlnaHRQcm9iZU5vZGUuY29uc3RydWN0b3IiLCJMaWdodFByb2JlTm9kZS5hY2NlcHRUcmF2ZXJzZXIiLCJMaWdodFByb2JlTm9kZS5pc0Nhc3RpbmdTaGFkb3ciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFFQUE2RTs7QUFJN0U7O0VBRUc7QUFDSDtJQUE2QkEsaUNBQVVBO0lBUXRDQTs7O01BREdBO0lBQ0hBLHdCQUFZQSxVQUFrQkE7UUFFN0JDLFdBQU1BLE9BQUFBLFVBQVVBLENBQUNBOztRQUVqQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsVUFBVUE7SUFDOUJBLENBQUNBO0lBS0REOztNQURHQTsrQ0FDSEEsVUFBdUJBLFNBQW9CQTtRQUUxQ0UsSUFBSUEsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDNUJBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQzlDQSxDQUFDQTs7SUFNREY7OztNQURHQTsrQ0FDSEE7UUFFQ0csT0FBT0EsS0FBS0E7SUFDYkEsQ0FBQ0E7SUFDRkgsc0JBQUNBO0FBQURBLENBQUNBLEVBaEM0QixVQUFVLEVBZ0N0Qzs7QUFFRCwrQkFBd0IsQ0FBQSIsImZpbGUiOiJjb3JlL3BhcnRpdGlvbi9MaWdodFByb2JlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLkxpZ2h0UHJvYmVOb2RlXG4gKi9cbmNsYXNzIExpZ2h0UHJvYmVOb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxue1xuXHRwcml2YXRlIF9saWdodFByb2JlOklFbnRpdHk7XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBsaWdodFByb2JlXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihsaWdodFByb2JlOklFbnRpdHkpXG5cdHtcblx0XHRzdXBlcihsaWdodFByb2JlKTtcblxuXHRcdHRoaXMuX2xpZ2h0UHJvYmUgPSBsaWdodFByb2JlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpJQ29sbGVjdG9yKVxuXHR7XG5cdFx0aWYgKHRyYXZlcnNlci5lbnRlck5vZGUodGhpcykpXG5cdFx0XHR0cmF2ZXJzZXIuYXBwbHlMaWdodFByb2JlKHRoaXMuX2xpZ2h0UHJvYmUpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0cHVibGljIGlzQ2FzdGluZ1NoYWRvdygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgPSBMaWdodFByb2JlTm9kZTsiXX0=