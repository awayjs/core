var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var ProgressEvent = (function (_super) {
    __extends(ProgressEvent, _super);
    function ProgressEvent(type) {
        _super.call(this, type);
    }
    ProgressEvent.PROGRESS = "progress";
    return ProgressEvent;
})(Event);
module.exports = ProgressEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUHJvZ3Jlc3NFdmVudC50cyJdLCJuYW1lcyI6WyJQcm9ncmVzc0V2ZW50IiwiUHJvZ3Jlc3NFdmVudC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQWNBO0lBUWhDQSxTQVJLQSxhQUFhQSxDQVFOQSxJQUFXQTtRQUV0QkMsa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO0lBQ2JBLENBQUNBO0lBVGFELHNCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQVU1Q0Esb0JBQUNBO0FBQURBLENBWkEsQUFZQ0EsRUFaMkIsS0FBSyxFQVloQztBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJldmVudHMvUHJvZ3Jlc3NFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcclxuXHJcbmNsYXNzIFByb2dyZXNzRXZlbnQgZXh0ZW5kcyBFdmVudFxyXG57XHJcblx0cHVibGljIHN0YXRpYyBQUk9HUkVTUzpzdHJpbmcgPSBcInByb2dyZXNzXCI7XHJcblxyXG5cdHB1YmxpYyBieXRlc0xvYWRlZDpudW1iZXI7XHJcblxyXG5cdHB1YmxpYyBieXRlc1RvdGFsOm51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0c3VwZXIodHlwZSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBQcm9ncmVzc0V2ZW50OyJdfQ==