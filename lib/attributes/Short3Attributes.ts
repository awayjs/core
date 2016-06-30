import {AttributesBuffer}			from "../attributes/AttributesBuffer";
import {AttributesView}			from "../attributes/AttributesView";

export class Short3Attributes extends AttributesView
{
	public static assetType:string = "[attributes Short3Attributes]";

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return Short3Attributes.assetType;
	}

	/**
	 *
	 */
	constructor(length?:number, unsigned?:boolean);
	constructor(attributesBuffer?:AttributesBuffer, unsigned?:boolean);
	constructor(attributesBufferLength?:any, unsigned:boolean = true)
	{
		super(unsigned? Uint16Array : Int16Array, 3, attributesBufferLength, unsigned)
	}

	public set(array:Array<number>, offset?:number);
	public set(typedArray:Uint16Array, offset?:number);
	public set(typedArray:Int16Array, offset?:number);
	public set(values:any, offset:number = 0):void
	{
		super.set(values, offset);
	}

	public get(count:number, offset?:number):Uint16Array;
	public get(count:number, offset?:number):Int16Array;
	public get(count:number, offset:number = 0):any
	{
		return super.get(count, offset);
	}

	public _internalClone(attributesBuffer:AttributesBuffer):Short3Attributes
	{
		return (this._cloneCache = new Short3Attributes(attributesBuffer, this._arrayClass == Uint16Array));
	}

	public clone(attributesBuffer:AttributesBuffer = null):Short3Attributes
	{
		return <Short3Attributes> super.clone(attributesBuffer);
	}
}