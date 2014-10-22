var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3D = require("awayjs-core/lib/core/geom/Matrix3D");

var CSSRendererBase = require("awayjs-core/lib/core/render/CSSRendererBase");

var CSSEntityCollector = require("awayjs-core/lib/core/traverse/CSSEntityCollector");

var CoordinateSystem = require("awayjs-core/lib/projections/CoordinateSystem");

/**
* The DefaultRenderer class provides the default rendering method. It renders the scene graph objects using the
* materials assigned to them.
*
* @class away.render.DefaultRenderer
*/
var CSSDefaultRenderer = (function (_super) {
    __extends(CSSDefaultRenderer, _super);
    /**
    * Creates a new CSSDefaultRenderer object.
    */
    function CSSDefaultRenderer() {
        _super.call(this);
        this._contextMatrix = new Matrix3D();
        this._skyboxProjection = new Matrix3D();
        this._transform = new Matrix3D();

        //create container for the renderer
        this._container = document.createElement("div");
        this._container.style.overflow = "hidden";
        this._container.style.position = "absolute";

        //add container to body
        document.body.appendChild(this._container);

        //create conxtext for the renderer
        this._context = document.createElement("div");
        this._contextStyle = this._context.style;
        this._contextStyle.position = "absolute";
        this._contextStyle.transformStyle = this._contextStyle["-webkit-transform-style"] = this._contextStyle["-moz-transform-style"] = this._contextStyle["-o-transform-style"] = this._contextStyle["-ms-transform-style"] = "preserve-3d";
        this._contextStyle.transformOrigin = this._contextStyle["-webkit-transform-origin"] = this._contextStyle["-moz-transform-origin"] = this._contextStyle["-o-transform-origin"] = this._contextStyle["-ms-transform-origin"] = "0% 0%";

        //add context to container
        this._container.appendChild(this._context);
    }
    /**
    *
    * @param entityCollector
    */
    CSSDefaultRenderer.prototype.render = function (entityCollector) {
        _super.prototype.render.call(this, entityCollector);

        if (this._pBackBufferInvalid)
            this.pUpdateBackBuffer();

        this._iRender(entityCollector);

        this._pBackBufferInvalid = false;
    };

    /**
    * @inheritDoc
    */
    CSSDefaultRenderer.prototype.pDraw = function (entityCollector) {
        //			if (entityCollector.skyBox) {
        //				if (this._activeMaterial)
        //					this._activeMaterial.iDeactivate(this._pStageGL);
        //
        //				this._activeMaterial = null;
        //
        //				this._pContext.setDepthTest(false, away.gl.ContextGLCompareMode.ALWAYS);
        //				this.drawSkybox(entityCollector);
        //
        //			}
        //
        //			var which:number = target? DefaultRenderer.SCREEN_PASSES : DefaultRenderer.ALL_PASSES;
        var sheet = document.styleSheets[document.styleSheets.length - 1];

        for (var i = 0; i < sheet.cssRules.length; i++) {
            var style = sheet.cssRules[i].style;
            style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-o-transform"] = style["-ms-transform"] = (entityCollector.camera.projection.coordinateSystem == CoordinateSystem.RIGHT_HANDED) ? "" : "scale3d(1, -1, 1) translateY(-" + style.height + ")";
        }

        this.drawRenderables(this._renderableHead, entityCollector);

        //			if (this._activeMaterial)
        //				this._activeMaterial.iDeactivate(this._pStageGL);
        this._activeMaterial = null;
    };

    /**
    * Updates the backbuffer properties.
    */
    CSSDefaultRenderer.prototype.pUpdateBackBuffer = function () {
        this._container.style.width = this._width + "px";
        this._container.style.height = this._height + "px";
        this._container.style.clip = "rect(0px, " + this._width + "px, " + this._height + "px, 0px)";

        //update context matrix
        this._contextMatrix.rawData[0] = this._width / 2;
        this._contextMatrix.rawData[5] = -this._height / 2;
        this._contextMatrix.rawData[10] = -1; //fix for innaccurate z-sort
        this._contextMatrix.rawData[12] = this._width / 2;
        this._contextMatrix.rawData[13] = this._height / 2;

        //update context tranform
        this._contextStyle.transform = this._contextStyle["-webkit-transform"] = this._contextStyle["-moz-transform"] = this._contextStyle["-o-transform"] = this._contextStyle["-ms-transform"] = this._contextMatrix.toString();

        this._pBackBufferInvalid = false;
    };

    /**
    * Draw the skybox if present.
    * @param entityCollector The EntityCollector containing all potentially visible information.
    */
    CSSDefaultRenderer.prototype.drawSkybox = function (entityCollector) {
        //TODO
    };

    /**
    * Draw a list of renderables.
    * @param renderables The renderables to draw.
    * @param entityCollector The EntityCollector containing all potentially visible information.
    */
    CSSDefaultRenderer.prototype.drawRenderables = function (item, entityCollector) {
        var viewProjection = entityCollector.camera.viewProjection.clone();

        while (item) {
            this._activeMaterial = item.materialOwner.material;

            //serialise transform and apply to html element
            this._transform.copyRawDataFrom(item.renderSceneTransform.rawData);
            this._transform.append(viewProjection);

            var style = item.htmlElement.style;

            style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-o-transform"] = style["-ms-transform"] = this._transform.toString();

            style.transformStyle = style["-webkit-transform-style"] = style["-moz-transform-style"] = style["-o-transform-style"] = style["-ms-transform-style"] = "preserve-3d";

            //check if child requires adding to the view
            if (!this._context.contains(item.htmlElement))
                this._context.appendChild(item.htmlElement);

            item = item.next;
        }
        //			var numPasses:number;
        //			var j:number;
        //			var camera:away.entities.Camera = entityCollector.camera;
        //			var item2:away.render.CSSRenderableBase;
        //
        //			while (item) {
        //				this._activeMaterial = item.material;
        //
        //				this._activeMaterial.iUpdateMaterial(this._pContext);
        //
        //				numPasses = this._activeMaterial._iNumPasses;
        //
        //				j = 0;
        //
        //				do {
        //					item2 = item;
        //
        //					var rttMask:number = this._activeMaterial.iPassRendersToTexture(j)? 1 : 2;
        //
        //					if ((rttMask & which) != 0) {
        //						this._activeMaterial.iActivatePass(j, this._pStageGL, camera);
        //
        //						do {
        //							this._activeMaterial.iRenderPass(j, item2, this._pStageGL, entityCollector);
        //
        //							item2 = item2.next;
        //
        //						} while (item2 && item2.material == this._activeMaterial);
        //
        //						this._activeMaterial.iDeactivatePass(j, this._pStageGL);
        //
        //					} else {
        //						do {
        //							item2 = item2.next;
        //
        //						} while (item2 && item2.renderable.material == this._activeMaterial);
        //					}
        //				} while (++j < numPasses);
        //
        //				item = item2;
        //			}
    };

    CSSDefaultRenderer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        //TODO
    };

    CSSDefaultRenderer.prototype._iCreateEntityCollector = function () {
        return new CSSEntityCollector();
    };
    return CSSDefaultRenderer;
})(CSSRendererBase);

