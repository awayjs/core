var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HoverController = require("awayjs-core/lib/controllers/HoverController");

/**
* Controller used to follow behind an object on the XZ plane, with an optional
* elevation (tiltAngle).
*
* @see    away3d.containers.View3D
*/
var FollowController = (function (_super) {
    __extends(FollowController, _super);
    function FollowController(targetObject, lookAtObject, tiltAngle, distance) {
        if (typeof targetObject === "undefined") { targetObject = null; }
        if (typeof lookAtObject === "undefined") { lookAtObject = null; }
        if (typeof tiltAngle === "undefined") { tiltAngle = 45; }
        if (typeof distance === "undefined") { distance = 700; }
        _super.call(this, targetObject, lookAtObject, 0, tiltAngle, distance);
    }
    FollowController.prototype.update = function (interpolate) {
        if (typeof interpolate === "undefined") { interpolate = true; }
        interpolate = interpolate; // unused: prevents warning

        if (!this.lookAtObject)
            return;

        this.panAngle = this._pLookAtObject.rotationY - 180;
        _super.prototype.update.call(this);
    };
    return FollowController;
})(HoverController);

module.exports = FollowController;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL0ZvbGxvd0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiRm9sbG93Q29udHJvbGxlciIsIkZvbGxvd0NvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJGb2xsb3dDb250cm9sbGVyLnVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQWtGOztBQUdsRjs7Ozs7RUFLRztBQUNIO0lBQStCQSxtQ0FBZUE7SUFFN0NBLDBCQUFZQSxZQUFpQ0EsRUFBRUEsWUFBaUNBLEVBQUVBLFNBQXFCQSxFQUFFQSxRQUFxQkE7UUFBbEhDLDJDQUFBQSxZQUFZQSxHQUFpQkEsSUFBSUE7QUFBQUEsUUFBRUEsMkNBQUFBLFlBQVlBLEdBQWlCQSxJQUFJQTtBQUFBQSxRQUFFQSx3Q0FBQUEsU0FBU0EsR0FBVUEsRUFBRUE7QUFBQUEsUUFBRUEsdUNBQUFBLFFBQVFBLEdBQVVBLEdBQUdBO0FBQUFBLFFBRTdIQSxXQUFNQSxPQUFBQSxZQUFZQSxFQUFFQSxZQUFZQSxFQUFFQSxDQUFDQSxFQUFFQSxTQUFTQSxFQUFFQSxRQUFRQSxDQUFDQTtJQUMxREEsQ0FBQ0E7SUFFREQsb0NBQUFBLFVBQWNBLFdBQTBCQTtRQUExQkUsMENBQUFBLFdBQVdBLEdBQVdBLElBQUlBO0FBQUFBLFFBRXZDQSxXQUFXQSxHQUFHQSxXQUFXQSxFQUFFQSwyQkFBMkJBOztRQUV0REEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUE7WUFDckJBLE1BQU9BLENBQUFBOztRQUVSQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxTQUFTQSxHQUFHQSxHQUFHQTtRQUNuREEsZ0JBQUtBLENBQUNBLE1BQU1BLEtBQUNBLEtBQUFBLENBQUNBO0lBQ2ZBLENBQUNBO0lBQ0ZGLHdCQUFDQTtBQUFEQSxDQUFDQSxFQWpCOEIsZUFBZSxFQWlCN0M7O0FBRUQsaUNBQTBCLENBQUEiLCJmaWxlIjoiY29udHJvbGxlcnMvRm9sbG93Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIb3ZlckNvbnRyb2xsZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29udHJvbGxlcnMvSG92ZXJDb250cm9sbGVyXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5cbi8qKlxuICogQ29udHJvbGxlciB1c2VkIHRvIGZvbGxvdyBiZWhpbmQgYW4gb2JqZWN0IG9uIHRoZSBYWiBwbGFuZSwgd2l0aCBhbiBvcHRpb25hbFxuICogZWxldmF0aW9uICh0aWx0QW5nbGUpLlxuICpcbiAqIEBzZWUgICAgYXdheTNkLmNvbnRhaW5lcnMuVmlldzNEXG4gKi9cbmNsYXNzIEZvbGxvd0NvbnRyb2xsZXIgZXh0ZW5kcyBIb3ZlckNvbnRyb2xsZXJcbntcblx0Y29uc3RydWN0b3IodGFyZ2V0T2JqZWN0OkRpc3BsYXlPYmplY3QgPSBudWxsLCBsb29rQXRPYmplY3Q6RGlzcGxheU9iamVjdCA9IG51bGwsIHRpbHRBbmdsZTpudW1iZXIgPSA0NSwgZGlzdGFuY2U6bnVtYmVyID0gNzAwKVxuXHR7XG5cdFx0c3VwZXIodGFyZ2V0T2JqZWN0LCBsb29rQXRPYmplY3QsIDAsIHRpbHRBbmdsZSwgZGlzdGFuY2UpO1xuXHR9XG5cblx0cHVibGljIHVwZGF0ZShpbnRlcnBvbGF0ZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdGludGVycG9sYXRlID0gaW50ZXJwb2xhdGU7IC8vIHVudXNlZDogcHJldmVudHMgd2FybmluZ1xuXG5cdFx0aWYgKCF0aGlzLmxvb2tBdE9iamVjdClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMucGFuQW5nbGUgPSB0aGlzLl9wTG9va0F0T2JqZWN0LnJvdGF0aW9uWSAtIDE4MDtcblx0XHRzdXBlci51cGRhdGUoKTtcblx0fVxufVxuXG5leHBvcnQgPSBGb2xsb3dDb250cm9sbGVyOyJdfQ==