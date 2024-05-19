import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})


// ---------------------------------------------------------
// getTotalSpent function
// ---------------------------------------------------------
async function getTotalSpent() {
  const data = await api.expenses['total-spent'].$get();
  if (!data.ok) {
    throw new Error('Server Error');
  }
  const json = await data.json();
  return json
}

// ---------------------------------------------------------
// Render
// ---------------------------------------------------------
function Index() {
  // Local State
  // Tanstack version
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: () => getTotalSpent()
  });

  // evaluating results
  if (error) {
    return 'An error ocurred: ' + error.message;
  }



  return (
    <Card className='w-[350px] m-auto mt-4'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{isPending ? "..." : `$ ${data.totalSpent}`}</p>
      </CardContent>
    </Card>
  )
}

