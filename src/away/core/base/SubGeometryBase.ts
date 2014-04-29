///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.base
{
	/**
	 * @class away.base.TriangleSubGeometry
	 */
	export class SubGeometryBase extends away.library.NamedAssetBase
	{
		public _pStrideOffsetDirty:boolean = true;

		public _pIndices:Array<number> /*uint*/;
		public _pVertices:Array<number>;

		private _numIndices:number;
		private _numTriangles:number;
		public _pNumVertices:number;

		public _pConcatenateArrays:boolean = true;

		private _indicesUpdated:away.events.SubGeometryEvent;

		public _pStride:Object = new Object();
		public _pOffset:Object = new Object();

		public _pUpdateStrideOffset()
		{
			throw new away.errors.AbstractMethodError();
		}

		public _pSubMeshClass:ISubMeshClass;

		public get subMeshClass():ISubMeshClass
		{
			return this._pSubMeshClass;
		}

		/**
		 *
		 */
		public get concatenateArrays():boolean
		{
			return this._pConcatenateArrays;
		}

		public set concatenateArrays(value:boolean)
		{
			if (this._pConcatenateArrays == value)
				return;

			this._pConcatenateArrays = value;

			this._pStrideOffsetDirty = true;

			if (value)
				this._pNotifyVerticesUpdate();
		}

		/**
		 * The raw index data that define the faces.
		 */
		public get indices():Array<number>
		{
			return this._pIndices;
		}

		/**
		 * 
		 */
		public get vertices():Array<number>
		{
			this.updateVertices();

			return this._pVertices;
		}

		/**
		 * The total amount of triangles in the TriangleSubGeometry.
		 */
		public get numTriangles():number
		{
			return this._numTriangles;
		}

		public get numVertices():number
		{
			return this._pNumVertices;
		}

		/**
		 *
		 */
		constructor(concatenatedArrays:boolean)
		{
			super();

			this._pConcatenateArrays = concatenatedArrays;
		}

		/**
		 *
		 */
		public getStride(dataType:string)
		{
			if (this._pStrideOffsetDirty)
				this._pUpdateStrideOffset();

			return this._pStride[dataType];
		}

		/**
		 *
		 */
		public getOffset(dataType:string)
		{
			if (this._pStrideOffsetDirty)
				this._pUpdateStrideOffset();

			return this._pOffset[dataType];
		}

		public updateVertices()
		{
			throw new away.errors.AbstractMethodError();
		}

		/**
		 *
		 */
		public dispose()
		{
			this._pIndices = null;
			this._pVertices = null;
		}

		/**
		 * Updates the face indices of the TriangleSubGeometry.
		 *
		 * @param indices The face indices to upload.
		 */
		public updateIndices(indices:Array<number>)
		{
			this._pIndices = indices;
			this._numIndices = indices.length;

			this._numTriangles = this._numIndices/3;

			this.notifyIndicesUpdate();
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
		public clone():SubGeometryBase
		{
			throw new away.errors.AbstractMethodError();
		}

		public applyTransformation(transform:away.geom.Matrix3D)
		{

		}

		/**
		 * Scales the geometry.
		 * @param scale The amount by which to scale.
		 */
		public scale(scale:number)
		{

		}

		public scaleUV(scaleU:number = 1, scaleV:number = 1)
		{

		}

		public getBoundingPositions():Array<number>
		{
			throw new away.errors.AbstractMethodError();
		}

		private notifyIndicesUpdate()
		{
			if (!this._indicesUpdated)
				this._indicesUpdated = new away.events.SubGeometryEvent(away.events.SubGeometryEvent.INDICES_UPDATED);

			this.dispatchEvent(this._indicesUpdated);
		}

		public _pNotifyVerticesUpdate()
		{
			throw new away.errors.AbstractMethodError();
		}
	}
}
