var getTimer = require("awayjs-core/lib/utils/getTimer");

var RequestAnimationFrame = (function () {
    function RequestAnimationFrame(callback, callbackContext) {
        var _this = this;
        this._active = false;
        this._argsArray = new Array();
        this._getTimer = getTimer;

        this.setCallback(callback, callbackContext);

        this._rafUpdateFunction = function () {
            if (_this._active)
                _this._tick();
        };

        this._argsArray.push(this._dt);
    }
    // Public
    /**
    *
    * @param callback
    * @param callbackContext
    */
    RequestAnimationFrame.prototype.setCallback = function (callback, callbackContext) {
        this._callback = callback;
        this._callbackContext = callbackContext;
    };

    /**
    *
    */
    RequestAnimationFrame.prototype.start = function () {
        this._prevTime = this._getTimer();
        this._active = true;

        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(this._rafUpdateFunction);
        } else {
            if (window['mozRequestAnimationFrame'])
                window.requestAnimationFrame = window['mozRequestAnimationFrame'];
            else if (window['webkitRequestAnimationFrame'])
                window.requestAnimationFrame = window['webkitRequestAnimationFrame'];
            else if (window['oRequestAnimationFrame'])
                window.requestAnimationFrame = window['oRequestAnimationFrame'];
        }
    };

    /**
    *
    */
    RequestAnimationFrame.prototype.stop = function () {
        this._active = false;
    };

    Object.defineProperty(RequestAnimationFrame.prototype, "active", {
        // Get / Set
        /**
        *
        * @returns {boolean}
        */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });

    // Private
    /**
    *
    * @private
    */
    RequestAnimationFrame.prototype._tick = function () {
        this._currentTime = this._getTimer();
        this._dt = this._currentTime - this._prevTime;
        this._argsArray[0] = this._dt;
        this._callback.apply(this._callbackContext, this._argsArray);

        window.requestAnimationFrame(this._rafUpdateFunction);

        this._prevTime = this._currentTime;
    };
    return RequestAnimationFrame;
})();

