import { IEntry } from '../../interfaces/IEntry';
import { Entry } from '../../entities/Entry';
import { ProtectedEntryProxy } from '../../entities/ProtectedEntryProxy';
import { SaveAccessLogRepository } from '../../interfaces/SaveAccessLogRepository';
import { IUser } from '../../interfaces/IUser';

class SaveAccessLogRepositoryMock implements SaveAccessLogRepository {
	calls = 0;

	params?: {
		user: IUser;
		entry: IEntry;
	};

	log(user: IUser, entry: IEntry): Promise<void> {
		this.calls += 1;
		this.params = { user, entry };

		return Promise.resolve();
	}
}

describe('ProtectedEntryProxy', () => {
	const entryValue = 'protected value';
	const user: IUser = {
		email: 'test@test.com',
		name: 'john do',
		id: '1234',
	};

	const makeSut = () => {
		const saveAccessLogRepository = new SaveAccessLogRepositoryMock();
		const entry = new Entry(entryValue);
		const sut = new ProtectedEntryProxy(entry, saveAccessLogRepository, user);

		return {
			sut,
			saveAccessLogRepository,
			entry,
		};
	};

	it('Should get right value from entry', async () => {
		const { sut } = makeSut();

		const value = await sut.getEntryValue();

		expect(value).toBe(entryValue);
	});

	it('Should log value when user tries to get data', async () => {
		const { sut, saveAccessLogRepository, entry } = makeSut();

		const value = await sut.getEntryValue();

		expect(value).toBe(entryValue);
		expect(saveAccessLogRepository.calls).toBe(1);
		expect(saveAccessLogRepository.params?.user).toBe(user);
		expect(saveAccessLogRepository.params?.entry).toBe(entry);
	});
});
