var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ControllerBase = require("awayjs-core/lib/controllers/ControllerBase");

var MathConsts = require("awayjs-core/lib/core/geom/MathConsts");

/**
* Extended camera used to hover round a specified target object.
*
* @see    away3d.containers.View3D
*/
var FirstPersonController = (function (_super) {
    __extends(FirstPersonController, _super);
    /**
    * Creates a new <code>HoverController</code> object.
    */
    function FirstPersonController(targetObject, panAngle, tiltAngle, minTiltAngle, maxTiltAngle, steps, wrapPanAngle) {
        if (typeof targetObject === "undefined") { targetObject = null; }
        if (typeof panAngle === "undefined") { panAngle = 0; }
        if (typeof tiltAngle === "undefined") { tiltAngle = 90; }
        if (typeof minTiltAngle === "undefined") { minTiltAngle = -90; }
        if (typeof maxTiltAngle === "undefined") { maxTiltAngle = 90; }
        if (typeof steps === "undefined") { steps = 8; }
        if (typeof wrapPanAngle === "undefined") { wrapPanAngle = false; }
        _super.call(this, targetObject);
        this._iCurrentPanAngle = 0;
        this._iCurrentTiltAngle = 90;
        this._panAngle = 0;
        this._tiltAngle = 90;
        this._minTiltAngle = -90;
        this._maxTiltAngle = 90;
        this._steps = 8;
        this._walkIncrement = 0;
        this._strafeIncrement = 0;
        this._wrapPanAngle = false;
        this.fly = false;

        this.panAngle = panAngle;
        this.tiltAngle = tiltAngle;
        this.minTiltAngle = minTiltAngle;
        this.maxTiltAngle = maxTiltAngle;
        this.steps = steps;
        this.wrapPanAngle = wrapPanAngle;

        //values passed in contrustor are applied immediately
        this._iCurrentPanAngle = this._panAngle;
        this._iCurrentTiltAngle = this._tiltAngle;
    }
    Object.defineProperty(FirstPersonController.prototype, "steps", {
        /**
        * Fractional step taken each time the <code>hover()</code> method is called. Defaults to 8.
        *
        * Affects the speed at which the <code>tiltAngle</code> and <code>panAngle</code> resolve to their targets.
        *
        * @see    #tiltAngle
        * @see    #panAngle
        */
        get: function () {
            return this._steps;
        },
        set: function (val) {
            val = (val < 1) ? 1 : val;

            if (this._steps == val)
                return;

            this._steps = val;

            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(FirstPersonController.prototype, "panAngle", {
        /**
        * Rotation of the camera in degrees around the y axis. Defaults to 0.
        */
        get: function () {
            return this._panAngle;
        },
        set: function (val) {
            if (this._panAngle == val)
                return;

            this._panAngle = val;

            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(FirstPersonController.prototype, "tiltAngle", {
        /**
        * Elevation angle of the camera in degrees. Defaults to 90.
        */
        get: function () {
            return this._tiltAngle;
        },
        set: function (val) {
            val = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, val));

            if (this._tiltAngle == val)
                return;

            this._tiltAngle = val;

            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(FirstPersonController.prototype, "minTiltAngle", {
        /**
        * Minimum bounds for the <code>tiltAngle</code>. Defaults to -90.
        *
        * @see    #tiltAngle
        */
        get: function () {
            return this._minTiltAngle;
        },
        set: function (val) {
            if (this._minTiltAngle == val)
                return;

            this._minTiltAngle = val;

            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(FirstPersonController.prototype, "maxTiltAngle", {
        /**
        * Maximum bounds for the <code>tiltAngle</code>. Defaults to 90.
        *
        * @see    #tiltAngle
        */
        get: function () {
            return this._maxTiltAngle;
        },
        set: function (val) {
            if (this._maxTiltAngle == val)
                return;

            this._maxTiltAngle = val;

            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(FirstPersonController.prototype, "wrapPanAngle", {
        /**
        * Defines whether the value of the pan angle wraps when over 360 degrees or under 0 degrees. Defaults to false.
        */
        get: function () {
            return this._wrapPanAngle;
        },
        set: function (val) {
            if (this._wrapPanAngle == val)
                return;

            this._wrapPanAngle = val;

            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    /**
    * Updates the current tilt angle and pan angle values.
    *
    * Values are calculated using the defined <code>tiltAngle</code>, <code>panAngle</code> and <code>steps</code> variables.
    *
    * @param interpolate   If the update to a target pan- or tiltAngle is interpolated. Default is true.
    *
    * @see    #tiltAngle
    * @see    #panAngle
    * @see    #steps
    */
    FirstPersonController.prototype.update = function (interpolate) {
        if (typeof interpolate === "undefined") { interpolate = true; }
        if (this._tiltAngle != this._iCurrentTiltAngle || this._panAngle != this._iCurrentPanAngle) {
            this.pNotifyUpdate();

            if (this._wrapPanAngle) {
                if (this._panAngle < 0) {
                    this._iCurrentPanAngle += this._panAngle % 360 + 360 - this._panAngle;
                    this._panAngle = this._panAngle % 360 + 360;
                } else {
                    this._iCurrentPanAngle += this._panAngle % 360 - this._panAngle;
                    this._panAngle = this._panAngle % 360;
                }

                while (this._panAngle - this._iCurrentPanAngle < -180)
                    this._iCurrentPanAngle -= 360;

                while (this._panAngle - this._iCurrentPanAngle > 180)
                    this._iCurrentPanAngle += 360;
            }

            if (interpolate) {
                this._iCurrentTiltAngle += (this._tiltAngle - this._iCurrentTiltAngle) / (this.steps + 1);
                this._iCurrentPanAngle += (this._panAngle - this._iCurrentPanAngle) / (this.steps + 1);
            } else {
                this._iCurrentTiltAngle = this._tiltAngle;
                this._iCurrentPanAngle = this._panAngle;
            }

            //snap coords if angle differences are close
            if ((Math.abs(this.tiltAngle - this._iCurrentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._iCurrentPanAngle) < 0.01)) {
                this._iCurrentTiltAngle = this._tiltAngle;
                this._iCurrentPanAngle = this._panAngle;
            }
        }

        this.targetObject.rotationX = this._iCurrentTiltAngle;
        this.targetObject.rotationY = this._iCurrentPanAngle;

        if (this._walkIncrement) {
            if (this.fly) {
                this.targetObject.transform.moveForward(this._walkIncrement);
            } else {
                this.targetObject.x += this._walkIncrement * Math.sin(this._panAngle * MathConsts.DEGREES_TO_RADIANS);
                this.targetObject.z += this._walkIncrement * Math.cos(this._panAngle * MathConsts.DEGREES_TO_RADIANS);
            }
            this._walkIncrement = 0;
        }

        if (this._strafeIncrement) {
            this.targetObject.transform.moveRight(this._strafeIncrement);
            this._strafeIncrement = 0;
        }
    };

    FirstPersonController.prototype.incrementWalk = function (val) {
        if (val == 0)
            return;

        this._walkIncrement += val;

        this.pNotifyUpdate();
    };

    FirstPersonController.prototype.incrementStrafe = function (val) {
        if (val == 0)
            return;

        this._strafeIncrement += val;

        this.pNotifyUpdate();
    };
    return FirstPersonController;
})(ControllerBase);

module.exports = FirstPersonController;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL0ZpcnN0UGVyc29uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJGaXJzdFBlcnNvbkNvbnRyb2xsZXIiLCJGaXJzdFBlcnNvbkNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJGaXJzdFBlcnNvbkNvbnRyb2xsZXIudXBkYXRlIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLmluY3JlbWVudFdhbGsiLCJGaXJzdFBlcnNvbkNvbnRyb2xsZXIuaW5jcmVtZW50U3RyYWZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwRUFBZ0Y7O0FBRWhGLGdFQUF1RTs7QUFFdkU7Ozs7RUFJRztBQUNIO0lBQW9DQSx3Q0FBY0E7SUE2SWpEQTs7TUFER0E7SUFDSEEsK0JBQVlBLFlBQWlDQSxFQUFFQSxRQUFtQkEsRUFBRUEsU0FBcUJBLEVBQUVBLFlBQXlCQSxFQUFFQSxZQUF3QkEsRUFBRUEsS0FBZ0JBLEVBQUVBLFlBQTRCQTtRQUFsTEMsMkNBQUFBLFlBQVlBLEdBQWlCQSxJQUFJQTtBQUFBQSxRQUFFQSx1Q0FBQUEsUUFBUUEsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsd0NBQUFBLFNBQVNBLEdBQVVBLEVBQUVBO0FBQUFBLFFBQUVBLDJDQUFBQSxZQUFZQSxHQUFVQSxDQUFDQSxFQUFFQTtBQUFBQSxRQUFFQSwyQ0FBQUEsWUFBWUEsR0FBVUEsRUFBRUE7QUFBQUEsUUFBRUEsb0NBQUFBLEtBQUtBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLDJDQUFBQSxZQUFZQSxHQUFXQSxLQUFLQTtBQUFBQSxRQUU3TEEsV0FBTUEsT0FBQUEsWUFBWUEsQ0FBQ0E7UUE3SXBCQSxLQUFPQSxpQkFBaUJBLEdBQVVBLENBQUNBLENBQUNBO1FBQ3BDQSxLQUFRQSxrQkFBa0JBLEdBQVVBLEVBQUVBLENBQUNBO1FBRXZDQSxLQUFRQSxTQUFTQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUM3QkEsS0FBUUEsVUFBVUEsR0FBVUEsRUFBRUEsQ0FBQ0E7UUFDL0JBLEtBQVFBLGFB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U0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDN0ZBLENBQUNBOzs7O0FBVkFBOztJQWlCREE7UUFBQUE7Ozs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsYUFBYUE7UUFDMUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXdCQSxHQUFVQTtZQUVqQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsR0FBR0E7Z0JBQzVCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsR0FBR0E7O1lBRXhCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUM3RkEsQ0FBQ0E7Ozs7QUFWQUE7O0lBZ0JEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsYUFBYUE7UUFDMUJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXdCQSxHQUFXQTtZQUVsQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsR0FBR0E7Z0JBQzVCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsR0FBR0E7O1lBRXhCQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7Ozs7QUFWQUE7O0lBMENEQTs7Ozs7Ozs7OztNQURHQTs2Q0FDSEEsVUFBY0EsV0FBMEJBO1FBQTFCRSwwQ0FBQUEsV0FBV0EsR0FBV0EsSUFBSUE7QUFBQUEsUUFFdkNBLElBQUlBLElBQUlBLENBQUNBLFVB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SUFDckJBLENBQUNBO0lBRUZKLDZCQUFDQTtBQUFEQSxDQUFDQSxFQXJQbUMsY0FBYyxFQXFQakQ7O0FBRUQsc0NBQStCLENBQUEiLCJmaWxlIjoiY29udHJvbGxlcnMvRmlyc3RQZXJzb25Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRyb2xsZXJCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvbnRyb2xsZXJzL0NvbnRyb2xsZXJCYXNlXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgTWF0aENvbnN0c1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRoQ29uc3RzXCIpO1xuXG4vKipcbiAqIEV4dGVuZGVkIGNhbWVyYSB1c2VkIHRvIGhvdmVyIHJvdW5kIGEgc3BlY2lmaWVkIHRhcmdldCBvYmplY3QuXG4gKlxuICogQHNlZSAgICBhd2F5M2QuY29udGFpbmVycy5WaWV3M0RcbiAqL1xuY2xhc3MgRmlyc3RQZXJzb25Db250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlckJhc2Vcbntcblx0cHVibGljIF9pQ3VycmVudFBhbkFuZ2xlOm51bWJlciA9IDA7XG5cdHB1YmxpYyAgX2lDdXJyZW50VGlsdEFuZ2xlOm51bWJlciA9IDkwO1xuXG5cdHByaXZhdGUgX3BhbkFuZ2xlOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX3RpbHRBbmdsZTpudW1iZXIgPSA5MDtcblx0cHJpdmF0ZSBfbWluVGlsdEFuZ2xlOm51bWJlciA9IC05MDtcblx0cHJpdmF0ZSBfbWF4VGlsdEFuZ2xlOm51bWJlciA9IDkwO1xuXHRwcml2YXRlIF9zdGVwczpudW1iZXIgPSA4O1xuXHRwcml2YXRlIF93YWxrSW5jcmVtZW50Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX3N0cmFmZUluY3JlbWVudDpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF93cmFwUGFuQW5nbGU6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdHB1YmxpYyBmbHk6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiBGcmFjdGlvbmFsIHN0ZXAgdGFrZW4gZWFjaCB0aW1lIHRoZSA8Y29kZT5ob3ZlcigpPC9jb2RlPiBtZXRob2QgaXMgY2FsbGVkLiBEZWZhdWx0cyB0byA4LlxuXHQgKlxuXHQgKiBBZmZlY3RzIHRoZSBzcGVlZCBhdCB3aGljaCB0aGUgPGNvZGU+dGlsdEFuZ2xlPC9jb2RlPiBhbmQgPGNvZGU+cGFuQW5nbGU8L2NvZGU+IHJlc29sdmUgdG8gdGhlaXIgdGFyZ2V0cy5cblx0ICpcblx0ICogQHNlZSAgICAjdGlsdEFuZ2xlXG5cdCAqIEBzZWUgICAgI3BhbkFuZ2xlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHN0ZXBzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3RlcHM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHN0ZXBzKHZhbDpudW1iZXIpXG5cdHtcblx0XHR2YWwgPSAodmFsIDwgMSk/IDEgOiB2YWw7XG5cblx0XHRpZiAodGhpcy5fc3RlcHMgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc3RlcHMgPSB2YWw7XG5cblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGlvbiBvZiB0aGUgY2FtZXJhIGluIGRlZ3JlZXMgYXJvdW5kIHRoZSB5IGF4aXMuIERlZmF1bHRzIHRvIDAuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBhbkFuZ2xlKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFuQW5nbGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBhbkFuZ2xlKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcGFuQW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcGFuQW5nbGUgPSB2YWw7XG5cblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFbGV2YXRpb24gYW5nbGUgb2YgdGhlIGNhbWVyYSBpbiBkZWdyZWVzLiBEZWZhdWx0cyB0byA5MC5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGlsdEFuZ2xlKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdGlsdEFuZ2xlO1xuXHR9XG5cblx0cHVibGljIHNldCB0aWx0QW5nbGUodmFsOm51bWJlcilcblx0e1xuXHRcdHZhbCA9IE1hdGgubWF4KHRoaXMuX21pblRpbHRBbmdsZSwgTWF0aC5taW4odGhpcy5fbWF4VGlsdEFuZ2xlLCB2YWwpKTtcblxuXHRcdGlmICh0aGlzLl90aWx0QW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdGlsdEFuZ2xlID0gdmFsO1xuXG5cdFx0dGhpcy5wTm90aWZ5VXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWluaW11bSBib3VuZHMgZm9yIHRoZSA8Y29kZT50aWx0QW5nbGU8L2NvZGU+LiBEZWZhdWx0cyB0byAtOTAuXG5cdCAqXG5cdCAqIEBzZWUgICAgI3RpbHRBbmdsZVxuXHQgKi9cblx0cHVibGljIGdldCBtaW5UaWx0QW5nbGUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9taW5UaWx0QW5nbGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1pblRpbHRBbmdsZSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX21pblRpbHRBbmdsZSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9taW5UaWx0QW5nbGUgPSB2YWw7XG5cblx0XHR0aGlzLnRpbHRBbmdsZSA9IE1hdGgubWF4KHRoaXMuX21pblRpbHRBbmdsZSwgTWF0aC5taW4odGhpcy5fbWF4VGlsdEFuZ2xlLCB0aGlzLl90aWx0QW5nbGUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXhpbXVtIGJvdW5kcyBmb3IgdGhlIDxjb2RlPnRpbHRBbmdsZTwvY29kZT4uIERlZmF1bHRzIHRvIDkwLlxuXHQgKlxuXHQgKiBAc2VlICAgICN0aWx0QW5nbGVcblx0ICovXG5cdHB1YmxpYyBnZXQgbWF4VGlsdEFuZ2xlKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF4VGlsdEFuZ2xlO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXhUaWx0QW5nbGUodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9tYXhUaWx0QW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fbWF4VGlsdEFuZ2xlID0gdmFsO1xuXG5cdFx0dGhpcy50aWx0QW5nbGUgPSBNYXRoLm1heCh0aGlzLl9taW5UaWx0QW5nbGUsIE1hdGgubWluKHRoaXMuX21heFRpbHRBbmdsZSwgdGhpcy5fdGlsdEFuZ2xlKSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIHZhbHVlIG9mIHRoZSBwYW4gYW5nbGUgd3JhcHMgd2hlbiBvdmVyIDM2MCBkZWdyZWVzIG9yIHVuZGVyIDAgZGVncmVlcy4gRGVmYXVsdHMgdG8gZmFsc2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdyYXBQYW5BbmdsZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl93cmFwUGFuQW5nbGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHdyYXBQYW5BbmdsZSh2YWw6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl93cmFwUGFuQW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fd3JhcFBhbkFuZ2xlID0gdmFsO1xuXG5cdFx0dGhpcy5wTm90aWZ5VXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5Ib3ZlckNvbnRyb2xsZXI8L2NvZGU+IG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHRhcmdldE9iamVjdDpEaXNwbGF5T2JqZWN0ID0gbnVsbCwgcGFuQW5nbGU6bnVtYmVyID0gMCwgdGlsdEFuZ2xlOm51bWJlciA9IDkwLCBtaW5UaWx0QW5nbGU6bnVtYmVyID0gLTkwLCBtYXhUaWx0QW5nbGU6bnVtYmVyID0gOTAsIHN0ZXBzOm51bWJlciA9IDgsIHdyYXBQYW5BbmdsZTpib29sZWFuID0gZmFsc2UpXG5cdHtcblx0XHRzdXBlcih0YXJnZXRPYmplY3QpO1xuXG5cdFx0dGhpcy5wYW5BbmdsZSA9IHBhbkFuZ2xlO1xuXHRcdHRoaXMudGlsdEFuZ2xlID0gdGlsdEFuZ2xlO1xuXHRcdHRoaXMubWluVGlsdEFuZ2xlID0gbWluVGlsdEFuZ2xlO1xuXHRcdHRoaXMubWF4VGlsdEFuZ2xlID0gbWF4VGlsdEFuZ2xlO1xuXHRcdHRoaXMuc3RlcHMgPSBzdGVwcztcblx0XHR0aGlzLndyYXBQYW5BbmdsZSA9IHdyYXBQYW5BbmdsZTtcblxuXHRcdC8vdmFsdWVzIHBhc3NlZCBpbiBjb250cnVzdG9yIGFyZSBhcHBsaWVkIGltbWVkaWF0ZWx5XG5cdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSA9IHRoaXMuX3BhbkFuZ2xlO1xuXHRcdHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlID0gdGhpcy5fdGlsdEFuZ2xlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGN1cnJlbnQgdGlsdCBhbmdsZSBhbmQgcGFuIGFuZ2xlIHZhbHVlcy5cblx0ICpcblx0ICogVmFsdWVzIGFyZSBjYWxjdWxhdGVkIHVzaW5nIHRoZSBkZWZpbmVkIDxjb2RlPnRpbHRBbmdsZTwvY29kZT4sIDxjb2RlPnBhbkFuZ2xlPC9jb2RlPiBhbmQgPGNvZGU+c3RlcHM8L2NvZGU+IHZhcmlhYmxlcy5cblx0ICpcblx0ICogQHBhcmFtIGludGVycG9sYXRlICAgSWYgdGhlIHVwZGF0ZSB0byBhIHRhcmdldCBwYW4tIG9yIHRpbHRBbmdsZSBpcyBpbnRlcnBvbGF0ZWQuIERlZmF1bHQgaXMgdHJ1ZS5cblx0ICpcblx0ICogQHNlZSAgICAjdGlsdEFuZ2xlXG5cdCAqIEBzZWUgICAgI3BhbkFuZ2xlXG5cdCAqIEBzZWUgICAgI3N0ZXBzXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlKGludGVycG9sYXRlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3RpbHRBbmdsZSAhPSB0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSB8fCB0aGlzLl9wYW5BbmdsZSAhPSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlKSB7XG5cblx0XHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXG5cdFx0XHRpZiAodGhpcy5fd3JhcFBhbkFuZ2xlKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9wYW5BbmdsZSA8IDApIHtcblx0XHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlICs9IHRoaXMuX3BhbkFuZ2xlJTM2MCArIDM2MCAtIHRoaXMuX3BhbkFuZ2xlO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkFuZ2xlID0gdGhpcy5fcGFuQW5nbGUlMzYwICsgMzYwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgKz0gdGhpcy5fcGFuQW5nbGUlMzYwIC0gdGhpcy5fcGFuQW5nbGU7XG5cdFx0XHRcdFx0dGhpcy5fcGFuQW5nbGUgPSB0aGlzLl9wYW5BbmdsZSUzNjA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3aGlsZSAodGhpcy5fcGFuQW5nbGUgLSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlIDwgLTE4MClcblx0XHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlIC09IDM2MDtcblxuXHRcdFx0XHR3aGlsZSAodGhpcy5fcGFuQW5nbGUgLSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlID4gMTgwKVxuXHRcdFx0XHRcdHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgKz0gMzYwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaW50ZXJwb2xhdGUpIHtcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRUaWx0QW5nbGUgKz0gKHRoaXMuX3RpbHRBbmdsZSAtIHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlKS8odGhpcy5zdGVwcyArIDEpO1xuXHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlICs9ICh0aGlzLl9wYW5BbmdsZSAtIHRoaXMuX2lDdXJyZW50UGFuQW5nbGUpLyh0aGlzLnN0ZXBzICsgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSA9IHRoaXMuX3RpbHRBbmdsZTtcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSA9IHRoaXMuX3BhbkFuZ2xlO1xuXHRcdFx0fVxuXG5cdFx0XHQvL3NuYXAgY29vcmRzIGlmIGFuZ2xlIGRpZmZlcmVuY2VzIGFyZSBjbG9zZVxuXHRcdFx0aWYgKChNYXRoLmFicyh0aGlzLnRpbHRBbmdsZSAtIHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlKSA8IDAuMDEpICYmIChNYXRoLmFicyh0aGlzLl9wYW5BbmdsZSAtIHRoaXMuX2lDdXJyZW50UGFuQW5nbGUpIDwgMC4wMSkpIHtcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRUaWx0QW5nbGUgPSB0aGlzLl90aWx0QW5nbGU7XG5cdFx0XHRcdHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgPSB0aGlzLl9wYW5BbmdsZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnRhcmdldE9iamVjdC5yb3RhdGlvblggPSB0aGlzLl9pQ3VycmVudFRpbHRBbmdsZTtcblx0XHR0aGlzLnRhcmdldE9iamVjdC5yb3RhdGlvblkgPSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlO1xuXG5cdFx0aWYgKHRoaXMuX3dhbGtJbmNyZW1lbnQpIHtcblx0XHRcdGlmICh0aGlzLmZseSkge1xuXHRcdFx0XHR0aGlzLnRhcmdldE9iamVjdC50cmFuc2Zvcm0ubW92ZUZvcndhcmQodGhpcy5fd2Fsa0luY3JlbWVudCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnRhcmdldE9iamVjdC54ICs9IHRoaXMuX3dhbGtJbmNyZW1lbnQqTWF0aC5zaW4odGhpcy5fcGFuQW5nbGUqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlMpO1xuXHRcdFx0XHR0aGlzLnRhcmdldE9iamVjdC56ICs9IHRoaXMuX3dhbGtJbmNyZW1lbnQqTWF0aC5jb3ModGhpcy5fcGFuQW5nbGUqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlMpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fd2Fsa0luY3JlbWVudCA9IDA7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3N0cmFmZUluY3JlbWVudCkge1xuXHRcdFx0dGhpcy50YXJnZXRPYmplY3QudHJhbnNmb3JtLm1vdmVSaWdodCh0aGlzLl9zdHJhZmVJbmNyZW1lbnQpO1xuXHRcdFx0dGhpcy5fc3RyYWZlSW5jcmVtZW50ID0gMDtcblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBpbmNyZW1lbnRXYWxrKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsID09IDApXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl93YWxrSW5jcmVtZW50ICs9IHZhbDtcblxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXHR9XG5cblx0cHVibGljIGluY3JlbWVudFN0cmFmZSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbCA9PSAwKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc3RyYWZlSW5jcmVtZW50ICs9IHZhbDtcblxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXHR9XG5cbn1cblxuZXhwb3J0ID0gRmlyc3RQZXJzb25Db250cm9sbGVyOyJdfQ==