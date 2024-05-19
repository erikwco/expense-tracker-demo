import { Button } from '@/components/ui/button';
import { useQueryOptions } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage
})


function ProfilePage() {

  const { isPending, error, data } = useQuery(useQueryOptions);

  if (isPending) { return "Loading..." }
  if (error) { return "error user not logged in" }

  return <div className='p-2'>
    <h1>{`Hello and welcome, ${data?.family_name}`}</h1>
    <div className='mt-4'>
      <Button asChild>
        <a href='/api/v1/auth/logout'> Log out</a>
      </Button>
    </div>
  </div>

}

