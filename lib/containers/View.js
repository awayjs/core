var Scene = require("awayjs-core/lib/containers/Scene");

var RaycastPicker = require("awayjs-core/lib/core/pick/RaycastPicker");

var Camera = require("awayjs-core/lib/entities/Camera");
var CameraEvent = require("awayjs-core/lib/events/CameraEvent");
var SceneEvent = require("awayjs-core/lib/events/SceneEvent");
var RendererEvent = require("awayjs-core/lib/events/RendererEvent");
var MouseManager = require("awayjs-core/lib/managers/MouseManager");
var getTimer = require("awayjs-core/lib/utils/getTimer");

var View = (function () {
    /*
    ***********************************************************************
    * Disabled / Not yet implemented
    ***********************************************************************
    *
    * private _background:away.textures.Texture2DBase;
    *
    * public _pTouch3DManager:away.managers.Touch3DManager;
    *
    */
    function View(renderer, scene, camera) {
        if (typeof scene === "undefined") { scene = null; }
        if (typeof camera === "undefined") { camera = null; }
        var _this = this;
        this._width = 0;
        this._height = 0;
        this._time = 0;
        this._deltaTime = 0;
        this._backgroundColor = 0x000000;
        this._backgroundAlpha = 1;
        this._viewportDirty = true;
        this._scissorDirty = true;
        this._mousePicker = new RaycastPicker();
        this._onScenePartitionChangedDelegate = function (event) {
            return _this.onScenePartitionChanged(event);
        };
        this._onProjectionChangedDelegate = function (event) {
            return _this.onProjectionChanged(event);
        };
        this._onViewportUpdatedDelegate = function (event) {
            return _this.onViewportUpdated(event);
        };
        this._onScissorUpdatedDelegate = function (event) {
            return _this.onScissorUpdated(event);
        };

        this.scene = scene || new Scene();
        this.camera = camera || new Camera();
        this.renderer = renderer;

        //make sure document border is zero
        document.body.style.margin = "0px";

        this._htmlElement = document.createElement("div");
        this._htmlElement.style.position = "absolute";

        document.body.appendChild(this._htmlElement);

        this._mouseManager = MouseManager.getInstance();
        this._mouseManager.registerView(this);
        //			if (this._shareContext)
        //				this._mouse3DManager.addViewLayer(this);
    }
    /**
    *
    * @param e
    */
    View.prototype.onScenePartitionChanged = function (event) {
        if (this._pCamera)
            this._pCamera.partition = this.scene.partition;
    };

    Object.defineProperty(View.prototype, "mouseX", {
        get: function () {
            return this._pMouseX;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "mouseY", {
        get: function () {
            return this._pMouseY;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "htmlElement", {
        /**
        *
        */
        get: function () {
            return this._htmlElement;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "renderer", {
        /**
        *
        */
        get: function () {
            return this._pRenderer;
        },
        set: function (value) {
            if (this._pRenderer == value)
                return;

            if (this._pRenderer) {
                this._pRenderer.dispose();
                this._pRenderer.removeEventListener(RendererEvent.VIEWPORT_UPDATED, this._onViewportUpdatedDelegate);
                this._pRenderer.removeEventListener(RendererEvent.SCISSOR_UPDATED, this._onScissorUpdatedDelegate);
            }

            this._pRenderer = value;

            this._pRenderer.addEventListener(RendererEvent.VIEWPORT_UPDATED, this._onViewportUpdatedDelegate);
            this._pRenderer.addEventListener(RendererEvent.SCISSOR_UPDATED, this._onScissorUpdatedDelegate);

            //reset entity collector
            this._pEntityCollector = this._pRenderer._iCreateEntityCollector();

            if (this._pCamera)
                this._pEntityCollector.camera = this._pCamera;

            //reset back buffer
            this._pRenderer._iBackgroundR = ((this._backgroundColor >> 16) & 0xff) / 0xff;
            this._pRenderer._iBackgroundG = ((this._backgroundColor >> 8) & 0xff) / 0xff;
            this._pRenderer._iBackgroundB = (this._backgroundColor & 0xff) / 0xff;
            this._pRenderer._iBackgroundAlpha = this._backgroundAlpha;
            this._pRenderer.width = this._width;
            this._pRenderer.height = this._height;
            this._pRenderer.shareContext = this._shareContext;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "shareContext", {
        /**
        *
        */
        get: function () {
            return this._shareContext;
        },
        set: function (value) {
            if (this._shareContext == value)
                return;

            this._shareContext = value;

            if (this._pRenderer)
                this._pRenderer.shareContext = this._shareContext;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "backgroundColor", {
        /**
        *
        */
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            if (this._backgroundColor == value)
                return;

            this._backgroundColor = value;

            this._pRenderer._iBackgroundR = ((value >> 16) & 0xff) / 0xff;
            this._pRenderer._iBackgroundG = ((value >> 8) & 0xff) / 0xff;
            this._pRenderer._iBackgroundB = (value & 0xff) / 0xff;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "backgroundAlpha", {
        /**
        *
        * @returns {number}
        */
        get: function () {
            return this._backgroundAlpha;
        },
        /**
        *
        * @param value
        */
        set: function (value) {
            if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;

            if (this._backgroundAlpha == value)
                return;

            this._pRenderer._iBackgroundAlpha = this._backgroundAlpha = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "camera", {
        /**
        *
        * @returns {Camera3D}
        */
        get: function () {
            return this._pCamera;
        },
        /**
        * Set camera that's used to render the scene for this viewport
        */
        set: function (value) {
            if (this._pCamera == value)
                return;

            if (this._pCamera)
                this._pCamera.removeEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);

            this._pCamera = value;

            if (this._pEntityCollector)
                this._pEntityCollector.camera = this._pCamera;

            if (this._pScene)
                this._pCamera.partition = this._pScene.partition;

            this._pCamera.addEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);
            this._scissorDirty = true;
            this._viewportDirty = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "scene", {
        /**
        *
        * @returns {away.containers.Scene3D}
        */
        get: function () {
            return this._pScene;
        },
        /**
        * Set the scene that's used to render for this viewport
        */
        set: function (value) {
            if (this._pScene == value)
                return;

            if (this._pScene)
                this._pScene.removeEventListener(SceneEvent.PARTITION_CHANGED, this._onScenePartitionChangedDelegate);

            this._pScene = value;

            this._pScene.addEventListener(SceneEvent.PARTITION_CHANGED, this._onScenePartitionChangedDelegate);

            if (this._pCamera)
                this._pCamera.partition = this._pScene.partition;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "deltaTime", {
        /**
        *
        * @returns {number}
        */
        get: function () {
            return this._deltaTime;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "width", {
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
            this._aspectRatio = this._width / this._height;
            this._pCamera.projection._iAspectRatio = this._aspectRatio;
            this._pRenderer.width = value;
            this._htmlElement.style.width = value + "px";
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "height", {
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
            this._aspectRatio = this._width / this._height;
            this._pCamera.projection._iAspectRatio = this._aspectRatio;
            this._pRenderer.height = value;
            this._htmlElement.style.height = value + "px";
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "mousePicker", {
        /**
        *
        */
        get: function () {
            return this._mousePicker;
        },
        set: function (value) {
            if (this._mousePicker == value)
                return;

            if (value == null)
                this._mousePicker = new RaycastPicker();
            else
                this._mousePicker = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "x", {
        /**
        *
        */
        get: function () {
            return this._pRenderer.x;
        },
        set: function (value) {
            if (this._pRenderer.x == value)
                return;

            this._pRenderer.x == value;
            this._htmlElement.style.left = value + "px";
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "y", {
        /**
        *
        */
        get: function () {
            return this._pRenderer.y;
        },
        set: function (value) {
            if (this._pRenderer.y == value)
                return;

            this._pRenderer.y == value;
            this._htmlElement.style.top = value + "px";
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "visible", {
        /**
        *
        */
        get: function () {
            return (this._htmlElement.style.visibility == "visible");
        },
        set: function (value) {
            this._htmlElement.style.visibility = value ? "visible" : "hidden";
            //TODO transfer visible property to associated context (if one exists)
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(View.prototype, "renderedFacesCount", {
        /**
        *
        * @returns {number}
        */
        get: function () {
            return 0;
            //return this._pEntityCollector._pNumTriangles;//numTriangles;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Renders the view.
    */
    View.prototype.render = function () {
        this.pUpdateTime();

        //update view and size data
        this._pCamera.projection._iAspectRatio = this._aspectRatio;

        if (this._scissorDirty) {
            this._scissorDirty = false;
            this._pCamera.projection._iUpdateScissorRect(this._pRenderer.scissorRect.x, this._pRenderer.scissorRect.y, this._pRenderer.scissorRect.width, this._pRenderer.scissorRect.height);
        }

        if (this._viewportDirty) {
            this._viewportDirty = false;
            this._pCamera.projection._iUpdateViewport(this._pRenderer.viewPort.x, this._pRenderer.viewPort.y, this._pRenderer.viewPort.width, this._pRenderer.viewPort.height);
        }

        // update picking
        if (!this._shareContext) {
            if (this.forceMouseMove && this._htmlElement == this._mouseManager._iActiveDiv && !this._mouseManager._iUpdateDirty)
                this._mouseManager._iCollidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);

            this._mouseManager.fireMouseEvents(this.forceMouseMove);
            //_touch3DManager.fireTouchEvents();
        }

        //_touch3DManager.updateCollider();
        //clear entity collector ready for collection
        this._pEntityCollector.clear();

        // collect stuff to render
        this._pScene.traversePartitions(this._pEntityCollector);

        //render the contents of the entity collector
        this._pRenderer.render(this._pEntityCollector);
    };

    /**
    *
    */
    View.prototype.pUpdateTime = function () {
        var time = getTimer();

        if (this._time == 0)
            this._time = time;

        this._deltaTime = time - this._time;
        this._time = time;
    };

    /**
    *
    */
    View.prototype.dispose = function () {
        this._pRenderer.dispose();

        // TODO: imeplement mouseManager / touch3DManager
        this._mouseManager.unregisterView(this);

        //this._touch3DManager.disableTouchListeners(this);
        //this._touch3DManager.dispose();
        this._mouseManager = null;

        //this._touch3DManager = null;
        this._pRenderer = null;
        this._pEntityCollector = null;
    };

    Object.defineProperty(View.prototype, "iEntityCollector", {
        /**
        *
        */
        get: function () {
            return this._pEntityCollector;
        },
        enumerable: true,
        configurable: true
    });

    /**
    *
    */
    View.prototype.onProjectionChanged = function (event) {
        this._scissorDirty = true;
        this._viewportDirty = true;
    };

    /**
    *
    */
    View.prototype.onViewportUpdated = function (event) {
        this._viewportDirty = true;
    };

    /**
    *
    */
    View.prototype.onScissorUpdated = function (event) {
        this._scissorDirty = true;
    };

    View.prototype.project = function (point3d) {
        var v = this._pCamera.project(point3d);
        v.x = v.x * this._pRenderer.viewPort.width / 2 + this._width * this._pCamera.projection.originX;
        v.y = v.y * this._pRenderer.viewPort.height / 2 + this._height * this._pCamera.projection.originY;

        return v;
    };

    View.prototype.unproject = function (sX, sY, sZ) {
        return this._pCamera.unproject(2 * (sX - this._width * this._pCamera.projection.originX) / this._pRenderer.viewPort.width, 2 * (sY - this._height * this._pCamera.projection.originY) / this._pRenderer.viewPort.height, sZ);
    };

    View.prototype.getRay = function (sX, sY, sZ) {
        return this._pCamera.getRay((sX * 2 - this._width) / this._width, (sY * 2 - this._height) / this._height, sZ);
    };

    /*TODO: implement Background
    public get background():away.textures.Texture2DBase
    {
    return this._background;
    }
    */
    /*TODO: implement Background
    public set background( value:away.textures.Texture2DBase )
    {
    this._background = value;
    this._renderer.background = _background;
    }
    */
    // TODO: required dependency stageGL
    View.prototype.updateCollider = function () {
        if (!this._shareContext) {
            if (this._htmlElement == this._mouseManager._iActiveDiv)
                this._mouseManager._iCollidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);
        } else {
            var collidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);

            if (this.layeredView || this._mouseManager._iCollidingObject == null || collidingObject.rayEntryDistance < this._mouseManager._iCollidingObject.rayEntryDistance)
                this._mouseManager._iCollidingObject = collidingObject;
        }
    };
    return View;
})();

module.exports = View;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvVmlldy50cyJdLCJuYW1lcyI6WyJWaWV3IiwiVmlldy5jb25zdHJ1Y3RvciIsIlZpZXcub25TY2VuZVBhcnRpdGlvbkNoYW5nZWQiLCJWaWV3LnJlbmRlciIsIlZpZXcucFVwZGF0ZVRpbWUiLCJWaWV3LmRpc3Bvc2UiLCJWaWV3Lm9uUHJvamVjdGlvbkNoYW5nZWQiLCJWaWV3Lm9uVmlld3BvcnRVcGRhdGVkIiwiVmlldy5vblNjaXNzb3JVcGRhdGVkIiwiVmlldy5wcm9qZWN0IiwiVmlldy51bnByb2plY3QiLCJWaWV3LmdldFJheSIsIlZpZXcudXBkYXRlQ29sbGlkZXIiXSwibWFwcGluZ3MiOiJBQUFBLHVEQUFnRTs7QUFPaEUsc0VBQTZFOztBQUk3RSx1REFBZ0U7QUFDaEUsK0RBQXVFO0FBQ3ZFLDZEQUFxRTtBQUNyRSxtRUFBMEU7QUFDMUUsbUVBQTJFO0FBQzNFLHdEQUFpRTs7QUFFakU7SUEwRENBOzs7Ozs7Ozs7TUFER0E7SUFDSEEsY0FBWUEsUUFBa0JBLEVBQUVBLEtBQWtCQSxFQUFFQSxNQUFvQkE7UUFBeENDLG9DQUFBQSxLQUFLQSxHQUFTQSxJQUFJQTtBQUFBQSxRQUFFQSxxQ0FBQUEsTUFBTUEsR0FBVUEsSUFBSUE7QUFBQUEsUUFBeEVBLGlCQXdCQ0E7UUF6RERBLEtBQVFBLE1BQU1BLEdBQVVBLENBQUNBLENBQUNBO1FBQzFCQSxLQUFRQSxPQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUUzQkEsS0FBUUEsS0FBS0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDekJBLEtBQVFBLFVBQVVBLEdBQVVBLENBQUNBLENBQUNBO1FBQzlCQSxLQUFRQSxnQkFBZ0JBLEdBQVVBLFFBQVFBLENBQUNBO1FBQzNDQSxLQUFRQSxnQkFBZ0JBLEdBQVVBLENBQUNBLENBQUNBO1FBRXBDQSxLQUFRQSxjQUFjQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUN0Q0EsS0FBUUEsYUFBYUEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFPckNBLEtBQVFBLFlBQVlBLEdBQVdBLElBQUlBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBO1FBbUJsREEsSUFBSUEsQ0FBQ0EsZ0NBQWdDQSxHQUFHQSxVQUFDQSxLQUFnQkE7bUJBQUtBLEtBQUlBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFBbkNBLENBQW1DQTtRQUNqR0EsSUFBSUEsQ0FBQ0EsNEJBQTRCQSxHQUFHQSxVQUFDQSxLQUFpQkE7bUJBQUtBLEtBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFBL0JBLENBQStCQTtRQUMxRkEsSUFBSUEsQ0FBQ0EsMEJBQTBCQSxHQUFHQSxVQUFDQSxLQUFtQkE7bUJBQUtBLEtBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFBN0JBLENBQTZCQTtRQUN4RkEsSUFBSUEsQ0FBQ0EseUJBQXlCQSxHQUFHQSxVQUFDQSxLQUFtQkE7bUJBQUtBLEtBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFBNUJBLENBQTRCQTs7UUFFdEZBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBLElBQUlBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxJQUFJQSxJQUFJQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUNwQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUE7O1FBRXhCQSxtQ0FBbUNBO1FBQ25DQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQTs7UUFFbENBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBO1FBQ2pEQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxHQUFHQSxVQUFVQTs7UUFFN0NBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBOztRQUU1Q0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsWUFBWUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFDL0NBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBO1FBRXZDQSw0QkFBNEJBO1FBQzVCQSw4Q0FBOENBO0lBQzdDQSxDQUFDQTtJQU1ERDs7O01BREdBOzZDQUNIQSxVQUFnQ0EsS0FBZ0JBO1FBRS9DRSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQTtZQUNoQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7SUFDakRBLENBQUNBOztJQUlERjtRQUFBQSxLQUFBQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxRQUFRQTtRQUNyQkEsQ0FBQ0E7Ozs7QUFBQUE7SUFFREE7UUFBQUEsS0FBQUE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxZQUFZQTtRQUN6QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFJREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFVBQVVBO1FBQ3ZCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFvQkEsS0FBZUE7WUFFbENBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEtBQUtBO2dCQUMzQkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLENBQUVBO2dCQUNwQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxtQkFBbUJBLENBQUNBLGFBQWFBLENBQUNBLGdCQUFnQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsMEJBQTBCQSxDQUFDQTtnQkFDcEdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsZUFBZUEsRUFBRUEsSUFBSUEsQ0FBQ0EseUJBQXlCQSxDQUFDQTthQUNsR0E7O1lBRURBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEtBQUtBOztZQUV2QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLElBQUlBLENBQUNBLDBCQUEwQkEsQ0FBQ0E7WUFDakdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsZUFBZUEsRUFBRUEsSUFBSUEsQ0FBQ0EseUJBQXlCQSxDQUFDQTs7WUFFL0ZBLHdCQUF3QkE7WUFDeEJBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxDQUFDQTs7WUFFbEVBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBO2dCQUNoQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTs7WUFFL0NBLG1CQUFtQkE7WUFDbkJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBQ0EsSUFBSUE7WUFDM0VBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBQ0EsSUFBSUE7WUFDMUVBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBQ0EsSUFBSUE7WUFDbkVBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLGlCQUFpQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQTtZQUN6REEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUE7WUFDbkNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BO1lBQ3JDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQTtRQUNsREEsQ0FBQ0E7Ozs7QUFoQ0FBOztJQXFDREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGFBQWFBO1FBQzFCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUF3QkEsS0FBYUE7WUFFcENBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLElBQUlBLEtBQUtBO2dCQUM5QkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLEtBQUtBOztZQUUxQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUE7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUNwREEsQ0FBQ0E7Ozs7QUFYQUE7O0lBZ0JEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQTtRQUM3QkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBMkJBLEtBQVlBO1lBRXRDQSxJQUFJQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLElBQUlBLEtBQUtBO2dCQUNqQ0EsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsS0FBS0E7O1lBRTdCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxhQUFhQSxHQUFHQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFDQSxJQUFJQTtZQUMzREEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsYUFBYUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBQ0EsSUFBSUE7WUFDMURBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEdBQUNBLElBQUlBO1FBQ3BEQSxDQUFDQTs7OztBQVpBQTs7SUFrQkRBO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQTtRQUM3QkEsQ0FBQ0E7UUFNREE7OztVQURHQTthQUNIQSxVQUEyQkEsS0FBWUE7WUFFdENBLElBQUlBLEtBQUtBLEdBQUdBLENBQUNBO2dCQUNaQSxLQUFLQSxHQUFHQSxDQUFDQTtpQkFDTEEsSUFBSUEsS0FBS0EsR0FBR0EsQ0FBQ0E7Z0JBQ2pCQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTs7WUFFWEEsSUFBSUEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxJQUFJQSxLQUFLQTtnQkFDakNBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsS0FBS0E7UUFDbEVBLENBQUNBOzs7O0FBakJBQTs7SUF1QkRBO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBO1FBS0RBOztVQURHQTthQUNIQSxVQUFrQkEsS0FBWUE7WUFFN0JBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEtBQUtBO2dCQUN6QkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBO2dCQUNoQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxXQUFXQSxDQUFDQSxrQkFBa0JBLEVBQUVBLElBQUlBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsQ0FBQ0E7O1lBRXRHQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQTs7WUFFckJBLElBQUlBLElBQUlBLENBQUNBLGlCQUFpQkE7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBOztZQUUvQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsT0FBT0E7Z0JBQ2ZBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBOztZQUVsREEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxXQUFXQSxDQUFDQSxrQkFBa0JBLEVBQUVBLElBQUlBLENBQUNBLDRCQUE0QkEsQ0FBQ0E7WUFDakdBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBO1lBQ3pCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQTtRQUMzQkEsQ0FBQ0E7Ozs7QUF4QkFBOztJQThCREE7UUFBQUE7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxPQUFPQTtRQUNwQkEsQ0FBQ0E7UUFLREE7O1VBREdBO2FBQ0hBLFVBQWlCQSxLQUFXQTtZQUUzQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsT0FBT0EsSUFBSUEsS0FBS0E7Z0JBQ3hCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsSUFBSUEsQ0FBQ0EsT0FBT0E7Z0JBQ2ZBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLG1CQUFtQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxJQUFJQSxDQUFDQSxnQ0FBZ0NBLENBQUNBLENBQUNBOztZQUV2R0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0E7O1lBRXBCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFVBQVVBLENBQUNBLGlCQUFpQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsZ0NBQWdDQSxDQUFDQTs7WUFFbEdBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBO2dCQUNoQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDbkRBLENBQUNBOzs7O0FBbkJBQTs7SUF5QkRBO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsVUFBVUE7UUFDdkJBLENBQUNBOzs7O0FBQUFBO0lBS0RBO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxNQUFNQTtRQUNuQkEsQ0FBQ0E7UUFFREEsS0FBQUEsVUFBaUJBLEtBQVlBO1lBRTVCQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxJQUFJQSxLQUFLQTtnQkFDdkJBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQTtZQUNuQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0E7WUFDNUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBO1lBQzFEQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUE7UUFDN0NBLENBQUNBOzs7O0FBWkFBOztJQWlCREE7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFrQkEsS0FBWUE7WUFFN0JBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLEtBQUtBO2dCQUN4QkEsTUFBT0EsQ0FBQUE7O1lBRVJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBO1lBQ3BCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQTtZQUM1Q0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUE7WUFDMURBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBO1lBQzlCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxHQUFHQSxJQUFJQTtRQUM5Q0EsQ0FBQ0E7Ozs7QUFaQUE7O0lBaUJEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUE7UUFDekJBLENBQUNBO1FBRURBLEtBQUFBLFVBQXVCQSxLQUFhQTtZQUVuQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsS0FBS0E7Z0JBQzdCQSxNQUFPQSxDQUFBQTs7WUFFUkEsSUFBSUEsS0FBS0EsSUFBSUEsSUFBSUE7Z0JBQ2hCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxhQUFhQSxDQUFDQSxDQUFDQTs7Z0JBRXZDQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7Ozs7QUFYQUE7O0lBZ0JEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDekJBLENBQUNBO1FBRURBLEtBQUFBLFVBQWFBLEtBQVlBO1lBRXhCQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQTtnQkFDN0JBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUE7UUFDNUNBLENBQUNBOzs7O0FBVEFBOztJQWNEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDekJBLENBQUNBO1FBRURBLEtBQUFBLFVBQWFBLEtBQVlBO1lBRXhCQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQTtnQkFDN0JBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsR0FBR0EsS0FBS0EsR0FBR0EsSUFBSUE7UUFDM0NBLENBQUNBOzs7O0FBVEFBOztJQWNEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBVUEsSUFBSUEsU0FBU0EsQ0FBQ0E7UUFDekRBLENBQUNBO1FBRURBLEtBQUFBLFVBQW1CQSxLQUFhQTtZQUUvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBVUEsR0FBR0EsS0FBS0EsR0FBRUEsU0FBU0EsR0FBR0EsUUFBUUE7WUFDaEVBLHNFQUFzRUE7UUFDdkVBLENBQUNBOzs7O0FBTkFBOztJQVlEQTtRQUFBQTs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLENBQUNBO1lBQ1JBLDhEQUE4REE7UUFDL0RBLENBQUNBOzs7O0FBQUFBO0lBS0RBOztNQURHQTs0QkFDSEE7UUFFQ0csSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7O1FBRWxCQSwyQkFBMkJBO1FBQzNCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQTs7UUFFMURBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLENBQUVBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxLQUFLQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQTtTQUNqTEE7O1FBRURBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBLENBQUVBO1lBQ3hCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxLQUFLQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQTtTQUNsS0E7O1FBRURBLGlCQUFpQkE7UUFDakJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUVBO1lBQ3hCQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxhQUFhQTtnQkFDbEhBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGlCQUFpQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTs7WUFFOUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1lBQ3ZEQSxvQ0FBb0NBO1NBQ3BDQTs7UUFDREEsbUNBQW1DQTtRQUVuQ0EsNkNBQTZDQTtRQUM3Q0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTs7UUFFOUJBLDBCQUEwQkE7UUFDMUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTs7UUFFdkRBLDZDQUE2Q0E7UUFDN0NBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0E7SUFDL0NBLENBQUNBOztJQUtESDs7TUFER0E7aUNBQ0hBO1FBRUNJLElBQUlBLElBQUlBLEdBQVVBLFFBQVFBLENBQUNBLENBQUNBOztRQUU1QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0E7WUFDbEJBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBOztRQUVuQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0E7UUFDbkNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBO0lBQ2xCQSxDQUFDQTs7SUFLREo7O01BREdBOzZCQUNIQTtRQUVDSyxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTs7UUFFekJBLGlEQUFpREE7UUFDakRBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBOztRQUV2Q0EsbURBQW1EQTtRQUNuREEsaUNBQWlDQTtRQUVqQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUE7O1FBQ3pCQSw4QkFBOEJBO1FBRTlCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQTtRQUN0QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQTtJQUM5QkEsQ0FBQ0E7O0lBS0RMO1FBQUFBOztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxpQkFBaUJBO1FBQzlCQSxDQUFDQTs7OztBQUFBQTtJQUtEQTs7TUFER0E7eUNBQ0hBLFVBQTRCQSxLQUFpQkE7UUFFNUNNLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBO1FBQ3pCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQTtJQUMzQkEsQ0FBQ0E7O0lBS0ROOztNQURHQTt1Q0FDSEEsVUFBMEJBLEtBQW1CQTtRQUU1Q08sSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUE7SUFDM0JBLENBQUNBOztJQUtEUDs7TUFER0E7c0NBQ0hBLFVBQXlCQSxLQUFtQkE7UUFFM0NRLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBO0lBQzFCQSxDQUFDQTs7SUFFRFIseUJBQUFBLFVBQWVBLE9BQWdCQTtRQUU5QlMsSUFBSUEsQ0FBQ0EsR0FBWUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDL0NBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLEdBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEdBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BO1FBQ3pGQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxHQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQTs7UUFFM0ZBLE9BQU9BLENBQUNBO0lBQ1RBLENBQUNBOztJQUVEVCwyQkFBQUEsVUFBaUJBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRS9DVSxPQUFPQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxFQUFFQSxDQUFDQTtJQUVqTkEsQ0FBQ0E7O0lBRURWLHdCQUFBQSxVQUFjQSxFQUFTQSxFQUFFQSxFQUFTQSxFQUFFQSxFQUFTQTtRQUU1Q1csT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsRUFBRUEsQ0FBQ0E7SUFDdEdBLENBQUNBOztJQWdDRFg7Ozs7O01BVkdBO0lBQ0hBOzs7Ozs7TUFNR0E7SUFFSEEsb0NBQW9DQTtvQ0FDcENBO1FBRUNZLElBQUlBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUVBO1lBQ3hCQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQTtnQkFDdERBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGlCQUFpQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtTQUM5R0EsS0FBTUE7WUFDTkEsSUFBSUEsZUFBZUEsR0FBc0JBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0E7O1lBRTlHQSxJQUFJQSxJQUFJQSxDQUFDQSxXQUFXQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxpQkFBaUJBLElBQUlBLElBQUlBLElBQUlBLGVBQWVBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxnQkFBZ0JBO2dCQUMvSkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxlQUFlQSxDQUFDQTtTQUN4REE7SUFDRkEsQ0FBQ0E7SUFDRlosWUFBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCxxQkFBYyxDQUFBIiwiZmlsZSI6ImNvbnRhaW5lcnMvVmlldy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBQb2ludFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUG9pbnRcIik7XG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vUmVjdGFuZ2xlXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBJUGlja2VyXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcGljay9JUGlja2VyXCIpO1xuaW1wb3J0IFBpY2tpbmdDb2xsaXNpb25WT1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BpY2svUGlja2luZ0NvbGxpc2lvblZPXCIpO1xuaW1wb3J0IFJheWNhc3RQaWNrZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3BpY2svUmF5Y2FzdFBpY2tlclwiKTtcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcmVuZGVyL0lSZW5kZXJlclwiKTtcbmltcG9ydCBDU1NSZW5kZXJlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3JlbmRlci9DU1NSZW5kZXJlckJhc2VcIik7XG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgQ2FtZXJhRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9DYW1lcmFFdmVudFwiKTtcbmltcG9ydCBTY2VuZUV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvU2NlbmVFdmVudFwiKTtcbmltcG9ydCBSZW5kZXJlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1JlbmRlcmVyRXZlbnRcIik7XG5pbXBvcnQgTW91c2VNYW5hZ2VyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9tYW5hZ2Vycy9Nb3VzZU1hbmFnZXJcIik7XG5pbXBvcnQgZ2V0VGltZXJcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvZ2V0VGltZXJcIik7XG5cbmNsYXNzIFZpZXdcbntcblxuXHQvKlxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHQgKiBEZXZlbG9wbWVudCBOb3Rlc1xuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHQgKlxuXHQgKiBTaGFyZUNvbnRleHQgICAgIC0gdGhpcyBpcyBub3QgYmVpbmcgdXNlZCBhdCB0aGUgbW9tZW50IGludGVncmF0aW9uIHdpdGggb3RoZXIgZnJhbWV3b3JrcyBpcyBub3QgeWV0IGltcGxlbWVudGVkIG9yIHRlc3RlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgYW5kICggX2xvY2FsUG9zIC8gX2dsb2JhbFBvcyApIHBvc2l0aW9uIG9mIHZpZXdwb3J0IGFyZSB0aGUgc2FtZSBmb3IgdGhlIG1vbWVudFxuXHQgKlxuXHQgKiBCYWNrZ3JvdW5kXG5cdCAqICAgICAgICAgICAgICAgICAgLSB0aGlzIGlzIGN1cnJlbnRseSBub3QgYmVpbmcgaW5jbHVkZWQgaW4gb3VyIHRlc3RzIGFuZCBpcyBjdXJyZW50bHkgZGlzYWJsZWRcblx0ICpcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdCAqL1xuXG5cdC8vIFByb3RlY3RlZFxuXHRwdWJsaWMgX3BTY2VuZTpTY2VuZTtcblx0cHVibGljIF9wQ2FtZXJhOkNhbWVyYTtcblx0cHVibGljIF9wRW50aXR5Q29sbGVjdG9yOklDb2xsZWN0b3I7XG5cdHB1YmxpYyBfcFJlbmRlcmVyOklSZW5kZXJlcjtcblxuXHQvLyBQcml2YXRlXG5cdHByaXZhdGUgX2FzcGVjdFJhdGlvOm51bWJlcjtcblx0cHJpdmF0ZSBfd2lkdGg6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfaGVpZ2h0Om51bWJlciA9IDA7XG5cblx0cHJpdmF0ZSBfdGltZTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9kZWx0YVRpbWU6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfYmFja2dyb3VuZENvbG9yOm51bWJlciA9IDB4MDAwMDAwO1xuXHRwcml2YXRlIF9iYWNrZ3JvdW5kQWxwaGE6bnVtYmVyID0gMTtcblxuXHRwcml2YXRlIF92aWV3cG9ydERpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zY2lzc29yRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfb25TY2VuZVBhcnRpdGlvbkNoYW5nZWREZWxlZ2F0ZTooZXZlbnQ6U2NlbmVFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25Qcm9qZWN0aW9uQ2hhbmdlZERlbGVnYXRlOihldmVudDpDYW1lcmFFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25WaWV3cG9ydFVwZGF0ZWREZWxlZ2F0ZTooZXZlbnQ6UmVuZGVyZXJFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25TY2lzc29yVXBkYXRlZERlbGVnYXRlOihldmVudDpSZW5kZXJlckV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9tb3VzZU1hbmFnZXI6TW91c2VNYW5hZ2VyO1xuXHRwcml2YXRlIF9tb3VzZVBpY2tlcjpJUGlja2VyID0gbmV3IFJheWNhc3RQaWNrZXIoKTtcblxuXHRwcml2YXRlIF9odG1sRWxlbWVudDpIVE1MRGl2RWxlbWVudDtcblx0cHJpdmF0ZSBfc2hhcmVDb250ZXh0OmJvb2xlYW47XG5cdHB1YmxpYyBfcE1vdXNlWDpudW1iZXI7XG5cdHB1YmxpYyBfcE1vdXNlWTpudW1iZXI7XG5cblx0Lypcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdCAqIERpc2FibGVkIC8gTm90IHlldCBpbXBsZW1lbnRlZFxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0ICpcblx0ICogcHJpdmF0ZSBfYmFja2dyb3VuZDphd2F5LnRleHR1cmVzLlRleHR1cmUyREJhc2U7XG5cdCAqXG5cdCAqIHB1YmxpYyBfcFRvdWNoM0RNYW5hZ2VyOmF3YXkubWFuYWdlcnMuVG91Y2gzRE1hbmFnZXI7XG5cdCAqXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihyZW5kZXJlcjpJUmVuZGVyZXIsIHNjZW5lOlNjZW5lID0gbnVsbCwgY2FtZXJhOkNhbWVyYSA9IG51bGwpXG5cdHtcblx0XHR0aGlzLl9vblNjZW5lUGFydGl0aW9uQ2hhbmdlZERlbGVnYXRlID0gKGV2ZW50OlNjZW5lRXZlbnQpID0+IHRoaXMub25TY2VuZVBhcnRpdGlvbkNoYW5nZWQoZXZlbnQpO1xuXHRcdHRoaXMuX29uUHJvamVjdGlvbkNoYW5nZWREZWxlZ2F0ZSA9IChldmVudDpDYW1lcmFFdmVudCkgPT4gdGhpcy5vblByb2plY3Rpb25DaGFuZ2VkKGV2ZW50KTtcblx0XHR0aGlzLl9vblZpZXdwb3J0VXBkYXRlZERlbGVnYXRlID0gKGV2ZW50OlJlbmRlcmVyRXZlbnQpID0+IHRoaXMub25WaWV3cG9ydFVwZGF0ZWQoZXZlbnQpO1xuXHRcdHRoaXMuX29uU2Npc3NvclVwZGF0ZWREZWxlZ2F0ZSA9IChldmVudDpSZW5kZXJlckV2ZW50KSA9PiB0aGlzLm9uU2Npc3NvclVwZGF0ZWQoZXZlbnQpO1xuXG5cdFx0dGhpcy5zY2VuZSA9IHNjZW5lIHx8IG5ldyBTY2VuZSgpO1xuXHRcdHRoaXMuY2FtZXJhID0gY2FtZXJhIHx8IG5ldyBDYW1lcmEoKTtcblx0XHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG5cblx0XHQvL21ha2Ugc3VyZSBkb2N1bWVudCBib3JkZXIgaXMgemVyb1xuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gXCIwcHhcIjtcblxuXHRcdHRoaXMuX2h0bWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl9odG1sRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5faHRtbEVsZW1lbnQpO1xuXG5cdFx0dGhpcy5fbW91c2VNYW5hZ2VyID0gTW91c2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG5cdFx0dGhpcy5fbW91c2VNYW5hZ2VyLnJlZ2lzdGVyVmlldyh0aGlzKTtcblxuLy9cdFx0XHRpZiAodGhpcy5fc2hhcmVDb250ZXh0KVxuLy9cdFx0XHRcdHRoaXMuX21vdXNlM0RNYW5hZ2VyLmFkZFZpZXdMYXllcih0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZVxuXHQgKi9cblx0cHJpdmF0ZSBvblNjZW5lUGFydGl0aW9uQ2hhbmdlZChldmVudDpTY2VuZUV2ZW50KVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BDYW1lcmEpXG5cdFx0XHR0aGlzLl9wQ2FtZXJhLnBhcnRpdGlvbiA9IHRoaXMuc2NlbmUucGFydGl0aW9uO1xuXHR9XG5cblx0cHVibGljIGxheWVyZWRWaWV3OmJvb2xlYW47IC8vVE9ETzogc29tZXRoaW5nIHRvIGVuYWJsZSB0aGlzIGNvcnJlY3RseVxuXG5cdHB1YmxpYyBnZXQgbW91c2VYKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE1vdXNlWDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgbW91c2VZKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE1vdXNlWTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBodG1sRWxlbWVudCgpOkhUTUxEaXZFbGVtZW50XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faHRtbEVsZW1lbnQ7XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJlbmRlcmVyKCk6SVJlbmRlcmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFJlbmRlcmVyO1xuXHR9XG5cblx0cHVibGljIHNldCByZW5kZXJlcih2YWx1ZTpJUmVuZGVyZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcFJlbmRlcmVyID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0aWYgKHRoaXMuX3BSZW5kZXJlcikge1xuXHRcdFx0dGhpcy5fcFJlbmRlcmVyLmRpc3Bvc2UoKTtcblx0XHRcdHRoaXMuX3BSZW5kZXJlci5yZW1vdmVFdmVudExpc3RlbmVyKFJlbmRlcmVyRXZlbnQuVklFV1BPUlRfVVBEQVRFRCwgdGhpcy5fb25WaWV3cG9ydFVwZGF0ZWREZWxlZ2F0ZSk7XG5cdFx0XHR0aGlzLl9wUmVuZGVyZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihSZW5kZXJlckV2ZW50LlNDSVNTT1JfVVBEQVRFRCwgdGhpcy5fb25TY2lzc29yVXBkYXRlZERlbGVnYXRlKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wUmVuZGVyZXIgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BSZW5kZXJlci5hZGRFdmVudExpc3RlbmVyKFJlbmRlcmVyRXZlbnQuVklFV1BPUlRfVVBEQVRFRCwgdGhpcy5fb25WaWV3cG9ydFVwZGF0ZWREZWxlZ2F0ZSk7XG5cdFx0dGhpcy5fcFJlbmRlcmVyLmFkZEV2ZW50TGlzdGVuZXIoUmVuZGVyZXJFdmVudC5TQ0lTU09SX1VQREFURUQsIHRoaXMuX29uU2Npc3NvclVwZGF0ZWREZWxlZ2F0ZSk7XG5cblx0XHQvL3Jlc2V0IGVudGl0eSBjb2xsZWN0b3Jcblx0XHR0aGlzLl9wRW50aXR5Q29sbGVjdG9yID0gdGhpcy5fcFJlbmRlcmVyLl9pQ3JlYXRlRW50aXR5Q29sbGVjdG9yKCk7XG5cblx0XHRpZiAodGhpcy5fcENhbWVyYSlcblx0XHRcdHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IuY2FtZXJhID0gdGhpcy5fcENhbWVyYTtcblxuXHRcdC8vcmVzZXQgYmFjayBidWZmZXJcblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kUiA9ICgodGhpcy5fYmFja2dyb3VuZENvbG9yID4+IDE2KSAmIDB4ZmYpLzB4ZmY7XG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZEcgPSAoKHRoaXMuX2JhY2tncm91bmRDb2xvciA+PiA4KSAmIDB4ZmYpLzB4ZmY7XG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZEIgPSAodGhpcy5fYmFja2dyb3VuZENvbG9yICYgMHhmZikvMHhmZjtcblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kQWxwaGEgPSB0aGlzLl9iYWNrZ3JvdW5kQWxwaGE7XG5cdFx0dGhpcy5fcFJlbmRlcmVyLndpZHRoID0gdGhpcy5fd2lkdGg7XG5cdFx0dGhpcy5fcFJlbmRlcmVyLmhlaWdodCA9IHRoaXMuX2hlaWdodDtcblx0XHR0aGlzLl9wUmVuZGVyZXIuc2hhcmVDb250ZXh0ID0gdGhpcy5fc2hhcmVDb250ZXh0O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNoYXJlQ29udGV4dCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zaGFyZUNvbnRleHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNoYXJlQ29udGV4dCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NoYXJlQ29udGV4dCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3NoYXJlQ29udGV4dCA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX3BSZW5kZXJlcilcblx0XHRcdHRoaXMuX3BSZW5kZXJlci5zaGFyZUNvbnRleHQgPSB0aGlzLl9zaGFyZUNvbnRleHQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYmFja2dyb3VuZENvbG9yKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYmFja2dyb3VuZENvbG9yO1xuXHR9XG5cblx0cHVibGljIHNldCBiYWNrZ3JvdW5kQ29sb3IodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2JhY2tncm91bmRDb2xvciA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JhY2tncm91bmRDb2xvciA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZFIgPSAoKHZhbHVlID4+IDE2KSAmIDB4ZmYpLzB4ZmY7XG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZEcgPSAoKHZhbHVlID4+IDgpICYgMHhmZikvMHhmZjtcblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kQiA9ICh2YWx1ZSAmIDB4ZmYpLzB4ZmY7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdHB1YmxpYyBnZXQgYmFja2dyb3VuZEFscGhhKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYmFja2dyb3VuZEFscGhhO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWx1ZVxuXHQgKi9cblx0cHVibGljIHNldCBiYWNrZ3JvdW5kQWxwaGEodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbHVlID4gMSlcblx0XHRcdHZhbHVlID0gMTtcblx0XHRlbHNlIGlmICh2YWx1ZSA8IDApXG5cdFx0XHR2YWx1ZSA9IDA7XG5cblx0XHRpZiAodGhpcy5fYmFja2dyb3VuZEFscGhhID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZEFscGhhID0gdGhpcy5fYmFja2dyb3VuZEFscGhhID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge0NhbWVyYTNEfVxuXHQgKi9cblx0cHVibGljIGdldCBjYW1lcmEoKTpDYW1lcmFcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQ2FtZXJhO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBjYW1lcmEgdGhhdCdzIHVzZWQgdG8gcmVuZGVyIHRoZSBzY2VuZSBmb3IgdGhpcyB2aWV3cG9ydFxuXHQgKi9cblx0cHVibGljIHNldCBjYW1lcmEodmFsdWU6Q2FtZXJhKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BDYW1lcmEgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fcENhbWVyYSlcblx0XHRcdHRoaXMuX3BDYW1lcmEucmVtb3ZlRXZlbnRMaXN0ZW5lcihDYW1lcmFFdmVudC5QUk9KRUNUSU9OX0NIQU5HRUQsIHRoaXMuX29uUHJvamVjdGlvbkNoYW5nZWREZWxlZ2F0ZSk7XG5cblx0XHR0aGlzLl9wQ2FtZXJhID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fcEVudGl0eUNvbGxlY3Rvcilcblx0XHRcdHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IuY2FtZXJhID0gdGhpcy5fcENhbWVyYTtcblxuXHRcdGlmICh0aGlzLl9wU2NlbmUpXG5cdFx0XHR0aGlzLl9wQ2FtZXJhLnBhcnRpdGlvbiA9IHRoaXMuX3BTY2VuZS5wYXJ0aXRpb247XG5cblx0XHR0aGlzLl9wQ2FtZXJhLmFkZEV2ZW50TGlzdGVuZXIoQ2FtZXJhRXZlbnQuUFJPSkVDVElPTl9DSEFOR0VELCB0aGlzLl9vblByb2plY3Rpb25DaGFuZ2VkRGVsZWdhdGUpO1xuXHRcdHRoaXMuX3NjaXNzb3JEaXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5fdmlld3BvcnREaXJ0eSA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge2F3YXkuY29udGFpbmVycy5TY2VuZTNEfVxuXHQgKi9cblx0cHVibGljIGdldCBzY2VuZSgpOlNjZW5lXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgc2NlbmUgdGhhdCdzIHVzZWQgdG8gcmVuZGVyIGZvciB0aGlzIHZpZXdwb3J0XG5cdCAqL1xuXHRwdWJsaWMgc2V0IHNjZW5lKHZhbHVlOlNjZW5lKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2VuZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICh0aGlzLl9wU2NlbmUpXG5cdFx0XHR0aGlzLl9wU2NlbmUucmVtb3ZlRXZlbnRMaXN0ZW5lcihTY2VuZUV2ZW50LlBBUlRJVElPTl9DSEFOR0VELCB0aGlzLl9vblNjZW5lUGFydGl0aW9uQ2hhbmdlZERlbGVnYXRlKTtcblxuXHRcdHRoaXMuX3BTY2VuZSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoU2NlbmVFdmVudC5QQVJUSVRJT05fQ0hBTkdFRCwgdGhpcy5fb25TY2VuZVBhcnRpdGlvbkNoYW5nZWREZWxlZ2F0ZSk7XG5cblx0XHRpZiAodGhpcy5fcENhbWVyYSlcblx0XHRcdHRoaXMuX3BDYW1lcmEucGFydGl0aW9uID0gdGhpcy5fcFNjZW5lLnBhcnRpdGlvbjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0cHVibGljIGdldCBkZWx0YVRpbWUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kZWx0YVRpbWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl93aWR0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3dpZHRoID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fd2lkdGggPSB2YWx1ZTtcblx0XHR0aGlzLl9hc3BlY3RSYXRpbyA9IHRoaXMuX3dpZHRoL3RoaXMuX2hlaWdodDtcblx0XHR0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24uX2lBc3BlY3RSYXRpbyA9IHRoaXMuX2FzcGVjdFJhdGlvO1xuXHRcdHRoaXMuX3BSZW5kZXJlci53aWR0aCA9IHZhbHVlO1xuXHRcdHRoaXMuX2h0bWxFbGVtZW50LnN0eWxlLndpZHRoID0gdmFsdWUgKyBcInB4XCI7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIHNldCBoZWlnaHQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2hlaWdodCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuXHRcdHRoaXMuX2FzcGVjdFJhdGlvID0gdGhpcy5fd2lkdGgvdGhpcy5faGVpZ2h0O1xuXHRcdHRoaXMuX3BDYW1lcmEucHJvamVjdGlvbi5faUFzcGVjdFJhdGlvID0gdGhpcy5fYXNwZWN0UmF0aW87XG5cdFx0dGhpcy5fcFJlbmRlcmVyLmhlaWdodCA9IHZhbHVlO1xuXHRcdHRoaXMuX2h0bWxFbGVtZW50LnN0eWxlLmhlaWdodCA9IHZhbHVlICsgXCJweFwiO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1vdXNlUGlja2VyKCk6SVBpY2tlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlUGlja2VyO1xuXHR9XG5cblx0cHVibGljIHNldCBtb3VzZVBpY2tlcih2YWx1ZTpJUGlja2VyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX21vdXNlUGlja2VyID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0aWYgKHZhbHVlID09IG51bGwpXG5cdFx0XHR0aGlzLl9tb3VzZVBpY2tlciA9IG5ldyBSYXljYXN0UGlja2VyKCk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fbW91c2VQaWNrZXIgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB4KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFJlbmRlcmVyLng7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BSZW5kZXJlci54ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFJlbmRlcmVyLnggPT0gdmFsdWU7XG5cdFx0dGhpcy5faHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlICsgXCJweFwiO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHkoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUmVuZGVyZXIueTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeSh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcFJlbmRlcmVyLnkgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wUmVuZGVyZXIueSA9PSB2YWx1ZTtcblx0XHR0aGlzLl9odG1sRWxlbWVudC5zdHlsZS50b3AgPSB2YWx1ZSArIFwicHhcIjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB2aXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLl9odG1sRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID09IFwidmlzaWJsZVwiKTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5faHRtbEVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IHZhbHVlPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XG5cdFx0Ly9UT0RPIHRyYW5zZmVyIHZpc2libGUgcHJvcGVydHkgdG8gYXNzb2NpYXRlZCBjb250ZXh0IChpZiBvbmUgZXhpc3RzKVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJlbmRlcmVkRmFjZXNDb3VudCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIDA7IC8vVE9ET1xuXHRcdC8vcmV0dXJuIHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IuX3BOdW1UcmlhbmdsZXM7Ly9udW1UcmlhbmdsZXM7XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVycyB0aGUgdmlldy5cblx0ICovXG5cdHB1YmxpYyByZW5kZXIoKVxuXHR7XG5cdFx0dGhpcy5wVXBkYXRlVGltZSgpO1xuXG5cdFx0Ly91cGRhdGUgdmlldyBhbmQgc2l6ZSBkYXRhXG5cdFx0dGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLl9pQXNwZWN0UmF0aW8gPSB0aGlzLl9hc3BlY3RSYXRpbztcblxuXHRcdGlmICh0aGlzLl9zY2lzc29yRGlydHkpIHtcblx0XHRcdHRoaXMuX3NjaXNzb3JEaXJ0eSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLl9pVXBkYXRlU2Npc3NvclJlY3QodGhpcy5fcFJlbmRlcmVyLnNjaXNzb3JSZWN0LngsIHRoaXMuX3BSZW5kZXJlci5zY2lzc29yUmVjdC55LCB0aGlzLl9wUmVuZGVyZXIuc2Npc3NvclJlY3Qud2lkdGgsIHRoaXMuX3BSZW5kZXJlci5zY2lzc29yUmVjdC5oZWlnaHQpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl92aWV3cG9ydERpcnR5KSB7XG5cdFx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24uX2lVcGRhdGVWaWV3cG9ydCh0aGlzLl9wUmVuZGVyZXIudmlld1BvcnQueCwgdGhpcy5fcFJlbmRlcmVyLnZpZXdQb3J0LnksIHRoaXMuX3BSZW5kZXJlci52aWV3UG9ydC53aWR0aCwgdGhpcy5fcFJlbmRlcmVyLnZpZXdQb3J0LmhlaWdodCk7XG5cdFx0fVxuXG5cdFx0Ly8gdXBkYXRlIHBpY2tpbmdcblx0XHRpZiAoIXRoaXMuX3NoYXJlQ29udGV4dCkge1xuXHRcdFx0aWYgKHRoaXMuZm9yY2VNb3VzZU1vdmUgJiYgdGhpcy5faHRtbEVsZW1lbnQgPT0gdGhpcy5fbW91c2VNYW5hZ2VyLl9pQWN0aXZlRGl2ICYmICF0aGlzLl9tb3VzZU1hbmFnZXIuX2lVcGRhdGVEaXJ0eSlcblx0XHRcdFx0dGhpcy5fbW91c2VNYW5hZ2VyLl9pQ29sbGlkaW5nT2JqZWN0ID0gdGhpcy5tb3VzZVBpY2tlci5nZXRWaWV3Q29sbGlzaW9uKHRoaXMuX3BNb3VzZVgsIHRoaXMuX3BNb3VzZVksIHRoaXMpO1xuXG5cdFx0XHR0aGlzLl9tb3VzZU1hbmFnZXIuZmlyZU1vdXNlRXZlbnRzKHRoaXMuZm9yY2VNb3VzZU1vdmUpO1xuXHRcdFx0Ly9fdG91Y2gzRE1hbmFnZXIuZmlyZVRvdWNoRXZlbnRzKCk7XG5cdFx0fVxuXHRcdC8vX3RvdWNoM0RNYW5hZ2VyLnVwZGF0ZUNvbGxpZGVyKCk7XG5cblx0XHQvL2NsZWFyIGVudGl0eSBjb2xsZWN0b3IgcmVhZHkgZm9yIGNvbGxlY3Rpb25cblx0XHR0aGlzLl9wRW50aXR5Q29sbGVjdG9yLmNsZWFyKCk7XG5cblx0XHQvLyBjb2xsZWN0IHN0dWZmIHRvIHJlbmRlclxuXHRcdHRoaXMuX3BTY2VuZS50cmF2ZXJzZVBhcnRpdGlvbnModGhpcy5fcEVudGl0eUNvbGxlY3Rvcik7XG5cblx0XHQvL3JlbmRlciB0aGUgY29udGVudHMgb2YgdGhlIGVudGl0eSBjb2xsZWN0b3Jcblx0XHR0aGlzLl9wUmVuZGVyZXIucmVuZGVyKHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgcFVwZGF0ZVRpbWUoKTp2b2lkXG5cdHtcblx0XHR2YXIgdGltZTpudW1iZXIgPSBnZXRUaW1lcigpO1xuXG5cdFx0aWYgKHRoaXMuX3RpbWUgPT0gMClcblx0XHRcdHRoaXMuX3RpbWUgPSB0aW1lO1xuXG5cdFx0dGhpcy5fZGVsdGFUaW1lID0gdGltZSAtIHRoaXMuX3RpbWU7XG5cdFx0dGhpcy5fdGltZSA9IHRpbWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHRoaXMuX3BSZW5kZXJlci5kaXNwb3NlKCk7XG5cblx0XHQvLyBUT0RPOiBpbWVwbGVtZW50IG1vdXNlTWFuYWdlciAvIHRvdWNoM0RNYW5hZ2VyXG5cdFx0dGhpcy5fbW91c2VNYW5hZ2VyLnVucmVnaXN0ZXJWaWV3KHRoaXMpO1xuXG5cdFx0Ly90aGlzLl90b3VjaDNETWFuYWdlci5kaXNhYmxlVG91Y2hMaXN0ZW5lcnModGhpcyk7XG5cdFx0Ly90aGlzLl90b3VjaDNETWFuYWdlci5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9tb3VzZU1hbmFnZXIgPSBudWxsO1xuXHRcdC8vdGhpcy5fdG91Y2gzRE1hbmFnZXIgPSBudWxsO1xuXG5cdFx0dGhpcy5fcFJlbmRlcmVyID0gbnVsbDtcblx0XHR0aGlzLl9wRW50aXR5Q29sbGVjdG9yID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBpRW50aXR5Q29sbGVjdG9yKCk6SUNvbGxlY3RvclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BFbnRpdHlDb2xsZWN0b3I7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHByaXZhdGUgb25Qcm9qZWN0aW9uQ2hhbmdlZChldmVudDpDYW1lcmFFdmVudClcblx0e1xuXHRcdHRoaXMuX3NjaXNzb3JEaXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5fdmlld3BvcnREaXJ0eSA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHByaXZhdGUgb25WaWV3cG9ydFVwZGF0ZWQoZXZlbnQ6UmVuZGVyZXJFdmVudClcblx0e1xuXHRcdHRoaXMuX3ZpZXdwb3J0RGlydHkgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwcml2YXRlIG9uU2Npc3NvclVwZGF0ZWQoZXZlbnQ6UmVuZGVyZXJFdmVudClcblx0e1xuXHRcdHRoaXMuX3NjaXNzb3JEaXJ0eSA9IHRydWU7XG5cdH1cblxuXHRwdWJsaWMgcHJvamVjdChwb2ludDNkOlZlY3RvcjNEKTpWZWN0b3IzRFxuXHR7XG5cdFx0dmFyIHY6VmVjdG9yM0QgPSB0aGlzLl9wQ2FtZXJhLnByb2plY3QocG9pbnQzZCk7XG5cdFx0di54ID0gdi54KnRoaXMuX3BSZW5kZXJlci52aWV3UG9ydC53aWR0aC8yICsgdGhpcy5fd2lkdGgqdGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLm9yaWdpblg7XG5cdFx0di55ID0gdi55KnRoaXMuX3BSZW5kZXJlci52aWV3UG9ydC5oZWlnaHQvMiArIHRoaXMuX2hlaWdodCp0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24ub3JpZ2luWTtcblxuXHRcdHJldHVybiB2O1xuXHR9XG5cblx0cHVibGljIHVucHJvamVjdChzWDpudW1iZXIsIHNZOm51bWJlciwgc1o6bnVtYmVyKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BDYW1lcmEudW5wcm9qZWN0KDIqKHNYIC0gdGhpcy5fd2lkdGgqdGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLm9yaWdpblgpL3RoaXMuX3BSZW5kZXJlci52aWV3UG9ydC53aWR0aCwgMiooc1kgLSB0aGlzLl9oZWlnaHQqdGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLm9yaWdpblkpL3RoaXMuX3BSZW5kZXJlci52aWV3UG9ydC5oZWlnaHQsIHNaKTtcblxuXHR9XG5cblx0cHVibGljIGdldFJheShzWDpudW1iZXIsIHNZOm51bWJlciwgc1o6bnVtYmVyKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BDYW1lcmEuZ2V0UmF5KChzWCoyIC0gdGhpcy5fd2lkdGgpL3RoaXMuX3dpZHRoLCAoc1kqMiAtIHRoaXMuX2hlaWdodCkvdGhpcy5faGVpZ2h0LCBzWik7XG5cdH1cblxuXHQvKiBUT0RPOiBpbXBsZW1lbnQgVG91Y2gzRE1hbmFnZXJcblx0IHB1YmxpYyBnZXQgdG91Y2hQaWNrZXIoKTpJUGlja2VyXG5cdCB7XG5cdCByZXR1cm4gdGhpcy5fdG91Y2gzRE1hbmFnZXIudG91Y2hQaWNrZXI7XG5cdCB9XG5cdCAqL1xuXHQvKiBUT0RPOiBpbXBsZW1lbnQgVG91Y2gzRE1hbmFnZXJcblx0IHB1YmxpYyBzZXQgdG91Y2hQaWNrZXIoIHZhbHVlOklQaWNrZXIpXG5cdCB7XG5cdCB0aGlzLl90b3VjaDNETWFuYWdlci50b3VjaFBpY2tlciA9IHZhbHVlO1xuXHQgfVxuXHQgKi9cblxuXHRwdWJsaWMgZm9yY2VNb3VzZU1vdmU6Ym9vbGVhbjtcblxuXHQvKlRPRE86IGltcGxlbWVudCBCYWNrZ3JvdW5kXG5cdCBwdWJsaWMgZ2V0IGJhY2tncm91bmQoKTphd2F5LnRleHR1cmVzLlRleHR1cmUyREJhc2Vcblx0IHtcblx0IHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kO1xuXHQgfVxuXHQgKi9cblx0LypUT0RPOiBpbXBsZW1lbnQgQmFja2dyb3VuZFxuXHQgcHVibGljIHNldCBiYWNrZ3JvdW5kKCB2YWx1ZTphd2F5LnRleHR1cmVzLlRleHR1cmUyREJhc2UgKVxuXHQge1xuXHQgdGhpcy5fYmFja2dyb3VuZCA9IHZhbHVlO1xuXHQgdGhpcy5fcmVuZGVyZXIuYmFja2dyb3VuZCA9IF9iYWNrZ3JvdW5kO1xuXHQgfVxuXHQgKi9cblxuXHQvLyBUT0RPOiByZXF1aXJlZCBkZXBlbmRlbmN5IHN0YWdlR0xcblx0cHVibGljIHVwZGF0ZUNvbGxpZGVyKClcblx0e1xuXHRcdGlmICghdGhpcy5fc2hhcmVDb250ZXh0KSB7XG5cdFx0XHRpZiAodGhpcy5faHRtbEVsZW1lbnQgPT0gdGhpcy5fbW91c2VNYW5hZ2VyLl9pQWN0aXZlRGl2KVxuXHRcdFx0XHR0aGlzLl9tb3VzZU1hbmFnZXIuX2lDb2xsaWRpbmdPYmplY3QgPSB0aGlzLm1vdXNlUGlja2VyLmdldFZpZXdDb2xsaXNpb24odGhpcy5fcE1vdXNlWCwgdGhpcy5fcE1vdXNlWSwgdGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBjb2xsaWRpbmdPYmplY3Q6UGlja2luZ0NvbGxpc2lvblZPID0gdGhpcy5tb3VzZVBpY2tlci5nZXRWaWV3Q29sbGlzaW9uKHRoaXMuX3BNb3VzZVgsIHRoaXMuX3BNb3VzZVksIHRoaXMpO1xuXG5cdFx0XHRpZiAodGhpcy5sYXllcmVkVmlldyB8fCB0aGlzLl9tb3VzZU1hbmFnZXIuX2lDb2xsaWRpbmdPYmplY3QgPT0gbnVsbCB8fCBjb2xsaWRpbmdPYmplY3QucmF5RW50cnlEaXN0YW5jZSA8IHRoaXMuX21vdXNlTWFuYWdlci5faUNvbGxpZGluZ09iamVjdC5yYXlFbnRyeURpc3RhbmNlKVxuXHRcdFx0XHR0aGlzLl9tb3VzZU1hbmFnZXIuX2lDb2xsaWRpbmdPYmplY3QgPSBjb2xsaWRpbmdPYmplY3Q7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCA9IFZpZXc7Il19