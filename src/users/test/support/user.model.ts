import { MockModel } from "../../../database/test/support/mock.mockmodel";
import { User } from "../../schemas/user.schema";
import { userStub } from "../stubs/users.stub";

export class UserModel extends MockModel<User> {
    protected entityStub = userStub()
}