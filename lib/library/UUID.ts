export class UUID {
	private static id: number = 0;
	public static get Current() {
		return this.id;
	}

	public static Next() {
		return this.id++;
	}
}