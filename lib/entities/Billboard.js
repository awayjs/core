var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-core/lib/core/base/DisplayObject");

var AssetType = require("awayjs-core/lib/core/library/AssetType");
var EntityNode = require("awayjs-core/lib/core/partition/EntityNode");

var MaterialEvent = require("awayjs-core/lib/events/MaterialEvent");

/**
* The Billboard class represents display objects that represent bitmap images.
* These can be images that you load with the <code>flash.Assets</code> or
* <code>flash.display.Loader</code> classes, or they can be images that you
* create with the <code>Billboard()</code> constructor.
*
* <p>The <code>Billboard()</code> constructor allows you to create a Billboard
* object that contains a reference to a BitmapData object. After you create a
* Billboard object, use the <code>addChild()</code> or <code>addChildAt()</code>
* method of the parent DisplayObjectContainer instance to place the bitmap on
* the display list.</p>
*
* <p>A Billboard object can share its BitmapData reference among several Billboard
* objects, independent of translation or rotation properties. Because you can
* create multiple Billboard objects that reference the same BitmapData object,
* multiple display objects can use the same complex BitmapData object without
* incurring the memory overhead of a BitmapData object for each display
* object instance.</p>
*
* <p>A BitmapData object can be drawn to the screen by a Billboard object in one
* of two ways: by using the default hardware renderer with a single hardware surface,
* or by using the slower software renderer when 3D acceleration is not available.</p>
*
* <p>If you would prefer to perform a batch rendering command, rather than using a
* single surface for each Billboard object, you can also draw to the screen using the
* <code>drawTiles()</code> or <code>drawTriangles()</code> methods which are
* available to <code>flash.display.Tilesheet</code> and <code>flash.display.Graphics
* objects.</code></p>
*
* <p><b>Note:</b> The Billboard class is not a subclass of the InteractiveObject
* class, so it cannot dispatch mouse events. However, you can use the
* <code>addEventListener()</code> method of the display object container that
* contains the Billboard object.</p>
*/
var Billboard = (function (_super) {
    __extends(Billboard, _super);
    function Billboard(material, pixelSnapping, smoothing) {
        if (typeof pixelSnapping === "undefined") { pixelSnapping = "auto"; }
        if (typeof smoothing === "undefined") { smoothing = false; }
        var _this = this;
        _super.call(this);

        this._pIsEntity = true;

        this.onSizeChangedDelegate = function (event) {
            return _this.onSizeChanged(event);
        };

        this.material = material;

        this._billboardWidth = material.width;
        this._billboardHeight = material.height;
    }
    Object.defineProperty(Billboard.prototype, "animator", {
        /**
        * Defines the animator of the mesh. Act on the mesh's geometry. Defaults to null
        */
        get: function () {
            return this._animator;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Billboard.prototype, "assetType", {
        /**
        *
        */
        get: function () {
            return AssetType.BILLBOARD;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Billboard.prototype, "billboardHeight", {
        /**
        *
        */
        get: function () {
            return this._billboardHeight;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Billboard.prototype, "billboardWidth", {
        /**
        *
        */
        get: function () {
            return this._billboardWidth;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Billboard.prototype, "material", {
        /**
        *
        */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;

            if (this._material) {
                this._material.iRemoveOwner(this);
                this._material.removeEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
            }

            this._material = value;

            if (this._material) {
                this._material.iAddOwner(this);
                this._material.addEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
            }
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(Billboard.prototype, "uvTransform", {
        /**
        *
        */
        get: function () {
            return this._uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });


    /**
    * @protected
    */
    Billboard.prototype.pCreateEntityPartitionNode = function () {
        return new EntityNode(this);
    };

    /**
    * @protected
    */
    Billboard.prototype.pUpdateBounds = function () {
        this._pBounds.fromExtremes(0, 0, 0, this._billboardWidth, this._billboardHeight, 0);

        _super.prototype.pUpdateBounds.call(this);
    };

    /**
    * //TODO
    *
    * @param shortestCollisionDistance
    * @param findClosest
    * @returns {boolean}
    *
    * @internal
    */
    Billboard.prototype._iTestCollision = function (shortestCollisionDistance, findClosest) {
        return this._pPickingCollider.testBillboardCollision(this, this._pPickingCollisionVO, shortestCollisionDistance);
    };

    /**
    * @private
    */
    Billboard.prototype.onSizeChanged = function (event) {
        this._billboardWidth = this._material.width;
        this._billboardHeight = this._material.height;

        this._pBoundsInvalid = true;

        var len = this._pRenderables.length;
        for (var i = 0; i < len; i++)
            this._pRenderables[i].invalidateVertexData("vertices"); //TODO
    };

    Billboard.prototype._iCollectRenderables = function (renderer) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();

        this._iCollectRenderable(renderer);
    };

    Billboard.prototype._iCollectRenderable = function (renderer) {
        renderer.applyBillboard(this);
    };
    return Billboard;
})(DisplayObject);

module.exports = Billboard;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL0JpbGxib2FyZC50cyJdLCJuYW1lcyI6WyJCaWxsYm9hcmQiLCJCaWxsYm9hcmQuY29uc3RydWN0b3IiLCJCaWxsYm9hcmQucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJCaWxsYm9hcmQucFVwZGF0ZUJvdW5kcyIsIkJpbGxib2FyZC5faVRlc3RDb2xsaXNpb24iLCJCaWxsYm9hcmQub25TaXplQ2hhbmdlZCIsIkJpbGxib2FyZC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIkJpbGxib2FyZC5faUNvbGxlY3RSZW5kZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzRUFFNEU7O0FBSTVFLGlFQUF3RTtBQUN4RSxxRUFBNEU7O0FBRzVFLG1FQUF5RTs7QUFHekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWlDRztBQUVIO0lBQXdCQSw0QkFBYUE7SUFnSHBDQSxtQkFBWUEsUUFBcUJBLEVBQUVBLGFBQTZCQSxFQUFFQSxTQUF5QkE7UUFBeERDLDRDQUFBQSxhQUFhQSxHQUFVQSxNQUFNQTtBQUFBQSxRQUFFQSx3Q0FBQUEsU0FBU0EsR0FBV0EsS0FBS0E7QUFBQUEsUUFBM0ZBLGlCQVlDQTtRQVZBQSxXQUFNQSxLQUFBQSxDQUFDQTs7UUFFUEEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUE7O1FBRXRCQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEdBQUdBLFVBQUNBLEtBQW1CQTttQkFBS0EsS0FBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFBekJBLENBQXlCQTs7UUFFL0VBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBOztRQUV4QkEsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsUUFBUUEsQ0FBQ0EsS0FBS0E7UUFDckNBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsUUFBUUEsQ0FBQ0EsTUFBTUE7SUFDeENBLENBQUNBO0lBL0dERDtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsU0FBU0E7UUFDdEJBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxTQUFTQSxDQUFDQSxTQUFTQTtRQUMzQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFVREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGdCQUFnQkE7UUFDN0JBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxlQUFlQTtRQUM1QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFLREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFNBQVNBO1FBQ3RCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFvQkEsS0FBa0JBO1lBRXJDQSxJQUFJQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQTtnQkFDMUJBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFFQTtnQkFDbkJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBO2dCQUNqQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBO2FBQzFGQTs7WUFHREEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0E7O1lBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFFQTtnQkFDbkJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBO2dCQUM5QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBO2FBQ3ZGQTtRQUNGQSxDQUFDQTs7OztBQW5CQUE7O0lBaUREQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUE7UUFDekJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXVCQSxLQUFpQkE7WUFFdkNBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBO1FBQzFCQSxDQUFDQTs7OztBQUxBQTs7SUF3QkRBOztNQURHQTtxREFDSEE7UUFFQ0UsT0FBT0EsSUFBSUEsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDNUJBLENBQUNBOztJQUtERjs7TUFER0E7d0NBQ0hBO1FBRUNHLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7O1FBRW5GQSxnQkFBS0EsQ0FBQ0EsYUFBYUEsS0FBQ0EsS0FBQUEsQ0FBQ0E7SUFDdEJBLENBQUNBOztJQVdESDs7Ozs7Ozs7TUFER0E7MENBQ0hBLFVBQXVCQSx5QkFBZ0NBLEVBQUVBLFdBQW1CQTtRQUUzRUksT0FBT0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxzQkFBc0JBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLG9CQUFvQkEsRUFBRUEseUJBQXlCQSxDQUFDQTtJQUNqSEEsQ0FBQ0E7O0lBS0RKOztNQURHQTt3Q0FDSEEsVUFBc0JBLEtBQW1CQTtRQUV4Q0ssSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0E7UUFDM0NBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUE7O1FBRTdDQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQTs7UUFFM0JBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BO1FBQzFDQSxLQUFLQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtZQUNsQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxNQUFNQTtBQUFQQSxJQUN6REEsQ0FBQ0E7O0lBRURMLDJDQUFBQSxVQUE0QkEsUUFBa0JBO1FBRTdDTSx1RUFBdUVBO1FBQ3ZFQSxrRUFBa0VBO1FBQ2xFQSxpREFBaURBO1FBQ2pEQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQTtZQUN0QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1FBRWxDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLFFBQVFBLENBQUNBO0lBQ25DQSxDQUFDQTs7SUFFRE4sMENBQUFBLFVBQTJCQSxRQUFrQkE7UUFFNUNPLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBO0lBQzlCQSxDQUFDQTtJQUNGUCxpQkFBQ0E7QUFBREEsQ0FBQ0EsRUE1THVCLGFBQWEsRUE0THBDOztBQUVELDBCQUFtQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL0JpbGxib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9hbmltYXRvcnMvSUFuaW1hdG9yXCIpO1xuaW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvQml0bWFwRGF0YVwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IElNYXRlcmlhbE93bmVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9JTWF0ZXJpYWxPd25lclwiKTtcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL1VWVHJhbnNmb3JtXCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5pbXBvcnQgTWF0ZXJpYWxFdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTWF0ZXJpYWxFdmVudFwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xuXG4vKipcbiAqIFRoZSBCaWxsYm9hcmQgY2xhc3MgcmVwcmVzZW50cyBkaXNwbGF5IG9iamVjdHMgdGhhdCByZXByZXNlbnQgYml0bWFwIGltYWdlcy5cbiAqIFRoZXNlIGNhbiBiZSBpbWFnZXMgdGhhdCB5b3UgbG9hZCB3aXRoIHRoZSA8Y29kZT5mbGFzaC5Bc3NldHM8L2NvZGU+IG9yXG4gKiA8Y29kZT5mbGFzaC5kaXNwbGF5LkxvYWRlcjwvY29kZT4gY2xhc3Nlcywgb3IgdGhleSBjYW4gYmUgaW1hZ2VzIHRoYXQgeW91XG4gKiBjcmVhdGUgd2l0aCB0aGUgPGNvZGU+QmlsbGJvYXJkKCk8L2NvZGU+IGNvbnN0cnVjdG9yLlxuICpcbiAqIDxwPlRoZSA8Y29kZT5CaWxsYm9hcmQoKTwvY29kZT4gY29uc3RydWN0b3IgYWxsb3dzIHlvdSB0byBjcmVhdGUgYSBCaWxsYm9hcmRcbiAqIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIGEgQml0bWFwRGF0YSBvYmplY3QuIEFmdGVyIHlvdSBjcmVhdGUgYVxuICogQmlsbGJvYXJkIG9iamVjdCwgdXNlIHRoZSA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPiBvciA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+XG4gKiBtZXRob2Qgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlIHRvIHBsYWNlIHRoZSBiaXRtYXAgb25cbiAqIHRoZSBkaXNwbGF5IGxpc3QuPC9wPlxuICpcbiAqIDxwPkEgQmlsbGJvYXJkIG9iamVjdCBjYW4gc2hhcmUgaXRzIEJpdG1hcERhdGEgcmVmZXJlbmNlIGFtb25nIHNldmVyYWwgQmlsbGJvYXJkXG4gKiBvYmplY3RzLCBpbmRlcGVuZGVudCBvZiB0cmFuc2xhdGlvbiBvciByb3RhdGlvbiBwcm9wZXJ0aWVzLiBCZWNhdXNlIHlvdSBjYW5cbiAqIGNyZWF0ZSBtdWx0aXBsZSBCaWxsYm9hcmQgb2JqZWN0cyB0aGF0IHJlZmVyZW5jZSB0aGUgc2FtZSBCaXRtYXBEYXRhIG9iamVjdCxcbiAqIG11bHRpcGxlIGRpc3BsYXkgb2JqZWN0cyBjYW4gdXNlIHRoZSBzYW1lIGNvbXBsZXggQml0bWFwRGF0YSBvYmplY3Qgd2l0aG91dFxuICogaW5jdXJyaW5nIHRoZSBtZW1vcnkgb3ZlcmhlYWQgb2YgYSBCaXRtYXBEYXRhIG9iamVjdCBmb3IgZWFjaCBkaXNwbGF5XG4gKiBvYmplY3QgaW5zdGFuY2UuPC9wPlxuICpcbiAqIDxwPkEgQml0bWFwRGF0YSBvYmplY3QgY2FuIGJlIGRyYXduIHRvIHRoZSBzY3JlZW4gYnkgYSBCaWxsYm9hcmQgb2JqZWN0IGluIG9uZVxuICogb2YgdHdvIHdheXM6IGJ5IHVzaW5nIHRoZSBkZWZhdWx0IGhhcmR3YXJlIHJlbmRlcmVyIHdpdGggYSBzaW5nbGUgaGFyZHdhcmUgc3VyZmFjZSxcbiAqIG9yIGJ5IHVzaW5nIHRoZSBzbG93ZXIgc29mdHdhcmUgcmVuZGVyZXIgd2hlbiAzRCBhY2NlbGVyYXRpb24gaXMgbm90IGF2YWlsYWJsZS48L3A+XG4gKlxuICogPHA+SWYgeW91IHdvdWxkIHByZWZlciB0byBwZXJmb3JtIGEgYmF0Y2ggcmVuZGVyaW5nIGNvbW1hbmQsIHJhdGhlciB0aGFuIHVzaW5nIGFcbiAqIHNpbmdsZSBzdXJmYWNlIGZvciBlYWNoIEJpbGxib2FyZCBvYmplY3QsIHlvdSBjYW4gYWxzbyBkcmF3IHRvIHRoZSBzY3JlZW4gdXNpbmcgdGhlXG4gKiA8Y29kZT5kcmF3VGlsZXMoKTwvY29kZT4gb3IgPGNvZGU+ZHJhd1RyaWFuZ2xlcygpPC9jb2RlPiBtZXRob2RzIHdoaWNoIGFyZVxuICogYXZhaWxhYmxlIHRvIDxjb2RlPmZsYXNoLmRpc3BsYXkuVGlsZXNoZWV0PC9jb2RlPiBhbmQgPGNvZGU+Zmxhc2guZGlzcGxheS5HcmFwaGljc1xuICogb2JqZWN0cy48L2NvZGU+PC9wPlxuICpcbiAqIDxwPjxiPk5vdGU6PC9iPiBUaGUgQmlsbGJvYXJkIGNsYXNzIGlzIG5vdCBhIHN1YmNsYXNzIG9mIHRoZSBJbnRlcmFjdGl2ZU9iamVjdFxuICogY2xhc3MsIHNvIGl0IGNhbm5vdCBkaXNwYXRjaCBtb3VzZSBldmVudHMuIEhvd2V2ZXIsIHlvdSBjYW4gdXNlIHRoZVxuICogPGNvZGU+YWRkRXZlbnRMaXN0ZW5lcigpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciB0aGF0XG4gKiBjb250YWlucyB0aGUgQmlsbGJvYXJkIG9iamVjdC48L3A+XG4gKi9cblxuY2xhc3MgQmlsbGJvYXJkIGV4dGVuZHMgRGlzcGxheU9iamVjdCBpbXBsZW1lbnRzIElFbnRpdHksIElNYXRlcmlhbE93bmVyXG57XG5cdHByaXZhdGUgX2FuaW1hdG9yOklBbmltYXRvcjtcblx0cHJpdmF0ZSBfYmlsbGJvYXJkV2lkdGg6bnVtYmVyO1xuXHRwcml2YXRlIF9iaWxsYm9hcmRIZWlnaHQ6bnVtYmVyO1xuXHRwcml2YXRlIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XG5cdHByaXZhdGUgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xuXG5cdHByaXZhdGUgb25TaXplQ2hhbmdlZERlbGVnYXRlOihldmVudDpNYXRlcmlhbEV2ZW50KSA9PiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBhbmltYXRvciBvZiB0aGUgbWVzaC4gQWN0IG9uIHRoZSBtZXNoJ3MgZ2VvbWV0cnkuIERlZmF1bHRzIHRvIG51bGxcblx0ICovXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3Jcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuQklMTEJPQVJEO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBCaXRtYXBEYXRhIG9iamVjdCBiZWluZyByZWZlcmVuY2VkLlxuXHQgKi9cblx0cHVibGljIGJpdG1hcERhdGE6Qml0bWFwRGF0YTsgLy9UT0RPXG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJpbGxib2FyZEhlaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpbGxib2FyZEhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBiaWxsYm9hcmRXaWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpbGxib2FyZFdpZHRoO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOk1hdGVyaWFsQmFzZSlcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9tYXRlcmlhbClcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICh0aGlzLl9tYXRlcmlhbCkge1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuaVJlbW92ZU93bmVyKHRoaXMpO1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihNYXRlcmlhbEV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUpO1xuXHRcdH1cblxuXG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9tYXRlcmlhbCkge1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuaUFkZE93bmVyKHRoaXMpO1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuYWRkRXZlbnRMaXN0ZW5lcihNYXRlcmlhbEV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgQmlsbGJvYXJkIG9iamVjdCBpcyBzbmFwcGVkIHRvIHRoZSBuZWFyZXN0IHBpeGVsLlxuXHQgKiBUaGlzIHZhbHVlIGlzIGlnbm9yZWQgaW4gdGhlIG5hdGl2ZSBhbmQgSFRNTDUgdGFyZ2V0cy5cblx0ICogVGhlIFBpeGVsU25hcHBpbmcgY2xhc3MgaW5jbHVkZXMgcG9zc2libGUgdmFsdWVzOlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPjxjb2RlPlBpeGVsU25hcHBpbmcuTkVWRVI8L2NvZGU+IC0gTm8gcGl4ZWwgc25hcHBpbmcgb2NjdXJzLjwvbGk+XG5cdCAqICAgPGxpPjxjb2RlPlBpeGVsU25hcHBpbmcuQUxXQVlTPC9jb2RlPiAtIFRoZSBpbWFnZSBpcyBhbHdheXMgc25hcHBlZCB0b1xuXHQgKiB0aGUgbmVhcmVzdCBwaXhlbCwgaW5kZXBlbmRlbnQgb2YgdHJhbnNmb3JtYXRpb24uPC9saT5cblx0ICogICA8bGk+PGNvZGU+UGl4ZWxTbmFwcGluZy5BVVRPPC9jb2RlPiAtIFRoZSBpbWFnZSBpcyBzbmFwcGVkIHRvIHRoZVxuXHQgKiBuZWFyZXN0IHBpeGVsIGlmIGl0IGlzIGRyYXduIHdpdGggbm8gcm90YXRpb24gb3Igc2tldyBhbmQgaXQgaXMgZHJhd24gYXQgYVxuXHQgKiBzY2FsZSBmYWN0b3Igb2YgOTkuOSUgdG8gMTAwLjElLiBJZiB0aGVzZSBjb25kaXRpb25zIGFyZSBzYXRpc2ZpZWQsIHRoZVxuXHQgKiBiaXRtYXAgaW1hZ2UgaXMgZHJhd24gYXQgMTAwJSBzY2FsZSwgc25hcHBlZCB0byB0aGUgbmVhcmVzdCBwaXhlbC5cblx0ICogV2hlbiB0YXJnZXRpbmcgRmxhc2ggUGxheWVyLCB0aGlzIHZhbHVlIGFsbG93cyB0aGUgaW1hZ2UgdG8gYmUgZHJhd24gYXMgZmFzdFxuXHQgKiBhcyBwb3NzaWJsZSB1c2luZyB0aGUgaW50ZXJuYWwgdmVjdG9yIHJlbmRlcmVyLjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqL1xuXHRwdWJsaWMgcGl4ZWxTbmFwcGluZzpzdHJpbmc7IC8vVE9ET1xuXG5cdC8qKlxuXHQgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgYml0bWFwIGlzIHNtb290aGVkIHdoZW4gc2NhbGVkLiBJZlxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIGJpdG1hcCBpcyBzbW9vdGhlZCB3aGVuIHNjYWxlZC4gSWZcblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgYml0bWFwIGlzIG5vdCBzbW9vdGhlZCB3aGVuIHNjYWxlZC5cblx0ICovXG5cdHB1YmxpYyBzbW9vdGhpbmc6Ym9vbGVhbjsgLy9UT0RPXG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cblx0e1xuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXG5cdHtcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IobWF0ZXJpYWw6TWF0ZXJpYWxCYXNlLCBwaXhlbFNuYXBwaW5nOnN0cmluZyA9IFwiYXV0b1wiLCBzbW9vdGhpbmc6Ym9vbGVhbiA9IGZhbHNlKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XG5cblx0XHR0aGlzLm9uU2l6ZUNoYW5nZWREZWxlZ2F0ZSA9IChldmVudDpNYXRlcmlhbEV2ZW50KSA9PiB0aGlzLm9uU2l6ZUNoYW5nZWQoZXZlbnQpO1xuXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0dGhpcy5fYmlsbGJvYXJkV2lkdGggPSBtYXRlcmlhbC53aWR0aDtcblx0XHR0aGlzLl9iaWxsYm9hcmRIZWlnaHQgPSBtYXRlcmlhbC5oZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlKCk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBFbnRpdHlOb2RlKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwVXBkYXRlQm91bmRzKClcblx0e1xuXHRcdHRoaXMuX3BCb3VuZHMuZnJvbUV4dHJlbWVzKDAsIDAsIDAsIHRoaXMuX2JpbGxib2FyZFdpZHRoLCB0aGlzLl9iaWxsYm9hcmRIZWlnaHQsIDApO1xuXG5cdFx0c3VwZXIucFVwZGF0ZUJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIC8vVE9ET1xuXHQgKlxuXHQgKiBAcGFyYW0gc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZVxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3Rcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pVGVzdENvbGxpc2lvbihzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlOm51bWJlciwgZmluZENsb3Nlc3Q6Ym9vbGVhbik6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXIudGVzdEJpbGxib2FyZENvbGxpc2lvbih0aGlzLCB0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPLCBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBvblNpemVDaGFuZ2VkKGV2ZW50Ok1hdGVyaWFsRXZlbnQpXG5cdHtcblx0XHR0aGlzLl9iaWxsYm9hcmRXaWR0aCA9IHRoaXMuX21hdGVyaWFsLndpZHRoO1xuXHRcdHRoaXMuX2JpbGxib2FyZEhlaWdodCA9IHRoaXMuX21hdGVyaWFsLmhlaWdodDtcblxuXHRcdHRoaXMuX3BCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3BSZW5kZXJhYmxlc1tpXS5pbnZhbGlkYXRlVmVydGV4RGF0YShcInZlcnRpY2VzXCIpOyAvL1RPRE9cblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlcyhyZW5kZXJlcjpJUmVuZGVyZXIpXG5cdHtcblx0XHQvLyBTaW5jZSB0aGlzIGdldHRlciBpcyBpbnZva2VkIGV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgcmVuZGVyIGxvb3AsIGFuZFxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0dGhpcy5faUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyKTtcblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyOklSZW5kZXJlcilcblx0e1xuXHRcdHJlbmRlcmVyLmFwcGx5QmlsbGJvYXJkKHRoaXMpO1xuXHR9XG59XG5cbmV4cG9ydCA9IEJpbGxib2FyZDsiXX0=