var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");

/**
* The LoaderInfo class provides information about a loaded SWF file or a
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
* Loader.contentLoaderInfo</code>). Because the instance of the main class of
* the SWF file has no Loader object, the <code>loaderInfo</code> property is
* the only way to access the LoaderInfo for the instance of the main class of
* the SWF file.</p>
*
* <p>The following diagram shows the different uses of the LoaderInfo
* object - for the instance of the main class of the SWF file, for the
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
var LoaderInfo = (function (_super) {
    __extends(LoaderInfo, _super);
    function LoaderInfo() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(LoaderInfo.prototype, "bytes", {
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
        get: function () {
            return this._bytes;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LoaderInfo.prototype, "bytesLoaded", {
        /**
        * The number of bytes that are loaded for the media. When this number equals
        * the value of <code>bytesTotal</code>, all of the bytes are loaded.
        */
        get: function () {
            return this._bytesLoaded;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LoaderInfo.prototype, "bytesTotal", {
        /**
        * The number of compressed bytes in the entire media file.
        *
        * <p>Before the first <code>progress</code> event is dispatched by this
        * LoaderInfo object's corresponding Loader object, <code>bytesTotal</code>
        * is 0. After the first <code>progress</code> event from the Loader object,
        * <code>bytesTotal</code> reflects the actual number of bytes to be
        * downloaded.</p>
        */
        get: function () {
            return this._bytesTotal;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LoaderInfo.prototype, "content", {
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
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LoaderInfo.prototype, "contentType", {
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
        get: function () {
            return this._contentType;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LoaderInfo.prototype, "loader", {
        /**
        * The Loader object associated with this LoaderInfo object. If this
        * LoaderInfo object is the <code>loaderInfo</code> property of the instance
        * of the main class of the SWF file, no Loader object is associated.
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
        get: function () {
            return this._loader;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LoaderInfo.prototype, "url", {
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
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    return LoaderInfo;
})(EventDispatcher);

module.exports = LoaderInfo;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9Mb2FkZXJJbmZvLnRzIl0sIm5hbWVzIjpbIkxvYWRlckluZm8iLCJMb2FkZXJJbmZvLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1RUFFNkU7O0FBRzdFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnR0c7QUFDSDtJQUF5QkEsNkJBQWVBO0lBQXhDQTtRQUF5QkMsNkJBQWVBO0lBbUl4Q0EsQ0FBQ0E7QUFBQUQsSUExR0FBO1FBQUFBOzs7Ozs7Ozs7Ozs7Ozs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsTUFBTUE7UUFDbkJBLENBQUNBOzs7O0FBQUFBO0lBTURBO1FBQUFBOzs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsWUFBWUE7UUFDekJBLENBQUNBOzs7O0FBQUFBO0lBV0RBO1FBQUFBOzs7Ozs7OztVQURHQTthQUNIQTtZQUVDQSxPQUFPQSxJQUFJQSxDQUFDQSxXQUFXQTtRQUN4QkEsQ0FBQ0E7Ozs7QUFBQUE7SUFrQkRBO1FBQUFBOzs7Ozs7Ozs7Ozs7Ozs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUE7UUFDckJBLENBQUNBOzs7O0FBQUFBO0lBYURBO1FBQUFBOzs7Ozs7Ozs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLFlBQVlBO1FBQ3pCQSxDQUFDQTs7OztBQUFBQTtJQW9CREE7UUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTs7OztBQUFBQTtJQWdCREE7UUFBQUE7Ozs7Ozs7Ozs7Ozs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsSUFBSUE7UUFDakJBLENBQUNBOzs7O0FBQUFBLElBQ0ZBLGtCQUFDQTtBQUFEQSxDQUFDQSxFQW5Jd0IsZUFBZSxFQW1JdkM7O0FBRUQsMkJBQW9CLENBQUEiLCJmaWxlIjoiY29yZS9iYXNlL0xvYWRlckluZm8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9hZGVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb250YWluZXJzL0xvYWRlclwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xuaW1wb3J0IEJ5dGVBcnJheVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL0J5dGVBcnJheVwiKTtcblxuLyoqXG4gKiBUaGUgTG9hZGVySW5mbyBjbGFzcyBwcm92aWRlcyBpbmZvcm1hdGlvbiBhYm91dCBhIGxvYWRlZCBTV0YgZmlsZSBvciBhXG4gKiBsb2FkZWQgaW1hZ2UgZmlsZShKUEVHLCBHSUYsIG9yIFBORykuIExvYWRlckluZm8gb2JqZWN0cyBhcmUgYXZhaWxhYmxlIGZvclxuICogYW55IGRpc3BsYXkgb2JqZWN0LiBUaGUgaW5mb3JtYXRpb24gcHJvdmlkZWQgaW5jbHVkZXMgbG9hZCBwcm9ncmVzcywgdGhlXG4gKiBVUkxzIG9mIHRoZSBsb2FkZXIgYW5kIGxvYWRlZCBjb250ZW50LCB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRvdGFsIGZvciB0aGVcbiAqIG1lZGlhLCBhbmQgdGhlIG5vbWluYWwgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgbWVkaWEuXG4gKlxuICogPHA+WW91IGNhbiBhY2Nlc3MgTG9hZGVySW5mbyBvYmplY3RzIGluIHR3byB3YXlzOiA8L3A+XG4gKlxuICogPHVsPlxuICogICA8bGk+VGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIGZsYXNoLmRpc3BsYXkuTG9hZGVyXG4gKiBvYmplY3QgLSAgVGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gKiBmb3IgYW55IExvYWRlciBvYmplY3QuIEZvciBhIExvYWRlciBvYmplY3QgdGhhdCBoYXMgbm90IGNhbGxlZCB0aGVcbiAqIDxjb2RlPmxvYWQoKTwvY29kZT4gb3IgPGNvZGU+bG9hZEJ5dGVzKCk8L2NvZGU+IG1ldGhvZCwgb3IgdGhhdCBoYXMgbm90XG4gKiBzdWZmaWNpZW50bHkgbG9hZGVkLCBhdHRlbXB0aW5nIHRvIGFjY2VzcyBtYW55IG9mIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZVxuICogPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IHRocm93cyBhbiBlcnJvci48L2xpPlxuICogICA8bGk+VGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgZGlzcGxheSBvYmplY3QuIDwvbGk+XG4gKiA8L3VsPlxuICpcbiAqIDxwPlRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgYSBMb2FkZXIgb2JqZWN0IHByb3ZpZGVzXG4gKiBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY29udGVudCB0aGF0IHRoZSBMb2FkZXIgb2JqZWN0IGlzIGxvYWRpbmcsIHdoZXJlYXNcbiAqIHRoZSA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIERpc3BsYXlPYmplY3QgcHJvdmlkZXNcbiAqIGluZm9ybWF0aW9uIGFib3V0IHRoZSByb290IFNXRiBmaWxlIGZvciB0aGF0IGRpc3BsYXkgb2JqZWN0LiA8L3A+XG4gKlxuICogPHA+V2hlbiB5b3UgdXNlIGEgTG9hZGVyIG9iamVjdCB0byBsb2FkIGEgZGlzcGxheSBvYmplY3Qoc3VjaCBhcyBhIFNXRlxuICogZmlsZSBvciBhIGJpdG1hcCksIHRoZSA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgZGlzcGxheVxuICogb2JqZWN0IGlzIHRoZSBzYW1lIGFzIHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG4gKiBMb2FkZXIgb2JqZWN0KDxjb2RlPkRpc3BsYXlPYmplY3QubG9hZGVySW5mbyA9XG4gKiBMb2FkZXIuY29udGVudExvYWRlckluZm88L2NvZGU+KS4gQmVjYXVzZSB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1haW4gY2xhc3Mgb2ZcbiAqIHRoZSBTV0YgZmlsZSBoYXMgbm8gTG9hZGVyIG9iamVjdCwgdGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IGlzXG4gKiB0aGUgb25seSB3YXkgdG8gYWNjZXNzIHRoZSBMb2FkZXJJbmZvIGZvciB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1haW4gY2xhc3Mgb2ZcbiAqIHRoZSBTV0YgZmlsZS48L3A+XG4gKlxuICogPHA+VGhlIGZvbGxvd2luZyBkaWFncmFtIHNob3dzIHRoZSBkaWZmZXJlbnQgdXNlcyBvZiB0aGUgTG9hZGVySW5mb1xuICogb2JqZWN0IC0gZm9yIHRoZSBpbnN0YW5jZSBvZiB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgU1dGIGZpbGUsIGZvciB0aGVcbiAqIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIExvYWRlciBvYmplY3QsIGFuZCBmb3IgdGhlXG4gKiA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIGxvYWRlZCBvYmplY3Q6PC9wPlxuICpcbiAqIDxwPldoZW4gYSBsb2FkaW5nIG9wZXJhdGlvbiBpcyBub3QgY29tcGxldGUsIHNvbWUgcHJvcGVydGllcyBvZiB0aGVcbiAqIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIExvYWRlciBvYmplY3QgYXJlIG5vdFxuICogYXZhaWxhYmxlLiBZb3UgY2FuIG9idGFpbiBzb21lIHByb3BlcnRpZXMsIHN1Y2ggYXNcbiAqIDxjb2RlPmJ5dGVzTG9hZGVkPC9jb2RlPiwgPGNvZGU+Ynl0ZXNUb3RhbDwvY29kZT4sIDxjb2RlPnVybDwvY29kZT4sXG4gKiA8Y29kZT5sb2FkZXJVUkw8L2NvZGU+LCBhbmQgPGNvZGU+YXBwbGljYXRpb25Eb21haW48L2NvZGU+LiBXaGVuIHRoZVxuICogPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gb2JqZWN0IGRpc3BhdGNoZXMgdGhlIDxjb2RlPmluaXQ8L2NvZGU+IGV2ZW50LCB5b3VcbiAqIGNhbiBhY2Nlc3MgYWxsIHByb3BlcnRpZXMgb2YgdGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IG9iamVjdCBhbmQgdGhlXG4gKiBsb2FkZWQgaW1hZ2Ugb3IgU1dGIGZpbGUuPC9wPlxuICpcbiAqIDxwPjxiPk5vdGU6PC9iPiBBbGwgcHJvcGVydGllcyBvZiBMb2FkZXJJbmZvIG9iamVjdHMgYXJlIHJlYWQtb25seS48L3A+XG4gKlxuICogPHA+VGhlIDxjb2RlPkV2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KCk8L2NvZGU+IG1ldGhvZCBpcyBub3RcbiAqIGFwcGxpY2FibGUgdG8gTG9hZGVySW5mbyBvYmplY3RzLiBJZiB5b3UgY2FsbCA8Y29kZT5kaXNwYXRjaEV2ZW50KCk8L2NvZGU+XG4gKiBvbiBhIExvYWRlckluZm8gb2JqZWN0LCBhbiBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgZXhjZXB0aW9uIGlzIHRocm93bi48L3A+XG4gKiBcbiAqIEBldmVudCBjb21wbGV0ZSAgIERpc3BhdGNoZWQgd2hlbiBkYXRhIGhhcyBsb2FkZWQgc3VjY2Vzc2Z1bGx5LiBJbiBvdGhlclxuICogICAgICAgICAgICAgICAgICAgd29yZHMsIGl0IGlzIGRpc3BhdGNoZWQgd2hlbiBhbGwgdGhlIGNvbnRlbnQgaGFzIGJlZW5cbiAqICAgICAgICAgICAgICAgICAgIGRvd25sb2FkZWQgYW5kIHRoZSBsb2FkaW5nIGhhcyBmaW5pc2hlZC4gVGhlXG4gKiAgICAgICAgICAgICAgICAgICA8Y29kZT5jb21wbGV0ZTwvY29kZT4gZXZlbnQgaXMgYWx3YXlzIGRpc3BhdGNoZWQgYWZ0ZXJcbiAqICAgICAgICAgICAgICAgICAgIHRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudC4gVGhlIDxjb2RlPmluaXQ8L2NvZGU+IGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgICBpcyBkaXNwYXRjaGVkIHdoZW4gdGhlIG9iamVjdCBpcyByZWFkeSB0byBhY2Nlc3MsIHRob3VnaFxuICogICAgICAgICAgICAgICAgICAgdGhlIGNvbnRlbnQgbWF5IHN0aWxsIGJlIGRvd25sb2FkaW5nLlxuICogQGV2ZW50IGh0dHBTdGF0dXMgRGlzcGF0Y2hlZCB3aGVuIGEgbmV0d29yayByZXF1ZXN0IGlzIG1hZGUgb3ZlciBIVFRQIGFuZFxuICogICAgICAgICAgICAgICAgICAgYW4gSFRUUCBzdGF0dXMgY29kZSBjYW4gYmUgZGV0ZWN0ZWQuXG4gKiBAZXZlbnQgaW5pdCAgICAgICBEaXNwYXRjaGVkIHdoZW4gdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgb2YgYSBsb2FkZWRcbiAqICAgICAgICAgICAgICAgICAgIFNXRiBmaWxlIGFyZSBhY2Nlc3NpYmxlIGFuZCByZWFkeSBmb3IgdXNlLiBUaGUgY29udGVudCxcbiAqICAgICAgICAgICAgICAgICAgIGhvd2V2ZXIsIGNhbiBzdGlsbCBiZSBkb3dubG9hZGluZy4gQSBMb2FkZXJJbmZvIG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlcyB0aGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnQgd2hlbiB0aGUgZm9sbG93aW5nXG4gKiAgICAgICAgICAgICAgICAgICBjb25kaXRpb25zIGV4aXN0OlxuICogICAgICAgICAgICAgICAgICAgPHVsPlxuICogICAgICAgICAgICAgICAgICAgICA8bGk+QWxsIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgYXNzb2NpYXRlZCB3aXRoIHRoZVxuICogICAgICAgICAgICAgICAgICAgbG9hZGVkIG9iamVjdCBhbmQgdGhvc2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBMb2FkZXJJbmZvXG4gKiAgICAgICAgICAgICAgICAgICBvYmplY3QgYXJlIGFjY2Vzc2libGUuPC9saT5cbiAqICAgICAgICAgICAgICAgICAgICAgPGxpPlRoZSBjb25zdHJ1Y3RvcnMgZm9yIGFsbCBjaGlsZCBvYmplY3RzIGhhdmVcbiAqICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC48L2xpPlxuICogICAgICAgICAgICAgICAgICAgICA8bGk+QWxsIEFjdGlvblNjcmlwdCBjb2RlIGluIHRoZSBmaXJzdCBmcmFtZSBvZiB0aGVcbiAqICAgICAgICAgICAgICAgICAgIGxvYWRlZCBTV0YncyBtYWluIHRpbWVsaW5lIGhhcyBiZWVuIGV4ZWN1dGVkLjwvbGk+XG4gKiAgICAgICAgICAgICAgICAgICA8L3VsPlxuICpcbiAqICAgICAgICAgICAgICAgICAgIDxwPkZvciBleGFtcGxlLCBhbiA8Y29kZT5FdmVudC5JTklUPC9jb2RlPiBpcyBkaXNwYXRjaGVkXG4gKiAgICAgICAgICAgICAgICAgICB3aGVuIHRoZSBmaXJzdCBmcmFtZSBvZiBhIG1vdmllIG9yIGFuaW1hdGlvbiBpcyBsb2FkZWQuXG4gKiAgICAgICAgICAgICAgICAgICBUaGUgbW92aWUgaXMgdGhlbiBhY2Nlc3NpYmxlIGFuZCBjYW4gYmUgYWRkZWQgdG8gdGhlXG4gKiAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGxpc3QuIFRoZSBjb21wbGV0ZSBtb3ZpZSwgaG93ZXZlciwgY2FuIHRha2VcbiAqICAgICAgICAgICAgICAgICAgIGxvbmdlciB0byBkb3dubG9hZC4gVGhlIDxjb2RlPkV2ZW50LkNPTVBMRVRFPC9jb2RlPiBpc1xuICogICAgICAgICAgICAgICAgICAgb25seSBkaXNwYXRjaGVkIG9uY2UgdGhlIGZ1bGwgbW92aWUgaXMgbG9hZGVkLjwvcD5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICA8cD5UaGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnQgYWx3YXlzIHByZWNlZGVzIHRoZVxuICogICAgICAgICAgICAgICAgICAgPGNvZGU+Y29tcGxldGU8L2NvZGU+IGV2ZW50LjwvcD5cbiAqIEBldmVudCBpb0Vycm9yICAgIERpc3BhdGNoZWQgd2hlbiBhbiBpbnB1dCBvciBvdXRwdXQgZXJyb3Igb2NjdXJzIHRoYXRcbiAqICAgICAgICAgICAgICAgICAgIGNhdXNlcyBhIGxvYWQgb3BlcmF0aW9uIHRvIGZhaWwuXG4gKiBAZXZlbnQgb3BlbiAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBsb2FkIG9wZXJhdGlvbiBzdGFydHMuXG4gKiBAZXZlbnQgcHJvZ3Jlc3MgICBEaXNwYXRjaGVkIHdoZW4gZGF0YSBpcyByZWNlaXZlZCBhcyB0aGUgZG93bmxvYWRcbiAqICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbiBwcm9ncmVzc2VzLlxuICogQGV2ZW50IHVubG9hZCAgICAgRGlzcGF0Y2hlZCBieSBhIExvYWRlckluZm8gb2JqZWN0IHdoZW5ldmVyIGEgbG9hZGVkXG4gKiAgICAgICAgICAgICAgICAgICBvYmplY3QgaXMgcmVtb3ZlZCBieSB1c2luZyB0aGUgPGNvZGU+dW5sb2FkKCk8L2NvZGU+XG4gKiAgICAgICAgICAgICAgICAgICBtZXRob2Qgb2YgdGhlIExvYWRlciBvYmplY3QsIG9yIHdoZW4gYSBzZWNvbmQgbG9hZCBpc1xuICogICAgICAgICAgICAgICAgICAgcGVyZm9ybWVkIGJ5IHRoZSBzYW1lIExvYWRlciBvYmplY3QgYW5kIHRoZSBvcmlnaW5hbFxuICogICAgICAgICAgICAgICAgICAgY29udGVudCBpcyByZW1vdmVkIHByaW9yIHRvIHRoZSBsb2FkIGJlZ2lubmluZy5cbiAqL1xuY2xhc3MgTG9hZGVySW5mbyBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxue1xuXHRwcml2YXRlIF9ieXRlczpCeXRlQXJyYXk7XG5cdHByaXZhdGUgX2J5dGVzTG9hZGVkOm51bWJlcjtcblx0cHJpdmF0ZSBfYnl0ZXNUb3RhbDpudW1iZXI7XG5cdHByaXZhdGUgX2NvbnRlbnQ6RGlzcGxheU9iamVjdDtcblx0cHJpdmF0ZSBfY29udGVudFR5cGU6c3RyaW5nO1xuXHRwcml2YXRlIF9sb2FkZXI6TG9hZGVyO1xuXHRwcml2YXRlIF91cmw6c3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGJ5dGVzIGFzc29jaWF0ZWQgd2l0aCBhIExvYWRlckluZm8gb2JqZWN0LlxuXHQgKiBcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yIElmIHRoZSBvYmplY3QgYWNjZXNzaW5nIHRoaXMgQVBJIGlzIHByZXZlbnRlZCBmcm9tXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NpbmcgdGhlIGxvYWRlZCBvYmplY3QgZHVlIHRvIHNlY3VyaXR5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbnMuIFRoaXMgc2l0dWF0aW9uIGNhbiBvY2N1ciwgZm9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgd2hlbiBhIExvYWRlciBvYmplY3QgYXR0ZW1wdHMgdG8gYWNjZXNzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm8uY29udGVudDwvY29kZT4gcHJvcGVydHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCBpdCBpcyBub3QgZ3JhbnRlZCBzZWN1cml0eSBwZXJtaXNzaW9uIHRvIGFjY2Vzc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGxvYWRlZCBjb250ZW50LlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBzZWN1cml0eSwgc2VlIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgRmxhc2ggUGxheWVyIERldmVsb3BlciBDZW50ZXIgVG9waWM6IDxhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZGV2bmV0X3NlY3VyaXR5X2VuXCJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNjb3BlPVwiZXh0ZXJuYWxcIj5TZWN1cml0eTwvYT4uPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBieXRlcygpOkJ5dGVBcnJheVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2J5dGVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgYnl0ZXMgdGhhdCBhcmUgbG9hZGVkIGZvciB0aGUgbWVkaWEuIFdoZW4gdGhpcyBudW1iZXIgZXF1YWxzXG5cdCAqIHRoZSB2YWx1ZSBvZiA8Y29kZT5ieXRlc1RvdGFsPC9jb2RlPiwgYWxsIG9mIHRoZSBieXRlcyBhcmUgbG9hZGVkLlxuXHQgKi9cblx0cHVibGljIGdldCBieXRlc0xvYWRlZCgpOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYnl0ZXNMb2FkZWQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBjb21wcmVzc2VkIGJ5dGVzIGluIHRoZSBlbnRpcmUgbWVkaWEgZmlsZS5cblx0ICpcblx0ICogPHA+QmVmb3JlIHRoZSBmaXJzdCA8Y29kZT5wcm9ncmVzczwvY29kZT4gZXZlbnQgaXMgZGlzcGF0Y2hlZCBieSB0aGlzXG5cdCAqIExvYWRlckluZm8gb2JqZWN0J3MgY29ycmVzcG9uZGluZyBMb2FkZXIgb2JqZWN0LCA8Y29kZT5ieXRlc1RvdGFsPC9jb2RlPlxuXHQgKiBpcyAwLiBBZnRlciB0aGUgZmlyc3QgPGNvZGU+cHJvZ3Jlc3M8L2NvZGU+IGV2ZW50IGZyb20gdGhlIExvYWRlciBvYmplY3QsXG5cdCAqIDxjb2RlPmJ5dGVzVG90YWw8L2NvZGU+IHJlZmxlY3RzIHRoZSBhY3R1YWwgbnVtYmVyIG9mIGJ5dGVzIHRvIGJlXG5cdCAqIGRvd25sb2FkZWQuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBieXRlc1RvdGFsKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9ieXRlc1RvdGFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBsb2FkZWQgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGlzIExvYWRlckluZm8gb2JqZWN0LlxuXHQgKiBcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yIElmIHRoZSBvYmplY3QgYWNjZXNzaW5nIHRoaXMgQVBJIGlzIHByZXZlbnRlZCBmcm9tXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NpbmcgdGhlIGxvYWRlZCBvYmplY3QgZHVlIHRvIHNlY3VyaXR5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbnMuIFRoaXMgc2l0dWF0aW9uIGNhbiBvY2N1ciwgZm9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgd2hlbiBhIExvYWRlciBvYmplY3QgYXR0ZW1wdHMgdG8gYWNjZXNzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm8uY29udGVudDwvY29kZT4gcHJvcGVydHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCBpdCBpcyBub3QgZ3JhbnRlZCBzZWN1cml0eSBwZXJtaXNzaW9uIHRvIGFjY2Vzc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGxvYWRlZCBjb250ZW50LlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBzZWN1cml0eSwgc2VlIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgRmxhc2ggUGxheWVyIERldmVsb3BlciBDZW50ZXIgVG9waWM6IDxhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZGV2bmV0X3NlY3VyaXR5X2VuXCJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNjb3BlPVwiZXh0ZXJuYWxcIj5TZWN1cml0eTwvYT4uPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBjb250ZW50KCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIE1JTUUgdHlwZSBvZiB0aGUgbG9hZGVkIGZpbGUuIFRoZSB2YWx1ZSBpcyA8Y29kZT5udWxsPC9jb2RlPiBpZiBub3Rcblx0ICogZW5vdWdoIG9mIHRoZSBmaWxlIGhhcyBsb2FkZWQgaW4gb3JkZXIgdG8gZGV0ZXJtaW5lIHRoZSB0eXBlLiBUaGVcblx0ICogZm9sbG93aW5nIGxpc3QgZ2l2ZXMgdGhlIHBvc3NpYmxlIHZhbHVlczpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT48Y29kZT5cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCI8L2NvZGU+PC9saT5cblx0ICogICA8bGk+PGNvZGU+XCJpbWFnZS9qcGVnXCI8L2NvZGU+PC9saT5cblx0ICogICA8bGk+PGNvZGU+XCJpbWFnZS9naWZcIjwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5cImltYWdlL3BuZ1wiPC9jb2RlPjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvbnRlbnRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY29udGVudFR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIExvYWRlciBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgTG9hZGVySW5mbyBvYmplY3QuIElmIHRoaXNcblx0ICogTG9hZGVySW5mbyBvYmplY3QgaXMgdGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBpbnN0YW5jZVxuXHQgKiBvZiB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgU1dGIGZpbGUsIG5vIExvYWRlciBvYmplY3QgaXMgYXNzb2NpYXRlZC5cblx0ICogXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciBJZiB0aGUgb2JqZWN0IGFjY2Vzc2luZyB0aGlzIEFQSSBpcyBwcmV2ZW50ZWQgZnJvbVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzaW5nIHRoZSBMb2FkZXIgb2JqZWN0IGJlY2F1c2Ugb2Ygc2VjdXJpdHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9ucy4gVGhpcyBjYW4gb2NjdXIsIGZvciBpbnN0YW5jZSwgd2hlbiBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWQgU1dGIGZpbGUgYXR0ZW1wdHMgdG8gYWNjZXNzIGl0c1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bG9hZGVySW5mby5sb2FkZXI8L2NvZGU+IHByb3BlcnR5IGFuZCBpdCBpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbm90IGdyYW50ZWQgc2VjdXJpdHkgcGVybWlzc2lvbiB0byBhY2Nlc3MgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nIFNXRiBmaWxlLlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBzZWN1cml0eSwgc2VlIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgRmxhc2ggUGxheWVyIERldmVsb3BlciBDZW50ZXIgVG9waWM6IDxhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZGV2bmV0X3NlY3VyaXR5X2VuXCJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNjb3BlPVwiZXh0ZXJuYWxcIj5TZWN1cml0eTwvYT4uPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBsb2FkZXIoKTpMb2FkZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkZXI7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIFVSTCBvZiB0aGUgbWVkaWEgYmVpbmcgbG9hZGVkLlxuXHQgKlxuXHQgKiA8cD5CZWZvcmUgdGhlIGZpcnN0IDxjb2RlPnByb2dyZXNzPC9jb2RlPiBldmVudCBpcyBkaXNwYXRjaGVkIGJ5IHRoaXNcblx0ICogTG9hZGVySW5mbyBvYmplY3QncyBjb3JyZXNwb25kaW5nIExvYWRlciBvYmplY3QsIHRoZSB2YWx1ZSBvZiB0aGVcblx0ICogPGNvZGU+dXJsPC9jb2RlPiBwcm9wZXJ0eSBtaWdodCByZWZsZWN0IG9ubHkgdGhlIGluaXRpYWwgVVJMIHNwZWNpZmllZCBpblxuXHQgKiB0aGUgY2FsbCB0byB0aGUgPGNvZGU+bG9hZCgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIExvYWRlciBvYmplY3QuIEFmdGVyIHRoZVxuXHQgKiBmaXJzdCA8Y29kZT5wcm9ncmVzczwvY29kZT4gZXZlbnQsIHRoZSA8Y29kZT51cmw8L2NvZGU+IHByb3BlcnR5IHJlZmxlY3RzXG5cdCAqIHRoZSBtZWRpYSdzIGZpbmFsIFVSTCwgYWZ0ZXIgYW55IHJlZGlyZWN0cyBhbmQgcmVsYXRpdmUgVVJMcyBhcmVcblx0ICogcmVzb2x2ZWQuPC9wPlxuXHQgKlxuXHQgKiA8cD5JbiBzb21lIGNhc2VzLCB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnVybDwvY29kZT4gcHJvcGVydHkgaXMgdHJ1bmNhdGVkO1xuXHQgKiBzZWUgdGhlIDxjb2RlPmlzVVJMSW5hY2Nlc3NpYmxlPC9jb2RlPiBwcm9wZXJ0eSBmb3IgZGV0YWlscy48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHVybCgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3VybDtcblx0fVxufVxuXG5leHBvcnQgPSBMb2FkZXJJbmZvOyJdfQ==