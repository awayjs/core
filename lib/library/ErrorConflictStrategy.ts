import { ErrorBase } from '../errors/ErrorBase';

import { ConflictStrategyBase } from './ConflictStrategyBase';
import { IAssetAdapter } from './IAssetAdapter';

export class ErrorConflictStrategy extends ConflictStrategyBase {
	constructor() {
		super();
	}

	public resolveConflict(changedAsset: IAssetAdapter,
		oldAsset: IAssetAdapter,
		assetsDictionary: Object,
		precedence: string): void {
		throw new ErrorBase('Asset name collision while AssetLibrary.namingStrategy ' +
							'set to AssetLibrary.THROW_ERROR. Asset path: ' + changedAsset.adaptee.assetNamespace + "." + changedAsset.adaptee.name);
	}

	public create(): ConflictStrategyBase {
		return new ErrorConflictStrategy();
	}
}