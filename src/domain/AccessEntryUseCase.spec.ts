/* eslint-disable max-classes-per-file */
type Entry = {
	id: string;
	name: string;
};

interface GetEntryRepository {
	get(): Entry;
}

class AccessEntryUseCase {
	constructor(private getEntryRepository: GetEntryRepository) {}

	perform() {
		const entry = this.getEntryRepository.get();
	}
}

class MockGetEntryRepository implements GetEntryRepository {
	calls = 0;

	get(): Entry {
		this.calls += 1;

		return {
			id: 'any_id',
			name: 'any_name',
		};
	}
}

describe('AccessEntryUseCase', () => {
	it('should get entry', () => {
		const getEntryRepository = new MockGetEntryRepository();
		const sut = new AccessEntryUseCase(getEntryRepository);

		sut.perform();

		expect(getEntryRepository.calls).toBe(1);
	});
});
