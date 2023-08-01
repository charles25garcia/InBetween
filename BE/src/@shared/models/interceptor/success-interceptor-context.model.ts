import { UserService } from 'src/app/user';

export interface SuccessInterceptorContextModel {
  responseData: any;
  param: any;
  body: any;
  userService: UserService;
}
