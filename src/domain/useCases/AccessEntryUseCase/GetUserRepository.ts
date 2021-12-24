import { IUser } from '../../entities/User';

export interface IGetUserRepository {
	get(token: string): Promise<IUser | undefined>;
}
