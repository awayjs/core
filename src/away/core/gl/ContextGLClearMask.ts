///<reference path="../../_definitions.ts"/>

module away.gl
{
	export class ContextGLClearMask
	{
		static COLOR:number = 8 << 11;
		static DEPTH:number = 8 << 5;
		static STENCIL:number = 8 << 7;
		static ALL:number = ContextGLClearMask.COLOR | ContextGLClearMask.DEPTH | ContextGLClearMask.STENCIL;
	}
}