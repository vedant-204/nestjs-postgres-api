import { Module } from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import Post from './posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
