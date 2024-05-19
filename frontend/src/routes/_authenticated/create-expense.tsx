import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FieldApi, useForm } from '@tanstack/react-form';
import { api } from '@/lib/api';

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpenses
})

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

function CreateExpenses() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
    }, onSubmit: async ({ value }) => {
      console.log(value)
      const result = await api.expenses.$post({ json: value });
      if (!result.ok) {
        throw new Error('Server error')
      }
      navigate({ to: '/expenses' });
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
      >
        <div className="grid w-full  items-center gap-1.5">
          <form.Field
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
        <div className="grid w-full  items-center gap-1.5">
          <form.Field
            name='amount'
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  placeholder="Amount"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                <FieldInfo field={field} />
              </>
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

