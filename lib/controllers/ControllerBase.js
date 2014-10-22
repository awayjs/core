var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");

var ControllerBase = (function () {
    function ControllerBase(targetObject) {
        if (typeof targetObject === "undefined") { targetObject = null; }
        this._pAutoUpdate = true;
        this.targetObject = targetObject;
    }
    ControllerBase.prototype.pNotifyUpdate = function () {
        if (this._pTargetObject && this._pTargetObject._iAssignedPartition && this._pAutoUpdate) {
            this._pTargetObject._iAssignedPartition.iMarkForUpdate(this._pTargetObject);
        }
    };

    Object.defineProperty(ControllerBase.prototype, "targetObject", {
        get: function () {
            return this._pTargetObject;
        },
        set: function (val) {
            if (this._pTargetObject == val) {
                return;
            }

            if (this._pTargetObject && this._pAutoUpdate) {
                this._pTargetObject._iController = null;
            }
            this._pTargetObject = val;

            if (this._pTargetObject && this._pAutoUpdate) {
                this._pTargetObject._iController = this;
            }
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ControllerBase.prototype, "autoUpdate", {
        get: function () {
            return this._pAutoUpdate;
        },
        set: function (val) {
            if (this._pAutoUpdate == val) {
                return;
            }
            this._pAutoUpdate = val;

            if (this._pTargetObject) {
                if (this._pTargetObject) {
                    this._pTargetObject._iController = this;
                } else {
                    this._pTargetObject._iController = null;
                }
            }
        },
        enumerable: true,
        configurable: true
    });


    ControllerBase.prototype.update = function (interpolate) {
        if (typeof interpolate === "undefined") { interpolate = true; }
        throw new AbstractMethodError();
    };
    return ControllerBase;
})();

module.exports = ControllerBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL0NvbnRyb2xsZXJCYXNlLnRzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXJCYXNlIiwiQ29udHJvbGxlckJhc2UuY29uc3RydWN0b3IiLCJDb250cm9sbGVyQmFzZS5wTm90aWZ5VXBkYXRlIiwiQ29udHJvbGxlckJhc2UudXBkYXRlIl0sIm1hcHBpbmdzIjoiQUFBQSwrRUFDb0Y7O0FBRXBGO0lBTUNBLHdCQUFZQSxZQUFpQ0E7UUFBakNDLDJDQUFBQSxZQUFZQSxHQUFpQkEsSUFBSUE7QUFBQUEsUUFIN0NBLEtBQU9BLFlBQVlBLEdBQVdBLElBQUlBLENBQUNBO1FBS2xDQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxZQUFZQTtJQUNqQ0EsQ0FBQ0E7SUFFREQseUNBQUFBO1FBRUNFLElBQUlBLElBQUlBLENBQUNBLGNBQWNBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLG1CQUFtQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBRUE7WUFDeEZBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7U0FDM0VBO0lBQ0ZBLENBQUNBOztJQUVERjtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxjQUFjQTtRQUMzQkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBd0JBLEdBQWlCQTtZQUV4Q0EsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsSUFBSUEsR0FBR0EsQ0FBRUE7Z0JBQy9CQSxNQUFPQTthQUNQQTs7WUFFREEsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBRUE7Z0JBQzdDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQTthQUN2Q0E7WUFDREEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsR0FBR0E7O1lBRXpCQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFFQTtnQkFDN0NBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBO2FBQ3ZDQTtZQUNEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7Ozs7QUFqQkFBOztJQW1CREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUE7UUFDekJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXNCQSxHQUFXQTtZQUVoQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsR0FBR0EsQ0FBRUE7Z0JBQzdCQSxNQUFPQTthQUNQQTtZQUNEQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxHQUFHQTs7WUFFdkJBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBLENBQUVBO2dCQUN4QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBRUE7b0JBQ3hCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQTtpQkFDdkNBLEtBQU1BO29CQUNOQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQTtpQkFDdkNBO2FBQ0RBO1FBQ0ZBLENBQUNBOzs7O0FBaEJBQTs7SUFrQkRBLGtDQUFBQSxVQUFjQSxXQUEwQkE7UUFBMUJHLDBDQUFBQSxXQUFXQSxHQUFXQSxJQUFJQTtBQUFBQSxRQUV2Q0EsTUFBTUEsSUFBSUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7SUFDRkgsc0JBQUNBO0FBQURBLENBQUNBLElBQUE7O0FBRUQsK0JBQXdCLENBQUEiLCJmaWxlIjoiY29udHJvbGxlcnMvQ29udHJvbGxlckJhc2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcblxuY2xhc3MgQ29udHJvbGxlckJhc2VcbntcblxuXHRwdWJsaWMgX3BBdXRvVXBkYXRlOmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BUYXJnZXRPYmplY3Q6RGlzcGxheU9iamVjdDtcblxuXHRjb25zdHJ1Y3Rvcih0YXJnZXRPYmplY3Q6RGlzcGxheU9iamVjdCA9IG51bGwpXG5cdHtcblx0XHR0aGlzLnRhcmdldE9iamVjdCA9IHRhcmdldE9iamVjdDtcblx0fVxuXG5cdHB1YmxpYyBwTm90aWZ5VXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl9wVGFyZ2V0T2JqZWN0ICYmIHRoaXMuX3BUYXJnZXRPYmplY3QuX2lBc3NpZ25lZFBhcnRpdGlvbiAmJiB0aGlzLl9wQXV0b1VwZGF0ZSkge1xuXHRcdFx0dGhpcy5fcFRhcmdldE9iamVjdC5faUFzc2lnbmVkUGFydGl0aW9uLmlNYXJrRm9yVXBkYXRlKHRoaXMuX3BUYXJnZXRPYmplY3QpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgdGFyZ2V0T2JqZWN0KCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BUYXJnZXRPYmplY3Q7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRhcmdldE9iamVjdCh2YWw6RGlzcGxheU9iamVjdClcblx0e1xuXHRcdGlmICh0aGlzLl9wVGFyZ2V0T2JqZWN0ID09IHZhbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9wVGFyZ2V0T2JqZWN0ICYmIHRoaXMuX3BBdXRvVXBkYXRlKSB7XG5cdFx0XHR0aGlzLl9wVGFyZ2V0T2JqZWN0Ll9pQ29udHJvbGxlciA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMuX3BUYXJnZXRPYmplY3QgPSB2YWw7XG5cblx0XHRpZiAodGhpcy5fcFRhcmdldE9iamVjdCAmJiB0aGlzLl9wQXV0b1VwZGF0ZSkge1xuXHRcdFx0dGhpcy5fcFRhcmdldE9iamVjdC5faUNvbnRyb2xsZXIgPSB0aGlzO1xuXHRcdH1cblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgYXV0b1VwZGF0ZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQXV0b1VwZGF0ZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYXV0b1VwZGF0ZSh2YWw6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9wQXV0b1VwZGF0ZSA9PSB2YWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fcEF1dG9VcGRhdGUgPSB2YWw7XG5cblx0XHRpZiAodGhpcy5fcFRhcmdldE9iamVjdCkge1xuXHRcdFx0aWYgKHRoaXMuX3BUYXJnZXRPYmplY3QpIHtcblx0XHRcdFx0dGhpcy5fcFRhcmdldE9iamVjdC5faUNvbnRyb2xsZXIgPSB0aGlzO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fcFRhcmdldE9iamVjdC5faUNvbnRyb2xsZXIgPSBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoaW50ZXJwb2xhdGU6Ym9vbGVhbiA9IHRydWUpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG59XG5cbmV4cG9ydCA9IENvbnRyb2xsZXJCYXNlOyJdfQ==