import { Button } from "@/components/ui/button";
import { useQueryOptions } from "@/lib/api";
import { Outlet, createFileRoute } from "@tanstack/react-router"

const GoToLogin = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center">
      <p>You have to login or register</p>
      <Button asChild>
        <a href="/api/v1/auth/login">Login!</a>
      </Button>
      <Button asChild>
        <a href="/api/v1/auth/register">Register!</a>
      </Button>
    </div>
  );
}

const AuthenticatedUserComponent = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <GoToLogin />
  }
  return <Outlet />
}

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(useQueryOptions);
      context.user = data;
      return data;
    } catch (error) {
      context.user = null;
      return { user: null }
    }
  },
  component: AuthenticatedUserComponent,
})
