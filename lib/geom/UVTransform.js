var Matrix = require("awayjs-core/lib/geom/Matrix");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbIlVWVHJhbnNmb3JtIiwiVVZUcmFuc2Zvcm0uY29uc3RydWN0b3IiLCJVVlRyYW5zZm9ybS5vZmZzZXRVIiwiVVZUcmFuc2Zvcm0ub2Zmc2V0ViIsIlVWVHJhbnNmb3JtLnJvdGF0aW9uIiwiVVZUcmFuc2Zvcm0uc2NhbGVVIiwiVVZUcmFuc2Zvcm0uc2NhbGVWIiwiVVZUcmFuc2Zvcm0ubWF0cml4IiwiVVZUcmFuc2Zvcm0udXBkYXRlVVZNYXRyaXgiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sTUFBTSxXQUFlLDZCQUE2QixDQUFDLENBQUM7QUFFM0QsSUFBTSxXQUFXO0lBK0doQkEsU0EvR0tBLFdBQVdBO1FBRVJDLGNBQVNBLEdBQVVBLElBQUlBLE1BQU1BLEVBQUVBLENBQUNBO1FBR2hDQSxjQUFTQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNyQkEsWUFBT0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDbkJBLFlBQU9BLEdBQVVBLENBQUNBLENBQUNBO1FBQ25CQSxhQUFRQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNwQkEsYUFBUUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7SUF3RzVCQSxDQUFDQTtJQW5HREQsc0JBQVdBLGdDQUFPQTtRQUhsQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3RCQSxDQUFDQTthQUVERixVQUFtQkEsS0FBWUE7WUFFOUJFLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO2dCQUMxQkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzVCQSxDQUFDQTs7O09BVEFGO0lBY0RBLHNCQUFXQSxnQ0FBT0E7UUFIbEJBOztX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QUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUV2REEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsS0FBS0EsQ0FBQ0E7SUFDN0JBLENBQUNBO0lBQ0ZSLGtCQUFDQTtBQUFEQSxDQXJJQSxBQXFJQ0EsSUFBQTtBQUVELEFBQXFCLGlCQUFaLFdBQVcsQ0FBQyIsImZpbGUiOiJnZW9tL1VWVHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRyaXhcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4XCIpO1xyXG5cclxuY2xhc3MgVVZUcmFuc2Zvcm1cclxue1xyXG5cdHByaXZhdGUgX3V2TWF0cml4Ok1hdHJpeCA9IG5ldyBNYXRyaXgoKTtcclxuXHRwcml2YXRlIF91dk1hdHJpeERpcnR5OmJvb2xlYW47XHJcblxyXG5cdHByaXZhdGUgX3JvdGF0aW9uOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfc2NhbGVVOm51bWJlciA9IDE7XHJcblx0cHJpdmF0ZSBfc2NhbGVWOm51bWJlciA9IDE7XHJcblx0cHJpdmF0ZSBfb2Zmc2V0VTpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX29mZnNldFY6bnVtYmVyID0gMDtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG9mZnNldFUoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fb2Zmc2V0VTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgb2Zmc2V0VSh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX29mZnNldFUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9vZmZzZXRVID0gdmFsdWU7XHJcblx0XHR0aGlzLl91dk1hdHJpeERpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBvZmZzZXRWKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX29mZnNldFY7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG9mZnNldFYodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9vZmZzZXRWKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fb2Zmc2V0ViA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fdXZNYXRyaXhEaXJ0eSA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByb3RhdGlvbih2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX3JvdGF0aW9uKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb24gPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl91dk1hdHJpeERpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2FsZVUoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2NhbGVVO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzY2FsZVUodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9zY2FsZVUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9zY2FsZVUgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl91dk1hdHJpeERpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2FsZVYoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2NhbGVWO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzY2FsZVYodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9zY2FsZVYpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9zY2FsZVYgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl91dk1hdHJpeERpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBtYXRyaXgoKTpNYXRyaXhcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fdXZNYXRyaXhEaXJ0eSlcclxuXHRcdFx0dGhpcy51cGRhdGVVVk1hdHJpeCgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl91dk1hdHJpeDtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZVVWTWF0cml4KClcclxuXHR7XHJcblx0XHR0aGlzLl91dk1hdHJpeC5pZGVudGl0eSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9yb3RhdGlvbiAhPSAwKVxyXG5cdFx0XHR0aGlzLl91dk1hdHJpeC5yb3RhdGUodGhpcy5fcm90YXRpb24pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zY2FsZVUgIT0gMSB8fCB0aGlzLl9zY2FsZVYgIT0gMSlcclxuXHRcdFx0dGhpcy5fdXZNYXRyaXguc2NhbGUodGhpcy5fc2NhbGVVLCB0aGlzLl9zY2FsZVYpO1xyXG5cclxuXHRcdHRoaXMuX3V2TWF0cml4LnRyYW5zbGF0ZSh0aGlzLl9vZmZzZXRVLCB0aGlzLl9vZmZzZXRWKTtcclxuXHJcblx0XHR0aGlzLl91dk1hdHJpeERpcnR5ID0gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBVVlRyYW5zZm9ybTsiXX0=