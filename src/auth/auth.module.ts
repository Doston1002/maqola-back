// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { MongooseModule } from '@nestjs/mongoose';
// import { getJWTConfig } from 'src/config/jwt.config';
// import { CustomerModule } from 'src/customer/customer.module';
// import { CustomerService } from 'src/customer/customer.service';
// import { User, UserSchema } from 'src/user/user.model';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { JwtStrategy } from './strategies/jwt.strategy';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
//     ConfigModule,
//     CustomerModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: getJWTConfig,
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy, CustomerService],
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios'; // OneID va reCAPTCHA uchun
import { getJWTConfig } from 'src/config/jwt.config';
import { CustomerModule } from 'src/customer/customer.module';
import { CustomerService } from 'src/customer/customer.service';
import { User, UserSchema } from 'src/user/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OneIdService } from './oneid.service'; // OneID service import
import { RecaptchaService } from './recaptcha.service'; // reCAPTCHA service
import { JwtAuthGuard } from './guards/jwt.guard';
import { OnlyAdminGuard } from './guards/admin.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenBlacklistService } from './token-blacklist.service';
import { UserActivityLogger } from 'src/logger/user-activity.logger';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
    CustomerModule,
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    OneIdService,
    RecaptchaService,
    JwtStrategy,
    JwtAuthGuard,
    OnlyAdminGuard,
    CustomerService,
    TokenBlacklistService,
    UserActivityLogger,
  ],
  exports: [AuthService, OneIdService, RecaptchaService, JwtAuthGuard, OnlyAdminGuard],
})
export class AuthModule {}