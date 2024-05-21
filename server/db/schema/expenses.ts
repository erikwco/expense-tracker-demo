import { index, numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';


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
    createdAt: timestamp('create_at').defaultNow()
  },
  // index definition
  (expenses) => {
    return {
      userIdIndex: index('name_idx').on(expenses.userId),
    }
  });

