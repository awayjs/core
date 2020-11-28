import { IAbstractionClass } from './IAbstractionClass';

export interface IAbstractionPool
{
	readonly abstractionClassPool?: Record<string, IAbstractionClass>;
	readonly id: number;
}
