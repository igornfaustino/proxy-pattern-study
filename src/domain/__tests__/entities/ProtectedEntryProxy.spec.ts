import { Entry } from '../../entities/implementations/Entry';
import { ProtectedEntryProxy } from '../../entities/implementations/ProtectedEntryProxy';

describe('ProtectedEntryProxy', () => {
	test('Should log user data when get entry data', () => {
		const entry = new Entry('protected value');
		const sut = new ProtectedEntryProxy(entry);

		expect(sut.getEntryValue()).toBe('protected value');
	});
});
