import { Hono } from "hono";
import { z } from 'zod';
import { zValidator } from "@hono/zod-validator";


// ------------------------------------------
// Expense memory fake database]
// ------------------------------------------
const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive()
})
const createExpenseSchema = expenseSchema.omit({ id: true })
type Expense = z.infer<typeof expenseSchema>

// Fake Database 
const memDB: Expense[] = [
  { id: 1, title: "Food", amount: 200 },
  { id: 2, title: "Entertainment", amount: 50 },
  { id: 3, title: "Rent", amount: 1000 },
];


// ------------------------------------------
// expense tracker routes
// ------------------------------------------
export const expenseRoutes = new Hono()

  // --------------------------------------------
  // List of all expenses
  // --------------------------------------------
  .get("/", c => {
    return c.json({ expenses: memDB })
  })

  // --------------------------------------------
  // Get the total of the expenses
  // --------------------------------------------
  .get("/total-spent", async c => {
    // await new Promise((r) => setTimeout(r, 2000))
    const total = memDB.reduce((total, current) => total = current.amount, 0)
    return c.json({ "totalSpent": total })
  })

  // --------------------------------------------
  // Create a new expense
  // --------------------------------------------
  .post("/", zValidator('json', createExpenseSchema), c => {
    // get validated input
    const item = c.req.valid('json');
    // generate next id
    const id = memDB.length + 1;
    // build a expense item to insert
    const expense = { id: id, ...item }
    // inserting expense
    memDB.push(expense);
    // returning satisfactory
    // TODO: handle error
    c.status(201);
    return c.json({ expense })
  })

  // --------------------------------------------
  // Get one expense by id
  // --------------------------------------------
  .get("/:id{[0-9]+}", c => {
    const id = Number.parseInt(c.req.param('id'));
    // find expense
    const expense = memDB.find(expense => expense.id === id);
    if (!expense) { return c.notFound() }
    // get resource
    return c.json({ expense })
  })

  // --------------------------------------------
  // Delete expense by id
  // --------------------------------------------
  .delete("/:id{[0-9]+}", c => {
    // get id to delete from route
    const id = Number.parseInt(c.req.param('id'));
    // find expense id
    const index = memDB.findIndex(expense => expense.id === id);
    if (index === -1) { return c.notFound() }
    // deleting records
    const deletedExpense = memDB.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  })

  // --------------------------------------------
  // Update expense by id
  // --------------------------------------------
  .put("/:id{[0-9]+}", zValidator('json', createExpenseSchema), c => {
    // get validated info
    const item = c.req.valid('json');
    const id = Number.parseInt(c.req.param('id'));
    // find index 
    const index = memDB.findIndex(expense => expense.id === id);
    if (index === -1) { return c.notFound() }
    // take the item to modify later
    memDB.splice(index, 1)[0];
    const expense = { id, ...item }
    memDB.push(expense);
    return c.json({ expense })
  })




