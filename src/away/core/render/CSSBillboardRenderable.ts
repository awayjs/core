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
			style.width = "1px";
			style.height = "1px";
			style.transformOrigin
				= style["-webkit-transform-origin"]
				= style["-moz-transform-origin"]
				= style["-o-transform-origin"]
				= style["-ms-transform-origin"] = "0% 0%";

			var img:HTMLImageElement = <HTMLImageElement> document.createElement("img");

			div.appendChild(img);
			img.src = material.imageElement.src;

			style = img.style;

			style.position = "absolute";
			style.width = "1px";
			style.height = "1px";
			style.transform
				= style["-webkit-transform"]
				= style["-moz-transform"]
				= style["-o-transform"]
				= style["-ms-transform"] = "rotateX(180deg)";
		}
	}
}