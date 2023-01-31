import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule }from '@nestjs/typeorm';
import user from './users.entity'

@Module({
  imports: [TypeOrmModule.forFeature([user])]
  providers: [UsersService]
  exports: [UserService]
})
export class UsersModule {}
