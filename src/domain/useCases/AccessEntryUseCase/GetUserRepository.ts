import { User } from '../../entities/User';

export interface GetUserRepository {
	get(token: string): Promise<User | undefined>;
}
