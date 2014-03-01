///<reference path="../../_definitions.ts"/>

/**
 * @module away.data
 */
module away.render
{
	/**
	 * @class away.pool.RenderableListItem
	 */
	export class CSSBillboardRenderable extends CSSRenderableBase
	{
		constructor(sourceEntity:away.entities.IEntity, material:away.materials.CSSMaterialBase, animator:away.animators.IAnimator)
		{
			super(sourceEntity, material, animator);

			var div:HTMLDivElement = <HTMLDivElement> document.createElement("div");
			div.onmousedown = (event:MouseEvent) => false;

			this.htmlElement = div;

			var style:MSStyleCSSProperties = div.style;

			style.position = "absolute";
			style.transformOrigin
				= style["-webkit-transform-origin"]
				= style["-moz-transform-origin"]
				= style["-o-transform-origin"]
				= style["-ms-transform-origin"] = "0% 0%";

			var img:HTMLDivElement = <HTMLDivElement> document.createElement("div");

			div.appendChild(img);

			style = img.style;

			style.backgroundImage = "url(" + material.imageElement.src + ")";
			style.backgroundSize = "100% 100%";
			style.position = "absolute";
			style.width = material.imageElement.width + "px";
			style.height = material.imageElement.height + "px";
			style.transformOrigin
				= style["-webkit-transform-origin"]
				= style["-moz-transform-origin"]
				= style["-o-transform-origin"]
				= style["-ms-transform-origin"] = "0% 0%";
			style.transform
				= style["-webkit-transform"]
				= style["-moz-transform"]
				= style["-o-transform"]
				= style["-ms-transform"] = "scale3d(" + 1/material.imageElement.width + ", -" + 1/material.imageElement.height + ", 1) translateY(-" + material.imageElement.height + "px)";
		}
	}
}