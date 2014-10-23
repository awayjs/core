var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PerspectiveProjection = require("awayjs-core/lib/projections/PerspectiveProjection");
var ProjectionBase = require("awayjs-core/lib/projections/ProjectionBase");
var FreeMatrixProjection = (function (_super) {
    __extends(FreeMatrixProjection, _super);
    function FreeMatrixProjection() {
        _super.call(this);
        this._pMatrix.copyFrom(new PerspectiveProjection().matrix);
    }
    Object.defineProperty(FreeMatrixProjection.prototype, "near", {
        //@override
        set: function (value) {
            this._pNear = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FreeMatrixProjection.prototype, "far", {
        //@override
        set: function (value) {
            this._pFar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FreeMatrixProjection.prototype, "iAspectRatio", {
        //@override
        set: function (value) {
            this._pAspectRatio = value;
        },
        enumerable: true,
        configurable: true
    });
    //@override
    FreeMatrixProjection.prototype.clone = function () {
        var clone = new FreeMatrixProjection();
        clone._pMatrix.copyFrom(this._pMatrix);
        clone._pNear = this._pNear;
        clone._pFar = this._pFar;
        clone._pAspectRatio = this._pAspectRatio;
        clone.pInvalidateMatrix();
        return clone;
    };
    //@override
    FreeMatrixProjection.prototype.pUpdateMatrix = function () {
        this._pMatrixInvalid = false;
    };
    return FreeMatrixProjection;
})(ProjectionBase);
module.exports = FreeMatrixProjection;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9mcmVlbWF0cml4cHJvamVjdGlvbi50cyJdLCJuYW1lcyI6WyJGcmVlTWF0cml4UHJvamVjdGlvbiIsIkZyZWVNYXRyaXhQcm9qZWN0aW9uLmNvbnN0cnVjdG9yIiwiRnJlZU1hdHJpeFByb2plY3Rpb24ubmVhciIsIkZyZWVNYXRyaXhQcm9qZWN0aW9uLmZhciIsIkZyZWVNYXRyaXhQcm9qZWN0aW9uLmlBc3BlY3RSYXRpbyIsIkZyZWVNYXRyaXhQcm9qZWN0aW9uLmNsb25lIiwiRnJlZU1hdHJpeFByb2plY3Rpb24ucFVwZGF0ZU1hdHJpeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxxQkFBcUIsV0FBVyxtREFBbUQsQ0FBQyxDQUFDO0FBQzVGLElBQU8sY0FBYyxXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFFaEYsSUFBTSxvQkFBb0I7SUFBU0EsVUFBN0JBLG9CQUFvQkEsVUFBdUJBO0lBRWhEQSxTQUZLQSxvQkFBb0JBO1FBSXhCQyxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEscUJBQXFCQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtJQUM1REEsQ0FBQ0E7SUFHREQsc0JBQVdBLHNDQUFJQTtRQURmQSxXQUFXQTthQUNYQSxVQUFnQkEsS0FBWUE7WUFFM0JFLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3JCQSxDQUFDQTs7O09BQUFGO0lBR0RBLHNCQUFXQSxxQ0FBR0E7UUFEZEEsV0FBV0E7YUFDWEEsVUFBZUEsS0FBWUE7WUFFMUJHLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3BCQSxDQUFDQTs7O09BQUFIO0lBR0RBLHNCQUFXQSw4Q0FBWUE7UUFEdkJBLFdBQVdBO2FBQ1hBLFVBQXdCQSxLQUFZQTtZQUVuQ0ksSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDNUJBLENBQUNBOzs7T0FBQUo7SUFFREEsV0FBV0E7SUFDSkEsb0NBQUtBLEdBQVpBO1FBRUNLLElBQUlBLEtBQUtBLEdBQXdCQSxJQUFJQSxvQkFBb0JBLEVBQUVBLENBQUNBO1FBQzVEQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUN2Q0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDM0JBLEtBQUtBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1FBQ3pCQSxLQUFLQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUN6Q0EsS0FBS0EsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtRQUMxQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFFREwsV0FBV0E7SUFDSkEsNENBQWFBLEdBQXBCQTtRQUVDTSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFDRk4sMkJBQUNBO0FBQURBLENBNUNBLEFBNENDQSxFQTVDa0MsY0FBYyxFQTRDaEQ7QUFFRCxBQUE4QixpQkFBckIsb0JBQW9CLENBQUMiLCJmaWxlIjoicHJvamVjdGlvbnMvRnJlZU1hdHJpeFByb2plY3Rpb24uanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBlcnNwZWN0aXZlUHJvamVjdGlvblx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3Byb2plY3Rpb25zL1BlcnNwZWN0aXZlUHJvamVjdGlvblwiKTtcbmltcG9ydCBQcm9qZWN0aW9uQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9Qcm9qZWN0aW9uQmFzZVwiKTtcblxuY2xhc3MgRnJlZU1hdHJpeFByb2plY3Rpb24gZXh0ZW5kcyBQcm9qZWN0aW9uQmFzZVxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcE1hdHJpeC5jb3B5RnJvbShuZXcgUGVyc3BlY3RpdmVQcm9qZWN0aW9uKCkubWF0cml4KTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBzZXQgbmVhcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9wTmVhciA9IHZhbHVlO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIHNldCBmYXIodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fcEZhciA9IHZhbHVlO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIHNldCBpQXNwZWN0UmF0aW8odmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fcEFzcGVjdFJhdGlvID0gdmFsdWU7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgY2xvbmUoKTpQcm9qZWN0aW9uQmFzZVxuXHR7XG5cdFx0dmFyIGNsb25lOkZyZWVNYXRyaXhQcm9qZWN0aW9uID0gbmV3IEZyZWVNYXRyaXhQcm9qZWN0aW9uKCk7XG5cdFx0Y2xvbmUuX3BNYXRyaXguY29weUZyb20odGhpcy5fcE1hdHJpeCk7XG5cdFx0Y2xvbmUuX3BOZWFyID0gdGhpcy5fcE5lYXI7XG5cdFx0Y2xvbmUuX3BGYXIgPSB0aGlzLl9wRmFyO1xuXHRcdGNsb25lLl9wQXNwZWN0UmF0aW8gPSB0aGlzLl9wQXNwZWN0UmF0aW87XG5cdFx0Y2xvbmUucEludmFsaWRhdGVNYXRyaXgoKTtcblx0XHRyZXR1cm4gY2xvbmU7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgcFVwZGF0ZU1hdHJpeCgpXG5cdHtcblx0XHR0aGlzLl9wTWF0cml4SW52YWxpZCA9IGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCA9IEZyZWVNYXRyaXhQcm9qZWN0aW9uOyJdfQ==