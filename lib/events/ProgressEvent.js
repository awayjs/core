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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9Qcm9ncmVzc0V2ZW50LnRzIl0sIm5hbWVzIjpbIlByb2dyZXNzRXZlbnQiLCJQcm9ncmVzc0V2ZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEO0lBQTRCQSxnQ0FBS0E7SUFRaENBLHVCQUFZQSxJQUFXQTtRQUV0QkMsV0FBTUEsT0FBQUEsSUFBSUEsQ0FBQ0E7SUFDWkEsQ0FBQ0E7SUFUREQseUJBQWdDQSxVQUFVQTtJQVUzQ0EscUJBQUNBO0FBQURBLENBQUNBLEVBWjJCLEtBQUssRUFZaEM7O0FBRUQsOEJBQXVCLENBQUEiLCJmaWxlIjoiZXZlbnRzL1Byb2dyZXNzRXZlbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuY2xhc3MgUHJvZ3Jlc3NFdmVudCBleHRlbmRzIEV2ZW50XG57XG5cdHB1YmxpYyBzdGF0aWMgUFJPR1JFU1M6c3RyaW5nID0gXCJwcm9ncmVzc1wiO1xuXG5cdHB1YmxpYyBieXRlc0xvYWRlZDpudW1iZXI7XG5cblx0cHVibGljIGJ5dGVzVG90YWw6bnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gUHJvZ3Jlc3NFdmVudDsiXX0=