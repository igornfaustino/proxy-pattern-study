import { IEntry } from '../../../interfaces/IEntry';
import { IGetEntryRepository } from '../../../interfaces/GetEntryRepository';

export class MockGetEntryRepository implements IGetEntryRepository {
	calls = 0;

	output: IEntry = {
		getEntryValue: () => Promise.resolve('secret_value'),
	};

	get(): IEntry {
		this.calls += 1;

		return this.output;
	}
}
