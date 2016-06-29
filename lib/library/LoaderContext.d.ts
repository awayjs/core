export declare class LoaderContext {
    static UNDEFINED: number;
    static SINGLEPASS_MATERIALS: number;
    static MULTIPASS_MATERIALS: number;
    private _includeDependencies;
    private _dependencyBaseUrl;
    private _embeddedDataByUrl;
    private _remappedUrls;
    private _materialMode;
    private _overrideAbsPath;
    private _overrideFullUrls;
    /**
     * LoaderContext provides configuration for the Loader load() and parse() operations.
     * Use it to configure how (and if) dependencies are loaded, or to map dependency URLs to
     * embedded data.
     *
     * @see away.loading.Loader
     */
    constructor(includeDependencies?: boolean, dependencyBaseUrl?: string);
    /**
     * Defines whether dependencies (all files except the one at the URL given to the load() or
     * parseData() operations) should be automatically loaded. Defaults to true.
     */
    includeDependencies: boolean;
    /**
     * MaterialMode defines, if the Parser should create SinglePass or MultiPass Materials
     * Options:
     * 0 (Default / undefined) - All Parsers will create SinglePassMaterials, but the AWD2.1parser will create Materials as they are defined in the file
     * 1 (Force SinglePass) - All Parsers create SinglePassMaterials
     * 2 (Force MultiPass) - All Parsers will create MultiPassMaterials
     *
     */
    materialMode: number;
    /**
     * A base URL that will be prepended to all relative dependency URLs found in a loaded resource.
     * Absolute paths will not be affected by the value of this property.
     */
    dependencyBaseUrl: string;
    /**
     * Defines whether absolute paths (defined as paths that begin with a "/") should be overridden
     * with the dependencyBaseUrl defined in this context. If this is true, and the base path is
     * "base", /path/to/asset.jpg will be resolved as base/path/to/asset.jpg.
     */
    overrideAbsolutePaths: boolean;
    /**
     * Defines whether "full" URLs (defined as a URL that includes a scheme, e.g. http://) should be
     * overridden with the dependencyBaseUrl defined in this context. If this is true, and the base
     * path is "base", http://example.com/path/to/asset.jpg will be resolved as base/path/to/asset.jpg.
     */
    overrideFullURLs: boolean;
    /**
     * Map a URL to another URL, so that files that are referred to by the original URL will instead
     * be loaded from the new URL. Use this when your file structure does not match the one that is
     * expected by the loaded file.
     *
     * @param originalUrl The original URL which is referenced in the loaded resource.
     * @param newUrl The URL from which away.should load the resource instead.
     *
     * @see mapUrlToData()
     */
    mapUrl(originalUrl: string, newUrl: string): void;
    /**
     * Map a URL to embedded data, so that instead of trying to load a dependency from the URL at
     * which it's referenced, the dependency data will be retrieved straight from the memory instead.
     *
     * @param originalUrl The original URL which is referenced in the loaded resource.
     * @param data The embedded data. Can be ByteArray or a export class which can be used to create a bytearray.
     */
    mapUrlToData(originalUrl: string, data: any): void;
    /**
     * @private
     * Defines whether embedded data has been mapped to a particular URL.
     */
    _iHasDataForUrl(url: string): boolean;
    /**
     * @private
     * Returns embedded data for a particular URL.
     */
    _iGetDataForUrl(url: string): any;
    /**
     * @private
     * Defines whether a replacement URL has been mapped to a particular URL.
     */
    _iHasMappingForUrl(url: string): boolean;
    /**
     * @private
     * Returns new (replacement) URL for a particular original URL.
     */
    _iGetRemappedUrl(originalUrl: string): string;
}
