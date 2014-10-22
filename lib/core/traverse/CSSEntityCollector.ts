import CollectorBase				= require("awayjs-core/lib/core/traverse/CollectorBase");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");

/**
 * @class away.traverse.CSSEntityCollector
 */
class CSSEntityCollector extends CollectorBase implements ICollector
{
	constructor()
	{
		super();
	}
}

export = CSSEntityCollector;