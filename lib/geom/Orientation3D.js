/**
 * A Quaternion object which can be used to represent rotations.
 */
var Orientation3D = (function () {
    function Orientation3D() {
    }
    /**
     * The axis angle orientation uses a combination of an axis and an angle to determine the orientation.
     * @type {string}
     */
    Orientation3D.AXIS_ANGLE = "axisAngle";
    /**
     * The default orientation for decompose() and recompose() methods, defines the orientation with three separate angles of rotation for each axis.
     * @type {string}
     */
    Orientation3D.EULER_ANGLES = "eulerAngles";
    /**
     * The quaternion orientation uses complex numbers.
     * @type {string}
     */
    Orientation3D.QUATERNION = "quaternion";
    return Orientation3D;
})();
module.exports = Orientation3D;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9nZW9tL29yaWVudGF0aW9uM2QudHMiXSwibmFtZXMiOlsiT3JpZW50YXRpb24zRCIsIk9yaWVudGF0aW9uM0QuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBR0E7O0dBREc7SUFDRyxhQUFhO0lBQW5CQSxTQUFNQSxhQUFhQTtJQW1CbkJDLENBQUNBO0lBakJBRDs7O09BR0dBO0lBQ1dBLHdCQUFVQSxHQUFVQSxXQUFXQSxDQUFDQTtJQUU5Q0E7OztPQUdHQTtJQUNXQSwwQkFBWUEsR0FBVUEsYUFBYUEsQ0FBQ0E7SUFFbERBOzs7T0FHR0E7SUFDV0Esd0JBQVVBLEdBQVVBLFlBQVlBLENBQUNBO0lBQ2hEQSxvQkFBQ0E7QUFBREEsQ0FuQkEsQUFtQkNBLElBQUE7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoiZ2VvbS9PcmllbnRhdGlvbjNELmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBRdWF0ZXJuaW9uIG9iamVjdCB3aGljaCBjYW4gYmUgdXNlZCB0byByZXByZXNlbnQgcm90YXRpb25zLlxuICovXG5jbGFzcyBPcmllbnRhdGlvbjNEXG57XG5cdC8qKlxuXHQgKiBUaGUgYXhpcyBhbmdsZSBvcmllbnRhdGlvbiB1c2VzIGEgY29tYmluYXRpb24gb2YgYW4gYXhpcyBhbmQgYW4gYW5nbGUgdG8gZGV0ZXJtaW5lIHRoZSBvcmllbnRhdGlvbi5cblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgQVhJU19BTkdMRTpzdHJpbmcgPSBcImF4aXNBbmdsZVwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgZGVmYXVsdCBvcmllbnRhdGlvbiBmb3IgZGVjb21wb3NlKCkgYW5kIHJlY29tcG9zZSgpIG1ldGhvZHMsIGRlZmluZXMgdGhlIG9yaWVudGF0aW9uIHdpdGggdGhyZWUgc2VwYXJhdGUgYW5nbGVzIG9mIHJvdGF0aW9uIGZvciBlYWNoIGF4aXMuXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIEVVTEVSX0FOR0xFUzpzdHJpbmcgPSBcImV1bGVyQW5nbGVzXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBxdWF0ZXJuaW9uIG9yaWVudGF0aW9uIHVzZXMgY29tcGxleCBudW1iZXJzLlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBRVUFURVJOSU9OOnN0cmluZyA9IFwicXVhdGVybmlvblwiO1xufVxuXG5leHBvcnQgPSBPcmllbnRhdGlvbjNEOyJdfQ==