import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import {
  mainnet,
  arbitrum,
  avalanche,
  base,
  optimism,
  polygon,
  type AppKitNetwork
} from '@reown/appkit/networks'

export const projectId = '12f899790f0720dff5781c6aa4066677'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum, avalanche, base, optimism, polygon] as [
  AppKitNetwork,
  ...AppKitNetwork[]
]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  networks,
  projectId
})

export const config = wagmiAdapter.wagmiConfig
