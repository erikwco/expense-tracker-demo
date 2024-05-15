import { Hono } from "hono";
import { z } from 'zod';

// ------------------------------------------
// Expense memory fake database
// ------------------------------------------
const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive()
})

const createExpenseSchema = expenseSchema.omit({ id: true })

type Expense = z.infer<typeof expenseSchema>

// ------------------------------------------
// expense tracker routes
// ------------------------------------------
export const expenseRoutes = new Hono()
  .get("/", c => {
    return c.json({ "message": "Api Expenses" })
  })
