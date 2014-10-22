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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Rpb25zL0ZyZWVNYXRyaXhQcm9qZWN0aW9uLnRzIl0sIm5hbWVzIjpbIkZyZWVNYXRyaXhQcm9qZWN0aW9uIiwiRnJlZU1hdHJpeFByb2plY3Rpb24uY29uc3RydWN0b3IiLCJGcmVlTWF0cml4UHJvamVjdGlvbi5jbG9uZSIsIkZyZWVNYXRyaXhQcm9qZWN0aW9uLnBVcGRhdGVNYXRyaXgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdGQUE0RjtBQUM1RiwwRUFBZ0Y7O0FBRWhGO0lBQW1DQSx1Q0FBY0E7SUFFaERBO1FBRUNDLFdBQU1BLEtBQUFBLENBQUNBOztRQUVQQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxxQkFBcUJBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBO0lBQzNEQSxDQUFDQTtJQUdERDtRQUFBQSxXQURXQTthQUNYQSxVQUFnQkEsS0FBWUE7WUFFM0JBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBO1FBQ3BCQSxDQUFDQTs7OztBQUFBQTtJQUdEQTtRQUFBQSxXQURXQTthQUNYQSxVQUFlQSxLQUFZQTtZQUUxQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0E7UUFDbkJBLENBQUNBOzs7O0FBQUFBO0lBR0RBO1FBQUFBLFdBRFdBO2FBQ1hBLFVBQXdCQSxLQUFZQTtZQUVuQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsS0FBS0E7UUFDM0JBLENBQUNBOzs7O0FBQUFBO0lBR0RBLFdBRFdBOzJDQUNYQTtRQUVDRSxJQUFJQSxLQUFLQSxHQUF3QkEsSUFBSUEsb0JBQW9CQSxDQUFDQSxDQUFDQTtRQUMzREEsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdENBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BO1FBQzFCQSxLQUFLQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQTtRQUN4QkEsS0FBS0EsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUE7UUFDeENBLEtBQUtBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7UUFDekJBLE9BQU9BLEtBQUtBO0lBQ2JBLENBQUNBOztJQUdERixXQURXQTttREFDWEE7UUFFQ0csSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsS0FBS0E7SUFDN0JBLENBQUNBO0lBQ0ZILDRCQUFDQTtBQUFEQSxDQUFDQSxFQTVDa0MsY0FBYyxFQTRDaEQ7O0FBRUQscUNBQThCLENBQUEiLCJmaWxlIjoicHJvamVjdGlvbnMvRnJlZU1hdHJpeFByb2plY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGVyc3BlY3RpdmVQcm9qZWN0aW9uXHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvUGVyc3BlY3RpdmVQcm9qZWN0aW9uXCIpO1xuaW1wb3J0IFByb2plY3Rpb25CYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3Byb2plY3Rpb25zL1Byb2plY3Rpb25CYXNlXCIpO1xuXG5jbGFzcyBGcmVlTWF0cml4UHJvamVjdGlvbiBleHRlbmRzIFByb2plY3Rpb25CYXNlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wTWF0cml4LmNvcHlGcm9tKG5ldyBQZXJzcGVjdGl2ZVByb2plY3Rpb24oKS5tYXRyaXgpO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIHNldCBuZWFyKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3BOZWFyID0gdmFsdWU7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgc2V0IGZhcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9wRmFyID0gdmFsdWU7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgc2V0IGlBc3BlY3RSYXRpbyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9wQXNwZWN0UmF0aW8gPSB2YWx1ZTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBjbG9uZSgpOlByb2plY3Rpb25CYXNlXG5cdHtcblx0XHR2YXIgY2xvbmU6RnJlZU1hdHJpeFByb2plY3Rpb24gPSBuZXcgRnJlZU1hdHJpeFByb2plY3Rpb24oKTtcblx0XHRjbG9uZS5fcE1hdHJpeC5jb3B5RnJvbSh0aGlzLl9wTWF0cml4KTtcblx0XHRjbG9uZS5fcE5lYXIgPSB0aGlzLl9wTmVhcjtcblx0XHRjbG9uZS5fcEZhciA9IHRoaXMuX3BGYXI7XG5cdFx0Y2xvbmUuX3BBc3BlY3RSYXRpbyA9IHRoaXMuX3BBc3BlY3RSYXRpbztcblx0XHRjbG9uZS5wSW52YWxpZGF0ZU1hdHJpeCgpO1xuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBwVXBkYXRlTWF0cml4KClcblx0e1xuXHRcdHRoaXMuX3BNYXRyaXhJbnZhbGlkID0gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0ID0gRnJlZU1hdHJpeFByb2plY3Rpb247Il19