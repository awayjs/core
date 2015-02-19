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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUHJvamVjdGlvbkV2ZW50LnRzIl0sIm5hbWVzIjpbIlByb2plY3Rpb25FdmVudCIsIlByb2plY3Rpb25FdmVudC5jb25zdHJ1Y3RvciIsIlByb2plY3Rpb25FdmVudC5wcm9qZWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBRzNELElBQU0sZUFBZTtJQUFTQSxVQUF4QkEsZUFBZUEsVUFBY0E7SUFNbENBLFNBTktBLGVBQWVBLENBTVJBLElBQVdBLEVBQUVBLFVBQXNCQTtRQUU5Q0Msa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO1FBQ1pBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUVERCxzQkFBV0EsdUNBQVVBO2FBQXJCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBRjtJQWJhQSw4QkFBY0EsR0FBVUEsZUFBZUEsQ0FBQ0E7SUFjdkRBLHNCQUFDQTtBQUFEQSxDQWhCQSxBQWdCQ0EsRUFoQjZCLEtBQUssRUFnQmxDO0FBRUQsQUFBeUIsaUJBQWhCLGVBQWUsQ0FBQyIsImZpbGUiOiJldmVudHMvUHJvamVjdGlvbkV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xyXG5pbXBvcnQgSVByb2plY3Rpb25cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9JUHJvamVjdGlvblwiKTtcclxuXHJcbmNsYXNzIFByb2plY3Rpb25FdmVudCBleHRlbmRzIEV2ZW50XHJcbntcclxuXHRwdWJsaWMgc3RhdGljIE1BVFJJWF9DSEFOR0VEOnN0cmluZyA9IFwibWF0cml4Q2hhbmdlZFwiO1xyXG5cclxuXHRwcml2YXRlIF9wcm9qZWN0aW9uOklQcm9qZWN0aW9uO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgcHJvamVjdGlvbjpJUHJvamVjdGlvbilcclxuXHR7XHJcblx0XHRzdXBlcih0eXBlKTtcclxuXHRcdHRoaXMuX3Byb2plY3Rpb24gPSBwcm9qZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBwcm9qZWN0aW9uKCk6SVByb2plY3Rpb25cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcHJvamVjdGlvbjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFByb2plY3Rpb25FdmVudDsiXX0=