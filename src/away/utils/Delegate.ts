///<reference path="../_definitions.ts"/>

module away.utils
{
	export class Delegate
	{
		private _func:Function;

		constructor(func:Function = null)
		{
			this._func = func;
		}

		/**
		 Creates a functions wrapper for the original function so that it runs
		 in the provided context.
		 @parameter obj Context in which to run the function.
		 @paramater func Function to run.
		 */
		public static create(obj:Object, func:Function):Function
		{
			var f = function()
			{
				return func.apply(obj, arguments);
			};

			return f;
		}

		public createDelegate(obj:Object):Function
		{
			return Delegate.create(obj, this._func);
		}
	}
}