import { IUser } from '../../entities/IUser';

export interface IGetUserRepository {
	get(token: string): Promise<IUser | undefined>;
}
