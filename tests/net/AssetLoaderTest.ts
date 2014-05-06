///<reference path="../../build/awayjs-core.next.d.ts" />
///<reference path="../parsers/JSONTextureParser.ts" />

module tests.net
{
	import AssetEvent			= away.events.AssetEvent;
	import LoaderEvent			= away.events.LoaderEvent;
	import ParserEvent			= away.events.ParserEvent;
	import AssetLoader			= away.net.AssetLoader;
	import AssetLoaderToken		= away.net.AssetLoaderToken;
	import URLRequest			= away.net.URLRequest;
	import Delegate				= away.utils.Delegate;

    export class AssetLoaderTest
    {

        private alJson          : AssetLoader;
        private alImage         : AssetLoader;
        private alErrorImage    : AssetLoader;

        constructor()
        {

            //---------------------------------------------------------------------------------------------------------------------
            // Enable Custom Parser ( JSON file format with multiple texture dependencies )
            AssetLoader.enableParser( parsers.JSONTextureParser );

            var token : AssetLoaderToken;
            var urlRq : URLRequest;

            //---------------------------------------------------------------------------------------------------------------------
            // LOAD A SINGLE IMAGE

            this.alImage  = new AssetLoader();
            urlRq         = new URLRequest('assets/1024x1024.png');
            token         = this.alImage.load( urlRq );

            token.addEventListener( AssetEvent.ASSET_COMPLETE, Delegate.create(this, this.onAssetComplete) );
            token.addEventListener( AssetEvent.TEXTURE_SIZE_ERROR, Delegate.create(this, this.onTextureSizeError) );

            //---------------------------------------------------------------------------------------------------------------------
            // LOAD A SINGLE IMAGE - With wrong dimensions

            this.alErrorImage    = new AssetLoader();
            urlRq                = new URLRequest('assets/2.png');
            token                = this.alErrorImage.load( urlRq );

            token.addEventListener( AssetEvent.ASSET_COMPLETE, Delegate.create(this, this.onAssetComplete) );
            token.addEventListener( AssetEvent.TEXTURE_SIZE_ERROR, Delegate.create(this, this.onTextureSizeError) );

            //---------------------------------------------------------------------------------------------------------------------
            // LOAD WITH A JSON PARSER

            this.alJson    = new AssetLoader();
            urlRq          = new URLRequest('assets/JSNParserTest.json');
            token          = this.alJson.load( urlRq );

            token.addEventListener( AssetEvent.ASSET_COMPLETE, Delegate.create(this, this.onAssetComplete) );
            token.addEventListener( AssetEvent.TEXTURE_SIZE_ERROR, Delegate.create(this, this.onTextureSizeError) );
            token.addEventListener( ParserEvent.PARSE_COMPLETE, Delegate.create(this, this.onParseComplete) );

        }

        public onParseComplete ( e : ParserEvent ) : void
        {

            console.log( '--------------------------------------------------------------------------------');
            console.log( 'AssetLoaderTest.onParseComplete' , e );
            console.log( '--------------------------------------------------------------------------------');
        }

        public onTextureSizeError ( e : AssetEvent ) : void
        {

            var assetLoader : AssetLoader = <AssetLoader> e.target;

            console.log( '--------------------------------------------------------------------------------');
            console.log( 'AssetLoaderTest.onTextureSizeError' , assetLoader.baseDependency._iLoader.url , e );
            console.log( '--------------------------------------------------------------------------------');

        }

        public onAssetComplete ( e : AssetEvent ) : void
        {

            var assetLoader : AssetLoader = <AssetLoader> e.target;

            console.log( '--------------------------------------------------------------------------------');
            console.log( 'AssetLoaderTest.onAssetComplete', assetLoader.baseDependency._iLoader.url , e );
            console.log( '--------------------------------------------------------------------------------');

        }
    }


}
