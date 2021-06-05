export interface IAsyncService {
	status: 'pending' | 'error' | 'done';
	name: string;

	init(): Promise<void>;
	dispose(): void;
}

function allSettled(promises: Promise<void>[]) {
	const wrappedPromises = promises.map(p => Promise.resolve(p)
		.then(
			val => ({ status: 'fulfilled', value: val }),
			err => ({ status: 'rejected', reason: err })));
	return Promise.all(wrappedPromises);
}

export class AsyncServicesLibrary {
	public static serviceLibraries: IAsyncService[] = [];

	public static register (service: IAsyncService): void {
		if (this.serviceLibraries.indexOf(service) !== -1) {
			return;
		}

		this.serviceLibraries.push(service);
	}

	public static init(): Promise<void> {
		return allSettled(this.serviceLibraries.map(s => s.init())).then(() => void 0);
	}
}