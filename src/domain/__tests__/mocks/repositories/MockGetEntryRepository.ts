import { IEntry } from '../../../entities/IEntry';
import { IGetEntryRepository } from '../../../useCases/AccessEntryUseCase/GetEntryRepository';

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
