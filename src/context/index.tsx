'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { config, projectId } from '@/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'

import TodoListAbi from '../contracts/TodoList.json';
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const TODOLIST_ABI = TodoListAbi;
export const TODOLIST_ADDRESS = '0x6fb98ed4429fd15b3ef38cdaa0f885343c287fe0e14cc7b1dd161ae912199238';
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true
})

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {mounted && children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}