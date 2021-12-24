import { IGetEntryRepository } from '../../interfaces/GetEntryRepository';
import { IGetUserRepository } from '../../interfaces/GetUserRepository';
import { IProtectedEntryFactory } from '../../interfaces/IProtectedRepositoryFactory';

export class AccessEntryUseCase {
	constructor(
		private getEntryRepository: IGetEntryRepository,
		private getUserRepository: IGetUserRepository,
		private protectedEntryFactory: IProtectedEntryFactory
	) {}

	async perform(token: string) {
		const user = await this.getUserRepository.get(token);
		if (!user) throw new Error('invalid_user');

		const entry = this.getEntryRepository.get();
		const protectedEntry = this.protectedEntryFactory.create(user, entry);
		await protectedEntry.getEntryValue();
	}
}
