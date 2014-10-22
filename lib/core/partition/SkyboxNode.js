var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-core/lib/core/partition/EntityNode");

/**
* SkyboxNode is a space partitioning leaf node that contains a Skybox object.
*
* @class away.partition.SkyboxNode
*/
var SkyboxNode = (function (_super) {
    __extends(SkyboxNode, _super);
    /**
    * Creates a new SkyboxNode object.
    * @param skyBox The Skybox to be contained in the node.
    */
    function SkyboxNode(skyBox) {
        _super.call(this, skyBox);

        this._skyBox = skyBox;
    }
    /**
    * @inheritDoc
    */
    SkyboxNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applySkybox(this._skyBox);
    };

    /**
    *
    * @param planes
    * @param numPlanes
    * @returns {boolean}
    */
    SkyboxNode.prototype.isInFrustum = function (planes, numPlanes) {
        if (!this._skyBox._iIsVisible)
            return false;

        //a skybox is always in view unless its visibility is set to false
        return true;
    };
    return SkyboxNode;
})(EntityNode);

module.exports = SkyboxNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcGFydGl0aW9uL1NreWJveE5vZGUudHMiXSwibmFtZXMiOlsiU2t5Ym94Tm9kZSIsIlNreWJveE5vZGUuY29uc3RydWN0b3IiLCJTa3lib3hOb2RlLmFjY2VwdFRyYXZlcnNlciIsIlNreWJveE5vZGUuaXNJbkZydXN0dW0iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFFQUU2RTs7QUFJN0U7Ozs7RUFJRztBQUNIO0lBQXlCQSw2QkFBVUE7SUFRbENBOzs7TUFER0E7SUFDSEEsb0JBQVlBLE1BQWNBO1FBRXpCQyxXQUFNQSxPQUFBQSxNQUFNQSxDQUFDQTs7UUFFYkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUE7SUFDdEJBLENBQUNBO0lBS0REOztNQURHQTsyQ0FDSEEsVUFBdUJBLFNBQW9CQTtRQUUxQ0UsSUFBSUEsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBWUEsSUFBSUEsQ0FBQ0E7WUFDdkNBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3RDQSxDQUFDQTs7SUFRREY7Ozs7O01BREdBO3VDQUNIQSxVQUFtQkEsTUFBcUJBLEVBQUVBLFNBQWdCQTtRQUV6REcsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0E7WUFDNUJBLE9BQU9BLEtBQUtBLENBQUNBOztRQUVkQSxrRUFBa0VBO1FBQ2xFQSxPQUFPQSxJQUFJQTtJQUNaQSxDQUFDQTtJQUNGSCxrQkFBQ0E7QUFBREEsQ0FBQ0EsRUF0Q3dCLFVBQVUsRUFzQ2xDOztBQUVELDJCQUFvQixDQUFBIiwiZmlsZSI6ImNvcmUvcGFydGl0aW9uL1NreWJveE5vZGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhbmUzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUGxhbmUzRFwiKTtcbmltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbi8qKlxuICogU2t5Ym94Tm9kZSBpcyBhIHNwYWNlIHBhcnRpdGlvbmluZyBsZWFmIG5vZGUgdGhhdCBjb250YWlucyBhIFNreWJveCBvYmplY3QuXG4gKlxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLlNreWJveE5vZGVcbiAqL1xuY2xhc3MgU2t5Ym94Tm9kZSBleHRlbmRzIEVudGl0eU5vZGVcbntcblx0cHJpdmF0ZSBfc2t5Qm94OklFbnRpdHk7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgU2t5Ym94Tm9kZSBvYmplY3QuXG5cdCAqIEBwYXJhbSBza3lCb3ggVGhlIFNreWJveCB0byBiZSBjb250YWluZWQgaW4gdGhlIG5vZGUuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihza3lCb3g6SUVudGl0eSlcblx0e1xuXHRcdHN1cGVyKHNreUJveCk7XG5cblx0XHR0aGlzLl9za3lCb3ggPSBza3lCb3g7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBhY2NlcHRUcmF2ZXJzZXIodHJhdmVyc2VyOklDb2xsZWN0b3IpXG5cdHtcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSg8Tm9kZUJhc2U+IHRoaXMpKVxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5U2t5Ym94KHRoaXMuX3NreUJveCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHBsYW5lc1xuXHQgKiBAcGFyYW0gbnVtUGxhbmVzXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0cHVibGljIGlzSW5GcnVzdHVtKHBsYW5lczpBcnJheTxQbGFuZTNEPiwgbnVtUGxhbmVzOm51bWJlcik6Ym9vbGVhblxuXHR7XG5cdFx0aWYgKCF0aGlzLl9za3lCb3guX2lJc1Zpc2libGUpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHQvL2Egc2t5Ym94IGlzIGFsd2F5cyBpbiB2aWV3IHVubGVzcyBpdHMgdmlzaWJpbGl0eSBpcyBzZXQgdG8gZmFsc2Vcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufVxuXG5leHBvcnQgPSBTa3lib3hOb2RlOyJdfQ==