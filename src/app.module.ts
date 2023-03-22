import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import {
  ApolloServerPluginLandingPageLocalDefault
} from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { ListItemModule } from './list-item/list-item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ AuthModule ],
      inject: [ JwtService ],
      useFactory: async ( jwtService: JwtService ) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [
          ApolloServerPluginLandingPageLocalDefault()
        ],
        context(ctx) {
          const token = ctx.req.headers.authorization?.replace('Bearer ', '');
          if ( !token ) throw new Error(`Token needed!`);

          const payload = jwtService.decode(token);
          if ( !payload ) throw new Error(`Token not valid!`);
        }
      })
    }),

    // TODO: Basic Configuration
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   plugins: [
    //     ApolloServerPluginLandingPageLocalDefault()
    //   ],
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES),
    }),

    ItemsModule,
    UsersModule,
    AuthModule,
    SeedModule,
    CommonModule,
    ListsModule,
    ListItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
