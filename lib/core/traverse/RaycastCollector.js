var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");

var CollectorBase = require("awayjs-core/lib/core/traverse/CollectorBase");

/**
* The RaycastCollector class is a traverser for scene partitions that collects all scene graph entities that are
* considered intersecting with the defined ray.
*
* @see away.partition.Partition
* @see away.entities.IEntity
*
* @class away.traverse.RaycastCollector
*/
var RaycastCollector = (function (_super) {
    __extends(RaycastCollector, _super);
    /**
    * Creates a new RaycastCollector object.
    */
    function RaycastCollector() {
        _super.call(this);
        this._rayPosition = new Vector3D();
        this._rayDirection = new Vector3D();
        this._iCollectionMark = 0;
    }
    Object.defineProperty(RaycastCollector.prototype, "rayPosition", {
        /**
        * Provides the starting position of the ray.
        */
        get: function () {
            return this._rayPosition;
        },
        set: function (value) {
            this._rayPosition = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(RaycastCollector.prototype, "rayDirection", {
        /**
        * Provides the direction vector of the ray.
        */
        get: function () {
            return this._rayDirection;
        },
        set: function (value) {
            this._rayDirection = value;
        },
        enumerable: true,
        configurable: true
    });


    /**
    * Returns true if the current node is at least partly in the frustum. If so, the partition node knows to pass on the traverser to its children.
    *
    * @param node The Partition3DNode object to frustum-test.
    */
    RaycastCollector.prototype.enterNode = function (node) {
        return node.isIntersectingRay(this._rayPosition, this._rayDirection);
    };
    return RaycastCollector;
})(CollectorBase);

module.exports = RaycastCollector;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvdHJhdmVyc2UvUmF5Y2FzdENvbGxlY3Rvci50cyJdLCJuYW1lcyI6WyJSYXljYXN0Q29sbGVjdG9yIiwiUmF5Y2FzdENvbGxlY3Rvci5jb25zdHJ1Y3RvciIsIlJheWNhc3RDb2xsZWN0b3IuZW50ZXJOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFBcUU7O0FBRXJFLDBFQUFpRjs7QUFJakY7Ozs7Ozs7O0VBUUc7QUFDSDtJQUErQkEsbUNBQWFBO0lBb0MzQ0E7O01BREdBO0lBQ0hBO1FBRUNDLFdBQU1BLEtBQUFBLENBQUNBO1FBcENSQSxLQUFRQSxZQUFZQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMvQ0EsS0FBUUEsYUFBYUEsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFaERBLEtBQU9BLGdCQUFnQkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7SUFrQ25DQSxDQUFDQTtJQTdCREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBO1FBQ3pCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUF1QkEsS0FBY0E7WUFFcENBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBO1FBQzFCQSxDQUFDQTs7OztBQUxBQTs7SUFVREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGFBQWFBO1FBQzFCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUF3QkEsS0FBY0E7WUFFckNBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLEtBQUtBO1FBQzNCQSxDQUFDQTs7OztBQUxBQTs7SUFvQkRBOzs7O01BREdBOzJDQUNIQSxVQUFpQkEsSUFBYUE7UUFFN0JFLE9BQU9BLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7SUFDckVBLENBQUNBO0lBQ0ZGLHdCQUFDQTtBQUFEQSxDQUFDQSxFQWxEOEIsYUFBYSxFQWtEM0M7O0FBRUQsaUNBQTBCLENBQUEiLCJmaWxlIjoiY29yZS90cmF2ZXJzZS9SYXljYXN0Q29sbGVjdG9yLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBDb2xsZWN0b3JCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuXG4vKipcbiAqIFRoZSBSYXljYXN0Q29sbGVjdG9yIGNsYXNzIGlzIGEgdHJhdmVyc2VyIGZvciBzY2VuZSBwYXJ0aXRpb25zIHRoYXQgY29sbGVjdHMgYWxsIHNjZW5lIGdyYXBoIGVudGl0aWVzIHRoYXQgYXJlXG4gKiBjb25zaWRlcmVkIGludGVyc2VjdGluZyB3aXRoIHRoZSBkZWZpbmVkIHJheS5cbiAqXG4gKiBAc2VlIGF3YXkucGFydGl0aW9uLlBhcnRpdGlvblxuICogQHNlZSBhd2F5LmVudGl0aWVzLklFbnRpdHlcbiAqXG4gKiBAY2xhc3MgYXdheS50cmF2ZXJzZS5SYXljYXN0Q29sbGVjdG9yXG4gKi9cbmNsYXNzIFJheWNhc3RDb2xsZWN0b3IgZXh0ZW5kcyBDb2xsZWN0b3JCYXNlXG57XG5cdHByaXZhdGUgX3JheVBvc2l0aW9uOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3JheURpcmVjdGlvbjpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdHB1YmxpYyBfaUNvbGxlY3Rpb25NYXJrOm51bWJlciA9IDA7XG5cblx0LyoqXG5cdCAqIFByb3ZpZGVzIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcmF5LlxuXHQgKi9cblx0cHVibGljIGdldCByYXlQb3NpdGlvbigpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcmF5UG9zaXRpb247XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJheVBvc2l0aW9uKHZhbHVlOlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy5fcmF5UG9zaXRpb24gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQcm92aWRlcyB0aGUgZGlyZWN0aW9uIHZlY3RvciBvZiB0aGUgcmF5LlxuXHQgKi9cblx0cHVibGljIGdldCByYXlEaXJlY3Rpb24oKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JheURpcmVjdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcmF5RGlyZWN0aW9uKHZhbHVlOlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy5fcmF5RGlyZWN0aW9uID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBSYXljYXN0Q29sbGVjdG9yIG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IG5vZGUgaXMgYXQgbGVhc3QgcGFydGx5IGluIHRoZSBmcnVzdHVtLiBJZiBzbywgdGhlIHBhcnRpdGlvbiBub2RlIGtub3dzIHRvIHBhc3Mgb24gdGhlIHRyYXZlcnNlciB0byBpdHMgY2hpbGRyZW4uXG5cdCAqXG5cdCAqIEBwYXJhbSBub2RlIFRoZSBQYXJ0aXRpb24zRE5vZGUgb2JqZWN0IHRvIGZydXN0dW0tdGVzdC5cblx0ICovXG5cdHB1YmxpYyBlbnRlck5vZGUobm9kZTpOb2RlQmFzZSk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIG5vZGUuaXNJbnRlcnNlY3RpbmdSYXkodGhpcy5fcmF5UG9zaXRpb24sIHRoaXMuX3JheURpcmVjdGlvbik7XG5cdH1cbn1cblxuZXhwb3J0ID0gUmF5Y2FzdENvbGxlY3RvcjsiXX0=