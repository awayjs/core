///<reference path="../../build/awayjs.next.d.ts" />
var tests;
(function (tests) {
    (function (textures) {
        var Delegate = away.utils.Delegate;

        var ImageTextureTest = (function () {
            function ImageTextureTest() {
                //---------------------------------------
                // Load a PNG
                var mipUrlRequest = new away.net.URLRequest('assets/1024x1024.png');
                this.mipLoader = new away.net.URLLoader();
                this.mipLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
                this.mipLoader.load(mipUrlRequest);
                this.mipLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.mipImgLoaded));
            }
            ImageTextureTest.prototype.mipImgLoaded = function (e) {
                var _this = this;
                var loader = e.target;
                var image = away.parsers.ParserUtils.blobToImage(loader.data);
                image.onload = function (event) {
                    return _this.onImageLoad(event);
                };
            };

            ImageTextureTest.prototype.onImageLoad = function (event) {
                var image = event.target;
                var stageGLManager = away.managers.StageGLManager.getInstance();
                var stage3D = stageGLManager.getStageGLAt(0);
                var context3D = new away.gl.ContextGL(stage3D.canvas);

                console.log('away.events.Event.COMPLETE', image);

                this.texture = new away.gl.Texture(context3D._gl, image.width, image.height);
                this.target = new away.textures.ImageTexture(image, false);

                console.log('away.base3D.Texture - Created', this.texture);
                console.log('away.textures.ImageTexture - Created', this.target);

                away.textures.MipmapGenerator.generateHTMLImageElementMipMaps(this.target.htmlImageElement, this.texture);
            };
            return ImageTextureTest;
        })();
        textures.ImageTextureTest = ImageTextureTest;
    })(tests.textures || (tests.textures = {}));
    var textures = tests.textures;
})(tests || (tests = {}));
//# sourceMappingURL=ImageTextureTest.js.map
