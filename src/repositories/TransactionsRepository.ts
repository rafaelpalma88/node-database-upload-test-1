import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, currentValue) => {
        return total + currentValue.value;
      }, 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, currentValue) => {
        return total + currentValue.value;
      }, 0);

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };
    console.log('xxxx');
    console.log(typeof balance.income);
    console.log(typeof balance.outcome);
    console.log(typeof balance.total);
    console.log('xxxx');

    return balance;
  }
}

export default TransactionsRepository;
