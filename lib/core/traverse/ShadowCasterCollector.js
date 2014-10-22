var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollectorBase = require("awayjs-core/lib/core/traverse/CollectorBase");

/**
* @class away.traverse.ShadowCasterCollector
*/
var ShadowCasterCollector = (function (_super) {
    __extends(ShadowCasterCollector, _super);
    function ShadowCasterCollector() {
        _super.call(this);
    }
    /**
    *
    */
    ShadowCasterCollector.prototype.enterNode = function (node) {
        var enter = this.scene._iCollectionMark != node._iCollectionMark && node.isCastingShadow();

        if (!enter) {
            node._iCollectionMark = this.scene._iCollectionMark;

            return false;
        }

        return _super.prototype.enterNode.call(this, node);
    };
    return ShadowCasterCollector;
})(CollectorBase);

module.exports = ShadowCasterCollector;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvdHJhdmVyc2UvU2hhZG93Q2FzdGVyQ29sbGVjdG9yLnRzIl0sIm5hbWVzIjpbIlNoYWRvd0Nhc3RlckNvbGxlY3RvciIsIlNoYWRvd0Nhc3RlckNvbGxlY3Rvci5jb25zdHJ1Y3RvciIsIlNoYWRvd0Nhc3RlckNvbGxlY3Rvci5lbnRlck5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBFQUNpRjs7QUFFakY7O0VBRUc7QUFDSDtJQUFvQ0Esd0NBQWFBO0lBRWhEQTtRQUVDQyxXQUFNQSxLQUFBQSxDQUFDQTtJQUNSQSxDQUFDQTtJQUtERDs7TUFER0E7Z0RBQ0hBLFVBQWlCQSxJQUFhQTtRQUU3QkUsSUFBSUEsS0FBS0EsR0FBV0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxJQUFJQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLElBQUlBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBOztRQUVsR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBRUE7WUFDWEEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxnQkFBZ0JBOztZQUVuREEsT0FBT0EsS0FBS0E7U0FDWkE7O1FBRURBLE9BQU9BLGdCQUFLQSxDQUFDQSxTQUFTQSxLQUFDQSxPQUFBQSxJQUFJQSxDQUFDQTtJQUM3QkEsQ0FBQ0E7SUFDRkYsNkJBQUNBO0FBQURBLENBQUNBLEVBdEJtQyxhQUFhLEVBc0JoRDs7QUFFRCxzQ0FBK0IsQ0FBQSIsImZpbGUiOiJjb3JlL3RyYXZlcnNlL1NoYWRvd0Nhc3RlckNvbGxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBDb2xsZWN0b3JCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlXCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LnRyYXZlcnNlLlNoYWRvd0Nhc3RlckNvbGxlY3RvclxuICovXG5jbGFzcyBTaGFkb3dDYXN0ZXJDb2xsZWN0b3IgZXh0ZW5kcyBDb2xsZWN0b3JCYXNlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBlbnRlck5vZGUobm9kZTpOb2RlQmFzZSk6Ym9vbGVhblxuXHR7XG5cdFx0dmFyIGVudGVyOmJvb2xlYW4gPSB0aGlzLnNjZW5lLl9pQ29sbGVjdGlvbk1hcmsgIT0gbm9kZS5faUNvbGxlY3Rpb25NYXJrICYmIG5vZGUuaXNDYXN0aW5nU2hhZG93KCk7XG5cblx0XHRpZiAoIWVudGVyKSB7XG5cdFx0XHRub2RlLl9pQ29sbGVjdGlvbk1hcmsgPSB0aGlzLnNjZW5lLl9pQ29sbGVjdGlvbk1hcms7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3VwZXIuZW50ZXJOb2RlKG5vZGUpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFNoYWRvd0Nhc3RlckNvbGxlY3RvcjsiXX0=