import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';

@Module({
  providers: [ AuthResolver, AuthService, JwtStrategy ],

  imports: [

    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }
      })
    }),

    UsersModule,

  ],

  exports: [ JwtStrategy, PassportModule, JwtModule ],
})
export class AuthModule {}
