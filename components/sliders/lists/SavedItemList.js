import { Fragment, useState, useEffect } from "react";
import { FlatList, Center, Image, Heading, Text } from "native-base";
import images from "../../../constants/images";
import { setWidth, setHeight } from "../../../utils/helper";
import { NoFavoriteCard } from "../../general";

const SavedItemList = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return <NoFavoriteCard />;
};

export default SavedItemList;
