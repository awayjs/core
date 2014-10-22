var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/core/library/AssetType");

var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");

/**
* Provides an abstract base class for nodes in an animation blend tree.
*/
var AnimationNodeBase = (function (_super) {
    __extends(AnimationNodeBase, _super);
    /**
    * Creates a new <code>AnimationNodeBase</code> object.
    */
    function AnimationNodeBase() {
        _super.call(this);
    }
    Object.defineProperty(AnimationNodeBase.prototype, "stateClass", {
        get: function () {
            return this._pStateClass;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * @inheritDoc
    */
    AnimationNodeBase.prototype.dispose = function () {
    };

    Object.defineProperty(AnimationNodeBase.prototype, "assetType", {
        /**
        * @inheritDoc
        */
        get: function () {
            return AssetType.ANIMATION_NODE;
        },
        enumerable: true,
        configurable: true
    });
    return AnimationNodeBase;
})(NamedAssetBase);

module.exports = AnimationNodeBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuaW1hdG9ycy9ub2Rlcy9BbmltYXRpb25Ob2RlQmFzZS50cyJdLCJuYW1lcyI6WyJBbmltYXRpb25Ob2RlQmFzZSIsIkFuaW1hdGlvbk5vZGVCYXNlLmNvbnN0cnVjdG9yIiwiQW5pbWF0aW9uTm9kZUJhc2UuZGlzcG9zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUVBQXdFOztBQUV4RSwyRUFBaUY7O0FBRWpGOztFQUVHO0FBQ0g7SUFBZ0NBLG9DQUFjQTtJQVk3Q0E7O01BREdBO0lBQ0hBO1FBRUNDLFdBQU1BLEtBQUFBLENBQUNBO0lBQ1JBLENBQUNBO0lBWEREO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBO1FBQ3pCQSxDQUFDQTs7OztBQUFBQTtJQWFEQTs7TUFER0E7MENBQ0hBO0lBRUFFLENBQUNBOztJQUtERjtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsU0FBU0EsQ0FBQ0EsY0FBY0E7UUFDaENBLENBQUNBOzs7O0FBQUFBLElBQ0ZBLHlCQUFDQTtBQUFEQSxDQUFDQSxFQS9CK0IsY0FBYyxFQStCN0M7O0FBRUQsa0NBQTJCLENBQUEiLCJmaWxlIjoiYW5pbWF0b3JzL25vZGVzL0FuaW1hdGlvbk5vZGVCYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcblxuLyoqXG4gKiBQcm92aWRlcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBub2RlcyBpbiBhbiBhbmltYXRpb24gYmxlbmQgdHJlZS5cbiAqL1xuY2xhc3MgQW5pbWF0aW9uTm9kZUJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElBc3NldFxue1xuXHRwdWJsaWMgX3BTdGF0ZUNsYXNzOmFueTtcblxuXHRwdWJsaWMgZ2V0IHN0YXRlQ2xhc3MoKTphbnlcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU3RhdGVDbGFzcztcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IDxjb2RlPkFuaW1hdGlvbk5vZGVCYXNlPC9jb2RlPiBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuQU5JTUFUSU9OX05PREU7XG5cdH1cbn1cblxuZXhwb3J0ID0gQW5pbWF0aW9uTm9kZUJhc2U7Il19