import {EventDispatcher}			from "../events/EventDispatcher";
import {Loader}					from "../library/Loader";
import {AssetBase}				from "../library/AssetBase";
import {ByteArray}				from "../utils/ByteArray";

/**
 * The LoaderInfo export class provides information about a loaded SWF file or a
 * loaded image file(JPEG, GIF, or PNG). LoaderInfo objects are available for
 * any display object. The information provided includes load progress, the
 * URLs of the loader and loaded content, the number of bytes total for the
 * media, and the nominal height and width of the media.
 *
 * <p>You can access LoaderInfo objects in two ways: </p>
 *
 * <ul>
 *   <li>The <code>contentLoaderInfo</code> property of a flash.display.Loader
 * object -  The <code>contentLoaderInfo</code> property is always available
 * for any Loader object. For a Loader object that has not called the
 * <code>load()</code> or <code>loadBytes()</code> method, or that has not
 * sufficiently loaded, attempting to access many of the properties of the
 * <code>contentLoaderInfo</code> property throws an error.</li>
 *   <li>The <code>loaderInfo</code> property of a display object. </li>
 * </ul>
 *
 * <p>The <code>contentLoaderInfo</code> property of a Loader object provides
 * information about the content that the Loader object is loading, whereas
 * the <code>loaderInfo</code> property of a DisplayObject provides
 * information about the root SWF file for that display object. </p>
 *
 * <p>When you use a Loader object to load a display object(such as a SWF
 * file or a bitmap), the <code>loaderInfo</code> property of the display
 * object is the same as the <code>contentLoaderInfo</code> property of the
 * Loader object(<code>DisplayObject.loaderInfo =
 * Loader.contentLoaderInfo</code>). Because the instance of the main export class of
 * the SWF file has no Loader object, the <code>loaderInfo</code> property is
 * the only way to access the LoaderInfo for the instance of the main export class of
 * the SWF file.</p>
 *
 * <p>The following diagram shows the different uses of the LoaderInfo
 * object - for the instance of the main export class of the SWF file, for the
 * <code>contentLoaderInfo</code> property of a Loader object, and for the
 * <code>loaderInfo</code> property of a loaded object:</p>
 *
 * <p>When a loading operation is not complete, some properties of the
 * <code>contentLoaderInfo</code> property of a Loader object are not
 * available. You can obtain some properties, such as
 * <code>bytesLoaded</code>, <code>bytesTotal</code>, <code>url</code>,
 * <code>loaderURL</code>, and <code>applicationDomain</code>. When the
 * <code>loaderInfo</code> object dispatches the <code>init</code> event, you
 * can access all properties of the <code>loaderInfo</code> object and the
 * loaded image or SWF file.</p>
 *
 * <p><b>Note:</b> All properties of LoaderInfo objects are read-only.</p>
 *
 * <p>The <code>EventDispatcher.dispatchEvent()</code> method is not
 * applicable to LoaderInfo objects. If you call <code>dispatchEvent()</code>
 * on a LoaderInfo object, an IllegalOperationError exception is thrown.</p>
 * 
 * @event complete   Dispatched when data has loaded successfully. In other
 *                   words, it is dispatched when all the content has been
 *                   downloaded and the loading has finished. The
 *                   <code>complete</code> event is always dispatched after
 *                   the <code>init</code> event. The <code>init</code> event
 *                   is dispatched when the object is ready to access, though
 *                   the content may still be downloading.
 * @event httpStatus Dispatched when a network request is made over HTTP and
 *                   an HTTP status code can be detected.
 * @event init       Dispatched when the properties and methods of a loaded
 *                   SWF file are accessible and ready for use. The content,
 *                   however, can still be downloading. A LoaderInfo object
 *                   dispatches the <code>init</code> event when the following
 *                   conditions exist:
 *                   <ul>
 *                     <li>All properties and methods associated with the
 *                   loaded object and those associated with the LoaderInfo
 *                   object are accessible.</li>
 *                     <li>The constructors for all child objects have
 *                   completed.</li>
 *                     <li>All ActionScript code in the first frame of the
 *                   loaded SWF's main timeline has been executed.</li>
 *                   </ul>
 *
 *                   <p>For example, an <code>Event.INIT</code> is dispatched
 *                   when the first frame of a movie or animation is loaded.
 *                   The movie is then accessible and can be added to the
 *                   display list. The complete movie, however, can take
 *                   longer to download. The <code>Event.COMPLETE</code> is
 *                   only dispatched once the full movie is loaded.</p>
 *
 *                   <p>The <code>init</code> event always precedes the
 *                   <code>complete</code> event.</p>
 * @event ioError    Dispatched when an input or output error occurs that
 *                   causes a load operation to fail.
 * @event open       Dispatched when a load operation starts.
 * @event progress   Dispatched when data is received as the download
 *                   operation progresses.
 * @event unload     Dispatched by a LoaderInfo object whenever a loaded
 *                   object is removed by using the <code>unload()</code>
 *                   method of the Loader object, or when a second load is
 *                   performed by the same Loader object and the original
 *                   content is removed prior to the load beginning.
 */
