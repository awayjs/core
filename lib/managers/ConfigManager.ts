import { EventBase } from '../events/EventBase';
import { EventDispatcher } from '../events/EventDispatcher';

export interface IConfigStore extends Record<string, number | boolean | string> {}

export class StoreEvent extends EventBase {
	constructor(
		type: string,
		public readonly storeName: string,
		public readonly propName: string,
		public readonly newValue: any,
		public readonly oldValue: any,
		public readonly store: IConfigStore,
	) {
		super(type);
	}
}

export class ConfigManager extends EventDispatcher {
	public static CHANGE_EVENT = 'change';
	private static _instance: ConfigManager;

	public static get instance () {
		return this._instance || (this._instance = new ConfigManager());
	}

	private _proxies: Record<string, IConfigStore> = Object.create(null);
	private _lib: Record<string, IConfigStore> = Object.create(null);

	propertyChange (
		storeName: string,
		prop: string,
		oldValue: any,
		newValue: any,
		setter = false
	): void {

		if (setter) {
			// eslint-disable-next-line max-len
			console.debug(`[ConfigManager] Setters is deprecated, use 'set('${storeName}', '${prop}', ${newValue}) instead'`);
		}

		this.dispatchEvent(
			new StoreEvent(
				ConfigManager.CHANGE_EVENT,
				storeName,
				prop,
				oldValue,
				newValue,
				this._lib[storeName]
			)
		);
	}

	private wrapObject(storeName: string, obj: IConfigStore) {
		const root = this;

		return new Proxy(obj, {
			set (target: IConfigStore, p: PropertyKey, value: any, receiver: any): boolean {
				if (target[p as string] === value) {
					return true;
				}

				root.propertyChange(storeName, p as string, target[p as string], value, true);
				target[p as string] = value;

				return true;
			}
		});
	}

	/**
	 * Return referenced object of store.
	 * NOTE! Direct modification of it property will emit warning
	 * @param name
	 */
	public getStoreRef<T extends IConfigStore> (name: string) {
		return this._proxies[name] as T;
	}

	/**
	 * Similar `set` but register store from object and merge values if already exist, return observabled object
	 * @param name
	 * @param obj
	 */
	public addStore<T extends  IConfigStore> (name: string, obj: T): T {
		if (name in this._lib) {
			Object.assign(this._lib[name], obj);
			return this._proxies[name] as T;
		}

		return this._proxies[name] = this.wrapObject(name,this._lib[name] = obj) as T;
	}

	/**
	 * Set specific value or series of values to store, emit changeEvent when value changes
	 * @param storeName
	 * @param objOrName
	 * @param valueOrNone
	 */
	public set<T extends IConfigStore>(storeName: string, objOrName: Partial<T> | string, valueOrNone?: any): boolean {
		if (!(storeName in this._lib)) {
			this.addStore(storeName, {});
		}

		const obj = typeof objOrName === 'string' ? { [objOrName]: valueOrNone } : objOrName;
		const store = this._lib[storeName];

		let change = false;

		for (const keyName in obj) {
			const oldVal = store[keyName];
			const newVal = obj[keyName];

			store[keyName] = newVal;

			change = change || newVal !== oldVal;

			this.propertyChange(storeName, keyName, oldVal, newVal, false);
		}

		return change;
	}

	/**
	 * Get stored value from specific store by
	 * @param storeName
	 * @param key
	 */
	public get(storeName: string, key: string): any {
		return this._lib[storeName]?.[key];
	}

	/**
	 * Serialize store to JSON
	 */
	public serialize() {
		return JSON.stringify(this._lib);
	}

	/**
	 * Deserialize data to current active manager
	 * @param jsonObject
	 * @param quiet - no emit change event, only create stores
	 */
	public deserialize(jsonObject: Record<string, IConfigStore> | string, quiet = true) {
		jsonObject = typeof jsonObject === 'string' ? JSON.parse(jsonObject) :  jsonObject;

		const manager = this;

		for (const key in jsonObject as object) {
			const value = jsonObject[key];

			if (!value || typeof value !== 'object' || !jsonObject.hasOwnProperty(key)) {
				continue;
			}

			if (quiet) {
				manager.addStore(key, value);
			} else {
				manager.set(key, value);
			}
		}
	}

	public static deserialize(jsonObject: Record<string, IConfigStore>, quiet = true) {
		return ConfigManager.instance.deserialize(jsonObject, quiet);
	}
}