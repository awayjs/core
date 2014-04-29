///<reference path="../../_definitions.ts"/>

module away.geom
{
	export class UVTransform
	{
		private _uvMatrix:away.geom.Matrix = new away.geom.Matrix();
		private _uvMatrixDirty:boolean;

		private _rotation:number = 0;
		private _scaleU:number = 1;
		private _scaleV:number = 1;
		private _offsetU:number = 0;
		private _offsetV:number = 0;

		/**
		 *
		 */
		public get offsetU():number
		{
			return this._offsetU;
		}

		public set offsetU(value:number)
		{
			if (value == this._offsetU)
				return;

			this._offsetU = value;
			this._uvMatrixDirty = true;
		}

		/**
		 *
		 */
		public get offsetV():number
		{
			return this._offsetV;
		}

		public set offsetV(value:number)
		{
			if (value == this._offsetV)
				return;

			this._offsetV = value;
			this._uvMatrixDirty = true;

		}

		/**
		 *
		 */
		public get rotation():number
		{
			return this._rotation;
		}

		public set rotation(value:number)
		{
			if (value == this._rotation)
				return;

			this._rotation = value;

			this._uvMatrixDirty = true;
		}

		/**
		 *
		 */
		public get scaleU():number
		{
			return this._scaleU;
		}

		public set scaleU(value:number)
		{
			if (value == this._scaleU)
				return;

			this._scaleU = value;

			this._uvMatrixDirty = true;
		}

		/**
		 *
		 */
		public get scaleV():number
		{
			return this._scaleV;
		}

		public set scaleV(value:number)
		{
			if (value == this._scaleV)
				return;

			this._scaleV = value;

			this._uvMatrixDirty = true;
		}

		/**
		 *
		 */
		public get matrix():away.geom.Matrix
		{
			if (this._uvMatrixDirty)
				this.updateUVMatrix();

			return this._uvMatrix;
		}

		constructor()
		{
		}


		/**
		 * @private
		 */
		private updateUVMatrix()
		{
			this._uvMatrix.identity();

			if (this._rotation != 0)
				this._uvMatrix.rotate(this._rotation);

			if (this._scaleU != 1 || this._scaleV != 1)
				this._uvMatrix.scale(this._scaleU, this._scaleV);

			this._uvMatrix.translate(this._offsetU, this._offsetV);

			this._uvMatrixDirty = false;
		}
	}
}
