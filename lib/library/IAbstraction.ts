import { AssetEvent } from "../events/AssetEvent";
import { IAsset } from "./IAsset";


export interface IAbstraction extends IAsset
{
	onClear(event: AssetEvent): void;

	onInvalidate(event: AssetEvent): void;
}
