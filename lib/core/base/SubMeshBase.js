var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");

var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");

/**
* SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
*
*
* @see away.base.TriangleSubGeometry
* @see away.entities.Mesh
*
* @class away.base.SubMeshBase
*/
var SubMeshBase = (function (_super) {
    __extends(SubMeshBase, _super);
    /**
    * Creates a new SubMeshBase object
    */
    function SubMeshBase() {
        _super.call(this);
        this._iIndex = 0;
        this._renderables = new Array();
    }
    Object.defineProperty(SubMeshBase.prototype, "animator", {
        //TODO test shader picking
        //		public get shaderPickingDetails():boolean
        //		{
        //
        //			return this.sourceEntity.shaderPickingDetails;
        //		}
        /**
        * The animator object that provides the state for the TriangleSubMesh's animation.
        */
        get: function () {
            return this._pParentMesh.animator;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(SubMeshBase.prototype, "material", {
        /**
        * The material used to render the current TriangleSubMesh. If set to null, its parent Mesh's material will be used instead.
        */
        get: function () {
            return this._material || this._pParentMesh.material;
        },
        set: function (value) {
            if (this.material)
                this.material.iRemoveOwner(this);

            this._material = value;

            if (this.material)
                this.material.iAddOwner(this);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(SubMeshBase.prototype, "sceneTransform", {
        /**
        * The scene transform object that transforms from model to world space.
        */
        get: function () {
            return this._pParentMesh.sceneTransform;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(SubMeshBase.prototype, "parentMesh", {
        /**
        * The entity that that initially provided the IRenderable to the render pipeline (ie: the owning Mesh object).
        */
        get: function () {
            return this._pParentMesh;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(SubMeshBase.prototype, "uvTransform", {
        /**
        *
        */
        get: function () {
            return this._uvTransform || this._pParentMesh.uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });


    /**
    *
    */
    SubMeshBase.prototype.dispose = function () {
        this.material = null;

        var len = this._renderables.length;
        for (var i = 0; i < len; i++)
            this._renderables[i].dispose();
    };

    /**
    *
    * @param camera
    * @returns {away.geom.Matrix3D}
    */
    SubMeshBase.prototype.getRenderSceneTransform = function (camera) {
        return this._pParentMesh.getRenderSceneTransform(camera);
    };

    SubMeshBase.prototype._iAddRenderable = function (renderable) {
        this._renderables.push(renderable);

        return renderable;
    };

    SubMeshBase.prototype._iRemoveRenderable = function (renderable) {
        var index = this._renderables.indexOf(renderable);

        this._renderables.splice(index, 1);

        return renderable;
    };

    SubMeshBase.prototype._iInvalidateRenderableGeometry = function () {
        var len = this._renderables.length;
        for (var i = 0; i < len; i++)
            this._renderables[i].invalidateGeometry();
    };

    SubMeshBase.prototype._iCollectRenderable = function (renderer) {
        throw new AbstractMethodError();
    };

    SubMeshBase.prototype._iGetExplicitMaterial = function () {
        return this._material;
    };
    return SubMeshBase;
})(NamedAssetBase);

module.exports = SubMeshBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9TdWJNZXNoQmFzZS50cyJdLCJuYW1lcyI6WyJTdWJNZXNoQmFzZSIsIlN1Yk1lc2hCYXNlLmNvbnN0cnVjdG9yIiwiU3ViTWVzaEJhc2UuZGlzcG9zZSIsIlN1Yk1lc2hCYXNlLmdldFJlbmRlclNjZW5lVHJhbnNmb3JtIiwiU3ViTWVzaEJhc2UuX2lBZGRSZW5kZXJhYmxlIiwiU3ViTWVzaEJhc2UuX2lSZW1vdmVSZW5kZXJhYmxlIiwiU3ViTWVzaEJhc2UuX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJ5IiwiU3ViTWVzaEJhc2UuX2lDb2xsZWN0UmVuZGVyYWJsZSIsIlN1Yk1lc2hCYXNlLl9pR2V0RXhwbGljaXRNYXRlcmlhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkVBR2lGOztBQUtqRiwrRUFBb0Y7O0FBR3BGOzs7Ozs7OztFQVFHO0FBQ0g7SUFBMEJBLDhCQUFjQTtJQTRFdkNBOztNQURHQTtJQUNIQTtRQUVDQyxXQUFNQSxLQUFBQSxDQUFDQTtRQXpFUkEsS0FBT0EsT0FBT0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFHMUJBLEtBQVFBLFlBQVlBLEdBQXNCQSxJQUFJQSxLQUFLQSxDQUFjQSxDQUFDQSxDQUFDQTtJQXVFbkVBLENBQUNBO0lBM0RERDtRQUFBQSwwQkFWMEJBO1FBQzNCQSw2Q0FBNkNBO1FBQzdDQSxLQUFLQTtRQUNMQSxFQUFFQTtRQUNGQSxtREFBbURBO1FBQ25EQSxLQUFLQTtRQUVKQTs7VUFFR0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsUUFBUUE7UUFDbENBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFRQTtRQUNwREEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBb0JBLEtBQWtCQTtZQUVyQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUE7Z0JBQ2hCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs7WUFFbENBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBOztZQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUE7Z0JBQ2hCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNoQ0EsQ0FBQ0E7Ozs7QUFYQUE7O0lBZ0JEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsY0FBY0E7UUFDeENBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQTtRQUN6QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFdBQVdBO1FBQzFEQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUF1QkEsS0FBaUJBO1lBRXZDQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQTtRQUMxQkEsQ0FBQ0E7Ozs7QUFMQUE7O0lBa0JEQTs7TUFER0E7b0NBQ0hBO1FBRUNFLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBOztRQUVwQkEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUE7UUFDekNBLEtBQUtBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ2xDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7O0lBT0RGOzs7O01BREdBO29EQUNIQSxVQUErQkEsTUFBYUE7UUFFM0NHLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDekRBLENBQUNBOztJQUVESCx3Q0FBQUEsVUFBdUJBLFVBQXNCQTtRQUU1Q0ksSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7O1FBRWxDQSxPQUFPQSxVQUFVQTtJQUNsQkEsQ0FBQ0E7O0lBR0RKLDJDQUFBQSxVQUEwQkEsVUFBc0JBO1FBRS9DSyxJQUFJQSxLQUFLQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQTs7UUFFeERBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBOztRQUVsQ0EsT0FBT0EsVUFBVUE7SUFDbEJBLENBQUNBOztJQUVETCx1REFBQUE7UUFFQ00sSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUE7UUFDekNBLEtBQUtBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ2xDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBLENBQUNBO0lBQzVDQSxDQUFDQTs7SUFFRE4sNENBQUFBLFVBQTJCQSxRQUFrQkE7UUFFNUNPLE1BQU1BLElBQUlBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBOztJQUVEUCw4Q0FBQUE7UUFFQ1EsT0FBT0EsSUFBSUEsQ0FBQ0EsU0FBU0E7SUFDdEJBLENBQUNBO0lBQ0ZSLG1CQUFDQTtBQUFEQSxDQUFDQSxFQXhJeUIsY0FBYyxFQXdJdkM7O0FBRUQsNEJBQXFCLENBQUEiLCJmaWxlIjoiY29yZS9iYXNlL1N1Yk1lc2hCYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElBbmltYXRvclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBVVlRyYW5zZm9ybVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9VVlRyYW5zZm9ybVwiKTtcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvSVJlbmRlcmFibGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xuaW1wb3J0IE1lc2hcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvTWVzaFwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xuXG4vKipcbiAqIFN1Yk1lc2hCYXNlIHdyYXBzIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgU3ViTWVzaEJhc2UgaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cbiAqXG4gKlxuICogQHNlZSBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxuICogQHNlZSBhd2F5LmVudGl0aWVzLk1lc2hcbiAqXG4gKiBAY2xhc3MgYXdheS5iYXNlLlN1Yk1lc2hCYXNlXG4gKi9cbmNsYXNzIFN1Yk1lc2hCYXNlIGV4dGVuZHMgTmFtZWRBc3NldEJhc2Vcbntcblx0cHVibGljIF9wUGFyZW50TWVzaDpNZXNoO1xuXHRwdWJsaWMgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xuXG5cdHB1YmxpYyBfaUluZGV4Om51bWJlciA9IDA7XG5cblx0cHVibGljIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XG5cdHByaXZhdGUgX3JlbmRlcmFibGVzOkFycmF5PElSZW5kZXJhYmxlPiA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZT4oKTtcblxuXHQvL1RPRE8gdGVzdCBzaGFkZXIgcGlja2luZ1xuLy9cdFx0cHVibGljIGdldCBzaGFkZXJQaWNraW5nRGV0YWlscygpOmJvb2xlYW5cbi8vXHRcdHtcbi8vXG4vL1x0XHRcdHJldHVybiB0aGlzLnNvdXJjZUVudGl0eS5zaGFkZXJQaWNraW5nRGV0YWlscztcbi8vXHRcdH1cblxuXHQvKipcblx0ICogVGhlIGFuaW1hdG9yIG9iamVjdCB0aGF0IHByb3ZpZGVzIHRoZSBzdGF0ZSBmb3IgdGhlIFRyaWFuZ2xlU3ViTWVzaCdzIGFuaW1hdGlvbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3Jcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50TWVzaC5hbmltYXRvcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF0ZXJpYWwgdXNlZCB0byByZW5kZXIgdGhlIGN1cnJlbnQgVHJpYW5nbGVTdWJNZXNoLiBJZiBzZXQgdG8gbnVsbCwgaXRzIHBhcmVudCBNZXNoJ3MgbWF0ZXJpYWwgd2lsbCBiZSB1c2VkIGluc3RlYWQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWwgfHwgdGhpcy5fcFBhcmVudE1lc2gubWF0ZXJpYWw7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOk1hdGVyaWFsQmFzZSlcblx0e1xuXHRcdGlmICh0aGlzLm1hdGVyaWFsKVxuXHRcdFx0dGhpcy5tYXRlcmlhbC5pUmVtb3ZlT3duZXIodGhpcyk7XG5cblx0XHR0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMubWF0ZXJpYWwpXG5cdFx0XHR0aGlzLm1hdGVyaWFsLmlBZGRPd25lcih0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc2NlbmUgdHJhbnNmb3JtIG9iamVjdCB0aGF0IHRyYW5zZm9ybXMgZnJvbSBtb2RlbCB0byB3b3JsZCBzcGFjZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnRNZXNoLnNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBlbnRpdHkgdGhhdCB0aGF0IGluaXRpYWxseSBwcm92aWRlZCB0aGUgSVJlbmRlcmFibGUgdG8gdGhlIHJlbmRlciBwaXBlbGluZSAoaWU6IHRoZSBvd25pbmcgTWVzaCBvYmplY3QpLlxuXHQgKi9cblx0cHVibGljIGdldCBwYXJlbnRNZXNoKCk6TWVzaFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnRNZXNoO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cblx0e1xuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybSB8fCB0aGlzLl9wUGFyZW50TWVzaC51dlRyYW5zZm9ybTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXG5cdHtcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgU3ViTWVzaEJhc2Ugb2JqZWN0XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR0aGlzLm1hdGVyaWFsID0gbnVsbDtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyYWJsZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcmVuZGVyYWJsZXNbaV0uZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBjYW1lcmFcblx0ICogQHJldHVybnMge2F3YXkuZ2VvbS5NYXRyaXgzRH1cblx0ICovXG5cdHB1YmxpYyBnZXRSZW5kZXJTY2VuZVRyYW5zZm9ybShjYW1lcmE6Q2FtZXJhKTpNYXRyaXgzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnRNZXNoLmdldFJlbmRlclNjZW5lVHJhbnNmb3JtKGNhbWVyYSk7XG5cdH1cblxuXHRwdWJsaWMgX2lBZGRSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXG5cdHtcblx0XHR0aGlzLl9yZW5kZXJhYmxlcy5wdXNoKHJlbmRlcmFibGUpO1xuXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XG5cdH1cblxuXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlcmFibGUocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSk6SVJlbmRlcmFibGVcblx0e1xuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9yZW5kZXJhYmxlcy5pbmRleE9mKHJlbmRlcmFibGUpO1xuXG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcblxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xuXHR9XG5cblx0cHVibGljIF9pSW52YWxpZGF0ZVJlbmRlcmFibGVHZW9tZXRyeSgpXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3JlbmRlcmFibGVzW2ldLmludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXI6SVJlbmRlcmVyKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyBfaUdldEV4cGxpY2l0TWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbDtcblx0fVxufVxuXG5leHBvcnQgPSBTdWJNZXNoQmFzZTsiXX0=