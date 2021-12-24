import { IEntry } from '../../../interfaces/IEntry';
import { IUser } from '../../../interfaces/IUser';
import { SaveAccessLogRepository } from '../../../interfaces/SaveAccessLogRepository';

export class SaveAccessLogRepositoryMock implements SaveAccessLogRepository {
	calls = 0;

	params?: {
		user: IUser;
		entry: IEntry;
	};

	log(user: IUser, entry: IEntry): Promise<void> {
		this.calls += 1;
		this.params = { user, entry };

		return Promise.resolve();
	}
}
