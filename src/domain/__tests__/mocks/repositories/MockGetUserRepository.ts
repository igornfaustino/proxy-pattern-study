import { IUser } from '../../../interfaces/IUser';
import { IGetUserRepository } from '../../../interfaces/GetUserRepository';

export class MockGetUserRepository implements IGetUserRepository {
	calls = 0;

	param?: string;

	output: IUser | undefined = {
		id: 'any_id',
		name: 'user_name',
		email: 'user@test.com',
	};

	get(token: string): Promise<IUser | undefined> {
		this.calls += 1;
		this.param = token;

		return Promise.resolve(this.output);
	}
}
