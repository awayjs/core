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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9Qcm9qZWN0aW9uQmFzZS50cyJdLCJuYW1lcyI6WyJQcm9qZWN0aW9uQmFzZSIsIlByb2plY3Rpb25CYXNlLmNvbnN0cnVjdG9yIiwiUHJvamVjdGlvbkJhc2UuY29vcmRpbmF0ZVN5c3RlbSIsIlByb2plY3Rpb25CYXNlLmZydXN0dW1Db3JuZXJzIiwiUHJvamVjdGlvbkJhc2UubWF0cml4IiwiUHJvamVjdGlvbkJhc2UubmVhciIsIlByb2plY3Rpb25CYXNlLm9yaWdpblgiLCJQcm9qZWN0aW9uQmFzZS5vcmlnaW5ZIiwiUHJvamVjdGlvbkJhc2UuZmFyIiwiUHJvamVjdGlvbkJhc2UucHJvamVjdCIsIlByb2plY3Rpb25CYXNlLnVucHJvamVjdGlvbk1hdHJpeCIsIlByb2plY3Rpb25CYXNlLnVucHJvamVjdCIsIlByb2plY3Rpb25CYXNlLmNsb25lIiwiUHJvamVjdGlvbkJhc2UuX2lBc3BlY3RSYXRpbyIsIlByb2plY3Rpb25CYXNlLnBJbnZhbGlkYXRlTWF0cml4IiwiUHJvamVjdGlvbkJhc2UucFVwZGF0ZU1hdHJpeCIsIlByb2plY3Rpb25CYXNlLl9pVXBkYXRlU2Npc3NvclJlY3QiLCJQcm9qZWN0aW9uQmFzZS5faVVwZGF0ZVZpZXdwb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFFBQVEsV0FBZSwrQkFBK0IsQ0FBQyxDQUFDO0FBQy9ELElBQU8sU0FBUyxXQUFjLGdDQUFnQyxDQUFDLENBQUM7QUFFaEUsSUFBTyxlQUFlLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUM3RSxJQUFPLGVBQWUsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzdFLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUdwRixJQUFNLGNBQWM7SUFBU0EsVUFBdkJBLGNBQWNBLFVBQXdCQTtJQWtCM0NBLFNBbEJLQSxjQUFjQSxDQWtCUEEsZ0JBQXNDQTtRQUF0Q0MsZ0NBQXNDQSxHQUF0Q0EsK0JBQXNDQTtRQUVqREEsaUJBQU9BLENBQUNBO1FBbEJGQSxhQUFRQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUNuQ0Esa0JBQWFBLEdBQWFBLElBQUlBLFNBQVNBLEVBQUVBLENBQUNBO1FBQzFDQSxlQUFVQSxHQUFhQSxJQUFJQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUN2Q0EsV0FBTUEsR0FBVUEsRUFBRUEsQ0FBQ0E7UUFDbkJBLFVBQUtBLEdBQVVBLElBQUlBLENBQUNBO1FBQ3BCQSxrQkFBYUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFFekJBLG9CQUFlQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUMvQkEscUJBQWdCQSxHQUFZQSxFQUFFQSxDQUFDQTtRQUUvQkEsY0FBU0EsR0FBVUEsR0FBR0EsQ0FBQ0E7UUFDdkJBLGNBQVNBLEdBQVVBLEdBQUdBLENBQUNBO1FBR3RCQSx5QkFBb0JBLEdBQVdBLElBQUlBLENBQUNBO1FBTTNDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7SUFDMUNBLENBQUNBO0lBS0RELHNCQUFXQSw0Q0FBZ0JBO1FBSDNCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUNoQ0EsQ0FBQ0E7YUFFREYsVUFBNEJBLEtBQVlBO1lBRXZDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLElBQUlBLEtBQUtBLENBQUNBO2dCQUNwQ0EsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUVoQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQVZBRjtJQVlEQSxzQkFBV0EsMENBQWNBO2FBQXpCQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBO1FBQzlCQSxDQUFDQTthQUVESCxVQUEwQkEsY0FBdUJBO1lBRWhERyxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLGNBQWNBLENBQUNBO1FBQ3hDQSxDQUFDQTs7O09BTEFIO0lBT0RBLHNCQUFXQSxrQ0FBTUE7YUFBakJBO1lBRUNJLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7Z0JBQ3JCQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUM5QkEsQ0FBQ0E7WUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLENBQUNBO2FBRURKLFVBQWtCQSxLQUFjQTtZQUUvQkksSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FOQUo7SUFRREEsc0JBQVdBLGdDQUFJQTthQUFmQTtZQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7YUFFREwsVUFBZ0JBLEtBQVlBO1lBRTNCSyxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUJBLE1BQU1BLENBQUNBO1lBQ1JBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3BCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BVEFMO0lBV0RBLHNCQUFXQSxtQ0FBT0E7YUFBbEJBO1lBRUNNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1FBQ3ZCQSxDQUFDQTthQUVETixVQUFtQkEsS0FBWUE7WUFFOUJNLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLEtBQUtBLENBQUNBO2dCQUMzQkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDeEJBLENBQUNBOzs7T0FSQU47SUFVREEsc0JBQVdBLG1DQUFPQTthQUFsQkE7WUFFQ08sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBO2FBRURQLFVBQW1CQSxLQUFZQTtZQUU5Qk8sRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsS0FBS0EsQ0FBQ0E7Z0JBQzNCQSxNQUFNQSxDQUFDQTtZQUVSQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7OztPQVJBUDtJQVVEQSxzQkFBV0EsK0JBQUdBO2FBQWRBO1lBRUNRLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1FBQ25CQSxDQUFDQTthQUVEUixVQUFlQSxLQUFZQTtZQUUxQlEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxNQUFNQSxDQUFDQTtZQUNSQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQVRBUjtJQVdNQSxnQ0FBT0EsR0FBZEEsVUFBZUEsT0FBZ0JBO1FBRTlCUyxJQUFJQSxDQUFDQSxHQUFZQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUN0REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDZEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFZkEsQUFDQUEsOEJBRDhCQTtRQUM5QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFaEJBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO0lBQ1ZBLENBQUNBO0lBRURULHNCQUFXQSw4Q0FBa0JBO2FBQTdCQTtZQUVDVSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLENBQUNBO2dCQUMvQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7b0JBQ3ZCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtnQkFFckNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO2dCQUN6Q0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ25DQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUFBVjtJQUVNQSxrQ0FBU0EsR0FBaEJBLFVBQWlCQSxFQUFTQSxFQUFFQSxFQUFTQSxFQUFFQSxFQUFTQTtRQUUvQ1csTUFBTUEsSUFBSUEsbUJBQW1CQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFTVgsOEJBQUtBLEdBQVpBO1FBRUNZLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRURaLHNCQUFXQSx5Q0FBYUE7YUFBeEJBO1lBRUNhLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBO1FBQzNCQSxDQUFDQTthQUVEYixVQUF5QkEsS0FBWUE7WUFFcENhLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLElBQUlBLEtBQUtBLENBQUNBO2dCQUMvQkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFM0JBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FWQWI7SUFZTUEsMENBQWlCQSxHQUF4QkE7UUFFQ2MsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLGVBQWVBLENBQUNBLGVBQWVBLENBQUNBLGNBQWNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0lBQy9FQSxDQUFDQTtJQUVNZCxzQ0FBYUEsR0FBcEJBO1FBRUNlLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRU1mLDRDQUFtQkEsR0FBMUJBLFVBQTJCQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxLQUFZQSxFQUFFQSxNQUFhQTtRQUV6RWdCLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3pCQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUN6QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBO1FBQ25DQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO0lBQzFCQSxDQUFDQTtJQUVNaEIseUNBQWdCQSxHQUF2QkEsVUFBd0JBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLEtBQVlBLEVBQUVBLE1BQWFBO1FBRXRFaUIsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDdEJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3RCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDaENBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBQ0ZqQixxQkFBQ0E7QUFBREEsQ0F6TUEsQUF5TUNBLEVBek00QixlQUFlLEVBeU0zQztBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJwcm9qZWN0aW9ucy9Qcm9qZWN0aW9uQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XG5pbXBvcnQgUHJvamVjdGlvbkV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Qcm9qZWN0aW9uRXZlbnRcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5pbXBvcnQgSVByb2plY3Rpb25cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9JUHJvamVjdGlvblwiKTtcblxuY2xhc3MgUHJvamVjdGlvbkJhc2UgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIgaW1wbGVtZW50cyBJUHJvamVjdGlvblxue1xuXHRwdWJsaWMgX3BNYXRyaXg6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0cHVibGljIF9wU2Npc3NvclJlY3Q6UmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuXHRwdWJsaWMgX3BWaWV3UG9ydDpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cdHB1YmxpYyBfcE5lYXI6bnVtYmVyID0gMjA7XG5cdHB1YmxpYyBfcEZhcjpudW1iZXIgPSAzMDAwO1xuXHRwdWJsaWMgX3BBc3BlY3RSYXRpbzpudW1iZXIgPSAxO1xuXG5cdHB1YmxpYyBfcE1hdHJpeEludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBfcEZydXN0dW1Db3JuZXJzOm51bWJlcltdID0gW107XG5cdHB1YmxpYyBfcENvb3JkaW5hdGVTeXN0ZW06c3RyaW5nO1xuXHRwdWJsaWMgX3BPcmlnaW5YOm51bWJlciA9IDAuNTtcblx0cHVibGljIF9wT3JpZ2luWTpudW1iZXIgPSAwLjU7XG5cblx0cHJpdmF0ZSBfdW5wcm9qZWN0aW9uOk1hdHJpeDNEO1xuXHRwcml2YXRlIF91bnByb2plY3Rpb25JbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xuXG5cdGNvbnN0cnVjdG9yKGNvb3JkaW5hdGVTeXN0ZW06c3RyaW5nID0gXCJsZWZ0SGFuZGVkXCIpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5jb29yZGluYXRlU3lzdGVtID0gY29vcmRpbmF0ZVN5c3RlbTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaGFuZGVkbmVzcyBvZiB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gcHJvamVjdGlvbi4gVGhlIGRlZmF1bHQgaXMgTEVGVF9IQU5ERUQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvb3JkaW5hdGVTeXN0ZW0oKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQ29vcmRpbmF0ZVN5c3RlbTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgY29vcmRpbmF0ZVN5c3RlbSh2YWx1ZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fcENvb3JkaW5hdGVTeXN0ZW0gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wQ29vcmRpbmF0ZVN5c3RlbSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIGdldCBmcnVzdHVtQ29ybmVycygpOm51bWJlcltdXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEZydXN0dW1Db3JuZXJzO1xuXHR9XG5cblx0cHVibGljIHNldCBmcnVzdHVtQ29ybmVycyhmcnVzdHVtQ29ybmVyczpudW1iZXJbXSlcblx0e1xuXHRcdHRoaXMuX3BGcnVzdHVtQ29ybmVycyA9IGZydXN0dW1Db3JuZXJzO1xuXHR9XG5cblx0cHVibGljIGdldCBtYXRyaXgoKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX3BNYXRyaXhJbnZhbGlkKSB7XG5cdFx0XHR0aGlzLnBVcGRhdGVNYXRyaXgoKTtcblx0XHRcdHRoaXMuX3BNYXRyaXhJbnZhbGlkID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9wTWF0cml4O1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRyaXgodmFsdWU6TWF0cml4M0QpXG5cdHtcblx0XHR0aGlzLl9wTWF0cml4ID0gdmFsdWU7XG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIGdldCBuZWFyKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE5lYXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG5lYXIodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX3BOZWFyKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX3BOZWFyID0gdmFsdWU7XG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIGdldCBvcmlnaW5YKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE9yaWdpblg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG9yaWdpblgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BPcmlnaW5YID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcE9yaWdpblggPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgb3JpZ2luWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BPcmlnaW5ZO1xuXHR9XG5cblx0cHVibGljIHNldCBvcmlnaW5ZKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wT3JpZ2luWSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BPcmlnaW5ZID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGZhcigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BGYXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGZhcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fcEZhcikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9wRmFyID0gdmFsdWU7XG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIHByb2plY3QocG9pbnQzZDpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHZhciB2OlZlY3RvcjNEID0gdGhpcy5tYXRyaXgudHJhbnNmb3JtVmVjdG9yKHBvaW50M2QpO1xuXHRcdHYueCA9IHYueC92Lnc7XG5cdFx0di55ID0gLXYueS92Lnc7XG5cblx0XHQvL3ogaXMgdW5hZmZlY3RlZCBieSB0cmFuc2Zvcm1cblx0XHR2LnogPSBwb2ludDNkLno7XG5cblx0XHRyZXR1cm4gdjtcblx0fVxuXG5cdHB1YmxpYyBnZXQgdW5wcm9qZWN0aW9uTWF0cml4KCk6TWF0cml4M0Rcblx0e1xuXHRcdGlmICh0aGlzLl91bnByb2plY3Rpb25JbnZhbGlkKSB7XG5cdFx0XHRpZiAoIXRoaXMuX3VucHJvamVjdGlvbilcblx0XHRcdFx0dGhpcy5fdW5wcm9qZWN0aW9uID0gbmV3IE1hdHJpeDNEKCk7XG5cblx0XHRcdHRoaXMuX3VucHJvamVjdGlvbi5jb3B5RnJvbSh0aGlzLm1hdHJpeCk7XG5cdFx0XHR0aGlzLl91bnByb2plY3Rpb24uaW52ZXJ0KCk7XG5cdFx0XHR0aGlzLl91bnByb2plY3Rpb25JbnZhbGlkID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl91bnByb2plY3Rpb247XG5cdH1cblxuXHRwdWJsaWMgdW5wcm9qZWN0KG5YOm51bWJlciwgblk6bnVtYmVyLCBzWjpudW1iZXIpOlZlY3RvcjNEXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIGNsb25lKCk6UHJvamVjdGlvbkJhc2Vcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IF9pQXNwZWN0UmF0aW8oKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQXNwZWN0UmF0aW87XG5cdH1cblxuXHRwdWJsaWMgc2V0IF9pQXNwZWN0UmF0aW8odmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BBc3BlY3RSYXRpbyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BBc3BlY3RSYXRpbyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHVibGljIHBJbnZhbGlkYXRlTWF0cml4KClcblx0e1xuXHRcdHRoaXMuX3BNYXRyaXhJbnZhbGlkID0gdHJ1ZTtcblx0XHR0aGlzLl91bnByb2plY3Rpb25JbnZhbGlkID0gdHJ1ZTtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFByb2plY3Rpb25FdmVudChQcm9qZWN0aW9uRXZlbnQuTUFUUklYX0NIQU5HRUQsIHRoaXMpKTtcblx0fVxuXG5cdHB1YmxpYyBwVXBkYXRlTWF0cml4KClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX2lVcGRhdGVTY2lzc29yUmVjdCh4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcilcblx0e1xuXHRcdHRoaXMuX3BTY2lzc29yUmVjdC54ID0geDtcblx0XHR0aGlzLl9wU2Npc3NvclJlY3QueSA9IHk7XG5cdFx0dGhpcy5fcFNjaXNzb3JSZWN0LndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5fcFNjaXNzb3JSZWN0LmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XG5cdH1cblxuXHRwdWJsaWMgX2lVcGRhdGVWaWV3cG9ydCh4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcilcblx0e1xuXHRcdHRoaXMuX3BWaWV3UG9ydC54ID0geDtcblx0XHR0aGlzLl9wVmlld1BvcnQueSA9IHk7XG5cdFx0dGhpcy5fcFZpZXdQb3J0LndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5fcFZpZXdQb3J0LmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gUHJvamVjdGlvbkJhc2U7Il19