var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObjectContainer = require("awayjs-core/lib/containers/DisplayObjectContainer");

var AssetLibraryBundle = require("awayjs-core/lib/core/library/AssetLibraryBundle");
var AssetLoader = require("awayjs-core/lib/core/library/AssetLoader");

var AssetEvent = require("awayjs-core/lib/events/AssetEvent");

var IOErrorEvent = require("awayjs-core/lib/events/IOErrorEvent");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var ParserEvent = require("awayjs-core/lib/events/ParserEvent");

/**
* The Loader class is used to load SWF files or image(JPG, PNG, or GIF)
* files. Use the <code>load()</code> method to initiate loading. The loaded
* display object is added as a child of the Loader object.
*
* <p>Use the URLLoader class to load text or binary data.</p>
*
* <p>The Loader class overrides the following methods that it inherits,
* because a Loader object can only have one child display object - the
* display object that it loads. Calling the following methods throws an
* exception: <code>addChild()</code>, <code>addChildAt()</code>,
* <code>removeChild()</code>, <code>removeChildAt()</code>, and
* <code>setChildIndex()</code>. To remove a loaded display object, you must
* remove the <i>Loader</i> object from its parent DisplayObjectContainer
* child array. </p>
*
* <p><b>Note:</b> The ActionScript 2.0 MovieClipLoader and LoadVars classes
* are not used in ActionScript 3.0. The Loader and URLLoader classes replace
* them.</p>
*
* <p>When you use the Loader class, consider the Flash Player and Adobe AIR
* security model: </p>
*
* <ul>
*   <li>You can load content from any accessible source. </li>
*   <li>Loading is not allowed if the calling SWF file is in a network
* sandbox and the file to be loaded is local. </li>
*   <li>If the loaded content is a SWF file written with ActionScript 3.0, it
* cannot be cross-scripted by a SWF file in another security sandbox unless
* that cross-scripting arrangement was approved through a call to the
* <code>System.allowDomain()</code> or the
* <code>System.allowInsecureDomain()</code> method in the loaded content
* file.</li>
*   <li>If the loaded content is an AVM1 SWF file(written using ActionScript
* 1.0 or 2.0), it cannot be cross-scripted by an AVM2 SWF file(written using
* ActionScript 3.0). However, you can communicate between the two SWF files
* by using the LocalConnection class.</li>
*   <li>If the loaded content is an image, its data cannot be accessed by a
* SWF file outside of the security sandbox, unless the domain of that SWF
* file was included in a URL policy file at the origin domain of the
* image.</li>
*   <li>Movie clips in the local-with-file-system sandbox cannot script movie
* clips in the local-with-networking sandbox, and the reverse is also
* prevented. </li>
*   <li>You cannot connect to commonly reserved ports. For a complete list of
* blocked ports, see "Restricting Networking APIs" in the <i>ActionScript 3.0
* Developer's Guide</i>. </li>
* </ul>
*
* <p>However, in AIR, content in the <code>application</code> security
* sandbox(content installed with the AIR application) are not restricted by
* these security limitations.</p>
*
* <p>For more information related to security, see the Flash Player Developer
* Center Topic: <a href="http://www.adobe.com/go/devnet_security_en"
* scope="external">Security</a>.</p>
*
* <p>When loading a SWF file from an untrusted source(such as a domain other
* than that of the Loader object's root SWF file), you may want to define a
* mask for the Loader object, to prevent the loaded content(which is a child
* of the Loader object) from drawing to portions of the Stage outside of that
* mask, as shown in the following code:</p>
*/
var Loader = (function (_super) {
    __extends(Loader, _super);
    /**
    * Creates a Loader object that you can use to load files, such as SWF, JPEG,
    * GIF, or PNG files. Call the <code>load()</code> method to load the asset
    * as a child of the Loader instance. You can then add the Loader object to
    * the display list(for instance, by using the <code>addChild()</code>
    * method of a DisplayObjectContainer instance). The asset appears on the
    * Stage as it loads.
    *
    * <p>You can also use a Loader instance "offlist," that is without adding it
    * to a display object container on the display list. In this mode, the
    * Loader instance might be used to load a SWF file that contains additional
    * modules of an application. </p>
    *
    * <p>To detect when the SWF file is finished loading, you can use the events
    * of the LoaderInfo object associated with the
    * <code>contentLoaderInfo</code> property of the Loader object. At that
    * point, the code in the module SWF file can be executed to initialize and
    * start the module. In the offlist mode, a Loader instance might also be
    * used to load a SWF file that contains components or media assets. Again,
    * you can use the LoaderInfo object event notifications to detect when the
    * components are finished loading. At that point, the application can start
    * using the components and media assets in the library of the SWF file by
    * instantiating the ActionScript 3.0 classes that represent those components
    * and assets.</p>
    *
    * <p>To determine the status of a Loader object, monitor the following
    * events that the LoaderInfo object associated with the
    * <code>contentLoaderInfo</code> property of the Loader object:</p>
    *
    * <ul>
    *   <li>The <code>open</code> event is dispatched when loading begins.</li>
    *   <li>The <code>ioError</code> or <code>securityError</code> event is
    * dispatched if the file cannot be loaded or if an error occured during the
    * load process. </li>
    *   <li>The <code>progress</code> event fires continuously while the file is
    * being loaded.</li>
    *   <li>The <code>complete</code> event is dispatched when a file completes
    * downloading, but before the loaded movie clip's methods and properties are
    * available. </li>
    *   <li>The <code>init</code> event is dispatched after the properties and
    * methods of the loaded SWF file are accessible, so you can begin
    * manipulating the loaded SWF file. This event is dispatched before the
    * <code>complete</code> handler. In streaming SWF files, the
    * <code>init</code> event can occur significantly earlier than the
    * <code>complete</code> event. For most purposes, use the <code>init</code>
    * handler.</li>
    * </ul>
    */
    function Loader(useAssetLibrary, assetLibraryId) {
        if (typeof useAssetLibrary === "undefined") { useAssetLibrary = true; }
        if (typeof assetLibraryId === "undefined") { assetLibraryId = null; }
        var _this = this;
        _super.call(this);

        this._loadingSessions = new Array();
        this._useAssetLib = useAssetLibrary;
        this._assetLibId = assetLibraryId;

        this._onResourceCompleteDelegate = function (event) {
            return _this.onResourceComplete(event);
        };
        this._onAssetCompleteDelegate = function (event) {
            return _this.onAssetComplete(event);
        };
    }
    Object.defineProperty(Loader.prototype, "content", {
        /**
        * Contains the root display object of the SWF file or image(JPG, PNG, or
        * GIF) file that was loaded by using the <code>load()</code> or
        * <code>loadBytes()</code> methods.
        *
        * @throws SecurityError The loaded SWF file or image file belongs to a
        *                       security sandbox to which you do not have access.
        *                       For a loaded SWF file, you can avoid this situation
        *                       by having the file call the
        *                       <code>Security.allowDomain()</code> method or by
        *                       having the loading file specify a
        *                       <code>loaderContext</code> parameter with its
        *                       <code>securityDomain</code> property set to
        *                       <code>SecurityDomain.currentDomain</code> when you
        *                       call the <code>load()</code> or
        *                       <code>loadBytes()</code> method.
        */
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Loader.prototype, "contentLoaderInfo", {
        /**
        * Returns a LoaderInfo object corresponding to the object being loaded.
        * LoaderInfo objects are shared between the Loader object and the loaded
        * content object. The LoaderInfo object supplies loading progress
        * information and statistics about the loaded file.
        *
        * <p>Events related to the load are dispatched by the LoaderInfo object
        * referenced by the <code>contentLoaderInfo</code> property of the Loader
        * object. The <code>contentLoaderInfo</code> property is set to a valid
        * LoaderInfo object, even before the content is loaded, so that you can add
        * event listeners to the object prior to the load.</p>
        *
        * <p>To detect uncaught errors that happen in a loaded SWF, use the
        * <code>Loader.uncaughtErrorEvents</code> property, not the
        * <code>Loader.contentLoaderInfo.uncaughtErrorEvents</code> property.</p>
        */
        get: function () {
            return this._contentLoaderInfo;
        },
        enumerable: true,
        configurable: true
    });

    /**
    * Cancels a <code>load()</code> method operation that is currently in
    * progress for the Loader instance.
    *
    */
    Loader.prototype.close = function () {
        if (this._useAssetLib) {
            var lib;
            lib = AssetLibraryBundle.getInstance(this._assetLibId);
            lib.stopAllLoadingSessions();
            this._loadingSessions = null;
            return;
        }
        var i;
        var length = this._loadingSessions.length;
        for (i = 0; i < length; i++) {
            this.removeListeners(this._loadingSessions[i]);
            this._loadingSessions[i].stop();
            this._loadingSessions[i] = null;
        }
        this._loadingSessions = null;
    };

    /**
    * Loads a SWF, JPEG, progressive JPEG, unanimated GIF, or PNG file into an
    * object that is a child of this Loader object. If you load an animated GIF
    * file, only the first frame is displayed. As the Loader object can contain
    * only a single child, issuing a subsequent <code>load()</code> request
    * terminates the previous request, if still pending, and commences a new
    * load.
    *
    * <p><b>Note</b>: In AIR 1.5 and Flash Player 10, the maximum size for a
    * loaded image is 8,191 pixels in width or height, and the total number of
    * pixels cannot exceed 16,777,215 pixels.(So, if an loaded image is 8,191
    * pixels wide, it can only be 2,048 pixels high.) In Flash Player 9 and
    * earlier and AIR 1.1 and earlier, the limitation is 2,880 pixels in height
    * and 2,880 pixels in width.</p>
    *
    * <p>A SWF file or image loaded into a Loader object inherits the position,
    * rotation, and scale properties of the parent display objects of the Loader
    * object. </p>
    *
    * <p>Use the <code>unload()</code> method to remove movies or images loaded
    * with this method, or to cancel a load operation that is in progress.</p>
    *
    * <p>You can prevent a SWF file from using this method by setting the
    * <code>allowNetworking</code> parameter of the the <code>object</code> and
    * <code>embed</code> tags in the HTML page that contains the SWF
    * content.</p>
    *
    * <p>When you use this method, consider the Flash Player security model,
    * which is described in the Loader class description. </p>
    *
    * <p> In Flash Player 10 and later, if you use a multipart Content-Type(for
    * example "multipart/form-data") that contains an upload(indicated by a
    * "filename" parameter in a "content-disposition" header within the POST
    * body), the POST operation is subject to the security rules applied to
    * uploads:</p>
    *
    * <ul>
    *   <li>The POST operation must be performed in response to a user-initiated
    * action, such as a mouse click or key press.</li>
    *   <li>If the POST operation is cross-domain(the POST target is not on the
    * same server as the SWF file that is sending the POST request), the target
    * server must provide a URL policy file that permits cross-domain
    * access.</li>
    * </ul>
    *
    * <p>Also, for any multipart Content-Type, the syntax must be valid
    * (according to the RFC2046 standard). If the syntax appears to be invalid,
    * the POST operation is subject to the security rules applied to
    * uploads.</p>
    *
    * <p>For more information related to security, see the Flash Player
    * Developer Center Topic: <a
    * href="http://www.adobe.com/go/devnet_security_en"
    * scope="external">Security</a>.</p>
    *
    * @param request The absolute or relative URL of the SWF, JPEG, GIF, or PNG
    *                file to be loaded. A relative path must be relative to the
    *                main SWF file. Absolute URLs must include the protocol
    *                reference, such as http:// or file:///. Filenames cannot
    *                include disk drive specifications.
    * @param context A LoaderContext object, which has properties that define
    *                the following:
    *                <ul>
    *                  <li>Whether or not to check for the existence of a policy
    *                file upon loading the object</li>
    *                  <li>The ApplicationDomain for the loaded object</li>
    *                  <li>The SecurityDomain for the loaded object</li>
    *                  <li>The ImageDecodingPolicy for the loaded image
    *                object</li>
    *                </ul>
    *
    *                <p>If the <code>context</code> parameter is not specified
    *                or refers to a null object, the loaded content remains in
    *                its own security domain.</p>
    *
    *                <p>For complete details, see the description of the
    *                properties in the <a
    *                href="../system/LoaderContext.html">LoaderContext</a>
    *                class.</p>
    * @param ns      An optional namespace string under which the file is to be
    *                loaded, allowing the differentiation of two resources with
    *                identical assets.
    * @param parser  An optional parser object for translating the loaded data
    *                into a usable resource. If not provided, AssetLoader will
    *                attempt to auto-detect the file type.
    * @throws IOError               The <code>digest</code> property of the
    *                               <code>request</code> object is not
    *                               <code>null</code>. You should only set the
    *                               <code>digest</code> property of a URLRequest
    *                               object when calling the
    *                               <code>URLLoader.load()</code> method when
    *                               loading a SWZ file(an Adobe platform
    *                               component).
    * @throws IllegalOperationError If the <code>requestedContentParent</code>
    *                               property of the <code>context</code>
    *                               parameter is a <code>Loader</code>.
    * @throws IllegalOperationError If the <code>LoaderContext.parameters</code>
    *                               parameter is set to non-null and has some
    *                               values which are not Strings.
    * @throws SecurityError         The value of
    *                               <code>LoaderContext.securityDomain</code>
    *                               must be either <code>null</code> or
    *                               <code>SecurityDomain.currentDomain</code>.
    *                               This reflects the fact that you can only
    *                               place the loaded media in its natural
    *                               security sandbox or your own(the latter
    *                               requires a policy file).
    * @throws SecurityError         Local SWF files may not set
    *                               LoaderContext.securityDomain to anything
    *                               other than <code>null</code>. It is not
    *                               permitted to import non-local media into a
    *                               local sandbox, or to place other local media
    *                               in anything other than its natural sandbox.
    * @throws SecurityError         You cannot connect to commonly reserved
    *                               ports. For a complete list of blocked ports,
    *                               see "Restricting Networking APIs" in the
    *                               <i>ActionScript 3.0 Developer's Guide</i>.
    * @throws SecurityError         If the <code>applicationDomain</code> or
    *                               <code>securityDomain</code> properties of
    *                               the <code>context</code> parameter are from
    *                               a disallowed domain.
    * @throws SecurityError         If a local SWF file is attempting to use the
    *                               <code>securityDomain</code> property of the
    *                               <code>context</code> parameter.
    * @event asyncError    Dispatched by the <code>contentLoaderInfo</code>
    *                      object if the
    *                      <code>LoaderContext.requestedContentParent</code>
    *                      property has been specified and it is not possible to
    *                      add the loaded content as a child to the specified
    *                      DisplayObjectContainer. This could happen if the
    *                      loaded content is a
    *                      <code>flash.display.AVM1Movie</code> or if the
    *                      <code>addChild()</code> call to the
    *                      requestedContentParent throws an error.
    * @event complete      Dispatched by the <code>contentLoaderInfo</code>
    *                      object when the file has completed loading. The
    *                      <code>complete</code> event is always dispatched
    *                      after the <code>init</code> event.
    * @event httpStatus    Dispatched by the <code>contentLoaderInfo</code>
    *                      object when a network request is made over HTTP and
    *                      Flash Player can detect the HTTP status code.
    * @event init          Dispatched by the <code>contentLoaderInfo</code>
    *                      object when the properties and methods of the loaded
    *                      SWF file are accessible. The <code>init</code> event
    *                      always precedes the <code>complete</code> event.
    * @event ioError       Dispatched by the <code>contentLoaderInfo</code>
    *                      object when an input or output error occurs that
    *                      causes a load operation to fail.
    * @event open          Dispatched by the <code>contentLoaderInfo</code>
    *                      object when the loading operation starts.
    * @event progress      Dispatched by the <code>contentLoaderInfo</code>
    *                      object as data is received while load operation
    *                      progresses.
    * @event securityError Dispatched by the <code>contentLoaderInfo</code>
    *                      object if a SWF file in the local-with-filesystem
    *                      sandbox attempts to load content in the
    *                      local-with-networking sandbox, or vice versa.
    * @event securityError Dispatched by the <code>contentLoaderInfo</code>
    *                      object if the
    *                      <code>LoaderContext.requestedContentParent</code>
    *                      property has been specified and the security sandbox
    *                      of the
    *                      <code>LoaderContext.requestedContentParent</code>
    *                      does not have access to the loaded SWF.
    * @event unload        Dispatched by the <code>contentLoaderInfo</code>
    *                      object when a loaded object is removed.
    */
    Loader.prototype.load = function (request, context, ns, parser) {
        if (typeof context === "undefined") { context = null; }
        if (typeof ns === "undefined") { ns = null; }
        if (typeof parser === "undefined") { parser = null; }
        var token;

        if (this._useAssetLib) {
            var lib;
            lib = AssetLibraryBundle.getInstance(this._assetLibId);
            token = lib.load(request, context, ns, parser);
        } else {
            var loader = new AssetLoader();
            this._loadingSessions.push(loader);
            token = loader.load(request, context, ns, parser);
        }

        token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        token.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

        // Error are handled separately (see documentation for addErrorHandler)
        token._iLoader._iAddErrorHandler(this.onLoadError);
        token._iLoader._iAddParseErrorHandler(this.onParseError);

        return token;
    };

    /**
    * Loads from binary data stored in a ByteArray object.
    *
    * <p>The <code>loadBytes()</code> method is asynchronous. You must wait for
    * the "init" event before accessing the properties of a loaded object.</p>
    *
    * <p>When you use this method, consider the Flash Player security model,
    * which is described in the Loader class description. </p>
    *
    * @param bytes   A ByteArray object. The contents of the ByteArray can be
    *                any of the file formats supported by the Loader class: SWF,
    *                GIF, JPEG, or PNG.
    * @param context A LoaderContext object. Only the
    *                <code>applicationDomain</code> property of the
    *                LoaderContext object applies; the
    *                <code>checkPolicyFile</code> and
    *                <code>securityDomain</code> properties of the LoaderContext
    *                object do not apply.
    *
    *                <p>If the <code>context</code> parameter is not specified
    *                or refers to a null object, the content is loaded into the
    *                current security domain -  a process referred to as "import
    *                loading" in Flash Player security documentation.
    *                Specifically, if the loading SWF file trusts the remote SWF
    *                by incorporating the remote SWF into its code, then the
    *                loading SWF can import it directly into its own security
    *                domain.</p>
    *
    *                <p>For more information related to security, see the Flash
    *                Player Developer Center Topic: <a
    *                href="http://www.adobe.com/go/devnet_security_en"
    *                scope="external">Security</a>.</p>
    * @throws ArgumentError         If the <code>length</code> property of the
    *                               ByteArray object is not greater than 0.
    * @throws IllegalOperationError If the <code>checkPolicyFile</code> or
    *                               <code>securityDomain</code> property of the
    *                               <code>context</code> parameter are non-null.
    * @throws IllegalOperationError If the <code>requestedContentParent</code>
    *                               property of the <code>context</code>
    *                               parameter is a <code>Loader</code>.
    * @throws IllegalOperationError If the <code>LoaderContext.parameters</code>
    *                               parameter is set to non-null and has some
    *                               values which are not Strings.
    * @throws SecurityError         If the provided
    *                               <code>applicationDomain</code> property of
    *                               the <code>context</code> property is from a
    *                               disallowed domain.
    * @throws SecurityError         You cannot connect to commonly reserved
    *                               ports. For a complete list of blocked ports,
    *                               see "Restricting Networking APIs" in the
    *                               <i>ActionScript 3.0 Developer's Guide</i>.
    * @event asyncError    Dispatched by the <code>contentLoaderInfo</code>
    *                      object if the
    *                      <code>LoaderContext.requestedContentParent</code>
    *                      property has been specified and it is not possible to
    *                      add the loaded content as a child to the specified
    *                      DisplayObjectContainer. This could happen if the
    *                      loaded content is a
    *                      <code>flash.display.AVM1Movie</code> or if the
    *                      <code>addChild()</code> call to the
    *                      requestedContentParent throws an error.
    * @event complete      Dispatched by the <code>contentLoaderInfo</code>
    *                      object when the operation is complete. The
    *                      <code>complete</code> event is always dispatched
    *                      after the <code>init</code> event.
    * @event init          Dispatched by the <code>contentLoaderInfo</code>
    *                      object when the properties and methods of the loaded
    *                      data are accessible. The <code>init</code> event
    *                      always precedes the <code>complete</code> event.
    * @event ioError       Dispatched by the <code>contentLoaderInfo</code>
    *                      object when the runtime cannot parse the data in the
    *                      byte array.
    * @event open          Dispatched by the <code>contentLoaderInfo</code>
    *                      object when the operation starts.
    * @event progress      Dispatched by the <code>contentLoaderInfo</code>
    *                      object as data is transfered in memory.
    * @event securityError Dispatched by the <code>contentLoaderInfo</code>
    *                      object if the
    *                      <code>LoaderContext.requestedContentParent</code>
    *                      property has been specified and the security sandbox
    *                      of the
    *                      <code>LoaderContext.requestedContentParent</code>
    *                      does not have access to the loaded SWF.
    * @event unload        Dispatched by the <code>contentLoaderInfo</code>
    *                      object when a loaded object is removed.
    */
    Loader.prototype.loadData = function (data, context, ns, parser) {
        if (typeof context === "undefined") { context = null; }
        if (typeof ns === "undefined") { ns = null; }
        if (typeof parser === "undefined") { parser = null; }
        var token;

        if (this._useAssetLib) {
            var lib;
            lib = AssetLibraryBundle.getInstance(this._assetLibId);
            token = lib.loadData(data, context, ns, parser);
        } else {
            var loader = new AssetLoader();
            this._loadingSessions.push(loader);
            token = loader.loadData(data, '', context, ns, parser);
        }

        token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        token.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

        // Error are handled separately (see documentation for addErrorHandler)
        token._iLoader._iAddErrorHandler(this.onLoadError);
        token._iLoader._iAddParseErrorHandler(this.onParseError);

        return token;
    };

    /**
    * Removes a child of this Loader object that was loaded by using the
    * <code>load()</code> method. The <code>property</code> of the associated
    * LoaderInfo object is reset to <code>null</code>. The child is not
    * necessarily destroyed because other objects might have references to it;
    * however, it is no longer a child of the Loader object.
    *
    * <p>As a best practice, before you unload a child SWF file, you should
    * explicitly close any streams in the child SWF file's objects, such as
    * LocalConnection, NetConnection, NetStream, and Sound objects. Otherwise,
    * audio in the child SWF file might continue to play, even though the child
    * SWF file was unloaded. To close streams in the child SWF file, add an
    * event listener to the child that listens for the <code>unload</code>
    * event. When the parent calls <code>Loader.unload()</code>, the
    * <code>unload</code> event is dispatched to the child. The following code
    * shows how you might do this:</p>
    * <pre xml:space="preserve"> public closeAllStreams(evt:Event) {
    * myNetStream.close(); mySound.close(); myNetConnection.close();
    * myLocalConnection.close(); }
    * myMovieClip.loaderInfo.addEventListener(Event.UNLOAD,
    * closeAllStreams);</pre>
    *
    */
    Loader.prototype.unload = function () {
        //TODO
    };

    /**
    * Enables a specific parser.
    * When no specific parser is set for a loading/parsing opperation,
    * loader3d can autoselect the correct parser to use.
    * A parser must have been enabled, to be considered when autoselecting the parser.
    *
    * @param parserClass The parser class to enable.
    * @see away.parsers.Parsers
    */
    Loader.enableParser = function (parserClass) {
        AssetLoader.enableParser(parserClass);
    };

    /**
    * Enables a list of parsers.
    * When no specific parser is set for a loading/parsing opperation,
    * loader3d can autoselect the correct parser to use.
    * A parser must have been enabled, to be considered when autoselecting the parser.
    *
    * @param parserClasses A Vector of parser classes to enable.
    * @see away.parsers.Parsers
    */
    Loader.enableParsers = function (parserClasses) {
        AssetLoader.enableParsers(parserClasses);
    };

    Loader.prototype.removeListeners = function (dispatcher) {
        dispatcher.removeEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        dispatcher.removeEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
    };

    Loader.prototype.onAssetComplete = function (event) {
        this.dispatchEvent(event);
    };

    /**
    * Called when an error occurs during loading
    */
    Loader.prototype.onLoadError = function (event) {
        if (this.hasEventListener(IOErrorEvent.IO_ERROR)) {
            this.dispatchEvent(event);
            return true;
        } else {
            return false;
        }
    };

    /**
    * Called when a an error occurs during parsing
    */
    Loader.prototype.onParseError = function (event) {
        if (this.hasEventListener(ParserEvent.PARSE_ERROR)) {
            this.dispatchEvent(event);
            return true;
        } else {
            return false;
        }
    };

    /**
    * Called when the resource and all of its dependencies was retrieved.
    */
    Loader.prototype.onResourceComplete = function (event) {
        var content = event.content;

        this._content = content;

        if (content)
            this.addChild(content);

        this.dispatchEvent(event);
    };
    return Loader;
})(DisplayObjectContainer);

module.exports = Loader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvTG9hZGVyLnRzIl0sIm5hbWVzIjpbIkxvYWRlciIsIkxvYWRlci5jb25zdHJ1Y3RvciIsIkxvYWRlci5jbG9zZSIsIkxvYWRlci5sb2FkIiwiTG9hZGVyLmxvYWREYXRhIiwiTG9hZGVyLnVubG9hZCIsIkxvYWRlci5lbmFibGVQYXJzZXIiLCJMb2FkZXIuZW5hYmxlUGFyc2VycyIsIkxvYWRlci5yZW1vdmVMaXN0ZW5lcnMiLCJMb2FkZXIub25Bc3NldENvbXBsZXRlIiwiTG9hZGVyLm9uTG9hZEVycm9yIiwiTG9hZGVyLm9uUGFyc2VFcnJvciIsIkxvYWRlci5vblJlc291cmNlQ29tcGxldGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlGQUE4Rjs7QUFHOUYsbUZBQXlGO0FBQ3pGLHFFQUE2RTs7QUFJN0UsNkRBQXFFOztBQUVyRSxpRUFBeUU7QUFDekUsK0RBQXVFO0FBQ3ZFLCtEQUF1RTs7QUFHdkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOERHO0FBQ0g7SUFBcUJBLHlCQUFzQkE7SUFzSDFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFER0E7SUFDSEEsZ0JBQVlBLGVBQThCQSxFQUFFQSxjQUE0QkE7UUFBNURDLDhDQUFBQSxlQUFlQSxHQUFXQSxJQUFJQTtBQUFBQSxRQUFFQSw2Q0FBQUEsY0FBY0EsR0FBVUEsSUFBSUE7QUFBQUEsUUFBeEVBLGlCQVVDQTtRQVJBQSxXQUFNQSxLQUFBQSxDQUFDQTs7UUFFUEEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFjQSxDQUFDQTtRQUNoREEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsZUFBZUE7UUFDbkNBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLGNBQWNBOztRQUVqQ0EsSUFBSUEsQ0FBQ0EsMkJBQTJCQSxHQUFHQSxVQUFDQSxL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QURBLENBQUNBLEVBbmpCb0Isc0JBQXNCLEVBbWpCMUM7O0FBRUQsdUJBQWdCLENBQUEiLCJmaWxlIjoiY29udGFpbmVycy9Mb2FkZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBMb2FkZXJJbmZvXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvTG9hZGVySW5mb1wiKTtcbmltcG9ydCBBc3NldExpYnJhcnlCdW5kbGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZVwiKTtcbmltcG9ydCBBc3NldExvYWRlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0TG9hZGVyXCIpO1xuaW1wb3J0IEFzc2V0TG9hZGVyQ29udGV4dFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQXNzZXRMb2FkZXJDb250ZXh0XCIpO1xuaW1wb3J0IEFzc2V0TG9hZGVyVG9rZW5cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvQXNzZXRMb2FkZXJUb2tlblwiKTtcbmltcG9ydCBVUkxSZXF1ZXN0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IEFzc2V0RXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Bc3NldEV2ZW50XCIpO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIik7XG5pbXBvcnQgSU9FcnJvckV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvSU9FcnJvckV2ZW50XCIpO1xuaW1wb3J0IExvYWRlckV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTG9hZGVyRXZlbnRcIik7XG5pbXBvcnQgUGFyc2VyRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9QYXJzZXJFdmVudFwiKTtcbmltcG9ydCBQYXJzZXJCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIik7XG5cbi8qKlxuICogVGhlIExvYWRlciBjbGFzcyBpcyB1c2VkIHRvIGxvYWQgU1dGIGZpbGVzIG9yIGltYWdlKEpQRywgUE5HLCBvciBHSUYpXG4gKiBmaWxlcy4gVXNlIHRoZSA8Y29kZT5sb2FkKCk8L2NvZGU+IG1ldGhvZCB0byBpbml0aWF0ZSBsb2FkaW5nLiBUaGUgbG9hZGVkXG4gKiBkaXNwbGF5IG9iamVjdCBpcyBhZGRlZCBhcyBhIGNoaWxkIG9mIHRoZSBMb2FkZXIgb2JqZWN0LlxuICpcbiAqIDxwPlVzZSB0aGUgVVJMTG9hZGVyIGNsYXNzIHRvIGxvYWQgdGV4dCBvciBiaW5hcnkgZGF0YS48L3A+XG4gKlxuICogPHA+VGhlIExvYWRlciBjbGFzcyBvdmVycmlkZXMgdGhlIGZvbGxvd2luZyBtZXRob2RzIHRoYXQgaXQgaW5oZXJpdHMsXG4gKiBiZWNhdXNlIGEgTG9hZGVyIG9iamVjdCBjYW4gb25seSBoYXZlIG9uZSBjaGlsZCBkaXNwbGF5IG9iamVjdCAtIHRoZVxuICogZGlzcGxheSBvYmplY3QgdGhhdCBpdCBsb2Fkcy4gQ2FsbGluZyB0aGUgZm9sbG93aW5nIG1ldGhvZHMgdGhyb3dzIGFuXG4gKiBleGNlcHRpb246IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LCA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LFxuICogPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4sIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4sIGFuZFxuICogPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gVG8gcmVtb3ZlIGEgbG9hZGVkIGRpc3BsYXkgb2JqZWN0LCB5b3UgbXVzdFxuICogcmVtb3ZlIHRoZSA8aT5Mb2FkZXI8L2k+IG9iamVjdCBmcm9tIGl0cyBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lclxuICogY2hpbGQgYXJyYXkuIDwvcD5cbiAqXG4gKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIEFjdGlvblNjcmlwdCAyLjAgTW92aWVDbGlwTG9hZGVyIGFuZCBMb2FkVmFycyBjbGFzc2VzXG4gKiBhcmUgbm90IHVzZWQgaW4gQWN0aW9uU2NyaXB0IDMuMC4gVGhlIExvYWRlciBhbmQgVVJMTG9hZGVyIGNsYXNzZXMgcmVwbGFjZVxuICogdGhlbS48L3A+XG4gKlxuICogPHA+V2hlbiB5b3UgdXNlIHRoZSBMb2FkZXIgY2xhc3MsIGNvbnNpZGVyIHRoZSBGbGFzaCBQbGF5ZXIgYW5kIEFkb2JlIEFJUlxuICogc2VjdXJpdHkgbW9kZWw6IDwvcD5cbiAqXG4gKiA8dWw+XG4gKiAgIDxsaT5Zb3UgY2FuIGxvYWQgY29udGVudCBmcm9tIGFueSBhY2Nlc3NpYmxlIHNvdXJjZS4gPC9saT5cbiAqICAgPGxpPkxvYWRpbmcgaXMgbm90IGFsbG93ZWQgaWYgdGhlIGNhbGxpbmcgU1dGIGZpbGUgaXMgaW4gYSBuZXR3b3JrXG4gKiBzYW5kYm94IGFuZCB0aGUgZmlsZSB0byBiZSBsb2FkZWQgaXMgbG9jYWwuIDwvbGk+XG4gKiAgIDxsaT5JZiB0aGUgbG9hZGVkIGNvbnRlbnQgaXMgYSBTV0YgZmlsZSB3cml0dGVuIHdpdGggQWN0aW9uU2NyaXB0IDMuMCwgaXRcbiAqIGNhbm5vdCBiZSBjcm9zcy1zY3JpcHRlZCBieSBhIFNXRiBmaWxlIGluIGFub3RoZXIgc2VjdXJpdHkgc2FuZGJveCB1bmxlc3NcbiAqIHRoYXQgY3Jvc3Mtc2NyaXB0aW5nIGFycmFuZ2VtZW50IHdhcyBhcHByb3ZlZCB0aHJvdWdoIGEgY2FsbCB0byB0aGVcbiAqIDxjb2RlPlN5c3RlbS5hbGxvd0RvbWFpbigpPC9jb2RlPiBvciB0aGVcbiAqIDxjb2RlPlN5c3RlbS5hbGxvd0luc2VjdXJlRG9tYWluKCk8L2NvZGU+IG1ldGhvZCBpbiB0aGUgbG9hZGVkIGNvbnRlbnRcbiAqIGZpbGUuPC9saT5cbiAqICAgPGxpPklmIHRoZSBsb2FkZWQgY29udGVudCBpcyBhbiBBVk0xIFNXRiBmaWxlKHdyaXR0ZW4gdXNpbmcgQWN0aW9uU2NyaXB0XG4gKiAxLjAgb3IgMi4wKSwgaXQgY2Fubm90IGJlIGNyb3NzLXNjcmlwdGVkIGJ5IGFuIEFWTTIgU1dGIGZpbGUod3JpdHRlbiB1c2luZ1xuICogQWN0aW9uU2NyaXB0IDMuMCkuIEhvd2V2ZXIsIHlvdSBjYW4gY29tbXVuaWNhdGUgYmV0d2VlbiB0aGUgdHdvIFNXRiBmaWxlc1xuICogYnkgdXNpbmcgdGhlIExvY2FsQ29ubmVjdGlvbiBjbGFzcy48L2xpPlxuICogICA8bGk+SWYgdGhlIGxvYWRlZCBjb250ZW50IGlzIGFuIGltYWdlLCBpdHMgZGF0YSBjYW5ub3QgYmUgYWNjZXNzZWQgYnkgYVxuICogU1dGIGZpbGUgb3V0c2lkZSBvZiB0aGUgc2VjdXJpdHkgc2FuZGJveCwgdW5sZXNzIHRoZSBkb21haW4gb2YgdGhhdCBTV0ZcbiAqIGZpbGUgd2FzIGluY2x1ZGVkIGluIGEgVVJMIHBvbGljeSBmaWxlIGF0IHRoZSBvcmlnaW4gZG9tYWluIG9mIHRoZVxuICogaW1hZ2UuPC9saT5cbiAqICAgPGxpPk1vdmllIGNsaXBzIGluIHRoZSBsb2NhbC13aXRoLWZpbGUtc3lzdGVtIHNhbmRib3ggY2Fubm90IHNjcmlwdCBtb3ZpZVxuICogY2xpcHMgaW4gdGhlIGxvY2FsLXdpdGgtbmV0d29ya2luZyBzYW5kYm94LCBhbmQgdGhlIHJldmVyc2UgaXMgYWxzb1xuICogcHJldmVudGVkLiA8L2xpPlxuICogICA8bGk+WW91IGNhbm5vdCBjb25uZWN0IHRvIGNvbW1vbmx5IHJlc2VydmVkIHBvcnRzLiBGb3IgYSBjb21wbGV0ZSBsaXN0IG9mXG4gKiBibG9ja2VkIHBvcnRzLCBzZWUgXCJSZXN0cmljdGluZyBOZXR3b3JraW5nIEFQSXNcIiBpbiB0aGUgPGk+QWN0aW9uU2NyaXB0IDMuMFxuICogRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LiA8L2xpPlxuICogPC91bD5cbiAqXG4gKiA8cD5Ib3dldmVyLCBpbiBBSVIsIGNvbnRlbnQgaW4gdGhlIDxjb2RlPmFwcGxpY2F0aW9uPC9jb2RlPiBzZWN1cml0eVxuICogc2FuZGJveChjb250ZW50IGluc3RhbGxlZCB3aXRoIHRoZSBBSVIgYXBwbGljYXRpb24pIGFyZSBub3QgcmVzdHJpY3RlZCBieVxuICogdGhlc2Ugc2VjdXJpdHkgbGltaXRhdGlvbnMuPC9wPlxuICpcbiAqIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gc2VjdXJpdHksIHNlZSB0aGUgRmxhc2ggUGxheWVyIERldmVsb3BlclxuICogQ2VudGVyIFRvcGljOiA8YSBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZGV2bmV0X3NlY3VyaXR5X2VuXCJcbiAqIHNjb3BlPVwiZXh0ZXJuYWxcIj5TZWN1cml0eTwvYT4uPC9wPlxuICpcbiAqIDxwPldoZW4gbG9hZGluZyBhIFNXRiBmaWxlIGZyb20gYW4gdW50cnVzdGVkIHNvdXJjZShzdWNoIGFzIGEgZG9tYWluIG90aGVyXG4gKiB0aGFuIHRoYXQgb2YgdGhlIExvYWRlciBvYmplY3QncyByb290IFNXRiBmaWxlKSwgeW91IG1heSB3YW50IHRvIGRlZmluZSBhXG4gKiBtYXNrIGZvciB0aGUgTG9hZGVyIG9iamVjdCwgdG8gcHJldmVudCB0aGUgbG9hZGVkIGNvbnRlbnQod2hpY2ggaXMgYSBjaGlsZFxuICogb2YgdGhlIExvYWRlciBvYmplY3QpIGZyb20gZHJhd2luZyB0byBwb3J0aW9ucyBvZiB0aGUgU3RhZ2Ugb3V0c2lkZSBvZiB0aGF0XG4gKiBtYXNrLCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6PC9wPlxuICovXG5jbGFzcyBMb2FkZXIgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG57XG5cdC8qKlxuXHQgKiBEaXNwYXRjaGVkIHdoZW4gYW55IGFzc2V0IGZpbmlzaGVzIHBhcnNpbmcuIEFsc28gc2VlIHNwZWNpZmljIGV2ZW50cyBmb3IgZWFjaFxuXHQgKiBpbmRpdmlkdWFsIGFzc2V0IHR5cGUgKG1lc2hlcywgbWF0ZXJpYWxzIGV0IGMuKVxuXHQgKlxuXHQgKiBAZXZlbnRUeXBlIEFzc2V0RXZlbnRcblx0ICovXG5cdC8vW0V2ZW50KG5hbWU9XCJhc3NldENvbXBsZXRlXCIsIHR5cGU9XCJBc3NldEV2ZW50XCIpXVxuXG5cblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhIGZ1bGwgcmVzb3VyY2UgKGluY2x1ZGluZyBkZXBlbmRlbmNpZXMpIGZpbmlzaGVzIGxvYWRpbmcuXG5cdCAqXG5cdCAqIEBldmVudFR5cGUgTG9hZGVyRXZlbnRcblx0ICovXG5cdC8vW0V2ZW50KG5hbWU9XCJyZXNvdXJjZUNvbXBsZXRlXCIsIHR5cGU9XCJMb2FkZXJFdmVudFwiKV1cblxuXHRwcml2YXRlIF9sb2FkaW5nU2Vzc2lvbnM6QXJyYXk8QXNzZXRMb2FkZXI+O1xuXHRwcml2YXRlIF91c2VBc3NldExpYjpib29sZWFuO1xuXHRwcml2YXRlIF9hc3NldExpYklkOnN0cmluZztcblx0cHJpdmF0ZSBfb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGU6RnVuY3Rpb247XG5cdHByaXZhdGUgX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlOkZ1bmN0aW9uO1xuXG5cdHByaXZhdGUgX2NvbnRlbnQ6RGlzcGxheU9iamVjdDtcblx0cHJpdmF0ZSBfY29udGVudExvYWRlckluZm86TG9hZGVySW5mbztcblxuXHQvKipcblx0ICogQ29udGFpbnMgdGhlIHJvb3QgZGlzcGxheSBvYmplY3Qgb2YgdGhlIFNXRiBmaWxlIG9yIGltYWdlKEpQRywgUE5HLCBvclxuXHQgKiBHSUYpIGZpbGUgdGhhdCB3YXMgbG9hZGVkIGJ5IHVzaW5nIHRoZSA8Y29kZT5sb2FkKCk8L2NvZGU+IG9yXG5cdCAqIDxjb2RlPmxvYWRCeXRlcygpPC9jb2RlPiBtZXRob2RzLlxuXHQgKlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgVGhlIGxvYWRlZCBTV0YgZmlsZSBvciBpbWFnZSBmaWxlIGJlbG9uZ3MgdG8gYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2VjdXJpdHkgc2FuZGJveCB0byB3aGljaCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzLlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgRm9yIGEgbG9hZGVkIFNXRiBmaWxlLCB5b3UgY2FuIGF2b2lkIHRoaXMgc2l0dWF0aW9uXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBieSBoYXZpbmcgdGhlIGZpbGUgY2FsbCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNlY3VyaXR5LmFsbG93RG9tYWluKCk8L2NvZGU+IG1ldGhvZCBvciBieVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaGF2aW5nIHRoZSBsb2FkaW5nIGZpbGUgc3BlY2lmeSBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5sb2FkZXJDb250ZXh0PC9jb2RlPiBwYXJhbWV0ZXIgd2l0aCBpdHNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNlY3VyaXR5RG9tYWluPC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG9cblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNlY3VyaXR5RG9tYWluLmN1cnJlbnREb21haW48L2NvZGU+IHdoZW4geW91XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjYWxsIHRoZSA8Y29kZT5sb2FkKCk8L2NvZGU+IG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5sb2FkQnl0ZXMoKTwvY29kZT4gbWV0aG9kLlxuXHQgKi9cblx0cHVibGljIGdldCBjb250ZW50KCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIExvYWRlckluZm8gb2JqZWN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIG9iamVjdCBiZWluZyBsb2FkZWQuXG5cdCAqIExvYWRlckluZm8gb2JqZWN0cyBhcmUgc2hhcmVkIGJldHdlZW4gdGhlIExvYWRlciBvYmplY3QgYW5kIHRoZSBsb2FkZWRcblx0ICogY29udGVudCBvYmplY3QuIFRoZSBMb2FkZXJJbmZvIG9iamVjdCBzdXBwbGllcyBsb2FkaW5nIHByb2dyZXNzXG5cdCAqIGluZm9ybWF0aW9uIGFuZCBzdGF0aXN0aWNzIGFib3V0IHRoZSBsb2FkZWQgZmlsZS5cblx0ICpcblx0ICogPHA+RXZlbnRzIHJlbGF0ZWQgdG8gdGhlIGxvYWQgYXJlIGRpc3BhdGNoZWQgYnkgdGhlIExvYWRlckluZm8gb2JqZWN0XG5cdCAqIHJlZmVyZW5jZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgTG9hZGVyXG5cdCAqIG9iamVjdC4gVGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gYSB2YWxpZFxuXHQgKiBMb2FkZXJJbmZvIG9iamVjdCwgZXZlbiBiZWZvcmUgdGhlIGNvbnRlbnQgaXMgbG9hZGVkLCBzbyB0aGF0IHlvdSBjYW4gYWRkXG5cdCAqIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgb2JqZWN0IHByaW9yIHRvIHRoZSBsb2FkLjwvcD5cblx0ICpcblx0ICogPHA+VG8gZGV0ZWN0IHVuY2F1Z2h0IGVycm9ycyB0aGF0IGhhcHBlbiBpbiBhIGxvYWRlZCBTV0YsIHVzZSB0aGVcblx0ICogPGNvZGU+TG9hZGVyLnVuY2F1Z2h0RXJyb3JFdmVudHM8L2NvZGU+IHByb3BlcnR5LCBub3QgdGhlXG5cdCAqIDxjb2RlPkxvYWRlci5jb250ZW50TG9hZGVySW5mby51bmNhdWdodEVycm9yRXZlbnRzPC9jb2RlPiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvbnRlbnRMb2FkZXJJbmZvKCk6TG9hZGVySW5mb1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRlbnRMb2FkZXJJbmZvO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBMb2FkZXIgb2JqZWN0IHRoYXQgeW91IGNhbiB1c2UgdG8gbG9hZCBmaWxlcywgc3VjaCBhcyBTV0YsIEpQRUcsXG5cdCAqIEdJRiwgb3IgUE5HIGZpbGVzLiBDYWxsIHRoZSA8Y29kZT5sb2FkKCk8L2NvZGU+IG1ldGhvZCB0byBsb2FkIHRoZSBhc3NldFxuXHQgKiBhcyBhIGNoaWxkIG9mIHRoZSBMb2FkZXIgaW5zdGFuY2UuIFlvdSBjYW4gdGhlbiBhZGQgdGhlIExvYWRlciBvYmplY3QgdG9cblx0ICogdGhlIGRpc3BsYXkgbGlzdChmb3IgaW5zdGFuY2UsIGJ5IHVzaW5nIHRoZSA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPlxuXHQgKiBtZXRob2Qgb2YgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlKS4gVGhlIGFzc2V0IGFwcGVhcnMgb24gdGhlXG5cdCAqIFN0YWdlIGFzIGl0IGxvYWRzLlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIGFsc28gdXNlIGEgTG9hZGVyIGluc3RhbmNlIFwib2ZmbGlzdCxcIiB0aGF0IGlzIHdpdGhvdXQgYWRkaW5nIGl0XG5cdCAqIHRvIGEgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIG9uIHRoZSBkaXNwbGF5IGxpc3QuIEluIHRoaXMgbW9kZSwgdGhlXG5cdCAqIExvYWRlciBpbnN0YW5jZSBtaWdodCBiZSB1c2VkIHRvIGxvYWQgYSBTV0YgZmlsZSB0aGF0IGNvbnRhaW5zIGFkZGl0aW9uYWxcblx0ICogbW9kdWxlcyBvZiBhbiBhcHBsaWNhdGlvbi4gPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyBkZXRlY3Qgd2hlbiB0aGUgU1dGIGZpbGUgaXMgZmluaXNoZWQgbG9hZGluZywgeW91IGNhbiB1c2UgdGhlIGV2ZW50c1xuXHQgKiBvZiB0aGUgTG9hZGVySW5mbyBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZVxuXHQgKiA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgdGhlIExvYWRlciBvYmplY3QuIEF0IHRoYXRcblx0ICogcG9pbnQsIHRoZSBjb2RlIGluIHRoZSBtb2R1bGUgU1dGIGZpbGUgY2FuIGJlIGV4ZWN1dGVkIHRvIGluaXRpYWxpemUgYW5kXG5cdCAqIHN0YXJ0IHRoZSBtb2R1bGUuIEluIHRoZSBvZmZsaXN0IG1vZGUsIGEgTG9hZGVyIGluc3RhbmNlIG1pZ2h0IGFsc28gYmVcblx0ICogdXNlZCB0byBsb2FkIGEgU1dGIGZpbGUgdGhhdCBjb250YWlucyBjb21wb25lbnRzIG9yIG1lZGlhIGFzc2V0cy4gQWdhaW4sXG5cdCAqIHlvdSBjYW4gdXNlIHRoZSBMb2FkZXJJbmZvIG9iamVjdCBldmVudCBub3RpZmljYXRpb25zIHRvIGRldGVjdCB3aGVuIHRoZVxuXHQgKiBjb21wb25lbnRzIGFyZSBmaW5pc2hlZCBsb2FkaW5nLiBBdCB0aGF0IHBvaW50LCB0aGUgYXBwbGljYXRpb24gY2FuIHN0YXJ0XG5cdCAqIHVzaW5nIHRoZSBjb21wb25lbnRzIGFuZCBtZWRpYSBhc3NldHMgaW4gdGhlIGxpYnJhcnkgb2YgdGhlIFNXRiBmaWxlIGJ5XG5cdCAqIGluc3RhbnRpYXRpbmcgdGhlIEFjdGlvblNjcmlwdCAzLjAgY2xhc3NlcyB0aGF0IHJlcHJlc2VudCB0aG9zZSBjb21wb25lbnRzXG5cdCAqIGFuZCBhc3NldHMuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyBkZXRlcm1pbmUgdGhlIHN0YXR1cyBvZiBhIExvYWRlciBvYmplY3QsIG1vbml0b3IgdGhlIGZvbGxvd2luZ1xuXHQgKiBldmVudHMgdGhhdCB0aGUgTG9hZGVySW5mbyBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZVxuXHQgKiA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgdGhlIExvYWRlciBvYmplY3Q6PC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPlRoZSA8Y29kZT5vcGVuPC9jb2RlPiBldmVudCBpcyBkaXNwYXRjaGVkIHdoZW4gbG9hZGluZyBiZWdpbnMuPC9saT5cblx0ICogICA8bGk+VGhlIDxjb2RlPmlvRXJyb3I8L2NvZGU+IG9yIDxjb2RlPnNlY3VyaXR5RXJyb3I8L2NvZGU+IGV2ZW50IGlzXG5cdCAqIGRpc3BhdGNoZWQgaWYgdGhlIGZpbGUgY2Fubm90IGJlIGxvYWRlZCBvciBpZiBhbiBlcnJvciBvY2N1cmVkIGR1cmluZyB0aGVcblx0ICogbG9hZCBwcm9jZXNzLiA8L2xpPlxuXHQgKiAgIDxsaT5UaGUgPGNvZGU+cHJvZ3Jlc3M8L2NvZGU+IGV2ZW50IGZpcmVzIGNvbnRpbnVvdXNseSB3aGlsZSB0aGUgZmlsZSBpc1xuXHQgKiBiZWluZyBsb2FkZWQuPC9saT5cblx0ICogICA8bGk+VGhlIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBldmVudCBpcyBkaXNwYXRjaGVkIHdoZW4gYSBmaWxlIGNvbXBsZXRlc1xuXHQgKiBkb3dubG9hZGluZywgYnV0IGJlZm9yZSB0aGUgbG9hZGVkIG1vdmllIGNsaXAncyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGFyZVxuXHQgKiBhdmFpbGFibGUuIDwvbGk+XG5cdCAqICAgPGxpPlRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudCBpcyBkaXNwYXRjaGVkIGFmdGVyIHRoZSBwcm9wZXJ0aWVzIGFuZFxuXHQgKiBtZXRob2RzIG9mIHRoZSBsb2FkZWQgU1dGIGZpbGUgYXJlIGFjY2Vzc2libGUsIHNvIHlvdSBjYW4gYmVnaW5cblx0ICogbWFuaXB1bGF0aW5nIHRoZSBsb2FkZWQgU1dGIGZpbGUuIFRoaXMgZXZlbnQgaXMgZGlzcGF0Y2hlZCBiZWZvcmUgdGhlXG5cdCAqIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBoYW5kbGVyLiBJbiBzdHJlYW1pbmcgU1dGIGZpbGVzLCB0aGVcblx0ICogPGNvZGU+aW5pdDwvY29kZT4gZXZlbnQgY2FuIG9jY3VyIHNpZ25pZmljYW50bHkgZWFybGllciB0aGFuIHRoZVxuXHQgKiA8Y29kZT5jb21wbGV0ZTwvY29kZT4gZXZlbnQuIEZvciBtb3N0IHB1cnBvc2VzLCB1c2UgdGhlIDxjb2RlPmluaXQ8L2NvZGU+XG5cdCAqIGhhbmRsZXIuPC9saT5cblx0ICogPC91bD5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHVzZUFzc2V0TGlicmFyeTpib29sZWFuID0gdHJ1ZSwgYXNzZXRMaWJyYXJ5SWQ6c3RyaW5nID0gbnVsbClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBuZXcgQXJyYXk8QXNzZXRMb2FkZXI+KCk7XG5cdFx0dGhpcy5fdXNlQXNzZXRMaWIgPSB1c2VBc3NldExpYnJhcnk7XG5cdFx0dGhpcy5fYXNzZXRMaWJJZCA9IGFzc2V0TGlicmFyeUlkO1xuXG5cdFx0dGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50KTtcblx0XHR0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSA9IChldmVudDpBc3NldEV2ZW50KSA9PiB0aGlzLm9uQXNzZXRDb21wbGV0ZShldmVudCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FuY2VscyBhIDxjb2RlPmxvYWQoKTwvY29kZT4gbWV0aG9kIG9wZXJhdGlvbiB0aGF0IGlzIGN1cnJlbnRseSBpblxuXHQgKiBwcm9ncmVzcyBmb3IgdGhlIExvYWRlciBpbnN0YW5jZS5cblx0ICpcblx0ICovXG5cdHB1YmxpYyBjbG9zZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fdXNlQXNzZXRMaWIpIHtcblx0XHRcdHZhciBsaWI6QXNzZXRMaWJyYXJ5QnVuZGxlO1xuXHRcdFx0bGliID0gQXNzZXRMaWJyYXJ5QnVuZGxlLmdldEluc3RhbmNlKHRoaXMuX2Fzc2V0TGliSWQpO1xuXHRcdFx0bGliLnN0b3BBbGxMb2FkaW5nU2Vzc2lvbnMoKTtcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG51bGw7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0dmFyIGk6bnVtYmVyIC8qaW50Ki87XG5cdFx0dmFyIGxlbmd0aDpudW1iZXIgLyppbnQqLyA9IHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5sZW5ndGg7XG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0aGlzLnJlbW92ZUxpc3RlbmVycyh0aGlzLl9sb2FkaW5nU2Vzc2lvbnNbaV0pO1xuXHRcdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zW2ldLnN0b3AoKTtcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9uc1tpXSA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogTG9hZHMgYSBTV0YsIEpQRUcsIHByb2dyZXNzaXZlIEpQRUcsIHVuYW5pbWF0ZWQgR0lGLCBvciBQTkcgZmlsZSBpbnRvIGFuXG5cdCAqIG9iamVjdCB0aGF0IGlzIGEgY2hpbGQgb2YgdGhpcyBMb2FkZXIgb2JqZWN0LiBJZiB5b3UgbG9hZCBhbiBhbmltYXRlZCBHSUZcblx0ICogZmlsZSwgb25seSB0aGUgZmlyc3QgZnJhbWUgaXMgZGlzcGxheWVkLiBBcyB0aGUgTG9hZGVyIG9iamVjdCBjYW4gY29udGFpblxuXHQgKiBvbmx5IGEgc2luZ2xlIGNoaWxkLCBpc3N1aW5nIGEgc3Vic2VxdWVudCA8Y29kZT5sb2FkKCk8L2NvZGU+IHJlcXVlc3Rcblx0ICogdGVybWluYXRlcyB0aGUgcHJldmlvdXMgcmVxdWVzdCwgaWYgc3RpbGwgcGVuZGluZywgYW5kIGNvbW1lbmNlcyBhIG5ld1xuXHQgKiBsb2FkLlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogSW4gQUlSIDEuNSBhbmQgRmxhc2ggUGxheWVyIDEwLCB0aGUgbWF4aW11bSBzaXplIGZvciBhXG5cdCAqIGxvYWRlZCBpbWFnZSBpcyA4LDE5MSBwaXhlbHMgaW4gd2lkdGggb3IgaGVpZ2h0LCBhbmQgdGhlIHRvdGFsIG51bWJlciBvZlxuXHQgKiBwaXhlbHMgY2Fubm90IGV4Y2VlZCAxNiw3NzcsMjE1IHBpeGVscy4oU28sIGlmIGFuIGxvYWRlZCBpbWFnZSBpcyA4LDE5MVxuXHQgKiBwaXhlbHMgd2lkZSwgaXQgY2FuIG9ubHkgYmUgMiwwNDggcGl4ZWxzIGhpZ2guKSBJbiBGbGFzaCBQbGF5ZXIgOSBhbmRcblx0ICogZWFybGllciBhbmQgQUlSIDEuMSBhbmQgZWFybGllciwgdGhlIGxpbWl0YXRpb24gaXMgMiw4ODAgcGl4ZWxzIGluIGhlaWdodFxuXHQgKiBhbmQgMiw4ODAgcGl4ZWxzIGluIHdpZHRoLjwvcD5cblx0ICpcblx0ICogPHA+QSBTV0YgZmlsZSBvciBpbWFnZSBsb2FkZWQgaW50byBhIExvYWRlciBvYmplY3QgaW5oZXJpdHMgdGhlIHBvc2l0aW9uLFxuXHQgKiByb3RhdGlvbiwgYW5kIHNjYWxlIHByb3BlcnRpZXMgb2YgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdHMgb2YgdGhlIExvYWRlclxuXHQgKiBvYmplY3QuIDwvcD5cblx0ICpcblx0ICogPHA+VXNlIHRoZSA8Y29kZT51bmxvYWQoKTwvY29kZT4gbWV0aG9kIHRvIHJlbW92ZSBtb3ZpZXMgb3IgaW1hZ2VzIGxvYWRlZFxuXHQgKiB3aXRoIHRoaXMgbWV0aG9kLCBvciB0byBjYW5jZWwgYSBsb2FkIG9wZXJhdGlvbiB0aGF0IGlzIGluIHByb2dyZXNzLjwvcD5cblx0ICpcblx0ICogPHA+WW91IGNhbiBwcmV2ZW50IGEgU1dGIGZpbGUgZnJvbSB1c2luZyB0aGlzIG1ldGhvZCBieSBzZXR0aW5nIHRoZVxuXHQgKiA8Y29kZT5hbGxvd05ldHdvcmtpbmc8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGUgdGhlIDxjb2RlPm9iamVjdDwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmVtYmVkPC9jb2RlPiB0YWdzIGluIHRoZSBIVE1MIHBhZ2UgdGhhdCBjb250YWlucyB0aGUgU1dGXG5cdCAqIGNvbnRlbnQuPC9wPlxuXHQgKlxuXHQgKiA8cD5XaGVuIHlvdSB1c2UgdGhpcyBtZXRob2QsIGNvbnNpZGVyIHRoZSBGbGFzaCBQbGF5ZXIgc2VjdXJpdHkgbW9kZWwsXG5cdCAqIHdoaWNoIGlzIGRlc2NyaWJlZCBpbiB0aGUgTG9hZGVyIGNsYXNzIGRlc2NyaXB0aW9uLiA8L3A+XG5cdCAqXG5cdCAqIDxwPiBJbiBGbGFzaCBQbGF5ZXIgMTAgYW5kIGxhdGVyLCBpZiB5b3UgdXNlIGEgbXVsdGlwYXJ0IENvbnRlbnQtVHlwZShmb3Jcblx0ICogZXhhbXBsZSBcIm11bHRpcGFydC9mb3JtLWRhdGFcIikgdGhhdCBjb250YWlucyBhbiB1cGxvYWQoaW5kaWNhdGVkIGJ5IGFcblx0ICogXCJmaWxlbmFtZVwiIHBhcmFtZXRlciBpbiBhIFwiY29udGVudC1kaXNwb3NpdGlvblwiIGhlYWRlciB3aXRoaW4gdGhlIFBPU1Rcblx0ICogYm9keSksIHRoZSBQT1NUIG9wZXJhdGlvbiBpcyBzdWJqZWN0IHRvIHRoZSBzZWN1cml0eSBydWxlcyBhcHBsaWVkIHRvXG5cdCAqIHVwbG9hZHM6PC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPlRoZSBQT1NUIG9wZXJhdGlvbiBtdXN0IGJlIHBlcmZvcm1lZCBpbiByZXNwb25zZSB0byBhIHVzZXItaW5pdGlhdGVkXG5cdCAqIGFjdGlvbiwgc3VjaCBhcyBhIG1vdXNlIGNsaWNrIG9yIGtleSBwcmVzcy48L2xpPlxuXHQgKiAgIDxsaT5JZiB0aGUgUE9TVCBvcGVyYXRpb24gaXMgY3Jvc3MtZG9tYWluKHRoZSBQT1NUIHRhcmdldCBpcyBub3Qgb24gdGhlXG5cdCAqIHNhbWUgc2VydmVyIGFzIHRoZSBTV0YgZmlsZSB0aGF0IGlzIHNlbmRpbmcgdGhlIFBPU1QgcmVxdWVzdCksIHRoZSB0YXJnZXRcblx0ICogc2VydmVyIG11c3QgcHJvdmlkZSBhIFVSTCBwb2xpY3kgZmlsZSB0aGF0IHBlcm1pdHMgY3Jvc3MtZG9tYWluXG5cdCAqIGFjY2Vzcy48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiA8cD5BbHNvLCBmb3IgYW55IG11bHRpcGFydCBDb250ZW50LVR5cGUsIHRoZSBzeW50YXggbXVzdCBiZSB2YWxpZFxuXHQgKiAoYWNjb3JkaW5nIHRvIHRoZSBSRkMyMDQ2IHN0YW5kYXJkKS4gSWYgdGhlIHN5bnRheCBhcHBlYXJzIHRvIGJlIGludmFsaWQsXG5cdCAqIHRoZSBQT1NUIG9wZXJhdGlvbiBpcyBzdWJqZWN0IHRvIHRoZSBzZWN1cml0eSBydWxlcyBhcHBsaWVkIHRvXG5cdCAqIHVwbG9hZHMuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHNlY3VyaXR5LCBzZWUgdGhlIEZsYXNoIFBsYXllclxuXHQgKiBEZXZlbG9wZXIgQ2VudGVyIFRvcGljOiA8YVxuXHQgKiBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZGV2bmV0X3NlY3VyaXR5X2VuXCJcblx0ICogc2NvcGU9XCJleHRlcm5hbFwiPlNlY3VyaXR5PC9hPi48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSByZXF1ZXN0IFRoZSBhYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgb2YgdGhlIFNXRiwgSlBFRywgR0lGLCBvciBQTkdcblx0ICogICAgICAgICAgICAgICAgZmlsZSB0byBiZSBsb2FkZWQuIEEgcmVsYXRpdmUgcGF0aCBtdXN0IGJlIHJlbGF0aXZlIHRvIHRoZVxuXHQgKiAgICAgICAgICAgICAgICBtYWluIFNXRiBmaWxlLiBBYnNvbHV0ZSBVUkxzIG11c3QgaW5jbHVkZSB0aGUgcHJvdG9jb2xcblx0ICogICAgICAgICAgICAgICAgcmVmZXJlbmNlLCBzdWNoIGFzIGh0dHA6Ly8gb3IgZmlsZTovLy8uIEZpbGVuYW1lcyBjYW5ub3Rcblx0ICogICAgICAgICAgICAgICAgaW5jbHVkZSBkaXNrIGRyaXZlIHNwZWNpZmljYXRpb25zLlxuXHQgKiBAcGFyYW0gY29udGV4dCBBIExvYWRlckNvbnRleHQgb2JqZWN0LCB3aGljaCBoYXMgcHJvcGVydGllcyB0aGF0IGRlZmluZVxuXHQgKiAgICAgICAgICAgICAgICB0aGUgZm9sbG93aW5nOlxuXHQgKiAgICAgICAgICAgICAgICA8dWw+XG5cdCAqICAgICAgICAgICAgICAgICAgPGxpPldoZXRoZXIgb3Igbm90IHRvIGNoZWNrIGZvciB0aGUgZXhpc3RlbmNlIG9mIGEgcG9saWN5XG5cdCAqICAgICAgICAgICAgICAgIGZpbGUgdXBvbiBsb2FkaW5nIHRoZSBvYmplY3Q8L2xpPlxuXHQgKiAgICAgICAgICAgICAgICAgIDxsaT5UaGUgQXBwbGljYXRpb25Eb21haW4gZm9yIHRoZSBsb2FkZWQgb2JqZWN0PC9saT5cblx0ICogICAgICAgICAgICAgICAgICA8bGk+VGhlIFNlY3VyaXR5RG9tYWluIGZvciB0aGUgbG9hZGVkIG9iamVjdDwvbGk+XG5cdCAqICAgICAgICAgICAgICAgICAgPGxpPlRoZSBJbWFnZURlY29kaW5nUG9saWN5IGZvciB0aGUgbG9hZGVkIGltYWdlXG5cdCAqICAgICAgICAgICAgICAgIG9iamVjdDwvbGk+XG5cdCAqICAgICAgICAgICAgICAgIDwvdWw+XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgIDxwPklmIHRoZSA8Y29kZT5jb250ZXh0PC9jb2RlPiBwYXJhbWV0ZXIgaXMgbm90IHNwZWNpZmllZFxuXHQgKiAgICAgICAgICAgICAgICBvciByZWZlcnMgdG8gYSBudWxsIG9iamVjdCwgdGhlIGxvYWRlZCBjb250ZW50IHJlbWFpbnMgaW5cblx0ICogICAgICAgICAgICAgICAgaXRzIG93biBzZWN1cml0eSBkb21haW4uPC9wPlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICA8cD5Gb3IgY29tcGxldGUgZGV0YWlscywgc2VlIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgcHJvcGVydGllcyBpbiB0aGUgPGFcblx0ICogICAgICAgICAgICAgICAgaHJlZj1cIi4uL3N5c3RlbS9Mb2FkZXJDb250ZXh0Lmh0bWxcIj5Mb2FkZXJDb250ZXh0PC9hPlxuXHQgKiAgICAgICAgICAgICAgICBjbGFzcy48L3A+XG5cdCAqIEBwYXJhbSBucyAgICAgIEFuIG9wdGlvbmFsIG5hbWVzcGFjZSBzdHJpbmcgdW5kZXIgd2hpY2ggdGhlIGZpbGUgaXMgdG8gYmVcblx0ICogICAgICAgICAgICAgICAgbG9hZGVkLCBhbGxvd2luZyB0aGUgZGlmZmVyZW50aWF0aW9uIG9mIHR3byByZXNvdXJjZXMgd2l0aFxuXHQgKiAgICAgICAgICAgICAgICBpZGVudGljYWwgYXNzZXRzLlxuXHQgKiBAcGFyYW0gcGFyc2VyICBBbiBvcHRpb25hbCBwYXJzZXIgb2JqZWN0IGZvciB0cmFuc2xhdGluZyB0aGUgbG9hZGVkIGRhdGFcblx0ICogICAgICAgICAgICAgICAgaW50byBhIHVzYWJsZSByZXNvdXJjZS4gSWYgbm90IHByb3ZpZGVkLCBBc3NldExvYWRlciB3aWxsXG5cdCAqICAgICAgICAgICAgICAgIGF0dGVtcHQgdG8gYXV0by1kZXRlY3QgdGhlIGZpbGUgdHlwZS5cblx0ICogQHRocm93cyBJT0Vycm9yICAgICAgICAgICAgICAgVGhlIDxjb2RlPmRpZ2VzdDwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlcXVlc3Q8L2NvZGU+IG9iamVjdCBpcyBub3Rcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bnVsbDwvY29kZT4uIFlvdSBzaG91bGQgb25seSBzZXQgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmRpZ2VzdDwvY29kZT4gcHJvcGVydHkgb2YgYSBVUkxSZXF1ZXN0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIGNhbGxpbmcgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlVSTExvYWRlci5sb2FkKCk8L2NvZGU+IG1ldGhvZCB3aGVuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmcgYSBTV1ogZmlsZShhbiBBZG9iZSBwbGF0Zm9ybVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQpLlxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBJZiB0aGUgPGNvZGU+cmVxdWVzdGVkQ29udGVudFBhcmVudDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgb2YgdGhlIDxjb2RlPmNvbnRleHQ8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBhIDxjb2RlPkxvYWRlcjwvY29kZT4uXG5cdCAqIEB0aHJvd3MgSWxsZWdhbE9wZXJhdGlvbkVycm9yIElmIHRoZSA8Y29kZT5Mb2FkZXJDb250ZXh0LnBhcmFtZXRlcnM8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBzZXQgdG8gbm9uLW51bGwgYW5kIGhhcyBzb21lXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyB3aGljaCBhcmUgbm90IFN0cmluZ3MuXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciAgICAgICAgIFRoZSB2YWx1ZSBvZlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5Mb2FkZXJDb250ZXh0LnNlY3VyaXR5RG9tYWluPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXN0IGJlIGVpdGhlciA8Y29kZT5udWxsPC9jb2RlPiBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TZWN1cml0eURvbWFpbi5jdXJyZW50RG9tYWluPC9jb2RlPi5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyByZWZsZWN0cyB0aGUgZmFjdCB0aGF0IHlvdSBjYW4gb25seVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSB0aGUgbG9hZGVkIG1lZGlhIGluIGl0cyBuYXR1cmFsXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3VyaXR5IHNhbmRib3ggb3IgeW91ciBvd24odGhlIGxhdHRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlcyBhIHBvbGljeSBmaWxlKS5cblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yICAgICAgICAgTG9jYWwgU1dGIGZpbGVzIG1heSBub3Qgc2V0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvYWRlckNvbnRleHQuc2VjdXJpdHlEb21haW4gdG8gYW55dGhpbmdcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXIgdGhhbiA8Y29kZT5udWxsPC9jb2RlPi4gSXQgaXMgbm90XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pdHRlZCB0byBpbXBvcnQgbm9uLWxvY2FsIG1lZGlhIGludG8gYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbCBzYW5kYm94LCBvciB0byBwbGFjZSBvdGhlciBsb2NhbCBtZWRpYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbnl0aGluZyBvdGhlciB0aGFuIGl0cyBuYXR1cmFsIHNhbmRib3guXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciAgICAgICAgIFlvdSBjYW5ub3QgY29ubmVjdCB0byBjb21tb25seSByZXNlcnZlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3J0cy4gRm9yIGEgY29tcGxldGUgbGlzdCBvZiBibG9ja2VkIHBvcnRzLFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWUgXCJSZXN0cmljdGluZyBOZXR3b3JraW5nIEFQSXNcIiBpbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+QWN0aW9uU2NyaXB0IDMuMCBEZXZlbG9wZXIncyBHdWlkZTwvaT4uXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciAgICAgICAgIElmIHRoZSA8Y29kZT5hcHBsaWNhdGlvbkRvbWFpbjwvY29kZT4gb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2VjdXJpdHlEb21haW48L2NvZGU+IHByb3BlcnRpZXMgb2Zcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPmNvbnRleHQ8L2NvZGU+IHBhcmFtZXRlciBhcmUgZnJvbVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGRpc2FsbG93ZWQgZG9tYWluLlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgICAgICAgICBJZiBhIGxvY2FsIFNXRiBmaWxlIGlzIGF0dGVtcHRpbmcgdG8gdXNlIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZWN1cml0eURvbWFpbjwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmNvbnRleHQ8L2NvZGU+IHBhcmFtZXRlci5cblx0ICogQGV2ZW50IGFzeW5jRXJyb3IgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBpZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSBoYXMgYmVlbiBzcGVjaWZpZWQgYW5kIGl0IGlzIG5vdCBwb3NzaWJsZSB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICBhZGQgdGhlIGxvYWRlZCBjb250ZW50IGFzIGEgY2hpbGQgdG8gdGhlIHNwZWNpZmllZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBUaGlzIGNvdWxkIGhhcHBlbiBpZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgbG9hZGVkIGNvbnRlbnQgaXMgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5mbGFzaC5kaXNwbGF5LkFWTTFNb3ZpZTwvY29kZT4gb3IgaWYgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+IGNhbGwgdG8gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RlZENvbnRlbnRQYXJlbnQgdGhyb3dzIGFuIGVycm9yLlxuXHQgKiBAZXZlbnQgY29tcGxldGUgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gdGhlIGZpbGUgaGFzIGNvbXBsZXRlZCBsb2FkaW5nLiBUaGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Y29tcGxldGU8L2NvZGU+IGV2ZW50IGlzIGFsd2F5cyBkaXNwYXRjaGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIHRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudC5cblx0ICogQGV2ZW50IGh0dHBTdGF0dXMgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIGEgbmV0d29yayByZXF1ZXN0IGlzIG1hZGUgb3ZlciBIVFRQIGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgY2FuIGRldGVjdCB0aGUgSFRUUCBzdGF0dXMgY29kZS5cblx0ICogQGV2ZW50IGluaXQgICAgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSBsb2FkZWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgU1dGIGZpbGUgYXJlIGFjY2Vzc2libGUuIFRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBhbHdheXMgcHJlY2VkZXMgdGhlIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBldmVudC5cblx0ICogQGV2ZW50IGlvRXJyb3IgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIGFuIGlucHV0IG9yIG91dHB1dCBlcnJvciBvY2N1cnMgdGhhdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBjYXVzZXMgYSBsb2FkIG9wZXJhdGlvbiB0byBmYWlsLlxuXHQgKiBAZXZlbnQgb3BlbiAgICAgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gdGhlIGxvYWRpbmcgb3BlcmF0aW9uIHN0YXJ0cy5cblx0ICogQGV2ZW50IHByb2dyZXNzICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBhcyBkYXRhIGlzIHJlY2VpdmVkIHdoaWxlIGxvYWQgb3BlcmF0aW9uXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzZXMuXG5cdCAqIEBldmVudCBzZWN1cml0eUVycm9yIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgaWYgYSBTV0YgZmlsZSBpbiB0aGUgbG9jYWwtd2l0aC1maWxlc3lzdGVtXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHNhbmRib3ggYXR0ZW1wdHMgdG8gbG9hZCBjb250ZW50IGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBsb2NhbC13aXRoLW5ldHdvcmtpbmcgc2FuZGJveCwgb3IgdmljZSB2ZXJzYS5cblx0ICogQGV2ZW50IHNlY3VyaXR5RXJyb3IgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBpZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSBoYXMgYmVlbiBzcGVjaWZpZWQgYW5kIHRoZSBzZWN1cml0eSBzYW5kYm94XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5Mb2FkZXJDb250ZXh0LnJlcXVlc3RlZENvbnRlbnRQYXJlbnQ8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIHRoZSBsb2FkZWQgU1dGLlxuXHQgKiBAZXZlbnQgdW5sb2FkICAgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gYSBsb2FkZWQgb2JqZWN0IGlzIHJlbW92ZWQuXG5cdCAqL1xuXHRwdWJsaWMgbG9hZChyZXF1ZXN0OlVSTFJlcXVlc3QsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXG5cdHtcblx0XHR2YXIgdG9rZW46QXNzZXRMb2FkZXJUb2tlbjtcblxuXHRcdGlmICh0aGlzLl91c2VBc3NldExpYikge1xuXHRcdFx0dmFyIGxpYjpBc3NldExpYnJhcnlCdW5kbGU7XG5cdFx0XHRsaWIgPSBBc3NldExpYnJhcnlCdW5kbGUuZ2V0SW5zdGFuY2UodGhpcy5fYXNzZXRMaWJJZCk7XG5cdFx0XHR0b2tlbiA9IGxpYi5sb2FkKHJlcXVlc3QsIGNvbnRleHQsIG5zLCBwYXJzZXIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbG9hZGVyOkFzc2V0TG9hZGVyID0gbmV3IEFzc2V0TG9hZGVyKCk7XG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMucHVzaChsb2FkZXIpO1xuXHRcdFx0dG9rZW4gPSBsb2FkZXIubG9hZChyZXF1ZXN0LCBjb250ZXh0LCBucywgcGFyc2VyKTtcblx0XHR9XG5cblx0XHR0b2tlbi5hZGRFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCB0aGlzLl9vblJlc291cmNlQ29tcGxldGVEZWxlZ2F0ZSk7XG5cdFx0dG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cblx0XHQvLyBFcnJvciBhcmUgaGFuZGxlZCBzZXBhcmF0ZWx5IChzZWUgZG9jdW1lbnRhdGlvbiBmb3IgYWRkRXJyb3JIYW5kbGVyKVxuXHRcdHRva2VuLl9pTG9hZGVyLl9pQWRkRXJyb3JIYW5kbGVyKHRoaXMub25Mb2FkRXJyb3IpO1xuXHRcdHRva2VuLl9pTG9hZGVyLl9pQWRkUGFyc2VFcnJvckhhbmRsZXIodGhpcy5vblBhcnNlRXJyb3IpO1xuXG5cdFx0cmV0dXJuIHRva2VuO1xuXHR9XG5cblx0LyoqXG5cdCAqIExvYWRzIGZyb20gYmluYXJ5IGRhdGEgc3RvcmVkIGluIGEgQnl0ZUFycmF5IG9iamVjdC5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmxvYWRCeXRlcygpPC9jb2RlPiBtZXRob2QgaXMgYXN5bmNocm9ub3VzLiBZb3UgbXVzdCB3YWl0IGZvclxuXHQgKiB0aGUgXCJpbml0XCIgZXZlbnQgYmVmb3JlIGFjY2Vzc2luZyB0aGUgcHJvcGVydGllcyBvZiBhIGxvYWRlZCBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiA8cD5XaGVuIHlvdSB1c2UgdGhpcyBtZXRob2QsIGNvbnNpZGVyIHRoZSBGbGFzaCBQbGF5ZXIgc2VjdXJpdHkgbW9kZWwsXG5cdCAqIHdoaWNoIGlzIGRlc2NyaWJlZCBpbiB0aGUgTG9hZGVyIGNsYXNzIGRlc2NyaXB0aW9uLiA8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBieXRlcyAgIEEgQnl0ZUFycmF5IG9iamVjdC4gVGhlIGNvbnRlbnRzIG9mIHRoZSBCeXRlQXJyYXkgY2FuIGJlXG5cdCAqICAgICAgICAgICAgICAgIGFueSBvZiB0aGUgZmlsZSBmb3JtYXRzIHN1cHBvcnRlZCBieSB0aGUgTG9hZGVyIGNsYXNzOiBTV0YsXG5cdCAqICAgICAgICAgICAgICAgIEdJRiwgSlBFRywgb3IgUE5HLlxuXHQgKiBAcGFyYW0gY29udGV4dCBBIExvYWRlckNvbnRleHQgb2JqZWN0LiBPbmx5IHRoZVxuXHQgKiAgICAgICAgICAgICAgICA8Y29kZT5hcHBsaWNhdGlvbkRvbWFpbjwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgIExvYWRlckNvbnRleHQgb2JqZWN0IGFwcGxpZXM7IHRoZVxuXHQgKiAgICAgICAgICAgICAgICA8Y29kZT5jaGVja1BvbGljeUZpbGU8L2NvZGU+IGFuZFxuXHQgKiAgICAgICAgICAgICAgICA8Y29kZT5zZWN1cml0eURvbWFpbjwvY29kZT4gcHJvcGVydGllcyBvZiB0aGUgTG9hZGVyQ29udGV4dFxuXHQgKiAgICAgICAgICAgICAgICBvYmplY3QgZG8gbm90IGFwcGx5LlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICA8cD5JZiB0aGUgPGNvZGU+Y29udGV4dDwvY29kZT4gcGFyYW1ldGVyIGlzIG5vdCBzcGVjaWZpZWRcblx0ICogICAgICAgICAgICAgICAgb3IgcmVmZXJzIHRvIGEgbnVsbCBvYmplY3QsIHRoZSBjb250ZW50IGlzIGxvYWRlZCBpbnRvIHRoZVxuXHQgKiAgICAgICAgICAgICAgICBjdXJyZW50IHNlY3VyaXR5IGRvbWFpbiAtICBhIHByb2Nlc3MgcmVmZXJyZWQgdG8gYXMgXCJpbXBvcnRcblx0ICogICAgICAgICAgICAgICAgbG9hZGluZ1wiIGluIEZsYXNoIFBsYXllciBzZWN1cml0eSBkb2N1bWVudGF0aW9uLlxuXHQgKiAgICAgICAgICAgICAgICBTcGVjaWZpY2FsbHksIGlmIHRoZSBsb2FkaW5nIFNXRiBmaWxlIHRydXN0cyB0aGUgcmVtb3RlIFNXRlxuXHQgKiAgICAgICAgICAgICAgICBieSBpbmNvcnBvcmF0aW5nIHRoZSByZW1vdGUgU1dGIGludG8gaXRzIGNvZGUsIHRoZW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgIGxvYWRpbmcgU1dGIGNhbiBpbXBvcnQgaXQgZGlyZWN0bHkgaW50byBpdHMgb3duIHNlY3VyaXR5XG5cdCAqICAgICAgICAgICAgICAgIGRvbWFpbi48L3A+XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gc2VjdXJpdHksIHNlZSB0aGUgRmxhc2hcblx0ICogICAgICAgICAgICAgICAgUGxheWVyIERldmVsb3BlciBDZW50ZXIgVG9waWM6IDxhXG5cdCAqICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9kZXZuZXRfc2VjdXJpdHlfZW5cIlxuXHQgKiAgICAgICAgICAgICAgICBzY29wZT1cImV4dGVybmFsXCI+U2VjdXJpdHk8L2E+LjwvcD5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yICAgICAgICAgSWYgdGhlIDxjb2RlPmxlbmd0aDwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ5dGVBcnJheSBvYmplY3QgaXMgbm90IGdyZWF0ZXIgdGhhbiAwLlxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBJZiB0aGUgPGNvZGU+Y2hlY2tQb2xpY3lGaWxlPC9jb2RlPiBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZWN1cml0eURvbWFpbjwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmNvbnRleHQ8L2NvZGU+IHBhcmFtZXRlciBhcmUgbm9uLW51bGwuXG5cdCAqIEB0aHJvd3MgSWxsZWdhbE9wZXJhdGlvbkVycm9yIElmIHRoZSA8Y29kZT5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSBvZiB0aGUgPGNvZGU+Y29udGV4dDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIGlzIGEgPGNvZGU+TG9hZGVyPC9jb2RlPi5cblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgSWYgdGhlIDxjb2RlPkxvYWRlckNvbnRleHQucGFyYW1ldGVyczwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIGlzIHNldCB0byBub24tbnVsbCBhbmQgaGFzIHNvbWVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIHdoaWNoIGFyZSBub3QgU3RyaW5ncy5cblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yICAgICAgICAgSWYgdGhlIHByb3ZpZGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFwcGxpY2F0aW9uRG9tYWluPC9jb2RlPiBwcm9wZXJ0eSBvZlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+Y29udGV4dDwvY29kZT4gcHJvcGVydHkgaXMgZnJvbSBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FsbG93ZWQgZG9tYWluLlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgICAgICAgICBZb3UgY2Fubm90IGNvbm5lY3QgdG8gY29tbW9ubHkgcmVzZXJ2ZWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9ydHMuIEZvciBhIGNvbXBsZXRlIGxpc3Qgb2YgYmxvY2tlZCBwb3J0cyxcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlIFwiUmVzdHJpY3RpbmcgTmV0d29ya2luZyBBUElzXCIgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPkFjdGlvblNjcmlwdCAzLjAgRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LlxuXHQgKiBAZXZlbnQgYXN5bmNFcnJvciAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IGlmIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5Mb2FkZXJDb250ZXh0LnJlcXVlc3RlZENvbnRlbnRQYXJlbnQ8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5IGhhcyBiZWVuIHNwZWNpZmllZCBhbmQgaXQgaXMgbm90IHBvc3NpYmxlIHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGFkZCB0aGUgbG9hZGVkIGNvbnRlbnQgYXMgYSBjaGlsZCB0byB0aGUgc3BlY2lmaWVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIuIFRoaXMgY291bGQgaGFwcGVuIGlmIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBsb2FkZWQgY29udGVudCBpcyBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmZsYXNoLmRpc3BsYXkuQVZNMU1vdmllPC9jb2RlPiBvciBpZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4gY2FsbCB0byB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdGVkQ29udGVudFBhcmVudCB0aHJvd3MgYW4gZXJyb3IuXG5cdCAqIEBldmVudCBjb21wbGV0ZSAgICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLiBUaGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Y29tcGxldGU8L2NvZGU+IGV2ZW50IGlzIGFsd2F5cyBkaXNwYXRjaGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIHRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudC5cblx0ICogQGV2ZW50IGluaXQgICAgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSBsb2FkZWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgZGF0YSBhcmUgYWNjZXNzaWJsZS4gVGhlIDxjb2RlPmluaXQ8L2NvZGU+IGV2ZW50XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGFsd2F5cyBwcmVjZWRlcyB0aGUgPGNvZGU+Y29tcGxldGU8L2NvZGU+IGV2ZW50LlxuXHQgKiBAZXZlbnQgaW9FcnJvciAgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gdGhlIHJ1bnRpbWUgY2Fubm90IHBhcnNlIHRoZSBkYXRhIGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBieXRlIGFycmF5LlxuXHQgKiBAZXZlbnQgb3BlbiAgICAgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gdGhlIG9wZXJhdGlvbiBzdGFydHMuXG5cdCAqIEBldmVudCBwcm9ncmVzcyAgICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgYXMgZGF0YSBpcyB0cmFuc2ZlcmVkIGluIG1lbW9yeS5cblx0ICogQGV2ZW50IHNlY3VyaXR5RXJyb3IgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBpZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSBoYXMgYmVlbiBzcGVjaWZpZWQgYW5kIHRoZSBzZWN1cml0eSBzYW5kYm94XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5Mb2FkZXJDb250ZXh0LnJlcXVlc3RlZENvbnRlbnRQYXJlbnQ8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIHRoZSBsb2FkZWQgU1dGLlxuXHQgKiBAZXZlbnQgdW5sb2FkICAgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gYSBsb2FkZWQgb2JqZWN0IGlzIHJlbW92ZWQuXG5cdCAqL1xuXHRwdWJsaWMgbG9hZERhdGEoZGF0YTphbnksIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXG5cdHtcblx0XHR2YXIgdG9rZW46QXNzZXRMb2FkZXJUb2tlbjtcblxuXHRcdGlmICh0aGlzLl91c2VBc3NldExpYikge1xuXHRcdFx0dmFyIGxpYjpBc3NldExpYnJhcnlCdW5kbGU7XG5cdFx0XHRsaWIgPSBBc3NldExpYnJhcnlCdW5kbGUuZ2V0SW5zdGFuY2UodGhpcy5fYXNzZXRMaWJJZCk7XG5cdFx0XHR0b2tlbiA9IGxpYi5sb2FkRGF0YShkYXRhLCBjb250ZXh0LCBucywgcGFyc2VyKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlciA9IG5ldyBBc3NldExvYWRlcigpO1xuXHRcdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zLnB1c2gobG9hZGVyKTtcblx0XHRcdHRva2VuID0gbG9hZGVyLmxvYWREYXRhKGRhdGEsICcnLCBjb250ZXh0LCBucywgcGFyc2VyKTtcblx0XHR9XG5cblx0XHR0b2tlbi5hZGRFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCB0aGlzLl9vblJlc291cmNlQ29tcGxldGVEZWxlZ2F0ZSk7XG5cdFx0dG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cblx0XHQvLyBFcnJvciBhcmUgaGFuZGxlZCBzZXBhcmF0ZWx5IChzZWUgZG9jdW1lbnRhdGlvbiBmb3IgYWRkRXJyb3JIYW5kbGVyKVxuXHRcdHRva2VuLl9pTG9hZGVyLl9pQWRkRXJyb3JIYW5kbGVyKHRoaXMub25Mb2FkRXJyb3IpO1xuXHRcdHRva2VuLl9pTG9hZGVyLl9pQWRkUGFyc2VFcnJvckhhbmRsZXIodGhpcy5vblBhcnNlRXJyb3IpO1xuXG5cdFx0cmV0dXJuIHRva2VuO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYSBjaGlsZCBvZiB0aGlzIExvYWRlciBvYmplY3QgdGhhdCB3YXMgbG9hZGVkIGJ5IHVzaW5nIHRoZVxuXHQgKiA8Y29kZT5sb2FkKCk8L2NvZGU+IG1ldGhvZC4gVGhlIDxjb2RlPnByb3BlcnR5PC9jb2RlPiBvZiB0aGUgYXNzb2NpYXRlZFxuXHQgKiBMb2FkZXJJbmZvIG9iamVjdCBpcyByZXNldCB0byA8Y29kZT5udWxsPC9jb2RlPi4gVGhlIGNoaWxkIGlzIG5vdFxuXHQgKiBuZWNlc3NhcmlseSBkZXN0cm95ZWQgYmVjYXVzZSBvdGhlciBvYmplY3RzIG1pZ2h0IGhhdmUgcmVmZXJlbmNlcyB0byBpdDtcblx0ICogaG93ZXZlciwgaXQgaXMgbm8gbG9uZ2VyIGEgY2hpbGQgb2YgdGhlIExvYWRlciBvYmplY3QuXG5cdCAqXG5cdCAqIDxwPkFzIGEgYmVzdCBwcmFjdGljZSwgYmVmb3JlIHlvdSB1bmxvYWQgYSBjaGlsZCBTV0YgZmlsZSwgeW91IHNob3VsZFxuXHQgKiBleHBsaWNpdGx5IGNsb3NlIGFueSBzdHJlYW1zIGluIHRoZSBjaGlsZCBTV0YgZmlsZSdzIG9iamVjdHMsIHN1Y2ggYXNcblx0ICogTG9jYWxDb25uZWN0aW9uLCBOZXRDb25uZWN0aW9uLCBOZXRTdHJlYW0sIGFuZCBTb3VuZCBvYmplY3RzLiBPdGhlcndpc2UsXG5cdCAqIGF1ZGlvIGluIHRoZSBjaGlsZCBTV0YgZmlsZSBtaWdodCBjb250aW51ZSB0byBwbGF5LCBldmVuIHRob3VnaCB0aGUgY2hpbGRcblx0ICogU1dGIGZpbGUgd2FzIHVubG9hZGVkLiBUbyBjbG9zZSBzdHJlYW1zIGluIHRoZSBjaGlsZCBTV0YgZmlsZSwgYWRkIGFuXG5cdCAqIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjaGlsZCB0aGF0IGxpc3RlbnMgZm9yIHRoZSA8Y29kZT51bmxvYWQ8L2NvZGU+XG5cdCAqIGV2ZW50LiBXaGVuIHRoZSBwYXJlbnQgY2FsbHMgPGNvZGU+TG9hZGVyLnVubG9hZCgpPC9jb2RlPiwgdGhlXG5cdCAqIDxjb2RlPnVubG9hZDwvY29kZT4gZXZlbnQgaXMgZGlzcGF0Y2hlZCB0byB0aGUgY2hpbGQuIFRoZSBmb2xsb3dpbmcgY29kZVxuXHQgKiBzaG93cyBob3cgeW91IG1pZ2h0IGRvIHRoaXM6PC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IHB1YmxpYyBjbG9zZUFsbFN0cmVhbXMoZXZ0OkV2ZW50KSB7XG5cdCAqIG15TmV0U3RyZWFtLmNsb3NlKCk7IG15U291bmQuY2xvc2UoKTsgbXlOZXRDb25uZWN0aW9uLmNsb3NlKCk7XG5cdCAqIG15TG9jYWxDb25uZWN0aW9uLmNsb3NlKCk7IH1cblx0ICogbXlNb3ZpZUNsaXAubG9hZGVySW5mby5hZGRFdmVudExpc3RlbmVyKEV2ZW50LlVOTE9BRCxcblx0ICogY2xvc2VBbGxTdHJlYW1zKTs8L3ByZT5cblx0ICpcblx0ICovXG5cdHB1YmxpYyB1bmxvYWQoKVxuXHR7XG5cdFx0Ly9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogRW5hYmxlcyBhIHNwZWNpZmljIHBhcnNlci5cblx0ICogV2hlbiBubyBzcGVjaWZpYyBwYXJzZXIgaXMgc2V0IGZvciBhIGxvYWRpbmcvcGFyc2luZyBvcHBlcmF0aW9uLFxuXHQgKiBsb2FkZXIzZCBjYW4gYXV0b3NlbGVjdCB0aGUgY29ycmVjdCBwYXJzZXIgdG8gdXNlLlxuXHQgKiBBIHBhcnNlciBtdXN0IGhhdmUgYmVlbiBlbmFibGVkLCB0byBiZSBjb25zaWRlcmVkIHdoZW4gYXV0b3NlbGVjdGluZyB0aGUgcGFyc2VyLlxuXHQgKlxuXHQgKiBAcGFyYW0gcGFyc2VyQ2xhc3MgVGhlIHBhcnNlciBjbGFzcyB0byBlbmFibGUuXG5cdCAqIEBzZWUgYXdheS5wYXJzZXJzLlBhcnNlcnNcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzOk9iamVjdClcblx0e1xuXHRcdEFzc2V0TG9hZGVyLmVuYWJsZVBhcnNlcihwYXJzZXJDbGFzcyk7XG5cdH1cblxuXHQvKipcblx0ICogRW5hYmxlcyBhIGxpc3Qgb2YgcGFyc2Vycy5cblx0ICogV2hlbiBubyBzcGVjaWZpYyBwYXJzZXIgaXMgc2V0IGZvciBhIGxvYWRpbmcvcGFyc2luZyBvcHBlcmF0aW9uLFxuXHQgKiBsb2FkZXIzZCBjYW4gYXV0b3NlbGVjdCB0aGUgY29ycmVjdCBwYXJzZXIgdG8gdXNlLlxuXHQgKiBBIHBhcnNlciBtdXN0IGhhdmUgYmVlbiBlbmFibGVkLCB0byBiZSBjb25zaWRlcmVkIHdoZW4gYXV0b3NlbGVjdGluZyB0aGUgcGFyc2VyLlxuXHQgKlxuXHQgKiBAcGFyYW0gcGFyc2VyQ2xhc3NlcyBBIFZlY3RvciBvZiBwYXJzZXIgY2xhc3NlcyB0byBlbmFibGUuXG5cdCAqIEBzZWUgYXdheS5wYXJzZXJzLlBhcnNlcnNcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgZW5hYmxlUGFyc2VycyhwYXJzZXJDbGFzc2VzOkFycmF5PE9iamVjdD4pXG5cdHtcblx0XHRBc3NldExvYWRlci5lbmFibGVQYXJzZXJzKHBhcnNlckNsYXNzZXMpO1xuXHR9XG5cblxuXHRwcml2YXRlIHJlbW92ZUxpc3RlbmVycyhkaXNwYXRjaGVyOkV2ZW50RGlzcGF0Y2hlcilcblx0e1xuXHRcdGRpc3BhdGNoZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdGRpc3BhdGNoZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XG5cdH1cblxuXHRwcml2YXRlIG9uQXNzZXRDb21wbGV0ZShldmVudDpBc3NldEV2ZW50KVxuXHR7XG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIGxvYWRpbmdcblx0ICovXG5cdHByaXZhdGUgb25Mb2FkRXJyb3IoZXZlbnQ6TG9hZGVyRXZlbnQpOmJvb2xlYW5cblx0e1xuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIoSU9FcnJvckV2ZW50LklPX0VSUk9SKSkge1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIGEgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBwYXJzaW5nXG5cdCAqL1xuXHRwcml2YXRlIG9uUGFyc2VFcnJvcihldmVudDpQYXJzZXJFdmVudCk6Ym9vbGVhblxuXHR7XG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihQYXJzZXJFdmVudC5QQVJTRV9FUlJPUikpIHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiB0aGUgcmVzb3VyY2UgYW5kIGFsbCBvZiBpdHMgZGVwZW5kZW5jaWVzIHdhcyByZXRyaWV2ZWQuXG5cdCAqL1xuXHRwcml2YXRlIG9uUmVzb3VyY2VDb21wbGV0ZShldmVudDpMb2FkZXJFdmVudClcblx0e1xuXHRcdHZhciBjb250ZW50OkRpc3BsYXlPYmplY3QgPSBldmVudC5jb250ZW50O1xuXG5cdFx0dGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG5cblx0XHRpZiAoY29udGVudClcblx0XHRcdHRoaXMuYWRkQ2hpbGQoY29udGVudCk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHR9XG59XG5cbmV4cG9ydCA9IExvYWRlcjsiXX0=