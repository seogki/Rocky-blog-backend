import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot('mongodb://localhost/nest', {
      dbName: 'blog',
    }),
  ],
})
export class AppModule {}
