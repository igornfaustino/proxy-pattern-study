import { IUser } from './IUser';

export interface IGetUserRepository {
	get(token: string): Promise<IUser | undefined>;
}
