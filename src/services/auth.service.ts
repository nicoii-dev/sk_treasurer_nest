import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/zod-validation/user.schema';
// import * as bcrypt from 'bcrypt';
// import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  signup(createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  //   async signin(
  //     email: string,
  //     password: string,
  //   ): Promise<{
  //     access_token: string;
  //     userData: {
  //       userId: number;
  //       firstName: string;
  //       lastName: string;
  //       email: string;
  //     };
  //   }> {
  //     const user = await this.usersService.validateEmail(email);
  //     if (user && (await bcrypt.compare(password, user.password))) {
  //       const payload = {
  //         userId: user.id,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         email: user.email,
  //       };
  //       return {
  //         access_token: await this.jwtService.signAsync(payload),
  //         userData: payload,
  //       };
  //     }
  //     // customize error response
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.FORBIDDEN,
  //         error: 'Invalid credentials',
  //       },
  //       HttpStatus.FORBIDDEN,
  //       {
  //         cause: error,
  //       },
  //     );
  //   }
}
