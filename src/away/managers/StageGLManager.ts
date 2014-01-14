///<reference path="../_definitions.ts"/>

module away.managers
{
	//import away.arcane;

	//import flash.display.Stage;
	//import flash.utils.Dictionary;

	//use namespace arcane;

	/**
	 * The StageGLManager class provides a multiton object that handles management for StageGL objects. StageGL objects
	 * should not be requested directly, but are exposed by a StageGLProxy.
	 *
	 * @see away.core.managers.StageGLProxy
	 */
	export class StageGLManager
	{
		//private static _instances:Object;
		private static _instances:StageGLManagerInstanceData[];
		private static _stageProxies:away.managers.StageGLProxy[];//.<StageGLProxy>;
		private static _numStageProxies:number = 0;

		private _stage:away.display.Stage;

		/**
		 * Creates a new StageGLManager class.
		 * @param stage The Stage object that contains the StageGL objects to be managed.
		 * @private
		 */
		constructor(stage:away.display.Stage, StageGLManagerSingletonEnforcer:StageGLManagerSingletonEnforcer)
		{
			if (!StageGLManagerSingletonEnforcer) {
				throw new Error("This class is a multiton and cannot be instantiated manually. Use StageGLManager.getInstance instead.");
			}

			this._stage = stage;

			if (!StageGLManager._stageProxies) {
				StageGLManager._stageProxies = new Array<away.managers.StageGLProxy>(this._stage.stageGLs.length);//, true);
			}

		}

		/**
		 * Gets a StageGLManager instance for the given Stage object.
		 * @param stage The Stage object that contains the StageGL objects to be managed.
		 * @return The StageGLManager instance for the given Stage object.
		 */
		public static getInstance(stage:away.display.Stage):away.managers.StageGLManager
		{

			var stage3dManager:away.managers.StageGLManager = StageGLManager.getStageGLManagerByStageRef(stage);

			if (stage3dManager == null) {

				stage3dManager = new away.managers.StageGLManager(stage, new StageGLManagerSingletonEnforcer());

				var stageInstanceData:StageGLManagerInstanceData = new StageGLManagerInstanceData();
				stageInstanceData.stage = stage;
				stageInstanceData.stageGLManager = stage3dManager;

				StageGLManager._instances.push(stageInstanceData);

			}

			return stage3dManager;

		}

		/**
		 *
		 * @param stage
		 * @returns {  away.managers.StageGLManager }
		 * @constructor
		 */
		private static getStageGLManagerByStageRef(stage:away.display.Stage):away.managers.StageGLManager
		{

			if (StageGLManager._instances == null) {

				StageGLManager._instances = new Array<StageGLManagerInstanceData>();

			}

			var l:number = StageGLManager._instances.length;
			var s:StageGLManagerInstanceData;

			for (var c:number = 0; c < l; c++) {

				s = StageGLManager._instances[c];

				if (s.stage == stage) {

					return s.stageGLManager;

				}


			}

			return null;

		}

		/**
		 * Requests the StageGLProxy for the given index.
		 * @param index The index of the requested StageGL.
		 * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
		 * @param profile The compatibility profile, an enumeration of ContextGLProfile
		 * @return The StageGLProxy for the given index.
		 */
		public getStageGLProxy(index:number, forceSoftware:boolean = false, profile:string = "baseline"):away.managers.StageGLProxy
		{
			if (!StageGLManager._stageProxies[index]) {

				StageGLManager._numStageProxies++;
				StageGLManager._stageProxies[index] = new away.managers.StageGLProxy(index, this._stage.stageGLs[index], this, forceSoftware, profile);

			}

			return StageGLManager._stageProxies[index];
		}

		/**
		 * Removes a StageGLProxy from the manager.
		 * @param stageGLProxy
		 * @private
		 */
		public iRemoveStageGLProxy(stageGLProxy:away.managers.StageGLProxy)
		{
			StageGLManager._numStageProxies--;
			StageGLManager._stageProxies[ stageGLProxy._iStageGLIndex ] = null;
		}

		/**
		 * Get the next available stageGLProxy. An error is thrown if there are no StageGLProxies available
		 * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
		 * @param profile The compatibility profile, an enumeration of ContextGLProfile
		 * @return The allocated stageGLProxy
		 */
		public getFreeStageGLProxy(forceSoftware:boolean = false, profile:string = "baseline"):StageGLProxy
		{
			var i:number = 0;
			var len:number = StageGLManager._stageProxies.length;

			//console.log( StageGLManager._stageProxies );

			while (i < len) {

				if (!StageGLManager._stageProxies[i]) {

					this.getStageGLProxy(i, forceSoftware, profile);

					StageGLManager._stageProxies[i].width = this._stage.stageWidth;
					StageGLManager._stageProxies[i].height = this._stage.stageHeight;

					return StageGLManager._stageProxies[i];

				}

				++i;

			}

			throw new Error("Too many StageGL instances used!");
			return null;

		}

		/**
		 * Checks if a new stageGLProxy can be created and managed by the class.
		 * @return true if there is one slot free for a new stageGLProxy
		 */
		public get hasFreeStageGLProxy():boolean
		{
			return StageGLManager._numStageProxies < StageGLManager._stageProxies.length? true : false;
		}

		/**
		 * Returns the amount of stageGLProxy objects that can be created and managed by the class
		 * @return the amount of free slots
		 */
		public get numProxySlotsFree():number
		{
			return StageGLManager._stageProxies.length - StageGLManager._numStageProxies;
		}

		/**
		 * Returns the amount of StageGLProxy objects currently managed by the class.
		 * @return the amount of slots used
		 */
		public get numProxySlotsUsed():number
		{
			return StageGLManager._numStageProxies;
		}

		/**
		 * Returns the maximum amount of StageGLProxy objects that can be managed by the class
		 * @return the maximum amount of StageGLProxy objects that can be managed by the class
		 */
		public get numProxySlotsTotal():number
		{
			return StageGLManager._stageProxies.length;
		}
	}
}

class StageGLManagerInstanceData
{

	public stage:away.display.Stage;
	public stageGLManager:away.managers.StageGLManager;

}

class StageGLManagerSingletonEnforcer
{
}
