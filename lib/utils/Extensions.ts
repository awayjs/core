declare var SIMD:any;

/**
 *
 */
export class Extensions
{
	public static SIMD:boolean = Boolean(typeof(SIMD) !== "undefined");
}