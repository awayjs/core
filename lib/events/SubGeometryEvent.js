var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.SubGeometryEvent
 * @see away.core.base.Geometry
 */
var SubGeometryEvent = (function (_super) {
    __extends(SubGeometryEvent, _super);
    /**
     * Create a new GeometryEvent
     * @param type The event type.
     * @param dataType An optional data type of the vertex data being updated.
     */
    function SubGeometryEvent(type, dataType) {
        if (dataType === void 0) { dataType = ""; }
        _super.call(this, type);
        this._dataType = dataType;
    }
    Object.defineProperty(SubGeometryEvent.prototype, "dataType", {
        /**
         * The data type of the vertex data.
         */
        get: function () {
            return this._dataType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    SubGeometryEvent.prototype.clone = function () {
        return new SubGeometryEvent(this.type, this._dataType);
    };
    /**
     * Dispatched when a TriangleSubGeometry's index data has been updated.
     */
    SubGeometryEvent.INDICES_UPDATED = "indicesUpdated";
    /**
     * Dispatched when a TriangleSubGeometry's vertex data has been updated.
     */
    SubGeometryEvent.VERTICES_UPDATED = "verticesUpdated";
    return SubGeometryEvent;
})(Event);
module.exports = SubGeometryEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvU3ViR2VvbWV0cnlFdmVudC50cyJdLCJuYW1lcyI6WyJTdWJHZW9tZXRyeUV2ZW50IiwiU3ViR2VvbWV0cnlFdmVudC5jb25zdHJ1Y3RvciIsIlN1Ykdlb21ldHJ5RXZlbnQuZGF0YVR5cGUiLCJTdWJHZW9tZXRyeUV2ZW50LmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBRTNELEFBTUE7Ozs7O0dBREc7SUFDRyxnQkFBZ0I7SUFBU0EsVUFBekJBLGdCQUFnQkEsVUFBY0E7SUFjbkNBOzs7O09BSUdBO0lBQ0hBLFNBbkJLQSxnQkFBZ0JBLENBbUJUQSxJQUFXQSxFQUFFQSxRQUFvQkE7UUFBcEJDLHdCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUU1Q0Esa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO1FBRVpBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBLENBQUNBO0lBQzNCQSxDQUFDQTtJQUtERCxzQkFBV0Esc0NBQVFBO1FBSG5CQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUY7SUFFREE7Ozs7T0FJR0E7SUFDSUEsZ0NBQUtBLEdBQVpBO1FBRUNHLE1BQU1BLENBQUNBLElBQUlBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDeERBLENBQUNBO0lBeENESDs7T0FFR0E7SUFDV0EsZ0NBQWVBLEdBQVVBLGdCQUFnQkEsQ0FBQ0E7SUFFeERBOztPQUVHQTtJQUNXQSxpQ0FBZ0JBLEdBQVVBLGlCQUFpQkEsQ0FBQ0E7SUFpQzNEQSx1QkFBQ0E7QUFBREEsQ0EzQ0EsQUEyQ0NBLEVBM0M4QixLQUFLLEVBMkNuQztBQUVELEFBQTBCLGlCQUFqQixnQkFBZ0IsQ0FBQyIsImZpbGUiOiJldmVudHMvU3ViR2VvbWV0cnlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuLyoqXG4gKiBEaXNwYXRjaGVkIHRvIG5vdGlmeSBjaGFuZ2VzIGluIGEgc3ViIGdlb21ldHJ5IG9iamVjdCdzIHN0YXRlLlxuICpcbiAqIEBjbGFzcyBhd2F5LmV2ZW50cy5TdWJHZW9tZXRyeUV2ZW50XG4gKiBAc2VlIGF3YXkuY29yZS5iYXNlLkdlb21ldHJ5XG4gKi9cbmNsYXNzIFN1Ykdlb21ldHJ5RXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHQvKipcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSdzIGluZGV4IGRhdGEgaGFzIGJlZW4gdXBkYXRlZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgSU5ESUNFU19VUERBVEVEOnN0cmluZyA9IFwiaW5kaWNlc1VwZGF0ZWRcIjtcblxuXHQvKipcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSdzIHZlcnRleCBkYXRhIGhhcyBiZWVuIHVwZGF0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFZFUlRJQ0VTX1VQREFURUQ6c3RyaW5nID0gXCJ2ZXJ0aWNlc1VwZGF0ZWRcIjtcblxuXHRwcml2YXRlIF9kYXRhVHlwZTpzdHJpbmc7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBHZW9tZXRyeUV2ZW50XG5cdCAqIEBwYXJhbSB0eXBlIFRoZSBldmVudCB0eXBlLlxuXHQgKiBAcGFyYW0gZGF0YVR5cGUgQW4gb3B0aW9uYWwgZGF0YSB0eXBlIG9mIHRoZSB2ZXJ0ZXggZGF0YSBiZWluZyB1cGRhdGVkLlxuXHQgKi9cblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIGRhdGFUeXBlOnN0cmluZyA9IFwiXCIpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblxuXHRcdHRoaXMuX2RhdGFUeXBlID0gZGF0YVR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGRhdGEgdHlwZSBvZiB0aGUgdmVydGV4IGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRhdGFUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGF0YVR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSBldmVudC5cblx0ICpcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6RXZlbnRcblx0e1xuXHRcdHJldHVybiBuZXcgU3ViR2VvbWV0cnlFdmVudCh0aGlzLnR5cGUsIHRoaXMuX2RhdGFUeXBlKTtcblx0fVxufVxuXG5leHBvcnQgPSBTdWJHZW9tZXRyeUV2ZW50OyJdfQ==