import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto, PostDto } from 'src/interface/posts.interface';
import { Post, PostDocument } from 'src/schemas/posts.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async getPosts() {
    try {
      const list = await this.postModel
        .find()
        .sort({ createDate: -1 })
        .limit(8)
        .exec();
      return list;
    } catch (err: any) {
      throw Error('Server error');
    }
  }

  getCategories(): CategoryDto[] {
    const list: CategoryDto[] = [];

    list.push({ key: 1, name: 'JAVASCRIPT' });
    list.push({ key: 2, name: 'NEXT JS' });
    list.push({ key: 3, name: 'REACT' });
    list.push({ key: 4, name: 'VUE' });
    list.push({ key: 5, name: 'CSS' });
    list.push({ key: 6, name: 'NEST JS' });
    list.push({ key: 7, name: 'ETC' });

    return list;
  }

  async savePost(postDto: PostDto) {
    const createdPost = new this.postModel(postDto);
    return createdPost.save();
  }
}
