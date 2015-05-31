import AttributesBuffer			= require("awayjs-core/lib/attributes/AttributesBuffer");
import AttributesView			= require("awayjs-core/lib/attributes/AttributesView");
import Byte4Attributes			= require("awayjs-core/lib/attributes/Byte4Attributes");
import Float3Attributes			= require("awayjs-core/lib/attributes/Float3Attributes");
import Float1Attributes			= require("awayjs-core/lib/attributes/Float1Attributes");
import Geometry					= require("awayjs-core/lib/data/Geometry");
import SubGeometryBase			= require("awayjs-core/lib/data/SubGeometryBase");
import TriangleSubGeometry		= require("awayjs-core/lib/data/TriangleSubGeometry");
import SubGeometryEvent			= require("awayjs-core/lib/events/SubGeometryEvent");
import SubGeometryUtils			= require("awayjs-core/lib/utils/SubGeometryUtils");

/**
 * @class LineSubGeometry
 */
class LineSubGeometry extends SubGeometryBase
{
	public static assetType:string = "[asset LineSubGeometry]";

	private _numVertices:number = 0;

	private _positions:AttributesView;
	private _thickness:Float1Attributes;
	private _colors:Byte4Attributes;

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return LineSubGeometry.assetType;
	}

	/**
	 *
	 */
	public get positions():AttributesView
	{
		return this._positions;
	}

	/**
	 *
	 */
	public get thickness():Float1Attributes
	{
		return this._thickness;
	}

	/**
	 *
	 */
	public get colors():Byte4Attributes
	{
		if (!this._colors)
			this.setColors(this._colors);

		return this._colors;
	}

	/**
	 * The total amount of vertices in the LineSubGeometry.
	 */
	public get numVertices():number
	{
		return this._numVertices;
	}

	/**
	 *
	 */
	constructor(concatenatedBuffer:AttributesBuffer = null)
	{
		super(concatenatedBuffer);
		
		this._positions = new AttributesView(Float32Array, 6, concatenatedBuffer);
	}

	public getBoundingPositions():Float32Array
	{
		return <Float32Array> this._positions.get(this._numVertices);
	}

	/**
	 *
	 */
	public setPositions(array:Array<number>, offset?:number);
	public setPositions(float32Array:Float32Array, offset?:number);
	public setPositions(attributesView:AttributesView, offset?:number);
	public setPositions(values:any, offset:number = 0)
	{
		if (values instanceof AttributesView) {
			this.notifyVerticesDispose(this._positions);
			this._positions = <AttributesView> values;
		} else if (values) {
			var i:number = 0;
			var j:number = 0;
			var index:number = 0;
			var positions:Float32Array = new Float32Array(values.length*4);
			var indices:Uint16Array = new Uint16Array(values.length);

			while (i < values.length) {
				if (index/6 & 1) {
					positions[index] = values[i + 3];
					positions[index + 1] = values[i + 4];
					positions[index + 2] = values[i + 5];
					positions[index + 3] = values[i];
					positions[index + 4] = values[i + 1];
					positions[index + 5] = values[i + 2];
				} else {
					positions[index] = values[i];
					positions[index + 1] = values[i + 1];
					positions[index + 2] = values[i + 2];
					positions[index + 3] = values[i + 3];
					positions[index + 4] = values[i + 4];
					positions[index + 5] = values[i + 5];
				}

				index += 6;

				if (++j == 4) {
					var o:number = index/6 - 4;
					indices.set([o, o + 1, o + 2, o + 3, o + 2, o + 1], i);
					j = 0;
					i += 6;
				}
			}
			
			this._positions.set(positions, offset*4);

			this.setIndices(indices, offset);
		} else {
			this.notifyVerticesDispose(this._positions);
			this._positions = new AttributesView(Float32Array, 6, this._concatenatedBuffer);
		}

		this._numVertices = this._positions.count;

		this.pInvalidateBounds();

		this.notifyVerticesUpdate(this._positions);

		this._verticesDirty[this._positions.id] = false;
	}

	/**
	 * Updates the thickness.
	 */
	public setThickness(array:Array<number>, offset?:number);
	public setThickness(float32Array:Float32Array, offset?:number);
	public setThickness(float1Attributes:Float1Attributes, offset?:number);
	public setThickness(values:any, offset:number = 0)
	{
		if (values instanceof Float1Attributes) {
			this._thickness = <Float1Attributes> values;
		} else if (values) {
			if (!this._thickness)
				this._thickness = new Float1Attributes(this._concatenatedBuffer);

			var i:number = 0;
			var j:number = 0;
			var index:number = 0;
			var thickness:Float32Array = new Float32Array(values.length*4);

			while (i < values.length) {
				thickness[index] = (Math.floor(0.5*index + 0.5) & 1)? -values[i] : values[i];

				if (++j == 4) {
					j = 0;
					i++;
				}

				index++;
			}

			this._thickness.set(thickness, offset*4);
		} else if (this._thickness) {
			this._thickness.dispose();
			this._thickness = null;
		}

		this.notifyVerticesUpdate(this._thickness);

		this._verticesDirty[this._thickness.id] = false;
	}

	/**
	 *
	 */
	public setColors(array:Array<number>, offset?:number);
	public setColors(float32Array:Float32Array, offset?:number);
	public setColors(uint8Array:Uint8Array, offset?:number);
	public setColors(byte4Attributes:Byte4Attributes, offset?:number);
	public setColors(values:any, offset:number = 0)
	{
		if (values) {
			if (values == this._colors)
				return;

			if (values instanceof Byte4Attributes) {
				this.notifyVerticesDispose(this._colors);
				this._colors = <Byte4Attributes> values;
			} else {
				if (!this._colors)
					this._colors = new Byte4Attributes(this._concatenatedBuffer);


				var i:number = 0;
				var j:number = 0;
				var index:number = 0;
				var colors:Uint8Array = new Uint8Array(values.length*4);

				while (i < values.length) {
					if (index/4 & 1) {
						colors[index] = values[i + 4];
						colors[index + 1] = values[i + 5];
						colors[index + 2] = values[i + 6];
						colors[index + 3] = values[i + 7];
					} else {
						colors[index] = values[i];
						colors[index + 1] = values[i + 1];
						colors[index + 2] = values[i + 2];
						colors[index + 3] = values[i + 3];
					}


					if (++j == 4) {
						j = 0;
						i += 8;
					}

					index += 4;
				}

				this._colors.set(values, offset*4);
			}
		} else {
			//auto-derive colors
			this._colors = SubGeometryUtils.generateColors(this._pIndices, this._colors, this._concatenatedBuffer, this._numVertices);
		}

		this.notifyVerticesUpdate(this._colors);

		this._verticesDirty[this._colors.id] = false;
	}

	/**
	 *
	 */
	public dispose()
	{
		super.dispose();

		this._positions = null;
		this._thickness = null;
		this._colors = null;
	}

	/**
	 * Clones the current object
	 * @return An exact duplicate of the current object.
	 */
	public clone():LineSubGeometry
	{
		var clone:LineSubGeometry = new LineSubGeometry(this._concatenatedBuffer? this._concatenatedBuffer.clone() : null);

		clone.setIndices(this._pIndices.clone());

		clone.setPositions(this._positions.clone());
		clone.setThickness(this._thickness.clone());
		clone.setColors(this._colors.clone());

		return clone;
	}
}

export = LineSubGeometry;