///<reference path="../_definitions.ts"/>

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
module away.containers
{
	import DisplayObject			= away.base.DisplayObject;
	import LoaderInfo				= away.base.LoaderInfo;
	import AssetEvent				= away.events.AssetEvent;
	import EventDispatcher			= away.events.EventDispatcher;
	import IOErrorEvent				= away.events.IOErrorEvent;
	import LoaderEvent				= away.events.LoaderEvent;
	import ParserEvent				= away.events.ParserEvent;
	import AssetLoader				= away.library.AssetLoader;
	import AssetLoaderContext		= away.library.AssetLoaderContext;
	import AssetLoaderToken			= away.library.AssetLoaderToken;
	import ParserBase				= away.parsers.ParserBase;
	import URLRequest				= away.net.URLRequest;
	/**
	 * Dispatched when any asset finishes parsing. Also see specific events for each
	 * individual asset type (meshes, materials et c.)
	 *
	 * @eventType away3d.events.AssetEvent
	 */
	//[Event(name="assetComplete", type="away3d.events.AssetEvent")]


	/**
	 * Dispatched when a full resource (including dependencies) finishes loading.
	 *
	 * @eventType away3d.events.LoaderEvent
	 */
	//[Event(name="resourceComplete", type="away3d.events.LoaderEvent")]

	export class Loader extends DisplayObjectContainer
	{
		private _loadingSessions:Array<AssetLoader>;
		private _useAssetLib:boolean;
		private _assetLibId:string;
		private _onResourceCompleteDelegate:Function;
		private _onAssetCompleteDelegate:Function;

		private _content:DisplayObject;
		private _contentLoaderInfo:LoaderInfo;
		
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
		public get content():DisplayObject
		{
			return this._content;
		}
	
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
		public get contentLoaderInfo():LoaderInfo
		{
			return this._contentLoaderInfo;
		}
	
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
		constructor(useAssetLibrary:boolean = true, assetLibraryId:string = null)
		{
			super();

			this._loadingSessions = new Array<AssetLoader>();
			this._useAssetLib = useAssetLibrary;
			this._assetLibId = assetLibraryId;

			this._onResourceCompleteDelegate = away.utils.Delegate.create(this, this.onResourceComplete);
			this._onAssetCompleteDelegate = away.utils.Delegate.create(this, this.onAssetComplete);
		}
	
		/**
		 * Cancels a <code>load()</code> method operation that is currently in
		 * progress for the Loader instance.
		 * 
		 */
		public close()
		{
			if (this._useAssetLib) {
				var lib:away.library.AssetLibraryBundle;
				lib = away.library.AssetLibraryBundle.getInstance(this._assetLibId);
				lib.stopAllLoadingSessions();
				this._loadingSessions = null;
				return
			}
			var i:number /*int*/;
			var length:number /*int*/ = this._loadingSessions.length;
			for (i = 0; i < length; i++) {
				this.removeListeners(this._loadingSessions[i]);
				this._loadingSessions[i].stop();
				this._loadingSessions[i] = null;
			}
			this._loadingSessions = null;
		}
	
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
		public load(request:URLRequest, context:AssetLoaderContext = null, ns:string = null, parser:ParserBase = null):AssetLoaderToken
		{
			var token:AssetLoaderToken;

			if (this._useAssetLib) {
				var lib:away.library.AssetLibraryBundle;
				lib = away.library.AssetLibraryBundle.getInstance(this._assetLibId);
				token = lib.load(request, context, ns, parser);
			} else {
				var loader:AssetLoader = new AssetLoader();
				this._loadingSessions.push(loader);
				token = loader.load(request, context, ns, parser);
			}

			token.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
			token.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

			// Error are handled separately (see documentation for addErrorHandler)
			token._iLoader._iAddErrorHandler(this.onLoadError);
			token._iLoader._iAddParseErrorHandler(this.onParseError);

			return token;
		}
	
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
		public loadData(data:any, context:AssetLoaderContext = null, ns:string = null, parser:ParserBase = null):AssetLoaderToken
		{
			var token:AssetLoaderToken;

			if (this._useAssetLib) {
				var lib:away.library.AssetLibraryBundle;
				lib = away.library.AssetLibraryBundle.getInstance(this._assetLibId);
				token = lib.loadData(data, context, ns, parser);
			} else {
				var loader:AssetLoader = new AssetLoader();
				this._loadingSessions.push(loader);
				token = loader.loadData(data, '', context, ns, parser);
			}

			token.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
			token.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);

			// Error are handled separately (see documentation for addErrorHandler)
			token._iLoader._iAddErrorHandler(this.onLoadError);
			token._iLoader._iAddParseErrorHandler(this.onParseError);

			return token;
		}
	
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
		public unload()
		{
			//TODO
		}

		/**
		 * Enables a specific parser.
		 * When no specific parser is set for a loading/parsing opperation,
		 * loader3d can autoselect the correct parser to use.
		 * A parser must have been enabled, to be considered when autoselecting the parser.
		 *
		 * @param parserClass The parser class to enable.
		 * @see away.parsers.Parsers
		 */
		public static enableParser(parserClass:Object):void
		{
			AssetLoader.enableParser(parserClass);
		}

		/**
		 * Enables a list of parsers.
		 * When no specific parser is set for a loading/parsing opperation,
		 * loader3d can autoselect the correct parser to use.
		 * A parser must have been enabled, to be considered when autoselecting the parser.
		 *
		 * @param parserClasses A Vector of parser classes to enable.
		 * @see away.parsers.Parsers
		 */
		public static enableParsers(parserClasses:Array<Object>):void
		{
			AssetLoader.enableParsers(parserClasses);
		}


		private removeListeners(dispatcher:EventDispatcher):void
		{
			dispatcher.removeEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
			dispatcher.removeEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
		}

		private onAssetComplete(event:AssetEvent):void
		{
			this.dispatchEvent(event);
		}

		/**
		 * Called when an error occurs during loading
		 */
		private onLoadError(event:LoaderEvent):boolean
		{
			if (this.hasEventListener(IOErrorEvent.IO_ERROR)) {
				this.dispatchEvent(event);
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Called when a an error occurs during parsing
		 */
		private onParseError(event:ParserEvent):boolean
		{
			if (this.hasEventListener(ParserEvent.PARSE_ERROR)) {
				this.dispatchEvent(event);
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Called when the resource and all of its dependencies was retrieved.
		 */
		private onResourceComplete(event:LoaderEvent)
		{
			var content:DisplayObject = event.content;

			this._content = content;

			if (content)
				this.addChild(content);

			this.dispatchEvent(event);
		}
	}
}
