import { createLazyFileRoute } from '@tanstack/react-router'
import { View } from '../components'
import { UserManager } from '../components/widgets/UserManager/UserManager'

export const Route = createLazyFileRoute('/me')({
  component: () => <View><UserManager/></View>,
})
