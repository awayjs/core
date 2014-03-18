///<reference path="../_definitions.ts"/>

// Reference note: http://www.w3schools.com/jsref/dom_obj_event.asp

module away.managers
{
	/**
	 * MouseManager enforces a singleton pattern and is not intended to be instanced.
	 * it provides a manager class for detecting mouse hits on scene objects and sending out mouse events.
	 */
	export class MouseManager
	{
		private static _instance:MouseManager;

		private _viewLookup:Array<away.containers.View> = new Array<away.containers.View>();

		public _iActiveDiv:HTMLDivElement;
		public _iUpdateDirty:boolean;
		public _iCollidingObject:away.pick.PickingCollisionVO;
		
		private _nullVector:away.geom.Vector3D = new away.geom.Vector3D();
		private _previousCollidingObject:away.pick.PickingCollisionVO;
		private _queuedEvents:away.events.MouseEvent[] = new Array<away.events.MouseEvent>();

		private _mouseMoveEvent:MouseEvent;

		private _mouseUp:away.events.MouseEvent = new away.events.MouseEvent(away.events.MouseEvent.MOUSE_UP);
		private _mouseClick:away.events.MouseEvent = new away.events.MouseEvent(away.events.MouseEvent.CLICK);
		private _mouseOut:away.events.MouseEvent = new away.events.MouseEvent(away.events.MouseEvent.MOUSE_OUT);
		private _mouseDown:away.events.MouseEvent = new away.events.MouseEvent(away.events.MouseEvent.MOUSE_DOWN);
		private _mouseMove:away.events.MouseEvent = new away.events.MouseEvent(away.events.MouseEvent.MOUSE_MOVE);
		private _mouseOver:away.events.MouseEvent = new away.events.MouseEvent(away.events.MouseEvent.MOUSE_OVER);
		private _mouseWheel:away.events.MouseEvent = new away.events.MouseEvent(away.events.MouseEvent.MOUSE_WHEEL);
		private _mouseDoubleClick:away.events.MouseEvent = new away.events.MouseEvent(away.events.MouseEvent.DOUBLE_CLICK);

		private onClickDelegate:(event:MouseEvent) => void;
		private onDoubleClickDelegate:(event:MouseEvent) => void;
		private onMouseDownDelegate:(event:MouseEvent) => void;
		private onMouseMoveDelegate:(event:MouseEvent) => void;
		private onMouseUpDelegate:(event:MouseEvent) => void;
		private onMouseWheelDelegate:(event:MouseEvent) => void;
		private onMouseOverDelegate:(event:MouseEvent) => void;
		private onMouseOutDelegate:(event:MouseEvent) => void;

		/**
		 * Creates a new <code>MouseManager</code> object.
		 */
		constructor()
		{
			this.onClickDelegate = (event:MouseEvent) => this.onClick(event);
			this.onDoubleClickDelegate = (event:MouseEvent) => this.onDoubleClick(event);
			this.onMouseDownDelegate = (event:MouseEvent) => this.onMouseDown(event);
			this.onMouseMoveDelegate = (event:MouseEvent) => this.onMouseMove(event);
			this.onMouseUpDelegate = (event:MouseEvent) => this.onMouseUp(event);
			this.onMouseWheelDelegate = (event:MouseEvent) => this.onMouseWheel(event);
			this.onMouseOverDelegate = (event:MouseEvent) => this.onMouseOver(event);
			this.onMouseOutDelegate = (event:MouseEvent) => this.onMouseOut(event);
		}

		public static getInstance():MouseManager
		{
			if (this._instance)
				return this._instance;

			return (this._instance = new MouseManager());
		}

		public fireMouseEvents(forceMouseMove:boolean)
		{
			 // If colliding object has changed, queue over/out events.
			if (this._iCollidingObject != this._previousCollidingObject) {
				if (this._previousCollidingObject)
					this.queueDispatch(this._mouseOut, this._mouseMoveEvent, this._previousCollidingObject);

				if (this._iCollidingObject)
					this.queueDispatch(this._mouseOver, this._mouseMoveEvent);
			}

			 // Fire mouse move events here if forceMouseMove is on.
			if (forceMouseMove && this._iCollidingObject)
				this.queueDispatch( this._mouseMove, this._mouseMoveEvent);

			var event:away.events.MouseEvent;
			var dispatcher:away.base.DisplayObject;

			 // Dispatch all queued events.
			var len:number = this._queuedEvents.length;
			for (var i:number = 0; i < len; ++i) {
				// Only dispatch from first implicitly enabled object ( one that is not a child of a mouseChildren = false hierarchy ).
				event = this._queuedEvents[i];
				dispatcher = event.object;

				while (dispatcher && !dispatcher._iIsMouseEnabled())
					dispatcher = dispatcher.parent;

				if (dispatcher)
					dispatcher.dispatchEvent(event);
			}

			this._queuedEvents.length = 0;

			this._previousCollidingObject = this._iCollidingObject;

			this._iUpdateDirty = false;
		}

//		public addViewLayer(view:away.containers.View)
//		{
//			var stg:Stage = view.stage;
//
//			// Add instance to mouse3dmanager to fire mouse events for multiple views
//			if (!view.stageGL.mouse3DManager)
//				view.stageGL.mouse3DManager = this;
//
//			if (!hasKey(view))
//				_view3Ds[view] = 0;
//
//			_childDepth = 0;
//			traverseDisplayObjects(stg);
//			_viewCount = _childDepth;
//		}

