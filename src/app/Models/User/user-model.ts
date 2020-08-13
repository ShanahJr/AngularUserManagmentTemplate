import { UserRoleModel } from '../UserRoleModel/user-role-model';

export class UserModel {
  constructor() {}

  userID: number;
  userName: string;
  userSurname: string;
  userEmail: string;
  userPassword: string;
  userRoleId: number;

  userRole: UserRoleModel;
}
