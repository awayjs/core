///<reference path="../_definitions.ts" />

module away.projections
{
	export class ProjectionBase extends away.events.EventDispatcher implements IProjection
	{
		public _pMatrix:away.geom.Matrix3D = new away.geom.Matrix3D();
		public _pScissorRect:away.geom.Rectangle = new away.geom.Rectangle();
		public _pViewPort:away.geom.Rectangle = new away.geom.Rectangle();
		public _pNear:number = 20;
		public _pFar:number = 3000;
		public _pAspectRatio:number = 1;

		public _pMatrixInvalid:boolean = true;
		public _pFrustumCorners:number[] = [];
		public _pCoordinateSystem:string;

		private _unprojection:away.geom.Matrix3D;
		private _unprojectionInvalid:boolean = true;

		constructor(coordinateSystem:string = "leftHanded")
		{
			super();

			this.coordinateSystem = coordinateSystem;
		}

		/**
		 * The handedness of the coordinate system projection. The default is LEFT_HANDED.
		 */
		public get coordinateSystem():string
		{
			return this._pCoordinateSystem;
		}

		public set coordinateSystem(value:string)
		{
			if (this._pCoordinateSystem == value)
				return;

			this._pCoordinateSystem = value;

			this.pInvalidateMatrix();
		}

		public get frustumCorners():number[]
		{
			return this._pFrustumCorners;
		}

		public set frustumCorners(frustumCorners:number[])
		{
			this._pFrustumCorners = frustumCorners;
		}

		public get matrix():away.geom.Matrix3D
		{
			if (this._pMatrixInvalid) {
				this.pUpdateMatrix();
				this._pMatrixInvalid = false;
			}
			return this._pMatrix;
		}

		public set matrix(value:away.geom.Matrix3D)
		{
			this._pMatrix = value;
			this.pInvalidateMatrix();
		}

		public get near():number
		{
			return this._pNear;
		}

		public set near(value:number)
		{
			if (value == this._pNear) {
				return;
			}
			this._pNear = value;
			this.pInvalidateMatrix();
		}

		public get far():number
		{
			return this._pFar;
		}

		public set far(value:number)
		{
			if (value == this._pFar) {
				return;
			}
			this._pFar = value;
			this.pInvalidateMatrix();
		}

		public project(point3d:away.geom.Vector3D):away.geom.Vector3D
		{
			var v:away.geom.Vector3D = this.matrix.transformVector(point3d);
			v.x = v.x/v.w;
			v.y = -v.y/v.w;

			//z is unaffected by transform
			v.z = point3d.z;

			return v;
		}

		public get unprojectionMatrix():away.geom.Matrix3D
		{
			if (this._unprojectionInvalid) {
				if (!this._unprojection) {
					this._unprojection = new away.geom.Matrix3D();
				}
				this._unprojection.copyFrom(this.matrix);
				this._unprojection.invert();
				this._unprojectionInvalid = false;
			}
			return this._unprojection;
		}

		public unproject(nX:number, nY:number, sZ:number):away.geom.Vector3D
		{
			throw new away.errors.AbstractMethodError();
		}

		public clone():ProjectionBase
		{
			throw new away.errors.AbstractMethodError();
		}

		public get _iAspectRatio():number
		{
			return this._pAspectRatio;
		}

		public set _iAspectRatio(value:number)
		{
			if (this._pAspectRatio == value)
				return;

			this._pAspectRatio = value;

			this.pInvalidateMatrix();
		}

		public pInvalidateMatrix()
		{
			this._pMatrixInvalid = true;
			this._unprojectionInvalid = true;
			this.dispatchEvent(new away.events.ProjectionEvent(away.events.ProjectionEvent.MATRIX_CHANGED, this));
		}

		public pUpdateMatrix()
		{
			throw new away.errors.AbstractMethodError();
		}

		public _iUpdateScissorRect(x:number, y:number, width:number, height:number)
		{
			this._pScissorRect.x = x;
			this._pScissorRect.y = y;
			this._pScissorRect.width = width;
			this._pScissorRect.height = height;
			this.pInvalidateMatrix();
		}

		public _iUpdateViewport(x:number, y:number, width:number, height:number)
		{
			this._pViewPort.x = x;
			this._pViewPort.y = y;
			this._pViewPort.width = width;
			this._pViewPort.height = height;
			this.pInvalidateMatrix();
		}
	}
}