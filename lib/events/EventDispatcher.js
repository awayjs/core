"use strict";
/**
 * Base export class for dispatching events
*
* @export class away.events.EventDispatcher
*
*/
var EventDispatcher = (function () {
    function EventDispatcher(target) {
        if (target === void 0) { target = null; }
        this.listenerObjects = new Array();
        this.target = target || this;
    }
    /**
     * Add an event listener
     * @method addEventListener
     * @param {String} Name of event to add a listener for
     * @param {Function} Callback function
     */
    EventDispatcher.prototype.addEventListener = function (type, listener) {
        var l = this.listenerObjects[type];
        if (l === undefined)
            l = this.listenerObjects[type] = new ListenerObject();
        l.addEventListener(listener);
    };
    /**
     * Remove an event listener
     * @method removeEventListener
     * @param {String} Name of event to remove a listener for
     * @param {Function} Callback function
     */
    EventDispatcher.prototype.removeEventListener = function (type, listener) {
        var l = this.listenerObjects[type];
        if (l) {
            l.removeEventListener(listener);
            if (l.numListeners == 0)
                delete this.listenerObjects[type];
        }
    };
    /**
     * Dispatch an event
     * @method dispatchEvent
     * @param {Event} Event to dispatch
     */
    EventDispatcher.prototype.dispatchEvent = function (event) {
        var l = this.listenerObjects[event.type];
        if (l) {
            event.target = this.target;
            l.dispatchEvent(event);
        }
    };
    /**
     * check if an object has an event listener assigned to it
     * @method hasListener
     * @param {String} Name of event to remove a listener for
     * @param {Function} Callback function
     */
    EventDispatcher.prototype.hasEventListener = function (type, listener) {
        if (this.listenerObjects[type] === undefined)
            return false;
        if (listener != null)
            return this.listenerObjects[type].getEventListenerIndex(listener) !== -1;
        return this.listenerObjects[type].numListeners > 0;
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
var ListenerObject = (function () {
    function ListenerObject() {
        this.index = 0;
        this.listeners = new Array();
        this.numListeners = 0;
    }
    ListenerObject.prototype.addEventListener = function (listener) {
        //check if listener already added
        if (this.getEventListenerIndex(listener) !== -1)
            return;
        this.listeners.push(listener);
        this.numListeners++;
    };
    ListenerObject.prototype.removeEventListener = function (listener) {
        //check if listener exists
        var index = this.getEventListenerIndex(listener);
        if (index === -1)
            return;
        this.listeners.splice(index, 1);
        if (index <= this.index)
            this.index--;
        this.numListeners--;
    };
    ListenerObject.prototype.dispatchEvent = function (event) {
        var len = this.numListeners;
        for (this.index = 0; this.index < len && this.index < this.numListeners; this.index++)
            this.listeners[this.index](event);
    };
    /**
     * get Event Listener Index in array. Returns -1 if no listener is added
     * @method getEventListenerIndex
     * @param {String} Name of event to remove a listener for
     * @param {Function} Callback function
     */
    ListenerObject.prototype.getEventListenerIndex = function (listener) {
        for (var index = 0; index < this.numListeners; index++)
            if (listener == this.listeners[index])
                return index;
        return -1;
    };
    return ListenerObject;
}());
exports.ListenerObject = ListenerObject;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventDispatcher;
