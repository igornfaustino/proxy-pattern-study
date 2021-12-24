import { IEntry } from '../../interfaces/IEntry';
import { IProtectedEntryFactory } from '../../interfaces/IProtectedRepositoryFactory';
import { IUser } from '../../interfaces/IUser';
import { SaveAccessLogRepository } from '../../interfaces/SaveAccessLogRepository';
import { ProtectedEntryProxy } from '../ProtectedEntryProxy';

export class ProtectedEntryFactory implements IProtectedEntryFactory {
	constructor(private saveAccessRepository: SaveAccessLogRepository) {}

	create(user: IUser, entry: IEntry): IEntry {
		return new ProtectedEntryProxy(entry, this.saveAccessRepository, user);
	}
}
