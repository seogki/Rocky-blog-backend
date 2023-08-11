import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryDto, PostDto } from 'src/interface/posts.interface';
import { PostsService } from './posts.service';

@Controller()
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @Get('categories')
  getCategories() {
    return this.postsService.getCategories();
  }

  @Get('posts')
  getPosts() {
    return this.postsService.getPosts();
  }

  @Post('post')
  savePost(@Body() postDto: PostDto) {
    return this.postsService.savePost(postDto);
  }
}
