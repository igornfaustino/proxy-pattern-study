import { Entry } from '../../entities/Entry';

describe('Entry', () => {
	test('should get value from entry', async () => {
		const sut = new Entry('any_value');

		const value = await sut.getEntryValue();

		expect(value).toBe('any_value');
	});
});
