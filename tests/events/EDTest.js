"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetEvent_1 = require("awayjs-core/lib/events/AssetEvent");
var EventDispatcher_1 = require("awayjs-core/lib/events/EventDispatcher");
var EDTest = (function (_super) {
    __extends(EDTest, _super);
    function EDTest() {
        var _this = this;
        _super.call(this);
        var onCompleteDelegate = function (event) { return _this.onComplete(event); };
        console.log('Before addEventListener: ', this.hasEventListener(AssetEvent_1.default.ASSET_COMPLETE));
        this.addEventListener(AssetEvent_1.default.ASSET_COMPLETE, onCompleteDelegate);
        console.log('After addEventListener: ', this.hasEventListener(AssetEvent_1.default.ASSET_COMPLETE));
        this.removeEventListener(AssetEvent_1.default.ASSET_COMPLETE, onCompleteDelegate);
        console.log('After removeEventListener: ', this.hasEventListener(AssetEvent_1.default.ASSET_COMPLETE));
    }
    EDTest.prototype.onComplete = function (event) {
    };
    return EDTest;
}(EventDispatcher_1.default));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9FRFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkJBQTBCLG1DQUFtQyxDQUFDLENBQUE7QUFDOUQsZ0NBQThCLHdDQUF3QyxDQUFDLENBQUE7QUFFdkU7SUFBcUIsMEJBQWU7SUFFbkM7UUFGRCxpQkFtQkM7UUFmQyxpQkFBTyxDQUFDO1FBRVIsSUFBSSxrQkFBa0IsR0FBOEIsVUFBQyxLQUFnQixJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztRQUVqRyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFVLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBVSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sMkJBQVUsR0FBakIsVUFBa0IsS0FBZ0I7SUFHbEMsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQW5CQSxBQW1CQyxDQW5Cb0IseUJBQWUsR0FtQm5DIiwiZmlsZSI6ImV2ZW50cy9FRFRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRFdmVudFx0XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvQXNzZXRFdmVudFwiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuXG5jbGFzcyBFRFRlc3QgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHZhciBvbkNvbXBsZXRlRGVsZWdhdGU6KGV2ZW50OkFzc2V0RXZlbnQpID0+IHZvaWQgPSAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkNvbXBsZXRlKGV2ZW50KTtcblxuXHRcdGNvbnNvbGUubG9nKCdCZWZvcmUgYWRkRXZlbnRMaXN0ZW5lcjogJywgdGhpcy5oYXNFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUpKTtcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgb25Db21wbGV0ZURlbGVnYXRlKTtcblx0XHRjb25zb2xlLmxvZygnQWZ0ZXIgYWRkRXZlbnRMaXN0ZW5lcjogJywgdGhpcy5oYXNFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUpKTtcblx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgb25Db21wbGV0ZURlbGVnYXRlKTtcblx0XHRjb25zb2xlLmxvZygnQWZ0ZXIgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogJywgdGhpcy5oYXNFdmVudExpc3RlbmVyKEFzc2V0RXZlbnQuQVNTRVRfQ09NUExFVEUpKTtcblx0fVxuXG5cdHB1YmxpYyBvbkNvbXBsZXRlKGV2ZW50OkFzc2V0RXZlbnQpXG5cdHtcblxuXHR9XG59Il0sInNvdXJjZVJvb3QiOiIuL3Rlc3RzIn0=
