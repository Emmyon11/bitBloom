type RegisterInput = {
  email: string;
  password: string;
  verify_password: string;
};
type LoginInput = {
  email: string;
  password: string;
};

type User = {
  uid?: string;
  name: string;
  email: string;
  dob: string;
  address: string;
  profile_picture: string;
  investment_plan: Investment_plan;
  bitcoin_address: string;
  createdAt: string;
};

enum Investment_plan {
  none = 'none',
  basic = 'basic',
  standard = 'standard',
  premium = 'premium',
  gold = 'gold',
}
enum Status {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

type Wallet = {
  user_email: string;
  current_balance: number;
  investment_plan: Investment_plan;
  investment_date: string;
  initial_investment: number;
  btc_address: string;
  status?: Status;
};

type Feedback = {
  name: string;
  feedback: string;
};

interface Customer {
  name: string;
  image: string;
  testimony: string;
  date: string;
}
