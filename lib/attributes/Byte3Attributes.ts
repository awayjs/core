import AttributesBuffer			from "../attributes/AttributesBuffer";
import AttributesView			from "../attributes/AttributesView";

class Byte3Attributes extends AttributesView
{
	public static assetType:string = "[attributes Byte3Attributes]";

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return Byte3Attributes.assetType;
	}

	/**
	 *
	 */
	constructor(length?:number, unsigned?:boolean);
	constructor(attributesBuffer?:AttributesBuffer, unsigned?:boolean);
	constructor(attributesBufferLength?:any, unsigned:boolean = true)
	{
		super(unsigned? Uint8Array : Int8Array, 3, attributesBufferLength, unsigned);
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

	public _internalClone(attributesBuffer:AttributesBuffer):Byte3Attributes
	{
		return (this._cloneCache = new Byte3Attributes(attributesBuffer, this._arrayClass == Uint8Array));
	}

	public clone(attributesBuffer:AttributesBuffer = null):Byte3Attributes
	{
		return <Byte3Attributes> super.clone(attributesBuffer);
	}
}

export default Byte3Attributes;