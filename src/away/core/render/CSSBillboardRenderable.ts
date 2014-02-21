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

			var image:HTMLImageElement = <HTMLImageElement> document.createElement("img");
			image.src = material.imageElement.src;

			this.htmlElement = image;

			var style:MSStyleCSSProperties = this.htmlElement.style;

			style.position = "absolute";

			style.transformOrigin
				= style["WebkitTransformOrigin"]
				= style["MozTransformOrigin"]
				= style["OTransformOrigin"]
				= style["msTransformOrigin"] = "0% 0%";
		}
	}
}