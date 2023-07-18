import { Button, Icon } from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const AddressFilterCard = ({ item, instructions, setInFocus }) => {
  const inFocus = instructions === item.name ? true : false;
  const handleFilterCard = (item ) => {
    setInFocus(item.name);
  };
  return (
    <Button
      onPress={() => handleFilterCard(item)}
      bg={inFocus ? "black.500" : "grey.500"}
      py={3.5}
      px={4}
      mb={2}
      rounded={"full"}
      mr={2}
      leftIcon={
        item.name === "Ratings" ? (
          <Icon
            as={FontAwesome}
            name="star"
            size="5"
            color={inFocus ? "white.500" : "grey.700"}
          />
        ) : null
      }
      _text={{
        color: `${inFocus ? "white.500" : "black.500"}`,
        fontSize: "14",
        lineHeight: "20",
        fontWeight: "400",
        // textTransform: "capitalize",
        letterSpacing: "-0.165",
        textAlign: "center",
      }}
    >
      {item.name}
    </Button>
  );
};

export default AddressFilterCard;
