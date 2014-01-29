///<reference path="../../build/AME.next.d.ts" />
///<reference path="../parsers/JSONTextureParser.ts" />

module tests.library
{
	import AssetEvent			= away.events.AssetEvent;
	import LoaderEvent			= away.events.LoaderEvent;
	import ParserEvent			= away.events.ParserEvent;
	import AssetLibrary			= away.library.AssetLibrary;
	import AssetLoader			= away.net.AssetLoader;
	import AssetLoaderToken		= away.net.AssetLoaderToken;
	import URLRequest			= away.net.URLRequest;
	import Delegate				= away.utils.Delegate;

    export class AssetLibraryTest //extends away.events.EventDispatcher
    {

        private height : number = 0;

        private token : AssetLoaderToken;
        constructor()
        {

            var len = 10;

            for (var i : number = len-1; i >= 0; i--)
            {

                console.log( i );

            }

            AssetLibrary.enableParser( parsers.JSONTextureParser) ;

            this.token = AssetLibrary.load(new URLRequest('assets/JSNParserTest.json') );
            this.token.addEventListener( away.events.LoaderEvent.RESOURCE_COMPLETE , Delegate.create(this, this.onResourceComplete) );
            this.token.addEventListener(away.events.AssetEvent.ASSET_COMPLETE , Delegate.create(this, this.onAssetComplete) );

            this.token = AssetLibrary.load(new URLRequest('assets/1024x1024.png') );
            this.token.addEventListener( away.events.LoaderEvent.RESOURCE_COMPLETE , Delegate.create(this, this.onResourceComplete) );
            this.token.addEventListener(away.events.AssetEvent.ASSET_COMPLETE , Delegate.create(this, this.onAssetComplete) );

        }

        public onAssetComplete ( e : away.events.AssetEvent )
        {

            console.log( '------------------------------------------------------------------------------');
            console.log( 'away.events.AssetEvent.ASSET_COMPLETE' , AssetLibrary.getAsset(e.asset.name) );
            console.log( '------------------------------------------------------------------------------');

            var htmlImageElementTexture : away.textures.HTMLImageElementTexture = <away.textures.HTMLImageElementTexture> AssetLibrary.getAsset(e.asset.name);

            document.body.appendChild( htmlImageElementTexture.htmlImageElement );

            htmlImageElementTexture.htmlImageElement.style.position = 'absolute';
            htmlImageElementTexture.htmlImageElement.style.top = this.height + 'px';


            this.height += ( htmlImageElementTexture.htmlImageElement.height + 10 ) ;

        }
        public onResourceComplete ( e : away.events.LoaderEvent )
        {

            var loader : AssetLoader = <AssetLoader> e.target;

            console.log( '------------------------------------------------------------------------------');
            console.log( 'away.events.LoaderEvent.RESOURCE_COMPLETE' , e  );
            console.log( '------------------------------------------------------------------------------');

        }

    }

}
