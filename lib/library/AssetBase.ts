import { AbstractMethodError } from '../errors/AbstractMethodError';

import { AssetEvent } from '../events/AssetEvent';
import { EventDispatcher } from '../events/EventDispatcher';
import { IAbstraction } from './IAbstraction';

import { IAsset } from './IAsset';
import { IAssetAdapter } from './IAssetAdapter';
import { IAssetClass } from './IAssetClass';
import { UUID } from './UUID';

export class AssetBase extends EventDispatcher implements IAsset, IAssetAdapter {

	public _symbol: any;
	public _adapter: IAssetAdapter;
	private _namespace: string;
	private _name: string;
	private _abstractions: Record<number, IAbstraction> = {};

	public static assetType: string = '[asset Asset]';

	public static DEFAULT_NAMESPACE: string = 'default';

	/**
	 * A unique id for the asset, used to identify assets in an associative array
	 */
	public readonly id: number;

	constructor() {
		super();

		this.id = UUID.Next();
	}

	public get adaptee(): AssetBase {
		return this;
	}

	/**
	 * adapter is used to provide MovieClip to scripts taken from different platforms
	 * setter typically managed by factory. getter defaults to AwayJS class
	 */
	public get adapter(): IAssetAdapter {
		return this._adapter || this;
	}

	public set adapter(value: IAssetAdapter) {
		this._adapter = value;
	}

	/**
	 *
	 */
	public get assetType(): string {
		return AssetBase.assetType;
	}

	public get name(): string {
		return this._name;
	}

	public set name(val: string) {
		const prev = this._name;
		this._name = val;

		if (this._name == null)
			this._name = 'null';

		this.dispatchEvent(new AssetEvent(AssetEvent.RENAME, this, prev));
	}

	/**
	 *
	 */
	public invalidate(): void {
		for (const key in this._abstractions)
			this._abstractions[key].onInvalidate();
	}

	public addAbstraction(abstraction: IAbstraction): void {
		this._abstractions[abstraction.id] = abstraction;
	}

	public removeAbstraction(abstraction: IAbstraction): void {
		delete this._abstractions[abstraction.id];
	}

	/**
	 * @inheritDoc
	 */
	public dispose(): void {
		throw new AbstractMethodError();
	}

	public clone(): AssetBase {
		throw new AbstractMethodError();
	}

	public clear(): void {
		for (const key in this._abstractions)
			this._abstractions[key].onClear();
	}

	public get assetNamespace(): string {
		return this._namespace;
	}

	public set assetNamespace(value: string) {
		this._namespace = value ? value : AssetBase.DEFAULT_NAMESPACE;
	}

	public assetPathEquals(name: string, ns: string): boolean {
		return (this._name == name && (!ns || this._namespace == ns));
	}

	public isAsset(assetClass: IAssetClass): boolean {
		return this.assetType == assetClass.assetType;
	}

	public resetAssetPath(name: string, ns: string = null): void {
		this._name = name ? name : 'null';
		this._namespace = ns ? ns : AssetBase.DEFAULT_NAMESPACE;
	}
}