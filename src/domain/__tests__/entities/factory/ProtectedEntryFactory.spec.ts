import { ProtectedEntryFactory } from '../../../entities/factory/ProtectedEntryFactory';
import { EntryMock } from '../../mocks/entities/Entry';
import { SaveAccessLogRepositoryMock } from '../../mocks/repositories/MockSaveAccessLogRepository';

describe('ProtectedEntryFactory', () => {
	it('should return a reference to an object', () => {
		const saveAccessLogRepository = new SaveAccessLogRepositoryMock();
		const sut = new ProtectedEntryFactory(saveAccessLogRepository);
		const user = { name: 'any_name', email: 'any_email', id: 'any_id' };
		const entry = new EntryMock();

		const instance = sut.create(user, entry);

		expect(instance).not.toBeNull();
	});
});
