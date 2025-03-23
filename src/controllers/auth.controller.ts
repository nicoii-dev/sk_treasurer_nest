import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { CreateUserDto } from 'src/zod-validation/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signup(signUpDto);
  }

  //   @HttpCode(HttpStatus.OK)
  //   @Post('signin')
  //   signIn(@Body() signInDto: SigninDto) {
  //     return this.authService.signin(signInDto.email, signInDto.password);
  //   }
}
