import {IAsset} from "./IAsset";

export interface IAssetAdapter
{
	adaptee:IAsset;

	dispose();
}