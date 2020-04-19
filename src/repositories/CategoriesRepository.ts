import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async getCategoryId(title: string): Promise<Category | null> {
    const findCategoryId = await this.findOne({
      where: { title },
    });

    return findCategoryId || null;
  }

  public async insertCategory(title: string): Promise<Category> {
    const category = await this.save({ title });

    return category;
  }
}

export default CategoriesRepository;
