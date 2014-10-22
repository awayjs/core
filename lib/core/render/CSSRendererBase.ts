import LineSubMesh					= require("awayjs-core/lib/core/base/LineSubMesh");
import TriangleSubMesh				= require("awayjs-core/lib/core/base/TriangleSubMesh");
import Point						= require("awayjs-core/lib/core/geom/Point");
import Rectangle					= require("awayjs-core/lib/core/geom/Rectangle");
import Vector3D						= require("awayjs-core/lib/core/geom/Vector3D");
import CSSBillboardRenderable		= require("awayjs-core/lib/core/pool/CSSBillboardRenderable");
import CSSLineSegmentRenderable		= require("awayjs-core/lib/core/pool/CSSLineSegmentRenderable");
import CSSRenderableBase			= require("awayjs-core/lib/core/pool/CSSRenderableBase");
import EntityListItem				= require("awayjs-core/lib/core/pool/EntityListItem");
import RenderablePool				= require("awayjs-core/lib/core/pool/RenderablePool");
import IRenderer					= require("awayjs-core/lib/core/render/IRenderer");
import IEntitySorter				= require("awayjs-core/lib/core/sort/IEntitySorter");
import CSSEntityCollector			= require("awayjs-core/lib/core/traverse/CSSEntityCollector");
import EntityCollector				= require("awayjs-core/lib/core/traverse/EntityCollector");
import ICollector					= require("awayjs-core/lib/core/traverse/ICollector");
import Billboard					= require("awayjs-core/lib/entities/Billboard");
import Camera						= require("awayjs-core/lib/entities/Camera");
import IEntity						= require("awayjs-core/lib/entities/IEntity");
import Skybox						= require("awayjs-core/lib/entities/Skybox");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import EventDispatcher				= require("awayjs-core/lib/events/EventDispatcher");
import RendererEvent				= require("awayjs-core/lib/events/RendererEvent");
import CSSMaterialBase				= require("awayjs-core/lib/materials/CSSMaterialBase");
import TextureProxyBase				= require("awayjs-core/lib/textures/TextureProxyBase");

/**
 * RendererBase forms an abstract base class for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.RendererBase
 */
class CSSRendererBase extends EventDispatcher
{
	private _billboardRenderablePool:RenderablePool;
	private _lineSegmentRenderablePool:RenderablePool;

	public _pCamera:Camera;
	public _iEntryPoint:Vector3D;
	public _pCameraForward:Vector3D;

	private _backgroundR:number = 0;
	private _backgroundG:number = 0;
	private _backgroundB:number = 0;
	private _backgroundAlpha:number = 1;
	private _shareContext:boolean = false;

	public _pBackBufferInvalid:boolean = true;
	public _depthTextureInvalid:boolean = true;

	public _renderableHead:CSSRenderableBase;

	public _width:number;
	public _height:number;

	private _viewPort:Rectangle = new Rectangle();
	private _viewportDirty:boolean;
	private _scissorRect:Rectangle = new Rectangle();
	private _scissorDirty:boolean;

	private _localPos:Point = new Point();
	private _globalPos:Point = new Point();

	private _scissorUpdated:RendererEvent;
	private _viewPortUpdated:RendererEvent;

	/**
	 * A viewPort rectangle equivalent of the StageGL size and position.
	 */
	public get viewPort():Rectangle
	{
		return this._viewPort;
	}

	/**
	 * A scissor rectangle equivalent of the view size and position.
	 */
	public get scissorRect():Rectangle
	{
		return this._scissorRect;
	}

	/**
	 *
	 */
	public get x():number
	{
		return this._localPos.x;
	}

	public set x(value:number)
	{
		if (this.x == value)
			return;

		this.updateGlobalPos();
	}

	/**
	 *
	 */
	public get y():number
	{
		return this._localPos.y;
	}

	public set y(value:number)
	{
		if (this.y == value)
			return;

		this._globalPos.y = this._localPos.y = value;

		this.updateGlobalPos();
	}

	/**
	 *
	 */
	public get width():number
	{
		return this._width;
	}

