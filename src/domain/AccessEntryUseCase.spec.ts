/* eslint-disable max-classes-per-file */
type Entry = {
	id: string;
	name: string;
};

type User = {
	id: string;
	name: string;
	email: string;
};

interface GetEntryRepository {
	get(): Entry;
}

interface GetUserRepository {
	get(): Promise<User | undefined>;
}

class AccessEntryUseCase {
	constructor(
		private getEntryRepository: GetEntryRepository,
		private getUserRepository: GetUserRepository
	) {}

	async perform() {
		const user = this.getUserRepository.get();
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

class MockGetUserRepository implements GetUserRepository {
	calls = 0;

	output: User | undefined = {
		id: 'any_id',
		name: 'user_name',
		email: 'user@test.com',
	};

	get(): Promise<User | undefined> {
		this.calls += 1;

		return Promise.resolve(this.output);
	}
}

describe('AccessEntryUseCase', () => {
	const makeSut = () => {
		const getEntryRepository = new MockGetEntryRepository();
		const getUserRepository = new MockGetUserRepository();
		const sut = new AccessEntryUseCase(getEntryRepository, getUserRepository);

		return {
			sut,
			getEntryRepository,
			getUserRepository,
		};
	};

	it('should get entry', async () => {
		const { sut, getEntryRepository } = makeSut();

		await sut.perform();

		expect(getEntryRepository.calls).toBe(1);
	});

	it('should get user if token is valid', async () => {
		const { sut, getUserRepository } = makeSut();

		const promise = sut.perform();

		await expect(promise).resolves.not.toThrowError();
		expect(getUserRepository.calls).toBe(1);
	});
});
