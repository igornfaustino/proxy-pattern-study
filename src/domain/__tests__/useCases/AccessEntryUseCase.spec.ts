import { Entry } from '../../entities/Entry';
import { IEntry } from '../../interfaces/IEntry';
import { IProtectedEntryFactory } from '../../interfaces/IProtectedRepositoryFactory';
import { IUser } from '../../interfaces/IUser';
import { AccessEntryUseCase } from '../../useCases/AccessEntryUseCase/AccessEntryUseCase';
import { EntryMock } from '../mocks/entities/Entry';
import { MockGetEntryRepository } from '../mocks/repositories/MockGetEntryRepository';
import { MockGetUserRepository } from '../mocks/repositories/MockGetUserRepository';

class MockProtectedRepositoryFactory implements IProtectedEntryFactory {
	calls = 0;

	create(user: IUser, entry: IEntry): IEntry {
		this.calls += 1;
		return new Entry('some_value');
	}
}

describe('AccessEntryUseCase', () => {
	const token = 'any_token';

	const makeSut = () => {
		const getEntryRepository = new MockGetEntryRepository();
		const getUserRepository = new MockGetUserRepository();
		const protectedRepositoryFactory = new MockProtectedRepositoryFactory();
		const sut = new AccessEntryUseCase(
			getEntryRepository,
			getUserRepository,
			protectedRepositoryFactory
		);

		return {
			sut,
			getEntryRepository,
			getUserRepository,
			protectedRepositoryFactory,
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

	it('should create a protected entry', async () => {
		const { sut, protectedRepositoryFactory } = makeSut();

		await sut.perform(token);

		await expect(protectedRepositoryFactory.calls).toBe(1);
	});
});
