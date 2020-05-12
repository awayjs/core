/**
 *
 */
export class ColorUtils
{
	public static float32ColorToARGB(float32Color:number):number[]
	{
		var a:number = (float32Color & 0xff000000) >>> 24;
		var r:number = (float32Color & 0xff0000) >>> 16;
		var g:number = (float32Color & 0xff00) >>> 8;
		var b:number = float32Color & 0xff;
		var result:number[] = [a, r , g , b];

		return result;
	}

	public static f32_RGBA_To_f32_ARGB(float32Color:number):number
	{
		var r:number = (float32Color & 0xff000000) >>> 24;
		var g:number = (float32Color & 0xff0000) >>> 16;
		var b:number = (float32Color & 0xff00) >>> 8;
		var a:number = float32Color & 0xff;
		return (a << 24) | (r << 16) | (g << 8) | b;
	}

	public static f32_RGB_To_f32_ARGB(float32Color:number):number
	{
		var r:number = (float32Color & 0xff000000) >>> 24;
		var g:number = (float32Color & 0xff0000) >>> 16;
		var b:number = (float32Color & 0xff00) >>> 8;
		var a:number = float32Color & 0xff;
		return (a << 24) | (r << 16) | (g << 8) | b;
	}

	public getAlphaFromF32RGBA(float32Color:number):number
	{
		return float32Color & 0xff;
	}

	public static ARGBtoFloat32(a:number, r:number, g:number, b:number):number
	{
		return ((a << 24) | (r << 16) | (g << 8) | b);
	}

	private static componentToHex(c:number):string
	{
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	public static RGBToHexString(argb:number[]):string
	{
		return "#" + ColorUtils.componentToHex(argb[1]) + ColorUtils.componentToHex(argb[2]) + ColorUtils.componentToHex(argb[3]);
	}

	public static ARGBToHexString(argb:number[]):string
	{
		return "#" + ColorUtils.componentToHex(argb[0]) + ColorUtils.componentToHex(argb[1]) + ColorUtils.componentToHex(argb[2]) + ColorUtils.componentToHex(argb[3]);
	}

	public static interpolateFloat32Color(start:number, end:number, ratio:number)
	{

		var a:number = (start & 0xff000000) >>> 24;
		var r:number = (start & 0xff0000) >>> 16;
		var g:number = (start & 0xff00) >>> 8;
		var b:number = start & 0xff;
		var a2:number = (end & 0xff000000) >>> 24;
		var r2:number = (end & 0xff0000) >>> 16;
		var g2:number = (end & 0xff00) >>> 8;
		var b2:number = end & 0xff;

		var rs = 1 - ratio;
		var re = ratio;

		return (((a * rs + a2 * re) << 24) | ((r * rs + r2 * re) << 16) | ((g * rs + g2 * re) << 8) | (b * rs + b2 * re));
	}
}