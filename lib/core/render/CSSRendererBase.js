var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Point = require("awayjs-core/lib/core/geom/Point");
var Rectangle = require("awayjs-core/lib/core/geom/Rectangle");

var CSSBillboardRenderable = require("awayjs-core/lib/core/pool/CSSBillboardRenderable");
var CSSLineSegmentRenderable = require("awayjs-core/lib/core/pool/CSSLineSegmentRenderable");

var RenderablePool = require("awayjs-core/lib/core/pool/RenderablePool");

var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var RendererEvent = require("awayjs-core/lib/events/RendererEvent");

/**
* RendererBase forms an abstract base class for classes that are used in the rendering pipeline to render the
* contents of a partition
*
* @class away.render.RendererBase
*/
var CSSRendererBase = (function (_super) {
    __extends(CSSRendererBase, _super);
    /**
    * Creates a new RendererBase object.
    */
    function CSSRendererBase(renderToTexture, forceSoftware, profile) {
        if (typeof renderToTexture === "undefined") { renderToTexture = false; }
        if (typeof forceSoftware === "undefined") { forceSoftware = false; }
        if (typeof profile === "undefined") { profile = "baseline"; }
        _super.call(this);
        this._backgroundR = 0;
        this._backgroundG = 0;
        this._backgroundB = 0;
        this._backgroundAlpha = 1;
        this._shareContext = false;
        this._pBackBufferInvalid = true;
        this._depthTextureInvalid = true;
        this._viewPort = new Rectangle();
        this._scissorRect = new Rectangle();
        this._localPos = new Point();
        this._globalPos = new Point();

        this._billboardRenderablePool = RenderablePool.getPool(CSSBillboardRenderable);
        this._lineSegmentRenderablePool = RenderablePool.getPool(CSSLineSegmentRenderable);

        this._viewPort = new Rectangle();

        if (this._width == 0)
            this.width = window.innerWidth;

        if (this._height == 0)
            this.height = window.innerHeight;
    }
    Object.defineProperty(CSSRendererBase.prototype, "viewPort", {
        /**
        * A viewPort rectangle equivalent of the StageGL size and position.
        */
        get: function () {
            return this._viewPort;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CSSRendererBase.prototype, "scissorRect", {
        /**
        * A scissor rectangle equivalent of the view size and position.
        */
        get: function () {
            return this._scissorRect;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(CSSRendererBase.prototype, "x", {
        /**
        *
        */
        get: function () {
            return this._localPos.x;
        },
        set: function (value) {
            if (this.x == value)
                return;

            this.updateGlobalPos();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(CSSRendererBase.prototype, "y", {
        /**
        *
        */
        get: function () {
            return this._localPos.y;
        },
        set: function (value) {
            if (this.y == value)
                return;

            this._globalPos.y = this._localPos.y = value;

            this.updateGlobalPos();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(CSSRendererBase.prototype, "width", {
        /**
        *
        */
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (this._width == value)
                return;

            this._width = value;
            this._scissorRect.width = value;
            this._viewPort.width = value;

            this._pBackBufferInvalid = true;
            this._depthTextureInvalid = true;

            this.notifyViewportUpdate();
            this.notifyScissorUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(CSSRendererBase.prototype, "height", {
        /**
        *
        */
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (this._height == value)
                return;

            this._height = value;
            this._scissorRect.height = value;
            this._viewPort.height = value;

            this._pBackBufferInvalid = true;
            this._depthTextureInvalid = true;

            this.notifyViewportUpdate();
            this.notifyScissorUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundR", {
        /**
        * The background color's red component, used when clearing.
        *
        * @private
        */
        get: function () {
            return this._backgroundR;
        },
        set: function (value) {
            if (this._backgroundR == value)
                return;

            this._backgroundR = value;

            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundG", {
        /**
        * The background color's green component, used when clearing.
        *
        * @private
        */
        get: function () {
            return this._backgroundG;
        },
        set: function (value) {
            if (this._backgroundG == value)
                return;

            this._backgroundG = value;

            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundB", {
        /**
        * The background color's blue component, used when clearing.
        *
        * @private
        */
        get: function () {
            return this._backgroundB;
        },
        set: function (value) {
            if (this._backgroundB == value)
                return;

            this._backgroundB = value;

            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(CSSRendererBase.prototype, "shareContext", {
        get: function () {
            return this._shareContext;
        },
        set: function (value) {
            if (this._shareContext == value)
                return;

            this._shareContext = value;

            this.updateGlobalPos();
        },
        enumerable: true,
        configurable: true
    });


    /**
    * Disposes the resources used by the RendererBase.
    */
    CSSRendererBase.prototype.dispose = function () {
        /*
        if (_backgroundImageRenderer) {
        _backgroundImageRenderer.dispose();
        _backgroundImageRenderer = null;
        }
        */
    };

    CSSRendererBase.prototype.render = function (entityCollector) {
        this._viewportDirty = false;
        this._scissorDirty = false;
    };

    /**
    * Renders the potentially visible geometry to the back buffer or texture.
    * @param entityCollector The EntityCollector object containing the potentially visible geometry.
    * @param scissorRect
    */
    CSSRendererBase.prototype._iRender = function (entityCollector, target, scissorRect, surfaceSelector) {
        if (typeof target === "undefined") { target = null; }
        if (typeof scissorRect === "undefined") { scissorRect = null; }
        if (typeof surfaceSelector === "undefined") { surfaceSelector = 0; }
        if (!entityCollector.entityHead)
            return;

        this.pExecuteRender(entityCollector, scissorRect);
    };

    CSSRendererBase.prototype._iRenderCascades = function (entityCollector, target, numCascades, scissorRects, cameras) {
    };
    CSSRendererBase.prototype.pCollectRenderables = function (entityCollector) {
        //reset head values
        this._renderableHead = null;

        //grab entity head
        var item = entityCollector.entityHead;

        //set temp values for entry point and camera forward vector
        this._pCamera = entityCollector.camera;
        this._iEntryPoint = this._pCamera.scenePosition;
        this._pCameraForward = this._pCamera.transform.forwardVector;

        while (item) {
            item.entity._iCollectRenderables(this);
            item = item.next;
        }
    };

    /**
    * Renders the potentially visible geometry to the back buffer or texture. Only executed if everything is set up.
    * @param entityCollector The EntityCollector object containing the potentially visible geometry.
    * @param scissorRect
    */
    CSSRendererBase.prototype.pExecuteRender = function (entityCollector, scissorRect) {
        if (typeof scissorRect === "undefined") { scissorRect = null; }
        this.pCollectRenderables(entityCollector);

        this.pDraw(entityCollector);
    };

    /**
    * Performs the actual drawing of dom objects to the target.
    *
    * @param entityCollector The EntityCollector object containing the potentially visible dom objects.
    */
    CSSRendererBase.prototype.pDraw = function (entityCollector) {
        throw new AbstractMethodError();
    };

    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundAlpha", {
        get: function () {
            return this._backgroundAlpha;
        },
        set: function (value) {
            if (this._backgroundAlpha == value)
                return;

            this._backgroundAlpha = value;

            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });


    /**
    *
    * @param billboard
    */
    CSSRendererBase.prototype.applyBillboard = function (billboard) {
        this._applyRenderable(this._billboardRenderablePool.getItem(billboard));
    };

    /**
    *
    * @param lineSubMesh
    */
    CSSRendererBase.prototype.applyLineSubMesh = function (lineSubMesh) {
        //this._applyRenderable(<CSSRenderableBase> this._billboardRenderablePool.getItem(lineSegment));
    };

    /**
    *
    * @param skybox
    */
    CSSRendererBase.prototype.applySkybox = function (skybox) {
    };

    /**
    *
    * @param triangleSubMesh
    */
    CSSRendererBase.prototype.applyTriangleSubMesh = function (triangleSubMesh) {
    };

    /**
    *
    * @param renderable
    * @private
    */
    CSSRendererBase.prototype._applyRenderable = function (renderable) {
        var material = renderable.materialOwner.material;
        var entity = renderable.sourceEntity;
        var position = entity.scenePosition;

        if (material) {
            //set ids for faster referencing
            renderable.materialId = material._iMaterialId;

            //				renderable.renderOrderId = material._iRenderOrderId;
            renderable.cascaded = false;

            // project onto camera's z-axis
            position = this._iEntryPoint.subtract(position);
            renderable.zIndex = entity.zOffset - position.dotProduct(this._pCameraForward);

            //store reference to scene transform
            renderable.renderSceneTransform = renderable.sourceEntity.getRenderSceneTransform(this._pCamera);

            //store reference to next item in list
            renderable.next = this._renderableHead;
            this._renderableHead = renderable;
        }
    };

    /**
    * @private
    */
    CSSRendererBase.prototype.notifyScissorUpdate = function () {
        if (this._scissorDirty)
            return;

        this._scissorDirty = true;

        if (!this._scissorUpdated)
            this._scissorUpdated = new RendererEvent(RendererEvent.SCISSOR_UPDATED);

        this.dispatchEvent(this._scissorUpdated);
    };

    /**
    * @private
    */
    CSSRendererBase.prototype.notifyViewportUpdate = function () {
        if (this._viewportDirty)
            return;

        this._viewportDirty = true;

        if (!this._viewPortUpdated)
            this._viewPortUpdated = new RendererEvent(RendererEvent.VIEWPORT_UPDATED);

        this.dispatchEvent(this._viewPortUpdated);
    };

    /**
    *
    */
    CSSRendererBase.prototype.updateGlobalPos = function () {
        this._viewPort.x = this._globalPos.x;
        this._viewPort.y = this._globalPos.y;

        this.notifyViewportUpdate();
        this.notifyScissorUpdate();
    };

    CSSRendererBase.prototype._iCreateEntityCollector = function () {
        throw new AbstractMethodError();
    };
    return CSSRendererBase;
})(EventDispatcher);

module.exports = CSSRendererBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcmVuZGVyL0NTU1JlbmRlcmVyQmFzZS50cyJdLCJuYW1lcyI6WyJDU1NSZW5kZXJlckJhc2UiLCJDU1NSZW5kZXJlckJhc2UuY29uc3RydWN0b3IiLCJDU1NSZW5kZXJlckJhc2UuZGlzcG9zZSIsIkNTU1JlbmRlcmVyQmFzZS5yZW5kZXIiLCJDU1NSZW5kZXJlckJhc2UuX2lSZW5kZXIiLCJDU1NSZW5kZXJlckJhc2UuX2lSZW5kZXJDYXNjYWRlcyIsIkNTU1JlbmRlcmVyQmFzZS5wQ29sbGVjdFJlbmRlcmFibGVzIiwiQ1NTUmVuZGVyZXJCYXNlLnBFeGVjdXRlUmVuZGVyIiwiQ1NTUmVuZGVyZXJCYXNlLnBEcmF3IiwiQ1NTUmVuZGVyZXJCYXNlLmFwcGx5QmlsbGJvYXJkIiwiQ1NTUmVuZGVyZXJCYXNlLmFwcGx5TGluZVN1Yk1lc2giLCJDU1NSZW5kZXJlckJhc2UuYXBwbHlTa3lib3giLCJDU1NSZW5kZXJlckJhc2UuYXBwbHlUcmlhbmdsZVN1Yk1lc2giLCJDU1NSZW5kZXJlckJhc2UuX2FwcGx5UmVuZGVyYWJsZSIsIkNTU1JlbmRlcmVyQmFzZS5ub3RpZnlTY2lzc29yVXBkYXRlIiwiQ1NTUmVuZGVyZXJCYXNlLm5vdGlmeVZpZXdwb3J0VXBkYXRlIiwiQ1NTUmVuZGVyZXJCYXNlLnVwZGF0ZUdsb2JhbFBvcyIsIkNTU1JlbmRlcmVyQmFzZS5faUNyZWF0ZUVudGl0eUNvbGxlY3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBRStEO0FBQy9ELDhEQUFzRTs7QUFFdEUsd0ZBQTZGO0FBQzdGLDRGQUFpRzs7QUFHakcsd0VBQStFOztBQVUvRSwrRUFBcUY7QUFDckYsdUVBQThFO0FBQzlFLG1FQUEwRTs7QUFJMUU7Ozs7O0VBS0c7QUFDSDtJQUE4QkEsa0NBQWVBO0lBNEk1Q0E7O01BREdBO0lBQ0hBLHlCQUFZQSxlQUErQkEsRUFBRUEsYUFBNkJBLEVBQUVBLE9BQTJCQTtRQUEzRkMsOENBQUFBLGVBQWVBLEdBQVdBLEtBQUtB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QUFDQTtJQUNGakIsdUJBQUNBO0FBQURBLENBQUNBLEVBemI2QixlQUFlLEVBeWI1Qzs7QUFFRCxnQ0FBeUIsQ0FBQSIsImZpbGUiOiJjb3JlL3JlbmRlci9DU1NSZW5kZXJlckJhc2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluZVN1Yk1lc2hcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9MaW5lU3ViTWVzaFwiKTtcbmltcG9ydCBUcmlhbmdsZVN1Yk1lc2hcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvVHJpYW5nbGVTdWJNZXNoXCIpO1xuaW1wb3J0IFBvaW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9Qb2ludFwiKTtcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IENTU0JpbGxib2FyZFJlbmRlcmFibGVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcG9vbC9DU1NCaWxsYm9hcmRSZW5kZXJhYmxlXCIpO1xuaW1wb3J0IENTU0xpbmVTZWdtZW50UmVuZGVyYWJsZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9wb29sL0NTU0xpbmVTZWdtZW50UmVuZGVyYWJsZVwiKTtcbmltcG9ydCBDU1NSZW5kZXJhYmxlQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvQ1NTUmVuZGVyYWJsZUJhc2VcIik7XG5pbXBvcnQgRW50aXR5TGlzdEl0ZW1cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvRW50aXR5TGlzdEl0ZW1cIik7XG5pbXBvcnQgUmVuZGVyYWJsZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvUmVuZGVyYWJsZVBvb2xcIik7XG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3JlbmRlci9JUmVuZGVyZXJcIik7XG5pbXBvcnQgSUVudGl0eVNvcnRlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvc29ydC9JRW50aXR5U29ydGVyXCIpO1xuaW1wb3J0IENTU0VudGl0eUNvbGxlY3Rvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RyYXZlcnNlL0NTU0VudGl0eUNvbGxlY3RvclwiKTtcbmltcG9ydCBFbnRpdHlDb2xsZWN0b3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RyYXZlcnNlL0VudGl0eUNvbGxlY3RvclwiKTtcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XG5pbXBvcnQgQmlsbGJvYXJkXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9CaWxsYm9hcmRcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5pbXBvcnQgU2t5Ym94XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL1NreWJveFwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XG5pbXBvcnQgUmVuZGVyZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9SZW5kZXJlckV2ZW50XCIpO1xuaW1wb3J0IENTU01hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL21hdGVyaWFscy9DU1NNYXRlcmlhbEJhc2VcIik7XG5pbXBvcnQgVGV4dHVyZVByb3h5QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL1RleHR1cmVQcm94eUJhc2VcIik7XG5cbi8qKlxuICogUmVuZGVyZXJCYXNlIGZvcm1zIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGNsYXNzZXMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgcmVuZGVyaW5nIHBpcGVsaW5lIHRvIHJlbmRlciB0aGVcbiAqIGNvbnRlbnRzIG9mIGEgcGFydGl0aW9uXG4gKlxuICogQGNsYXNzIGF3YXkucmVuZGVyLlJlbmRlcmVyQmFzZVxuICovXG5jbGFzcyBDU1NSZW5kZXJlckJhc2UgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbntcblx0cHJpdmF0ZSBfYmlsbGJvYXJkUmVuZGVyYWJsZVBvb2w6UmVuZGVyYWJsZVBvb2w7XG5cdHByaXZhdGUgX2xpbmVTZWdtZW50UmVuZGVyYWJsZVBvb2w6UmVuZGVyYWJsZVBvb2w7XG5cblx0cHVibGljIF9wQ2FtZXJhOkNhbWVyYTtcblx0cHVibGljIF9pRW50cnlQb2ludDpWZWN0b3IzRDtcblx0cHVibGljIF9wQ2FtZXJhRm9yd2FyZDpWZWN0b3IzRDtcblxuXHRwcml2YXRlIF9iYWNrZ3JvdW5kUjpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9iYWNrZ3JvdW5kRzpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9iYWNrZ3JvdW5kQjpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9iYWNrZ3JvdW5kQWxwaGE6bnVtYmVyID0gMTtcblx0cHJpdmF0ZSBfc2hhcmVDb250ZXh0OmJvb2xlYW4gPSBmYWxzZTtcblxuXHRwdWJsaWMgX3BCYWNrQnVmZmVySW52YWxpZDpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9kZXB0aFRleHR1cmVJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xuXG5cdHB1YmxpYyBfcmVuZGVyYWJsZUhlYWQ6Q1NTUmVuZGVyYWJsZUJhc2U7XG5cblx0cHVibGljIF93aWR0aDpudW1iZXI7XG5cdHB1YmxpYyBfaGVpZ2h0Om51bWJlcjtcblxuXHRwcml2YXRlIF92aWV3UG9ydDpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cdHByaXZhdGUgX3ZpZXdwb3J0RGlydHk6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfc2Npc3NvclJlY3Q6UmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuXHRwcml2YXRlIF9zY2lzc29yRGlydHk6Ym9vbGVhbjtcblxuXHRwcml2YXRlIF9sb2NhbFBvczpQb2ludCA9IG5ldyBQb2ludCgpO1xuXHRwcml2YXRlIF9nbG9iYWxQb3M6UG9pbnQgPSBuZXcgUG9pbnQoKTtcblxuXHRwcml2YXRlIF9zY2lzc29yVXBkYXRlZDpSZW5kZXJlckV2ZW50O1xuXHRwcml2YXRlIF92aWV3UG9ydFVwZGF0ZWQ6UmVuZGVyZXJFdmVudDtcblxuXHQvKipcblx0ICogQSB2aWV3UG9ydCByZWN0YW5nbGUgZXF1aXZhbGVudCBvZiB0aGUgU3RhZ2VHTCBzaXplIGFuZCBwb3NpdGlvbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgdmlld1BvcnQoKTpSZWN0YW5nbGVcblx0e1xuXHRcdHJldHVybiB0aGlzLl92aWV3UG9ydDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNjaXNzb3IgcmVjdGFuZ2xlIGVxdWl2YWxlbnQgb2YgdGhlIHZpZXcgc2l6ZSBhbmQgcG9zaXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjaXNzb3JSZWN0KCk6UmVjdGFuZ2xlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2Npc3NvclJlY3Q7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgeCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvY2FsUG9zLng7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMueCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMudXBkYXRlR2xvYmFsUG9zKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgeSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvY2FsUG9zLnk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHkodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMueSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2dsb2JhbFBvcy55ID0gdGhpcy5fbG9jYWxQb3MueSA9IHZhbHVlO1xuXG5cdFx0dGhpcy51cGRhdGVHbG9iYWxQb3MoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xuXHR9XG5cblx0cHVibGljIHNldCB3aWR0aCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fd2lkdGggPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl93aWR0aCA9IHZhbHVlO1xuXHRcdHRoaXMuX3NjaXNzb3JSZWN0LndpZHRoID0gdmFsdWU7XG5cdFx0dGhpcy5fdmlld1BvcnQud2lkdGggPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IHRydWU7XG5cdFx0dGhpcy5fZGVwdGhUZXh0dXJlSW52YWxpZCA9IHRydWU7XG5cblx0XHR0aGlzLm5vdGlmeVZpZXdwb3J0VXBkYXRlKCk7XG5cdFx0dGhpcy5ub3RpZnlTY2lzc29yVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIHNldCBoZWlnaHQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2hlaWdodCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuXHRcdHRoaXMuX3NjaXNzb3JSZWN0LmhlaWdodCA9IHZhbHVlO1xuXHRcdHRoaXMuX3ZpZXdQb3J0LmhlaWdodCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEJhY2tCdWZmZXJJbnZhbGlkID0gdHJ1ZTtcblx0XHR0aGlzLl9kZXB0aFRleHR1cmVJbnZhbGlkID0gdHJ1ZTtcblxuXHRcdHRoaXMubm90aWZ5Vmlld3BvcnRVcGRhdGUoKTtcblx0XHR0aGlzLm5vdGlmeVNjaXNzb3JVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHJlbmRlcmFibGVTb3J0ZXI6SUVudGl0eVNvcnRlcjtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBSZW5kZXJlckJhc2Ugb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IocmVuZGVyVG9UZXh0dXJlOmJvb2xlYW4gPSBmYWxzZSwgZm9yY2VTb2Z0d2FyZTpib29sZWFuID0gZmFsc2UsIHByb2ZpbGU6c3RyaW5nID0gXCJiYXNlbGluZVwiKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX2JpbGxib2FyZFJlbmRlcmFibGVQb29sID0gUmVuZGVyYWJsZVBvb2wuZ2V0UG9vbChDU1NCaWxsYm9hcmRSZW5kZXJhYmxlKTtcblx0XHR0aGlzLl9saW5lU2VnbWVudFJlbmRlcmFibGVQb29sID0gUmVuZGVyYWJsZVBvb2wuZ2V0UG9vbChDU1NMaW5lU2VnbWVudFJlbmRlcmFibGUpO1xuXG5cdFx0dGhpcy5fdmlld1BvcnQgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cblx0XHRpZiAodGhpcy5fd2lkdGggPT0gMClcblx0XHRcdHRoaXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuXHRcdGlmICh0aGlzLl9oZWlnaHQgPT0gMClcblx0XHRcdHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBiYWNrZ3JvdW5kIGNvbG9yJ3MgcmVkIGNvbXBvbmVudCwgdXNlZCB3aGVuIGNsZWFyaW5nLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIGdldCBfaUJhY2tncm91bmRSKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYmFja2dyb3VuZFI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IF9pQmFja2dyb3VuZFIodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2JhY2tncm91bmRSID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYmFja2dyb3VuZFIgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGJhY2tncm91bmQgY29sb3IncyBncmVlbiBjb21wb25lbnQsIHVzZWQgd2hlbiBjbGVhcmluZy5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lCYWNrZ3JvdW5kRygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JhY2tncm91bmRHO1xuXHR9XG5cblx0cHVibGljIHNldCBfaUJhY2tncm91bmRHKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9iYWNrZ3JvdW5kRyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JhY2tncm91bmRHID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBiYWNrZ3JvdW5kIGNvbG9yJ3MgYmx1ZSBjb21wb25lbnQsIHVzZWQgd2hlbiBjbGVhcmluZy5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lCYWNrZ3JvdW5kQigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JhY2tncm91bmRCO1xuXHR9XG5cblx0cHVibGljIHNldCBfaUJhY2tncm91bmRCKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9iYWNrZ3JvdW5kQiA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JhY2tncm91bmRCID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSB0cnVlO1xuXHR9XG5cblx0cHVibGljIGdldCBzaGFyZUNvbnRleHQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hhcmVDb250ZXh0O1xuXHR9XG5cblx0cHVibGljIHNldCBzaGFyZUNvbnRleHQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9zaGFyZUNvbnRleHQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zaGFyZUNvbnRleHQgPSB2YWx1ZTtcblxuXHRcdHRoaXMudXBkYXRlR2xvYmFsUG9zKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzcG9zZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBSZW5kZXJlckJhc2UuXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHQvKlxuXHRcdCBpZiAoX2JhY2tncm91bmRJbWFnZVJlbmRlcmVyKSB7XG5cdFx0IF9iYWNrZ3JvdW5kSW1hZ2VSZW5kZXJlci5kaXNwb3NlKCk7XG5cdFx0IF9iYWNrZ3JvdW5kSW1hZ2VSZW5kZXJlciA9IG51bGw7XG5cdFx0IH1cblx0XHQgKi9cblx0fVxuXG5cdHB1YmxpYyByZW5kZXIoZW50aXR5Q29sbGVjdG9yOklDb2xsZWN0b3IpXG5cdHtcblx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fc2Npc3NvckRpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVycyB0aGUgcG90ZW50aWFsbHkgdmlzaWJsZSBnZW9tZXRyeSB0byB0aGUgYmFjayBidWZmZXIgb3IgdGV4dHVyZS5cblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvciBUaGUgRW50aXR5Q29sbGVjdG9yIG9iamVjdCBjb250YWluaW5nIHRoZSBwb3RlbnRpYWxseSB2aXNpYmxlIGdlb21ldHJ5LlxuXHQgKiBAcGFyYW0gc2Npc3NvclJlY3Rcblx0ICovXG5cdHB1YmxpYyBfaVJlbmRlcihlbnRpdHlDb2xsZWN0b3I6RW50aXR5Q29sbGVjdG9yLCB0YXJnZXQ6VGV4dHVyZVByb3h5QmFzZSA9IG51bGwsIHNjaXNzb3JSZWN0OlJlY3RhbmdsZSA9IG51bGwsIHN1cmZhY2VTZWxlY3RvcjpudW1iZXIgPSAwKVxuXHR7XG5cdFx0aWYgKCFlbnRpdHlDb2xsZWN0b3IuZW50aXR5SGVhZClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMucEV4ZWN1dGVSZW5kZXIoZW50aXR5Q29sbGVjdG9yLCBzY2lzc29yUmVjdCk7XG5cdH1cblxuXHRwdWJsaWMgX2lSZW5kZXJDYXNjYWRlcyhlbnRpdHlDb2xsZWN0b3I6SUNvbGxlY3RvciwgdGFyZ2V0OlRleHR1cmVQcm94eUJhc2UsIG51bUNhc2NhZGVzOm51bWJlciwgc2Npc3NvclJlY3RzOkFycmF5PFJlY3RhbmdsZT4sIGNhbWVyYXM6QXJyYXk8Q2FtZXJhPilcblx0e1xuXG5cdH1cblx0cHVibGljIHBDb2xsZWN0UmVuZGVyYWJsZXMoZW50aXR5Q29sbGVjdG9yOklDb2xsZWN0b3IpXG5cdHtcblx0XHQvL3Jlc2V0IGhlYWQgdmFsdWVzXG5cdFx0dGhpcy5fcmVuZGVyYWJsZUhlYWQgPSBudWxsO1xuXG5cdFx0Ly9ncmFiIGVudGl0eSBoZWFkXG5cdFx0dmFyIGl0ZW06RW50aXR5TGlzdEl0ZW0gPSBlbnRpdHlDb2xsZWN0b3IuZW50aXR5SGVhZDtcblxuXHRcdC8vc2V0IHRlbXAgdmFsdWVzIGZvciBlbnRyeSBwb2ludCBhbmQgY2FtZXJhIGZvcndhcmQgdmVjdG9yXG5cdFx0dGhpcy5fcENhbWVyYSA9IGVudGl0eUNvbGxlY3Rvci5jYW1lcmE7XG5cdFx0dGhpcy5faUVudHJ5UG9pbnQgPSB0aGlzLl9wQ2FtZXJhLnNjZW5lUG9zaXRpb247XG5cdFx0dGhpcy5fcENhbWVyYUZvcndhcmQgPSB0aGlzLl9wQ2FtZXJhLnRyYW5zZm9ybS5mb3J3YXJkVmVjdG9yO1xuXG5cdFx0Ly9pdGVyYXRlIHRocm91Z2ggYWxsIGVudGl0aWVzXG5cdFx0d2hpbGUgKGl0ZW0pIHtcblx0XHRcdGl0ZW0uZW50aXR5Ll9pQ29sbGVjdFJlbmRlcmFibGVzKHRoaXMpO1xuXHRcdFx0aXRlbSA9IGl0ZW0ubmV4dDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVycyB0aGUgcG90ZW50aWFsbHkgdmlzaWJsZSBnZW9tZXRyeSB0byB0aGUgYmFjayBidWZmZXIgb3IgdGV4dHVyZS4gT25seSBleGVjdXRlZCBpZiBldmVyeXRoaW5nIGlzIHNldCB1cC5cblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvciBUaGUgRW50aXR5Q29sbGVjdG9yIG9iamVjdCBjb250YWluaW5nIHRoZSBwb3RlbnRpYWxseSB2aXNpYmxlIGdlb21ldHJ5LlxuXHQgKiBAcGFyYW0gc2Npc3NvclJlY3Rcblx0ICovXG5cdHB1YmxpYyBwRXhlY3V0ZVJlbmRlcihlbnRpdHlDb2xsZWN0b3I6Q1NTRW50aXR5Q29sbGVjdG9yLCBzY2lzc29yUmVjdDpSZWN0YW5nbGUgPSBudWxsKVxuXHR7XG5cdFx0dGhpcy5wQ29sbGVjdFJlbmRlcmFibGVzKGVudGl0eUNvbGxlY3Rvcik7XG5cblx0XHR0aGlzLnBEcmF3KGVudGl0eUNvbGxlY3Rvcik7XG5cdH1cblxuXHQvKipcblx0ICogUGVyZm9ybXMgdGhlIGFjdHVhbCBkcmF3aW5nIG9mIGRvbSBvYmplY3RzIHRvIHRoZSB0YXJnZXQuXG5cdCAqXG5cdCAqIEBwYXJhbSBlbnRpdHlDb2xsZWN0b3IgVGhlIEVudGl0eUNvbGxlY3RvciBvYmplY3QgY29udGFpbmluZyB0aGUgcG90ZW50aWFsbHkgdmlzaWJsZSBkb20gb2JqZWN0cy5cblx0ICovXG5cdHB1YmxpYyBwRHJhdyhlbnRpdHlDb2xsZWN0b3I6Q1NTRW50aXR5Q29sbGVjdG9yKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgX2lCYWNrZ3JvdW5kQWxwaGEoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kQWxwaGE7XG5cdH1cblxuXHRwdWJsaWMgc2V0IF9pQmFja2dyb3VuZEFscGhhKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9iYWNrZ3JvdW5kQWxwaGEgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9iYWNrZ3JvdW5kQWxwaGEgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGJpbGxib2FyZFxuXHQgKi9cblx0cHVibGljIGFwcGx5QmlsbGJvYXJkKGJpbGxib2FyZDpCaWxsYm9hcmQpXG5cdHtcblx0XHR0aGlzLl9hcHBseVJlbmRlcmFibGUoPENTU1JlbmRlcmFibGVCYXNlPiB0aGlzLl9iaWxsYm9hcmRSZW5kZXJhYmxlUG9vbC5nZXRJdGVtKGJpbGxib2FyZCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBsaW5lU3ViTWVzaFxuXHQgKi9cblx0cHVibGljIGFwcGx5TGluZVN1Yk1lc2gobGluZVN1Yk1lc2g6TGluZVN1Yk1lc2gpXG5cdHtcblx0XHQvL3RoaXMuX2FwcGx5UmVuZGVyYWJsZSg8Q1NTUmVuZGVyYWJsZUJhc2U+IHRoaXMuX2JpbGxib2FyZFJlbmRlcmFibGVQb29sLmdldEl0ZW0obGluZVNlZ21lbnQpKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gc2t5Ym94XG5cdCAqL1xuXHRwdWJsaWMgYXBwbHlTa3lib3goc2t5Ym94OlNreWJveClcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHRyaWFuZ2xlU3ViTWVzaFxuXHQgKi9cblx0cHVibGljIGFwcGx5VHJpYW5nbGVTdWJNZXNoKHRyaWFuZ2xlU3ViTWVzaDpUcmlhbmdsZVN1Yk1lc2gpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSByZW5kZXJhYmxlXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIF9hcHBseVJlbmRlcmFibGUocmVuZGVyYWJsZTpDU1NSZW5kZXJhYmxlQmFzZSlcblx0e1xuXHRcdHZhciBtYXRlcmlhbDpDU1NNYXRlcmlhbEJhc2UgPSA8Q1NTTWF0ZXJpYWxCYXNlPiByZW5kZXJhYmxlLm1hdGVyaWFsT3duZXIubWF0ZXJpYWw7XG5cdFx0dmFyIGVudGl0eTpJRW50aXR5ID0gcmVuZGVyYWJsZS5zb3VyY2VFbnRpdHk7XG5cdFx0dmFyIHBvc2l0aW9uOlZlY3RvcjNEID0gZW50aXR5LnNjZW5lUG9zaXRpb247XG5cblx0XHRpZiAobWF0ZXJpYWwpIHtcblx0XHRcdC8vc2V0IGlkcyBmb3IgZmFzdGVyIHJlZmVyZW5jaW5nXG5cdFx0XHRyZW5kZXJhYmxlLm1hdGVyaWFsSWQgPSBtYXRlcmlhbC5faU1hdGVyaWFsSWQ7XG4vL1x0XHRcdFx0cmVuZGVyYWJsZS5yZW5kZXJPcmRlcklkID0gbWF0ZXJpYWwuX2lSZW5kZXJPcmRlcklkO1xuXHRcdFx0cmVuZGVyYWJsZS5jYXNjYWRlZCA9IGZhbHNlO1xuXG5cdFx0XHQvLyBwcm9qZWN0IG9udG8gY2FtZXJhJ3Mgei1heGlzXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX2lFbnRyeVBvaW50LnN1YnRyYWN0KHBvc2l0aW9uKTtcblx0XHRcdHJlbmRlcmFibGUuekluZGV4ID0gZW50aXR5LnpPZmZzZXQgLSBwb3NpdGlvbi5kb3RQcm9kdWN0KHRoaXMuX3BDYW1lcmFGb3J3YXJkKTtcblxuXHRcdFx0Ly9zdG9yZSByZWZlcmVuY2UgdG8gc2NlbmUgdHJhbnNmb3JtXG5cdFx0XHRyZW5kZXJhYmxlLnJlbmRlclNjZW5lVHJhbnNmb3JtID0gcmVuZGVyYWJsZS5zb3VyY2VFbnRpdHkuZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0odGhpcy5fcENhbWVyYSk7XG5cblx0XHRcdC8vc3RvcmUgcmVmZXJlbmNlIHRvIG5leHQgaXRlbSBpbiBsaXN0XG5cdFx0XHRyZW5kZXJhYmxlLm5leHQgPSB0aGlzLl9yZW5kZXJhYmxlSGVhZDtcblx0XHRcdHRoaXMuX3JlbmRlcmFibGVIZWFkID0gcmVuZGVyYWJsZTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlTY2lzc29yVXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl9zY2lzc29yRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zY2lzc29yRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9zY2lzc29yVXBkYXRlZClcblx0XHRcdHRoaXMuX3NjaXNzb3JVcGRhdGVkID0gbmV3IFJlbmRlcmVyRXZlbnQoUmVuZGVyZXJFdmVudC5TQ0lTU09SX1VQREFURUQpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjaXNzb3JVcGRhdGVkKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVZpZXdwb3J0VXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl92aWV3cG9ydERpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdmlld3BvcnREaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX3ZpZXdQb3J0VXBkYXRlZClcblx0XHRcdHRoaXMuX3ZpZXdQb3J0VXBkYXRlZCA9IG5ldyBSZW5kZXJlckV2ZW50KFJlbmRlcmVyRXZlbnQuVklFV1BPUlRfVVBEQVRFRCk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fdmlld1BvcnRVcGRhdGVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZUdsb2JhbFBvcygpXG5cdHtcblx0XHR0aGlzLl92aWV3UG9ydC54ID0gdGhpcy5fZ2xvYmFsUG9zLng7XG5cdFx0dGhpcy5fdmlld1BvcnQueSA9IHRoaXMuX2dsb2JhbFBvcy55O1xuXG5cdFx0dGhpcy5ub3RpZnlWaWV3cG9ydFVwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5U2Npc3NvclVwZGF0ZSgpO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lDcmVhdGVFbnRpdHlDb2xsZWN0b3IoKTpJQ29sbGVjdG9yXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG59XG5cbmV4cG9ydCA9IENTU1JlbmRlcmVyQmFzZTsiXX0=