		public registerView(view:away.containers.View)
		{
			view.htmlElement.addEventListener("click", this.onClickDelegate);
			view.htmlElement.addEventListener("dblclick", this.onDoubleClickDelegate);
			view.htmlElement.addEventListener("mousedown", this.onMouseDownDelegate);
			view.htmlElement.addEventListener("mousemove", this.onMouseMoveDelegate);
			view.htmlElement.addEventListener("mouseup", this.onMouseUpDelegate);
			view.htmlElement.addEventListener("mousewheel", this.onMouseWheelDelegate);
			view.htmlElement.addEventListener("mouseover", this.onMouseOverDelegate);
			view.htmlElement.addEventListener("mouseout", this.onMouseOutDelegate);

			this._viewLookup.push(view);
		}

		public unregisterView(view:away.containers.View)
		{
			view.htmlElement.removeEventListener("click", this.onClickDelegate);
			view.htmlElement.removeEventListener("dblclick", this.onDoubleClickDelegate);
			view.htmlElement.removeEventListener("mousedown", this.onMouseDownDelegate);
			view.htmlElement.removeEventListener("mousemove", this.onMouseMoveDelegate);
			view.htmlElement.removeEventListener("mouseup", this.onMouseUpDelegate);
			view.htmlElement.removeEventListener("mousewheel", this.onMouseWheelDelegate);
			view.htmlElement.removeEventListener("mouseover", this.onMouseOverDelegate);
			view.htmlElement.removeEventListener("mouseout", this.onMouseOutDelegate);

			this._viewLookup.slice(this._viewLookup.indexOf(view), 1);
		}

		// ---------------------------------------------------------------------
		// Private.
		// ---------------------------------------------------------------------

		private queueDispatch(event:away.events.MouseEvent, sourceEvent:MouseEvent, collider:away.pick.PickingCollisionVO = null)
		{
			// 2D properties.
			if (sourceEvent) {
				event.ctrlKey = sourceEvent.ctrlKey;
				event.altKey = sourceEvent.altKey;
				event.shiftKey = sourceEvent.shiftKey;
				event.screenX = sourceEvent.clientX;
				event.screenY = sourceEvent.clientY;
			}

			if (collider == null)
				collider = this._iCollidingObject;

			// 3D properties.
			if (collider) {
				// Object.
				event.object = collider.displayObject;
				event.materialOwner = collider.materialOwner;
				// UV.
				event.uv = collider.uv;
				// Position.
				event.localPosition = collider.localPosition? collider.localPosition.clone() : null;
				// Normal.
				event.localNormal = collider.localNormal? collider.localNormal.clone() : null;
				// Face index.
				event.index = collider.index;
			} else {
				// Set all to null.
				event.uv = null;
				event.object = null;
				event.localPosition = this._nullVector;
				event.localNormal = this._nullVector;
				event.index = 0;
				event.subGeometryIndex = 0;
			}

			// Store event to be dispatched later.
			this._queuedEvents.push(event);
		}

		// ---------------------------------------------------------------------
		// Listeners.
		// ---------------------------------------------------------------------

		private onMouseMove(event:MouseEvent)
		{
			this.updateColliders(event);

			if (this._iCollidingObject)
				this.queueDispatch(this._mouseMove, this._mouseMoveEvent = event);
		}

		private onMouseOut(event:MouseEvent)
		{
			this._iActiveDiv = null;

			this.updateColliders(event);

			if (this._iCollidingObject)
				this.queueDispatch(this._mouseOut, event);
		}

		private onMouseOver(event:MouseEvent)
		{
			this._iActiveDiv = <HTMLDivElement> event.target;

			this.updateColliders(event);

			if (this._iCollidingObject)
				this.queueDispatch( this._mouseOver, event);
		}

		private onClick(event:MouseEvent)
		{
			this.updateColliders(event);

			if (this._iCollidingObject)
				this.queueDispatch(this._mouseClick, event);
		}

		private onDoubleClick(event:MouseEvent)
		{
			this.updateColliders(event);

			if (this._iCollidingObject)
				this.queueDispatch(this._mouseDoubleClick, event);
		}

		private onMouseDown(event:MouseEvent)
		{
			this._iActiveDiv = <HTMLDivElement> event.target;

			this.updateColliders(event);

			if (this._iCollidingObject)
				this.queueDispatch(this._mouseDown, event);
		}

		private onMouseUp(event:MouseEvent)
		{
			this.updateColliders(event);

			if (this._iCollidingObject)
				this.queueDispatch(this._mouseUp , event);
		}

		private onMouseWheel(event:MouseEvent)
		{
			this.updateColliders(event);

			if (this._iCollidingObject)
				this.queueDispatch(this._mouseWheel, event);
		}


		private updateColliders(event:MouseEvent)
		{
			if (this._iUpdateDirty)
				return;

			var view:away.containers.View;
			var bounds:ClientRect;
			var mouseX:number = event.clientX;
			var mouseY:number = event.clientY;
			var len:number = this._viewLookup.length;
			for (var i:number = 0; i < len; i++) {
				view = this._viewLookup[i];
				bounds = view.htmlElement.getBoundingClientRect();
				if (mouseX < bounds.left || mouseX > bounds.right || mouseY < bounds.top || mouseY > bounds.bottom) {
					view._pMouseX = null;
					view._pMouseY = null;
				} else {
					view._pMouseX = mouseX + bounds.left;
					view._pMouseY = mouseY + bounds.top;
					view.updateCollider();

					if (view.layeredView && this._iCollidingObject)
						break;
				}
			}

			this._iUpdateDirty = true;
		}
	}
}
