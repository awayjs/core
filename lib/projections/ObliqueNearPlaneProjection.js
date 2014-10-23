var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var ProjectionEvent = require("awayjs-core/lib/events/ProjectionEvent");
var ProjectionBase = require("awayjs-core/lib/projections/ProjectionBase");
var ObliqueNearPlaneProjection = (function (_super) {
    __extends(ObliqueNearPlaneProjection, _super);
    function ObliqueNearPlaneProjection(baseProjection, plane) {
        var _this = this;
        _super.call(this);
        this.baseProjection = baseProjection;
        this.plane = plane;
        this._onProjectionMatrixChangedDelegate = function (event) { return _this.onProjectionMatrixChanged(event); };
    }
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "frustumCorners", {
        //@override
        get: function () {
            return this._baseProjection.frustumCorners;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "near", {
        //@override
        get: function () {
            return this._baseProjection.near;
        },
        //@override
        set: function (value) {
            this._baseProjection.near = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "far", {
        //@override
        get: function () {
            return this._baseProjection.far;
        },
        //@override
        set: function (value) {
            this._baseProjection.far = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "iAspectRatio", {
        //@override
        get: function () {
            return this._baseProjection._iAspectRatio;
        },
        //@override
        set: function (value) {
            this._baseProjection._iAspectRatio = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "plane", {
        get: function () {
            return this._plane;
        },
        set: function (value) {
            this._plane = value;
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObliqueNearPlaneProjection.prototype, "baseProjection", {
        set: function (value) {
            if (this._baseProjection) {
                this._baseProjection.removeEventListener(ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
            }
            this._baseProjection = value;
            if (this._baseProjection) {
                this._baseProjection.addEventListener(ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
            }
            this.pInvalidateMatrix();
        },
        enumerable: true,
        configurable: true
    });
    ObliqueNearPlaneProjection.prototype.onProjectionMatrixChanged = function (event) {
        this.pInvalidateMatrix();
    };
    //@override
    ObliqueNearPlaneProjection.prototype.pUpdateMatrix = function () {
        this._pMatrix.copyFrom(this._baseProjection.matrix);
        var cx = this._plane.a;
        var cy = this._plane.b;
        var cz = this._plane.c;
        var cw = -this._plane.d + .05;
        var signX = cx >= 0 ? 1 : -1;
        var signY = cy >= 0 ? 1 : -1;
        var p = new Vector3D(signX, signY, 1, 1);
        var inverse = this._pMatrix.clone();
        inverse.invert();
        var q = inverse.transformVector(p);
        this._pMatrix.copyRowTo(3, p);
        var a = (q.x * p.x + q.y * p.y + q.z * p.z + q.w * p.w) / (cx * q.x + cy * q.y + cz * q.z + cw * q.w);
        this._pMatrix.copyRowFrom(2, new Vector3D(cx * a, cy * a, cz * a, cw * a));
    };
    return ObliqueNearPlaneProjection;
})(ProjectionBase);
module.exports = ObliqueNearPlaneProjection;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9vYmxpcXVlbmVhcnBsYW5lcHJvamVjdGlvbi50cyJdLCJuYW1lcyI6WyJPYmxpcXVlTmVhclBsYW5lUHJvamVjdGlvbiIsIk9ibGlxdWVOZWFyUGxhbmVQcm9qZWN0aW9uLmNvbnN0cnVjdG9yIiwiT2JsaXF1ZU5lYXJQbGFuZVByb2plY3Rpb24uZnJ1c3R1bUNvcm5lcnMiLCJPYmxpcXVlTmVhclBsYW5lUHJvamVjdGlvbi5uZWFyIiwiT2JsaXF1ZU5lYXJQbGFuZVByb2plY3Rpb24uZmFyIiwiT2JsaXF1ZU5lYXJQbGFuZVByb2plY3Rpb24uaUFzcGVjdFJhdGlvIiwiT2JsaXF1ZU5lYXJQbGFuZVByb2plY3Rpb24ucGxhbmUiLCJPYmxpcXVlTmVhclBsYW5lUHJvamVjdGlvbi5iYXNlUHJvamVjdGlvbiIsIk9ibGlxdWVOZWFyUGxhbmVQcm9qZWN0aW9uLm9uUHJvamVjdGlvbk1hdHJpeENoYW5nZWQiLCJPYmxpcXVlTmVhclBsYW5lUHJvamVjdGlvbi5wVXBkYXRlTWF0cml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxJQUFPLFFBQVEsV0FBZSwrQkFBK0IsQ0FBQyxDQUFDO0FBQy9ELElBQU8sZUFBZSxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFFN0UsSUFBTyxjQUFjLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUVoRixJQUFNLDBCQUEwQjtJQUFTQSxVQUFuQ0EsMEJBQTBCQSxVQUF1QkE7SUFPdERBLFNBUEtBLDBCQUEwQkEsQ0FPbkJBLGNBQTBCQSxFQUFFQSxLQUFhQTtRQVB0REMsaUJBMEdDQTtRQWpHQ0EsaUJBQU9BLENBQUNBO1FBQ1JBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLGNBQWNBLENBQUNBO1FBQ3JDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUVuQkEsSUFBSUEsQ0FBQ0Esa0NBQWtDQSxHQUFHQSxVQUFDQSxLQUFxQkEsSUFBS0EsT0FBQUEsS0FB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QUFVQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM5QkEsSUFBSUEsRUFBRUEsR0FBVUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLElBQUlBLEVBQUVBLEdBQVVBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ3JDQSxJQUFJQSxLQUFLQSxHQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNuQ0EsSUFBSUEsS0FBS0EsR0FBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLElBQUlBLENBQUNBLEdBQVlBLElBQUlBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ2xEQSxJQUFJQSxPQUFPQSxHQUFZQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUM3Q0EsT0FBT0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLEdBQVlBLE9BQU9BLENBQUNBLGVBQWVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzVDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDM0ZBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLFFBQVFBLENBQUNBLEVBQUVBLEdBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEdBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEdBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ3BFQSxDQUFDQTtJQUNGVCxpQ0FBQ0E7QUFBREEsQ0ExR0EsQUEwR0NBLEVBMUd3QyxjQUFjLEVBMEd0RDtBQUVELEFBQW9DLGlCQUEzQiwwQkFBMEIsQ0FBQyIsImZpbGUiOiJwcm9qZWN0aW9ucy9PYmxpcXVlTmVhclBsYW5lUHJvamVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgUGxhbmUzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9QbGFuZTNEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IFByb2plY3Rpb25FdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUHJvamVjdGlvbkV2ZW50XCIpO1xuaW1wb3J0IElQcm9qZWN0aW9uXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvSVByb2plY3Rpb25cIik7XG5pbXBvcnQgUHJvamVjdGlvbkJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvUHJvamVjdGlvbkJhc2VcIik7XG5cbmNsYXNzIE9ibGlxdWVOZWFyUGxhbmVQcm9qZWN0aW9uIGV4dGVuZHMgUHJvamVjdGlvbkJhc2VcbntcblxuXHRwcml2YXRlIF9iYXNlUHJvamVjdGlvbjpJUHJvamVjdGlvbjtcblx0cHJpdmF0ZSBfcGxhbmU6UGxhbmUzRDtcblx0cHJpdmF0ZSBfb25Qcm9qZWN0aW9uTWF0cml4Q2hhbmdlZERlbGVnYXRlOihldmVudDpQcm9qZWN0aW9uRXZlbnQpID0+IHZvaWQ7XG5cblx0Y29uc3RydWN0b3IoYmFzZVByb2plY3Rpb246SVByb2plY3Rpb24sIHBsYW5lOlBsYW5lM0QpXG5cdHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuYmFzZVByb2plY3Rpb24gPSBiYXNlUHJvamVjdGlvbjtcblx0XHR0aGlzLnBsYW5lID0gcGxhbmU7XG5cblx0XHR0aGlzLl9vblByb2plY3Rpb25NYXRyaXhDaGFuZ2VkRGVsZWdhdGUgPSAoZXZlbnQ6UHJvamVjdGlvbkV2ZW50KSA9PiB0aGlzLm9uUHJvamVjdGlvbk1hdHJpeENoYW5nZWQoZXZlbnQpO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIGdldCBmcnVzdHVtQ29ybmVycygpOm51bWJlcltdXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYmFzZVByb2plY3Rpb24uZnJ1c3R1bUNvcm5lcnM7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgZ2V0IG5lYXIoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iYXNlUHJvamVjdGlvbi5uZWFyO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIHNldCBuZWFyKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX2Jhc2VQcm9qZWN0aW9uLm5lYXIgPSB2YWx1ZTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBnZXQgZmFyKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYmFzZVByb2plY3Rpb24uZmFyO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIHNldCBmYXIodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fYmFzZVByb2plY3Rpb24uZmFyID0gdmFsdWU7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgZ2V0IGlBc3BlY3RSYXRpbygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2Jhc2VQcm9qZWN0aW9uLl9pQXNwZWN0UmF0aW87XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgc2V0IGlBc3BlY3RSYXRpbyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9iYXNlUHJvamVjdGlvbi5faUFzcGVjdFJhdGlvID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHBsYW5lKCk6UGxhbmUzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BsYW5lO1xuXHR9XG5cblx0cHVibGljIHNldCBwbGFuZSh2YWx1ZTpQbGFuZTNEKVxuXHR7XG5cdFx0dGhpcy5fcGxhbmUgPSB2YWx1ZTtcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJhc2VQcm9qZWN0aW9uKHZhbHVlOklQcm9qZWN0aW9uKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2Jhc2VQcm9qZWN0aW9uKSB7XG5cdFx0XHR0aGlzLl9iYXNlUHJvamVjdGlvbi5yZW1vdmVFdmVudExpc3RlbmVyKFByb2plY3Rpb25FdmVudC5NQVRSSVhfQ0hBTkdFRCwgdGhpcy5fb25Qcm9qZWN0aW9uTWF0cml4Q2hhbmdlZERlbGVnYXRlKTtcblx0XHR9XG5cdFx0dGhpcy5fYmFzZVByb2plY3Rpb24gPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9iYXNlUHJvamVjdGlvbikge1xuXHRcdFx0dGhpcy5fYmFzZVByb2plY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihQcm9qZWN0aW9uRXZlbnQuTUFUUklYX0NIQU5HRUQsIHRoaXMuX29uUHJvamVjdGlvbk1hdHJpeENoYW5nZWREZWxlZ2F0ZSk7XG5cdFx0fVxuXHRcdHRoaXMucEludmFsaWRhdGVNYXRyaXgoKTtcblx0fVxuXG5cdHByaXZhdGUgb25Qcm9qZWN0aW9uTWF0cml4Q2hhbmdlZChldmVudDpQcm9qZWN0aW9uRXZlbnQpXG5cdHtcblx0XHR0aGlzLnBJbnZhbGlkYXRlTWF0cml4KCk7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgcFVwZGF0ZU1hdHJpeCgpXG5cdHtcblx0XHR0aGlzLl9wTWF0cml4LmNvcHlGcm9tKHRoaXMuX2Jhc2VQcm9qZWN0aW9uLm1hdHJpeCk7XG5cblx0XHR2YXIgY3g6bnVtYmVyID0gdGhpcy5fcGxhbmUuYTtcblx0XHR2YXIgY3k6bnVtYmVyID0gdGhpcy5fcGxhbmUuYjtcblx0XHR2YXIgY3o6bnVtYmVyID0gdGhpcy5fcGxhbmUuYztcblx0XHR2YXIgY3c6bnVtYmVyID0gLXRoaXMuX3BsYW5lLmQgKyAuMDU7XG5cdFx0dmFyIHNpZ25YOm51bWJlciA9IGN4ID49IDA/IDEgOiAtMTtcblx0XHR2YXIgc2lnblk6bnVtYmVyID0gY3kgPj0gMD8gMSA6IC0xO1xuXHRcdHZhciBwOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKHNpZ25YLCBzaWduWSwgMSwgMSk7XG5cdFx0dmFyIGludmVyc2U6TWF0cml4M0QgPSB0aGlzLl9wTWF0cml4LmNsb25lKCk7XG5cdFx0aW52ZXJzZS5pbnZlcnQoKTtcblx0XHR2YXIgcTpWZWN0b3IzRCA9IGludmVyc2UudHJhbnNmb3JtVmVjdG9yKHApO1xuXHRcdHRoaXMuX3BNYXRyaXguY29weVJvd1RvKDMsIHApO1xuXHRcdHZhciBhOm51bWJlciA9IChxLngqcC54ICsgcS55KnAueSArIHEueipwLnogKyBxLncqcC53KS8oY3gqcS54ICsgY3kqcS55ICsgY3oqcS56ICsgY3cqcS53KTtcblx0XHR0aGlzLl9wTWF0cml4LmNvcHlSb3dGcm9tKDIsIG5ldyBWZWN0b3IzRChjeCphLCBjeSphLCBjeiphLCBjdyphKSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gT2JsaXF1ZU5lYXJQbGFuZVByb2plY3Rpb247Il19