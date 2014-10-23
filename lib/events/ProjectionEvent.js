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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvcHJvamVjdGlvbmV2ZW50LnRzIl0sIm5hbWVzIjpbIlByb2plY3Rpb25FdmVudCIsIlByb2plY3Rpb25FdmVudC5jb25zdHJ1Y3RvciIsIlByb2plY3Rpb25FdmVudC5wcm9qZWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBRzNELElBQU0sZUFBZTtJQUFTQSxVQUF4QkEsZUFBZUEsVUFBY0E7SUFNbENBLFNBTktBLGVBQWVBLENBTVJBLElBQVdBLEVBQUVBLFVBQXNCQTtRQUU5Q0Msa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO1FBQ1pBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUVERCxzQkFBV0EsdUNBQVVBO2FBQXJCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBRjtJQWJhQSw4QkFBY0EsR0FBVUEsZUFBZUEsQ0FBQ0E7SUFjdkRBLHNCQUFDQTtBQUFEQSxDQWhCQSxBQWdCQ0EsRUFoQjZCLEtBQUssRUFnQmxDO0FBRUQsQUFBeUIsaUJBQWhCLGVBQWUsQ0FBQyIsImZpbGUiOiJldmVudHMvUHJvamVjdGlvbkV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuaW1wb3J0IElQcm9qZWN0aW9uXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvSVByb2plY3Rpb25cIik7XG5cbmNsYXNzIFByb2plY3Rpb25FdmVudCBleHRlbmRzIEV2ZW50XG57XG5cdHB1YmxpYyBzdGF0aWMgTUFUUklYX0NIQU5HRUQ6c3RyaW5nID0gXCJtYXRyaXhDaGFuZ2VkXCI7XG5cblx0cHJpdmF0ZSBfcHJvamVjdGlvbjpJUHJvamVjdGlvbjtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgcHJvamVjdGlvbjpJUHJvamVjdGlvbilcblx0e1xuXHRcdHN1cGVyKHR5cGUpO1xuXHRcdHRoaXMuX3Byb2plY3Rpb24gPSBwcm9qZWN0aW9uO1xuXHR9XG5cblx0cHVibGljIGdldCBwcm9qZWN0aW9uKCk6SVByb2plY3Rpb25cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wcm9qZWN0aW9uO1xuXHR9XG59XG5cbmV4cG9ydCA9IFByb2plY3Rpb25FdmVudDsiXX0=