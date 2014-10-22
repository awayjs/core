var ShadowCasterCollector = require("awayjs-core/lib/core/traverse/ShadowCasterCollector");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");

var RenderTexture = require("awayjs-core/lib/textures/RenderTexture");

var ShadowMapperBase = (function () {
    function ShadowMapperBase() {
        this._pDepthMapSize = 2048;
        this._autoUpdateShadows = true;
        this._pCasterCollector = this.pCreateCasterCollector();
    }
    ShadowMapperBase.prototype.pCreateCasterCollector = function () {
        return new ShadowCasterCollector();
    };

    Object.defineProperty(ShadowMapperBase.prototype, "autoUpdateShadows", {
        get: function () {
            return this._autoUpdateShadows;
        },
        set: function (value) {
            this._autoUpdateShadows = value;
        },
        enumerable: true,
        configurable: true
    });


    ShadowMapperBase.prototype.updateShadows = function () {
        this._iShadowsInvalid = true;
    };

    ShadowMapperBase.prototype.iSetDepthMap = function (depthMap) {
        if (this._depthMap == depthMap)
            return;

        if (this._depthMap && !this._explicitDepthMap)
            this._depthMap.dispose();

        this._depthMap = depthMap;

        if (this._depthMap) {
            this._explicitDepthMap = true;
            this._pDepthMapSize = this._depthMap.size;
        } else {
            this._explicitDepthMap = false;
        }
    };

    Object.defineProperty(ShadowMapperBase.prototype, "light", {
        get: function () {
            return this._pLight;
        },
        set: function (value) {
            this._pLight = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(ShadowMapperBase.prototype, "depthMap", {
        get: function () {
            if (!this._depthMap)
                this._depthMap = this.pCreateDepthTexture();

            return this._depthMap;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(ShadowMapperBase.prototype, "depthMapSize", {
        get: function () {
            return this._pDepthMapSize;
        },
        set: function (value) {
            if (value == this._pDepthMapSize)
                return;

            this._pSetDepthMapSize(value);
        },
        enumerable: true,
        configurable: true
    });


    ShadowMapperBase.prototype.dispose = function () {
        this._pCasterCollector = null;

        if (this._depthMap && !this._explicitDepthMap)
            this._depthMap.dispose();

        this._depthMap = null;
    };

    ShadowMapperBase.prototype.pCreateDepthTexture = function () {
        return new RenderTexture(this._pDepthMapSize, this._pDepthMapSize);
    };

    ShadowMapperBase.prototype.iRenderDepthMap = function (entityCollector, renderer) {
        this._iShadowsInvalid = false;

        this.pUpdateDepthProjection(entityCollector.camera);

        if (!this._depthMap)
            this._depthMap = this.pCreateDepthTexture();

        this.pDrawDepthMap(this._depthMap, entityCollector.scene, renderer);
    };

    ShadowMapperBase.prototype.pUpdateDepthProjection = function (viewCamera) {
        throw new AbstractMethodError();
    };

    ShadowMapperBase.prototype.pDrawDepthMap = function (target, scene, renderer) {
        throw new AbstractMethodError();
    };

    ShadowMapperBase.prototype._pSetDepthMapSize = function (value) {
        this._pDepthMapSize = value;

        if (this._explicitDepthMap) {
            throw Error("Cannot set depth map size for the current renderer.");
        } else if (this._depthMap) {
            this._depthMap.dispose();
            this._depthMap = null;
        }
    };
    return ShadowMapperBase;
})();

module.exports = ShadowMapperBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFscy9zaGFkb3dtYXBwZXJzL1NoYWRvd01hcHBlckJhc2UudHMiXSwibmFtZXMiOlsiU2hhZG93TWFwcGVyQmFzZSIsIlNoYWRvd01hcHBlckJhc2UuY29uc3RydWN0b3IiLCJTaGFkb3dNYXBwZXJCYXNlLnBDcmVhdGVDYXN0ZXJDb2xsZWN0b3IiLCJTaGFkb3dNYXBwZXJCYXNlLnVwZGF0ZVNoYWRvd3MiLCJTaGFkb3dNYXBwZXJCYXNlLmlTZXREZXB0aE1hcCIsIlNoYWRvd01hcHBlckJhc2UuZGlzcG9zZSIsIlNoYWRvd01hcHBlckJhc2UucENyZWF0ZURlcHRoVGV4dHVyZSIsIlNoYWRvd01hcHBlckJhc2UuaVJlbmRlckRlcHRoTWFwIiwiU2hhZG93TWFwcGVyQmFzZS5wVXBkYXRlRGVwdGhQcm9qZWN0aW9uIiwiU2hhZG93TWFwcGVyQmFzZS5wRHJhd0RlcHRoTWFwIiwiU2hhZG93TWFwcGVyQmFzZS5fcFNldERlcHRoTWFwU2l6ZSJdLCJtYXBwaW5ncyI6IkFBQUEsMEZBSStGO0FBQy9GLCtFQUFxRjs7QUFFckYscUVBQTRFOztBQUc1RTtJQVlDQTtRQU5BQyxLQUFPQSxjQUFjQSxHQUFVQSxJQUFJQSxDQUFDQTtRQUdwQ0EsS0FBUUEsa0JBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUt6Q0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxDQUFDQSxzQkFBc0JBLENBQUNBLENBQUNBO0lBQ3ZEQSxDQUFDQTtJQUVERCxvREFBQUE7UUFFQ0UsT0FBT0EsSUFBSUEscUJBQXFCQSxDQUFDQSxDQUFDQTtJQUNuQ0EsQ0FBQ0E7O0lBRURGO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLGtCQUFrQkE7UUFDL0JBLENBQUNBO1FBRURBLEtBQUFBLFVBQTZCQSxLQUFhQTtZQUV6Q0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxLQUFLQTtRQUNoQ0EsQ0FBQ0E7Ozs7QUFMQUE7O0lBT0RBLDJDQUFBQTtRQUVD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SUFFRFIsMkNBQUFBLFVBQXFCQSxNQUF1QkEsRUFBRUEsS0FBV0EsRUFBRUEsUUFBa0JBO1FBRTVFUyxNQUFNQSxJQUFJQSxtQkFBbUJBLENBQUNBLENBQUNBO0lBQ2hDQSxDQUFDQTs7SUFFRFQsK0NBQUFBLFVBQXlCQSxLQUFLQTtRQUU3QlUsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsS0FBS0E7O1FBRTNCQSxJQUFJQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUVBO1lBQzNCQSxNQUFNQSxLQUFLQSxDQUFDQSxxREFBcURBLENBQUNBO1NBQ2xFQSxNQUFNQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFFQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBO1NBQ3JCQTtJQUNGQSxDQUFDQTtJQUNGVix3QkFBQ0E7QUFBREEsQ0FBQ0EsSUFBQTs7QUFFRCxpQ0FBMEIsQ0FBQSIsImZpbGUiOiJtYXRlcmlhbHMvc2hhZG93bWFwcGVycy9TaGFkb3dNYXBwZXJCYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjZW5lXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvbnRhaW5lcnMvU2NlbmVcIik7XG5pbXBvcnQgTGlnaHRCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvTGlnaHRCYXNlXCIpO1xuaW1wb3J0IElSZW5kZXJlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuaW1wb3J0IEVudGl0eUNvbGxlY3Rvclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvdHJhdmVyc2UvRW50aXR5Q29sbGVjdG9yXCIpO1xuaW1wb3J0IFNoYWRvd0Nhc3RlckNvbGxlY3Rvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS90cmF2ZXJzZS9TaGFkb3dDYXN0ZXJDb2xsZWN0b3JcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xuaW1wb3J0IFJlbmRlclRleHR1cmVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9SZW5kZXJUZXh0dXJlXCIpO1xuaW1wb3J0IFRleHR1cmVQcm94eUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlUHJveHlCYXNlXCIpO1xuXG5jbGFzcyBTaGFkb3dNYXBwZXJCYXNlXG57XG5cblx0cHVibGljIF9wQ2FzdGVyQ29sbGVjdG9yOlNoYWRvd0Nhc3RlckNvbGxlY3RvcjtcblxuXHRwcml2YXRlIF9kZXB0aE1hcDpUZXh0dXJlUHJveHlCYXNlO1xuXHRwdWJsaWMgX3BEZXB0aE1hcFNpemU6bnVtYmVyID0gMjA0ODtcblx0cHVibGljIF9wTGlnaHQ6TGlnaHRCYXNlO1xuXHRwcml2YXRlIF9leHBsaWNpdERlcHRoTWFwOmJvb2xlYW47XG5cdHByaXZhdGUgX2F1dG9VcGRhdGVTaGFkb3dzOmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX2lTaGFkb3dzSW52YWxpZDpib29sZWFuO1xuXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHRoaXMuX3BDYXN0ZXJDb2xsZWN0b3IgPSB0aGlzLnBDcmVhdGVDYXN0ZXJDb2xsZWN0b3IoKTtcblx0fVxuXG5cdHB1YmxpYyBwQ3JlYXRlQ2FzdGVyQ29sbGVjdG9yKClcblx0e1xuXHRcdHJldHVybiBuZXcgU2hhZG93Q2FzdGVyQ29sbGVjdG9yKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGF1dG9VcGRhdGVTaGFkb3dzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9VcGRhdGVTaGFkb3dzO1xuXHR9XG5cblx0cHVibGljIHNldCBhdXRvVXBkYXRlU2hhZG93cyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fYXV0b1VwZGF0ZVNoYWRvd3MgPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyB1cGRhdGVTaGFkb3dzKClcblx0e1xuXHRcdHRoaXMuX2lTaGFkb3dzSW52YWxpZCA9IHRydWU7XG5cdH1cblxuXHRwdWJsaWMgaVNldERlcHRoTWFwKGRlcHRoTWFwOlRleHR1cmVQcm94eUJhc2UpXG5cdHtcblx0XHRpZiAodGhpcy5fZGVwdGhNYXAgPT0gZGVwdGhNYXApXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fZGVwdGhNYXAgJiYgIXRoaXMuX2V4cGxpY2l0RGVwdGhNYXApXG5cdFx0XHR0aGlzLl9kZXB0aE1hcC5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9kZXB0aE1hcCA9IGRlcHRoTWFwO1xuXG5cdFx0aWYgKHRoaXMuX2RlcHRoTWFwKSB7XG5cdFx0XHR0aGlzLl9leHBsaWNpdERlcHRoTWFwID0gdHJ1ZTtcblx0XHRcdHRoaXMuX3BEZXB0aE1hcFNpemUgPSB0aGlzLl9kZXB0aE1hcC5zaXplO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9leHBsaWNpdERlcHRoTWFwID0gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGdldCBsaWdodCgpOkxpZ2h0QmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BMaWdodDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbGlnaHQodmFsdWU6TGlnaHRCYXNlKVxuXHR7XG5cdFx0dGhpcy5fcExpZ2h0ID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGRlcHRoTWFwKCk6VGV4dHVyZVByb3h5QmFzZVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9kZXB0aE1hcClcblx0XHRcdHRoaXMuX2RlcHRoTWFwID0gdGhpcy5wQ3JlYXRlRGVwdGhUZXh0dXJlKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fZGVwdGhNYXA7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGRlcHRoTWFwU2l6ZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BEZXB0aE1hcFNpemU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGRlcHRoTWFwU2l6ZSh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fcERlcHRoTWFwU2l6ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BTZXREZXB0aE1hcFNpemUodmFsdWUpO1xuXHR9XG5cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dGhpcy5fcENhc3RlckNvbGxlY3RvciA9IG51bGw7XG5cblx0XHRpZiAodGhpcy5fZGVwdGhNYXAgJiYgIXRoaXMuX2V4cGxpY2l0RGVwdGhNYXApXG5cdFx0XHR0aGlzLl9kZXB0aE1hcC5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9kZXB0aE1hcCA9IG51bGw7XG5cdH1cblxuXHRwdWJsaWMgcENyZWF0ZURlcHRoVGV4dHVyZSgpOlRleHR1cmVQcm94eUJhc2Vcblx0e1xuXHRcdHJldHVybiBuZXcgUmVuZGVyVGV4dHVyZSh0aGlzLl9wRGVwdGhNYXBTaXplLCB0aGlzLl9wRGVwdGhNYXBTaXplKTtcblx0fVxuXG5cdHB1YmxpYyBpUmVuZGVyRGVwdGhNYXAoZW50aXR5Q29sbGVjdG9yOkVudGl0eUNvbGxlY3RvciwgcmVuZGVyZXI6SVJlbmRlcmVyKVxuXHR7XG5cdFx0dGhpcy5faVNoYWRvd3NJbnZhbGlkID0gZmFsc2U7XG5cblx0XHR0aGlzLnBVcGRhdGVEZXB0aFByb2plY3Rpb24oZW50aXR5Q29sbGVjdG9yLmNhbWVyYSk7XG5cblx0XHRpZiAoIXRoaXMuX2RlcHRoTWFwKVxuXHRcdFx0dGhpcy5fZGVwdGhNYXAgPSB0aGlzLnBDcmVhdGVEZXB0aFRleHR1cmUoKTtcblxuXHRcdHRoaXMucERyYXdEZXB0aE1hcCh0aGlzLl9kZXB0aE1hcCwgZW50aXR5Q29sbGVjdG9yLnNjZW5lLCByZW5kZXJlcik7XG5cdH1cblxuXHRwdWJsaWMgcFVwZGF0ZURlcHRoUHJvamVjdGlvbih2aWV3Q2FtZXJhOkNhbWVyYSlcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgcERyYXdEZXB0aE1hcCh0YXJnZXQ6VGV4dHVyZVByb3h5QmFzZSwgc2NlbmU6U2NlbmUsIHJlbmRlcmVyOklSZW5kZXJlcilcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX3BTZXREZXB0aE1hcFNpemUodmFsdWUpXG5cdHtcblx0XHR0aGlzLl9wRGVwdGhNYXBTaXplID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fZXhwbGljaXREZXB0aE1hcCkge1xuXHRcdFx0dGhyb3cgRXJyb3IoXCJDYW5ub3Qgc2V0IGRlcHRoIG1hcCBzaXplIGZvciB0aGUgY3VycmVudCByZW5kZXJlci5cIik7XG5cdFx0fSBlbHNlIGlmICh0aGlzLl9kZXB0aE1hcCkge1xuXHRcdFx0dGhpcy5fZGVwdGhNYXAuZGlzcG9zZSgpO1xuXHRcdFx0dGhpcy5fZGVwdGhNYXAgPSBudWxsO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgPSBTaGFkb3dNYXBwZXJCYXNlOyJdfQ==