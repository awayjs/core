///<reference path="../_definitions.ts"/>
/**
 * @module away.events
 */
module away.events
{
	import DisplayObject				= away.base.DisplayObject;
	import IMaterialOwner				= away.base.IMaterialOwner;
	import Point						= away.geom.Point;
	import Vector3D						= away.geom.Vector3D;
	import MaterialBase					= away.materials.MaterialBase;

	/**
	 * A MouseEvent is dispatched when a mouse event occurs over a mouseEnabled object in View.
	 * TODO: we don't have screenZ data, tho this should be easy to implement
	 */
	export class MouseEvent extends away.events.Event
	{
		// Private.
		public _iAllowedToPropagate:boolean = true;
		public _iParentEvent:MouseEvent;

		/**
		 * Defines the value of the type property of a mouseOver3d event object.
		 */
		public static MOUSE_OVER:string = "mouseOver3d";

		/**
		 * Defines the value of the type property of a mouseOut3d event object.
		 */
		public static MOUSE_OUT:string = "mouseOut3d";

		/**
		 * Defines the value of the type property of a mouseUp3d event object.
		 */
		public static MOUSE_UP:string = "mouseUp3d";

		/**
		 * Defines the value of the type property of a mouseDown3d event object.
		 */
		public static MOUSE_DOWN:string = "mouseDown3d";

		/**
		 * Defines the value of the type property of a mouseMove3d event object.
		 */
		public static MOUSE_MOVE:string = "mouseMove3d";

		/**
		 * Defines the value of the type property of a rollOver3d event object.
		 */
//		public static ROLL_OVER : string = "rollOver3d";

		/**
		 * Defines the value of the type property of a rollOut3d event object.
		 */
//		public static ROLL_OUT : string = "rollOut3d";

		/**
		 * Defines the value of the type property of a click3d event object.
		 */
		public static CLICK:string = "click3d";

		/**
		 * Defines the value of the type property of a doubleClick3d event object.
		 */
		public static DOUBLE_CLICK:string = "doubleClick3d";

		/**
		 * Defines the value of the type property of a mouseWheel3d event object.
		 */
		public static MOUSE_WHEEL:string = "mouseWheel3d";

		/**
		 * The horizontal coordinate at which the event occurred in view coordinates.
		 */
		public screenX:number;

		/**
		 * The vertical coordinate at which the event occurred in view coordinates.
		 */
		public screenY:number;

		/**
		 * The view object inside which the event took place.
		 */
		public view:away.containers.View;

		/**
		 * The 3d object inside which the event took place.
		 */
		public object:DisplayObject;

		/**
		 * The material owner inside which the event took place.
		 */
		public materialOwner:IMaterialOwner;

		/**
		 * The material of the 3d element inside which the event took place.
		 */
		public material:MaterialBase;

		/**
		 * The uv coordinate inside the draw primitive where the event took place.
		 */
		public uv:Point;

		/**
		 * The index of the face where the event took place.
		 */
		public index:number;

		/**
		 * The index of the subGeometry where the event took place.
		 */
		public subGeometryIndex:number;

		/**
		 * The position in object space where the event took place
		 */
		public localPosition:Vector3D;

		/**
		 * The normal in object space where the event took place
		 */
		public localNormal:Vector3D;

		/**
		 * Indicates whether the Control key is active (true) or inactive (false).
		 */
		public ctrlKey:boolean;

		/**
		 * Indicates whether the Alt key is active (true) or inactive (false).
		 */
		public altKey:boolean;

		/**
		 * Indicates whether the Shift key is active (true) or inactive (false).
		 */
		public shiftKey:boolean;

		/**
		 * Indicates how many lines should be scrolled for each unit the user rotates the mouse wheel.
		 */
		public delta:number;

		/**
		 * Create a new MouseEvent object.
		 * @param type The type of the MouseEvent.
		 */
		constructor(type:string)
		{
			super(type);
		}

		/**
		 * @inheritDoc
		 */
		public get bubbles():boolean
		{
			var doesBubble:boolean = this._iAllowedToPropagate;
			this._iAllowedToPropagate = true;

			// Don't bubble if propagation has been stopped.
			return doesBubble;
		}

		/**
		 * @inheritDoc
		 */
		public stopPropagation()
		{
			this._iAllowedToPropagate = false;

			if (this._iParentEvent)
				this._iParentEvent.stopPropagation();
		}

		/**
		 * @inheritDoc
		 */
		public stopImmediatePropagation()
		{
			this._iAllowedToPropagate = false;

			if (this._iParentEvent)
				this._iParentEvent.stopImmediatePropagation();
		}

		/**
		 * Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
		 */
		public clone():Event
		{
			var result:MouseEvent = new MouseEvent(this.type);

			/* TODO: Debug / test - look into isDefaultPrevented
			 if (isDefaultPrevented())
			 result.preventDefault();
			 */

			result.screenX = this.screenX;
			result.screenY = this.screenY;

			result.view = this.view;
			result.object = this.object;
			result.materialOwner = this.materialOwner;
			result.material = this.material;
			result.uv = this.uv;
			result.localPosition = this.localPosition;
			result.localNormal = this.localNormal;
			result.index = this.index;
			result.subGeometryIndex = this.subGeometryIndex;
			result.delta = this.delta;

			result.ctrlKey = this.ctrlKey;
			result.shiftKey = this.shiftKey;

			result._iParentEvent = this;
			result._iAllowedToPropagate = this._iAllowedToPropagate;

			return result;
		}

		/**
		 * The position in scene space where the event took place
		 */
		public get scenePosition():Vector3D
		{
			return this.object.sceneTransform.transformVector(this.localPosition);
		}

		/**
		 * The normal in scene space where the event took place
		 */
		public get sceneNormal():Vector3D
		{
			var sceneNormal:Vector3D = this.object.sceneTransform.deltaTransformVector(this.localNormal);
			sceneNormal.normalize();

			return sceneNormal;
		}
	}
}
