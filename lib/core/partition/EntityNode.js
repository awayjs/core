var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NodeBase = require("awayjs-core/lib/core/partition/NodeBase");

/**
* @class away.partition.EntityNode
*/
var EntityNode = (function (_super) {
    __extends(EntityNode, _super);
    function EntityNode(entity) {
        _super.call(this);
        this._entity = entity;
        this._iNumEntities = 1;
    }
    Object.defineProperty(EntityNode.prototype, "entity", {
        get: function () {
            return this._entity;
        },
        enumerable: true,
        configurable: true
    });

    EntityNode.prototype.removeFromParent = function () {
        if (this._iParent)
            this._iParent.iRemoveNode(this);

        this._iParent = null;
    };

    /**
    *
    * @returns {boolean}
    */
    EntityNode.prototype.isCastingShadow = function () {
        return this.entity.castsShadows;
    };

    /**
    *
    * @param planes
    * @param numPlanes
    * @returns {boolean}
    */
    EntityNode.prototype.isInFrustum = function (planes, numPlanes) {
        if (!this._entity._iIsVisible())
            return false;

        return this._entity.worldBounds.isInFrustum(planes, numPlanes);
    };

    /**
    * @inheritDoc
    */
    EntityNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyEntity(this._entity);
    };

    /**
    * @inheritDoc
    */
    EntityNode.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        if (!this._entity._iIsVisible())
            return false;

        return this._entity.isIntersectingRay(rayPosition, rayDirection);
    };

    /**
    *
    * @protected
    */
    EntityNode.prototype._pCreateBoundsPrimitive = function () {
        return this._entity.bounds.boundingEntity;
    };
    return EntityNode;
})(NodeBase);