	public set width(value:number)
	{
		if (this._width == value)
			return;

		this._width = value;
		this._scissorRect.width = value;
		this._viewPort.width = value;

		this._pBackBufferInvalid = true;
		this._depthTextureInvalid = true;

		this.notifyViewportUpdate();
		this.notifyScissorUpdate();
	}

	/**
	 *
	 */
	public get height():number
	{
		return this._height;
	}

	public set height(value:number)
	{
		if (this._height == value)
			return;

		this._height = value;
		this._scissorRect.height = value;
		this._viewPort.height = value;

		this._pBackBufferInvalid = true;
		this._depthTextureInvalid = true;

		this.notifyViewportUpdate();
		this.notifyScissorUpdate();
	}

	/**
	 *
	 */
	public renderableSorter:IEntitySorter;

	/**
	 * Creates a new RendererBase object.
	 */
	constructor(renderToTexture:boolean = false, forceSoftware:boolean = false, profile:string = "baseline")
	{
		super();

		this._billboardRenderablePool = RenderablePool.getPool(CSSBillboardRenderable);
		this._lineSegmentRenderablePool = RenderablePool.getPool(CSSLineSegmentRenderable);

		this._viewPort = new Rectangle();

		if (this._width == 0)
			this.width = window.innerWidth;

		if (this._height == 0)
			this.height = window.innerHeight;
	}

	/**
	 * The background color's red component, used when clearing.
	 *
	 * @private
	 */
	public get _iBackgroundR():number
	{
		return this._backgroundR;
	}

	public set _iBackgroundR(value:number)
	{
		if (this._backgroundR == value)
			return;

		this._backgroundR = value;

		this._pBackBufferInvalid = true;
	}

	/**
	 * The background color's green component, used when clearing.
	 *
	 * @private
	 */
	public get _iBackgroundG():number
	{
		return this._backgroundG;
	}

	public set _iBackgroundG(value:number)
	{
		if (this._backgroundG == value)
			return;

		this._backgroundG = value;

		this._pBackBufferInvalid = true;
	}

	/**
	 * The background color's blue component, used when clearing.
	 *
	 * @private
	 */
	public get _iBackgroundB():number
	{
		return this._backgroundB;
	}

	public set _iBackgroundB(value:number)
	{
		if (this._backgroundB == value)
			return;

		this._backgroundB = value;

		this._pBackBufferInvalid = true;
	}

	public get shareContext():boolean
	{
		return this._shareContext;
	}

	public set shareContext(value:boolean)
	{
		if (this._shareContext == value)
			return;

		this._shareContext = value;

		this.updateGlobalPos();
	}

	/**
	 * Disposes the resources used by the RendererBase.
	 */
	public dispose()
	{
		/*
		 if (_backgroundImageRenderer) {
		 _backgroundImageRenderer.dispose();
		 _backgroundImageRenderer = null;
		 }
		 */
	}

	public render(entityCollector:ICollector)
	{
		this._viewportDirty = false;
		this._scissorDirty = false;
	}

	/**
	 * Renders the potentially visible geometry to the back buffer or texture.
	 * @param entityCollector The EntityCollector object containing the potentially visible geometry.
	 * @param scissorRect
	 */
	public _iRender(entityCollector:EntityCollector, target:TextureProxyBase = null, scissorRect:Rectangle = null, surfaceSelector:number = 0)
	{
		if (!entityCollector.entityHead)
			return;

		this.pExecuteRender(entityCollector, scissorRect);
	}

	public _iRenderCascades(entityCollector:ICollector, target:TextureProxyBase, numCascades:number, scissorRects:Array<Rectangle>, cameras:Array<Camera>)
	{

	}
	public pCollectRenderables(entityCollector:ICollector)
	{
		//reset head values
		this._renderableHead = null;

		//grab entity head
		var item:EntityListItem = entityCollector.entityHead;

		//set temp values for entry point and camera forward vector
		this._pCamera = entityCollector.camera;
		this._iEntryPoint = this._pCamera.scenePosition;
		this._pCameraForward = this._pCamera.transform.forwardVector;

		//iterate through all entities
		while (item) {
			item.entity._iCollectRenderables(this);
			item = item.next;
		}
	}

