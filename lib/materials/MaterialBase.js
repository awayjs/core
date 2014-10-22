var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlendMode = require("awayjs-core/lib/core/base/BlendMode");

var AssetType = require("awayjs-core/lib/core/library/AssetType");

var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");

var Event = require("awayjs-core/lib/events/Event");
var MaterialEvent = require("awayjs-core/lib/events/MaterialEvent");

/**
* MaterialBase forms an abstract base class for any material.
* A material consists of several passes, each of which constitutes at least one render call. Several passes could
* be used for special effects (render lighting for many lights in several passes, render an outline in a separate
* pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
* subsurface scattering, or rendering a depth map for specialized self-shadowing).
*
* Away3D provides default materials trough SinglePassMaterialBase and TriangleMaterial, which use modular
* methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
* shaders, or entire new material frameworks.
*/
var MaterialBase = (function (_super) {
    __extends(MaterialBase, _super);
    /**
    * Creates a new MaterialBase object.
    */
    function MaterialBase() {
        var _this = this;
        _super.call(this);
        this._materialPassData = new Array();
        this._materialData = new Array();
        this._pAlphaThreshold = 0;
        this._pAnimateUVs = false;
        this._enableLightFallOff = true;
        this._specularLightSources = 0x01;
        this._diffuseLightSources = 0x03;
        /**
        * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
        *
        * @private
        */
        this._iMaterialId = 0;
        this._iBaseScreenPassIndex = 0;
        this._bothSides = false;
        this._pScreenPassesInvalid = true;
        this._pBlendMode = BlendMode.NORMAL;
        this._numPasses = 0;
        this._mipmap = false;
        this._smooth = true;
        this._repeat = false;
        this._color = 0xFFFFFF;
        this._pHeight = 1;
        this._pWidth = 1;
        this._pRequiresBlending = false;

        this._iMaterialId = Number(this.id);

        this._owners = new Array();
        this._passes = new Array();

        this._onPassChangeDelegate = function (event) {
            return _this.onPassChange(event);
        };
        this._onLightChangeDelegate = function (event) {
            return _this.onLightsChange(event);
        };

        this.alphaPremultiplied = false; //TODO: work out why this is different for WebGL
    }
    Object.defineProperty(MaterialBase.prototype, "assetType", {
        /**
        * @inheritDoc
        */
        get: function () {
            return AssetType.MATERIAL;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MaterialBase.prototype, "height", {
        /**
        *
        */
        get: function () {
            return this._pHeight;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MaterialBase.prototype, "animationSet", {
        /**
        *
        */
        get: function () {
            return this._animationSet;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MaterialBase.prototype, "lightPicker", {
        /**
        * The light picker used by the material to provide lights to the material if it supports lighting.
        *
        * @see LightPickerBase
        * @see StaticLightPicker
        */
        get: function () {
            return this._pLightPicker;
        },
        set: function (value) {
            if (this._pLightPicker == value)
                return;

            if (this._pLightPicker)
                this._pLightPicker.removeEventListener(Event.CHANGE, this._onLightChangeDelegate);

            this._pLightPicker = value;

            if (this._pLightPicker)
                this._pLightPicker.addEventListener(Event.CHANGE, this._onLightChangeDelegate);

            this._pInvalidateScreenPasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "mipmap", {
        /**
        * Indicates whether or not any used textures should use mipmapping. Defaults to true.
        */
        get: function () {
            return this._mipmap;
        },
        set: function (value) {
            if (this._mipmap == value)
                return;

            this._mipmap = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "smooth", {
        /**
        * Indicates whether or not any used textures should use smoothing.
        */
        get: function () {
            return this._smooth;
        },
        set: function (value) {
            if (this._smooth == value)
                return;

            this._smooth = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "repeat", {
        /**
        * Indicates whether or not any used textures should be tiled. If set to false, texture samples are clamped to
        * the texture's borders when the uv coordinates are outside the [0, 1] interval.
        */
        get: function () {
            return this._repeat;
        },
        set: function (value) {
            if (this._repeat == value)
                return;

            this._repeat = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "color", {
        /**
        * The diffuse reflectivity color of the surface.
        */
        get: function () {
            return this._color;
        },
        set: function (value) {
            if (this._color == value)
                return;

            this._color = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "texture", {
        /**
        * The texture object to use for the albedo colour.
        */
        get: function () {
            return this._pTexture;
        },
        set: function (value) {
            if (this._pTexture == value)
                return;

            this._pTexture = value;

            this._pInvalidatePasses();

            this._pHeight = this._pTexture.height;
            this._pWidth = this._pTexture.width;

            this._pNotifySizeChanged();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "animateUVs", {
        /**
        * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
        */
        get: function () {
            return this._pAnimateUVs;
        },
        set: function (value) {
            if (this._pAnimateUVs == value)
                return;

            this._pAnimateUVs = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "enableLightFallOff", {
        /**
        * Whether or not to use fallOff and radius properties for lights. This can be used to improve performance and
        * compatibility for constrained mode.
        */
        get: function () {
            return this._enableLightFallOff;
        },
        set: function (value) {
            if (this._enableLightFallOff == value)
                return;

            this._enableLightFallOff = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "diffuseLightSources", {
        /**
        * Define which light source types to use for diffuse reflections. This allows choosing between regular lights
        * and/or light probes for diffuse reflections.
        *
        * @see away3d.materials.LightSources
        */
        get: function () {
            return this._diffuseLightSources;
        },
        set: function (value) {
            if (this._diffuseLightSources == value)
                return;

            this._diffuseLightSources = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "specularLightSources", {
        /**
        * Define which light source types to use for specular reflections. This allows choosing between regular lights
        * and/or light probes for specular reflections.
        *
        * @see away3d.materials.LightSources
        */
        get: function () {
            return this._specularLightSources;
        },
        set: function (value) {
            if (this._specularLightSources == value)
                return;

            this._specularLightSources = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    /**
    * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
    * could be used by other materials and will not be disposed.
    */
    MaterialBase.prototype.dispose = function () {
        var i;
        var len;

        this._pClearScreenPasses();

        len = this._materialData.length;
        for (i = 0; i < len; i++)
            this._materialData[i].dispose();

        this._materialData = new Array();

        len = this._materialPassData.length;
        for (i = 0; i < len; i++)
            this._materialPassData[i].dispose();

        this._materialPassData = new Array();
    };

    Object.defineProperty(MaterialBase.prototype, "bothSides", {
        /**
        * Defines whether or not the material should cull triangles facing away from the camera.
        */
        get: function () {
            return this._bothSides;
        },
        set: function (value) {
            if (this._bothSides = value)
                return;

            this._bothSides = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "blendMode", {
        /**
        * The blend mode to use when drawing this renderable. The following blend modes are supported:
        * <ul>
        * <li>BlendMode.NORMAL: No blending, unless the material inherently needs it</li>
        * <li>BlendMode.LAYER: Force blending. This will draw the object the same as NORMAL, but without writing depth writes.</li>
        * <li>BlendMode.MULTIPLY</li>
        * <li>BlendMode.ADD</li>
        * <li>BlendMode.ALPHA</li>
        * </ul>
        */
        get: function () {
            return this._pBlendMode;
        },
        set: function (value) {
            if (this._pBlendMode == value)
                return;

            this._pBlendMode = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "alphaPremultiplied", {
        /**
        * Indicates whether visible textures (or other pixels) used by this material have
        * already been premultiplied. Toggle this if you are seeing black halos around your
        * blended alpha edges.
        */
        get: function () {
            return this._alphaPremultiplied;
        },
        set: function (value) {
            if (this._alphaPremultiplied == value)
                return;

            this._alphaPremultiplied = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "alphaThreshold", {
        /**
        * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
        * invisible or entirely opaque, often used with textures for foliage, etc.
        * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
        */
        get: function () {
            return this._pAlphaThreshold;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            else if (value > 1)
                value = 1;

            if (this._pAlphaThreshold == value)
                return;

            this._pAlphaThreshold = value;

            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(MaterialBase.prototype, "requiresBlending", {
        /**
        * Indicates whether or not the material requires alpha blending during rendering.
        */
        get: function () {
            return this._pRequiresBlending;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MaterialBase.prototype, "width", {
        /**
        *
        */
        get: function () {
            return this._pWidth;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Sets the render state for a pass that is independent of the rendered object. This needs to be called before
    * calling renderPass. Before activating a pass, the previously used pass needs to be deactivated.
    * @param pass The pass data to activate.
    * @param stage The Stage object which is currently used for rendering.
    * @param camera The camera from which the scene is viewed.
    * @private
    */
    MaterialBase.prototype._iActivatePass = function (pass, stage, camera) {
        pass.materialPass._iActivate(pass, stage, camera);
    };

    /**
    * Clears the render state for a pass. This needs to be called before activating another pass.
    * @param pass The pass to deactivate.
    * @param stage The Stage used for rendering
    *
    * @internal
    */
    MaterialBase.prototype._iDeactivatePass = function (pass, stage) {
        pass.materialPass._iDeactivate(pass, stage);
    };

    /**
    * Renders the current pass. Before calling renderPass, activatePass needs to be called with the same index.
    * @param pass The pass used to render the renderable.
    * @param renderable The IRenderable object to draw.
    * @param stage The Stage object used for rendering.
    * @param entityCollector The EntityCollector object that contains the visible scene data.
    * @param viewProjection The view-projection matrix used to project to the screen. This is not the same as
    * camera.viewProjection as it includes the scaling factors when rendering to textures.
    *
    * @internal
    */
    MaterialBase.prototype._iRenderPass = function (pass, renderable, stage, camera, viewProjection) {
        if (this._pLightPicker)
            this._pLightPicker.collectLights(renderable);

        pass.materialPass._iRender(pass, renderable, stage, camera, viewProjection);
    };

    //
    // MATERIAL MANAGEMENT
    //
    /**
    * Mark an IMaterialOwner as owner of this material.
    * Assures we're not using the same material across renderables with different animations, since the
    * Programs depend on animation. This method needs to be called when a material is assigned.
    *
    * @param owner The IMaterialOwner that had this material assigned
    *
    * @internal
    */
    MaterialBase.prototype.iAddOwner = function (owner) {
        this._owners.push(owner);

        var animationSet;
        var animator = owner.animator;

        if (animator)
            animationSet = animator.animationSet;

        if (owner.animator) {
            if (this._animationSet && animationSet != this._animationSet) {
                throw new Error("A Material instance cannot be shared across material owners with different animation sets");
            } else {
                if (this._animationSet != animationSet) {
                    this._animationSet = animationSet;

                    this.invalidateAnimation();
                }
            }
        }
    };

    /**
    * Removes an IMaterialOwner as owner.
    * @param owner
    *
    * @internal
    */
    MaterialBase.prototype.iRemoveOwner = function (owner) {
        this._owners.splice(this._owners.indexOf(owner), 1);

        if (this._owners.length == 0) {
            this._animationSet = null;

            this.invalidateAnimation();
        }
    };

    Object.defineProperty(MaterialBase.prototype, "iOwners", {
        /**
        * A list of the IMaterialOwners that use this material
        *
        * @private
        */
        get: function () {
            return this._owners;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * The amount of passes used by the material.
    *
    * @private
    */
    MaterialBase.prototype._iNumScreenPasses = function () {
        return this._numPasses;
    };

    Object.defineProperty(MaterialBase.prototype, "_iScreenPasses", {
        /**
        * A list of the screen passes used in this material
        *
        * @private
        */
        get: function () {
            return this._passes;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
    *
    * @private
    */
    MaterialBase.prototype._pInvalidatePasses = function () {
        var len = this._materialPassData.length;
        for (var i = 0; i < len; i++)
            this._materialPassData[i].invalidate();

        this.invalidateMaterial();
    };

    /**
    * Flags that the screen passes have become invalid and need possible re-ordering / adding / deleting
    */
    MaterialBase.prototype._pInvalidateScreenPasses = function () {
        this._pScreenPassesInvalid = true;
    };

    /**
    * Removes a pass from the material.
    * @param pass The pass to be removed.
    */
    MaterialBase.prototype._pRemoveScreenPass = function (pass) {
        pass.removeEventListener(Event.CHANGE, this._onPassChangeDelegate);
        this._passes.splice(this._passes.indexOf(pass), 1);

        this._numPasses--;
    };

    /**
    * Removes all passes from the material
    */
    MaterialBase.prototype._pClearScreenPasses = function () {
        for (var i = 0; i < this._numPasses; ++i)
            this._passes[i].removeEventListener(Event.CHANGE, this._onPassChangeDelegate);

        this._passes.length = this._numPasses = 0;
    };

    /**
    * Adds a pass to the material
    * @param pass
    */
    MaterialBase.prototype._pAddScreenPass = function (pass) {
        this._passes[this._numPasses++] = pass;

        pass.lightPicker = this._pLightPicker;
        pass.addEventListener(Event.CHANGE, this._onPassChangeDelegate);

        this.invalidateMaterial();
    };

    MaterialBase.prototype._iAddMaterialData = function (materialData) {
        this._materialData.push(materialData);

        return materialData;
    };

    MaterialBase.prototype._iRemoveMaterialData = function (materialData) {
        this._materialData.splice(this._materialData.indexOf(materialData), 1);

        return materialData;
    };

    /**
    * Performs any processing that needs to occur before any of its passes are used.
    *
    * @private
    */
    MaterialBase.prototype._iUpdateMaterial = function () {
    };

    /**
    * Listener for when a pass's shader code changes. It recalculates the render order id.
    */
    MaterialBase.prototype.onPassChange = function (event) {
        this.invalidateMaterial();
    };

    MaterialBase.prototype.invalidateAnimation = function () {
        var len = this._materialData.length;
        for (var i = 0; i < len; i++)
            this._materialData[i].invalidateAnimation();
    };

    MaterialBase.prototype.invalidateMaterial = function () {
        var len = this._materialData.length;
        for (var i = 0; i < len; i++)
            this._materialData[i].invalidateMaterial();
    };

    /**
    * Called when the light picker's configuration changed.
    */
    MaterialBase.prototype.onLightsChange = function (event) {
        this._pInvalidateScreenPasses();
    };

    MaterialBase.prototype._pNotifySizeChanged = function () {
        if (!this._sizeChanged)
            this._sizeChanged = new MaterialEvent(MaterialEvent.SIZE_CHANGED);

        this.dispatchEvent(this._sizeChanged);
    };

    MaterialBase.prototype._iAddMaterialPassData = function (materialPassData) {
        this._materialPassData.push(materialPassData);

        return materialPassData;
    };

    MaterialBase.prototype._iRemoveMaterialPassData = function (materialPassData) {
        this._materialPassData.splice(this._materialPassData.indexOf(materialPassData), 1);

        return materialPassData;
    };
    return MaterialBase;
})(NamedAssetBase);

module.exports = MaterialBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFscy9NYXRlcmlhbEJhc2UudHMiXSwibmFtZXMiOlsiTWF0ZXJpYWxCYXNlIiwiTWF0ZXJpYWxCYXNlLmNvbnN0cnVjdG9yIiwiTWF0ZXJpYWxCYXNlLmRpc3Bvc2UiLCJNYXRlcmlhbEJhc2UuX2lBY3RpdmF0ZVBhc3MiLCJNYXRlcmlhbEJhc2UuX2lEZWFjdGl2YXRlUGFzcyIsIk1hdGVyaWFsQmFzZS5faVJlbmRlclBhc3MiLCJNYXRlcmlhbEJhc2UuaUFkZE93bmVyIiwiTWF0ZXJpYWxCYXNlLmlSZW1vdmVPd25lciIsIk1hdGVyaWFsQmFzZS5faU51bVNjcmVlblBhc3NlcyIsIk1hdGVyaWFsQmFzZS5fcEludmFsaWRhdGVQYXNzZXMiLCJNYXRlcmlhbEJhc2UuX3BJbnZhbGlkYXRlU2NyZWVuUGFzc2VzIiwiTWF0ZXJpYWxCYXNlLl9wUmVtb3ZlU2NyZWVuUGFzcyIsIk1hdGVyaWFsQmFzZS5fcENsZWFyU2NyZWVuUGFzc2VzIiwiTWF0ZXJpYWxCYXNlLl9wQWRkU2NyZWVuUGFzcyIsIk1hdGVyaWFsQmFzZS5faUFkZE1hdGVyaWFsRGF0YSIsIk1hdGVyaWFsQmFzZS5faVJlbW92ZU1hdGVyaWFsRGF0YSIsIk1hdGVyaWFsQmFzZS5faVVwZGF0ZU1hdGVyaWFsIiwiTWF0ZXJpYWxCYXNlLm9uUGFzc0NoYW5nZSIsIk1hdGVyaWFsQmFzZS5pbnZhbGlkYXRlQW5pbWF0aW9uIiwiTWF0ZXJpYWxCYXNlLmludmFsaWRhdGVNYXRlcmlhbCIsIk1hdGVyaWFsQmFzZS5vbkxpZ2h0c0NoYW5nZSIsIk1hdGVyaWFsQmFzZS5fcE5vdGlmeVNpemVDaGFuZ2VkIiwiTWF0ZXJpYWxCYXNlLl9pQWRkTWF0ZXJpYWxQYXNzRGF0YSIsIk1hdGVyaWFsQmFzZS5faVJlbW92ZU1hdGVyaWFsUGFzc0RhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhEQUVxRTs7QUFJckUsaUVBQXdFOztBQUV4RSwyRUFBaUY7O0FBS2pGLG1EQUEyRDtBQUMzRCxtRUFB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OztRQUU3Q0EsT0FBT0EsZ0JBQWdCQTtJQUN4QkEsQ0FBQ0E7O0lBRUR0QixrREFBQUEsVUFBZ0NBLGdCQUFrQ0E7UUFFakV1QixJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs7UUFFbEZBLE9BQU9BLGdCQUFnQkE7SUFDeEJBLENBQUNBO0lBQ0Z2QixvQkFBQ0E7QUFBREEsQ0FBQ0EsRUE1ckIwQixjQUFjLEVBNHJCeEM7O0FBRUQsNkJBQXNCLENBQUEiLCJmaWxlIjoibWF0ZXJpYWxzL01hdGVyaWFsQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJQW5pbWF0aW9uU2V0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2FuaW1hdG9ycy9JQW5pbWF0aW9uU2V0XCIpO1xuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0JsZW5kTW9kZVwiKTtcbmltcG9ydCBJTWF0ZXJpYWxPd25lclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvSU1hdGVyaWFsT3duZXJcIik7XG5pbXBvcnQgSVN0YWdlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvSVN0YWdlXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xuaW1wb3J0IElSZW5kZXJhYmxlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9wb29sL0lSZW5kZXJhYmxlXCIpO1xuaW1wb3J0IElNYXRlcmlhbERhdGFcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9wb29sL0lNYXRlcmlhbERhdGFcIik7XG5pbXBvcnQgSU1hdGVyaWFsUGFzc0RhdGFcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvcG9vbC9JTWF0ZXJpYWxQYXNzRGF0YVwiKTtcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuaW1wb3J0IE1hdGVyaWFsRXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL01hdGVyaWFsRXZlbnRcIik7XG5pbXBvcnQgTGlnaHRQaWNrZXJCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL21hdGVyaWFscy9saWdodHBpY2tlcnMvTGlnaHRQaWNrZXJCYXNlXCIpO1xuaW1wb3J0IElNYXRlcmlhbFBhc3NcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbWF0ZXJpYWxzL3Bhc3Nlcy9JTWF0ZXJpYWxQYXNzXCIpO1xuaW1wb3J0IFRleHR1cmUyREJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcblxuXG4vKipcbiAqIE1hdGVyaWFsQmFzZSBmb3JtcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBhbnkgbWF0ZXJpYWwuXG4gKiBBIG1hdGVyaWFsIGNvbnNpc3RzIG9mIHNldmVyYWwgcGFzc2VzLCBlYWNoIG9mIHdoaWNoIGNvbnN0aXR1dGVzIGF0IGxlYXN0IG9uZSByZW5kZXIgY2FsbC4gU2V2ZXJhbCBwYXNzZXMgY291bGRcbiAqIGJlIHVzZWQgZm9yIHNwZWNpYWwgZWZmZWN0cyAocmVuZGVyIGxpZ2h0aW5nIGZvciBtYW55IGxpZ2h0cyBpbiBzZXZlcmFsIHBhc3NlcywgcmVuZGVyIGFuIG91dGxpbmUgaW4gYSBzZXBhcmF0ZVxuICogcGFzcykgb3IgdG8gcHJvdmlkZSBhZGRpdGlvbmFsIHJlbmRlci10by10ZXh0dXJlIHBhc3NlcyAocmVuZGVyaW5nIGRpZmZ1c2UgbGlnaHQgdG8gdGV4dHVyZSBmb3IgdGV4dHVyZS1zcGFjZVxuICogc3Vic3VyZmFjZSBzY2F0dGVyaW5nLCBvciByZW5kZXJpbmcgYSBkZXB0aCBtYXAgZm9yIHNwZWNpYWxpemVkIHNlbGYtc2hhZG93aW5nKS5cbiAqXG4gKiBBd2F5M0QgcHJvdmlkZXMgZGVmYXVsdCBtYXRlcmlhbHMgdHJvdWdoIFNpbmdsZVBhc3NNYXRlcmlhbEJhc2UgYW5kIFRyaWFuZ2xlTWF0ZXJpYWwsIHdoaWNoIHVzZSBtb2R1bGFyXG4gKiBtZXRob2RzIHRvIGJ1aWxkIHRoZSBzaGFkZXIgY29kZS4gTWF0ZXJpYWxCYXNlIGNhbiBiZSBleHRlbmRlZCB0byBidWlsZCBzcGVjaWZpYyBhbmQgaGlnaC1wZXJmb3JtYW50IGN1c3RvbVxuICogc2hhZGVycywgb3IgZW50aXJlIG5ldyBtYXRlcmlhbCBmcmFtZXdvcmtzLlxuICovXG5jbGFzcyBNYXRlcmlhbEJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElBc3NldFxue1xuXHRwcml2YXRlIF9zaXplQ2hhbmdlZDpNYXRlcmlhbEV2ZW50O1xuXHRwcml2YXRlIF9tYXRlcmlhbFBhc3NEYXRhOkFycmF5PElNYXRlcmlhbFBhc3NEYXRhPiA9IG5ldyBBcnJheTxJTWF0ZXJpYWxQYXNzRGF0YT4oKTtcblx0cHJpdmF0ZSBfbWF0ZXJpYWxEYXRhOkFycmF5PElNYXRlcmlhbERhdGE+ID0gbmV3IEFycmF5PElNYXRlcmlhbERhdGE+KCk7XG5cblx0cHVibGljIF9wQWxwaGFUaHJlc2hvbGQ6bnVtYmVyID0gMDtcblx0cHVibGljIF9wQW5pbWF0ZVVWczpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX2VuYWJsZUxpZ2h0RmFsbE9mZjpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc3BlY3VsYXJMaWdodFNvdXJjZXM6bnVtYmVyID0gMHgwMTtcblx0cHJpdmF0ZSBfZGlmZnVzZUxpZ2h0U291cmNlczpudW1iZXIgPSAweDAzO1xuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3QgdG8gY29udGFpbiBhbnkgZXh0cmEgZGF0YS5cblx0ICovXG5cdHB1YmxpYyBleHRyYTpPYmplY3Q7XG5cblx0LyoqXG5cdCAqIEEgdmFsdWUgdGhhdCBjYW4gYmUgdXNlZCBieSBtYXRlcmlhbHMgdGhhdCBvbmx5IHdvcmsgd2l0aCBhIGdpdmVuIHR5cGUgb2YgcmVuZGVyZXIuIFRoZSByZW5kZXJlciBjYW4gdGVzdCB0aGVcblx0ICogY2xhc3NpZmljYXRpb24gdG8gY2hvb3NlIHdoaWNoIHJlbmRlciBwYXRoIHRvIHVzZS4gRm9yIGV4YW1wbGUsIGEgZGVmZXJyZWQgbWF0ZXJpYWwgY291bGQgc2V0IHRoaXMgdmFsdWUgc29cblx0ICogdGhhdCB0aGUgZGVmZXJyZWQgcmVuZGVyZXIga25vd3Mgbm90IHRvIHRha2UgdGhlIGZvcndhcmQgcmVuZGVyaW5nIHBhdGguXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX2lDbGFzc2lmaWNhdGlvbjpzdHJpbmc7XG5cblxuXHQvKipcblx0ICogQW4gaWQgZm9yIHRoaXMgbWF0ZXJpYWwgdXNlZCB0byBzb3J0IHRoZSByZW5kZXJhYmxlcyBieSBzaGFkZXIgcHJvZ3JhbSwgd2hpY2ggcmVkdWNlcyBQcm9ncmFtIHN0YXRlIGNoYW5nZXMuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX2lNYXRlcmlhbElkOm51bWJlciA9IDA7XG5cblx0cHVibGljIF9pQmFzZVNjcmVlblBhc3NJbmRleDpudW1iZXIgPSAwO1xuXG5cdHByaXZhdGUgX2JvdGhTaWRlczpib29sZWFuID0gZmFsc2U7IC8vIHVwZGF0ZVxuXHRwcml2YXRlIF9hbmltYXRpb25TZXQ6SUFuaW1hdGlvblNldDtcblx0cHVibGljIF9wU2NyZWVuUGFzc2VzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcblxuXHQvKipcblx0ICogQSBsaXN0IG9mIG1hdGVyaWFsIG93bmVycywgcmVuZGVyYWJsZXMgb3IgY3VzdG9tIEVudGl0aWVzLlxuXHQgKi9cblx0cHJpdmF0ZSBfb3duZXJzOkFycmF5PElNYXRlcmlhbE93bmVyPjtcblxuXHRwcml2YXRlIF9hbHBoYVByZW11bHRpcGxpZWQ6Ym9vbGVhbjtcblxuXHRwdWJsaWMgX3BCbGVuZE1vZGU6c3RyaW5nID0gQmxlbmRNb2RlLk5PUk1BTDtcblxuXHRwcml2YXRlIF9udW1QYXNzZXM6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfcGFzc2VzOkFycmF5PElNYXRlcmlhbFBhc3M+O1xuXG5cdHByaXZhdGUgX21pcG1hcDpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX3Ntb290aDpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcmVwZWF0OmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfY29sb3I6bnVtYmVyID0gMHhGRkZGRkY7XG5cdHB1YmxpYyBfcFRleHR1cmU6VGV4dHVyZTJEQmFzZTtcblxuXHRwdWJsaWMgX3BMaWdodFBpY2tlcjpMaWdodFBpY2tlckJhc2U7XG5cblx0cHVibGljIF9wSGVpZ2h0Om51bWJlciA9IDE7XG5cdHB1YmxpYyBfcFdpZHRoOm51bWJlciA9IDE7XG5cdHB1YmxpYyBfcFJlcXVpcmVzQmxlbmRpbmc6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdHByaXZhdGUgX29uUGFzc0NoYW5nZURlbGVnYXRlOihldmVudDpFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25MaWdodENoYW5nZURlbGVnYXRlOihldmVudDpFdmVudCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBNYXRlcmlhbEJhc2Ugb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX2lNYXRlcmlhbElkID0gTnVtYmVyKHRoaXMuaWQpO1xuXG5cdFx0dGhpcy5fb3duZXJzID0gbmV3IEFycmF5PElNYXRlcmlhbE93bmVyPigpO1xuXHRcdHRoaXMuX3Bhc3NlcyA9IG5ldyBBcnJheTxJTWF0ZXJpYWxQYXNzPigpO1xuXG5cdFx0dGhpcy5fb25QYXNzQ2hhbmdlRGVsZWdhdGUgPSAoZXZlbnQ6RXZlbnQpID0+IHRoaXMub25QYXNzQ2hhbmdlKGV2ZW50KTtcblx0XHR0aGlzLl9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGUgPSAoZXZlbnQ6RXZlbnQpID0+IHRoaXMub25MaWdodHNDaGFuZ2UoZXZlbnQpO1xuXG5cdFx0dGhpcy5hbHBoYVByZW11bHRpcGxpZWQgPSBmYWxzZTsgLy9UT0RPOiB3b3JrIG91dCB3aHkgdGhpcyBpcyBkaWZmZXJlbnQgZm9yIFdlYkdMXG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLk1BVEVSSUFMO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BIZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYW5pbWF0aW9uU2V0KCk6SUFuaW1hdGlvblNldFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FuaW1hdGlvblNldDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFRoZSBsaWdodCBwaWNrZXIgdXNlZCBieSB0aGUgbWF0ZXJpYWwgdG8gcHJvdmlkZSBsaWdodHMgdG8gdGhlIG1hdGVyaWFsIGlmIGl0IHN1cHBvcnRzIGxpZ2h0aW5nLlxuXHQgKlxuXHQgKiBAc2VlIExpZ2h0UGlja2VyQmFzZVxuXHQgKiBAc2VlIFN0YXRpY0xpZ2h0UGlja2VyXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxpZ2h0UGlja2VyKCk6TGlnaHRQaWNrZXJCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcExpZ2h0UGlja2VyO1xuXHR9XG5cblx0cHVibGljIHNldCBsaWdodFBpY2tlcih2YWx1ZTpMaWdodFBpY2tlckJhc2UpXG5cdHtcblx0XHRpZiAodGhpcy5fcExpZ2h0UGlja2VyID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0aWYgKHRoaXMuX3BMaWdodFBpY2tlcilcblx0XHRcdHRoaXMuX3BMaWdodFBpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKEV2ZW50LkNIQU5HRSwgdGhpcy5fb25MaWdodENoYW5nZURlbGVnYXRlKTtcblxuXHRcdHRoaXMuX3BMaWdodFBpY2tlciA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX3BMaWdodFBpY2tlcilcblx0XHRcdHRoaXMuX3BMaWdodFBpY2tlci5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNIQU5HRSwgdGhpcy5fb25MaWdodENoYW5nZURlbGVnYXRlKTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlU2NyZWVuUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFueSB1c2VkIHRleHR1cmVzIHNob3VsZCB1c2UgbWlwbWFwcGluZy4gRGVmYXVsdHMgdG8gdHJ1ZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgbWlwbWFwKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21pcG1hcDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWlwbWFwKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fbWlwbWFwID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fbWlwbWFwID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgdXNlIHNtb290aGluZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgc21vb3RoKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3Ntb290aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc21vb3RoKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fc21vb3RoID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc21vb3RoID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgYmUgdGlsZWQuIElmIHNldCB0byBmYWxzZSwgdGV4dHVyZSBzYW1wbGVzIGFyZSBjbGFtcGVkIHRvXG5cdCAqIHRoZSB0ZXh0dXJlJ3MgYm9yZGVycyB3aGVuIHRoZSB1diBjb29yZGluYXRlcyBhcmUgb3V0c2lkZSB0aGUgWzAsIDFdIGludGVydmFsLlxuXHQgKi9cblx0cHVibGljIGdldCByZXBlYXQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcmVwZWF0O1xuXHR9XG5cblx0cHVibGljIHNldCByZXBlYXQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9yZXBlYXQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yZXBlYXQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGRpZmZ1c2UgcmVmbGVjdGl2aXR5IGNvbG9yIG9mIHRoZSBzdXJmYWNlLlxuXHQgKi9cblx0cHVibGljIGdldCBjb2xvcigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbG9yO1xuXHR9XG5cblx0cHVibGljIHNldCBjb2xvcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fY29sb3IgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9jb2xvciA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdGV4dHVyZSBvYmplY3QgdG8gdXNlIGZvciB0aGUgYWxiZWRvIGNvbG91ci5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGV4dHVyZSgpOlRleHR1cmUyREJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wVGV4dHVyZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdGV4dHVyZSh2YWx1ZTpUZXh0dXJlMkRCYXNlKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BUZXh0dXJlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFRleHR1cmUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cblx0XHR0aGlzLl9wSGVpZ2h0ID0gdGhpcy5fcFRleHR1cmUuaGVpZ2h0O1xuXHRcdHRoaXMuX3BXaWR0aCA9IHRoaXMuX3BUZXh0dXJlLndpZHRoO1xuXG5cdFx0dGhpcy5fcE5vdGlmeVNpemVDaGFuZ2VkKCk7XG5cdH1cblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRoZSBVViBjb29yZGluYXRlcyBzaG91bGQgYmUgYW5pbWF0ZWQgdXNpbmcgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdGVVVnMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEFuaW1hdGVVVnM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGFuaW1hdGVVVnModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9wQW5pbWF0ZVVWcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BBbmltYXRlVVZzID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgb3Igbm90IHRvIHVzZSBmYWxsT2ZmIGFuZCByYWRpdXMgcHJvcGVydGllcyBmb3IgbGlnaHRzLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGltcHJvdmUgcGVyZm9ybWFuY2UgYW5kXG5cdCAqIGNvbXBhdGliaWxpdHkgZm9yIGNvbnN0cmFpbmVkIG1vZGUuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGVuYWJsZUxpZ2h0RmFsbE9mZigpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbmFibGVMaWdodEZhbGxPZmY7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGVuYWJsZUxpZ2h0RmFsbE9mZih2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2VuYWJsZUxpZ2h0RmFsbE9mZiA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2VuYWJsZUxpZ2h0RmFsbE9mZiA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmUgd2hpY2ggbGlnaHQgc291cmNlIHR5cGVzIHRvIHVzZSBmb3IgZGlmZnVzZSByZWZsZWN0aW9ucy4gVGhpcyBhbGxvd3MgY2hvb3NpbmcgYmV0d2VlbiByZWd1bGFyIGxpZ2h0c1xuXHQgKiBhbmQvb3IgbGlnaHQgcHJvYmVzIGZvciBkaWZmdXNlIHJlZmxlY3Rpb25zLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkzZC5tYXRlcmlhbHMuTGlnaHRTb3VyY2VzXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRpZmZ1c2VMaWdodFNvdXJjZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kaWZmdXNlTGlnaHRTb3VyY2VzO1xuXHR9XG5cblx0cHVibGljIHNldCBkaWZmdXNlTGlnaHRTb3VyY2VzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9kaWZmdXNlTGlnaHRTb3VyY2VzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZGlmZnVzZUxpZ2h0U291cmNlcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmUgd2hpY2ggbGlnaHQgc291cmNlIHR5cGVzIHRvIHVzZSBmb3Igc3BlY3VsYXIgcmVmbGVjdGlvbnMuIFRoaXMgYWxsb3dzIGNob29zaW5nIGJldHdlZW4gcmVndWxhciBsaWdodHNcblx0ICogYW5kL29yIGxpZ2h0IHByb2JlcyBmb3Igc3BlY3VsYXIgcmVmbGVjdGlvbnMuXG5cdCAqXG5cdCAqIEBzZWUgYXdheTNkLm1hdGVyaWFscy5MaWdodFNvdXJjZXNcblx0ICovXG5cdHB1YmxpYyBnZXQgc3BlY3VsYXJMaWdodFNvdXJjZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zcGVjdWxhckxpZ2h0U291cmNlcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgc3BlY3VsYXJMaWdodFNvdXJjZXModmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NwZWN1bGFyTGlnaHRTb3VyY2VzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc3BlY3VsYXJMaWdodFNvdXJjZXMgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xlYW5zIHVwIHJlc291cmNlcyBvd25lZCBieSB0aGUgbWF0ZXJpYWwsIGluY2x1ZGluZyBwYXNzZXMuIFRleHR1cmVzIGFyZSBub3Qgb3duZWQgYnkgdGhlIG1hdGVyaWFsIHNpbmNlIHRoZXlcblx0ICogY291bGQgYmUgdXNlZCBieSBvdGhlciBtYXRlcmlhbHMgYW5kIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBsZW46bnVtYmVyO1xuXG5cdFx0dGhpcy5fcENsZWFyU2NyZWVuUGFzc2VzKCk7XG5cblx0XHRsZW4gPSB0aGlzLl9tYXRlcmlhbERhdGEubGVuZ3RoO1xuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX21hdGVyaWFsRGF0YVtpXS5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9tYXRlcmlhbERhdGEgPSBuZXcgQXJyYXk8SU1hdGVyaWFsRGF0YT4oKTtcblxuXHRcdGxlbiA9IHRoaXMuX21hdGVyaWFsUGFzc0RhdGEubGVuZ3RoO1xuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX21hdGVyaWFsUGFzc0RhdGFbaV0uZGlzcG9zZSgpO1xuXG5cdFx0dGhpcy5fbWF0ZXJpYWxQYXNzRGF0YSA9IG5ldyBBcnJheTxJTWF0ZXJpYWxQYXNzRGF0YT4oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRlcmlhbCBzaG91bGQgY3VsbCB0cmlhbmdsZXMgZmFjaW5nIGF3YXkgZnJvbSB0aGUgY2FtZXJhLlxuXHQgKi9cblx0cHVibGljIGdldCBib3RoU2lkZXMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm90aFNpZGVzO1xuXHR9XG5cblx0cHVibGljIHNldCBib3RoU2lkZXModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9ib3RoU2lkZXMgPSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JvdGhTaWRlcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYmxlbmQgbW9kZSB0byB1c2Ugd2hlbiBkcmF3aW5nIHRoaXMgcmVuZGVyYWJsZS4gVGhlIGZvbGxvd2luZyBibGVuZCBtb2RlcyBhcmUgc3VwcG9ydGVkOlxuXHQgKiA8dWw+XG5cdCAqIDxsaT5CbGVuZE1vZGUuTk9STUFMOiBObyBibGVuZGluZywgdW5sZXNzIHRoZSBtYXRlcmlhbCBpbmhlcmVudGx5IG5lZWRzIGl0PC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5MQVlFUjogRm9yY2UgYmxlbmRpbmcuIFRoaXMgd2lsbCBkcmF3IHRoZSBvYmplY3QgdGhlIHNhbWUgYXMgTk9STUFMLCBidXQgd2l0aG91dCB3cml0aW5nIGRlcHRoIHdyaXRlcy48L2xpPlxuXHQgKiA8bGk+QmxlbmRNb2RlLk1VTFRJUExZPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5BREQ8L2xpPlxuXHQgKiA8bGk+QmxlbmRNb2RlLkFMUEhBPC9saT5cblx0ICogPC91bD5cblx0ICovXG5cdHB1YmxpYyBnZXQgYmxlbmRNb2RlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEJsZW5kTW9kZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYmxlbmRNb2RlKHZhbHVlOnN0cmluZylcblx0e1xuXHRcdGlmICh0aGlzLl9wQmxlbmRNb2RlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcEJsZW5kTW9kZSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB2aXNpYmxlIHRleHR1cmVzIChvciBvdGhlciBwaXhlbHMpIHVzZWQgYnkgdGhpcyBtYXRlcmlhbCBoYXZlXG5cdCAqIGFscmVhZHkgYmVlbiBwcmVtdWx0aXBsaWVkLiBUb2dnbGUgdGhpcyBpZiB5b3UgYXJlIHNlZWluZyBibGFjayBoYWxvcyBhcm91bmQgeW91clxuXHQgKiBibGVuZGVkIGFscGhhIGVkZ2VzLlxuXHQgKi9cblx0cHVibGljIGdldCBhbHBoYVByZW11bHRpcGxpZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYWxwaGFQcmVtdWx0aXBsaWVkO1xuXHR9XG5cblx0cHVibGljIHNldCBhbHBoYVByZW11bHRpcGxpZWQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9hbHBoYVByZW11bHRpcGxpZWQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9hbHBoYVByZW11bHRpcGxpZWQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1pbmltdW0gYWxwaGEgdmFsdWUgZm9yIHdoaWNoIHBpeGVscyBzaG91bGQgYmUgZHJhd24uIFRoaXMgaXMgdXNlZCBmb3IgdHJhbnNwYXJlbmN5IHRoYXQgaXMgZWl0aGVyXG5cdCAqIGludmlzaWJsZSBvciBlbnRpcmVseSBvcGFxdWUsIG9mdGVuIHVzZWQgd2l0aCB0ZXh0dXJlcyBmb3IgZm9saWFnZSwgZXRjLlxuXHQgKiBSZWNvbW1lbmRlZCB2YWx1ZXMgYXJlIDAgdG8gZGlzYWJsZSBhbHBoYSwgb3IgMC41IHRvIGNyZWF0ZSBzbW9vdGggZWRnZXMuIERlZmF1bHQgdmFsdWUgaXMgMCAoZGlzYWJsZWQpLlxuXHQgKi9cblx0cHVibGljIGdldCBhbHBoYVRocmVzaG9sZCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BBbHBoYVRocmVzaG9sZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYWxwaGFUaHJlc2hvbGQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbHVlIDwgMClcblx0XHRcdHZhbHVlID0gMDtcblx0XHRlbHNlIGlmICh2YWx1ZSA+IDEpXG5cdFx0XHR2YWx1ZSA9IDE7XG5cblx0XHRpZiAodGhpcy5fcEFscGhhVGhyZXNob2xkID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcEFscGhhVGhyZXNob2xkID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0ZXJpYWwgcmVxdWlyZXMgYWxwaGEgYmxlbmRpbmcgZHVyaW5nIHJlbmRlcmluZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgcmVxdWlyZXNCbGVuZGluZygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUmVxdWlyZXNCbGVuZGluZztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSByZW5kZXIgc3RhdGUgZm9yIGEgcGFzcyB0aGF0IGlzIGluZGVwZW5kZW50IG9mIHRoZSByZW5kZXJlZCBvYmplY3QuIFRoaXMgbmVlZHMgdG8gYmUgY2FsbGVkIGJlZm9yZVxuXHQgKiBjYWxsaW5nIHJlbmRlclBhc3MuIEJlZm9yZSBhY3RpdmF0aW5nIGEgcGFzcywgdGhlIHByZXZpb3VzbHkgdXNlZCBwYXNzIG5lZWRzIHRvIGJlIGRlYWN0aXZhdGVkLlxuXHQgKiBAcGFyYW0gcGFzcyBUaGUgcGFzcyBkYXRhIHRvIGFjdGl2YXRlLlxuXHQgKiBAcGFyYW0gc3RhZ2UgVGhlIFN0YWdlIG9iamVjdCB3aGljaCBpcyBjdXJyZW50bHkgdXNlZCBmb3IgcmVuZGVyaW5nLlxuXHQgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgZnJvbSB3aGljaCB0aGUgc2NlbmUgaXMgdmlld2VkLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIF9pQWN0aXZhdGVQYXNzKHBhc3M6SU1hdGVyaWFsUGFzc0RhdGEsIHN0YWdlOklTdGFnZSwgY2FtZXJhOkNhbWVyYSkgLy8gQVJDQU5FXG5cdHtcblx0XHRwYXNzLm1hdGVyaWFsUGFzcy5faUFjdGl2YXRlKHBhc3MsIHN0YWdlLCBjYW1lcmEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsZWFycyB0aGUgcmVuZGVyIHN0YXRlIGZvciBhIHBhc3MuIFRoaXMgbmVlZHMgdG8gYmUgY2FsbGVkIGJlZm9yZSBhY3RpdmF0aW5nIGFub3RoZXIgcGFzcy5cblx0ICogQHBhcmFtIHBhc3MgVGhlIHBhc3MgdG8gZGVhY3RpdmF0ZS5cblx0ICogQHBhcmFtIHN0YWdlIFRoZSBTdGFnZSB1c2VkIGZvciByZW5kZXJpbmdcblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lEZWFjdGl2YXRlUGFzcyhwYXNzOklNYXRlcmlhbFBhc3NEYXRhLCBzdGFnZTpJU3RhZ2UpIC8vIEFSQ0FORVxuXHR7XG5cdFx0cGFzcy5tYXRlcmlhbFBhc3MuX2lEZWFjdGl2YXRlKHBhc3MsIHN0YWdlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW5kZXJzIHRoZSBjdXJyZW50IHBhc3MuIEJlZm9yZSBjYWxsaW5nIHJlbmRlclBhc3MsIGFjdGl2YXRlUGFzcyBuZWVkcyB0byBiZSBjYWxsZWQgd2l0aCB0aGUgc2FtZSBpbmRleC5cblx0ICogQHBhcmFtIHBhc3MgVGhlIHBhc3MgdXNlZCB0byByZW5kZXIgdGhlIHJlbmRlcmFibGUuXG5cdCAqIEBwYXJhbSByZW5kZXJhYmxlIFRoZSBJUmVuZGVyYWJsZSBvYmplY3QgdG8gZHJhdy5cblx0ICogQHBhcmFtIHN0YWdlIFRoZSBTdGFnZSBvYmplY3QgdXNlZCBmb3IgcmVuZGVyaW5nLlxuXHQgKiBAcGFyYW0gZW50aXR5Q29sbGVjdG9yIFRoZSBFbnRpdHlDb2xsZWN0b3Igb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHZpc2libGUgc2NlbmUgZGF0YS5cblx0ICogQHBhcmFtIHZpZXdQcm9qZWN0aW9uIFRoZSB2aWV3LXByb2plY3Rpb24gbWF0cml4IHVzZWQgdG8gcHJvamVjdCB0byB0aGUgc2NyZWVuLiBUaGlzIGlzIG5vdCB0aGUgc2FtZSBhc1xuXHQgKiBjYW1lcmEudmlld1Byb2plY3Rpb24gYXMgaXQgaW5jbHVkZXMgdGhlIHNjYWxpbmcgZmFjdG9ycyB3aGVuIHJlbmRlcmluZyB0byB0ZXh0dXJlcy5cblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lSZW5kZXJQYXNzKHBhc3M6SU1hdGVyaWFsUGFzc0RhdGEsIHJlbmRlcmFibGU6SVJlbmRlcmFibGUsIHN0YWdlOklTdGFnZSwgY2FtZXJhOkNhbWVyYSwgdmlld1Byb2plY3Rpb246TWF0cml4M0QpXG5cdHtcblx0XHRpZiAodGhpcy5fcExpZ2h0UGlja2VyKVxuXHRcdFx0dGhpcy5fcExpZ2h0UGlja2VyLmNvbGxlY3RMaWdodHMocmVuZGVyYWJsZSk7XG5cblx0XHRwYXNzLm1hdGVyaWFsUGFzcy5faVJlbmRlcihwYXNzLCByZW5kZXJhYmxlLCBzdGFnZSwgY2FtZXJhLCB2aWV3UHJvamVjdGlvbik7XG5cdH1cblxuXHQvL1xuXHQvLyBNQVRFUklBTCBNQU5BR0VNRU5UXG5cdC8vXG5cdC8qKlxuXHQgKiBNYXJrIGFuIElNYXRlcmlhbE93bmVyIGFzIG93bmVyIG9mIHRoaXMgbWF0ZXJpYWwuXG5cdCAqIEFzc3VyZXMgd2UncmUgbm90IHVzaW5nIHRoZSBzYW1lIG1hdGVyaWFsIGFjcm9zcyByZW5kZXJhYmxlcyB3aXRoIGRpZmZlcmVudCBhbmltYXRpb25zLCBzaW5jZSB0aGVcblx0ICogUHJvZ3JhbXMgZGVwZW5kIG9uIGFuaW1hdGlvbi4gVGhpcyBtZXRob2QgbmVlZHMgdG8gYmUgY2FsbGVkIHdoZW4gYSBtYXRlcmlhbCBpcyBhc3NpZ25lZC5cblx0ICpcblx0ICogQHBhcmFtIG93bmVyIFRoZSBJTWF0ZXJpYWxPd25lciB0aGF0IGhhZCB0aGlzIG1hdGVyaWFsIGFzc2lnbmVkXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlBZGRPd25lcihvd25lcjpJTWF0ZXJpYWxPd25lcilcblx0e1xuXHRcdHRoaXMuX293bmVycy5wdXNoKG93bmVyKTtcblxuXHRcdHZhciBhbmltYXRpb25TZXQ6SUFuaW1hdGlvblNldDtcblx0XHR2YXIgYW5pbWF0b3I6SUFuaW1hdG9yID0gPElBbmltYXRvcj4gb3duZXIuYW5pbWF0b3I7XG5cblx0XHRpZiAoYW5pbWF0b3IpXG5cdFx0XHRhbmltYXRpb25TZXQgPSA8SUFuaW1hdGlvblNldD4gYW5pbWF0b3IuYW5pbWF0aW9uU2V0O1xuXG5cdFx0aWYgKG93bmVyLmFuaW1hdG9yKSB7XG5cdFx0XHRpZiAodGhpcy5fYW5pbWF0aW9uU2V0ICYmIGFuaW1hdGlvblNldCAhPSB0aGlzLl9hbmltYXRpb25TZXQpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQSBNYXRlcmlhbCBpbnN0YW5jZSBjYW5ub3QgYmUgc2hhcmVkIGFjcm9zcyBtYXRlcmlhbCBvd25lcnMgd2l0aCBkaWZmZXJlbnQgYW5pbWF0aW9uIHNldHNcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5fYW5pbWF0aW9uU2V0ICE9IGFuaW1hdGlvblNldCkge1xuXG5cdFx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uU2V0ID0gYW5pbWF0aW9uU2V0O1xuXG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlQW5pbWF0aW9uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbiBJTWF0ZXJpYWxPd25lciBhcyBvd25lci5cblx0ICogQHBhcmFtIG93bmVyXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlSZW1vdmVPd25lcihvd25lcjpJTWF0ZXJpYWxPd25lcilcblx0e1xuXHRcdHRoaXMuX293bmVycy5zcGxpY2UodGhpcy5fb3duZXJzLmluZGV4T2Yob3duZXIpLCAxKTtcblxuXHRcdGlmICh0aGlzLl9vd25lcnMubGVuZ3RoID09IDApIHtcblx0XHRcdHRoaXMuX2FuaW1hdGlvblNldCA9IG51bGw7XG5cblx0XHRcdHRoaXMuaW52YWxpZGF0ZUFuaW1hdGlvbigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBIGxpc3Qgb2YgdGhlIElNYXRlcmlhbE93bmVycyB0aGF0IHVzZSB0aGlzIG1hdGVyaWFsXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlPd25lcnMoKTpBcnJheTxJTWF0ZXJpYWxPd25lcj5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9vd25lcnM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGFtb3VudCBvZiBwYXNzZXMgdXNlZCBieSB0aGUgbWF0ZXJpYWwuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX2lOdW1TY3JlZW5QYXNzZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9udW1QYXNzZXM7XG5cdH1cblxuXHQvKipcblx0ICogQSBsaXN0IG9mIHRoZSBzY3JlZW4gcGFzc2VzIHVzZWQgaW4gdGhpcyBtYXRlcmlhbFxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIGdldCBfaVNjcmVlblBhc3NlcygpOkFycmF5PElNYXRlcmlhbFBhc3M+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFzc2VzO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hcmtzIHRoZSBzaGFkZXIgcHJvZ3JhbXMgZm9yIGFsbCBwYXNzZXMgYXMgaW52YWxpZCwgc28gdGhleSB3aWxsIGJlIHJlY29tcGlsZWQgYmVmb3JlIHRoZSBuZXh0IHVzZS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfcEludmFsaWRhdGVQYXNzZXMoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9tYXRlcmlhbFBhc3NEYXRhLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX21hdGVyaWFsUGFzc0RhdGFbaV0uaW52YWxpZGF0ZSgpO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0ZXJpYWwoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGbGFncyB0aGF0IHRoZSBzY3JlZW4gcGFzc2VzIGhhdmUgYmVjb21lIGludmFsaWQgYW5kIG5lZWQgcG9zc2libGUgcmUtb3JkZXJpbmcgLyBhZGRpbmcgLyBkZWxldGluZ1xuXHQgKi9cblx0cHVibGljIF9wSW52YWxpZGF0ZVNjcmVlblBhc3NlcygpXG5cdHtcblx0XHR0aGlzLl9wU2NyZWVuUGFzc2VzSW52YWxpZCA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhIHBhc3MgZnJvbSB0aGUgbWF0ZXJpYWwuXG5cdCAqIEBwYXJhbSBwYXNzIFRoZSBwYXNzIHRvIGJlIHJlbW92ZWQuXG5cdCAqL1xuXHRwdWJsaWMgX3BSZW1vdmVTY3JlZW5QYXNzKHBhc3M6SU1hdGVyaWFsUGFzcylcblx0e1xuXHRcdHBhc3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihFdmVudC5DSEFOR0UsIHRoaXMuX29uUGFzc0NoYW5nZURlbGVnYXRlKTtcblx0XHR0aGlzLl9wYXNzZXMuc3BsaWNlKHRoaXMuX3Bhc3Nlcy5pbmRleE9mKHBhc3MpLCAxKTtcblxuXHRcdHRoaXMuX251bVBhc3Nlcy0tO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYWxsIHBhc3NlcyBmcm9tIHRoZSBtYXRlcmlhbFxuXHQgKi9cblx0cHVibGljIF9wQ2xlYXJTY3JlZW5QYXNzZXMoKVxuXHR7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5fbnVtUGFzc2VzOyArK2kpXG5cdFx0XHR0aGlzLl9wYXNzZXNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihFdmVudC5DSEFOR0UsIHRoaXMuX29uUGFzc0NoYW5nZURlbGVnYXRlKTtcblxuXHRcdHRoaXMuX3Bhc3Nlcy5sZW5ndGggPSB0aGlzLl9udW1QYXNzZXMgPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBwYXNzIHRvIHRoZSBtYXRlcmlhbFxuXHQgKiBAcGFyYW0gcGFzc1xuXHQgKi9cblx0cHVibGljIF9wQWRkU2NyZWVuUGFzcyhwYXNzOklNYXRlcmlhbFBhc3MpXG5cdHtcblx0XHR0aGlzLl9wYXNzZXNbdGhpcy5fbnVtUGFzc2VzKytdID0gcGFzcztcblxuXHRcdHBhc3MubGlnaHRQaWNrZXIgPSB0aGlzLl9wTGlnaHRQaWNrZXI7XG5cdFx0cGFzcy5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNIQU5HRSwgdGhpcy5fb25QYXNzQ2hhbmdlRGVsZWdhdGUpO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0ZXJpYWwoKTtcblx0fVxuXG5cdHB1YmxpYyBfaUFkZE1hdGVyaWFsRGF0YShtYXRlcmlhbERhdGE6SU1hdGVyaWFsRGF0YSk6SU1hdGVyaWFsRGF0YVxuXHR7XG5cdFx0dGhpcy5fbWF0ZXJpYWxEYXRhLnB1c2gobWF0ZXJpYWxEYXRhKTtcblxuXHRcdHJldHVybiBtYXRlcmlhbERhdGE7XG5cdH1cblxuXHRwdWJsaWMgX2lSZW1vdmVNYXRlcmlhbERhdGEobWF0ZXJpYWxEYXRhOklNYXRlcmlhbERhdGEpOklNYXRlcmlhbERhdGFcblx0e1xuXHRcdHRoaXMuX21hdGVyaWFsRGF0YS5zcGxpY2UodGhpcy5fbWF0ZXJpYWxEYXRhLmluZGV4T2YobWF0ZXJpYWxEYXRhKSwgMSk7XG5cblx0XHRyZXR1cm4gbWF0ZXJpYWxEYXRhO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm1zIGFueSBwcm9jZXNzaW5nIHRoYXQgbmVlZHMgdG8gb2NjdXIgYmVmb3JlIGFueSBvZiBpdHMgcGFzc2VzIGFyZSB1c2VkLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIF9pVXBkYXRlTWF0ZXJpYWwoKVxuXHR7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBMaXN0ZW5lciBmb3Igd2hlbiBhIHBhc3MncyBzaGFkZXIgY29kZSBjaGFuZ2VzLiBJdCByZWNhbGN1bGF0ZXMgdGhlIHJlbmRlciBvcmRlciBpZC5cblx0ICovXG5cdHByaXZhdGUgb25QYXNzQ2hhbmdlKGV2ZW50OkV2ZW50KVxuXHR7XG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0ZXJpYWwoKTtcblx0fVxuXG5cdHByaXZhdGUgaW52YWxpZGF0ZUFuaW1hdGlvbigpXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX21hdGVyaWFsRGF0YS5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9tYXRlcmlhbERhdGFbaV0uaW52YWxpZGF0ZUFuaW1hdGlvbigpO1xuXHR9XG5cdFxuXHRwcml2YXRlIGludmFsaWRhdGVNYXRlcmlhbCgpXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX21hdGVyaWFsRGF0YS5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9tYXRlcmlhbERhdGFbaV0uaW52YWxpZGF0ZU1hdGVyaWFsKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gdGhlIGxpZ2h0IHBpY2tlcidzIGNvbmZpZ3VyYXRpb24gY2hhbmdlZC5cblx0ICovXG5cdHByaXZhdGUgb25MaWdodHNDaGFuZ2UoZXZlbnQ6RXZlbnQpXG5cdHtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVNjcmVlblBhc3NlcygpO1xuXHR9XG5cblx0cHVibGljIF9wTm90aWZ5U2l6ZUNoYW5nZWQoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9zaXplQ2hhbmdlZClcblx0XHRcdHRoaXMuX3NpemVDaGFuZ2VkID0gbmV3IE1hdGVyaWFsRXZlbnQoTWF0ZXJpYWxFdmVudC5TSVpFX0NIQU5HRUQpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NpemVDaGFuZ2VkKTtcblx0fVxuXG5cdHB1YmxpYyBfaUFkZE1hdGVyaWFsUGFzc0RhdGEobWF0ZXJpYWxQYXNzRGF0YTpJTWF0ZXJpYWxQYXNzRGF0YSk6SU1hdGVyaWFsUGFzc0RhdGFcblx0e1xuXHRcdHRoaXMuX21hdGVyaWFsUGFzc0RhdGEucHVzaChtYXRlcmlhbFBhc3NEYXRhKTtcblxuXHRcdHJldHVybiBtYXRlcmlhbFBhc3NEYXRhO1xuXHR9XG5cblx0cHVibGljIF9pUmVtb3ZlTWF0ZXJpYWxQYXNzRGF0YShtYXRlcmlhbFBhc3NEYXRhOklNYXRlcmlhbFBhc3NEYXRhKTpJTWF0ZXJpYWxQYXNzRGF0YVxuXHR7XG5cdFx0dGhpcy5fbWF0ZXJpYWxQYXNzRGF0YS5zcGxpY2UodGhpcy5fbWF0ZXJpYWxQYXNzRGF0YS5pbmRleE9mKG1hdGVyaWFsUGFzc0RhdGEpLCAxKTtcblxuXHRcdHJldHVybiBtYXRlcmlhbFBhc3NEYXRhO1xuXHR9XG59XG5cbmV4cG9ydCA9IE1hdGVyaWFsQmFzZTsiXX0=