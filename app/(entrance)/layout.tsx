import { Box, Container, Flex, Stack, Text } from '@chakra-ui/react'

export default function EntracnceLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Container maxW="md" py={12}>
        <Stack gap={1} align="center">
          {/* Logo */}
          <Flex align="center" gap={2}>
            <Box
              w="22px"
              h="22px"
              borderRadius="full"
              bg="black"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="18px" fontWeight="bold" color="white">
                S
              </Text>
            </Box>
            <Text fontSize="18px" fontWeight="bold" color="black">
              NOOZE
            </Text>
          </Flex>
          {children}
        </Stack>
      </Container>
    </Flex>
  )
}
