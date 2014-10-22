import Plane3D						= require("awayjs-core/lib/core/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/core/geom/Vector3D");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");
import IEntity						= require("awayjs-core/lib/entities/IEntity");

/**
 * @class away.partition.NodeBase
 */
class NodeBase
{
	private _boundsChildrenVisible:boolean;
	private _explicitBoundsVisible:boolean;
	private _implicitBoundsVisible:boolean;
	public _iParent:NodeBase;
	public _pChildNodes:Array<NodeBase>;
	public _pNumChildNodes:number = 0;
	public _pBoundsPrimitive:IEntity;

	public _iNumEntities:number = 0;
	public _iCollectionMark:number;// = 0;

	/**
	 *
	 */
	public get boundsVisible():boolean
	{
		return this._explicitBoundsVisible;
	}

	public set boundsVisible(value:boolean)
	{
		if (this._explicitBoundsVisible == value)
			return;

		this._explicitBoundsVisible = value;

		this._iUpdateImplicitBoundsVisible(this._iParent? this._iParent.boundsChildrenVisible : false);

	}

	public get boundsChildrenVisible():boolean
	{
		return this._boundsChildrenVisible;
	}

	public set boundsChildrenVisible(value:boolean)
	{
		if (this._boundsChildrenVisible == value)
			return;

		this._boundsChildrenVisible = value;

		for (var i:number = 0; i < this._pNumChildNodes; ++i)
			this._pChildNodes[i]._iUpdateImplicitBoundsVisible(this._boundsChildrenVisible);
	}

	/**
	 *
	 */
	public get parent():NodeBase
	{
		return this._iParent;
	}

	/**
	 *
	 * @protected
	 */
	public get _pNumEntities():number
	{
		return this._iNumEntities;
	}

	/**
	 *
	 */
	constructor()
	{
		this._pChildNodes = new Array<NodeBase>();
	}

	/**
	 *
	 * @param planes
	 * @param numPlanes
	 * @returns {boolean}
	 * @internal
	 */
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		return true;
	}

	/**
	 *
	 * @param rayPosition
	 * @param rayDirection
	 * @returns {boolean}
	 */
	public isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean
	{
		return true;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public isCastingShadow():boolean
	{
		return true;
	}

	/**
	 *
	 * @param entity
	 * @returns {away.partition.NodeBase}
	 */
	public findPartitionForEntity(entity:IEntity):NodeBase
	{
		return this;
	}

	/**
	 *
	 * @param traverser
	 */
	public acceptTraverser(traverser:ICollector)
	{
		if (this._pNumEntities == 0 && !this._implicitBoundsVisible)
			return;

		if (traverser.enterNode(this)) {
			var i:number = 0;

			while (i < this._pNumChildNodes)
				this._pChildNodes[i++].acceptTraverser(traverser);

			if (this._implicitBoundsVisible)
				this._pBoundsPrimitive.partitionNode.acceptTraverser(traverser);
		}
	}

	/**
	 *
	 * @protected
	 */
	public _pCreateBoundsPrimitive():IEntity
	{
		return null;
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iAddNode(node:NodeBase)
	{
		node._iParent = this;
		this._iNumEntities += node._pNumEntities;
		this._pChildNodes[ this._pNumChildNodes++ ] = node;

		node._iUpdateImplicitBoundsVisible(this.boundsChildrenVisible);

		var numEntities:number = node._pNumEntities;
		node = this;

		do {
			node._iNumEntities += numEntities;
		} while ((node = node._iParent) != null);
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iRemoveNode(node:NodeBase)
	{
		var index:number = this._pChildNodes.indexOf(node);
		this._pChildNodes[index] = this._pChildNodes[--this._pNumChildNodes];
		this._pChildNodes.pop();

		node._iUpdateImplicitBoundsVisible(false);

		var numEntities:number = node._pNumEntities;
		node = this;

		do {
			node._pNumEntities -= numEntities;
		} while ((node = node._iParent) != null);
	}

	private _iUpdateImplicitBoundsVisible(value:boolean)
	{
		if (this._implicitBoundsVisible == this._explicitBoundsVisible || value)
			return;

		this._implicitBoundsVisible = this._explicitBoundsVisible || value;

		this._iUpdateEntityBounds();

		for (var i:number = 0; i < this._pNumChildNodes; ++i)
			this._pChildNodes[i]._iUpdateImplicitBoundsVisible(this._boundsChildrenVisible);
	}

	/**
	 * @internal
	 */
	public _iIsBoundsVisible():boolean
	{
		return this._implicitBoundsVisible;
	}

//		public _pUpdateNumEntities(value:number)
//		{
//			var diff:number = value - this._pNumEntities;
//			var node:NodeBase = this;
//
//			do {
//				node._pNumEntities += diff;
//			} while ((node = node._iParent) != null);
//		}

	public _iUpdateEntityBounds()
	{
		if (this._pBoundsPrimitive) {
			this._pBoundsPrimitive.dispose();
			this._pBoundsPrimitive = null;
		}

		if (this._implicitBoundsVisible)
			this._pBoundsPrimitive = this._pCreateBoundsPrimitive();
	}
}

export = NodeBase;