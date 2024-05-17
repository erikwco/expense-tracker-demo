import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-expense')({
  component: () => CreateExpenses
})

function CreateExpenses() {
  return (
    <div className='p-2'>
      <h3>Welcome</h3>
    </div>
  );
}

