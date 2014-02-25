///<reference path="../_definitions.ts"/>

module away.textures
{
	import BitmapData					= away.base.BitmapData;
	import BitmapDataChannel			= away.base.BitmapDataChannel;
	import TextureBase					= away.gl.TextureBase;
	import Point						= away.geom.Point;
	import Rectangle					= away.geom.Rectangle;
	
	/**
	 * A convenience texture that encodes a specular map in the red channel, and the gloss map in the green channel, as expected by BasicSpecularMapMethod
	 */
	export class SpecularBitmapTexture extends BitmapTexture
	{
		private _specularMap:BitmapData;
		private _glossMap:BitmapData;
		
		constructor(specularMap:BitmapData = null, glossMap:BitmapData = null)
		{
			var bmd:BitmapData;
			
			if (specularMap)
				bmd = specularMap;
			else
				bmd = glossMap;
			bmd = bmd? new BitmapData(bmd.width, bmd.height, false, 0xffffff) : new BitmapData(1, 1, false, 0xffffff);
			
			super(bmd);
			
			this.specularMap = specularMap;
			this.glossMap = glossMap;
		}
		
		public get specularMap():BitmapData
		{
			return this._specularMap;
		}
		
		public set specularMap(value:BitmapData)
		{
			this._specularMap = value;

			this.invalidateContent();
			
			this.testSize();
		}
		
		public get glossMap():BitmapData
		{
			return this._glossMap;
		}
		
		public set glossMap(value:BitmapData)
		{
			this._glossMap = value;
			this.invalidateContent();
			
			this.testSize();
		}
		
		private testSize()
		{
			var w:Number, h:Number;
			
			if (this._specularMap) {
				w = this._specularMap.width;
				h = this._specularMap.height;
			} else if (this._glossMap) {
				w = this._glossMap.width;
				h = this._glossMap.height;
			} else {
				w = 1;
				h = 1;
			}
			
			if (w != this.bitmapData.width && h != this.bitmapData.height) {
				var oldBitmap:BitmapData = this.bitmapData;
				this.bitmapData = new BitmapData(this._specularMap.width, this._specularMap.height, false, 0xffffff);
				oldBitmap.dispose();
			}
		}
		
		public pUploadContent(texture:TextureBase)
		{
			var rect:Rectangle = this._specularMap.rect;
			var origin:Point = new Point();
			
			this.bitmapData.fillRect(rect, 0xffffff);
			
			if (this._glossMap)
				this.bitmapData.copyChannel(this._glossMap, rect, origin, BitmapDataChannel.GREEN, BitmapDataChannel.GREEN);
			
			if (this._specularMap)
				this.bitmapData.copyChannel(this._specularMap, rect, origin, BitmapDataChannel.RED, BitmapDataChannel.RED);
			
			super.pUploadContent(texture);
		}
		
		public dispose()
		{
			this.bitmapData.dispose();
			this.bitmapData = null;
		}
	}
}
