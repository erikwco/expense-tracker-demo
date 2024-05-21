
import { UserType } from '@kinde-oss/kinde-typescript-sdk';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

// NOTE: Because we have authenticated routes and we need QueryClient
// enable to all the routes, including _authenticated.tsx
// We need to create an interface with the parameter in the context
// And also we need to Change createRoute with createRouteWithContext
interface AppRouterContext {
  queryClient: QueryClient
  user: UserType | null
}
export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: Root,
})


function NavBar() {
  return (
    <div className='p-2 flex justify-between max-w-2xl m-auto'>
      <Link to="/" className="[&.active]:font-bold">
        <h1 className='text-2xl font-semibold'>Expense Tracker</h1>
      </Link>{' '}
      <div className="flex gap-4">
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create Expenses
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className="p-2 max-w-2xl m-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>

  );

}
