import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About
})

function About() {
  return (
    <div className='p-8'>
      <h3 className='text-xl font-semibold py-4'>Demo Expenses App, made with : </h3>
      <ul>
        <li>Hono</li>
        <li>Bun</li>
        <li>React</li>
        <li>Tailwind</li>
        <li>Tanstack: router, form, query</li>
        <li>RPC</li>
        <li>Typescript</li>
        <li>and Soon: Drizzle</li>
      </ul>
    </div>
  );
}
