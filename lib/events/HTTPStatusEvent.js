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
        if (typeof status === "undefined") { status = null; }
        _super.call(this, type);

        this.status = status;
    }
    HTTPStatusEvent.HTTP_STATUS = "httpStatus";
    return HTTPStatusEvent;
})(Event);

module.exports = HTTPStatusEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9IVFRQU3RhdHVzRXZlbnQudHMiXSwibmFtZXMiOlsiSFRUUFN0YXR1c0V2ZW50IiwiSFRUUFN0YXR1c0V2ZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEOztFQUVHO0FBQ0g7SUFBOEJBLGtDQUFLQTtJQU9sQ0EseUJBQVlBLElBQVdBLEVBQUVBLE1BQW9CQTtRQUFwQkMscUNBQUFBLE1BQU1BLEdBQVVBLElBQUlBO0FBQUFBLFFBRTVDQSxXQUFNQSxPQUFBQSxJQUFJQSxDQUFDQTs7UUFFWEEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUE7SUFFckJBLENBQUNBO0lBVkRELDhCQUFtQ0EsWUFBWUE7SUFXaERBLHVCQUFDQTtBQUFEQSxDQUFDQSxFQWQ2QixLQUFLLEVBY2xDOztBQUVELGdDQUF5QixDQUFBIiwiZmlsZSI6ImV2ZW50cy9IVFRQU3RhdHVzRXZlbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5ldmVudHMuSFRUUFN0YXR1c0V2ZW50XG4gKi9cbmNsYXNzIEhUVFBTdGF0dXNFdmVudCBleHRlbmRzIEV2ZW50XG57XG5cblx0cHVibGljIHN0YXRpYyBIVFRQX1NUQVRVUzpzdHJpbmcgPSBcImh0dHBTdGF0dXNcIjtcblxuXHRwdWJsaWMgc3RhdHVzOm51bWJlcjtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgc3RhdHVzOm51bWJlciA9IG51bGwpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblxuXHRcdHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuXG5cdH1cbn1cblxuZXhwb3J0ID0gSFRUUFN0YXR1c0V2ZW50OyJdfQ==