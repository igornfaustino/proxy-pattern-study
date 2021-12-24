import { IGetEntryRepository } from '../../interfaces/GetEntryRepository';
import { IGetUserRepository } from '../../interfaces/GetUserRepository';

export class AccessEntryUseCase {
	constructor(
		private getEntryRepository: IGetEntryRepository,
		private getUserRepository: IGetUserRepository
	) {}

	async perform(token: string) {
		const user = await this.getUserRepository.get(token);
		if (!user) throw new Error('invalid_user');

		const entry = this.getEntryRepository.get();
		await entry.getEntryValue();
	}
}
