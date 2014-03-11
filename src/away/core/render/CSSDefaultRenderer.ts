///<reference path="../../_definitions.ts"/>

/**
 * @module away.render
 */
module away.render
{
	/**
	 * The DefaultRenderer class provides the default rendering method. It renders the scene graph objects using the
	 * materials assigned to them.
	 *
	 * @class away.render.DefaultRenderer
	 */
	export class CSSDefaultRenderer extends CSSRendererBase implements IRenderer
	{
		private _container:HTMLDivElement;
		private _context:HTMLDivElement;
		private _contextStyle:MSStyleCSSProperties;
		private _contextMatrix:away.geom.Matrix3D = new away.geom.Matrix3D();
		
		private _activeMaterial:away.materials.CSSMaterialBase;
		private _skyboxProjection:away.geom.Matrix3D = new away.geom.Matrix3D();
		private _transform:away.geom.Matrix3D = new away.geom.Matrix3D();

		public _width:number;
		public _height:number;

		private _viewPort:away.geom.Rectangle = new away.geom.Rectangle();
		private _viewportDirty:boolean;
		private _scissorRect:away.geom.Rectangle = new away.geom.Rectangle();
		private _scissorDirty:boolean;

		private _localPos:away.geom.Point = new away.geom.Point();
		private _globalPos:away.geom.Point = new away.geom.Point();

		private _scissorUpdated:away.events.RendererEvent;
		private _viewPortUpdated:away.events.RendererEvent;

		/**
		 * A viewPort rectangle equivalent of the StageGL size and position.
		 */
		public get viewPort():away.geom.Rectangle
		{
			return this._viewPort;
		}

		/**
		 * A scissor rectangle equivalent of the view size and position.
		 */
		public get scissorRect():away.geom.Rectangle
		{
			return this._scissorRect;
		}

		/**
		 *
		 */
		public get x():number
		{
			return this._localPos.x;
		}

		public set x(value:number)
		{
			if (this.x == value)
				return;

			this.updateGlobalPos();
		}

		/**
		 *
		 */
		public get y():number
		{
			return this._localPos.y;
		}

		public set y(value:number)
		{
			if (this.y == value)
				return;

			this._globalPos.y = this._localPos.y = value;

			this.updateGlobalPos();
		}

		/**
		 *
		 */
		public get width():number
		{
			return this._width;
		}

		public set width(value:number)
		{
			if (this._width == value)
				return;

			this._width = value;
			this._scissorRect.width = value;
			this._viewPort.width = value;

			this._pBackBufferInvalid = true;
			this._depthTextureInvalid = true;

			this.notifyViewportUpdate();
			this.notifyScissorUpdate();
		}

		/**
		 *
		 */
		public get height():number
		{
			return this._height;
		}

		public set height(value:number)
		{
			if (this._height == value)
				return;

			this._height = value;
			this._scissorRect.height = value;
			this._viewPort.height = value;

			this._pBackBufferInvalid = true;
			this._depthTextureInvalid = true;

			this.notifyViewportUpdate();
			this.notifyScissorUpdate();
		}

		/**
		 *
		 */
		public renderableSorter:away.sort.IEntitySorter;

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
			document.body.style.margin = "0px";

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
			
			this._viewPort = new away.geom.Rectangle();

			if (this._width == 0)
				this.width = window.innerWidth;

			if (this._height == 0)
				this.height = window.innerHeight;
		}

		/**
		 *
		 * @param entityCollector
		 */
		public render(entityCollector:away.traverse.ICollector)
		{
			this._viewportDirty = false;
			this._scissorDirty = false;


			if (this._pBackBufferInvalid)// reset or update render settings
				this.pUpdateBackBuffer();

			this._iRender(<away.traverse.CSSEntityCollector> entityCollector);

			this._pBackBufferInvalid = false;
		}

		/**
		 * @inheritDoc
		 */
		public pDraw(entityCollector:away.traverse.CSSEntityCollector)
		{
//			if (entityCollector.skyBox) {
//				if (this._activeMaterial)
//					this._activeMaterial.iDeactivate(this._pStageGL);
//
//				this._activeMaterial = null;
//
//				this._pContext.setDepthTest(false, away.gl.ContextGLCompareMode.ALWAYS);
//				this.drawSkyBox(entityCollector);
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
					= style["-ms-transform"] = ((<away.projections.PerspectiveProjection> entityCollector.camera.projection).coordinateSystem == away.projections.CoordinateSystem.RIGHT_HANDED)? "" : "scale3d(1, -1, 1) translateY(-" + style.height + ")";
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
			this._contextMatrix.rawData[0] = this._width;
			this._contextMatrix.rawData[5] = -this._height;
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
		private drawSkyBox(entityCollector:away.traverse.CSSEntityCollector)
		{
			//TODO
		}

		/**
		 * Draw a list of renderables.
		 * @param renderables The renderables to draw.
		 * @param entityCollector The EntityCollector containing all potentially visible information.
		 */
		private drawRenderables(item:away.pool.CSSRenderableBase, entityCollector:away.traverse.CSSEntityCollector)
		{
			var viewProjection:away.geom.Matrix3D = entityCollector.camera.viewProjection.clone();

			while (item) {
				this._activeMaterial = <away.materials.CSSMaterialBase> item.materialOwner.material;

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

		/**
		 * @private
		 */
		private notifyScissorUpdate()
		{
			if (this._scissorDirty)
				return;

			this._scissorDirty = true;

			if (!this._scissorUpdated)
				this._scissorUpdated = new away.events.RendererEvent(away.events.RendererEvent.SCISSOR_UPDATED);

			this.dispatchEvent(this._scissorUpdated);
		}


		/**
		 * @private
		 */
		private notifyViewportUpdate()
		{
			if (this._viewportDirty)
				return;

			this._viewportDirty = true;

			if (!this._viewPortUpdated)
				this._viewPortUpdated = new away.events.RendererEvent(away.events.RendererEvent.VIEWPORT_UPDATED);

			this.dispatchEvent(this._viewPortUpdated);
		}

		/**
		 *
		 */
		public updateGlobalPos()
		{
			this._viewPort.x = this._globalPos.x;
			this._viewPort.y = this._globalPos.y;

			this.notifyViewportUpdate();
			this.notifyScissorUpdate();
		}
	}
}
