import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { WagmiProvider } from './WagmiProvider'

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>{children}</WagmiProvider>
    </QueryClientProvider>
  )
}
