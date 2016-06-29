import { URLRequest } from "../net/URLRequest";
import { EventBase } from "../events/EventBase";
import { AssetLibraryBundle } from "../library/AssetLibraryBundle";
import { AssetLibraryIterator } from "../library/AssetLibraryIterator";
import { Loader } from "../library/Loader";
import { LoaderContext } from "../library/LoaderContext";
import { ConflictStrategyBase } from "../library/ConflictStrategyBase";
import { IAsset } from "../library/IAsset";
import { ParserBase } from "../parsers/ParserBase";
/**
 * AssetLibrary enforces a singleton pattern and is not intended to be instanced.
 * It's purpose is to allow access to the default library bundle through a set of static shortcut methods.
 * If you are interested in creating multiple library bundles, please use the <code>getBundle()</code> method.
 */
export declare class AssetLibrary {
    /**
     * Creates a new <code>AssetLibrary</code> object.
     *
     */
    constructor();
    /**
     * Returns an AssetLibrary bundle instance. If no key is given, returns the default bundle (which is
     * similar to using the AssetLibraryBundle as a singleton). To keep several separated library bundles,
     * pass a string key to this method to define which bundle should be returned. This is
     * referred to as using the AssetLibraryBundle as a multiton.
     *
     * @param key Defines which multiton instance should be returned.
     * @return An instance of the asset library
     */
    static getBundle(key?: string): AssetLibraryBundle;
    /**
     *
     */
    static enableParser(parserClass: any): void;
    /**
     *
     */
    static enableParsers(parserClasses: Array<Object>): void;
    /**
     * Short-hand for conflictStrategy property on default asset library bundle.
     *
     * @see AssetLibraryBundle.conflictStrategy
     */
    static conflictStrategy: ConflictStrategyBase;
    /**
     * Short-hand for conflictPrecedence property on default asset library bundle.
     *
     * @see AssetLibraryBundle.conflictPrecedence
     */
    static conflictPrecedence: string;
    /**
     * Short-hand for createIterator() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.createIterator()
     */
    static createIterator(assetTypeFilter?: string, namespaceFilter?: string, filterFunc?: any): AssetLibraryIterator;
    /**
     * Short-hand for load() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.load()
     */
    static load(req: URLRequest, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
    /**
     * Short-hand for loadData() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.loadData()
     */
    static loadData(data: any, context?: LoaderContext, ns?: string, parser?: ParserBase): void;
    static stopLoad(): void;
    static getLoader(): Loader;
    /**
     * Short-hand for getAsset() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.getAsset()
     */
    static getAsset(name: string, ns?: string): IAsset;
    /**
     * Short-hand for getAsset() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.getAsset()
     */
    static getAllAssets(): Array<IAsset>;
    /**
     * Short-hand for addEventListener() method on default asset library bundle.
     */
    static addEventListener(type: string, listener: (event: EventBase) => void): void;
    /**
     * Short-hand for removeEventListener() method on default asset library bundle.
     */
    static removeEventListener(type: string, listener: (event: EventBase) => void): void;
    /**
     * Short-hand for hasEventListener() method on default asset library bundle.

     public static hasEventListener(type:string):boolean
     {
        return AssetLibrary.getBundle().hasEventListener(type);
    }

     public static willTrigger(type:string):boolean
     {
        return getBundle().willTrigger(type);
    }
     */
    /**
     * Short-hand for addAsset() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.addAsset()
     */
    static addAsset(asset: IAsset): void;
    /**
     * Short-hand for removeAsset() method on default asset library bundle.
     *
     * @param asset The asset which should be removed from the library.
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see AssetLibraryBundle.removeAsset()
     */
    static removeAsset(asset: IAsset, dispose?: boolean): void;
    /**
     * Short-hand for removeAssetByName() method on default asset library bundle.
     *
     * @param name The name of the asset to be removed.
     * @param ns The namespace to which the desired asset belongs.
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see AssetLibraryBundle.removeAssetByName()
     */
    static removeAssetByName(name: string, ns?: string, dispose?: boolean): IAsset;
    /**
     * Short-hand for removeAllAssets() method on default asset library bundle.
     *
     * @param dispose Defines whether the assets should also be disposed.
     *
     * @see AssetLibraryBundle.removeAllAssets()
     */
    static removeAllAssets(dispose?: boolean): void;
    /**
     * Short-hand for removeNamespaceAssets() method on default asset library bundle.
     *
     * @see AssetLibraryBundle.removeNamespaceAssets()
     */
    static removeNamespaceAssets(ns?: string, dispose?: boolean): void;
}
