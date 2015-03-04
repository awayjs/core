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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3IudHMiXSwibmFtZXMiOlsiRXJyb3IiLCJFcnJvci5jb25zdHJ1Y3RvciIsIkVycm9yLm1lc3NhZ2UiLCJFcnJvci5uYW1lIiwiRXJyb3IuZXJyb3JJRCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTSxLQUFLO0lBT1ZBLFNBUEtBLEtBQUtBLENBT0VBLE9BQW1CQSxFQUFFQSxFQUFhQSxFQUFFQSxLQUFpQkE7UUFBckRDLHVCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUFFQSxrQkFBYUEsR0FBYkEsTUFBYUE7UUFBRUEscUJBQWlCQSxHQUFqQkEsVUFBaUJBO1FBSnpEQSxhQUFRQSxHQUFVQSxDQUFDQSxDQUFDQSxDQUFHQSwyRUFBMkVBO1FBQ2xHQSxjQUFTQSxHQUFVQSxFQUFFQSxDQUFDQSxDQUFFQSx3REFBd0RBO1FBQ2hGQSxVQUFLQSxHQUFVQSxFQUFFQSxDQUFDQSxDQUFFQSx5Q0FBeUNBO1FBS3BFQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxPQUFPQSxDQUFDQTtRQUN6QkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDbEJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEVBQUVBLENBQUNBO0lBRXBCQSxDQUFDQTtJQU1ERCxzQkFBV0EsMEJBQU9BO1FBSmxCQTs7O1dBR0dBO2FBQ0hBO1lBR0NFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1FBRXZCQSxDQUFDQTtRQUVERjs7O1dBR0dBO2FBQ0hBLFVBQW1CQSxLQUFZQTtZQUc5QkUsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFFeEJBLENBQUNBOzs7T0FYQUY7SUFpQkRBLHNCQUFXQSx1QkFBSUE7UUFKZkE7OztXQUdHQTthQUNIQTtZQUdDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUVuQkEsQ0FBQ0E7UUFFREg7OztXQUdHQTthQUNIQSxVQUFnQkEsS0FBWUE7WUFHM0JHLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBO1FBRXBCQSxDQUFDQTs7O09BWEFIO0lBaUJEQSxzQkFBV0EsMEJBQU9BO1FBSmxCQTs7O1dBR0dBO2FBQ0hBO1lBR0NJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBRXRCQSxDQUFDQTs7O09BQUFKO0lBRUZBLFlBQUNBO0FBQURBLENBdkVBLEFBdUVDQSxJQUFBO0FBRUQsQUFBZSxpQkFBTixLQUFLLENBQUMiLCJmaWxlIjoiZXJyb3JzL0Vycm9yLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEVycm9yXG57XG5cblx0cHJpdmF0ZSBfZXJyb3JJRDpudW1iZXIgPSAwOyAgIC8vQ29udGFpbnMgdGhlIHJlZmVyZW5jZSBudW1iZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpYyBlcnJvciBtZXNzYWdlLlxuXHRwcml2YXRlIF9tZXNzc2FnZTpzdHJpbmcgPSAnJzsgIC8vQ29udGFpbnMgdGhlIG1lc3NhZ2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBFcnJvciBvYmplY3QuXG5cdHByaXZhdGUgX25hbWU6c3RyaW5nID0gJyc7ICAvLyBDb250YWlucyB0aGUgbmFtZSBvZiB0aGUgRXJyb3Igb2JqZWN0LlxuXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2U6c3RyaW5nID0gJycsIGlkOm51bWJlciA9IDAsIF9uYW1lOnN0cmluZyA9ICcnKVxuXHR7XG5cblx0XHR0aGlzLl9tZXNzc2FnZSA9IG1lc3NhZ2U7XG5cdFx0dGhpcy5fbmFtZSA9IG5hbWU7XG5cdFx0dGhpcy5fZXJyb3JJRCA9IGlkO1xuXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHB1YmxpYyBnZXQgbWVzc2FnZSgpOnN0cmluZ1xuXHR7XG5cblx0XHRyZXR1cm4gdGhpcy5fbWVzc3NhZ2U7XG5cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gdmFsdWVcblx0ICovXG5cdHB1YmxpYyBzZXQgbWVzc2FnZSh2YWx1ZTpzdHJpbmcpXG5cdHtcblxuXHRcdHRoaXMuX21lc3NzYWdlID0gdmFsdWU7XG5cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0cHVibGljIGdldCBuYW1lKCk6c3RyaW5nXG5cdHtcblxuXHRcdHJldHVybiB0aGlzLl9uYW1lO1xuXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHZhbHVlXG5cdCAqL1xuXHRwdWJsaWMgc2V0IG5hbWUodmFsdWU6c3RyaW5nKVxuXHR7XG5cblx0XHR0aGlzLl9uYW1lID0gdmFsdWU7XG5cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0cHVibGljIGdldCBlcnJvcklEKCk6bnVtYmVyXG5cdHtcblxuXHRcdHJldHVybiB0aGlzLl9lcnJvcklEO1xuXG5cdH1cblxufVxuXG5leHBvcnQgPSBFcnJvcjsiXX0=