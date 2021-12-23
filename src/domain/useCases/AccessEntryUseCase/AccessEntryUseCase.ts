import { GetEntryRepository } from './GetEntryRepository';
import { GetUserRepository } from './GetUserRepository';

export class AccessEntryUseCase {
	constructor(
		private getEntryRepository: GetEntryRepository,
		private getUserRepository: GetUserRepository
	) {}

	async perform(token: string) {
		const user = await this.getUserRepository.get(token);
		if (!user) throw new Error('invalid_user');

		const entry = this.getEntryRepository.get();
		entry.getEntryValue();
	}
}
