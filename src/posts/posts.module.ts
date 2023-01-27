import { Module } from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import { Post } from './posts.entity';
import { TyperOrmModule } from '@nestjs/typerorm';

@Module({
  imports: [TyperOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
