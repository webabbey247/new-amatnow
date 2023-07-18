import { Button, Icon } from "native-base";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Feather, FontAwesome } from "@expo/vector-icons";

const FilterCards = ({ item, category, setInFocus, setSlug, onOpen }) => {
  const inFocus = category === item.name ? true : false;

  const handleFilterCard = (item) => {
    setInFocus(item.name);
    setSlug(item.slug);
  };

  const handleRatingFilterCard = (item) => {
    setInFocus(item.name);
    onOpen()
  }
  return (
    <Button
      colorScheme="red.500"
      onPress={() =>
        item.name === "Ratings" ? handleRatingFilterCard(item) : handleFilterCard(item)
      }
      bg={inFocus ? "red.500" : "grey.500"}
      py={2.5}
      px={6}
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
      rightIcon={
        item.name === "Ratings" ? (
          <Icon
            as={Feather}
            name="chevron-down"
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

export default FilterCards;
