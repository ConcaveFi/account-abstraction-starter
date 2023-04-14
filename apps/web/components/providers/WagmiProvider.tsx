import { connectorsForWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains } from '@wagmi/core'
import { goerli, optimismGoerli } from '@wagmi/core/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { SocialWalletConnectorOptions } from '@zerodevapp/wagmi/dist/connectors/AbstractSocialWalletConnector'
import {
  discordWallet,
  enhanceWalletWithAAConnector,
  githubWallet,
  googleWallet,
  twitterWallet,
} from '@zerodevapp/wagmi/rainbowkit'
import { multicallProvider } from 'multicall-provider/wagmi'
import { PropsWithChildren } from 'react'
import { createClient, WagmiConfig } from 'wagmi'

const {
  chains,
  provider: _provider,
  webSocketProvider,
} = configureChains(
  [goerli, optimismGoerli],
  [alchemyProvider({ apiKey: 'Kng1p_dEJaldM51_qK6aqP9YvBY0cVxf' })],
)

const AA_Options = {
  projectId: 'e0c46058-90cf-41ec-aa8a-8e4bc6897bd3',
} satisfies SocialWalletConnectorOptions
const appName = 'Starter App'
const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      injectedWallet({ chains }),
      // rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ chains, appName }),
      safeWallet({ chains }),
    ].map((wallet) => enhanceWalletWithAAConnector(wallet, AA_Options)),
  },
  {
    groupName: 'Social',
    wallets: [
      googleWallet({ options: AA_Options }),
      githubWallet({ options: AA_Options }),
      discordWallet({ options: AA_Options }),
      twitterWallet({ options: AA_Options }),
    ],
  },
])

export type SupportedChainId = (typeof chains)[number]['id']

export const provider = multicallProvider(_provider, { timeWindow: 0, batchSize: 150 })

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export function WagmiProvider({ children }: PropsWithChildren) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={{
          ...lightTheme(),
          fonts: {
            body: 'var(--font-sans)',
          },
        }}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
