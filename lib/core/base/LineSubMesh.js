var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SubMeshBase = require("awayjs-core/lib/core/base/SubMeshBase");
var AssetType = require("awayjs-core/lib/core/library/AssetType");

/**
* LineSubMesh wraps a LineSubGeometry as a scene graph instantiation. A LineSubMesh is owned by a Mesh object.
*
*
* @see away.base.LineSubGeometry
* @see away.entities.Mesh
*
* @class away.base.LineSubMesh
*/
var LineSubMesh = (function (_super) {
    __extends(LineSubMesh, _super);
    /**
    * Creates a new LineSubMesh object
    * @param subGeometry The LineSubGeometry object which provides the geometry data for this LineSubMesh.
    * @param parentMesh The Mesh object to which this LineSubMesh belongs.
    * @param material An optional material used to render this LineSubMesh.
    */
    function LineSubMesh(subGeometry, parentMesh, material) {
        if (typeof material === "undefined") { material = null; }
        _super.call(this);

        this._pParentMesh = parentMesh;
        this._subGeometry = subGeometry;
        this.material = material;
    }
    Object.defineProperty(LineSubMesh.prototype, "assetType", {
        /**
        *
        */
        get: function () {
            return AssetType.LINE_SUB_MESH;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LineSubMesh.prototype, "subGeometry", {
        /**
        * The LineSubGeometry object which provides the geometry data for this LineSubMesh.
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
    LineSubMesh.prototype.dispose = function () {
        this.material = null;

        _super.prototype.dispose.call(this);
    };

    LineSubMesh.prototype._iCollectRenderable = function (renderer) {
        renderer.applyLineSubMesh(this);
    };
    return LineSubMesh;
})(SubMeshBase);

module.exports = LineSubMesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9MaW5lU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJMaW5lU3ViTWVzaCIsIkxpbmVTdWJNZXNoLmNvbnN0cnVjdG9yIiwiTGluZVN1Yk1lc2guZGlzcG9zZSIsIkxpbmVTdWJNZXNoLl9pQ29sbGVjdFJlbmRlcmFibGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUV5RTtBQUN6RSxpRUFBd0U7O0FBS3hFOzs7Ozs7OztFQVFHO0FBQ0g7SUFBMEJBLDhCQUFXQTtJQTBCcENBOzs7OztNQURHQTtJQUNIQSxxQkFBWUEsV0FBMkJBLEVBQUVBLFVBQWVBLEVBQUVBLFFBQTRCQTtRQUE1QkMsdUNBQUFBLFFBQVFBLEdBQWdCQSxJQUFJQTtBQUFBQSxRQUVyRkEsV0FBTUEsS0FBQUEsQ0FBQ0E7O1FBRVBBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBO1FBQzlCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQTtRQUMvQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUE7SUFDekJBLENBQUNBO0lBMUJERDtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsU0FBU0EsQ0FBQ0EsYUFBYUE7UUFDL0JBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQTtRQUN6QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFvQkRBOztNQURHQTtvQ0FDSEE7UUFFQ0UsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUE7O1FBRXBCQSxnQkFBS0EsQ0FBQ0EsT0FBT0EsS0FBQ0EsS0FBQUEsQ0FBQ0E7SUFDaEJBLENBQUNBOztJQUVERiw0Q0FBQUEsVUFBMkJBLFFBQWtCQTtRQUU1Q0csUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7SUFDRkgsbUJBQUNBO0FBQURBLENBQUNBLEVBakR5QixXQUFXLEVBaURwQzs7QUFFRCw0QkFBcUIsQ0FBQSIsImZpbGUiOiJjb3JlL2Jhc2UvTGluZVN1Yk1lc2guanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSVN1Yk1lc2hcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9JU3ViTWVzaFwiKTtcbmltcG9ydCBMaW5lU3ViR2VvbWV0cnlcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0xpbmVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBTdWJNZXNoQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9TdWJNZXNoQmFzZVwiKTtcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuaW1wb3J0IElSZW5kZXJlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcmVuZGVyL0lSZW5kZXJlclwiKTtcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL01lc2hcIik7XG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBMaW5lU3ViTWVzaCB3cmFwcyBhIExpbmVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgTGluZVN1Yk1lc2ggaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cbiAqXG4gKlxuICogQHNlZSBhd2F5LmJhc2UuTGluZVN1Ykdlb21ldHJ5XG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuTWVzaFxuICpcbiAqIEBjbGFzcyBhd2F5LmJhc2UuTGluZVN1Yk1lc2hcbiAqL1xuY2xhc3MgTGluZVN1Yk1lc2ggZXh0ZW5kcyBTdWJNZXNoQmFzZSBpbXBsZW1lbnRzIElTdWJNZXNoXG57XG5cdHByaXZhdGUgX3N1Ykdlb21ldHJ5OkxpbmVTdWJHZW9tZXRyeTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkxJTkVfU1VCX01FU0g7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIExpbmVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgTGluZVN1Yk1lc2guXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHN1Ykdlb21ldHJ5KCk6TGluZVN1Ykdlb21ldHJ5XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cnk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBMaW5lU3ViTWVzaCBvYmplY3Rcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5IFRoZSBMaW5lU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIExpbmVTdWJNZXNoLlxuXHQgKiBAcGFyYW0gcGFyZW50TWVzaCBUaGUgTWVzaCBvYmplY3QgdG8gd2hpY2ggdGhpcyBMaW5lU3ViTWVzaCBiZWxvbmdzLlxuXHQgKiBAcGFyYW0gbWF0ZXJpYWwgQW4gb3B0aW9uYWwgbWF0ZXJpYWwgdXNlZCB0byByZW5kZXIgdGhpcyBMaW5lU3ViTWVzaC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHN1Ykdlb21ldHJ5OkxpbmVTdWJHZW9tZXRyeSwgcGFyZW50TWVzaDpNZXNoLCBtYXRlcmlhbDpNYXRlcmlhbEJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BQYXJlbnRNZXNoID0gcGFyZW50TWVzaDtcblx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHN1Ykdlb21ldHJ5O1xuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dGhpcy5tYXRlcmlhbCA9IG51bGw7XG5cblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlcjpJUmVuZGVyZXIpXG5cdHtcblx0XHRyZW5kZXJlci5hcHBseUxpbmVTdWJNZXNoKHRoaXMpO1xuXHR9XG59XG5cbmV4cG9ydCA9IExpbmVTdWJNZXNoOyJdfQ==