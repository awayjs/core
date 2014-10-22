var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SubMeshBase = require("awayjs-core/lib/core/base/SubMeshBase");

var AssetType = require("awayjs-core/lib/core/library/AssetType");

/**
* TriangleSubMesh wraps a TriangleSubGeometry as a scene graph instantiation. A TriangleSubMesh is owned by a Mesh object.
*
*
* @see away.base.TriangleSubGeometry
* @see away.entities.Mesh
*
* @class away.base.TriangleSubMesh
*/
var TriangleSubMesh = (function (_super) {
    __extends(TriangleSubMesh, _super);
    /**
    * Creates a new TriangleSubMesh object
    * @param subGeometry The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
    * @param parentMesh The Mesh object to which this TriangleSubMesh belongs.
    * @param material An optional material used to render this TriangleSubMesh.
    */
    function TriangleSubMesh(subGeometry, parentMesh, material) {
        if (typeof material === "undefined") { material = null; }
        _super.call(this);

        this._pParentMesh = parentMesh;
        this._subGeometry = subGeometry;
        this.material = material;
    }
    Object.defineProperty(TriangleSubMesh.prototype, "assetType", {
        /**
        *
        */
        get: function () {
            return AssetType.TRIANGLE_SUB_MESH;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubMesh.prototype, "subGeometry", {
        /**
        * The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
        */
        get: function () {
            return this._subGeometry;
        },
        enumerable: true,
        configurable: true
    });

    /**
    *
    */
    TriangleSubMesh.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };

    TriangleSubMesh.prototype._iCollectRenderable = function (renderer) {
        renderer.applyTriangleSubMesh(this);
    };
    return TriangleSubMesh;
})(SubMeshBase);

module.exports = TriangleSubMesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9UcmlhbmdsZVN1Yk1lc2gudHMiXSwibmFtZXMiOlsiVHJpYW5nbGVTdWJNZXNoIiwiVHJpYW5nbGVTdWJNZXNoLmNvbnN0cnVjdG9yIiwiVHJpYW5nbGVTdWJNZXNoLmRpc3Bvc2UiLCJUcmlhbmdsZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0VBQ3lFOztBQUV6RSxpRUFBd0U7O0FBS3hFOzs7Ozs7OztFQVFHO0FBQ0g7SUFBOEJBLGtDQUFXQTtJQTBCeENBOzs7OztNQURHQTtJQUNIQSx5QkFBWUEsV0FBK0JBLEVBQUVBLFVBQWVBLEVBQUVBLFFBQTRCQTtRQUE1QkMsdUNBQUFBLFFBQVFBLEdBQWdCQSxJQUFJQTtBQUFBQSxRQUV6RkEsV0FBTUEsS0FBQUEsQ0FBQ0E7O1FBRVBBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBO1FBQzlCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQTtRQUMvQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUE7SUFDekJBLENBQUNBO0lBMUJERDtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsU0FBU0EsQ0FBQ0EsaUJBQWlCQTtRQUNuQ0EsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBO1FBQ3pCQSxDQUFDQTs7OztBQUFBQTtJQW9CREE7O01BREdBO3dDQUNIQTtRQUVDRSxnQkFBS0EsQ0FBQ0EsT0FBT0EsS0FBQ0EsS0FBQUEsQ0FBQ0E7SUFDaEJBLENBQUNBOztJQUVERixnREFBQUEsVUFBMkJBLFFBQWtCQTtRQUU1Q0csUUFBUUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUFDRkgsdUJBQUNBO0FBQURBLENBQUNBLEVBL0M2QixXQUFXLEVBK0N4Qzs7QUFFRCxnQ0FBeUIsQ0FBQSIsImZpbGUiOiJjb3JlL2Jhc2UvVHJpYW5nbGVTdWJNZXNoLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvSVN1Yk1lc2hcIik7XG5pbXBvcnQgU3ViTWVzaEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvU3ViTWVzaEJhc2VcIik7XG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1RyaWFuZ2xlU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3JlbmRlci9JUmVuZGVyZXJcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogVHJpYW5nbGVTdWJNZXNoIHdyYXBzIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgVHJpYW5nbGVTdWJNZXNoIGlzIG93bmVkIGJ5IGEgTWVzaCBvYmplY3QuXG4gKlxuICpcbiAqIEBzZWUgYXdheS5iYXNlLlRyaWFuZ2xlU3ViR2VvbWV0cnlcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXG4gKlxuICogQGNsYXNzIGF3YXkuYmFzZS5UcmlhbmdsZVN1Yk1lc2hcbiAqL1xuY2xhc3MgVHJpYW5nbGVTdWJNZXNoIGV4dGVuZHMgU3ViTWVzaEJhc2UgaW1wbGVtZW50cyBJU3ViTWVzaFxue1xuXHRwcml2YXRlIF9zdWJHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5O1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuVFJJQU5HTEVfU1VCX01FU0g7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIFRyaWFuZ2xlU3ViTWVzaC5cblx0ICovXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpUcmlhbmdsZVN1Ykdlb21ldHJ5XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cnk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBUcmlhbmdsZVN1Yk1lc2ggb2JqZWN0XG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgVHJpYW5nbGVTdWJNZXNoLlxuXHQgKiBAcGFyYW0gcGFyZW50TWVzaCBUaGUgTWVzaCBvYmplY3QgdG8gd2hpY2ggdGhpcyBUcmlhbmdsZVN1Yk1lc2ggYmVsb25ncy5cblx0ICogQHBhcmFtIG1hdGVyaWFsIEFuIG9wdGlvbmFsIG1hdGVyaWFsIHVzZWQgdG8gcmVuZGVyIHRoaXMgVHJpYW5nbGVTdWJNZXNoLlxuXHQgKi9cblx0Y29uc3RydWN0b3Ioc3ViR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSwgcGFyZW50TWVzaDpNZXNoLCBtYXRlcmlhbDpNYXRlcmlhbEJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BQYXJlbnRNZXNoID0gcGFyZW50TWVzaDtcblx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHN1Ykdlb21ldHJ5O1xuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXI6SVJlbmRlcmVyKVxuXHR7XG5cdFx0cmVuZGVyZXIuYXBwbHlUcmlhbmdsZVN1Yk1lc2godGhpcyk7XG5cdH1cbn1cblxuZXhwb3J0ID0gVHJpYW5nbGVTdWJNZXNoOyJdfQ==