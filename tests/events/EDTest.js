var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");

var EDTest = (function (_super) {
    __extends(EDTest, _super);
    function EDTest() {
        var _this = this;
        _super.call(this);

        console.log('Before addEventListener: ', this.hasEventListener(Event.COMPLETE));
        this.addEventListener(Event.COMPLETE, function (event) {
            return _this.onComplete(event);
        });
        console.log('After addEventListener: ', this.hasEventListener(Event.COMPLETE));
        this.removeEventListener(Event.COMPLETE, function (event) {
            return _this.onComplete(event);
        });
        console.log('After removeEventListener: ', this.hasEventListener(Event.COMPLETE));
    }
    EDTest.prototype.onComplete = function (event) {
    };
    return EDTest;
})(EventDispatcher);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9FRFRlc3QudHMiXSwibmFtZXMiOlsiRURUZXN0IiwiRURUZXN0LmNvbnN0cnVjdG9yIiwiRURUZXN0Lm9uQ29tcGxldGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1EQUEyRDtBQUMzRCx1RUFBNkU7O0FBRTdFO0lBQXFCQSx5QkFBZUE7SUFFbkNBO1FBQUFDLGlCQVNDQTtRQVBBQSxXQUFNQSxLQUFBQSxDQUFDQTs7UUFFUEEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsMkJBQTJCQSxFQUFFQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBQy9FQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLEVBQUVBLFVBQUNBLEtBQVdBO21CQUFLQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUF0QkEsQ0FBc0JBLENBQUNBO1FBQzlFQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSwwQkFBMEJBLEVBQUVBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDOUVBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsRUFBRUEsVUFBQ0EsS0FBV0E7bUJBQUtBLEtBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBO1FBQXRCQSxDQUFzQkEsQ0FBQ0E7UUFDakZBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLDZCQUE2QkEsRUFBRUEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtJQUNsRkEsQ0FBQ0E7SUFFREQsOEJBQUFBLFVBQWtCQSxLQUFXQTtJQUc3QkUsQ0FBQ0E7SUFDRkYsY0FBQ0E7QUFBREEsQ0FBQ0EsRUFqQm9CLGVBQWUsRUFpQm5DO0FBQUEiLCJmaWxlIjoiZXZlbnRzL0VEVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xuXG5jbGFzcyBFRFRlc3QgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdGNvbnNvbGUubG9nKCdCZWZvcmUgYWRkRXZlbnRMaXN0ZW5lcjogJywgdGhpcy5oYXNFdmVudExpc3RlbmVyKEV2ZW50LkNPTVBMRVRFKSk7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNPTVBMRVRFLCAoZXZlbnQ6RXZlbnQpID0+IHRoaXMub25Db21wbGV0ZShldmVudCkpO1xuXHRcdGNvbnNvbGUubG9nKCdBZnRlciBhZGRFdmVudExpc3RlbmVyOiAnLCB0aGlzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnQuQ09NUExFVEUpKTtcblx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoRXZlbnQuQ09NUExFVEUsIChldmVudDpFdmVudCkgPT4gdGhpcy5vbkNvbXBsZXRlKGV2ZW50KSk7XG5cdFx0Y29uc29sZS5sb2coJ0FmdGVyIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICcsIHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihFdmVudC5DT01QTEVURSkpO1xuXHR9XG5cblx0cHVibGljIG9uQ29tcGxldGUoZXZlbnQ6RXZlbnQpXG5cdHtcblxuXHR9XG59Il19