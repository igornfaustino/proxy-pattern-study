import { Entry } from '../../entities/Entry';

export interface GetEntryRepository {
	get(): Entry;
}
