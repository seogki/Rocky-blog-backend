export interface PostDto {
  _id?: string;
  title: string;
  description: string;
  categoryName: string;
  createDate?: Date;
}

export interface CategoryDto {
  _id?: string;
  name: string;
  createDate?: Date;
}
