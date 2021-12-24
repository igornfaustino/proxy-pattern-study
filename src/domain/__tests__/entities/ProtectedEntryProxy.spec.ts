import { IEntry } from '../../entities/IEntry';
import { Entry } from '../../entities/implementations/Entry';
import { ProtectedEntryProxy } from '../../entities/implementations/ProtectedEntryProxy';
import { IUser } from '../../entities/IUser';
import { SaveAccessLogRepository } from '../../interfaces/SaveAccessLogRepository';

class SaveAccessLogRepositoryMock implements SaveAccessLogRepository {
	calls = 0;

	log(user: IUser, entry: IEntry): Promise<void> {
		this.calls += 1;

		return Promise.resolve();
	}
}

describe('ProtectedEntryProxy', () => {
	const entryValue = 'protected value';

	const makeSut = () => {
		const saveAccessLogRepository = new SaveAccessLogRepositoryMock();
		const user: IUser = {
			email: 'test@test.com',
			name: 'john do',
			id: '1234',
		};
		const entry = new Entry(entryValue);
		const sut = new ProtectedEntryProxy(entry, saveAccessLogRepository, user);

		return {
			sut,
			saveAccessLogRepository,
		};
	};

	it('Should get right value from entry', async () => {
		const { sut } = makeSut();

		const value = await sut.getEntryValue();

		expect(value).toBe(entryValue);
	});

	it('Should log value when user tries to get data', async () => {
		const { sut, saveAccessLogRepository } = makeSut();

		const value = await sut.getEntryValue();

		expect(value).toBe(entryValue);
		expect(saveAccessLogRepository.calls).toBe(1);
	});
});
