import {AttributesBuffer}		from "../attributes/AttributesBuffer";
import {AttributesView}			from "../attributes/AttributesView";

export class Byte4Attributes extends AttributesView
{
	public static assetType:string = "[attributes Byte4Attributes]";

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return Byte4Attributes.assetType;
	}

	/**
	 *
	 */
	constructor(length?:number, unsigned?:boolean);
	constructor(attributesBuffer?:AttributesBuffer, unsigned?:boolean);
	constructor(attributesBufferLength?:any, unsigned:boolean = true)
	{
		super(unsigned? Uint8Array : Int8Array, 4, attributesBufferLength, unsigned);
	}

	public set(array:Array<number>, offset?:number);
	public set(typedArray:Float32Array, offset?:number);
	public set(typedArray:Uint8Array, offset?:number);
	public set(typedArray:Int8Array, offset?:number);
	public set(values:any, offset:number = 0):void
	{
		super.set(values, offset);
	}

	public get(count:number, offset?:number):Uint8Array;
	public get(count:number, offset?:number):Int8Array;
	public get(count:number, offset:number = 0):any
	{
		return super.get(count, offset);
	}

	public _internalClone(attributesBuffer:AttributesBuffer):Byte4Attributes
	{
		return (this._cloneCache = new Byte4Attributes(attributesBuffer, this._arrayClass == Uint8Array));
	}

	public clone(attributesBuffer:AttributesBuffer = null):Byte4Attributes
	{
		return <Byte4Attributes> super.clone(attributesBuffer);
	}
}