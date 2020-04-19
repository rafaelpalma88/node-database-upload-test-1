// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    // checar se categoria ja existe no banco

    /* const checkIfCategoryAlreadyExists = transactionsRepository.findOne({
      where: { title: category },
    });

     const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionsRepository.save(transaction);

    return transaction; */
  }
}

export default CreateTransactionService;
