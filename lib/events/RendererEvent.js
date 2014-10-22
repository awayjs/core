var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

var RendererEvent = (function (_super) {
    __extends(RendererEvent, _super);
    function RendererEvent(type) {
        _super.call(this, type);
    }
    RendererEvent.VIEWPORT_UPDATED = "viewportUpdated";
    RendererEvent.SCISSOR_UPDATED = "scissorUpdated";
    return RendererEvent;
})(Event);

module.exports = RendererEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9SZW5kZXJlckV2ZW50LnRzIl0sIm5hbWVzIjpbIlJlbmRlcmVyRXZlbnQiLCJSZW5kZXJlckV2ZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRTNEO0lBQTRCQSxnQ0FBS0E7SUFLaENBLHVCQUFZQSxJQUFXQTtRQUV0QkMsV0FBTUEsT0FBQUEsSUFBSUEsQ0FBQ0E7SUFDWkEsQ0FBQ0E7SUFOREQsaUNBQXdDQSxpQkFBaUJBO0lBQ3pEQSxnQ0FBdUNBLGdCQUFnQkE7SUFNeERBLHFCQUFDQTtBQUFEQSxDQUFDQSxFQVQyQixLQUFLLEVBU2hDOztBQUVELDhCQUF1QixDQUFBIiwiZmlsZSI6ImV2ZW50cy9SZW5kZXJlckV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XG5cbmNsYXNzIFJlbmRlcmVyRXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHRwdWJsaWMgc3RhdGljIFZJRVdQT1JUX1VQREFURUQ6c3RyaW5nID0gXCJ2aWV3cG9ydFVwZGF0ZWRcIjtcblx0cHVibGljIHN0YXRpYyBTQ0lTU09SX1VQREFURUQ6c3RyaW5nID0gXCJzY2lzc29yVXBkYXRlZFwiO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gUmVuZGVyZXJFdmVudDsiXX0=