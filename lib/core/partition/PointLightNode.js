var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-core/lib/core/partition/EntityNode");

/**
* @class away.partition.PointLightNode
*/
var PointLightNode = (function (_super) {
    __extends(PointLightNode, _super);
    /**
    *
    * @param pointLight
    */
    function PointLightNode(pointLight) {
        _super.call(this, pointLight);

        this._pointLight = pointLight;
    }
    /**
    * @inheritDoc
    */
    PointLightNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyPointLight(this._pointLight);
    };

    /**
    *
    * @returns {boolean}
    */
    PointLightNode.prototype.isCastingShadow = function () {
        return false;
    };
    return PointLightNode;
})(EntityNode);

module.exports = PointLightNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcGFydGl0aW9uL1BvaW50TGlnaHROb2RlLnRzIl0sIm5hbWVzIjpbIlBvaW50TGlnaHROb2RlIiwiUG9pbnRMaWdodE5vZGUuY29uc3RydWN0b3IiLCJQb2ludExpZ2h0Tm9kZS5hY2NlcHRUcmF2ZXJzZXIiLCJQb2ludExpZ2h0Tm9kZS5pc0Nhc3RpbmdTaGFkb3ciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFFQUM2RTs7QUFJN0U7O0VBRUc7QUFDSDtJQUE2QkEsaUNBQVVBO0lBUXRDQTs7O01BREdBO0lBQ0hBLHdCQUFZQSxVQUFrQkE7UUFFN0JDLFdBQU1BLE9BQUFBLFVBQVVBLENBQUNBOztRQUVqQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsVUFBVUE7SUFDOUJBLENBQUNBO0lBS0REOztNQURHQTsrQ0FDSEEsVUFBdUJBLFNBQW9CQTtRQUUxQ0UsSUFBSUEsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBWUEsSUFBSUEsQ0FBQ0E7WUFDdkNBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQzlDQSxDQUFDQTs7SUFNREY7OztNQURHQTsrQ0FDSEE7UUFFQ0csT0FBT0EsS0FBS0E7SUFDYkEsQ0FBQ0E7SUFDRkgsc0JBQUNBO0FBQURBLENBQUNBLEVBaEM0QixVQUFVLEVBZ0N0Qzs7QUFFRCwrQkFBd0IsQ0FBQSIsImZpbGUiOiJjb3JlL3BhcnRpdGlvbi9Qb2ludExpZ2h0Tm9kZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLlBvaW50TGlnaHROb2RlXG4gKi9cbmNsYXNzIFBvaW50TGlnaHROb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxue1xuXHRwcml2YXRlIF9wb2ludExpZ2h0OklFbnRpdHk7XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludExpZ2h0XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihwb2ludExpZ2h0OklFbnRpdHkpXG5cdHtcblx0XHRzdXBlcihwb2ludExpZ2h0KTtcblxuXHRcdHRoaXMuX3BvaW50TGlnaHQgPSBwb2ludExpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpJQ29sbGVjdG9yKVxuXHR7XG5cdFx0aWYgKHRyYXZlcnNlci5lbnRlck5vZGUoPE5vZGVCYXNlPiB0aGlzKSlcblx0XHRcdHRyYXZlcnNlci5hcHBseVBvaW50TGlnaHQodGhpcy5fcG9pbnRMaWdodCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRwdWJsaWMgaXNDYXN0aW5nU2hhZG93KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCA9IFBvaW50TGlnaHROb2RlOyJdfQ==