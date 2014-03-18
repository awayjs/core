///<reference path="../../_definitions.ts"/>

/**
 * @module away.traverse
 */
module away.traverse
{
	/**
	 * @class away.traverse.CSSEntityCollector
	 */
	export class CSSEntityCollector extends CollectorBase implements ICollector
	{
		constructor(renderer:away.render.IRenderer)
		{
			super(renderer);
		}
	}
}