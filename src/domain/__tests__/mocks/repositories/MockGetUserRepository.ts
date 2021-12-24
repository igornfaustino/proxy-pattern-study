import { IUser } from '../../../entities/IUser';
import { IGetUserRepository } from '../../../useCases/AccessEntryUseCase/GetUserRepository';

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
