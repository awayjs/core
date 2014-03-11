///<reference path="../../_definitions.ts"/>

module away.gl
{
	export class AGLSLContextGL extends ContextGL
	{
		constructor(canvas:HTMLCanvasElement)
		{
			super(canvas);
		}

		//@override
		public setProgramConstantsFromMatrix(programType:string, firstRegister:number, matrix:away.geom.Matrix3D, transposedMatrix:boolean = false)
		{
			//TODO remove special case for WebGL matrix calls?
			var d:number[] = matrix.rawData;
			if (transposedMatrix) {
				this.setProgramConstantsFromArray(programType, firstRegister, [ d[0], d[4], d[8], d[12] ], 1);
				this.setProgramConstantsFromArray(programType, firstRegister + 1, [ d[1], d[5], d[9], d[13] ], 1);
				this.setProgramConstantsFromArray(programType, firstRegister + 2, [ d[2], d[6], d[10], d[14] ], 1);
				this.setProgramConstantsFromArray(programType, firstRegister + 3, [ d[3], d[7], d[11], d[15] ], 1);
			} else {
				this.setProgramConstantsFromArray(programType, firstRegister, [ d[0], d[1], d[2], d[3] ], 1);
				this.setProgramConstantsFromArray(programType, firstRegister + 1, [ d[4], d[5], d[6], d[7] ], 1);
				this.setProgramConstantsFromArray(programType, firstRegister + 2, [ d[8], d[9], d[10], d[11] ], 1);
				this.setProgramConstantsFromArray(programType, firstRegister + 3, [ d[12], d[13], d[14], d[15] ], 1);
			}
		}
	}
}