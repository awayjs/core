var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BoundingVolumeBase = require("awayjs-core/lib/bounds/BoundingVolumeBase");

var PlaneClassification = require("awayjs-core/lib/core/geom/PlaneClassification");

var NullBounds = (function (_super) {
    __extends(NullBounds, _super);
    function NullBounds(alwaysIn) {
        if (typeof alwaysIn === "undefined") { alwaysIn = true; }
        _super.call(this);

        this._alwaysIn = alwaysIn;

        this._aabb.width = this._aabb.height = this._aabb.depth = Number.POSITIVE_INFINITY;
        this._aabb.x = this._aabb.y = this._aabb.z = this._alwaysIn ? Number.NEGATIVE_INFINITY / 2 : Number.POSITIVE_INFINITY;
    }
    //@override
    NullBounds.prototype.clone = function () {
        return new NullBounds(this._alwaysIn);
    };

    //@override
    NullBounds.prototype.pCreateBoundingEntity = function () {
        //return this._renderable || new away.primitives.WireframeSphere( 100, 16, 12, 0xffffff, 0.5 );
        return null;
    };

    //@override
    NullBounds.prototype.isInFrustum = function (planes, numPlanes) {
        return this._alwaysIn;
    };

    //		//@override
    //		public fromGeometry(geometry:away.base.Geometry)
    //		{
    //		}
    //@override
    NullBounds.prototype.fromSphere = function (center, radius) {
    };

    //@override
    NullBounds.prototype.fromExtremes = function (minX, minY, minZ, maxX, maxY, maxZ) {
    };

    NullBounds.prototype.classifyToPlane = function (plane) {
        return PlaneClassification.INTERSECT;
    };

    //@override
    NullBounds.prototype.transformFrom = function (bounds, matrix) {
        this._alwaysIn = bounds._alwaysIn;
    };
    return NullBounds;
})(BoundingVolumeBase);

