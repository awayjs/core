///<reference path="../../build/awayjs.next.d.ts" />
var tests;
(function (tests) {
    (function (textures) {
        var Delegate = away.utils.Delegate;

        var ATFTextureTest = (function () {
            function ATFTextureTest() {
                //---------------------------------------
                // Load a PNG
                var mipUrlRequest = new away.net.URLRequest('assets/fire.atf');
                this.mipLoader = new away.net.URLLoader();
                this.mipLoader.load(mipUrlRequest);
                this.mipLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.mipImgLoaded));
            }
            ATFTextureTest.prototype.mipImgLoaded = function (e) {
                var stage3DManager = away.managers.StageGLManager.getInstance();
                var stage3D = stage3DManager.getStageGLAt(0);
                var context3D = new away.gl.ContextGL(stage3D.canvas);
                var loader = e.target;

                console.log('away.events.Event.COMPLETE', loader);

                this.target = new away.textures.ATFTexture(loader.data);

                console.log('away.textures.ATFTexture - Created', this.target);
            };
            return ATFTextureTest;
        })();
        textures.ATFTextureTest = ATFTextureTest;
    })(tests.textures || (tests.textures = {}));
    var textures = tests.textures;
})(tests || (tests = {}));
//# sourceMappingURL=ATFTextureTest.js.map
