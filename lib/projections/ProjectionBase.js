var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var Rectangle = require("awayjs-core/lib/geom/Rectangle");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var ProjectionEvent = require("awayjs-core/lib/events/ProjectionEvent");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var ProjectionBase = (function (_super) {
    __extends(ProjectionBase, _super);
    function ProjectionBase(coordinateSystem) {
        if (coordinateSystem === void 0) { coordinateSystem = "leftHanded"; }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9Qcm9qZWN0aW9uQmFzZS50cyJdLCJuYW1lcyI6WyJQcm9qZWN0aW9uQmFzZSIsIlByb2plY3Rpb25CYXNlLmNvbnN0cnVjdG9yIiwiUHJvamVjdGlvbkJhc2UuY29vcmRpbmF0ZVN5c3RlbSIsIlByb2plY3Rpb25CYXNlLmZydXN0dW1Db3JuZXJzIiwiUHJvamVjdGlvbkJhc2UubWF0cml4IiwiUHJvamVjdGlvbkJhc2UubmVhciIsIlByb2plY3Rpb25CYXNlLm9yaWdpblgiLCJQcm9qZWN0aW9uQmFzZS5vcmlnaW5ZIiwiUHJvamVjdGlvbkJhc2UuZmFyIiwiUHJvamVjdGlvbkJhc2UucHJvamVjdCIsIlByb2plY3Rpb25CYXNlLnVucHJvamVjdGlvbk1hdHJpeCIsIlByb2plY3Rpb25CYXNlLnVucHJvamVjdCIsIlByb2plY3Rpb25CYXNlLmNsb25lIiwiUHJvamVjdGlvbkJhc2UuX2lBc3BlY3RSYXRpbyIsIlByb2plY3Rpb25CYXNlLnBJbnZhbGlkYXRlTWF0cml4IiwiUHJvamVjdGlvbkJhc2UucFVwZGF0ZU1hdHJpeCIsIlByb2plY3Rpb25CYXNlLl9pVXBkYXRlU2Npc3NvclJlY3QiLCJQcm9qZWN0aW9uQmFzZS5faVVwZGF0ZVZpZXdwb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFFBQVEsV0FBZSwrQkFBK0IsQ0FBQyxDQUFDO0FBQy9ELElBQU8sU0FBUyxXQUFjLGdDQUFnQyxDQUFDLENBQUM7QUFFaEUsSUFBTyxlQUFlLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUM3RSxJQUFPLGVBQWUsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzdFLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUdwRixJQUFNLGNBQWM7SUFBU0EsVUFBdkJBLGNBQWNBLFVBQXdCQTtJQWtCM0NBLFNBbEJLQSxjQUFjQSxDQWtCUEEsZ0JBQXNDQTtRQUF0Q0MsZ0NBQXNDQSxHQUF0Q0Es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LENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3RCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDaENBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBQ0ZqQixxQkFBQ0E7QUFBREEsQ0F6TUEsQUF5TUNBLEVBek00QixlQUFlLEVBeU0zQztBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJwcm9qZWN0aW9ucy9Qcm9qZWN0aW9uQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcclxuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XHJcbmltcG9ydCBQcm9qZWN0aW9uRXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1Byb2plY3Rpb25FdmVudFwiKTtcclxuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5pbXBvcnQgSVByb2plY3Rpb25cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9JUHJvamVjdGlvblwiKTtcclxuXHJcbmNsYXNzIFByb2plY3Rpb25CYXNlIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIGltcGxlbWVudHMgSVByb2plY3Rpb25cclxue1xyXG5cdHB1YmxpYyBfcE1hdHJpeDpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdHB1YmxpYyBfcFNjaXNzb3JSZWN0OlJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcclxuXHRwdWJsaWMgX3BWaWV3UG9ydDpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcblx0cHVibGljIF9wTmVhcjpudW1iZXIgPSAyMDtcclxuXHRwdWJsaWMgX3BGYXI6bnVtYmVyID0gMzAwMDtcclxuXHRwdWJsaWMgX3BBc3BlY3RSYXRpbzpudW1iZXIgPSAxO1xyXG5cclxuXHRwdWJsaWMgX3BNYXRyaXhJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcEZydXN0dW1Db3JuZXJzOm51bWJlcltdID0gW107XHJcblx0cHVibGljIF9wQ29vcmRpbmF0ZVN5c3RlbTpzdHJpbmc7XHJcblx0cHVibGljIF9wT3JpZ2luWDpudW1iZXIgPSAwLjU7XHJcblx0cHVibGljIF9wT3JpZ2luWTpudW1iZXIgPSAwLjU7XHJcblxyXG5cdHByaXZhdGUgX3VucHJvamVjdGlvbjpNYXRyaXgzRDtcclxuXHRwcml2YXRlIF91bnByb2plY3Rpb25JbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihjb29yZGluYXRlU3lzdGVtOnN0cmluZyA9IFwibGVmdEhhbmRlZFwiKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5jb29yZGluYXRlU3lzdGVtID0gY29vcmRpbmF0ZVN5c3RlbTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBoYW5kZWRuZXNzIG9mIHRoZSBjb29yZGluYXRlIHN5c3RlbSBwcm9qZWN0aW9uLiBUaGUgZGVmYXVsdCBpcyBMRUZUX0hBTkRFRC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGNvb3JkaW5hdGVTeXN0ZW0oKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcENvb3JkaW5hdGVTeXN0ZW07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGNvb3JkaW5hdGVTeXN0ZW0odmFsdWU6c3RyaW5nKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wQ29vcmRpbmF0ZVN5c3RlbSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BDb29yZGluYXRlU3lzdGVtID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBmcnVzdHVtQ29ybmVycygpOm51bWJlcltdXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BGcnVzdHVtQ29ybmVycztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZnJ1c3R1bUNvcm5lcnMoZnJ1c3R1bUNvcm5lcnM6bnVtYmVyW10pXHJcblx0e1xyXG5cdFx0dGhpcy5fcEZydXN0dW1Db3JuZXJzID0gZnJ1c3R1bUNvcm5lcnM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IG1hdHJpeCgpOk1hdHJpeDNEXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BNYXRyaXhJbnZhbGlkKSB7XHJcblx0XHRcdHRoaXMucFVwZGF0ZU1hdHJpeCgpO1xyXG5cdFx0XHR0aGlzLl9wTWF0cml4SW52YWxpZCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuX3BNYXRyaXg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1hdHJpeCh2YWx1ZTpNYXRyaXgzRClcclxuXHR7XHJcblx0XHR0aGlzLl9wTWF0cml4ID0gdmFsdWU7XHJcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IG5lYXIoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcE5lYXI7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG5lYXIodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9wTmVhcikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLl9wTmVhciA9IHZhbHVlO1xyXG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBvcmlnaW5YKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BPcmlnaW5YO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBvcmlnaW5YKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcE9yaWdpblggPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wT3JpZ2luWCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBvcmlnaW5ZKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BPcmlnaW5ZO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBvcmlnaW5ZKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcE9yaWdpblkgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wT3JpZ2luWSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBmYXIoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEZhcjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZmFyKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fcEZhcikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLl9wRmFyID0gdmFsdWU7XHJcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcHJvamVjdChwb2ludDNkOlZlY3RvcjNEKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHZhciB2OlZlY3RvcjNEID0gdGhpcy5tYXRyaXgudHJhbnNmb3JtVmVjdG9yKHBvaW50M2QpO1xyXG5cdFx0di54ID0gdi54L3YudztcclxuXHRcdHYueSA9IC12Lnkvdi53O1xyXG5cclxuXHRcdC8veiBpcyB1bmFmZmVjdGVkIGJ5IHRyYW5zZm9ybVxyXG5cdFx0di56ID0gcG9pbnQzZC56O1xyXG5cclxuXHRcdHJldHVybiB2O1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCB1bnByb2plY3Rpb25NYXRyaXgoKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl91bnByb2plY3Rpb25JbnZhbGlkKSB7XHJcblx0XHRcdGlmICghdGhpcy5fdW5wcm9qZWN0aW9uKVxyXG5cdFx0XHRcdHRoaXMuX3VucHJvamVjdGlvbiA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cclxuXHRcdFx0dGhpcy5fdW5wcm9qZWN0aW9uLmNvcHlGcm9tKHRoaXMubWF0cml4KTtcclxuXHRcdFx0dGhpcy5fdW5wcm9qZWN0aW9uLmludmVydCgpO1xyXG5cdFx0XHR0aGlzLl91bnByb2plY3Rpb25JbnZhbGlkID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fdW5wcm9qZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHVucHJvamVjdChuWDpudW1iZXIsIG5ZOm51bWJlciwgc1o6bnVtYmVyKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2xvbmUoKTpQcm9qZWN0aW9uQmFzZVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IF9pQXNwZWN0UmF0aW8oKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEFzcGVjdFJhdGlvO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBfaUFzcGVjdFJhdGlvKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcEFzcGVjdFJhdGlvID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcEFzcGVjdFJhdGlvID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHBJbnZhbGlkYXRlTWF0cml4KClcclxuXHR7XHJcblx0XHR0aGlzLl9wTWF0cml4SW52YWxpZCA9IHRydWU7XHJcblx0XHR0aGlzLl91bnByb2plY3Rpb25JbnZhbGlkID0gdHJ1ZTtcclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgUHJvamVjdGlvbkV2ZW50KFByb2plY3Rpb25FdmVudC5NQVRSSVhfQ0hBTkdFRCwgdGhpcykpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHBVcGRhdGVNYXRyaXgoKVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lVcGRhdGVTY2lzc29yUmVjdCh4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9wU2Npc3NvclJlY3QueCA9IHg7XHJcblx0XHR0aGlzLl9wU2Npc3NvclJlY3QueSA9IHk7XHJcblx0XHR0aGlzLl9wU2Npc3NvclJlY3Qud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuX3BTY2lzc29yUmVjdC5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lVcGRhdGVWaWV3cG9ydCh4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9wVmlld1BvcnQueCA9IHg7XHJcblx0XHR0aGlzLl9wVmlld1BvcnQueSA9IHk7XHJcblx0XHR0aGlzLl9wVmlld1BvcnQud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuX3BWaWV3UG9ydC5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBQcm9qZWN0aW9uQmFzZTsiXX0=