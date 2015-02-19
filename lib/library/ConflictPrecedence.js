/**
 * Enumaration class for precedence when resolving naming conflicts in the library.
 *
 * @see away.library.AssetLibrary.conflictPrecedence
 * @see away.library.AssetLibrary.conflictStrategy
 * @see away.library.naming.ConflictStrategy
 */
var ConflictPrecedence = (function () {
    function ConflictPrecedence() {
    }
    /**
     * Signals that in a conflict, the previous owner of the conflicting name
     * should be favored (and keep it's name) and that the newly renamed asset
     * is reverted to a non-conflicting name.
     */
    ConflictPrecedence.FAVOR_OLD = 'favorOld';
    /**
     * Signales that in a conflict, the newly renamed asset is favored (and keeps
     * it's newly defined name) and that the previous owner of that name gets
     * renamed to a non-conflicting name.
     */
    ConflictPrecedence.FAVOR_NEW = 'favorNew';
    return ConflictPrecedence;
})();
module.exports = ConflictPrecedence;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0NvbmZsaWN0UHJlY2VkZW5jZS50cyJdLCJuYW1lcyI6WyJDb25mbGljdFByZWNlZGVuY2UiLCJDb25mbGljdFByZWNlZGVuY2UuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBT0E7Ozs7OztHQURHO0lBQ0csa0JBQWtCO0lBQXhCQSxTQUFNQSxrQkFBa0JBO0lBZXhCQyxDQUFDQTtJQWJBRDs7OztPQUlHQTtJQUNXQSw0QkFBU0EsR0FBVUEsVUFBVUEsQ0FBQ0E7SUFFNUNBOzs7O09BSUdBO0lBQ1dBLDRCQUFTQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUM3Q0EseUJBQUNBO0FBQURBLENBZkEsQUFlQ0EsSUFBQTtBQUVELEFBQTRCLGlCQUFuQixrQkFBa0IsQ0FBQyIsImZpbGUiOiJsaWJyYXJ5L0NvbmZsaWN0UHJlY2VkZW5jZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRW51bWFyYXRpb24gY2xhc3MgZm9yIHByZWNlZGVuY2Ugd2hlbiByZXNvbHZpbmcgbmFtaW5nIGNvbmZsaWN0cyBpbiB0aGUgbGlicmFyeS5cclxuICpcclxuICogQHNlZSBhd2F5LmxpYnJhcnkuQXNzZXRMaWJyYXJ5LmNvbmZsaWN0UHJlY2VkZW5jZVxyXG4gKiBAc2VlIGF3YXkubGlicmFyeS5Bc3NldExpYnJhcnkuY29uZmxpY3RTdHJhdGVneVxyXG4gKiBAc2VlIGF3YXkubGlicmFyeS5uYW1pbmcuQ29uZmxpY3RTdHJhdGVneVxyXG4gKi9cclxuY2xhc3MgQ29uZmxpY3RQcmVjZWRlbmNlXHJcbntcclxuXHQvKipcclxuXHQgKiBTaWduYWxzIHRoYXQgaW4gYSBjb25mbGljdCwgdGhlIHByZXZpb3VzIG93bmVyIG9mIHRoZSBjb25mbGljdGluZyBuYW1lXHJcblx0ICogc2hvdWxkIGJlIGZhdm9yZWQgKGFuZCBrZWVwIGl0J3MgbmFtZSkgYW5kIHRoYXQgdGhlIG5ld2x5IHJlbmFtZWQgYXNzZXRcclxuXHQgKiBpcyByZXZlcnRlZCB0byBhIG5vbi1jb25mbGljdGluZyBuYW1lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgRkFWT1JfT0xEOnN0cmluZyA9ICdmYXZvck9sZCc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNpZ25hbGVzIHRoYXQgaW4gYSBjb25mbGljdCwgdGhlIG5ld2x5IHJlbmFtZWQgYXNzZXQgaXMgZmF2b3JlZCAoYW5kIGtlZXBzXHJcblx0ICogaXQncyBuZXdseSBkZWZpbmVkIG5hbWUpIGFuZCB0aGF0IHRoZSBwcmV2aW91cyBvd25lciBvZiB0aGF0IG5hbWUgZ2V0c1xyXG5cdCAqIHJlbmFtZWQgdG8gYSBub24tY29uZmxpY3RpbmcgbmFtZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIEZBVk9SX05FVzpzdHJpbmcgPSAnZmF2b3JOZXcnO1xyXG59XHJcblxyXG5leHBvcnQgPSBDb25mbGljdFByZWNlZGVuY2U7Il19