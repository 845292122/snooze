'use client'

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

const system = createSystem(defaultConfig)

export function ChakraUIProvider({ children }: PropsWithChildren) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>
}
