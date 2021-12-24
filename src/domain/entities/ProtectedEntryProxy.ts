import { IEntry } from '../interfaces/IEntry';
import { IUser } from '../interfaces/IUser';
import { SaveAccessLogRepository } from '../interfaces/SaveAccessLogRepository';
import { Entry } from './Entry';

export class ProtectedEntryProxy implements IEntry {
	constructor(
		private entry: Entry,
		private saveAccessLogRepository: SaveAccessLogRepository,
		private user: IUser
	) {}

	async getEntryValue(): Promise<string> {
		this.saveAccessLogRepository.log(this.user, this.entry);
		return this.entry.getEntryValue();
	}
}
