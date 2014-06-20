///<reference path="../_definitions.ts"/>

module away.managers
{
	import Stage							= away.base.Stage;
	import Event							= away.events.Event;
	import StageEvent						= away.events.StageEvent;

	/**
	 * The StageManager class provides a multiton object that handles management for Stage objects.
	 *
	 * @see away.base.Stage
	 */
	export class StageManager extends away.events.EventDispatcher
	{
		private static STAGE_MAX_QUANTITY:number = 8;
		private _stages:Array<Stage>;

		private static _instance:StageManager;
		private static _numStages:number = 0;
		private _onContextCreatedDelegate:(event:Event) => void;

		/**
		 * Creates a new StageManager class.
		 * @param stage The Stage object that contains the Stage objects to be managed.
		 * @private
		 */
		constructor(StageManagerSingletonEnforcer:StageManagerSingletonEnforcer)
		{
			super();

			if (!StageManagerSingletonEnforcer)
				throw new Error("This class is a multiton and cannot be instantiated manually. Use StageManager.getInstance instead.");

			this._stages = new Array<Stage>(StageManager.STAGE_MAX_QUANTITY);

			this._onContextCreatedDelegate = (event:Event) => this.onContextCreated(event);
		}

		/**
		 * Gets a StageManager instance for the given Stage object.
		 * @param stage The Stage object that contains the Stage objects to be managed.
		 * @return The StageManager instance for the given Stage object.
		 */
		public static getInstance():StageManager
		{
			if (this._instance == null)
				this._instance = new StageManager(new StageManagerSingletonEnforcer());

			return this._instance;
		}

		/**
		 * Requests the Stage for the given index.
		 *
		 * @param index The index of the requested Stage.
		 * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
		 * @param profile The compatibility profile, an enumeration of ContextProfile
		 * @return The Stage for the given index.
		 */
		public getStageAt(index:number, forceSoftware:boolean = false, profile:string = "baseline", mode:string = "auto"):Stage
		{
			if (index < 0 || index >= StageManager.STAGE_MAX_QUANTITY)
				throw new away.errors.ArgumentError("Index is out of bounds [0.." + StageManager.STAGE_MAX_QUANTITY + "]");

			if (!this._stages[index]) {
				StageManager._numStages++;

				var canvas:HTMLCanvasElement = document.createElement("canvas");
				canvas.id = "stage" + index;
				document.body.appendChild(canvas);
				var stage:Stage = this._stages[index] = new Stage(canvas, index, this, forceSoftware, profile);
				stage.addEventListener(StageEvent.CONTEXT_CREATED, this._onContextCreatedDelegate);
				stage.requestContext(forceSoftware, profile, mode);
			}

			return stage;
		}

		/**
		 * Removes a Stage from the manager.
		 * @param stage
		 * @private
		 */
		public iRemoveStage(stage:Stage)
		{
			StageManager._numStages--;

			stage.removeEventListener(StageEvent.CONTEXT_CREATED, this._onContextCreatedDelegate);

			this._stages[ stage._iStageIndex ] = null;
		}

		/**
		 * Get the next available stage. An error is thrown if there are no StageProxies available
		 * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
		 * @param profile The compatibility profile, an enumeration of ContextProfile
		 * @return The allocated stage
		 */
		public getFreeStage(forceSoftware:boolean = false, profile:string = "baseline", mode:string = "auto"):Stage
		{
			var i:number = 0;
			var len:number = this._stages.length;

			while (i < len) {
				if (!this._stages[i])
					return this.getStageAt(i, forceSoftware, profile, mode);

				++i;
			}

			return null;
		}

		/**
		 * Checks if a new stage can be created and managed by the class.
		 * @return true if there is one slot free for a new stage
		 */
		public get hasFreeStage():boolean
		{
			return StageManager._numStages < StageManager.STAGE_MAX_QUANTITY? true : false;
		}

		/**
		 * Returns the amount of stage objects that can be created and managed by the class
		 * @return the amount of free slots
		 */
		public get numSlotsFree():number
		{
			return StageManager.STAGE_MAX_QUANTITY - StageManager._numStages;
		}

		/**
		 * Returns the amount of Stage objects currently managed by the class.
		 * @return the amount of slots used
		 */
		public get numSlotsUsed():number
		{
			return StageManager._numStages;
		}

		/**
		 * The maximum amount of Stage objects that can be managed by the class
		 */
		public get numSlotsTotal():number
		{
			return this._stages.length;
		}

		private onContextCreated(e:Event):void
		{
			//var stage:Stage = <Stage> e.target;
			//document.body.appendChild(stage.canvas)
		}
	}
}

class StageManagerSingletonEnforcer
{
}