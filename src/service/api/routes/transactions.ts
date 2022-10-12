import type { Transactions } from "src/types";
import { ApiService } from "../service";

export const transactions = new ApiService<Transactions>('transactions');
