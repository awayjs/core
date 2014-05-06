///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	/**
	 * @class away.base.TriangleSubGeometry
	 */
	export class LineSubGeometry extends SubGeometryBase
	{
		public static VERTEX_DATA:string = "vertices";
		public static START_POSITION_DATA:string = "startPositions";
		public static END_POSITION_DATA:string = "endPositions";
		public static THICKNESS_DATA:string = "thickness";
		public static COLOR_DATA:string = "colors";

		//TODO - move these to StageGL
		public static POSITION_FORMAT:string = "float3";
		public static COLOR_FORMAT:string = "float4";
		public static THICKNESS_FORMAT:string = "float1";

		private _positionsDirty:boolean = true;
		private _boundingPositionDirty = true;
		private _thicknessDirty:boolean = true;
		private _colorsDirty:boolean = true;

		private _startPositions:Array<number>;
		private _endPositions:Array<number>;
		private _boundingPositions:Array<number>
		private _thickness:Array<number>;
		private _startColors:Array<number>;
		private _endColors:Array<number>;

		private _numSegments:number;

		private _positionsUpdated:away.events.SubGeometryEvent;
		private _thicknessUpdated:away.events.SubGeometryEvent;
		private _colorUpdated:away.events.SubGeometryEvent;

		public _pUpdateStrideOffset()
		{
			this._pOffset[LineSubGeometry.VERTEX_DATA] = 0;

			var stride:number = 0;
			this._pOffset[LineSubGeometry.START_POSITION_DATA] = stride;
			stride += 3;

			this._pOffset[LineSubGeometry.END_POSITION_DATA] = stride;
			stride += 3;

			this._pOffset[LineSubGeometry.THICKNESS_DATA] = stride;
			stride += 1;

			this._pOffset[LineSubGeometry.COLOR_DATA] = stride;
			stride += 4;

			this._pStride[LineSubGeometry.VERTEX_DATA] = stride;
			this._pStride[LineSubGeometry.START_POSITION_DATA] = stride;
			this._pStride[LineSubGeometry.END_POSITION_DATA] = stride;
			this._pStride[LineSubGeometry.THICKNESS_DATA] = stride;
			this._pStride[LineSubGeometry.COLOR_DATA] = stride;

			var len:number = this._pNumVertices*stride;

			if (this._pVertices == null)
				this._pVertices = new Array<number>(len);
			else if (this._pVertices.length != len)
				this._pVertices.length = len;

			this._pStrideOffsetDirty = false;
		}

		/**
		 * 
		 */
		public get vertices():Array<number>
		{
			if (this._positionsDirty)
				this.updatePositions(this._startPositions, this._endPositions);

			if (this._thicknessDirty)
				this.updateThickness(this._thickness);

			if (this._colorsDirty)
				this.updateColors(this._startColors, this._endColors);

			return this._pVertices;
		}

		/**
		 *
		 */
		public get startPositions():Array<number>
		{
			if (this._positionsDirty)
				this.updatePositions(this._startPositions, this._endPositions);

			return this._startPositions;
		}

		/**
		 *
		 */
		public get endPositions():Array<number>
		{
			if (this._positionsDirty)
				this.updatePositions(this._startPositions, this._endPositions);

			return this._endPositions;
		}

		/**
		 *
		 */
		public get thickness():Array<number>
		{
			if (this._thicknessDirty)
				this.updateThickness(this._thickness);

			return this._thickness;
		}

		/**
		 *
		 */
		public get startColors():Array<number>
		{
			if (this._colorsDirty)
				this.updateColors(this._startColors, this._endColors);

			return this._startColors;
		}

		/**
		 *
		 */
		public get endColors():Array<number>
		{
			if (this._colorsDirty)
				this.updateColors(this._startColors, this._endColors);

			return this._endColors;
		}

		/**
		 * The total amount of segments in the TriangleSubGeometry.
		 */
		public get numSegments():number
		{
			return this._numSegments;
		}

		/**
		 *
		 */
		constructor()
		{
			super(true);

			this._pSubMeshClass = LineSubMesh;
		}

		public getBoundingPositions():Array<number>
		{
			if (this._boundingPositionDirty)
				this._boundingPositions = this.startPositions.concat(this.endPositions);

			return this._boundingPositions;
		}

		/**
		 *
		 */
		public updatePositions(startValues:Array<number>, endValues:Array<number>)
		{
			var i:number;
			var j:number;
			var values:Array<number>
			var index:number;
			var stride:number;
			var positions:Array<number>;
			var indices:Array<number>;

			this._startPositions = startValues;

			if (this._startPositions == null)
				this._startPositions = new Array<number>();

			this._endPositions = endValues;

			if (this._endPositions == null)
				this._endPositions = new Array<number>();

			this._boundingPositionDirty = true;

			this._numSegments = this._startPositions.length/3;

			this._pNumVertices = this._numSegments*4;

			var lenV:number = this._pNumVertices*this.getStride(LineSubGeometry.VERTEX_DATA);

			if (this._pVertices == null)
				this._pVertices = new Array<number>(lenV);
			else if (this._pVertices.length != lenV)
				this._pVertices.length = lenV;

			i = 0;
			j = 0;
			index = this.getOffset(LineSubGeometry.START_POSITION_DATA);
			stride = this.getStride(LineSubGeometry.START_POSITION_DATA);
			positions = this._pVertices;
			indices = new Array();

			while (i < startValues.length) {
				values = (index/stride & 1)? endValues : startValues;
				positions[index] = values[i];
				positions[index + 1] = values[i + 1];
				positions[index + 2] = values[i + 2];

				values = (index/stride & 1)? startValues : endValues;
				positions[index + 3] = values[i];
				positions[index + 4] = values[i + 1];
				positions[index + 5] = values[i + 2];

				if (++j == 4) {
					var o:number = index/stride - 3;
					indices.push(o, o + 1, o + 2, o + 3, o + 2, o + 1);
					j = 0;
					i += 3;
				}

				index += stride;
			}

			this.updateIndices(indices);

			this.pInvalidateBounds();

			this.notifyPositionsUpdate();

			this._positionsDirty = false;
		}

		/**
		 * Updates the thickness.
		 */
		public updateThickness(values:Array<number>)
		{
			var i:number;
			var j:number;
			var index:number;
			var offset:number;
			var stride:number;
			var thickness:Array<number>;

			this._thickness = values;

			if (values != null) {
				i = 0;
				j = 0;
				offset = this.getOffset(LineSubGeometry.THICKNESS_DATA);
				stride = this.getStride(LineSubGeometry.THICKNESS_DATA);
				thickness = this._pVertices;

				index = offset
				while (i < values.length) {
					thickness[index] = (Math.floor(0.5*(index - offset)/stride + 0.5) & 1)? -values[i] : values[i];

					if (++j == 4) {
						j = 0;
						i++;
					}
					index += stride;
				}
			}

			this.notifyThicknessUpdate();

			this._thicknessDirty = false;
		}

		/**
		 *
		 */
		public updateColors(startValues:Array<number>, endValues:Array<number>)
		{
			var i:number;
			var j:number;
			var values:Array<number>
			var index:number;
			var offset:number;
			var stride:number;
			var colors:Array<number>;

			this._startColors = startValues;

			this._endColors = endValues;

			//default to white
			if (this._startColors == null) {
				this._startColors = new Array(this._numSegments*4);

				i = 0;
				while (i < this._startColors.length)
					this._startColors[i++] = 1;
			}

			if (this._endColors == null) {
				this._endColors = new Array(this._numSegments*4);

				i = 0;
				while (i < this._endColors.length)
					this._endColors[i++] = 1;
			}

			i = 0;
			j = 0;
			offset = this.getOffset(LineSubGeometry.COLOR_DATA);
			stride = this.getStride(LineSubGeometry.COLOR_DATA);
			colors = this._pVertices;

			index = offset;

			while (i < this._startColors.length) {
				values = ((index - offset)/stride & 1)? this._endColors : this._startColors;
				colors[index] = values[i];
				colors[index + 1] = values[i + 1];
				colors[index + 2] = values[i + 2];
				colors[index + 3] = values[i + 3];

				if (++j == 4) {
					j = 0;
					i += 4;
				}

				index += stride;
			}

			this.notifyColorsUpdate();

			this._colorsDirty = false;
		}

		/**
		 *
		 */
		public dispose()
		{
			super.dispose();

			this._startPositions = null;
			this._endPositions = null;
			this._thickness = null;
			this._startColors = null;
			this._endColors = null;
		}

		/**
		 * @protected
		 */
		public pInvalidateBounds()
		{
			if (this.parentGeometry)
				this.parentGeometry.iInvalidateBounds(this);
		}

		/**
		 * The Geometry object that 'owns' this TriangleSubGeometry object.
		 *
		 * @private
		 */
		public parentGeometry:away.base.Geometry;

		/**
		 * Clones the current object
		 * @return An exact duplicate of the current object.
		 */
		public clone():LineSubGeometry
		{
			var clone:LineSubGeometry = new LineSubGeometry();
			clone.updateIndices(this._pIndices.concat());
			clone.updatePositions(this._startPositions.concat(), this._endPositions.concat());
			clone.updateThickness(this._thickness.concat());
			clone.updatePositions(this._startPositions.concat(), this._endPositions.concat());

			return clone;
		}

		public _pNotifyVerticesUpdate()
		{
			this._pStrideOffsetDirty = true;

			this.notifyPositionsUpdate();
			this.notifyThicknessUpdate();
			this.notifyColorsUpdate();
		}

		private notifyPositionsUpdate()
		{
			if (this._positionsDirty)
				return;

			this._positionsDirty = true;

			if (!this._positionsUpdated)
				this._positionsUpdated = new away.events.SubGeometryEvent(away.events.SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.POSITION_DATA);

			this.dispatchEvent(this._positionsUpdated);
		}

		private notifyThicknessUpdate()
		{
			if (this._thicknessDirty)
				return;

			this._thicknessDirty = true;

			if (!this._thicknessUpdated)
				this._thicknessUpdated = new away.events.SubGeometryEvent(away.events.SubGeometryEvent.VERTICES_UPDATED, LineSubGeometry.THICKNESS_DATA);

			this.dispatchEvent(this._thicknessUpdated);
		}

		private notifyColorsUpdate()
		{
			if (this._colorsDirty)
				return;

			this._colorsDirty = true;

			if (!this._colorUpdated)
				this._colorUpdated = new away.events.SubGeometryEvent(away.events.SubGeometryEvent.VERTICES_UPDATED, LineSubGeometry.COLOR_DATA);

			this.dispatchEvent(this._colorUpdated);
		}
	}
}
