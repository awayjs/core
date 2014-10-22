var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");
var ProjectionEvent = require("awayjs-core/lib/events/ProjectionEvent");

var ProjectionBase = require("awayjs-core/lib/projections/ProjectionBase");

var ObliqueNearPlaneProjection = (function (_super) {
    __extends(ObliqueNearPlaneProjection, _super);
    function ObliqueNearPlaneProjection(baseProjection, plane) {
        var _this = this;
        _super.call(this);
        this.baseProjection = baseProjection;
        this.plane = plane;

        this._onProjectionMatrixChangedDelegate = function (event) {
            return _this.onProjectionMatrixChanged(event);
        };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Rpb25zL09ibGlxdWVOZWFyUGxhbmVQcm9qZWN0aW9uLnRzIl0sIm5hbWVzIjpbIk9ibGlxdWVOZWFyUGxhbmVQcm9qZWN0aW9uIiwiT2JsaXF1ZU5lYXJQbGFuZVByb2plY3Rpb24uY29uc3RydWN0b3IiLCJPYmxpcXVlTmVhclBsYW5lUHJvamVjdGlvbi5vblByb2plY3Rpb25NYXRyaXhDaGFuZ2VkIiwiT2JsaXF1ZU5lYXJQbGFuZVByb2plY3Rpb24ucFVwZGF0ZU1hdHJpeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNERBRW9FO0FBQ3BFLHVFQUE2RTs7QUFFN0UsMEVBQWdGOztBQUVoRjtJQUF5Q0EsNkNBQWNBO0lBT3REQSxvQ0FBWUEsY0FBMEJBLEVBQUVBLEtBQWFBO1FBQXJEQyxpQkFPQ0E7UUFMQUEsV0FBTUEsS0FBQUEsQ0FBQ0E7UUFDUEEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsY0FBY0E7UUFDcENBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBOztRQUVsQkEsSUFBSUEsQ0FBQ0Esa0NBQWtDQSxHQUFHQSxVQUFDQSxLQUFxQkE7bUJBQUtBLEtBQUlBLENBQUNBLHlCQUF5QkEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFBckNBLENBQXFDQTtJQUMzR0EsQ0FBQ0E7SUFHREQ7UUFBQUEsV0FEV0E7YUFDWEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsY0FBY0E7UUFDM0NBLENBQUNBOzs7O0FBQUFBO0lBR0RBO1FBQUFBLFdBRFdBO2FBQ1hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBO1FBQ2pDQSxDQUFDQTtRQUdEQSxXQURXQTthQUNYQSxVQUFnQkEsS0FBWUE7WUFFM0JBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBO1FBQ2xDQSxDQUFDQTs7OztBQU5BQTs7SUFTREE7UUFBQUEsV0FEV0E7YUFDWEE7WUFFQ0EsT0FBT0EsSUFBSUEs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UUFDN0JBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLEVBQUVBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzFGQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxRQUFRQSxDQUFDQSxFQUFFQSxHQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxHQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxHQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNuRUEsQ0FBQ0E7SUFDRkgsa0NBQUNBO0FBQURBLENBQUNBLEVBMUd3QyxjQUFjLEVBMEd0RDs7QUFFRCwyQ0FBb0MsQ0FBQSIsImZpbGUiOiJwcm9qZWN0aW9ucy9PYmxpcXVlTmVhclBsYW5lUHJvamVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFBsYW5lM0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9QbGFuZTNEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgUHJvamVjdGlvbkV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Qcm9qZWN0aW9uRXZlbnRcIik7XG5pbXBvcnQgSVByb2plY3Rpb25cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9JUHJvamVjdGlvblwiKTtcbmltcG9ydCBQcm9qZWN0aW9uQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9Qcm9qZWN0aW9uQmFzZVwiKTtcblxuY2xhc3MgT2JsaXF1ZU5lYXJQbGFuZVByb2plY3Rpb24gZXh0ZW5kcyBQcm9qZWN0aW9uQmFzZVxue1xuXG5cdHByaXZhdGUgX2Jhc2VQcm9qZWN0aW9uOklQcm9qZWN0aW9uO1xuXHRwcml2YXRlIF9wbGFuZTpQbGFuZTNEO1xuXHRwcml2YXRlIF9vblByb2plY3Rpb25NYXRyaXhDaGFuZ2VkRGVsZWdhdGU6KGV2ZW50OlByb2plY3Rpb25FdmVudCkgPT4gdm9pZDtcblxuXHRjb25zdHJ1Y3RvcihiYXNlUHJvamVjdGlvbjpJUHJvamVjdGlvbiwgcGxhbmU6UGxhbmUzRClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5iYXNlUHJvamVjdGlvbiA9IGJhc2VQcm9qZWN0aW9uO1xuXHRcdHRoaXMucGxhbmUgPSBwbGFuZTtcblxuXHRcdHRoaXMuX29uUHJvamVjdGlvbk1hdHJpeENoYW5nZWREZWxlZ2F0ZSA9IChldmVudDpQcm9qZWN0aW9uRXZlbnQpID0+IHRoaXMub25Qcm9qZWN0aW9uTWF0cml4Q2hhbmdlZChldmVudCk7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgZ2V0IGZydXN0dW1Db3JuZXJzKCk6bnVtYmVyW11cblx0e1xuXHRcdHJldHVybiB0aGlzLl9iYXNlUHJvamVjdGlvbi5mcnVzdHVtQ29ybmVycztcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBnZXQgbmVhcigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2Jhc2VQcm9qZWN0aW9uLm5lYXI7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgc2V0IG5lYXIodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fYmFzZVByb2plY3Rpb24ubmVhciA9IHZhbHVlO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIGdldCBmYXIoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iYXNlUHJvamVjdGlvbi5mYXI7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgc2V0IGZhcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9iYXNlUHJvamVjdGlvbi5mYXIgPSB2YWx1ZTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBnZXQgaUFzcGVjdFJhdGlvKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYmFzZVByb2plY3Rpb24uX2lBc3BlY3RSYXRpbztcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBzZXQgaUFzcGVjdFJhdGlvKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX2Jhc2VQcm9qZWN0aW9uLl9pQXNwZWN0UmF0aW8gPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgcGxhbmUoKTpQbGFuZTNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGxhbmU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBsYW5lKHZhbHVlOlBsYW5lM0QpXG5cdHtcblx0XHR0aGlzLl9wbGFuZSA9IHZhbHVlO1xuXHRcdHRoaXMucEludmFsaWRhdGVNYXRyaXgoKTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYmFzZVByb2plY3Rpb24odmFsdWU6SVByb2plY3Rpb24pXG5cdHtcblx0XHRpZiAodGhpcy5fYmFzZVByb2plY3Rpb24pIHtcblx0XHRcdHRoaXMuX2Jhc2VQcm9qZWN0aW9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoUHJvamVjdGlvbkV2ZW50Lk1BVFJJWF9DSEFOR0VELCB0aGlzLl9vblByb2plY3Rpb25NYXRyaXhDaGFuZ2VkRGVsZWdhdGUpO1xuXHRcdH1cblx0XHR0aGlzLl9iYXNlUHJvamVjdGlvbiA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX2Jhc2VQcm9qZWN0aW9uKSB7XG5cdFx0XHR0aGlzLl9iYXNlUHJvamVjdGlvbi5hZGRFdmVudExpc3RlbmVyKFByb2plY3Rpb25FdmVudC5NQVRSSVhfQ0hBTkdFRCwgdGhpcy5fb25Qcm9qZWN0aW9uTWF0cml4Q2hhbmdlZERlbGVnYXRlKTtcblx0XHR9XG5cdFx0dGhpcy5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHR9XG5cblx0cHJpdmF0ZSBvblByb2plY3Rpb25NYXRyaXhDaGFuZ2VkKGV2ZW50OlByb2plY3Rpb25FdmVudClcblx0e1xuXHRcdHRoaXMucEludmFsaWRhdGVNYXRyaXgoKTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBwVXBkYXRlTWF0cml4KClcblx0e1xuXHRcdHRoaXMuX3BNYXRyaXguY29weUZyb20odGhpcy5fYmFzZVByb2plY3Rpb24ubWF0cml4KTtcblxuXHRcdHZhciBjeDpudW1iZXIgPSB0aGlzLl9wbGFuZS5hO1xuXHRcdHZhciBjeTpudW1iZXIgPSB0aGlzLl9wbGFuZS5iO1xuXHRcdHZhciBjejpudW1iZXIgPSB0aGlzLl9wbGFuZS5jO1xuXHRcdHZhciBjdzpudW1iZXIgPSAtdGhpcy5fcGxhbmUuZCArIC4wNTtcblx0XHR2YXIgc2lnblg6bnVtYmVyID0gY3ggPj0gMD8gMSA6IC0xO1xuXHRcdHZhciBzaWduWTpudW1iZXIgPSBjeSA+PSAwPyAxIDogLTE7XG5cdFx0dmFyIHA6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0Qoc2lnblgsIHNpZ25ZLCAxLCAxKTtcblx0XHR2YXIgaW52ZXJzZTpNYXRyaXgzRCA9IHRoaXMuX3BNYXRyaXguY2xvbmUoKTtcblx0XHRpbnZlcnNlLmludmVydCgpO1xuXHRcdHZhciBxOlZlY3RvcjNEID0gaW52ZXJzZS50cmFuc2Zvcm1WZWN0b3IocCk7XG5cdFx0dGhpcy5fcE1hdHJpeC5jb3B5Um93VG8oMywgcCk7XG5cdFx0dmFyIGE6bnVtYmVyID0gKHEueCpwLnggKyBxLnkqcC55ICsgcS56KnAueiArIHEudypwLncpLyhjeCpxLnggKyBjeSpxLnkgKyBjeipxLnogKyBjdypxLncpO1xuXHRcdHRoaXMuX3BNYXRyaXguY29weVJvd0Zyb20oMiwgbmV3IFZlY3RvcjNEKGN4KmEsIGN5KmEsIGN6KmEsIGN3KmEpKTtcblx0fVxufVxuXG5leHBvcnQgPSBPYmxpcXVlTmVhclBsYW5lUHJvamVjdGlvbjsiXX0=