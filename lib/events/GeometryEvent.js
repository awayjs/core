var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

/**
* Dispatched to notify changes in a geometry object's state.
*
* @class away.events.GeometryEvent
* @see away3d.core.base.Geometry
*/
var GeometryEvent = (function (_super) {
    __extends(GeometryEvent, _super);
    /**
    * Create a new GeometryEvent
    * @param type The event type.
    * @param subGeometry An optional TriangleSubGeometry object that is the subject of this event.
    */
    function GeometryEvent(type, subGeometry) {
        if (typeof subGeometry === "undefined") { subGeometry = null; }
        _super.call(this, type);

        this._subGeometry = subGeometry;
    }
    Object.defineProperty(GeometryEvent.prototype, "subGeometry", {
        /**
        * The TriangleSubGeometry object that is the subject of this event, if appropriate.
        */
        get: function () {
            return this._subGeometry;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Clones the event.
    * @return An exact duplicate of the current object.
    */
    GeometryEvent.prototype.clone = function () {
        return new GeometryEvent(this.type, this._subGeometry);
    };
    GeometryEvent.SUB_GEOMETRY_ADDED = "SubGeometryAdded";

    GeometryEvent.SUB_GEOMETRY_REMOVED = "SubGeometryRemoved";

    GeometryEvent.BOUNDS_INVALID = "BoundsInvalid";
    return GeometryEvent;
})(Event);

module.exports = GeometryEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9HZW9tZXRyeUV2ZW50LnRzIl0sIm5hbWVzIjpbIkdlb21ldHJ5RXZlbnQiLCJHZW9tZXRyeUV2ZW50LmNvbnN0cnVjdG9yIiwiR2VvbWV0cnlFdmVudC5jbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQzJEOztBQUUzRDs7Ozs7RUFLRTtBQUNGO0lBQTRCQSxnQ0FBS0E7SUFxQmhDQTs7OztNQURHQTtJQUNIQSx1QkFBWUEsSUFBV0EsRUFBRUEsV0FBa0NBO1FBQWxDQywwQ0FBQUEsV0FBV0EsR0FBbUJBLElBQUlBO0FBQUFBLFFBRTFEQSxXQUFNQSxPQUFBQSxJQUFJQSxDQUFDQTs7UUFFWEEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0E7SUFDaENBLENBQUNBO0lBS0REO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQTtRQUN6QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFNREE7OztNQURHQTtvQ0FDSEE7UUFFQ0UsT0FBT0EsSUFBSUEsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7SUFDdkRBLENBQUNBO0lBdENERixtQ0FBMENBLGtCQUFrQkE7O0lBSzVEQSxxQ0FBNENBLG9CQUFvQkE7O0lBRWhFQSwrQkFBc0NBLGVBQWVBO0lBZ0N0REEscUJBQUNBO0FBQURBLENBQUNBLEVBNUMyQixLQUFLLEVBNENoQzs7QUFFRCw4QkFBdUIsQ0FBQSIsImZpbGUiOiJldmVudHMvR2VvbWV0cnlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcbmltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG4vKipcbiogRGlzcGF0Y2hlZCB0byBub3RpZnkgY2hhbmdlcyBpbiBhIGdlb21ldHJ5IG9iamVjdCdzIHN0YXRlLlxuKlxuKiBAY2xhc3MgYXdheS5ldmVudHMuR2VvbWV0cnlFdmVudFxuKiBAc2VlIGF3YXkzZC5jb3JlLmJhc2UuR2VvbWV0cnlcbiovXG5jbGFzcyBHZW9tZXRyeUV2ZW50IGV4dGVuZHMgRXZlbnRcbntcblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhIFRyaWFuZ2xlU3ViR2VvbWV0cnkgd2FzIGFkZGVkIHRvIHRoZSBkaXNwYXRjaGluZyBHZW9tZXRyeS5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgU1VCX0dFT01FVFJZX0FEREVEOnN0cmluZyA9IFwiU3ViR2VvbWV0cnlBZGRlZFwiO1xuXG5cdC8qKlxuXHQgKiBEaXNwYXRjaGVkIHdoZW4gYSBUcmlhbmdsZVN1Ykdlb21ldHJ5IHdhcyByZW1vdmVkIGZyb20gdGhlIGRpc3BhdGNoaW5nIEdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBTVUJfR0VPTUVUUllfUkVNT1ZFRDpzdHJpbmcgPSBcIlN1Ykdlb21ldHJ5UmVtb3ZlZFwiO1xuXG5cdHB1YmxpYyBzdGF0aWMgQk9VTkRTX0lOVkFMSUQ6c3RyaW5nID0gXCJCb3VuZHNJbnZhbGlkXCI7XG5cblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgR2VvbWV0cnlFdmVudFxuXHQgKiBAcGFyYW0gdHlwZSBUaGUgZXZlbnQgdHlwZS5cblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5IEFuIG9wdGlvbmFsIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHRoYXQgaXMgdGhlIHN1YmplY3Qgb2YgdGhpcyBldmVudC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCBzdWJHZW9tZXRyeTpTdWJHZW9tZXRyeUJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cblx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHN1Ykdlb21ldHJ5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB0aGF0IGlzIHRoZSBzdWJqZWN0IG9mIHRoaXMgZXZlbnQsIGlmIGFwcHJvcHJpYXRlLlxuXHQgKi9cblx0cHVibGljIGdldCBzdWJHZW9tZXRyeSgpOlN1Ykdlb21ldHJ5QmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N1Ykdlb21ldHJ5O1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lcyB0aGUgZXZlbnQuXG5cdCAqIEByZXR1cm4gQW4gZXhhY3QgZHVwbGljYXRlIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkV2ZW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IEdlb21ldHJ5RXZlbnQodGhpcy50eXBlLCB0aGlzLl9zdWJHZW9tZXRyeSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gR2VvbWV0cnlFdmVudDsiXX0=