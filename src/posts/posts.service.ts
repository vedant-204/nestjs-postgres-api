import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Posts } from './posts.interface';

@Injectable()
export default class PostsService {
  private lastPostId = 0;
  private posts:Posts[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id:number){
    const post = this.posts.find(post => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
  
  createPost(post:CreatePostDto){
    const newPost = {
      id: ++this.lastPostId,
      ...post
    }
    this.posts.push(newPost);
    return newPost;
  }

  replacePost(id:number, post:UpdatePostDto){
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex > -1){
      this.posts[Number(postIndex)] = post;
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  deletePost(id:number){
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex > -1){
      this.posts.splice(Number(postIndex), 1);
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
