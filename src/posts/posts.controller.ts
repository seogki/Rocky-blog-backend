import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CategoryDto, PostDto } from 'src/interface/posts.interface';
import { PostsService } from './posts.service';

@Controller()
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @Get('categories')
  getCategories() {
    return this.postsService.getCategories();
  }

  @Post('category')
  saveCategory(@Body() categoryDto: CategoryDto) {
    return this.postsService.saveCategory(categoryDto);
  }

  @Get('posts')
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get('posts/:categoryId')
  getPostsByCategoryId(@Param('categoryId') categoryId: string) {
    return this.postsService.getPostsByCategoryId(categoryId);
  }

  @Get('post')
  getPost(@Query('_id') _id: string) {
    return this.postsService.getPost(_id);
  }

  @Post('post')
  savePost(@Body() postDto: PostDto) {
    return this.postsService.savePost(postDto);
  }
}