module.exports = EntityNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcGFydGl0aW9uL0VudGl0eU5vZGUudHMiXSwibmFtZXMiOlsiRW50aXR5Tm9kZSIsIkVudGl0eU5vZGUuY29uc3RydWN0b3IiLCJFbnRpdHlOb2RlLnJlbW92ZUZyb21QYXJlbnQiLCJFbnRpdHlOb2RlLmlzQ2FzdGluZ1NoYWRvdyIsIkVudGl0eU5vZGUuaXNJbkZydXN0dW0iLCJFbnRpdHlOb2RlLmFjY2VwdFRyYXZlcnNlciIsIkVudGl0eU5vZGUuaXNJbnRlcnNlY3RpbmdSYXkiLCJFbnRpdHlOb2RlLl9wQ3JlYXRlQm91bmRzUHJpbWl0aXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpRUFFMEU7O0FBSTFFOztFQUVHO0FBQ0g7SUFBeUJBLDZCQUFRQTtJQU1oQ0Esb0JBQVlBLE1BQWNBO1FBRXpCQyxXQUFNQSxLQUFBQSxDQUFDQTtRQUNQQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBRUREO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTs7OztBQUFBQTtJQUVEQSx3Q0FBQUE7UUFFQ0UsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUE7WUFDaEJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBOztRQUVqQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUE7SUFDckJBLENBQUNBOztJQU1ERjs7O01BREdBOzJDQUNIQTtRQUVDRyxPQUFPQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxZQUFZQTtJQUNoQ0EsQ0FBQ0E7O0lBUURIOzs7OztNQURHQTt1Q0FDSEEsVUFBbUJBLE1BQXFCQSxFQUFFQSxTQUFnQkE7UUFFekRJLElBQUlBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBQzlCQSxPQUFPQSxLQUFLQSxDQUFDQTs7UUFFZEEsT0FBT0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsRUFBRUEsU0FBU0EsQ0FBQ0E7SUFDL0RBLENBQUNBOztJQUtESjs7TUFER0E7MkNBQ0hBLFVBQXVCQSxTQUFvQkE7UUFFMUNLLElBQUlBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBO1lBQzVCQSxTQUFTQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtJQUN0Q0EsQ0FBQ0E7O0lBS0RMOztNQURHQTs2Q0FDSEEsVUFBeUJBLFdBQW9CQSxFQUFFQSxZQUFxQkE7UUFFbkVNLElBQUlBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBQzlCQSxPQUFPQSxLQUFLQSxDQUFDQTs7UUFFZEEsT0FBT0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxXQUFXQSxFQUFFQSxZQUFZQSxDQUFDQTtJQUNqRUEsQ0FBQ0E7O0lBTUROOzs7TUFER0E7bURBQ0hBO1FBRUNPLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBO0lBQzFDQSxDQUFDQTtJQUNGUCxrQkFBQ0E7QUFBREEsQ0FBQ0EsRUE3RXdCLFFBQVEsRUE2RWhDOztBQUVELDJCQUFvQixDQUFBIiwiZmlsZSI6ImNvcmUvcGFydGl0aW9uL0VudGl0eU5vZGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhbmUzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUGxhbmUzRFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgTm9kZUJhc2VcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9wYXJ0aXRpb24vTm9kZUJhc2VcIik7XG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uRW50aXR5Tm9kZVxuICovXG5jbGFzcyBFbnRpdHlOb2RlIGV4dGVuZHMgTm9kZUJhc2VcbntcblxuXHRwcml2YXRlIF9lbnRpdHk6SUVudGl0eTtcblx0cHVibGljIF9pVXBkYXRlUXVldWVOZXh0OkVudGl0eU5vZGU7XG5cblx0Y29uc3RydWN0b3IoZW50aXR5OklFbnRpdHkpXG5cdHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX2VudGl0eSA9IGVudGl0eTtcblx0XHR0aGlzLl9pTnVtRW50aXRpZXMgPSAxO1xuXHR9XG5cblx0cHVibGljIGdldCBlbnRpdHkoKTpJRW50aXR5XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZW50aXR5O1xuXHR9XG5cblx0cHVibGljIHJlbW92ZUZyb21QYXJlbnQoKTp2b2lkXG5cdHtcblx0XHRpZiAodGhpcy5faVBhcmVudClcblx0XHRcdHRoaXMuX2lQYXJlbnQuaVJlbW92ZU5vZGUodGhpcyk7XG5cblx0XHR0aGlzLl9pUGFyZW50ID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBpc0Nhc3RpbmdTaGFkb3coKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5lbnRpdHkuY2FzdHNTaGFkb3dzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBwbGFuZXNcblx0ICogQHBhcmFtIG51bVBsYW5lc1xuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBpc0luRnJ1c3R1bShwbGFuZXM6QXJyYXk8UGxhbmUzRD4sIG51bVBsYW5lczpudW1iZXIpOmJvb2xlYW5cblx0e1xuXHRcdGlmICghdGhpcy5fZW50aXR5Ll9pSXNWaXNpYmxlKCkpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRyZXR1cm4gdGhpcy5fZW50aXR5LndvcmxkQm91bmRzLmlzSW5GcnVzdHVtKHBsYW5lcywgbnVtUGxhbmVzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3Rvcilcblx0e1xuXHRcdGlmICh0cmF2ZXJzZXIuZW50ZXJOb2RlKHRoaXMpKVxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5RW50aXR5KHRoaXMuX2VudGl0eSk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBpc0ludGVyc2VjdGluZ1JheShyYXlQb3NpdGlvbjpWZWN0b3IzRCwgcmF5RGlyZWN0aW9uOlZlY3RvcjNEKTpib29sZWFuXG5cdHtcblx0XHRpZiAoIXRoaXMuX2VudGl0eS5faUlzVmlzaWJsZSgpKVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2VudGl0eS5pc0ludGVyc2VjdGluZ1JheShyYXlQb3NpdGlvbiwgcmF5RGlyZWN0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BDcmVhdGVCb3VuZHNQcmltaXRpdmUoKTpJRW50aXR5XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZW50aXR5LmJvdW5kcy5ib3VuZGluZ0VudGl0eTtcblx0fVxufVxuXG5leHBvcnQgPSBFbnRpdHlOb2RlOyJdfQ==