"use strict";
var EventBase = (function () {
    function EventBase(type) {
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
    EventBase.prototype.clone = function () {
        return new EventBase(this.type);
    };
    return EventBase;
}());
exports.EventBase = EventBase;