module.exports = RequestAnimationFrame;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL1JlcXVlc3RBbmltYXRpb25GcmFtZS50cyJdLCJuYW1lcyI6WyJSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuY29uc3RydWN0b3IiLCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuc2V0Q2FsbGJhY2siLCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuc3RhcnQiLCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuc3RvcCIsIlJlcXVlc3RBbmltYXRpb25GcmFtZS5fdGljayJdLCJtYXBwaW5ncyI6IkFBQUEsd0RBQWdFOztBQUVoRTtJQVlDQSwrQkFBWUEsUUFBaUJBLEVBQUVBLGVBQXNCQTtRQUFyREMsaUJBWUNBO1FBcEJEQSxLQUFRQSxPQUFPQSxHQUFXQSxLQUFLQSxDQUFDQTtRQUtoQ0EsS0FBUUEsVUFBVUEsR0FBY0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFLM0NBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBOztRQUV6QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsUUFBUUEsRUFBRUEsZUFBZUEsQ0FBQ0E7O1FBRTNDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUdBO1lBQ3pCQSxJQUFJQSxLQUFJQSxDQUFDQSxPQUFPQTtnQkFDZkEsS0FBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDZkEsQ0FBQ0E7O1FBRURBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBO0lBQy9CQSxDQUFDQTtJQVNERCxTQVBTQTtJQUVUQTs7OztNQUlHQTtrREFDSEEsVUFBbUJBLFFBQWlCQSxFQUFFQSxlQUFzQkE7UUFFM0RFLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBO1FBQ3pCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLGVBQWVBO0lBQ3hDQSxDQUFDQTs7SUFLREY7O01BREdBOzRDQUNIQTtRQUVDRyxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUNqQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUE7O1FBRW5CQSxJQUFJQSxNQUFNQSxDQUFDQSxxQkFBcUJBLENBQUVBO1lBQ2pDQSxNQUFNQSxDQUFDQSxxQkFBcUJBLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7U0FDckRBLEtBQU1BO1lBQ05BLElBQUlBLE1BQU1BLENBQUNBLDBCQUEwQkEsQ0FBQ0E7Z0JBQ3JDQSxNQUFNQSxDQUFDQSxxQkFBcUJBLEdBQUdBLE1BQU1BLENBQUNBLDBCQUEwQkEsQ0FBQ0E7aUJBQzdEQSxJQUFJQSxNQUFNQSxDQUFDQSw2QkFBNkJBLENBQUNBO2dCQUM3Q0EsTUFBTUEsQ0FBQ0EscUJBQXFCQSxHQUFHQSxNQUFNQSxDQUFDQSw2QkFBNkJBLENBQUNBO2lCQUNoRUEsSUFBSUEsTUFBTUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQTtnQkFDeENBLE1BQU1BLENBQUNBLHFCQUFxQkEsR0FBR0EsTUFBTUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxDQUFDQTtTQUNqRUE7SUFDRkEsQ0FBQ0E7O0lBS0RIOztNQURHQTsyQ0FDSEE7UUFFQ0ksSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0E7SUFDckJBLENBQUNBOztJQVFESjtRQUFBQSxZQU5ZQTtRQUVaQTs7O1VBR0dBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTs7OztBQUFBQTtJQVFEQSxVQU5VQTtJQUVWQTs7O01BR0dBOzRDQUNIQTtRQUVDSyxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUNwQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0E7UUFDN0NBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBO1FBQzdCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBOztRQUU1REEsTUFBTUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBOztRQUVyREEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUE7SUFDbkNBLENBQUNBO0lBR0ZMLDZCQUFDQTtBQUFEQSxDQUFDQSxJQUFBOztBQUVELHNDQUErQixDQUFBIiwiZmlsZSI6InV0aWxzL1JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnZXRUaW1lclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvZ2V0VGltZXJcIik7XG5cbmNsYXNzIFJlcXVlc3RBbmltYXRpb25GcmFtZVxue1xuXHRwcml2YXRlIF9jYWxsYmFjazpGdW5jdGlvbjtcblx0cHJpdmF0ZSBfY2FsbGJhY2tDb250ZXh0Ok9iamVjdDtcblx0cHJpdmF0ZSBfYWN0aXZlOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfcmFmVXBkYXRlRnVuY3Rpb246YW55O1xuXHRwcml2YXRlIF9wcmV2VGltZTpudW1iZXI7XG5cdHByaXZhdGUgX2R0Om51bWJlcjtcblx0cHJpdmF0ZSBfY3VycmVudFRpbWU6bnVtYmVyO1xuXHRwcml2YXRlIF9hcmdzQXJyYXk6QXJyYXk8YW55PiA9IG5ldyBBcnJheSgpO1xuXHRwcml2YXRlIF9nZXRUaW1lcjpGdW5jdGlvbjtcblxuXHRjb25zdHJ1Y3RvcihjYWxsYmFjazpGdW5jdGlvbiwgY2FsbGJhY2tDb250ZXh0Ok9iamVjdClcblx0e1xuXHRcdHRoaXMuX2dldFRpbWVyID0gZ2V0VGltZXI7XG5cblx0XHR0aGlzLnNldENhbGxiYWNrKGNhbGxiYWNrLCBjYWxsYmFja0NvbnRleHQpO1xuXG5cdFx0dGhpcy5fcmFmVXBkYXRlRnVuY3Rpb24gPSAoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fYWN0aXZlKVxuXHRcdFx0XHR0aGlzLl90aWNrKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fYXJnc0FycmF5LnB1c2godGhpcy5fZHQpO1xuXHR9XG5cblx0Ly8gUHVibGljXG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBjYWxsYmFja1xuXHQgKiBAcGFyYW0gY2FsbGJhY2tDb250ZXh0XG5cdCAqL1xuXHRwdWJsaWMgc2V0Q2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24sIGNhbGxiYWNrQ29udGV4dDpPYmplY3QpXG5cdHtcblx0XHR0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHRoaXMuX2NhbGxiYWNrQ29udGV4dCA9IGNhbGxiYWNrQ29udGV4dDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXJ0KClcblx0e1xuXHRcdHRoaXMuX3ByZXZUaW1lID0gdGhpcy5fZ2V0VGltZXIoKTtcblx0XHR0aGlzLl9hY3RpdmUgPSB0cnVlO1xuXG5cdFx0aWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fcmFmVXBkYXRlRnVuY3Rpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAod2luZG93Wydtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXSlcblx0XHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1snbW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG5cdFx0XHRlbHNlIGlmICh3aW5kb3dbJ3dlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSddKVxuXHRcdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93Wyd3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcblx0XHRcdGVsc2UgaWYgKHdpbmRvd1snb1JlcXVlc3RBbmltYXRpb25GcmFtZSddKVxuXHRcdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93WydvUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc3RvcCgpXG5cdHtcblx0XHR0aGlzLl9hY3RpdmUgPSBmYWxzZTtcblx0fVxuXG5cdC8vIEdldCAvIFNldFxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBnZXQgYWN0aXZlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FjdGl2ZTtcblx0fVxuXG5cdC8vIFByaXZhdGVcblxuXHQvKipcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgX3RpY2soKTp2b2lkXG5cdHtcblx0XHR0aGlzLl9jdXJyZW50VGltZSA9IHRoaXMuX2dldFRpbWVyKCk7XG5cdFx0dGhpcy5fZHQgPSB0aGlzLl9jdXJyZW50VGltZSAtIHRoaXMuX3ByZXZUaW1lO1xuXHRcdHRoaXMuX2FyZ3NBcnJheVswXSA9IHRoaXMuX2R0O1xuXHRcdHRoaXMuX2NhbGxiYWNrLmFwcGx5KHRoaXMuX2NhbGxiYWNrQ29udGV4dCwgdGhpcy5fYXJnc0FycmF5KTtcblxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fcmFmVXBkYXRlRnVuY3Rpb24pO1xuXG5cdFx0dGhpcy5fcHJldlRpbWUgPSB0aGlzLl9jdXJyZW50VGltZTtcblx0fVxuXG5cbn1cblxuZXhwb3J0ID0gUmVxdWVzdEFuaW1hdGlvbkZyYW1lOyJdfQ==