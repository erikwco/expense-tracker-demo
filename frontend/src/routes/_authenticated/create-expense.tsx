import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FieldApi, useForm } from '@tanstack/react-form';
import { createExpense, getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from '@/lib/api';
import { zodValidator } from '@tanstack/zod-form-adapter'
import { createExpenseSchema } from '@server/shared.types';
import { Calendar } from '@/components/ui/calendar';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpenses
})

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className='min-h-[25px]'>
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </div>
  )
}

function CreateExpenses() {
  // ---------------------------------------------------------------------
  // Queryclient to update state on the get all expenses query
  // ---------------------------------------------------------------------
  const queryClient = useQueryClient();
  // ---------------------------------------------------------------------
  // Used to Navigate programatically
  // ---------------------------------------------------------------------
  const navigate = useNavigate();
  // ---------------------------------------------------------------------
  // Form configuration
  // ---------------------------------------------------------------------
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: '',
      amount: '0',
      date: new Date().toISOString(),
    }, onSubmit: async ({ value }) => {
      // ensure there are already data cached
      // if there is no expenses loaded those are loaded
      const existingExpenses = await queryClient.ensureQueryData(getAllExpensesQueryOptions);

      // -----------------------------------------------
      // handling optimistic ui
      // -----------------------------------------------
      // Navigate inmediately
      navigate({ to: '/expenses' });

      // set flag loading state to handle optimistic ui
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, { expense: value });

      // send the data to the backend
      try {
        const newExpense = await createExpense({ value });
        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, ({
          ...existingExpenses,
          expenses: [newExpense.expense, ...existingExpenses.expenses]
        }))
        // success  state 
        toast("Expense Created", { description: `Expense created with id: ${newExpense.expense.id}` })
      } catch (error) {
        toast("Expense Error", { description: `Expense cannot be created` })
      } finally {
        queryClient.setQueryData(['loading-create-expense'], {});
      }



    }
  })


  return (
    <div className='p-2 max-w-3xl m-auto'>
      <h2 className='my-8'>Create Expense</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className='flex flex-col gap-y-1 max-w-xl m-auto'
      >
        <div className="grid w-full  items-center  ">
          <form.Field
            validators={{
              onChange: createExpenseSchema.shape.title
            }}
            name='title'
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  placeholder="Title"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5 my-4">
          <form.Field
            validators={{
              onChange: createExpenseSchema.shape.amount
            }}
            name='amount'
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  placeholder="Amount"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange((e.target.value))}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div className="flex justify-center">
          <form.Field
            validators={{
              onChange: createExpenseSchema.shape.date
            }}
            name='date'
            children={(field) => (
              <div className='self-center'>
                <Calendar
                  mode="single"
                  selected={new Date(field.state.value)}
                  onSelect={(selectedDate) => field.handleChange((selectedDate ?? new Date()).toISOString())}
                  className="rounded-md border"
                />

              </div>
            )}
          />
        </div>

        <div className="grid w-full  items-center gap-1.5">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type='submit' className='mt-4' disabled={!canSubmit}>{isSubmitting ? '...' : 'Create Expense'}</Button>
            )}
          />
        </div>
      </form>
    </div>
  );
}

