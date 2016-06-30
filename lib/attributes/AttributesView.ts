import {AttributesBuffer}		from "../attributes/AttributesBuffer";
import {AssetBase}				from "../library/AssetBase";
import {IArrayBufferViewClass}	from "../utils/IArrayBufferViewClass";

export class AttributesView extends AssetBase
{
	public static assetType:string = "[attributes AttributesView]";

	/**
	 *
	 */
	public get assetType():string
	{
		return AttributesView.assetType;
	}

	public _cloneCache:AttributesView;
	public _attributesBuffer:AttributesBuffer;
	public _bufferDirty:boolean;
	private _size:number;
	private _dimensions:number;
	private _unsigned:boolean;

	public _index:number;
	public _arrayClass:IArrayBufferViewClass;

	public normalized:boolean;

	public get attributesBuffer():AttributesBuffer
	{
		return this._attributesBuffer;
	}

	/**
	 *
	 * @returns {number}
	 */
	public get size():number
	{
		return this._size;
	}

	public set size(value:number)
	{
		if (this._size == value)
			return;

		this._size = value;

		this._attributesBuffer._removeView(this);
		this._attributesBuffer._addView(this);
	}

	/**
	 *
	 * @returns {number}
	 */
	public get dimensions():number
	{
		return this._dimensions;
	}

	public set dimensions(value:number)
	{
		if (this._dimensions == value)
			return;

		this._dimensions = value;

		//reset view
		this._attributesBuffer._removeView(this);
		this._attributesBuffer._addView(this);
	}

	public get unsigned():boolean
	{
		return this._unsigned;
	}

	public get count():number
	{
		return this._attributesBuffer.count;
	}

	public set count(value:number)
	{
		this._attributesBuffer.count = value;
	}

	public get offset():number
	{
		return this._attributesBuffer._getOffset(this._index);
	}

	public get length():number
	{
		return this._attributesBuffer.count*this._dimensions;
	}
	
	public get stride():number
	{
		return this._attributesBuffer.stride/this._size;
	}

	/**
	 *
	 */
	constructor(arrayClass:IArrayBufferViewClass, dimensions:number, count?:number, unsigned?:boolean);
	constructor(arrayClass:IArrayBufferViewClass, dimensions:number, attributesBuffer?:AttributesBuffer, unsigned?:boolean);
	constructor(arrayClass:IArrayBufferViewClass, dimensions:number, attributesBufferCount:any = 0, unsigned:boolean = false)
	{
		super();

		this._arrayClass = arrayClass;
		this._size = arrayClass.BYTES_PER_ELEMENT;
		this._dimensions = dimensions;
		this._attributesBuffer = (attributesBufferCount instanceof AttributesBuffer)? <AttributesBuffer> attributesBufferCount : new AttributesBuffer(this._dimensions*this._size, attributesBufferCount);

		this._attributesBuffer._addView(this);

		this._unsigned = unsigned;
	}

	public set(array:Array<number>, offset?:number);
	public set(arrayBufferView:ArrayBufferView, offset?:number);
	public set(values:any, offset:number = 0):void
	{
		this._attributesBuffer._setAttributes(this._index, (values instanceof Array)? new (this._arrayClass)(values) : <ArrayBufferView> values, offset);
	}

	public get(count:number, offset:number = 0):ArrayBufferView
	{
		return new (this._arrayClass)(this._attributesBuffer.buffer, offset*this._attributesBuffer.stride + this.offset, count*this.stride - this.offset/this.size);
	}

	public _internalClone(attributesBuffer:AttributesBuffer):AttributesView
	{
		return (this._cloneCache = new AttributesView(this._arrayClass, this._dimensions, attributesBuffer, this._unsigned));
	}

	public clone(attributesBuffer:AttributesBuffer = null):AttributesView
	{
		if (attributesBuffer)
			this._internalClone(attributesBuffer);

		if (!this._cloneCache)
			this._attributesBuffer.clone();

		var cloneCache:AttributesView = this._cloneCache;
		this._cloneCache = null;

		return cloneCache;
	}

	/**
	 * @inheritDoc
	 */
	public dispose():void
	{
		if (!this._attributesBuffer)
			return;

		this._attributesBuffer._removeView(this);
		this._attributesBuffer = null;
	}
}