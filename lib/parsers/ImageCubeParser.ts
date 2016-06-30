import {BitmapImage2D}			from "../image/BitmapImage2D";
import {BitmapImageCube}			from "../image/BitmapImageCube";
import {IAsset}					from "../library/IAsset";
import {URLLoaderDataFormat}		from "../net/URLLoaderDataFormat";
import {URLRequest}				from "../net/URLRequest";
import {ParserBase}				from "../parsers/ParserBase";
import {ResourceDependency}		from "../parsers/ResourceDependency";

/**
 * ImageCubeParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
 * a loader object, it wraps it in a BitmapImage2DResource so resource management can happen consistently without
 * exception cases.
 */
export class ImageCubeParser extends ParserBase
{
	private static posX:string = 'posX';
	private static negX:string = 'negX';
	private static posY:string = 'posY';
	private static negY:string = 'negY';
	private static posZ:string = 'posZ';
	private static negZ:string = 'negZ';

	private _imgDependencyDictionary:Object;

	/**
	 * Creates a new ImageCubeParser object.
	 * @param uri The url or id of the data or file to be parsed.
	 * @param extra The holder for extra contextual data that the parser might need.
	 */
	constructor()
	{
		super(URLLoaderDataFormat.TEXT);
	}

	/**
	 * Indicates whether or not a given file extension is supported by the parser.
	 * @param extension The file extension of a potential file to be parsed.
	 * @return Whether or not the given file type is supported.
	 */

	public static supportsType(extension:string):boolean
	{
		extension = extension.toLowerCase();
		return extension == "cube";
	}

	/**
	 * Tests whether a data block can be parsed by the parser.
	 * @param data The data block to potentially be parsed.
	 * @return Whether or not the given data is supported.
	 */
	public static supportsData(data:any):boolean
	{
		try {
			var obj = JSON.parse(data);

			if (obj)
				return true;

			return false;
		} catch (e) {
			return false;
		}
	}

	/**
	 * @inheritDoc
	 */
	public _iResolveDependency(resourceDependency:ResourceDependency):void
	{

	}

	/**
	 * @inheritDoc
	 */
	public _iResolveDependencyFailure(resourceDependency:ResourceDependency):void
	{

	}

	/**
	 * @inheritDoc
	 */
	public _pProceedParsing():boolean
	{
		if (this._imgDependencyDictionary != null) { //all images loaded
			var asset:BitmapImageCube = new BitmapImageCube(this._getBitmapImage2D(ImageCubeParser.posX).width);

			asset.draw(BitmapImageCube.posX, this._getBitmapImage2D(ImageCubeParser.posX));
			asset.draw(BitmapImageCube.negX, this._getBitmapImage2D(ImageCubeParser.negX));
			asset.draw(BitmapImageCube.posY, this._getBitmapImage2D(ImageCubeParser.posY));
			asset.draw(BitmapImageCube.negY, this._getBitmapImage2D(ImageCubeParser.negY));
			asset.draw(BitmapImageCube.posZ, this._getBitmapImage2D(ImageCubeParser.posZ));
			asset.draw(BitmapImageCube.negZ, this._getBitmapImage2D(ImageCubeParser.negZ));

			//clear dictionary
			this._imgDependencyDictionary = null;

			asset.name = this._iFileName;

			this._pFinalizeAsset(<IAsset> asset, this._iFileName);

			return ParserBase.PARSING_DONE;
		}

		try {
			var json:any = JSON.parse(this.data);
			var data:Array<Object> = <Array<Object>> json.data;
			var rec:any;

			if (data.length != 6)
				this._pDieWithError('ImageCubeParser: Error - cube texture should have exactly 6 images');

			if (json) {
				this._imgDependencyDictionary = new Object();

				for (var c:number = 0; c < data.length; c++) {
					rec = data[c];
					this._imgDependencyDictionary[rec.id] = this._pAddDependency(rec.id, new URLRequest(rec.image.toString()));
				}

				if (!this._validateCubeData()) {

					this._pDieWithError("ImageCubeParser: JSON data error - cubes require id of:   \n" + ImageCubeParser.posX + ', ' + ImageCubeParser.negX + ',  \n' + ImageCubeParser.posY + ', ' + ImageCubeParser.negY + ',  \n' + ImageCubeParser.posZ + ', ' + ImageCubeParser.negZ);

					return ParserBase.PARSING_DONE;

				}

				this._pPauseAndRetrieveDependencies();

				return ParserBase.MORE_TO_PARSE;
			}
		} catch (e) {
			this._pDieWithError('CubeTexturePaser Error parsing JSON');
		}

		return ParserBase.PARSING_DONE;

	}

	private _validateCubeData():boolean
	{
		return  ( this._imgDependencyDictionary[ ImageCubeParser.posX ] != null && this._imgDependencyDictionary[ ImageCubeParser.negX ] != null && this._imgDependencyDictionary[ ImageCubeParser.posY ] != null && this._imgDependencyDictionary[ ImageCubeParser.negY ] != null && this._imgDependencyDictionary[ ImageCubeParser.posZ ] != null && this._imgDependencyDictionary[ ImageCubeParser.negZ ] != null );
	}

	private _getBitmapImage2D(name:string):BitmapImage2D
	{
		var dependency:ResourceDependency = <ResourceDependency> this._imgDependencyDictionary[ name ];

		if (dependency)
			return <BitmapImage2D> dependency.assets[0];

		return null;
	}

}