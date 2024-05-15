import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

function App() {
  // Local State
  // store the total of amount spent
  const [totalSpent, setTotalSpent] = useState(0)

  // Load total spent
  useEffect(() => {
    const loadTotal = async () => {
      try {
        const data = await fetch("/api/v1/expenses/total-spent");
        const json = await data.json();
        const total = json.totalSpent;
        setTotalSpent(total)
      } catch (err) {
        setTotalSpent(-1)
        console.error(err)
      }
    }
    loadTotal();
  }, [])


  return (
    <Card className='w-[350px] m-auto mt-4'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        <p>$ {totalSpent}</p>
      </CardContent>
    </Card>
  )
}

export default App
