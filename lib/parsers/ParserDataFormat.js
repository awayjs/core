/**
 * An enumeration providing values to describe the data format of parsed data.
 */
var ParserDataFormat = (function () {
    function ParserDataFormat() {
    }
    /**
     * Describes the format of a binary file.
     */
    ParserDataFormat.BINARY = "binary";
    /**
     * Describes the format of a plain text file.
     */
    ParserDataFormat.PLAIN_TEXT = "plainText";
    /**
     * Describes the format of an image file
     */
    ParserDataFormat.IMAGE = "image";
    return ParserDataFormat;
})();
module.exports = ParserDataFormat;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckRhdGFGb3JtYXQudHMiXSwibmFtZXMiOlsiUGFyc2VyRGF0YUZvcm1hdCIsIlBhcnNlckRhdGFGb3JtYXQuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBR0E7O0dBREc7SUFDRyxnQkFBZ0I7SUFBdEJBLFNBQU1BLGdCQUFnQkE7SUFpQnRCQyxDQUFDQTtJQWZBRDs7T0FFR0E7SUFDV0EsdUJBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7T0FFR0E7SUFDV0EsMkJBQVVBLEdBQVVBLFdBQVdBLENBQUNBO0lBRTlDQTs7T0FFR0E7SUFDV0Esc0JBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBRXRDQSx1QkFBQ0E7QUFBREEsQ0FqQkEsQUFpQkNBLElBQUE7QUFFRCxBQUEwQixpQkFBakIsZ0JBQWdCLENBQUMiLCJmaWxlIjoicGFyc2Vycy9QYXJzZXJEYXRhRm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBbiBlbnVtZXJhdGlvbiBwcm92aWRpbmcgdmFsdWVzIHRvIGRlc2NyaWJlIHRoZSBkYXRhIGZvcm1hdCBvZiBwYXJzZWQgZGF0YS5cclxuICovXHJcbmNsYXNzIFBhcnNlckRhdGFGb3JtYXRcclxue1xyXG5cdC8qKlxyXG5cdCAqIERlc2NyaWJlcyB0aGUgZm9ybWF0IG9mIGEgYmluYXJ5IGZpbGUuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBCSU5BUlk6c3RyaW5nID0gXCJiaW5hcnlcIjtcclxuXHJcblx0LyoqXHJcblx0ICogRGVzY3JpYmVzIHRoZSBmb3JtYXQgb2YgYSBwbGFpbiB0ZXh0IGZpbGUuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBQTEFJTl9URVhUOnN0cmluZyA9IFwicGxhaW5UZXh0XCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc2NyaWJlcyB0aGUgZm9ybWF0IG9mIGFuIGltYWdlIGZpbGVcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIElNQUdFOnN0cmluZyA9IFwiaW1hZ2VcIjtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCA9IFBhcnNlckRhdGFGb3JtYXQ7Il19