import { IEntry } from '../../entities/Entry';

export interface IGetEntryRepository {
	get(): IEntry;
}
