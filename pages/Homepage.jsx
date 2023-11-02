
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from 'react'
import { Navbar } from '../components/Homepage/Navbar'

const Homepage = () => {
  return (
    <Box padding={8}>
      <Image position={"absolute"} right={0} w={500}  />
      <Heading mt={16} textAlign={"start"} size={"4xl"}>
        Note App
      </Heading>
      <Text mt={8} maxW={"50%"} textAlign={"justify"}>
      My Notes </Text>
    </Box>
  )
}

export default Homepage