module.exports = CSSDefaultRenderer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcmVuZGVyL0NTU0RlZmF1bHRSZW5kZXJlci50cyJdLCJuYW1lcyI6WyJDU1NEZWZhdWx0UmVuZGVyZXIiLCJDU1NEZWZhdWx0UmVuZGVyZXIuY29uc3RydWN0b3IiLCJDU1NEZWZhdWx0UmVuZGVyZXIucmVuZGVyIiwiQ1NTRGVmYXVsdFJlbmRlcmVyLnBEcmF3IiwiQ1NTRGVmYXVsdFJlbmRlcmVyLnBVcGRhdGVCYWNrQnVmZmVyIiwiQ1NTRGVmYXVsdFJlbmRlcmVyLmRyYXdTa3lib3giLCJDU1NEZWZhdWx0UmVuZGVyZXIuZHJhd1JlbmRlcmFibGVzIiwiQ1NTRGVmYXVsdFJlbmRlcmVyLmRpc3Bvc2UiLCJDU1NEZWZhdWx0UmVuZGVyZXIuX2lDcmVhdGVFbnRpdHlDb2xsZWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDREQUFxRTs7QUFFckUsNEVBQW1GOztBQUVuRixvRkFBMEY7O0FBSTFGLDhFQUFxRjs7QUFHckY7Ozs7O0VBS0c7QUFDSDtJQUFpQ0EscUNBQWVBO0lBYy9DQTs7TUFER0E7SUFDSEE7UUFFQ0MsV0FBTUEsS0FBQUEsQ0FBQ0E7UUFYUkEsS0FBUUEsY0FBY0EsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFHakRBLEtBQVFBLGlCQUFpQkEsR0FBWUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDcERBLEtBQVFBLFVBQVVBLEdBQVlBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBOztRQVM1Q0EsbUNBQW1DQTtRQUNuQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsUUFBUUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDL0NBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBO1FBQ3pDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxHQUFHQSxVQUFVQTs7UUFFM0NBLHVCQUF1QkE7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Q3RFQSxFQUFFQTtRQUNGQSxZQUFZQTtRQUNaQSxxRkFBcUZBO1FBQ3JGQSxFQUFFQTtRQUNGQSw0QkFBNEJBO1FBQzVCQSxFQUFFQTtRQUNGQSxrRUFBa0VBO1FBQ2xFQSxFQUFFQTtRQUNGQSxnRUFBZ0VBO1FBQ2hFQSxFQUFFQTtRQUNGQSxlQUFlQTtRQUNmQSxZQUFZQTtRQUNaQSw0QkFBNEJBO1FBQzVCQSxFQUFFQTtRQUNGQSw2RUFBNkVBO1FBQzdFQSxRQUFRQTtRQUNSQSxnQ0FBZ0NBO1FBQ2hDQSxFQUFFQTtRQUNGQSxtQkFBbUJBO1FBQ25CQSxNQUFNQTtJQUNMQSxDQUFDQTs7SUFFRE4sdUNBQUFBO1FBRUNPLGdCQUFLQSxDQUFDQSxPQUFPQSxLQUFDQSxLQUFBQSxDQUFDQTtRQUVmQSxNQUFNQTtJQUNQQSxDQUFDQTs7SUFHRFAsdURBQUFBO1FBRUNRLE9BQU9BLElBQUlBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBQ0ZSLDBCQUFDQTtBQUFEQSxDQUFDQSxFQWpPZ0MsZUFBZSxFQWlPL0M7O0FBRUQsbUNBQTRCLENBQUEiLCJmaWxlIjoiY29yZS9yZW5kZXIvQ1NTRGVmYXVsdFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBDU1NSZW5kZXJhYmxlQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3Bvb2wvQ1NTUmVuZGVyYWJsZUJhc2VcIik7XG5pbXBvcnQgQ1NTUmVuZGVyZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9yZW5kZXIvQ1NTUmVuZGVyZXJCYXNlXCIpO1xuaW1wb3J0IElSZW5kZXJlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuaW1wb3J0IENTU0VudGl0eUNvbGxlY3Rvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RyYXZlcnNlL0NTU0VudGl0eUNvbGxlY3RvclwiKTtcbmltcG9ydCBFbnRpdHlDb2xsZWN0b3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RyYXZlcnNlL0VudGl0eUNvbGxlY3RvclwiKTtcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XG5pbXBvcnQgQ1NTTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbWF0ZXJpYWxzL0NTU01hdGVyaWFsQmFzZVwiKTtcbmltcG9ydCBDb29yZGluYXRlU3lzdGVtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvQ29vcmRpbmF0ZVN5c3RlbVwiKTtcblxuXG4vKipcbiAqIFRoZSBEZWZhdWx0UmVuZGVyZXIgY2xhc3MgcHJvdmlkZXMgdGhlIGRlZmF1bHQgcmVuZGVyaW5nIG1ldGhvZC4gSXQgcmVuZGVycyB0aGUgc2NlbmUgZ3JhcGggb2JqZWN0cyB1c2luZyB0aGVcbiAqIG1hdGVyaWFscyBhc3NpZ25lZCB0byB0aGVtLlxuICpcbiAqIEBjbGFzcyBhd2F5LnJlbmRlci5EZWZhdWx0UmVuZGVyZXJcbiAqL1xuY2xhc3MgQ1NTRGVmYXVsdFJlbmRlcmVyIGV4dGVuZHMgQ1NTUmVuZGVyZXJCYXNlIGltcGxlbWVudHMgSVJlbmRlcmVyXG57XG5cdHByaXZhdGUgX2NvbnRhaW5lcjpIVE1MRGl2RWxlbWVudDtcblx0cHJpdmF0ZSBfY29udGV4dDpIVE1MRGl2RWxlbWVudDtcblx0cHJpdmF0ZSBfY29udGV4dFN0eWxlOk1TU3R5bGVDU1NQcm9wZXJ0aWVzO1xuXHRwcml2YXRlIF9jb250ZXh0TWF0cml4Ok1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdFxuXHRwcml2YXRlIF9hY3RpdmVNYXRlcmlhbDpDU1NNYXRlcmlhbEJhc2U7XG5cdHByaXZhdGUgX3NreWJveFByb2plY3Rpb246TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0cHJpdmF0ZSBfdHJhbnNmb3JtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgQ1NTRGVmYXVsdFJlbmRlcmVyIG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvL2NyZWF0ZSBjb250YWluZXIgZm9yIHRoZSByZW5kZXJlclxuXHRcdHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblx0XHR0aGlzLl9jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdFx0XG5cdFx0Ly9hZGQgY29udGFpbmVyIHRvIGJvZHlcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lcik7XG5cblx0XHQvL2NyZWF0ZSBjb254dGV4dCBmb3IgdGhlIHJlbmRlcmVyXG5cdFx0dGhpcy5fY29udGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dGhpcy5fY29udGV4dFN0eWxlID0gdGhpcy5fY29udGV4dC5zdHlsZTtcblx0XHR0aGlzLl9jb250ZXh0U3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdFx0dGhpcy5fY29udGV4dFN0eWxlLnRyYW5zZm9ybVN0eWxlXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi13ZWJraXQtdHJhbnNmb3JtLXN0eWxlXCJdXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1tb3otdHJhbnNmb3JtLXN0eWxlXCJdXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1vLXRyYW5zZm9ybS1zdHlsZVwiXVxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItbXMtdHJhbnNmb3JtLXN0eWxlXCJdID0gXCJwcmVzZXJ2ZS0zZFwiO1xuXHRcdHRoaXMuX2NvbnRleHRTdHlsZS50cmFuc2Zvcm1PcmlnaW5cblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luXCJdXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1tb3otdHJhbnNmb3JtLW9yaWdpblwiXVxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItby10cmFuc2Zvcm0tb3JpZ2luXCJdXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1tcy10cmFuc2Zvcm0tb3JpZ2luXCJdID0gXCIwJSAwJVwiO1xuXG5cdFx0Ly9hZGQgY29udGV4dCB0byBjb250YWluZXJcblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fY29udGV4dCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvclxuXHQgKi9cblx0cHVibGljIHJlbmRlcihlbnRpdHlDb2xsZWN0b3I6SUNvbGxlY3Rvcilcblx0e1xuXHRcdHN1cGVyLnJlbmRlcihlbnRpdHlDb2xsZWN0b3IpO1xuXG5cdFx0aWYgKHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCkvLyByZXNldCBvciB1cGRhdGUgcmVuZGVyIHNldHRpbmdzXG5cdFx0XHR0aGlzLnBVcGRhdGVCYWNrQnVmZmVyKCk7XG5cblx0XHR0aGlzLl9pUmVuZGVyKDxFbnRpdHlDb2xsZWN0b3I+IGVudGl0eUNvbGxlY3Rvcik7XG5cblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIHBEcmF3KGVudGl0eUNvbGxlY3RvcjpFbnRpdHlDb2xsZWN0b3IpXG5cdHtcbi8vXHRcdFx0aWYgKGVudGl0eUNvbGxlY3Rvci5za3lCb3gpIHtcbi8vXHRcdFx0XHRpZiAodGhpcy5fYWN0aXZlTWF0ZXJpYWwpXG4vL1x0XHRcdFx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbC5pRGVhY3RpdmF0ZSh0aGlzLl9wU3RhZ2VHTCk7XG4vL1xuLy9cdFx0XHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsID0gbnVsbDtcbi8vXG4vL1x0XHRcdFx0dGhpcy5fcENvbnRleHQuc2V0RGVwdGhUZXN0KGZhbHNlLCBhd2F5LmdsLkNvbnRleHRHTENvbXBhcmVNb2RlLkFMV0FZUyk7XG4vL1x0XHRcdFx0dGhpcy5kcmF3U2t5Ym94KGVudGl0eUNvbGxlY3Rvcik7XG4vL1xuLy9cdFx0XHR9XG4vL1xuLy9cdFx0XHR2YXIgd2hpY2g6bnVtYmVyID0gdGFyZ2V0PyBEZWZhdWx0UmVuZGVyZXIuU0NSRUVOX1BBU1NFUyA6IERlZmF1bHRSZW5kZXJlci5BTExfUEFTU0VTO1xuXG5cdFx0dmFyIHNoZWV0OkNTU1N0eWxlU2hlZXQgPSA8Q1NTU3R5bGVTaGVldD4gZG9jdW1lbnQuc3R5bGVTaGVldHNbZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoIC0gMV07XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBzaGVldC5jc3NSdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHN0eWxlOk1TU3R5bGVDU1NQcm9wZXJ0aWVzID0gKDxDU1NTdHlsZVJ1bGU+IHNoZWV0LmNzc1J1bGVzW2ldKS5zdHlsZTtcblx0XHRcdHN0eWxlLnRyYW5zZm9ybVxuXHRcdFx0XHQ9IHN0eWxlW1wiLXdlYmtpdC10cmFuc2Zvcm1cIl1cblx0XHRcdFx0PSBzdHlsZVtcIi1tb3otdHJhbnNmb3JtXCJdXG5cdFx0XHRcdD0gc3R5bGVbXCItby10cmFuc2Zvcm1cIl1cblx0XHRcdFx0PSBzdHlsZVtcIi1tcy10cmFuc2Zvcm1cIl0gPSAoZW50aXR5Q29sbGVjdG9yLmNhbWVyYS5wcm9qZWN0aW9uLmNvb3JkaW5hdGVTeXN0ZW0gPT0gQ29vcmRpbmF0ZVN5c3RlbS5SSUdIVF9IQU5ERUQpPyBcIlwiIDogXCJzY2FsZTNkKDEsIC0xLCAxKSB0cmFuc2xhdGVZKC1cIiArIHN0eWxlLmhlaWdodCArIFwiKVwiO1xuXHRcdH1cblxuXHRcdHRoaXMuZHJhd1JlbmRlcmFibGVzKHRoaXMuX3JlbmRlcmFibGVIZWFkLCBlbnRpdHlDb2xsZWN0b3IpO1xuXG4vL1x0XHRcdGlmICh0aGlzLl9hY3RpdmVNYXRlcmlhbClcbi8vXHRcdFx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbC5pRGVhY3RpdmF0ZSh0aGlzLl9wU3RhZ2VHTCk7XG5cblx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbCA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgYmFja2J1ZmZlciBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0cHVibGljIHBVcGRhdGVCYWNrQnVmZmVyKClcblx0e1xuXHRcdHRoaXMuX2NvbnRhaW5lci5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgXCJweFwiO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9oZWlnaHQgKyBcInB4XCI7XG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLmNsaXAgPSBcInJlY3QoMHB4LCBcIiArIHRoaXMuX3dpZHRoICsgXCJweCwgXCIgKyB0aGlzLl9oZWlnaHQgKyBcInB4LCAwcHgpXCI7XG5cblx0XHQvL3VwZGF0ZSBjb250ZXh0IG1hdHJpeFxuXHRcdHRoaXMuX2NvbnRleHRNYXRyaXgucmF3RGF0YVswXSA9IHRoaXMuX3dpZHRoLzI7XG5cdFx0dGhpcy5fY29udGV4dE1hdHJpeC5yYXdEYXRhWzVdID0gLXRoaXMuX2hlaWdodC8yO1xuXHRcdHRoaXMuX2NvbnRleHRNYXRyaXgucmF3RGF0YVsxMF0gPSAtMTsgLy9maXggZm9yIGlubmFjY3VyYXRlIHotc29ydFxuXHRcdHRoaXMuX2NvbnRleHRNYXRyaXgucmF3RGF0YVsxMl0gPSB0aGlzLl93aWR0aC8yO1xuXHRcdHRoaXMuX2NvbnRleHRNYXRyaXgucmF3RGF0YVsxM10gPSB0aGlzLl9oZWlnaHQvMjtcblxuXHRcdC8vdXBkYXRlIGNvbnRleHQgdHJhbmZvcm1cblx0XHR0aGlzLl9jb250ZXh0U3R5bGUudHJhbnNmb3JtXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi13ZWJraXQtdHJhbnNmb3JtXCJdXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1tb3otdHJhbnNmb3JtXCJdXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1vLXRyYW5zZm9ybVwiXVxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItbXMtdHJhbnNmb3JtXCJdID0gdGhpcy5fY29udGV4dE1hdHJpeC50b1N0cmluZygpO1xuXG5cdFx0dGhpcy5fcEJhY2tCdWZmZXJJbnZhbGlkID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogRHJhdyB0aGUgc2t5Ym94IGlmIHByZXNlbnQuXG5cdCAqIEBwYXJhbSBlbnRpdHlDb2xsZWN0b3IgVGhlIEVudGl0eUNvbGxlY3RvciBjb250YWluaW5nIGFsbCBwb3RlbnRpYWxseSB2aXNpYmxlIGluZm9ybWF0aW9uLlxuXHQgKi9cblx0cHJpdmF0ZSBkcmF3U2t5Ym94KGVudGl0eUNvbGxlY3RvcjpDU1NFbnRpdHlDb2xsZWN0b3IpXG5cdHtcblx0XHQvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBEcmF3IGEgbGlzdCBvZiByZW5kZXJhYmxlcy5cblx0ICogQHBhcmFtIHJlbmRlcmFibGVzIFRoZSByZW5kZXJhYmxlcyB0byBkcmF3LlxuXHQgKiBAcGFyYW0gZW50aXR5Q29sbGVjdG9yIFRoZSBFbnRpdHlDb2xsZWN0b3IgY29udGFpbmluZyBhbGwgcG90ZW50aWFsbHkgdmlzaWJsZSBpbmZvcm1hdGlvbi5cblx0ICovXG5cdHByaXZhdGUgZHJhd1JlbmRlcmFibGVzKGl0ZW06Q1NTUmVuZGVyYWJsZUJhc2UsIGVudGl0eUNvbGxlY3RvcjpFbnRpdHlDb2xsZWN0b3IpXG5cdHtcblx0XHR2YXIgdmlld1Byb2plY3Rpb246TWF0cml4M0QgPSBlbnRpdHlDb2xsZWN0b3IuY2FtZXJhLnZpZXdQcm9qZWN0aW9uLmNsb25lKCk7XG5cblx0XHR3aGlsZSAoaXRlbSkge1xuXHRcdFx0dGhpcy5fYWN0aXZlTWF0ZXJpYWwgPSA8Q1NTTWF0ZXJpYWxCYXNlPiBpdGVtLm1hdGVyaWFsT3duZXIubWF0ZXJpYWw7XG5cblx0XHRcdC8vc2VyaWFsaXNlIHRyYW5zZm9ybSBhbmQgYXBwbHkgdG8gaHRtbCBlbGVtZW50XG5cdFx0XHR0aGlzLl90cmFuc2Zvcm0uY29weVJhd0RhdGFGcm9tKGl0ZW0ucmVuZGVyU2NlbmVUcmFuc2Zvcm0ucmF3RGF0YSk7XG5cdFx0XHR0aGlzLl90cmFuc2Zvcm0uYXBwZW5kKHZpZXdQcm9qZWN0aW9uKTtcblxuXHRcdFx0dmFyIHN0eWxlOk1TU3R5bGVDU1NQcm9wZXJ0aWVzID0gaXRlbS5odG1sRWxlbWVudC5zdHlsZTtcblxuXHRcdFx0c3R5bGUudHJhbnNmb3JtXG5cdFx0XHRcdD0gc3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybVwiXVxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1vei10cmFuc2Zvcm1cIl1cblx0XHRcdFx0PSBzdHlsZVtcIi1vLXRyYW5zZm9ybVwiXVxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1zLXRyYW5zZm9ybVwiXSA9IHRoaXMuX3RyYW5zZm9ybS50b1N0cmluZygpO1xuXG5cdFx0XHRzdHlsZS50cmFuc2Zvcm1TdHlsZVxuXHRcdFx0XHQ9IHN0eWxlW1wiLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGVcIl1cblx0XHRcdFx0PSBzdHlsZVtcIi1tb3otdHJhbnNmb3JtLXN0eWxlXCJdXG5cdFx0XHRcdD0gc3R5bGVbXCItby10cmFuc2Zvcm0tc3R5bGVcIl1cblx0XHRcdFx0PSBzdHlsZVtcIi1tcy10cmFuc2Zvcm0tc3R5bGVcIl0gPSBcInByZXNlcnZlLTNkXCI7XG5cblx0XHRcdC8vY2hlY2sgaWYgY2hpbGQgcmVxdWlyZXMgYWRkaW5nIHRvIHRoZSB2aWV3XG5cdFx0XHRpZiAoIXRoaXMuX2NvbnRleHQuY29udGFpbnMoaXRlbS5odG1sRWxlbWVudCkpXG5cdFx0XHRcdHRoaXMuX2NvbnRleHQuYXBwZW5kQ2hpbGQoaXRlbS5odG1sRWxlbWVudCk7XG5cblx0XHRcdGl0ZW0gPSBpdGVtLm5leHQ7XG5cdFx0fVxuXG4vL1x0XHRcdHZhciBudW1QYXNzZXM6bnVtYmVyO1xuLy9cdFx0XHR2YXIgajpudW1iZXI7XG4vL1x0XHRcdHZhciBjYW1lcmE6YXdheS5lbnRpdGllcy5DYW1lcmEgPSBlbnRpdHlDb2xsZWN0b3IuY2FtZXJhO1xuLy9cdFx0XHR2YXIgaXRlbTI6YXdheS5yZW5kZXIuQ1NTUmVuZGVyYWJsZUJhc2U7XG4vL1xuLy9cdFx0XHR3aGlsZSAoaXRlbSkge1xuLy9cdFx0XHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsID0gaXRlbS5tYXRlcmlhbDtcbi8vXG4vL1x0XHRcdFx0dGhpcy5fYWN0aXZlTWF0ZXJpYWwuaVVwZGF0ZU1hdGVyaWFsKHRoaXMuX3BDb250ZXh0KTtcbi8vXG4vL1x0XHRcdFx0bnVtUGFzc2VzID0gdGhpcy5fYWN0aXZlTWF0ZXJpYWwuX2lOdW1QYXNzZXM7XG4vL1xuLy9cdFx0XHRcdGogPSAwO1xuLy9cbi8vXHRcdFx0XHRkbyB7XG4vL1x0XHRcdFx0XHRpdGVtMiA9IGl0ZW07XG4vL1xuLy9cdFx0XHRcdFx0dmFyIHJ0dE1hc2s6bnVtYmVyID0gdGhpcy5fYWN0aXZlTWF0ZXJpYWwuaVBhc3NSZW5kZXJzVG9UZXh0dXJlKGopPyAxIDogMjtcbi8vXG4vL1x0XHRcdFx0XHRpZiAoKHJ0dE1hc2sgJiB3aGljaCkgIT0gMCkge1xuLy9cdFx0XHRcdFx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbC5pQWN0aXZhdGVQYXNzKGosIHRoaXMuX3BTdGFnZUdMLCBjYW1lcmEpO1xuLy9cbi8vXHRcdFx0XHRcdFx0ZG8ge1xuLy9cdFx0XHRcdFx0XHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsLmlSZW5kZXJQYXNzKGosIGl0ZW0yLCB0aGlzLl9wU3RhZ2VHTCwgZW50aXR5Q29sbGVjdG9yKTtcbi8vXG4vL1x0XHRcdFx0XHRcdFx0aXRlbTIgPSBpdGVtMi5uZXh0O1xuLy9cbi8vXHRcdFx0XHRcdFx0fSB3aGlsZSAoaXRlbTIgJiYgaXRlbTIubWF0ZXJpYWwgPT0gdGhpcy5fYWN0aXZlTWF0ZXJpYWwpO1xuLy9cbi8vXHRcdFx0XHRcdFx0dGhpcy5fYWN0aXZlTWF0ZXJpYWwuaURlYWN0aXZhdGVQYXNzKGosIHRoaXMuX3BTdGFnZUdMKTtcbi8vXG4vL1x0XHRcdFx0XHR9IGVsc2Uge1xuLy9cdFx0XHRcdFx0XHRkbyB7XG4vL1x0XHRcdFx0XHRcdFx0aXRlbTIgPSBpdGVtMi5uZXh0O1xuLy9cbi8vXHRcdFx0XHRcdFx0fSB3aGlsZSAoaXRlbTIgJiYgaXRlbTIucmVuZGVyYWJsZS5tYXRlcmlhbCA9PSB0aGlzLl9hY3RpdmVNYXRlcmlhbCk7XG4vL1x0XHRcdFx0XHR9XG4vL1x0XHRcdFx0fSB3aGlsZSAoKytqIDwgbnVtUGFzc2VzKTtcbi8vXG4vL1x0XHRcdFx0aXRlbSA9IGl0ZW0yO1xuLy9cdFx0XHR9XG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cblx0XHQvL1RPRE9cblx0fVxuXG5cblx0cHVibGljIF9pQ3JlYXRlRW50aXR5Q29sbGVjdG9yKCk6SUNvbGxlY3RvclxuXHR7XG5cdFx0cmV0dXJuIG5ldyBDU1NFbnRpdHlDb2xsZWN0b3IoKTtcblx0fVxufVxuXG5leHBvcnQgPSBDU1NEZWZhdWx0UmVuZGVyZXI7Il19