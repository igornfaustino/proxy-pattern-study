/* eslint-disable max-classes-per-file */
import { IEntry } from '../entities/Entry';
import { IUser } from '../entities/User';
import { AccessEntryUseCase } from '../useCases/AccessEntryUseCase/AccessEntryUseCase';
import { IGetEntryRepository } from '../useCases/AccessEntryUseCase/GetEntryRepository';
import { IGetUserRepository } from '../useCases/AccessEntryUseCase/GetUserRepository';

class EntryMock implements IEntry {
	calls = 0;

	getEntryValue(): string {
		this.calls += 1;
		return 'secret_value';
	}
}

class MockGetEntryRepository implements IGetEntryRepository {
	calls = 0;

	output: IEntry = {
		getEntryValue: () => 'secret_value',
	};

	get(): IEntry {
		this.calls += 1;

		return this.output;
	}
}

class MockGetUserRepository implements IGetUserRepository {
	calls = 0;

	param?: string;

	output: IUser | undefined = {
		id: 'any_id',
		name: 'user_name',
		email: 'user@test.com',
	};

	get(token: string): Promise<IUser | undefined> {
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

	it('should access entry value if user is valid', async () => {
		const { sut, getEntryRepository } = makeSut();
		const entry = new EntryMock();
		getEntryRepository.output = entry;

		await sut.perform(token);

		await expect(entry.calls).toBe(1);
	});
});
