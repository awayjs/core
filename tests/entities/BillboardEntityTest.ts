///<reference path="../../build/awayjs.next.d.ts" />
//<reference path="../../src/awayjs.ts" />

module tests.entities
{
	import View						= away.containers.View;
	import Billboard				= away.entities.Billboard;
	import AssetLibrary				= away.library.AssetLibrary;
	import CSSMaterialBase			= away.materials.CSSMaterialBase;
	import ImageTexture				= away.textures.ImageTexture;
	import URLLoader				= away.net.URLLoader;
	import URLRequest				= away.net.URLRequest;
	import Delegate					= away.utils.Delegate;
	import RequestAnimationFrame	= away.utils.RequestAnimationFrame;

	export class BillboardEntityTest
	{
		private _view:View;
		private _timer:away.utils.RequestAnimationFrame;
		private _hoverControl:away.controllers.HoverController;

		private _move:boolean = false;
		private _lastPanAngle:number;
		private _lastTiltAngle:number;
		private _lastMouseX:number;
		private _lastMouseY:number;

		private _imageTexture:ImageTexture;
		private _bitmapMaterial:CSSMaterialBase;
		private _billboard1 :Billboard;
		private _billboard2 :Billboard;
		private _billboard3 :Billboard;
		private _billboard4 :Billboard;
		constructor()
		{
			//load an image
			AssetLibrary.load(new URLRequest('assets/1024x1024.png') );

			//listen for a resource complete event
			AssetLibrary.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE , Delegate.create(this, this.onResourceComplete));
		}

		/**
		 * Listener for resource complete event
		 *
		 * @param event
		 */
		onResourceComplete(event:away.events.LoaderEvent)
		{
			//get the image texture
			this._imageTexture = <ImageTexture> event.assets[0];

			//create the view
			this._view = new away.containers.View(new away.render.CSSDefaultRenderer());

			//create a bitmap material
			this._bitmapMaterial = new away.materials.CSSMaterialBase(this._imageTexture);

			//create a billboard entity
			this._billboard1 = new away.entities.Billboard(this._bitmapMaterial, 100, 100);
			this._billboard1.alignmentMode = away.base.AlignmentMode.PIVOT_POINT;
			this._billboard1.x = -100;
			this._billboard1.y = -100;

			//add billboard to the scene
			this._view.scene.addChild(this._billboard1);

			this._billboard2 = new away.entities.Billboard(this._bitmapMaterial, 100, 100);
			this._billboard2.alignmentMode = away.base.AlignmentMode.PIVOT_POINT;
			this._billboard2.x = 100;
			this._billboard2.y = -100;
			this._view.scene.addChild(this._billboard2);

			this._billboard3 = new away.entities.Billboard(this._bitmapMaterial, 100, 100);
			this._billboard3.alignmentMode = away.base.AlignmentMode.PIVOT_POINT;
			this._billboard3.x = 100;
			this._billboard3.y = 100;
			this._view.scene.addChild(this._billboard3);

			this._billboard4 = new away.entities.Billboard(this._bitmapMaterial, 100, 100);
			this._billboard4.alignmentMode = away.base.AlignmentMode.PIVOT_POINT;
			this._billboard4.x = -100;
			this._billboard4.y = 100;
			this._view.scene.addChild(this._billboard4);

			this._hoverControl = new away.controllers.HoverController(this._view.camera, null, 150, 10);

			document.onmousedown = (event:MouseEvent) => this.onMouseDownHandler(event);
			document.onmouseup = (event:MouseEvent) => this.onMouseUpHandler(event);
			document.onmousemove = (event:MouseEvent) => this.onMouseMove(event);

			window.onresize  = (event:UIEvent) => this.onResize(event);

			//trigger an initial resize for the view
			this.onResize(null);

			//setup the RAF for a render listener
			this._timer = new away.utils.RequestAnimationFrame(this.render, this);
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
			this._billboard1.rotationY += 1;
			this._billboard3.rotationY += 1;
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
}