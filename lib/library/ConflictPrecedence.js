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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0NvbmZsaWN0UHJlY2VkZW5jZS50cyJdLCJuYW1lcyI6WyJDb25mbGljdFByZWNlZGVuY2UiLCJDb25mbGljdFByZWNlZGVuY2UuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBT0E7Ozs7OztHQURHO0lBQ0csa0JBQWtCO0lBQXhCQSxTQUFNQSxrQkFBa0JBO0lBZXhCQyxDQUFDQTtJQWJBRDs7OztPQUlHQTtJQUNXQSw0QkFBU0EsR0FBVUEsVUFBVUEsQ0FBQ0E7SUFFNUNBOzs7O09BSUdBO0lBQ1dBLDRCQUFTQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUM3Q0EseUJBQUNBO0FBQURBLENBZkEsQUFlQ0EsSUFBQTtBQUVELEFBQTRCLGlCQUFuQixrQkFBa0IsQ0FBQyIsImZpbGUiOiJsaWJyYXJ5L0NvbmZsaWN0UHJlY2VkZW5jZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEVudW1hcmF0aW9uIGNsYXNzIGZvciBwcmVjZWRlbmNlIHdoZW4gcmVzb2x2aW5nIG5hbWluZyBjb25mbGljdHMgaW4gdGhlIGxpYnJhcnkuXG4gKlxuICogQHNlZSBhd2F5LmxpYnJhcnkuQXNzZXRMaWJyYXJ5LmNvbmZsaWN0UHJlY2VkZW5jZVxuICogQHNlZSBhd2F5LmxpYnJhcnkuQXNzZXRMaWJyYXJ5LmNvbmZsaWN0U3RyYXRlZ3lcbiAqIEBzZWUgYXdheS5saWJyYXJ5Lm5hbWluZy5Db25mbGljdFN0cmF0ZWd5XG4gKi9cbmNsYXNzIENvbmZsaWN0UHJlY2VkZW5jZVxue1xuXHQvKipcblx0ICogU2lnbmFscyB0aGF0IGluIGEgY29uZmxpY3QsIHRoZSBwcmV2aW91cyBvd25lciBvZiB0aGUgY29uZmxpY3RpbmcgbmFtZVxuXHQgKiBzaG91bGQgYmUgZmF2b3JlZCAoYW5kIGtlZXAgaXQncyBuYW1lKSBhbmQgdGhhdCB0aGUgbmV3bHkgcmVuYW1lZCBhc3NldFxuXHQgKiBpcyByZXZlcnRlZCB0byBhIG5vbi1jb25mbGljdGluZyBuYW1lLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBGQVZPUl9PTEQ6c3RyaW5nID0gJ2Zhdm9yT2xkJztcblxuXHQvKipcblx0ICogU2lnbmFsZXMgdGhhdCBpbiBhIGNvbmZsaWN0LCB0aGUgbmV3bHkgcmVuYW1lZCBhc3NldCBpcyBmYXZvcmVkIChhbmQga2VlcHNcblx0ICogaXQncyBuZXdseSBkZWZpbmVkIG5hbWUpIGFuZCB0aGF0IHRoZSBwcmV2aW91cyBvd25lciBvZiB0aGF0IG5hbWUgZ2V0c1xuXHQgKiByZW5hbWVkIHRvIGEgbm9uLWNvbmZsaWN0aW5nIG5hbWUuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIEZBVk9SX05FVzpzdHJpbmcgPSAnZmF2b3JOZXcnO1xufVxuXG5leHBvcnQgPSBDb25mbGljdFByZWNlZGVuY2U7Il19