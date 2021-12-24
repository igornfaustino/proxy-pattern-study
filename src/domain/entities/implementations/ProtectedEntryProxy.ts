import { IEntry } from '../IEntry';
import { Entry } from './Entry';

export class ProtectedEntryProxy implements IEntry {
	constructor(private entry: Entry) {}

	getEntryValue(): string {
		return this.entry.getEntryValue();
	}
}
