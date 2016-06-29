import { IAsset } from "../library/IAsset";
import { URLLoader } from "../net/URLLoader";
import { URLRequest } from "../net/URLRequest";
import { ParserBase } from "../parsers/ParserBase";
/**
 * ResourceDependency represents the data required to load, parse and resolve additional files ("dependencies")
 * required by a parser, used by ResourceLoadSession.
 *
 */
export declare class ResourceDependency {
    private _id;
    private _sub_id;
    private _request;
    private _assets;
    private _parser;
    private _parentParser;
    private _data;
    private _retrieveAsRawData;
    private _suppressAssetEvents;
    private _dependencies;
    _iLoader: URLLoader;
    _iSuccess: boolean;
    constructor(id: string, request: URLRequest, data: any, parser: ParserBase, parentParser: ParserBase, retrieveAsRawData?: boolean, suppressAssetEvents?: boolean, sub_id?: number);
    /**
     *
     */
    readonly id: string;
    readonly sub_id: number;
    /**
     *
     */
    readonly request: URLRequest;
    /**
     * The data containing the dependency to be parsed, if the resource was already loaded.
     */
    readonly data: any;
    /**
     *
     */
    readonly parser: ParserBase;
    /**
     * The parser which is dependent on this ResourceDependency object.
     */
    readonly parentParser: ParserBase;
    /**
     *
     */
    readonly retrieveAsRawData: boolean;
    /**
     *
     */
    readonly suppresAssetEvents: boolean;
    /**
     *
     */
    readonly assets: Array<IAsset>;
    /**
     *
     */
    readonly dependencies: Array<ResourceDependency>;
    /**
     * @private
     * Method to set data after having already created the dependency object, e.g. after load.
     */
    _iSetData(data: any): void;
    /**
     * @private
     *
     */
    _iSetParser(parser: ParserBase): void;
    /**
     * Resolve the dependency when it's loaded with the parent parser. For example, a dependency containing an
     * ImageResource would be assigned to a Mesh instance as a BitmapMaterial, a scene graph object would be added
     * to its intended parent. The dependency should be a member of the dependencies property.
     */
    resolve(): void;
    /**
     * Resolve a dependency failure. For example, map loading failure from a 3d file
     */
    resolveFailure(): void;
    /**
     * Resolve the dependencies name
     */
    resolveName(asset: IAsset): string;
}
