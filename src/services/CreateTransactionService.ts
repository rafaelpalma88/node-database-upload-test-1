// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CategoriesRepository from '../repositories/CategoriesRepository';

import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const findCategoryId = await categoriesRepository.getCategoryId(category);

    let category_id = '';

    if (findCategoryId) {
      category_id = findCategoryId.id;
    }

    if (!findCategoryId) {
      const categoryCreated = await categoriesRepository.insertCategory(
        category,
      );

      category_id = categoryCreated.id;
    }

    const transactionRepository = getCustomRepository(TransactionsRepository);

    if (type === 'outcome') {
      const balance = await transactionRepository.getBalance();

      if (value > balance.total) {
        throw new Error('No sufficient funds');
      }
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
