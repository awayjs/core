///<reference path="../../build/AME.next.d.ts" />
///<reference path="../parsers/JSONTextureParser.ts" />

module tests.net {

    export class AssetLoaderTest //extends away.events.EventDispatcher
    {

        private alJson          : away.net.AssetLoader;
        private alImage         : away.net.AssetLoader;
        private alErrorImage    : away.net.AssetLoader;

        constructor()
        {

            //---------------------------------------------------------------------------------------------------------------------
            // Enable Custom Parser ( JSON file format with multiple texture dependencies )
            away.net.AssetLoader.enableParser( parsers.JSONTextureParser );

            var token : away.net.AssetLoaderToken;
            var urlRq : away.net.URLRequest;

            //---------------------------------------------------------------------------------------------------------------------
            // LOAD A SINGLE IMAGE

            this.alImage  = new away.net.AssetLoader();
            urlRq         = new away.net.URLRequest('assets/1024x1024.png');
            token         = this.alImage.load( urlRq );

            token.addEventListener( away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete , this );
            token.addEventListener( away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError , this );

            //---------------------------------------------------------------------------------------------------------------------
            // LOAD A SINGLE IMAGE - With wrong dimensions

            this.alErrorImage    = new away.net.AssetLoader();
            urlRq                = new away.net.URLRequest('assets/2.png');
            token                = this.alErrorImage.load( urlRq );

            token.addEventListener( away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete , this );
            token.addEventListener( away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError , this );

            //---------------------------------------------------------------------------------------------------------------------
            // LOAD WITH A JSON PARSER

            this.alJson    = new away.net.AssetLoader();
            urlRq          = new away.net.URLRequest('assets/JSNParserTest.json');
            token          = this.alJson.load( urlRq );

            token.addEventListener( away.events.AssetEvent.ASSET_COMPLETE, this.onAssetComplete , this );
            token.addEventListener( away.events.AssetEvent.TEXTURE_SIZE_ERROR, this.onTextureSizeError , this );
            token.addEventListener( away.events.ParserEvent.PARSE_COMPLETE, this.onParseComplete , this );

            token.addEventListener( away.events.LoaderEvent.DEPENDENCY_COMPLETE, this.onDependencyComplete , this );

        }

        public onDependencyComplete ( e : away.events.LoaderEvent ) : void
        {

            console.log( '--------------------------------------------------------------------------------');
            console.log( 'AssetLoaderTest.onDependencyComplete' , e );
            console.log( '--------------------------------------------------------------------------------');

        }

        public onParseComplete ( e : away.events.ParserEvent ) : void
        {

            console.log( '--------------------------------------------------------------------------------');
            console.log( 'AssetLoaderTest.onParseComplete' , e );
            console.log( '--------------------------------------------------------------------------------');
        }

        public onTextureSizeError ( e : away.events.AssetEvent ) : void
        {

            var assetLoader : away.net.AssetLoader = <away.net.AssetLoader> e.target;

            console.log( '--------------------------------------------------------------------------------');
            console.log( 'AssetLoaderTest.onTextureSizeError' , assetLoader.baseDependency._iLoader.url , e );
            console.log( '--------------------------------------------------------------------------------');

        }

        public onAssetComplete ( e : away.events.AssetEvent ) : void
        {

            var assetLoader : away.net.AssetLoader = <away.net.AssetLoader> e.target;

            console.log( '--------------------------------------------------------------------------------');
            console.log( 'AssetLoaderTest.onAssetComplete', assetLoader.baseDependency._iLoader.url , e );
            console.log( '--------------------------------------------------------------------------------');

        }
    }


}
