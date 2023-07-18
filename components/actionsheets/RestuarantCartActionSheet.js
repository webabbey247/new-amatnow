import { useState } from "react";
import {
  Radio,
  HStack,
  Box,
  IconButton,
  Actionsheet,
  Image,
  useColorMode,
  Center,
  VStack,
  Divider,
  Spinner,
  ScrollView,
} from "native-base";
import { setHeight, setWidth } from "../../utils/helper";
import icons from "../../constants/icons";

const RestuarantCartActionSheet = ({
  isOpen,
  onClose,
  onOpen,
  restuarantCart,
  isLoading,
  isFetching,
  setRestuarantID,
  restuarantID,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Actionsheet onOpen={onOpen} isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        p={0}
        m={0}
        px={3}
        bg="white.500"
        h={restuarantCart.length <= 3 ? setHeight(35) : setHeight(68)}
      >
        <Box w="100%" justifyContent="flex-start">
          {isLoading || isFetching ? (
            <Spinner color="red.500" size="sm" />
          ) : (
            <ScrollView
              keyboardShouldPersistTaps={"always"}
              py={3}
              bg={colorMode === "dark" ? "black.500" : "white.500"}
            >
              <VStack w="100%">
                <Radio.Group
                  onChange={(resID) => {
                    setRestuarantID(resID);
                    onOpen(false);
                  }}
                  defaultValue={restuarantID}
                  name="address"
                  size="lg"
                  w="100%"
                  colorScheme="red"
                >
                  {restuarantCart.map((item, index) => {
                    return (
                      <HStack
                        key={index}
                        px={4}
                        py={4}
                        w="100%"
                        borderRadius={8}
                        borderColor="grey.400"
                        borderWidth={1}
                        my={2}
                        justifyContent="space-between"
                      >
                        <Center w="70%" justifyContent="flex-start" alignItems="flex-start">
                          <Radio
                            w="100%"
                            alignItems="flex-start"
                            _text={{
                              textTransform: "capitalize",
                              ml: "2",
                              fontSize: "14",
                              lineHeight: "22",
                              letterSpacing: "-0.17",
                              fontWeight: "700",
                              isTruncated: "true",
                            }}
                            value={item?.id}
                          >
                            {item?.name}
                          </Radio>
                        </Center>
                       <Center w="20%" justifyContent="flex-end" alignItems="flex-end">
                       <Image
                          h={setHeight(4)}
                          w={setWidth(8)}
                          source={icons.ONLINESTORE}
                          alt="Food"
                          resizeMode="contain"
                        />
                       </Center>
                      </HStack>
                    );
                  })}
                </Radio.Group>
              </VStack>
            </ScrollView>
          )}
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default RestuarantCartActionSheet;
