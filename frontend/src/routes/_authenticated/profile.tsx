import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  return <div className="flex flex-col items-center justify-start h-screen p-4">
    <Card className="w-full max-w-md">
      <CardContent className="space-y-6 text-center">
        <Avatar className="h-20 w-20 mt-4">
          <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
          <AvatarFallback>{data.given_name[0] + data.family_name[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-2xl font-bold">{data.given_name + ' ' + data.family_name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.email}</p>
        </div>
        <Button variant="outline" asChild>
          <a href='/api/v1/auth/logout'>Log Out</a>
        </Button>
      </CardContent>
    </Card>
  </div>
}

