import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostsSchema } from 'src/schemas/posts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostsSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [PostController],
  providers: [PostsService],
})
export class PostsModule {}
