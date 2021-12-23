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
	get(token: string): Promise<User | undefined>;
}

class AccessEntryUseCase {
	constructor(
		private getEntryRepository: GetEntryRepository,
		private getUserRepository: GetUserRepository
	) {}

	async perform(token: string) {
		const user = await this.getUserRepository.get(token);
		if (!user) throw new Error('invalid_user');

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

	param?: string;

	output: User | undefined = {
		id: 'any_id',
		name: 'user_name',
		email: 'user@test.com',
	};

	get(token: string): Promise<User | undefined> {
		this.calls += 1;
		this.param = token;

		return Promise.resolve(this.output);
	}
}

describe('AccessEntryUseCase', () => {
	const token = 'any_token';

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

		await sut.perform(token);

		expect(getEntryRepository.calls).toBe(1);
	});

	it('should call get user with the right params', async () => {
		const { sut, getUserRepository } = makeSut();

		await sut.perform(token);

		expect(getUserRepository.calls).toBe(1);
		expect(getUserRepository.param).toBe(token);
	});

	it('should get user if token is valid', async () => {
		const { sut, getUserRepository } = makeSut();

		const promise = sut.perform(token);

		await expect(promise).resolves.not.toThrowError();
		expect(getUserRepository.calls).toBe(1);
	});

	it('should throw an error if user if token is invalid', async () => {
		const { sut, getUserRepository } = makeSut();
		getUserRepository.output = undefined;

		const promise = sut.perform(token);

		await expect(promise).rejects.toThrowError();
	});
});
