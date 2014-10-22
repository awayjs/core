import Matrix3D						= require("awayjs-core/lib/core/geom/Matrix3D");
import CSSRenderableBase			= require("awayjs-core/lib/core/pool/CSSRenderableBase");
import CSSRendererBase				= require("awayjs-core/lib/core/render/CSSRendererBase");
import IRenderer					= require("awayjs-core/lib/core/render/IRenderer");
import CSSEntityCollector			= require("awayjs-core/lib/core/traverse/CSSEntityCollector");
import EntityCollector				= require("awayjs-core/lib/core/traverse/EntityCollector");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");
import CSSMaterialBase				= require("awayjs-core/lib/materials/CSSMaterialBase");
import CoordinateSystem				= require("awayjs-core/lib/projections/CoordinateSystem");


/**
 * The DefaultRenderer class provides the default rendering method. It renders the scene graph objects using the
 * materials assigned to them.
 *
 * @class away.render.DefaultRenderer
 */
class CSSDefaultRenderer extends CSSRendererBase implements IRenderer
{
	private _container:HTMLDivElement;
	private _context:HTMLDivElement;
	private _contextStyle:MSStyleCSSProperties;
	private _contextMatrix:Matrix3D = new Matrix3D();
	
	private _activeMaterial:CSSMaterialBase;
	private _skyboxProjection:Matrix3D = new Matrix3D();
	private _transform:Matrix3D = new Matrix3D();

	/**
	 * Creates a new CSSDefaultRenderer object.
	 */
	constructor()
	{
		super();

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
		this._contextStyle.transformStyle
			= this._contextStyle["-webkit-transform-style"]
			= this._contextStyle["-moz-transform-style"]
			= this._contextStyle["-o-transform-style"]
			= this._contextStyle["-ms-transform-style"] = "preserve-3d";
		this._contextStyle.transformOrigin
			= this._contextStyle["-webkit-transform-origin"]
			= this._contextStyle["-moz-transform-origin"]
			= this._contextStyle["-o-transform-origin"]
			= this._contextStyle["-ms-transform-origin"] = "0% 0%";

		//add context to container
		this._container.appendChild(this._context);
	}

	/**
	 *
	 * @param entityCollector
	 */
	public render(entityCollector:ICollector)
	{
		super.render(entityCollector);

		if (this._pBackBufferInvalid)// reset or update render settings
			this.pUpdateBackBuffer();

		this._iRender(<EntityCollector> entityCollector);

		this._pBackBufferInvalid = false;
	}

	/**
	 * @inheritDoc
	 */
	public pDraw(entityCollector:EntityCollector)
	{
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

		var sheet:CSSStyleSheet = <CSSStyleSheet> document.styleSheets[document.styleSheets.length - 1];

		for (var i:number = 0; i < sheet.cssRules.length; i++) {
			var style:MSStyleCSSProperties = (<CSSStyleRule> sheet.cssRules[i]).style;
			style.transform
				= style["-webkit-transform"]
				= style["-moz-transform"]
				= style["-o-transform"]
				= style["-ms-transform"] = (entityCollector.camera.projection.coordinateSystem == CoordinateSystem.RIGHT_HANDED)? "" : "scale3d(1, -1, 1) translateY(-" + style.height + ")";
		}

		this.drawRenderables(this._renderableHead, entityCollector);

//			if (this._activeMaterial)
//				this._activeMaterial.iDeactivate(this._pStageGL);

		this._activeMaterial = null;
	}

	/**
	 * Updates the backbuffer properties.
	 */
	public pUpdateBackBuffer()
	{
		this._container.style.width = this._width + "px";
		this._container.style.height = this._height + "px";
		this._container.style.clip = "rect(0px, " + this._width + "px, " + this._height + "px, 0px)";

		//update context matrix
		this._contextMatrix.rawData[0] = this._width/2;
		this._contextMatrix.rawData[5] = -this._height/2;
		this._contextMatrix.rawData[10] = -1; //fix for innaccurate z-sort
		this._contextMatrix.rawData[12] = this._width/2;
		this._contextMatrix.rawData[13] = this._height/2;

		//update context tranform
		this._contextStyle.transform
			= this._contextStyle["-webkit-transform"]
			= this._contextStyle["-moz-transform"]
			= this._contextStyle["-o-transform"]
			= this._contextStyle["-ms-transform"] = this._contextMatrix.toString();

		this._pBackBufferInvalid = false;
	}

	/**
	 * Draw the skybox if present.
	 * @param entityCollector The EntityCollector containing all potentially visible information.
	 */
	private drawSkybox(entityCollector:CSSEntityCollector)
	{
		//TODO
	}

	/**
	 * Draw a list of renderables.
	 * @param renderables The renderables to draw.
	 * @param entityCollector The EntityCollector containing all potentially visible information.
	 */
	private drawRenderables(item:CSSRenderableBase, entityCollector:EntityCollector)
	{
		var viewProjection:Matrix3D = entityCollector.camera.viewProjection.clone();

		while (item) {
			this._activeMaterial = <CSSMaterialBase> item.materialOwner.material;

			//serialise transform and apply to html element
			this._transform.copyRawDataFrom(item.renderSceneTransform.rawData);
			this._transform.append(viewProjection);

			var style:MSStyleCSSProperties = item.htmlElement.style;

			style.transform
				= style["-webkit-transform"]
				= style["-moz-transform"]
				= style["-o-transform"]
				= style["-ms-transform"] = this._transform.toString();

			style.transformStyle
				= style["-webkit-transform-style"]
				= style["-moz-transform-style"]
				= style["-o-transform-style"]
				= style["-ms-transform-style"] = "preserve-3d";

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
	}

	public dispose()
	{
		super.dispose();

		//TODO
	}


	public _iCreateEntityCollector():ICollector
	{
		return new CSSEntityCollector();
	}
}

export = CSSDefaultRenderer;