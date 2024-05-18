import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses')({
  component: Expenses
})




// ---------------------------------------------------------
// getTotalSpent function
// ---------------------------------------------------------
async function getAllExpenses() {
  // await new Promise((r) => setTimeout(r, 2000))
  const data = await api.expenses.$get();
  if (!data.ok) {
    throw new Error('Server Error');
  }
  const json = await data.json();
  return json
}

// ---------------------------------------------------------
// Render
// ---------------------------------------------------------
function Expenses() {
  // Local State
  // Tanstack version
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: getAllExpenses
  });

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
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            isPending
              ? Array(3).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium"><Skeleton className="h-4" /></TableCell>
                  <TableCell><Skeleton className="h-4" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4" /></TableCell>
                </TableRow>
              ))
              : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
