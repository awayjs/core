import { AbstractMethodError } from '../errors/AbstractMethodError';

import { AssetEvent } from '../events/AssetEvent';
import { EventDispatcher } from '../events/EventDispatcher';
import { AbstractionBase } from './AbstractionBase';
import { IAbstractionPool } from './IAbstractionPool';

import { IAsset } from './IAsset';
import { IAssetAdapter } from './IAssetAdapter';
import { IAssetClass } from './IAssetClass';

export class AssetBase extends EventDispatcher implements IAsset, IAssetAdapter {
	public static ID_COUNT: number = 0;

	public _symbol: any;
	public _adapter: IAssetAdapter;
	private _originalName: string;
	private _namespace: string;
	private _name: string;
	private _id: number;
	private _full_path: Array<string>;
	private _abstractionPool: Record<number, AbstractionBase> = {};

	public static DEFAULT_NAMESPACE: string = 'default';

	constructor(name: string = null) {
		super();

		this._id = AssetBase.ID_COUNT++;

		if (name == null)
			name = 'null';

		this._name = name;
		this._originalName = name;

		this.updateFullPath();
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
		throw new AbstractMethodError();
	}

	/**
	 * The original name used for this asset in the resource (e.g. file) in which
	 * it was found. This may not be the same as <code>name</code>, which may
	 * have changed due to of a name conflict.
	 */
	public get originalName(): string {
		return this._originalName;
	}

	/**
	 * A unique id for the asset, used to identify assets in an associative array
	 */
	public get id(): number {
		return this._id;
	}

	public get name(): string {
		return this._name;
	}

	public set name(val: string) {
		const prev = this._name;
		this._name = val;

		if (this._name == null)
			this._name = 'null';

		this.updateFullPath();

		this.dispatchEvent(new AssetEvent(AssetEvent.RENAME, this, prev));
	}

	/**
	 *
	 */
	public invalidate(): void {
		this.dispatchEvent(new AssetEvent(AssetEvent.INVALIDATE, this));
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
		this.dispatchEvent(new AssetEvent(AssetEvent.CLEAR, this));
	}

	public get assetNamespace(): string {
		return this._namespace;
	}

	public set assetNamespace(value: string) {
		this._namespace = value ? value : AssetBase.DEFAULT_NAMESPACE;
		this.updateFullPath();
	}

	public get assetFullPath(): Array<string> {
		return this._full_path;
	}

	public assetPathEquals(name: string, ns: string): boolean {
		return (this._name == name && (!ns || this._namespace == ns));
	}

	public isAsset(assetClass: IAssetClass): boolean {
		return this.assetType == assetClass.assetType;
	}

	public resetAssetPath(name: string, ns: string = null, overrideOriginal: boolean = true): void {

		this._name = name ? name : 'null';
		this._namespace = ns ? ns : AssetBase.DEFAULT_NAMESPACE;

		if (overrideOriginal)
			this._originalName = this._name;

		this.updateFullPath();
	}

	public updateFullPath(): void {
		this._full_path = [this._namespace, this._name];
	}

	public getAbstraction <T extends AbstractionBase>(pool: IAbstractionPool): T {
		return <T> this._abstractionPool[pool.id]
			|| <T> (this._abstractionPool[pool.id] = new (pool.requestAbstraction(this))(this, pool));
	}

	public clearAbstraction(pool: IAbstractionPool) {
		delete this._abstractionPool[pool.id];
	}
}