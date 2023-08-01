import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';

// Services
import { UserStatsService } from '../user-stats';

import { Tbl_User } from './tbl-user.entity';
import { JwtPayload, PasswordEncryptUtil } from '@shared/utils';
import { BaseRepo } from '@core/classes';
import {
  LoginCredentialsDto,
  CreateUserDto,
  ChangePasswordDto,
  UpdateProfileDTO,
  CreatePlatinumUserDto,
} from '@core/dtos';
import { defaultUserPoints, userRolesConstant } from '@core/constants';
import { UserBetLockedService } from '../user-bet-locked';
import { UserRoleEnum } from '@core/enums';
import { CommissionService } from '../commission/commission.service';

@Injectable()
export class UserService extends BaseRepo<Tbl_User> {
  adminUser: Tbl_User;

  constructor(
    @InjectRepository(Tbl_User) private userRepo: Repository<Tbl_User>,
    private userStatsService: UserStatsService,
    private jwtService: JwtService,
    private userBetLockedService: UserBetLockedService,
    private commissionService: CommissionService,
  ) {
    super(userRepo);

    this.getAdminUser();
  }

  private async getAdminUser() {
    this.adminUser = await this.userRepo.findOne({ where: { userRoleId: 1 } });
  }

  getUsers(): Promise<Tbl_User[]> {
    return this.userRepo.find({
      relations: ['userRole', 'userStats', 'commission'],
    });
  }

  getUserByUserId(userId: string) {
    return this.userRepo.findOne({ where: { id: userId } });
  }

