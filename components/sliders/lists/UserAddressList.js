import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Pressable,
  VStack,
  Icon,
  Text,
  Avatar,
  Spacer,
  Radio,
  Center,
  Image,
  useDisclose,
  Badge,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import icons from "../../../constants/icons";
import { setHeight, setWidth } from "../../../utils/helper";
import { useRouter } from "expo-router";
import { DeleteAddressActionSheet } from "../../actionsheets";
import { ToastAlert } from "../../alerts";

const UserAddressList = ({ isAddressData }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showDeleteAS, setShowDeleteAS] = useState(false);
  const [listData, setListData] = useState(isAddressData);
  const [defaultAddressID, setDefaultAddressID] = useState("");
  const [addressID, setAddressID] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");

  const handleUserAddress = (e) => {
    console.log("hello user address", e);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const handleEditRow = (rowMap, rowKey, data) => {
    closeRow(rowMap, rowKey);
    router.push(`/main/profile/address/${data.item.id}`);
    console.log("hello item info", data.item.id);
  };

  const handleDeleteRow = (data) => {
    // closeRow(rowMap, rowKey);
    setAddressID(data.item.id);
    // console.log("hello delete ID", data.item.id);
  };

  const renderItem = ({ item }) => (
    <VStack
      key={item?.id}
      mb="4"
      py="4"
      w="400"
      zIndex="2"
      bg="white.500"
      maxW="100%"
      borderRadius="8"
      borderColor="grey.400"
      borderWidth="1"
    >
      <Center justifyContent="flex-start" alignItems="flex-start" px="3">
        <Badge
          bg="grey.500"
          _text={{
            fontSize: 12,
            lineHeight: 20,
            letterSpacing: -0.165,
            fontWeight: "500",
          }}
        >
          {item?.alias}
        </Badge>
      </Center>
      <HStack justifyContent="space-between" p="3">
        <Text
          mt="1"
          textAlign="left"
          isTruncated
          numberOfLines="2"
          fontSize="14"
          lineHeight="20"
          fontWeight="400"
          color="black.500"
          // textTransform="uppercase"
          w="90%"
          // mx={3}
        >
          {[
            item?.street ? item?.street : "null",
            item?.city,
            item?.state,
            item?.country.name,
            item?.zip,
          ].join(", ")}
        </Text>
        <Radio value={item?.id} colorScheme="red" w="100%">
          {""}
        </Radio>
      </HStack>
    </VStack>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack
      p="2"
      flexDirection="row"
      position="absolute"
      right="5"
      top="5"
      w={setWidth(30)}
      // h={setHeight(15)}
      // maxH="100%"
      // h="100%"
    >
      <Pressable
        // flex={1}
        w={setWidth(14)}
        h={setHeight(7)}
        mr="3"
        cursor="pointer"
        bg="grey.500"
        justifyContent="center"
        alignItems="center"
        borderRadius="100"
        onPress={() => {
          handleEditRow(rowMap, data.item.key, data);
        }}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Icon
          as={<Image source={icons.EDITICON} alt="Delete Icon" />}
          size="5"
        />
      </Pressable>
      <Pressable
        // flex={1}
        w={setWidth(14)}
        h={setHeight(7)}
        cursor="pointer"
        bg="grey.500"
        justifyContent="center"
        alignItems="center"
        borderRadius="100"
        onPress={() => {
          handleDeleteRow(data);
          setShowDeleteAS(true);
        }}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Icon
          as={<Image source={icons.REDTRASHICON} alt="Delete Icon" />}
          size="5"
        />
      </Pressable>
    </HStack>
  );

  useEffect(() => {}, [isAddressData]);

  return (
    <Box bg="white.500" py={4} flex="1" w="100%">
      <Radio.Group
        onChange={(e) => {
          handleUserAddress(e);
        }}
        name="address"
        size="md"
        colorScheme="red"
        w="100%"
      >
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-145}
          previewRowKey={"0"}
          previewOpenValue={-60}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
          recalculateHiddenLayout={true}
        />
      </Radio.Group>
      <DeleteAddressActionSheet
        addressID={addressID}
        setMessage={setMessage}
        setShowAlert={setShowAlert}
        setAlertStatus={setAlertStatus}
        isOpen={showDeleteAS}
        onClose={onClose}
        setShowDeleteAS={setShowDeleteAS}
      />
      {showAlert ? (
        <ToastAlert
          message={message}
          status={alertStatus}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}
    </Box>
  );
};

export default UserAddressList;
