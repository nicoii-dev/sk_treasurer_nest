import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secretKey', // Store this securely
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
