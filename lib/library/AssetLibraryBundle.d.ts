import { URLRequest } from "../net/URLRequest";
import { AssetLibraryIterator } from "../library/AssetLibraryIterator";
import { Loader } from "../library/Loader";
import { LoaderContext } from "../library/LoaderContext";
import { ConflictStrategyBase } from "../library/ConflictStrategyBase";
import { IAsset } from "../library/IAsset";
import { EventDispatcher } from "../events/EventDispatcher";
import { ParserBase } from "../parsers/ParserBase";
/**
 * AssetLibraryBundle enforces a multiton pattern and is not intended to be instanced directly.
 * Its purpose is to create a container for 3D data management, both before and after parsing.
 * If you are interested in creating multiple library bundles, please use the <code>getInstance()</code> method.
 */
export declare class AssetLibraryBundle extends EventDispatcher {
    static _iInstances: Object;
    private _loaderSessions;
    private _strategy;
    private _strategyPreference;
    private _assets;
    private _assetDictionary;
    private _assetDictDirty;
    private _loaderSessionsGarbage;
    private _gcTimeoutIID;
    private _onAssetRenameDelegate;
    private _onAssetConflictResolvedDelegate;
    private _onResourceCompleteDelegate;
    private _onTextureSizeErrorDelegate;
    private _onAssetCompleteDelegate;
    private _onLoadErrorDelegate;
    private _onParseErrorDelegate;
    /**
     * Creates a new <code>AssetLibraryBundle</code> object.
     *
     * @param me A multiton enforcer for the AssetLibraryBundle ensuring it cannnot be instanced.
     */
    constructor();
    /**
     * Returns an AssetLibraryBundle instance. If no key is given, returns the default bundle instance (which is
     * similar to using the AssetLibraryBundle as a singleton.) To keep several separated library bundles,
     * pass a string key to this method to define which bundle should be returned. This is
     * referred to as using the AssetLibrary as a multiton.
     *
     * @param key Defines which multiton instance should be returned.
     * @return An instance of the asset library
     */
    static getInstance(key?: string): AssetLibraryBundle;
    /**
     *
     */
    enableParser(parserClass: Object): void;
    /**
     *
     */
    enableParsers(parserClasses: Object[]): void;
    /**
     * Defines which strategy should be used for resolving naming conflicts, when two library
     * assets are given the same name. By default, <code>ConflictStrategy.APPEND_NUM_SUFFIX</code>
     * is used which means that a numeric suffix is appended to one of the assets. The
     * <code>conflictPrecedence</code> property defines which of the two conflicting assets will
     * be renamed.
     *
     * @see naming.ConflictStrategy
     * @see AssetLibrary.conflictPrecedence
     */
    conflictStrategy: ConflictStrategyBase;
    /**
     * Defines which asset should have precedence when resolving a naming conflict between
     * two assets of which one has just been renamed by the user or by a parser. By default
     * <code>ConflictPrecedence.FAVOR_NEW</code> is used, meaning that the newly renamed
     * asset will keep it's new name while the older asset gets renamed to not conflict.
     *
     * This property is ignored for conflict strategies that do not actually rename an
     * asset automatically, such as ConflictStrategy.IGNORE and ConflictStrategy.THROW_ERROR.
     *
     * @see away.library.ConflictPrecedence
     * @see away.library.ConflictStrategy
     */
    conflictPrecedence: string;
    /**
     * Create an AssetLibraryIterator instance that can be used to iterate over the assets
     * in this asset library instance. The iterator can filter assets on asset type and/or
     * namespace. A "null" filter value means no filter of that type is used.
     *
     * @param assetTypeFilter Asset type to filter on (from the AssetType enum class.) Use
     * null to not filter on asset type.
     * @param namespaceFilter Namespace to filter on. Use null to not filter on namespace.
     * @param filterFunc Callback function to use when deciding whether an asset should be
     * included in the iteration or not. This needs to be a function that takes a single
     * parameter of type IAsset and returns a boolean where true means it should be included.
     *
     * @see away.library.AssetType
     */
    createIterator(assetTypeFilter?: string, namespaceFilter?: string, filterFunc?: any): AssetLibraryIterator;
    /**
     * Loads a file and (optionally) all of its dependencies.
     *
     * @param req The URLRequest object containing the URL of the file to be loaded.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, Loader will attempt to auto-detect the file type.
     * @return A handle to the retrieved resource.
     */
    load(req: URLRequest, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
    /**
     * Loads a resource from existing data in memory.
     *
     * @param data The data object containing all resource information.
     * @param context An optional context object providing additional parameters for loading
     * @param ns An optional namespace string under which the file is to be loaded, allowing the differentiation of two resources with identical assets
     * @param parser An optional parser object for translating the loaded data into a usable resource. If not provided, Loader will attempt to auto-detect the file type.
     * @return A handle to the retrieved resource.
     */
    loadData(data: any, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
    getLoader(): Loader;
    disposeLoader(loader: Loader): void;
    /**
     *
     */
    getAsset(name: string, ns?: string): IAsset;
    getAllAssets(): Array<IAsset>;
    /**
     * Adds an asset to the asset library, first making sure that it's name is unique
     * using the method defined by the <code>conflictStrategy</code> and
     * <code>conflictPrecedence</code> properties.
     */
    addAsset(asset: IAsset): void;
    /**
     * Removes an asset from the library, and optionally disposes that asset by calling
     * it's disposeAsset() method (which for most assets is implemented as a default
     * version of that type's dispose() method.
     *
     * @param asset The asset which should be removed from this library.
     * @param dispose Defines whether the assets should also be disposed.
     */
    removeAsset(asset: IAsset, dispose?: boolean): void;
    /**
     * Removes an asset which is specified using name and namespace.
     *
     * @param name The name of the asset to be removed.
     * @param ns The namespace to which the desired asset belongs.
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see away.library.AssetLibrary.removeAsset()
     */
    removeAssetByName(name: string, ns?: string, dispose?: boolean): IAsset;
    /**
     * Removes all assets from the asset library, optionally disposing them as they
     * are removed.
     *
     * @param dispose Defines whether the assets should also be disposed.
     */
    removeAllAssets(dispose?: boolean): void;
    /**
     * Removes all assets belonging to a particular namespace (null for default)
     * from the asset library, and optionall disposes them by calling their
     * disposeAsset() method.
     *
     * @param ns The namespace from which all assets should be removed.
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see away.library.AssetLibrary.removeAsset()
     */
    removeNamespaceAssets(ns?: string, dispose?: boolean): void;
    private removeAssetFromDict(asset, autoRemoveEmptyNamespace?);
    stopAllLoaders(): void;
    private rehashAssetDict();
    /**
     * Called when a an error occurs during loading.
     */
    private onLoadError(event);
    /**
     * Called when a an error occurs during parsing.
     */
    private onParseError(event);
    private onAssetComplete(event);
    private onTextureSizeError(event);
    /**
     * Called when the resource and all of its dependencies was retrieved.
     */
    private onResourceComplete(event);
    private loaderSessionGC();
    private killloaderSession(loader);
    private onAssetRename(event);
    private onAssetConflictResolved(event);
}
