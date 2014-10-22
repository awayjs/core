var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

/**
* @class away.events.CameraEvent
*/
var CameraEvent = (function (_super) {
    __extends(CameraEvent, _super);
    function CameraEvent(type, camera) {
        _super.call(this, type);

        this._camera = camera;
    }
    Object.defineProperty(CameraEvent.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        enumerable: true,
        configurable: true
    });
    CameraEvent.PROJECTION_CHANGED = "projectionChanged";
    return CameraEvent;
})(Event);

module.exports = CameraEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9DYW1lcmFFdmVudC50cyJdLCJuYW1lcyI6WyJDYW1lcmFFdmVudCIsIkNhbWVyYUV2ZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFDMkQ7O0FBRTNEOztFQUVHO0FBQ0g7SUFBMEJBLDhCQUFLQTtJQU05QkEscUJBQVlBLElBQVdBLEVBQUVBLE1BQWFBO1FBRXJDQyxXQUFNQSxPQUFBQSxJQUFJQSxDQUFDQTs7UUFFWEEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUE7SUFDdEJBLENBQUNBO0lBRUREO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTs7OztBQUFBQSxJQWREQSxpQ0FBMENBLG1CQUFtQkE7SUFlOURBLG1CQUFDQTtBQUFEQSxDQUFDQSxFQWpCeUIsS0FBSyxFQWlCOUI7O0FBRUQsNEJBQXFCLENBQUEiLCJmaWxlIjoiZXZlbnRzL0NhbWVyYUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENhbWVyYVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xuaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkuZXZlbnRzLkNhbWVyYUV2ZW50XG4gKi9cbmNsYXNzIENhbWVyYUV2ZW50IGV4dGVuZHMgRXZlbnRcbntcblx0cHVibGljIHN0YXRpYyBQUk9KRUNUSU9OX0NIQU5HRUQ6c3RyaW5nID0gXCJwcm9qZWN0aW9uQ2hhbmdlZFwiO1xuXG5cdHByaXZhdGUgX2NhbWVyYTpDYW1lcmE7XG5cblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIGNhbWVyYTpDYW1lcmEpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblxuXHRcdHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgY2FtZXJhKCk6Q2FtZXJhXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY2FtZXJhO1xuXHR9XG59XG5cbmV4cG9ydCA9IENhbWVyYUV2ZW50OyJdfQ==