import { Center, Pressable } from "native-base";

const MenuCategoryFilterCard = ({ item, isActive, setCategoryName }) => {
  return (
    <Pressable key={item?.id} onPress={() => setCategoryName(item?.name)} mr={3}>
      <Center
        py={1.5}
        px={2}
        justifyContent="center"
        alignItems="center"
        borderBottomColor={isActive ? "black.500" : "grey.400"}
        borderBottomWidth={isActive ? 2 : null}
        _text={{
          fontSize: "16",
          lineHeight: "24",
          fontWeight: "400",
          // fontWeight: "700",
          letterSpacing: "-0.165",
          textTransform: "capitalize",
          textAlign: "center",
          color: `${isActive ? "black.500" : "grey.700"}`,
        }}
      >
        {item?.name}
      </Center>
    </Pressable>
  );
};

export default MenuCategoryFilterCard;
