import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About
})

function About() {
  return (
    <div className='p-8'>
      <h3 className='text-xl font-semibold py-4'>Demo Expenses App, made with : </h3>
      <ul>
        <li><a href='https://hono.dev' target='_blank'>Hono</a></li>
        <li><a href='https://bun.sh' target='_blank'>Bun</a></li>
        <li><a href='https://react.dev' target='_blank'>React</a></li>
        <li><a href='https://ui.shadcn.com' target='_blank'>Shadcn</a></li>
        <li><a href='https://tailwindcss.com' target='_blank'>TailwindCSS</a></li>
        <li><a href='https://tanstack.com' target='_blank'>TanStack: Router, Query, Form</a></li>
        <li>RPC</li>
        <li>Typescript</li>
        <li><a href='https://orm.drizzle.team' target='_blank'>Drizzle</a></li>
        <li>Zod</li>
      </ul>
    </div>
  );
}
