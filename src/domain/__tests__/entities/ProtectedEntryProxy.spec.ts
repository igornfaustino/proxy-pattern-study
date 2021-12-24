import { Entry } from '../../entities/implementations/Entry';
import { ProtectedEntryProxy } from '../../entities/implementations/ProtectedEntryProxy';

describe('ProtectedEntryProxy', () => {
	const entryValue = 'protected value';

	const makeSut = () => {
		const entry = new Entry(entryValue);
		const sut = new ProtectedEntryProxy(entry);

		return {
			sut,
		};
	};

	it('Should get right value from entry', () => {
		const { sut } = makeSut();

		expect(sut.getEntryValue()).toBe(entryValue);
	});
});
