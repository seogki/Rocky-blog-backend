import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto, PostDto } from 'src/interface/posts.interface';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Post, PostDocument } from 'src/schemas/posts.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

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

  async getCategories() {
    // const list: CategoryDto[] = [];

    // list.push({ _id: '1', name: 'JAVASCRIPT' });
    // list.push({ _id: '2', name: 'NEXT JS' });
    // list.push({ _id: '3', name: 'REACT' });
    // list.push({ _id: '4', name: 'VUE' });
    // list.push({ _id: '5', name: 'CSS' });
    // list.push({ _id: '6', name: 'NEST JS' });
    // list.push({ _id: '7', name: 'ETC' });

    try {
      const list = await this.categoryModel.find().exec();
      return list;
    } catch (err: any) {
      throw Error('Server error');
    }
  }

  async saveCategory(categoryDto: CategoryDto) {
    const createdCategory = new this.categoryModel(categoryDto);
    return createdCategory.save();
  }

  async savePost(postDto: PostDto) {
    const createdPost = new this.postModel(postDto);
    return createdPost.save();
  }
}
