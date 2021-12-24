import { IEntry } from '../../entities/IEntry';

export interface IGetEntryRepository {
	get(): IEntry;
}
