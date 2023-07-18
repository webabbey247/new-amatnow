import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReOrderButton = ({orderStatus}) => {
  return (
    <VStack w="100%" my="2">
    {orderStatus === "CANCELLED" || orderStatus === "DELIVERED" ? (
      <Fragment>
        <Button
          width="100%"
          rounded="full"
          bg="red.500"
          mt="3"
          py="4"
          _text={{
            color: "white.500",
            fontWeight: "500",
            textTransform: "none",
            fontSize: "16",
            lineHeight: "24",
            letterSpacing: "0.165",
          }}
        >
          Reorder
        </Button>
        <Button
          width="100%"
          rounded="full"
          bg="red.400"
          mt="3"
          py="4"
          _text={{
            color: "red.500",
            fontWeight: "500",
            textTransform: "none",
            fontSize: "16",
            lineHeight: "24",
            letterSpacing: "0.165",
          }}
        >
          Leave Feedback
        </Button>
      </Fragment>
    ) : (
      <Fragment>
        <Button
          width="100%"
          rounded="full"
          bg="red.400"
          mt="3"
          py="4"
          _text={{
            color: "red.500",
            fontWeight: "500",
            textTransform: "none",
            fontSize: "16",
            lineHeight: "24",
            letterSpacing: "0.165",
          }}
        >
          Cancel Order
        </Button>

        <Button
          onPress={() => setShowDetails(false)}
          colorScheme="grey.500"
          width="100%"
          rounded="full"
          bg="grey.500"
          mt="3"
          py="4"
          _text={{
            color: "red.500",
            fontWeight: "500",
            textTransform: "none",
            fontSize: "16",
            lineHeight: "24",
            letterSpacing: "0.165",
          }}
        >
          Hide Details
        </Button>
      </Fragment>
    )}
  </VStack>
  )
}

export default ReOrderButton

const styles = StyleSheet.create({})