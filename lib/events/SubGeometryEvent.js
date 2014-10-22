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
        if (typeof dataType === "undefined") { dataType = ""; }
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
    SubGeometryEvent.INDICES_UPDATED = "indicesUpdated";

    SubGeometryEvent.VERTICES_UPDATED = "verticesUpdated";
    return SubGeometryEvent;
})(Event);

module.exports = SubGeometryEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9TdWJHZW9tZXRyeUV2ZW50LnRzIl0sIm5hbWVzIjpbIlN1Ykdlb21ldHJ5RXZlbnQiLCJTdWJHZW9tZXRyeUV2ZW50LmNvbnN0cnVjdG9yIiwiU3ViR2VvbWV0cnlFdmVudC5jbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQTJEOztBQUUzRDs7Ozs7RUFLRztBQUNIO0lBQStCQSxtQ0FBS0E7SUFtQm5DQTs7OztNQURHQTtJQUNIQSwwQkFBWUEsSUFBV0EsRUFBRUEsUUFBb0JBO1FBQXBCQyx1Q0FBQUEsUUFBUUEsR0FBVUEsRUFBRUE7QUFBQUEsUUFFNUNBLFdBQU1BLE9BQUFBLElBQUlBLENBQUNBOztRQUVYQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxRQUFRQTtJQUMxQkEsQ0FBQ0E7SUFLREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFNBQVNBO1FBQ3RCQSxDQUFDQTs7OztBQUFBQTtJQU9EQTs7OztNQURHQTt1Q0FDSEE7UUFFQ0UsT0FBT0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtJQUN2REEsQ0FBQ0E7SUFyQ0RGLG1DQUF1Q0EsZ0JBQWdCQTs7SUFLdkRBLG9DQUF3Q0EsaUJBQWlCQTtJQWlDMURBLHdCQUFDQTtBQUFEQSxDQUFDQSxFQTNDOEIsS0FBSyxFQTJDbkM7O0FBRUQsaUNBQTBCLENBQUEiLCJmaWxlIjoiZXZlbnRzL1N1Ykdlb21ldHJ5RXZlbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuLyoqXG4gKiBEaXNwYXRjaGVkIHRvIG5vdGlmeSBjaGFuZ2VzIGluIGEgc3ViIGdlb21ldHJ5IG9iamVjdCdzIHN0YXRlLlxuICpcbiAqIEBjbGFzcyBhd2F5LmV2ZW50cy5TdWJHZW9tZXRyeUV2ZW50XG4gKiBAc2VlIGF3YXkuY29yZS5iYXNlLkdlb21ldHJ5XG4gKi9cbmNsYXNzIFN1Ykdlb21ldHJ5RXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHQvKipcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSdzIGluZGV4IGRhdGEgaGFzIGJlZW4gdXBkYXRlZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgSU5ESUNFU19VUERBVEVEOnN0cmluZyA9IFwiaW5kaWNlc1VwZGF0ZWRcIjtcblxuXHQvKipcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSdzIHZlcnRleCBkYXRhIGhhcyBiZWVuIHVwZGF0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFZFUlRJQ0VTX1VQREFURUQ6c3RyaW5nID0gXCJ2ZXJ0aWNlc1VwZGF0ZWRcIjtcblxuXHRwcml2YXRlIF9kYXRhVHlwZTpzdHJpbmc7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBHZW9tZXRyeUV2ZW50XG5cdCAqIEBwYXJhbSB0eXBlIFRoZSBldmVudCB0eXBlLlxuXHQgKiBAcGFyYW0gZGF0YVR5cGUgQW4gb3B0aW9uYWwgZGF0YSB0eXBlIG9mIHRoZSB2ZXJ0ZXggZGF0YSBiZWluZyB1cGRhdGVkLlxuXHQgKi9cblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIGRhdGFUeXBlOnN0cmluZyA9IFwiXCIpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblxuXHRcdHRoaXMuX2RhdGFUeXBlID0gZGF0YVR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGRhdGEgdHlwZSBvZiB0aGUgdmVydGV4IGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRhdGFUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGF0YVR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSBldmVudC5cblx0ICpcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6RXZlbnRcblx0e1xuXHRcdHJldHVybiBuZXcgU3ViR2VvbWV0cnlFdmVudCh0aGlzLnR5cGUsIHRoaXMuX2RhdGFUeXBlKTtcblx0fVxufVxuXG5leHBvcnQgPSBTdWJHZW9tZXRyeUV2ZW50OyJdfQ==