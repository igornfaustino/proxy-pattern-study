import { IEntry } from './IEntry';
import { IUser } from './IUser';

export interface SaveAccessLogRepository {
	log(user: IUser, entry: IEntry): Promise<void>;
}
