var Event = (function () {
    function Event(type) {
        /**
        * Type of event
        * @property type
        * @type String
        */
        this.type = undefined;
        /**
        * Reference to target object
        * @property target
        * @type Object
        */
        this.target = undefined;
        this.type = type;
    }
    /**
    * Clones the current event.
    * @return An exact duplicate of the current event.
    */
    Event.prototype.clone = function () {
        return new Event(this.type);
    };
    Event.COMPLETE = 'complete';
    Event.OPEN = 'open';

    Event.ENTER_FRAME = 'enterFrame';
    Event.EXIT_FRAME = 'exitFrame';

    Event.RESIZE = "resize";
    Event.ERROR = "error";
    Event.CHANGE = "change";
    return Event;
})();

module.exports = Event;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9FdmVudC50cyJdLCJuYW1lcyI6WyJFdmVudCIsIkV2ZW50LmNvbnN0cnVjdG9yIiwiRXZlbnQuY2xvbmUiXSwibWFwcGluZ3MiOiJBQUFBO0lBNEJDQSxlQUFZQSxJQUFXQTtRQWR2QkM7Ozs7VUFJR0E7UUFDSEEsS0FBT0EsSUFBSUEsR0FBVUEsU0FBU0EsQ0FBQ0E7UUFFL0JBOzs7O1VBSUdBO1FBQ0hBLEtBQU9BLE1BQU1BLEdBQU9BLFNBQVNBLENBQUNBO1FBSTdCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQTtJQUNqQkEsQ0FBQ0E7SUFNREQ7OztNQURHQTs0QkFDSEE7UUFFQ0UsT0FBT0EsSUFBSUEsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDNUJBLENBQUNBO0lBckNERixpQkFBZ0NBLFVBQVVBO0lBQzFDQSxhQUE0QkEsTUFBTUE7O0lBRWxDQSxvQkFBbUNBLFlBQVlBO0lBQy9DQSxtQkFBa0NBLFdBQVdBOztJQUc3Q0EsZUFBOEJBLFFBQVFBO0lBQ3RDQSxjQUE2QkEsT0FBT0E7SUFDcENBLGVBQThCQSxRQUFRQTtJQTZCdkNBLGFBQUNBO0FBQURBLENBQUNBLElBQUE7O0FBRUQsc0JBQWUsQ0FBQSIsImZpbGUiOiJldmVudHMvRXZlbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBFdmVudFxue1xuXG5cdHB1YmxpYyBzdGF0aWMgQ09NUExFVEU6c3RyaW5nID0gJ2NvbXBsZXRlJztcblx0cHVibGljIHN0YXRpYyBPUEVOOnN0cmluZyA9ICdvcGVuJztcblxuXHRwdWJsaWMgc3RhdGljIEVOVEVSX0ZSQU1FOnN0cmluZyA9ICdlbnRlckZyYW1lJztcblx0cHVibGljIHN0YXRpYyBFWElUX0ZSQU1FOnN0cmluZyA9ICdleGl0RnJhbWUnO1xuXG5cblx0cHVibGljIHN0YXRpYyBSRVNJWkU6c3RyaW5nID0gXCJyZXNpemVcIjtcblx0cHVibGljIHN0YXRpYyBFUlJPUjpzdHJpbmcgPSBcImVycm9yXCI7XG5cdHB1YmxpYyBzdGF0aWMgQ0hBTkdFOnN0cmluZyA9IFwiY2hhbmdlXCI7XG5cblx0LyoqXG5cdCAqIFR5cGUgb2YgZXZlbnRcblx0ICogQHByb3BlcnR5IHR5cGVcblx0ICogQHR5cGUgU3RyaW5nXG5cdCAqL1xuXHRwdWJsaWMgdHlwZTpzdHJpbmcgPSB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFJlZmVyZW5jZSB0byB0YXJnZXQgb2JqZWN0XG5cdCAqIEBwcm9wZXJ0eSB0YXJnZXRcblx0ICogQHR5cGUgT2JqZWN0XG5cdCAqL1xuXHRwdWJsaWMgdGFyZ2V0OmFueSA9IHVuZGVmaW5lZDtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZylcblx0e1xuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSBjdXJyZW50IGV2ZW50LlxuXHQgKiBAcmV0dXJuIEFuIGV4YWN0IGR1cGxpY2F0ZSBvZiB0aGUgY3VycmVudCBldmVudC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkV2ZW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IEV2ZW50KHRoaXMudHlwZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gRXZlbnQ7Il19