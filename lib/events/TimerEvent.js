var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

var TimerEvent = (function (_super) {
    __extends(TimerEvent, _super);
    function TimerEvent(type) {
        _super.call(this, type);
    }
    TimerEvent.TIMER = "timer";
    TimerEvent.TIMER_COMPLETE = "timerComplete";
    return TimerEvent;
})(Event);

module.exports = TimerEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9UaW1lckV2ZW50LnRzIl0sIm5hbWVzIjpbIlRpbWVyRXZlbnQiLCJUaW1lckV2ZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEO0lBQXlCQSw2QkFBS0E7SUFNN0JBLG9CQUFZQSxJQUFXQTtRQUV0QkMsV0FBTUEsT0FBQUEsSUFBSUEsQ0FBQ0E7SUFFWkEsQ0FBQ0E7SUFQREQsbUJBQTZCQSxPQUFPQTtJQUNwQ0EsNEJBQXNDQSxlQUFlQTtJQU90REEsa0JBQUNBO0FBQURBLENBQUNBLEVBWHdCLEtBQUssRUFXN0I7O0FBRUQsMkJBQW1CLENBQUEiLCJmaWxlIjoiZXZlbnRzL1RpbWVyRXZlbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuY2xhc3MgVGltZXJFdmVudCBleHRlbmRzIEV2ZW50XG57XG5cblx0cHVibGljIHN0YXRpYyBUSU1FUjpzdHJpbmcgPSBcInRpbWVyXCI7XG5cdHB1YmxpYyBzdGF0aWMgVElNRVJfQ09NUExFVEU6c3RyaW5nID0gXCJ0aW1lckNvbXBsZXRlXCI7XG5cblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblxuXHR9XG59XG5cbmV4cG9ydCA9IFRpbWVyRXZlbnQiXX0=