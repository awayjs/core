var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");

var ProjectionEvent = (function (_super) {
    __extends(ProjectionEvent, _super);
    function ProjectionEvent(type, projection) {
        _super.call(this, type);
        this._projection = projection;
    }
    Object.defineProperty(ProjectionEvent.prototype, "projection", {
        get: function () {
            return this._projection;
        },
        enumerable: true,
        configurable: true
    });
    ProjectionEvent.MATRIX_CHANGED = "matrixChanged";
    return ProjectionEvent;
})(Event);

module.exports = ProjectionEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9Qcm9qZWN0aW9uRXZlbnQudHMiXSwibmFtZXMiOlsiUHJvamVjdGlvbkV2ZW50IiwiUHJvamVjdGlvbkV2ZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtREFBMkQ7O0FBRzNEO0lBQThCQSxrQ0FBS0E7SUFNbENBLHlCQUFZQSxJQUFXQSxFQUFFQSxVQUFzQkE7UUFFOUNDLFdBQU1BLE9BQUFBLElBQUlBLENBQUNBO1FBQ1hBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBO0lBQzlCQSxDQUFDQTtJQUVERDtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxXQUFXQTtRQUN4QkEsQ0FBQ0E7Ozs7QUFBQUEsSUFiREEsaUNBQXNDQSxlQUFlQTtJQWN0REEsdUJBQUNBO0FBQURBLENBQUNBLEVBaEI2QixLQUFLLEVBZ0JsQzs7QUFFRCxnQ0FBeUIsQ0FBQSIsImZpbGUiOiJldmVudHMvUHJvamVjdGlvbkV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XG5pbXBvcnQgSVByb2plY3Rpb25cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9JUHJvamVjdGlvblwiKTtcblxuY2xhc3MgUHJvamVjdGlvbkV2ZW50IGV4dGVuZHMgRXZlbnRcbntcblx0cHVibGljIHN0YXRpYyBNQVRSSVhfQ0hBTkdFRDpzdHJpbmcgPSBcIm1hdHJpeENoYW5nZWRcIjtcblxuXHRwcml2YXRlIF9wcm9qZWN0aW9uOklQcm9qZWN0aW9uO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCBwcm9qZWN0aW9uOklQcm9qZWN0aW9uKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cdFx0dGhpcy5fcHJvamVjdGlvbiA9IHByb2plY3Rpb247XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHByb2plY3Rpb24oKTpJUHJvamVjdGlvblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3Byb2plY3Rpb247XG5cdH1cbn1cblxuZXhwb3J0ID0gUHJvamVjdGlvbkV2ZW50OyJdfQ==