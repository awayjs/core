///<reference path="../../_definitions.ts"/>
module away.display
{

	export class Stage extends away.events.EventDispatcher
	{

		private static STAGEGL_MAX_QUANTITY:number = 8;
		public stageGLs:away.display.StageGL[];

		private _stageHeight:number;
		private _stageWidth:number;

		constructor(width:number = 640, height:number = 480)
		{
			super();

			// Move ( to Sprite ) / possibly remove:
			if (!document) {
				throw new away.errors.DocumentError("A root document object does not exist.");
			}

			this.initStageGLObjects();
			this.resize(width, height);

		}

		public resize(width:number, height:number)
		{
			this._stageHeight = height;
			this._stageWidth = width;

			var s3d:away.display.StageGL;

			for (var i:number = 0; i < Stage.STAGEGL_MAX_QUANTITY; ++i) {

				s3d = this.stageGLs[ i ];
				s3d.width = width;
				s3d.height = height;
				s3d.x = 0;
				s3d.y = 0;

				//away.utils.CSS.setCanvasSize( this.stageGLs[ i ].canvas, width, height );
				//away.utils.CSS.setCanvasPosition( this.stageGLs[ i ].canvas, 0, 0, true );
			}
			this.dispatchEvent(new away.events.Event(away.events.Event.RESIZE));
		}

		public getStageGLAt(index:number):away.display.StageGL
		{
			if (0 <= index && index < Stage.STAGEGL_MAX_QUANTITY) {
				return this.stageGLs[ index ];
			}
			throw new away.errors.ArgumentError("Index is out of bounds [0.." + Stage.STAGEGL_MAX_QUANTITY + "]");
		}

		public initStageGLObjects()
		{
			this.stageGLs = [];

			for (var i:number = 0; i < Stage.STAGEGL_MAX_QUANTITY; ++i) {

				var canvas:HTMLCanvasElement = this.createHTMLCanvasElement();
				var stageGL:away.display.StageGL = new away.display.StageGL(canvas);
				stageGL.addEventListener(away.events.Event.CONTEXTGL_CREATE, away.utils.Delegate.create(this, this.onContextCreated));

				this.stageGLs.push(stageGL);

			}

		}

		private onContextCreated(e:away.events.Event):void
		{

			var stageGL:away.display.StageGL = <away.display.StageGL> e.target;
			this.addChildHTMLElement(stageGL.canvas);
		}

		private createHTMLCanvasElement():HTMLCanvasElement
		{
			return document.createElement("canvas");
		}

		private addChildHTMLElement(canvas:HTMLCanvasElement)
		{
			document.body.appendChild(canvas);
		}

		public get stageWidth():number
		{

			return this._stageWidth;

		}

		public get stageHeight():number
		{

			return this._stageHeight;

		}

		public get rect():away.geom.Rectangle
		{

			return new away.geom.Rectangle(0, 0, this._stageWidth, this._stageHeight);

		}
	}
}