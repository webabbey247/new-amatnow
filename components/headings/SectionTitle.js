import { useColorMode, HStack, Heading, IconButton } from "native-base";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const SectionTitle = ({ title, path, slug }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <HStack
      justifyContent="space-between"
      py={2}
      bg={colorMode === "dark" ? "black.500" : "white.500"}
    >
      <Heading
        mt="1"
        fontSize="18"
        lineHeight="24"
        fontWeight="800"
        letterSpacing="-0.165"
        color="black.500"
      >
        {title}
      </Heading>
      {path ? (
        <IconButton
          onPress={() =>
            router.push(`${path}/${slug}?title=${title}`)
          }
          // onPress={() =>
          //   router.push(`${path}`?title=${title}, {
          //     title: title,
          //     url: slug,
          //   })
          // }
          p="2"
          mr={1}
          bg="white.500"
          rounded="full"
          shadow={1}
          variant="solid"
          _icon={{
            as: Feather,
            name: "arrow-right",
            size: "5",
            color: "black.500",
          }}
        />
      ) : null}
    </HStack>
  );
};

export default SectionTitle;
