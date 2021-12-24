import { IEntry } from '../interfaces/IEntry';

export class Entry implements IEntry {
	constructor(private value: string) {}

	async getEntryValue(): Promise<string> {
		return this.value;
	}
}
