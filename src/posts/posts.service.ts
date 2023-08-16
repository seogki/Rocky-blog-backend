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
        .select('_id title categoryId createDate')
        .sort({ createDate: -1 })
        .limit(10)
        .exec();
      return list;
    } catch (err: any) {
      throw Error('Server error');
    }
  }

  async getPostsByCategoryId(categoryId: string) {
    try {
      console.debug(categoryId);
      let list = [];
      if (categoryId !== 'RECENT') {
        list = await this.postModel
          .find({ categoryId })
          .select('_id title categoryId createDate')
          .sort({ createDate: -1 })
          .limit(10)
          .exec();
      } else {
        list = await this.postModel
          .find()
          .select('_id title categoryId createDate')
          .sort({ createDate: -1 })
          .limit(10)
          .exec();
      }

      return list;
    } catch (err: any) {
      throw Error('Server error');
    }
  }

  async getPost(_id: string) {
    try {
      const data = await this.postModel.findById(_id).exec();
      return data;
    } catch (err: any) {
      throw Error('Server error');
    }
  }

  async getCategories() {
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
