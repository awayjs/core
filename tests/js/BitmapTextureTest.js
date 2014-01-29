///<reference path="../../build/AME.next.d.ts" />
var tests;
(function (tests) {
    (function (textures) {
        var Delegate = away.utils.Delegate;

        var BitmapTextureTest = (function () {
            function BitmapTextureTest() {
                //---------------------------------------
                // Load a PNG
                var mipUrlRequest = new away.net.URLRequest('assets/1024x1024.png');
                this.mipLoader = new away.net.IMGLoader();
                this.mipLoader.load(mipUrlRequest);
                this.mipLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.mipImgLoaded));
            }
            BitmapTextureTest.prototype.mipImgLoaded = function (e) {
                var loader = e.target;
                var rect = new away.geom.Rectangle(0, 0, this.mipLoader.width, this.mipLoader.height);

                console.log('away.events.Event.COMPLETE', loader);

                this.bitmapData = new away.base.BitmapData(loader.width, loader.height);
                this.bitmapData.drawImage(this.mipLoader.image, rect, rect);

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
