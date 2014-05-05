///<reference path="../../_definitions.ts"/>

/**
 * @module away.data
 */
module away.pool
{
	/**
	 * @class away.pool.CSSSkyboxRenderable
	 */
	export class CSSSkyboxRenderable extends CSSRenderableBase
	{
		public static id:string = "skybox";

		constructor(pool:RenderablePool, skyBox:away.entities.Skybox)
		{
			super(pool, skyBox, skyBox);

			var div:HTMLDivElement = <HTMLDivElement> document.createElement("div");
			div.onmousedown = (event:MouseEvent) => false;

			this.htmlElement = div;

			var style:MSStyleCSSProperties = div.style;
			var img:HTMLDivElement;

			//create the six images that make up the skybox
			style.position = "absolute";
			style.transformOrigin
				= style["-webkit-transform-origin"]
				= style["-moz-transform-origin"]
				= style["-o-transform-origin"]
				= style["-ms-transform-origin"] = "0% 0%";

			img = <HTMLDivElement> document.createElement("div");

			div.appendChild(img);

			img.className = "material" + skyBox.material.id;
		}
	}
}