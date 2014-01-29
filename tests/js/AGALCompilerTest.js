///<reference path="../../build/AME.next.d.ts" />
var aglsl;
(function (aglsl) {
    var AGALCompilerTest = (function () {
        function AGALCompilerTest() {
            var vertSource = "mov oc, fc0 \n";
            var fragSource = "m44 op, vt0, vc0 \n";

            var vertCompiler = new aglsl.AGLSLCompiler();
            var fragCompiler = new aglsl.AGLSLCompiler();

            console.log(vertCompiler.compile(away.gl.ContextGLProgramType.VERTEX, vertSource));

            console.log("\n");

            console.log(fragCompiler.compile(away.gl.ContextGLProgramType.FRAGMENT, fragSource));
        }
        return AGALCompilerTest;
    })();
    aglsl.AGALCompilerTest = AGALCompilerTest;
})(aglsl || (aglsl = {}));
//# sourceMappingURL=AGALCompilerTest.js.map
