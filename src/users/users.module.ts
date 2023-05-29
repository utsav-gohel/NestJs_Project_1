import { Module, MiddlewareConsumer } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { CurrentUserInterceptor } from './interceptor/user.interceptor';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    AuthService,
    // CurrentUserInterceptor,
    // { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
