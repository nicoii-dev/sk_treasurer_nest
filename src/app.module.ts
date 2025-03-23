import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { User } from './entities/user.entities';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sk_treasurer_db',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
