import { Claim, Insurer } from "./example";

export const claimers: Claim[] = [
  {
    id: 1,
    amount: 100,
  },
  {
    id: 2,
    amount: 1000,
  },
  {
    id: 3,
    amount: 10000,
  },
];

export const insurers: Insurer[] = [
  { money: 500, id: 1 },
  { money: 1500, id: 2 },
  { money: 15000, id: 3 },
];
