import View						= require("awayjs-core/lib/containers/View");
import HoverController			= require("awayjs-core/lib/controllers/HoverController");
import AlignmentMode			= require("awayjs-core/lib/core/base/AlignmentMode");
import Vector3D					= require("awayjs-core/lib/core/geom/Vector3D");
import AssetLibrary				= require("awayjs-core/lib/core/library/AssetLibrary");
import URLLoader				= require("awayjs-core/lib/core/net/URLLoader");
import URLRequest				= require("awayjs-core/lib/core/net/URLRequest");
import CSSDefaultRenderer		= require("awayjs-core/lib/core/render/CSSDefaultRenderer");
import Billboard				= require("awayjs-core/lib/entities/Billboard");
import LoaderEvent				= require("awayjs-core/lib/events/LoaderEvent");
import CSSMaterialBase			= require("awayjs-core/lib/materials/CSSMaterialBase");
import ImageTexture				= require("awayjs-core/lib/textures/ImageTexture");
import RequestAnimationFrame	= require("awayjs-core/lib/utils/RequestAnimationFrame");

class BillboardEntityTest
{
	private _view:View;
	private _timer:RequestAnimationFrame;
	private _time:number = 0;
	private _hoverControl:HoverController;

	private _move:boolean = false;
	private _lastPanAngle:number;
	private _lastTiltAngle:number;
	private _lastMouseX:number;
	private _lastMouseY:number;

	private _imageTexture:ImageTexture;
	private _bitmapMaterial:CSSMaterialBase;
	private _billboards:Array<Billboard> = new Array<Billboard>();

	constructor()
	{
		//load an image
		AssetLibrary.load(new URLRequest('assets/256x256.png'));

		//listen for a resource complete event
		AssetLibrary.addEventListener(LoaderEvent.RESOURCE_COMPLETE, (event:LoaderEvent) => this.onResourceComplete(event));
	}

	/**
	 * Listener for resource complete event
	 *
	 * @param event
	 */
	onResourceComplete(event:LoaderEvent)
	{
		//get the image texture
		this._imageTexture = <ImageTexture> event.assets[0];

		//create the view
		this._view = new View(new CSSDefaultRenderer());

		//create a bitmap material
		this._bitmapMaterial = new CSSMaterialBase(this._imageTexture);

		var billboard:Billboard;
		var numBillboards:number = 500;
		for (var i:number = 0; i < numBillboards; i++) {
			billboard = new Billboard(this._bitmapMaterial);
			billboard.width = 50;
			billboard.height = 50;
			billboard.pivot = new Vector3D(25, 25, 0);
			billboard.x = Math.cos(i*32*Math.PI/numBillboards)*400*Math.sin(i*Math.PI/numBillboards);
			billboard.y = Math.sin(i*32*Math.PI/numBillboards)*400*Math.sin(i*Math.PI/numBillboards);
			billboard.z = Math.cos(i*Math.PI/numBillboards)*400;
			//billboard.orientationMode = away.base.OrientationMode.CAMERA_PLANE;
			billboard.alignmentMode = AlignmentMode.PIVOT_POINT;
			this._billboards.push(billboard);
			//add billboard to the scene
			this._view.scene.addChild(billboard);
		}

		this._hoverControl = new HoverController(this._view.camera, null, 150, 10);

		document.onmousedown = (event:MouseEvent) => this.onMouseDownHandler(event);
		document.onmouseup = (event:MouseEvent) => this.onMouseUpHandler(event);
		document.onmousemove = (event:MouseEvent) => this.onMouseMove(event);

		window.onresize  = (event:UIEvent) => this.onResize(event);

		//trigger an initial resize for the view
		this.onResize(null);

		//setup the RAF for a render listener
		this._timer = new RequestAnimationFrame(this.render, this);
		this._timer.start();
	}

	private onResize(event:UIEvent)
	{
		this._view.x = 0;
		this._view.y = 0;
		this._view.width = window.innerWidth;
		this._view.height = window.innerHeight;
	}

	private render(dt:number)
	{
		this._time += dt;
		for (var i:number = 0; i < this._billboards.length; i++) {
			this._billboards[i].rotationZ = i + this._time/10;
			this._billboards[i].rotationX = i + this._time/10;
		}

		this._view.render();

	}

	private onMouseUpHandler(event:MouseEvent)
	{
		this._move = false;
	}

	private onMouseMove(event:MouseEvent)
	{
		if (this._move) {
			this._hoverControl.panAngle = 0.3*(event.clientX - this._lastMouseX) + this._lastPanAngle;
			this._hoverControl.tiltAngle = 0.3*(event.clientY - this._lastMouseY) + this._lastTiltAngle;
		}
	}

	private onMouseDownHandler(event:MouseEvent)
	{
		this._lastPanAngle = this._hoverControl.panAngle;
		this._lastTiltAngle = this._hoverControl.tiltAngle;
		this._lastMouseX = event.clientX;
		this._lastMouseY = event.clientY;
		this._move = true;
	}
}