import { IEntry } from '../entities/IEntry';
import { IUser } from '../entities/IUser';

export interface SaveAccessLogRepository {
	log(user: IUser, entry: IEntry): Promise<void>;
}
