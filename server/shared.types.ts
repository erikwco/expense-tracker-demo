
import { z } from "zod"
import { insertExpenseSchema } from "./db/schema/expenses"
// ------------------------------------------
// Shared creational Expense Schema
// We take insertExpenseSchema as base, this by definition contains: 
// id: int optional
// title: string required
// amount: string required
// userId: string required
// createdAt: string optional
// So we ommit userId and createdAt, because this were not 
// provided
// ------------------------------------------
export const createExpenseSchema = insertExpenseSchema.omit({
  userId: true,
  createdAt: true,
})
