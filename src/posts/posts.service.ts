import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import Post from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../users/users.entity';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  
  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id:number){
    const post = this.postsRepository.findOne({
      where: {id,}
    });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
  
  async createPost(post:CreatePostDto){
    const newPost = await this.postsRepository.create(post)
    await this.postsRepository.save(newPost);
    return newPost;
  }
  async updatePost(id:number, post:UpdatePostDto){ 
    await this.postsRepository.update(id, post) 
    const updatedPost = await this.postsRepository.findOne({
      where: {id,}
    });
    if (updatedPost){
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id:number){
    const deleteResponse = await this.postsRepository.delete(id)
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
