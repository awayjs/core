import {AttributesBuffer}			from "../attributes/AttributesBuffer";
import {AttributesView}			from "../attributes/AttributesView";

export class Float3Attributes extends AttributesView
{
	public static assetType:string = "[attributes Float3Attributes]";

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return Float3Attributes.assetType;
	}

	/**
	 *
	 */
	constructor(length?:number);
	constructor(attributesBuffer?:AttributesBuffer);
	constructor(attributesBufferLength?:any)
	{
		super(Float32Array, 3, attributesBufferLength)
	}

	public set(array:Array<number>, offset?:number);
	public set(typedArray:Float32Array, offset?:number);
	public set(values:any, offset:number = 0):void
	{
		super.set(values, offset);
	}

	public get(count:number, offset:number = 0):Float32Array
	{
		return <Float32Array> super.get(count, offset);
	}

	public _internalClone(attributesBuffer:AttributesBuffer):Float3Attributes
	{
		return (this._cloneCache = new Float3Attributes(attributesBuffer));
	}

	public clone(attributesBuffer:AttributesBuffer = null):Float3Attributes
	{
		return <Float3Attributes> super.clone(attributesBuffer);
	}
}