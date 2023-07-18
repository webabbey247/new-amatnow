import { useState } from "react";
import {
  IconButton,
  HStack,
  Box,
  Text,
  Actionsheet,
  Image,
  Pressable,
  Center,
  VStack,
  Divider,
  Spinner,
} from "native-base";

const GroupOrderActionSheet = () => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content p={0} m={0} px={3} bg="white.500" h={setHeight(58)}>
        <Text>Hello Abiodun Balogun</Text>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default GroupOrderActionSheet;
