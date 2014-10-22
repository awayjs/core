var Matrix = require("awayjs-core/lib/core/geom/Matrix");

var UVTransform = (function () {
    function UVTransform() {
        this._uvMatrix = new Matrix();
        this._rotation = 0;
        this._scaleU = 1;
        this._scaleV = 1;
        this._offsetU = 0;
        this._offsetV = 0;
    }
    Object.defineProperty(UVTransform.prototype, "offsetU", {
        /**
        *
        */
        get: function () {
            return this._offsetU;
        },
        set: function (value) {
            if (value == this._offsetU)
                return;

            this._offsetU = value;
            this._uvMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(UVTransform.prototype, "offsetV", {
        /**
        *
        */
        get: function () {
            return this._offsetV;
        },
        set: function (value) {
            if (value == this._offsetV)
                return;

            this._offsetV = value;
            this._uvMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(UVTransform.prototype, "rotation", {
        /**
        *
        */
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            if (value == this._rotation)
                return;

            this._rotation = value;

            this._uvMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(UVTransform.prototype, "scaleU", {
        /**
        *
        */
        get: function () {
            return this._scaleU;
        },
        set: function (value) {
            if (value == this._scaleU)
                return;

            this._scaleU = value;

            this._uvMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(UVTransform.prototype, "scaleV", {
        /**
        *
        */
        get: function () {
            return this._scaleV;
        },
        set: function (value) {
            if (value == this._scaleV)
                return;

            this._scaleV = value;

            this._uvMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(UVTransform.prototype, "matrix", {
        /**
        *
        */
        get: function () {
            if (this._uvMatrixDirty)
                this.updateUVMatrix();

            return this._uvMatrix;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * @private
    */
    UVTransform.prototype.updateUVMatrix = function () {
        this._uvMatrix.identity();

        if (this._rotation != 0)
            this._uvMatrix.rotate(this._rotation);

        if (this._scaleU != 1 || this._scaleV != 1)
            this._uvMatrix.scale(this._scaleU, this._scaleV);

        this._uvMatrix.translate(this._offsetU, this._offsetV);

        this._uvMatrixDirty = false;
    };
    return UVTransform;
})();

module.exports = UVTransform;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZ2VvbS9VVlRyYW5zZm9ybS50cyJdLCJuYW1lcyI6WyJVVlRyYW5zZm9ybSIsIlVWVHJhbnNmb3JtLmNvbnN0cnVjdG9yIiwiVVZUcmFuc2Zvcm0udXBkYXRlVVZNYXRyaXgiXSwibWFwcGluZ3MiOiJBQUFBLHdEQUFnRTs7QUFFaEU7SUErR0NBO1FBN0dBQyxLQUFRQSxTQUFTQSxHQUFVQSxJQUFJQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUd4Q0EsS0FBUUEsU0FBU0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLEtBQVFBLE9BQU9BLEdBQVVBLENBQUNBLENBQUNBO1FBQzNCQSxLQUFRQSxPQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUMzQkEsS0FBUUEsUUFBUUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLEtBQVFBLFFBQVFBLEdBQVVBLENBQUNBLENBQUNBO0lBd0c1QkEsQ0FBQ0E7SUFuR0REO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxRQUFRQTtRQUNyQkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBbUJBLEtBQVlBO1lBRTlCQSxJQUFJQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQTtnQkFDekJBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUE7UUFDM0JBLENBQUNBOzs7O0FBVEFBOztJQWNEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBO1FBRURBLEtBQUFBLFVBQW1CQSxLQUFZQTtZQUU5QkEsSUFBSUEsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUE7Z0JBQ3pCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0E7WUFDckJBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBO1FBRTNCQSxDQUFDQTs7OztBQVZBQTs7SUFlREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFNBQVNBO1FBQ3RCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFvQkEsS0FBWUE7WUFFL0JBLElBQUlBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFNBQVNBO2dCQUMxQkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBOztZQUV0QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUE7UUFDM0JBLENBQUNBOzs7O0FBVkFBOztJQWVEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsT0FBT0E7UUFDcEJBLENBQUNBO1FBRURBLEtBQUFBLFVBQWtCQSxLQUFZQTtZQUU3QkEsSUFBSUEsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsT0FBT0E7Z0JBQ3hCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0E7O1lBRXBCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQTtRQUMzQkEsQ0FBQ0E7Ozs7QUFWQUE7O0lBZURBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxPQUFPQTtRQUNwQkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBa0JBLEtBQVlBO1lBRTdCQSxJQUFJQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxPQUFPQTtnQkFDeEJBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQTs7WUFFcEJBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBO1FBQzNCQSxDQUFDQTs7OztBQVZBQTs7SUFlREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBO2dCQUN0QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1lBRXZCQSxPQUFPQSxJQUFJQSxDQUFDQSxTQUFTQTtRQUN0QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFVREE7O01BREdBOzJDQUNIQTtRQUVDRSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTs7UUFFekJBLElBQUlBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTs7UUFFdkNBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLENBQUNBO1lBQ3pDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTs7UUFFbERBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBOztRQUV0REEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsS0FBS0E7SUFDNUJBLENBQUNBO0lBQ0ZGLG1CQUFDQTtBQUFEQSxDQUFDQSxJQUFBOztBQUVELDRCQUFxQixDQUFBIiwiZmlsZSI6ImNvcmUvZ2VvbS9VVlRyYW5zZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRyaXhcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXhcIik7XG5cbmNsYXNzIFVWVHJhbnNmb3JtXG57XG5cdHByaXZhdGUgX3V2TWF0cml4Ok1hdHJpeCA9IG5ldyBNYXRyaXgoKTtcblx0cHJpdmF0ZSBfdXZNYXRyaXhEaXJ0eTpib29sZWFuO1xuXG5cdHByaXZhdGUgX3JvdGF0aW9uOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX3NjYWxlVTpudW1iZXIgPSAxO1xuXHRwcml2YXRlIF9zY2FsZVY6bnVtYmVyID0gMTtcblx0cHJpdmF0ZSBfb2Zmc2V0VTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9vZmZzZXRWOm51bWJlciA9IDA7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG9mZnNldFUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vZmZzZXRVO1xuXHR9XG5cblx0cHVibGljIHNldCBvZmZzZXRVKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9vZmZzZXRVKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fb2Zmc2V0VSA9IHZhbHVlO1xuXHRcdHRoaXMuX3V2TWF0cml4RGlydHkgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG9mZnNldFYoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9vZmZzZXRWO1xuXHR9XG5cblx0cHVibGljIHNldCBvZmZzZXRWKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9vZmZzZXRWKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fb2Zmc2V0ViA9IHZhbHVlO1xuXHRcdHRoaXMuX3V2TWF0cml4RGlydHkgPSB0cnVlO1xuXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcm90YXRpb24oKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcm90YXRpb24odmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX3JvdGF0aW9uKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcm90YXRpb24gPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3V2TWF0cml4RGlydHkgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlVSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NjYWxlVTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2NhbGVVKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9zY2FsZVUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zY2FsZVUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3V2TWF0cml4RGlydHkgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlVigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NjYWxlVjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2NhbGVWKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9zY2FsZVYpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zY2FsZVYgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3V2TWF0cml4RGlydHkgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1hdHJpeCgpOk1hdHJpeFxuXHR7XG5cdFx0aWYgKHRoaXMuX3V2TWF0cml4RGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVVWTWF0cml4KCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fdXZNYXRyaXg7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIHVwZGF0ZVVWTWF0cml4KClcblx0e1xuXHRcdHRoaXMuX3V2TWF0cml4LmlkZW50aXR5KCk7XG5cblx0XHRpZiAodGhpcy5fcm90YXRpb24gIT0gMClcblx0XHRcdHRoaXMuX3V2TWF0cml4LnJvdGF0ZSh0aGlzLl9yb3RhdGlvbik7XG5cblx0XHRpZiAodGhpcy5fc2NhbGVVICE9IDEgfHwgdGhpcy5fc2NhbGVWICE9IDEpXG5cdFx0XHR0aGlzLl91dk1hdHJpeC5zY2FsZSh0aGlzLl9zY2FsZVUsIHRoaXMuX3NjYWxlVik7XG5cblx0XHR0aGlzLl91dk1hdHJpeC50cmFuc2xhdGUodGhpcy5fb2Zmc2V0VSwgdGhpcy5fb2Zmc2V0Vik7XG5cblx0XHR0aGlzLl91dk1hdHJpeERpcnR5ID0gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0ID0gVVZUcmFuc2Zvcm07Il19