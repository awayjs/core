var Error = (function () {
    function Error(message, id, _name) {
        if (message === void 0) { message = ''; }
        if (id === void 0) { id = 0; }
        if (_name === void 0) { _name = ''; }
        this._errorID = 0; //Contains the reference number associated with the specific error message.
        this._messsage = ''; //Contains the message associated with the Error object.
        this._name = ''; // Contains the name of the Error object.
        this._messsage = message;
        this._name = name;
        this._errorID = id;
    }
    Object.defineProperty(Error.prototype, "message", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._messsage;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._messsage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Error.prototype, "name", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._name;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Error.prototype, "errorID", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._errorID;
        },
        enumerable: true,
        configurable: true
    });
    return Error;
})();
module.exports = Error;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3IudHMiXSwibmFtZXMiOlsiRXJyb3IiLCJFcnJvci5jb25zdHJ1Y3RvciIsIkVycm9yLm1lc3NhZ2UiLCJFcnJvci5uYW1lIiwiRXJyb3IuZXJyb3JJRCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTSxLQUFLO0lBT1ZBLFNBUEtBLEtBQUtBLENBT0VBLE9BQW1CQSxFQUFFQSxFQUFhQSxFQUFFQSxLQUFpQkE7UUFBckRDLHVCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUFFQSxrQkFBYUEsR0FBYkEsTUFBYUE7UUFBRUEscUJBQWlCQSxHQUFqQkEsVUFBaUJBO1FBSnpEQSxhQUFRQSxHQUFVQSxDQUFDQSxDQUFDQSxDQUFHQSwyRUFBMkVBO1FBQ2xHQSxjQUFTQSxHQUFVQSxFQUFFQSxDQUFDQSxDQUFFQSx3REFBd0RBO1FBQ2hGQSxVQUFLQSxHQUFVQSxFQUFFQSxDQUFDQSxDQUFFQSx5Q0FBeUNBO1FBS3BFQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxPQUFPQSxDQUFDQTtRQUN6QkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDbEJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEVBQUVBLENBQUNBO0lBRXBCQSxDQUFDQTtJQU1ERCxzQkFBV0EsMEJBQU9BO1FBSmxCQTs7O1dBR0dBO2FBQ0hBO1lBR0NFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1FBRXZCQSxDQUFDQTtRQUVERjs7O1dBR0dBO2FBQ0hBLFVBQW1CQSxLQUFZQTtZQUc5QkUsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFFeEJBLENBQUNBOzs7T0FYQUY7SUFpQkRBLHNCQUFXQSx1QkFBSUE7UUFKZkE7OztXQUdHQTthQUNIQTtZQUdDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUVuQkEsQ0FBQ0E7UUFFREg7OztXQUdHQTthQUNIQSxVQUFnQkEsS0FBWUE7WUFHM0JHLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBO1FBRXBCQSxDQUFDQTs7O09BWEFIO0lBaUJEQSxzQkFBV0EsMEJBQU9BO1FBSmxCQTs7O1dBR0dBO2FBQ0hBO1lBR0NJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBRXRCQSxDQUFDQTs7O09BQUFKO0lBRUZBLFlBQUNBO0FBQURBLENBdkVBLEFBdUVDQSxJQUFBO0FBRUQsQUFBZSxpQkFBTixLQUFLLENBQUMiLCJmaWxlIjoiZXJyb3JzL0Vycm9yLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEVycm9yXHJcbntcclxuXHJcblx0cHJpdmF0ZSBfZXJyb3JJRDpudW1iZXIgPSAwOyAgIC8vQ29udGFpbnMgdGhlIHJlZmVyZW5jZSBudW1iZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlLlxyXG5cdHByaXZhdGUgX21lc3NzYWdlOnN0cmluZyA9ICcnOyAgLy9Db250YWlucyB0aGUgbWVzc2FnZSBhc3NvY2lhdGVkIHdpdGggdGhlIEVycm9yIG9iamVjdC5cclxuXHRwcml2YXRlIF9uYW1lOnN0cmluZyA9ICcnOyAgLy8gQ29udGFpbnMgdGhlIG5hbWUgb2YgdGhlIEVycm9yIG9iamVjdC5cclxuXHJcblx0Y29uc3RydWN0b3IobWVzc2FnZTpzdHJpbmcgPSAnJywgaWQ6bnVtYmVyID0gMCwgX25hbWU6c3RyaW5nID0gJycpXHJcblx0e1xyXG5cclxuXHRcdHRoaXMuX21lc3NzYWdlID0gbWVzc2FnZTtcclxuXHRcdHRoaXMuX25hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5fZXJyb3JJRCA9IGlkO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge3N0cmluZ31cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1lc3NhZ2UoKTpzdHJpbmdcclxuXHR7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX21lc3NzYWdlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHZhbHVlXHJcblx0ICovXHJcblx0cHVibGljIHNldCBtZXNzYWdlKHZhbHVlOnN0cmluZylcclxuXHR7XHJcblxyXG5cdFx0dGhpcy5fbWVzc3NhZ2UgPSB2YWx1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICovXHJcblx0cHVibGljIGdldCBuYW1lKCk6c3RyaW5nXHJcblx0e1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9uYW1lO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHZhbHVlXHJcblx0ICovXHJcblx0cHVibGljIHNldCBuYW1lKHZhbHVlOnN0cmluZylcclxuXHR7XHJcblxyXG5cdFx0dGhpcy5fbmFtZSA9IHZhbHVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGVycm9ySUQoKTpudW1iZXJcclxuXHR7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2Vycm9ySUQ7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCA9IEVycm9yOyJdfQ==