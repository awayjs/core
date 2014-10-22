var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

var LightEvent = (function (_super) {
    __extends(LightEvent, _super);
    function LightEvent(type) {
        _super.call(this, type);
    }
    //@override
    LightEvent.prototype.clone = function () {
        return new LightEvent(this.type);
    };
    LightEvent.CASTS_SHADOW_CHANGE = "castsShadowChange";
    return LightEvent;
})(Event);

module.exports = LightEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9MaWdodEV2ZW50LnRzIl0sIm5hbWVzIjpbIkxpZ2h0RXZlbnQiLCJMaWdodEV2ZW50LmNvbnN0cnVjdG9yIiwiTGlnaHRFdmVudC5jbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQTJEOztBQUUzRDtJQUF5QkEsNkJBQUtBO0lBSzdCQSxvQkFBWUEsSUFBV0E7UUFFdEJDLFdBQU1BLE9BQUFBLElBQUlBLENBQUNBO0lBQ1pBLENBQUNBO0lBR0RELFdBRFdBO2lDQUNYQTtRQUVDRSxPQUFPQSxJQUFJQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFYREYsaUNBQTJDQSxtQkFBbUJBO0lBWS9EQSxrQkFBQ0E7QUFBREEsQ0FBQ0EsRUFmd0IsS0FBSyxFQWU3Qjs7QUFFRCwyQkFBb0IsQ0FBQSIsImZpbGUiOiJldmVudHMvTGlnaHRFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG5jbGFzcyBMaWdodEV2ZW50IGV4dGVuZHMgRXZlbnRcbntcblxuXHRwdWJsaWMgc3RhdGljIENBU1RTX1NIQURPV19DSEFOR0U6c3RyaW5nID0gXCJjYXN0c1NoYWRvd0NoYW5nZVwiO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgY2xvbmUoKTpFdmVudFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBMaWdodEV2ZW50KHRoaXMudHlwZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gTGlnaHRFdmVudDsiXX0=