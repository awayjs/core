import {AttributesView}			from "../attributes/AttributesView";
import {AssetBase}				from "../library/AssetBase";

export class AttributesBuffer extends AssetBase
{
	public static assetType:string = "[assets AttributesBuffer]";
	
	private _count:number = 0;
	private _stride:number = 0;
	private _newStride:number = 0;

	private _buffer:ArrayBuffer;
	private _bufferView:Uint8Array;
	private _contentDirty:boolean;
	private _lengthDirty:boolean;
	private _viewVOs:Array<ViewVO> = new Array<ViewVO>();


	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return AttributesBuffer.assetType;
	}

	public get stride():number
	{
		if (this._lengthDirty)
			this._updateLength();

		return this._stride;
	}

	public set stride(value:number)
	{
		if (this._newStride == value)
			return;

		this._newStride = value;

		this.resize();
	}
	
	public get count():number
	{
		return this._count;
	}
	
	public set count(value:number)
	{
		if (this._count == value)
			return;
		
		this._count = value;
		
		this.resize();
	}


	public get buffer():ArrayBuffer
	{
		if (this._lengthDirty)
			this._updateLength();

		this._contentDirty = false;

		return this._buffer;
	}


	public get bufferView():Uint8Array
	{
		if (this._lengthDirty)
			this._updateLength();

		this._contentDirty = false;

		return this._bufferView;
	}

	public set bufferView(value:Uint8Array)
	{
		this._bufferView = value;
		this._buffer = this._bufferView.buffer;
	}

	public get length():number
	{
		return this._count*this.stride;
	}
	
	/**
	 *
	 */
	constructor(stride:number = 0, count:number = 0)
	{
		super();

		this._stride = this._newStride = stride;
		this._count = count;

		this._buffer = new ArrayBuffer(this._stride*this._count);
		this._bufferView = new Uint8Array(this._buffer, 0, this._buffer.byteLength);
	}

	/**
	 *
	 */
	public invalidate():void
	{
		if (this._contentDirty)
			return;

		super.invalidate();

		this._contentDirty = true;
	}

	/**
	 *
	 * @private
	 */
	public resize():void
	{
		if (this._lengthDirty)
			return;

		this.clear();

		this._lengthDirty = true;

		//dispose buffer if stride is 0
		if (!this._newStride) {
			this._buffer = null;
			this._bufferView = null;
		}
	}

	public clone():AttributesBuffer
	{
		var attributesBuffer:AttributesBuffer = new AttributesBuffer(this._stride, this._count);
		attributesBuffer.bufferView.set(this.bufferView);

		var len:number = this._viewVOs.length;
		for (var i:number = 0; i < len; i++)
			this._viewVOs[i].view._internalClone(attributesBuffer);

		return attributesBuffer;
	}

	public getView(index:number):AttributesView
	{
		if (index < this._viewVOs.length)
			return this._viewVOs[index].view;

		return null;
	}

	public _setAttributes(viewIndex:number, arrayBufferView:ArrayBufferView, offset:number = 0):void
	{
		var array:Uint8Array = (arrayBufferView instanceof Uint8Array)? <Uint8Array> arrayBufferView : new Uint8Array(arrayBufferView.buffer);

		var viewVO:ViewVO = this._viewVOs[viewIndex];
		var vLength:number = viewVO.length;
		var vOffset:number = viewVO.offset;
		var vCount:number = array.length/vLength;

		//make sure there is enough space in the buffer
		if (this.count < vCount + offset)
			this.count = vCount + offset;

		if (this._lengthDirty)
			this._updateLength();

		//fast path for separate buffers
		if (this._viewVOs.length == 1) {
			this._bufferView.set(array);
		} else {
			for (var i:number = 0; i < vCount; i++)
				this._bufferView.set(array.subarray(i*vLength, (i+1)*vLength), (i+offset)*this._stride + vOffset);
		}

		this.invalidate();
	}

	public _addView(view:AttributesView):void
	{
		var viewVO:ViewVO = new ViewVO(view);
		var len:number = this._viewVOs.length;

		viewVO.offset = len? this._viewVOs[len - 1].offset + this._viewVOs[len - 1].length : 0;

		this._viewVOs.push(viewVO);

		if (this._newStride < viewVO.offset + viewVO.length) {
			this._newStride = viewVO.offset + viewVO.length;
			this.resize();
		}

		view._index = len;
	}

	public _removeView(view:AttributesView):void
	{
		var viewIndex:number = view._index;
		var viewVO:ViewVO = this._viewVOs.splice(viewIndex, 1)[0];
		var len:number = this._viewVOs.length;

		viewVO.dispose();

		for (var i:number = viewIndex; i < len; i++) {
			viewVO = this._viewVOs[i];
			viewVO.offset = i? this._viewVOs[i - 1].offset + this._viewVOs[i - 1].length : 0;
			viewVO.view._index = i;
		}

		this._newStride = viewVO.offset + viewVO.length;

		this.resize();
	}

	public _getOffset(viewIndex:number):number
	{
		return this._viewVOs[viewIndex].offset;
	}

	public _updateLength():void
	{
		this._lengthDirty = false;

		var i:number;
		var j:number;
		var len:number = this._viewVOs.length;

		var newLength:number = this._newStride*this._count;

		if (!this._buffer || this._buffer.byteLength != newLength) {
			var newBuffer:ArrayBuffer = new ArrayBuffer(newLength);
			var newView:Uint8Array = new Uint8Array(newBuffer, 0, newBuffer.byteLength);
			var viewVO:ViewVO;
			var vLength:number;
			var vOffset:number;
			var vOldOffset:number;

			if (this._stride != this._newStride) {
				for (i = 0; i < len; i++) {
					viewVO = this._viewVOs[i];
					vLength = viewVO.length;
					vOffset = viewVO.offset;
					vOldOffset = viewVO.oldOffset;
					for (j = 0; j < this._count; j++)
						if (vOldOffset != null)
							newView.set(new Uint8Array(this._buffer, j*this._stride + vOldOffset, vLength), j*this._newStride + vOffset);

					viewVO.oldOffset = viewVO.offset;
				}

				this._stride = this._newStride;
			} else {
				newView.set(new Uint8Array(this._buffer, 0, Math.min(newLength, this._buffer.byteLength))); //TODO: bypass quantisation of bytearray on instantiation
			}

			this._buffer = newBuffer;
			this._bufferView = newView;
		}
	}
}

class ViewVO
{
	public view:AttributesView;

	public length;

	public offset;

	public oldOffset;

	constructor(view:AttributesView)
	{
		this.view = view;
		this.length = view.size*view.dimensions;
	}

	public dispose():void
	{
		this.view = null;
	}

	public clone():ViewVO
	{
		return new ViewVO(this.view);
	}
}