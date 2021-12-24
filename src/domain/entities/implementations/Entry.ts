import { IEntry } from '../IEntry';

export class Entry implements IEntry {
	constructor(private value: string) {}

	getEntryValue(): string {
		return this.value;
	}
}
