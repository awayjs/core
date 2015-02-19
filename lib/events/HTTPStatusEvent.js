var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * @class away.events.HTTPStatusEvent
 */
var HTTPStatusEvent = (function (_super) {
    __extends(HTTPStatusEvent, _super);
    function HTTPStatusEvent(type, status) {
        if (status === void 0) { status = null; }
        _super.call(this, type);
        this.status = status;
    }
    HTTPStatusEvent.HTTP_STATUS = "httpStatus";
    return HTTPStatusEvent;
})(Event);
module.exports = HTTPStatusEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvSFRUUFN0YXR1c0V2ZW50LnRzIl0sIm5hbWVzIjpbIkhUVFBTdGF0dXNFdmVudCIsIkhUVFBTdGF0dXNFdmVudC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxBQUdBOztHQURHO0lBQ0csZUFBZTtJQUFTQSxVQUF4QkEsZUFBZUEsVUFBY0E7SUFPbENBLFNBUEtBLGVBQWVBLENBT1JBLElBQVdBLEVBQUVBLE1BQW9CQTtRQUFwQkMsc0JBQW9CQSxHQUFwQkEsYUFBb0JBO1FBRTVDQSxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFFdEJBLENBQUNBO0lBVmFELDJCQUFXQSxHQUFVQSxZQUFZQSxDQUFDQTtJQVdqREEsc0JBQUNBO0FBQURBLENBZEEsQUFjQ0EsRUFkNkIsS0FBSyxFQWNsQztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoiZXZlbnRzL0hUVFBTdGF0dXNFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgYXdheS5ldmVudHMuSFRUUFN0YXR1c0V2ZW50XHJcbiAqL1xyXG5jbGFzcyBIVFRQU3RhdHVzRXZlbnQgZXh0ZW5kcyBFdmVudFxyXG57XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgSFRUUF9TVEFUVVM6c3RyaW5nID0gXCJodHRwU3RhdHVzXCI7XHJcblxyXG5cdHB1YmxpYyBzdGF0dXM6bnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgc3RhdHVzOm51bWJlciA9IG51bGwpXHJcblx0e1xyXG5cdFx0c3VwZXIodHlwZSk7XHJcblxyXG5cdFx0dGhpcy5zdGF0dXMgPSBzdGF0dXM7XHJcblxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gSFRUUFN0YXR1c0V2ZW50OyJdfQ==