export class LoaderInfo extends EventDispatcher
{
	private _bytes:ByteArray;
	private _bytesLoaded:number;
	private _bytesTotal:number;
	private _content:AssetBase;
	private _contentType:string;
	private _loader:Loader;
	private _url:string;
	/**
	 * The bytes associated with a LoaderInfo object.
	 * 
	 * @throws SecurityError If the object accessing this API is prevented from
	 *                       accessing the loaded object due to security
	 *                       restrictions. This situation can occur, for
	 *                       instance, when a Loader object attempts to access
	 *                       the <code>contentLoaderInfo.content</code> property
	 *                       and it is not granted security permission to access
	 *                       the loaded content.
	 *
	 *                       <p>For more information related to security, see the
	 *                       Flash Player Developer Center Topic: <a
	 *                       href="http://www.adobe.com/go/devnet_security_en"
	 *                       scope="external">Security</a>.</p>
	 */
	public get bytes():ByteArray
	{
		return this._bytes;
	}

	/**
	 * The number of bytes that are loaded for the media. When this number equals
	 * the value of <code>bytesTotal</code>, all of the bytes are loaded.
	 */
	public get bytesLoaded():number /*int*/
	{
		return this._bytesLoaded;
	}

	/**
	 * The number of compressed bytes in the entire media file.
	 *
	 * <p>Before the first <code>progress</code> event is dispatched by this
	 * LoaderInfo object's corresponding Loader object, <code>bytesTotal</code>
	 * is 0. After the first <code>progress</code> event from the Loader object,
	 * <code>bytesTotal</code> reflects the actual number of bytes to be
	 * downloaded.</p>
	 */
	public get bytesTotal():number /*int*/
	{
		return this._bytesTotal;
	}

	/**
	 * The loaded object associated with this LoaderInfo object.
	 * 
	 * @throws SecurityError If the object accessing this API is prevented from
	 *                       accessing the loaded object due to security
	 *                       restrictions. This situation can occur, for
	 *                       instance, when a Loader object attempts to access
	 *                       the <code>contentLoaderInfo.content</code> property
	 *                       and it is not granted security permission to access
	 *                       the loaded content.
	 *
	 *                       <p>For more information related to security, see the
	 *                       Flash Player Developer Center Topic: <a
	 *                       href="http://www.adobe.com/go/devnet_security_en"
	 *                       scope="external">Security</a>.</p>
	 */
	public get content():AssetBase
	{
		return this._content;
	}

	/**
	 * The MIME type of the loaded file. The value is <code>null</code> if not
	 * enough of the file has loaded in order to determine the type. The
	 * following list gives the possible values:
	 * <ul>
	 *   <li><code>"application/x-shockwave-flash"</code></li>
	 *   <li><code>"image/jpeg"</code></li>
	 *   <li><code>"image/gif"</code></li>
	 *   <li><code>"image/png"</code></li>
	 * </ul>
	 */
	public get contentType():string
	{
		return this._contentType;
	}

	/**
	 * The Loader object associated with this LoaderInfo object. If this
	 * LoaderInfo object is the <code>loaderInfo</code> property of the instance
	 * of the main export class of the SWF file, no Loader object is associated.
	 * 
	 * @throws SecurityError If the object accessing this API is prevented from
	 *                       accessing the Loader object because of security
	 *                       restrictions. This can occur, for instance, when a
	 *                       loaded SWF file attempts to access its
	 *                       <code>loaderInfo.loader</code> property and it is
	 *                       not granted security permission to access the
	 *                       loading SWF file.
	 *
	 *                       <p>For more information related to security, see the
	 *                       Flash Player Developer Center Topic: <a
	 *                       href="http://www.adobe.com/go/devnet_security_en"
	 *                       scope="external">Security</a>.</p>
	 */
	public get loader():Loader
	{
		return this._loader;
	}

	/**
	 * The URL of the media being loaded.
	 *
	 * <p>Before the first <code>progress</code> event is dispatched by this
	 * LoaderInfo object's corresponding Loader object, the value of the
	 * <code>url</code> property might reflect only the initial URL specified in
	 * the call to the <code>load()</code> method of the Loader object. After the
	 * first <code>progress</code> event, the <code>url</code> property reflects
	 * the media's final URL, after any redirects and relative URLs are
	 * resolved.</p>
	 *
	 * <p>In some cases, the value of the <code>url</code> property is truncated;
	 * see the <code>isURLInaccessible</code> property for details.</p>
	 */
	public get url():string
	{
		return this._url;
	}
}