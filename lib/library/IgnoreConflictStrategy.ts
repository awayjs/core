import { ConflictStrategyBase } from './ConflictStrategyBase';
import { IAssetAdapter } from './IAssetAdapter';

export class IgnoreConflictStrategy extends ConflictStrategyBase {
	constructor() {
		super();
	}

	public resolveConflict(changedAsset: IAssetAdapter, oldAsset: IAssetAdapter, assetsDictionary: Object, precedence: string): void {
		// Do nothing, ignore the fact that there is a conflict.
		return;
	}

	public create(): ConflictStrategyBase {
		return new IgnoreConflictStrategy();
	}
}