module.exports = NullBounds;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvdW5kcy9OdWxsQm91bmRzLnRzIl0sIm5hbWVzIjpbIk51bGxCb3VuZHMiLCJOdWxsQm91bmRzLmNvbnN0cnVjdG9yIiwiTnVsbEJvdW5kcy5jbG9uZSIsIk51bGxCb3VuZHMucENyZWF0ZUJvdW5kaW5nRW50aXR5IiwiTnVsbEJvdW5kcy5pc0luRnJ1c3R1bSIsIk51bGxCb3VuZHMuZnJvbVNwaGVyZSIsIk51bGxCb3VuZHMuZnJvbUV4dHJlbWVzIiwiTnVsbEJvdW5kcy5jbGFzc2lmeVRvUGxhbmUiLCJOdWxsQm91bmRzLnRyYW5zZm9ybUZyb20iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDZFQUFtRjs7QUFFbkYsa0ZBQXdGOztBQUt4RjtJQUF5QkEsNkJBQWtCQTtJQUkxQ0Esb0JBQVlBLFFBQXVCQTtRQUF2QkMsdUNBQUFBLFFBQVFBLEdBQVdBLElBQUlBO0FBQUFBLFFBRWxDQSxXQUFNQSxLQUFBQSxDQUFDQTs7UUFFUEEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsUUFBUUE7O1FBRXpCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQSxpQkFBaUJBO1FBQ2xGQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFFQSxNQUFNQSxDQUFDQSxpQkFBaUJBLEdBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLGlCQUFpQkE7SUFDbkhBLENBQUNBO0lBR0RELFdBRFdBO2lDQUNYQTtRQUVDRSxPQUFPQSxJQUFJQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtJQUN0Q0EsQ0FBQ0E7O0lBR0RGLFdBRFdBO2lEQUNYQTtRQUVDRywrRkFBK0ZBO1FBQy9GQSxPQUFPQSxJQUFJQTtJQUNaQSxDQUFDQTs7SUFHREgsV0FEV0E7dUNBQ1hBLFVBQW1CQSxNQUFxQkEsRUFBRUEsU0FBZ0JBO1FBRXpESSxPQUFPQSxJQUFJQSxDQUFDQSxTQUFTQTtJQUN0QkEsQ0FBQ0E7O0lBUURKLGVBTmNBO0lBQ2ZBLG9EQUFvREE7SUFDcERBLEtBQUtBO0lBQ0xBLEtBQUtBO0lBRUpBLFdBQVdBO3NDQUNYQSxVQUFrQkEsTUFBZUEsRUFBRUEsTUFBYUE7SUFFaERLLENBQUNBOztJQUdETCxXQURXQTt3Q0FDWEEsVUFBb0JBLElBQVdBLEVBQUVBLElBQVdBLEVBQUVBLElBQVdBLEVBQUVBLElBQVdBLEVBQUVBLElBQVdBLEVBQUVBLElBQVdBO0lBRWhHTSxDQUFDQTs7SUFFRE4sdUNBQUFBLFVBQXVCQSxLQUFhQTtRQUVuQ08sT0FBT0EsbUJBQW1CQSxDQUFDQSxTQUFTQTtJQUNyQ0EsQ0FBQ0E7O0lBR0RQLFdBRFdBO3lDQUNYQSxVQUFxQkEsTUFBeUJBLEVBQUVBLE1BQWVBO1FBRTlEUSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxNQUFvQkEsQ0FBRUEsU0FBU0E7SUFDakRBLENBQUNBO0lBQ0ZSLGtCQUFDQTtBQUFEQSxDQUFDQSxFQTFEd0Isa0JBQWtCLEVBMEQxQzs7QUFFRCwyQkFBb0IsQ0FBQSIsImZpbGUiOiJib3VuZHMvTnVsbEJvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCb3VuZGluZ1ZvbHVtZUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYm91bmRzL0JvdW5kaW5nVm9sdW1lQmFzZVwiKTtcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgUGxhbmVDbGFzc2lmaWNhdGlvblx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUGxhbmVDbGFzc2lmaWNhdGlvblwiKTtcbmltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9QbGFuZTNEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbmNsYXNzIE51bGxCb3VuZHMgZXh0ZW5kcyBCb3VuZGluZ1ZvbHVtZUJhc2Vcbntcblx0cHJpdmF0ZSBfYWx3YXlzSW46Ym9vbGVhbjtcblxuXHRjb25zdHJ1Y3RvcihhbHdheXNJbjpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9hbHdheXNJbiA9IGFsd2F5c0luO1xuXG5cdFx0dGhpcy5fYWFiYi53aWR0aCA9IHRoaXMuX2FhYmIuaGVpZ2h0ID0gdGhpcy5fYWFiYi5kZXB0aCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblx0XHR0aGlzLl9hYWJiLnggPSB0aGlzLl9hYWJiLnkgPSB0aGlzLl9hYWJiLnogPSB0aGlzLl9hbHdheXNJbj8gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZLzIgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgY2xvbmUoKTpCb3VuZGluZ1ZvbHVtZUJhc2Vcblx0e1xuXHRcdHJldHVybiBuZXcgTnVsbEJvdW5kcyh0aGlzLl9hbHdheXNJbik7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgcENyZWF0ZUJvdW5kaW5nRW50aXR5KCk6SUVudGl0eVxuXHR7XG5cdFx0Ly9yZXR1cm4gdGhpcy5fcmVuZGVyYWJsZSB8fCBuZXcgYXdheS5wcmltaXRpdmVzLldpcmVmcmFtZVNwaGVyZSggMTAwLCAxNiwgMTIsIDB4ZmZmZmZmLCAwLjUgKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBpc0luRnJ1c3R1bShwbGFuZXM6QXJyYXk8UGxhbmUzRD4sIG51bVBsYW5lczpudW1iZXIpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbHdheXNJbjtcblx0fVxuXG4vL1x0XHQvL0BvdmVycmlkZVxuLy9cdFx0cHVibGljIGZyb21HZW9tZXRyeShnZW9tZXRyeTphd2F5LmJhc2UuR2VvbWV0cnkpXG4vL1x0XHR7XG4vL1x0XHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIGZyb21TcGhlcmUoY2VudGVyOlZlY3RvcjNELCByYWRpdXM6bnVtYmVyKVxuXHR7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgZnJvbUV4dHJlbWVzKG1pblg6bnVtYmVyLCBtaW5ZOm51bWJlciwgbWluWjpudW1iZXIsIG1heFg6bnVtYmVyLCBtYXhZOm51bWJlciwgbWF4WjpudW1iZXIpXG5cdHtcblx0fVxuXG5cdHB1YmxpYyBjbGFzc2lmeVRvUGxhbmUocGxhbmU6UGxhbmUzRCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gUGxhbmVDbGFzc2lmaWNhdGlvbi5JTlRFUlNFQ1Q7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgdHJhbnNmb3JtRnJvbShib3VuZHM6Qm91bmRpbmdWb2x1bWVCYXNlLCBtYXRyaXg6TWF0cml4M0QpXG5cdHtcblx0XHR0aGlzLl9hbHdheXNJbiA9ICg8TnVsbEJvdW5kcz4gYm91bmRzKS5fYWx3YXlzSW47XG5cdH1cbn1cblxuZXhwb3J0ID0gTnVsbEJvdW5kczsiXX0=