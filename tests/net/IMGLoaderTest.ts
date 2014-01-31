///<reference path="../../build/AME.next.d.ts" />

module tests.net
{
	import Delegate				= away.utils.Delegate;

    export class URLLoaderTest
    {

        private pngLoader       : away.net.URLLoader;
        private jpgLoader       : away.net.URLLoader;
        private noAnImageLoader : away.net.URLLoader;
        private wrongURLLoader  : away.net.URLLoader;

        constructor()
        {

            //-----------------------------------------------------------------------------------------------
            // load a png
            //-----------------------------------------------------------------------------------------------

            var pngURLrq            = new away.net.URLRequest( 'assets/2.png');

            this.pngLoader          = new away.net.URLLoader();
			this.pngLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
            this.pngLoader.addEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.pngLoaderComplete) );
            this.pngLoader.addEventListener( away.events.IOErrorEvent.IO_ERROR , Delegate.create(this, this.ioError) );
            this.pngLoader.load( pngURLrq );

            //-----------------------------------------------------------------------------------------------
            // Load a jpg
            //-----------------------------------------------------------------------------------------------

            var jpgURLrq            = new away.net.URLRequest( 'assets/1.jpg');

            this.jpgLoader          = new away.net.URLLoader();
			this.jpgLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
            this.jpgLoader.addEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.jpgLoaderComplete) );
            this.jpgLoader.addEventListener( away.events.IOErrorEvent.IO_ERROR , Delegate.create(this, this.ioError) );
            this.jpgLoader.load( jpgURLrq );

            //-----------------------------------------------------------------------------------------------
            // Load file of wrong format
            //-----------------------------------------------------------------------------------------------

            var notURLrq            = new away.net.URLRequest( 'assets/data.txt');

            this.noAnImageLoader    = new away.net.URLLoader();
			this.noAnImageLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
            this.noAnImageLoader.addEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.noAnImageLoaderComplete) );
            this.noAnImageLoader.addEventListener( away.events.IOErrorEvent.IO_ERROR , Delegate.create(this, this.ioError) );
            this.noAnImageLoader.load( notURLrq )

            //-----------------------------------------------------------------------------------------------
            // Load image that does not exist
            //-----------------------------------------------------------------------------------------------

            var wrongURLrq            = new away.net.URLRequest( 'assets/iDontExist.png');

            this.wrongURLLoader     = new away.net.URLLoader();
			this.wrongURLLoader.dataFormat = away.net.URLLoaderDataFormat.BLOB;
            this.wrongURLLoader.addEventListener( away.events.Event.COMPLETE , Delegate.create(this, this.wrongURLLoaderComplete) );
            this.wrongURLLoader.addEventListener( away.events.IOErrorEvent.IO_ERROR , Delegate.create(this, this.ioError) );
            this.wrongURLLoader.load( wrongURLrq );
        }

        private pngLoaderComplete ( e : away.events.Event ) : void
        {

            this.logSuccessfullLoad( e );


            var imgLoader : away.net.URLLoader = <away.net.URLLoader> e.target;
            document.body.appendChild( away.parsers.ParserUtils.blobToImage(imgLoader.data) );

        }

        private jpgLoaderComplete ( e : away.events.Event ) : void
        {

            this.logSuccessfullLoad( e );

            var imgLoader : away.net.URLLoader = <away.net.URLLoader> e.target;
            document.body.appendChild( away.parsers.ParserUtils.blobToImage(imgLoader.data) );

        }

        private noAnImageLoaderComplete ( e : away.events.Event ) : void
        {

            this.logSuccessfullLoad( e );

        }

        private wrongURLLoaderComplete ( e : away.events.Event ) : void
        {

            this.logSuccessfullLoad( e );

        }

        private logSuccessfullLoad( e : away.events.Event) : void
        {

            var imgLoader : away.net.URLLoader = <away.net.URLLoader> e.target;
            console.log( 'IMG.Event.Complete' , imgLoader.url );

        }

        private ioError ( e : away.events.IOErrorEvent ) : void
        {

            var imgLoader : away.net.URLLoader = <away.net.URLLoader> e.target;
            console.log( 'ioError' , imgLoader.url );

        }

        private abortError ( e : away.events.Event ) : void
        {

            var imgLoader : away.net.URLLoader = <away.net.URLLoader> e.target;
            console.log( 'abortError' , imgLoader.url );

        }


    }
}
