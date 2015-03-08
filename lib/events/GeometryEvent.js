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
        if (subGeometry === void 0) { subGeometry = null; }
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
    /**
     * Dispatched when a TriangleSubGeometry was added to the dispatching Geometry.
     */
    GeometryEvent.SUB_GEOMETRY_ADDED = "subGeometryAdded";
    /**
     * Dispatched when a TriangleSubGeometry was removed from the dispatching Geometry.
     */
    GeometryEvent.SUB_GEOMETRY_REMOVED = "subGeometryRemoved";
    /**
     *
     */
    GeometryEvent.BOUNDS_INVALID = "boundsInvalid";
    return GeometryEvent;
})(Event);
module.exports = GeometryEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvR2VvbWV0cnlFdmVudC50cyJdLCJuYW1lcyI6WyJHZW9tZXRyeUV2ZW50IiwiR2VvbWV0cnlFdmVudC5jb25zdHJ1Y3RvciIsIkdlb21ldHJ5RXZlbnQuc3ViR2VvbWV0cnkiLCJHZW9tZXRyeUV2ZW50LmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBRTNELEFBTUE7Ozs7O0VBREU7SUFDSSxhQUFhO0lBQVNBLFVBQXRCQSxhQUFhQSxVQUFjQTtJQW1CaENBOzs7O09BSUdBO0lBQ0hBLFNBeEJLQSxhQUFhQSxDQXdCTkEsSUFBV0EsRUFBRUEsV0FBa0NBO1FBQWxDQywyQkFBa0NBLEdBQWxDQSxrQkFBa0NBO1FBRTFEQSxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7SUFDakNBLENBQUNBO0lBS0RELHNCQUFXQSxzQ0FBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBRjtJQUVEQTs7O09BR0dBO0lBQ0lBLDZCQUFLQSxHQUFaQTtRQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUN4REEsQ0FBQ0E7SUE1Q0RIOztPQUVHQTtJQUNXQSxnQ0FBa0JBLEdBQVVBLGtCQUFrQkEsQ0FBQ0E7SUFFN0RBOztPQUVHQTtJQUNXQSxrQ0FBb0JBLEdBQVVBLG9CQUFvQkEsQ0FBQ0E7SUFFakVBOztPQUVHQTtJQUNXQSw0QkFBY0EsR0FBVUEsZUFBZUEsQ0FBQ0E7SUFnQ3ZEQSxvQkFBQ0E7QUFBREEsQ0EvQ0EsQUErQ0NBLEVBL0MyQixLQUFLLEVBK0NoQztBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJldmVudHMvR2VvbWV0cnlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvU3ViR2VvbWV0cnlCYXNlXCIpO1xuaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XG5cbi8qKlxuKiBEaXNwYXRjaGVkIHRvIG5vdGlmeSBjaGFuZ2VzIGluIGEgZ2VvbWV0cnkgb2JqZWN0J3Mgc3RhdGUuXG4qXG4qIEBjbGFzcyBhd2F5LmV2ZW50cy5HZW9tZXRyeUV2ZW50XG4qIEBzZWUgYXdheTNkLmNvcmUuYmFzZS5HZW9tZXRyeVxuKi9cbmNsYXNzIEdlb21ldHJ5RXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHQvKipcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSB3YXMgYWRkZWQgdG8gdGhlIGRpc3BhdGNoaW5nIEdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBTVUJfR0VPTUVUUllfQURERUQ6c3RyaW5nID0gXCJzdWJHZW9tZXRyeUFkZGVkXCI7XG5cblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhIFRyaWFuZ2xlU3ViR2VvbWV0cnkgd2FzIHJlbW92ZWQgZnJvbSB0aGUgZGlzcGF0Y2hpbmcgR2VvbWV0cnkuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFNVQl9HRU9NRVRSWV9SRU1PVkVEOnN0cmluZyA9IFwic3ViR2VvbWV0cnlSZW1vdmVkXCI7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIEJPVU5EU19JTlZBTElEOnN0cmluZyA9IFwiYm91bmRzSW52YWxpZFwiO1xuXG5cdHByaXZhdGUgX3N1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZTtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IEdlb21ldHJ5RXZlbnRcblx0ICogQHBhcmFtIHR5cGUgVGhlIGV2ZW50IHR5cGUuXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBBbiBvcHRpb25hbCBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB0aGF0IGlzIHRoZSBzdWJqZWN0IG9mIHRoaXMgZXZlbnQuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlID0gbnVsbClcblx0e1xuXHRcdHN1cGVyKHR5cGUpO1xuXG5cdFx0dGhpcy5fc3ViR2VvbWV0cnkgPSBzdWJHZW9tZXRyeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3QgdGhhdCBpcyB0aGUgc3ViamVjdCBvZiB0aGlzIGV2ZW50LCBpZiBhcHByb3ByaWF0ZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpTdWJHZW9tZXRyeUJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdWJHZW9tZXRyeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIGV2ZW50LlxuXHQgKiBAcmV0dXJuIEFuIGV4YWN0IGR1cGxpY2F0ZSBvZiB0aGUgY3VycmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpFdmVudFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBHZW9tZXRyeUV2ZW50KHRoaXMudHlwZSwgdGhpcy5fc3ViR2VvbWV0cnkpO1xuXHR9XG59XG5cbmV4cG9ydCA9IEdlb21ldHJ5RXZlbnQ7Il19