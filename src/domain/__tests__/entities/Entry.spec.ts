import { Entry } from '../../entities/implementations/Entry';

describe('Entry', () => {
	test('should get value from entry', () => {
		const sut = new Entry('any_value');

		expect(sut.getEntryValue()).toBe('any_value');
	});
});
