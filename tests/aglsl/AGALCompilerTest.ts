///<reference path="../../build/awayjs.next.d.ts" />

module aglsl
{
	export class AGALCompilerTest
	{
		
		constructor()
		{
			var vertSource:string = "mov oc, fc0 \n";
			var fragSource:string = "m44 op, vt0, vc0 \n";
			
			var vertCompiler:aglsl.AGLSLCompiler = new aglsl.AGLSLCompiler();
			var fragCompiler:aglsl.AGLSLCompiler = new aglsl.AGLSLCompiler();
			
			console.log( vertCompiler.compile( away.gl.ContextGLProgramType.VERTEX, vertSource ) );
			
			console.log( "\n" );
			
			console.log( fragCompiler.compile( away.gl.ContextGLProgramType.FRAGMENT, fragSource ) );
			
		}
	}
}