declare var SIMD:any;

/**
 *
 */
class Extensions
{
	public static SIMD:boolean = Boolean(typeof(SIMD) !== "undefined");
}

export = Extensions;