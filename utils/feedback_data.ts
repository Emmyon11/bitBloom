import { faker } from '@faker-js/faker';
import { USDollarFormat } from './currency_formater';

export const feedBack = () => {
  const customersData: Feedback[] = [];
  for (let i = 0; i < 100; i++) {
    const name = faker.person.fullName();
    const feedback = `I just withdrew ${USDollarFormat.format(
      faker.number.int({
        min: 1000,
        max: 1000000,
      })
    )} from my account ${faker.helpers.arrayElement([
      '2 hours',
      'yesterday',
      'a few minutes',
      'half an hour',
      'last night',
      '6 hours',
    ])} ago.`;
    customersData.push({ name, feedback });
  }
  return customersData;
};

export const data = feedBack();

// To see the complete data in the console.
