import { IEntry } from './IEntry';
import { IUser } from './IUser';

export interface IProtectedEntryFactory {
	create(user: IUser, entry: IEntry): IEntry;
}
