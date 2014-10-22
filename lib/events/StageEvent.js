var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

var StageEvent = (function (_super) {
    __extends(StageEvent, _super);
    function StageEvent(type) {
        _super.call(this, type);
    }
    StageEvent.CONTEXT_CREATED = "contextCreated";
    StageEvent.CONTEXT_DISPOSED = "contextDisposed";
    StageEvent.CONTEXT_RECREATED = "contextRecreated";
    StageEvent.VIEWPORT_UPDATED = "viewportUpdated";
    return StageEvent;
})(Event);

module.exports = StageEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9TdGFnZUV2ZW50LnRzIl0sIm5hbWVzIjpbIlN0YWdlRXZlbnQiLCJTdGFnZUV2ZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEO0lBQXlCQSw2QkFBS0E7SUFPN0JBLG9CQUFZQSxJQUFXQTtRQUV0QkMsV0FBTUEsT0FBQUEsSUFBSUEsQ0FBQ0E7SUFDWkEsQ0FBQ0E7SUFSREQsNkJBQXVDQSxnQkFBZ0JBO0lBQ3ZEQSw4QkFBd0NBLGlCQUFpQkE7SUFDekRBLCtCQUF5Q0Esa0JBQWtCQTtJQUMzREEsOEJBQXdDQSxpQkFBaUJBO0lBTTFEQSxrQkFBQ0E7QUFBREEsQ0FBQ0EsRUFYd0IsS0FBSyxFQVc3Qjs7QUFFRCwyQkFBb0IsQ0FBQSIsImZpbGUiOiJldmVudHMvU3RhZ2VFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG5jbGFzcyBTdGFnZUV2ZW50IGV4dGVuZHMgRXZlbnRcbntcblx0cHVibGljIHN0YXRpYyBDT05URVhUX0NSRUFURUQ6c3RyaW5nID0gXCJjb250ZXh0Q3JlYXRlZFwiO1xuXHRwdWJsaWMgc3RhdGljIENPTlRFWFRfRElTUE9TRUQ6c3RyaW5nID0gXCJjb250ZXh0RGlzcG9zZWRcIjtcblx0cHVibGljIHN0YXRpYyBDT05URVhUX1JFQ1JFQVRFRDpzdHJpbmcgPSBcImNvbnRleHRSZWNyZWF0ZWRcIjtcblx0cHVibGljIHN0YXRpYyBWSUVXUE9SVF9VUERBVEVEOnN0cmluZyA9IFwidmlld3BvcnRVcGRhdGVkXCI7XG5cblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblx0fVxufVxuXG5leHBvcnQgPSBTdGFnZUV2ZW50OyJdfQ==