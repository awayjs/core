var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ControllerBase = require("awayjs-core/lib/controllers/ControllerBase");

var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");
var DisplayObjectEvent = require("awayjs-core/lib/events/DisplayObjectEvent");

var LookAtController = (function (_super) {
    __extends(LookAtController, _super);
    function LookAtController(targetObject, lookAtObject) {
        if (typeof targetObject === "undefined") { targetObject = null; }
        if (typeof lookAtObject === "undefined") { lookAtObject = null; }
        var _this = this;
        _super.call(this, targetObject);
        this._pOrigin = new Vector3D(0.0, 0.0, 0.0);

        this._onLookAtObjectChangedDelegate = function (event) {
            return _this.onLookAtObjectChanged(event);
        };

        if (lookAtObject)
            this.lookAtObject = lookAtObject;
        else
            this.lookAtPosition = new Vector3D();
    }
    Object.defineProperty(LookAtController.prototype, "lookAtPosition", {
        get: function () {
            return this._pLookAtPosition;
        },
        set: function (val) {
            if (this._pLookAtObject) {
                this._pLookAtObject.removeEventListener(DisplayObjectEvent.SCENETRANSFORM_CHANGED, this._onLookAtObjectChangedDelegate);
                this._pLookAtObject = null;
            }

            this._pLookAtPosition = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(LookAtController.prototype, "lookAtObject", {
        get: function () {
            return this._pLookAtObject;
        },
        set: function (val) {
            if (this._pLookAtPosition)
                this._pLookAtPosition = null;

            if (this._pLookAtObject == val)
                return;

            if (this._pLookAtObject)
                this._pLookAtObject.removeEventListener(DisplayObjectEvent.SCENETRANSFORM_CHANGED, this._onLookAtObjectChangedDelegate);

            this._pLookAtObject = val;

            if (this._pLookAtObject)
                this._pLookAtObject.addEventListener(DisplayObjectEvent.SCENETRANSFORM_CHANGED, this._onLookAtObjectChangedDelegate);

            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    //@override
    LookAtController.prototype.update = function (interpolate) {
        if (typeof interpolate === "undefined") { interpolate = true; }
        if (this._pTargetObject) {
            if (this._pLookAtPosition)
                this._pTargetObject.lookAt(this._pLookAtPosition);
            else if (this._pLookAtObject)
                this._pTargetObject.lookAt(this._pLookAtObject.scene ? this._pLookAtObject.scenePosition : this._pLookAtObject.transform.position);
        }
    };

    LookAtController.prototype.onLookAtObjectChanged = function (event) {
        this.pNotifyUpdate();
    };
    return LookAtController;
})(ControllerBase);

module.exports = LookAtController;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL0xvb2tBdENvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiTG9va0F0Q29udHJvbGxlciIsIkxvb2tBdENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMb29rQXRDb250cm9sbGVyLnVwZGF0ZSIsIkxvb2tBdENvbnRyb2xsZXIub25Mb29rQXRPYmplY3RDaGFuZ2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwRUFBZ0Y7O0FBRWhGLDREQUFvRTtBQUNwRSw2RUFBa0Y7O0FBRWxGO0lBQStCQSxtQ0FBY0E7SUFRNUNBLDBCQUFZQSxZQUFpQ0EsRUFBRUEsWUFBaUNBO1FBQXBFQywyQ0FBQUEsWUFBWUEsR0FBaUJBLElBQUlBO0FBQUFBLFFBQUVBLDJDQUFBQSxZQUFZQSxHQUFpQkEsSUFBSUE7QUFBQUEsUUFBaEZBLGlCQVVDQTtRQVJBQSxXQUFNQSxPQUFBQSxZQUFZQSxDQUFDQTtRQU5wQkEsS0FBT0EsUUFBUUEsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7O1FBUXREQSxJQUFJQSxDQUFDQSw4QkFBOEJBLEdBQUdBLFVBQUNBLEtBQXdCQTttQkFBS0EsS0FBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUFqQ0EsQ0FBaUNBOztRQUVyR0EsSUFBSUEsWUFBWUE7WUFDZkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsWUFBWUE7O1lBRWhDQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUN2Q0EsQ0FBQ0E7SUFFREQ7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQTtRQUM3QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBMEJBLEdBQVlBO1lBRXJDQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFFQTtnQkFDeEJBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLG1CQUFtQkEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxzQkFBc0JBLEVBQUVBLElBQUlBLENBQUNBLDhCQUE4QkEsQ0FBQ0E7Z0JBQ3ZIQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQTthQUMxQkE7O1lBRURBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsR0FBR0E7WUFDM0JBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1FBQ3JCQSxDQUFDQTs7OztBQVhBQTs7SUFhREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsY0FBY0E7UUFDM0JBLENBQUNBO1FBRURBLEtBQUFBLFVBQXdCQSxHQUFpQkE7WUFFeENBLElBQUlBLElBQUlBLENBQUNBLGdCQUFnQkE7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBOztZQUU5QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsSUFBSUEsR0FBR0E7Z0JBQzdCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0E7Z0JBQ3RCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxtQkFBbUJBLENBQUNBLGtCQUFrQkEsQ0FBQ0Esc0JBQXNCQSxFQUFFQSxJQUFJQSxDQUFDQSw4QkFBOEJBLENBQUNBLENBQUNBOztZQUV6SEEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsR0FBR0E7O1lBRXpCQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQTtnQkFDdEJBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLGdCQUFnQkEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxzQkFBc0JBLEVBQUVBLElBQUlBLENBQUNBLDhCQUE4QkEsQ0FBQ0EsQ0FBQ0E7O1lBRXRIQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7Ozs7QUFuQkFBOztJQXNCREEsV0FEV0E7d0NBQ1hBLFVBQWNBLFdBQTBCQTtRQUExQkUsMENBQUFBLFdBQVdBLEdBQVdBLElBQUlBO0FBQUFBLFFBRXZDQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFFQTtZQUN4QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQTtnQkFDeEJBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0E7aUJBQzdDQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQTtnQkFDM0JBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLEtBQUtBLEdBQUVBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1NBQ25JQTtJQUNGQSxDQUFDQTs7SUFFREYsbURBQUFBLFVBQThCQSxLQUF3QkE7UUFFckRHLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO0lBQ3JCQSxDQUFDQTtJQUNGSCx3QkFBQ0E7QUFBREEsQ0FBQ0EsRUEzRThCLGNBQWMsRUEyRTVDOztBQUVELGlDQUEwQixDQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0xvb2tBdENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udHJvbGxlckJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29udHJvbGxlcnMvQ29udHJvbGxlckJhc2VcIik7XG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RFdmVudFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Rpc3BsYXlPYmplY3RFdmVudFwiKTtcblxuY2xhc3MgTG9va0F0Q29udHJvbGxlciBleHRlbmRzIENvbnRyb2xsZXJCYXNlXG57XG5cdHB1YmxpYyBfcExvb2tBdFBvc2l0aW9uOlZlY3RvcjNEO1xuXHRwdWJsaWMgX3BMb29rQXRPYmplY3Q6RGlzcGxheU9iamVjdDtcblx0cHVibGljIF9wT3JpZ2luOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKDAuMCwgMC4wLCAwLjApO1xuXG5cdHByaXZhdGUgX29uTG9va0F0T2JqZWN0Q2hhbmdlZERlbGVnYXRlOihldmVudDpEaXNwbGF5T2JqZWN0RXZlbnQpID0+IHZvaWQ7XG5cblx0Y29uc3RydWN0b3IodGFyZ2V0T2JqZWN0OkRpc3BsYXlPYmplY3QgPSBudWxsLCBsb29rQXRPYmplY3Q6RGlzcGxheU9iamVjdCA9IG51bGwpXG5cdHtcblx0XHRzdXBlcih0YXJnZXRPYmplY3QpO1xuXG5cdFx0dGhpcy5fb25Mb29rQXRPYmplY3RDaGFuZ2VkRGVsZWdhdGUgPSAoZXZlbnQ6RGlzcGxheU9iamVjdEV2ZW50KSA9PiB0aGlzLm9uTG9va0F0T2JqZWN0Q2hhbmdlZChldmVudCk7XG5cblx0XHRpZiAobG9va0F0T2JqZWN0KVxuXHRcdFx0dGhpcy5sb29rQXRPYmplY3QgPSBsb29rQXRPYmplY3Q7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5sb29rQXRQb3NpdGlvbiA9IG5ldyBWZWN0b3IzRCgpO1xuXHR9XG5cblx0cHVibGljIGdldCBsb29rQXRQb3NpdGlvbigpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcExvb2tBdFBvc2l0aW9uO1xuXHR9XG5cblx0cHVibGljIHNldCBsb29rQXRQb3NpdGlvbih2YWw6VmVjdG9yM0QpXG5cdHtcblx0XHRpZiAodGhpcy5fcExvb2tBdE9iamVjdCkge1xuXHRcdFx0dGhpcy5fcExvb2tBdE9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyKERpc3BsYXlPYmplY3RFdmVudC5TQ0VORVRSQU5TRk9STV9DSEFOR0VELCB0aGlzLl9vbkxvb2tBdE9iamVjdENoYW5nZWREZWxlZ2F0ZSk7XG5cdFx0XHR0aGlzLl9wTG9va0F0T2JqZWN0ID0gbnVsbDtcblx0XHR9XG5cblx0XHR0aGlzLl9wTG9va0F0UG9zaXRpb24gPSB2YWw7XG5cdFx0dGhpcy5wTm90aWZ5VXBkYXRlKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGxvb2tBdE9iamVjdCgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTG9va0F0T2JqZWN0O1xuXHR9XG5cblx0cHVibGljIHNldCBsb29rQXRPYmplY3QodmFsOkRpc3BsYXlPYmplY3QpXG5cdHtcblx0XHRpZiAodGhpcy5fcExvb2tBdFBvc2l0aW9uKVxuXHRcdFx0dGhpcy5fcExvb2tBdFBvc2l0aW9uID0gbnVsbDtcblxuXHRcdGlmICh0aGlzLl9wTG9va0F0T2JqZWN0ID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICh0aGlzLl9wTG9va0F0T2JqZWN0KVxuXHRcdFx0dGhpcy5fcExvb2tBdE9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyKERpc3BsYXlPYmplY3RFdmVudC5TQ0VORVRSQU5TRk9STV9DSEFOR0VELCB0aGlzLl9vbkxvb2tBdE9iamVjdENoYW5nZWREZWxlZ2F0ZSk7XG5cblx0XHR0aGlzLl9wTG9va0F0T2JqZWN0ID0gdmFsO1xuXG5cdFx0aWYgKHRoaXMuX3BMb29rQXRPYmplY3QpXG5cdFx0XHR0aGlzLl9wTG9va0F0T2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FVFJBTlNGT1JNX0NIQU5HRUQsIHRoaXMuX29uTG9va0F0T2JqZWN0Q2hhbmdlZERlbGVnYXRlKTtcblxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIHVwZGF0ZShpbnRlcnBvbGF0ZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdGlmICh0aGlzLl9wVGFyZ2V0T2JqZWN0KSB7XG5cdFx0XHRpZiAodGhpcy5fcExvb2tBdFBvc2l0aW9uKVxuXHRcdFx0XHR0aGlzLl9wVGFyZ2V0T2JqZWN0Lmxvb2tBdCh0aGlzLl9wTG9va0F0UG9zaXRpb24pO1xuXHRcdFx0ZWxzZSBpZiAodGhpcy5fcExvb2tBdE9iamVjdClcblx0XHRcdFx0dGhpcy5fcFRhcmdldE9iamVjdC5sb29rQXQodGhpcy5fcExvb2tBdE9iamVjdC5zY2VuZT8gdGhpcy5fcExvb2tBdE9iamVjdC5zY2VuZVBvc2l0aW9uIDogdGhpcy5fcExvb2tBdE9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24pO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgb25Mb29rQXRPYmplY3RDaGFuZ2VkKGV2ZW50OkRpc3BsYXlPYmplY3RFdmVudClcblx0e1xuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXHR9XG59XG5cbmV4cG9ydCA9IExvb2tBdENvbnRyb2xsZXI7Il19