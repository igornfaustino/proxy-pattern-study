import { IEntry } from '../../../entities/IEntry';

export class EntryMock implements IEntry {
	calls = 0;

	async getEntryValue(): Promise<string> {
		this.calls += 1;
		return 'secret_value';
	}
}
