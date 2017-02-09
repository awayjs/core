import {PartialImplementationError}	from "../errors/PartialImplementationError";

/**
 *
 */
export class Debug
{
	public static THROW_ERRORS:boolean = true;
	public static ENABLE_LOG:boolean = true;
	public static LOG_PI_ERRORS:boolean = true;

	private static keyword:string = null;

	public static breakpoint():void
	{
		Debug['break']();
	}

	public static throwPIROnKeyWordOnly(str:string, enable:boolean = true):void
	{
		if (!enable)
			Debug.keyword = null;
		else
			Debug.keyword = str;
	}

	public static throwPIR(clss:string, fnc:string, msg:string):void
	{
		Debug.logPIR('PartialImplementationError ' + clss, fnc, msg);

		if (Debug.THROW_ERRORS) {
			if (Debug.keyword) {
				var e:string = clss + fnc + msg;

				if (e.indexOf(Debug.keyword) == -1)
					return;
			}

			throw new PartialImplementationError(clss + '.' + fnc + ': ' + msg);
		}
	}

	private static logPIR(clss:string, fnc:string, msg:string = ''):void
	{
		if (Debug.LOG_PI_ERRORS)
			console.log(clss + '.' + fnc + ': ' + msg);
	}

	public static log(...args:any[]):void
	{
		if (Debug.ENABLE_LOG)
			console.log(args);
	}
}