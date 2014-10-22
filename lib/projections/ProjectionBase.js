var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3D = require("awayjs-core/lib/core/geom/Matrix3D");
var Rectangle = require("awayjs-core/lib/core/geom/Rectangle");

var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var ProjectionEvent = require("awayjs-core/lib/events/ProjectionEvent");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");

var ProjectionBase = (function (_super) {
    __extends(ProjectionBase, _super);
    function ProjectionBase(coordinateSystem) {
        if (typeof coordinateSystem === "undefined") { coordinateSystem = "leftHanded"; }
        _super.call(this);
        this._pMatrix = new Matrix3D();
        this._pScissorRect = new Rectangle();
        this._pViewPort = new Rectangle();
        this._pNear = 20;
        this._pFar = 3000;
        this._pAspectRatio = 1;
        this._pMatrixInvalid = true;
        this._pFrustumCorners = [];
        this._pOriginX = 0.5;
        this._pOriginY = 0.5;
        this._unprojectionInvalid = true;

        this.coordinateSystem = coordinateSystem;
    }
    Object.defineProperty(ProjectionBase.prototype, "coordinateSystem", {
        /**
        * The handedness of the coordinate system projection. The default is LEFT_HANDED.
        */
        get: function () {
            return this._pCoordinateSystem;
        },
        set: function (value) {
            if (this._pCoordinateSystem == value)
                return;

            this._pCoordinateSystem = value;

            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ProjectionBase.prototype, "frustumCorners", {
        get: function () {
            return this._pFrustumCorners;
        },
        set: function (frustumCorners) {
            this._pFrustumCorners = frustumCorners;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ProjectionBase.prototype, "matrix", {
        get: function () {
            if (this._pMatrixInvalid) {
                this.pUpdateMatrix();
                this._pMatrixInvalid = false;
            }
            return this._pMatrix;
        },
        set: function (value) {
            this._pMatrix = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ProjectionBase.prototype, "near", {
        get: function () {
            return this._pNear;
        },
        set: function (value) {
            if (value == this._pNear) {
                return;
            }
            this._pNear = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ProjectionBase.prototype, "originX", {
        get: function () {
            return this._pOriginX;
        },
        set: function (value) {
            if (this._pOriginX == value)
                return;

            this._pOriginX = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ProjectionBase.prototype, "originY", {
        get: function () {
            return this._pOriginY;
        },
        set: function (value) {
            if (this._pOriginY == value)
                return;

            this._pOriginY = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ProjectionBase.prototype, "far", {
        get: function () {
            return this._pFar;
        },
        set: function (value) {
            if (value == this._pFar) {
                return;
            }
            this._pFar = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });


    ProjectionBase.prototype.project = function (point3d) {
        var v = this.matrix.transformVector(point3d);
        v.x = v.x / v.w;
        v.y = -v.y / v.w;

        //z is unaffected by transform
        v.z = point3d.z;

        return v;
    };

    Object.defineProperty(ProjectionBase.prototype, "unprojectionMatrix", {
        get: function () {
            if (this._unprojectionInvalid) {
                if (!this._unprojection)
                    this._unprojection = new Matrix3D();

                this._unprojection.copyFrom(this.matrix);
                this._unprojection.invert();
                this._unprojectionInvalid = false;
            }
            return this._unprojection;
        },
        enumerable: true,
        configurable: true
    });

    ProjectionBase.prototype.unproject = function (nX, nY, sZ) {
        throw new AbstractMethodError();
    };

    ProjectionBase.prototype.clone = function () {
        throw new AbstractMethodError();
    };

    Object.defineProperty(ProjectionBase.prototype, "_iAspectRatio", {
        get: function () {
            return this._pAspectRatio;
        },
        set: function (value) {
            if (this._pAspectRatio == value)
                return;

            this._pAspectRatio = value;

            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });


    ProjectionBase.prototype.pInvalidateMatrix = function () {
        this._pMatrixInvalid = true;
        this._unprojectionInvalid = true;
        this.dispatchEvent(new ProjectionEvent(ProjectionEvent.MATRIX_CHANGED, this));
    };

    ProjectionBase.prototype.pUpdateMatrix = function () {
        throw new AbstractMethodError();
    };

    ProjectionBase.prototype._iUpdateScissorRect = function (x, y, width, height) {
        this._pScissorRect.x = x;
        this._pScissorRect.y = y;
        this._pScissorRect.width = width;
        this._pScissorRect.height = height;
        this.pInvalidateMatrix();
    };

    ProjectionBase.prototype._iUpdateViewport = function (x, y, width, height) {
        this._pViewPort.x = x;
        this._pViewPort.y = y;
        this._pViewPort.width = width;
        this._pViewPort.height = height;
        this.pInvalidateMatrix();
    };
    return ProjectionBase;
})(EventDispatcher);

module.exports = ProjectionBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Rpb25zL1Byb2plY3Rpb25CYXNlLnRzIl0sIm5hbWVzIjpbIlByb2plY3Rpb25CYXNlIiwiUHJvamVjdGlvbkJhc2UuY29uc3RydWN0b3IiLCJQcm9qZWN0aW9uQmFzZS5wcm9qZWN0IiwiUHJvamVjdGlvbkJhc2UudW5wcm9qZWN0IiwiUHJvamVjdGlvbkJhc2UuY2xvbmUiLCJQcm9qZWN0aW9uQmFzZS5wSW52YWxpZGF0ZU1hdHJpeCIsIlByb2plY3Rpb25CYXNlLnBVcGRhdGVNYXRyaXgiLCJQcm9qZWN0aW9uQmFzZS5faVVwZGF0ZVNjaXNzb3JSZWN0IiwiUHJvamVjdGlvbkJhc2UuX2lVcGRhdGVWaWV3cG9ydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNERBQW9FO0FBQ3BFLDhEQUFxRTs7QUFFckUsdUVBQTZFO0FBQzdFLHVFQUE2RTtBQUM3RSwrRUFBb0Y7O0FBR3BGO0lBQTZCQSxpQ0FBZUE7SUFrQjNDQSx3QkFBWUEsZ0JBQXNDQTtRQUF0Q0MsK0NBQUFBLGdCQUFnQkEsR0FBVUEsWUFBWUE7QUFBQUEsUUFFakRBLFdBQU1BLEtBQUFBLENBQUNBO1FBbEJSQSxLQUFPQSxRQUFRQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQ0EsS0FBT0EsYUFBYUEsR0FBYUEsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakRBLEtBQU9BLFVBQVVBLEdBQWFBLElBQUlBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO1FBQzlDQSxLQUFPQSxNQUFNQSxHQUFVQSxFQUFFQSxDQUFDQTtRQUMxQkEsS0FBT0EsS0FBS0EsR0FBVUEsSUFBSUEsQ0FBQ0E7UUFDM0JBLEtBQU9BLGFBQWFBLEdBQVVBLENBQUNBLENBQUNBO1FBRWhDQSxLQUFPQSxlQUFlQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUN0Q0EsS0FBT0EsZ0JBQWdCQSxHQUFZQSxFQUFFQSxDQUFDQTtRQUV0Q0EsS0FBT0EsU0FBU0EsR0FBVUEsR0FBR0EsQ0FBQ0E7UUFDOUJBLEtBQU9BLFNBQVNBLEdBQVVBLEdBQUdBLENBQUNBO1FBRzlCQSxLQUFRQSxvQkFBb0JBLEdBQVdBLElBQUlBLENBQUNBOztRQU0zQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxnQkFBZ0JBO0lBQ3pDQSxDQUFDQTtJQUtERDtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQTtRQUMvQkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBNEJBLEtBQVlBO1lBRXZDQSxJQUFJQSxJQUFJQSxDQUFDQSxrQkFBa0JBLElBQUlBLEtBQUtBO2dCQUNuQ0EsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBR0EsS0FBS0E7O1lBRS9CQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1FBQ3pCQSxDQUFDQTs7OztBQVZBQTs7SUFZREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQTtRQUM3QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBMEJBLGNBQXVCQTtZQUVoREEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxjQUFjQTtRQUN2Q0EsQ0FBQ0E7Ozs7QUFMQUE7O0lBT0RBO1FBQUFBLEtBQUFBO1lBRUNBLElBQUlBLElBQUlBLENBQUNBLGVBQWVBLENBQUVBO2dCQUN6QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxLQUFLQTthQUM1QkE7WUFDREEsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBO1FBRURBLEtBQUFBLFVBQWtCQSxLQUFjQTtZQUUvQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0E7WUFDckJBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7UUFDekJBLENBQUNBOzs7O0FBTkFBOztJQVFEQTtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxNQUFNQTtRQUNuQkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBZ0JBLEtBQVlBO1lBRTNCQSxJQUFJQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFFQTtnQkFDekJBLE1BQU9BO2FBQ1BBO1lBQ0RBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBO1lBQ25CQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1FBQ3pCQSxDQUFDQTs7OztBQVRBQTs7SUFXREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsU0FBU0E7UUFDdEJBLENBQUNBO1FBRURBLEtBQUFBLFVBQW1CQSxLQUFZQTtZQUU5QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsS0FBS0E7Z0JBQzFCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0E7UUFDdkJBLENBQUNBOzs7O0FBUkFBOztJQVVEQTtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxTQUFTQTtRQUN0QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBbUJBLEtBQVlBO1lBRTlCQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxLQUFLQTtnQkFDMUJBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQTtRQUN2QkEsQ0FBQ0E7Ozs7QUFSQUE7O0lBVURBO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLEtBQUtBO1FBQ2xCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFlQSxLQUFZQTtZQUUxQkEsSUFBSUEsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBRUE7Z0JBQ3hCQSxNQUFPQTthQUNQQTtZQUNEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQTtZQUNsQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7Ozs7QUFUQUE7O0lBV0RBLG1DQUFBQSxVQUFlQSxPQUFnQkE7UUFFOUJFLElBQUlBLENBQUNBLEdBQVlBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3JEQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNiQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs7UUFFZEEsOEJBQThCQTtRQUM5QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7O1FBRWZBLE9BQU9BLENBQUNBO0lBQ1RBLENBQUNBOztJQUVERjtRQUFBQSxLQUFBQTtZQUVDQSxJQUFJQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUVBO2dCQUM5QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUE7b0JBQ3RCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTs7Z0JBRXJDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDeENBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO2dCQUMzQkEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxHQUFHQSxLQUFLQTthQUNqQ0E7WUFDREEsT0FBT0EsSUFBSUEsQ0FBQ0EsYUFBYUE7UUFDMUJBLENBQUNBOzs7O0FBQUFBO0lBRURBLHFDQUFBQSxVQUFpQkEsRUFBU0EsRUFBRUEsRUFBU0EsRUFBRUEsRUFBU0E7UUFFL0NHLE1BQU1BLElBQUlBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBOztJQUVESCxpQ0FBQUE7UUFFQ0ksTUFBTUEsSUFBSUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7O0lBRURKO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGFBQWFBO1FBQzFCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUF5QkEsS0FBWUE7WUFFcENBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLElBQUlBLEtBQUtBO2dCQUM5QkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLEtBQUtBOztZQUUxQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7Ozs7QUFWQUE7O0lBWURBLDZDQUFBQTtRQUVDSyxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQTtRQUMzQkEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxHQUFHQSxJQUFJQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsZUFBZUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsY0FBY0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDOUVBLENBQUNBOztJQUVETCx5Q0FBQUE7UUFFQ00sTUFBTUEsSUFBSUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7O0lBRUROLCtDQUFBQSxVQUEyQkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsS0FBWUEsRUFBRUEsTUFBYUE7UUFFekVPLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO1FBQ3hCQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUN4QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0E7UUFDaENBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BO1FBQ2xDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO0lBQ3pCQSxDQUFDQTs7SUFFRFAsNENBQUFBLFVBQXdCQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxLQUFZQSxFQUFFQSxNQUFhQTtRQUV0RVEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDckJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO1FBQ3JCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQTtRQUM3QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUE7UUFDL0JBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7SUFDekJBLENBQUNBO0lBQ0ZSLHNCQUFDQTtBQUFEQSxDQUFDQSxFQXpNNEIsZUFBZSxFQXlNM0M7O0FBRUQsK0JBQXdCLENBQUEiLCJmaWxlIjoicHJvamVjdGlvbnMvUHJvamVjdGlvbkJhc2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUmVjdGFuZ2xlXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XG5pbXBvcnQgUHJvamVjdGlvbkV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Qcm9qZWN0aW9uRXZlbnRcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5pbXBvcnQgSVByb2plY3Rpb25cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9JUHJvamVjdGlvblwiKTtcblxuY2xhc3MgUHJvamVjdGlvbkJhc2UgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIgaW1wbGVtZW50cyBJUHJvamVjdGlvblxue1xuXHRwdWJsaWMgX3BNYXRyaXg6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0cHVibGljIF9wU2Npc3NvclJlY3Q6UmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuXHRwdWJsaWMgX3BWaWV3UG9ydDpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cdHB1YmxpYyBfcE5lYXI6bnVtYmVyID0gMjA7XG5cdHB1YmxpYyBfcEZhcjpudW1iZXIgPSAzMDAwO1xuXHRwdWJsaWMgX3BBc3BlY3RSYXRpbzpudW1iZXIgPSAxO1xuXG5cdHB1YmxpYyBfcE1hdHJpeEludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBfcEZydXN0dW1Db3JuZXJzOm51bWJlcltdID0gW107XG5cdHB1YmxpYyBfcENvb3JkaW5hdGVTeXN0ZW06c3RyaW5nO1xuXHRwdWJsaWMgX3BPcmlnaW5YOm51bWJlciA9IDAuNTtcblx0cHVibGljIF9wT3JpZ2luWTpudW1iZXIgPSAwLjU7XG5cblx0cHJpdmF0ZSBfdW5wcm9qZWN0aW9uOk1hdHJpeDNEO1xuXHRwcml2YXRlIF91bnByb2plY3Rpb25JbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xuXG5cdGNvbnN0cnVjdG9yKGNvb3JkaW5hdGVTeXN0ZW06c3RyaW5nID0gXCJsZWZ0SGFuZGVkXCIpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5jb29yZGluYXRlU3lzdGVtID0gY29vcmRpbmF0ZVN5c3RlbTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaGFuZGVkbmVzcyBvZiB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gcHJvamVjdGlvbi4gVGhlIGRlZmF1bHQgaXMgTEVGVF9IQU5ERUQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvb3JkaW5hdGVTeXN0ZW0oKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQ29vcmRpbmF0ZVN5c3RlbTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgY29vcmRpbmF0ZVN5c3RlbSh2YWx1ZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fcENvb3JkaW5hdGVTeXN0ZW0gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wQ29vcmRpbmF0ZVN5c3RlbSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIGdldCBmcnVzdHVtQ29ybmVycygpOm51bWJlcltdXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEZydXN0dW1Db3JuZXJzO1xuXHR9XG5cblx0cHVibGljIHNldCBmcnVzdHVtQ29ybmVycyhmcnVzdHVtQ29ybmVyczpudW1iZXJbXSlcblx0e1xuXHRcdHRoaXMuX3BGcnVzdHVtQ29ybmVycyA9IGZydXN0dW1Db3JuZXJzO1xuXHR9XG5cblx0cHVibGljIGdldCBtYXRyaXgoKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX3BNYXRyaXhJbnZhbGlkKSB7XG5cdFx0XHR0aGlzLnBVcGRhdGVNYXRyaXgoKTtcblx0XHRcdHRoaXMuX3BNYXRyaXhJbnZhbGlkID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9wTWF0cml4O1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRyaXgodmFsdWU6TWF0cml4M0QpXG5cdHtcblx0XHR0aGlzLl9wTWF0cml4ID0gdmFsdWU7XG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIGdldCBuZWFyKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE5lYXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG5lYXIodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX3BOZWFyKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX3BOZWFyID0gdmFsdWU7XG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIGdldCBvcmlnaW5YKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE9yaWdpblg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG9yaWdpblgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BPcmlnaW5YID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcE9yaWdpblggPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgb3JpZ2luWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BPcmlnaW5ZO1xuXHR9XG5cblx0cHVibGljIHNldCBvcmlnaW5ZKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wT3JpZ2luWSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BPcmlnaW5ZID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGZhcigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BGYXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGZhcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fcEZhcikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9wRmFyID0gdmFsdWU7XG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIHByb2plY3QocG9pbnQzZDpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHZhciB2OlZlY3RvcjNEID0gdGhpcy5tYXRyaXgudHJhbnNmb3JtVmVjdG9yKHBvaW50M2QpO1xuXHRcdHYueCA9IHYueC92Lnc7XG5cdFx0di55ID0gLXYueS92Lnc7XG5cblx0XHQvL3ogaXMgdW5hZmZlY3RlZCBieSB0cmFuc2Zvcm1cblx0XHR2LnogPSBwb2ludDNkLno7XG5cblx0XHRyZXR1cm4gdjtcblx0fVxuXG5cdHB1YmxpYyBnZXQgdW5wcm9qZWN0aW9uTWF0cml4KCk6TWF0cml4M0Rcblx0e1xuXHRcdGlmICh0aGlzLl91bnByb2plY3Rpb25JbnZhbGlkKSB7XG5cdFx0XHRpZiAoIXRoaXMuX3VucHJvamVjdGlvbilcblx0XHRcdFx0dGhpcy5fdW5wcm9qZWN0aW9uID0gbmV3IE1hdHJpeDNEKCk7XG5cblx0XHRcdHRoaXMuX3VucHJvamVjdGlvbi5jb3B5RnJvbSh0aGlzLm1hdHJpeCk7XG5cdFx0XHR0aGlzLl91bnByb2plY3Rpb24uaW52ZXJ0KCk7XG5cdFx0XHR0aGlzLl91bnByb2plY3Rpb25JbnZhbGlkID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl91bnByb2plY3Rpb247XG5cdH1cblxuXHRwdWJsaWMgdW5wcm9qZWN0KG5YOm51bWJlciwgblk6bnVtYmVyLCBzWjpudW1iZXIpOlZlY3RvcjNEXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIGNsb25lKCk6UHJvamVjdGlvbkJhc2Vcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IF9pQXNwZWN0UmF0aW8oKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQXNwZWN0UmF0aW87XG5cdH1cblxuXHRwdWJsaWMgc2V0IF9pQXNwZWN0UmF0aW8odmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BBc3BlY3RSYXRpbyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BBc3BlY3RSYXRpbyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIHBJbnZhbGlkYXRlTWF0cml4KClcblx0e1xuXHRcdHRoaXMuX3BNYXRyaXhJbnZhbGlkID0gdHJ1ZTtcblx0XHR0aGlzLl91bnByb2plY3Rpb25JbnZhbGlkID0gdHJ1ZTtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFByb2plY3Rpb25FdmVudChQcm9qZWN0aW9uRXZlbnQuTUFUUklYX0NIQU5HRUQsIHRoaXMpKTtcblx0fVxuXG5cdHB1YmxpYyBwVXBkYXRlTWF0cml4KClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX2lVcGRhdGVTY2lzc29yUmVjdCh4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcilcblx0e1xuXHRcdHRoaXMuX3BTY2lzc29yUmVjdC54ID0geDtcblx0XHR0aGlzLl9wU2Npc3NvclJlY3QueSA9IHk7XG5cdFx0dGhpcy5fcFNjaXNzb3JSZWN0LndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5fcFNjaXNzb3JSZWN0LmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XG5cdH1cblxuXHRwdWJsaWMgX2lVcGRhdGVWaWV3cG9ydCh4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcilcblx0e1xuXHRcdHRoaXMuX3BWaWV3UG9ydC54ID0geDtcblx0XHR0aGlzLl9wVmlld1BvcnQueSA9IHk7XG5cdFx0dGhpcy5fcFZpZXdQb3J0LndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5fcFZpZXdQb3J0LmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gUHJvamVjdGlvbkJhc2U7Il19