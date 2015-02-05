import BitmapData				= require("awayjs-core/lib/base/BitmapData");
import BitmapDataChannel		= require("awayjs-core/lib/base/BitmapDataChannel");
import Point					= require("awayjs-core/lib/geom/Point");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import BitmapTexture			= require("awayjs-core/lib/textures/BitmapTexture");

/**
 * A convenience texture that encodes a specular map in the red channel, and the gloss map in the green channel, as expected by BasicSpecularMapMethod
 */
class SpecularBitmapTexture extends BitmapTexture
{
	private _specularMap:BitmapData;
	private _glossMap:BitmapData;
	
	constructor(specularMap:BitmapData = null, glossMap:BitmapData = null)
	{
		var bmd:BitmapData = specularMap? specularMap : glossMap;

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
		
		this._testSize();
	}
	
	public get glossMap():BitmapData
	{
		return this._glossMap;
	}
	
	public set glossMap(value:BitmapData)
	{
		this._glossMap = value;
		this.invalidateContent();
		
		this._testSize();
	}
	
	private _testSize()
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
		
		if (w != this._bitmapData.width && h != this._bitmapData.height) {
			var oldBitmap:BitmapData = this._bitmapData;
			this.bitmapData = new BitmapData(this._specularMap.width, this._specularMap.height, false, 0xffffff);
			oldBitmap.dispose();
		}
	}

	public _iGetTextureData():BitmapData
	{
		var rect:Rectangle = this._specularMap.rect;
		var origin:Point = new Point();

		this._bitmapData.fillRect(rect, 0xffffff);

		if (this._glossMap)
			this._bitmapData.copyChannel(this._glossMap, rect, origin, BitmapDataChannel.GREEN, BitmapDataChannel.GREEN);

		if (this._specularMap)
			this._bitmapData.copyChannel(this._specularMap, rect, origin, BitmapDataChannel.RED, BitmapDataChannel.RED);

		return this._bitmapData;
	}
}

export = SpecularBitmapTexture;