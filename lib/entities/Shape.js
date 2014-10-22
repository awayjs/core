var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-core/lib/core/base/DisplayObject");

/**
* This class is used to create lightweight shapes using the ActionScript
* drawing application program interface(API). The Shape class includes a
* <code>graphics</code> property, which lets you access methods from the
* Graphics class.
*
* <p>The Sprite class also includes a <code>graphics</code>property, and it
* includes other features not available to the Shape class. For example, a
* Sprite object is a display object container, whereas a Shape object is not
* (and cannot contain child display objects). For this reason, Shape objects
* consume less memory than Sprite objects that contain the same graphics.
* However, a Sprite object supports user input events, while a Shape object
* does not.</p>
*/
var Shape = (function (_super) {
    __extends(Shape, _super);
    /**
    * Creates a new Shape object.
    */
    function Shape() {
        _super.call(this);
    }
    Object.defineProperty(Shape.prototype, "graphics", {
        /**
        * Specifies the Graphics object belonging to this Shape object, where vector
        * drawing commands can occur.
        */
        get: function () {
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    return Shape;
})(DisplayObject);

module.exports = Shape;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL1NoYXBlLnRzIl0sIm5hbWVzIjpbIlNoYXBlIiwiU2hhcGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNFQUE2RTs7QUFHN0U7Ozs7Ozs7Ozs7Ozs7RUFhRztBQUNIO0lBQW9CQSx3QkFBYUE7SUFnQmhDQTs7TUFER0E7SUFDSEE7UUFFQ0MsV0FBTUEsS0FBQUEsQ0FBQ0E7SUFDUkEsQ0FBQ0E7SUFYREQ7UUFBQUE7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxTQUFTQTtRQUN0QkEsQ0FBQ0E7Ozs7QUFBQUEsSUFTRkEsYUFBQ0E7QUFBREEsQ0FBQ0EsRUFwQm1CLGFBQWEsRUFvQmhDOztBQUVELHNCQUFlLENBQUEiLCJmaWxlIjoiZW50aXRpZXMvU2hhcGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IEdyYXBoaWNzXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9HcmFwaGljc1wiKTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gY3JlYXRlIGxpZ2h0d2VpZ2h0IHNoYXBlcyB1c2luZyB0aGUgQWN0aW9uU2NyaXB0XG4gKiBkcmF3aW5nIGFwcGxpY2F0aW9uIHByb2dyYW0gaW50ZXJmYWNlKEFQSSkuIFRoZSBTaGFwZSBjbGFzcyBpbmNsdWRlcyBhXG4gKiA8Y29kZT5ncmFwaGljczwvY29kZT4gcHJvcGVydHksIHdoaWNoIGxldHMgeW91IGFjY2VzcyBtZXRob2RzIGZyb20gdGhlXG4gKiBHcmFwaGljcyBjbGFzcy5cbiAqXG4gKiA8cD5UaGUgU3ByaXRlIGNsYXNzIGFsc28gaW5jbHVkZXMgYSA8Y29kZT5ncmFwaGljczwvY29kZT5wcm9wZXJ0eSwgYW5kIGl0XG4gKiBpbmNsdWRlcyBvdGhlciBmZWF0dXJlcyBub3QgYXZhaWxhYmxlIHRvIHRoZSBTaGFwZSBjbGFzcy4gRm9yIGV4YW1wbGUsIGFcbiAqIFNwcml0ZSBvYmplY3QgaXMgYSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIsIHdoZXJlYXMgYSBTaGFwZSBvYmplY3QgaXMgbm90XG4gKiAoYW5kIGNhbm5vdCBjb250YWluIGNoaWxkIGRpc3BsYXkgb2JqZWN0cykuIEZvciB0aGlzIHJlYXNvbiwgU2hhcGUgb2JqZWN0c1xuICogY29uc3VtZSBsZXNzIG1lbW9yeSB0aGFuIFNwcml0ZSBvYmplY3RzIHRoYXQgY29udGFpbiB0aGUgc2FtZSBncmFwaGljcy5cbiAqIEhvd2V2ZXIsIGEgU3ByaXRlIG9iamVjdCBzdXBwb3J0cyB1c2VyIGlucHV0IGV2ZW50cywgd2hpbGUgYSBTaGFwZSBvYmplY3RcbiAqIGRvZXMgbm90LjwvcD5cbiAqL1xuY2xhc3MgU2hhcGUgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG57XG5cdHByaXZhdGUgX2dyYXBoaWNzOkdyYXBoaWNzO1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgdGhlIEdyYXBoaWNzIG9iamVjdCBiZWxvbmdpbmcgdG8gdGhpcyBTaGFwZSBvYmplY3QsIHdoZXJlIHZlY3RvclxuXHQgKiBkcmF3aW5nIGNvbW1hbmRzIGNhbiBvY2N1ci5cblx0ICovXG5cdGdldCBncmFwaGljcygpOkdyYXBoaWNzXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZ3JhcGhpY3M7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBTaGFwZSBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFNoYXBlOyJdfQ==