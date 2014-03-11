///<reference path="../_definitions.ts" />

module away.projections
{
	export class PerspectiveProjection extends ProjectionBase
	{
		private _fieldOfView:number;
		private _focalLength:number;
		private _hFieldOfView:number;
		private _hFocalLength:number;
		private _preserveAspectRatio:boolean = true;
		private _origin:away.geom.Point = new away.geom.Point(0.5, 0.5);

		constructor(fieldOfView:number = 60, coordinateSystem:string = "leftHanded")
		{
			super(coordinateSystem);
			this.fieldOfView = fieldOfView;
		}

		/**
		 *
		 */
		public get preserveAspectRatio():boolean
		{
			return this._preserveAspectRatio;
		}

		public set preserveAspectRatio(value:boolean)
		{
			if (this._preserveAspectRatio == value)
				return;

			this._preserveAspectRatio = value;

			if (this._preserveAspectRatio)
				this.hFocalLength = this._focalLength/this._pAspectRatio;
		}

		/**
		 *
		 */
		public get fieldOfView():number
		{
			return this._fieldOfView;
		}

		public set fieldOfView(value:number)
		{
			if (this._fieldOfView == value)
				return;

			this._fieldOfView = value;

			this._focalLength = 1/Math.tan(this._fieldOfView*Math.PI/360);

			this.pInvalidateMatrix();
		}

		/**
		 *
		 */
		public get focalLength():number
		{
			return this._focalLength;
		}

		public set focalLength(value:number)
		{
			if (this._focalLength == value)
				return;

			this._focalLength = value;

			this._fieldOfView = Math.atan(1/this._focalLength)*360/Math.PI;

			this.pInvalidateMatrix();
		}

		/**
		 *
		 */
		public get hFieldOfView():number
		{
			return this._hFieldOfView;
		}

		public set hFieldOfView(value:number)
		{
			if (this._hFieldOfView == value)
				return;

			this._hFieldOfView = value;

			this._hFocalLength = 1/Math.tan(this._hFieldOfView*Math.PI/360);

			this.pInvalidateMatrix();
		}

		/**
		 *
		 */
		public get hFocalLength():number
		{
			return this._hFocalLength;
		}

		public set hFocalLength(value:number)
		{
			if (this._hFocalLength == value)
				return;

			this._hFocalLength = value;

			this._hFieldOfView = Math.atan(1/this._hFocalLength)*360/Math.PI;

			this.pInvalidateMatrix();
		}

		public get origin():away.geom.Point
		{
			return this._origin;
		}

		public set origin(value:away.geom.Point)
		{
			if (this._origin == value)
				return;

			this._origin = value;
		}



		//@override
		public unproject(nX:number, nY:number, sZ:number):away.geom.Vector3D
		{
			var v:away.geom.Vector3D = new away.geom.Vector3D(nX, -nY, sZ, 1.0);

			v.x *= sZ;
			v.y *= sZ;

			v = this.unprojectionMatrix.transformVector(v);

			//z is unaffected by transform
			v.z = sZ;

			return v;
		}

		//@override
		public clone():ProjectionBase
		{
			var clone:PerspectiveProjection = new PerspectiveProjection(this._fieldOfView);
			clone._pNear = this._pNear;
			clone._pFar = this._pFar;
			clone._pAspectRatio = this._pAspectRatio;
			clone._pCoordinateSystem = this._pCoordinateSystem;
			return clone;
		}

		//@override
		public pUpdateMatrix()
		{
			var raw:number[] = [];

			if (this._preserveAspectRatio)
				this.hFocalLength = this._focalLength/this._pAspectRatio;

			var tanMinX = -(this._origin.x + 0.5)/this._hFocalLength;
			var tanMaxX = (1.5 - this._origin.x)/this._hFocalLength;
			var tanMinY = -(this._origin.y + 0.5)/this._focalLength;
			var tanMaxY = (1.5 - this._origin.y)/this._focalLength;

			var minLengthFracX:number = -tanMinX/(tanMaxX - tanMinX);
			var minLengthFracY:number = -tanMinY/(tanMaxY - tanMinY);

			var left:number;
			var right:number;
			var top:number;
			var bottom:number;

			// assume scissored frustum
			var center:number = -tanMinX*(this._pScissorRect.x + this._pScissorRect.width*minLengthFracX)/(this._pScissorRect.width*minLengthFracX);
			var middle:number = tanMinY*(this._pScissorRect.y + this._pScissorRect.height*minLengthFracY)/(this._pScissorRect.height*minLengthFracY);

			left = center - (tanMaxX - tanMinX)*(this._pViewPort.width/this._pScissorRect.width);
			right = center;
			top = middle;
			bottom = middle + (tanMaxY - tanMinY)*(this._pViewPort.height/this._pScissorRect.height);

			raw[0] = 2/(right - left);
			raw[5] = 2/(bottom - top);
			raw[8] = (right + left)/(right - left);
			raw[9] = (bottom + top)/(bottom - top);
			raw[10] = (this._pFar + this._pNear)/(this._pFar - this._pNear);
			raw[11] = 1;
			raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[12] = raw[13] = raw[15] = 0;
			raw[14] = -2*this._pFar*this._pNear/(this._pFar - this._pNear);

			if (this._pCoordinateSystem == CoordinateSystem.RIGHT_HANDED)
				raw[5] = -raw[5];

			this._pMatrix.copyRawDataFrom(raw);

			this._pFrustumCorners[0] = this._pFrustumCorners[9] = this._pNear*left;
			this._pFrustumCorners[3] = this._pFrustumCorners[6] = this._pNear*right;
			this._pFrustumCorners[1] = this._pFrustumCorners[4] = this._pNear*top;
			this._pFrustumCorners[7] = this._pFrustumCorners[10] = this._pNear*bottom;

			this._pFrustumCorners[12] = this._pFrustumCorners[21] = this._pFar*left;
			this._pFrustumCorners[15] = this._pFrustumCorners[18] = this._pFar*right;
			this._pFrustumCorners[13] = this._pFrustumCorners[16] = this._pFar*top;
			this._pFrustumCorners[19] = this._pFrustumCorners[22] = this._pFar*bottom;

			this._pFrustumCorners[2] = this._pFrustumCorners[5] = this._pFrustumCorners[8] = this._pFrustumCorners[11] = this._pNear;
			this._pFrustumCorners[14] = this._pFrustumCorners[17] = this._pFrustumCorners[20] = this._pFrustumCorners[23] = this._pFar;

			this._pMatrixInvalid = false;


		}
	}
}