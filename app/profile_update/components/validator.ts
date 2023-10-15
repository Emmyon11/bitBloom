import { z } from 'zod';

enum Investment_plan {
  none = 'none',
  basic = 'basic',
  standard = 'standard',
  premium = 'premium',
  gold = 'gold',
}

export const investment_plan = z.nativeEnum(Investment_plan);
export const userSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(5, { message: 'Must be 5 or more characters long' }),
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'Invalid email address' }),
  address: z
    .string()
    .min(10, { message: 'Must be 10 or greater characters long' }),
  bitcoin_address: z
    .string()
    .min(5, { message: 'Must be 5 or fewer characters long' }),

  investment_plan: investment_plan,
  dob: z
    .date({
      required_error: 'A date of birth is required.',
    })
    .max(new Date('2009-01-01'), { message: 'Too young' }),
});
