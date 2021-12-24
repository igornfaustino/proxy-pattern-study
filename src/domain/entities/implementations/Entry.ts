import { IEntry } from '../IEntry';

export class Entry implements IEntry {
	constructor(private value: string) {}

	async getEntryValue(): Promise<string> {
		return this.value;
	}
}
