import { date, index, numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenses = pgTable(
  // table name on postgres
  'expenses',
  // fields definition, what's inside on quoutes are the names
  // for the fields in postgres
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    amount: numeric('amount', {
      precision: 12, scale: 2
    }).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('create_at').defaultNow()
  },
  // index definition
  (expenses) => {
    return {
      userIdIndex: index('name_idx').on(expenses.userId),
    }
  });

// createInsertSchema - creates a zod schema to validate when a new record is inserted
// the second parameters, is a override of the default zod object generated
export const insertExpenseSchema = createInsertSchema(expenses, {
  title: z.string().min(3, { message: "Title must be at least 3 chars long" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Amount of expense must be positive" }),

});
export const selectExpensesSchema = createSelectSchema(expenses);
