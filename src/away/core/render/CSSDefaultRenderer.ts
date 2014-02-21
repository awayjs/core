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
	export class CSSDefaultRenderer extends CSSRendererBase
	{
		private _activeMaterial:away.materials.CSSMaterialBase;
		private _skyboxProjection:away.geom.Matrix3D = new away.geom.Matrix3D();
		private _transform:away.geom.Matrix3D = new away.geom.Matrix3D();

		/**
		 * Creates a new CSSDefaultRenderer object.
		 */
		constructor()
		{
			super();
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

			this.drawRenderables(entityCollector.renderableHead, entityCollector);

//			if (this._activeMaterial)
//				this._activeMaterial.iDeactivate(this._pStageGL);

			this._activeMaterial = null;
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
		private drawRenderables(item:away.render.CSSRenderableBase, entityCollector:away.traverse.CSSEntityCollector)
		{
			var viewProjection:away.geom.Matrix3D = entityCollector.camera.viewProjection;

			while (item) {
				this._activeMaterial = item.material;

				//serialise transform and apply to html element
				this._transform.copyRawDataFrom(item.renderSceneTransform.rawData);
				this._transform.prepend(viewProjection);

				var style:MSStyleCSSProperties = item.htmlElement.style;

				style.transform
					= style["-webkit-transform"]
					= style["-moz-transform"]
					= style["-o-transform"]
					= style["-ms-transform"] = "matrix3d(" + this._transform.rawData.join(",") + ")";

				//check if child requires adding to the view
				if (!document.body.contains(item.htmlElement))
					document.body.appendChild(item.htmlElement);

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
	}
}
