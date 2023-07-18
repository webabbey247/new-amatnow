import { useState } from "react";
import { FlatList, HStack, VStack, useDisclose } from "native-base";
import { SectionTitle } from "../headings";
import { MenuCard } from "../general";
import { useGetSingleRestuarantMenuCategoryQuery } from "../../redux/restuarant/restaurantApiSlice";
import { setHeight, setWidth } from "../../utils/helper";
import { MenuDetailsActionSheet } from "../actionsheets";
import { ToastAlert } from "../alerts";

const StoreMenuSlider = ({ restuarantID, menuCategoryName, menuID }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [menuCategoryID, setMenuCategoryID] = useState(null);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");

  const {
    data: isMenuCategory,
    isLoading,
    isFetching,
  } = useGetSingleRestuarantMenuCategoryQuery({
    restuarantID: restuarantID,
    menuCategoryName: menuCategoryName,
  });

  return (
    <VStack px={4} key={menuID}>
      <SectionTitle title={menuCategoryName} path="" />
      <HStack justifyContent="space-between" bg="white.500" py={2}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={isMenuCategory?.data || []}
          keyExtractor={(item) => item?.id}
          horizontal
          renderItem={({ item }) => (
            <MenuCard
              width={setWidth(45)}
              height={setHeight(15)}
              setMenuCategoryID={setMenuCategoryID}
              restuarantID={restuarantID}
              id={item?.id}
              title={item?.name}
              cost={item?.price}
              image={item?.image}
              favorite={item?.is_favourite}
              loading={isLoading}
              fetching={isFetching}
              onOpen={onOpen}
              setMessage={setMessage}
              setShowAlert={setShowAlert}
              setAlertStatus={setAlertStatus}
              position=""
            />
          )}
        />
      </HStack>

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

export default StoreMenuSlider;
