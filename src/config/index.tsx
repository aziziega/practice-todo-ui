import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { sepolia, type Chain } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'SC Connect TodoList UI',
  description: 'UI for connecting to SC Connect',
  url: 'https://sc-connect-todolist-ui.netlify.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const localHost: Chain = {
  id: 31337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    default: { name: 'Localhost', url: 'http://localhost:8545' },
  },
} as const

const chains = [sepolia, localHost] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
})