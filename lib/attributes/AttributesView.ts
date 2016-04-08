import AttributesBuffer			from "awayjs-core/lib/attributes/AttributesBuffer";
import AssetBase				from "awayjs-core/lib/library/AssetBase";
import IArrayBufferViewClass	from "awayjs-core/lib/utils/IArrayBufferViewClass";

class AttributesView extends AssetBase
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

	public _localArrayBuffer:ArrayBuffer;

	public normalized:boolean;

	public get buffer():AttributesBuffer
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
	public set(values:any, offset:number = 0)
	{
		this._attributesBuffer._setAttributes(this._index, (values instanceof Array)? new (this._arrayClass)(values) : <ArrayBufferView> values, offset);

		this._localArrayBuffer = null;
	}

	public get(count:number, offset:number = 0):ArrayBufferView
	{
		if (!this._localArrayBuffer)
			this._localArrayBuffer = this._attributesBuffer._getLocalArrayBuffer(this._index);

		var len:number = this._dimensions*this._size;
		return new (this._arrayClass)(this._localArrayBuffer, offset*len, count*this._dimensions);
	}

	public _internalClone(attributesBuffer:AttributesBuffer):AttributesView
	{
		return (this._cloneCache = new AttributesView(this._arrayClass, this._dimensions, attributesBuffer));
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
	public dispose()
	{
		if (!this._attributesBuffer)
			return;

		this._attributesBuffer._removeView(this);
		this._attributesBuffer = null;
		this._localArrayBuffer = null;
	}
}

export default AttributesView;