import { IEntry } from '../../../entities/Entry';

export class EntryMock implements IEntry {
	calls = 0;

	getEntryValue(): string {
		this.calls += 1;
		return 'secret_value';
	}
}
