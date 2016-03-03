import AttributesBuffer			= require("awayjs-core/lib/attributes/AttributesBuffer");
import AttributesView			= require("awayjs-core/lib/attributes/AttributesView");
import IArrayBufferViewClass	= require("awayjs-core/lib/utils/IArrayBufferViewClass");

class Byte2Attributes extends AttributesView
{
	public static assetType:string = "[attributes Byte2Attributes]";

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return Byte2Attributes.assetType;
	}

	/**
	 *
	 */
	constructor(length?:number, unsigned?:boolean);
	constructor(attributesBuffer?:AttributesBuffer, unsigned?:boolean);
	constructor(attributesBufferLength?:any, unsigned:boolean = true)
	{
		super(unsigned? Uint8Array : Int8Array, 2, attributesBufferLength, unsigned);
	}

	public set(array:Array<number>, offset?:number);
	public set(typedArray:Uint8Array, offset?:number);
	public set(typedArray:Int8Array, offset?:number);
	public set(values:any, offset:number = 0)
	{
		super.set(values, offset);
	}

	public get(count:number, offset?:number):Uint8Array;
	public get(count:number, offset?:number):Int8Array;
	public get(count:number, offset:number = 0):any
	{
		return super.get(count, offset);
	}

	public _internalClone(attributesBuffer:AttributesBuffer):Byte2Attributes
	{
		return (this._cloneCache = new Byte2Attributes(attributesBuffer, this._arrayClass == Uint8Array));
	}

	public clone(attributesBuffer:AttributesBuffer = null):Byte2Attributes
	{
		return <Byte2Attributes> super.clone(attributesBuffer);
	}
}

export = Byte2Attributes;