  async getUserById(userId: string): Promise<Tbl_User> {
    return await this.userRepo.findOne({
      where: { id: userId },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          posts: 'user.userRole',
        },
      },
      select: [
        'id',
        'fullName',
        'email',
        'contactNo',
        'username',
        'referralId',
        'referralById',
        'userRole',
      ],
    });
  }

  async register({ roleId, ...userDto }: CreateUserDto): Promise<Tbl_User> {
    const user = await this.userRepo.findOne({
      where: [{ email: userDto.email }, { username: userDto.username }],
    });

    if (user) {
      throw new BadRequestException('Email or Username in use.');
    }

    const currentDate = new Date();

    const userRole = userRolesConstant.find((role) => role.id === roleId);

    // Encrypt password
    const encryptedPassword = await PasswordEncryptUtil(userDto.password);

    const newUser = await this.create({
      ...userDto,
      isActive: true,
      id: uuidv4(),
      dateOfRegistration: currentDate,
      lastUpdated: currentDate,
      password: encryptedPassword,
      userRole: userRole,
      showMechanics: true,
    } as any);

    this.userStatsService.create({
      points: defaultUserPoints,
      userId: newUser.id,
    });
    this.userBetLockedService.insertInitialValue(newUser.id);
    this.commissionService.create({
      userId: newUser.id,
      lastUpdated: currentDate,
      amount: 0,
    });

    return newUser;
  }

  async createPlatinumUser(platinumUser: CreatePlatinumUserDto) {
    const user = await this.userRepo.find({
      where: [
        { email: platinumUser.email },
        { username: platinumUser.username },
      ],
    });

    if (user?.length > 0) {
      throw new BadRequestException('Email or Username in use.');
    }

    const currentDate = new Date();

    const password = Math.random().toString(36).slice(0, 8);

    const newUser = await this.create({
      ...platinumUser,
      id: uuidv4(),
      referralId: uuidv4(),
      isActive: true,
      dateOfRegistration: currentDate,
      lastUpdated: currentDate,
      password: await PasswordEncryptUtil(password),
      userRole: userRolesConstant.find(
        (role) => role.id === UserRoleEnum.PLATINUM,
      ),
      showMechanics: false,
    } as any);

    this.userStatsService.create({
      points: defaultUserPoints,
      userId: newUser.id,
    });
    this.userBetLockedService.insertInitialValue(newUser.id);

    return newUser;
  }

  async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{
    success: boolean;
    accessToken: string;
    isActive: boolean;
    userExist: boolean;
    message: string;
    userRole: number;
  }> {
    const { username, password } = loginCredentialsDto;

    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['userRole'],
    });

    if (!user) {
      return {
        success: false,
        message: 'Please check your login credentials',
        userExist: false,
        accessToken: '',
        isActive: false,
        userRole: 0,
      };
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return {
        success: false,
        message: 'Please check your login credentials',
        userExist: true,
        accessToken: '',
        isActive: user.isActive,
        userRole: user.userRole.id,
      };
    }

    user.loginAttempt = 0;
    await this.userRepo.save(user);

    const payload: JwtPayload = { username: user.username };
    const accessToken: string = await this.jwtService.sign(payload);
    return {
      success: true,
      accessToken,
      isActive: user.isActive,
      userExist: true,
      message: 'Login success',
      userRole: user.userRole.id,
    };
  }

  async getAuthorizedUser(username: string, password) {
    const user = await this.userRepo.findOne({
      where: { username },
    });

    if (!user || !(await user.matchPassword(password))) {
      return undefined;
    }

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
    });

    return user;
  }

  async blockUser(
    username: string,
  ): Promise<{ message: string; success: boolean }> {
    const user = await this.userRepo.findOne({
      where: { username },
    });

    if (user) {
      user.isActive = false;
      await this.userRepo.save(user);
      return { message: 'User has been blocked.', success: true };
    } else {
      throw new UnauthorizedException('User does not exist');
    }
  }

  async updateLoginAttempt(username: string): Promise<number> {
    const user = await this.userRepo.findOne({
      where: { username },
    });

    if (user) {
      user.loginAttempt = user.loginAttempt + 1;
      await this.userRepo.save(user);
      return user.loginAttempt;
    } else {
      throw new UnauthorizedException('User does not exist');
    }
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    id: string,
  ): Promise<{ success: boolean; message: string; isMatch: boolean }> {
    const { currentPassword, newPassword } = changePasswordDto;

    const user = await this.userRepo.findOne({
      where: { id },
    });

    const isMatch = await user.matchPassword(currentPassword);

    if (isMatch) {
      const saltOrRounds = 10;
      const encryptedPassword = await bcrypt.hash(newPassword, saltOrRounds);

      user.password = encryptedPassword;
      await this.userRepo.save(user);

      return {
        success: true,
        message: 'Succesfully changed the password',
        isMatch: true,
      };
    } else {
      return {
        success: false,
        message: 'Entered password does not match in the current password',
        isMatch: false,
      };
    }
  }

  async updateProfile(
    updateProfileDTO: UpdateProfileDTO,
    id: string,
  ): Promise<{
    success: boolean;
    message: string;
    usernameExist: boolean;
    emailExist: boolean;
    accessToken: string;
  }> {
    const { username, email, fullName, contactNo } = updateProfileDTO;

    let emailExist = false;
    let usernameExist = false;
    let message = 'Successfully updated user';
    let success = true;
    let accessToken = '';

    const query = await this.userRepo.createQueryBuilder('tbl_user');

    const isEmailExist = await query
      .where('email = :email', { email })
      .andWhere('id != :id', { id })
      .getOne();

    if (isEmailExist) {
      usernameExist = true;
      message = 'Email already in use';
      success = false;
      return { success, message, usernameExist, emailExist, accessToken };
    }

    const isUserNameExist = await query
      .where('username = :username', { username })
      .andWhere('id != :id', { id })
      .getOne();

    if (isUserNameExist) {
      emailExist = true;
      success = false;
      return { success, message, usernameExist, emailExist, accessToken };
    }

    const user = await this.userRepo.findOne({ where: { id } });

    user.email = email;
    user.username = username;
    user.fullName = fullName;
    user.contactNo = contactNo;

    const payload: JwtPayload = { username: user.username };
    accessToken = await this.jwtService.sign(payload);

    await this.userRepo.save(user);

    return { success, message, usernameExist, emailExist, accessToken };
  }

  async updateShowMechanics(id: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });

    user.showMechanics = false;

    await this.userRepo.save(user);
  }

  async getReferralsById(referralId: string): Promise<Tbl_User[]> {
    const users = await this.userRepo.find({
      where: { referralById: referralId },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          userRole: 'user.userRole',
        },
      },
      select: ['id', 'fullName', 'email', 'contactNo', 'username', 'userRole'],
    });

    return users;
  }

  async getReferrer(referralId: string): Promise<Tbl_User> {
    const users = await this.userRepo.findOne({
      where: { referralId },
      join: {
        alias: 'user',
        innerJoinAndSelect: {
          posts: 'user.userRole',
        },
      },
      select: [
        'id',
        'fullName',
        'email',
        'contactNo',
        'username',
        'referralId',
        'referralById',
        'userRole',
        'userRoleId',
      ],
    });

    return users;
  }

  async promoteUsers(usersId: Array<string>): Promise<void> {
    const users = await this.userRepo.find({
      where: { id: In(usersId) },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          posts: 'user.userRole',
        },
      },
    });

    users.forEach((user) => {
      user.userRole.id = 3;
      user.referralId = uuidv4();
    });

    await this.userRepo.save(users);
  }
}