	/**
	 * Renders the potentially visible geometry to the back buffer or texture. Only executed if everything is set up.
	 * @param entityCollector The EntityCollector object containing the potentially visible geometry.
	 * @param scissorRect
	 */
	public pExecuteRender(entityCollector:CSSEntityCollector, scissorRect:Rectangle = null)
	{
		this.pCollectRenderables(entityCollector);

		this.pDraw(entityCollector);
	}

	/**
	 * Performs the actual drawing of dom objects to the target.
	 *
	 * @param entityCollector The EntityCollector object containing the potentially visible dom objects.
	 */
	public pDraw(entityCollector:CSSEntityCollector)
	{
		throw new AbstractMethodError();
	}

	public get _iBackgroundAlpha():number
	{
		return this._backgroundAlpha;
	}

	public set _iBackgroundAlpha(value:number)
	{
		if (this._backgroundAlpha == value)
			return;

		this._backgroundAlpha = value;

		this._pBackBufferInvalid = true;
	}

	/**
	 *
	 * @param billboard
	 */
	public applyBillboard(billboard:Billboard)
	{
		this._applyRenderable(<CSSRenderableBase> this._billboardRenderablePool.getItem(billboard));
	}

	/**
	 *
	 * @param lineSubMesh
	 */
	public applyLineSubMesh(lineSubMesh:LineSubMesh)
	{
		//this._applyRenderable(<CSSRenderableBase> this._billboardRenderablePool.getItem(lineSegment));
	}

	/**
	 *
	 * @param skybox
	 */
	public applySkybox(skybox:Skybox)
	{

	}

	/**
	 *
	 * @param triangleSubMesh
	 */
	public applyTriangleSubMesh(triangleSubMesh:TriangleSubMesh)
	{

	}

	/**
	 *
	 * @param renderable
	 * @private
	 */
	private _applyRenderable(renderable:CSSRenderableBase)
	{
		var material:CSSMaterialBase = <CSSMaterialBase> renderable.materialOwner.material;
		var entity:IEntity = renderable.sourceEntity;
		var position:Vector3D = entity.scenePosition;

		if (material) {
			//set ids for faster referencing
			renderable.materialId = material._iMaterialId;
//				renderable.renderOrderId = material._iRenderOrderId;
			renderable.cascaded = false;

			// project onto camera's z-axis
			position = this._iEntryPoint.subtract(position);
			renderable.zIndex = entity.zOffset - position.dotProduct(this._pCameraForward);

			//store reference to scene transform
			renderable.renderSceneTransform = renderable.sourceEntity.getRenderSceneTransform(this._pCamera);

			//store reference to next item in list
			renderable.next = this._renderableHead;
			this._renderableHead = renderable;
		}
	}


	/**
	 * @private
	 */
	private notifyScissorUpdate()
	{
		if (this._scissorDirty)
			return;

		this._scissorDirty = true;

		if (!this._scissorUpdated)
			this._scissorUpdated = new RendererEvent(RendererEvent.SCISSOR_UPDATED);

		this.dispatchEvent(this._scissorUpdated);
	}


	/**
	 * @private
	 */
	private notifyViewportUpdate()
	{
		if (this._viewportDirty)
			return;

		this._viewportDirty = true;

		if (!this._viewPortUpdated)
			this._viewPortUpdated = new RendererEvent(RendererEvent.VIEWPORT_UPDATED);

		this.dispatchEvent(this._viewPortUpdated);
	}

	/**
	 *
	 */
	public updateGlobalPos()
	{
		this._viewPort.x = this._globalPos.x;
		this._viewPort.y = this._globalPos.y;

		this.notifyViewportUpdate();
		this.notifyScissorUpdate();
	}


	public _iCreateEntityCollector():ICollector
	{
		throw new AbstractMethodError();
	}
}

export = CSSRendererBase;