/**
* Base class for dispatching events
*
* @class away.events.EventDispatcher
*
*/
var EventDispatcher = (function () {
    function EventDispatcher(target) {
        if (typeof target === "undefined") { target = null; }
        this.listeners = new Array();
        this.target = target || this;
    }
    /**
    * Add an event listener
    * @method addEventListener
    * @param {String} Name of event to add a listener for
    * @param {Function} Callback function
    */
    EventDispatcher.prototype.addEventListener = function (type, listener) {
        if (this.listeners[type] === undefined)
            this.listeners[type] = new Array();

        if (this.getEventListenerIndex(type, listener) === -1)
            this.listeners[type].push(listener);
    };

    /**
    * Remove an event listener
    * @method removeEventListener
    * @param {String} Name of event to remove a listener for
    * @param {Function} Callback function
    */
    EventDispatcher.prototype.removeEventListener = function (type, listener) {
        var index = this.getEventListenerIndex(type, listener);

        if (index !== -1)
            this.listeners[type].splice(index, 1);
    };

    /**
    * Dispatch an event
    * @method dispatchEvent
    * @param {Event} Event to dispatch
    */
    EventDispatcher.prototype.dispatchEvent = function (event) {
        var listenerArray = this.listeners[event.type];

        if (listenerArray !== undefined) {
            var l = listenerArray.length;

            event.target = this.target;

            for (var i = 0; i < l; i++)
                listenerArray[i](event);
        }
    };

    /**
    * get Event Listener Index in array. Returns -1 if no listener is added
    * @method getEventListenerIndex
    * @param {String} Name of event to remove a listener for
    * @param {Function} Callback function
    */
    EventDispatcher.prototype.getEventListenerIndex = function (type, listener) {
        if (this.listeners[type] !== undefined) {
            var a = this.listeners[type];
            var l = a.length;

            for (var i = 0; i < l; i++)
                if (listener == a[i])
                    return i;
        }

        return -1;
    };

    /**
    * check if an object has an event listener assigned to it
    * @method hasListener
    * @param {String} Name of event to remove a listener for
    * @param {Function} Callback function
    */
    EventDispatcher.prototype.hasEventListener = function (type, listener) {
        if (listener != null) {
            return (this.getEventListenerIndex(type, listener) !== -1);
        } else {
            if (this.listeners[type] !== undefined)
                return (this.listeners[type].length > 0);

            return false;
        }

        return false;
    };
    return EventDispatcher;
})();

