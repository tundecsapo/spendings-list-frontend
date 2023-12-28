export type Currency = "HUF" | "USD";

export type OrderType = "spent_at" | "-spent_at" | "amount" | "-amount";

export interface BaseSpending {
  description: string;
  amount: number;
  currency: Currency;
}

export interface SpendingInput {
  description: string;
  amount: number | undefined;
  currency: Currency | undefined;
}

export interface Spending extends BaseSpending {
  spent_at: string;
}
