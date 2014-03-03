///<reference path="../../_definitions.ts"/>

/**
 * @module away.data
 */
module away.pool
{
	/**
	 * @class away.pool.RenderableListItem
	 */
	export class CSSBillboardRenderable extends CSSRenderableBase
	{
		constructor(pool:RenderablePool, billboard:away.entities.Billboard)
		{
			super(pool, billboard, billboard);

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

			img.className = "material" + this.materialOwner.material.id;
		}
	}
}