import BlendMode				= require("awayjs-core/lib/image/BlendMode");
import ColorTransform			= require("awayjs-core/lib/geom/ColorTransform");
import Matrix					= require("awayjs-core/lib/geom/Matrix");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import ColorUtils				= require("awayjs-core/lib/utils/ColorUtils");

class BitmapImageUtils
{
	public static _fillRect(context:CanvasRenderingContext2D, rect:Rectangle, color:number, transparent:boolean)
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

	public static _copyPixels(context:CanvasRenderingContext2D, bmpd:HTMLElement, sourceRect:Rectangle, destRect:Rectangle)
	{
		context.drawImage(bmpd, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);
	}

	public static _draw(context:CanvasRenderingContext2D, source:any, matrix:Matrix, colorTransform:ColorTransform, blendMode:BlendMode, clipRect:Rectangle, smoothing:boolean)
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

export = BitmapImageUtils;