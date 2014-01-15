///<reference path="../../build/AME.next.d.ts" />
var tests;
(function (tests) {
    (function (net) {
        var Delegate = away.utils.Delegate;

        var LoaderTest = (function () {
            function LoaderTest() {
                console.log('start');

                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                // POST URL Variables to PHP script
                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                this.urlLoaderPostURLVars = new away.net.URLLoader();
                this.urlLoaderPostURLVars.dataFormat = away.net.URLLoaderDataFormat.VARIABLES;

                var urlStr = 'fname=karim&lname=' + Math.floor(Math.random() * 100);
                var urlVars = new away.net.URLVariables(urlStr);

                var req = new away.net.URLRequest('assets/saveData.php');
                req.method = away.net.URLRequestMethod.POST;
                req.data = urlVars;

                this.urlLoaderPostURLVars.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.postURLTestComplete));
                this.urlLoaderPostURLVars.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.ioError));
                this.urlLoaderPostURLVars.load(req);

                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                // GET CSV File
                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                var csrReq = new away.net.URLRequest('assets/airports.csv');

                this.urlLoaderGetCSV = new away.net.URLLoader();
                this.urlLoaderGetCSV.dataFormat = away.net.URLLoaderDataFormat.TEXT;
                this.urlLoaderGetCSV.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.getCsvComplete));
                this.urlLoaderGetCSV.addEventListener(away.events.Event.OPEN, Delegate.create(this, this.getCsvOpen));
                this.urlLoaderGetCSV.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.ioError));
                this.urlLoaderGetCSV.load(csrReq);

                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                // ERROR test - load a non-existing object
                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                var errorReq = new away.net.URLRequest('assets/generatingError');

                this.urlLoaderErrorTest = new away.net.URLLoader();
                this.urlLoaderErrorTest.dataFormat = away.net.URLLoaderDataFormat.TEXT;
                this.urlLoaderErrorTest.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.errorComplete));
                this.urlLoaderErrorTest.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.ioError));
                this.urlLoaderErrorTest.addEventListener(away.events.HTTPStatusEvent.HTTP_STATUS, Delegate.create(this, this.httpStatusChange));
                this.urlLoaderErrorTest.load(errorReq);

                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                // GET URL Vars - get URL variables
                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                var csrReq = new away.net.URLRequest('assets/getUrlVars.php');

                this.urlLoaderGetURLVars = new away.net.URLLoader();
                this.urlLoaderGetURLVars.dataFormat = away.net.URLLoaderDataFormat.VARIABLES;
                this.urlLoaderGetURLVars.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.ioError));
                this.urlLoaderGetURLVars.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.getURLVarsComplete));
                this.urlLoaderGetURLVars.load(csrReq);

                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                // LOAD Binary file
                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                var binReq = new away.net.URLRequest('assets/suzanne.awd');

                this.urlLoaderBinary = new away.net.URLLoader();
                this.urlLoaderBinary.dataFormat = away.net.URLLoaderDataFormat.BINARY;
                this.urlLoaderBinary.addEventListener(away.events.IOErrorEvent.IO_ERROR, Delegate.create(this, this.ioError));
                this.urlLoaderBinary.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.binFileLoaded));
                this.urlLoaderBinary.load(binReq);

                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                // LOAD Blob file
                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                var blobReq = new away.net.URLRequest('assets/2.png');

                this.urlLoaderBlob = new away.net.URLLoader();
                this.urlLoaderBlob.dataFormat = away.net.URLLoaderDataFormat.BLOB;
                this.urlLoaderBlob.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.blobFileLoaded));
                this.urlLoaderBlob.load(blobReq);

                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                // ARRAY_BUFFER Test
                //---------------------------------------------------------------------------------------------------------------------------------------------------------
                var arrBReq = new away.net.URLRequest('assets/1.jpg');

                this.urlLoaderArrb = new away.net.URLLoader();
                this.urlLoaderArrb.dataFormat = away.net.URLLoaderDataFormat.ARRAY_BUFFER;
                this.urlLoaderArrb.addEventListener(away.events.Event.COMPLETE, Delegate.create(this, this.arrayBufferLoaded));
                this.urlLoaderArrb.load(arrBReq);
            }
            LoaderTest.prototype.arrayBufferLoaded = function (event) {
                var arrayBuffer = this.urlLoaderArrb.data;
                var byteArray = new Uint8Array(arrayBuffer);

                console.log('LoaderTest.arrayBufferLoaded', byteArray[1]);

                for (var i = 0; i < byteArray.byteLength; i++) {
                    //console.log( byteArray[i] );
                }
            };

            LoaderTest.prototype.blobFileLoaded = function (event) {
                var blob = new Blob([this.urlLoaderBlob.data], { type: 'image/png' });
                var img = document.createElement('img');
                img.src = this.createObjectURL(blob); //window['URL']['createObjectURL'](blob);
                img.onload = function (e) {
                    window['URL']['revokeObjectURL'](img.src); // Clean up after yourself.
                };

                console.log('LoaderTest.blobFileLoaded', blob);

                document.body.appendChild(img);
            };

            LoaderTest.prototype.createObjectURL = function (fileBlob) {
                // For some reason TypeScript has "window.URL.createObjectURL" in it's dictionary -
                // but window.URL causes an error
                // cannot make my own .d.ts file either ( results in duplicate definition error )
                // This HACK gets it to work: window['URL']['createObjectURL']
                if (window['URL']) {
                    if (window['URL']['createObjectURL']) {
                        return window['URL']['createObjectURL'](fileBlob);
                    }
                } else {
                    if (window['webkitURL']) {
                        return window['webkitURL']['createObjectURL'](fileBlob);
                    }
                }

                return null;
            };

            LoaderTest.prototype.binFileLoaded = function (event) {
                var loader = event.target;
                console.log('LoaderTest.binFileLoaded', loader.data.length);
            };

            LoaderTest.prototype.getURLVarsComplete = function (event) {
                var loader = event.target;
                console.log('LoaderTest.getURLVarsComplete', loader.data);
            };

            LoaderTest.prototype.httpStatusChange = function (event) {
                console.log('LoaderTest.httpStatusChange', event.status);
            };

            LoaderTest.prototype.ioError = function (event) {
                var loader = event.target;
                console.log('LoaderTest.ioError', loader.request.url);
            };

            LoaderTest.prototype.errorComplete = function (event) {
                var loader = event.target;
                console.log('LoaderTest.errorComplete'); //, loader.data );
            };

            LoaderTest.prototype.postURLTestComplete = function (event) {
                var loader = event.target;
                console.log('LoaderTest.postURLTestComplete', loader.data);
            };

            LoaderTest.prototype.getCsvComplete = function (event) {
                var loader = event.target;
                console.log('LoaderTest.getCsvComplete'); //, loader.data );
            };

            LoaderTest.prototype.getCsvOpen = function (event) {
                var loader = event.target;
                console.log('LoaderTest.getCsvOpen');
            };
            return LoaderTest;
        })();
        net.LoaderTest = LoaderTest;
    })(tests.net || (tests.net = {}));
    var net = tests.net;
})(tests || (tests = {}));
//# sourceMappingURL=URLLoaderTests.js.map
