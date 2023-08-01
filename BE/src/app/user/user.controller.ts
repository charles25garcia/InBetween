import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { Tbl_User } from './tbl-user.entity';
import {
  LoginCredentialsDto,
  CreateUserDto,
  ResponseDto,
  ChangePasswordDto,
  UpdateProfileDTO,
} from '@core/dtos';
import { UserRoleEnum } from '@core/enums';
import { UserService } from './user.service';
import { GetUser } from '@core/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '@core/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getuser')
  @UseGuards(AuthGuard())
  getUserById(@GetUser() user: any): any {
    return user;
  }

  @Patch('/changepassword/:id')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string; isMatch: boolean }> {
    return this.userService.changePassword(changePasswordDto, id);
  }

  @Put('/updateprofile/:id')
  updateProfile(
    @Body() updateProfileDTO: UpdateProfileDTO,
    @Param('id') id: string,
  ): Promise<{
    success: boolean;
    message: string;
    usernameExist: boolean;
    emailExist: boolean;
    accessToken: string;
  }> {
    return this.userService.updateProfile(updateProfileDTO, id);
  }

  @Post('/registerplayer')
  @Public()
  async registerPlayer(@Body() body: CreateUserDto): Promise<ResponseDto> {
    try {
      const newPlayerUser = await this.userService.register({
        ...body,
        roleId: body.roleId ? body.roleId : UserRoleEnum.SILVER,
      });

      return {
        data: newPlayerUser,
        message: 'Successfully Registered',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Failed to Register',
        success: false,
      };
    }
  }

  @Post('/signin')
  @HttpCode(200)
  @Public()
  signIn(
    @Body() loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ success: boolean; accessToken: string; isActive: boolean }> {
    {
      return this.userService.signIn(loginCredentialsDto);
    }
  }

  @Put('/block/:username')
  @HttpCode(200)
  @Public()
  blockUser(
    @Param('username') username: string,
  ): Promise<{ message: string; success: boolean }> {
    return this.userService.blockUser(username);
  }

  @Put('/loginattempt/:username')
  @HttpCode(200)
  @Public()
  updateLoginAttempt(@Param('username') username: string): Promise<number> {
    return this.userService.updateLoginAttempt(username);
  }

  @Patch('/updateshowmechanics/:id')
  @UseGuards(AuthGuard())
  updateShowMechanics(@Param('id') id: string): Promise<void> {
    return this.userService.updateShowMechanics(id);
  }

  @Get('/getreferrals/:referralId')
  getReferralsById(
    @Param('referralId') referralId: string,
  ): Promise<Tbl_User[]> {
    return this.userService.getReferralsById(referralId);
  }

  @Put('/promoteusers')
  promoteUsers(@Body() data: { usersId: Array<string> }): Promise<void> {
    const { usersId } = data;

    return this.userService.promoteUsers(usersId);
  }
}