module.exports = EventDispatcher;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9FdmVudERpc3BhdGNoZXIudHMiXSwibmFtZXMiOlsiRXZlbnREaXNwYXRjaGVyIiwiRXZlbnREaXNwYXRjaGVyLmNvbnN0cnVjdG9yIiwiRXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIiLCJFdmVudERpc3BhdGNoZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkV2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50IiwiRXZlbnREaXNwYXRjaGVyLmdldEV2ZW50TGlzdGVuZXJJbmRleCIsIkV2ZW50RGlzcGF0Y2hlci5oYXNFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7RUFPRTtBQUNGO0lBS0NBLHlCQUFZQSxNQUFpQkE7UUFBakJDLHFDQUFBQSxNQUFNQSxHQUFPQSxJQUFJQTtBQUFBQSxRQUg3QkEsS0FBUUEsU0FBU0EsR0FBMEJBLElBQUlBLEtBQUtBLENBQWtCQSxDQUFDQSxDQUFDQTtRQUt2RUEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsSUFBSUEsSUFBSUE7SUFDN0JBLENBQUNBO0lBUUREOzs7OztNQURHQTtpREFDSEEsVUFBd0JBLElBQVdBLEVBQUVBLFFBQWlCQTtRQUVyREUsSUFBSUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBRUEsSUFBSUEsQ0FBRUEsS0FBS0EsU0FBU0E7WUFDdkNBLElBQUlBLENBQUNBLFNBQVNBLENBQUVBLElBQUlBLENBQUVBLEdBQUdBLElBQUlBLEtBQUtBLENBQVdBLENBQUNBLENBQUNBOztRQUVoREEsSUFBSUEsSUFBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxJQUFJQSxFQUFFQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUNwREEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBRUEsSUFBSUEsQ0FBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDeENBLENBQUNBOztJQVFERjs7Ozs7TUFER0E7b0RBQ0hBLFVBQTJCQSxJQUFXQSxFQUFFQSxRQUFpQkE7UUFFeERHLElBQUlBLEtBQUtBLEdBQVVBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsSUFBSUEsRUFBRUEsUUFBUUEsQ0FBQ0E7O1FBRTdEQSxJQUFJQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUNmQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFFQSxJQUFJQSxDQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMxQ0EsQ0FBQ0E7O0lBT0RIOzs7O01BREdBOzhDQUNIQSxVQUFxQkEsS0FBV0E7UUFFL0JJLElBQUlBLGFBQWFBLEdBQW1CQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFFQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFFQTs7UUFFaEVBLElBQUlBLGFBQWFBLEtBQUtBLFNBQVNBLENBQUVBO1lBQ2hDQSxJQUFJQSxDQUFDQSxHQUFVQSxhQUFhQSxDQUFDQSxNQUFNQTs7WUFFbkNBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BOztZQUUxQkEsS0FBS0EsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUE7Z0JBQ2hDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtTQUN6QkE7SUFDRkEsQ0FBQ0E7O0lBUURKOzs7OztNQURHQTtzREFDSEEsVUFBOEJBLElBQVdBLEVBQUVBLFFBQWlCQTtRQUUzREssSUFBSUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBRUEsSUFBSUEsQ0FBRUEsS0FBS0EsU0FBU0EsQ0FBRUE7WUFDekNBLElBQUlBLENBQUNBLEdBQW1CQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFFQSxJQUFJQSxDQUFFQTtZQUM5Q0EsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsQ0FBQ0EsTUFBTUE7O1lBRXZCQSxLQUFLQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQTtnQkFDaENBLElBQUlBLFFBQVFBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNuQkEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7U0FDWEE7O1FBRURBLE9BQU9BLENBQUNBLENBQUNBO0lBQ1ZBLENBQUNBOztJQVFETDs7Ozs7TUFER0E7aURBQ0hBLFVBQXdCQSxJQUFXQSxFQUFFQSxRQUFrQkE7UUFFdERNLElBQUlBLFFBQVFBLElBQUlBLElBQUlBLENBQUVBO1lBQ3JCQSxPQUFPQSxDQUFFQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLElBQUlBLEVBQUVBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUVBO1NBQzVEQSxLQUFNQTtZQUNOQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFFQSxJQUFJQSxDQUFFQSxLQUFLQSxTQUFTQTtnQkFDdkNBLE9BQU9BLENBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUVBLElBQUlBLENBQUVBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUVBLENBQUNBOztZQUU5Q0EsT0FBT0EsS0FBS0E7U0FDWkE7O1FBRURBLE9BQU9BLEtBQUtBO0lBQ2JBLENBQUNBO0lBQ0ZOLHVCQUFDQTtBQUFEQSxDQUFDQSxJQUFBOztBQUVELGdDQUF5QixDQUFBIiwiZmlsZSI6ImV2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGRpc3BhdGNoaW5nIGV2ZW50c1xuKlxuKiBAY2xhc3MgYXdheS5ldmVudHMuRXZlbnREaXNwYXRjaGVyXG4qXG4qL1xuY2xhc3MgRXZlbnREaXNwYXRjaGVyXG57XG5cdHByaXZhdGUgbGlzdGVuZXJzOkFycmF5PEFycmF5PEZ1bmN0aW9uPj4gPSBuZXcgQXJyYXk8QXJyYXk8RnVuY3Rpb24+PigpO1xuXHRwcml2YXRlIHRhcmdldDphbnk7XG5cblx0Y29uc3RydWN0b3IodGFyZ2V0OmFueSA9IG51bGwpXG5cdHtcblx0XHR0aGlzLnRhcmdldCA9IHRhcmdldCB8fCB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhbiBldmVudCBsaXN0ZW5lclxuXHQgKiBAbWV0aG9kIGFkZEV2ZW50TGlzdGVuZXJcblx0ICogQHBhcmFtIHtTdHJpbmd9IE5hbWUgb2YgZXZlbnQgdG8gYWRkIGEgbGlzdGVuZXIgZm9yXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IENhbGxiYWNrIGZ1bmN0aW9uXG5cdCAqL1xuXHRwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgbGlzdGVuZXI6RnVuY3Rpb24pXG5cdHtcblx0XHRpZiAodGhpcy5saXN0ZW5lcnNbIHR5cGUgXSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhpcy5saXN0ZW5lcnNbIHR5cGUgXSA9IG5ldyBBcnJheTxGdW5jdGlvbj4oKTtcblxuXHRcdGlmICh0aGlzLmdldEV2ZW50TGlzdGVuZXJJbmRleCh0eXBlLCBsaXN0ZW5lcikgPT09IC0xKVxuXHRcdFx0dGhpcy5saXN0ZW5lcnNbIHR5cGUgXS5wdXNoKGxpc3RlbmVyKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXJcblx0ICogQG1ldGhvZCByZW1vdmVFdmVudExpc3RlbmVyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBOYW1lIG9mIGV2ZW50IHRvIHJlbW92ZSBhIGxpc3RlbmVyIGZvclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBDYWxsYmFjayBmdW5jdGlvblxuXHQgKi9cblx0cHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcsIGxpc3RlbmVyOkZ1bmN0aW9uKVxuXHR7XG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuZ2V0RXZlbnRMaXN0ZW5lckluZGV4KHR5cGUsIGxpc3RlbmVyKTtcblxuXHRcdGlmIChpbmRleCAhPT0gLTEpXG5cdFx0XHR0aGlzLmxpc3RlbmVyc1sgdHlwZSBdLnNwbGljZShpbmRleCwgMSk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzcGF0Y2ggYW4gZXZlbnRcblx0ICogQG1ldGhvZCBkaXNwYXRjaEV2ZW50XG5cdCAqIEBwYXJhbSB7RXZlbnR9IEV2ZW50IHRvIGRpc3BhdGNoXG5cdCAqL1xuXHRwdWJsaWMgZGlzcGF0Y2hFdmVudChldmVudDpFdmVudClcblx0e1xuXHRcdHZhciBsaXN0ZW5lckFycmF5OkFycmF5PEZ1bmN0aW9uPiA9IHRoaXMubGlzdGVuZXJzWyBldmVudC50eXBlIF07XG5cblx0XHRpZiAobGlzdGVuZXJBcnJheSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YXIgbDpudW1iZXIgPSBsaXN0ZW5lckFycmF5Lmxlbmd0aDtcblxuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG5cblx0XHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGw7IGkrKylcblx0XHRcdFx0bGlzdGVuZXJBcnJheVtpXShldmVudCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIGdldCBFdmVudCBMaXN0ZW5lciBJbmRleCBpbiBhcnJheS4gUmV0dXJucyAtMSBpZiBubyBsaXN0ZW5lciBpcyBhZGRlZFxuXHQgKiBAbWV0aG9kIGdldEV2ZW50TGlzdGVuZXJJbmRleFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gTmFtZSBvZiBldmVudCB0byByZW1vdmUgYSBsaXN0ZW5lciBmb3Jcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gQ2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdHByaXZhdGUgZ2V0RXZlbnRMaXN0ZW5lckluZGV4KHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbik6bnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5saXN0ZW5lcnNbIHR5cGUgXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YXIgYTpBcnJheTxGdW5jdGlvbj4gPSB0aGlzLmxpc3RlbmVyc1sgdHlwZSBdO1xuXHRcdFx0dmFyIGw6bnVtYmVyID0gYS5sZW5ndGg7XG5cblx0XHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGw7IGkrKylcblx0XHRcdFx0aWYgKGxpc3RlbmVyID09IGFbaV0pXG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYW4gZXZlbnQgbGlzdGVuZXIgYXNzaWduZWQgdG8gaXRcblx0ICogQG1ldGhvZCBoYXNMaXN0ZW5lclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gTmFtZSBvZiBldmVudCB0byByZW1vdmUgYSBsaXN0ZW5lciBmb3Jcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gQ2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdHB1YmxpYyBoYXNFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcj86RnVuY3Rpb24pOmJvb2xlYW5cblx0e1xuXHRcdGlmIChsaXN0ZW5lciAhPSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gKCB0aGlzLmdldEV2ZW50TGlzdGVuZXJJbmRleCh0eXBlLCBsaXN0ZW5lcikgIT09IC0xICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0aGlzLmxpc3RlbmVyc1sgdHlwZSBdICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdHJldHVybiAoIHRoaXMubGlzdGVuZXJzWyB0eXBlIF0ubGVuZ3RoID4gMCApO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCA9IEV2ZW50RGlzcGF0Y2hlcjsiXX0=