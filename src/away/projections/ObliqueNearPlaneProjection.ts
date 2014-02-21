///<reference path="../_definitions.ts" />

module away.projections
{
	export class ObliqueNearPlaneProjection extends ProjectionBase
	{

		private _baseProjection:ProjectionBase;
		private _plane:away.geom.Plane3D;
		private _onProjectionMatrixChangedDelegate:Function;

		constructor(baseProjection:ProjectionBase, plane:away.geom.Plane3D)
		{
			super();
			this.baseProjection = baseProjection;
			this.plane = plane;

			this._onProjectionMatrixChangedDelegate = away.utils.Delegate.create(this, this.onProjectionMatrixChanged);
		}

		//@override
		public get frustumCorners():number[]
		{
			return this._baseProjection.frustumCorners;
		}

		//@override
		public get near():number
		{
			return this._baseProjection.near;
		}

		//@override
		public set near(value:number)
		{
			this._baseProjection.near = value;
		}

		//@override
		public get far():number
		{
			return this._baseProjection.far;
		}

		//@override
		public set far(value:number)
		{
			this._baseProjection.far = value;
		}

		//@override
		public get iAspectRatio():number
		{
			return this._baseProjection.iAspectRatio;
		}

		//@override
		public set iAspectRatio(value:number)
		{
			this._baseProjection.iAspectRatio = value;
		}

		public get plane():away.geom.Plane3D
		{
			return this._plane;
		}

		public set plane(value:away.geom.Plane3D)
		{
			this._plane = value;
			this.pInvalidateMatrix();
		}

		public set baseProjection(value:ProjectionBase)
		{
			if (this._baseProjection) {
				this._baseProjection.removeEventListener(away.events.ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
			}
			this._baseProjection = value;

			if (this._baseProjection) {
				this._baseProjection.addEventListener(away.events.ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
			}
			this.pInvalidateMatrix();
		}

		private onProjectionMatrixChanged(event:away.events.ProjectionEvent)
		{
			this.pInvalidateMatrix();
		}

		//@override
		public pUpdateMatrix()
		{
			this._pMatrix.copyFrom(this._baseProjection.matrix);

			var cx:number = this._plane.a;
			var cy:number = this._plane.b;
			var cz:number = this._plane.c;
			var cw:number = -this._plane.d + .05;
			var signX:number = cx >= 0? 1 : -1;
			var signY:number = cy >= 0? 1 : -1;
			var p:away.geom.Vector3D = new away.geom.Vector3D(signX, signY, 1, 1);
			var inverse:away.geom.Matrix3D = this._pMatrix.clone();
			inverse.invert();
			var q:away.geom.Vector3D = inverse.transformVector(p);
			this._pMatrix.copyRowTo(3, p);
			var a:number = (q.x*p.x + q.y*p.y + q.z*p.z + q.w*p.w)/(cx*q.x + cy*q.y + cz*q.z + cw*q.w);
			this._pMatrix.copyRowFrom(2, new away.geom.Vector3D(cx*a, cy*a, cz*a, cw*a));
		}
	}
}