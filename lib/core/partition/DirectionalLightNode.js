var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-core/lib/core/partition/EntityNode");

/**
* @class away.partition.DirectionalLightNode
*/
var DirectionalLightNode = (function (_super) {
    __extends(DirectionalLightNode, _super);
    /**
    *
    * @param directionalLight
    */
    function DirectionalLightNode(directionalLight) {
        _super.call(this, directionalLight);

        this._directionalLight = directionalLight;
    }
    /**
    * @inheritDoc
    */
    DirectionalLightNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyDirectionalLight(this._directionalLight);
    };

    /**
    *
    * @returns {boolean}
    */
    DirectionalLightNode.prototype.isCastingShadow = function () {
        return false;
    };
    return DirectionalLightNode;
})(EntityNode);

module.exports = DirectionalLightNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcGFydGl0aW9uL0RpcmVjdGlvbmFsTGlnaHROb2RlLnRzIl0sIm5hbWVzIjpbIkRpcmVjdGlvbmFsTGlnaHROb2RlIiwiRGlyZWN0aW9uYWxMaWdodE5vZGUuY29uc3RydWN0b3IiLCJEaXJlY3Rpb25hbExpZ2h0Tm9kZS5hY2NlcHRUcmF2ZXJzZXIiLCJEaXJlY3Rpb25hbExpZ2h0Tm9kZS5pc0Nhc3RpbmdTaGFkb3ciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFFQUE2RTs7QUFJN0U7O0VBRUc7QUFDSDtJQUFtQ0EsdUNBQVVBO0lBUTVDQTs7O01BREdBO0lBQ0hBLDhCQUFZQSxnQkFBd0JBO1FBRW5DQyxXQUFNQSxPQUFBQSxnQkFBZ0JBLENBQUNBOztRQUV2QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxnQkFBZ0JBO0lBQzFDQSxDQUFDQTtJQUtERDs7TUFER0E7cURBQ0hBLFVBQXVCQSxTQUFvQkE7UUFFMUNFLElBQUlBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBO1lBQzVCQSxTQUFTQSxDQUFDQSxxQkFBcUJBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7SUFDMURBLENBQUNBOztJQU1ERjs7O01BREdBO3FEQUNIQTtRQUVDRyxPQUFPQSxLQUFLQTtJQUNiQSxDQUFDQTtJQUNGSCw0QkFBQ0E7QUFBREEsQ0FBQ0EsRUFoQ2tDLFVBQVUsRUFnQzVDOztBQUVELHFDQUE4QixDQUFBIiwiZmlsZSI6ImNvcmUvcGFydGl0aW9uL0RpcmVjdGlvbmFsTGlnaHROb2RlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uRGlyZWN0aW9uYWxMaWdodE5vZGVcbiAqL1xuY2xhc3MgRGlyZWN0aW9uYWxMaWdodE5vZGUgZXh0ZW5kcyBFbnRpdHlOb2RlXG57XG5cdHByaXZhdGUgX2RpcmVjdGlvbmFsTGlnaHQ6SUVudGl0eTtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGRpcmVjdGlvbmFsTGlnaHRcblx0ICovXG5cdGNvbnN0cnVjdG9yKGRpcmVjdGlvbmFsTGlnaHQ6SUVudGl0eSlcblx0e1xuXHRcdHN1cGVyKGRpcmVjdGlvbmFsTGlnaHQpO1xuXG5cdFx0dGhpcy5fZGlyZWN0aW9uYWxMaWdodCA9IGRpcmVjdGlvbmFsTGlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBhY2NlcHRUcmF2ZXJzZXIodHJhdmVyc2VyOklDb2xsZWN0b3IpXG5cdHtcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSh0aGlzKSlcblx0XHRcdHRyYXZlcnNlci5hcHBseURpcmVjdGlvbmFsTGlnaHQodGhpcy5fZGlyZWN0aW9uYWxMaWdodCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRwdWJsaWMgaXNDYXN0aW5nU2hhZG93KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCA9IERpcmVjdGlvbmFsTGlnaHROb2RlOyJdfQ==