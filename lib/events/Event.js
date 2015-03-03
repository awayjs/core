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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnQudHMiXSwibmFtZXMiOlsiRXZlbnQiLCJFdmVudC5jb25zdHJ1Y3RvciIsIkV2ZW50LmNsb25lIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLEtBQUs7SUE0QlZBLFNBNUJLQSxLQUFLQSxDQTRCRUEsSUFBV0E7UUFkdkJDOzs7O1dBSUdBO1FBQ0lBLFNBQUlBLEdBQVVBLFNBQVNBLENBQUNBO1FBRS9CQTs7OztXQUlHQTtRQUNJQSxXQUFNQSxHQUFPQSxTQUFTQSxDQUFDQTtRQUk3QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDbEJBLENBQUNBO0lBRUREOzs7T0FHR0E7SUFDSUEscUJBQUtBLEdBQVpBO1FBRUNFLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQzdCQSxDQUFDQTtJQXJDYUYsY0FBUUEsR0FBVUEsVUFBVUEsQ0FBQ0E7SUFDN0JBLFVBQUlBLEdBQVVBLE1BQU1BLENBQUNBO0lBRXJCQSxpQkFBV0EsR0FBVUEsWUFBWUEsQ0FBQ0E7SUFDbENBLGdCQUFVQSxHQUFVQSxXQUFXQSxDQUFDQTtJQUdoQ0EsWUFBTUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDekJBLFdBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBQ3ZCQSxZQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQTZCeENBLFlBQUNBO0FBQURBLENBekNBLEFBeUNDQSxJQUFBO0FBRUQsQUFBZSxpQkFBTixLQUFLLENBQUMiLCJmaWxlIjoiZXZlbnRzL0V2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEV2ZW50XHJcbntcclxuXHJcblx0cHVibGljIHN0YXRpYyBDT01QTEVURTpzdHJpbmcgPSAnY29tcGxldGUnO1xyXG5cdHB1YmxpYyBzdGF0aWMgT1BFTjpzdHJpbmcgPSAnb3Blbic7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgRU5URVJfRlJBTUU6c3RyaW5nID0gJ2VudGVyRnJhbWUnO1xyXG5cdHB1YmxpYyBzdGF0aWMgRVhJVF9GUkFNRTpzdHJpbmcgPSAnZXhpdEZyYW1lJztcclxuXHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgUkVTSVpFOnN0cmluZyA9IFwicmVzaXplXCI7XHJcblx0cHVibGljIHN0YXRpYyBFUlJPUjpzdHJpbmcgPSBcImVycm9yXCI7XHJcblx0cHVibGljIHN0YXRpYyBDSEFOR0U6c3RyaW5nID0gXCJjaGFuZ2VcIjtcclxuXHJcblx0LyoqXHJcblx0ICogVHlwZSBvZiBldmVudFxyXG5cdCAqIEBwcm9wZXJ0eSB0eXBlXHJcblx0ICogQHR5cGUgU3RyaW5nXHJcblx0ICovXHJcblx0cHVibGljIHR5cGU6c3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWZlcmVuY2UgdG8gdGFyZ2V0IG9iamVjdFxyXG5cdCAqIEBwcm9wZXJ0eSB0YXJnZXRcclxuXHQgKiBAdHlwZSBPYmplY3RcclxuXHQgKi9cclxuXHRwdWJsaWMgdGFyZ2V0OmFueSA9IHVuZGVmaW5lZDtcclxuXHJcblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0dGhpcy50eXBlID0gdHlwZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsb25lcyB0aGUgY3VycmVudCBldmVudC5cclxuXHQgKiBAcmV0dXJuIEFuIGV4YWN0IGR1cGxpY2F0ZSBvZiB0aGUgY3VycmVudCBldmVudC5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2xvbmUoKTpFdmVudFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgRXZlbnQodGhpcy50eXBlKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEV2ZW50OyJdfQ==