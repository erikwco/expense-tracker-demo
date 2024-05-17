import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
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

  // Load total spent
  // NOTE: this is the direct version but we gonna use 
  // Tanstack query
  // useEffect(() => {
  //   const loadTotal = async () => {
  //     try {
  //       // NOTE: this is with out the client on hono
  //       // const data = await fetch("/api/v1/expenses/total-spent");
  //       const data = await api.expenses['total-spent'].$get()
  //       const json = await data.json();
  //       const total = json.totalSpent;
  //       setTotalSpent(total)
  //     } catch (err) {
  //       setTotalSpent(-1)
  //       console.error(err)
  //     }
  //   }
  //   loadTotal();
  // }, [])


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

