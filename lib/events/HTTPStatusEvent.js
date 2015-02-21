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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvSFRUUFN0YXR1c0V2ZW50LnRzIl0sIm5hbWVzIjpbIkhUVFBTdGF0dXNFdmVudCIsIkhUVFBTdGF0dXNFdmVudC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxBQUdBOztHQURHO0lBQ0csZUFBZTtJQUFTQSxVQUF4QkEsZUFBZUEsVUFBY0E7SUFPbENBLFNBUEtBLGVBQWVBLENBT1JBLElBQVdBLEVBQUVBLE1BQW9CQTtRQUFwQkMsc0JBQW9CQSxHQUFwQkEsYUFBb0JBO1FBRTVDQSxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFFdEJBLENBQUNBO0lBVmFELDJCQUFXQSxHQUFVQSxZQUFZQSxDQUFDQTtJQVdqREEsc0JBQUNBO0FBQURBLENBZEEsQUFjQ0EsRUFkNkIsS0FBSyxFQWNsQztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoiZXZlbnRzL0hUVFBTdGF0dXNFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5ldmVudHMuSFRUUFN0YXR1c0V2ZW50XG4gKi9cbmNsYXNzIEhUVFBTdGF0dXNFdmVudCBleHRlbmRzIEV2ZW50XG57XG5cblx0cHVibGljIHN0YXRpYyBIVFRQX1NUQVRVUzpzdHJpbmcgPSBcImh0dHBTdGF0dXNcIjtcblxuXHRwdWJsaWMgc3RhdHVzOm51bWJlcjtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgc3RhdHVzOm51bWJlciA9IG51bGwpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblxuXHRcdHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuXG5cdH1cbn1cblxuZXhwb3J0ID0gSFRUUFN0YXR1c0V2ZW50OyJdfQ==