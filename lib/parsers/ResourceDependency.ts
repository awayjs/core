﻿import { IAsset } from '../library/IAsset';
import { URLLoader } from '../net/URLLoader';
import { URLRequest } from '../net/URLRequest';
import { ParserBase } from '../parsers/ParserBase';

/**
 * ResourceDependency represents the data required to load, parse and resolve additional files ("dependencies")
 * required by a parser, used by ResourceLoadSession.
 *
 */
export class ResourceDependency {
	private _id: string;
	private _sub_id: number;
	private _request: URLRequest;
	private _data: any;
	private _parser: ParserBase;
	private _parentParser: ParserBase;
	private _retrieveAsRawData: boolean;
	private _suppressAssetEvents: boolean;

	private _assets: IAsset[] = [];
	private _dependencies: ResourceDependency[] = [];

	public loader: URLLoader;
	public success: boolean;

	constructor(id: string,
		request: URLRequest,
		data: any,
		parser: ParserBase,
		parentParser: ParserBase,
		retrieveAsRawData: boolean = false,
		suppressAssetEvents: boolean = false,
		sub_id: number = 0) {
		this._id = id;
		this._sub_id = sub_id;
		this._request = request;
		this._data = data;
		this._parser = parser;
		this._parentParser = parentParser;
		this._retrieveAsRawData = retrieveAsRawData;
		this._suppressAssetEvents = suppressAssetEvents;
	}

	/**
	 *
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 *
	 */
	public get sub_id(): number {
		return this._sub_id;
	}

	/**
	 *
	 */
	public get request(): URLRequest {
		return this._request;
	}

	/**
	 * The data containing the dependency to be parsed, if the resource was already loaded.
	 */
	public get data(): any {
		return this._data;
	}

	/**
	 *
	 */
	public get parser(): ParserBase {
		return this._parser;
	}

	/**
	 * The parser which is dependent on this ResourceDependency object.
	 */
	public get parentParser(): ParserBase {
		return this._parentParser;
	}

	/**
	 *
	 */
	public get retrieveAsRawData(): boolean {
		return this._retrieveAsRawData;
	}

	/**
	 *
	 */
	public get suppresAssetEvents(): boolean {
		return this._suppressAssetEvents;
	}

	/**
	 *
	 */
	public get assets(): Array<IAsset> {
		return this._assets;
	}

	/**
	 *
	 */
	public get dependencies(): Array<ResourceDependency> {
		return this._dependencies;
	}

	/**
	 * @private
	 * Method to set data after having already created the dependency object, e.g. after load.
	 */
	public setData(data: any): void {
		this._data = data;
	}

	/**
	 * @private
	 *
	 */
	public setParser(parser: ParserBase): void {
		this._parser = parser;
	}

	/**
	 * Resolve the dependency when it's loaded with the parent parser. For example, a dependency containing an
	 * ImageResource would be assigned to a Mesh instance as a BitmapMaterial, a scene graph object would be added
	 * to its intended parent. The dependency should be a member of the dependencies property.
	 */
	public resolve(): void {
		if (this._parentParser)
			this._parentParser.resolveDependency(this);
	}

	/**
	 * Resolve a dependency failure. For example, map loading failure from a 3d file
	 */
	public resolveFailure(): void {
		if (this._parentParser)
			this._parentParser.resolveDependencyFailure(this);
	}

	/**
	 * Resolve the dependencies name
	 */
	public resolveName(asset: IAsset): string {
		if (this._parentParser)
			return this._parentParser.resolveDependencyName(this, asset);

		return asset.name;
	}
}