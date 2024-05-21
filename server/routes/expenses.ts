import { Hono } from "hono";
import { z } from 'zod';
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { db } from "../db";
import { expenses as expensesTable, insertExpenseSchema } from "../db/schema/expenses";
import { and, desc, eq, sum } from "drizzle-orm";
import { createExpenseSchema } from "../shared.types";



// ------------------------------------------
// Protect the expenses routes
// ------------------------------------------


// ------------------------------------------
// expense tracker routes
// ------------------------------------------
export const expenseRoutes = new Hono()

  // --------------------------------------------
  // List of all expenses
  // --------------------------------------------
  .get("/", getUser, async c => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(20);
    return c.json({ expenses: expenses })
  })

  // --------------------------------------------
  // Get the total of the expenses
  // --------------------------------------------
  .get("/total-spent", getUser, async c => {
    const user = c.var.user;
    const { total } = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .then((res) => res[0]);


    return c.json({ "totalSpent": total })
  })

  // --------------------------------------------
  // Create a new expense
  // --------------------------------------------
  .post("/", getUser, zValidator('json', createExpenseSchema), async c => {
    // get validated input
    const item = c.req.valid('json');
    const user = c.var.user;


    const validatedExpense = insertExpenseSchema.parse({
      ...item,
      userId: user.id
    })


    const expense = await db.insert(expensesTable).values(validatedExpense).returning();
    // returning satisfactory
    // TODO: handle error
    c.status(201);
    return c.json({ expense })
  })

  // --------------------------------------------
  // Get one expense by id
  // --------------------------------------------
  .get("/:id{[0-9]+}", getUser, async c => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param('id'));
    // find expense
    const expense = await db.select().from(expensesTable).where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id))).then((res) => res[0])
    if (!expense) { return c.notFound() }
    // get resource
    return c.json({ expense })
  })

  // --------------------------------------------
  // Delete expense by id
  // --------------------------------------------
  .delete("/:id{[0-9]+}", getUser, async c => {
    // get id to delete from route
    const id = Number.parseInt(c.req.param('id'));
    const user = c.var.user;
    // find expense id
    const expense = await db.delete(expensesTable).where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id))).returning().then((res) => res[0])
    if (!expense) { return c.notFound() }
    return c.json({ expense });
  })

// --------------------------------------------
// Update expense by id
// --------------------------------------------
// .put("/:id{[0-9]+}", getUser, zValidator('json', createExpenseSchema), c => {
//   // get validated info
//   const item = c.req.valid('json');
//   const id = Number.parseInt(c.req.param('id'));
//   // find index
//   const index = memDB.findIndex(expense => expense.id === id);
//   if (index === -1) { return c.notFound() }
//   // take the item to modify later
//   memDB.splice(index, 1)[0];
//   const expense = { id, ...item }
//   memDB.push(expense);
//   return c.json({ expense })
// })




