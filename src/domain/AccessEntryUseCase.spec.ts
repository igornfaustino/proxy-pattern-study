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
	const makeSut = () => {
		const getEntryRepository = new MockGetEntryRepository();
		const sut = new AccessEntryUseCase(getEntryRepository);

		return {
			sut,
			getEntryRepository,
		};
	};

	it('should get entry', () => {
		const { sut, getEntryRepository } = makeSut();

		sut.perform();

		expect(getEntryRepository.calls).toBe(1);
	});
});
