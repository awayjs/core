import {BlendMode}				from "../image/BlendMode";
import {ColorTransform}			from "../geom/ColorTransform";
import {Matrix}					from "../geom/Matrix";
import {Rectangle}				from "../geom/Rectangle";
import {ColorUtils}				from "../utils/ColorUtils";

export class BitmapImageUtils
{
	public static _fillRect(context:CanvasRenderingContext2D, rect:Rectangle, color:number, transparent:boolean):void
	{
		if (color == 0x0 && transparent) {
			context.clearRect(rect.x, rect.y, rect.width, rect.height);
		} else {
			var argb:number[] = ColorUtils.float32ColorToARGB(color);

			if (transparent)
				context.fillStyle = 'rgba(' + argb[1] + ',' + argb[2] + ',' + argb[3] + ',' + argb[0]/255 + ')';
			else
				context.fillStyle = 'rgba(' + argb[1] + ',' + argb[2] + ',' + argb[3] + ',1)';

			context.fillRect(rect.x, rect.y, rect.width, rect.height);
		}
	}

	public static _copyPixels(context:CanvasRenderingContext2D, bmpd:HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, sourceRect:Rectangle, destRect:Rectangle):void
	{
		context.drawImage(bmpd, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);
	}

	public static _draw(context:CanvasRenderingContext2D, source:any, matrix:Matrix, colorTransform:ColorTransform, blendMode:BlendMode, clipRect:Rectangle, smoothing:boolean):void
	{
		context.save();

		if (matrix != null)
			context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);

		if (clipRect != null)
			context.drawImage(source, clipRect.x, clipRect.y, clipRect.width, clipRect.height);
		else
			context.drawImage(source, 0, 0);

		context.restore();
	}
}