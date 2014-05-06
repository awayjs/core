///<reference path="../../build/awayjs-core.next.d.ts" />
var tests;
(function (tests) {
    (function (base) {
        var Delegate = away.utils.Delegate;

        var BitmapDataTest = (function () {
            function BitmapDataTest() {
                var _this = this;
                var transparent = true;
                var initcolour = 0xffffffff;

                //---------------------------------------
                // Load a PNG
                this.urlRequest = new away.net.URLRequest('assets/256x256.png');
                this.urlLoader = new away.net.URLLoader();
                this.urlLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
                this.urlLoader.load(this.urlRequest);
                this.urlLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.imgLoaded));
                this.urlLoader.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.imgLoadedError));

                //---------------------------------------
                // BitmapData Object - 1
                this.bitmapData = new away.base.BitmapData(256, 256, transparent, initcolour);
                document.body.appendChild(this.bitmapData.canvas);

                //---------------------------------------
                // BitmapData Object - 2
                this.bitmapDataB = new away.base.BitmapData(256, 256, transparent, initcolour);
                this.bitmapDataB.canvas.style.position = 'absolute';
                this.bitmapDataB.canvas.style.left = '540px';
                document.body.appendChild(this.bitmapDataB.canvas);

                //---------------------------------------
                // BitmapData - setPixel test
                console['time']("bitmapdata"); // start setPixel operation benchmark ( TypeScript does not support console.time - so hacking it in ) .

                this.bitmapDataB.lock();

                for (var i = 0; i < 10000; i++) {
                    var x = Math.random() * this.bitmapDataB.width | 0;
                    var y = Math.random() * this.bitmapDataB.height | 0;
                    this.bitmapDataB.setPixel(x, y, Math.random() * 0xffFFFFFF); // 255 opaque
                }

                this.bitmapDataB.unlock();
                console['timeEnd']("bitmapdata"); // benchmark the setPixel operation

                document.onmousedown = function (e) {
                    return _this.onMouseDown(e);
                };
            }
            BitmapDataTest.prototype.onMouseDown = function (e) {
                if (this.bitmapData.width === 512) {
                    if (this.image.complete) {
                        this.bitmapDataB.lock(); // Lock bitmap - speeds up setPixelOperations

                        //---------------------------------------
                        // Resize BitmapData
                        this.bitmapData.width = 256;
                        this.bitmapData.height = 256;

                        //---------------------------------------
                        // copy loaded image to first BitmapData
                        var rect = new away.geom.Rectangle(0, 0, this.image.width, this.image.height);
                        this.bitmapData.drawImage(this.image, rect, rect);

                        //---------------------------------------
                        // copy image into second bitmap data ( and scale it up 2X )
                        rect.width = rect.width * 2;
                        rect.height = rect.height * 2;

                        this.bitmapDataB.copyPixels(this.bitmapData, this.bitmapData.rect, rect);

                        for (var d = 0; d < 1000; d++) {
                            var x = Math.random() * this.bitmapDataB.width | 0;
                            var y = Math.random() * this.bitmapDataB.height | 0;
                            this.bitmapDataB.setPixel(x, y, Math.random() * 0xFFFFFFFF); // 255 opaque
                        }

                        this.bitmapDataB.unlock(); // Unlock bitmapdata
                    } else {
                        //---------------------------------------
                        // image is not loaded - fill bitmapdata with red
                        this.bitmapData.width = 256;
                        this.bitmapData.height = 256;
                        this.bitmapData.fillRect(this.bitmapData.rect, 0xffff0000);
                    }
                } else {
                    //---------------------------------------
                    // resize bitmapdata;
                    this.bitmapData.lock();

                    this.bitmapData.width = 512;
                    this.bitmapData.height = 512;
                    this.bitmapData.fillRect(this.bitmapData.rect, 0xffff0000); // fill it RED

                    for (var d = 0; d < 1000; d++) {
                        var x = Math.random() * this.bitmapData.width | 0;
                        var y = Math.random() * this.bitmapData.height | 0;
                        this.bitmapData.setPixel(x, y, Math.random() * 0xFFFFFFFF);
                    }

                    this.bitmapData.unlock();

                    //---------------------------------------
                    // copy bitmapdata
                    var targetRect = this.bitmapDataB.rect.clone();
                    targetRect.width = targetRect.width / 2;
                    targetRect.height = targetRect.height / 2;

                    this.bitmapDataB.copyPixels(this.bitmapData, this.bitmapDataB.rect, targetRect); // copy first bitmapdata object into the second one
                }

                var m = new away.geom.Matrix(.5, .08, .08, .5, this.image.width / 2, this.image.height / 2);
                this.bitmapData.draw(this.bitmapData, m);

                this.bitmapData.setPixel32(0, 0, 0xccff0000);
                this.bitmapData.setPixel32(1, 0, 0xcc00ff00);
                this.bitmapData.setPixel32(2, 0, 0xcc0000ff);

                this.bitmapDataB.draw(this.bitmapData, m);

                console.log('GetPixel 0,0: ', away.utils.ColorUtils.ARGBToHexString(away.utils.ColorUtils.float32ColorToARGB(this.bitmapData.getPixel(0, 0))));
                console.log('GetPixel 1,0: ', away.utils.ColorUtils.ARGBToHexString(away.utils.ColorUtils.float32ColorToARGB(this.bitmapData.getPixel(1, 0))));
                console.log('GetPixel 2,0: ', away.utils.ColorUtils.ARGBToHexString(away.utils.ColorUtils.float32ColorToARGB(this.bitmapData.getPixel(2, 0))));
            };

            BitmapDataTest.prototype.imgLoadedError = function (e) {
                console.log('error');
            };

            BitmapDataTest.prototype.imgLoaded = function (e) {
                var _this = this;
                var loader = e.target;
                this.image = away.parsers.ParserUtils.blobToImage(loader.data);
                this.image.onload = function (event) {
                    return _this.onImageLoad(event);
                };
            };

            BitmapDataTest.prototype.onImageLoad = function (event) {
                this.bitmapData.drawImage(this.image, new away.geom.Rectangle(0, 0, this.image.width, this.image.height), new away.geom.Rectangle(0, 0, this.image.width / 2, this.image.height / 2));

                var m = new away.geom.Matrix(.5, .08, .08, .5, this.image.width / 2, this.image.height / 2);
                this.bitmapData.draw(this.bitmapData, m);
            };
            return BitmapDataTest;
        })();
        base.BitmapDataTest = BitmapDataTest;
    })(tests.base || (tests.base = {}));
    var base = tests.base;
})(tests || (tests = {}));
//# sourceMappingURL=BitmapDataTest.js.map
