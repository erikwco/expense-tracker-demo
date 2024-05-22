
// created to share ApiRoute definitions
import type { ApiRoutes } from "@server/app";
import { CreateExpense } from "@server/shared.types";
import { queryOptions } from "@tanstack/react-query";
import { hc } from 'hono/client';

// client to connect to our backend
// using APiRoutes type
const client = hc<ApiRoutes>('/');

export const api = client.api.v1;

// getUser reusable function
// ---------------------------------------------------------
// getProfile function
// ---------------------------------------------------------
async function getProfile() {
  const data = await api.auth.me.$get();
  if (!data.ok) {
    throw new Error('Server Error');
  }
  const json = await data.json();
  return json
}

// ---------------------------------------------------------
// getAllExpenses function
// ---------------------------------------------------------
export async function getAllExpenses() {
  // await new Promise((r) => setTimeout(r, 2000))
  const data = await api.expenses.$get();
  if (!data.ok) {
    throw new Error('Server Error');
  }
  const json = await data.json();
  return json
}

export const useQueryOptions = queryOptions({
  queryKey: ["get-profile"],
  queryFn: getProfile,
  staleTime: Infinity
})

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ['get-all-expenses'],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5
})

export async function createExpense({ value }: { value: CreateExpense }) {
  const result = await api.expenses.$post({ json: value });
  // if error
  if (!result.ok) {
    throw new Error('Server error')
  }
  // when ok
  const newExpense = await result.json();
  return newExpense;
}

export const loadingCreateExpenseQueryOptions = queryOptions<{ expense?: CreateExpense }>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
})

export const deleteExpense = async ({ id }: { id: number }) => {
  const res = await api.expenses[":id{[0-9]+}"].$delete({ param: { id: id.toString() } });
  if (!res.ok) {
    throw new Error('Server error');
  }
}




