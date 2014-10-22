var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LookAtController = require("awayjs-core/lib/controllers/LookAtController");

var MathConsts = require("awayjs-core/lib/core/geom/MathConsts");
var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");

/**
* Extended camera used to hover round a specified target object.
*
* @see    away.containers.View
*/
var HoverController = (function (_super) {
    __extends(HoverController, _super);
    /**
    * Creates a new <code>HoverController</code> object.
    */
    function HoverController(targetObject, lookAtObject, panAngle, tiltAngle, distance, minTiltAngle, maxTiltAngle, minPanAngle, maxPanAngle, steps, yFactor, wrapPanAngle) {
        if (typeof targetObject === "undefined") { targetObject = null; }
        if (typeof lookAtObject === "undefined") { lookAtObject = null; }
        if (typeof panAngle === "undefined") { panAngle = 0; }
        if (typeof tiltAngle === "undefined") { tiltAngle = 90; }
        if (typeof distance === "undefined") { distance = 1000; }
        if (typeof minTiltAngle === "undefined") { minTiltAngle = -90; }
        if (typeof maxTiltAngle === "undefined") { maxTiltAngle = 90; }
        if (typeof minPanAngle === "undefined") { minPanAngle = null; }
        if (typeof maxPanAngle === "undefined") { maxPanAngle = null; }
        if (typeof steps === "undefined") { steps = 8; }
        if (typeof yFactor === "undefined") { yFactor = 2; }
        if (typeof wrapPanAngle === "undefined") { wrapPanAngle = false; }
        _super.call(this, targetObject, lookAtObject);
        this._iCurrentPanAngle = 0;
        this._iCurrentTiltAngle = 90;
        this._panAngle = 0;
        this._tiltAngle = 90;
        this._distance = 1000;
        this._minPanAngle = -Infinity;
        this._maxPanAngle = Infinity;
        this._minTiltAngle = -90;
        this._maxTiltAngle = 90;
        this._steps = 8;
        this._yFactor = 2;
        this._wrapPanAngle = false;
        this._upAxis = new Vector3D();

        this.distance = distance;
        this.panAngle = panAngle;
        this.tiltAngle = tiltAngle;
        this.minPanAngle = (minPanAngle != null) ? minPanAngle : -Infinity;
        this.maxPanAngle = (maxPanAngle != null) ? maxPanAngle : Infinity;
        this.minTiltAngle = minTiltAngle;
        this.maxTiltAngle = maxTiltAngle;
        this.steps = steps;
        this.yFactor = yFactor;
        this.wrapPanAngle = wrapPanAngle;

        //values passed in contrustor are applied immediately
        this._iCurrentPanAngle = this._panAngle;
        this._iCurrentTiltAngle = this._tiltAngle;
    }
    Object.defineProperty(HoverController.prototype, "steps", {
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


    Object.defineProperty(HoverController.prototype, "panAngle", {
        /**
        * Rotation of the camera in degrees around the y axis. Defaults to 0.
        */
        get: function () {
            return this._panAngle;
        },
        set: function (val) {
            val = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, val));

            if (this._panAngle == val)
                return;

            this._panAngle = val;

            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(HoverController.prototype, "tiltAngle", {
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


    Object.defineProperty(HoverController.prototype, "distance", {
        /**
        * Distance between the camera and the specified target. Defaults to 1000.
        */
        get: function () {
            return this._distance;
        },
        set: function (val) {
            if (this._distance == val)
                return;

            this._distance = val;

            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(HoverController.prototype, "minPanAngle", {
        /**
        * Minimum bounds for the <code>panAngle</code>. Defaults to -Infinity.
        *
        * @see    #panAngle
        */
        get: function () {
            return this._minPanAngle;
        },
        set: function (val) {
            if (this._minPanAngle == val)
                return;

            this._minPanAngle = val;

            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(HoverController.prototype, "maxPanAngle", {
        /**
        * Maximum bounds for the <code>panAngle</code>. Defaults to Infinity.
        *
        * @see    #panAngle
        */
        get: function () {
            return this._maxPanAngle;
        },
        set: function (val) {
            if (this._maxPanAngle == val)
                return;

            this._maxPanAngle = val;

            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(HoverController.prototype, "minTiltAngle", {
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


    Object.defineProperty(HoverController.prototype, "maxTiltAngle", {
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


    Object.defineProperty(HoverController.prototype, "yFactor", {
        /**
        * Fractional difference in distance between the horizontal camera orientation and vertical camera orientation. Defaults to 2.
        *
        * @see    #distance
        */
        get: function () {
            return this._yFactor;
        },
        set: function (val) {
            if (this._yFactor == val)
                return;

            this._yFactor = val;

            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(HoverController.prototype, "wrapPanAngle", {
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
    HoverController.prototype.update = function (interpolate) {
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
                this._iCurrentPanAngle = this._panAngle;
                this._iCurrentTiltAngle = this._tiltAngle;
            }

            //snap coords if angle differences are close
            if ((Math.abs(this.tiltAngle - this._iCurrentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._iCurrentPanAngle) < 0.01)) {
                this._iCurrentTiltAngle = this._tiltAngle;
                this._iCurrentPanAngle = this._panAngle;
            }
        }

        var pos = (this.lookAtObject) ? this.lookAtObject.transform.position : (this.lookAtPosition) ? this.lookAtPosition : this._pOrigin;
        this.targetObject.x = pos.x + this.distance * Math.sin(this._iCurrentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.cos(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
        this.targetObject.y = pos.y + this.distance * Math.sin(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS) * this.yFactor;
        this.targetObject.z = pos.z + this.distance * Math.cos(this._iCurrentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.cos(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);

        this._upAxis.x = -Math.sin(this._iCurrentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.sin(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
        this._upAxis.y = Math.cos(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
        this._upAxis.z = -Math.cos(this._iCurrentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.sin(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);

        if (this._pTargetObject) {
            if (this._pLookAtPosition)
                this._pTargetObject.lookAt(this._pLookAtPosition, this._upAxis);
            else if (this._pLookAtObject)
                this._pTargetObject.lookAt(this._pLookAtObject.scene ? this._pLookAtObject.scenePosition : this._pLookAtObject.transform.position, this._upAxis);
        }
    };
    return HoverController;
})(LookAtController);

module.exports = HoverController;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL0hvdmVyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJIb3ZlckNvbnRyb2xsZXIiLCJIb3ZlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJIb3ZlckNvbnRyb2xsZXIudXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4RUFBb0Y7O0FBRXBGLGdFQUF1RTtBQUN2RSw0REFBb0U7O0FBRXBFOzs7O0VBSUc7QUFDSDtJQUE4QkEsa0NBQWdCQTtJQTZON0NBOztNQURHQTtJQUNIQSx5QkFBWUEsWUFBaUNBLEVBQUVBLFlBQWlDQSxFQUFFQSxRQUFtQkEsRUFBRUEsU0FBcUJBLEVBQUVBLFFBQXNCQSxFQUFFQSxZQUF5QkEsRUFBRUEsWUFBd0JBLEVBQUVBLFdBQXlCQSxFQUFFQSxXQUF5QkEsRUFBRUEsS0FBZ0JBLEVBQUVBLE9BQWtCQSxFQUFFQSxZQUE0QkE7UUFBdlRDLDJDQUFBQSxZQUFZQSxHQUFpQkEsSUFBSUE7QUFBQUEsUUFBRUEsMkNBQUFBLFlBQVlBLEdBQWlCQSxJQUFJQTtBQUFBQSxRQUFFQSx1Q0FBQUEsUUFBUUEsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsd0NBQUFBLFNBQVNBLEdBQVVBLEVBQUVBO0FBQUFBLFFBQUVBLHVDQUFBQSxRQUFRQSxHQUFVQSxJQUFJQTtBQUFBQSxRQUFFQSwyQ0FBQUEsWUFBWUEsR0FBVUEsQ0FBQ0EsRUFBRUE7QUFBQUEsUUFBRUEsMkNBQUFBLFlBQVlBLEdBQVVBLEVBQUVBO0FBQUFBLFFBQUVBLDBDQUFBQSxXQUFXQSxHQUFVQSxJQUFJQTtBQUFBQSxRQUFFQSwwQ0FBQUEsV0FBV0EsR0FBVUEsSUFBSUE7QUFBQUEsUUFBRUEsb0NBQUFBLEtBQUtBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLHNDQUFBQSxPQUFPQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSwyQ0FBQUEsWUFBWUEsR0FBV0EsS0FBS0E7QUFBQUEsUUFFbFVBLFdBQU1BLE9BQUFBLFlBQVlBLEVBQUVBLFlBQVlB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UUEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsR0FBRUEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDeklBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFDMUtBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQTtRQUN4SEEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTs7UUFFMUtBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFDaEpBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUNoRkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTs7UUFFaEpBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBLENBQUVBO1lBQ3hCQSxJQUFJQSxJQUFJQSxDQUFDQSxnQkFBZ0JBO2dCQUN4QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtpQkFDM0RBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBO2dCQUMzQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsS0FBS0EsR0FBRUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7U0FDakpBO0lBQ0ZBLENBQUNBO0lBQ0ZGLHVCQUFDQTtBQUFEQSxDQUFDQSxFQWpUNkIsZ0JBQWdCLEVBaVQ3Qzs7QUFFRCxnQ0FBeUIsQ0FBQSIsImZpbGUiOiJjb250cm9sbGVycy9Ib3ZlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9va0F0Q29udHJvbGxlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb250cm9sbGVycy9Mb29rQXRDb250cm9sbGVyXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgTWF0aENvbnN0c1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRoQ29uc3RzXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vVmVjdG9yM0RcIik7XG5cbi8qKlxuICogRXh0ZW5kZWQgY2FtZXJhIHVzZWQgdG8gaG92ZXIgcm91bmQgYSBzcGVjaWZpZWQgdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAc2VlICAgIGF3YXkuY29udGFpbmVycy5WaWV3XG4gKi9cbmNsYXNzIEhvdmVyQ29udHJvbGxlciBleHRlbmRzIExvb2tBdENvbnRyb2xsZXJcbntcblx0cHVibGljIF9pQ3VycmVudFBhbkFuZ2xlOm51bWJlciA9IDA7XG5cdHB1YmxpYyBfaUN1cnJlbnRUaWx0QW5nbGU6bnVtYmVyID0gOTA7XG5cblx0cHJpdmF0ZSBfcGFuQW5nbGU6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfdGlsdEFuZ2xlOm51bWJlciA9IDkwO1xuXHRwcml2YXRlIF9kaXN0YW5jZTpudW1iZXIgPSAxMDAwO1xuXHRwcml2YXRlIF9taW5QYW5BbmdsZTpudW1iZXIgPSAtSW5maW5pdHk7XG5cdHByaXZhdGUgX21heFBhbkFuZ2xlOm51bWJlciA9IEluZmluaXR5O1xuXHRwcml2YXRlIF9taW5UaWx0QW5nbGU6bnVtYmVyID0gLTkwO1xuXHRwcml2YXRlIF9tYXhUaWx0QW5nbGU6bnVtYmVyID0gOTA7XG5cdHByaXZhdGUgX3N0ZXBzOm51bWJlciA9IDg7XG5cdHByaXZhdGUgX3lGYWN0b3I6bnVtYmVyID0gMjtcblx0cHJpdmF0ZSBfd3JhcFBhbkFuZ2xlOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfdXBBeGlzOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0LyoqXG5cdCAqIEZyYWN0aW9uYWwgc3RlcCB0YWtlbiBlYWNoIHRpbWUgdGhlIDxjb2RlPmhvdmVyKCk8L2NvZGU+IG1ldGhvZCBpcyBjYWxsZWQuIERlZmF1bHRzIHRvIDguXG5cdCAqXG5cdCAqIEFmZmVjdHMgdGhlIHNwZWVkIGF0IHdoaWNoIHRoZSA8Y29kZT50aWx0QW5nbGU8L2NvZGU+IGFuZCA8Y29kZT5wYW5BbmdsZTwvY29kZT4gcmVzb2x2ZSB0byB0aGVpciB0YXJnZXRzLlxuXHQgKlxuXHQgKiBAc2VlICAgICN0aWx0QW5nbGVcblx0ICogQHNlZSAgICAjcGFuQW5nbGVcblx0ICovXG5cdHB1YmxpYyBnZXQgc3RlcHMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdGVwcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgc3RlcHModmFsOm51bWJlcilcblx0e1xuXHRcdHZhbCA9ICh2YWwgPCAxKT8gMSA6IHZhbDtcblxuXHRcdGlmICh0aGlzLl9zdGVwcyA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zdGVwcyA9IHZhbDtcblxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0aW9uIG9mIHRoZSBjYW1lcmEgaW4gZGVncmVlcyBhcm91bmQgdGhlIHkgYXhpcy4gRGVmYXVsdHMgdG8gMC5cblx0ICovXG5cdHB1YmxpYyBnZXQgcGFuQW5nbGUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYW5BbmdsZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcGFuQW5nbGUodmFsOm51bWJlcilcblx0e1xuXHRcdHZhbCA9IE1hdGgubWF4KHRoaXMuX21pblBhbkFuZ2xlLCBNYXRoLm1pbih0aGlzLl9tYXhQYW5BbmdsZSwgdmFsKSk7XG5cblx0XHRpZiAodGhpcy5fcGFuQW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcGFuQW5nbGUgPSB2YWw7XG5cblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFbGV2YXRpb24gYW5nbGUgb2YgdGhlIGNhbWVyYSBpbiBkZWdyZWVzLiBEZWZhdWx0cyB0byA5MC5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGlsdEFuZ2xlKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdGlsdEFuZ2xlO1xuXHR9XG5cblx0cHVibGljIHNldCB0aWx0QW5nbGUodmFsOm51bWJlcilcblx0e1xuXHRcdHZhbCA9IE1hdGgubWF4KHRoaXMuX21pblRpbHRBbmdsZSwgTWF0aC5taW4odGhpcy5fbWF4VGlsdEFuZ2xlLCB2YWwpKTtcblxuXHRcdGlmICh0aGlzLl90aWx0QW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdGlsdEFuZ2xlID0gdmFsO1xuXG5cdFx0dGhpcy5wTm90aWZ5VXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzdGFuY2UgYmV0d2VlbiB0aGUgY2FtZXJhIGFuZCB0aGUgc3BlY2lmaWVkIHRhcmdldC4gRGVmYXVsdHMgdG8gMTAwMC5cblx0ICovXG5cdHB1YmxpYyBnZXQgZGlzdGFuY2UoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kaXN0YW5jZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZGlzdGFuY2UodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9kaXN0YW5jZSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9kaXN0YW5jZSA9IHZhbDtcblxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1pbmltdW0gYm91bmRzIGZvciB0aGUgPGNvZGU+cGFuQW5nbGU8L2NvZGU+LiBEZWZhdWx0cyB0byAtSW5maW5pdHkuXG5cdCAqXG5cdCAqIEBzZWUgICAgI3BhbkFuZ2xlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1pblBhbkFuZ2xlKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWluUGFuQW5nbGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1pblBhbkFuZ2xlKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fbWluUGFuQW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fbWluUGFuQW5nbGUgPSB2YWw7XG5cblx0XHR0aGlzLnBhbkFuZ2xlID0gTWF0aC5tYXgodGhpcy5fbWluUGFuQW5nbGUsIE1hdGgubWluKHRoaXMuX21heFBhbkFuZ2xlLCB0aGlzLl9wYW5BbmdsZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1heGltdW0gYm91bmRzIGZvciB0aGUgPGNvZGU+cGFuQW5nbGU8L2NvZGU+LiBEZWZhdWx0cyB0byBJbmZpbml0eS5cblx0ICpcblx0ICogQHNlZSAgICAjcGFuQW5nbGVcblx0ICovXG5cdHB1YmxpYyBnZXQgbWF4UGFuQW5nbGUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXhQYW5BbmdsZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWF4UGFuQW5nbGUodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9tYXhQYW5BbmdsZSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9tYXhQYW5BbmdsZSA9IHZhbDtcblxuXHRcdHRoaXMucGFuQW5nbGUgPSBNYXRoLm1heCh0aGlzLl9taW5QYW5BbmdsZSwgTWF0aC5taW4odGhpcy5fbWF4UGFuQW5nbGUsIHRoaXMuX3BhbkFuZ2xlKSk7XG5cdH1cblxuXHQvKipcblx0ICogTWluaW11bSBib3VuZHMgZm9yIHRoZSA8Y29kZT50aWx0QW5nbGU8L2NvZGU+LiBEZWZhdWx0cyB0byAtOTAuXG5cdCAqXG5cdCAqIEBzZWUgICAgI3RpbHRBbmdsZVxuXHQgKi9cblx0cHVibGljIGdldCBtaW5UaWx0QW5nbGUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9taW5UaWx0QW5nbGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1pblRpbHRBbmdsZSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX21pblRpbHRBbmdsZSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9taW5UaWx0QW5nbGUgPSB2YWw7XG5cblx0XHR0aGlzLnRpbHRBbmdsZSA9IE1hdGgubWF4KHRoaXMuX21pblRpbHRBbmdsZSwgTWF0aC5taW4odGhpcy5fbWF4VGlsdEFuZ2xlLCB0aGlzLl90aWx0QW5nbGUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXhpbXVtIGJvdW5kcyBmb3IgdGhlIDxjb2RlPnRpbHRBbmdsZTwvY29kZT4uIERlZmF1bHRzIHRvIDkwLlxuXHQgKlxuXHQgKiBAc2VlICAgICN0aWx0QW5nbGVcblx0ICovXG5cdHB1YmxpYyBnZXQgbWF4VGlsdEFuZ2xlKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF4VGlsdEFuZ2xlO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXhUaWx0QW5nbGUodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9tYXhUaWx0QW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fbWF4VGlsdEFuZ2xlID0gdmFsO1xuXG5cdFx0dGhpcy50aWx0QW5nbGUgPSBNYXRoLm1heCh0aGlzLl9taW5UaWx0QW5nbGUsIE1hdGgubWluKHRoaXMuX21heFRpbHRBbmdsZSwgdGhpcy5fdGlsdEFuZ2xlKSk7XG5cdH1cblxuXHQvKipcblx0ICogRnJhY3Rpb25hbCBkaWZmZXJlbmNlIGluIGRpc3RhbmNlIGJldHdlZW4gdGhlIGhvcml6b250YWwgY2FtZXJhIG9yaWVudGF0aW9uIGFuZCB2ZXJ0aWNhbCBjYW1lcmEgb3JpZW50YXRpb24uIERlZmF1bHRzIHRvIDIuXG5cdCAqXG5cdCAqIEBzZWUgICAgI2Rpc3RhbmNlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHlGYWN0b3IoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl95RmFjdG9yO1xuXHR9XG5cblx0cHVibGljIHNldCB5RmFjdG9yKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5feUZhY3RvciA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl95RmFjdG9yID0gdmFsO1xuXG5cdFx0dGhpcy5wTm90aWZ5VXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIHRoZSB2YWx1ZSBvZiB0aGUgcGFuIGFuZ2xlIHdyYXBzIHdoZW4gb3ZlciAzNjAgZGVncmVlcyBvciB1bmRlciAwIGRlZ3JlZXMuIERlZmF1bHRzIHRvIGZhbHNlLlxuXHQgKi9cblx0cHVibGljIGdldCB3cmFwUGFuQW5nbGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fd3JhcFBhbkFuZ2xlO1xuXHR9XG5cblx0cHVibGljIHNldCB3cmFwUGFuQW5nbGUodmFsOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fd3JhcFBhbkFuZ2xlID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3dyYXBQYW5BbmdsZSA9IHZhbDtcblxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+SG92ZXJDb250cm9sbGVyPC9jb2RlPiBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih0YXJnZXRPYmplY3Q6RGlzcGxheU9iamVjdCA9IG51bGwsIGxvb2tBdE9iamVjdDpEaXNwbGF5T2JqZWN0ID0gbnVsbCwgcGFuQW5nbGU6bnVtYmVyID0gMCwgdGlsdEFuZ2xlOm51bWJlciA9IDkwLCBkaXN0YW5jZTpudW1iZXIgPSAxMDAwLCBtaW5UaWx0QW5nbGU6bnVtYmVyID0gLTkwLCBtYXhUaWx0QW5nbGU6bnVtYmVyID0gOTAsIG1pblBhbkFuZ2xlOm51bWJlciA9IG51bGwsIG1heFBhbkFuZ2xlOm51bWJlciA9IG51bGwsIHN0ZXBzOm51bWJlciA9IDgsIHlGYWN0b3I6bnVtYmVyID0gMiwgd3JhcFBhbkFuZ2xlOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKHRhcmdldE9iamVjdCwgbG9va0F0T2JqZWN0KTtcblxuXHRcdHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHR0aGlzLnBhbkFuZ2xlID0gcGFuQW5nbGU7XG5cdFx0dGhpcy50aWx0QW5nbGUgPSB0aWx0QW5nbGU7XG5cdFx0dGhpcy5taW5QYW5BbmdsZSA9ICggbWluUGFuQW5nbGUgIT0gbnVsbCApPyBtaW5QYW5BbmdsZSA6IC1JbmZpbml0eTtcblx0XHR0aGlzLm1heFBhbkFuZ2xlID0gKCBtYXhQYW5BbmdsZSAhPSBudWxsICk/IG1heFBhbkFuZ2xlIDogSW5maW5pdHk7XG5cdFx0dGhpcy5taW5UaWx0QW5nbGUgPSBtaW5UaWx0QW5nbGU7XG5cdFx0dGhpcy5tYXhUaWx0QW5nbGUgPSBtYXhUaWx0QW5nbGU7XG5cdFx0dGhpcy5zdGVwcyA9IHN0ZXBzO1xuXHRcdHRoaXMueUZhY3RvciA9IHlGYWN0b3I7XG5cdFx0dGhpcy53cmFwUGFuQW5nbGUgPSB3cmFwUGFuQW5nbGU7XG5cblx0XHQvL3ZhbHVlcyBwYXNzZWQgaW4gY29udHJ1c3RvciBhcmUgYXBwbGllZCBpbW1lZGlhdGVseVxuXHRcdHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgPSB0aGlzLl9wYW5BbmdsZTtcblx0XHR0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSA9IHRoaXMuX3RpbHRBbmdsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBjdXJyZW50IHRpbHQgYW5nbGUgYW5kIHBhbiBhbmdsZSB2YWx1ZXMuXG5cdCAqXG5cdCAqIFZhbHVlcyBhcmUgY2FsY3VsYXRlZCB1c2luZyB0aGUgZGVmaW5lZCA8Y29kZT50aWx0QW5nbGU8L2NvZGU+LCA8Y29kZT5wYW5BbmdsZTwvY29kZT4gYW5kIDxjb2RlPnN0ZXBzPC9jb2RlPiB2YXJpYWJsZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSBpbnRlcnBvbGF0ZSAgIElmIHRoZSB1cGRhdGUgdG8gYSB0YXJnZXQgcGFuLSBvciB0aWx0QW5nbGUgaXMgaW50ZXJwb2xhdGVkLiBEZWZhdWx0IGlzIHRydWUuXG5cdCAqXG5cdCAqIEBzZWUgICAgI3RpbHRBbmdsZVxuXHQgKiBAc2VlICAgICNwYW5BbmdsZVxuXHQgKiBAc2VlICAgICNzdGVwc1xuXHQgKi9cblx0cHVibGljIHVwZGF0ZShpbnRlcnBvbGF0ZTpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdGlmICh0aGlzLl90aWx0QW5nbGUgIT0gdGhpcy5faUN1cnJlbnRUaWx0QW5nbGUgfHwgdGhpcy5fcGFuQW5nbGUgIT0gdGhpcy5faUN1cnJlbnRQYW5BbmdsZSkge1xuXG5cdFx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcblxuXHRcdFx0aWYgKHRoaXMuX3dyYXBQYW5BbmdsZSkge1xuXHRcdFx0XHRpZiAodGhpcy5fcGFuQW5nbGUgPCAwKSB7XG5cdFx0XHRcdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSArPSB0aGlzLl9wYW5BbmdsZSUzNjAgKyAzNjAgLSB0aGlzLl9wYW5BbmdsZTtcblx0XHRcdFx0XHR0aGlzLl9wYW5BbmdsZSA9IHRoaXMuX3BhbkFuZ2xlJTM2MCArIDM2MDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlICs9IHRoaXMuX3BhbkFuZ2xlJTM2MCAtIHRoaXMuX3BhbkFuZ2xlO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkFuZ2xlID0gdGhpcy5fcGFuQW5nbGUlMzYwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0d2hpbGUgKHRoaXMuX3BhbkFuZ2xlIC0gdGhpcy5faUN1cnJlbnRQYW5BbmdsZSA8IC0xODApXG5cdFx0XHRcdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSAtPSAzNjA7XG5cblx0XHRcdFx0d2hpbGUgKHRoaXMuX3BhbkFuZ2xlIC0gdGhpcy5faUN1cnJlbnRQYW5BbmdsZSA+IDE4MClcblx0XHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlICs9IDM2MDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGludGVycG9sYXRlKSB7XG5cdFx0XHRcdHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlICs9ICh0aGlzLl90aWx0QW5nbGUgLSB0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSkvKHRoaXMuc3RlcHMgKyAxKTtcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSArPSAodGhpcy5fcGFuQW5nbGUgLSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlKS8odGhpcy5zdGVwcyArIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSA9IHRoaXMuX3BhbkFuZ2xlO1xuXHRcdFx0XHR0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSA9IHRoaXMuX3RpbHRBbmdsZTtcblx0XHRcdH1cblxuXHRcdFx0Ly9zbmFwIGNvb3JkcyBpZiBhbmdsZSBkaWZmZXJlbmNlcyBhcmUgY2xvc2Vcblx0XHRcdGlmICgoTWF0aC5hYnModGhpcy50aWx0QW5nbGUgLSB0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSkgPCAwLjAxKSAmJiAoTWF0aC5hYnModGhpcy5fcGFuQW5nbGUgLSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlKSA8IDAuMDEpKSB7XG5cdFx0XHRcdHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlID0gdGhpcy5fdGlsdEFuZ2xlO1xuXHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlID0gdGhpcy5fcGFuQW5nbGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIHBvczpWZWN0b3IzRCA9ICh0aGlzLmxvb2tBdE9iamVjdCk/IHRoaXMubG9va0F0T2JqZWN0LnRyYW5zZm9ybS5wb3NpdGlvbiA6ICh0aGlzLmxvb2tBdFBvc2l0aW9uKT8gdGhpcy5sb29rQXRQb3NpdGlvbiA6IHRoaXMuX3BPcmlnaW47XG5cdFx0dGhpcy50YXJnZXRPYmplY3QueCA9IHBvcy54ICsgdGhpcy5kaXN0YW5jZSpNYXRoLnNpbih0aGlzLl9pQ3VycmVudFBhbkFuZ2xlKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TKSpNYXRoLmNvcyh0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUyk7XG5cdFx0dGhpcy50YXJnZXRPYmplY3QueSA9IHBvcy55ICsgdGhpcy5kaXN0YW5jZSpNYXRoLnNpbih0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUykqdGhpcy55RmFjdG9yO1xuXHRcdHRoaXMudGFyZ2V0T2JqZWN0LnogPSBwb3MueiArIHRoaXMuZGlzdGFuY2UqTWF0aC5jb3ModGhpcy5faUN1cnJlbnRQYW5BbmdsZSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUykqTWF0aC5jb3ModGhpcy5faUN1cnJlbnRUaWx0QW5nbGUqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlMpO1xuXG5cdFx0dGhpcy5fdXBBeGlzLnggPSAtTWF0aC5zaW4odGhpcy5faUN1cnJlbnRQYW5BbmdsZSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUykqTWF0aC5zaW4odGhpcy5faUN1cnJlbnRUaWx0QW5nbGUqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlMpO1xuXHRcdHRoaXMuX3VwQXhpcy55ID0gTWF0aC5jb3ModGhpcy5faUN1cnJlbnRUaWx0QW5nbGUqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlMpO1xuXHRcdHRoaXMuX3VwQXhpcy56ID0gLU1hdGguY29zKHRoaXMuX2lDdXJyZW50UGFuQW5nbGUqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlMpKk1hdGguc2luKHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TKTtcblxuXHRcdGlmICh0aGlzLl9wVGFyZ2V0T2JqZWN0KSB7XG5cdFx0XHRpZiAodGhpcy5fcExvb2tBdFBvc2l0aW9uKVxuXHRcdFx0XHR0aGlzLl9wVGFyZ2V0T2JqZWN0Lmxvb2tBdCh0aGlzLl9wTG9va0F0UG9zaXRpb24sIHRoaXMuX3VwQXhpcyk7XG5cdFx0XHRlbHNlIGlmICh0aGlzLl9wTG9va0F0T2JqZWN0KVxuXHRcdFx0XHR0aGlzLl9wVGFyZ2V0T2JqZWN0Lmxvb2tBdCh0aGlzLl9wTG9va0F0T2JqZWN0LnNjZW5lPyB0aGlzLl9wTG9va0F0T2JqZWN0LnNjZW5lUG9zaXRpb24gOiB0aGlzLl9wTG9va0F0T2JqZWN0LnRyYW5zZm9ybS5wb3NpdGlvbiwgdGhpcy5fdXBBeGlzKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0ID0gSG92ZXJDb250cm9sbGVyOyJdfQ==