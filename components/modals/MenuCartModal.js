import { Modal, Platform } from "react-native";
import { Center, Image, Text, IconButton } from "native-base";
import { Feather } from "@expo/vector-icons";
import icons from "../../constants/icons";
import { setHeight, setWidth } from "../../utils/helper";
import { useRouter } from "expo-router";

const MenuCartModal = ({ showModal, title, setShowModal, cart }) => {
  const router = useRouter();
  return (
    <Modal
      onDismiss
      statusBarTranslucent={Platform.OS === "android" ? true : false}
      animationType="slide"
      visible={showModal}
      transparent={true}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}
    >
      <Center flex={1} bg="black.100" px={4}>
        <IconButton
          onPress={() => router.back()}
          size={8}
          rounded="full"
          position="absolute"
          bg="grey.500"
          top="4%"
          left="3"
          shadow={2}
          _icon={{
            as: Feather,
            name: "x",
            size: "5",
            strokeWidth: "2",
            color: "grey.600",
            textAlign: "center",
          }}
        />
        <Image
          source={icons.CHECKICON}
          alt={`${title} added`}
          w={setWidth(20)}
          h={setHeight(10)}
        />
        <Text
          my={2}
          textAlign="center"
          color="white.500"
          fontSize="16"
          lineHeight="24"
          fontWeight="500"
          letterSpacing="-0.165"
        >
          {cart ? `${title} updated` : `${title} added`}
        </Text>
      </Center>
    </Modal>
  );
};

export default MenuCartModal;
