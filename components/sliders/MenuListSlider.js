import { Fragment, useState, useEffect } from "react";
import {
  Stack,
  FlatList,
  Divider,
  VStack,
  Center,
  Text,
  useDisclose,
  HStack,
  Spinner,
} from "native-base";
import { MenuCategoryFilterCard, AltMenuCard } from "../general";
import { useGetSingleRestuarantMenuCategoryQuery } from "../../redux/restuarant/restaurantApiSlice";
import { AltMenuCardSkeleton, FilterCardSkeleton } from "../skeleton";
import { MenuDetailsActionSheet } from "../actionsheets";
import { ToastAlert } from "../alerts";

const MenuListSlider = ({ loading, responseData, restuarantID }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [categoryName, setCategoryName] = useState(null);
  const [menuCategoryID, setMenuCategoryID] = useState(null);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const placeholderData = new Array(6).fill("");

  const {
    data: isSingleMenuCategory,
    isLoading,
    isFetching,
  } = useGetSingleRestuarantMenuCategoryQuery({
    restuarantID: restuarantID,
    menuCategoryName: categoryName,
  });

  // console.log("Single Resturant Menu", isSingleMenuCategory);

  useEffect(() => {
    if (!loading) {
      setCategoryName(responseData[0]?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, responseData]);
  return (
    <VStack bg="white.500" px={4} w="100%" mb={6}>
      {loading ? (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderBottomWidth={1}
          borderColor="grey.400"
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={placeholderData}
            horizontal
            renderItem={({ item, index }) => <FilterCardSkeleton key={index} />}
          />
        </Stack>
      ) : (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderBottomWidth={1}
          borderColor="grey.400"
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={responseData}
            keyExtractor={(item) => item?.name}
            horizontal
            renderItem={({ item }) => (
              <MenuCategoryFilterCard
                item={item}
                isActive={item?.name === categoryName}
                loading={loading}
                setCategoryName={setCategoryName}
              />
            )}
          />
        </Stack>
      )}

      {isLoading || isFetching ? (
        <HStack space="3" py={5}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={placeholderData}
            vertical
            renderItem={({ index }) => <AltMenuCardSkeleton key={index} />}
          />
        </HStack>
      ) : (
        <HStack space="3" py={5}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={isSingleMenuCategory?.data || []}
            keyExtractor={(item) => item?.id}
            vertical
            renderItem={({ item }) => (
              <AltMenuCard
                id={item?.id}
                title={item?.name}
                description={item?.description}
                image={item?.image}
                price={item?.price}
                isLoading={isLoading}
                onOpen={onOpen}
                favorite={item?.is_favourite}
                setMenuCategoryID={setMenuCategoryID}
                restuarantID={restuarantID}
                setMessage={setMessage}
                setShowAlert={setShowAlert}
                setAlertStatus={setAlertStatus}
              />
            )}
          />
        </HStack>
      )}

      <MenuDetailsActionSheet
        menuCategoryID={menuCategoryID}
        restuarantID={restuarantID}
        isOpen={isOpen}
        onClose={onClose}
      />

      {showAlert ? (
        <ToastAlert
          message={message}
          status={alertStatus}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}
    </VStack>
  );
};

export default MenuListSlider;
