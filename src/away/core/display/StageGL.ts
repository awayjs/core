///<reference path="../../_definitions.ts"/>

module away.display
{

	export class StageGL extends away.events.EventDispatcher
	{
		private _contextGL:away.displayGL.ContextGL;
		private _canvas:HTMLCanvasElement;
		private _width:number;
		private _height:number;
		private _x:number;
		private _y:number;

		constructor(canvas:HTMLCanvasElement)
		{
			super();
			this._canvas = canvas;
		}

		public requestContext(aglslContext:boolean = false)
		{
			try {
				if (aglslContext) {
					this._contextGL = new away.displayGL.AGLSLContextGL(this._canvas);
				} else {
					this._contextGL = new away.displayGL.ContextGL(this._canvas);
				}

			} catch (e) {
				this.dispatchEvent(new away.events.Event(away.events.Event.ERROR));
			}

			if (this._contextGL) {
				this.dispatchEvent(new away.events.Event(away.events.Event.CONTEXTGL_CREATE));
			}
		}

		public set width(v:number)
		{
			this._width = v;
			away.utils.CSS.setCanvasWidth(this._canvas, v);
		}

		public get width()
		{
			return this._width;
		}

		public set height(v:number)
		{
			this._height = v;
			away.utils.CSS.setCanvasHeight(this._canvas, v);
		}

		public get height()
		{
			return this._height;
		}

		public set x(v:number)
		{
			this._x = v;
			away.utils.CSS.setCanvasX(this._canvas, v);
		}

		public get x()
		{
			return this._x;
		}

		public set y(v:number)
		{
			this._y = v;
			away.utils.CSS.setCanvasY(this._canvas, v);
		}

		public get y()
		{
			return this._y;
		}

		public set visible(v:boolean)
		{
			away.utils.CSS.setCanvasVisibility(this._canvas, v);
		}

		public get visible()
		{
			return away.utils.CSS.getCanvasVisibility(this._canvas);
		}

		public get canvas():HTMLCanvasElement
		{
			return this._canvas;
		}

		public get contextGL()
		{
			return this._contextGL;
		}

	}
}