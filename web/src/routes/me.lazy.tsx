import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/me')({
  component: () => <div>Hello /me!</div>,
})
