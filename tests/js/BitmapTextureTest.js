///<reference path="../../build/awayjs.next.d.ts" />
var tests;
(function (tests) {
    (function (textures) {
        var Delegate = away.utils.Delegate;

        var BitmapTextureTest = (function () {
            function BitmapTextureTest() {
                //---------------------------------------
                // Load a PNG
                var mipUrlRequest = new away.net.URLRequest('assets/1024x1024.png');
                this.mipLoader = new away.net.URLLoader();
                this.mipLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
                this.mipLoader.load(mipUrlRequest);
                this.mipLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.mipImgLoaded));
            }
            BitmapTextureTest.prototype.mipImgLoaded = function (e) {
                var _this = this;
                var loader = e.target;
                var image = away.parsers.ParserUtils.blobToImage(loader.data);
                image.onload = function (event) {
                    return _this.onImageLoad(event);
                };
            };

            BitmapTextureTest.prototype.onImageLoad = function (event) {
                var image = event.target;

                var rect = new away.geom.Rectangle(0, 0, image.width, image.height);

                console.log('away.events.Event.COMPLETE', image);

                this.bitmapData = new away.base.BitmapData(image.width, image.height);
                this.bitmapData.drawImage(image, rect, rect);

                this.target = new away.textures.BitmapTexture(this.bitmapData, true); //new away.textures.HTMLImageElementTexture( loader.image , false );

                away.Debug.log('away.base.BitmapData', this.bitmapData);
                away.Debug.log('away.textures.BitmapTexture', this.target);
            };
            return BitmapTextureTest;
        })();
        textures.BitmapTextureTest = BitmapTextureTest;
    })(tests.textures || (tests.textures = {}));
    var textures = tests.textures;
})(tests || (tests = {}));
//# sourceMappingURL=BitmapTextureTest.js.map
