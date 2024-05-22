import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deleteExpense, getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses
})



// ---------------------------------------------------------
// Render
// ---------------------------------------------------------
function Expenses() {
  // Local State
  // Tanstack version
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOptions);

  // evaluating results
  if (error) {
    return 'An error ocurred: ' + error.message;
  }

  return (
    <div className='p-2 max-w-3xl m-auto'>
      <Table >
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead >Title</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            loadingCreateExpense?.expense && (
              <TableRow >
                <TableCell className="font-medium">{'...'}</TableCell>
                <TableCell>{loadingCreateExpense.expense?.title}</TableCell>
                <TableCell className="text-center">{loadingCreateExpense.expense?.date.split("T")[0]}</TableCell>
                <TableCell className="text-right">{loadingCreateExpense.expense?.amount}</TableCell>
                <TableCell>{'...'}</TableCell>
              </TableRow>

            )
          }
          {
            isPending
              ? Array(3).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium"><Skeleton className="h-4" /></TableCell>
                  <TableCell><Skeleton className="h-4" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-4" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4" /></TableCell>
                  <TableCell><Skeleton className="h-4" /></TableCell>
                </TableRow>
              ))
              : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-center">{expense.date}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                  <TableCell className="text-center">
                    <ExpenseDeleteButton id={expense.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ExpenseDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast("Error deleting", { description: `Failed to delete the expense: ${id}` });
    },
    onSuccess: () => {
      toast("Succesfull deleted", { description: `Expense ${id} deleted succesfully` });
      // refresh state
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, (existingExpenses) => ({
        ...existingExpenses,
        expenses: existingExpenses!.expenses.filter((e) => e.id !== id)
      }))
    }
  });
  return (<Button
    disabled={mutation.isPending}
    onClick={() => mutation.mutate({ id })}
    variant={'outline'}
    size={'icon'}
  >
    {mutation.isPending ? "..." : <Trash className='h-4 v-4' />}
  </Button>
  )

}
