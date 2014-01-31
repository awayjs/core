///<reference path="../../build/AME.next.d.ts" />
var tests;
(function (tests) {
    (function (net) {
        var Delegate = away.utils.Delegate;

        var URLLoaderTest = (function () {
            function URLLoaderTest() {
                //-----------------------------------------------------------------------------------------------
                // load a png
                //-----------------------------------------------------------------------------------------------
                var pngURLrq = new away.net.URLRequest('assets/2.png');

                this.pngLoader = new away.net.URLLoader();
                this.pngLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
                this.pngLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.pngLoaderComplete));
                this.pngLoader.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.ioError));
                this.pngLoader.load(pngURLrq);

                //-----------------------------------------------------------------------------------------------
                // Load a jpg
                //-----------------------------------------------------------------------------------------------
                var jpgURLrq = new away.net.URLRequest('assets/1.jpg');

                this.jpgLoader = new away.net.URLLoader();
                this.jpgLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
                this.jpgLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.jpgLoaderComplete));
                this.jpgLoader.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.ioError));
                this.jpgLoader.load(jpgURLrq);

                //-----------------------------------------------------------------------------------------------
                // Load file of wrong format
                //-----------------------------------------------------------------------------------------------
                var notURLrq = new away.net.URLRequest('assets/data.txt');

                this.noAnImageLoader = new away.net.URLLoader();
                this.noAnImageLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
                this.noAnImageLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.noAnImageLoaderComplete));
                this.noAnImageLoader.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.ioError));
                this.noAnImageLoader.load(notURLrq);

                //-----------------------------------------------------------------------------------------------
                // Load image that does not exist
                //-----------------------------------------------------------------------------------------------
                var wrongURLrq = new away.net.URLRequest('assets/iDontExist.png');

                this.wrongURLLoader = new away.net.URLLoader();
                this.wrongURLLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
                this.wrongURLLoader.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.wrongURLLoaderComplete));
                this.wrongURLLoader.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.ioError));
                this.wrongURLLoader.load(wrongURLrq);
            }
            URLLoaderTest.prototype.pngLoaderComplete = function (e) {
                this.logSuccessfullLoad(e);

                var imgLoader = e.target;
                document.body.appendChild(away.parsers.ParserUtils.blobToImage(imgLoader.data));
            };

            URLLoaderTest.prototype.jpgLoaderComplete = function (e) {
                this.logSuccessfullLoad(e);

                var imgLoader = e.target;
                document.body.appendChild(away.parsers.ParserUtils.blobToImage(imgLoader.data));
            };

            URLLoaderTest.prototype.noAnImageLoaderComplete = function (e) {
                this.logSuccessfullLoad(e);
            };

            URLLoaderTest.prototype.wrongURLLoaderComplete = function (e) {
                this.logSuccessfullLoad(e);
            };

            URLLoaderTest.prototype.logSuccessfullLoad = function (e) {
                var imgLoader = e.target;
                console.log('IMG.Event.Complete', imgLoader.url);
            };

            URLLoaderTest.prototype.ioError = function (e) {
                var imgLoader = e.target;
                console.log('ioError', imgLoader.url);
            };

            URLLoaderTest.prototype.abortError = function (e) {
                var imgLoader = e.target;
                console.log('abortError', imgLoader.url);
            };
            return URLLoaderTest;
        })();
        net.URLLoaderTest = URLLoaderTest;
    })(tests.net || (tests.net = {}));
    var net = tests.net;
})(tests || (tests = {}));
//# sourceMappingURL=IMGLoaderTest.js.map
