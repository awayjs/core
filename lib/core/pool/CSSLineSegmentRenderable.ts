import CSSRenderableBase			= require("awayjs-core/lib/core/pool/CSSRenderableBase");
import RenderablePool				= require("awayjs-core/lib/core/pool/RenderablePool");
import LineSegment					= require("awayjs-core/lib/entities/LineSegment");

/**
 * @class away.pool.RenderableListItem
 */
class CSSLineSegmentRenderable extends CSSRenderableBase
{
	public static id:string = "lineSegment";

	constructor(pool:RenderablePool, lineSegment:LineSegment)
	{
		super(pool, lineSegment, lineSegment);

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

		img.className = "material" + lineSegment.material.id;
	}
}

export = CSSLineSegmentRenderable;