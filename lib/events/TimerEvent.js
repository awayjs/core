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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvVGltZXJFdmVudC50cyJdLCJuYW1lcyI6WyJUaW1lckV2ZW50IiwiVGltZXJFdmVudC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxJQUFNLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQWNBO0lBTTdCQSxTQU5LQSxVQUFVQSxDQU1IQSxJQUFXQTtRQUV0QkMsa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO0lBRWJBLENBQUNBO0lBUGFELGdCQUFLQSxHQUFVQSxPQUFPQSxDQUFDQTtJQUN2QkEseUJBQWNBLEdBQVVBLGVBQWVBLENBQUNBO0lBT3ZEQSxpQkFBQ0E7QUFBREEsQ0FYQSxBQVdDQSxFQVh3QixLQUFLLEVBVzdCO0FBRUQsQUFBbUIsaUJBQVYsVUFBVSxDQUFBIiwiZmlsZSI6ImV2ZW50cy9UaW1lckV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG5jbGFzcyBUaW1lckV2ZW50IGV4dGVuZHMgRXZlbnRcbntcblxuXHRwdWJsaWMgc3RhdGljIFRJTUVSOnN0cmluZyA9IFwidGltZXJcIjtcblx0cHVibGljIHN0YXRpYyBUSU1FUl9DT01QTEVURTpzdHJpbmcgPSBcInRpbWVyQ29tcGxldGVcIjtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZylcblx0e1xuXHRcdHN1cGVyKHR5cGUpO1xuXG5cdH1cbn1cblxuZXhwb3J0ID0gVGltZXJFdmVudCJdfQ==