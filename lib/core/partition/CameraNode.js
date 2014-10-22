var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-core/lib/core/partition/EntityNode");

/**
* @class away.partition.CameraNode
*/
var CameraNode = (function (_super) {
    __extends(CameraNode, _super);
    function CameraNode(camera) {
        _super.call(this, camera);
    }
    /**
    * @inheritDoc
    */
    CameraNode.prototype.acceptTraverser = function (traverser) {
        // todo: dead end for now, if it has a debug mesh, then sure accept that
    };
    return CameraNode;
})(EntityNode);

module.exports = CameraNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcGFydGl0aW9uL0NhbWVyYU5vZGUudHMiXSwibmFtZXMiOlsiQ2FtZXJhTm9kZSIsIkNhbWVyYU5vZGUuY29uc3RydWN0b3IiLCJDYW1lcmFOb2RlLmFjY2VwdFRyYXZlcnNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUVBQTZFOztBQUk3RTs7RUFFRztBQUNIO0lBQXlCQSw2QkFBVUE7SUFFbENBLG9CQUFZQSxNQUFjQTtRQUV6QkMsV0FBTUEsT0FBQUEsTUFBTUEsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFLREQ7O01BREdBOzJDQUNIQSxVQUF1QkEsU0FBb0JBO1FBRTFDRSx3RUFBd0VBO0lBQ3pFQSxDQUFDQTtJQUNGRixrQkFBQ0E7QUFBREEsQ0FBQ0EsRUFkd0IsVUFBVSxFQWNsQzs7QUFFRCwyQkFBb0IsQ0FBQSIsImZpbGUiOiJjb3JlL3BhcnRpdGlvbi9DYW1lcmFOb2RlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uQ2FtZXJhTm9kZVxuICovXG5jbGFzcyBDYW1lcmFOb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxue1xuXHRjb25zdHJ1Y3RvcihjYW1lcmE6SUVudGl0eSlcblx0e1xuXHRcdHN1cGVyKGNhbWVyYSk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBhY2NlcHRUcmF2ZXJzZXIodHJhdmVyc2VyOklDb2xsZWN0b3IpXG5cdHtcblx0XHQvLyB0b2RvOiBkZWFkIGVuZCBmb3Igbm93LCBpZiBpdCBoYXMgYSBkZWJ1ZyBtZXNoLCB0aGVuIHN1cmUgYWNjZXB0IHRoYXRcblx0fVxufVxuXG5leHBvcnQgPSBDYW1lcmFOb2RlOyJdfQ==